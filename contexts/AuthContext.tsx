'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { authAPI } from '@/lib/auth';
import { fetchAddresses, Address } from '@/lib/api/address';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      console.log('Auth Debug - Found stored token, checking auth...');
      setToken(storedToken);
      checkAuth(storedToken);
    } else {
      console.log('Auth Debug - No stored token found');
      setIsLoading(false);
    }
  }, []);

  const refreshAddresses = async (authToken?: string) => {
    const currentToken = authToken || token;
    if (!currentToken) {
      console.log('Auth Debug - refreshAddresses called but no token');
      return;
    }

    try {
      console.log('Auth Debug - Fetching addresses for user:', user?.id);
      setAddressesLoading(true);
      const userAddresses = await fetchAddresses();
      console.log('Auth Debug - Fetched addresses:', userAddresses);
      setAddresses(userAddresses);
    } catch (error) {
      console.error('Auth Debug - Failed to fetch addresses:', error);
      setAddresses([]);
    } finally {
      setAddressesLoading(false);
    }
  };

  const checkAuth = async (authToken?: string) => {
    const currentToken = authToken || token;
    if (!currentToken) return;

    try {
      console.log('Auth Debug - Checking authentication...');
      const response = await authAPI.getUser();
      console.log('Auth Debug - User authenticated:', response.user);
      setUser(response.user);
      // Fetch addresses after successful auth check
      await refreshAddresses(currentToken);
    } catch (error: any) {
      console.log('Auth Debug - Authentication check failed:', error);
      // Only clear auth if we get an unauthorized response (401/403)
      // Don't logout on network errors or temporary server issues
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('access_token');
        setToken(null);
        setUser(null);
        setAddresses([]);
      }
      // For other errors (network issues, 500, etc.), keep the user logged in
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      console.log('Auth Debug - Attempting login...');
      const response = await authAPI.login(credentials);
      console.log('Auth Debug - Login successful for user:', response.user);
      setUser(response.user);
      setToken(response.access_token);
      localStorage.setItem('access_token', response.access_token);
      // Fetch addresses after successful login
      await refreshAddresses(response.access_token);
    } catch (error) {
      console.error('Auth Debug - Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      console.log('Auth Debug - Attempting registration...');
      const response = await authAPI.register(credentials);
      console.log('Auth Debug - Registration successful for user:', response.user);
      setUser(response.user);
      setToken(response.access_token);
      localStorage.setItem('access_token', response.access_token);
      // Addresses will be empty for new users
      setAddresses([]);
    } catch (error) {
      console.error('Auth Debug - Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Auth Debug - Attempting logout...');
      await authAPI.logout();
      console.log('Auth Debug - Logout successful');
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.error('Auth Debug - Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      setAddresses([]);
      localStorage.removeItem('access_token');
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    addresses,
    addressesLoading,
    login,
    register,
    logout,
    checkAuth,
    refreshAddresses,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};