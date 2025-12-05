import { useState, useEffect } from 'react';

export type VariantOption = {
  name: string;
  values: Array<{ id: number; name: string }>;
};

export type VariantCombination = {
  variant_id: number;
  sku: string;
  price: string;
  stock: number;
  backorder: number;
  option_value_ids: number[];
  thumbnail: string;
};

export type ProductData = {
  url: string;
  name: string;
  description: string;
  specification: string;
  price: string;
  comparePrice: string;
  collections: Array<{ name: string; slug: string }>;
  tags: string[];
  variant_options: VariantOption[];
  variant_combinations: VariantCombination[];
  thumbnail: string;
  images: Array<{ path: string }>;
};

export function useProduct(id: string) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!envBase) {
          setError('Missing NEXT_PUBLIC_API_BASE_URL environment variable');
          setLoading(false);
          return;
        }
        
        const API_BASE = envBase.replace(/\/$/, '');
        const res = await fetch(`${API_BASE}/product/${id}`);
        
        if (!res.ok) throw new Error(`Failed to load product: ${res.status}`);
        
        const data: ProductData = await res.json();
        
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load product');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    loadProduct();
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}
