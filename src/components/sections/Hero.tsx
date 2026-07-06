import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Award, ChevronLeft, ChevronRight, Headphones, ShoppingBag, Watch } from 'lucide-react';
import { products } from '../../data/products';
import type { Product } from '../../types';

interface HeroProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProduct, onNavigateToProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // We map custom hero slides to items in the database catalog:
  // p1: Apple MacBook Pro 16"
  // p2: Apple iPhone 15 Pro Max
  // p3: Sony WH-1000XM5 Headphones
  // p4: Apple Watch Ultra 2
  const slides = [
    {
      product: products[0],
      badge: 'PRO PERFORMANCE',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      titleLine1: 'Upgrade Your Digital',
      titleLine2: 'World Experience',
      gradient: 'from-blue-600 to-cyan-500',
      shadowColor: 'rgba(59,130,246,0.25)',
      tagline: 'Supercharged by Apple M3 Max chip with 16-core CPU. Explore extreme computing capability with Shivam.',
    },
    {
      product: products[1],
      badge: 'TITANIUM DESIGN',
      icon: <Zap className="w-3.5 h-3.5" />,
      titleLine1: 'Next-Gen Titanium',
      titleLine2: 'iPhone 15 Pro Max',
      gradient: 'from-rose-600 to-amber-500',
      shadowColor: 'rgba(225,29,72,0.25)',
      tagline: 'Strong. Light. Pro. Forged in aerospace-grade titanium with the powerful, blazing fast A17 Pro chip.',
    },
    {
      product: products[2],
      badge: 'AUDIO IMMERSION',
      icon: <Headphones className="w-3.5 h-3.5" />,
      titleLine1: 'Industry-Leading Noise',
      titleLine2: 'Cancelling Silence',
      gradient: 'from-indigo-600 to-purple-500',
      shadowColor: 'rgba(79,70,229,0.25)',
      tagline: 'Dual processors controlling eight microphones. Experience absolute acoustic purity and rich wireless audio.',
    },
    {
      product: products[3],
      badge: 'RUGGED ADVENTURE',
      icon: <Watch className="w-3.5 h-3.5" />,
      titleLine1: 'Apple Watch Ultra 2',
      titleLine2: 'Tough & Capable',
      gradient: 'from-emerald-600 to-teal-500',
      shadowColor: 'rgba(5,150,105,0.25)',
      tagline: '49mm aerospace titanium case, dual-frequency GPS, and up to 36 hours of battery life built for athletes.',
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const setSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-100 py-8 lg:py-8 flex items-center">
      {/* Inline styles for custom high-performance animations */}
      <style>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(45px, -55px) scale(1.1); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.05); }
          50% { transform: translate(-50px, 45px) scale(0.95); }
        }
        @keyframes float-particle-1 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          30% { opacity: 0.55; }
          70% { opacity: 0.55; }
          100% { transform: translateY(-130px) translateX(25px); opacity: 0; }
        }
        @keyframes float-particle-2 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          30% { opacity: 0.45; }
          70% { opacity: 0.45; }
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Glow Spheres */}
        <div
          className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-40 animate-float-1 transition-all duration-1000"
          style={{
            background:
              currentSlide === 1
                ? 'radial-gradient(circle, rgba(225,29,72,0.18) 0%, transparent 70%)'
                : currentSlide === 2
                  ? 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)'
                  : currentSlide === 3
                    ? 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 animate-float-2 transition-all duration-1000"
          style={{
            background:
              currentSlide === 1
                ? 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)'
                : currentSlide === 2
                  ? 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)'
                  : currentSlide === 3
                    ? 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)'
          }}
        />

        {/* Floating tech nodes / particles */}
        <div className="absolute top-[30%] left-[10%] w-2 h-2 rounded-full bg-blue-500/25 blur-[0.5px] animate-particle-1" />
        <div className="absolute top-[80%] left-[30%] w-3 h-3 rounded-full bg-cyan-500/20 blur-[1px] animate-particle-2" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 rounded-full bg-indigo-500/35 blur-[0.5px] animate-particle-1" style={{ animationDelay: '4.5s' }} />
        <div className="absolute top-[85%] right-[12%] w-2.5 h-2.5 rounded-full bg-rose-500/25 blur-[1px] animate-particle-2" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[60%] left-[75%] w-2 h-2 rounded-full bg-emerald-500/30 blur-[0.5px] animate-particle-1" style={{ animationDelay: '6s' }} />
      </div>

      {/* Main slides container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4"
              >
                {/* Slide Left: Text Content */}
                <div className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col justify-center py-4">
                  <div className="self-center lg:self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide">
                    {slide.icon}
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                    {slide.titleLine1} <br />
                    <span className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                      {slide.titleLine2}
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-555 max-w-lg leading-relaxed mx-auto lg:mx-0">
                    {slide.tagline}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                    <button
                      onClick={() => onSelectProduct(slide.product)}
                      className={`px-6 py-3.5 bg-gradient-to-r ${slide.gradient} hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95`}
                      style={{ boxShadow: `0 10px 25px -5px ${slide.shadowColor}` }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop Now</span>
                    </button>
                    {onNavigateToProducts && (
                      <button
                        onClick={onNavigateToProducts}
                        className="px-6 py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-350 hover:bg-slate-100 text-slate-650 text-xs font-bold rounded-xl transition-all text-center cursor-pointer active:scale-95"
                      >
                        Explore Full Catalog
                      </button>
                    )}
                  </div>

                  {/* Trust guarantees badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">Genuine Pick</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">Full Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Slide Right: Visual Image Card */}
                <div className="lg:col-span-5 flex justify-center items-center py-4">
                  <div className="relative w-full max-w-[320px] aspect-square bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-2xl flex items-center justify-center group overflow-hidden">
                    {/* Tech glowing grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-100/50 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-all duration-700" />

                    <img
                      src={slide.product.image}
                      alt={slide.product.name}
                      className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
                    />

                    {/* Floating price badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-2xl flex items-center justify-between z-10">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Top Rated Gear</p>
                        <p className="text-[11px] font-bold text-slate-900 truncate">{slide.product.name}</p>
                      </div>
                      <span className={`text-[9px] font-extrabold text-white px-2 py-1 rounded-lg bg-gradient-to-r ${slide.gradient} uppercase tracking-wider`}>
                        Inquire
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators & navigation arrows */}
        <div className="flex items-center justify-between mt-8 relative z-20 px-4">
          {/* Previous/Next buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-650 hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-650 hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide
                    ? `w-6 bg-gradient-to-r ${slide.gradient}`
                    : 'w-2 bg-slate-200 hover:bg-slate-355'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
