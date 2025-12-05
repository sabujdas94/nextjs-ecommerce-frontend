export default function CheckoutSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Skeleton */}
      <div className="animate-pulse h-10 bg-gray-200 rounded w-48 mb-8"></div>

      <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Selection Skeleton */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-6 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                      <div className="h-16 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          {/* Delivery Address Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 gap-4">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* Payment Method Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="p-4 border-2 border-gray-300 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>

            {/* Coupon Code Skeleton */}
            <div className="mb-4 pb-4 border-b">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
                <div className="h-10 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Cart Items Skeleton */}
            <div className="space-y-3 mb-4 max-h-64">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Skeleton */}
            <div className="border-t pt-4 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t">
                <div className="h-5 bg-gray-200 rounded w-12"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg mt-6"></div>

            {/* Terms Skeleton */}
            <div className="mt-4 space-y-1">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}