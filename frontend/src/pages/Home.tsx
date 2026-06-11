import { motion } from 'motion/react';
import { 
  Smartphone, Headphones, Laptop, Home as HomeIcon, Zap, Usb, 
  Wind, Cable, Volume2, BatteryCharging, Star, Shield, 
  Truck, HelpCircle, BadgePercent, ThumbsUp, ArrowRight, MessageSquare 
} from 'lucide-react';
import { Product, Testimonial } from '../types';
import { CATEGORIES, TESTIMONIALS } from '../data';
import { formatPrice } from '../utils/price';

interface HomeProps {
  darkMode: boolean;
  onNavigateTab: (tab: string, categoryFilter?: string) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  testimonials?: Testimonial[];
}

export default function Home({
  darkMode,
  onNavigateTab,
  onSelectProduct,
  products,
  onAddToCart,
  testimonials = TESTIMONIALS
}: HomeProps) {

  // Icons mapper for Categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="text-amber-500 shrink-0" size={28} />;
      case 'Headphones': return <Headphones className="text-amber-500 shrink-0" size={28} />;
      case 'Laptop': return <Laptop className="text-amber-500 shrink-0" size={28} />;
      case 'Home': return <HomeIcon className="text-amber-500 shrink-0" size={28} />;
      case 'Zap': return <Zap className="text-amber-500 shrink-0" size={28} />;
      case 'Usb': return <Usb className="text-amber-500 shrink-0" size={28} />;
      case 'Wind': return <Wind className="text-amber-500 shrink-0" size={28} />;
      case 'Cable': return <Cable className="text-amber-500 shrink-0" size={28} />;
      case 'Volume2': return <Volume2 className="text-amber-500 shrink-0" size={28} />;
      case 'BatteryCharging': return <BatteryCharging className="text-amber-500 shrink-0" size={28} />;
      default: return <Smartphone className="text-amber-500 shrink-0" size={28} />;
    }
  };

  // Curate some specific products from list for sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 5);
  const todaysDeals = products.filter(p => p.isTodayDeal || p.price < 200).slice(0, 4);

  // Quick Action triggers WhatsApp message inquiring a product
  const handleQuickInquiry = (product: Product, section: string) => {
    const message = `Hello ALLAH IS GREAT store! I am inquiring about the product "${product.name}" listed under "${section}" for the price of $${formatPrice(product.price)}. Is it currently in stock at New Georgia Estate?`;
    window.open(`https://wa.me/231776070131?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={`transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* 1. HERO HOME BILLBOARD BANNER */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-28 lg:py-36">
        
        {/* Background Visual Textures */}
        <div className="absolute inset-0 z-0">
          {darkMode ? (
            // Dark futuristic atmosphere
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
              {/* Circuit lines styled vector */}
              <svg className="absolute inset-0 h-full w-full opacity-10" stroke="#475569" strokeWidth="0.5" fill="none">
                <path d="M0 100 h200 l50 50 v100 l50 50 h300" />
                <path d="M100 0 v200 l100 100 h400" />
              </svg>
            </div>
          ) : (
            // Light crisp background
            <div className="absolute inset-0 bg-gradient-to-br from-[#06152B] via-[#0A2647] to-[#01142F]">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts col */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider font-mono"
              >
                <span>Electronics & Electrical Store</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight font-sans"
              >
                {darkMode ? (
                  <>
                    Experience the <span className="text-amber-500 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Future of Tech</span>
                  </>
                ) : (
                  <>
                    Premium Electronics & <span className="text-amber-500">Electrical Solutions</span>
                  </>
                )}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-350 sm:text-lg max-w-xl leading-relaxed font-sans"
              >
                {darkMode 
                  ? 'Your Premium Destination for Advanced high-spec smartphones, professional notebooks, immersive game visual displays, and robust electrical installations.'
                  : 'Your trusted source for high-quality devices, cables, sockets, lighting, and heavy-duty supplies in Liberia. Experience the absolute best with direct support.'
                }
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-3"
              >
                <button
                  onClick={() => onNavigateTab('products')}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black tracking-wider text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </button>
                
                <a
                  href="https://wa.me/231776070131"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white/30 hover:border-white font-bold tracking-wide text-sm transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <MessageSquare size={16} className="text-[#25D366]" />
                  <span>WhatsApp Support</span>
                </a>
              </motion.div>
            </div>

            {/* Right Graphics Hero Image col */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative max-w-md lg:max-w-none w-full"
              >
                {/* Visual Glow ring */}
                <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-3xl" />
                
                {/* Device graphic mockup card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/60 p-4 aspect-4/3 flex items-center justify-center">
                  <img 
                    src={darkMode
                      ? 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' // premium glowing phone
                      : 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' // macbook layout
                    } 
                    alt="Premium Showcase Device" 
                    className="rounded-2xl w-full h-full object-cover transition-all hover:scale-103 duration-500"
                  />
                  
                  {/* Floating badged highlight */}
                  <div className="absolute top-8 left-8 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center space-x-2.5 shadow-xl">
                    <div className="p-2 bg-amber-500 rounded-lg text-slate-950">
                      <Star size={16} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black">Top Rated</p>
                      <p className="text-white text-xs font-bold font-sans">Premium Authentic Stocks</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. SHOP BY CATEGORY SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-12">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Shop by Category
          </h2>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
          <p className="text-sm max-w-md mx-auto opacity-70">
            Select an electrical fitting, mobile accessory, or smartphone filter below to browse details.
          </p>
        </div>

        {/* Categories Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => onNavigateTab('products', cat.id)}
              className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md hover:scale-103 group cursor-pointer ${
                darkMode 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900' 
                  : 'bg-white border-slate-200 hover:border-amber-500/50 hover:bg-slate-50'
              }`}
            >
              <div className="p-3.5 rounded-xl bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-500 transition-all shadow-inner">
                {getCategoryIcon(cat.icon)}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'text-slate-350' : 'text-slate-800'
              }`}>
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS GRID */}
      <section className={`py-20 border-y ${
        darkMode ? 'bg-slate-900/20 border-slate-800/60' : 'bg-slate-100/50 border-slate-250/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-3 mb-12">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Featured Products
            </h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
            <p className="text-sm max-w-md mx-auto opacity-70">
              High-quality items handpicked for reliability, superior specifications, and authentic design.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all text-left ${
                  darkMode 
                    ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900' 
                    : 'bg-white border-slate-205/60 hover:border-slate-300'
                }`}
              >
                {/* Product Image cover */}
                <div 
                  className="aspect-square bg-slate-105/50 dark:bg-slate-950/50 relative overflow-hidden cursor-pointer group"
                  onClick={() => onSelectProduct(p)}
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  {p.badgeText && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase rounded-full bg-amber-500">
                      {p.badgeText}
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1" onClick={() => onSelectProduct(p)}>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-amber-500">{p.brand}</p>
                    <h3 className="font-bold text-sm tracking-tight line-clamp-1 cursor-pointer hover:text-amber-500 transition-colors">
                      {p.name}
                    </h3>
                    
                    {/* Stars output */}
                    <div className="flex items-center space-x-1 py-1">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.floor(p.rating) ? "currentColor" : "none"} className="shrink-0" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">({p.reviewsCount})</span>
                    </div>

                    <div className="flex items-baseline space-x-2 pt-1">
                      <span className="text-base font-black text-amber-500 font-mono">${formatPrice(p.price)}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                          ${formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 grid grid-cols-1 gap-2">
                    <button
                      onClick={() => handleQuickInquiry(p, 'Featured Products')}
                      className={`py-2 text-center text-xs font-bold border rounded-lg transition-colors cursor-pointer ${
                        darkMode 
                          ? 'border-slate-800 text-slate-350 hover:bg-slate-950 hover:text-[#25D366] hover:border-[#25D366]/40' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-300'
                      }`}
                    >
                      Chat on WhatsApp
                    </button>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="py-2 text-center text-xs font-black rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-600 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. TODAY'S DEALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-left">
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-wider font-mono">
            <BadgePercent size={14} />
            <span>Exclusive Flash Offers</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Today's Best Deals
          </h2>
          <div className="w-16 h-1.5 bg-red-500 mx-auto rounded-full" />
          <p className="text-sm max-w-md mx-auto opacity-70">
            Limited stock, mega price drops! WhatsApp us directly to secure deal stock in Monrovia.
          </p>
        </div>

        {/* Deals list layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {todaysDeals.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-2xl border overflow-hidden flex flex-col relative ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-black tracking-widest text-[#950] uppercase rounded bg-[#FDE68A] text-slate-950 font-mono shadow">
                FLASH DEAL
              </div>

              <div 
                className="aspect-square bg-slate-50/50 dark:bg-slate-950/20 relative cursor-pointer"
                onClick={() => onSelectProduct(p)}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              {/* Detail block */}
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base tracking-tight line-clamp-1">{p.name}</h3>
                  <div className="flex items-center space-x-2 pt-2">
                    <span className="text-lg font-black text-red-500 font-mono">${formatPrice(p.price)}</span>
                    {p.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-mono">${formatPrice(p.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProduct(p)}
                    className={`py-2 text-center text-xs font-semibold rounded-lg transition-colors border ${
                      darkMode
                        ? 'border-slate-800 text-slate-350 hover:bg-slate-950'
                        : 'border-slate-205 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Specs
                  </button>
                  <button
                    onClick={() => handleQuickInquiry(p, "Today's flash deals")}
                    className="py-2 text-center text-xs font-black text-white rounded bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer"
                  >
                    Chat for Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 5. WHY CHOOSE US */}
      <section className={`py-16 border-t ${
        darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-900 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-amber-500">
              Why Choose Us
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-4">
            {[
              { icon: <Shield size={26} />, title: "Quality Products", desc: "100% Authentic Stock" },
              { icon: <BadgePercent size={26} />, title: "Affordable Prices", desc: "Best prices in Monrovia" },
              { icon: <Star size={26} />, title: "Wide Selection", desc: "Power, light & smartphone" },
              { icon: <ThumbsUp size={26} />, title: "Friendly Service", desc: "Helpful assistant crew" },
              { icon: <Zap size={26} />, title: "Genuine Electronics", desc: "Verified global brands Only" },
              { icon: <MessageSquare size={26} />, title: "Fast WhatsApp", desc: "Continuous sales reply" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white select-none">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium select-none">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-12">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Customer Testimonials
          </h2>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
          <p className="text-sm max-w-md mx-auto opacity-70">
            Check what regular clients in the New Georgia Estate area say about our retail assistance!
          </p>
        </div>

        {/* Testimonials grid scroll/list */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                {/* 5 Stars display */}
                <div className="flex text-amber-500 mb-3.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className={`text-xs leading-relaxed italic ${
                  darkMode ? 'text-slate-350' : 'text-slate-600'
                }`}>
                  "{test.text}"
                </p>
              </div>

              {/* User meta card */}
              <div className="flex items-center space-x-3 pt-5 border-t border-slate-800/10 dark:border-slate-800/60 mt-5">
                <img src={test.avatar} alt={test.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-amber-500/20" />
                <div>
                  <h4 className="font-bold text-xs">{test.name}</h4>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400">Verified Client</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
