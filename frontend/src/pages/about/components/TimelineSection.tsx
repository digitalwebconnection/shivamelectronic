import React from 'react';
import { Cpu, Building, Zap, Calendar } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const milestones = [
    {
      year: '2016',
      title: 'The Humble Repair Shop',
      description: 'Started in a modest workshop, specializing in precision motherboard repairs.',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      year: '2019',
      title: 'Distribution Hub',
      description: 'Opened our first physical warehouse distributing premium components.',
      icon: <Building className="w-5 h-5" />
    },
    {
      year: '2022',
      title: 'Custom Solutions',
      description: 'Launched custom industrial wire harnessing services for developers.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      year: '2026',
      title: 'Digital Revolution',
      description: 'Pioneered an AI-driven online shop with nationwide shipping.',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">Our Evolution</h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            A continuous journey of innovation and expansion.
          </p>
        </div>

        {/* Horizontal Timeline Container (Desktop) */}
        <div className="hidden lg:block relative mt-6 pb-5">
          {/* The Single Horizontal Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300 rounded-full" />
          
          {/* Active Progress Line */}
          <div className="absolute top-0 left-0 w-3/4 h-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />

          <div className="grid grid-cols-4 relative z-10">
            {milestones.map((m, idx) => {
              return (
                <div key={idx} className="relative flex justify-center group cursor-default pt-12">
                  
                  {/* The Node on the line */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 shadow-md group-hover:scale-150 transition-all duration-300 z-20 ${idx < 3 ? 'bg-white border-blue-600 group-hover:bg-blue-600' : 'bg-slate-100 border-slate-300 group-hover:border-blue-600 group-hover:bg-white'}`} />
                  
                  {/* Connecting vertical line to content */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-px bg-slate-300 group-hover:bg-blue-600 transition-colors duration-300 z-10 h-12`} />

                  {/* Content Box */}
                  <div className={`w-70 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] group-hover:border-blue-300 transition-all duration-500 group-hover:-translate-y-2 relative z-20 overflow-hidden`}>
                    
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-full h-full w-[50%] z-0 block transform -skew-x-12 bg-linear-to-r from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg shadow-blue-500/30">
                        {m.icon}
                      </div>
                      <div className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-500">{m.year}</div>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-2 text-lg relative z-10">{m.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors duration-500">
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline (fallback) */}
        <div className="lg:hidden relative">
           <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 sm:w-1 bg-slate-200 rounded-full" />
           <div className="space-y-6 sm:space-y-12">
             {milestones.map((m, idx) => (
               <div key={idx} className="relative flex items-start group">
                 <div className="absolute left-5 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-[3px] sm:border-4 border-blue-600 -translate-x-1/2 mt-1.5 sm:mt-1.5 z-10 group-hover:scale-125 transition-all duration-300" />
                 
                 <div className="ml-10 sm:ml-16 w-full bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-md group-hover:border-blue-300 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                    
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-full h-full w-[50%] z-0 block transform -skew-x-12 bg-linear-to-r from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg shadow-blue-500/30">
                        <div className="scale-90 sm:scale-100 flex items-center justify-center">{m.icon}</div>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-500">{m.year}</div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 sm:mb-2 text-base sm:text-lg relative z-10">{m.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors duration-500">{m.description}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};
