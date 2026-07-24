import React, { useEffect, useState } from 'react';
import { Award, ShieldCheck, Zap, Users, Cpu, Calendar, Star, Building, Heart, ChevronRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const milestones = [
    {
      year: '2016',
      title: 'The Humble Repair Shop',
      description: 'Shivam Electronic World was founded in a modest 400 sq. ft. workshop, specializing in precision repairs for motherboard micro-soldering and custom cabling.',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-blue-600 to-cyan-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      year: '2019',
      title: 'First Distribution Hub',
      description: 'We opened our first physical warehouse and retail outlet, distributing premium switches, aviation connectors, and power cables to electronic vendors.',
      icon: <Building className="w-6 h-6" />,
      color: 'from-emerald-600 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    {
      year: '2022',
      title: 'Custom Electronic Solutions',
      description: 'Launched custom industrial wire harnessing services and specialized components supply for manufacturers and developers.',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-600 to-amber-500',
      shadow: 'shadow-orange-500/20'
    },
    {
      year: '2026',
      title: 'The Digital Revolution',
      description: 'Pioneered an AI-driven online shop with glassmorphic designs, express nationwide shipping, and dedicated 24/7 technical support.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-purple-600 to-pink-500',
      shadow: 'shadow-purple-500/20'
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
      icon: <ShieldCheck className="w-7 h-7 text-white" />,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Lifetime Technical Advocacy',
      description: 'Buying from us makes us your technicians for life. We offer configuration diagnostics and component advice for free.',
      icon: <Users className="w-7 h-7 text-white" />,
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      title: 'Sustainability & Recycling',
      description: 'We run a certified program that collects unused circuit boards and cables, preventing e-waste from entering landfills.',
      icon: <Heart className="w-7 h-7 text-white" />,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Zero Defect Guarantee',
      description: 'Our testing lab checks contacts, insulation parameters, and voltage limits before shipping to ensure safe operation.',
      icon: <Award className="w-7 h-7 text-white" />,
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500/20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-40 bg-white">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent"></div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/60 backdrop-blur-md mb-8 hover:border-blue-300 transition-colors cursor-pointer group shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700">Pioneering Electronics Since 2016</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-slate-900">
            <span className="block mb-2 leading-tight">Technology Meets</span>
            <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight pb-2">
              Human Craftsmanship
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Discover the story, the philosophy, and the community of engineers behind <span className="text-slate-900 font-medium">Shivam Electronic World</span>—your trusted partner in premium technology.
          </p>
        </div>
      </section>

      {/* Trust Stats - Glassmorphism Floating Banner */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/60 backdrop-blur-2xl border border-slate-200/80 rounded-md overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
          {[
            { value: '10+', label: 'Years of Trust' },
            { value: '100k+', label: 'Shipped Orders' },
            { value: '20+', label: 'Brand Partners' },
            { value: '99.8%', label: 'Positive Reviews' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 p-8 text-center hover:bg-slate-50 transition-all duration-300 group">
              <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-600/70 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Showroom Experience */}
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-blue-400 to-purple-400 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-md overflow-hidden border border-slate-200 bg-white shadow-2xl">
                <img 
                  src="/electronics_showroom.png" 
                  alt="Showroom" 
                  className="w-full h-[500px] object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest">
                <Building className="w-3.5 h-3.5" />
                <span>Visit Us In Person</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Our Physical Retail <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Experience Centers</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                <p>
                  Electronic components require precision parameters and tactile verification. While our online store serves engineering teams and hobbyists nationwide, our physical experience showroom stands as a specialized hub. It is equipped with testing benches, oscilloscope diagnostics tools, and thousands of industrial component samples waiting to be integrated.
                </p>
                <p>
                  Whether you are designing a high-load power delivery circuit, sourcing reliable rocker switches for control cabinets, or setting up custom wiring harness assemblies, our electrical engineers are on standby to verify specifications and supply custom volume reels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Service */}
      <section className="py-32 relative bg-white border-y border-slate-200/60">
        {/* Subtle glowing orb */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Our Pillars of Service</h2>
            <p className="text-slate-600 text-lg font-light">The guidelines that define our store operations and help us deliver tech excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="group relative p-px rounded-md bg-linear-to-b from-slate-200 to-slate-100 hover:from-blue-200 hover:to-indigo-200 transition-all duration-500">
                <div className={`absolute inset-0 bg-linear-to-b ${val.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-md blur-xl`}></div>
                <div className="relative h-full bg-white p-8 rounded-md group-hover:bg-slate-50 transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <div className={`w-16 h-16 rounded-md mb-8 flex items-center justify-center bg-linear-to-br ${val.gradient} shadow-lg shadow-blue-500/20 transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300`}>
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline History */}
      <section className="py-32 relative overflow-hidden bg-slate-50/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Milestones in Our Journey</h2>
            <p className="text-slate-600 text-lg font-light">A look back at how we started and where we are heading.</p>
          </div>

          <div className="relative">
            {/* Center glowing line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-200 to-transparent -translate-x-1/2" />

            <div className="space-y-24">
              {milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-center ${isLeft ? '' : 'md:flex-row-reverse'} relative group`}>
                    
                    {/* Glowing Node */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-500 group-hover:bg-blue-50 -translate-x-1/2 z-10 shadow-sm group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500" />

                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isLeft ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                      <div className="relative bg-white p-6 rounded-md border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <div className={`inline-block mb-3 text-sm font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r ${m.color}`}>
                          {m.year}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {m.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-light">
                          {m.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 relative bg-white border-t border-slate-200/60">
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[300px] bg-blue-400/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Our Leadership Team</h2>
            <p className="text-slate-600 text-lg font-light">The technicians and visionaries running Shivam Electronic World.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="group relative bg-slate-50/50 backdrop-blur-md border border-slate-200/80 p-8 rounded-md hover:bg-white hover:border-slate-300 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]">
                <div className="absolute inset-0 bg-linear-to-b from-blue-600/5 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-slate-200 group-hover:ring-blue-200 transition-all duration-500 p-1 bg-white">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t.name}</h3>
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-5 shadow-xs">
                      {t.role}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {t.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
