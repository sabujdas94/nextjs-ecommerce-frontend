'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cart, isLoading, error, updateQuantity, removeItem, clearCart } = useCart();

  const handleUpdateQuantity = async (lineId: number, newQuantity: number) => {
    try {
      await updateQuantity(lineId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (lineId: number) => {
    try {
      await removeItem(lineId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
    }
  };

  // Parse price strings to numbers for calculations
  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  if (isLoading && !cart) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          {cart && cart.lines_count > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!cart || cart.lines_count === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {cart.lines.map((line) => (
                  <div key={line.id} className="flex gap-4 p-6 border-b last:border-b-0">
                    <img
                      src={line.product.thumbnail || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop'}
                      alt={line.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{line.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        SKU: {line.product.sku}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{line.unit_price}</span>
                        <span className="text-sm text-gray-600">× {line.quantity}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Subtotal: {line.sub_total}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => handleRemoveItem(line.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isLoading}
                      >
                        <Trash2 size={20} />
                      </button>
                      
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(line.id, Math.max(1, line.quantity - 1))}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          disabled={isLoading || line.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-medium">{line.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{cart.sub_total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{cart.tax_total}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{cart.total}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Currency: {cart.currency_code}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition mb-3 text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  href="/shop"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping
                </Link>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="px-3 py-2 border rounded text-xs font-medium">Cash on Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
