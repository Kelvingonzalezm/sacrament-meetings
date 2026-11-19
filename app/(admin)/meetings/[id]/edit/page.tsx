import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeetingAction } from "@/lib/actions";

export const instant = false;

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateAction = updateMeetingAction.bind(null, meetingId);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-emerald-900">
          Edit Meeting
        </h1>
        <p className="mt-2 text-gray-600">
          Update the details of this sacrament meeting.
        </p>
      </div>

      <MeetingForm
        action={updateAction}
        meeting={meeting}
        submitLabel="Save Changes"
      />

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-6 inline-block text-sm font-semibold text-emerald-800 hover:underline"
      >
        Cancel and return to meeting
      </Link>
    </div>
  );
}
