import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-emerald-900">
          Create Meeting
        </h1>
        <p className="mt-2 text-gray-600">
          Enter the details for the new sacrament meeting.
        </p>
      </div>

      <MeetingForm
        action={createMeeting}
        submitLabel="Create Meeting"
      />

      <Link
        href="/meetings"
        className="mt-6 inline-block text-sm font-semibold text-emerald-800 hover:underline"
      >
        Cancel and return to meetings
      </Link>
    </div>
  );
}
