import { useState, useEffect, useRef } from "react";
import Logo from "../assets/loloA.jpeg"

const brand = {
  light: "#7EDBD2",
  primary: "#4DB6AC",
  deep: "#2F9E94",
  accent: "#6FE3D6",
  softBg: "#f0fffd",
  midBg: "#d9f7f3",
  strongBg: "#b2ebe3",
};
/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES  (paste into your index.css / globals.css)
   ─────────────────────────────────────────────────────────────
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-float   { animation: floatY 5s ease-in-out infinite; }
  .animate-float-2 { animation: floatY 6s ease-in-out infinite 1s; }
  .animate-float-3 { animation: floatY 7s ease-in-out infinite 2s; }
  .animate-fade-up { animation: fadeUp 0.7s ease forwards; }
  .shimmer-text {
    background: linear-gradient(90deg,#0369a1,#38bdf8,#7dd3fc,#0369a1);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }
  ───────────────────────────────────────────────────────────── */

/* ── Shared helpers ── */
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const Star = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#0ea5e9" : "none"} stroke="#0ea5e9" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════════════
   1. NAVBAR
══════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["Services", "About", "Therapists", "Gallery", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: scrolled ? "0 1px 24px rgba(14,165,233,0.10)" : "none",
        borderBottom: "1px solid rgba(186,230,253,0.4)",
      }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#38bdf8,#0369a1)" }}>
           <img src={Logo} alt="Ashley Massage" className="w-9 h-9 object-contain" />
          </div>
          <div className="leading-none">
            <span className="font-serif text-xl font-semibold text-sky-900 tracking-tight">Ashley</span>
            <span className="font-serif text-xl font-light text-sky-500 italic ml-1">Massage</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="text-sm text-sky-800 hover:text-sky-500 pb-0.5 border-b border-transparent hover:border-sky-400 transition-all duration-200">
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#booking" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" }}>
          Book a Session
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-sky-700" onClick={() => setOpen(!open)}>
          {open
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 bg-white border-t border-sky-100">
          <ul className="flex flex-col gap-3 mt-3">
            {links.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm text-sky-800 hover:text-sky-500">{l}</a></li>
            ))}
          </ul>
          <a href="#booking" onClick={() => setOpen(false)}
            className="mt-4 block text-center text-sm font-semibold text-white px-5 py-2.5 rounded-full"
            style={{ background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)" }}>
            Book a Session
          </a>
        </div>
      )}
    </nav>
  );
};

/* ══════════════════════════════════════════════════════════════
   2. HERO
══════════════════════════════════════════════════════════════ */
const Hero = () => {
  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "500+", label: "Happy Clients" },
    { value: "12", label: "Treatments" },
    { value: "4.9★", label: "Avg Rating" },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 45%,#bae6fd 100%)" }}>

      {/* BG blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#38bdf8,transparent 70%)" }}/>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent 70%)" }}/>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)", backgroundSize: "48px 48px" }}/>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-12 flex flex-col md:flex-row items-center gap-10">
        {/* Left */}
        <div className="flex-1 md:pr-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6"
            style={{ border: "1px solid rgba(14,165,233,0.25)", boxShadow: "0 2px 12px rgba(14,165,233,0.12)" }}>
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"/>
            <span className="text-xs text-sky-600 font-medium tracking-wide uppercase">Now Accepting Bookings</span>
          </div>

          <h1 className="font-serif font-light leading-[1.12] text-sky-900"
            style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}>
            Restore Your Body,<br/>
            <em className="not-italic font-semibold shimmer-text">Renew Your Spirit</em>
          </h1>

          <p className="text-sky-700 text-base leading-relaxed mt-5 max-w-md font-light">
            At <strong className="font-semibold text-sky-800">Ashley Massage</strong>, we craft personalised
            therapeutic experiences — from deep-tissue relief to blissful aromatherapy — tailored entirely to you.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#booking"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)", boxShadow: "0 6px 24px rgba(14,165,233,0.4)" }}>
              Book a Session <span className="transition-transform group-hover:translate-x-1"><Arrow/></span>
            </a>
            <a href="#services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-sky-700 px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white hover:shadow-md"
              style={{ border: "1.5px solid rgba(14,165,233,0.35)" }}>
              Explore Services <span className="transition-transform group-hover:translate-x-1"><Arrow/></span>
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.15)" }}>
            {stats.map((s, i) => (
              <div key={i} className="bg-white/70 px-5 py-4 text-center">
                <p className="font-serif text-2xl font-semibold text-sky-700">{s.value}</p>
                <p className="text-[11px] text-sky-500 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — lotus orb */}
        <div className="flex-1 w-full h-72 md:h-[460px] relative flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full border border-sky-200 opacity-40"
            style={{ animation: "spin 20s linear infinite" }}/>
          <div className="absolute w-56 h-56 rounded-full border-2 border-sky-300 animate-ping opacity-25"/>
          <div className="absolute w-56 h-56 rounded-full border-2 border-sky-200 animate-ping opacity-15"
            style={{ animationDelay: "0.9s" }}/>
          <div className="w-52 h-52 rounded-full flex items-center justify-center"
            style={{ background: "radial-gradient(circle at 40% 35%,#bae6fd 0%,#0ea5e9 70%,#0369a1 100%)", boxShadow: "0 20px 60px rgba(14,165,233,0.35)" }}>
            <svg width="88" height="88" viewBox="0 0 90 90" fill="none">
              <ellipse cx="45" cy="60" rx="22" ry="8" fill="rgba(255,255,255,0.25)"/>
              <path d="M45 58 Q30 42 32 28 Q45 38 45 58Z" fill="rgba(255,255,255,0.6)"/>
              <path d="M45 58 Q60 42 58 28 Q45 38 45 58Z" fill="rgba(255,255,255,0.6)"/>
              <path d="M45 58 Q20 50 18 36 Q34 44 45 58Z" fill="rgba(255,255,255,0.45)"/>
              <path d="M45 58 Q70 50 72 36 Q56 44 45 58Z" fill="rgba(255,255,255,0.45)"/>
              <path d="M45 58 Q45 30 45 18 Q45 32 45 58Z" fill="rgba(255,255,255,0.8)"/>
              <circle cx="45" cy="58" r="5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          {/* Floating badges */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 animate-float"
            style={{ border: "1px solid rgba(186,230,253,0.5)", boxShadow: "0 8px 24px rgba(14,165,233,0.12)" }}>
            <p className="text-sky-800 text-xs font-semibold">Organic Oils</p>
            <p className="text-sky-400 text-[10px]">100% Natural</p>
          </div>
          <div className="absolute bottom-12 left-2 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 animate-float-2"
            style={{ border: "1px solid rgba(186,230,253,0.5)", boxShadow: "0 8px 24px rgba(14,165,233,0.12)" }}>
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
            <p className="text-sky-800 text-xs font-semibold mt-0.5">500+ Happy Clients</p>
          </div>
          <div className="absolute bottom-2 right-8 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 animate-float-3"
            style={{ border: "1px solid rgba(186,230,253,0.5)", boxShadow: "0 8px 24px rgba(14,165,233,0.12)" }}>
            <p className="text-sky-500 text-[10px] uppercase tracking-widest">Experience</p>
            <p className="font-serif text-xl font-semibold text-sky-900">10+ Years</p>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "60px", marginTop: "-1px" }}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
      </svg>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   3. SERVICES
══════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    name: "Swedish Massage",
    desc: "A gentle full-body treatment to melt away tension, improve circulation, and restore deep calm.",
    duration: "60 / 90 min",
    price: "$80",
    tag: "Most Popular",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    name: "Deep Tissue",
    desc: "Targets chronic muscle tension and knots with firm, focused pressure on deeper layers.",
    duration: "60 / 90 min",
    price: "$95",
    tag: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    name: "Hot Stone Therapy",
    desc: "Smooth basalt stones deliver penetrating warmth to ease stiff muscles and soothe the soul.",
    duration: "75 / 90 min",
    price: "$110",
    tag: "Signature",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    name: "Aromatherapy",
    desc: "Pure essential oils blended to your mood — lavender, eucalyptus, or rose — for full sensory relaxation.",
    duration: "60 / 90 min",
    price: "$90",
    tag: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    name: "Sports Massage",
    desc: "Designed for active bodies — prevent injury, accelerate recovery, and boost peak performance.",
    duration: "60 min",
    price: "$95",
    tag: null,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    name: "Prenatal Massage",
    desc: "Gentle, safe support for expectant mothers — reducing back pain, swelling, and nurturing wellbeing.",
    duration: "60 min",
    price: "$85",
    tag: "Gentle Care",
  },
];

const Services = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-xs font-medium text-sky-500 uppercase tracking-widest mb-3">What We Offer</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-sky-900">Our Signature <em className="not-italic font-semibold text-sky-600">Treatments</em></h2>
          <p className="text-sky-600 text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Every session is a journey — choose the one that speaks to your body today.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, delay }) => {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      className={`relative group rounded-3xl p-7 border cursor-pointer transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{
        transitionDelay: `${delay}ms`,
        background: hovered ? "linear-gradient(135deg,#0284c7,#0ea5e9)" : "white",
        border: hovered ? "1.5px solid transparent" : "1.5px solid #e0f2fe",
        boxShadow: hovered ? "0 20px 50px rgba(14,165,233,0.3)" : "0 2px 16px rgba(14,165,233,0.06)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {service.tag && (
        <span className={`absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${hovered ? "bg-white/20 text-white" : "bg-sky-100 text-sky-600"}`}>
          {service.tag}
        </span>
      )}

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${hovered ? "bg-white/20 text-white" : "bg-sky-50 text-sky-500"}`}>
        {service.icon}
      </div>

      <h3 className={`font-serif text-xl font-semibold mb-2 transition-colors duration-300 ${hovered ? "text-white" : "text-sky-900"}`}>
        {service.name}
      </h3>
      <p className={`text-sm leading-relaxed font-light mb-5 transition-colors duration-300 ${hovered ? "text-sky-100" : "text-sky-600"}`}>
        {service.desc}
      </p>

      <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${hovered ? "border-white/20" : "border-sky-100"}`}>
        <div>
          <p className={`text-[11px] uppercase tracking-wider font-medium transition-colors ${hovered ? "text-sky-200" : "text-sky-400"}`}>Duration</p>
          <p className={`text-sm font-medium transition-colors ${hovered ? "text-white" : "text-sky-800"}`}>{service.duration}</p>
        </div>
        <div className="text-right">
          <p className={`text-[11px] uppercase tracking-wider font-medium transition-colors ${hovered ? "text-sky-200" : "text-sky-400"}`}>From</p>
          <p className={`text-xl font-serif font-semibold transition-colors ${hovered ? "text-white" : "text-sky-700"}`}>{service.price}</p>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   4. ABOUT
══════════════════════════════════════════════════════════════ */
const About = () => {
  const [ref, visible] = useReveal();
  const features = [
    "Certified therapists with 5+ years of clinical experience",
    "Personalised treatment plans tailored to your body",
    "Premium organic oils, aromatics & heated equipment",
    "Tranquil, private rooms for a deeply relaxing atmosphere",
  ];

  return (
    <section id="about" className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 100%)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left — decorative visual */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Layered rings */}
            <div className="absolute inset-0 rounded-full border-2 border-sky-200 opacity-50"
              style={{ transform: "rotate(15deg)" }}/>
            <div className="absolute inset-4 rounded-full border border-sky-300 opacity-40"/>
            {/* Gradient bg */}
            <div className="absolute inset-8 rounded-full"
              style={{ background: "linear-gradient(135deg,#bae6fd 0%,#0ea5e9 60%,#0284c7 100%)", boxShadow: "0 24px 64px rgba(14,165,233,0.4)" }}>
              {/* Quote inside orb */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="font-serif text-white text-lg italic leading-snug font-light">"Your calm is our craft"</p>
                <div className="w-8 h-0.5 bg-white/50 mt-3"/>
                <p className="text-white/70 text-xs mt-2 tracking-wider uppercase">Est. 2014</p>
              </div>
            </div>
            {/* Floating chips */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 animate-float"
              style={{ boxShadow: "0 8px 24px rgba(14,165,233,0.15)", border: "1px solid #e0f2fe" }}>
              <p className="text-sky-700 text-xs font-semibold">✦ Award-Winning</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 animate-float-2"
              style={{ boxShadow: "0 8px 24px rgba(14,165,233,0.15)", border: "1px solid #e0f2fe" }}>
              <p className="text-sky-700 text-xs font-semibold">🌿 All-Natural Products</p>
            </div>
          </div>
        </div>

        {/* Right — text */}
        <div ref={ref} className={`flex-1 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <span className="inline-block text-xs font-medium text-sky-500 uppercase tracking-widest mb-3">Our Story</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-sky-900 leading-tight mb-5">
            The <em className="not-italic font-semibold text-sky-600">Ashley</em><br/>Experience
          </h2>
          <p className="text-sky-700 text-base leading-relaxed font-light mb-4">
            Founded in 2014 by Ashley Nwosu, our studio was born from a simple belief — that genuine rest
            is transformative. What began as a single treatment room has grown into a sanctuary trusted by
            hundreds across the city.
          </p>
          <p className="text-sky-600 text-sm leading-relaxed font-light mb-8">
            We blend clinical expertise with heartfelt hospitality, ensuring every visit leaves you
            lighter, calmer, and completely renewed.
          </p>

          <ul className="space-y-3 mb-10">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"><polyline points="2 6 5 9 10 3"/></svg>
                </div>
                <span className="text-sky-700 text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          <a href="#booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)", boxShadow: "0 6px 24px rgba(14,165,233,0.35)" }}>
            Meet Our Therapists <Arrow/>
          </a>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   5. HOW IT WORKS
══════════════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const [ref, visible] = useReveal();
  const steps = [
    {
      num: "01",
      title: "Book Online",
      desc: "Choose your treatment, preferred therapist, and time slot — in under 2 minutes.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    },
    {
      num: "02",
      title: "Arrive & Unwind",
      desc: "Step into our tranquil studio. Enjoy herbal tea while we prepare your personalised treatment.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>,
    },
    {
      num: "03",
      title: "Feel Renewed",
      desc: "Leave lighter, calmer, and deeply restored — carrying that peace long after you go.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-xs font-medium text-sky-500 uppercase tracking-widest mb-3">Simple Process</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-sky-900">
            How It <em className="not-italic font-semibold text-sky-600">Works</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px"
            style={{ background: "linear-gradient(90deg,transparent,#bae6fd 30%,#bae6fd 70%,transparent)" }}/>

          {steps.map((s, i) => {
            const [sRef, sVis] = useReveal();
            return (
              <div key={i} ref={sRef}
                className={`relative text-center transition-all duration-700 ${sVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "linear-gradient(135deg,#e0f2fe,#bae6fd)", boxShadow: "0 8px 32px rgba(14,165,233,0.15)" }}>
                    <div className="text-sky-500">{s.icon}</div>
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-sky-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {i+1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-sky-900 mb-2">{s.title}</h3>
                <p className="text-sky-600 text-sm leading-relaxed font-light max-w-xs mx-auto">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   6. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Amara O.",
    role: "Yoga Instructor",
    rating: 5,
    text: "The hot stone session was absolutely divine. Ashley's team has a rare gift — I floated out feeling 10 years younger. I book monthly now and wouldn't go anywhere else.",
  },
  {
    name: "David K.",
    role: "Software Engineer",
    rating: 5,
    text: "I came in with severe back tension from desk work. The deep tissue treatment was firm but precise — the knots that had plagued me for months dissolved in one session. Remarkable.",
  },
  {
    name: "Funmi A.",
    role: "New Mother",
    rating: 5,
    text: "The prenatal massage was a godsend. Ashley made me feel so safe and cared for. The studio is pristine, peaceful, and every therapist genuinely listens to your needs.",
  },
];

const Testimonials = () => {
  const [ref, visible] = useReveal();
  return (
    <section className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f0f9ff,#e0f2fe 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-xs font-medium text-sky-500 uppercase tracking-widest mb-3">Client Love</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-sky-900">
            What Our Clients <em className="not-italic font-semibold text-sky-600">Say</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, i) => {
            const [tRef, tVis] = useReveal();
            return (
              <div key={i} ref={tRef}
                className={`bg-white rounded-3xl p-7 transition-all duration-700 ${tVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms`, border: "1.5px solid #e0f2fe", boxShadow: "0 4px 24px rgba(14,165,233,0.08)" }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s}/>)}
                </div>
                {/* Quote */}
                <p className="text-sky-700 text-sm leading-relaxed font-light italic mb-6">"{t.text}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-sky-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#38bdf8,#0284c7)" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sky-900 text-sm font-semibold">{t.name}</p>
                    <p className="text-sky-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   7. BOOKING CTA
══════════════════════════════════════════════════════════════ */
const Booking = () => {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", service: "", date: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="booking" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0369a1 0%,#0ea5e9 60%,#38bdf8 100%)" }}>
      {/* Decorative bg circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white opacity-5 pointer-events-none"/>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white opacity-5 pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "40px 40px" }}/>

      <div ref={ref} className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="inline-block text-xs font-medium text-sky-200 uppercase tracking-widest mb-3">Ready to Relax?</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-4">
          Book Your Session <em className="not-italic font-semibold">Today</em>
        </h2>
        <p className="text-sky-100 text-base font-light max-w-lg mx-auto mb-10">
          Take the first step toward lasting calm. Fill in the form and we'll confirm your appointment within the hour.
        </p>

        {sent ? (
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 border border-white/20">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-serif text-2xl text-white font-light mb-2">Request Received!</p>
            <p className="text-sky-100 text-sm">We'll confirm your booking at <strong className="font-semibold">{form.email}</strong> shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {[
                { name: "name", placeholder: "Your Full Name", type: "text" },
                { name: "email", placeholder: "Email Address", type: "email" },
              ].map(f => (
                <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required
                  value={form[f.name]} onChange={handle}
                  className="w-full px-5 py-3.5 rounded-xl text-sm bg-white/15 border border-white/25 text-white placeholder-sky-200 outline-none focus:bg-white/25 transition-colors"
                />
              ))}
              <select name="service" required value={form.service} onChange={handle}
                className="px-5 py-3.5 rounded-xl text-sm bg-white/15 border border-white/25 text-white outline-none focus:bg-white/25 transition-colors"
                style={{ color: form.service ? "white" : "#bae6fd" }}>
                <option value="" disabled style={{ color: "#0c4a6e" }}>Select a Service</option>
                {SERVICES.map(s => <option key={s.name} value={s.name} style={{ color: "#0c4a6e" }}>{s.name}</option>)}
              </select>
              <input name="date" type="date" required value={form.date} onChange={handle}
                className="px-5 py-3.5 rounded-xl text-sm bg-white/15 border border-white/25 text-white outline-none focus:bg-white/25 transition-colors"
              />
            </div>
            <button type="submit"
              className="w-full md:w-auto px-12 py-3.5 rounded-full text-sm font-semibold text-sky-800 bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              Confirm My Booking
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   8. FOOTER
══════════════════════════════════════════════════════════════ */
const Footer = () => {
  const cols = [
    {
      title: "Services",
      links: ["Swedish Massage","Deep Tissue","Hot Stone Therapy","Aromatherapy","Sports Massage","Prenatal Massage"],
    },
    {
      title: "Company",
      links: ["About Us","Our Therapists","Gallery","Careers","Blog"],
    },
    {
      title: "Contact",
      items: ["📍 12 Serenity Lane, Lagos", "📞 +234 801 234 5678", "✉ hello@ashleymassage.com", "🕐 Mon–Sat: 9am – 8pm"],
    },
  ];

  return (
    <footer className="bg-sky-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#38bdf8,#0284c7)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg font-semibold">Ashley</span>
                <span className="font-serif text-lg font-light text-sky-300 italic ml-1">Massage</span>
              </div>
            </div>
            <p className="text-sky-300 text-sm leading-relaxed font-light mb-5">
              Your sanctuary of calm in the heart of the city. Est. 2014.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {["instagram","facebook","twitter"].map(s => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-colors duration-200 text-xs font-bold">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col, i) => (
            <div key={i}>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {(col.links || col.items || []).map((item, j) => (
                  <li key={j}>
                    {col.links
                      ? <a href="#" className="text-sky-300 text-sm hover:text-white transition-colors font-light">{item}</a>
                      : <span className="text-sky-300 text-sm font-light">{item}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sky-400 text-xs">
          <p>© {new Date().getFullYear()} Ashley Massage. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ══════════════════════════════════════════════════════════════
   PAGE ENTRY POINT
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        * { font-family: 'Jost', sans-serif; }
        .font-serif { font-family: 'Cormorant Garant', serif !important; }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .shimmer-text {
          background: linear-gradient(90deg,#0369a1,#38bdf8,#7dd3fc,#0369a1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .animate-float   { animation: floatY 5s ease-in-out infinite; }
        .animate-float-2 { animation: floatY 6s ease-in-out infinite 1s; }
        .animate-float-3 { animation: floatY 7s ease-in-out infinite 2s; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar/>
      <Hero/>
      <Services/>
      <About/>
      <HowItWorks/>
      <Testimonials/>
      <Booking/>
      <Footer/>
    </>
  );
}