import { useState } from 'react';
import { Star, ChevronLeft, Calendar, ArrowRight, MessageSquare, ShoppingCart, Check, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  darkMode: boolean;
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetail({
  darkMode,
  product,
  onBack,
  onAddToCart,
  allProducts,
  onSelectProduct
}: ProductDetailProps) {
  // Gallery and specs options
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [isFavorite, setIsFavorite] = useState(false);

  // Filter 4 related products matching category
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Construct structured WhatsApp dispatch
  const handleWhatsAppInquiry = () => {
    const colorText = selectedColor ? ` in Color *${selectedColor}*` : '';
    const messageTemplate = `Hello ALLAH IS GREAT store! I am interested in purchasing your *${product.name}*${colorText} with price listed at *$${product.price.toFixed(2)}*. Is this item available in stock for home delivery or pickup in New Georgia Estate?`;
    window.open(`https://wa.me/231776070131?text=${encodeURIComponent(messageTemplate)}`, '_blank');
  };

  const handleInquireRelated = (p: Product) => {
    const text = `Hello! I would like to inquire regarding availability details about the *${p.name}* ($${p.price.toFixed(2)}) listed at your outlet.`;
    window.open(`https://wa.me/231776070131?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`transition-colors duration-300 py-10 min-h-screen ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back and Title breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black tracking-wide border transition-all uppercase cursor-pointer ${
              darkMode 
                ? 'border-slate-805 bg-slate-900 hover:bg-slate-800 text-slate-300' 
                : 'border-slate-205 bg-white hover:bg-slate-50 text-slate-655'
            }`}
          >
            <ChevronLeft size={14} />
            <span>Back to catalog</span>
          </button>

          <span className="text-[10px] sm:text-xs font-semibold tracking-wider font-mono text-slate-400 capitalize bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800/80">
            Store Location: <strong className="text-amber-500">New Georgia Estate, Liberia</strong>
          </span>
        </div>

        {/* Product detailed layout row */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 sm:p-8 rounded-3xl border mb-16 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          {/* LEFT: GALLERY PORTFOLIO */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Display prominent view */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 max-h-[460px] flex items-center justify-center">
              <img 
                src={product.images[activeImageIdx] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all"
              />
              
              {/* Optional absolute tags */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-slate-900/95 shadow-md text-slate-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all"
                title="Save product"
              >
                <Heart size={16} fill={isFavorite ? "#EF4444" : "none"} className={isFavorite ? "text-red-500" : ""} />
              </button>
            </div>

            {/* Thumbnail selector row matching image 5 */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((thumbnailUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border bg-slate-50 dark:bg-slate-950/40 cursor-pointer p-1 transition-all ${
                      activeImageIdx === idx 
                        ? 'border-amber-500 ring-2 ring-amber-500/20 shadow' 
                        : 'border-slate-200/60 dark:border-slate-801 hover:border-slate-400'
                    }`}
                  >
                    <img src={thumbnailUrl} alt="Thumbnail grid item" className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}

          </div>


          {/* RIGHT: PARAMS AND SPEC DETAILS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">{product.brand} Brand</span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">{product.name}</h1>
                
                {/* Reviews stars */}
                <div className="flex items-center space-x-2 py-1">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="shrink-0" />
                    ))}
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-400">
                    {product.rating} / 5 ({product.reviewsCount} verified customer reviews)
                  </span>
                </div>
              </div>

              {/* Price bracket tag */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center space-x-4">
                <span className="text-3xl font-black text-amber-500 font-mono">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <div className="text-xs text-slate-400">
                    <span className="line-through font-mono">${product.originalPrice.toFixed(2)}</span>
                    <p className="text-[#25D366] font-bold text-[10px] tracking-wider uppercase mt-0.5">
                      Save ${(product.originalPrice - product.price).toFixed(2)} instantly
                    </p>
                  </div>
                )}
              </div>

              {/* Technical features highlights list */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-400">Overview Specifications:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div 
                      key={key} 
                      className={`px-3 py-2.5 rounded-xl border flex flex-col space-y-1 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">{key}</span>
                      <span className="font-extrabold text-slate-800 dark:text-white leading-normal pr-1">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Options circular picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3.5 pt-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Select Finish / Color:</h4>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`h-9 px-3 rounded-full flex items-center space-x-2 border transition-all ${
                          selectedColor === color.name
                            ? 'border-amber-500 ring-2 ring-amber-500/20 text-white font-bold'
                            : 'border-slate-250 dark:border-slate-800 text-slate-400'
                        }`}
                        style={{ backgroundColor: darkMode ? '#1e293b' : '#ffffff' }}
                        title={color.name}
                      >
                        <span className="h-4 w-4 rounded-full border border-slate-400" style={{ backgroundColor: color.hex }} />
                        <span className="text-xs">{color.name}</span>
                        {selectedColor === color.name && <Check size={11} className="text-amber-500 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Core Action Callouts */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-dashed border-slate-800/60 mt-4">
              <button
                onClick={() => onAddToCart(product, selectedColor)}
                className="w-full py-4 text-center rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black tracking-wider text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <ShoppingCart size={16} />
                <span>Add to Order Cart</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-4 text-center rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-850 text-white font-black tracking-wider text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare size={16} className="text-[#25D366]" />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>

          </div>

        </div>


        {/* DESCRIPTIVE TEXT BLOCKS */}
        <section className={`p-6 sm:p-10 rounded-3xl border mb-16 ${
          darkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-205/60 shadow-sm'
        }`}>
          <h2 className="text-lg font-black tracking-wider uppercase mb-5 text-amber-500 pb-2 border-b border-dashed border-slate-80s">
            Product Description
          </h2>
          <div className={`space-y-4 text-sm leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <p>
              The <strong>{product.name}</strong> has been engineered to introduce uncompromising quality and durable structure into Monrovia households. Constructed with optimal materials and complying with premium standard quality testing, this product ensures high fidelity and energy efficiency, offering a robust return on your value investments.
            </p>
            <p className="hidden sm:block">
              {product.description}
            </p>
            <p>
              Purchasing from <strong>ALLAH IS GREAT electronics</strong> guarantees that you receive only 100% genuine and verified hardware. Each unit is back-checked before being handed off at our Monrovia distribution outlet, with immediate customer assistance accessible throughout the checkout. Complete your purchase via local store pick-up or fast urban dispatch on WhatsApp!
            </p>
          </div>
        </section>


        {/* RELATED SELECTIONS FOOTER */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight">Related Products</h3>
              <p className="text-xs text-slate-400">Discover more hardware selections within our {product.category} collection.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-left cursor-pointer ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="aspect-square bg-slate-50 dark:bg-slate-950/20 relative" onClick={() => onSelectProduct(p)}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div onClick={() => onSelectProduct(p)}>
                      <h4 className="font-bold text-sm truncate">{p.name}</h4>
                      <p className="text-amber-500 font-bold font-mono text-sm mt-1">${p.price.toFixed(2)}</p>
                    </div>

                    <div className="pt-3 grid grid-cols-1 gap-1.5">
                      <button
                        onClick={() => handleInquireRelated(p)}
                        className={`py-1.5 text-center text-xs font-semibold rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-slate-800 text-slate-300 hover:bg-slate-950' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Chat on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
