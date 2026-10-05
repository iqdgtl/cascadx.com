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

        /* ── Mobile ──────────────────────────────────────── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child p,
          .hero-grid > div:first-child > div:last-child {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid > div:last-child {
            height: clamp(320px, 80vw, 440px) !important;
            width: 100%;
          }
          .hero-cta-row { justify-content: center; }
          .hero-cta-footnote { justify-content: center; }
        }
        @media (max-width: 540px) {
          .hero-cta-row { flex-direction: column; gap: 12px; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-btn-pulse { animation: none; }
        }
      `}</style>
    </header>
  );
}
