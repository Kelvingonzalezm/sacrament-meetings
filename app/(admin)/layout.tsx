import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <section className="mx-auto max-w-6xl py-2">
      {children}
    </section>
  );
}
