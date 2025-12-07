'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, User as UserIcon, MapPin, LogOut, LayoutDashboard, ChevronRight, ArrowLeft } from 'lucide-react';
import { getOrder } from '@/lib/api/orders';
import { OrderDetail } from '@/lib/types/order';

export default function OrderAddressesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !params.id) return;

      try {
        setLoading(true);
        const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, params.id]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20 min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Breadcrumb / Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Order Addresses</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account')}>My Account</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account/my-orders')}>My Orders</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push(`/account/my-orders/${params.id}`)}>Order {order?.reference}</span>
            <span className="mx-2">/</span>
            <span className="text-black">Addresses</span>
          </div>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Hello,</p>
                    <p className="font-bold text-gray-900 truncate max-w-[150px]">{user.name}</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => router.push('/account')}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <LayoutDashboard size={18} />
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => router.push('/account/my-orders')}
                  className="w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 bg-black text-white"
                >
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span className="font-medium">Orders</span>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => router.push('/account')}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <MapPin size={18} />
                  <span className="font-medium">Addresses</span>
                </button>

                <div className="my-2 border-t border-gray-100"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading addresses...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-red-50 rounded-lg">
                  <Package className="mx-auto h-12 w-12 text-red-400 mb-4" />
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => router.push(`/account/my-orders/${params.id}`)}
                    className="mt-4 text-black underline font-medium hover:text-gray-700"
                  >
                    Back to Order
                  </button>
                </div>
              ) : order ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Order Addresses</h2>
                    <button 
                      onClick={() => router.push(`/account/my-orders/${params.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back to Order
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {order.shipping_address && (
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <MapPin size={18} className="text-gray-500" />
                          Shipping Address
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium text-gray-900">{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                          <p>{order.shipping_address.line_one}</p>
                          {order.shipping_address.line_two && <p>{order.shipping_address.line_two}</p>}
                          {order.shipping_address.line_three && <p>{order.shipping_address.line_three}</p>}
                          <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postcode}</p>
                          <p>{order.shipping_address.country}</p>
                          {order.shipping_address.contact_phone && <p className="mt-2">Phone: {order.shipping_address.contact_phone}</p>}
                        </div>
                      </div>
                    )}
                    
                    {order.billing_address && (
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <UserIcon size={18} className="text-gray-500" />
                          Billing Address
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium text-gray-900">{order.billing_address.first_name} {order.billing_address.last_name}</p>
                          <p>{order.billing_address.line_one}</p>
                          {order.billing_address.line_two && <p>{order.billing_address.line_two}</p>}
                          {order.billing_address.line_three && <p>{order.billing_address.line_three}</p>}
                          <p>{order.billing_address.city}, {order.billing_address.state} {order.billing_address.postcode}</p>
                          <p>{order.billing_address.country}</p>
                          {order.billing_address.contact_phone && <p className="mt-2">Phone: {order.billing_address.contact_phone}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}