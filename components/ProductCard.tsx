import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, category }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg">
          -{discount}% OFF
        </div>
      )}

      {/* Quick Actions - Show on Hover */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <button className="bg-white hover:bg-red-500 hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
          <Heart size={18} />
        </button>
        <Link href={`/product/${id}`} className="bg-white hover:bg-blue-500 hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
          <Eye size={18} />
        </Link>
      </div>

      {/* Product Image */}
      <Link href={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        {category && (
          <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{category}</p>
        )}
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.0)</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">৳{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">৳{originalPrice.toLocaleString()}</span>
            )}
          </div>
          {discount > 0 && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
              Save ৳{(originalPrice! - price).toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:shadow-blue-500/50">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      {/* New Badge */}
      {category === 'New Arrival' && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          NEW
        </div>
      )}
    </div>
  );
}
