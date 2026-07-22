import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';

interface HeroProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // We map custom hero slides to items in the database catalog:
  const slideConfigs = [
    {
       bannerImage: '/assets/hero_banner_1.png',
       productIndex: 0
    },
    {
      bannerImage: '/assets/hero_banner_2.png',
      productIndex: 1
    },
    {
      bannerImage: '/assets/hero_banner_3.png',
      productIndex: 2
    }
  ];

  // Build slides using available products, falling back to first product or a placeholder
  const slides = slideConfigs.map(config => ({
    ...config,
    product: products[config.productIndex] || products[0] || null
  })).filter(slide => slide.product !== null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 w-full border-b border-slate-900">
      {/* Inline styles for custom high-performance animations */}
      <style>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.05); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.05); }
          50% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes float-particle-1 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          30% { opacity: 0.35; }
          70% { opacity: 0.35; }
          100% { transform: translateY(-130px) translateX(25px); opacity: 0; }
        }
        @keyframes float-particle-2 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          30% { opacity: 0.25; }
          70% { opacity: 0.25; }
          100% { transform: translateY(-160px) translateX(-30px); opacity: 0; }
        }
        .animate-float-1 {
          animation: float-slow-1 14s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-slow-2 18s ease-in-out infinite;
        }
        .animate-particle-1 {
          animation: float-particle-1 9s ease-in-out infinite;
        }
        .animate-particle-2 {
          animation: float-particle-2 11s ease-in-out infinite;
        }
      `}</style>

      {/* Dynamic Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
        {/* Glow Spheres */}
        <div
          className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-[120px] opacity-25 animate-float-1 transition-all duration-1000"
          style={{
            background:
              currentSlide === 1
                ? 'radial-gradient(circle, rgba(225,29,72,0.15) 0%, transparent 70%)'
                : currentSlide === 2
                  ? 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 animate-float-2 transition-all duration-1000"
          style={{
            background:
              currentSlide === 1
                ? 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)'
                : currentSlide === 2
                  ? 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)'
          }}
        />

        {/* Floating tech nodes / particles */}
        <div className="absolute top-[30%] left-[10%] w-2 h-2 rounded-full bg-blue-500/15 blur-[0.5px] animate-particle-1" />
        <div className="absolute top-[80%] left-[30%] w-3 h-3 rounded-full bg-cyan-500/10 blur-[1px] animate-particle-2" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 rounded-full bg-indigo-500/20 blur-[0.5px] animate-particle-1" style={{ animationDelay: '4.5s' }} />
        <div className="absolute top-[85%] right-[12%] w-2.5 h-2.5 rounded-full bg-rose-500/15 blur-[1px] animate-particle-2" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[60%] left-[75%] w-2 h-2 rounded-full bg-emerald-500/20 blur-[0.5px] animate-particle-1" style={{ animationDelay: '6s' }} />
      </div>

      {/* Main slider viewport */}
      <div className="overflow-hidden w-full relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full shrink-0 relative min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-center py-12 lg:py-20"
            >
              {/* Full Background Image */}
              <img
                src={slide.bannerImage}
                alt={slide.product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-12000 ease-out select-none z-0"
                style={{
                  transform: currentSlide === index ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              {/* Slide Content container */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
