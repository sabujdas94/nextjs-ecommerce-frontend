import type { NextConfig } from "next";

const BACKEND_ENV = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

let backendOrigin = BACKEND_ENV;
let backendProtocol = 'http';
let backendHostname = '127.0.0.1';
let backendPort = '';
try {
  const parsed = new URL(BACKEND_ENV);
  backendOrigin = parsed.origin;
  backendProtocol = parsed.protocol.replace(':', '');
  backendHostname = parsed.hostname;
  backendPort = parsed.port; // may be ''
} catch (e) {
  // leave defaults if parsing fails
}

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: (backendProtocol === 'https' ? 'https' : 'http') as 'http' | 'https',
        hostname: backendHostname,
        port: backendPort || undefined,
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
