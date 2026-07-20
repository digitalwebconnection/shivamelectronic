import React from 'react';
import { Settings, ArrowRight } from 'lucide-react';
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
  const toSlug = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const hardware = products.filter(p => 
    ['hardware', 'hardware-accessories'].includes(toSlug(p.category))
  );

  return (
    <section id="category-hardware" className="py-16 bg-slate-50/50 border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shadow-emerald-100">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Hardware & Accessories</h2>
              <p className="text-xs text-slate-600 mt-0.5">Rubber strain relief grommets and anti-vibration chassis isolating feet.</p>
            </div>
          </div>
          <button
            onClick={() => onViewAll('hardware')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-emerald-50 hover:text-emerald-500 rounded-md text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardware.slice(0, 3).map(p => (
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
