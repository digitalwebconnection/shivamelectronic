import React, { useRef, useState, useEffect } from 'react';
import { Gamepad2, ArrowRight, Heart, Star, Eye } from 'lucide-react';
import type { Product } from '../../../types';

interface GamingSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const GamingSection: React.FC<GamingSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onViewAll
}) => {
  const gaming = products.filter(p => p.category === 'gaming');

  // Mouse drag-to-scroll and autoplay state
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let intervalId: any;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        // Pause if user is dragging or hovering
        if (isDownRef.current || isHovered) return;

        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScrollLeft - 5) {
          // Loop back to start
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Advance by one card size
          slider.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoPlay();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    isDownRef.current = true;
    setIsDragging(false);
    startXRef.current = e.pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const slider = scrollRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Scroll speed modifier
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    slider.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section id="category-gaming" className="py-16 bg-slate-950 border-b border-slate-900 text-white scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[350px] h-[350px] bg-red-650/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[200px] h-[200px] bg-purple-650/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8 px-4 sm:px-6 lg:px-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Gaming & Gear Showcase</h2>
              <p className="text-xs text-slate-400 mt-0.5">Explore our upcoming launches and exclusive promo items.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('gaming')}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-800 hover:border-red-500 hover:text-red-400 rounded-xl text-[10px] font-bold text-slate-300 transition-all bg-slate-900 cursor-pointer shadow-md"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Scrollable Slider */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-0 custom-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
        >
          {gaming.map(p => {
            const isWishlisted = wishlist.some(item => item.id === p.id);
            return (
              <div 
                key={p.id}
                onClick={() => onSelectProduct(p)}
                onClickCapture={(e) => {
                  if (isDragging) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                }}
                className="group relative flex flex-col bg-slate-900 border border-slate-850 hover:border-red-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-650/5 hover:-translate-y-1 cursor-pointer w-[250px] sm:w-[280px] flex-shrink-0"
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  {p.isHot && (
                    <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm">
                      Hot
                    </span>
                  )}
                  {p.isNew && (
                    <span className="bg-gradient-to-r from-red-600 to-pink-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm">
                      New
                    </span>
                  )}
                </div>

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
                  className={`absolute top-3 right-3 z-10 p-2 rounded-xl transition-all duration-300 border cursor-pointer ${
                    isWishlisted 
                      ? 'bg-red-600 border-red-600 text-white shadow-md' 
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/30'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 transition-transform duration-300 ${isWishlisted ? 'fill-current text-white scale-110' : 'text-slate-400'}`} />
                </button>

                {/* Image */}
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden border-b border-slate-900 flex items-center justify-center p-6">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-[82%] h-[82%] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold rounded-xl shadow-md">
                      <Eye className="w-3.5 h-3.5 text-red-500" />
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-red-500 uppercase tracking-widest font-black block mb-1">
                      {p.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-2 min-h-[36px] group-hover:text-red-400 transition-colors leading-tight mb-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-2.5 h-2.5 ${i < Math.floor(p.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-800'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-slate-500">
                        {p.rating}
                      </span>
                    </div>
                  </div>

                  {/* Promo Showcase Footer - No Price/Cart */}
                  <div className="mt-auto pt-3 border-t border-slate-850 flex items-center justify-between">
                    {p.isNew ? (
                      <span className="text-[9.5px] font-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm shadow-blue-900/20 animate-pulse">
                        Upcoming Launch
                      </span>
                    ) : p.isHot ? (
                      <span className="text-[9.5px] font-black bg-gradient-to-r from-red-600 to-amber-500 text-white px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm shadow-red-900/20">
                        Exclusive Deal
                      </span>
                    ) : (
                      <span className="text-[9.5px] font-black bg-slate-800 text-slate-305 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}

                    <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
                      Q3 2026
                    </span>
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
