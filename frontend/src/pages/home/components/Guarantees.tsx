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
    <section className="py-16 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      {/* Inline styles for background animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.08); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) scale(1.08); }
          50% { transform: translateY(15px) scale(1); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 15s ease-in-out infinite;
        }
      `}</style>

      {/* Dotted Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 pointer-events-none" />
      
      {/* Colorful Floating Orbs */}
      <div className="absolute -top-16 left-1/4 w-80 h-80 rounded-full bg-blue-300/20 blur-[100px] pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-violet-300/25 blur-[100px] pointer-events-none animate-float-reverse" />
      <div className="absolute top-1/2 left-2/3 w-64 h-64 rounded-full bg-rose-200/15 blur-[90px] pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guaranteeItems.map((item, idx) => (
            <div 
              key={idx}
              className={`flex flex-col items-center text-center p-6 rounded-md bg-white/95 backdrop-blur-md border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 ${item.hoverBorder} ${item.hoverShadow} shadow-md shadow-slate-200/30`}
            >
              {/* Large Icon Container */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border mb-4 shrink-0 transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}>
                {item.icon}
              </div>
              
              {/* Text Contain */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 whitespace-nowrap tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] font-medium">
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
