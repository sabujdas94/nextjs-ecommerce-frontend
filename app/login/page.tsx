'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const { login, register, isLoading, user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    login: '',
    password: '',
  });
  const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({
    name: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(loginCredentials);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerCredentials.password !== registerCredentials.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(registerCredentials);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };

  if (user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-300px)]">
        <div className="max-w-3xl mx-auto">
          {/* Tabs and Form Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === 'login'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === 'register'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-8 mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Forms */}
            <div className="p-8">
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="login-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      id="login-phone"
                      name="login"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={loginCredentials.login}
                      onChange={handleLoginChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={loginCredentials.password}
                      onChange={handleLoginChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="register-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="register-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={registerCredentials.name}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="register-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="register-phone"
                      name="phone"
                      type="tel"
                      autoComplete="off"
                      required
                      value={registerCredentials.phone}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={registerCredentials.password}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div>
                    <label htmlFor="register-password-confirm" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="register-password-confirm"
                      name="password_confirmation"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={registerCredentials.password_confirmation}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Re-enter your password"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Social Login Section */}
            {/* <div className="px-8 pb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>
            </div> */}
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need help? <a href="/contact-us" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
