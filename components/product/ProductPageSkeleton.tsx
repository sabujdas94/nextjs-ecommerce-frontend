export default function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Product Content Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div>
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Price */}
            <div className="h-10 bg-gray-200 rounded w-40 mb-4"></div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Variants Skeleton */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions Skeleton */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
                <div className="h-12 flex-1 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
