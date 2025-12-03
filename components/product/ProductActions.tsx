import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

type ProductActionsProps = {
  stock: number;
};

export default function ProductActions({ stock }: ProductActionsProps) {
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);

  const handleAddToCart = () => {
    if (stock <= 0) {
      setShowOutOfStockDialog(true);
    } else {
      // Add to cart logic here
      console.log('Add to cart');
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 px-3 ${
            stock <= 0
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          <ShoppingCart size={20} />
          {stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <Heart size={20} />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <Share2 size={20} />
        </button>
      </div>

      {/* Out of Stock Dialog */}
      {showOutOfStockDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Out of Stock</h3>
            <p className="text-gray-600 mb-4">This product is currently out of stock. Please check back later.</p>
            <button
              onClick={() => setShowOutOfStockDialog(false)}
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
