import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSettings } from '../hooks/useSettings';

const API_URL = import.meta.env.VITE_API_URL || "";

const Products = () => {
  const { settings } = useSettings();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
          setCategories([...new Set(res.data.map(p => p.category))]);
        }
      } catch (err) { console.error(err);
      } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const openWhatsApp = (productName) => {
    let msg = settings.whatsapp_message || "Hello, I'm interested in [PRODUCT_NAME]. Is it available?";
    msg = msg.replace('[PRODUCT_NAME]', productName);
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return <div className="text-center py-8">Loading products...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue mb-6">All Products</h1>
      <div className="mb-6">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 border rounded-lg" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={() => setSelectedCategory('')} className={`px-4 py-2 rounded-lg ${selectedCategory === '' ? 'bg-royalBlue text-white' : 'bg-gray-200'}`}>All</button>
        {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg ${selectedCategory === cat ? 'bg-royalBlue text-white' : 'bg-gray-200'}`}>{cat}</button>)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={p.image_url || "https://placehold.co/600x400/CCCCCC/white?text=No+Image"} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.category}</p>
              {p.price && <p className="text-royalBlue font-bold">${p.price}</p>}
              <button onClick={() => openWhatsApp(p.name)} className="mt-3 bg-green-500 text-white py-2 px-4 rounded w-full">Chat on WhatsApp</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
