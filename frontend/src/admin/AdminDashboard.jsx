import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageProducts from './ManageProducts';
import ManageTestimonials from './ManageTestimonials';
import ManageDeals from './ManageDeals';
import ManageSettings from './ManageSettings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
    else setIsAuthorized(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!isAuthorized) return <div className="text-center py-8">Checking...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-royalBlue">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
      <div className="flex flex-wrap border-b mb-6">
        {['products','testimonials','deals','settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-royalBlue text-royalBlue font-bold' : ''}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {activeTab === 'products' && <ManageProducts />}
      {activeTab === 'testimonials' && <ManageTestimonials />}
      {activeTab === 'deals' && <ManageDeals />}
      {activeTab === 'settings' && <ManageSettings />}
    </div>
  );
};
export default AdminDashboard;
