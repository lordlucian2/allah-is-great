import { useState, useMemo } from 'react';
import { Star, Search, Filter, SlidersHorizontal, Grid, X, HelpCircle, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, BRANDS } from '../data';
import { formatPrice } from '../utils/price';

interface ProductsProps {
  darkMode: boolean;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchFilter: string;
  categoryFilter: string;
}

export default function Products({
  darkMode,
  products,
  onSelectProduct,
  onAddToCart,
  searchFilter,
  categoryFilter
}: ProductsProps) {
  // Filters active states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [activeSort, setActiveSort] = useState<string>('low-to-high');
  const [localSearch, setLocalSearch] = useState<string>('');
  
  // Mobile filter drawer expansion
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category filter from other pages/header (or reset)
  useMemo(() => {
    if (categoryFilter) {
      setSelectedCategories([categoryFilter]);
    }
  }, [categoryFilter]);

  // Handle category option selection
  const handleToggleCategory = (catId: string) => {
    setSelectedCategories((prev) => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  // Handle brand option selection
  const handleToggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(3000);
    setLocalSearch('');
  };

  // Computed final listing based on interactive selectors
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Text Search validation (combines global search or page local search text)
      const currentQuery = (searchFilter || localSearch).toLowerCase().trim();
      if (currentQuery) {
        const matchesName = item.name.toLowerCase().includes(currentQuery);
        const matchesDesc = item.description.toLowerCase().includes(currentQuery);
        const matchesBrand = item.brand.toLowerCase().includes(currentQuery);
        const matchesCat = item.category.toLowerCase().includes(currentQuery);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesCat) return false;
      }

      // 2. Category checkboxes validation
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false;
      }

      // 3. Brand checkboxes validation
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
        return false;
      }

      // 4. Price slider range validation
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort drop selections
      if (activeSort === 'low-to-high') return a.price - b.price;
      if (activeSort === 'high-to-low') return b.price - a.price;
      if (activeSort === 'popular') return b.rating - a.rating;
      if (activeSort === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [products, searchFilter, localSearch, selectedCategories, selectedBrands, minPrice, maxPrice, activeSort]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleInquireViaWhatsApp = (p: Product) => {
    const defaultText = `Hello ALLAH IS GREAT store! I’m looking at the product "${p.name}" on your catalog listed for $${formatPrice(p.price)}. Is this model currently in stock at the New Georgia Estate outlet?`;
    window.open(`https://wa.me/231776070131?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

  return (
    <div className={`transition-colors duration-300 min-h-screen py-8 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header matching Image 3 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wide font-mono uppercase text-slate-400">
            <span>Home</span>
            <ChevronRight size={10} className="text-slate-500" />
            <span>Products</span>
            <ChevronRight size={10} className="text-slate-500" />
            <span className="text-amber-500">Electronics</span>
          </div>
          
          <div className="flex items-center space-x-3 sm:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-sm"
            >
              <Filter size={13} />
              <span>Filter Catalog</span>
            </button>
          </div>
        </div>

        {/* Search status summary if filter is active */}
        {(searchFilter || localSearch) && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm font-semibold text-amber-500 flex items-center justify-between">
            <span>
              Showing results for Search query: <strong className="underline">"{searchFilter || localSearch}"</strong>
            </span>
            <button 
              onClick={handleClearAllFilters}
              className="text-xs hover:underline uppercase tracking-wider font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Master body division */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SIDEBAR FILTERS (DESKTOP) ================= */}
          <aside className={`hidden lg:block lg:col-span-3 p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
                <SlidersHorizontal size={16} className="text-amber-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Filters</h3>
              </div>
              <button 
                onClick={handleClearAllFilters}
                className="text-[10px] uppercase font-bold text-slate-400 hover:text-amber-500 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Price slider group */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Price Range</h4>
              <div className="space-y-2">
                <input 
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <div className={`flex items-center border rounded-lg px-2 py-1.5 w-1/2 ${
                    darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <span className="text-slate-400 text-xs mr-1">$</span>
                    <input 
                      type="number" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none text-xs font-mono font-bold"
                    />
                  </div>
                  <div className={`flex items-center border rounded-lg px-2 py-1.5 w-1/2 ${
                    darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <span className="text-slate-400 text-xs mr-1">$</span>
                    <input 
                      type="number" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories filter group */}
            <div className="space-y-3.5 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Categories</h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2.5 text-xs font-semibold hover:text-amber-500 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleToggleCategory(cat.id)}
                      className="border-slate-350 dark:border-slate-700 accent-amber-500 rounded h-4 w-4 bg-slate-50/10"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand filter group */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Brand</h4>
              <div className="space-y-2">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2.5 text-xs font-semibold hover:text-amber-500 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleToggleBrand(brand)}
                      className="border-slate-350 dark:border-slate-700 accent-amber-500 rounded h-4 w-4 bg-slate-50/10"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>


          {/* ================= MAIN PRODUCTS LIST (GRID) ================= */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Sorting controls header panel matching Image 3 & Image 4 */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 items-center justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {/* Search local override */}
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Type to filter catalog..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className={`w-full py-2 pl-9 pr-4 text-xs rounded-xl border focus:outline-none ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-810 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={13} />
              </div>

              {/* Sort By controls dropdown */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-bold text-slate-400">Sort by:</span>
                <select
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                  id="sort-select"
                  className={`py-1.5 px-3 text-xs font-bold font-sans rounded-xl border focus:outline-none ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="popular">Popularity Rating</option>
                  <option value="reviews">Review Volume</option>
                </select>
              </div>
            </div>

            {/* Results Grid display */}
            {filteredProducts.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border text-slate-450 ${
                darkMode ? 'bg-slate-900/10 border-slate-900' : 'bg-slate-50 border-slate-200'
              }`}>
                <HelpCircle size={44} className="mx-auto text-amber-500/80 mb-4 animate-bounce" />
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">No items found matching criteria</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                  We currently do not hold stocks corresponding to those filters in Monrovia. Try resetting your search phrase!
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="mt-5 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-all text-left ${
                      darkMode 
                        ? 'bg-slate-900 border-slate-800/80' 
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    
                    {/* Media */}
                    <div 
                      className="aspect-square bg-slate-50/50 dark:bg-slate-950/40 relative cursor-pointer group overflow-hidden"
                      onClick={() => onSelectProduct(p)}
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107" 
                      />
                      {p.badgeText && (
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[8px] font-black tracking-wider text-slate-900 bg-amber-400 uppercase">
                          {p.badgeText}
                        </div>
                      )}
                    </div>

                    {/* Meta information details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                      <div className="space-y-1" onClick={() => onSelectProduct(p)}>
                        <p className="text-[10px] uppercase font-mono tracking-wider text-amber-500 font-bold">{p.brand}</p>
                        <h4 className="font-extrabold text-sm line-clamp-1 cursor-pointer hover:text-amber-500 transition-colors">{p.name}</h4>
                        
                        {/* Stars */}
                        <div className="flex items-center space-x-1.5 py-1">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={11} fill={i < Math.floor(p.rating) ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold font-mono">({p.reviewsCount})</span>
                        </div>

                        {/* Prices */}
                        <div className="flex items-baseline space-x-2 pt-0.5">
                          <span className="text-base font-black text-amber-500 font-mono">${formatPrice(p.price)}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-mono">${formatPrice(p.originalPrice)}</span>
                          )}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className={`w-full py-2 rounded-lg text-center text-[11px] font-extrabold border transition-colors cursor-pointer ${
                            darkMode 
                              ? 'border-slate-800 text-slate-300 hover:bg-slate-950' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleInquireViaWhatsApp(p)}
                          className={`w-full py-2 rounded-lg text-center text-[11px] font-bold border transition-colors cursor-pointer ${
                            darkMode 
                              ? 'border-slate-800 text-[#25D366] hover:bg-slate-950' 
                              : 'border-amber-300/35 hover:bg-slate-50 text-amber-600'
                          }`}
                        >
                          Chat on WhatsApp
                        </button>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="w-full py-2 rounded-lg text-center text-[11px] font-black bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors shadow-inner flex items-center justify-center space-x-1"
                        >
                          <ShoppingCart size={11} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Pagination widgets matching mockups */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded border text-xs font-mono disabled:opacity-40 select-none ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 rounded text-xs font-bold font-mono transition-colors border select-none ${
                      currentPage === idx + 1
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded border text-xs font-mono disabled:opacity-40 select-none ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* ================= MOBILE OPTIONAL DRAWER FILTERS ================= */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-100 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className={`relative max-w-xs w-full h-full flex flex-col p-6 overflow-y-auto ${
            darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <h3 className="font-extrabold uppercase text-sm">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850">
                <X size={18} />
              </button>
            </div>

            {/* Price slider group */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Price Range</h4>
              <div className="space-y-2">
                <input 
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>

            {/* Categories filter group */}
            <div className="space-y-3.5 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Categories</h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2.5 text-xs font-semibold cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleToggleCategory(cat.id)}
                      className="accent-amber-500"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand filter group */}
            <div className="space-y-3.5 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Brand</h4>
              <div className="space-y-2">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2.5 text-xs font-semibold cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleToggleBrand(brand)}
                      className="accent-amber-500"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowMobileFilters(false);
              }}
              className="w-full py-3 bg-amber-500 text-slate-950 font-black tracking-wide text-xs uppercase rounded-xl shadow mt-auto"
            >
              Apply Filter Selection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
