'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, User as UserIcon, MapPin, LogOut, LayoutDashboard, ChevronRight, Edit2, Plus } from 'lucide-react';
import { fetchAddresses, Address as ApiAddress } from '@/lib/api/address';

export default function MyAddressesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<ApiAddress[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const fetchedAddresses = await fetchAddresses();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      } finally {
        setAddressesLoading(false);
      }
    };

    if (user) {
      loadAddresses();
    }
  }, [user]);

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
          <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
          <div className="text-sm text-gray-500 mt-2">
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => router.push('/account')}>My Account</span>
            <span className="mx-2">/</span>
            <span className="text-black">My Addresses</span>
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
                  className="w-full flex items-center gap-3 p-3 rounded-md text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <Package size={18} />
                  <span className="font-medium">Orders</span>
                </button>

                <button
                  className="w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 bg-black text-white"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span className="font-medium">Addresses</span>
                  </div>
                  <ChevronRight size={16} />
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
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Addresses</h2>
                  {/* <button className="flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700">
                    <Plus size={16} /> Add New Address
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addressesLoading ? (
                    <div className="col-span-full flex items-center justify-center py-20">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading addresses...</p>
                      </div>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                      <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
                      <p className="text-gray-600">You haven't added any addresses yet.</p>
                    </div>
                  ) : (
                    addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-lg">Address</h3>
                        </div>
                        <div className="text-gray-600 space-y-1 text-sm mb-6">
                          <p>{address.line_one}</p>
                          {address.line_two && <p>{address.line_two}</p>}
                          <p>{address.city}{address.state && `, ${address.state}`}, {address.postcode}</p>
                          {address.delivery_instructions && <p>Instructions: {address.delivery_instructions}</p>}
                        </div>
                        {/* <div className="flex gap-4">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                            <Edit2 size={14} /> Edit
                          </button>
                          <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                            Remove
                          </button>
                        </div> */}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}