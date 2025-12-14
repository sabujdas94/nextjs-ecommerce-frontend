import TrendingProductsClient from './TrendingProductsClient';
import type { ApiProduct } from '@/lib/homePageData';

export default function TrendingProducts({
  products,
}: {
  products: { trending: ApiProduct[]; new_arrivals: ApiProduct[]; on_sale: ApiProduct[] };
}) {
  return <TrendingProductsClient products={products} />;
}
