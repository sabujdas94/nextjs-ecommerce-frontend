import Link from 'next/link';
import { Building2, Users, Package, TrendingUp, ArrowRight } from 'lucide-react';

export default function CorporateBanner() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                For Businesses
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Corporate & Bulk Orders
            </h2>
            
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              We serve custom branding needs from the top brands worldwide at unbeatable wholesale prices.
              With no minimum orders, everyone can enjoy the benefits of buying bulk t-shirts without ordering bulk quantities.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Users className="text-yellow-400 mb-2" size={32} />
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-100">Partner Brands</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Package className="text-yellow-400 mb-2" size={32} />
                <div className="text-2xl font-bold">No Min</div>
                <div className="text-sm text-blue-100">Order Quantity</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/corporate"
                className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-2xl hover:scale-105"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact-us"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center justify-center hover:scale-105"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Building2 className="text-yellow-400 mb-3" size={40} />
              <h3 className="text-xl font-bold mb-2">Custom Branding</h3>
              <p className="text-blue-100">Professional logo printing and embroidery services for your brand</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <TrendingUp className="text-yellow-400 mb-3" size={40} />
              <h3 className="text-xl font-bold mb-2">Wholesale Pricing</h3>
              <p className="text-blue-100">Unbeatable prices for bulk orders with volume discounts</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Package className="text-yellow-400 mb-3" size={40} />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-blue-100">Quick turnaround times with worldwide shipping available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
