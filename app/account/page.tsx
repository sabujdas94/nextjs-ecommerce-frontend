'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  LogOut, 
  LayoutDashboard,
  ChevronRight,
  Edit2,
  Plus
} from 'lucide-react';

// Mock Data Types
interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
  total: number;
  items: number;
}

interface Address {
  id: string;
  type: 'Billing' | 'Shipping';
  name: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// Mock Data
const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7352', date: 'Oct 24, 2023', status: 'Delivered', total: 125.00, items: 3 },
  { id: '#ORD-7351', date: 'Sep 12, 2023', status: 'Processing', total: 45.50, items: 1 },
  { id: '#ORD-7350', date: 'Aug 05, 2023', status: 'Cancelled', total: 200.00, items: 4 },
];

const MOCK_ADDRESSES: Address[] = [
  { 
    id: '1', 
    type: 'Shipping', 
    name: 'John Doe', 
    street: '123 Fashion Street, Apt 4B', 
    city: 'New York', 
    zip: '10001', 
    country: 'United States',
    isDefault: true 
  },
  { 
    id: '2', 
    type: 'Billing', 
    name: 'John Doe', 
    street: '456 Corporate Blvd', 
    city: 'New York', 
    zip: '10002', 
    country: 'United States',
    isDefault: false 
  },
];

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

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
            <p className="mt-4 text-gray-600">Loading account details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">
              Hello <span className="font-semibold text-gray-900">{user.name}</span> (not {user.name}? <button onClick={handleLogout} className="text-black underline hover:text-gray-700">Log out</button>)
            </p>
            <p className="text-gray-600">
              From your account dashboard you can view your <button onClick={() => router.push('/account/my-orders')} className="text-black underline hover:text-gray-700">recent orders</button>, manage your <button onClick={() => setActiveTab('addresses')} className="text-black underline hover:text-gray-700">shipping and billing addresses</button>, and <button onClick={() => setActiveTab('details')} className="text-black underline hover:text-gray-700">edit your password and account details</button>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/account/my-orders')}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <Package size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Orders</h3>
                <p className="text-gray-500 text-sm">Check your order status and history</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('addresses')}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                  <MapPin size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Addresses</h3>
                <p className="text-gray-500 text-sm">Manage shipping and billing addresses</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('details')}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                  <UserIcon size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Account Details</h3>
                <p className="text-gray-500 text-sm">Update your profile and password</p>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            {MOCK_ORDERS.length > 0 ? (
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
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-blue-600 font-medium">{order.id}</td>
                        <td className="py-4 px-4 text-gray-600">{order.date}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-medium">${order.total.toFixed(2)} for {order.items} item{order.items > 1 ? 's' : ''}</td>
                        <td className="py-4 px-4">
                          <button className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
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
                <button className="mt-4 text-black underline font-medium hover:text-gray-700">Start Shopping</button>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Addresses</h2>
              <button className="flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700">
                <Plus size={16} /> Add New Address
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ADDRESSES.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{address.type} Address</h3>
                    {address.isDefault && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                  <div className="text-gray-600 space-y-1 text-sm mb-6">
                    <p className="font-medium text-gray-900">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.zip}</p>
                    <p>{address.country}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
              <form className="space-y-6 max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name.split(' ')[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name.split(' ').slice(1).join(' ')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be how your name will be displayed in the account section and in reviews.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Password Change</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Breadcrumb / Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span className="hover:text-black cursor-pointer">Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-black">My Account</span>
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
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${activeTab === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard size={18} />
                    <span className="font-medium">Dashboard</span>
                  </div>
                  {activeTab === 'dashboard' && <ChevronRight size={16} />}
                </button>
                
                <button 
                  onClick={() => router.push('/account/my-orders')}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span className="font-medium">Orders</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${activeTab === 'addresses' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span className="font-medium">Addresses</span>
                  </div>
                  {activeTab === 'addresses' && <ChevronRight size={16} />}
                </button>

                <button 
                  onClick={() => setActiveTab('details')}
                  className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${activeTab === 'details' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <UserIcon size={18} />
                    <span className="font-medium">Account Details</span>
                  </div>
                  {activeTab === 'details' && <ChevronRight size={16} />}
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
