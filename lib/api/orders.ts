// Orders API service
import { Order, OrdersResponse } from '@/lib/types/order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class OrdersAPIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'OrdersAPIError';
  }
}

function getHeaders(includeAuth: boolean = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Get user's orders
 */
export async function getMyOrders(page: number = 1, perPage: number = 20): Promise<OrdersResponse> {
  const response = await fetch(`${API_BASE_URL}/my-orders?page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new OrdersAPIError(response.status, error.message || 'Failed to fetch orders');
  }

  return response.json();
}

/**
 * Get a specific order by ID
 */
export async function getOrder(orderId: string): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new OrdersAPIError(response.status, error.message || 'Failed to fetch order');
  }

  return response.json();
}