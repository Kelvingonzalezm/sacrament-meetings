import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
      >
        View Meeting
      </Link>
    </article>
  );
}