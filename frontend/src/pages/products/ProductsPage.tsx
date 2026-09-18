import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, ShieldCheck } from 'lucide-react';
import type { Product } from '../../types';

import { ProductsHero } from './components/ProductsHero';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductCard } from './components/ProductCard';
import { Pagination } from './components/Pagination';
import { toSlug } from './utils';

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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  useEffect(() => {
    setSelectedBrands([]);
  }, [selectedCategory]);

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(12);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(16);
      } else {
        setItemsPerPage(20);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedBrands, sortBy]);

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

  const availableBrands = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    products.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });

    return Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === 'All' || 
          toSlug(product.category) === selectedCategory ||
          toSlug(product.category).startsWith(selectedCategory + '-') ||
          selectedCategory.startsWith(toSlug(product.category) + '-');

        const matchesSearch = searchQuery.trim() === '' || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand = selectedBrands.length === 0 || 
          selectedBrands.includes(product.brand);

        return matchesCategory && matchesSearch && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, selectedBrands, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProducts, currentPage, itemsPerPage]);

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

  const isFiltered = useMemo(() => {
    return selectedCategory !== 'All' || 
      searchQuery.trim() !== '' || 
      selectedBrands.length > 0 || 
      sortBy !== 'default' ||
      categorySearch.trim() !== '';
  }, [selectedCategory, searchQuery, selectedBrands, sortBy, categorySearch]);

  const categoryName = dynamicCategories.find(c => 
    c.slug.toLowerCase() === selectedCategory.toLowerCase() ||
    c.slug.toLowerCase().startsWith(selectedCategory.toLowerCase() + '-') ||
    selectedCategory.toLowerCase().startsWith(c.slug.toLowerCase() + '-')
  )?.name || selectedCategory;

  return (
    <div className=" bg-slate-50/30 animate-in fade-in duration-300 min-h-[75vh]">
      <div className="">
        
        {/* New 400px Offer Banner replacing old header */}
        <ProductsHero 
          selectedCategory={selectedCategory} 
          categoryName={categoryName} 
        />

        <div className="flex max-w-7xl pb-15 mx-auto px-6 flex-col lg:flex-row gap-8 items-start">
          
          <aside 
            data-lenis-prevent
            className="hidden lg:block w-64 xl:w-72 shrink-0 bg-white border border-slate-200 rounded-md p-6 shadow-sm sticky top-24 max-h-[calc(100vh-130px)] overflow-y-auto custom-scrollbar"
          >
            <SidebarFilters
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              categorySearch={categorySearch}
              setCategorySearch={setCategorySearch}
              filteredCategories={filteredCategories}
              availableBrands={availableBrands}
              isFiltered={isFiltered}
              handleClearFilters={handleClearFilters}
            />
          </aside>

          <div className="w-full lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-3 rounded-md border border-slate-200 shadow-sm">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters ({isFiltered ? 'Active' : 'Off'})</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50/50 border border-slate-200 px-2.5 py-1.5 rounded-md text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="default">Recommended</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grow w-full">
            <div className="hidden lg:flex items-center justify-between mb-6 bg-white px-5 py-3.5 rounded-md border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-500">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of <strong className="text-slate-800">{products.length}</strong> products
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/30 px-3 py-1.5 rounded-md text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="default">Recommended</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      dynamicCategories={dynamicCategories}
                      isWishlisted={isWishlisted(product.id)}
                      onWishlistClick={handleWishlistClick}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            ) : (
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

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
          />

          <div 
            data-lenis-prevent
            className="relative w-80 max-w-full h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-200"
          >
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-450 hover:text-black rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-4 flex-1">
              <SidebarFilters
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
                filteredCategories={filteredCategories}
                availableBrands={availableBrands}
                isFiltered={isFiltered}
                handleClearFilters={handleClearFilters}
              />
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-blue-600 text-white text-xs font-black rounded-xl text-center shadow-lg active:scale-98 transition-all cursor-pointer"
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
