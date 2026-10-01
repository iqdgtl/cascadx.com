"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
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
          {/* Kicker */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "var(--accent)",
            marginBottom: "20px",
          }}>
            Payment Orchestration
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(42px, 5.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#fafaf7",
            margin: "0 0 22px",
          }}>
            Payments that{" "}
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>think</em>
            {" "}before{"\u00A0"}they fall.
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
          }}>
            AI-powered payment orchestration cascading through 1,000+ PSPs in under 40 milliseconds.
            Turn declined transactions into approved revenue — across every provider, every country, every card.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
            <Button
              variant="primary"
              icon="arrow"
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
            >
              Book a demo
            </Button>
            <Button variant="ghost" icon="play" href="#how-it-works">
              See it in action
            </Button>
          </div>

          {/* Trust signals / metrics */}
          <div
            ref={metricsRef}
            style={{
              display: "flex",
              gap: "clamp(20px, 3vw, 36px)",
              flexWrap: "wrap",
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

      {/* Mobile stack override */}
      <style>{`
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
          .hero-grid > div:first-child > div:nth-child(4) {
            justify-content: center;
          }
          .hero-grid > div:last-child {
            height: clamp(320px, 80vw, 440px) !important;
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
