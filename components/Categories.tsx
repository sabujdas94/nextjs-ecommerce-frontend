'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

interface CategoryData {
  attribute_data: string;
  slug: string;
  thumbnail: string;
  children: Array<{
    name: string;
    slug: string;
  }>;
}

interface CategoriesProps {
  categories: CategoryData[];
}

export default function Categories({ categories }: CategoriesProps) {
  const processedCategories = categories
    .filter(cat => cat.thumbnail) // Only show categories with thumbnails
    .map(cat => ({
      name: cat.attribute_data,
      href: `/shop?category=${cat.slug}`,
      image: cat.thumbnail,
      color: 'from-blue-500 to-cyan-500', // Default color, could be customized
      subcategories: cat.children.map(child => ({
        name: child.name,
        href: `/shop?category=${cat.slug}&subcategory=${child.slug}`
      }))
    }));

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredCategory(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our premium collection of clothing designed for comfort and style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {processedCategories.map((category) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={category.href}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-125"
                  unoptimized
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                  <h3 className="font-bold text-sm md:text-base text-center mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white text-slate-900 rounded-full p-2">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </Link>

              {/* Subcategories Dropdown */}
              {hoveredCategory === category.name && category.subcategories.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 z-50 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                    <ChevronDown size={14} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase">Subcategories</span>
                  </div>
                  <div className="space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
