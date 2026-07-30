import React, { useRef, useState } from 'react';
import { Power, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '../../../types';
import { ProductCard } from './ProductCard';

interface AudioSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onViewAll: (slug: string) => void;
}

export const AudioSection: React.FC<AudioSectionProps> = ({
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

  const switchesList = products.filter(p => 
    ['switches', 'switches-push-buttons', 'switches-relays'].includes(toSlug(p.category))
  );

  // Mouse drag-to-scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

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
    <section 
      id="category-switches" 
      className="pt-10 bg-slate-50/50 border-b border-slate-100 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shadow-sm shadow-violet-100">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Switches & Push Buttons</h2>
              <p className="text-xs text-slate-400 mt-0.5">Heavy-duty illuminated rocker switches and momentary push buttons.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('switches')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-violet-550 hover:text-violet-600 rounded-md text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Static Promo Card (Left) */}
          <div className="lg:col-span-3 shrink-0">
            <div className="h-full rounded-md bg-slate-900 p-6 sm:p-7 flex flex-col text-white relative overflow-hidden  shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-violet-900/30 transition-all duration-500 group border border-slate-800">
              
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={switchesList[0]?.image || "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800"} 
                  alt="Switches Category"
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/80 to-transparent" />
                <div className="absolute inset-0 bg-violet-600/20 mix-blend-overlay" />
              </div>
              
              <div className="space-y-6 relative z-10 flex-1">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-[9px] font-black uppercase tracking-wider backdrop-blur-sm self-start">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  CONTROL PANEL
                </span>
                
                <div className="space-y-3">
                  <h3 className="text-3xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                    High-Current <br/>Appliance Switches
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed font-bold pr-4">
                    Red neon-lit and plain black switches rated for 15A/20A load currents. Ideal for water dispensers, power strips, and dashboards.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => onViewAll('switches')}
                className="mt-6 w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-violet-700 font-black text-[10px] tracking-widest rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-violet-900/10 cursor-pointer relative z-10"
              >
                <span>EXPLORE SWITCHES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Products List (Right) */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="lg:col-span-9 flex items-stretch gap-4 md:gap-5 overflow-x-auto pb-4 lg:pb-6 hide-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {switchesList.map(p => (
              <div 
                key={p.id} 
                className="w-35 sm:w-40 md:w-50 lg:w-55 shrink-0 snap-start"
                onClickCapture={(e) => {
                  if (isDragging) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                }}
              >
                <ProductCard 
                  product={p}
                  wishlist={wishlist}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                  isLoggedIn={isLoggedIn}
                  onPromptAuth={onPromptAuth}
                  accentColor="violet"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
