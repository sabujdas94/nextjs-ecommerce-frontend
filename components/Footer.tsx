import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Mail size={16} className="text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">Newsletter</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Get Special Discounts
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about new arrivals and exclusive offers!
            </p>
            <div className="flex gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 font-medium"
              />
              <button className="bg-white hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2">
                <Send size={18} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-b border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-bold text-white mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-400">All payment methods</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-green-500/50 transition-shadow">
                <span className="text-2xl">✓</span>
              </div>
              <h4 className="font-bold text-white mb-1">Quality Guaranteed</h4>
              <p className="text-sm text-gray-400">Premium materials</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                <span className="text-2xl">👕</span>
              </div>
              <h4 className="font-bold text-white mb-1">Long Lasting</h4>
              <p className="text-sm text-gray-400">Test of time</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-orange-500/50 transition-shadow">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="font-bold text-white mb-1">Worldwide</h4>
              <p className="text-sm text-gray-400">Global delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src="/images/logo.png" alt="Fabrilife" width={180} height={50} className="object-contain max-h-[50px]" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium quality clothing made with love from Bangladesh. We print a huge variety of custom clothing and deliver worldwide.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <Phone className="text-blue-400 shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-semibold text-white">+8809677666888</div>
                  <div className="text-sm text-gray-400">24/7 Support</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-purple-400 shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-semibold text-white">support@fabrilife.com</div>
                  <div className="text-sm text-gray-400">Quick response</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-pink-400 shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-semibold text-white">Dhaka, Bangladesh</div>
                  <div className="text-sm text-gray-400">Made with ❤️</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://www.facebook.com/fabrilife" target="_blank" rel="noopener noreferrer" className="bg-slate-700 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/fabrilife" target="_blank" rel="noopener noreferrer" className="bg-slate-700 hover:bg-sky-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50">
                <Twitter size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCLooFQFh-FJvbMKIBXQszxQ" target="_blank" rel="noopener noreferrer" className="bg-slate-700 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/fabrilife" target="_blank" rel="noopener noreferrer" className="bg-slate-700 hover:bg-pink-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Contact Us</Link></li>
              <li><Link href="/outlets" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Store Locations</Link></li>
              <li><Link href="/corporate" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Corporate</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">FAQs</Link></li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop?cat=mens-short-sleeve" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Men's T-Shirts</Link></li>
              <li><Link href="/shop?cat=mens-polo" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Polo Shirts</Link></li>
              <li><Link href="/shop?cat=mens-hoodie" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Hoodies</Link></li>
              <li><Link href="/shop?cat=kids" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Kids Collection</Link></li>
              <li><Link href="/new-arrival" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                FABRILIFE prints custom clothing with ❤️ from <span className="text-green-400 font-semibold">BANGLADESH</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                © 2018-2025 Fabrilife Limited. All Rights Reserved
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-slate-700 px-4 py-2 rounded-lg text-xs font-medium">Visa</div>
              <div className="bg-slate-700 px-4 py-2 rounded-lg text-xs font-medium">Mastercard</div>
              <div className="bg-slate-700 px-4 py-2 rounded-lg text-xs font-medium">bKash</div>
              <div className="bg-slate-700 px-4 py-2 rounded-lg text-xs font-medium">Nagad</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
