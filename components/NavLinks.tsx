
import Link from "next/link";

export default function NavLinks() {
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
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-emerald-700"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
