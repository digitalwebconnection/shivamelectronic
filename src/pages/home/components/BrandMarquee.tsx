import React from 'react';

export const BrandMarquee: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 mb-6 text-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
          Certified Dealer
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
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
          <span>TE Connectivity</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Molex</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Amphenol</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Omron</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Siemens</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Schneider Electric</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Panasonic</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Delta Electronics</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Phoenix Contact</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Honeywell</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          {/* Duplication */}
          <span>TE Connectivity</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Molex</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Amphenol</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Omron</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Siemens</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Schneider Electric</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Panasonic</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Delta Electronics</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Phoenix Contact</span>
          <span className="text-blue-500/20 text-2xl">•</span>
          <span>Honeywell</span>
          <span className="text-blue-500/20 text-2xl">•</span>
        </div>
      </div>
    </section>
  );
};
