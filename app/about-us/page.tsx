import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fabrilife</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your order is handled daily with a lot of ❤️️ from BANGLADESH and delivered worldwide!
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                FABRILIFE prints a huge variety of custom clothing like T-shirts, hoodies and more. 
                We are committed to providing premium quality materials that are cozy yet last the test of time.
              </p>
              <p>
                Since 2018, we've been serving customers worldwide with a focus on quality, comfort, and style. 
                Our mission is to make premium clothing accessible to everyone while maintaining the highest standards.
              </p>
              <p>
                We are proud to work with over a thousand brands and organizations that we call friends. 
                As your partner, we value long-term relationships and collaborate toward results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Made with premium quality materials. Satisfaction guaranteed on every purchase.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Worldwide Delivery</h3>
              <p className="text-gray-600">
                We ship to customers all around the globe with secure and reliable delivery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-xl font-bold mb-3">Corporate Solutions</h3>
              <p className="text-gray-600">
                Custom branding needs from top brands at unbeatable wholesale prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Partner Brands</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-6">
              To provide high-quality, comfortable, and stylish clothing that empowers people to 
              express themselves confidently while maintaining sustainable and ethical practices.
            </p>
            <p className="text-lg text-gray-600">
              We believe in the power of a good outfit and how it can influence your perception of yourself. 
              Every piece we create is designed to make you feel great and look even better.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
