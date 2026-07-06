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
    <section className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Best Sellers
            </h2>
          </div>
          
          <button 
            onClick={onNavigateToProducts}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold transition-all active:scale-95 bg-white text-slate-700 cursor-pointer"
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
