import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 text-slate-800 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <section className="relative overflow-hidden pt-24 pb-32 bg-white border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white opacity-80"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/60 backdrop-blur-md hover:border-blue-300 transition-colors cursor-pointer group shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700">Customer Support Center</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Connect With <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Our Team</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Have questions about component parameters, bulk industrial orders, wire harness assemblies, or custom parts? Contact us today.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-16">
        
        {/* Contact Info & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow flex gap-5 group">
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Flagship Experience Store</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  102 Electronics Market, Shivam Complex, Sector 4, New Delhi, India
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow flex gap-5 group">
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Direct Support Hotline</h3>
                <p className="text-sm text-slate-600 font-light">
                  +91 98765 43210 <span className="text-xs text-slate-400 block mt-0.5">(Mon-Sat, 9AM to 7PM)</span>
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow flex gap-5 group">
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Support Mailboxes</h3>
                <p className="text-sm text-slate-600 font-light">
                  support@shivamelectronics.com
                </p>
                <p className="text-sm text-slate-600 font-light">
                  sales@shivamelectronics.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Direct Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium p-6 rounded-md text-center flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Send className="w-4 h-4 text-green-600" />
                  </div>
                  Thank you! Your message has been received.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Shivam Gupta"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-blue-50/30 transition-all shadow-xs"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="shivam@example.com"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-blue-50/30 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Message Details</label>
                    <textarea 
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi, I am interested in ordering bulk GX16 aviation plugs and custom rocker switches..."
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-blue-50/30 transition-all resize-none shadow-xs"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm py-4 rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.99] group"
                  >
                    <span>Submit Inquiry Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
              <HelpCircle className="w-7 h-7 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`bg-white border rounded-md overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'}`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

