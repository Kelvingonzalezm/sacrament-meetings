import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: SacramentMeeting["meetingType"];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"] | null;
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"] | null;
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

// Get all meetings
export async function getMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *
    FROM meetings
    ORDER BY date DESC
  `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

// Get one meeting by ID
export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  const row = (rows as unknown as MeetingRow[])[0];

  return row ? mapMeeting(row) : undefined;
}

// Create a meeting
export async function addMeeting(
  meeting: Omit<SacramentMeeting, "id">,
): Promise<void> {
  try {
    await sql`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      )
      VALUES (
        ${meeting.date}::date,
        ${meeting.meetingType},
        ${meeting.presiding},
        ${meeting.conducting},
        ${meeting.announcements ?? []}::text[],
        ${JSON.stringify(meeting.openingHymn)}::jsonb,
        ${meeting.openingPrayer},
        ${JSON.stringify(meeting.wardBusiness)}::jsonb,
        ${meeting.stakeBusiness},
        ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
        ${JSON.stringify(meeting.speakers)}::jsonb,
        ${JSON.stringify(meeting.closingHymn)}::jsonb,
        ${meeting.closingPrayer}
      )
    `;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw new Error("Unable to create the meeting. Please try again.");
  }
}

// Update a meeting
export async function updateMeeting(
  id: number,
  meeting: Omit<SacramentMeeting, "id">,
): Promise<void> {
  try {
    await sql`
      UPDATE meetings
      SET
        date = ${meeting.date}::date,
        meeting_type = ${meeting.meetingType},
        presiding = ${meeting.presiding},
        conducting = ${meeting.conducting},
        announcements = ${meeting.announcements ?? []}::text[],
        opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
        opening_prayer = ${meeting.openingPrayer},
        ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
        stake_business = ${meeting.stakeBusiness},
        sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
        speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
        closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
        closing_prayer = ${meeting.closingPrayer}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw new Error("Unable to update the meeting. Please try again.");
  }
}

// Delete a meeting
export async function deleteMeeting(id: number): Promise<void> {
  try {
    await sql`
      DELETE FROM meetings
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw new Error("Unable to delete the meeting. Please try again.");
  }
}
