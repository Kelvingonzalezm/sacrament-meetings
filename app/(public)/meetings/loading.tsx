export default function Loading() {
  return (
    <div
      className="flex items-center justify-center py-16"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-800" />
        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading meetings...
        </p>
      </div>
    </div>
  );
}