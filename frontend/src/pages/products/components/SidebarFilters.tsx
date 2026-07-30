import React from 'react';
import { SlidersHorizontal, X, Tag, AlertCircle, Cpu, Cable, Power, Settings, Sun } from 'lucide-react';
import type { Product } from '../../../types';
import { toSlug } from '../utils';

interface Category {
  name: string;
  slug: string;
  icon: string;
}

interface BrandCount {
  name: string;
  count: number;
}

interface SidebarFiltersProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  categorySearch: string;
  setCategorySearch: (search: string) => void;
  filteredCategories: Category[];
  availableBrands: BrandCount[];
  isFiltered: boolean;
  handleClearFilters: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  categorySearch,
  setCategorySearch,
  filteredCategories,
  availableBrands,
  isFiltered,
  handleClearFilters,
}) => {
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

  return (
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
            className="text-[10px] font-black text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-1 rounded-md transition-all cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Categories</h3>
          {categorySearch && (
            <span className="text-[8px] text-blue-650 bg-blue-50 px-1.5 py-0.5 rounded font-black">
              Filtered
            </span>
          )}
        </div>

        {/* Category Search Input */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 rounded-md px-3 py-2 transition-all">
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
              className="text-slate-450 hover:text-slate-700 transition-colors cursor-pointer"
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${
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
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {selectedCategory === 'All' ? 'All Brands' : 'Brands'}
          </h3>
          <p className="text-[9px] text-slate-500 italic leading-none">
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
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3.5 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all cursor-pointer"
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
};
