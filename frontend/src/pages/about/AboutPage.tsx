import { Award, ShieldCheck, Zap, Users, Cpu, Calendar, Star, Building, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2016',
      title: 'The Humble Repair Shop',
      description: 'Shivam Electronic World was founded in a modest 400 sq. ft. workshop, specializing in precision repairs for motherboard micro-soldering and custom cabling.',
      icon: <Cpu className="w-5 h-5" />,
      colorClass: {
        bg: 'bg-blue-50/70',
        border: 'border-blue-100/50',
        text: 'text-blue-600'
      }
    },
    {
      year: '2019',
      title: 'First Distribution Hub',
      description: 'We opened our first physical warehouse and retail outlet, distributing premium switches, aviation connectors, and power cables to electronic vendors.',
      icon: <Building className="w-5 h-5" />,
      colorClass: {
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-100/50',
        text: 'text-emerald-600'
      }
    },
    {
      year: '2022',
      title: 'Custom Electronic Solutions',
      description: 'Launched custom industrial wire harnessing services and specialized components supply for manufacturers and developers.',
      icon: <Zap className="w-5 h-5" />,
      colorClass: {
        bg: 'bg-rose-50/70',
        border: 'border-rose-100/50',
        text: 'text-rose-600'
      }
    },
    {
      year: '2026',
      title: 'The Digital Revolution',
      description: 'Pioneered an AI-driven online shop with glassmorphic designs, express nationwide shipping, and dedicated 24/7 technical support.',
      icon: <Calendar className="w-5 h-5" />,
      colorClass: {
        bg: 'bg-violet-50/70',
        border: 'border-violet-100/50',
        text: 'text-violet-600'
      }
    }
  ];

  const team = [
    {
      name: 'Shivam Sharma',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur with over 15 years of electronic component distribution and hardware systems integration experience.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Aanya Patel',
      role: 'Chief Technology Officer',
      bio: 'Ex-systems architect passionate about electrical circuit designs, high-current hardware relays, and quality controls.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Quality Assurance',
      bio: 'Certified technician who has inspected and verified millions of electronic switches, cables, and sockets for maximum safety.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  const values = [
    {
      title: 'Authorized Partnerships Only',
      description: 'We bypass third-party resellers. Every connector, cable, switch, and LED is direct from certified manufacturing lines.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Lifetime Technical Advocacy',
      description: 'Buying from us makes us your technicians for life. We offer configuration diagnostics and component advice for free.',
      icon: <Users className="w-6 h-6 text-rose-600" />
    },
    {
      title: 'Sustainability & Recycling',
      description: 'We run a certified program that collects unused circuit boards and cables, preventing e-waste from entering landfills.',
      icon: <Heart className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Zero Defect Guarantee',
      description: 'Our testing lab checks contacts, insulation parameters, and voltage limits before shipping to ensure safe operation.',
      icon: <Award className="w-6 h-6 text-amber-600" />
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen animate-in fade-in duration-300">
      
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(225,29,72,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Pioneering Electronics Since 2016</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-none bg-linear-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            Technology Meets <br />Human Craftsmanship
          </h1>
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the story, the philosophy, and the community of engineers behind Shivam Electronic World—your trusted partner in premium technology.
          </p>
        </div>
      </section>

      {/* Trust Stats Metrics */}
      <section className="relative -mt-10 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 p-6 sm:p-8 rounded-full shadow-xl">
          <div className="text-center space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">10+</span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Years of Trust</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">100k+</span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Shipped Orders</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">20+</span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Brand Partners</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-slate-950">99.8%</span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Positive Reviews</span>
          </div>
        </div>
      </section>

      {/* Showroom Showcase Experience Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Frame */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute inset-0 bg-linear-to-r from-blue-650 to-indigo-600 rounded-md blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative border border-slate-200 bg-white p-3 rounded-md shadow-2xl">
                <img 
                  src="/electronics_showroom.png" 
                  alt="Shivam Electronic World Showroom Experience" 
                  className="rounded-md w-full h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Info details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                <Building className="w-3 h-3" />
                <span>Visit Us In Person</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight leading-tight">
                Our Physical Retail <br />Experience Centers
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Electronic components require precision parameters and tactile verification. While our online store serves engineering teams and hobbyists nationwide, our physical experience showroom stands as a specialized hub. It is equipped with testing benches, oscilloscope diagnostics tools, and thousands of industrial component samples waiting to be integrated.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you are designing a high-load power delivery circuit, sourcing reliable rocker switches for control cabinets, or setting up custom wiring harness assemblies, our electrical engineers are on standby to verify specifications and supply custom volume reels.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="bg-white py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Our Pillars of Service</h2>
            <p className="text-xs text-slate-500">The guidelines that define our store operations and help us deliver tech excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-6 rounded-md shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  {val.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline History */}
      <section className="py-20 bg-slate-50/50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Milestones in Our Journey</h2>
            <p className="text-xs text-slate-550">A look back at how we started and where we are heading.</p>
          </div>

          {/* Timeline container */}
          <div className="relative">
            {/* Central Timeline Line: Gold/Amber theme matching the uploaded layout */}
            <div className="absolute left-4 md:left-1/2 top-10 bottom-10 w-0.5 bg-amber-500/20 -translate-x-1/2" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col md:flex-row items-start ${
                      isLeft ? '' : 'md:flex-row-reverse'
                    } relative`}
                  >
                    {/* Timeline Node Ring: Gold/Amber ring with white center */}
                    <div className="absolute left-4 md:left-1/2 top-[44px] w-4.5 h-4.5 rounded-full border-4 border-amber-500 bg-white -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />

                    {/* Card Container */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}>
                      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 hover:shadow-[0_12px_40px_rgb(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
                        {/* Card Header with Icon */}
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className={`w-10 h-10 rounded-full ${m.colorClass.bg} border ${m.colorClass.border} flex items-center justify-center ${m.colorClass.text} flex-shrink-0 shadow-xs`}>
                            {m.icon}
                          </div>
                          <div>
                            <span className={`inline-block text-[10px] font-black uppercase tracking-wider ${m.colorClass.text} mb-0.5`}>
                              {m.year}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif leading-tight">
                              {m.title}
                            </h3>
                          </div>
                        </div>
                        {/* Card Body */}
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pl-1">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer Column */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Team Section */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">Our Leadership Team</h2>
            <p className="text-xs text-slate-500">The technicians and visionaries running Shivam Electronic World.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-md shadow-2xl text-center space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-white shadow-md">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{t.name}</h3>
                  <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-black uppercase mt-1 inline-block">
                    {t.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed px-4">
                  {t.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
