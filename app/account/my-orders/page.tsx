'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, User as UserIcon, MapPin, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';
import { getMyOrders } from '@/lib/api/orders';
import { Order } from '@/lib/types/order';

export default function MyOrdersPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await getMyOrders();
        setOrders(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getStatusColor = (statusLabel: string) => {
    if (!statusLabel) return 'bg-gray-100 text-gray-800';
    const status = statusLabel.toLowerCase();
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'waiting confirmation':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account')}>My Account</span>
            <span className="mx-2">/</span>
            <span className="text-black">My Orders</span>
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

                <button
                  onClick={() => router.push('/account')}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <UserIcon size={18} />
                  <span className="font-medium">Account Details</span>
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
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading orders...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 bg-red-50 rounded-lg">
                    <Package className="mx-auto h-12 w-12 text-red-400 mb-4" />
                    <p className="text-red-600">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 text-black underline font-medium hover:text-gray-700"
                    >
                      Try Again
                    </button>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-4 px-4 font-semibold text-gray-900">Order</th>
                          <th className="py-4 px-4 font-semibold text-gray-900">Date</th>
                          <th className="py-4 px-4 font-semibold text-gray-900">Status</th>
                          <th className="py-4 px-4 font-semibold text-gray-900">Total</th>
                          <th className="py-4 px-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-blue-600 font-medium">{order.reference}</td>
                            <td className="py-4 px-4 text-gray-600">{order.placed_at}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status_label)}`}>
                                {order.status_label}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-900 font-medium">{order.total} for {order.lines_count} item{order.lines_count > 1 ? 's' : ''}</td>
                            <td className="py-4 px-4">
                              <button 
                                onClick={() => router.push(`/account/my-orders/${order.id}`)}
                                className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No orders found.</p>
                    <button
                      onClick={() => router.push('/shop')}
                      className="mt-4 text-black underline font-medium hover:text-gray-700"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}