
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/current", label: "Current Meeting" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-emerald-100 bg-white"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-5 px-6 py-3">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/meetings" &&
              pathname.startsWith("/meetings/") &&
              pathname !== "/meetings/current");

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`text-sm font-semibold transition-colors ${isActive
                ? "text-emerald-800 underline underline-offset-4"
                : "text-gray-600 hover:text-emerald-700"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
