'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { authAPI } from '@/lib/auth';

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

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getUser();
      setUser(response.user);
    } catch (error: any) {
      // Only clear auth if we get an unauthorized response (401/403)
      // Don't logout on network errors or temporary server issues
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('access_token');
        setToken(null);
        setUser(null);
      }
      // For other errors (network issues, 500, etc.), keep the user logged in
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user);
      setToken(response.access_token);
      localStorage.setItem('access_token', response.access_token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(credentials);
      setUser(response.user);
      setToken(response.access_token);
      localStorage.setItem('access_token', response.access_token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('access_token');
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};