export default function AdminLoading() {
  return (
    <div
      className="flex min-h-40 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-emerald-800">
        Loading...
      </p>
    </div>
  );
}
