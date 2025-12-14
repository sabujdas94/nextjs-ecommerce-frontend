'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/AccountSidebar';
import { Edit2, Plus, MapPin } from 'lucide-react';
import { fetchAddresses, Address as ApiAddress } from '@/lib/api/address';

export default function MyAddressesPage() {
  const { user, isLoading, logout, addresses, addressesLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Addresses are provided by AuthContext (refreshAddresses is called on auth)

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
          <AccountSidebar
            user={user}
            activeSection="addresses"
            onLogout={handleLogout}
          />

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