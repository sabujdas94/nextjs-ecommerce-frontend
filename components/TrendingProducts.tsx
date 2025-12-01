'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { sampleProducts } from '@/lib/products';
import { Flame } from 'lucide-react';

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    { id: 'trending', label: 'Trending Now', icon: Flame },
    { id: 'new', label: 'New Arrivals', icon: null },
    { id: 'sale', label: 'On Sale', icon: null },
  ];

  // Filter products based on active tab
  const filteredProducts = sampleProducts.slice(0, 8);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-yellow-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 rounded-full text-white font-bold mb-4 shadow-lg">
            <Flame className="inline-block mr-2" size={20} />
            HOT DEALS
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4">
            Trending This Week
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the most popular items loved by our customers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 rounded-full p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.icon && <tab.icon className="inline-block mr-2" size={16} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${parseInt(product.id) * 50}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group bg-gradient-to-r from-slate-900 to-slate-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            View All Products
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
