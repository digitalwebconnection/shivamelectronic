import React, { useRef, useState } from 'react';
import { Power, ArrowRight, ArrowUpRight } from 'lucide-react';
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
    <section id="category-switches" className="py-16 bg-white border-b border-slate-100 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shadow-sm shadow-violet-100">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Switches & Push Buttons</h2>
              <p className="text-xs text-slate-400 mt-0.5">Heavy-duty illuminated rocker switches and momentary push buttons.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('switches')}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-violet-550 hover:text-violet-600 rounded-xl text-xs font-bold text-slate-650 transition-all bg-white cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Static Promo Card (Left) */}
          <div className="lg:col-span-3 shrink-0">
            <div className="h-full rounded-2xl bg-linear-to-br from-slate-900 via-violet-955 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[300px] lg:min-h-auto">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-[8px] font-black uppercase tracking-wider inline-block">
                  Control Panel
                </span>
                <h3 className="text-lg font-black tracking-tight leading-tight">
                  High-Current <br/>Appliance Switches
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Red neon-lit and plain black switches rated for 15A/20A load currents. Ideal for water dispensers, power strips, and dashboards.
                </p>
              </div>
              <button 
                onClick={() => onViewAll('switches')}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-400 hover:text-violet-300 group self-start mt-8 cursor-pointer"
              >
                <span>Explore Control Switches</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            className="lg:col-span-9 flex items-stretch gap-5 overflow-x-auto pb-4 custom-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
          >
            {switchesList.map(p => (
              <div 
                key={p.id} 
                className="w-[240px] sm:w-[260px] shrink-0"
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
