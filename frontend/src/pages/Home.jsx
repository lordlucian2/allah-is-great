import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = ""; // relative proxy

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, testimonialsRes, dealsRes] = await Promise.all([
          axios.get(`/api/products`),
          axios.get(`/api/testimonials`),
          axios.get(`/api/deals`)
        ]);
        const featured = productsRes.data.filter(p => p.is_featured === true);
        setFeaturedProducts(featured);
        setTestimonials(testimonialsRes.data);
        setDeals(dealsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { name: 'Mobile Phones', icon: '📱' },
    { name: 'Phone Accessories', icon: '🔌' },
    { name: 'Headphones & Earbuds', icon: '🎧' },
    { name: 'Speakers & Audio Systems', icon: '🔊' },
    { name: 'LED Lights', icon: '💡' },
    { name: 'Electrical Supplies', icon: '⚡' },
    { name: 'Chargers, Cables & Adapters', icon: '🔋' },
    { name: 'Fans & Home Appliances', icon: '🌀' },
    { name: 'Batteries & Power Solutions', icon: '🔋' }
  ];

  const whatsappNumber = '231776070131';

  const openWhatsApp = (productName = '') => {
    const message = productName 
      ? `Hello, I'm interested in the ${productName}. Is it currently available?`
      : `Hello, I'm interested in your products. Do you have it in stock?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-royalBlue text-white py-20 px-4" style={{ backgroundImage: 'url(https://placehold.co/1600x600/0D47A1/white?text=Store+Front)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ALLAH IS GREAT Electronics & Electrical Store</h1>
          <p className="text-lg md:text-xl mb-8">Your trusted source for phones, accessories, speakers, electrical supplies, lighting solutions, fans, power solutions, and home electronics.</p>
          <div className="space-x-4">
            <button onClick={() => openWhatsApp()} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">Chat on WhatsApp</button>
            <a href="tel:+231776070131" className="bg-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition inline-block">Call Now</a>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer" onClick={() => openWhatsApp(cat.name)}>
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Featured Products</h2>
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image_url || "https://placehold.co/600x400/CCCCCC/white?text=No+Image"} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-sm text-green-600">{product.availability_status}</p>
                    <button onClick={() => openWhatsApp(product.name)} className="mt-3 bg-royalBlue hover:bg-blue-700 text-white py-2 px-4 rounded w-full transition">Chat on WhatsApp</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Today's Deals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Today's Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map(deal => (
            <div key={deal.id} className="bg-orange bg-opacity-10 border border-orange rounded-lg p-6 text-center">
              <span className="inline-block bg-orange text-white px-3 py-1 rounded-full text-sm mb-2">{deal.type}</span>
              <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
              <p className="mb-4">Limited time offer!</p>
              <button onClick={() => openWhatsApp(deal.title)} className="bg-orange hover:bg-orange-600 text-white py-2 px-4 rounded">Chat on WhatsApp</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-royalBlue text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>✅ Quality Products</div><div>💰 Affordable Prices</div><div>📦 Wide Product Selection</div>
            <div>😊 Friendly Customer Service</div><div>🔒 Genuine Electronics</div><div>⚡ Fast WhatsApp Response</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-gray-100 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {t.photo_url && <img src={t.photo_url} alt={t.customer_name} className="w-12 h-12 rounded-full mr-4" />}
                <div><h3 className="font-bold">{t.customer_name}</h3><div className="text-yellow-500">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div></div>
              </div>
              <p className="italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Map */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Visit Our Store</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-2"><strong>📍 Address:</strong> New Georgia Estate, Liberia</p>
              <p className="mb-2"><strong>📞 Phone:</strong> <a href="tel:+231776070131" className="text-royalBlue">+231 776 070 131</a></p>
              <p className="mb-2"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/231776070131" target="_blank" className="text-royalBlue">+231 776 070 131</a></p>
              <p className="mb-2"><strong>🕒 Business Hours:</strong> Mon-Sat: 9am-7pm, Sun: Closed</p>
              <div className="mt-4 space-x-4">
                <a href="tel:+231776070131" className="inline-block bg-royalBlue text-white py-2 px-4 rounded">Call Now</a>
                <a href="https://wa.me/231776070131" target="_blank" className="inline-block bg-green-500 text-white py-2 px-4 rounded">Chat on WhatsApp</a>
                <a href="https://maps.google.com/?q=New+Georgia+Estate,+Liberia" target="_blank" className="inline-block bg-darkGray text-white py-2 px-4 rounded">Get Directions</a>
              </div>
            </div>
            <div className="h-64 bg-gray-300 rounded-lg overflow-hidden">
              <iframe 
                title="Google Map"
                src="https://maps.google.com/maps?q=New%20Georgia%20Estate%2C%20Liberia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
