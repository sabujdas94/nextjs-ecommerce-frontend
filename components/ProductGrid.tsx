import ProductCard from './ProductCard';
import SkeletonProductCard from './SkeletonProductCard';
import { Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

export default function ProductGrid({ products, title, subtitle, loading = false }: ProductGridProps) {
  return (
    <section className="">
      <div className="">
        {title && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonProductCard key={`skeleton-${index}`} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
}
