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

  try {
    // For server-side rendering, we use Next.js built-in caching
    // The `next: { revalidate: 3600 }` option handles ETag and caching automatically
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour, revalidate after
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.status}`);
    }

    const data: HomePageResponse = await response.json();

    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
}