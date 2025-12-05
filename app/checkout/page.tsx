'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutSkeleton from '@/components/CheckoutSkeleton';
import { AddressSelector, ContactInformation, DeliveryAddressForm, PaymentMethodSelector, OrderSummary } from '@/components/checkout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckoutAddress } from '@/lib/types/cart';
import { Address } from '@/lib/api/address';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, checkout, isLoading } = useCart();
  const { user, addresses: savedAddresses, addressesLoading: loadingAddresses, refreshAddresses } = useAuth();

  const [address, setAddress] = useState<CheckoutAddress>({
    line_one: '',
    line_two: '',
    city: '',
    state: '',
    postcode: '',
    country_id: 19, // Default to Bangladesh
    delivery_instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash-on-delivery'>('cash-on-delivery');
  const [error, setError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');

  // Address management
  const [selectedAddressId, setSelectedAddressId] = useState<number | 'new'>('new');

  // Set default address selection when addresses are loaded
  useEffect(() => {
    console.log('Checkout Debug - User:', user);
    console.log('Checkout Debug - Saved Addresses:', savedAddresses);
    console.log('Checkout Debug - Loading Addresses:', loadingAddresses);
    console.log('Checkout Debug - Selected Address ID:', selectedAddressId);

    if (user && savedAddresses.length > 0 && selectedAddressId === 'new') {
      console.log('Checkout Debug - Setting default address to:', savedAddresses[0]);
      setSelectedAddressId(savedAddresses[0].id);
      populateAddressFields(savedAddresses[0]);
    }
  }, [user, savedAddresses, selectedAddressId]);

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

  const handleAddressChange = (field: keyof CheckoutAddress, value: string | number) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelection = (addressId: number | 'new') => {
    setSelectedAddressId(addressId);
    
    if (addressId === 'new') {
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
    setIsCheckingOut(true);

    if (!cart || cart.lines_count === 0) {
      setError('Your cart is empty');
      setIsCheckingOut(false);
      return;
    }

    try {
      // Prepare checkout data
      const checkoutData: any = {
        payment_method: paymentMethod,
        first_name: firstName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        coupon_code: couponCode || undefined,
      };

      // If a saved address is selected, pass address_id; otherwise pass the full address
      if (selectedAddressId !== 'new' && savedAddresses.length > 0) {
        checkoutData.address_id = selectedAddressId;
      } else {
        checkoutData.address = {
          line_one: address.line_one,
          line_two: address.line_two || undefined,
          city: address.city,
          state: address.state || undefined,
          postcode: address.postcode,
          country_id: address.country_id,
          delivery_instructions: address.delivery_instructions || undefined,
        };
      }

      const order = await checkout(checkoutData);

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order.order_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process order');
      console.error('Checkout error:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading && !isCheckingOut) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <CheckoutSkeleton />
        <Footer />
      </main>
    );
  }

  if ((!cart || cart.lines_count === 0) && !isLoading) {
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
                <AddressSelector
                  savedAddresses={savedAddresses}
                  selectedAddressId={selectedAddressId}
                  onAddressSelection={handleAddressSelection}
                />
              )}

              {/* Contact Information - Show if no saved addresses OR 'new' address selected */}
              {(savedAddresses.length === 0 || selectedAddressId === 'new') && (
                <ContactInformation
                  firstName={firstName}
                  setFirstName={setFirstName}
                  contactPhone={contactPhone}
                  setContactPhone={setContactPhone}
                  contactEmail={contactEmail}
                  setContactEmail={setContactEmail}
                />
              )}

              {/* Delivery Address - Show form when no saved addresses OR 'new' address selected */}
              {(savedAddresses.length === 0 || selectedAddressId === 'new') && (
                <DeliveryAddressForm
                  address={address}
                  onAddressChange={handleAddressChange}
                  showNote={!!user && savedAddresses.length > 0}
                />
              )}

              {/* Payment Method */}
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            {/* Order Summary */}
            <OrderSummary
              cart={cart}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              isLoading={isCheckingOut}
            />
          </div>
        </form>
      </div>
      
      <Footer />
    </main>
  );
}
