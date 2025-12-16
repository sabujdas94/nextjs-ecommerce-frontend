import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Categories from "@/components/Categories";
import TrendingProducts from "@/components/TrendingProducts";
import FeaturedBrands from "@/components/FeaturedBrands";
import Testimonials from "@/components/Testimonials";
import NewsletterSection from "@/components/NewsletterSection";
import CorporateBanner from "@/components/CorporateBanner";
import { fetchHomePageData } from "@/lib/homePageData";

// Revalidate every 60 seconds - page stays fast but checks for updates
export const revalidate = 60;

export default async function Home() {
  let homeData;

  try {
    homeData = await fetchHomePageData();
  } catch (error) {
    // console.error('Failed to fetch home page data:', error);
    // Fallback to empty data or show error state
    homeData = {
      sliders: [],
      partners: [],
      popup: null,
      shop_by_category: [],
      products: { trending: [], new_arrivals: [], on_sale: [] },
    };
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSlider sliders={homeData.sliders} />
      <Categories categories={homeData.shop_by_category} />
      <TrendingProducts products={homeData.products} />
      <FeaturedBrands partners={homeData.partners} />
      {/* <CorporateBanner /> */}
      {/* <Testimonials /> */}
      {/* <NewsletterSection /> */}
      <Footer />
    </main>
  );
}
