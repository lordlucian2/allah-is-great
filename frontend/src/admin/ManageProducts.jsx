import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', availability_status: 'In Stock',
    image_url: '', description: '', is_featured: false
  });

  const token = localStorage.getItem('adminToken');

  const fetchProducts = async () => {
    try {
      const res = await axios.get(apiUrl('/api/products'));
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingProduct) {
        await axios.put(apiUrl(`/api/admin/products/${editingProduct.id}`), formData, config);
      } else {
        await axios.post(apiUrl('/api/admin/products'), formData, config);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price || '',
      availability_status: product.availability_status,
      image_url: product.image_url,
      description: product.description || '',
      is_featured: product.is_featured || false
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(apiUrl(`/api/admin/products/${id}`), config);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '', category: '', price: '', availability_status: 'In Stock',
      image_url: '', description: '', is_featured: false
    });
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
          <select name="availability_status" value={formData.availability_status} onChange={handleChange} className="w-full p-2 border rounded">
            <option>In Stock</option><option>Out of Stock</option>
          </select>
          <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          <label className="flex items-center"><input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="mr-2" /> Featured Product</label>
          <div className="space-x-2">
            <button type="submit" className="bg-royalBlue text-white py-2 px-4 rounded">{editingProduct ? 'Update' : 'Create'}</button>
            {editingProduct && <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr><th className="p-2 border">ID</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.availability_status}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
