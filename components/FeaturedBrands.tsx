'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PartnerData {
  id: number;
  name: string;
  logo: string;
  website_url: string | null;
  sort_order: number;
}

interface FeaturedBrandsProps {
  partners: PartnerData[];
}

export default function FeaturedBrands({ partners }: FeaturedBrandsProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const brands = partners.length > 0 ? partners
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(partner => ({
      name: partner.name,
      logo: partner.logo
    })) : [
    // Fallback hardcoded brands
    { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop' },
    { name: 'Adidas', logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop' },
    { name: 'Puma', logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=100&fit=crop' },
    { name: 'Under Armour', logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=100&fit=crop' },
    { name: 'Reebok', logo: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=100&fit=crop' },
    { name: 'New Balance', logo: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=100&fit=crop' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Trusted By Leading Brands
          </h2>
          <p className="text-gray-600 text-lg">
            Official partners and authorized retailers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative h-24 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-110 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all duration-300" />
              <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300 px-6">
                <Image
                  src={imageErrors.has(brand.logo) ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop' : brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain w-full h-auto"
                  onError={() => {
                    setImageErrors(prev => new Set([...prev, brand.logo]));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
