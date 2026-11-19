"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    addMeeting,
    updateMeeting,
    deleteMeeting as deleteMeetingFromDB,
} from "@/lib/meetings-db";

const meetingSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date."),
    meetingType: z.enum([
        "testimony",
        "regular",
        "stake",
        "general",
        "special",
    ]),
    presiding: z.string().min(1, "Presiding is required."),
    conducting: z.string().min(1, "Conducting is required."),
    announcements: z.string().optional(),
    openingHymnNumber: z.coerce.number().int().positive(),
    openingHymnTitle: z.string().min(1, "Opening hymn is required."),
    openingPrayer: z.string().min(1, "Opening prayer is required."),
    wardBusiness: z.string().optional(),
    stakeBusiness: z.boolean(),
    sacramentHymnNumber: z.coerce.number().int().positive(),
    sacramentHymnTitle: z.string().min(1, "Sacrament hymn is required."),
    speakers: z.string().optional(),
    closingHymnNumber: z.coerce.number().int().positive(),
    closingHymnTitle: z.string().min(1, "Closing hymn is required."),
    closingPrayer: z.string().min(1, "Closing prayer is required."),
});

export type MeetingFormState = {
    errors?: Record<string, string[]>;
    message?: string;
};

function parseMeetingForm(formData: FormData) {
    const rawData = {
        ...Object.fromEntries(formData.entries()),
        stakeBusiness: formData.get("stakeBusiness") === "on",
    };

    const result = meetingSchema.safeParse(rawData);

    if (!result.success) {
        return {
            success: false as const,
            errors: result.error.flatten().fieldErrors,
        };
    }

    const data = result.data;

    return {
        success: true as const,
        meeting: {
            date: data.date,
            meetingType: data.meetingType,
            presiding: data.presiding,
            conducting: data.conducting,
            announcements: (data.announcements ?? "")
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            openingHymn: {
                number: data.openingHymnNumber,
                title: data.openingHymnTitle,
            },
            openingPrayer: data.openingPrayer,
            wardBusiness: (data.wardBusiness ?? "")
                .split("\n")
                .map((description) => description.trim())
                .filter(Boolean)
                .map((description) => ({ description })),
            stakeBusiness: data.stakeBusiness,
            sacramentHymn: {
                number: data.sacramentHymnNumber,
                title: data.sacramentHymnTitle,
            },
            speakers: (data.speakers ?? "")
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const [name, topic, type] = line.split("|").map((part) => part.trim());

                    return {
                        name,
                        topic,
                        type:
                            type === "musical-number"
                                ? ("musical-number" as const)
                                : ("speaker" as const),
                    };
                }),
            closingHymn: {
                number: data.closingHymnNumber,
                title: data.closingHymnTitle,
            },
            closingPrayer: data.closingPrayer,
        },
    };
}

export async function createMeeting(
    _previousState: MeetingFormState,
    formData: FormData,
): Promise<MeetingFormState> {
    const result = parseMeetingForm(formData);

    if (!result.success) {
        return { errors: result.errors, message: "Please correct the errors." };
    }

    try {
        await addMeeting(result.meeting);
    } catch (error) {
        console.error("Create meeting action failed:", error);
        return { message: "Unable to create the meeting. Please try again." };
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function updateMeetingAction(
    id: number,
    _previousState: MeetingFormState,
    formData: FormData,
): Promise<MeetingFormState> {
    const result = parseMeetingForm(formData);

    if (!result.success) {
        return { errors: result.errors, message: "Please correct the errors." };
    }

    try {
        await updateMeeting(id, result.meeting);
    } catch (error) {
        console.error("Update meeting action failed:", error);
        return { message: "Unable to update the meeting. Please try again." };
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}

export async function deleteMeetingAction(
    id: number,
    _formData: FormData,
): Promise<void> {
    void _formData;

    try {
        await deleteMeetingFromDB(id);
    } catch (error) {
        console.error("Delete meeting action failed:", error);
        throw new Error("Unable to delete the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}
