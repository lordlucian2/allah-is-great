import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const ManageDeals = () => {
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '', type: 'Promotion', product_id: '', until_date: ''
  });

  const token = localStorage.getItem('adminToken');

  const fetchDeals = async () => {
    try {
      const res = await axios.get(apiUrl('/api/deals'));
      setDeals(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(apiUrl('/api/products'));
      setProducts(res.data);
    } catch (err) { console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchDeals();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editing) {
        await axios.put(apiUrl(`/api/admin/deals/${editing.id}`), formData, config);
      } else {
        await axios.post(apiUrl('/api/admin/deals'), formData, config);
      }
      resetForm();
      fetchDeals();
    } catch (err) {
      alert('Error saving deal');
    }
  };

  const handleEdit = (d) => {
    setEditing(d);
    setFormData({
      title: d.title,
      type: d.type,
      product_id: d.product_id || '',
      until_date: d.until_date ? d.until_date.split('T')[0] : ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this deal?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(apiUrl(`/api/admin/deals/${id}`), config);
      fetchDeals();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({ title: '', type: 'Promotion', product_id: '', until_date: '' });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Deal' : 'Add New Deal'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Deal Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="New Arrival">New Arrival</option>
            <option value="Promotion">Promotion</option>
            <option value="Best Seller">Best Seller</option>
          </select>
          <select name="product_id" value={formData.product_id} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Product (optional)</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="date" name="until_date" value={formData.until_date} onChange={handleChange} className="w-full p-2 border rounded" />
          <div className="space-x-2">
            <button type="submit" className="bg-royalBlue text-white py-2 px-4 rounded">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4">All Deals</h2>
      <div className="grid gap-4">
        {deals.map(d => (
          <div key={d.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p><span className="font-bold">{d.title}</span> – {d.type}</p>
              <p className="text-sm text-gray-600">Until: {d.until_date ? new Date(d.until_date).toLocaleDateString() : 'No expiry'}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(d)} className="bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
              <button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDeals;
