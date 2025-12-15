// Cart API service
import {
  Cart,
  CreateCartRequest,
  AddItemRequest,
  UpdateItemRequest,
  RemoveItemRequest,
  ClearCartRequest,
  CheckoutRequest,
  OrderResponse,
} from '@/lib/types/cart';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class CartAPIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'CartAPIError';
  }
}

function getHeaders(method: string = 'GET', includeAuth: boolean = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (method && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD') {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Create a new cart or retrieve an existing one
 */
export async function createCart(data?: CreateCartRequest): Promise<Cart> {
  const target = typeof window !== 'undefined' ? '/api/cart' : `${API_BASE_URL}/cart`;
  const response = await fetch(target, {
    method: 'POST',
    headers: getHeaders('POST', true),
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to create cart');
  }

  return response.json();
}

/**
 * Get cart details by cart_id
 */
export async function getCart(cartId: string): Promise<Cart> {
  const query = `?cart_id=${encodeURIComponent(cartId)}`;
  const target = typeof window !== 'undefined' ? `/api/cart${query}` : `${API_BASE_URL}/cart${query}`;
  const response = await fetch(target, {
    method: 'GET',
    headers: getHeaders('GET', true),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to get cart');
  }

  return response.json();
}

/**
 * Add item to cart
 */
export async function addItemToCart(data: AddItemRequest): Promise<Cart> {
  console.log('API: Adding item to cart', data);
  
  const target = typeof window !== 'undefined' ? '/api/cart/items' : `${API_BASE_URL}/cart/items`;
  const response = await fetch(target, {
    method: 'POST',
    headers: getHeaders('POST', true),
    body: JSON.stringify(data),
  });

  console.log('API: Add item response status', response.status);

  if (!response.ok) {
    const error = await response.json();
    console.error('API: Add item error', error);
    throw new CartAPIError(response.status, error.message || 'Failed to add item to cart');
  }

  const result = await response.json();
  console.log('API: Add item result', result);
  return result;
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(lineId: number, data: UpdateItemRequest): Promise<Cart> {
  const target = typeof window !== 'undefined' ? `/api/cart/items/${lineId}` : `${API_BASE_URL}/cart/items/${lineId}`;
  const response = await fetch(target, {
    method: 'PATCH',
    headers: getHeaders('PATCH', true),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to update cart item');
  }

  return response.json();
}

/**
 * Remove item from cart
 */
export async function removeCartItem(lineId: number, data: RemoveItemRequest): Promise<Cart> {
  const target = typeof window !== 'undefined' ? `/api/cart/items/${lineId}` : `${API_BASE_URL}/cart/items/${lineId}`;
  const response = await fetch(target, {
    method: 'DELETE',
    headers: getHeaders('DELETE', true),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to remove cart item');
  }

  return response.json();
}

/**
 * Clear all items from cart
 */
export async function clearCart(data: ClearCartRequest): Promise<Cart> {
  const target = typeof window !== 'undefined' ? '/api/cart' : `${API_BASE_URL}/cart`;
  const response = await fetch(target, {
    method: 'DELETE',
    headers: getHeaders('DELETE', true),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to clear cart');
  }

  return response.json();
}

/**
 * Checkout and create order
 */
export async function checkout(data: CheckoutRequest): Promise<OrderResponse> {
  console.log('API: Checkout', data);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Include Bearer token if user is logged in
  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const target = `${API_BASE_URL}/checkout/complete`;
  const response = await fetch(target, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  console.log('API: Checkout response status', response.status);

  if (!response.ok) {
    const error = await response.json();
    console.error('API: Checkout error', error);
    throw new CartAPIError(response.status, error.message || 'Failed to process checkout');
  }

  const result = await response.json();
  console.log('API: Checkout result', result);
  return result;
}

/**
 * Get order details
 */
export async function getOrder(orderId: number): Promise<OrderResponse> {
  const target = typeof window !== 'undefined' ? `/api/cart/orders/${orderId}` : `${API_BASE_URL}/orders/${orderId}`;
  const response = await fetch(target, {
    method: 'GET',
    headers: getHeaders('GET', true),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to get order');
  }

  return response.json();
}
