import React from 'react';
import { Cpu, ArrowRight } from 'lucide-react';
import type { Product } from '../../../types';
import { ProductCard } from './ProductCard';

interface LaptopsSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const LaptopsSection: React.FC<LaptopsSectionProps> = ({
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

  const connectors = products.filter(p => 
    ['connectors', 'connectors-sockets'].includes(toSlug(p.category))
  );

  return (
    <section id="category-connectors" className="pt-10  py-0 md:py-10 bg-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 ">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Connectors & Sockets</h2>
              <p className="text-xs text-slate-600 mt-0.5">Heavy-duty aviation plugs, DB9 serial joints, and DIP IC sockets.</p>
            </div>
          </div>
          <button
            onClick={() => onViewAll('connectors')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-md text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar lg:pb-6 px-4 sm:px-0 -mx-4 sm:mx-0">
          {connectors.slice(0, 10).map(p => (
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
