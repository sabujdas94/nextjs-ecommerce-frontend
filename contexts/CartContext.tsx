'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CheckoutRequest, OrderResponse } from '@/lib/types/cart';
import {
  createCart as apiCreateCart,
  getCart as apiGetCart,
  addItemToCart as apiAddItem,
  updateCartItem as apiUpdateItem,
  removeCartItem as apiRemoveItem,
  clearCart as apiClearCart,
  checkout as apiCheckout,
  CartAPIError,
} from '@/lib/api/cart';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addItem: (variantId: number, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: number, quantity: number) => Promise<void>;
  removeItem: (lineId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  checkout: (data: Omit<CheckoutRequest, 'cart_id'>) => Promise<OrderResponse>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'cart_id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedCartId = localStorage.getItem(CART_ID_KEY);

      if (storedCartId) {
        // Try to fetch existing cart
        try {
          const existingCart = await apiGetCart(storedCartId);
          setCart(existingCart);
        } catch (err) {
          // If cart not found, create a new one
          if (err instanceof CartAPIError && err.statusCode === 404) {
            const newCart = await apiCreateCart();
            setCart(newCart);
            localStorage.setItem(CART_ID_KEY, newCart.id);
          } else {
            throw err;
          }
        }
      } else {
        // Create new cart
        const newCart = await apiCreateCart();
        setCart(newCart);
        localStorage.setItem(CART_ID_KEY, newCart.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize cart');
      console.error('Cart initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    if (!cart?.id) return;

    try {
      setError(null);
      const updatedCart = await apiGetCart(cart.id);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh cart');
      console.error('Cart refresh error:', err);
    }
  };

  const addItem = async (variantId: number, quantity: number = 1) => {
    // Ensure cart exists
    if (!cart?.id) {
      await initializeCart();
      // Wait for initialization and try again if cart still not available
      if (!cart?.id) {
        throw new Error('Failed to initialize cart');
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Adding item to cart:', {
        cart_id: cart.id,
        variant_id: variantId,
        quantity,
      });
      
      const updatedCart = await apiAddItem({
        cart_id: cart.id,
        variant_id: variantId,
        quantity,
      });
      
      console.log('Cart updated:', updatedCart);
      setCart(updatedCart);
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: number, quantity: number) => {
    if (!cart?.id) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedCart = await apiUpdateItem(lineId, {
        cart_id: cart.id,
        quantity,
      });
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: number) => {
    if (!cart?.id) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedCart = await apiRemoveItem(lineId, {
        cart_id: cart.id,
      });
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!cart?.id) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedCart = await apiClearCart({
        cart_id: cart.id,
      });
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async (data: Omit<CheckoutRequest, 'cart_id'>): Promise<OrderResponse> => {
    if (!cart?.id) {
      throw new Error('No active cart found');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const order = await apiCheckout({
        ...data,
        cart_id: cart.id,
      });
      
      // After successful checkout, create a new cart
      const newCart = await apiCreateCart();
      setCart(newCart);
      localStorage.setItem(CART_ID_KEY, newCart.id);
      
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process checkout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
