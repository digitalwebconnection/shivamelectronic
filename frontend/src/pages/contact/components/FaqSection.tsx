import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
    <div className="max-w-3xl mx-auto pb-12 sm:pb-24 pt-4 sm:pt-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2 sm:gap-3">
          <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          <span>Frequently Asked Questions</span>
        </h2>
        <p className="text-slate-500 mt-2 sm:mt-4 text-sm sm:text-base font-medium px-4">Everything you need to know about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'border-blue-300 shadow-lg shadow-blue-500/5 ring-4 ring-blue-500/10' : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'}`}
          >
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 sm:p-6 text-left text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 transition-colors"
            >
              <span className="pr-4">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
