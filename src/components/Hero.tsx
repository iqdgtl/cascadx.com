"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero/HeroScene"), { ssr: false });

function useCountUp(end: number, duration = 1500, trigger = false) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * end));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);
  return value;
}

export default function Hero() {
  const sceneRef   = useRef<HTMLDivElement>(null);
  const [sceneVisible,  setSceneVisible]  = useState(false);
  const [textAnimate,   setTextAnimate]   = useState(false);

  useEffect(() => {
    const played  = sessionStorage.getItem("hx-entrance") === "1";
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!played && !reduced) {
      requestAnimationFrame(() => requestAnimationFrame(() => setTextAnimate(true)));
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSceneVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sceneRef.current) io.observe(sceneRef.current);
    return () => io.disconnect();
  }, []);

  const ta = (delay: number): React.CSSProperties =>
    textAnimate ? { animation: `hero-text-in 400ms ease-out ${delay}ms both` } : {};

  return (
    <header
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
        padding: "clamp(40px, 8vw, 80px) 24px clamp(32px, 6vw, 60px)",
      }}
    >
      {/* Single on-brand terracotta orb — no rainbow */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />

      {/* Terracotta radial glow behind scene */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(217,119,87,0.09) 0%, transparent 70%)",
      }} />

      {/* Film grain — cinematic depth */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        mixBlendMode: "overlay",
      }} />

      {/* Headline glow — desktop only */}
      <div className="hero-headline-glow" aria-hidden="true" style={{
        position: "absolute",
        width: 700, height: 520,
        left: "clamp(-60px, 2vw, 20px)", top: "12%",
        background: "radial-gradient(ellipse at center, rgba(217,119,87,0.10) 0%, rgba(217,119,87,0.04) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        filter: "blur(60px)",
      }} />

      <div
        style={{
          maxWidth: "var(--max)",
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "clamp(320px, 40%, 480px) 1fr",
          gap: "clamp(32px, 4vw, 64px)",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-grid"
      >
        {/* ── LEFT: Copy ───────────────────────────────────── */}
        <div className="hero-text-col">

          {/* Editorial headline — refined, elegant, one accent */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(36px, 4.8vw, 56px)",
            lineHeight: 1.15,
            letterSpacing: "-0.028em",
            color: "#1a0f0a",
            margin: "0 0 28px",
            maxWidth: "640px",
            ...ta(200),
          }}>
            Payment recovery,{" "}
            <span style={{
              color: "#d97757",
              fontWeight: 600,
              fontStyle: "italic",
            }}>for every business</span>.
          </h1>

          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.6,
            color: "rgba(26,15,10,0.65)",
            maxWidth: "540px",
            margin: "0 0 40px",
            letterSpacing: "-0.005em",
            ...ta(500),
          }}>
            Software and APIs that cascade every declined transaction across 1,000+
            acquirers in milliseconds — recovering the revenue your current provider
            quietly lets slip.
          </p>

          {/* Single CTA — clean, confident */}
          <div style={{ marginBottom: "28px", ...ta(700) }}>
            <div className="hero-cta-row">
              <div style={{ position: "relative", display: "inline-flex" }}>
                <button
                  className="hero-btn-primary"
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn more
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="hero-btn-pulse" aria-hidden="true" />
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT: Scene ─────────────────────────────────── */}
        <div
          className="hero-scene-col"
          ref={sceneRef}
          style={{
            position: "relative",
            height: "clamp(540px, 62vw, 590px)",
            minHeight: "540px",
          }}
        >
          {sceneVisible && <HeroScene />}
        </div>
      </div>

      <style>{`
        /* ── Orb — terracotta only ─────────────────────── */
        .hero-orb {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-orb-1 {
          background: rgba(217,119,87,0.22);
          top: -140px; right: 5%;
          animation: orb-float-1 22s ease-in-out infinite;
        }
        @keyframes orb-float-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(30px,-40px) scale(1.08); }
          70%     { transform: translate(-15px,25px) scale(0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb { animation: none !important; }
        }

        /* ── CTA row ──────────────────────────────────── */
        .hero-cta-row {
          display: flex;
          flex-direction: row;
          gap: 14px;
          align-items: center;
          margin-bottom: 20px;
        }

        /* Primary button */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          padding: 0 28px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-family: var(--font-display, "Inter", sans-serif);
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          cursor: pointer;
          outline: none;
          touch-action: manipulation;
          transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          box-shadow: 0 8px 20px rgba(217,119,87,0.35);
          position: relative;
          z-index: 2;
          white-space: nowrap;
        }
        .hero-btn-primary svg { transition: transform 200ms ease; flex-shrink: 0; }
        .hero-btn-primary:hover {
          background: var(--accent-deep);
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(217,119,87,0.45);
        }
        .hero-btn-primary:hover svg { transform: translateX(3px); }
        .hero-btn-primary:active    { transform: scale(0.97); }

        /* Pulse ring */
        .hero-btn-pulse {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          border: 1.5px solid rgba(217,119,87,0.55);
          pointer-events: none;
          animation: hero-ring-pulse 4s ease-out infinite;
        }
        @keyframes hero-ring-pulse {
          0%   { transform: scale(1);    opacity: 0.4; }
          65%  { transform: scale(1.18); opacity: 0;   }
          100% { transform: scale(1.18); opacity: 0;   }
        }

        /* Secondary button */
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 52px;
          padding: 0 24px;
          background: rgba(255,255,255,0.05);
          color: rgba(250,250,247,0.85);
          border: 1.5px solid rgba(255,255,255,0.14);
          border-radius: 100px;
          font-family: var(--font-display, "Inter", sans-serif);
          font-weight: 500;
          font-size: 15px;
          letter-spacing: -0.01em;
          cursor: pointer;
          outline: none;
          touch-action: manipulation;
          white-space: nowrap;
          transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
        }
        .hero-btn-secondary svg { transition: transform 200ms ease; flex-shrink: 0; }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.09);
          transform: translateY(-1px);
        }
        .hero-btn-secondary:hover svg { transform: translateX(2px); }
        .hero-btn-secondary:active    { transform: scale(0.97); }

        /* Friction-reducer */
        .hero-cta-footnote {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 13px;
          color: rgba(250,250,247,0.38);
          flex-wrap: wrap;
        }
        .hero-cta-dot { color: var(--accent); opacity: 0.6; }

        /* Touch */
        .hero-btn-primary, .hero-btn-secondary { touch-action: manipulation; }

        /* ── Mobile — stacks at 900px ──────────────────── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 24px !important;
          }
          .hero-grid > div:last-child {
            height: clamp(380px, 95vw, 460px) !important;
            width: 100%;
          }
          /* Make PremiumIPhone fill its mobile frame — fixes off-center */
          .hero-phone-frame { position: relative !important; }
          .hero-phone-frame > div {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-phone-frame > div > * { border-radius: 38px !important; }
          .hero-phone-wrap { --phone-y: 0px !important; }
          .hero-cta-row { justify-content: center; }
          .hero-cta-footnote { justify-content: center; }
          .hero-metrics { justify-content: center; }
          .hero-headline-glow { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-scene-col { order: -1; }
          .hero-text-col  { order: 1; }
          .hero-btn-secondary  { display: none !important; }
          .hero-cta-footnote   { display: none !important; }
          .hero-metrics        { display: none !important; }
        }
        @media (max-width: 540px) {
          .hero-cta-row { flex-direction: column; gap: 10px; margin-bottom: 0; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; max-width: 360px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-btn-pulse { animation: none; }
        }
      `}</style>
    </header>
  );
}
