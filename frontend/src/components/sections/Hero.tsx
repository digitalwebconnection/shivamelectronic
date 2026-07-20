import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Award, ShoppingBag, Watch } from 'lucide-react';
import type { Product } from '../../types';

interface HeroProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ products, onSelectProduct, onNavigateToProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // We map custom hero slides to items in the database catalog:
  const slideConfigs = [
    {
      productIndex: 11, // GX16 Aviation Connector
      badge: 'INDUSTRIAL CONNECTORS',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      titleLine1: 'Industrial Grade',
      titleLine2: 'Precision Connectors',
      gradient: 'from-blue-600 to-indigo-500',
      shadowColor: 'rgba(59,130,246,0.25)',
      tagline: 'Heavy-duty GX16 aviation plugs, DB9 serial ports, and IC sockets. Engineered for reliable signal and power transmission.',
      bannerImage: '/assets/hero_banner_1.png'
    },
    {
      productIndex: 1, // Anjali Power Cord
      badge: 'HEAVY-DUTY CABLING',
      icon: <Zap className="w-3.5 h-3.5" />,
      titleLine1: 'Premium Quality',
      titleLine2: 'Cables & Power Cords',
      gradient: 'from-rose-600 to-amber-500',
      shadowColor: 'rgba(225,29,72,0.25)',
      tagline: 'Standard 1.5m computer cords, right-angle figure-8 cables, and insulated copper conductors. 100% certified safety.',
      bannerImage: '/assets/hero_banner_2.png'
    },
    {
      productIndex: 3, // Illuminated Rocker Switch
      badge: 'CONTROL SWITCHES',
      icon: <Watch className="w-3.5 h-3.5" />,
      titleLine1: 'Illuminated Rocker',
      titleLine2: 'Power Switches',
      gradient: 'from-emerald-600 to-teal-500',
      shadowColor: 'rgba(5,150,105,0.25)',
      tagline: 'Durable KCD4 rocker switches, PBS-110 push buttons, and bright 5mm diffusing red LEDs for smart electrical panels.',
      bannerImage: '/assets/hero_banner_3.png'
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


  const setSlide = (idx: number) => {
    setCurrentSlide(idx);
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

              {/* Rich Overlay Gradients for content contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-slate-950/30 z-10" />

              {/* Slide Content container */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Side: Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col justify-center text-white">
                  <div className="self-center lg:self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-100 text-xs font-semibold tracking-wide">
                    {slide.icon}
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-serif tracking-tight leading-tight">
                    {slide.titleLine1} <br />
                    <span className={`bg-linear-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                      {slide.titleLine2}
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
                    {slide.tagline}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                    <button
                      onClick={() => onSelectProduct(slide.product)}
                      className={`px-6 py-3.5 bg-linear-to-r ${slide.gradient} hover:opacity-90 text-white text-xs font-bold rounded-md shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95`}
                      style={{ boxShadow: `0 10px 25px -5px ${slide.shadowColor}` }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop Now</span>
                    </button>
                    {onNavigateToProducts && (
                      <button
                        onClick={onNavigateToProducts}
                        className="px-6 py-3.5 bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 text-white text-xs font-bold rounded-md transition-all text-center cursor-pointer active:scale-95"
                      >
                        Explore Full Catalog
                      </button>
                    )}
                  </div>

                  {/* Trust guarantees badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 text-left border-t border-white/10 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">Genuine Pick</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <Zap className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <Award className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">Full Warranty</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>



        {/* Dots Indicator Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide
                ? `w-6 bg-linear-to-r ${slide.gradient}`
                : 'w-2 bg-white/30 hover:bg-white/55'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
