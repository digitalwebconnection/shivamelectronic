import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../assets/logo2.png';



interface FooterProps {
  onNavigate?: (page: 'home' | 'products' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-slate-800 pt-16 pb-8 mt-auto relative overflow-hidden text-slate-400">
      {/* Ambient background tech glow spheres */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Footer Logo & details */}
          <div className="lg:col-span-5 space-y-4">
            <a 
              href="#" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="flex items-center group transition-transform duration-300 "
            >
              <img src={logo} alt="Shivam Electronics Logo" className="h-10 md:h-20 w-auto " />
            </a>
           
            
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 rounded-md transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 rounded-md transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 rounded-md transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 rounded-md transition-all" aria-label="Youtube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51a3.004 3.004 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.524 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-[14px] font-bold text-slate-200 uppercase tracking-widest">
              Support Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('products');
                    }
                  }}
                  className="text-slate-400 hover:text-white flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('about');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 hover:translate-x-0.5"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('contact');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 hover:translate-x-0.5"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts Info */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-[14px] font-bold text-slate-300 uppercase tracking-widest">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2">
                <MapPin className="w-4.5 h-4.5 text-blue-450 shrink-0 mt-0.5" />
                <span>102 Electronics Market, Shivam Complex, Sector 4, New Delhi, India</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4.5 h-4.5 text-blue-450 shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4.5 h-4.5 text-blue-450 shrink-0 mt-0.5" />
                <span>support@shivamelectronics.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer block */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[12px] text-slate-500 gap-4">
          <p>© 2026 Shivam Electronic World. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
