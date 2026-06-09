import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      setSettings(res.data || {});
    } catch (err) { console.error(err);
    } finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/admin/settings', settings, { headers: { Authorization: `Bearer ${token}` } });
      alert('Settings saved');
    } catch (err) { alert('Error saving');
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/change-password', passwordData, { headers: { Authorization: `Bearer ${token}` } });
      setPasswordMessage('Password updated');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordMessage(err.response?.data?.error || 'Error');
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="business_name" placeholder="Business Name" value={settings.business_name || ''} onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="tagline" placeholder="Tagline" value={settings.tagline || ''} onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="logo_url" placeholder="Logo URL" value={settings.logo_url || ''} onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="hero_headline" placeholder="Hero Headline" value={settings.hero_headline || ''} onChange={handleChange} className="p-2 border rounded" />
          <textarea name="hero_subheadline" placeholder="Hero Subheadline" value={settings.hero_subheadline || ''} onChange={handleChange} className="p-2 border rounded col-span-2" rows="2" />
          <input type="text" name="hero_image" placeholder="Hero Image URL" value={settings.hero_image || ''} onChange={handleChange} className="p-2 border rounded col-span-2" />
          <input type="text" name="phone" placeholder="Phone" value={settings.phone || ''} onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="whatsapp" placeholder="WhatsApp (numbers only)" value={settings.whatsapp || ''} onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="address" placeholder="Address" value={settings.address || ''} onChange={handleChange} className="p-2 border rounded col-span-2" />
          <input type="text" name="business_hours" placeholder="Business Hours" value={settings.business_hours || ''} onChange={handleChange} className="p-2 border rounded col-span-2" />
          <textarea name="whatsapp_message" placeholder="WhatsApp Template ([PRODUCT_NAME] replaced)" value={settings.whatsapp_message || ''} onChange={handleChange} className="p-2 border rounded col-span-2" rows="2" />
        </div>
        <button type="submit" disabled={saving} className="bg-royalBlue text-white py-2 px-4 rounded">Save Settings</button>
      </form>

      <hr />
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h2 className="text-2xl font-bold">Change Admin Password</h2>
        {passwordMessage && <div className="bg-green-100 text-green-700 p-2 rounded">{passwordMessage}</div>}
        <input type="password" placeholder="Current Password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="p-2 border rounded w-full" required />
        <input type="password" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="p-2 border rounded w-full" required />
        <button type="submit" className="bg-orange text-white py-2 px-4 rounded">Change Password</button>
      </form>
    </div>
  );
};
export default ManageSettings;
