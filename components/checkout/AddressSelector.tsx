'use client';

import { Address } from '@/lib/api/address';

interface AddressSelectorProps {
  savedAddresses: Address[];
  selectedAddressId: number | 'new';
  onAddressSelection: (addressId: number | 'new') => void;
}

export default function AddressSelector({
  savedAddresses,
  selectedAddressId,
  onAddressSelection,
}: AddressSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
      </div>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Choose from your saved addresses below, or select "Use a new address" to add a different delivery location for this order.
      </p>
      <div className="space-y-4">
        {savedAddresses.map((addr) => (
          <label
            key={addr.id}
            className="relative flex items-start gap-4 p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-black hover:shadow-md transition-all duration-300 has-[:checked]:border-black has-[:checked]:bg-gradient-to-r has-[:checked]:from-gray-50 has-[:checked]:to-gray-100 has-[:checked]:shadow-lg has-[:checked]:ring-2 has-[:checked]:ring-black group"
          >
            <div className="flex-shrink-0 mt-1">
              <input
                type="radio"
                name="savedAddress"
                value={addr.id}
                checked={selectedAddressId === addr.id}
                onChange={() => onAddressSelection(addr.id)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 opacity-0 absolute"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-lg mb-2 group-has-[:checked]:text-blue-900">
                    {addr.line_one}
                  </div>
                  {addr.line_two && (
                    <div className="text-gray-600 mb-1">{addr.line_two}</div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {addr.city}, {addr.state && `${addr.state}, `}{addr.postcode}
                  </div>
                  {addr.delivery_instructions && (
                    <div className="inline-flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                      <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><span className="font-medium">Delivery Note:</span> {addr.delivery_instructions}</span>
                    </div>
                  )}
                </div>
                {selectedAddressId === addr.id && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}

        {/* Use New Address Option */}
        <label className="relative flex items-start gap-4 p-6 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-black hover:bg-gray-50 transition-all duration-300 has-[:checked]:border-black has-[:checked]:bg-gray-50 has-[:checked]:ring-2 has-[:checked]:ring-black group">
          <div className="flex-shrink-0 mt-1">
            <input
              type="radio"
              name="savedAddress"
              value="new"
              checked={selectedAddressId === 'new'}
              onChange={() => onAddressSelection('new')}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 opacity-0 absolute"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-has-[:checked]:bg-blue-600 transition-colors">
                <svg className="w-5 h-5 text-blue-600 group-has-[:checked]:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg group-has-[:checked]:text-blue-900">Use a new address</div>
                <div className="text-gray-600">Enter a different delivery address for this order</div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}