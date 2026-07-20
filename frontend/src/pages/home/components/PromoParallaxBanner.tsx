import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromoParallaxBannerProps {
  onNavigateToProducts: () => void;
}

export const PromoParallaxBanner: React.FC<PromoParallaxBannerProps> = ({ onNavigateToProducts }) => {
  return (
    <div className="h-[300px] w-full relative overflow-hidden flex items-center justify-center">
      {/* Parallax Background Image with fixed position */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center"
        style={{ backgroundAttachment: 'fixed' }} // Force background-attachment fixed for parallax
      />
      
      {/* Dark tint overlay with very light blur */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-xl mx-4 text-center">
        {/* Floating Glassmorphic card */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-500 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Limited Time Offer</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-serif leading-tight tracking-tight uppercase">
            Exclusive Workshop Savings
          </h3>
          
          <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
            Equip your workbench with our premium industrial-grade electronic components. Get up to <span className="text-blue-300 font-bold">40% Off</span> on certified Connectors, Power Cables, and Switches while stocks last.
          </p>

          <div className="pt-4">
            <button
              onClick={onNavigateToProducts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black rounded-md transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95 group cursor-pointer"
            >
              <span>Explore Deals Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
