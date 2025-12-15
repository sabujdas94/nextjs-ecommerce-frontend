import Link from 'next/link';
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  // price may come pre-formatted from the API (e.g. "৳760") or as a number
  price: string | number;
  originalPrice?: string | number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, category }: ProductCardProps) {
  // Helper to parse price for calculations
  const parsePrice = (p: string | number): number => {
    if (typeof p === 'number') return p;
    // Remove non-numeric characters except decimal point
    const numericString = p.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };

  const currentPrice = parsePrice(price);
  const oldPrice = originalPrice ? parsePrice(originalPrice) : 0;
  const hasDiscount = oldPrice > currentPrice;
  const discountPercentage = hasDiscount ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;
  const savings = hasDiscount ? oldPrice - currentPrice : 0;

  const formatPrice = (p: string | number) => {
    if (typeof p === 'number') return `৳${p.toLocaleString()}`;
    return p;
  };

  return (
    <div className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-black hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg">
            -{discountPercentage}% OFF
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          {/* <button className="bg-white hover:bg-red-500 hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
            <Heart size={18} />
          </button> */}
          <Link href={`/product/${id}`} className="bg-white hover:bg-blue-500 hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
            <Eye size={18} />
          </Link>
        </div>

        {/* Product Image */}
        <Link href={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            alt={name}
            loading="lazy"
            decoding="async"
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 w-full h-full"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {category && <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{category}</p>}
          <Link href={`/product/${id}`}>
            <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">{name}</h3>
          </Link>
          
          {/* Rating Stars - Placeholder */}
          {/* <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4].map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <Star size={14} className="text-gray-300" />
            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
          </div> */}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{formatPrice(price)}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice!)}</span>
              )}
            </div>
            {hasDiscount && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Save ৳{savings.toLocaleString()}</span>
            )}
          </div>

          {/* <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
            <ShoppingCart size={18} />
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
}
