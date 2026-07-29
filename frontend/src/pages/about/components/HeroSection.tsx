import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-24 md:pb-32 bg-slate-900 flex items-center ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000&h=1000" 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-30"
        />
       </div>
      
  
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-md mb-4 md:mb-8 hover:border-blue-400/50 transition-colors cursor-pointer group shadow-xs">
          <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-[8px] md:text-xs font-bold tracking-widest uppercase text-blue-100">Pioneering Electronics Since 2016</span>
        </div>
        
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight mb-3 md:mb-8 text-white">
          <span className="block mb-1 md:mb-2 leading-tight">Technology Meets</span>
          <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-tight pb-1 md:pb-2">
            Human Craftsmanship
          </span>
        </h1>
        
        <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto leading-snug md:leading-relaxed font-light mb-4 md:mb-12">
          Discover the story, the philosophy, and the community of engineers behind <span className="text-white font-medium">Shivam Electronic World</span>—your trusted partner in premium technology.
        </p>

      </div>
    </section>
  );
};
