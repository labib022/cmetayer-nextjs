export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-[#08203C]/15 border-t-[#08203C] animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}