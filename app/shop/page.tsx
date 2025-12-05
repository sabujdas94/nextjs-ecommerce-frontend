'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { SlidersHorizontal, Search } from 'lucide-react';

type ApiProduct = {
  // API now returns `url` instead of `id`.
  // `url` should be a string identifier or slug used to build product links.
  url: string;
  name: string;
  price: string; // e.g. "৳485"
  comparePrice?: string; // e.g. "৳640"
  collections?: string[];
  tags?: string[];
  thumbnail?: string;
};

function parsePriceString(s?: string) {
  if (!s) return 0;
  const digits = s.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Require environment variable for API base URL (exposed to client via NEXT_PUBLIC_)
        const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!envBase) {
          setError('Missing NEXT_PUBLIC_API_BASE_URL environment variable');
          setProducts([]);
          setLoading(false);
          return;
        }
        const API_BASE = envBase.replace(/\/$/, '');
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setProducts(json.data || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>(['all', 'New Arrival']);
    for (const p of products) {
      if (p.collections && p.collections.length) cats.add(p.collections[0]);
    }
    return Array.from(cats);
  }, [products]);

  // Map API products to UI product shape used by ProductGrid/ProductCard
  const uiProducts = useMemo(() => {
    return products.map(p => ({
      // map API `url` to UI `id` used for building product links
      id: String(p.url),
      name: p.name,
      price: parsePriceString(p.price),
      originalPrice: p.comparePrice ? parsePriceString(p.comparePrice) : undefined,
      image: p.thumbnail || '',
      category: (p.collections && p.collections.length) ? p.collections[0] : (p.tags && p.tags.some(t => /new arrival/i.test(t)) ? 'New Arrival' : undefined)
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return uiProducts.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

      if (priceRange !== 'all') {
        const price = product.price;
        if (priceRange === '0-500' && !(price >= 0 && price <= 500)) return false;
        if (priceRange === '500-1000' && !(price > 500 && price <= 1000)) return false;
        if (priceRange === '1000-1500' && !(price > 1000 && price <= 1500)) return false;
        if (priceRange === '1500+' && !(price > 1500)) return false;
      }

      return true;
    });
  }, [uiProducts, selectedCategory, priceRange, searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
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
                        className="mr-2"
                      />
                      <span className="text-sm">{cat === 'all' ? 'All Products' : cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Prices</option>
                  <option value="0-500">৳ 0 - ৳ 500</option>
                  <option value="500-1000">৳ 500 - ৳ 1000</option>
                  <option value="1000-1500">৳ 1000 - ৳ 1500</option>
                  <option value="1500+">৳ 1500+</option>
                </select>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg font-medium transition"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
               <div className="flex items-center gap-2 text-sm text-gray-500">
                 <a href="/" className="hover:text-black">Home</a>
                 <span>/</span>
                 <span className="text-black font-medium">Shop</span>
               </div>
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

            <div className="mb-4 text-gray-600">
              {loading && 'Loading products...'}
              {error && <span className="text-red-500">{error}</span>}
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
