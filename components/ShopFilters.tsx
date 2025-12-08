'use client';

import { SlidersHorizontal } from 'lucide-react';

interface ShopFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onClearFilters: () => void;
}

export default function ShopFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  onClearFilters,
}: ShopFiltersProps) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-lg p-6 sticky top-24 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={20} />
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2 accent-black"
                />
                <span className="text-sm">{cat === 'all' ? 'All Products' : cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onClearFilters}
            className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded-lg font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </aside>
  );
}