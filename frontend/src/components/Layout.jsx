import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import FloatingWhatsApp from './FloatingWhatsApp';
import { useSettings } from '../hooks/useSettings';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-royalBlue">{settings.business_name || 'ALLAH IS GREAT'}</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-royalBlue">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-royalBlue">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-royalBlue">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-royalBlue">Contact</Link>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-3">
            <Link to="/" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </header>

      <main className="flex-grow"><Outlet /></main>

      <footer className="bg-darkGray text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-2">{settings.business_name}</h3>
              <p className="text-sm text-gray-300">{settings.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-white">Products</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-sm text-gray-300">📍 {settings.address}</p>
              <p className="text-sm text-gray-300">📞 {settings.phone}</p>
              <p className="text-sm text-gray-300">💬 WhatsApp: {settings.whatsapp}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {settings.business_name} – Everything Electronics Under One Roof.
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
