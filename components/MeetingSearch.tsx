"use client";

import { useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface FilterValues {
  speaker: string;
  presiding: string;
  conducting: string;
  type: string;
}

export default function MeetingSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [speaker, setSpeaker] = useState(
    searchParams.get("speaker") ?? "",
  );
  const [presiding, setPresiding] = useState(
    searchParams.get("presiding") ?? "",
  );
  const [conducting, setConducting] = useState(
    searchParams.get("conducting") ?? "",
  );
  const [meetingType, setMeetingType] = useState(
    searchParams.get("type") ?? "",
  );

  const updateSearchParams = useDebouncedCallback(
    (filters: FilterValues) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value.trim()) {
          params.set(key, value.trim());
        } else {
          params.delete(key);
        }
      });

      params.delete("page");

      const queryString = params.toString();

      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        { scroll: false },
      );
    },
    400,
  );

  function handleChange(key: keyof FilterValues, value: string) {
    const nextFilters: FilterValues = {
      speaker,
      presiding,
      conducting,
      type: meetingType,
    };

    nextFilters[key] = value;

    if (key === "speaker") setSpeaker(value);
    if (key === "presiding") setPresiding(value);
    if (key === "conducting") setConducting(value);
    if (key === "type") setMeetingType(value);

    updateSearchParams(nextFilters);
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-emerald-900">
        Search Meetings
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="speaker"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Speaker
          </label>
          <input
            id="speaker"
            type="search"
            value={speaker}
            onChange={(event) =>
              handleChange("speaker", event.target.value)
            }
            placeholder="Search speaker"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Presiding
          </label>
          <input
            id="presiding"
            type="search"
            value={presiding}
            onChange={(event) =>
              handleChange("presiding", event.target.value)
            }
            placeholder="Search presiding"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Conducting
          </label>
          <input
            id="conducting"
            type="search"
            value={conducting}
            onChange={(event) =>
              handleChange("conducting", event.target.value)
            }
            placeholder="Search conducting"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Meeting Type
          </label>
          <select
            id="type"
            value={meetingType}
            onChange={(event) =>
              handleChange("type", event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          >
            <option value="">All types</option>
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
        </div>
      </div>
    </div>
  );
}
