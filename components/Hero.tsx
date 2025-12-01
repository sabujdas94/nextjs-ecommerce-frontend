'use client';

import Link from 'next/link';
import { ChevronRight, Truck, Award, Shield, Headphones } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-block">
                <span className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Premium Quality Since 2018
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                Fashion That
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Speaks You
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 max-w-xl">
                Premium quality clothing made with love. Cozy, comfortable, and lasts the test of time. Delivered worldwide from Bangladesh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/shop"
                  className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                >
                  Shop Now
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/corporate"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:scale-105"
                >
                  Corporate Orders
                </Link>
              </div>
            </div>

            {/* Right Image/Visual */}
            <div className="relative hidden md:block">
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-black text-yellow-400">1000+</div>
                      <div className="text-sm text-blue-100 mt-2">Partner Brands</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-black text-yellow-400">50K+</div>
                      <div className="text-sm text-blue-100 mt-2">Happy Customers</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-black text-yellow-400">24/7</div>
                      <div className="text-sm text-blue-100 mt-2">Support Available</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-black text-yellow-400">100K+</div>
                      <div className="text-sm text-blue-100 mt-2">Products Sold</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">Free Shipping</div>
                <div className="text-xs text-gray-600">Orders over ৳1000</div>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Award className="text-green-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">Premium Quality</div>
                <div className="text-xs text-gray-600">Guaranteed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="text-purple-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">Secure Payment</div>
                <div className="text-xs text-gray-600">100% Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Headphones className="text-orange-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">24/7 Support</div>
                <div className="text-xs text-gray-600">Always Here</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
