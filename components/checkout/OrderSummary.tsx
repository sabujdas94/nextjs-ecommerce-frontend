'use client';

import { Cart, CartLine } from '@/lib/types/cart';

interface OrderSummaryProps {
  cart: Cart | null;
  couponCode: string;
  setCouponCode: (code: string) => void;
  isLoading: boolean;
}

export default function OrderSummary({
  cart,
  couponCode,
  setCouponCode,
  isLoading,
}: OrderSummaryProps) {
  const formatPrice = (price: string) => price.replace('BDT ', '');

  if (!cart) return null;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Coupon Code */}
        <div className="mb-4 pb-4 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="button"
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {cart.lines.map((line: CartLine) => (
            <div key={line.id} className="flex gap-3 pb-3 border-b last:border-b-0">
              <img
                src={line.product.thumbnail || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'}
                alt={line.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{line.product.name}</p>
                <p className="text-xs text-gray-500">SKU: {line.product.sku}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-600">Qty: {line.quantity}</span>
                  <span className="text-sm font-semibold">{formatPrice(line.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(cart.sub_total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{formatPrice(cart.shipping_total || 'BDT 0')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium">-{formatPrice(cart.discount_total || 'BDT 0')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatPrice(cart.tax_total)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t">
            <span>Total</span>
            <span className="text-black">{formatPrice(cart.total)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold mt-6 transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By placing your order, you agree to our{' '}
          <a href="/terms-and-conditions" className="text-black hover:underline">Terms and Conditions</a>,{' '}
          <a href="/refund-policy" className="text-black hover:underline">Refund Policy</a> and{' '}
          <a href="/privacy-policy" className="text-black hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}