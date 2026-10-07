"use client";
import React, { useEffect, useRef, useState } from "react";

const ACCENT = "#d97757";

// ── Icons ──────────────────────────────────────────────────────────────────────

function CascadeIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{
        transform: hovered ? "scale(1.08) rotate(3deg)" : "scale(1) rotate(0deg)",
        transition: "transform 300ms ease-out",
      }}
      aria-hidden="true"
    >
      <path d="M10 14l14 10 14-10" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 24l9 8 9-8"    stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 32l4 4 4-4"   stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DashboardIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{
        transform: hovered ? "scale(1.08) rotate(3deg)" : "scale(1) rotate(0deg)",
        transition: "transform 300ms ease-out",
      }}
      aria-hidden="true"
    >
      <rect x="7"  y="27" width="8" height="14" rx="2" stroke={ACCENT} strokeWidth="1.7"/>
      <rect x="20" y="20" width="8" height="21" rx="2" stroke={ACCENT} strokeWidth="1.7"/>
      <rect x="33" y="23" width="8" height="18" rx="2" stroke={ACCENT} strokeWidth="1.7"/>
      <path d="M9 23l12-9 9 4 11-11" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="41" cy="7" r="2.2" fill={ACCENT}/>
    </svg>
  );
}

function ApiIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{
        transform: hovered ? "scale(1.08) rotate(3deg)" : "scale(1) rotate(0deg)",
        transition: "transform 300ms ease-out",
      }}
      aria-hidden="true"
    >
      <path d="M18 15l-8 9 8 9" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 15l8 9-8 9"  stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="27" y1="12" x2="21" y2="36" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

interface BlockDef {
  headline: string;
  description: string;
  bullets: string[];
  cta: string;
  Icon: React.ComponentType<{ hovered: boolean }>;
}

const BLOCKS: BlockDef[] = [
  {
    headline: "Accept every payment, lose none.",
    description:
      "Cascading intelligence that recovers 18% of transactions your current PSP declines — automatically, invisibly, in 38ms.",
    bullets: [
      "1,000+ PSPs connected and ready",
      "Localized routing per country",
      "BIN-level optimization",
      "Real-time approval intelligence",
    ],
    cta: "Learn how cascading works",
    Icon: CascadeIcon,
  },
  {
    headline: "See everything. Act instantly.",
    description:
      "Unified visibility across your entire payment stack. Spot declines before they trend, trigger routing changes without a single engineer.",
    bullets: [
      "Unified dashboard for all providers",
      "AI-powered decline forecasting",
      "Custom reporting & analytics",
      "Zero-code routing adjustments",
    ],
    cta: "Explore the operator dashboard",
    Icon: DashboardIcon,
  },
  {
    headline: "One API. Every provider.",
    description:
      "Stop maintaining 15 PSP integrations. One clean REST API gives you the whole payment ecosystem — plus the orchestration intelligence to use it well.",
    bullets: [
      "Single REST API, all PSPs",
      "SDKs: Python, Node, Go, Ruby",
      "99.99% uptime SLA",
      "Full API docs & sandbox",
    ],
    cta: "Read the API docs",
    Icon: ApiIcon,
  },
];

// ── Solutions ─────────────────────────────────────────────────────────────────

export default function Solutions() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible,   setVisible]   = useState(false);
  const [entered,   setEntered]   = useState(false);
  const [hovered,   setHovered]   = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setEntered(true), 1250);
    return () => clearTimeout(t);
  }, [visible]);

  const headerAnim: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: visible ? "opacity 500ms ease-out, transform 500ms ease-out" : "none",
  };

  const DEFAULT_SHADOW = "0 20px 40px -10px rgba(0,0,0,0.3), 0 8px 20px -5px rgba(0,0,0,0.2)";
  const HOVER_SHADOW   = "0 30px 60px -15px rgba(217,119,87,0.25), 0 15px 30px -10px rgba(0,0,0,0.3)";

  const blockAnim = (i: number): React.CSSProperties => {
    if (!visible) return { opacity: 0, transform: "translateY(40px)" };
    const delay = 150 + i * 150;
    if (!entered) {
      return {
        opacity: 1,
        transform: "translateY(0)",
        boxShadow: DEFAULT_SHADOW,
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      };
    }
    const isH = hovered === i;
    return {
      opacity: 1,
      transform: isH ? "translateY(-6px)" : "translateY(0)",
      boxShadow: isH ? HOVER_SHADOW : DEFAULT_SHADOW,
      transition: "transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out",
    };
  };

  const borderColor = (i: number) =>
    entered && hovered === i ? "rgba(217,119,87,0.3)" : "rgba(42,31,28,0.08)";

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="solutions-section"
      style={{ background: "var(--bg)", padding: "160px 28px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Section header ──────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 80, ...headerAnim }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 56px)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "#fafaf7", margin: "0 auto 24px", maxWidth: 900,
          }}>
            Everything a modern payment stack needs.
          </h2>
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500, fontSize: "clamp(16px, 1.5vw, 20px)",
            lineHeight: 1.6, color: "rgba(255,255,255,0.7)",
            maxWidth: 680, margin: "0 auto",
          }}>
            Whether you&apos;re building, operating, or scaling — CascadX gives every team
            on your payment stack what they need to move faster.
          </p>
        </div>

        {/* ── 3 Blocks ────────────────────────────────────────────── */}
        <div className="solutions-grid">
          {BLOCKS.map((block, i) => (
            <div
              key={block.headline}
              className="solutions-block"
              style={{
                background: "#f5efe6",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: borderColor(i),
                borderRadius: 24,
                padding: 48,
                display: "flex",
                flexDirection: "column",
                ...blockAnim(i),
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <block.Icon hovered={entered && hovered === i} />

              {/* Headline */}
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800, fontSize: "clamp(22px, 1.8vw, 28px)",
                letterSpacing: "-0.02em", lineHeight: 1.2,
                color: "#2a1f1c", margin: "24px 0 16px",
              }}>
                {block.headline}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500, fontSize: 15, lineHeight: 1.6,
                color: "#5a4a42", margin: 0,
              }}>
                {block.description}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(42,31,28,0.15)", margin: "32px 0" }} />

              {/* Bullet list */}
              <ul style={{
                listStyle: "none", padding: 0, margin: "0 0 auto",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                {block.bullets.map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ color: ACCENT, fontSize: 14, lineHeight: 1, flexShrink: 0 }}>·</span>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500, fontSize: 14,
                      color: "#3a2d26", lineHeight: 1.5,
                    }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Learn more CTA */}
              <button
                className="solutions-cta"
                style={{
                  marginTop: 32, background: "none", border: "none",
                  cursor: "pointer", padding: 0,
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600, fontSize: 14,
                  color: ACCENT, letterSpacing: "-0.01em",
                  touchAction: "manipulation",
                }}
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
              >
                <span>{block.cta}</span>
                <span
                  className="solutions-cta-arrow"
                  style={{ display: "inline-block", transition: "transform 300ms ease-out" }}
                >
                  →
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* ── CTA strip ────────────────────────────────────────────── */}
        <div
          className="solutions-strip"
          style={{
            marginTop: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: visible
              ? "opacity 500ms ease-out 400ms, transform 500ms ease-out 400ms"
              : "none",
          }}
        >
          <div
            className="solutions-strip-card"
            style={{
              background: "#f5efe6",
              border: "1px solid rgba(42,31,28,0.08)",
              borderRadius: 20,
              padding: "40px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              position: "relative",
              overflow: "hidden",
              boxShadow: DEFAULT_SHADOW,
            }}
          >
            {/* Soft terracotta glow, left side */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 50% 100% at 15% 50%, rgba(217,119,87,0.06) 0%, transparent 70%)",
            }} />

            {/* Left — headline */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800, fontSize: "clamp(18px, 1.8vw, 24px)",
                letterSpacing: "-0.02em", lineHeight: 1.2,
                color: "#2a1f1c", margin: 0,
              }}>
                Stop losing approvals. Start routing smarter.
              </h3>
            </div>

            {/* Right — buttons */}
            <div className="solutions-strip-btns" style={{
              display: "flex", gap: 12, flexShrink: 0, position: "relative", zIndex: 1,
            }}>
              <button
                className="solutions-strip-primary"
                style={{
                  height: 48, padding: "0 28px",
                  background: ACCENT, color: "white",
                  border: "none", borderRadius: 12,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600, fontSize: 15,
                  cursor: "pointer", letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  touchAction: "manipulation",
                  transition: "background 250ms ease-out, transform 250ms ease-out",
                }}
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
              >
                Get started free
              </button>
              <button
                className="solutions-strip-secondary"
                style={{
                  height: 48, padding: "0 24px",
                  background: "transparent", color: "#2a1f1c",
                  border: "1.5px solid rgba(42,31,28,0.2)",
                  borderRadius: 12,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600, fontSize: 15,
                  cursor: "pointer", letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  touchAction: "manipulation",
                  transition: "border-color 250ms ease-out, background 250ms ease-out, transform 250ms ease-out",
                }}
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
              >
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        @media (hover: hover) {
          .solutions-block:hover .solutions-cta-arrow { transform: translateX(4px) !important; }
          .solutions-strip-primary:hover  { background: #c86847 !important; transform: scale(1.02); }
          .solutions-strip-secondary:hover {
            border-color: rgba(42,31,28,0.4) !important;
            background: rgba(42,31,28,0.04) !important;
            transform: scale(1.02);
          }
        }
        @media (hover: none) {
          .solutions-block:active { transform: scale(0.98) !important; transition: transform 120ms ease !important; }
          .solutions-strip-primary:active,
          .solutions-strip-secondary:active { transform: scale(0.97) !important; }
        }
        @media (max-width: 1024px) {
          .solutions-section { padding-top: 100px !important; padding-bottom: 100px !important; }
          .solutions-grid    { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 767px) {
          .solutions-block       { padding: 32px !important; }
          .solutions-strip-card  {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 28px 24px !important;
            gap: 20px !important;
          }
          .solutions-strip-btns  { width: 100%; flex-direction: column !important; }
          .solutions-strip-primary,
          .solutions-strip-secondary { width: 100% !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .solutions-block,
          .solutions-cta-arrow { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
