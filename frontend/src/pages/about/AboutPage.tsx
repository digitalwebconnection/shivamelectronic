import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { ShowroomSection } from './components/ShowroomSection';
import { PillarsOfServiceSection } from './components/PillarsOfServiceSection';
import { TimelineSection } from './components/TimelineSection';
import { LeadershipTeamSection } from './components/LeadershipTeamSection';

export const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`overflow-x-hidden min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500/20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSection />
      <TrustStatsSection />
      <ShowroomSection />
      <PillarsOfServiceSection />
      <TimelineSection />
      <LeadershipTeamSection />
    </div>
  );
};
