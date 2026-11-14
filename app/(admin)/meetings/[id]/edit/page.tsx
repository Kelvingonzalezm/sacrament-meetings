export const instant = false;

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8">
      <h1 className="text-2xl font-bold text-emerald-900">
        Edit Meeting
      </h1>

      <p className="mt-3 text-gray-600">
        Meeting ID: {id}
      </p>

      <p className="mt-2 text-gray-600">
        Coming in Week 04
      </p>
    </div>
  );
}
