import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import TrendingProducts from '@/components/TrendingProducts';
import FeaturedBrands from '@/components/FeaturedBrands';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';
import CorporateBanner from '@/components/CorporateBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <Categories />
      <TrendingProducts />
      <FeaturedBrands />
      <CorporateBanner />
      <Testimonials />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
