"use client";

import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AdminError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Admin route error:", error);
    }, [error]);

    return (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-bold text-red-800">
                Something went wrong
            </h2>

            <p className="mt-3 text-gray-600">
                An unexpected error occurred. Please try again.
            </p>

            <button
                onClick={() => reset()}
                className="mt-6 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
                Try Again
            </button>
        </div>
    );
}
