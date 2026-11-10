
import { notFound } from "next/navigation";
import Link from "next/link";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export const instant = false;

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/meetings"
        className="mb-6 inline-block text-sm font-semibold text-emerald-800 hover:underline"
      >
        ← Back to Meetings
      </Link>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
