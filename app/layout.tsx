import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLinks from "@/components/NavLinks";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and view sacrament meetings for Cochabamba Ward.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <Suspense
          fallback={
            <nav className="border-b border-emerald-100 bg-white">
              <div className="mx-auto flex max-w-6xl gap-5 px-6 py-3">
                <span>Home</span>
                <span>Meetings</span>
                <span>Current Meeting</span>
              </div>
            </nav>
          }
        >
          <NavLinks />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
