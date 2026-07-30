import React from 'react';

export const TrustStatsSection: React.FC = () => {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 -mt-7 md:-mt-18 ">
      <div className="bg-slate-200/80 rounded-md overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/80">
        <div className="grid grid-cols-4 gap-px bg-slate-200/80">
          {[
            { value: '10+', label: 'Years of Trust' },
            { value: '100k+', label: 'Shipped Orders' },
            { value: '20+', label: 'Brand Partners' },
            { value: '99.8%', label: 'Positive Reviews' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-2xl p-2 sm:p-4 md:p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-all duration-300 group">
              <div className="text-base sm:text-3xl md:text-5xl font-black text-slate-900 mb-1 md:mb-2 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300">{stat.value}</div>
              <div className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-tighter sm:tracking-widest md:tracking-[0.2em] text-slate-500 group-hover:text-blue-600/70 transition-colors leading-[1.1] md:leading-normal">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
