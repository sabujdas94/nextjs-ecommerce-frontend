export default function SkeletonProductCard() {
  return (
    <div className="group bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-gray-100 animate-pulse">
        <div className="w-full h-full bg-gray-200"></div>
      </div>
      <div className="p-4">
        <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  );
}