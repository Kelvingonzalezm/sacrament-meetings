
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

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

  const headersList = await headers();

  const host =
    headersList.get("x-forwarded-host") ??
    headersList.get("host");

  const protocol =
    headersList.get("x-forwarded-proto") ?? "http";

  const baseUrl = host
    ? `${protocol}://${host}`
    : "http://localhost:3001";

  const response = await fetch(
    `${baseUrl}/api/meetings/${meetingId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await response.json();

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
