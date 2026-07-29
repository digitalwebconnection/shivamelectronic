import React from 'react';
import { Building } from 'lucide-react';

export const ShowroomSection: React.FC = () => {
  return (
    <section className="py-10 relative overflow-hidden ">
      <div className="absolute top-1/2 left-0 w-125 h-125  -translate-y-1/2 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 relative group w-full">
            <div className="absolute -inset-2 md:-inset-4 bg-linear-to-r from-blue-400 to-purple-400 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-md overflow-hidden border border-slate-200 bg-white shadow-xl md:shadow-2xl">
              <img
                src="/electronics_showroom.png"
                alt="Showroom"
                className="w-full h-62.5 sm:h-87.5 md:h-125 object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4 md:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-5 md:px-10 py-1.5 md:py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <Building className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span>Visit Us In Person</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Our Physical Retail <br className="hidden lg:block" /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Experience Centers</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-slate-600 md:text-slate-900 text-sm md:text-lg leading-relaxed font-light">
              <p>
                Electronic components require precision parameters and tactile verification. While our online store serves engineering teams and hobbyists nationwide, our physical experience showroom stands as a specialized hub. It is equipped with testing benches, oscilloscope diagnostics tools, and thousands of industrial component samples waiting to be integrated.
              </p>
              <p>
                Whether you are designing a high-load power delivery circuit, sourcing reliable rocker switches for control cabinets, or setting up custom wiring harness assemblies, our electrical engineers are on standby to verify specifications and supply custom volume reels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
