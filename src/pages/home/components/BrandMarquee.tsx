import React from 'react';

export const BrandMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
          Certified Dealer
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Official Brand Partners
        </h2>
      </div>

      {/* Scroll marquee */}
      <div className="relative w-full flex overflow-x-hidden">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 22s linear infinite;
          }
        `}</style>
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-slate-400 text-lg font-black tracking-wider uppercase select-none items-center py-2">
          <span>Apple</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Samsung</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Sony</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Bose</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Dell</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Lenovo</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Fujifilm</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>GoPro</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Nintendo</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Asus</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          {/* Duplication */}
          <span>Apple</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Samsung</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Sony</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Bose</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Dell</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Lenovo</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Fujifilm</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>GoPro</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Nintendo</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Asus</span>
          <span className="text-blue-500/20 text-2xl">•</span>
        </div>
      </div>
    </section>
  );
};
