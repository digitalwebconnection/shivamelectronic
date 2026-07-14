import React from 'react';
import { Cpu, Cable, Power, Settings, Sun } from 'lucide-react';
import type { Product } from '../../../types';
interface CategoriesQuickNavProps {
  products: Product[];
  categories: any[];
}

export const CategoriesQuickNav: React.FC<CategoriesQuickNavProps> = ({ products, categories }) => {
  return (
    <section className="py-4 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-10    pb-2 custom-scrollbar justify-start lg:justify-center">
          {categories.map((cat) => {
            let iconElement = <Cpu className="w-5 h-5" />;
            let activeColor = 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200';
            
            if (cat.slug === 'cables') {
              iconElement = <Cable className="w-5 h-5" />;
              activeColor = 'hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200';
            } else if (cat.slug === 'switches') {
              iconElement = <Power className="w-5 h-5" />;
              activeColor = 'hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200';
            } else if (cat.slug === 'hardware') {
              iconElement = <Settings className="w-5 h-5" />;
              activeColor = 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200';
            } else if (cat.slug === 'optoelectronics') {
              iconElement = <Sun className="w-5 h-5" />;
              activeColor = 'hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200';
            }

            const count = products.filter(p => p.category.toLowerCase() === cat.slug.toLowerCase()).length;

            return (
              <button
                key={cat.slug}
                onClick={() => {
                  const el = document.getElementById(`category-${cat.slug}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-5 px-5 py-3 rounded-xl border border-slate-200/80 bg-white text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md ${activeColor}`}
              >
                <div className="shrink-0 p-1.5 bg-slate-50 rounded-xl group-hover:bg-transparent">
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
