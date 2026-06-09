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

  const categories = ['📱 Mobile Phones', '🔌 Phone Accessories', '🎧 Headphones', '🔊 Speakers', '💡 LED Lights', '⚡ Electrical', '🔋 Chargers', '🌀 Fans', '🔋 Power Banks'];

  const openWhatsApp = (productName = '') => {
    let msg = settings.whatsapp_message || "Hello, I'm interested in [PRODUCT_NAME]. Is it available?";
    msg = msg.replace('[PRODUCT_NAME]', productName || 'your products');
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (settingsLoading || loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <section className="relative text-white py-20 px-4" style={{ backgroundImage: `url(${settings.hero_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{settings.hero_headline}</h1>
          <p className="text-lg md:text-xl mb-8">{settings.hero_subheadline}</p>
          <div className="space-x-4">
            <button onClick={() => openWhatsApp()} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">Chat on WhatsApp</button>
            <a href={`tel:${settings.phone}`} className="bg-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg inline-block">Call Now</a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg cursor-pointer" onClick={() => openWhatsApp(cat)}>
              <div className="text-4xl mb-2">{cat.split(' ')[0]}</div>
              <h3 className="font-semibold">{cat.substring(2)}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={p.image_url || "https://placehold.co/600x400/CCCCCC/white?text=No+Image"} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-600">${p.price}</p>
                  <button onClick={() => openWhatsApp(p.name)} className="mt-3 bg-royalBlue hover:bg-blue-700 text-white py-2 px-4 rounded w-full">Chat on WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Today's Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map(deal => (
            <div key={deal.id} className="bg-orange bg-opacity-10 border border-orange rounded-lg p-6 text-center">
              <span className="inline-block bg-orange text-white px-3 py-1 rounded-full text-sm mb-2">{deal.type}</span>
              <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
              <button onClick={() => openWhatsApp(deal.title)} className="bg-orange hover:bg-orange-600 text-white py-2 px-4 rounded">Chat</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-royalBlue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>✅ Quality Products</div><div>💰 Affordable Prices</div><div>📦 Wide Selection</div>
            <div>😊 Friendly Service</div><div>🔒 Genuine Electronics</div><div>⚡ Fast WhatsApp</div>
          </div>
        </div>
      </section>

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

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Visit Our Store</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-2"><strong>📍 Address:</strong> {settings.address}</p>
              <p className="mb-2"><strong>📞 Phone:</strong> <a href={`tel:${settings.phone}`} className="text-royalBlue">{settings.phone}</a></p>
              <p className="mb-2"><strong>💬 WhatsApp:</strong> <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="text-royalBlue">{settings.whatsapp}</a></p>
              <p className="mb-2"><strong>🕒 Business Hours:</strong> {settings.business_hours}</p>
              <div className="mt-4 space-x-4">
                <a href={`tel:${settings.phone}`} className="inline-block bg-royalBlue text-white py-2 px-4 rounded">Call Now</a>
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="inline-block bg-green-500 text-white py-2 px-4 rounded">Chat</a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`} target="_blank" className="inline-block bg-darkGray text-white py-2 px-4 rounded">Directions</a>
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
