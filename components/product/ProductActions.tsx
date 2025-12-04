'use client';

import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

type ProductActionsProps = {
  stock: number;
  variantId?: number;
  quantity?: number;
};

export default function ProductActions({ stock, variantId, quantity = 1 }: ProductActionsProps) {
  const { addItem, isLoading } = useCart();
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleAddToCart = async () => {
    if (stock <= 0) {
      setShowOutOfStockDialog(true);
      return;
    }

    if (!variantId) {
      alert('Please select all product options');
      return;
    }

    try {
      await addItem(variantId, quantity);
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0 || isLoading}
          className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 px-3 ${
            stock <= 0 || isLoading
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          <ShoppingCart size={20} />
          {isLoading ? 'Adding...' : stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <Heart size={20} />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <Share2 size={20} />
        </button>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="font-semibold">✓ Added to cart successfully!</p>
        </div>
      )}

      {/* Out of Stock Dialog */}
      {showOutOfStockDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Out of Stock</h3>
            <p className="text-gray-600 mb-4">This product is currently out of stock. Please check back later.</p>
            <button
              onClick={() => setShowOutOfStockDialog(false)}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

