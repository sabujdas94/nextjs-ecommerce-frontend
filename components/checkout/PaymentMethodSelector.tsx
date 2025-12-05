'use client';

interface PaymentMethodSelectorProps {
  paymentMethod: 'cash-on-delivery';
  setPaymentMethod: (method: 'cash-on-delivery') => void;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <div className="grid grid-cols-1 gap-3">
        <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition has-[:checked]:border-black has-[:checked]:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="cash-on-delivery"
            checked={paymentMethod === 'cash-on-delivery'}
            onChange={(e) => setPaymentMethod(e.target.value as 'cash-on-delivery')}
            className="w-4 h-4 text-black"
          />
          <div>
            <div className="font-medium">Cash on Delivery</div>
            <div className="text-xs text-gray-500">Pay when you receive</div>
          </div>
        </label>
      </div>
    </div>
  );
}