'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, User as UserIcon, MapPin, LogOut, LayoutDashboard, ChevronRight, ArrowLeft } from 'lucide-react';
import { getOrder } from '@/lib/api/orders';
import { OrderDetail } from '@/lib/types/order';

export default function OrderDetailPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account')}>My Account</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account/my-orders')}>My Orders</span>
            <span className="mx-2">/</span>
            <span className="text-black">{order?.reference || 'Order Details'}</span>
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
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-red-50 rounded-lg">
                  <Package className="mx-auto h-12 w-12 text-red-400 mb-4" />
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => router.push('/account/my-orders')}
                    className="mt-4 text-black underline font-medium hover:text-gray-700"
                  >
                    Back to Orders
                  </button>
                </div>
              ) : order ? (
                <div className="space-y-8">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{order.reference}</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status_label)}`}>
                          {order.status_label}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">Placed on {new Date(order.placed_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => router.push('/account/my-orders')}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Back to List
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="py-3 px-4 font-semibold text-gray-900">Product</th>
                            <th className="py-3 px-4 font-semibold text-gray-900">Price</th>
                            <th className="py-3 px-4 font-semibold text-gray-900">Quantity</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.lines?.filter(item => item.type !== 'shipping').map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-4">
                                  {(item.product?.thumbnail || item.thumbnail) ? (
                                    <Image 
                                      src={(item.product?.thumbnail || item.thumbnail)!} 
                                      alt={item.product?.name || item.product_name || 'Product'} 
                                      width={64} 
                                      height={64} 
                                      className="object-cover rounded-md border border-gray-200" 
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="w-16 h-16 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400">
                                      <Package size={24} />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {item.product?.name || item.product_name || item.description || 'Product Unavailable'}
                                    </p>
                                    {item.product?.sku && (
                                      <p className="text-xs text-gray-500 mt-1">SKU: {item.product.sku}</p>
                                    )}
                                    {item.variant_name && (
                                      <p className="text-xs text-gray-500 mt-1">{item.variant_name}</p>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-600">{item.unit_price}</td>
                              <td className="py-4 px-4 text-gray-600">{item.quantity}</td>
                              <td className="py-4 px-4 text-gray-900 font-medium text-right">{item.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Order Summary & Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Addresses */}
                    <div className="space-y-6">
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

                    {/* Order Totals */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit">
                      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>{order.sub_total}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span>{order.shipping_total}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax</span>
                          <span>{order.tax_total}</span>
                        </div>
                        {order.discount_total && (
                          <div className="flex justify-between text-gray-600">
                            <span>Discount</span>
                            <span>-{order.discount_total}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900">
                          <span>Total</span>
                          <span>{order.total}</span>
                        </div>
                      </div>
                    </div>
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