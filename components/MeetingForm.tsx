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

const initialState: MeetingFormState = {};

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
                    aria-describedby={fieldError("date") ? "date-error" : undefined}
                    className={inputClass}
                />
                {fieldError("date") && (
                    <p id="date-error" className="mt-1 text-sm text-red-600">
                        {fieldError("date")}
                    </p>
                )}
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
                    className={inputClass}
                >
                    <option value="testimony">Testimony</option>
                    <option value="regular">Regular</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                    <option value="special">Special</option>
                </select>
                {fieldError("meetingType") && (
                    <p className="mt-1 text-sm text-red-600">
                        {fieldError("meetingType")}
                    </p>
                )}
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
                    className={inputClass}
                    aria-describedby={fieldError("presiding") ? "presiding-error" : undefined}
                />
                {fieldError("presiding") && (
                    <p id="presiding-error" className="mt-1 text-sm text-red-600">
                        {fieldError("presiding")}
                    </p>
                )}
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
                    className={inputClass}
                    aria-describedby={fieldError("conducting") ? "conducting-error" : undefined}
                />
                {fieldError("conducting") && (
                    <p id="conducting-error" className="mt-1 text-sm text-red-600">
                        {fieldError("conducting")}
                    </p>
                )}
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
                    className={inputClass}
                />
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
                        className={inputClass}
                    />
                    {fieldError("openingHymnNumber") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("openingHymnNumber")}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="openingHymnTitle">Hymn Title</label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        required
                        defaultValue={meeting?.openingHymn.title ?? ""}
                        className={inputClass}
                    />
                    {fieldError("openingHymnTitle") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("openingHymnTitle")}
                        </p>
                    )}
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
                    className={inputClass}
                />
                {fieldError("openingPrayer") && (
                    <p className="mt-1 text-sm text-red-600">
                        {fieldError("openingPrayer")}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="wardBusiness" className="font-semibold text-gray-800">
                    Ward Business (one item per line)
                </label>
                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    defaultValue={
                        meeting?.wardBusiness.map((item) => item.description).join("\n") ?? ""
                    }
                    className={inputClass}
                />
            </div>

            <div className="flex items-center gap-3">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    defaultChecked={meeting?.stakeBusiness ?? false}
                    className="h-4 w-4 accent-emerald-800"
                />
                <label htmlFor="stakeBusiness" className="font-semibold text-gray-800">
                    Stake Business will be presented
                </label>
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
                        className={inputClass}
                    />
                    {fieldError("sacramentHymnNumber") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("sacramentHymnNumber")}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="sacramentHymnTitle">Hymn Title</label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        required
                        defaultValue={meeting?.sacramentHymn.title ?? ""}
                        className={inputClass}
                    />
                    {fieldError("sacramentHymnTitle") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("sacramentHymnTitle")}
                        </p>
                    )}
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
                    className={inputClass}
                />
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
                        className={inputClass}
                    />
                    {fieldError("closingHymnNumber") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("closingHymnNumber")}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="closingHymnTitle">Hymn Title</label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        required
                        defaultValue={meeting?.closingHymn.title ?? ""}
                        className={inputClass}
                    />
                    {fieldError("closingHymnTitle") && (
                        <p className="mt-1 text-sm text-red-600">
                            {fieldError("closingHymnTitle")}
                        </p>
                    )}
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
                    className={inputClass}
                />
                {fieldError("closingPrayer") && (
                    <p className="mt-1 text-sm text-red-600">
                        {fieldError("closingPrayer")}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                {isPending ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}
