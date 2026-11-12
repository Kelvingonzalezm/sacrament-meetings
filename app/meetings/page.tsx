import { headers } from "next/headers";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingsPage() {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ??
    headersList.get("host");

  const protocol =
    headersList.get("x-forwarded-proto") ?? "http";

  const baseUrl = host
    ? `${protocol}://${host}`
    : "http://localhost:3001";

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load meetings.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Browse previous and upcoming sacrament meetings.
        </p>
      </div>

      {meetings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-white p-6 text-gray-600">
          No meetings available.
        </p>
      )}
    </div>
  );
}