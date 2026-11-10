import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  await connection();

  const meetings = getMeetings();

  const today = new Date();
  const currentSunday = new Date(today);
  currentSunday.setDate(today.getDate() - today.getDay());

  const sundayDate = [
    currentSunday.getFullYear(),
    String(currentSunday.getMonth() + 1).padStart(2, "0"),
    String(currentSunday.getDate()).padStart(2, "0"),
  ].join("-");

  const currentMeeting = meetings
    .filter((meeting) => meeting.date <= sundayDate)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}