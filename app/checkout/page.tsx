'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckoutAddress } from '@/lib/types/cart';
import { fetchAddresses, Address } from '@/lib/api/address';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, checkout, isLoading } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'cash-on-delivery'>('cash-on-delivery');
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');

  // Address management
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | 'new'>('new');
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  const [address, setAddress] = useState<CheckoutAddress>({
    line_one: '',
    line_two: '',
    city: '',
    state: '',
    postcode: '',
    country_id: 19, // Default to Bangladesh
    delivery_instructions: '',
  });

  // Fetch addresses if user is logged in
  useEffect(() => {
    if (user) {
      setLoadingAddresses(true);
      fetchAddresses()
        .then((addresses) => {
          console.log('Fetched addresses:', addresses);
          console.log('Addresses length:', addresses.length);
          setSavedAddresses(addresses);
          // If addresses exist, select the first one by default
          if (addresses.length > 0) {
            setSelectedAddressId(addresses[0].id);
            populateAddressFields(addresses[0]);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch addresses:', err);
        })
        .finally(() => {
          setLoadingAddresses(false);
        });
    }
  }, [user]);

  const populateAddressFields = (addr: Address) => {
    setAddress({
      line_one: addr.line_one,
      line_two: addr.line_two || '',
      city: addr.city,
      state: addr.state || '',
      postcode: addr.postcode,
      country_id: addr.country_id,
      delivery_instructions: addr.delivery_instructions || '',
    });
  };

  const formatPrice = (price: string) => price.replace('BDT ', '');

  const handleAddressChange = (field: keyof CheckoutAddress, value: string | number) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelection = (addressId: number | 'new') => {
    console.log('Address selection changed to:', addressId);
    setSelectedAddressId(addressId);
    
    if (addressId === 'new') {
      console.log('Selected new address - clearing form');
      // Clear address fields for new address
      setAddress({
        line_one: '',
        line_two: '',
        city: '',
        state: '',
        postcode: '',
        country_id: 19,
        delivery_instructions: '',
      });
    } else {
      console.log('Selected saved address:', addressId);
      // Populate with selected address
      const selectedAddr = savedAddresses.find(addr => addr.id === addressId);
      if (selectedAddr) {
        populateAddressFields(selectedAddr);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!cart || cart.lines_count === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      const order = await checkout({
        payment_method: paymentMethod,
        first_name: firstName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        address: {
          line_one: address.line_one,
          line_two: address.line_two || undefined,
          city: address.city,
          state: address.state || undefined,
          postcode: address.postcode,
          country_id: address.country_id,
          delivery_instructions: address.delivery_instructions || undefined,
        },
        coupon_code: couponCode || undefined,
      });

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order.order_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process order');
      console.error('Checkout error:', err);
    }
  };

  if (!cart || cart.lines_count === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products before checking out</p>
            <a href="/shop" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Select Saved Address - Show at top if user has addresses */}
              {user && savedAddresses.length > 0 && (
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
                            onChange={() => handleAddressSelection(addr.id)}
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
                          onChange={() => handleAddressSelection('new')}
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
              )}

              {/* Contact Information - Show if no saved addresses OR 'new' address selected */}
              {(savedAddresses.length === 0 || selectedAddressId === 'new') && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+880..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Delivery Address - Show form when no saved addresses OR 'new' address selected */}
              {(savedAddresses.length === 0 || selectedAddressId === 'new') && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                    {user && savedAddresses.length > 0 && (
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
                      onChange={(e) => handleAddressChange('line_one', e.target.value)}
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
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State/Division</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
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
                        onChange={(e) => handleAddressChange('postcode', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <select
                        required
                        disabled
                        value={address.country_id}
                        onChange={(e) => handleAddressChange('country_id', parseInt(e.target.value))}
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
                      onChange={(e) => handleAddressChange('delivery_instructions', e.target.value)}
                      placeholder="e.g., Leave at door, Call on arrival, etc."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              )}

              {/* Payment Method */}
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
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Coupon Code */}
                <div className="mb-4 pb-4 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.lines.map((line) => (
                    <div key={line.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                      <img
                        src={line.product.thumbnail || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'}
                        alt={line.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{line.product.name}</p>
                        <p className="text-xs text-gray-500">SKU: {line.product.sku}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-600">Qty: {line.quantity}</span>
                          <span className="text-sm font-semibold">{formatPrice(line.total)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(cart.sub_total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{formatPrice(cart.shipping_total || 'BDT 0')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium">-{formatPrice(cart.discount_total || 'BDT 0')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(cart.tax_total)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span className="text-black">{formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold mt-6 transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our{' '}
                  <a href="/terms-and-conditions" className="text-black hover:underline">Terms and Conditions</a>,{' '}
                  <a href="/refund-policy" className="text-black hover:underline">Refund Policy</a> and{' '}
                  <a href="/privacy-policy" className="text-black hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </main>
  );
}
