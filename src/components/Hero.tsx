"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load the heavy 3D scene — only initialises when the hero is in viewport
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
  const metricsRef = useRef<HTMLDivElement>(null);
  const sceneRef   = useRef<HTMLDivElement>(null);
  const [metricVisible, setMetricVisible] = useState(false);
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
      ([e]) => { if (e.isIntersecting) { setMetricVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    if (metricsRef.current) io.observe(metricsRef.current);
    return () => io.disconnect();
  }, []);

  // Lazy-init scene when visible
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSceneVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sceneRef.current) io.observe(sceneRef.current);
    return () => io.disconnect();
  }, []);

  const approval = useCountUp(18,   1500, metricVisible);
  const psps     = useCountUp(1000, 1500, metricVisible);
  const latency  = useCountUp(40,   1200, metricVisible);

  // Text cascade helper — only animates on first-time visitors
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
        padding: "80px 28px 60px",
      }}
    >
      {/* Terracotta radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(217,119,87,0.09) 0%, transparent 70%)",
      }} />

      {/* Hero film grain — very subtle, adds cinematic depth */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        mixBlendMode: "overlay",
      }} />

      {/* Headline area glow — desktop only, soft terracotta sunrise behind the copy */}
      <div className="hero-headline-glow" aria-hidden="true" style={{
        position: "absolute",
        width: 700, height: 520,
        left: "clamp(-60px, 2vw, 20px)", top: "12%",
        background: "radial-gradient(ellipse at center, rgba(217,119,87,0.10) 0%, rgba(217,119,87,0.04) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        filter: "blur(60px)",
      }} />

      <div style={{
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
        {/* ── LEFT: Text content ───────────────────────────── */}
        <div>
          {/* Headline — static */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(42px, 5.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#fafaf7",
            margin: "0 0 22px",
            ...ta(200),
          }}>
            Payments that{" "}
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>think</em>
            <br />
            before they fall.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(16px, 1.6vw, 20px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.68)",
            maxWidth: "520px",
            margin: "0 0 32px",
            ...ta(500),
          }}>
            AI-powered payment orchestration cascading through 1,000+ PSPs in under 40 milliseconds.
            Turn declined transactions into approved revenue — across every provider, every country, every card.
          </p>

          {/* CTAs */}
          <div style={{ marginBottom: "36px", ...ta(800) }}>
            {/* Button row */}
            <div className="hero-cta-row">
              {/* Primary — Start routing smarter */}
              <div style={{ position: "relative", display: "inline-flex" }}>
                <button
                  className="hero-btn-primary"
                  onClick={() => window.dispatchEvent(new Event("open-chat"))}
                >
                  Get started
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7 6l5 4-5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6l5 4-5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
                  </svg>
                </button>
                <div className="hero-btn-pulse" aria-hidden="true" />
              </div>

              {/* Secondary — Talk to our team */}
              <button
                className="hero-btn-secondary"
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
              >
                Speak with sales
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 4h14a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0117 14H8l-4.5 3V14H3A1.5 1.5 0 011.5 12.5v-7A1.5 1.5 0 013 4z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Friction reducer */}
            <div className="hero-cta-footnote">
              <span>Free 30-day trial</span>
              <span className="hero-cta-dot" aria-hidden="true">·</span>
              <span>No credit card</span>
              <span className="hero-cta-dot" aria-hidden="true">·</span>
              <span>Live in 48 hours</span>
            </div>
          </div>

          {/* Trust signals / metrics */}
          <div
            ref={metricsRef}
            style={{
              display: "flex",
              gap: "clamp(20px, 3vw, 36px)",
              flexWrap: "wrap",
              ...ta(1100),
            }}
          >
            {[
              { value: `+${approval}%`, label: "APPROVAL" },
              { value: `${psps.toLocaleString()}+`, label: "PSPs" },
              { value: `< ${latency}ms`, label: "DECISION" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  letterSpacing: "-0.03em",
                  color: "#fafaf7",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: "var(--ink-muted)",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: 3D Scene ──────────────────────────────── */}
        <div
          ref={sceneRef}
          style={{
            position: "relative",
            height: "clamp(420px, 55vw, 600px)",
            minHeight: "400px",
          }}
        >
          {sceneVisible && <HeroScene />}
        </div>
      </div>

      <style>{`
        /* ── CTA buttons ─────────────────────────────────── */
        .hero-cta-row {
          display: flex;
          flex-direction: row;
          gap: 16px;
          align-items: center;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 220px;
          height: 56px;
          background: #d97757;
          color: white;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 17px;
          padding: 0 28px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: background 250ms ease-out, transform 250ms ease-out, box-shadow 250ms ease-out;
        }
        .hero-btn-primary svg {
          transition: transform 250ms ease-out;
          flex-shrink: 0;
        }
        .hero-btn-primary:hover {
          background: #c86847;
          transform: scale(1.02);
          box-shadow: 0 0 40px rgba(217,119,87,0.4);
        }
        .hero-btn-primary:hover svg { transform: translateX(4px); }
        .hero-btn-primary:active    { transform: scale(0.98); }

        /* Pulse ring */
        .hero-btn-pulse {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1.5px solid rgba(217,119,87,0.6);
          pointer-events: none;
          animation: hero-ring-pulse 4s ease-out infinite;
        }
        @keyframes hero-ring-pulse {
          0%   { transform: scale(1);    opacity: 0.35; }
          65%  { transform: scale(1.15); opacity: 0;    }
          100% { transform: scale(1.15); opacity: 0;    }
        }

        /* Secondary button */
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 220px;
          height: 56px;
          background: transparent;
          color: #fafaf7;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 17px;
          padding: 0 28px;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.2);
          cursor: pointer;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: border-color 250ms ease-out, background 250ms ease-out, transform 250ms ease-out;
        }
        .hero-btn-secondary svg {
          transition: transform 250ms ease-out;
          flex-shrink: 0;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          transform: scale(1.02);
        }
        .hero-btn-secondary:hover svg { transform: translateX(4px); }
        .hero-btn-secondary:active    { transform: scale(0.98); }

        /* Friction-reducer line */
        .hero-cta-footnote {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          flex-wrap: wrap;
        }
        .hero-cta-dot {
          color: #d97757;
          font-size: 16px;
          line-height: 1;
          opacity: 0.7;
        }

        /* Touch — no 300ms tap delay */
        .hero-btn-primary, .hero-btn-secondary { touch-action: manipulation; }

        /* Scroll indicator bounce */
        @keyframes hero-scroll-bounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(4px); opacity: 0.7; }
        }
        .hero-scroll-indicator:hover path { stroke: rgba(255,255,255,0.65) !important; }

        /* ── Mobile — stacks at 900px ────────────────────── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 24px !important;
          }
          .hero-grid > div:first-child p,
          .hero-grid > div:first-child > div:last-child {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid > div:last-child {
            height: clamp(400px, 105vw, 500px) !important;
            width: 100%;
          }
          .hero-cta-row { justify-content: center; }
          .hero-cta-footnote { justify-content: center; }
          .hero-headline-glow { display: none !important; }
          .hero-scroll-indicator { display: none !important; }
        }
        /* ── Mobile 768px — button layout ───────────────── */
        @media (max-width: 768px) {
          .hero-btn-primary, .hero-btn-secondary {
            height: 52px !important;
            font-size: 16px !important;
          }
        }
        /* ── Mobile 540px — full-width stacked buttons ──── */
        @media (max-width: 540px) {
          .hero-cta-row { flex-direction: column; gap: 10px; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; max-width: 380px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-btn-pulse { animation: none; }
          .hero-scroll-indicator svg { animation: none !important; }
        }
      `}</style>

      {/* Scroll indicator — desktop only, bounces gently to invite scrolling */}
      <button
        className="hero-scroll-indicator"
        aria-label="Scroll to explore"
        onClick={() => document.querySelector("#solutions")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          background: "none", border: "none", cursor: "pointer",
          zIndex: 3, padding: 8,
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase",
          letterSpacing: "3px", color: "rgba(255,255,255,0.3)", userSelect: "none",
          pointerEvents: "none",
        }}>Scroll to explore</span>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true"
          style={{ animation: "hero-scroll-bounce 2s ease-in-out infinite" }}>
          <path d="M2 2l8 8 8-8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </header>
  );
}
