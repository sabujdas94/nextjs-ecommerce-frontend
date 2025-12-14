// Address API service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export interface Address {
  id: number;
  line_one: string;
  line_two?: string;
  city: string;
  state?: string;
  postcode: string;
  country_id: number;
  delivery_instructions?: string;
  created_at: string;
  updated_at: string;
}

function getHeaders(method: string = 'GET'): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };

  // Only include Content-Type for requests that send a body.
  if (method && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD') {
    headers['Content-Type'] = 'application/json';
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Fetch all addresses for the authenticated user
 */
export async function fetchAddresses(): Promise<Address[]> {
  const targetUrl = typeof window !== 'undefined' ? '/api/addresses' : `${API_BASE_URL}/addresses`;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: getHeaders('GET'),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch addresses');
  }

  const data = await response.json();
  
  // Check different possible response structures
  if (Array.isArray(data)) {
    return data;
  }
  
  return data.addresses || data.data || [];
}
