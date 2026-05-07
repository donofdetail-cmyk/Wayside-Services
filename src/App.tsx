/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Logo = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`w-8 h-8 ${className} text-pathway-green`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* House shape */}
    <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Checkmark */}
    <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 flex items-center bg-white border-b border-black/5 ${scrolled ? 'shadow-subtle' : ''}`}>
      <div className="max-w-7xl mx-auto px-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-bold text-xl text-deep-forest tracking-tight">Wayside Services</span>
        </div>
        <div className="hidden md:flex gap-6 items-center text-sm font-semibold text-deep-forest">
          <a href="#included" className="hover:text-pathway-green transition-colors">What's Included</a>
          <a href="#how-it-works" className="hover:text-pathway-green transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-pathway-green transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-pathway-green transition-colors">Contact</a>
          <button className="bg-amber-porch text-white px-6 py-3.5 rounded-lg hover:brightness-105 transition-all font-semibold">Start my plan</button>
        </div>
      </div>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-deep-forest">{question}</span>
        <i className={`ti ti-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-text leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-[72px] font-medium text-deep-forest mb-5 leading-[1.1] tracking-tight"
            >
              Your home, handled.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-text mb-8 leading-relaxed"
            >
              We handle the small stuff — before it becomes expensive stuff. $99.99/month. No contracts. Cancel anytime.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-amber-porch text-white px-8 py-4 rounded-md text-lg font-bold hover:brightness-105 transition-all shadow-sm">
                Start my plan &rarr;
              </button>
              <a href="#included" className="border-2 border-pathway-green text-pathway-green px-8 py-4 rounded-md text-lg font-bold hover:bg-pathway-green hover:text-white transition-all text-center">
                See what's included
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2 hidden md:block">
            {/* Visual representation of the "Grid area" from theme */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'ti-bulb', title: 'Light Bulbs' },
                { icon: 'ti-air-conditioning', title: 'AC Filters' },
                { icon: 'ti-plug', title: 'Safety Check' },
                { icon: 'ti-droplet', title: 'Leak Audit' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-subtle border border-black/5 flex flex-col gap-2">
                  <div className="w-8 h-8 text-pathway-green"><i className={`ti ${item.icon} text-2xl`}></i></div>
                  <div className="font-semibold text-sm text-deep-forest">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Positioned like the theme's footer bar but after hero */}
      <section className="bg-white px-10 py-6 border-y border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-4 text-xs font-bold text-deep-forest tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span>500+ HOMES SERVED</span>
            <span className="text-pathway-green">•</span>
            <span>4.9★ AVERAGE RATING</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>LOCALLY OWNED & OPERATED</span>
            <span className="text-pathway-green">•</span>
            <span>PROACTIVE MAINTENANCE</span>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="included" className="py-24 px-10 bg-linen-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-medium text-deep-forest mb-4">Everything your home needs.</h2>
            <p className="text-slate-text max-w-xl">One subscription, comprehensive monthly care. No surprises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'included-1', icon: 'ti-bulb', title: 'Light Bulb Replacement', desc: 'Up to 2 LED bulbs replaced per visit. No more ladders.' },
              { id: 'included-2', icon: 'ti-air-conditioning', title: 'AC Filter Change', desc: 'Monthly filter swap for optimal air quality and efficiency.' },
              { id: 'included-3', icon: 'ti-plug', title: 'Outlet Safety Check', desc: 'Visual and mechanical check of your electrical receptacles.' },
              { id: 'included-4', icon: 'ti-droplet', title: 'Visual Plumbing Inspection', desc: 'Checking for leaks under sinks and around toilets before they cause damage.' },
              { id: 'included-5', icon: 'ti-fridge', title: 'Fridge Filter Swap', desc: 'Quarterly check and replacement of your refrigerator water filter.' },
              { id: 'included-6', icon: 'ti-report', title: 'Monthly Home Report', desc: 'A detailed summary of everything we checked and fixed.' }
            ].map((service) => (
              <div key={service.id} id={service.id} className="bg-white p-5 rounded-xl border border-black/5 flex flex-col gap-2.5 transition-all hover:shadow-subtle hover:border-pathway-green/20 group">
                <div className="w-10 h-10 text-pathway-green">
                  <i className={`ti ${service.icon} text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-[15px] text-deep-forest leading-tight">{service.title}</h3>
                <p className="text-[13px] text-slate-text/90 leading-normal">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-deep-forest mb-4">Peace of mind in 3 steps.</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: 1, title: 'Subscribe online', desc: 'It takes 60 seconds. No long forms, no complicated contracts.' },
                { step: 2, title: 'Schedule your first visit', desc: 'We\'ll call you to find a time that fits your busy life perfectly.' },
                { step: 3, title: 'Relax every month', desc: 'We show up monthly, handle the punch list, and move on.' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-pathway-green text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-medium text-deep-forest mb-3">{item.title}</h3>
                  <p className="text-slate-text">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-deep-forest rounded-2xl p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
            <div className="max-w-md">
              <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Standard Membership</div>
              <div className="text-5xl md:text-6xl font-bold text-pathway-green mb-6">$99.99<span className="text-lg font-normal text-white/40">/mo</span></div>
              <p className="text-white/80 text-lg mb-8 text-left">Comprehensive routine maintenance for any home. No hidden fees, no surprises.</p>
              <div className="flex flex-col gap-3 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-pathway-green"></i>
                  <span>Fully licensed & local experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-pathway-green"></i>
                  <span>No contracts. Cancel anytime.</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-amber-porch text-white px-10 py-5 rounded-lg text-lg font-bold hover:brightness-105 transition-all shadow-lg">
                Start my plan &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Wayside */}
      <section className="py-24 px-10 bg-linen-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'ti-shield-check', title: 'We prevent, not just fix', desc: 'Most home damage is avoidable. Our proactive approach spots small issues before they become expensive.' },
              { icon: 'ti-user-check', title: 'Consistent face, every month', desc: 'You\'ll know exactly who is coming into your home. A dedicated technician who knows your property.' },
              { icon: 'ti-clock', title: 'Honest and in and out', desc: 'We value your time. Our visits are efficient, respectful, and we always leave your home cleaner.' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="w-12 h-12 text-pathway-green mb-2">
                  <i className={`ti ${benefit.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-deep-forest">{benefit.title}</h3>
                <p className="text-slate-text leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium text-deep-forest mb-16">Stories from your neighbors.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Miller', city: 'Maplewood', quote: 'As a new homeowner, I was completely overwhelmed by everything I needed to check. Wayside gave me my weekends back.' },
              { name: 'Robert Chen', city: 'Oak Ridge', quote: 'They found a slow leak under my kitchen sink during their first visit. Fixed it in 5 minutes. That alone saved me hundreds.' },
              { name: 'Evelyn Grant', city: 'Westside', quote: 'Safe, reliable, and unpretentious. My technician is like family now. I recommend them to everyone in my building.' }
            ].map((t, idx) => (
              <div key={idx} className="bg-linen-white p-8 rounded-xl border-l-4 border-pathway-green">
                <p className="text-slate-text italic mb-6 leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-medium text-deep-forest">{t.name}</div>
                  <div className="text-sm text-slate-text/70">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-10 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium text-deep-forest mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="What exactly happens during a visit?" 
              answer="Your technician will go through a 20-point checklist including all standard services (AC filters, light bulbs, etc.) plus any extra small tasks you've requested. We finish with a visual safety sweep and leave you a digital report."
            />
            <FAQItem 
              question="Can I add extra tasks?" 
              answer="Yes! As long as it's a 'maintenance' task (like tightening a cabinet door or oiling a squeaky hinge) and can be done within your monthly slot, we're happy to help at no extra charge."
            />
            <FAQItem 
              question="Are you licensed and insured?" 
              answer="Absolutely. Every technician is fully insured and we maintain all necessary state and local licensing for home maintenance services."
            />
            <FAQItem 
              question="What if I need to skip a month?" 
              answer="No problem. You can pause or cancel your subscription at any time via your online dashboard. There are no fees for skipping or canceling."
            />
            <FAQItem 
              question="What areas do you serve?" 
              answer="We currently serve the greater metro area and surrounding suburbs. Enter your zip code during signup to see if we're in your neighborhood yet."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-linen-white py-20 px-10 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-left">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <Logo />
              <span className="font-bold text-xl text-deep-forest tracking-tight">Wayside Services</span>
            </div>
            <p className="text-slate-text leading-relaxed">
              Your home, handled. Premium monthly maintenance for busy homeowners who value peace of mind and proactive care.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-deep-forest/40">Navigation</h4>
              <a href="#included" className="text-sm font-semibold text-deep-forest hover:text-pathway-green transition-colors">Included</a>
              <a href="#how-it-works" className="text-sm font-semibold text-deep-forest hover:text-pathway-green transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm font-semibold text-deep-forest hover:text-pathway-green transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-deep-forest/40">Connect</h4>
              <span className="text-sm font-semibold text-deep-forest">(555) 123-4567</span>
              <span className="text-sm font-semibold text-deep-forest">hello@wayside.com</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-deep-forest/40 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Wayside Services Inc.</span>
          <div className="flex gap-6">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
