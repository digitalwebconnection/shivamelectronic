import React from 'react';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export const Guarantees: React.FC = () => {

  const guaranteeItems = [
    {
      title: "Free Express Delivery",
      description: "Free home delivery on all bulk industrial product inquiries. Shipped within 24 hours.",
      icon: <Truck className="w-8 h-8" />,
      iconBg: "bg-blue-50 border-blue-100 text-blue-600",
      hoverBorder: "hover:border-blue-400/80",
      hoverShadow: "hover:shadow-blue-500/8"
    },
    {
      title: "100% Genuine Products",
      description: "All products are directly sourced from authorized brand manufacturer chains.",
      icon: <ShieldCheck className="w-8 h-8" />,
      iconBg: "bg-rose-50 border-rose-100 text-rose-600",
      hoverBorder: "hover:border-rose-400/80",
      hoverShadow: "hover:shadow-rose-500/8"
    },
    {
      title: "2-Year Official Warranty",
      description: "Shop with peace of mind. Every product carries a full manufacturer warranty.",
      icon: <Award className="w-8 h-8" />,
      iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
      hoverBorder: "hover:border-emerald-400/80",
      hoverShadow: "hover:shadow-emerald-500/8"
    },
    {
      title: "24/7 Dedicated Support",
      description: "Get friendly, live human support for setup queries and post-purchase issues.",
      icon: <Headphones className="w-8 h-8" />,
      iconBg: "bg-violet-50 border-violet-100 text-violet-600",
      hoverBorder: "hover:border-violet-400/80",
      hoverShadow: "hover:shadow-violet-500/8"
    }
  ];

  return (
    <section className="  bg-white py-5 border-y border-slate-200/80 relative overflow-hidden">
    
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-6 relative z-10">
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-0 md:gap-6">
          {guaranteeItems.map((item, idx) => (
            <div 
              key={idx}
              className={`flex flex-col items-center justify-center text-center p-2 sm:p-4 md:p-6  bg-white/95 backdrop-blur-md  transition-all duration-300 hover:-translate-y-1 ${item.hoverBorder} ${item.hoverShadow} `}
            >
              {/* Large Icon Container */}
              <div className={`w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center border md:mb-4 shrink-0 transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}>
                <div className="scale-[0.65] md:scale-100 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              
              {/* Text Contain */}
              <div className="mt-1 md:mt-0 space-y-2 flex-1">
                <h4 className="text-[7.5px] sm:text-[8px] md:text-sm font-bold text-slate-900 md:whitespace-nowrap tracking-tight md:tracking-wide leading-tight">
                  {item.title}
                </h4>
                <p className="hidden lg:block text-[11px] text-slate-500 leading-relaxed max-w-60 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
