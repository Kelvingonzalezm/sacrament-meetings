
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();

  const meetings = await getMeetings();

  const today = new Date();
  const currentSunday = new Date(today);
  currentSunday.setDate(today.getDate() - today.getDay());

  const sundayDate = [
    currentSunday.getFullYear(),
    String(currentSunday.getMonth() + 1).padStart(2, "0"),
    String(currentSunday.getDate()).padStart(2, "0"),
  ].join("-");

  const currentMeeting = meetings.find(
    (meeting) => meeting.date === sundayDate
  );

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
