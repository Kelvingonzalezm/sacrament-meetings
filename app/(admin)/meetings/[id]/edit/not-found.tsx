import Link from "next/link";

export default function NotFound() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-bold text-emerald-900">
                Meeting Not Found
            </h2>

            <p className="mt-3 text-gray-600">
                The meeting you are trying to edit does not exist.
            </p>

            <Link
                href="/meetings"
                className="mt-6 inline-block rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
                Return to Meetings
            </Link>
        </div>
    );
}
