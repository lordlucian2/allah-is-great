import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Mock Data
import { PRODUCTS } from './data';
import { Product, CartItem, Testimonial } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Import fallback testimonials to manage dynamic overrides
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem('allah_is_great_testimonials');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  // Store settings loaded dynamically
  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: 'ALLAH IS GREAT',
    phone: '+231776070131',
    email: 'info@allahisgreat.com',
    whatsapp: '231776070131',
    deliveryFee: 5.00
  });

  // Dynamic Products List synchronized with LocalStorage & loaded from API
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('allah_is_great_products');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Admin access state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem('allah_is_great_admin_logged');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Run dynamic fetch on component mount
  useEffect(() => {
    // 1. Fetch Products
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Could not fetch products');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
          try {
            localStorage.setItem('allah_is_great_products', JSON.stringify(data));
          } catch {}
        }
      })
      .catch(err => {
        console.warn('GET /api/products fallback active:', err);
      });

    // 2. Fetch Testimonials
    fetch('/api/testimonials')
      .then(res => {
        if (!res.ok) throw new Error('Could not fetch testimonials');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonialsList(data);
          try {
            localStorage.setItem('allah_is_great_testimonials', JSON.stringify(data));
          } catch {}
        }
      })
      .catch(err => {
        console.warn('GET /api/testimonials fallback active:', err);
      });

    // 3. Fetch Settings
    fetch('/api/settings')
      .then(res => {
        if (!res.ok) throw new Error('Could not fetch settings');
        return res.json();
      })
      .then(data => {
        if (data && typeof data === 'object') {
          setStoreSettings((prev: any) => ({ ...prev, ...data }));
        }
      })
      .catch(err => {
        console.warn('GET /api/settings fallback active:', err);
      });
  }, []);

  // Helper CRUD administrative methods using server state with local replication
  const handleAddProduct = (newProd: Product) => {
    const adminToken = localStorage.getItem('allah_is_great_admin_token') || '';

    // Optimistically update locally
    const updated = [newProd, ...productsList];
    setProductsList(updated);
    try {
      localStorage.setItem('allah_is_great_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Call real POST backend
    fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(newProd)
    })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit product creation');
      }
      return res.json().catch(() => null);
    })
    .then((savedProd) => {
      if (savedProd && savedProd.id) {
        // Re-sync with actual ID or specs from database saved output
        setProductsList(prev => {
          const index = prev.findIndex(p => p.id === newProd.id);
          if (index > -1) {
            const copy = [...prev];
            copy[index] = savedProd;
            try {
              localStorage.setItem('allah_is_great_products', JSON.stringify(copy));
            } catch {}
            return copy;
          }
          return prev;
        });
      }
    })
    .catch((err) => {
      console.error('POST /api/admin/products remote error:', err);
    });
  };

  const handleEditProduct = (editedProd: Product) => {
    const adminToken = localStorage.getItem('allah_is_great_admin_token') || '';

    // Optimistically update locally
    const updated = productsList.map(p => p.id === editedProd.id ? editedProd : p);
    setProductsList(updated);
    try {
      localStorage.setItem('allah_is_great_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Call real PUT backend
    fetch(`/api/admin/products/${editedProd.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(editedProd)
    })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to update remote product details');
      }
    })
    .catch((err) => {
      console.error('PUT /api/admin/products/:id remote error:', err);
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const adminToken = localStorage.getItem('allah_is_great_admin_token') || '';

    // Optimistically update locally
    const updated = productsList.filter(p => p.id !== productId);
    setProductsList(updated);
    try {
      localStorage.setItem('allah_is_great_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Call real DELETE backend
    fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to delete remote product');
      }
    })
    .catch((err) => {
      console.error('DELETE /api/admin/products/:id remote error:', err);
    });
  };

  // Parse Shopping Cart from LocalStorage on mount
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('allah_is_great_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Theme setting from LocalStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('allah_is_great_dark');
      if (stored !== null) {
        return stored === 'true';
      }
      return true; // Default to eye-care dark theme like in Image 2
    } catch {
      return true;
    }
  });

  // Sync state modifications with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('allah_is_great_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('allah_is_great_dark', String(darkMode));
    } catch (e) {
      console.error(e);
    }

    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      sessionStorage.setItem('allah_is_great_admin_logged', String(isAdminLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // Sync productsList with other storage event triggers
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('allah_is_great_products');
        if (stored) {
          setProductsList(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Navigate utility that resets page scroll
  const handleNavigateTab = (tab: string, catFilter?: string) => {
    setCurrentTab(tab);
    setSelectedProduct(null);
    setSearchFilter('');
    setCategoryFilter(catFilter || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Item to Purchase Cart
  const handleAddToCart = (product: Product, selectedColor?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { product, quantity: 1, selectedColor }];
      }
    });

    // Auto trigger slide drawer for outstanding feedback
    setIsCartOpen(true);
  };

  // Update Item Quantity in Cart
  const handleUpdateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (productId: string, selectedColor?: string) => {
    setCart((prev) => 
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor))
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-350 overflow-x-hidden ${
      darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'
    }`} id="app-root-chassis">
      
      {/* HEADER COMPONENT */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={handleNavigateTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSearch={(query) => {
          setSearchFilter(query);
          if (query && currentTab !== 'products') {
            setCurrentTab('products');
            setSelectedProduct(null);
          }
        }}
      />

      {/* VIEWPORT CONTROLLER SWITCH */}
      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetail 
            darkMode={darkMode}
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            allProducts={productsList}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentTab === 'home' ? (
          <Home 
            darkMode={darkMode}
            onNavigateTab={handleNavigateTab}
            onSelectProduct={handleSelectProduct}
            products={productsList}
            onAddToCart={handleAddToCart}
            testimonials={testimonialsList}
          />
        ) : currentTab === 'products' ? (
          <Products 
            darkMode={darkMode}
            products={productsList}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            searchFilter={searchFilter}
            categoryFilter={categoryFilter}
          />
        ) : currentTab === 'about' ? (
          <About darkMode={darkMode} />
        ) : currentTab === 'contact' ? (
          <Contact darkMode={darkMode} />
        ) : currentTab === 'admin_login' || currentTab === 'admin_dashboard' ? (
          isAdminLoggedIn ? (
            <AdminDashboard 
              darkMode={darkMode}
              productsList={productsList}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onLogout={() => {
                setIsAdminLoggedIn(false);
                setCurrentTab('home');
              }}
            />
          ) : (
            <AdminLogin 
              darkMode={darkMode}
              onLoginSuccess={() => {
                setIsAdminLoggedIn(true);
                setCurrentTab('admin_dashboard');
              }}
            />
          )
        ) : (
          <Home 
            darkMode={darkMode}
            onNavigateTab={handleNavigateTab}
            onSelectProduct={handleSelectProduct}
            products={productsList}
            onAddToCart={handleAddToCart}
            testimonials={testimonialsList}
          />
        )}
      </main>

      {/* FOOTER COMPONENT */}
      <Footer 
        darkMode={darkMode} 
        setCurrentTab={handleNavigateTab}
        setIsCartOpen={setIsCartOpen} 
      />

      {/* PERSISTENT FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

      {/* RE-USABLE CART SLIDING DRAWER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        darkMode={darkMode}
        setCurrentTab={handleNavigateTab}
      />

    </div>
  );
}
