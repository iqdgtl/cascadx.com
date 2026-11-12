"use client";
import { useEffect, useRef, useState } from "react";

const INDUSTRIES = [
  {
    name: "iGaming",
    tagline: "Highest approval rates in regulated markets",
    description: "Route across regulated corridors with jurisdiction-aware logic, retries across licensed PSPs, and real-time compliance checks.",
    gradient: "linear-gradient(135deg, #2e1065, #7c3aed, #c026d3)",
    glow: "rgba(124,58,237,0.5)",
    glowHover: "rgba(192,38,211,0.4)",
    href: "/solutions/igaming",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="44" height="44" rx="10" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
        <circle cx="17" cy="17" r="3.5" fill="rgba(255,255,255,0.9)"/>
        <circle cx="35" cy="17" r="3.5" fill="rgba(255,255,255,0.9)"/>
        <circle cx="17" cy="35" r="3.5" fill="rgba(255,255,255,0.9)"/>
        <circle cx="35" cy="35" r="3.5" fill="rgba(255,255,255,0.9)"/>
        <circle cx="26" cy="26" r="3.5" fill="rgba(255,255,255,0.9)"/>
      </svg>
    ),
  },
  {
    name: "eCommerce",
    tagline: "Maximize checkout conversions globally",
    description: "Increase approval rates across APAC, LATAM, and MENA with region-optimized routing and local payment methods on every cart.",
    gradient: "linear-gradient(135deg, #92400e, #ea580c, #fbbf24)",
    glow: "rgba(234,88,12,0.5)",
    glowHover: "rgba(251,191,36,0.4)",
    href: "/solutions/ecommerce",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <path d="M8 20h36l-4.5 24H12.5L8 20z" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M19 20v-4a7 7 0 0114 0v4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="19" cy="40" r="2.5" fill="rgba(255,255,255,0.7)"/>
        <circle cx="33" cy="40" r="2.5" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
  },
  {
    name: "Dating",
    tagline: "Frictionless billing across all geographies",
    description: "Subscription billing, recurring charges, and high-frequency micro-transactions — recovered and rerouted before the user notices.",
    gradient: "linear-gradient(135deg, #881337, #e11d48, #fb7185)",
    glow: "rgba(225,29,72,0.5)",
    glowHover: "rgba(251,113,133,0.4)",
    href: "/solutions/dating",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <path d="M26 44S8 32 8 19a9 9 0 0118 0 9 9 0 0118 0c0 13-18 25-18 25z" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 21l3 3 7-7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Food Delivery",
    tagline: "Lightning-fast payment processing at scale",
    description: "High-volume, low-margin transactions at peak hours. CascadX keeps every order flowing with sub-40ms routing decisions.",
    gradient: "linear-gradient(135deg, #064e3b, #059669, #34d399)",
    glow: "rgba(5,150,105,0.5)",
    glowHover: "rgba(52,211,153,0.4)",
    href: "/solutions/ecommerce",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <circle cx="26" cy="26" r="20" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
        <path d="M14 26h24M26 14v24" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="6" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
        <path d="M18 18l16 16M34 18L18 34" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
];

export default function Industries() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="ind-section">
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 56,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>
            Vertical expertise
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fafaf7", margin: 0 }}>
            Built for your{" "}
            <span style={{ color: "#d97757" }}>industry.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <a
              key={ind.name}
              href={ind.href}
              className="ind-tile"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: ind.gradient,
                borderRadius: 24,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 300,
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? (hovered === i ? "translateY(-6px)" : "translateY(0)")
                  : "translateY(32px)",
                boxShadow: hovered === i
                  ? `0 32px 64px rgba(0,0,0,0.5), 0 0 60px ${ind.glowHover}`
                  : `0 4px 24px rgba(0,0,0,0.4), 0 0 20px ${ind.glow}`,
                transition: visible
                  ? `opacity 500ms ease ${i * 80}ms, transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease`
                  : "none",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Shine overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 55%)",
                pointerEvents: "none",
              }} />
              {/* Noise overlay */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.05,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                pointerEvents: "none",
              }} />

              {/* Top: icon */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {ind.icon}
              </div>

              {/* Bottom: text */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.1,
                  color: "#fff", margin: "0 0 10px",
                }}>
                  {ind.name}
                </h3>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 14, lineHeight: 1.5,
                  color: "rgba(255,255,255,0.75)", margin: "0 0 20px",
                }}>
                  {ind.tagline}
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.01em",
                }}>
                  Explore
                  <span style={{
                    display: "inline-block",
                    transform: hovered === i ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 250ms ease",
                  }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .ind-section {
          background: var(--bg);
          padding: 120px 0;
          overflow: hidden;
        }
        .ind-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .ind-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ind-section { padding: 80px 0; }
          .ind-grid { grid-template-columns: 1fr; gap: 14px; }
          .ind-tile { min-height: 220px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ind-tile { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
