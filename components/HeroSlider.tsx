'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2025',
      subtitle: 'Hot Deals',
      description: 'Up to 50% OFF on selected items',
      cta: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 2,
      title: 'Premium Polo Collection',
      subtitle: 'New Arrivals',
      description: 'Discover our latest designer edition',
      cta: 'Explore',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 3,
      title: 'Corporate Solutions',
      subtitle: 'Bulk Orders',
      description: 'Custom branding for your business',
      cta: 'Get Quote',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c819e?w=1920&h=1080&fit=crop',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[5000ms]"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <div 
                  className={`inline-block bg-gradient-to-r ${slide.color} px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 shadow-lg transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {slide.subtitle}
                </div>
                <h2 
                  className={`text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  {slide.title}
                </h2>
                <p 
                  className={`text-xl md:text-2xl text-gray-200 mb-8 transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  {slide.description}
                </p>
                <div 
                  className={`flex flex-wrap gap-4 transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '800ms' }}
                >
                  <Link
                    href="/shop"
                    className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 inline-flex items-center gap-2 shadow-2xl hover:scale-105"
                  >
                    {slide.cta}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105">
                    <Play size={20} />
                    <span className="hidden sm:inline">Watch Video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-yellow-400 w-12 h-3'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
