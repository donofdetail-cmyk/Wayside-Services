/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

/* Logo */
const Logo = ({ light = false, size = 'default' }: { light?: boolean; size?: 'default' | 'lg' }) => (
  <div className="flex items-center gap-2.5">
    <svg viewBox="0 0 48 48" className={size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'} fill="none">
      <path d="M8 22L24 8L40 22V40C40 41.1 39.1 42 38 42H10C8.9 42 8 41.1 8 40V22Z" fill="#1D9E75"/>
      <path d="M4 24L24 6L44 24" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="20" y="30" width="8" height="12" rx="1" fill="#16795A"/>
      <circle cx="34" cy="14" r="8" fill="#1D9E75" stroke={light ? '#1B3A2D' : 'white'} strokeWidth="2.5"/>
      <path d="M30.5 14L33 16.5L37.5 11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="flex flex-col leading-none">
      <span className={`font-bold ${size === 'lg' ? 'text-2xl' : 'text-xl'} ${light ? 'text-white' : 'text-deep-forest'} tracking-tight`}>Wayside</span>
      <span className={`font-bold ${size === 'lg' ? 'text-[11px]' : 'text-[9px]'} text-pathway-green tracking-[0.25em] uppercase`}>Services</span>
    </div>
  </div>
);

/* Sticky Mobile CTA */
const StickyCTA = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed bottom-0 inset-x-0 z-50 md:hidden p-3 bg-white/80 backdrop-blur-xl border-t border-black/5"
      >
        <button onClick={() => (window as any).__openForm?.()} className="w-full bg-deep-forest text-white py-4 rounded-xl font-bold text-[15px] active:scale-[0.98] transition-transform">
          Start my plan
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

/* FAQ Item */
const FAQ = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-deep-forest/8 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-6 text-left group">
        <span className="text-[17px] font-medium text-deep-forest group-hover:text-pathway-green transition-colors pr-8">{q}</span>
        <span className={`text-deep-forest/40 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="pb-6 text-slate-text leading-relaxed text-[15px] pr-12">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Questionnaire Modal */
const QuestionnaireModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ concern: '', homeType: '', name: '', phone: '' });

  const concerns = [
    { label: 'Preventive maintenance', icon: 'ti-shield-check' },
    { label: 'Something specific needs fixing', icon: 'ti-tool' },
    { label: 'Just moved in, need a checkup', icon: 'ti-home' },
    { label: 'Not sure yet, exploring options', icon: 'ti-search' }
  ];

  const homeTypes = [
    { label: 'Single-family home', icon: 'ti-home-2' },
    { label: 'Townhouse / Duplex', icon: 'ti-building' },
    { label: 'Condo / Apartment', icon: 'ti-buildings' },
    { label: 'Other', icon: 'ti-dots' }
  ];

  const reset = () => { setStep(0); setAnswers({ concern: '', homeType: '', name: '', phone: '' }); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { onClose(); reset(); } }}
        >
          <div className="absolute inset-0 bg-deep-forest/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            {/* Progress bar */}
            <div className="h-1 bg-linen-white">
              <motion.div
                className="h-full bg-pathway-green rounded-full"
                animate={{ width: `${((step + 1) / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <button onClick={() => { onClose(); reset(); }} className="absolute top-4 right-4 text-slate-text/40 hover:text-deep-forest transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-xl font-semibold text-deep-forest mb-2">What brings you to Wayside?</h3>
                    <p className="text-slate-text text-sm mb-6">Help us understand how we can best serve your home.</p>
                    <div className="flex flex-col gap-2">
                      {concerns.map((c) => (
                        <button key={c.label} onClick={() => { setAnswers(a => ({...a, concern: c.label})); setStep(1); }}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all text-sm ${
                            answers.concern === c.label ? 'border-pathway-green bg-pathway-green/5 text-deep-forest' : 'border-deep-forest/8 hover:border-pathway-green/30 text-slate-text hover:text-deep-forest'
                          }`}
                        >
                          <i className={`ti ${c.icon} text-pathway-green text-lg`} />
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-xl font-semibold text-deep-forest mb-2">What type of home?</h3>
                    <p className="text-slate-text text-sm mb-6">This helps us send the right technician.</p>
                    <div className="flex flex-col gap-2">
                      {homeTypes.map((h) => (
                        <button key={h.label} onClick={() => { setAnswers(a => ({...a, homeType: h.label})); setStep(2); }}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all text-sm ${
                            answers.homeType === h.label ? 'border-pathway-green bg-pathway-green/5 text-deep-forest' : 'border-deep-forest/8 hover:border-pathway-green/30 text-slate-text hover:text-deep-forest'
                          }`}
                        >
                          <i className={`ti ${h.icon} text-pathway-green text-lg`} />
                          {h.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(0)} className="mt-4 text-slate-text/50 text-sm hover:text-deep-forest transition-colors">← Back</button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-xl font-semibold text-deep-forest mb-2">Almost there!</h3>
                    <p className="text-slate-text text-sm mb-6">We'll reach out to schedule your first visit.</p>
                    <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onClose(); reset(); }}>
                      <input type="text" placeholder="Full name" required value={answers.name} onChange={e => setAnswers(a => ({...a, name: e.target.value}))}
                        className="w-full px-4 py-3.5 rounded-xl border border-deep-forest/10 text-deep-forest text-sm placeholder:text-slate-text/50 focus:outline-none focus:border-pathway-green focus:ring-2 focus:ring-pathway-green/10 transition-all bg-linen-white/50"
                      />
                      <input type="tel" placeholder="Phone number" required value={answers.phone} onChange={e => setAnswers(a => ({...a, phone: e.target.value}))}
                        className="w-full px-4 py-3.5 rounded-xl border border-deep-forest/10 text-deep-forest text-sm placeholder:text-slate-text/50 focus:outline-none focus:border-pathway-green focus:ring-2 focus:ring-pathway-green/10 transition-all bg-linen-white/50"
                      />
                      <button type="submit" className="w-full bg-amber-porch text-white py-4 rounded-xl font-bold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-amber-porch/20 mt-1">
                        Get my free estimate
                      </button>
                    </form>
                    <button onClick={() => setStep(1)} className="mt-4 text-slate-text/50 text-sm hover:text-deep-forest transition-colors">← Back</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Main */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 });
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    (window as any).__openForm = () => setFormOpen(true);
    return () => { delete (window as any).__openForm; };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <QuestionnaireModal open={formOpen} onClose={() => setFormOpen(false)} />

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Logo light={!scrolled} />
          <div className="hidden md:flex items-center gap-8">
            {['How It Works', 'Pricing', 'FAQ'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-text hover:text-deep-forest' : 'text-white/70 hover:text-white'}`}>
                {l}
              </a>
            ))}
            <button onClick={() => setFormOpen(true)} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              scrolled ? 'bg-deep-forest text-white hover:bg-deep-forest/90' : 'bg-white text-deep-forest hover:bg-white/90'
            }`}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <StickyCTA show={showSticky} />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center z-50">
        <div className="absolute inset-0 rounded-b-[3rem] sm:rounded-b-[4rem] overflow-hidden shadow-2xl -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/70 via-deep-forest/60 to-deep-forest/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full pt-32 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-[clamp(2rem,5.5vw,3.8rem)] font-semibold text-white leading-[1.12] tracking-tight mb-6"
          >
            Home Maintenance Services{' '}
            Serving the Greater Reno Area
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Need reliable home maintenance in Reno, Nevada? Wayside Services handles the small stuff before it becomes expensive stuff. One monthly visit, one flat rate, exceptional service every time.
          </motion.p>

          <motion.div ref={heroRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="w-full flex justify-center px-4">
            <a href="#pricing" className="w-full sm:w-auto bg-amber-porch text-white px-12 py-5 rounded-full text-base md:text-[15px] font-bold hover:brightness-110 transition-all shadow-xl shadow-amber-porch/25 max-w-sm">
              Get a Free Estimate
            </a>
          </motion.div>
        </div>

        {/* Trust Badge Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-0 translate-y-12 sm:translate-y-16 -mb-12 sm:-mb-16"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { platform: 'Google', rating: '4.9', reviews: '237', color: '#4285F4' },
              { platform: 'Yelp', rating: '4.8', reviews: '184', color: '#D32323' },
              { platform: 'BBB', rating: 'A+', reviews: '52', color: '#005A78' }
            ].map((badge, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-6 py-4 sm:py-5 shadow-xl shadow-black/10 flex flex-col items-center gap-1">
                <span className="font-bold text-xs sm:text-[15px] tracking-tight" style={{ color: badge.color }}>{badge.platform}</span>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-porch" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="text-deep-forest font-semibold text-[10px] sm:text-sm">{badge.rating} rating</span>
                </div>
                <span className="text-slate-text/60 text-[9px] sm:text-xs">{badge.reviews} reviews</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="relative z-40 bg-white -mt-12 sm:-mt-16 pt-32 md:pt-40 pb-24 md:pb-32 px-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-6">
            <h2 className="text-3xl md:text-4xl font-medium text-deep-forest leading-tight">What every visit covers</h2>
          </div>
          <p className="text-slate-text max-w-lg mb-14">Each month, your dedicated technician works through a comprehensive checklist tailored to your home.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[1fr]">
            {[
              { icon: 'ti-droplet', title: 'Plumbing Upkeep', desc: 'Drain clearing, visual fixture checks, shower head descaling, water heater flushes, and caulking inspections.', span: 'md:col-span-2 md:row-span-2', large: true, bg: 'bg-deep-forest text-white', textTitle: 'text-white', textDesc: 'text-white/70', iconBg: 'bg-white/10', iconColor: 'text-white', border: 'border-deep-forest hover:border-pathway-green' },
              { icon: 'ti-bulb', title: 'Safety & Detectors', desc: 'Visual light switch & receptacle checks, smoke/CO detector battery testing, dryer vent cleaning, and fireplace visual checks.', span: 'md:col-span-2 md:row-span-1', bg: 'bg-white', textTitle: 'text-deep-forest', textDesc: 'text-slate-text', iconBg: 'bg-pathway-green/10', iconColor: 'text-pathway-green', border: 'border-deep-forest/5 hover:border-pathway-green/20' },
              { icon: 'ti-plug', title: 'Household Appliance Care', desc: 'Washing machine & disposal cleaning, seasonal ceiling fan adjustments, and insulation checks.', span: 'md:col-span-1 md:row-span-1', bg: 'bg-linen-white', textTitle: 'text-deep-forest', textDesc: 'text-slate-text', iconBg: 'bg-white', iconColor: 'text-pathway-green', border: 'border-transparent hover:border-pathway-green/20' },
              { icon: 'ti-home', title: 'Seasonal Exterior Checks', desc: 'Visual gutter inspections, exterior faucet winterization, and siding/fence condition checks.', span: 'md:col-span-1 md:row-span-1', bg: 'bg-linen-white', textTitle: 'text-deep-forest', textDesc: 'text-slate-text', iconBg: 'bg-white', iconColor: 'text-pathway-green', border: 'border-transparent hover:border-pathway-green/20' },
              { icon: 'ti-wind', title: 'HVAC Filter Replacement', desc: 'We handle the hassle of swapping your fresh air and intake filters regularly so you don\'t have to.', span: 'md:col-span-2 md:row-span-1', bg: 'bg-white', textTitle: 'text-deep-forest', textDesc: 'text-slate-text', iconBg: 'bg-pathway-green/10', iconColor: 'text-pathway-green', border: 'border-deep-forest/5 hover:border-pathway-green/20' },
              { icon: 'ti-lock', title: 'Doors, Locks & Seals', desc: 'Weather seal checks, door functionality testing, and garage door bottom seal inspections.', span: 'md:col-span-2 md:row-span-1', bg: 'bg-white', textTitle: 'text-deep-forest', textDesc: 'text-slate-text', iconBg: 'bg-pathway-green/10', iconColor: 'text-pathway-green', border: 'border-deep-forest/5 hover:border-pathway-green/20' },
            ].map((s, i) => (
              <div key={i} className={`group p-6 md:p-8 rounded-3xl border ${s.border} transition-all duration-300 relative overflow-hidden flex flex-col ${s.bg} ${s.span} hover:shadow-xl hover:-translate-y-1`}>
                {s.large && <div className="absolute top-0 right-0 w-64 h-64 bg-pathway-green/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-pathway-green/30 transition-colors duration-500" />}
                {!s.large && <div className="absolute top-0 right-0 w-32 h-32 bg-pathway-green/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-pathway-green/10 transition-colors duration-500" />}
                
                <div className={`rounded-2xl flex items-center justify-center mb-auto shadow-sm backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ${s.iconBg} ${s.large ? 'w-16 h-16 mb-12' : 'w-12 h-12 mb-6'}`}>
                  <i className={`ti ${s.icon} ${s.iconColor} ${s.large ? 'text-3xl' : 'text-xl'}`} />
                </div>
                <div className={`${s.large ? 'mt-auto' : ''} relative z-10`}>
                  <h3 className={`font-semibold mb-2 ${s.textTitle} ${s.large ? 'text-2xl' : 'text-lg'}`}>{s.title}</h3>
                  <p className={`text-sm md:text-[15px] leading-relaxed ${s.textDesc}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Guarantee */}
      <section className="relative z-30 bg-deep-forest">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-pathway-green/15 flex items-center justify-center flex-shrink-0">
            <i className="ti ti-shield-check text-pathway-green text-xl" />
          </div>
          <p className="text-white/80 text-sm"><strong className="text-white">Professional Service Guarantee.</strong> We stand by the quality of our work on every single visit. Proudly serving Reno homeowners.</p>
        </div>
      </section>



      {/* How It Works */}
      <section id="how-it-works" className="relative z-20 bg-linen-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 rounded-b-[3rem] sm:rounded-b-[4rem]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-20">
            <h2 className="text-3xl md:text-4xl font-medium text-deep-forest leading-tight">Three steps to a worry-free home</h2>
          </div>
          <div className="relative max-w-3xl mx-auto mt-16 pb-8">
            <div className="flex flex-col gap-12 md:gap-20">
              {[
                { n: '01', title: 'Choose your plan', desc: 'Select the transparent, flat-rate tier that fits your home\'s square footage. No hidden fees, no surprise estimates.' },
                { n: '02', title: 'Meet your dedicated pro', desc: 'We will assign a trusted, local technician who will learn exactly how your home operates inside and out.' },
                { n: '03', title: 'Reclaim your weekends', desc: 'Never spend another Saturday worrying about household upkeep. We handle the maintenance so you don\'t have to.' }
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20% 0px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-16 md:pl-28"
                >
                  {i !== 2 && (
                    <>
                      <div className="absolute left-[22px] md:left-[38px] top-4 h-[calc(100%+3rem)] md:h-[calc(100%+5rem)] w-1 bg-deep-forest/10 rounded-full" />
                      <motion.div 
                        className="absolute left-[22px] md:left-[38px] top-4 h-[calc(100%+3rem)] md:h-[calc(100%+5rem)] w-1 bg-pathway-green rounded-full origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: false, margin: "-10% 0px -40% 0px" }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />
                    </>
                  )}
                  <div className="absolute left-0 top-0 w-12 h-12 md:w-20 md:h-20 rounded-full bg-white border-4 border-linen-white flex items-center justify-center shadow-sm z-10 hover:border-pathway-green/30 transition-colors">
                    <span className="text-pathway-green font-bold text-lg md:text-2xl">{s.n}</span>
                  </div>
                  <div className="pt-2 md:pt-4 relative z-10">
                    <h3 className="font-semibold text-deep-forest text-xl md:text-2xl mt-4 mb-3">{s.title}</h3>
                    <p className="text-slate-text leading-relaxed text-base md:text-lg max-w-md">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <button onClick={() => setFormOpen(true)} className="bg-deep-forest text-white px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-deep-forest/90 transition-colors">
              Get started today →
            </button>
          </div>
        </div>
      </section>



      {/* Pricing */}
      <section id="pricing" className="relative z-10 bg-white -mt-12 sm:-mt-16 pt-24 sm:pt-28 pb-24 md:pb-32 px-6 rounded-b-[3rem] sm:rounded-b-[4rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-deep-forest leading-tight mb-3">Home maintenance, one flat rate.</h2>
          <p className="text-slate-text mb-12 max-w-lg mx-auto">Keep your home running smoothly with a predictable monthly subscription covering all your upkeep.</p>

          <div className="bg-deep-forest rounded-3xl p-8 md:p-12 text-left max-w-3xl mx-auto">
            
            <div className="flex flex-col md:flex-row gap-8 mb-10 pb-10 border-b border-white/10">
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Single Story</h3>
                <p className="text-white/60 text-sm mb-4">Up to 2,500 sq ft</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">$99</span>
                  <span className="text-white/40 text-base mb-1">/mo</span>
                </div>
              </div>
              <div className="hidden md:block w-px bg-white/10" />
              <div className="md:hidden h-px bg-white/10" />
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Two Story</h3>
                <p className="text-white/60 text-sm mb-4">2,500+ sq ft</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">$129</span>
                  <span className="text-white/40 text-base mb-1">/mo</span>
                </div>
              </div>
            </div>

            <div className="mb-6 text-white/80 font-semibold border-b border-white/10 pb-4">Monthly Checklists Include:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
              {[
                'Drain Clearing & Visual Fixture Checks', 'Water Heater Flushes & Descaling',
                'Smoke/CO Detector Testing & Battery Swaps', 'Dryer Vent & Fireplace Checks',
                'Visual Receptacle & Light Switch Checks', 'Air Filter Replacements',
                'Visual Gutter & Soffit Vent Checks', 'Exterior Faucet Winterization',
                'Disposal & Washing Machine Upkeep', 'Seasonal Fan Adjustments & Insulation Checks',
                'Weather Seal & Window Lock Checks', 'Door Functionality & Garage Seal Checks'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <svg className="w-4 h-4 text-pathway-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {item}
                </div>
              ))}
            </div>

            <button onClick={() => setFormOpen(true)} className="w-full bg-amber-porch text-white py-4 rounded-xl font-bold text-[16px] hover:brightness-110 transition-all shadow-xl shadow-amber-porch/20">
              Start my plan →
            </button>


          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="relative z-[5] bg-linen-white -mt-12 sm:-mt-16 pt-36 md:pt-48 pb-24 md:pb-32 px-6 rounded-b-[3rem] sm:rounded-b-[4rem]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-deep-forest leading-tight">Hear from homeowners<br/>already on Wayside</h2>
          </div>
        <div className="relative w-full max-w-[100vw] overflow-hidden px-0">
          <div className="absolute top-0 left-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-linen-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-linen-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-6">
            {[
              { q: 'Wayside gave me my weekends back. As a new homeowner, I was completely overwhelmed.', n: 'Sarah M.', l: 'Maplewood', c: 'bg-pathway-green' },
              { q: 'They found a slow leak on their first visit. Fixed it in 5 minutes. Saved me hundreds.', n: 'Robert C.', l: 'Oak Ridge', c: 'bg-amber-porch' },
              { q: 'Safe, reliable, unpretentious. My technician is like family now.', n: 'Evelyn G.', l: 'Westside', c: 'bg-deep-forest' },
              { q: 'The digital report they send is fantastic. I can see exactly what was checked and fixed.', n: 'Michael T.', l: 'Downtown', c: 'bg-pathway-green' },
              { q: 'Best investment for my home. No more panicking when something breaks.', n: 'Jessica W.', l: 'North Hills', c: 'bg-amber-porch' },
              { q: 'Wayside gave me my weekends back. As a new homeowner, I was completely overwhelmed.', n: 'Sarah M.', l: 'Maplewood', c: 'bg-pathway-green' },
              { q: 'They found a slow leak on their first visit. Fixed it in 5 minutes. Saved me hundreds.', n: 'Robert C.', l: 'Oak Ridge', c: 'bg-amber-porch' },
              { q: 'Safe, reliable, unpretentious. My technician is like family now.', n: 'Evelyn G.', l: 'Westside', c: 'bg-deep-forest' },
              { q: 'The digital report they send is fantastic. I can see exactly what was checked and fixed.', n: 'Michael T.', l: 'Downtown', c: 'bg-pathway-green' },
              { q: 'Best investment for my home. No more panicking when something breaks.', n: 'Jessica W.', l: 'North Hills', c: 'bg-amber-porch' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 flex flex-col justify-between w-[320px] md:w-[420px] flex-shrink-0 shadow-sm border border-transparent hover:border-pathway-green/20 transition-colors duration-300">
                <div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-porch" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-deep-forest leading-relaxed mb-8">"{t.q}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${t.c} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{t.n.charAt(0)}{t.n.split(' ')[1]?.charAt(0)}</div>
                  <div>
                    <div className="font-medium text-deep-forest text-sm">{t.n}</div>
                    <div className="text-xs text-slate-text/60">{t.l}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-[4] bg-white -mt-12 sm:-mt-16 pt-36 md:pt-48 pb-24 md:pb-32 px-6 rounded-b-[3rem] sm:rounded-b-[4rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-deep-forest leading-tight mb-12">Common questions</h2>
          <FAQ q="What happens during a visit?" a="Your technician works through your home's monthly checklist. We handle routine visual checks, filter swaps, and whatever seasonal or annual maintenance tasks are scheduled for that month. We finish with a safety sweep and send you a digital report." />
          <FAQ q="Do you perform all of the listed services every single month?" a="No. While some tasks (like filter replacements and visual safety checks) happen monthly, others (like water heater flushes, exterior winterization, or deep appliance cleaning) are scheduled annually or seasonally. Your flat monthly rate covers a rotating year-round checklist to ensure nothing is ever missed." />
          <FAQ q="Are you licensed and insured?" a="Absolutely. Every technician is fully insured and we maintain all necessary state and local licensing." />
          <FAQ q="What areas do you serve?" a="We currently serve the greater metro area and surrounding suburbs. Enter your zip code during signup to check coverage." />
        </div>
      </section>


      {/* Final CTA */}
      <section className="relative z-[3] bg-deep-forest -mt-12 sm:-mt-16 pt-36 md:pt-48 pb-24 md:pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight mb-4">Ready to stop worrying about your home?</h2>
          <p className="text-white/50 mb-10 text-lg">Join 500+ Reno homeowners who already have peace of mind.</p>
          <button onClick={() => setFormOpen(true)} className="bg-amber-porch text-white px-10 py-4 rounded-xl text-[16px] font-bold hover:brightness-110 transition-all shadow-xl shadow-amber-porch/20">
            Start my plan
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-deep-forest border-t border-white/5 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <Logo light size="lg" />
            <p className="text-white/40 text-sm leading-relaxed mt-5">Reno's trusted monthly home maintenance service for homeowners who value peace of mind.</p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Navigate</span>
              {['How It Works', 'Pricing', 'FAQ'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`} className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Contact</span>
              <span className="text-sm text-white/50">(555) 123-4567</span>
              <span className="text-sm text-white/50">hello@wayside.com</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-white/20">
          <span>© {new Date().getFullYear()} Wayside Services Inc.</span>
        </div>
      </footer>
    </div>
  );
}
