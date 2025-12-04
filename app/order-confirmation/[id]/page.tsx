'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order. Your order has been successfully placed.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>
            <p className="text-gray-600">Order ID: <span className="font-mono font-semibold">#{orderId}</span></p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              You will receive an email confirmation shortly with your order details.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/shop"
                className="inline-block bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Continue Shopping
              </a>
              <a
                href="/"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}