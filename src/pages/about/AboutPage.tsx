import { Award, ShieldCheck, Zap, Users, Cpu, Calendar, Star, Building, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2016',
      title: 'The Humble Repair Shop',
      description: 'Shivam Electronic World was founded in a modest 400 sq. ft. workshop, specializing in precision repairs for motherboard micro-soldering and audio systems.',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      year: '2019',
      title: 'Our First Experience Center',
      description: 'We opened our first flagship physical retail store, offering custom PC parts, smartphones, and professional studio-grade headphones.',
      icon: <Building className="w-5 h-5" />
    },
    {
      year: '2022',
      title: 'Smart Tech Integrations',
      description: 'Launched customized home automation setups and high-end computer design services for local software developers, creators, and audiophiles.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      year: '2026',
      title: 'The Digital Revolution',
      description: 'Pioneered an AI-driven online shop with glassmorphic designs, express nationwide shipping, and dedicated 24/7 technical chat support.',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const team = [
    {
      name: 'Shivam Sharma',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur with over 15 years of retail electronics and hardware systems integration experience.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Aanya Patel',
      role: 'Chief Technology Officer',
      bio: 'Ex-systems architect passionate about smart home standards, custom desktop tuning, and sound acoustics.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Engineering & Custom Builds',
      bio: 'Certified technician who has built over 5,000 extreme water-cooled workstations and gaming rigs.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  const values = [
    {
      title: 'Authorized Partnerships Only',
      description: 'We bypass third-party resellers. Every motherboard, processor, and audio unit is direct from brand warehouses.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Lifetime Technical Advocacy',
      description: 'Buying a device from us makes us your technicians for life. We offer configuration diagnostics for free.',
      icon: <Users className="w-6 h-6 text-rose-600" />
    },
    {
      title: 'Sustainability & E-Waste',
      description: 'We run a certified trade-in program that refurbishes old tech, preventing harmful heavy metals from hitting landfills.',
      icon: <Heart className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Zero Defect Guarantee',
      description: 'Our engineering hub tests high-value electronics before shipping to verify zero dead pixels or coil whine.',
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
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            Technology Meets <br />Human Craftsmanship
          </h1>
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the story, the philosophy, and the community of engineers behind Shivam Electronic World—your trusted partner in premium technology.
          </p>
        </div>
      </section>

      {/* Trust Stats Metrics */}
      <section className="relative -mt-10 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl">
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-650 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative border border-slate-200 bg-white p-3 rounded-3xl shadow-2xl">
                <img 
                  src="/electronics_showroom.png" 
                  alt="Shivam Electronic World Showroom Experience" 
                  className="rounded-2xl w-full h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Info details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                <Building className="w-3 h-3" />
                <span>Visit Us In Person</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Our Physical Retail <br />Experience Centers
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Technology is highly tactile. While our digital store serves patrons nationwide, our physical showroom stands as a sanctuary for tech enthusiasts. It is an open playground featuring pre-built computing setups, soundproof audio acoustics rooms, and modern devices waiting for you to try.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you are looking to assemble a liquid-cooled workstation, tune high-end studio gear, or find the perfect tablet, our engineers are on standby to consult and build bespoke packages just for you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="bg-white py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Our Pillars of Service</h2>
            <p className="text-xs text-slate-500">The guidelines that define our store operations and help us deliver tech excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Milestones in Our Journey</h2>
            <p className="text-xs text-slate-500">A look back at how we started and where we are heading.</p>
          </div>

          {/* Timeline track */}
          <div className="relative border-l-2 border-slate-250 ml-4 md:ml-32 space-y-12">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                
                {/* Year tag left */}
                <div className="hidden md:block absolute right-[calc(100%+32px)] top-1 text-right">
                  <span className="text-lg font-black text-blue-600">{m.year}</span>
                </div>

                {/* Timeline node icon */}
                <span className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 border-4 border-slate-50">
                  {m.icon}
                </span>

                {/* Content card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <span className="inline-block md:hidden text-xs font-black text-blue-600 mb-1">{m.year}</span>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Team Section */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Our Leadership Team</h2>
            <p className="text-xs text-slate-500">The technicians and visionaries running Shivam Electronic World.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-3xl text-center space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-white shadow-md">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{t.name}</h3>
                  <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-black uppercase mt-1 inline-block">
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
