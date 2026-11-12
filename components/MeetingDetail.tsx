import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "@/components/PrintButton";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      id="meeting-details"
      className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm sm:p-10"
    >
      <div className="mb-6 flex justify-end print:hidden">
        <PrintButton />
      </div>
      <div className="mb-8 border-b border-gray-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          {meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1)} Meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {formattedDate}
        </h1>

        <p className="mt-3 text-gray-600">
          Presiding: {meeting.presiding}
        </p>

        <p className="text-gray-600">
          Conducting: {meeting.conducting}
        </p>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-emerald-900">
            Announcements
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Opening Hymn
        </h2>
        <p className="mt-2 text-gray-700">
          Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Opening Prayer
        </h2>
        <p className="mt-2 text-gray-700">{meeting.openingPrayer}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Ward Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-600">No ward business.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Stake Business
        </h2>
        <p className="mt-2 text-gray-700">
          {meeting.stakeBusiness
            ? "Stake business will be presented."
            : "No stake business."}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Sacrament Hymn
        </h2>
        <p className="mt-2 text-gray-700">
          Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.length > 0 ? (
          <ul className="mt-2 space-y-3 text-gray-700">
            {meeting.speakers.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">
                  {item.type === "musical-number"
                    ? "Musical Number"
                    : "Speaker"}
                  :
                </span>{" "}
                {item.name}
                {item.topic && ` — ${item.topic}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-600">No speakers listed.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-900">
          Closing Hymn
        </h2>
        <p className="mt-2 text-gray-700">
          Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
        </p>
      </section>

      <section className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold text-emerald-900">
          Closing Prayer
        </h2>
        <p className="mt-2 text-gray-700">{meeting.closingPrayer}</p>
      </section>
    </article>
  );
}