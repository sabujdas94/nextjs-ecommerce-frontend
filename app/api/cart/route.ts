import { NextResponse } from 'next/server';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');

async function forward(request: Request) {
  try {
    const url = new URL(request.url);
    // path after /api/cart
    const suffix = url.pathname.replace(/^\/api\/cart/, '') || '';
    const upstreamUrl = `${API_BASE}/cart${suffix}${url.search}`;

    const method = request.method;
    const headers: Record<string, string> = {};
    const auth = request.headers.get('authorization');
    if (auth) headers['authorization'] = auth;

    let body: any = undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      body = await request.text();
    }

    const resp = await fetch(upstreamUrl, {
      method,
      headers,
      body: body && body.length ? body : undefined,
    });

    const respBody = await resp.text();
    const response = new NextResponse(respBody, { status: resp.status });

    resp.headers.forEach((value, key) => {
      if (['content-type', 'cache-control', 'etag'].includes(key.toLowerCase())) {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Proxy error' }), { status: 500 });
  }
}

export async function GET(request: Request) {
  return forward(request);
}

export async function POST(request: Request) {
  return forward(request);
}

export async function PATCH(request: Request) {
  return forward(request);
}

export async function DELETE(request: Request) {
  return forward(request);
}
