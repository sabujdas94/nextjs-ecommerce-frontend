'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Premium Designer Edition Double PK Cotton Polo',
      price: 1260,
      originalPrice: 1600,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=200&h=200&fit=crop',
      quantity: 2,
      size: 'M',
      color: 'Black'
    },
    {
      id: '2',
      name: 'Classic Half Sleeve T-Shirt',
      price: 450,
      originalPrice: 650,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      quantity: 1,
      size: 'L',
      color: 'White'
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-6 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">৳ {item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ৳ {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                      
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100"
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
                    <span className="font-medium">৳ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `৳ ${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      🎉 You qualify for free shipping!
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>৳ {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-3">
                  Proceed to Checkout
                </button>
                
                <Link
                  href="/shop"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping
                </Link>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="px-3 py-2 border rounded text-xs font-medium">Visa</div>
                    <div className="px-3 py-2 border rounded text-xs font-medium">Mastercard</div>
                    <div className="px-3 py-2 border rounded text-xs font-medium">bKash</div>
                    <div className="px-3 py-2 border rounded text-xs font-medium">Nagad</div>
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
