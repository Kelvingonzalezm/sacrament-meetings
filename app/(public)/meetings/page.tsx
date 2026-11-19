import { connection } from "next/server";
import { headers } from "next/headers";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingsPageProps {
  searchParams: Promise<{
    speaker?: string;
    presiding?: string;
    conducting?: string;
    type?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  await connection();

  const filters = await searchParams;
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

  const filteredMeetings = meetings.filter((meeting) => {
    const speakerMatch = filters.speaker
      ? meeting.speakers.some((speaker) =>
          `${speaker.name} ${speaker.topic}`
            .toLowerCase()
            .includes(filters.speaker!.toLowerCase())
        )
      : true;

    const presidingMatch = filters.presiding
      ? meeting.presiding
          .toLowerCase()
          .includes(filters.presiding.toLowerCase())
      : true;

    const conductingMatch = filters.conducting
      ? meeting.conducting
          .toLowerCase()
          .includes(filters.conducting.toLowerCase())
      : true;

    const typeMatch = filters.type
      ? meeting.meetingType === filters.type
      : true;

    return (
      speakerMatch &&
      presidingMatch &&
      conductingMatch &&
      typeMatch
    );
  });

  const pageSize = 5;
  const totalPages = Math.ceil(filteredMeetings.length / pageSize);

  const requestedPage = Number(filters.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(totalPages, 1))
      : 1;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Browse previous and upcoming sacrament meetings.
        </p>
      </div>

      <Suspense fallback={<p>Loading search...</p>}>
        <MeetingSearch />
      </Suspense>

      {paginatedMeetings.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={filters}
          />
        </>
      ) : (
        <p className="rounded-lg bg-white p-6 text-gray-600">
          No meetings found.
        </p>
      )}
    </div>
  );
}
