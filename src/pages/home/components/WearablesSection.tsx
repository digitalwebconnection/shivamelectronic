import React from 'react';
import { Watch, ArrowRight } from 'lucide-react';
import type { Product } from '../../../types';
import { ProductCard } from './ProductCard';

interface WearablesSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const WearablesSection: React.FC<WearablesSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onViewAll
}) => {
  const wearables = products.filter(p => p.category === 'wearables');

  return (
    <section id="category-wearables" className="py-16 bg-slate-50/50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Watch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Smartwatches & Wearables</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rugged outdoor adventure watches, fitness trackers, and wearables.</p>
            </div>
          </div>
          <button
            onClick={() => onViewAll('wearables')}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl text-[10px] font-bold text-slate-600 transition-all bg-white cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wearables.slice(0, 3).map(p => (
            <ProductCard
              key={p.id}
              product={p}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              isLoggedIn={isLoggedIn}
              onPromptAuth={onPromptAuth}
              accentColor="emerald"
            />
          ))}
        </div>

      </div>
    </section>
  );
};
