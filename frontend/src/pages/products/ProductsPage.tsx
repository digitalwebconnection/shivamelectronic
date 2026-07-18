import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, Heart, ShoppingCart, Star, Eye,
  SlidersHorizontal, X, Tag, AlertCircle,
  Cpu, Cable, Power, Settings, Sun
} from 'lucide-react';
import type { Product } from '../../types';
interface ProductsPageProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: any[];
}

const toSlug = (str: string) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  categories
}) => {
  // Local filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  // Reset selected brands when the category changes
  useEffect(() => {
    setSelectedBrands([]);
  }, [selectedCategory]);

  // Pagination State
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedBrands, sortBy]);

  // Dynamically calculate unique categories from products list
  const dynamicCategories = useMemo(() => {
    const uniqNames = Array.from(new Set(products.map(p => p.category?.trim()).filter(Boolean)));
    return uniqNames.map(name => {
      const slug = toSlug(name);
      const existing = categories.find(c => c.slug.toLowerCase() === slug || c.name.toLowerCase() === name.toLowerCase());
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        slug: slug,
        icon: existing ? existing.icon : 'Cpu'
      };
    });
  }, [products, categories]);

  // Filter categories: show all categories (like the brand filter), 
  // but keep the first 4 categories at the top of the list.
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) {
      const firstFour = dynamicCategories.slice(0, 4);
      const remaining = dynamicCategories.slice(4);
      return [...firstFour, ...remaining];
    }
    return dynamicCategories.filter(cat => 
      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categorySearch, dynamicCategories]);

  // Dynamically calculate brands and count of products for each brand (showing all brands)
  const availableBrands = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    products.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });

    return Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category Filter
        const matchesCategory = selectedCategory === 'All' || 
          toSlug(product.category) === selectedCategory ||
          toSlug(product.category).startsWith(selectedCategory + '-') ||
          selectedCategory.startsWith(toSlug(product.category) + '-');

        // Search Query Filter
        const matchesSearch = searchQuery.trim() === '' || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Brand Filter (checks if any brands selected, matching product brand)
        const matchesBrand = selectedBrands.length === 0 || 
          selectedBrands.includes(product.brand);

        return matchesCategory && matchesSearch && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default sorting
      });
  }, [products, selectedCategory, searchQuery, selectedBrands, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  // Wishlist Check
  const isWishlisted = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistClick = (product: Product) => {
    if (!isLoggedIn) {
      onPromptAuth();
    } else {
      onToggleWishlist(product);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedBrands([]);
    setSortBy('default');
    setCategorySearch('');
  };

  // Check if any filter is active
  const isFiltered = useMemo(() => {
    return selectedCategory !== 'All' || 
      searchQuery.trim() !== '' || 
      selectedBrands.length > 0 || 
      sortBy !== 'default' ||
      categorySearch.trim() !== '';
  }, [selectedCategory, searchQuery, selectedBrands, sortBy, categorySearch]);

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Cable': return <Cable className="w-4 h-4" />;
      case 'Power': return <Power className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  // Sidebar Component for Filters
  const renderSidebarFilters = () => (
    <div className="space-y-7">
      {/* Active Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">Filters</h2>
        </div>
        {isFiltered && (
          <button 
            onClick={handleClearFilters}
            className="text-[10px] font-black text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-1 rounded-lg transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</h3>
          {categorySearch && (
            <span className="text-[8px] text-blue-650 bg-blue-50 px-1.5 py-0.5 rounded font-black">
              Filtered
            </span>
          )}
        </div>

        {/* Category Search Input */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 rounded-xl px-3 py-2 transition-all">
          <span className="text-slate-400 mr-2 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input
            type="text"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-transparent text-[11px] font-bold text-slate-850 placeholder-slate-400 outline-none"
          />
          {categorySearch && (
            <button 
              onClick={() => setCategorySearch('')} 
              className="text-slate-450 hover:text-slate-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {/* All Categories Button */}
          {(!categorySearch.trim() || 'all categories'.includes(categorySearch.toLowerCase())) && (
            <button
              onClick={() => setSelectedCategory('All')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4" />
                <span>All Categories</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                selectedCategory === 'All' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {products.length}
              </span>
            </button>
          )}
          
          {/* Filtered Scrollable Categories Container */}
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const count = products.filter(p => toSlug(p.category) === cat.slug).length;
                const isSelected = selectedCategory.toLowerCase() === 'all' ? false : (
                  cat.slug.toLowerCase() === selectedCategory.toLowerCase() ||
                  cat.slug.toLowerCase().startsWith(selectedCategory.toLowerCase() + '-') ||
                  selectedCategory.toLowerCase().startsWith(cat.slug.toLowerCase() + '-')
                );
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {renderCategoryIcon(cat.icon)}
                      <span>{cat.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 py-3 text-center">
                No matching categories
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brands (Dropdown Selector) */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {selectedCategory === 'All' ? 'All Brands' : 'Brands'}
          </h3>
          <p className="text-[9px] text-slate-455 italic leading-none">
            Showing all brands
          </p>
        </div>

        {availableBrands.length > 0 ? (
          <div className="relative">
            <select
              value={selectedBrands[0] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedBrands(val ? [val] : []);
              }}
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none transition-all cursor-pointer"
            >
              <option value="">All Brands ({availableBrands.reduce((acc, b) => acc + b.count, 0)})</option>
              {availableBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>
                  {brand.name} ({brand.count})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-slate-350" />
            <span>No brands in this selection</span>
          </div>
        )}
      </div>


    </div>
  );

  return (
    <div className="py-10 bg-slate-50/30 animate-in fade-in duration-300 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Shivam Electronic Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {selectedCategory === 'All' ? 'Explore Our Full Collection' : `Premium ${
              dynamicCategories.find(c => 
                c.slug.toLowerCase() === selectedCategory.toLowerCase() ||
                c.slug.toLowerCase().startsWith(selectedCategory.toLowerCase() + '-') ||
                selectedCategory.toLowerCase().startsWith(c.slug.toLowerCase() + '-')
              )?.name || selectedCategory
            }`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Browse our verified inventory of high-grade electronic components. Use the sidebar filters to refine by Category and Brand.
          </p>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside 
            data-lenis-prevent
            className="hidden lg:block w-64 xl:w-72 shrink-0 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24 max-h-[calc(100vh-130px)] overflow-y-auto custom-scrollbar"
          >
            {renderSidebarFilters()}
          </aside>

          {/* MOBILE FILTERS DRAWER TRIGGER & SORT */}
          <div className="w-full lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 active:scale-98 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters ({isFiltered ? 'Active' : 'Off'})</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50/50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="default">Recommended</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* MAIN PRODUCT LIST COLUMN */}
          <div className="grow w-full">
            {/* Header: Results count and Desktop Sort Dropdown */}
            <div className="hidden lg:flex items-center justify-between mb-6 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of <strong className="text-slate-800">{products.length}</strong> products
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/30 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="default">Recommended</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                  const hasHeart = isWishlisted(product.id);
                  return (
                    <div 
                      key={product.id}
                      className="group relative flex flex-col bg-slate-50/40 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-lg overflow-hidden transition-all duration-300  shadow-lg shadow-black hover:-translate-y-1"
                    >
                      {/* Badges */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
                        {product.isHot && (
                          <span className="bg-linear-to-r from-rose-600 to-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm shadow-red-500/15">
                            Hot
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleWishlistClick(product)}
                        className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-xl transition-all duration-300 border cursor-pointer ${
                          hasHeart 
                            ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20' 
                            : 'bg-white/95 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-350 hover:bg-white'
                        }`}
                        title={hasHeart ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-transform duration-300 ${hasHeart ? 'fill-current text-white scale-110' : 'text-slate-400'}`} />
                      </button>

                      {/* Product Image */}
                      <div 
                        onClick={() => onSelectProduct(product)}
                        className="relative aspect-square w-full bg-slate-100/30 group-hover:bg-slate-50/50 overflow-hidden cursor-pointer border-b border-slate-100 flex items-center justify-center "
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <span className="flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black rounded-xl border border-slate-200 transition-all shadow-md">
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            Quick View
                          </span>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category & Brand Labels */}
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[9px] text-blue-600 uppercase tracking-widest font-black">
                              {dynamicCategories.find(c => c.slug === toSlug(product.category))?.name || product.category}
                            </span>
                            <span className="text-[8px] text-slate-350 font-black">•</span>
                            <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded-md">
                              {product.brand}
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 
                            onClick={() => onSelectProduct(product)}
                            className="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors cursor-pointer leading-snug mb-2"
                          >
                            {product.name}
                          </h3>

                          {/* Rating Row */}
                          <div className="flex items-center gap-1 mb-4">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-450">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        {/* Footer / CTA Section */}
                        <div className="flex items-center justify-end mt-auto pt-4 border-t border-slate-100">
                          <button
                            onClick={() => onAddToCart(product)}
                            className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] font-black shadow-md shadow-blue-500/10 active:scale-95 transition-all duration-300 cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>ADD TO CART</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 flex-wrap">
                  <span className="text-xs font-bold text-slate-500">
                    Showing <strong className="text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong>–<strong className="text-slate-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</strong> of <strong className="text-slate-800">{filteredProducts.length}</strong> products
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Prev Button */}
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-3.5 py-2 rounded-xl text-xs font-black border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
                    >
                      ‹ Prev
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === 'ellipsis' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-xs font-bold select-none">…</span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => {
                              setCurrentPage(item as number);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-black border transition-all cursor-pointer select-none ${
                              currentPage === item
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )
                    }

                    {/* Next Button */}
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-2 rounded-xl text-xs font-black border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
                    >
                      Next ›
                    </button>
                  </div>
                </div>
              )}
              </>
            ) : (
              // Empty Search / Filter State
              <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-8 max-w-md mx-auto shadow-sm animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1.5">No products found</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  We couldn't find any products matching your current combination of categories, search queries, or brands.
                </p>
                {isFiltered && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE FILTERS DRAWER MODAL */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Panel */}
          <div 
            data-lenis-prevent
            className="relative w-80 max-w-full h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-200"
          >
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-450 hover:text-black rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-4 flex-1">
              {renderSidebarFilters()}
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-blue-600 text-white text-xs font-black rounded-xl text-center shadow-lg active:scale-98 transition-all"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
