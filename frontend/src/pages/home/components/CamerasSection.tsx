import React from 'react';
import { Sun, ArrowRight, Star, Heart, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../../types';

interface CamerasSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const CamerasSection: React.FC<CamerasSectionProps> = ({
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

  const optoelectronics = products.filter(p => 
    ['optoelectronics', 'spotlight-optoelectronics', 'optoelectronics-leds', 'optoelectronics-signals'].includes(toSlug(p.category))
  );

  return (
    <section 
      id="category-optoelectronics" 
      className="py-16 bg-slate-50/50 border-b border-slate-100 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm shadow-amber-100">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Spotlight Optoelectronics</h2>
              <p className="text-xs text-slate-400 mt-0.5">High luminosity diffusing red Light Emitting Diodes (LEDs) and dashboard signals.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('optoelectronics')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-amber-550 hover:text-amber-650 rounded-xl text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <span>View Indicators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alternating Spotlight Rows */}
        <div className="space-y-10">
          {optoelectronics.slice(0, 3).map((p, idx) => {
            const isWishlisted = wishlist.some(item => item.id === p.id);
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-stretch bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-800/15 hover:shadow-2xl hover:shadow-amber-550/15 transition-all duration-500 cursor-pointer relative overflow-hidden`}
              >
                {/* Visual anchor line */}
                <div className={`absolute top-0 bottom-0 w-1.5 bg-amber-500 ${isEven ? 'left-0' : 'right-0'}`} />

                {/* Left/Right Product Image Container */}
                <div className="w-full md:w-[38%] bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden group/img min-h-[220px] md:min-h-auto">
                  {/* Internal design cues */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)]" />
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-slate-300 group-hover/img:border-amber-400 transition-colors" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-300 group-hover/img:border-amber-400 transition-colors" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-300 group-hover/img:border-amber-400 transition-colors" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-slate-300 group-hover/img:border-amber-400 transition-colors" />

                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-[76%] h-[76%] object-contain z-10 transition-transform duration-700 group-hover/img:scale-106 drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)]"
                  />
                </div>

                {/* Info and action panel */}
                <div className="flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Top Meta info */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[9px] font-black uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-550" />
                        LED COMPONENT {idx + 1}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                        <span className="text-xs font-black text-slate-800">{p.rating} Rating</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-amber-655 transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">OPTOELECTRONICS CONFIGURATION</span>
                    </div>

                    {/* Check list of specifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                      {p.specifications.slice(0, 4).map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Pricing panel */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-150">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">PRICING</span>
                      <span className="text-xs sm:text-sm font-extrabold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block mt-0.5">Bulk Quote</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) {
                            onPromptAuth();
                          } else {
                            onToggleWishlist(p);
                          }
                        }}
                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isWishlisted 
                            ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' 
                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-amber-500 hover:border-amber-250 shadow-sm'
                        }`}
                        title="Add spotlight to wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-black tracking-widest shadow-md shadow-slate-950/20 active:scale-95 transition-all duration-300 cursor-pointer border border-transparent"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>ADD TO CART</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
