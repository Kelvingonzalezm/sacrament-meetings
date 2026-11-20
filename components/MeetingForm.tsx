"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingFormState } from "@/lib/actions";

type MeetingAction = (
    state: MeetingFormState,
    formData: FormData,
) => Promise<MeetingFormState>;

interface MeetingFormProps {
    action: MeetingAction;
    meeting?: SacramentMeeting;
    submitLabel: string;
}

interface FieldErrorProps {
    id: string;
    message: string;
}

const initialState: MeetingFormState = {};

function FieldError({ id, message }: FieldErrorProps) {
    return (
        <p id={id} aria-live="polite" className="mt-1 text-sm text-red-600">
            {message}
        </p>
    );
}

export default function MeetingForm({
    action,
    meeting,
    submitLabel,
}: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(
        action,
        initialState,
    );

    function fieldError(name: string) {
        return state.errors?.[name]?.[0] ?? "";
    }

    const inputClass =
        "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600";

    return (
        <form action={formAction} className="space-y-6">
            {state.message && (
                <p
                    role="alert"
                    aria-live="polite"
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                    {state.message}
                </p>
            )}

            <div>
                <label htmlFor="date" className="font-semibold text-gray-800">
                    Meeting Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={
                        meeting?.date
                            ? new Date(meeting.date).toISOString().slice(0, 10)
                            : ""
                    }
                    aria-describedby="date-error"
                    aria-invalid={Boolean(fieldError("date"))}
                    className={inputClass}
                />
                <FieldError id="date-error" message={fieldError("date")} />
            </div>

            <div>
                <label htmlFor="meetingType" className="font-semibold text-gray-800">
                    Meeting Type
                </label>
                <select
                    id="meetingType"
                    name="meetingType"
                    required
                    defaultValue={meeting?.meetingType ?? "regular"}
                    aria-describedby="meetingType-error"
                    aria-invalid={Boolean(fieldError("meetingType"))}
                    className={inputClass}
                >
                    <option value="testimony">Testimony</option>
                    <option value="regular">Regular</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                    <option value="special">Special</option>
                </select>
                <FieldError id="meetingType-error" message={fieldError("meetingType")} />
            </div>

            <div>
                <label htmlFor="presiding" className="font-semibold text-gray-800">
                    Presiding
                </label>
                <input
                    id="presiding"
                    name="presiding"
                    required
                    defaultValue={meeting?.presiding ?? ""}
                    aria-describedby="presiding-error"
                    aria-invalid={Boolean(fieldError("presiding"))}
                    className={inputClass}
                />
                <FieldError id="presiding-error" message={fieldError("presiding")} />
            </div>

            <div>
                <label htmlFor="conducting" className="font-semibold text-gray-800">
                    Conducting
                </label>
                <input
                    id="conducting"
                    name="conducting"
                    required
                    defaultValue={meeting?.conducting ?? ""}
                    aria-describedby="conducting-error"
                    aria-invalid={Boolean(fieldError("conducting"))}
                    className={inputClass}
                />
                <FieldError id="conducting-error" message={fieldError("conducting")} />
            </div>

            <div>
                <label htmlFor="announcements" className="font-semibold text-gray-800">
                    Announcements (one per line)
                </label>
                <textarea
                    id="announcements"
                    name="announcements"
                    rows={3}
                    defaultValue={meeting?.announcements?.join("\n") ?? ""}
                    aria-describedby="announcements-error"
                    aria-invalid={Boolean(fieldError("announcements"))}
                    className={inputClass}
                />
                <FieldError id="announcements-error" message={fieldError("announcements")} />
            </div>

            <fieldset className="space-y-3 rounded-lg border border-gray-200 p-4">
                <legend className="px-2 font-semibold text-emerald-900">
                    Opening Hymn
                </legend>
                <div>
                    <label htmlFor="openingHymnNumber">Hymn Number</label>
                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.openingHymn.number ?? ""}
                        aria-describedby="openingHymnNumber-error"
                        aria-invalid={Boolean(fieldError("openingHymnNumber"))}
                        className={inputClass}
                    />
                    <FieldError id="openingHymnNumber-error" message={fieldError("openingHymnNumber")} />
                </div>
                <div>
                    <label htmlFor="openingHymnTitle">Hymn Title</label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        required
                        defaultValue={meeting?.openingHymn.title ?? ""}
                        aria-describedby="openingHymnTitle-error"
                        aria-invalid={Boolean(fieldError("openingHymnTitle"))}
                        className={inputClass}
                    />
                    <FieldError id="openingHymnTitle-error" message={fieldError("openingHymnTitle")} />
                </div>
            </fieldset>

            <div>
                <label htmlFor="openingPrayer" className="font-semibold text-gray-800">
                    Opening Prayer
                </label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    required
                    defaultValue={meeting?.openingPrayer ?? ""}
                    aria-describedby="openingPrayer-error"
                    aria-invalid={Boolean(fieldError("openingPrayer"))}
                    className={inputClass}
                />
                <FieldError id="openingPrayer-error" message={fieldError("openingPrayer")} />
            </div>

            <div>
                <label htmlFor="wardBusiness" className="font-semibold text-gray-800">
                    Ward Business (one item per line)
                </label>
                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    defaultValue={meeting?.wardBusiness.map((item) => item.description).join("\n") ?? ""}
                    aria-describedby="wardBusiness-error"
                    aria-invalid={Boolean(fieldError("wardBusiness"))}
                    className={inputClass}
                />
                <FieldError id="wardBusiness-error" message={fieldError("wardBusiness")} />
            </div>

            <div>
                <div className="flex items-center gap-3">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        defaultChecked={meeting?.stakeBusiness ?? false}
                        aria-describedby="stakeBusiness-error"
                        aria-invalid={Boolean(fieldError("stakeBusiness"))}
                        className="h-4 w-4 accent-emerald-800"
                    />
                    <label htmlFor="stakeBusiness" className="font-semibold text-gray-800">
                        Stake Business will be presented
                    </label>
                </div>
                <FieldError id="stakeBusiness-error" message={fieldError("stakeBusiness")} />
            </div>

            <fieldset className="space-y-3 rounded-lg border border-gray-200 p-4">
                <legend className="px-2 font-semibold text-emerald-900">
                    Sacrament Hymn
                </legend>
                <div>
                    <label htmlFor="sacramentHymnNumber">Hymn Number</label>
                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.sacramentHymn.number ?? ""}
                        aria-describedby="sacramentHymnNumber-error"
                        aria-invalid={Boolean(fieldError("sacramentHymnNumber"))}
                        className={inputClass}
                    />
                    <FieldError id="sacramentHymnNumber-error" message={fieldError("sacramentHymnNumber")} />
                </div>
                <div>
                    <label htmlFor="sacramentHymnTitle">Hymn Title</label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        required
                        defaultValue={meeting?.sacramentHymn.title ?? ""}
                        aria-describedby="sacramentHymnTitle-error"
                        aria-invalid={Boolean(fieldError("sacramentHymnTitle"))}
                        className={inputClass}
                    />
                    <FieldError id="sacramentHymnTitle-error" message={fieldError("sacramentHymnTitle")} />
                </div>
            </fieldset>

            <div>
                <label htmlFor="speakers" className="font-semibold text-gray-800">
                    Speakers and Musical Numbers
                </label>
                <p className="mt-1 text-sm text-gray-600">
                    One per line: Name | Topic | speaker or musical-number
                </p>
                <textarea
                    id="speakers"
                    name="speakers"
                    rows={4}
                    defaultValue={
                        meeting?.speakers
                            .map((item) => `${item.name} | ${item.topic} | ${item.type}`)
                            .join("\n") ?? ""
                    }
                    aria-describedby="speakers-error"
                    aria-invalid={Boolean(fieldError("speakers"))}
                    className={inputClass}
                />
                <FieldError id="speakers-error" message={fieldError("speakers")} />
            </div>

            <fieldset className="space-y-3 rounded-lg border border-gray-200 p-4">
                <legend className="px-2 font-semibold text-emerald-900">
                    Closing Hymn
                </legend>
                <div>
                    <label htmlFor="closingHymnNumber">Hymn Number</label>
                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.closingHymn.number ?? ""}
                        aria-describedby="closingHymnNumber-error"
                        aria-invalid={Boolean(fieldError("closingHymnNumber"))}
                        className={inputClass}
                    />
                    <FieldError id="closingHymnNumber-error" message={fieldError("closingHymnNumber")} />
                </div>
                <div>
                    <label htmlFor="closingHymnTitle">Hymn Title</label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        required
                        defaultValue={meeting?.closingHymn.title ?? ""}
                        aria-describedby="closingHymnTitle-error"
                        aria-invalid={Boolean(fieldError("closingHymnTitle"))}
                        className={inputClass}
                    />
                    <FieldError id="closingHymnTitle-error" message={fieldError("closingHymnTitle")} />
                </div>
            </fieldset>

            <div>
                <label htmlFor="closingPrayer" className="font-semibold text-gray-800">
                    Closing Prayer
                </label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    required
                    defaultValue={meeting?.closingPrayer ?? ""}
                    aria-describedby="closingPrayer-error"
                    aria-invalid={Boolean(fieldError("closingPrayer"))}
                    className={inputClass}
                />
                <FieldError id="closingPrayer-error" message={fieldError("closingPrayer")} />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}