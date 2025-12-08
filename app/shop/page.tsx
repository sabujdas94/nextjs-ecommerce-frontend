'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContentLayout from '@/components/PageContentLayout';
import ProductGrid from '@/components/ProductGrid';
import ShopFilters from '@/components/ShopFilters';
import { useShopProducts } from '@/hooks/useShop';

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
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    products,
    categories,
    loading,
    error,
    clearFilters,
  } = useShopProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Shop</span>
        </nav>
      </div>

      <PageContentLayout>
        <div className="flex flex-col md:flex-row gap-8">
          <ShopFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClearFilters={clearFilters}
          />

          <div className="flex-1">
            {error && !loading && <div className="mb-4 text-red-500">{error}</div>}
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </PageContentLayout>

      <Footer />
    </main>
  );
}
