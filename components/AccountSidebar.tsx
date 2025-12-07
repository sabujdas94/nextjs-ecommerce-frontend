'use client';

import Link from 'next/link';
import { User as UserIcon, Package, MapPin, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';

interface AccountSidebarProps {
  user: {
    name: string;
    email: string;
  };
  activeSection: 'dashboard' | 'orders' | 'addresses' | 'details';
  onLogout: () => void;
}

export default function AccountSidebar({ user, activeSection, onLogout }: AccountSidebarProps) {
  return (
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
          <Link href="/account">
            <button
              className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${
                activeSection === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={18} />
                <span className="font-medium">Dashboard</span>
              </div>
              {activeSection === 'dashboard' && <ChevronRight size={16} />}
            </button>
          </Link>

          <Link href="/account/my-orders">
            <button
              className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${
                activeSection === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={18} />
                <span className="font-medium">Orders</span>
              </div>
              {activeSection === 'orders' && <ChevronRight size={16} />}
            </button>
          </Link>

          <Link href="/account/addresses">
            <button
              className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${
                activeSection === 'addresses' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span className="font-medium">Addresses</span>
              </div>
              {activeSection === 'addresses' && <ChevronRight size={16} />}
            </button>
          </Link>

          <Link href="/account">
            <button
              className={`w-full flex items-center justify-between p-3 rounded-md transition-colors mb-1 ${
                activeSection === 'details' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserIcon size={18} />
                <span className="font-medium">Account Details</span>
              </div>
              {activeSection === 'details' && <ChevronRight size={16} />}
            </button>
          </Link>

          <div className="my-2 border-t border-gray-100"></div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}