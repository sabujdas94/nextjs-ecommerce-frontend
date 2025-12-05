'use client';

import { CheckoutAddress } from '@/lib/types/cart';

interface DeliveryAddressFormProps {
  address: CheckoutAddress;
  onAddressChange: (field: keyof CheckoutAddress, value: string | number) => void;
  showNote?: boolean;
}

export default function DeliveryAddressForm({
  address,
  onAddressChange,
  showNote = false,
}: DeliveryAddressFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
      {showNote && (
        <div className="mb-4 pb-4 border-b">
          <p className="text-sm text-gray-600">Enter your new delivery address below</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <input
            type="text"
            required
            value={address.line_one}
            onChange={(e) => onAddressChange('line_one', e.target.value)}
            placeholder="Street address, P.O. box"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              required
              value={address.city}
              onChange={(e) => onAddressChange('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Division</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => onAddressChange('state', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
            <input
              type="text"
              required
              value={address.postcode}
              onChange={(e) => onAddressChange('postcode', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select
              required
              disabled
              value={address.country_id}
              onChange={(e) => onAddressChange('country_id', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-gray-100"
            >
              <option value={1}>Bangladesh</option>
              <option value={2}>India</option>
              <option value={3}>Pakistan</option>
              <option value={4}>United States</option>
              <option value={5}>United Kingdom</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
          <textarea
            value={address.delivery_instructions}
            onChange={(e) => onAddressChange('delivery_instructions', e.target.value)}
            placeholder="e.g., Leave at door, Call on arrival, etc."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}