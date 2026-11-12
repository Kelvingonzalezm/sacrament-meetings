import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Ward activity next Saturday."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Michael Davis",
    wardBusiness: [{ description: "Sustain new ward leaders." }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Sister Mary Johnson", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Ward Choir", topic: "I Know That My Redeemer Lives", type: "musical-number" },
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Robert Wilson",
  },
  {
    id: 2,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Fast Sunday."],
    openingHymn: { number: 6, title: "Redeemer of Israel" },
    openingPrayer: "Sister Anna White",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Ward Members", topic: "Personal testimonies", type: "speaker" },
    ],
    closingHymn: { number: 96, title: "Dearest Children, God Is Near You" },
    closingPrayer: "Brother Peter Green",
  },
  {
    id: 3,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Youth activity on Wednesday."],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Brother James Taylor",
    wardBusiness: [{ description: "Welcome new ward members." }],
    stakeBusiness: false,
    sacramentHymn: { number: 188, title: "Thy Will, O Lord, Be Done" },
    speakers: [
      { name: "Brother Daniel Lee", topic: "Service and love", type: "speaker" },
      { name: "Sister Emily Clark", topic: "Gratitude", type: "speaker" },
    ],
    closingHymn: { number: 98, title: "I Need Thee Every Hour" },
    closingPrayer: "Sister Laura Adams",
  },
  {
    id: 4,
    date: "2026-10-18",
    meetingType: "stake",
    presiding: "Stake President Mark Jones",
    conducting: "Brother David Brown",
    announcements: ["Stake conference preparation."],
    openingHymn: { number: 27, title: "Praise to the Lord, the Almighty" },
    openingPrayer: "Brother Thomas King",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 100, title: "Nearer, My God, to Thee" },
    speakers: [
      { name: "Stake President Mark Jones", topic: "Strengthening families", type: "speaker" },
    ],
    closingHymn: { number: 135, title: "My Redeemer Lives" },
    closingPrayer: "Sister Rachel Moore",
  },
  {
    id: 5,
    date: "2026-10-11",
    meetingType: "general",
    presiding: "Elder Paul Anderson",
    conducting: "Brother David Brown",
    announcements: ["General meeting."],
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Brother Samuel Hill",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Elder Paul Anderson", topic: "Discipleship", type: "speaker" },
    ],
    closingHymn: { number: 89, title: "The Lord Is My Shepherd" },
    closingPrayer: "Brother Henry Scott",
  },
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}
