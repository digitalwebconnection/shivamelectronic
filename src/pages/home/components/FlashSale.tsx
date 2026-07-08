import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart } from 'lucide-react';
import type { Product } from '../../../types';

interface FlashSaleProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  products,
  onAddToCart,
  onSelectProduct
}) => {
  const flashProducts = products.filter(p => p.id === 'p11' || p.id === 'p12');
  const actualFlashProducts = flashProducts.length >= 2 ? flashProducts.slice(0, 2) : products.slice(1, 3);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className=" px-4 sm:px-6 lg:px-0">
        <div className="bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800  p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[250px] h-[250px] bg-amber-600/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Countdown & Promo details */}
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>Limited Flash Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight leading-tight">
                Super Hot Deals <br/>Of The Day
              </h2>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mx-auto lg:mx-0">
                Massive savings on hot items. Offers are valid only for a limited time and while stocks last. Grab yours now!
              </p>

              {/* Live timer display */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Hours</span>
                </div>
                <span className="text-xl font-black text-slate-700">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Mins</span>
                </div>
                <span className="text-xl font-black text-slate-700">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Secs</span>
                </div>
              </div>
            </div>

            {/* Right Column: Flash products */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {actualFlashProducts.map((p, idx) => {
                const stockLeft = idx === 0 ? 4 : 7;
                const claimedPercent = idx === 0 ? 84 : 65;
                return (
                  <div 
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="group bg-slate-950/45 backdrop-blur-md border border-slate-800/80 hover:border-red-500/40 rounded-2xl p-5 flex gap-5 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 hover:-translate-y-0.5 cursor-pointer relative"
                  >
                    {/* Glowing Accent Ring on Hover */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Discount Badge */}
                    <span className="absolute -top-2.5 left-3 bg-linear-to-r from-red-600 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(220,38,38,0.25)] border border-red-500/20 z-10">
                      HOT FLASH DEAL
                    </span>

                    {/* Image panel */}
                    <div className="w-24 h-24 rounded-xl bg-slate-900 border border-slate-800/70  flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-red-950 transition-colors">
                      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent pointer-events-none" />
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full rounded-xl  transition-transform duration-500 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                      />
                    </div>

                    {/* Info Panel */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Category tag */}
                        <span className="text-[8px] font-black text-red-500 tracking-widest uppercase block mb-1">
                          {p.category}
                        </span>
                        
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-100 group-hover:text-red-400 transition-colors leading-tight truncate">
                          {p.name}
                        </h3>
                        
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400">Bulk Discount</span>
                        </div>
                      </div>

                      {/* Stock claimed bar */}
                      <div className="space-y-1.5 mt-3">
                        <div className="flex items-center justify-between text-[8px] font-bold tracking-wide">
                          <span className="text-red-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Only {stockLeft} units left!
                          </span>
                          <span className="text-slate-400">{claimedPercent}% claimed</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-linear-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                            style={{ width: `${claimedPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                        className="mt-3.5 py-2 px-3 w-full bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-[9px] rounded-xl tracking-widest flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md shadow-red-950/20 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>CLAIM DEAL</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
