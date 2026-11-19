import Link from "next/link";
import { deleteMeetingAction } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString(
    "en-US",
    {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-emerald-700">
        {formattedDate}
      </p>

      <h2 className="mt-2 text-xl font-bold capitalize text-gray-900">
        {meeting.meetingType} Meeting
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Presiding: {meeting.presiding}
      </p>

      <p className="text-sm text-gray-600">
        Conducting: {meeting.conducting}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          View Meeting
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          Edit
        </Link>

        <form action={deleteMeetingAction.bind(null, meeting.id)}>
          <button
            type="submit"
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
