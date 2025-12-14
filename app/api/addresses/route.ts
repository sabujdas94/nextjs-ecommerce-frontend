import { NextResponse } from 'next/server';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');

export async function GET(request: Request) {
  try {
    const upstreamUrl = `${API_BASE}/addresses`;

    // Forward Authorization header (or any other headers you deem safe)
    const headers: Record<string, string> = {};
    const auth = request.headers.get('authorization');
    if (auth) headers['authorization'] = auth;

    const resp = await fetch(upstreamUrl, {
      method: 'GET',
      headers,
      // keep credentials if needed on server-to-server
    });

    const body = await resp.text();

    const response = new NextResponse(body, {
      status: resp.status,
    });

    // Copy allowed headers from upstream to client response (avoid hop-by-hop)
    resp.headers.forEach((value, key) => {
      // Expose a minimal set back to the browser
      if (['content-type', 'cache-control', 'etag'].includes(key.toLowerCase())) {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Proxy error' }), { status: 500 });
  }
}
