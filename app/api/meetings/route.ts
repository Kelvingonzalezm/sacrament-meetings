import { NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const meetings = getMeetings();

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const filteredMeetings = date
    ? meetings.filter((meeting) => meeting.date === date)
    : meetings;

  return NextResponse.json(filteredMeetings, { status: 200 });
}