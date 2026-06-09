import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import FloatingWhatsApp from './FloatingWhatsApp';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-royalBlue text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading font-bold">ALLAH IS GREAT</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-orange transition">Home</Link>
            <Link to="/products" className="hover:text-orange transition">Products</Link>
            <Link to="/about" className="hover:text-orange transition">About</Link>
            <Link to="/contact" className="hover:text-orange transition">Contact</Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-royalBlue px-4 pb-4 flex flex-col space-y-2">
            <Link to="/" className="py-2 hover:text-orange transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="py-2 hover:text-orange transition" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" className="py-2 hover:text-orange transition" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="py-2 hover:text-orange transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-darkGray text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 ALLAH IS GREAT – Everything Electronics Under One Roof.</p>
          <p className="mt-2">📍 New Georgia Estate, Liberia | 📞 +231 776 070 131</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
