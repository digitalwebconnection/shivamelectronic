import React from 'react';
import { Laptop, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50/50 border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Column */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl" />
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 overflow-hidden shadow-xl shadow-slate-100">
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Philosophy</h3>
              <p className="text-xs text-slate-550 leading-relaxed mb-4">
                Shivam Electronic World was founded with the mission to connect tech enthusiasts and professionals with genuine, state-of-the-art electronic equipment. We represent major manufacturers and audit every supplier, ensuring you receive authentic gear backed by authorized warranties.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <span className="block text-2xl font-black text-slate-900">100k+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Products Sold</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-slate-900">99.8%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Happy Customers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
              About Shivam Electronics
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Leading the Electronics Retail Space
            </h2>
            <p className="text-slate-550 text-sm leading-relaxed">
              Over the last decade, we have established ourselves as a reliable source of luxury consumer electronics, smart home automation modules, custom high-performance workstations, and lifestyle wearables. 
            </p>
            
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Authorized Partner Store</h4>
                  <p className="text-[11px] text-slate-550 mt-0.5">Official distributor for major brands, ensuring direct replacement and quick service resolution.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Advanced Customer Support</h4>
                  <p className="text-[11px] text-slate-550 mt-0.5">Our electronic engineers are ready to assist with tech specs, configuration setup, and troubleshooting.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
