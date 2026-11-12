"use client";
import { useEffect, useRef, useState } from "react";

const PAYMENTS = [
  { name: "Visa",        abbr: "VISA",        bg: "linear-gradient(135deg,#1a1f71,#2d35a0)", text: "#fff", size: 26, weight: 800, tracking: "0.04em" },
  { name: "Mastercard",  abbr: "MC",          bg: "linear-gradient(135deg,#eb001b,#f79e1b)", text: "#fff", size: 26, weight: 800, tracking: "0" },
  { name: "Amex",        abbr: "AMEX",        bg: "linear-gradient(135deg,#007bc1,#00a8e8)", text: "#fff", size: 22, weight: 700, tracking: "0.08em" },
  { name: "Apple Pay",   abbr: "Pay",         bg: "linear-gradient(135deg,#1c1c1e,#3a3a3c)", text: "#fff", size: 24, weight: 400, tracking: "0" },
  { name: "Google Pay",  abbr: "G Pay",       bg: "linear-gradient(135deg,#f8f9fa,#e9ecef)", text: "#3c4043", size: 20, weight: 600, tracking: "-0.02em" },
  { name: "PayPal",      abbr: "PayPal",      bg: "linear-gradient(135deg,#003087,#009cde)", text: "#fff", size: 18, weight: 700, tracking: "0" },
  { name: "Alipay",      abbr: "支付宝",       bg: "linear-gradient(135deg,#1677ff,#0057e7)", text: "#fff", size: 22, weight: 700, tracking: "0" },
  { name: "WeChat Pay",  abbr: "微信",         bg: "linear-gradient(135deg,#07c160,#05a84f)", text: "#fff", size: 26, weight: 700, tracking: "0" },
  { name: "Klarna",      abbr: "klarna",      bg: "linear-gradient(135deg,#ff5fad,#fe3e96)", text: "#fff", size: 18, weight: 700, tracking: "0" },
  { name: "Stripe",      abbr: "stripe",      bg: "linear-gradient(135deg,#635bff,#7a73ff)", text: "#fff", size: 20, weight: 700, tracking: "-0.02em" },
  { name: "PromptPay",   abbr: "PromptPay",   bg: "linear-gradient(135deg,#004f9f,#0066cc)", text: "#fff", size: 13, weight: 600, tracking: "0" },
  { name: "PIX",         abbr: "PIX",         bg: "linear-gradient(135deg,#32bcad,#0ea59c)", text: "#fff", size: 28, weight: 800, tracking: "0.1em" },
  { name: "UPI",         abbr: "UPI",         bg: "linear-gradient(135deg,#097939,#0a9444)", text: "#fff", size: 28, weight: 800, tracking: "0.08em" },
  { name: "SEPA",        abbr: "SEPA",        bg: "linear-gradient(135deg,#003399,#0040bf)", text: "#fff", size: 24, weight: 700, tracking: "0.08em" },
  { name: "BLIK",        abbr: "blik",        bg: "linear-gradient(135deg,#c8102e,#e01535)", text: "#fff", size: 26, weight: 800, tracking: "0" },
  { name: "iDEAL",       abbr: "iDEAL",       bg: "linear-gradient(135deg,#cc0066,#e0007a)", text: "#fff", size: 22, weight: 700, tracking: "0" },
];

export default function PaymentMethods() {
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
    <section ref={ref} className="pm-section">
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 56,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>
            16 networks · 120+ countries
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fafaf7", margin: 0 }}>
            Every payment method.{" "}
            <span style={{ color: "#d97757" }}>One orchestration.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="pm-grid">
          {PAYMENTS.map((p, i) => (
            <div
              key={p.name}
              className="pm-tile"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: p.bg,
                borderRadius: 20,
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? (hovered === i ? "translateY(-6px) scale(1.06)" : "translateY(0) scale(1)")
                  : "translateY(20px) scale(0.92)",
                boxShadow: hovered === i
                  ? "0 20px 40px rgba(0,0,0,0.5), 0 0 32px rgba(217,119,87,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.4)",
                transition: visible
                  ? `opacity 400ms ease ${i * 35}ms, transform 280ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 280ms ease`
                  : "none",
              }}
            >
              {/* Shine */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 55%)",
                pointerEvents: "none",
              }} />
              {/* Name */}
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: p.weight,
                fontSize: p.size,
                letterSpacing: p.tracking,
                color: p.text,
                position: "relative", zIndex: 1,
                userSelect: "none",
                textAlign: "center",
                lineHeight: 1.1,
              }}>
                {p.abbr}
              </span>
              {/* Label below */}
              {p.abbr !== p.name && (
                <span style={{
                  position: "absolute", bottom: 7,
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  color: `rgba(${p.text === "#fff" ? "255,255,255" : "0,0,0"},0.55)`,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  zIndex: 1,
                }}>
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pm-section {
          background: var(--bg);
          padding: 120px 0;
          overflow: hidden;
        }
        .pm-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .pm-grid { grid-template-columns: repeat(5,1fr); gap: 12px; }
        }
        @media (max-width: 640px) {
          .pm-section { padding: 80px 0; }
          .pm-grid { grid-template-columns: repeat(3,1fr); gap: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pm-tile { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
