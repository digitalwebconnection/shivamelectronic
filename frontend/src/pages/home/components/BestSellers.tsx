import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Product } from '../../../types';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onNavigateToProducts: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onNavigateToProducts
}) => {
  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Our Best Sellers</h2>
              <p className="text-xs text-slate-600 mt-0.5">Top performing professional grade connectors and premium wiring units.</p>
            </div>
          </div>
          <button 
            onClick={onNavigateToProducts}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-blue-550 hover:text-blue-600 rounded-md text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(p => (
            <ProductCard 
              key={p.id}
              product={p}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              isLoggedIn={isLoggedIn}
              onPromptAuth={onPromptAuth}
              accentColor="blue"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
