'use client';

import { useEffect, useMemo, useState } from 'react';

type ApiProduct = {
  url: string;
  name: string;
  price: string;
  comparePrice?: string;
  collections?: string[];
  tags?: string[];
  thumbnail?: string;
};

type UiProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
};

function parsePriceString(s?: string) {
  if (!s) return 0;
  const digits = s.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function useShopProducts() {
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

  const uiProducts = useMemo(() => {
    return products.map(p => ({
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

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
  };

  return {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    products: filteredProducts,
    categories,
    loading,
    error,
    clearFilters,
  };
}