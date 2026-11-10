
"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="bg-emerald-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-200">
            Sacrament Meeting Planner
          </p>
          <h1 className="text-xl font-bold">
            Cochabamba Ward
          </h1>
        </div>

        <p className="text-sm text-emerald-100">
          {currentDate}
        </p>
      </div>
    </header>
  );
}
