"use client";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const GOLD  = "#d97757";  // Brand accent (was gold, now terracotta)
const CREAM = "#1a0f0a";

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

/* ─── Tile 1: Gold Credit Card ───────────────────────────────────────────── */
const CARD_NUMBER = "5425 2334 9821 4716";

function CardAnim() {
  const [typed, setTyped] = useState(0);  // chars typed so far
  const [step, setStep]   = useState(0);  // 0: typing, 1: name, 2: expiry, 3: logo

  useEffect(() => {
    let cancelled = false;
    async function run() {
      while (!cancelled) {
        // Reset
        setTyped(0);
        setStep(0);
        await delay(400);

        // Type card number character-by-character
        for (let i = 1; i <= CARD_NUMBER.length; i++) {
          if (cancelled) return;
          setTyped(i);
          // Pause slightly on spaces for natural rhythm
          await delay(CARD_NUMBER[i - 1] === " " ? 160 : 85);
        }
        await delay(400);
        if (cancelled) return;

        // Reveal cardholder
        setStep(1);
        await delay(350);
        if (cancelled) return;

        // Reveal expiry
        setStep(2);
        await delay(300);
        if (cancelled) return;

        // Reveal Mastercard logo
        setStep(3);
        await delay(2600);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      {/* Card wrapper — sway animation */}
      <div style={{
        width: 230, height: 144, borderRadius: 15,
        background: "linear-gradient(135deg, #d4af37 0%, #b8860b 28%, #daa520 58%, #c9a227 100%)",
        position: "relative", overflow: "hidden",
        boxShadow: "0 10px 28px rgba(0,0,0,0.55), 0 2px 8px rgba(217,119,87,0.35), inset 0 1px 0 rgba(26,15,10,0.4)",
        animation: "card-sway 8s ease-in-out infinite",
        flexShrink: 0,
      }}>
        {/* Metallic overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          background: "linear-gradient(130deg, rgba(26,15,10,0.18) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)",
          pointerEvents: "none",
        }} />

        {/* Shine sweep */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "45%",
            background: "linear-gradient(90deg, transparent, rgba(26,15,10,0.32), transparent)",
            transform: "skewX(-12deg)",
            animation: "card-shine 5s ease-in-out 0.8s infinite",
          }} />
        </div>

        {/* EMV Chip */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          width: 34, height: 26, borderRadius: 4,
          background: "linear-gradient(135deg, #c8a825 0%, #9c7a1e 50%, #c8a825 100%)",
          border: "1px solid rgba(0,0,0,0.25)",
          boxShadow: "inset 0 1px 0 rgba(26,15,10,0.28)",
          overflow: "hidden",
        }}>
          {[8, 14, 20].map(y => (
            <div key={y} style={{ position: "absolute", top: y, left: 3, right: 3, height: 1, background: "rgba(0,0,0,0.25)" }} />
          ))}
          {[9, 17, 25].map(x => (
            <div key={x} style={{ position: "absolute", left: x, top: 3, bottom: 3, width: 1, background: "rgba(0,0,0,0.2)" }} />
          ))}
        </div>

        {/* Contactless */}
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 3.5c3 0 5.5 2.5 5.5 5.5S12 14.5 9 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <path d="M9 6.5c1.4 0 2.5 1.1 2.5 2.5S10.4 11.5 9 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            <circle cx="9" cy="9" r="1" fill="white"/>
          </svg>
        </div>

        {/* Card number */}
        <div style={{
          position: "absolute", bottom: 32, left: 14,
          fontFamily: "'JetBrains Mono', 'Inter', monospace",
          fontSize: 13, fontWeight: 600,
          color: "white", letterSpacing: "1.8px",
          textShadow: "0 1px 2px rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center",
        }}>
          <span>{CARD_NUMBER.slice(0, typed)}</span>
          {typed < CARD_NUMBER.length && (
            <span style={{
              display: "inline-block",
              width: 1.5, height: 14,
              marginLeft: 2,
              background: "white",
              animation: "card-cursor-blink 0.6s step-end infinite",
              boxShadow: "0 0 4px rgba(26,15,10,0.6)",
            }} />
          )}
        </div>

        {/* Cardholder */}
        <div style={{
          position: "absolute", bottom: 11, left: 14,
          fontFamily: "'Inter', sans-serif", fontSize: 8.5, fontWeight: 600,
          color: "rgba(26,15,10,0.92)", letterSpacing: "1.4px",
          textTransform: "uppercase",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 350ms ease, transform 350ms ease",
        }}>
          ELLIE MAYER
        </div>

        {/* Expiry */}
        <div style={{
          position: "absolute", bottom: 11, left: "58%",
          fontFamily: "'Inter', sans-serif", fontSize: 8.5, fontWeight: 600,
          color: "rgba(26,15,10,0.92)", letterSpacing: "1px",
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 350ms ease, transform 350ms ease",
        }}>
          12/28
        </div>

        {/* Mastercard */}
        <div style={{
          position: "absolute", bottom: 9, right: 12,
          opacity: step >= 3 ? 1 : 0, transition: "opacity 400ms ease",
        }}>
          <svg viewBox="0 0 36 24" width="34" height="22" aria-hidden="true">
            <circle cx="13" cy="12" r="10" fill="#EB001B" opacity="0.92"/>
            <circle cx="23" cy="12" r="10" fill="#F79E1B" opacity="0.92"/>
            <path d="M18 4.76a10 10 0 0 1 0 14.48A10 10 0 0 1 18 4.76z" fill="#FF5F00"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Tile 2: Routing log (transaction cascade) ────────────────────────── */
type RouteState = "pending" | "trying" | "declined" | "approved";
const ACQUIRERS = [
  { name: "Stripe",   initials: "S", color: "#635bff" },
  { name: "Adyen",    initials: "A", color: "#0abf53" },
  { name: "Worldpay", initials: "W", color: "#00a6e4" },
];

function RoutingAnim() {
  const [states, setStates] = useState<RouteState[]>(["pending", "pending", "pending"]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      while (!cancelled) {
        // Reset
        setStates(["pending", "pending", "pending"]);
        await delay(500);

        // Try Stripe
        setStates(["trying", "pending", "pending"]);
        await delay(900);
        setStates(["declined", "pending", "pending"]);
        await delay(500);

        // Try Adyen
        setStates(["declined", "trying", "pending"]);
        await delay(900);
        setStates(["declined", "declined", "pending"]);
        await delay(500);

        // Try Worldpay — SUCCESS
        setStates(["declined", "declined", "trying"]);
        await delay(900);
        setStates(["declined", "declined", "approved"]);
        await delay(2400);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "stretch", justifyContent: "center",
    }}>
      <div style={{
        width: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* Header bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(217,119,87,0.1)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.15em",
            color: "rgba(26,15,10,0.5)",
            fontWeight: 600,
          }}>TXN-4242</span>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.1em",
            color: GOLD, fontWeight: 700,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: GOLD,
              animation: "hiw-pulse-dot 1.5s ease-in-out infinite",
            }} />
            LIVE
          </span>
        </div>

        {/* Attempts list */}
        {ACQUIRERS.map((acq, i) => {
          const state = states[i];
          if (state === "pending") {
            return (
              <div key={i} style={{
                height: 28, marginBottom: 6,
                opacity: 0.15,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 4,
                  background: "rgba(245,239,230,0.08)",
                }} />
                <div style={{
                  flex: 1, height: 8, borderRadius: 2,
                  background: "rgba(245,239,230,0.05)",
                }} />
              </div>
            );
          }

          const isApproved = state === "approved";
          const isDeclined = state === "declined";
          const isTrying = state === "trying";
          const statusColor = isApproved ? "#10b981" : isDeclined ? "#ef4444" : GOLD;
          const statusText = isApproved ? "APPROVED" : isDeclined ? "DECLINED" : "ROUTING";

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 6, height: 28,
              padding: "4px 6px",
              borderRadius: 6,
              background: isApproved ? "rgba(16,185,129,0.08)" : isDeclined ? "rgba(239,68,68,0.04)" : "rgba(217,119,87,0.08)",
              border: `1px solid ${isApproved ? "rgba(16,185,129,0.25)" : isDeclined ? "rgba(239,68,68,0.15)" : "rgba(217,119,87,0.25)"}`,
              animation: "hiw-slide-in 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              transition: "background 300ms ease, border-color 300ms ease",
            }}>
              {/* Acquirer badge */}
              <div style={{
                width: 20, height: 20, borderRadius: 4,
                background: acq.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 900, color: "white",
                fontFamily: "Inter, sans-serif",
                flexShrink: 0,
                opacity: isDeclined ? 0.5 : 1,
                transition: "opacity 300ms ease",
              }}>
                {acq.initials}
              </div>
              {/* Name */}
              <span style={{
                flex: 1,
                fontFamily: "Inter, sans-serif",
                fontSize: 11, fontWeight: 600,
                color: isDeclined ? "rgba(245,239,230,0.45)" : "#1a0f0a",
                textDecoration: isDeclined ? "line-through" : "none",
                transition: "color 300ms ease",
              }}>
                {acq.name}
              </span>
              {/* Status icon + text */}
              <div style={{
                display: "flex", alignItems: "center", gap: 4,
              }}>
                {isTrying && (
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    border: `1.5px solid ${GOLD}`,
                    borderTopColor: "transparent",
                    animation: "hiw-spin 0.7s linear infinite",
                  }} />
                )}
                {isDeclined && (
                  <span style={{
                    fontSize: 11, color: statusColor, fontWeight: 900, lineHeight: 1,
                  }}>✗</span>
                )}
                {isApproved && (
                  <span style={{
                    fontSize: 11, color: statusColor, fontWeight: 900, lineHeight: 1,
                  }}>✓</span>
                )}
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8, fontWeight: 700,
                  color: statusColor, letterSpacing: "0.1em",
                }}>{statusText}</span>
              </div>
            </div>
          );
        })}

        {/* Footer: total time */}
        <div style={{
          marginTop: 8, paddingTop: 8,
          borderTop: "1px solid rgba(217,119,87,0.1)",
          display: "flex", justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "rgba(26,15,10,0.5)",
        }}>
          <span>ELAPSED</span>
          <span style={{ color: GOLD, fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Tile 3: Transaction saved by CascadX ─────────────────────────────── */
const PART_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function RouteAnim() {
  const [phase, setPhase] = useState(0);
  // 0: idle, 1: check appears, 2: text appears, 3: amount counts up, 4: particles

  useEffect(() => {
    let cancelled = false;
    async function run() {
      while (!cancelled) {
        setPhase(0); await delay(400);
        if (cancelled) return;
        setPhase(1); await delay(500);
        if (cancelled) return;
        setPhase(2); await delay(450);
        if (cancelled) return;
        setPhase(3); await delay(400);
        if (cancelled) return;
        setPhase(4); await delay(3600);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      width: "100%", height: "100%",
      gap: 14, position: "relative",
    }}>
      {/* Particles — burst outward on success */}
      {phase >= 4 && PART_ANGLES.map((ang, i) => {
        const rad = (ang * Math.PI) / 180;
        const colors = ["#10b981", "#34d399", GOLD, "#10b981"];
        return (
          <div key={i} style={{
            position: "absolute", top: "40%", left: "50%",
            width: 6, height: 6, borderRadius: "50%",
            background: colors[i % colors.length],
            animation: `route-particle 0.85s ease-out ${i * 50}ms both`,
            "--dx": `${Math.cos(rad) * 70}px`,
            "--dy": `${Math.sin(rad) * 70}px`,
            boxShadow: "0 0 8px currentColor",
          } as CSSProperties} />
        );
      })}

      {/* Big green checkmark circle */}
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 40px rgba(16,185,129,0.35), 0 10px 30px rgba(16,185,129,0.2)",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "scale(1)" : "scale(0.4)",
        transition: "opacity 300ms ease, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
          <path d="M8 22 L18 32 L34 12"
            stroke="white" strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: phase >= 1 ? 0 : 50,
              transition: "stroke-dashoffset 500ms ease 150ms",
            }}
          />
        </svg>
      </div>

      {/* Main message */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 350ms ease, transform 350ms ease",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 16, fontWeight: 800,
          color: "#1a0f0a", lineHeight: 1.2,
          letterSpacing: "-0.01em",
          marginBottom: 6,
        }}>
          Transaction saved
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9, fontWeight: 600,
          color: GOLD, letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          by CascadX
        </div>
      </div>

      {/* Amount recovered */}
      <div style={{
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 350ms ease, transform 350ms ease",
        padding: "6px 14px",
        background: "rgba(16,185,129,0.1)",
        border: "1px solid rgba(16,185,129,0.3)",
        borderRadius: 100,
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#10b981",
          animation: "hiw-pulse-dot 1.6s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
          color: "#10b981", letterSpacing: "0.5px",
        }}>
          +$1,240 recovered
        </span>
      </div>
    </div>
  );
}

/* ─── Connector ──────────────────────────────────────────────────────────── */
function Connector({ animDelay = "0s" }: { animDelay?: string }) {
  return (
    <div className="hiw-con">
      <div className="hiw-con-line" />
      <div className="hiw-con-dot" style={{ animationDelay: animDelay }} />
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */
const TILES = [
  {
    key:   "attempt",
    text:  "Customer attempts to pay.",
    anim:  <CardAnim />,
  },
  {
    key:   "cascade",
    text:  "CascadX finds the best route.",
    anim:  <RoutingAnim />,
  },
  {
    key:   "recover",
    text:  "Transaction is saved.",
    anim:  <RouteAnim />,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="hiw-s">
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 32,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}>
          <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(26px, 3.5vw, 40px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#1a0f0a",
          margin: 0,
        }}>
            Declined once.{" "}
            <span style={{ color: "#d97757", fontStyle: "italic", fontWeight: 400 }}>Recovered.</span>
          </h2>
          <p style={{
            marginTop: 20, color: "rgba(26,15,10,0.6)",
            fontSize: "clamp(15px, 1.5vw, 18px)", maxWidth: 580,
            marginLeft: "auto", marginRight: "auto",
            lineHeight: 1.55,
          }}>
            When a payment fails, CascadX automatically routes it to the best alternative acquirer — before your customer notices.
          </p>
        </div>

        {/* Flow */}
        <div className="hiw-flow">
          {TILES.flatMap((tile, i) => {
            const tileEl = (
              <div key={tile.key} className="hiw-tile"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 500ms ease ${i * 110}ms, transform 500ms ease ${i * 110}ms`,
                  background: "linear-gradient(135deg, #e8e4dc 0%, #d8d2c6 50%, #e5e0d5 100%)",
                  boxShadow: i === 0
                    ? "0 20px 50px -15px rgba(26,15,10,0.1), 0 0 60px rgba(217,119,87,0.06), inset 0 0 0 1px rgba(217,119,87,0.12)"
                    : i === 1
                    ? "0 20px 50px -15px rgba(26,15,10,0.1), 0 0 60px rgba(217,119,87,0.1), inset 0 0 0 1px rgba(217,119,87,0.18)"
                    : "0 20px 50px -15px rgba(26,15,10,0.1), 0 0 60px rgba(16,185,129,0.08), inset 0 0 0 1px rgba(16,185,129,0.18)",
                }}
              >
                {/* Animation area */}
                <div className="hiw-anim">{tile.anim}</div>

                {/* Text */}
                <div className="hiw-text">
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    color: "#1a0f0a",
                    textAlign: "center",
                  }}>
                    {tile.text}
                  </div>
                </div>

                {/* Border — controlled by CSS hover */}
                <div className="hiw-border" aria-hidden="true" />
              </div>
            );

            const conEl = i < TILES.length - 1
              ? <Connector key={`c-${i}`} animDelay={`${i * 1.25}s`} />
              : null;

            return conEl ? [tileEl, conEl] : [tileEl];
          })}
        </div>
      </div>

      <style>{`
        .hiw-s {
          background: #faf8f2;
          padding: 60px 0 40px;
          overflow: hidden;
        }

        /* ── Flow row ─────────────────────────────── */
        .hiw-flow {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Tile ─────────────────────────────────── */
        .hiw-tile {
          width: 280px;
          height: 340px;
          border-radius: 24px;
          padding: 24px 24px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          overflow: hidden;
          cursor: default;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease;
          /* Floating feel — subtle animation */
          animation: hiw-tile-float 6s ease-in-out infinite;
        }
        .hiw-tile:nth-child(1) { animation-delay: 0s; }
        .hiw-tile:nth-child(3) { animation-delay: 1.5s; }
        .hiw-tile:nth-child(5) { animation-delay: 3s; }
        @keyframes hiw-tile-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        @media (hover: hover) {
          .hiw-tile:hover {
            transform: translateY(-4px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 50px rgba(217,119,87,0.14),
                        inset 0 1px 0 rgba(26,15,10,0.05);
          }
          .hiw-tile:hover .hiw-border { border-color: rgba(217,119,87,0.35); }
        }

        .hiw-anim {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        .hiw-text {
          flex-shrink: 0;
          padding-top: 20px;
        }
        .hiw-border {
          position: absolute; inset: 0; border-radius: inherit;
          border: 1px solid rgba(217,119,87,0.15);
          pointer-events: none;
          transition: border-color 300ms ease;
        }

        /* ── Connector ────────────────────────────── */
        .hiw-con {
          position: relative;
          width: 44px;
          height: 2px;
          flex-shrink: 0;
        }
        .hiw-con-line {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            90deg,
            rgba(217,119,87,0.3) 0,
            rgba(217,119,87,0.3) 5px,
            transparent 5px,
            transparent 11px
          );
        }
        .hiw-con-dot {
          position: absolute;
          top: 50%; left: -4px;
          width: 8px; height: 8px; margin-top: -4px;
          border-radius: 50%;
          background: ${GOLD};
          box-shadow: 0 0 8px rgba(217,119,87,0.9), 0 0 18px rgba(217,119,87,0.4);
          animation: hiw-dot-travel 2.5s ease-in-out infinite;
        }
        @keyframes hiw-dot-travel {
          0%   { left: -4px;             opacity: 0; }
          10%  {                          opacity: 1; }
          90%  {                          opacity: 1; }
          100% { left: calc(100% - 4px); opacity: 0; }
        }

        /* ── Card animations ──────────────────────── */
        @keyframes card-sway {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg); }
        }
        @keyframes card-shine {
          0%, 55%, 100% { transform: translateX(-220%) skewX(-12deg); }
          68%            { transform: translateX(420%) skewX(-12deg); }
        }

        /* ── Routing log animations ──────────────────── */
        @keyframes card-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes hiw-slide-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes hiw-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hiw-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.8); }
        }

        /* ── Route particles ──────────────────────── */
        @keyframes route-particle {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0; }
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 1000px) {
          .hiw-flow  { flex-wrap: wrap; gap: 16px; }
          .hiw-con   { display: none; }
          .hiw-tile  { width: 240px; height: 300px; }
        }
        @media (max-width: 600px) {
          .hiw-s {
          background: #faf8f2;
          padding: 60px 0 40px;
          overflow: hidden;
        }
          .hiw-flow  { flex-direction: column; align-items: stretch; gap: 14px; }
          .hiw-tile  { width: 100%; height: 300px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hiw-tile  { transition: none !important; }
          .hiw-con-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
