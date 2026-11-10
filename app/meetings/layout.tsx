import type { ReactNode } from "react";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <section className="py-2">
      <div className="mb-5 border-b border-emerald-100 pb-3">
        <h1 className="text-2xl font-bold text-emerald-900">
          Sacrament Meetings
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View meeting schedules and details.
        </p>
      </div>

      {children}
    </section>
  );
}