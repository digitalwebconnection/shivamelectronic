import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white border border-slate-200 p-5 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 sm:gap-6 group">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900">Flagship Experience Store</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            102 Electronics Market, Shivam Complex, Sector 4, New Delhi, India
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 sm:gap-6 group">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900">Direct Support Hotline</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            +91 98765 43210 <span className="text-[10px] sm:text-xs text-slate-400 block mt-1">(Mon-Sat, 9AM to 7PM)</span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 sm:gap-6 group">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900">Support Mailboxes</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            support@shivamelectronics.com
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            sales@shivamelectronics.com
          </p>
        </div>
      </div>
    </div>
  );
};
