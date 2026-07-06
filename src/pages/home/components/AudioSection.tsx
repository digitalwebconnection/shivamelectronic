import React, { useRef, useState } from 'react';
import { Headphones, ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const audio = products.filter(p => p.category === 'audio');

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
    <section id="category-audio" className="py-16 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Audio & Headphones</h2>
              <p className="text-xs text-slate-400 mt-0.5">True wireless earbuds, smart speakers, and studio monitors.</p>
            </div>
          </div>
          <button 
            onClick={() => onViewAll('audio')}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-violet-500 hover:text-violet-600 rounded-xl text-[10px] font-bold text-slate-600 transition-all bg-white cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Static Promo Card (Left) */}
          <div className="lg:col-span-3 flex-shrink-0">
            <div className="h-full rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[300px] lg:min-h-auto">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-[8px] font-black uppercase tracking-wider inline-block">
                  Acoustic Sale
                </span>
                <h3 className="text-lg font-black tracking-tight leading-tight">
                  High-Fidelity <br/>Audio Silence
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Immerse in absolute acoustic purity. Save 25% on Bose QuietComfort and Sony noise-cancelling headphones.
                </p>
              </div>
              <button 
                onClick={() => onViewAll('audio')}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-400 hover:text-violet-300 group self-start mt-8 cursor-pointer"
              >
                <span>Explore Acoustic Gear</span>
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
            {audio.map(p => (
              <div 
                key={p.id} 
                className="w-[240px] sm:w-[260px] flex-shrink-0"
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
