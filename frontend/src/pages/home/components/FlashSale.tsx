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
  const flashProducts = products.filter(p => p.isHot);
  const actualFlashProducts = flashProducts.length > 0 
    ? flashProducts.slice(0, 2) 
    : products.slice(1, 3);

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
    <section className=" bg-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className="px-0 sm:px-6 lg:px-0 max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 md:border md:border-slate-800 p-4 md:p-8 md:shadow-2xl relative overflow-hidden sm:rounded-md lg:rounded-none">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-75 h-75 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-62.5 h-62.5 bg-amber-600/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
            
            {/* Left Column: Countdown & Promo details */}
            <div className="lg:col-span-4 flex flex-col gap-3 md:space-y-4">
              <div className="flex items-end justify-between lg:flex-col lg:items-start lg:justify-start lg:gap-0">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-500 text-[9px] md:text-[10px] font-black uppercase tracking-wider mb-1 md:mb-0">
                    <Flame className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                    <span>Flash Deals</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-serif tracking-tight leading-tight mt-1">
                    Super Hot Deals <br className="hidden md:block"/>Of The Day
                  </h2>
                </div>

                {/* Live timer display */}
                <div className="flex items-center gap-1 md:gap-2 pt-0 md:pt-2">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sm md:text-lg font-black text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Hrs</span>
                  </div>
                  <span className="text-base md:text-xl font-black text-slate-700 -mt-3 md:-mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sm md:text-lg font-black text-white">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Min</span>
                  </div>
                  <span className="text-base md:text-xl font-black text-slate-700 -mt-3 md:-mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sm md:text-lg font-black text-white">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Sec</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed hidden md:block">
                Massive savings on hot items. Offers are valid only for a limited time and while stocks last. Grab yours now!
              </p>
            </div>

            {/* Right Column: Flash products */}
            <div className="lg:col-span-8 flex overflow-x-auto gap-3 md:gap-4 px-4 sm:px-0 pb-1 md:pb-4 snap-x hide-scrollbar lg:grid lg:grid-cols-2 lg:gap-5 lg:snap-none lg:overflow-visible -mx-4 sm:mx-0">
              {actualFlashProducts.map((p, idx) => {
                const stockLeft = idx === 0 ? 4 : 7;
                const claimedPercent = idx === 0 ? 84 : 65;
                return (
                  <div 
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="group bg-slate-900 border border-slate-800 rounded-md p-3 md:p-4 flex gap-3 md:gap-5 transition-all duration-300 hover:border-red-500/50 active:scale-[0.98] md:active:scale-100 cursor-pointer relative shrink-0 snap-start w-70 sm:w-80 md:w-90 lg:w-auto lg:shrink shadow-lg shadow-slate-950/50"
                  >
                    {/* Discount Badge */}
                    <span className="absolute top-0 left-0 bg-linear-to-r from-red-600 to-rose-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-tl-md rounded-br-xl shadow-sm z-10">
                      FLASH DEAL
                    </span>

                    {/* Image panel */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-slate-800/50 flex items-center justify-center shrink-0 relative overflow-hidden mt-1 md:mt-0">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                      />
                    </div>

                    {/* Info Panel */}
                    <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                      <div>
                        {/* Category tag */}
                        <span className="text-[9px] font-black text-rose-400 tracking-widest uppercase block mb-1 truncate">
                          {p.category}
                        </span>
                        
                        <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-rose-400 transition-colors leading-tight line-clamp-2 mb-2">
                          {p.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {/* Stock claimed bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[9px] font-bold tracking-wide">
                            <span className="text-red-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                              Only {stockLeft} left
                            </span>
                            <span className="text-slate-400">{claimedPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full" 
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
                          className="w-full py-2 px-3 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] rounded-lg tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>CLAIM DEAL</span>
                        </button>
                      </div>
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
