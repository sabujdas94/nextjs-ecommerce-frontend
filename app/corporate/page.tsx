import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, Users, Package, Headphones, Star } from 'lucide-react';
import Link from 'next/link';

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Corporate & Bulk Orders</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            We serve custom branding needs from the top brands worldwide at unbeatable wholesale prices.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
            Request a Quote
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us for Corporate Orders?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">No Minimum Orders</h3>
              <p className="text-gray-600">
                Order as much or as little as you need. No minimum quantity requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1000+ Partners</h3>
              <p className="text-gray-600">
                Trusted by over a thousand brands and organizations worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and printing for professional results.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
              <p className="text-gray-600">
                24/7 customer support for all your corporate needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Corporate Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Custom Branding</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Logo printing and embroidery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Custom designs and artwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Multiple printing techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Color matching services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Bulk Orders</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Wholesale pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Volume discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Fast turnaround times</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Worldwide shipping</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Event Merchandise</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Conference and seminar merchandise</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Sports team uniforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Festival and concert apparel</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Promotional giveaways</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Team Uniforms</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Company uniforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Restaurant and hospitality wear</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>Healthcare scrubs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 shrink-0 mt-1" size={20} />
                  <span>School uniforms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join over 1,000 brands who trust us for their corporate clothing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
              Request a Quote
            </button>
            <Link
              href="/contact-us"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
