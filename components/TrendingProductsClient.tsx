"use client";

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Flame } from 'lucide-react';
import type { ApiProduct } from '@/lib/homePageData';

function parsePrice(price?: string | null) {
  if (!price) return undefined;
  const num = price.replace(/[^0-9.-]+/g, '');
  const v = parseFloat(num);
  return Number.isNaN(v) ? undefined : v;
}

function mapApiToCard(p: ApiProduct) {
  return {
    id: p.url,
    name: p.name,
    // API already provides formatted price strings (e.g. "৳760"). Preserve that formatting.
    price: p.price ?? '',
    originalPrice: p.comparePrice ?? undefined,
    image: p.thumbnail ?? '',
    category:
      (p.collections && p.collections.length && p.collections[0].name) ||
      (p.tags && p.tags.length && p.tags[0]) ||
      undefined,
  };
}

export default function TrendingProductsClient({
  products,
}: {
  products: { trending: ApiProduct[]; new_arrivals: ApiProduct[]; on_sale: ApiProduct[] };
}) {
  type TabId = 'trending' | 'new' | 'sale';

  const [activeTab, setActiveTab] = useState<TabId>('trending');

  const tabs: { id: TabId; label: string; icon: any | null }[] = [
    { id: 'trending', label: 'Trending Now', icon: Flame },
    { id: 'new', label: 'New Arrivals', icon: null },
    { id: 'sale', label: 'On Sale', icon: null },
  ];

  const trending = (products.trending || []).map(mapApiToCard).slice(0, 8);
  const newArrivals = (products.new_arrivals || []).map(mapApiToCard).slice(0, 8);
  const onSale = (products.on_sale || []).map(mapApiToCard).slice(0, 8);

  const getActiveProducts = () => {
    if (activeTab === 'new') return newArrivals;
    if (activeTab === 'sale') return onSale;
    return trending;
  };

  const filteredProducts = getActiveProducts();

  return (
    <section className="py-20 bg-gradient-to-br from-white via-yellow-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 rounded-full text-white font-bold mb-4 shadow-lg">
            <Flame className="inline-block mr-2" size={20} />
            HOT DEALS
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4">Trending This Week</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover the most popular items loved by our customers</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 rounded-full p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  tab.id === activeTab
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={tab.id === activeTab}
              >
                {tab.icon && <tab.icon className="inline-block mr-2" size={16} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div key={product.id + idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button (crawlable link) */}
        <div className="text-center mt-12">
          <a href="/shop" className="group inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            View All Products
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
