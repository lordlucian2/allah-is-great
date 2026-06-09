import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '', text: '', rating: 5, photo_url: ''
  });

  const token = localStorage.getItem('adminToken');

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(apiUrl('/api/testimonials'));
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
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
        await axios.put(apiUrl(`/api/admin/testimonials/${editing.id}`), formData, config);
      } else {
        await axios.post(apiUrl('/api/admin/testimonials'), formData, config);
      }
      resetForm();
      fetchTestimonials();
    } catch (err) {
      alert('Error saving testimonial');
    }
  };

  const handleEdit = (t) => {
    setEditing(t);
    setFormData({
      customer_name: t.customer_name,
      text: t.text,
      rating: t.rating,
      photo_url: t.photo_url || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(apiUrl(`/api/admin/testimonials/${id}`), config);
      fetchTestimonials();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({ customer_name: '', text: '', rating: 5, photo_url: '' });
  };

  if (loading) return <p>Loading testimonials...</p>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="text" placeholder="Testimonial Text" value={formData.text} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
          <select name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="5">5 ★★★★★</option><option value="4">4 ★★★★☆</option><option value="3">3 ★★★☆☆</option><option value="2">2 ★★☆☆☆</option><option value="1">1 ★☆☆☆☆</option>
          </select>
          <input type="text" name="photo_url" placeholder="Photo URL (optional)" value={formData.photo_url} onChange={handleChange} className="w-full p-2 border rounded" />
          <div className="space-x-2">
            <button type="submit" className="bg-royalBlue text-white py-2 px-4 rounded">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4">All Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="border p-4 rounded flex justify-between items-start">
            <div>
              <p><strong>{t.customer_name}</strong> – {'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</p>
              <p className="text-gray-600">"{t.text}"</p>
              {t.photo_url && t.photo_url.trim() !== "" && <img src={t.photo_url} alt={t.customer_name} className="w-12 h-12 rounded-full mt-2" />}
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(t)} className="bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTestimonials;
