import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromoParallaxBannerProps {
  onNavigateToProducts: () => void;
}

export const PromoParallaxBanner: React.FC<PromoParallaxBannerProps> = ({ onNavigateToProducts }) => {
  return (
    <div className="h-[400px] w-full relative overflow-hidden flex items-center justify-center">
      {/* Parallax Background Image with fixed position */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center"
        style={{ backgroundAttachment: 'fixed' }} // Force background-attachment fixed for parallax
      />
      
      {/* Dark tint overlay with very light blur */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] pointer-events-none" />

      {/* Subtle border lines inside */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      {/* Content Container */}
      <div className="relative z-10 max-w-xl mx-4 text-center">
        {/* Floating Glassmorphic card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/20 hover:scale-[1.01] hover:bg-white/12 transition-all duration-300">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Limited Time Deal</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight uppercase">
            Mid-Season Mega Sale
          </h3>
          
          <p className="text-xs text-slate-200 mt-2 max-w-md mx-auto leading-relaxed">
            Upgrade your lifestyle with our premium smart devices. Get up to <span className="text-blue-300 font-bold">40% Off</span> on selected Laptops, Smartphones & Audio accessories.
          </p>

          {/* Coupon Code badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-slate-950/30 border border-white/5 rounded-xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Use Code:</span>
            <span className="text-[11px] text-blue-300 font-black tracking-widest">SHIVAM10</span>
          </div>

          <div className="mt-6">
            <button
              onClick={onNavigateToProducts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95 group"
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
