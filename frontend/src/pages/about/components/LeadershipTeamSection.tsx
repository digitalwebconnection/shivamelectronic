import React, { useState } from 'react';
import { X } from 'lucide-react';

export const LeadershipTeamSection: React.FC = () => {
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

  const [selectedMember, setSelectedMember] = useState<{name: string, role: string, bio: string, image: string} | null>(null);

  return (
    <section className="py-12 relative bg-white border-t border-slate-200/60">
      <div className="absolute bottom-0 left-1/2 w-200 h-75 bg-blue-400/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-24 space-y-3 sm:space-y-4">
          <h2 className="text-3xl font-serif sm:text-4xl md:text-5xl font-bold text-slate-900">Our Leadership Team</h2>
          <p className="text-slate-600 text-base sm:text-lg font-light px-4">The technicians and visionaries running Shivam Electronic World.</p>
        </div>

        {/* Mobile & Desktop 3-Column Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-12 pb-6 md:pb-0">
          {team.map((t, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                if (window.innerWidth < 768) { // Only show modal on mobile
                  setSelectedMember(t);
                }
              }}
              className="group relative flex flex-col items-center text-center cursor-pointer md:cursor-default"
            >
              {/* Image Section */}
              <div className="relative mb-2 md:mb-8 w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40">
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border border-slate-300 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                {/* Image Container */}
                <div className="absolute inset-1 md:inset-2 rounded-full overflow-hidden bg-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col items-center px-1 md:px-4">
                <h3 className="text-[11px] sm:text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">{t.name}</h3>
                {/* Hidden on mobile, shown on desktop */}
                <span className="hidden md:block text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">{t.role}</span>
                <p className="hidden md:block text-slate-500 text-base leading-relaxed max-w-sm">
                  {t.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm md:hidden" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative shadow-2xl border border-slate-100" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-5 ring-4 ring-slate-50 shadow-lg">
                 <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedMember.name}</h3>
              <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">{selectedMember.role}</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
