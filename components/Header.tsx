'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Heart, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart?.lines_count || 0;

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <a href="tel:+8809677666888" className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                <Phone size={14} />
                <span className="hidden sm:inline">+8809677666888</span>
              </a>
              <a href="mailto:support@alnasirlifestyle.com" className="hidden md:flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                <Mail size={14} />
                <span>support@alnasirlifestyle.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:text-yellow-400 transition-colors">Track Order</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group inline-flex items-start">
            <img
              src="/images/alnasirlifestyle-logo.png"
              alt="alnasirlifestyle"
              width="auto"
              height={60}
              className="block object-contain max-h-[60px]"
            />
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <Link href="/shop?category=mens" className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group">
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/shop?category=womens" className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group">
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/shop?category=kids" className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group">
              Kids
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/shop?category=sports" className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group">
              Sports
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/corporate" className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group">
              Corporate
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/new-arrival" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors relative group">
              New Arrival
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700" />
            </button>

            {/* Wishlist - Desktop */}
            {/* <Link 
              href="/wishlist" 
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-gray-700" />
            </Link> */}

            {/* Account - Desktop */}
            <Link 
              href="/account" 
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Account"
            >
              <User size={20} className="text-gray-700" />
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products, categories..."
                autoFocus
                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <nav className="space-y-1">
              <Link 
                href="/shop?category=mens" 
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/shop?category=womens" 
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                href="/shop?category=kids" 
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kids
              </Link>
              <Link 
                href="/shop?category=sports" 
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
              <Link 
                href="/corporate" 
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Corporate
              </Link>
              <Link 
                href="/new-arrival" 
                className="block py-3 px-4 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrival
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link 
                  href="/wishlist" 
                  className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link 
                  href="/account" 
                  className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
