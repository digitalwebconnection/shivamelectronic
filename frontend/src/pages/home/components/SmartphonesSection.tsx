import React from 'react';
import { Cable, ArrowRight, Star, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import type { Product } from '../../../types';

interface SmartphonesSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const SmartphonesSection: React.FC<SmartphonesSectionProps> = ({
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

  const cables = products.filter(p => 
    ['cables', 'cables-power-cords'].includes(toSlug(p.category))
  );

  return (
    <section 
      id="category-cables" 
      className="py-16 bg-linear-to-b from-white via-rose-50/20 to-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background soft glowing highlights */}
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-rose-200/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-amber-200/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm shadow-rose-100">
              <Cable className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Cables & Power Cords</h2>
              <p className="text-xs text-slate-600 mt-0.5">Heavy-duty 1.5m computer power cords and 2-pin figure-8 AC cables.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('cables')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-400 hover:border-red-500 hover:text-red-600 rounded-md text-xs font-bold text-slate-600 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View Cables</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial-style Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Promo Card: Highlight Feature Panel */}
          <div className="rounded-md bg-linear-to-br from-red-800 via-red-550 to-orange-550 p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[340px] md:min-h-auto shadow-xl shadow-red-600/25 hover:shadow-2xl hover:shadow-red-600/35 hover:-translate-y-1 transition-all duration-500 group">
            {/* Mesh Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100%_12px] pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-md blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-[9px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                100% OK SAFETY TESTED
              </span>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  Heavy Duty. <br/>Pure Copper.
                </h3>
                <p className="text-xs text-rose-100 leading-relaxed font-medium">
                  ISO 9001 certified power cords with solid insulation jackets. Engineered for extreme safety, low resistance, and long-term durability.
                </p>
              </div>
            </div>

            <button 
              onClick={() => onViewAll('cables')}
              className="mt-8 w-full py-3 px-4 bg-white hover:bg-slate-50 text-red-600 font-black text-[10px] tracking-widest rounded-md flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-rose-900/10 cursor-pointer"
            >
              <span>DISCOVER CABLES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Cards List */}
          {cables.slice(0, 3).map(p => {
            const isWishlisted = wishlist.some(item => item.id === p.id);
            // Dynamic specification or subtitle fallback
            const specSubtitle = p.specifications[0] || 'Premium Power Cable';
            const screenSpec = p.specifications[1] || 'Certified Copper Core';

            return (
              <div 
                key={p.id} 
                onClick={() => onSelectProduct(p)}
                className="group relative flex flex-col bg-white border border-slate-100 rounded-md aspect-4/5 overflow-hidden shadow-xl shadow-slate-800/45 hover:shadow-2xl hover:shadow-red-550/15 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoggedIn) {
                      onPromptAuth();
                    } else {
                      onToggleWishlist(p);
                    }
                  }}
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-md transition-all duration-300 cursor-pointer ${
                    isWishlisted 
                              ? 'text-rose-500  ' 
            : ' text-slate-800 hover:text-rose-500 '
                  }`}
                >
                  <Heart className={`w-5.5 h-5.5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-2.5 py-1 bg-white/95 border border-slate-100 rounded-md shadow-sm text-yellow-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-black text-slate-800">{p.rating}</span>
                </div>

                {/* Image Container with Accent radial glow */}
                <div className="relative flex-1 bg-slate-50/50 flex items-center justify-center  overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.03),transparent_70%)] pointer-events-none" />
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-fill group-hover:scale-106 transition-transform duration-700 drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)]"
                  />
                </div>

                {/* Frosted Glass Overlay Capsule Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 flex items-center justify-between text-white shadow-xl shadow-slate-950/20">
                  <div className="min-w-0 pr-2">
                    <span className="text-[8px] font-extrabold text-rose-400 uppercase tracking-widest block mb-0.5">
                      {screenSpec}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-white truncate leading-tight group-hover:text-rose-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 truncate">{specSubtitle}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Quote on Request</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="mt-1.5 p-2 rounded-md bg-linear-to-r from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 text-rose-600 shadow-md shadow-rose-950/10 active:scale-90 transition-all duration-300 cursor-pointer border border-rose-200/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
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
