import React from 'react';

export const MapSection: React.FC = () => {
  return (
    <div className="w-full bg-white border border-slate-200  overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-10 sm:mb-16 h-[250px] sm:h-[450px] relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4102.169492724709!2d72.58983067531398!3d23.028471779169642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8437c4b35187%3A0x8b4743fbffb7554c!2sShivam%20Electronics!5e1!3m2!1sen!2sin!4v1785394487268!5m2!1sen!2sin" 
        className="w-full h-full border-0 absolute inset-0"
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="strict-origin-when-cross-origin"
        title="Shivam Electronics Location Map"
      ></iframe>
    </div>
  );
};
