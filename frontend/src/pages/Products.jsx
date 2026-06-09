import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = ""; // relative proxy

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = '231776070131';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
      const uniqueCategories = [...new Set(res.data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const openWhatsApp = (productName) => {
    const message = `Hello, I'm interested in the ${productName}. Is it currently available?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue mb-6">All Products</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royalBlue"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg transition ${selectedCategory === '' ? 'bg-royalBlue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${selectedCategory === cat ? 'bg-royalBlue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={product.image_url || "https://placehold.co/600x400/CCCCCC/white?text=No+Image"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                {product.price && <p className="text-royalBlue font-bold mt-1">${product.price}</p>}
                <p className={`text-sm mt-1 ${product.availability_status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.availability_status}
                </p>
                <button
                  onClick={() => openWhatsApp(product.name)}
                  className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full transition"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
};

export default Products;
