'use client';

import { useState } from 'react';
import { Mail, Gift, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 relative overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-2xl">
            <Gift className="text-orange-500" size={40} />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Get 15% OFF Your First Order!
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-8">
            Subscribe to our newsletter and stay updated with exclusive deals, new arrivals, and fashion tips.
          </p>

          {/* Newsletter Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-full p-2 shadow-2xl">
                <div className="flex-1 flex items-center px-4">
                  <Mail className="text-gray-400 mr-3" size={24} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-transparent outline-none text-slate-900 placeholder-gray-400 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-white/80 text-sm mt-4">
                🎁 Use code <strong>WELCOME15</strong> at checkout. No spam, unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl animate-fadeIn">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Welcome to the Family! 🎉
              </h3>
              <p className="text-gray-600">
                Check your inbox for your exclusive 15% discount code!
              </p>
            </div>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
            {[
              '50,000+ Subscribers',
              'Exclusive Deals',
              'Early Access',
              'Fashion Tips',
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
              >
                <CheckCircle size={20} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
