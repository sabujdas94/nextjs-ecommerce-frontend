import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

class AuthAPI {
  private getHeaders(includeAuth: boolean = false) {
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

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async logout(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }

    return response.json();
  }

  async getUser(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to get user' }));
      const err: any = new Error(error.message || 'Failed to get user');
      err.status = response.status;
      throw err;
    }

    return response.json();
  }
}

export const authAPI = new AuthAPI();