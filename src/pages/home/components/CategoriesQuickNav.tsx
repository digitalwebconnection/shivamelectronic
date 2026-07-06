import React from 'react';
import { Laptop, Smartphone, Headphones, Watch, Camera, Gamepad2 } from 'lucide-react';
import { categories } from '../../../data/products';
import type { Product } from '../../../types';

interface CategoriesQuickNavProps {
  products: Product[];
}

export const CategoriesQuickNav: React.FC<CategoriesQuickNavProps> = ({ products }) => {
  return (
    <section className="py-6 bg-slate-50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3  pb-2 custom-scrollbar justify-start lg:justify-center">
          {categories.map((cat) => {
            let iconElement = <Laptop className="w-5 h-5" />;
            let activeColor = 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200';
            
            if (cat.slug === 'smartphones') {
              iconElement = <Smartphone className="w-5 h-5" />;
              activeColor = 'hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200';
            } else if (cat.slug === 'audio') {
              iconElement = <Headphones className="w-5 h-5" />;
              activeColor = 'hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200';
            } else if (cat.slug === 'wearables') {
              iconElement = <Watch className="w-5 h-5" />;
              activeColor = 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200';
            } else if (cat.slug === 'cameras') {
              iconElement = <Camera className="w-5 h-5" />;
              activeColor = 'hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200';
            } else if (cat.slug === 'gaming') {
              iconElement = <Gamepad2 className="w-5 h-5" />;
              activeColor = 'hover:bg-red-50 hover:text-red-600 hover:border-red-200';
            }

            const count = products.filter(p => p.category === cat.slug).length;

            return (
              <button
                key={cat.slug}
                onClick={() => {
                  const el = document.getElementById(`category-${cat.slug}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200/80 bg-white text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md ${activeColor}`}
              >
                <div className="flex-shrink-0 p-1.5 bg-slate-50 rounded-xl group-hover:bg-transparent">
                  {iconElement}
                </div>
                <div className="text-left">
                  <p className="leading-none text-[11px] font-black">{cat.name}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{count} Items</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
