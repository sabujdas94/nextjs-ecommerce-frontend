type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export default function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition"
      >
        -
      </button>
      <span className="px-6 py-3 border border-gray-300 rounded-lg font-medium min-w-[60px] text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  );
}
