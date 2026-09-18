import React from 'react';
import { Sparkles } from 'lucide-react';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative w-full h-[300px] sm:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-r from-slate-900/90 to-slate-900/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full text-left">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white">Customer Support Center</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-md">
          Connect With <span className="text-blue-400">Our Team</span>
        </h1>
        
        <p className="text-sm sm:text-lg text-slate-200 max-w-xl leading-relaxed font-light drop-shadow-sm">
          Have questions about component parameters, bulk industrial orders, wire harness assemblies, or custom parts? Our experts are here to help.
        </p>
      </div>
    </section>
  );
};
