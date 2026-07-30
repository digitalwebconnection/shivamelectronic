import React, { useState, useEffect } from 'react';
import { Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductsHeroProps {
  selectedCategory: string;
  categoryName: string;
}

const slides = [
  {
    id: 1,
    image: '/electrical-banner.png',
    tag: 'Limited Time Offer',
    title: 'Flat 20% Off On Premium Electronics',
    subtitle: 'Upgrade your setup with top-tier electronic components. Discover our exclusive weekend sale featuring the best brands in the industry. Verified inventory with lightning-fast shipping.'
  },
  {
    id: 2,
    image: '/lighting-banner.png',
    tag: 'New Arrivals',
    title: 'Elegant Lighting & Ceiling Fans',
    subtitle: 'Transform your space with our premium selection of lighting fixtures and ceiling fans. Experience unmatched quality and dynamic designs.'
  },
  {
    id: 3,
    image: '/cables-banner.png',
    tag: 'Heavy Duty',
    title: 'Industrial Cables & Smart Switches',
    subtitle: 'Power your projects with our heavy-duty industrial cables and modern smart wall switches. Built for safety, durability, and performance.'
  }
];

export const ProductsHero: React.FC<ProductsHeroProps> = ({ selectedCategory, categoryName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const displaySlides = selectedCategory === 'All' ? slides : slides.map((slide, index) => {
    if (index === 0) {
      return {
        ...slide,
        title: `Huge Discounts on ${categoryName}`
      };
    }
    return slide;
  });

  return (
    <div className="relative w-full h-100  overflow-hidden mb-10 shadow-2xl bg-slate-900 group">
      
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {displaySlides.map((slide) => (
          <div 
            key={slide.id}
            className="w-full h-full shrink-0 relative flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
            
            <div className="w-full relative z-10 text-left px-8 md:px-16 lg:px-24 flex flex-col items-start mr-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                <Tag className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-100">{slide.tag}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-serif tracking-tight mb-6 drop-shadow-lg leading-tight max-w-2xl">
                {slide.title}
              </h1>
              
              <p className="text-sm md:text-base text-blue-100/90 max-w-xl mb-8 font-medium leading-relaxed">
                {slide.subtitle}
              </p>
              
              <button className="bg-white text-indigo-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-black text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1 flex items-center gap-2 cursor-pointer">
                Shop The Sale <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx 
                ? 'w-8 h-2 bg-white' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </div>
  );
};
