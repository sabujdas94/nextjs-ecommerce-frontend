// Cart API service
import {
  Cart,
  CreateCartRequest,
  AddItemRequest,
  UpdateItemRequest,
  RemoveItemRequest,
  ClearCartRequest,
} from '@/lib/types/cart';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class CartAPIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'CartAPIError';
  }
}

/**
 * Create a new cart or retrieve an existing one
 */
export async function createCart(data?: CreateCartRequest): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
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
  const response = await fetch(`${API_BASE_URL}/cart?cart_id=${cartId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
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
  const response = await fetch(`${API_BASE_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to add item to cart');
  }

  return response.json();
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(lineId: number, data: UpdateItemRequest): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart/items/${lineId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
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
  const response = await fetch(`${API_BASE_URL}/cart/items/${lineId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
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
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CartAPIError(response.status, error.message || 'Failed to clear cart');
  }

  return response.json();
}
