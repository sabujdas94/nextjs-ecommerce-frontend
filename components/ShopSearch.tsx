'use client';

import { Search } from 'lucide-react';

interface ShopSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ShopSearch({ searchQuery, setSearchQuery }: ShopSearchProps) {
  return (
    <div className="flex justify-end mb-6">
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-black"
        />
        <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}