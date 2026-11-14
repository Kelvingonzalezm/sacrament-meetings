
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

export async function getMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *
    FROM meetings
    ORDER BY date DESC
  `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

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

// Mutations will be implemented in Week 04.
export async function addMeeting(
  _meeting: Omit<SacramentMeeting, "id">,
): Promise<void> {}

export async function updateMeeting(
  _id: number,
  _meeting: Partial<SacramentMeeting>,
): Promise<void> {}

export async function deleteMeeting(_id: number): Promise<void> {}
