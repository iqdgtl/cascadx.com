"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 1600, trigger = false) {
  const [v, setV] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setV(Math.round(ease * end));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);
  return v;
}

const STATS = [
  { prefix: "+", value: 18, suffix: "%", label: "Approval uplift", sub: "vs. single-PSP baseline" },
  { prefix: "",  value: 1000, suffix: "+", label: "Payment providers", sub: "connected & ready" },
  { prefix: "<", value: 40, suffix: "ms", label: "Decision time", sub: "per routing decision" },
];

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const counts = [
    useCountUp(STATS[0].value, 1400, triggered),
    useCountUp(STATS[1].value, 1600, triggered),
    useCountUp(STATS[2].value, 1200, triggered),
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, #0a0c0b 100%)",
        borderTop: "1px solid rgba(26,15,10,0.06)",
        borderBottom: "1px solid rgba(26,15,10,0.06)",
        padding: "72px 20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(217,119,87,0.07) 0%, transparent 70%)",
      }} />

      <div style={{
        maxWidth: 1240, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "0",
        position: "relative",
      }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat-item"
            style={{
              textAlign: "center",
              padding: "0 24px",
              borderRight: i < 2 ? "1px solid rgba(26,15,10,0.08)" : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`,
            }}
          >
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(52px,8vw,96px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#d97757",
              marginBottom: 12,
            }}>
              {s.prefix}{counts[i].toLocaleString()}{s.suffix}
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(16px,1.6vw,20px)",
              color: "#1a0f0a",
              marginBottom: 6,
              letterSpacing: "-0.01em",
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "rgba(26,15,10,0.38)",
              letterSpacing: "0.02em",
            }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(26,15,10,0.08);
            padding-bottom: 48px !important;
          }
          .stat-item:last-child { border-bottom: none !important; padding-bottom: 0 !important; }
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .stats-grid { gap: 0; }
        }
      `}</style>
    </section>
  );
}
