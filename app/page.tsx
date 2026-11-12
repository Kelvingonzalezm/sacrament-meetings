import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center gap-6 py-4 md:grid-cols-2 md:py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Cochabamba Ward
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Organize and view sacrament meeting schedules, including hymns,
          prayers, speakers, announcements, and ward business.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/meetings"
            className="rounded-lg bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            View Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-lg border border-emerald-800 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Current Meeting
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/meeting.svg"
          alt="Illustration of a meetinghouse"
          width={800}
          height={450}
          priority
          className="w-full max-w-xl rounded-2xl shadow-sm"
        />
      </div>
    </div>
  );
}
