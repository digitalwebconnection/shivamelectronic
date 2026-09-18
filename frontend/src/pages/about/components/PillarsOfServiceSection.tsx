import React from 'react';
import { Award, ShieldCheck, Users, Heart } from 'lucide-react';

export const PillarsOfServiceSection: React.FC = () => {
  const values = [
    {
      title: 'Authorized Partnerships',
      description: 'We bypass third-party resellers. Every component is direct from certified manufacturing lines.',
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      gradient: 'from-blue-500 to-indigo-600',
      bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
      title: 'Lifetime Advocacy',
      description: 'Buying from us makes us your technicians for life. Free configuration diagnostics and advice.',
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: 'from-rose-500 to-pink-600',
      bgImage: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
      title: 'Sustainability & Recycling',
      description: 'Certified program collecting unused circuit boards to prevent e-waste from entering landfills.',
      icon: <Heart className="w-6 h-6 text-white" />,
      gradient: 'from-emerald-500 to-teal-600',
      bgImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
      title: 'Zero Defect Guarantee',
      description: 'Our lab checks contacts, insulation, and voltage limits before shipping to ensure safety.',
      icon: <Award className="w-6 h-6 text-white" />,
      gradient: 'from-amber-500 to-orange-600',
      bgImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600&h=800'
    }
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Our Pillars of Service</h2>
          <p className="text-slate-900 text-base sm:text-lg font-light leading-relaxed">
            The core guidelines that define our engineering operations and guarantee excellence in every shipment.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className="group relative h-40 sm:h-70 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-slate-950/50 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-500 bg-slate-800"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={val.bgImage} 
                  alt={val.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent z-10 pointer-events-none"></div>
              
              {/* Interactive Color Glow on Hover */}
              <div className={`absolute inset-0 bg-linear-to-b ${val.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay z-10 pointer-events-none`}></div>

              {/* Card Content */}
              <div className="absolute inset-0 z-20 p-3 sm:p-6 lg:p-8 flex flex-col justify-between">
                {/* Top: Floating Icon */}
                <div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl group-hover:rotate-360 flex items-center justify-center bg-linear-to-br ${val.gradient} shadow-lg shadow-black/50 transform group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500 border border-white/20 backdrop-blur-md`}>
                    {/* We clone the icon to inject responsive sizing if we want, but letting it be w-6 h-6 works well inside a w-10 container */}
                    <div className="scale-75 sm:scale-100 flex items-center justify-center">
                      {val.icon}
                    </div>
                  </div>
                </div>
                
                {/* Bottom: Title & Description */}
                <div className="mt-auto">
                  <h3 className="text-xs sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-100 transition-colors duration-300 leading-tight">
                    {val.title}
                  </h3>
                  
                  <p className="text-[8px] sm:text-sm leading-tight sm:leading-relaxed font-light text-slate-300 group-hover:text-white transition-colors duration-300 line-clamp-3 sm:line-clamp-none">
                    {val.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
