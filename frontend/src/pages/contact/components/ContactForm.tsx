import React, { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg shadow-slate-200/50">
      <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-2">Send a Message</h2>
      <p className="text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8 font-medium">We usually respond within 24 hours.</p>
      
      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-bold p-6 rounded-xl text-center flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Send className="w-4 h-4 text-green-600" />
          </div>
          Thank you! Your message has been received.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wider block">Your Name *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shivam Gupta"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wider block">Email Address *</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shivam@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wider block">Phone Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-left">
              <label className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wider block">Inquiry Subject</label>
              <div className="relative">
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a subject...</option>
                  <option value="bulk_order">Bulk / Wholesale Order</option>
                  <option value="product_inquiry">Product Specification Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-left">
            <label className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wider block">Message Details *</label>
            <textarea 
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none font-medium"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30 active:scale-[0.98] group"
          >
            <span>Submit Message</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
};
