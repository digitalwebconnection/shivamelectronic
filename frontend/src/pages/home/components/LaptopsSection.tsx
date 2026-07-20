import React from 'react';
import { Cpu, ArrowRight, ArrowUpRight } from 'lucide-react';
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
    <section id="category-connectors" className="py-16 bg-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Promo Banner Left */}
          <div className="lg:col-span-3 rounded-md bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[300px] lg:min-h-auto shadow-xl shadow-slate-950/35 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1 hover:border-blue-550/30 transition-all duration-500 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-md blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[8px] font-black uppercase tracking-wider inline-block">
                Industrial Joints
              </span>
              <h3 className="text-lg font-black tracking-tight leading-tight">
                Secure Signal <br />& Power Feeds
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Build robust connections with gold-plated pins, thread-locking aviation joints, and dual-in-line IC mounts.
              </p>
            </div>
            <button
              onClick={() => onViewAll('connectors')}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-305 group/btn self-start mt-4 cursor-pointer"
            >
              <span>Browse connectors</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </div>

          {/* Product Grid Right */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.slice(0, 3).map(p => (
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

      </div>
    </section>
  );
};
