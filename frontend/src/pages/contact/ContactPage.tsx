import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: "Are the products genuinely brand new?",
      a: "Yes, 100%. We source every connector, cable, switch, and LED component directly from authorized manufacturing lines. All items are shipped in factory-packaged condition with genuine specifications."
    },
    {
      q: "How long does domestic shipping take?",
      a: "For metro locations, standard express delivery takes 1 to 2 business days. For remote regions, it can take up to 4 business days. You will receive an SMS and email tracking link as soon as your shipment is dispatched."
    },
    {
      q: "What is your replacement or refund policy?",
      a: "We offer a 7-day hassle-free replacement period in case of transit damages or manufacturer defects. Please keep the original retail packaging box intact to verify direct brand exchanges."
    },
    {
      q: "Do you offer bulk pricing or wholesale accounts?",
      a: "Yes! We specialize in bulk volume distribution for manufacturing lines and engineering firms. Please contact our sales mailbox with your bill of materials (BOM) for a custom volume quote."
    }
  ];

  return (
    <div className="py-16 bg-slate-50/50 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">
            Customer Support Center
          </span>
          <h1 className="text-4xl font-black text-slate-900 font-serif tracking-tight">
            Connect With Our Team
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Have questions about component parameters, bulk industrial orders, wire harness assemblies, or custom parts? Contact us today.
          </p>
        </div>

        {/* Contact Info & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Flagship Experience Store</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  102 Electronics Market, Shivam Complex, Sector 4, New Delhi, India
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Direct Support Hotline</h3>
                <p className="text-xs text-slate-500">
                  +91 98765 43210 (Mon-Sat, 9AM to 7PM)
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Support Mailboxes</h3>
                <p className="text-xs text-slate-550">
                  support@shivamelectronics.com
                </p>
                <p className="text-xs text-slate-550">
                  sales@shivamelectronics.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 font-serif mb-6">Send Us a Direct Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold p-4 rounded-xl text-center">
                  Thank you! Your message has been received. Our team will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Shivam Gupta"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-905 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="shivam@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-905 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message Details</label>
                    <textarea 
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi, I am interested in ordering bulk GX16 aviation plugs and custom rocker switches..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-905 outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10 active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-500 leading-relaxed text-left animate-in slide-in-from-top-1 duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
