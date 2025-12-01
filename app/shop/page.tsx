'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { sampleProducts, newArrivals } from '@/lib/products';
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  
  const allProducts = [...sampleProducts, ...newArrivals];
  
  const categories = [
    'all',
    "Men's Polo",
    "Men's T-Shirt",
    "Men's Hoodie",
    "Men's Trouser",
    "Men's Accessories",
    'Sports',
    'New Arrival'
  ];

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shop All Products</h1>
        
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
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} products
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <a href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">৳ {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ৳ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
