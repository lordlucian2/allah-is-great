import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSettings } from '../hooks/useSettings';

const API_URL = import.meta.env.VITE_API_URL || "";

const Home = () => {
  const { settings, loading: settingsLoading } = useSettings();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, testimonialsRes, dealsRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/testimonials`),
          axios.get(`${API_URL}/api/deals`)
        ]);
        const productsArray = Array.isArray(productsRes.data) ? productsRes.data : [];
        setFeaturedProducts(productsArray.filter(p => p.is_featured === true));
        setTestimonials(Array.isArray(testimonialsRes.data) ? testimonialsRes.data : []);
        setDeals(Array.isArray(dealsRes.data) ? dealsRes.data : []);
      } catch (error) { console.error(error);
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const categories = [
    { name: 'Mobile Phones', icon: '📱' }, { name: 'Phone Accessories', icon: '🔌' },
    { name: 'Headphones', icon: '🎧' }, { name: 'Speakers', icon: '🔊' },
    { name: 'LED Lights', icon: '💡' }, { name: 'Electrical', icon: '⚡' },
    { name: 'Chargers', icon: '🔋' }, { name: 'Fans', icon: '🌀' }, { name: 'Power Banks', icon: '🔋' }
  ];

  const openWhatsApp = (productName = '') => {
    let msg = settings.whatsapp_message || "Hello, I'm interested in [PRODUCT_NAME]. Is it available?";
    msg = msg.replace('[PRODUCT_NAME]', productName || 'your products');
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (settingsLoading || loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      {/* Hero Section - New Design */}
      <section className="bg-gradient-to-r from-royalBlue to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{settings.hero_headline}</h1>
          <p className="text-xl md:text-2xl mb-2">Premium Electronics & Electrical Solutions</p>
          <p className="text-md md:text-lg mb-8 max-w-2xl mx-auto">{settings.hero_subheadline}</p>
          <div className="space-x-4">
            <a href={`tel:${settings.phone}`} className="inline-block bg-white text-royalBlue font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition">Shop Now</a>
            <button onClick={() => openWhatsApp()} className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition">WhatsApp Support</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => openWhatsApp(cat.name)} className="bg-white shadow rounded-lg p-4 text-center hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-medium text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={p.image_url || "https://placehold.co/600x400/CCCCCC/white?text=No+Image"} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-md truncate">{p.name}</h3>
                  <p className="text-royalBlue font-bold">${p.price}</p>
                  <button onClick={() => openWhatsApp(p.name)} className="mt-2 w-full bg-green-500 text-white py-1 rounded-full text-sm hover:bg-green-600">Chat on WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Today's Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {deals.map(deal => (
            <div key={deal.id} className="bg-white border-l-4 border-orange shadow-md rounded-lg p-4">
              <span className="text-xs font-semibold text-orange uppercase">{deal.type}</span>
              <h3 className="font-bold text-lg mt-1">{deal.title}</h3>
              <p className="text-gray-600 text-sm">Limited offer</p>
              <button onClick={() => openWhatsApp(deal.title)} className="mt-3 text-orange font-medium text-sm hover:underline">Chat for Deal →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-royalBlue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>✅ Quality Products</div><div>💰 Affordable Prices</div><div>📦 Wide Selection</div>
            <div>😊 Friendly Service</div><div>🔒 Genuine Electronics</div><div>⚡ Fast WhatsApp</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-gray-100 p-5 rounded-xl shadow">
              <div className="flex items-center gap-3 mb-3">
                {t.photo_url && <img src={t.photo_url} alt={t.customer_name} className="w-10 h-10 rounded-full" />}
                <div><h4 className="font-bold">{t.customer_name}</h4><div className="text-yellow-500 text-sm">{'★'.repeat(t.rating)}</div></div>
              </div>
              <p className="text-gray-700 text-sm italic">"{t.text.substring(0, 100)}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Contact (simplified, kept from original) */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Visit Our Store</h3>
              <p className="mb-2">📍 {settings.address}</p>
              <p className="mb-2">📞 <a href={`tel:${settings.phone}`} className="text-royalBlue">{settings.phone}</a></p>
              <p className="mb-2">💬 <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="text-royalBlue">WhatsApp</a></p>
              <p className="mb-4">🕒 {settings.business_hours}</p>
              <div className="space-x-3">
                <a href={`tel:${settings.phone}`} className="bg-royalBlue text-white px-4 py-2 rounded-full inline-block">Call Now</a>
                <button onClick={() => openWhatsApp()} className="bg-green-500 text-white px-4 py-2 rounded-full">WhatsApp</button>
              </div>
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <iframe title="Map" src="https://maps.google.com/maps?q=New+Georgia+Estate,+Liberia&output=embed" className="w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
