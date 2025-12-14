interface HomePageData {
  sliders: Array<{
    id: number;
    image: string;
    heading: string;
    sub_heading: string;
    button1_label: string | null;
    button1_url: string | null;
    button2_label: string | null;
    button2_url: string | null;
    tag: string;
    tag_style: number;
    sort_order: number;
  }>;
  partners: Array<{
    id: number;
    name: string;
    logo: string;
    website_url: string | null;
    sort_order: number;
  }>;
  popup: any;
  shop_by_category: Array<{
    attribute_data: string;
    slug: string;
    thumbnail: string;
    children: Array<{
      name: string;
      slug: string;
    }>;
  }>;
}

interface HomePageResponse {
  success: boolean;
  data: HomePageData;
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!envBase) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
  }

  const API_BASE = envBase.replace(/\/$/, '');
  const url = `${API_BASE}/cms/home-page-data`;

  // Simple in-memory cache for ETag + response data.
  // Note: this is process-local (non-persistent) and is suitable for
  // Node servers with a single process. For serverless or multi-instance
  // deployments consider a shared cache (Redis, DB) if persistence is required.
  type HomePageCache = {
    etag?: string | null;
    data?: HomePageData | null;
    ts: number;
  };

  // module-scoped cache entry (retained between calls in the same process)
  // @ts-ignore - keep simple and attach to module if not already present
  const globalAny: any = globalThis as any;
  if (!globalAny.__homePageCache) {
    globalAny.__homePageCache = { etag: null, data: null, ts: Date.now() } as HomePageCache;
  }
  const cache: HomePageCache = globalAny.__homePageCache;

  try {
    // Build headers and include `If-None-Match` when we previously stored an ETag.
    const headers: Record<string, string> = {};
    if (cache.etag) {
      headers['If-None-Match'] = cache.etag;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour, revalidate after
      headers: Object.keys(headers).length ? headers : undefined,
    });

    // If upstream returns 304 Not Modified, return the cached data if we have it.
    if (response.status === 304) {
      if (cache.data) {
        return cache.data;
      }
      // If we received 304 but have no cached data, fallthrough to fetch fresh below.
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.status}`);
    }

    const data: HomePageResponse = await response.json();

    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    // Update in-memory cache with latest ETag and data.
    const respEtag = response.headers.get('etag') || response.headers.get('ETag');
    cache.etag = respEtag ?? null;
    cache.data = data.data ?? null;
    cache.ts = Date.now();

    return data.data;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
}