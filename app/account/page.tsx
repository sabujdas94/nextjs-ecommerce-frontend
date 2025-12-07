'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/AccountSidebar';
import { 
  User as UserIcon, 
  Package, 
  MapPin
} from 'lucide-react';

// Mock Data Types
interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
  total: number;
  items: number;
}

// Mock Data
const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7352', date: 'Oct 24, 2023', status: 'Delivered', total: 125.00, items: 3 },
  { id: '#ORD-7351', date: 'Sep 12, 2023', status: 'Processing', total: 45.50, items: 1 },
  { id: '#ORD-7350', date: 'Aug 05, 2023', status: 'Cancelled', total: 200.00, items: 4 },
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
              Hello <span className="font-semibold text-gray-900">{user.name}</span> 
            </p>
            <p className="text-gray-600">
              From your account dashboard you can view your <button onClick={() => router.push('/account/my-orders')} className="text-black underline hover:text-gray-700">recent orders</button>, manage your <button onClick={() => router.push('/account/addresses')} className="text-black underline hover:text-gray-700">shipping and billing addresses</button>, and <button onClick={() => setActiveTab('details')} className="text-black underline hover:text-gray-700">edit your password and account details</button>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/account/my-orders')}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <Package size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Orders</h3>
                <p className="text-gray-500 text-sm">Check your order status and history</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/account/addresses')}>
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
          <AccountSidebar
            user={user}
            activeSection={activeTab === 'dashboard' ? 'dashboard' : activeTab === 'details' ? 'details' : 'dashboard'}
            onLogout={handleLogout}
          />

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
