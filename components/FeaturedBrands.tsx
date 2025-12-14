'use client';

import Image from 'next/image';

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

  // Render only real partners; do not use sample/fallback brands
  const brands: PartnerData[] = partners.sort((a, b) => a.sort_order - b.sort_order);

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
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group relative h-24 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-110 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all duration-300" />
              <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300 px-6">
                {brand.website_url ? (
                  <a href={brand.website_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={60}
                      className="object-contain w-full h-auto"
                      unoptimized
                    />
                  </a>
                ) : (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="object-contain w-full h-auto"
                    unoptimized
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
