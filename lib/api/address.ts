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

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Fetch all addresses for the authenticated user
 */
export async function fetchAddresses(): Promise<Address[]> {
  const response = await fetch(`${API_BASE_URL}/addresses`, {
    method: 'GET',
    headers: getHeaders(),
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
