import React from 'react';
import { ProductGrid } from '../../components/ProductGrid';
import type { Product } from '../../types';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  selectedCategory: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  selectedCategory
}) => {
  return (
    <div className="py-12 bg-slate-50/30 animate-in fade-in duration-300 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Shivam Electronic Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {selectedCategory === 'All' ? 'Explore Our Full Collection' : `Premium ${selectedCategory}`}
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Browse our verified inventory of high-grade electronic components. Every item comes with official specifications, quality testing, and secure packaging.
          </p>
        </div>

        {/* Catalog List */}
        {products.length > 0 ? (
          <ProductGrid 
            products={products}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            isLoggedIn={isLoggedIn}
            onPromptAuth={onPromptAuth}
            hideHeader={true}
          />
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any products matching your current search filters. Try adjusting your query or category selection.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
