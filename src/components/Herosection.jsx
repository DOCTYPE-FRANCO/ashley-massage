import { useState } from "react";

/* ─────────────────────────────────────────
   Tiny SVG icon helpers
───────────────────────────────────────── */
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0ea5e9" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

/* ─────────────────────────────────────────
   Decorative right-panel illustration
───────────────────────────────────────── */
const DecorativePanel = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Slow-spinning outer ring */}
    <div className="absolute w-80 h-80 rounded-full border border-sky-200 opacity-40 animate-[spin_20s_linear_infinite]" />

    {/* Ripple rings */}
    <div className="absolute w-56 h-56 rounded-full border-2 border-sky-300 animate-ping opacity-30" />
    <div
      className="absolute w-56 h-56 rounded-full border-2 border-sky-200 animate-ping opacity-20"
      style={{ animationDelay: "0.8s" }}
    />

    {/* Central gradient circle */}
    <div
      className="relative w-56 h-56 rounded-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 40% 35%, #bae6fd 0%, #0ea5e9 70%, #0369a1 100%)",
        boxShadow: "0 20px 60px rgba(14,165,233,0.35)",
      }}
    >
      {/* Lotus SVG */}
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="60" rx="22" ry="8" fill="rgba(255,255,255,0.25)" />
        <path d="M45 58 Q30 42 32 28 Q45 38 45 58Z" fill="rgba(255,255,255,0.6)" />
        <path d="M45 58 Q60 42 58 28 Q45 38 45 58Z" fill="rgba(255,255,255,0.6)" />
        <path d="M45 58 Q20 50 18 36 Q34 44 45 58Z" fill="rgba(255,255,255,0.45)" />
        <path d="M45 58 Q70 50 72 36 Q56 44 45 58Z" fill="rgba(255,255,255,0.45)" />
        <path d="M45 58 Q45 30 45 18 Q45 32 45 58Z" fill="rgba(255,255,255,0.8)" />
        <circle cx="45" cy="58" r="5" fill="white" opacity="0.9" />
      </svg>
    </div>

    {/* Floating accent card — Organic Oils */}
    <div
      className="absolute top-4 right-6 bg-white/70 backdrop-blur-md rounded-2xl px-3 py-2 border border-sky-200/50
                 animate-[float_5s_ease-in-out_infinite]"
      style={{ boxShadow: "0 8px 32px rgba(14,165,233,0.15)" }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
          <IconLeaf />
        </div>
        <div>
          <p className="text-sky-800 text-xs font-semibold leading-tight">Organic Oils</p>
          <p className="text-sky-400 text-[10px]">100% Natural</p>
        </div>
      </div>
    </div>

    {/* Floating accent card — Stars */}
    <div
      className="absolute bottom-12 left-2 bg-white/70 backdrop-blur-md rounded-2xl px-3 py-2 border border-sky-200/50
                 animate-[float_6s_ease-in-out_infinite_1s]"
      style={{ boxShadow: "0 8px 32px rgba(14,165,233,0.15)" }}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => <IconStar key={i} />)}
      </div>
      <p className="text-sky-800 text-xs font-semibold mt-0.5">500+ Happy Clients</p>
    </div>

    {/* Floating accent card — Experience */}
    <div
      className="absolute bottom-2 right-10 bg-white/70 backdrop-blur-md rounded-2xl px-3 py-2 border border-sky-200/50
                 animate-[float_7s_ease-in-out_infinite_2s]"
      style={{ boxShadow: "0 8px 32px rgba(14,165,233,0.15)" }}
    >
      <p className="text-sky-600 text-[10px] uppercase tracking-widest">Experience</p>
      <p className="text-sky-900 font-serif text-xl font-semibold leading-tight">10+ Years</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Navbar
───────────────────────────────────────── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Services", "About", "Therapists", "Gallery", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-sky-100/60"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#38bdf8,#0369a1)" }}
          >
            <IconLeaf />
          </div>
          <div className="leading-none">
            <span className="font-serif text-xl font-semibold text-sky-900 tracking-tight">Ashley</span>
            <span className="font-serif text-xl font-light text-sky-500 italic ml-1">Massage</span>
          </div>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-sm text-sky-800 hover:text-sky-500 transition-colors duration-200 pb-0.5 border-b border-transparent hover:border-sky-400"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          className="hidden md:block text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)",
            boxShadow: "0 4px 20px rgba(14,165,233,0.35)",
          }}
        >
          Book a Session
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden text-sky-700" onClick={() => setOpen(!open)}>
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-5 bg-white border-t border-sky-100">
          <ul className="flex flex-col gap-3 mt-3">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-sky-800 hover:text-sky-500">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full text-sm font-semibold text-white px-5 py-2.5 rounded-full"
            style={{ background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)" }}
          >
            Book a Session
          </button>
        </div>
      )}
    </nav>
  );
};

/* ─────────────────────────────────────────
   Stats bar
───────────────────────────────────────── */
const StatsBar = () => {
  const stats = [
    { value: "10+",  label: "Years of Experience" },
    { value: "500+", label: "Happy Clients" },
    { value: "12",   label: "Signature Services" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <div
      className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
      style={{
        background: "rgba(14,165,233,0.1)",
        border: "1px solid rgba(14,165,233,0.15)",
      }}
    >
      {stats.map((s, i) => (
        <div key={i} className="bg-white/70 px-6 py-4 text-center">
          <p className="font-serif text-2xl font-semibold text-sky-700">{s.value}</p>
          <p className="text-xs text-sky-500 uppercase tracking-wider mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────
   Hero Section  ← export this in your app
───────────────────────────────────────── */
const HeroSection = () => (
  <section
    className="relative min-h-screen overflow-hidden flex flex-col"
    style={{
      background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%)",
    }}
  >
    {/* Background decorative blobs */}
    <div
      className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
      style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-15 pointer-events-none"
      style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }}
    />

    {/* Subtle dot grid */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />

    <Navbar />

    {/* Main content */}
    <div className="flex-1 max-w-6xl mx-auto w-full px-6 pt-32 pb-10 flex flex-col md:flex-row items-center gap-10">
      {/* ── Left: copy ── */}
      <div className="flex-1 md:pr-8">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6"
          style={{
            border: "1px solid rgba(14,165,233,0.25)",
            boxShadow: "0 2px 12px rgba(14,165,233,0.12)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs text-sky-600 font-medium tracking-wide uppercase">
            Now Accepting Bookings
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-serif font-light leading-[1.12] text-sky-900"
          style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
        >
          Restore Your Body,
          <br />
          <em
            className="not-italic font-semibold"
            style={{
              background: "linear-gradient(90deg,#0369a1,#38bdf8,#7dd3fc,#0369a1)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Renew Your Spirit
          </em>
        </h1>

        {/* Subtext */}
        <p className="text-sky-700 text-base leading-relaxed mt-5 max-w-md font-light">
          At <strong className="font-semibold text-sky-800">Ashley Massage</strong>, we craft
          personalised therapeutic experiences — from deep-tissue relief to blissful aromatherapy —
          tailored entirely to you.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            className="group flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)",
              boxShadow: "0 6px 24px rgba(14,165,233,0.4)",
            }}
          >
            Book a Session
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <IconArrow />
            </span>
          </button>

          <button
            className="group flex items-center gap-2 text-sm font-medium text-sky-700 px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white hover:shadow-md"
            style={{ border: "1.5px solid rgba(14,165,233,0.35)" }}
          >
            Explore Services
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <IconArrow />
            </span>
          </button>
        </div>

        <StatsBar />
      </div>

      {/* ── Right: illustration ── */}
      <div className="flex-1 w-full h-80 md:h-[480px]">
        <DecorativePanel />
      </div>
    </div>

    {/* Bottom wave divider */}
    <div className="w-full overflow-hidden leading-none" style={{ marginTop: "-1px" }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "60px" }}
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
      </svg>
    </div>

    {/* Keyframe styles — add to your global CSS instead if preferred */}
    <style>{`
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-14px); }
      }
    `}</style>
  </section>
);

export default HeroSection;