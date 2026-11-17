"use client";

import React, { useEffect, useState } from "react";

const ACCENT = "#d97757";
const BG     = "#0a0c0b";

// ── Floating card shell ─────────────────────────────────────────────────────
function FloatingCard({
  children,
  style,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`hx-card ${className}`}
      style={{
        position: "absolute",
        padding: "14px 16px",
        borderRadius: 18,
        background: "linear-gradient(145deg, rgba(28,22,20,0.82) 0%, rgba(18,14,12,0.78) 100%)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: "1px solid rgba(217,119,87,0.18)",
        boxShadow: "0 20px 50px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset",
        fontFamily: "var(--font-display)",
        color: "#faf8f2",
        animation: `hx-float 7s ease-in-out ${delay}ms infinite, hx-card-in 700ms cubic-bezier(.2,.9,.3,1) ${delay + 200}ms both`,
        zIndex: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Mini content blocks for each card ───────────────────────────────────────
function RoutingCard() {
  return (
    <div style={{ minWidth: 180 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: 11, fontWeight: 500, color: "rgba(250,248,242,0.55)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
        Routing live
      </div>
      {[
        { n: "Stripe",   t: "142ms", ok: false },
        { n: "Adyen",    t: "89ms",  ok: false },
        { n: "Worldpay", t: "38ms",  ok: true },
      ].map((r) => (
        <div key={r.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "3px 0", color: r.ok ? "#9ae6b4" : "rgba(250,248,242,0.4)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10 }}>{r.ok ? "✓" : "✕"}</span>
            {r.n}
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 11 }}>{r.t}</span>
        </div>
      ))}
    </div>
  );
}

function ApprovalCard() {
  return (
    <div style={{ minWidth: 160 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(250,248,242,0.55)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>Approval rate</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#faf8f2" }}>94.3<span style={{ fontSize: 16, opacity: 0.6 }}>%</span></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: ACCENT, fontWeight: 500 }}>
        <span>↑ 23%</span>
        <span style={{ color: "rgba(250,248,242,0.4)" }}>vs baseline</span>
      </div>
      <svg width="140" height="24" viewBox="0 0 140 24" style={{ marginTop: 8, display: "block" }}>
        <path d="M0,20 L20,18 L35,15 L55,16 L72,10 L90,12 L108,6 L125,8 L140,3" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <path d="M0,20 L20,18 L35,15 L55,16 L72,10 L90,12 L108,6 L125,8 L140,3 L140,24 L0,24 Z" fill="url(#sparkGrad)" opacity="0.25" />
        <defs>
          <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={ACCENT} />
            <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function RecoveredCard() {
  return (
    <div style={{ minWidth: 160 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(250,248,242,0.55)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>Recovered today</div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: "#faf8f2", fontVariantNumeric: "tabular-nums" }}>$12,478</div>
      <div style={{ fontSize: 11, color: "rgba(250,248,242,0.5)", marginTop: 4 }}>across 342 transactions</div>
    </div>
  );
}

function SpeedCard() {
  return (
    <div style={{ minWidth: 150, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `linear-gradient(135deg, ${ACCENT} 0%, #c45a3d 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 16px -2px ${ACCENT}66`,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(250,248,242,0.55)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Best route</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#faf8f2", marginTop: 2 }}>Worldpay · 38ms</div>
      </div>
    </div>
  );
}

// ── Tilted phone mockup ─────────────────────────────────────────────────────
function TiltedPhone() {
  return (
    <div
      className="hx-phone"
      style={{
        position: "relative",
        width: 248,
        height: 500,
        zIndex: 10,
        transform: "perspective(1400px) rotateY(-10deg) rotateX(6deg) rotateZ(-2deg)",
        transformStyle: "preserve-3d",
        animation: "hx-phone-float 8s ease-in-out infinite",
      }}
    >
      {/* Frame */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 48,
        background: "linear-gradient(135deg, #2a2a2c 0%, #4a4a4c 30%, #3a3a3c 60%, #2a2a2c 100%)",
        boxShadow: `
          0 70px 100px -20px rgba(0,0,0,0.75),
          0 30px 50px -15px rgba(0,0,0,0.5),
          0 0 0 1px rgba(0,0,0,0.6),
          0 0 120px ${ACCENT}22
        `,
      }} />
      {/* Bezel */}
      <div style={{ position: "absolute", inset: 5, borderRadius: 44, background: "#000" }} />
      {/* Screen */}
      <div style={{
        position: "absolute", inset: 9, borderRadius: 40,
        background: "linear-gradient(180deg, #fafaf7 0%, #f5f0ea 100%)",
        overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: 14, left: "50%",
          transform: "translateX(-50%)",
          width: 92, height: 28, borderRadius: 14, background: "#0a0a0a",
        }} />

        {/* Success circle */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}26 0%, ${ACCENT}10 60%, transparent 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT} 0%, #c45a3d 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 10px 30px -6px ${ACCENT}99`,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500, color: "#6b5f55", letterSpacing: "-0.01em", marginBottom: 4 }}>Payment approved</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: "#1a0f0a", letterSpacing: "-0.03em", marginBottom: 14 }}>$129.00</div>

        <div style={{ fontSize: 11, color: "#8a7f75", marginBottom: 12 }}>Charged to •••• 4716</div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: 100,
          background: `${ACCENT}15`,
          fontSize: 10, color: ACCENT, fontWeight: 600,
          letterSpacing: "0.02em",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#52c41a" }} />
          via Worldpay · 38ms
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────
export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    } else {
      setAnimate(true);
    }
  }, []);

  const ta = (delay: number): React.CSSProperties =>
    animate ? { animation: `hx-text-in 600ms cubic-bezier(.2,.9,.3,1) ${delay}ms both` } : { opacity: 0 };

  return (
    <header className="hx-hero" style={{
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      background: BG,
      padding: "clamp(90px, 12vh, 140px) 24px clamp(70px, 10vh, 110px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    }}>
      {/* Aurora — terracotta glow blobs */}
      <div className="hx-aurora hx-aurora-1" aria-hidden="true" />
      <div className="hx-aurora hx-aurora-2" aria-hidden="true" />

      {/* Film grain */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.05,
        mixBlendMode: "overlay",
      }} />

      {/* Scene — phone + floating cards */}
      <div className="hx-scene">
        <FloatingCard delay={300} style={{ top: "4%",   left: "6%"  }} className="hx-card-tl"><RoutingCard /></FloatingCard>
        <FloatingCard delay={500} style={{ top: "12%",  right: "4%" }} className="hx-card-tr"><ApprovalCard /></FloatingCard>
        <FloatingCard delay={700} style={{ bottom: "8%",left: "2%"  }} className="hx-card-bl"><RecoveredCard /></FloatingCard>
        <FloatingCard delay={900} style={{ bottom: "16%",right: "6%"}} className="hx-card-br"><SpeedCard /></FloatingCard>

        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", zIndex: 10,
        }}>
          <TiltedPhone />
        </div>
      </div>

      {/* Headline */}
      <h1 className="hx-headline" style={ta(200)}>
        <span className="hx-accent">Payment tech</span>
        <br />
        for your business
      </h1>

      {/* Subtitle */}
      <p className="hx-sub" style={ta(400)}>
        Seamless software and APIs that help merchants accept every payment and recover the declines — so revenue never leaks.
      </p>

      {/* CTAs */}
      <div className="hx-ctas" style={ta(600)}>
        <a href="#final-cta" className="hx-btn hx-btn-primary">Contact sales</a>
        <a href="#how-it-works" className="hx-btn hx-btn-ghost">
          Get started
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <style>{`
        /* Aurora glow blobs */
        .hx-aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }
        .hx-aurora-1 {
          width: 600px; height: 600px;
          top: -200px; right: -100px;
          background: radial-gradient(circle, ${ACCENT}3a 0%, ${ACCENT}00 70%);
          animation: hx-aurora-1 24s ease-in-out infinite;
        }
        .hx-aurora-2 {
          width: 500px; height: 500px;
          bottom: -150px; left: -100px;
          background: radial-gradient(circle, ${ACCENT}22 0%, ${ACCENT}00 70%);
          animation: hx-aurora-2 28s ease-in-out infinite;
        }
        @keyframes hx-aurora-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px,30px) scale(1.1); }
        }
        @keyframes hx-aurora-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(50px,-20px) scale(0.9); }
        }

        /* Scene */
        .hx-scene {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: clamp(460px, 58vh, 580px);
          margin: 0 auto clamp(28px, 4vh, 48px);
          z-index: 5;
        }

        /* Card entrance + float */
        @keyframes hx-card-in {
          0% { opacity: 0; transform: translateY(20px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hx-float {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(0,-8px); }
        }
        @keyframes hx-phone-float {
          0%,100% { transform: perspective(1400px) rotateY(-10deg) rotateX(6deg) rotateZ(-2deg) translateY(0); }
          50%     { transform: perspective(1400px) rotateY(-10deg) rotateX(6deg) rotateZ(-2deg) translateY(-12px); }
        }

        /* Headline */
        .hx-headline {
          position: relative;
          z-index: 5;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(42px, 7vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.035em;
          color: #faf8f2;
          text-align: center;
          margin: 0 0 24px;
          max-width: 1100px;
        }
        .hx-accent {
          background: linear-gradient(120deg, ${ACCENT} 0%, #f0c5a7 45%, ${ACCENT} 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
          font-weight: 700;
          animation: hx-grad 10s ease-in-out infinite;
        }
        @keyframes hx-grad {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }

        /* Subtitle */
        .hx-sub {
          position: relative;
          z-index: 5;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(15px, 1.5vw, 19px);
          line-height: 1.55;
          color: rgba(250,248,242,0.62);
          text-align: center;
          max-width: 640px;
          margin: 0 auto 36px;
        }

        /* CTAs */
        .hx-ctas {
          position: relative;
          z-index: 5;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hx-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 28px;
          border-radius: 100px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.005em;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          touch-action: manipulation;
        }
        .hx-btn-primary {
          background: ${ACCENT};
          color: #faf8f2;
          box-shadow: 0 10px 28px -6px ${ACCENT}66, 0 0 0 1px rgba(255,255,255,0.08) inset;
        }
        .hx-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 36px -8px ${ACCENT}88; }
        .hx-btn-primary:active { transform: translateY(0) scale(0.97); }
        .hx-btn-ghost {
          background: transparent;
          color: #faf8f2;
          border: 1px solid rgba(250,248,242,0.22);
        }
        .hx-btn-ghost:hover { border-color: rgba(250,248,242,0.5); background: rgba(250,248,242,0.04); }
        .hx-btn-ghost:active { transform: scale(0.97); }

        /* ─── Tablet (≤1024px): shrink cards, tighter layout ─── */
        @media (max-width: 1024px) {
          .hx-scene { height: clamp(440px, 60vh, 540px); max-width: 720px; }
          .hx-card { transform: scale(0.88); transform-origin: center; }
        }

        /* ─── Mobile (≤768px): only 2 cards visible, smaller phone ─── */
        @media (max-width: 768px) {
          .hx-scene {
            height: clamp(400px, 70vw, 480px);
            max-width: 100%;
          }
          .hx-card-tl, .hx-card-br { display: none !important; }
          .hx-card-tr { top: 2% !important; right: 2% !important; transform: scale(0.75) !important; }
          .hx-card-bl { bottom: 2% !important; left: 2% !important; transform: scale(0.75) !important; }
          .hx-phone { width: 200px !important; height: 410px !important; }
          .hx-phone > div { border-radius: 40px !important; }
        }

        @media (max-width: 480px) {
          .hx-ctas { flex-direction: column; width: 100%; max-width: 320px; margin: 0 auto; }
          .hx-btn { width: 100%; justify-content: center; }
        }

        @keyframes hx-text-in {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hx-aurora, .hx-phone, .hx-card { animation: none !important; }
        }
      `}</style>
    </header>
  );
}
