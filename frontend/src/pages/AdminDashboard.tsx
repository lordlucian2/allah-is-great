import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Coins, TrendingUp, CheckCircle, 
  Plus, Edit2, Trash2, Search, Filter, X, Eye, LogOut, Check, ChevronRight, AlertCircle, FileText
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data';
import { formatPrice } from '../utils/price';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryLocation: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    selectedColor?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AdminDashboardProps {
  darkMode: boolean;
  productsList: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  darkMode,
  productsList,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onLogout
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders'>('overview');

  // Load orders from LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('allah_is_great_orders');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Fallback seed orders if empty
    return [
      {
        id: "ORD-9841",
        customerName: "Theresa Kollie",
        customerPhone: "+231776899401",
        customerEmail: "tkollie@gmail.com",
        deliveryLocation: "Tubman Boulevard, Sinkor, Monrovia",
        items: [
          { productName: "Samsung Galaxy A54 5G", quantity: 1, price: 349.99, selectedColor: "Awesome Graphite" },
          { productName: "Rugged Dual USB Power Surge Protector Socket", quantity: 2, price: 24.50 }
        ],
        subtotal: 398.99,
        deliveryFee: 0,
        total: 398.99,
        status: "completed",
        createdAt: "2026-06-08T14:32:00Z"
      },
      {
        id: "ORD-1283",
        customerName: "Jefferson Flomo",
        customerPhone: "+231778012445",
        customerEmail: "jflomo@outlook.com",
        deliveryLocation: "New Georgia Estate, Block E",
        items: [
          { productName: "ALLAH IS GREAT Super Bass Portable Bluetooth Speaker", quantity: 1, price: 45.00, selectedColor: "Luminous Gold" }
        ],
        subtotal: 45.00,
        deliveryFee: 5.00,
        total: 50.00,
        status: "pending",
        createdAt: "2026-06-09T09:12:00Z"
      },
      {
        id: "ORD-4122",
        customerName: "Amara Kamara",
        customerPhone: "+231776510443",
        customerEmail: "akamara@gmail.com",
        deliveryLocation: "Gardnersville Road, Monrovia",
        items: [
          { productName: "Super-Fast Type-C Braided Charging Cord", quantity: 5, price: 9.99 },
          { productName: "Premium Sound Cancelling Headset v5.3", quantity: 1, price: 89.00, selectedColor: "Midnight Slate" }
        ],
        subtotal: 138.95,
        deliveryFee: 5.00,
        total: 143.95,
        status: "processing",
        createdAt: "2026-06-09T11:45:00Z"
      }
    ];
  });

  // Sync orders to LocalStorage
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    try {
      localStorage.setItem('allah_is_great_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.error(e);
    }
  };

  // Orders control actions
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`Do you really want to delete order ${orderId} from administrative records?`)) {
      const updated = orders.filter(o => o.id !== orderId);
      saveOrders(updated);
    }
  };

  // Selected Order for detail overlay
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Search/Filter states for Inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('');

  // Add / Edit Product modal overlays
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Products
  const [prodForm, setProdForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'smartphones',
    brand: 'Generic',
    image: '',
    description: '',
    badgeText: '',
    specsRaw: 'Processor: Octa-core High Speed\nWarranty: 1 Year Shop Warranty\nGrid Compatibility: 220V standard'
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      price: '',
      originalPrice: '',
      category: 'smartphones',
      brand: 'Generic',
      image: '',
      description: '',
      badgeText: 'NEW',
      specsRaw: 'Processor: Hexa-core High Speed\nWarranty: 1 Year Shop Warranty\nGrid Compatibility: 220V standard'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    
    // Structure key value specs back into textarea formatted guidelines
    const specsString = Object.entries(p.specs)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    setProdForm({
      name: p.name,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      category: p.category,
      brand: p.brand,
      image: p.image,
      description: p.description,
      badgeText: p.badgeText || '',
      specsRaw: specsString
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.price || !prodForm.image) {
      alert('Mandatory parameters missing! Please verify (Name, Price, and Asset Image URL).');
      return;
    }

    // Parse specs multi lines
    const parsedSpecs: Record<string, string> = {};
    prodForm.specsRaw.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx > -1) {
        const k = line.substring(0, idx).trim();
        const v = line.substring(idx + 1).trim();
        if (k && v) parsedSpecs[k] = v;
      }
    });

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `PROD-${Date.now()}`,
      name: prodForm.name,
      price: parseFloat(prodForm.price) || 0,
      originalPrice: prodForm.originalPrice ? parseFloat(prodForm.originalPrice) : undefined,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      category: prodForm.category,
      brand: prodForm.brand,
      image: prodForm.image,
      images: [prodForm.image],
      description: prodForm.description || 'Verified high performance electronic equipment tailored for our Monrovia clientele, certified compatible under standard power grids.',
      specs: Object.keys(parsedSpecs).length > 0 ? parsedSpecs : { "Utility": "Durable hardware", "Store Support": "Verified" },
      badgeText: prodForm.badgeText || undefined,
      colors: editingProduct?.colors || [{ name: 'Default Carbon', hex: '#1e293b' }]
    };

    if (editingProduct) {
      onEditProduct(productData);
    } else {
      onAddProduct(productData);
    }

    setIsProductModalOpen(false);
  };

  const uploadImageToCloudinary = async (file: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setUploadMessage('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
      return;
    }

    setIsUploadingImage(true);
    setUploadMessage('Uploading image to Cloudinary...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message || 'Upload failed');
      }

      setProdForm((prev) => ({ ...prev, image: result.secure_url }));
      setUploadMessage('Upload succeeded. Image URL has been filled in.');
    } catch (error) {
      console.error('Cloudinary upload failed', error);
      setUploadMessage('Image upload failed. Please use a direct image URL instead.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadImageToCloudinary(file);
  };

  const handleDeleteProductPrompt = (id: string, name: string) => {
    if (confirm(`Are you absolutely sure you want to delete "${name}" from the store catalog?`)) {
      onDeleteProduct(id);
    }
  };

  // computed filtered listings
  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      const q = inventorySearch.toLowerCase().trim();
      const matchesSearch = q === '' || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesCategory = inventoryCategory === '' || p.category === inventoryCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productsList, inventorySearch, inventoryCategory]);

  // Overall statistics computing
  const stats = useMemo(() => {
    const totalOrderRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const processingCount = orders.filter(o => o.status === 'processing').length;
    const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;
    const itemsInStore = productsList.length;

    return {
      totalOrderRevenue,
      pendingCount,
      processingCount,
      uniqueCustomers,
      itemsInStore
    };
  }, [orders, productsList]);

  return (
    <div className={`transition-colors duration-300 py-6 min-h-screen ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP METRIC / TITLE REGION */}
        <div className={`p-6 rounded-3xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-amber-500/15 text-amber-500 rounded-2xl border border-amber-500/30 shadow-inner">
              <LayoutDashboard size={28} />
            </div>
            <div className="text-left">
              <p className="text-[10px] tracking-widest font-mono uppercase text-amber-500 font-bold leading-3">Supervisor Dashboard</p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">ALLAH IS GREAT Administration</h1>
            </div>
          </div>

          {/* Action Tabs & Logout trigger */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'overview', label: 'Monitor Desk', icon: <TrendingUp size={14} /> },
              { id: 'inventory', label: 'Inventory Desk', icon: <Package size={14} /> },
              { id: 'orders', label: 'Client Orders', icon: <ShoppingCart size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : darkMode 
                      ? 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800/80' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}

            <button
              onClick={onLogout}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                darkMode ? 'border-red-950/40 bg-red-950/10 hover:bg-red-950/30 text-red-400' : 'border-red-200 bg-red-50 hover:bg-red-100 text-red-650'
              }`}
              title="Logout Authorized Session"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* OVERVIEW MONITOR PANEL */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Bento statistics grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Sales income */}
              <div className={`p-6 rounded-2xl border text-left flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Settled Revenue</span>
                  <h3 className="text-2xl font-black text-amber-500 font-mono">${formatPrice(stats.totalOrderRevenue)}</h3>
                  <p className="text-[10px] text-slate-500">From completed client dispatches</p>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/10">
                  <Coins size={20} />
                </div>
              </div>

              {/* Pending Orders Count */}
              <div className={`p-6 rounded-2xl border text-left flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Awaiting Pickup</span>
                  <h3 className="text-2xl font-black text-amber-500 font-mono">{stats.pendingCount}</h3>
                  <p className="text-[10px] text-slate-500">New pending WhatsApp requests</p>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/10">
                  <ShoppingCart size={20} />
                </div>
              </div>

              {/* Processing Orders Count */}
              <div className={`p-6 rounded-2xl border text-left flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Processing dispatch</span>
                  <h3 className="text-2xl font-black text-amber-500 font-mono">{stats.processingCount}</h3>
                  <p className="text-[10px] text-slate-500">At New Georgia Estate outpost</p>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/10">
                  <TrendingUp size={20} />
                </div>
              </div>

              {/* Total Active Categories / Catalog Products */}
              <div className={`p-6 rounded-2xl border text-left flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Stock Catalog</span>
                  <h3 className="text-2xl font-black text-amber-500 font-mono">{stats.itemsInStore}</h3>
                  <p className="text-[10px] text-slate-500">Unique electronic item models</p>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/10">
                  <Package size={20} />
                </div>
              </div>

            </div>

            {/* QUICK HIGHLIGHT ROWS (LAST ORDERS & STOCK CAP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Recent Orders Overview */}
              <div className={`lg:col-span-8 p-6 rounded-2xl border text-left ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between border-b border-dashed border-slate-800 pb-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-amber-500" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">Awaiting Dispatch Queue</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-500 hover:underline uppercase tracking-widest font-bold"
                  >
                    Manage Orders
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No orders registered on database.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-405 border-b border-slate-800 pl-2 tracking-wider font-bold uppercase text-[10px]">
                          <th className="py-2.5 font-bold">Client ID</th>
                          <th className="py-2.5 font-bold">Client Name</th>
                          <th className="py-2.5 font-bold">Dispatch Location</th>
                          <th className="py-2.5 font-bold">Sum total</th>
                          <th className="py-2.5 font-bold">Status</th>
                          <th className="py-2.5 font-bold text-right">View</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-805/40 font-medium">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-slate-950/20">
                            <td className="py-3 font-mono font-bold text-amber-500">{o.id}</td>
                            <td className="py-3 font-extrabold">{o.customerName}</td>
                            <td className="py-3 text-slate-400 truncate max-w-[170px]" title={o.deliveryLocation}>
                              {o.deliveryLocation}
                            </td>
                            <td className="py-3 font-mono font-bold text-slate-350">${formatPrice(o.total)}</td>
                            <td className="py-3 font-bold">
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                                o.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10' :
                                o.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/10' :
                                o.status === 'cancelled' ? 'bg-red-500/15 text-red-500/85 border border-red-500/10' :
                                'bg-amber-500/10 text-amber-500 border border-amber-500/10'
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => setSelectedOrder(o)}
                                className="text-slate-400 hover:text-white"
                              >
                                <Eye size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right Column: Store Quick Guidelines */}
              <div className={`lg:col-span-4 p-6 rounded-2xl border text-left ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h3 className="font-extrabold text-sm uppercase tracking-wide border-b border-dashed border-slate-800 pb-4 mb-4 text-slate-900 dark:text-white">
                  Guideline Logins
                </h3>
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-black text-amber-500">Order Dispatches</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      When customers purchase items and press "Submit on WhatsApp", the system formats their order details. As admin, you can also log mock or real orders here to track home delivery runs across Gardnersville and Sinkor.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-amber-500 font-sans">100% Client-Side Sync</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      All CRUD inventory updates (Add, Edit, Delete) modify the application state locally and commit directly to the cache, providing a seamless high-fidelity playground dashboard.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* INVENTORY MANAGEMENT DESK PANEL */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fadeIn text-left">
            
            {/* Filter and controls header strip bar */}
            <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              {/* Search text input */}
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Filter store listing..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className={`w-full py-2 pl-9 pr-4 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-810 text-slate-200 focus:border-slate-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 text-slate-404" size={13} />
              </div>

              {/* Action Filters and Add trigger */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                
                {/* Category select */}
                <select
                  value={inventoryCategory}
                  onChange={(e) => setInventoryCategory(e.target.value)}
                  className={`py-1.5 px-3 text-xs font-bold font-sans rounded-xl border focus:outline-none ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                {/* Add new button */}
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black tracking-wide text-xs rounded-xl flex items-center space-x-1 shadow transform active:scale-97 transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Product Model</span>
                </button>

              </div>
            </div>

            {/* Master Products catalog grid list */}
            <div className={`rounded-2xl border overflow-hidden ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 bg-slate-950/30 dark:bg-slate-950/60 border-b border-slate-800 pl-3 tracking-wider font-extrabold uppercase text-[10px]">
                      <th className="py-3 px-4 font-bold">Image</th>
                      <th className="py-3 px-4 font-bold">Product Name</th>
                      <th className="py-3 px-4 font-bold">Category</th>
                      <th className="py-3 px-4 font-bold">Brand</th>
                      <th className="py-3 px-4 font-bold">Listed Price</th>
                      <th className="py-3 px-4 font-bold">Original Price</th>
                      <th className="py-3 px-4 font-bold">Badge Text</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-semibold">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                          No items loaded under current filter search specifications.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-950/15">
                          {/* Image asset */}
                          <td className="py-3 px-4">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-10 h-10 object-cover rounded-lg border border-slate-250/50 dark:border-slate-801/80" 
                            />
                          </td>
                          {/* Name title */}
                          <td className="py-3 px-4">
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-slate-905 dark:text-white max-w-[200px] truncate">{p.name}</p>
                              <span className="text-[9px] font-mono font-bold text-slate-450 uppercase">{p.id}</span>
                            </div>
                          </td>
                          {/* category */}
                          <td className="py-3 px-4 capitalize font-mono text-slate-400">{p.category}</td>
                          {/* brand */}
                          <td className="py-3 px-4 text-slate-300 capitalize">{p.brand}</td>
                          {/* price */}
                          <td className="py-3 px-4 font-mono font-bold text-amber-500">${formatPrice(p.price)}</td>
                          {/* original price */}
                          <td className="py-3 px-4 font-mono text-slate-400">
                            {p.originalPrice ? `$${formatPrice(p.originalPrice)}` : '—'}
                          </td>
                          {/* badge */}
                          <td className="py-3 px-4">
                            {p.badgeText ? (
                              <span className="px-2 py-0.5 text-[8.5px] font-black uppercase text-slate-900 bg-amber-400 rounded">
                                {p.badgeText}
                              </span>
                            ) : (
                              <span className="text-slate-501 font-mono text-[10px]">—</span>
                            )}
                          </td>
                          {/* Actions columns */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className={`p-2 rounded-lg border transition-colors ${
                                  darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-350Hover hover:text-white' : 'border-slate-20bw bg-slate-50 hover:bg-slate-100 text-slate-655'
                                }`}
                                title="Edit Product details"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteProductPrompt(p.id, p.name)}
                                className={`p-2 rounded-lg border transition-colors ${
                                  darkMode ? 'border-red-950/40 bg-red-950/5 hover:bg-red-950/25 text-red-400' : 'border-red-15a bg-red-50 hover:bg-red-100 text-red-600'
                                }`}
                                title="Delete product item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* CUSTOMER ORDERS DESK PANEL */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn text-left">
            
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-slate-900 border-slate-805' : 'bg-white border-slate-205 shadow-sm'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={16} className="text-amber-500" />
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">Client Inbound Inquiries</h3>
                </div>
                <span className="text-[10px] font-mono bg-slate-950 px-2.5 py-1 rounded text-slate-400">
                  Total Managed logs: <strong>{orders.length}</strong>
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-500 italic text-xs">
                  No order requests captured in store databases yet. Placing a dummy cart inquiry automatically triggers logs.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-410 border-b border-slate-800 pb-3 tracking-wider font-extrabold uppercase text-[10px]">
                        <th className="py-3 px-2 font-bold">Order UID</th>
                        <th className="py-3 px-2 font-bold">Client Metadata</th>
                        <th className="py-3 px-2 font-bold">Date & Time</th>
                        <th className="py-3 px-2 font-bold">Total price</th>
                        <th className="py-3 px-2 font-bold">Dispatch Status</th>
                        <th className="py-3 px-2 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-840/50 font-semibold text-slate-200">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-950/20 text-slate-800 dark:text-slate-200">
                          
                          {/* Order ID */}
                          <td className="py-3.5 px-2 font-mono font-extrabold text-amber-500">{o.id}</td>
                          
                          {/* Customer info */}
                          <td className="py-3.5 px-2">
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-slate-900 dark:text-white text-xs">{o.customerName}</p>
                              <p className="text-[10px] font-mono text-slate-500">{o.customerPhone} • {o.customerEmail}</p>
                            </div>
                          </td>
                          
                          {/* Date */}
                          <td className="py-3.5 px-2 text-slate-450 text-xs">
                            {new Date(o.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          
                          {/* Total */}
                          <td className="py-3.5 px-2 font-mono font-bold text-sm text-slate-900 dark:text-amber-500">
                            ${formatPrice(o.total)}
                          </td>
                          
                          {/* Status pill select dropdown */}
                          <td className="py-3.5 px-2">
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                              className={`py-1 px-2.5 text-xs text-center font-bold tracking-wider font-sans rounded border focus:outline-none cursor-pointer uppercase ${
                                o.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15' :
                                o.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/15' :
                                o.status === 'cancelled' ? 'bg-red-500/15 text-red-500/85 border-red-500/15' :
                                'bg-amber-500/10 text-amber-500 border-amber-500/30'
                              }`}
                            >
                              <option value="pending">PENDING</option>
                              <option value="processing">PROCESSING</option>
                              <option value="completed">COMPLETED</option>
                              <option value="cancelled">CANCELLED</option>
                            </select>
                          </td>

                          {/* actions column */}
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setSelectedOrder(o)}
                                className={`p-2 rounded-lg border transition-colors ${
                                  darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-350' : 'border-slate-201 bg-slate-50 hover:bg-slate-100 text-slate-700'
                                }`}
                                title="Inspect Cart item lists"
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(o.id)}
                                className={`p-2 rounded-lg border transition-colors ${
                                  darkMode ? 'border-red-950/40 bg-red-950/20 hover:bg-red-950/40 text-red-405' : 'border-red-15a bg-red-50 hover:bg-red-100 text-red-651'
                                }`}
                                title="Delete Order record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= EDIT / CREATE PRODUCT DRAWER OVERLAY MODAL ================= */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)} />
            
            <div className={`relative max-w-xl w-full rounded-3xl border overflow-hidden p-6 sm:p-8 flex flex-col max-h-[90vh] ${
              darkMode ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-2xl' : 'bg-white text-slate-800 border-slate-200 shadow-xl'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-5">
                <h3 className="text-lg font-black uppercase text-amber-500">
                  {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Electronics Product'}
                </h3>
                <button 
                  onClick={() => setIsProductModalOpen(false)} 
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSaveProductForm} className="space-y-4 text-left overflow-y-auto pr-1">
                
                {/* 1. Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Surge Protection Adapter"
                    value={prodForm.name}
                    onChange={(e) => setProdForm({...prodForm, name: e.target.value})}
                    className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* 2. Grid Prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Price (USD) *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      placeholder="E.g., 299.99"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({...prodForm, price: e.target.value})}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Original / Strike Price</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="E.g., 349.99"
                      value={prodForm.originalPrice}
                      onChange={(e) => setProdForm({...prodForm, originalPrice: e.target.value})}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Category & Brand */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Category Tab *</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) => setProdForm({...prodForm, category: e.target.value})}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Product Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Samsung / ALLAH IS GREAT"
                      value={prodForm.brand}
                      onChange={(e) => setProdForm({...prodForm, brand: e.target.value})}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* 4. Asset URL */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Image Asset URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={prodForm.image}
                    onChange={(e) => setProdForm({...prodForm, image: e.target.value})}
                    className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <span className="text-[9px] text-slate-450 leading-relaxed italic block mt-0.5">
                    Provide an Unsplash, direct image link or placeholder for visual rendering.
                  </span>

                  <div className="mt-3 border border-dashed rounded-2xl p-3 bg-slate-950/10">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 block">
                      Upload image from device (Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="block w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950"
                    />
                    <p className="text-[9px] text-slate-500 mt-2">
                      {CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET
                        ? 'Select an image to upload directly to Cloudinary. The resulting image URL will populate the Image Asset URL field automatically.'
                        : 'Cloudinary upload is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to enable direct uploads.'}
                    </p>
                    {uploadMessage && (
                      <p className="text-[9px] mt-2 text-amber-300">{uploadMessage}</p>
                    )}
                    {isUploadingImage && (
                      <p className="text-[9px] mt-1 text-slate-300">Uploading...</p>
                    )}
                  </div>
                </div>

                {/* 5. Custom Badge / Deal Text */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Badge Overlay / Promo Label</label>
                  <input
                    type="text"
                    placeholder="E.g., NEW ARRIVAL, 20% OFF, BESTSELLER"
                    value={prodForm.badgeText}
                    onChange={(e) => setProdForm({...prodForm, badgeText: e.target.value})}
                    className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* 6. Description */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Detailed Description</label>
                  <textarea
                    placeholder="Provide a promotional write-up concerning hardware specs and power capabilities..."
                    rows={2}
                    value={prodForm.description}
                    onChange={(e) => setProdForm({...prodForm, description: e.target.value})}
                    className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* 7. Specs parsed Raw text */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Overview Specifications (key: value)</label>
                  <textarea
                    placeholder="Warranty: 1 Year Shop Warranty&#10;Grid Compatibility: 220V standard Power&#10;Capacity: 20000mAh Powerbank"
                    rows={3}
                    value={prodForm.specsRaw}
                    onChange={(e) => setProdForm({...prodForm, specsRaw: e.target.value})}
                    className={`py-2 px-3 text-xs font-mono rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* Action buttons */}
                <div className="pt-4 flex items-center justify-end space-x-2 border-t border-dashed border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer ${
                      darkMode ? 'bg-slate-950 hover:bg-slate-800 text-slate-350' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wide rounded-xl shadow cursor-pointer transition-all active:scale-97"
                  >
                    {editingProduct ? 'Update Product' : 'Commit to Catalog'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ================= INSPECT ORDER SPECIFIC MODAL OVERLAY ================= */}
        {selectedOrder && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
            
            <div className={`relative max-w-lg w-full rounded-3xl border overflow-hidden p-6 sm:p-8 flex flex-col max-h-[85vh] ${
              darkMode ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-2xl' : 'bg-white text-slate-801 border-slate-200 shadow-xl'
            }`}>
              
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-amber-500">Order Logs</span>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">Inquiry Details for {selectedOrder.id}</h4>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-810"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Informative details */}
              <div className="space-y-5 text-left overflow-y-auto pr-1 text-xs">
                
                {/* Client contacts */}
                <div className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-1.5">
                  <p className="font-bold uppercase text-[9px] tracking-wider text-slate-400">Recipient Information</p>
                  <div className="font-semibold text-slate-850 dark:text-slate-100 space-y-1">
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${selectedOrder.customerPhone}`} className="hover:underline text-amber-400">{selectedOrder.customerPhone}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${selectedOrder.customerEmail}`} className="hover:underline text-amber-400">{selectedOrder.customerEmail}</a></p>
                    <p><strong>Delivery Path:</strong> {selectedOrder.deliveryLocation}</p>
                  </div>
                </div>

                {/* Items collection list */}
                <div className="space-y-2">
                  <p className="font-bold uppercase text-[9px] tracking-wider text-slate-400">Cart Itemizations</p>
                  <div className="divide-y divide-slate-800 border rounded-2xl overflow-hidden bg-slate-955 dark:bg-slate-950/40 border-slate-205 dark:border-slate-800">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between gap-4 font-semibold text-xs text-slate-800 dark:text-slate-200">
                        <div className="space-y-0.5 truncate flex-1 text-left">
                          <p className="font-black truncate text-slate-900 dark:text-white">{item.productName}</p>
                          {item.selectedColor && (
                            <p className="text-[10px] text-slate-400 font-mono">Tone: {item.selectedColor}</p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono">{item.quantity} x ${formatPrice(item.price)}</p>
                          <p className="font-mono text-amber-500 font-black">${formatPrice(item.quantity * item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing sum summary */}
                <div className="space-y-1 text-right font-semibold border-t border-dashed border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Inquiry Subtotal:</span>
                    <span className="font-mono">${formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Delivery Setup:</span>
                    <span className="font-mono">
                      {selectedOrder.deliveryFee === 0 ? 'FREE' : `$${formatPrice(selectedOrder.deliveryFee)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-black text-amber-500 pt-1 border-t border-slate-800 mt-1">
                    <span className="dark:text-white">Active Total:</span>
                    <span className="font-mono text-lg">${formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

              </div>

              {/* Close footer */}
              <div className="pt-4 mt-4 border-t border-slate-800 text-right">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs rounded-xl shadow cursor-pointer transition-all"
                >
                  Close Receipt
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
