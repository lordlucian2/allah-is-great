import React, { useState } from 'react';
import { ShoppingCart, Moon, Sun, Search, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onSearch: (query: string) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cart,
  setIsCartOpen,
  darkMode,
  setDarkMode,
  onSearch
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (currentTab !== 'products') {
      setCurrentTab('products');
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
      darkMode 
        ? 'bg-slate-950/90 text-slate-100 border-slate-800/60 backdrop-blur-md'
        : 'bg-white/95 text-slate-900 border-slate-200/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div 
            className="flex flex-col cursor-pointer" 
            onClick={() => { setCurrentTab('home'); setIsMenuOpen(false); }}
            id="logo-container"
          >
            <span className={`text-xl sm:text-2xl font-black tracking-wider ${
              darkMode ? 'text-white' : 'text-slate-950'
            }`}>
              ALLAH IS GREAT
            </span>
            <span className="text-[10px] tracking-widest font-mono uppercase text-amber-500 font-semibold leading-3">
              Electronics & Electrical Store
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  onSearch(''); // Reset search on tab switch
                  setSearchQuery('');
                }}
                className={`relative py-2 text-sm font-medium tracking-wide transition-all ${
                  currentTab === item.id
                    ? 'text-amber-500 font-semibold scale-102'
                    : darkMode 
                      ? 'text-slate-400 hover:text-slate-200' 
                      : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Live Search bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
              <input
                type="text"
                placeholder="Search electronics..."
                value={searchQuery}
                id="header-search-input"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                  if (currentTab !== 'products') setCurrentTab('products');
                }}
                className={`py-1.5 pl-3 pr-8 text-xs rounded-full border transition-all duration-300 w-44 focus:w-60 focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-slate-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-850 focus:border-slate-350'
                }`}
              />
              <button type="submit" className="absolute right-2.5 text-slate-400 hover:text-amber-500 transition-colors">
                <Search size={14} />
              </button>
            </form>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full sm:hidden transition-colors ${
                darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Search"
            >
              <Search size={18} />
            </button>

            {/* Dark & Light Theme Switcher */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors border ${
                darkMode 
                  ? 'border-slate-800 hover:bg-slate-900 text-amber-400' 
                  : 'border-slate-100 hover:bg-slate-100 text-slate-600'
              }`}
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className={`p-2.5 rounded-full transition-colors relative border ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
              }`}
              title="View Cart"
            >
              <ShoppingCart size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full md:hidden transition-colors ${
                darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* Mobile Search input dropdown */}
        {searchOpen && (
          <div className="py-2 px-2 border-t border-slate-200 sm:hidden">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                className={`py-2 pl-3 pr-10 text-sm rounded-lg border w-full focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-200' 
                    : 'bg-slate-50 border-slate-200 text-slate-850'
                }`}
              />
              <button type="submit" className="absolute right-3 text-slate-400 hover:text-amber-500 transition-colors">
                <Search size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile drawer navigation */}
      {isMenuOpen && (
        <div className={`md:hidden border-t ${
          darkMode ? 'bg-slate-950 border-slate-900 text-slate-200' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  onSearch('');
                  setSearchQuery('');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-amber-500 text-slate-950'
                    : darkMode 
                      ? 'hover:bg-slate-900 text-slate-300' 
                      : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
