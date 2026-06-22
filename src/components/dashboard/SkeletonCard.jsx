export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24"></div>

      <div className="h-8 bg-gray-200 rounded w-20 mt-4"></div>
    </div>
  );
}