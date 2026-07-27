export default function DashboardLoading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-4 border-[#08203C]/15 border-t-[#08203C] animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}