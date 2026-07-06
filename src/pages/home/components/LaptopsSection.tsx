import React from 'react';
import { Laptop, ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const laptops = products.filter(p => p.category === 'laptops');

  return (
    <section id="category-laptops" className="py-10 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Laptops & Computers</h2>
              <p className="text-xs text-slate-400 mt-0.5">High-performance workstations, ultrabooks, and accessories.</p>
            </div>
          </div>
          <button
            onClick={() => onViewAll('laptops')}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-[10px] font-bold text-slate-600 transition-all bg-white cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Promo Banner Left */}
          <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[300px] lg:min-h-auto shadow-xl shadow-slate-950/35 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1 hover:border-blue-550/30 transition-all duration-500 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[8px] font-black uppercase tracking-wider inline-block">
                Workstation Deals
              </span>
              <h3 className="text-lg font-black tracking-tight leading-tight">
                Pro Computing <br />Power Upgrade
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Supercharge your productivity with Apple M3 Max or Intel 13th Gen. Exchange old models for up to $100 bonus trade-in credit.
              </p>
            </div>
            <button
              onClick={() => onViewAll('laptops')}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-305 group/btn self-start mt-4 cursor-pointer"
            >
              <span>Browse workstations</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </div>

          {/* Product Grid Right */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptops.slice(0, 3).map(p => (
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
