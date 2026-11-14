import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: {
    speaker?: string;
    presiding?: string;
    conducting?: string;
    type?: string;
  };
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  function getPageUrl(page: number) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `/meetings?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Meeting pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-600" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Next
        </span>
      )}
    </nav>
  );
}
