"use client";
import React, { useEffect, useState } from "react";

// ── APM data ──────────────────────────────────────────────────────────────────
const APMS: Array<{ name: string; bg: string; dark?: boolean }> = [
  { name: "Alipay",     bg: "#1677FF" },
  { name: "WeChat Pay", bg: "#07C160" },
  { name: "PayPay",     bg: "#FF0033" },
  { name: "GrabPay",    bg: "#00B14F" },
  { name: "GCash",      bg: "#007DFE" },
  { name: "OVO",        bg: "#4C3494" },
  { name: "DANA",       bg: "#118EEA" },
  { name: "TrueMoney",  bg: "#FF6B00" },
  { name: "MoMo",       bg: "#A50064" },
  { name: "Paytm",      bg: "#002E6E" },
  { name: "Kakao Pay",  bg: "#FEE500", dark: true },
  { name: "PromptPay",  bg: "#003D7E" },
  { name: "Apple Pay",  bg: "#FFFFFF", dark: true },
  { name: "Google Pay", bg: "#FFFFFF", dark: true },
  { name: "PayPal",     bg: "#FFFFFF", dark: true },
  { name: "Stripe",     bg: "#635BFF" },
];

// ── App-icon logos (viewBox 0 0 40 40) ───────────────────────────────────────
const APM_LOGOS: Record<string, React.ReactElement> = {

  // Bold "a" + swoosh underline — Alipay's lettermark
  "Alipay": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="24" fontWeight="900" fill="white">a</text>
      <path d="M11 32 Q20 28.5 29 32" stroke="white" strokeWidth="2.5"
        fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // Two overlapping speech bubbles — WeChat's iconic mark
  "WeChat Pay": (
    <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" aria-hidden="true">
      <rect x="3" y="7" width="22" height="15" rx="7" fill="white"/>
      <polygon points="6,22 4,29 15,22" fill="white"/>
      <rect x="14" y="17" width="20" height="13" rx="6" fill="white" fillOpacity="0.6"/>
      <polygon points="30,30 34,36 23,30" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  // Stacked "Pay / Pay" wordmark
  "PayPay": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="19" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="900" fill="white">Pay</text>
      <text x="20" y="31" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="900" fill="white">Pay</text>
    </svg>
  ),

  // Bold "Grab" wordmark
  "GrabPay": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="25" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="16" fontWeight="900" fill="white">Grab</text>
    </svg>
  ),

  // Large "G" + small "Cash"
  "GCash": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="22" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="20" fontWeight="900" fill="white">G</text>
      <text x="20" y="31" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="8" fontWeight="700" fill="white">Cash</text>
    </svg>
  ),

  // Bold "OVO" on purple
  "OVO": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="18" fontWeight="900" fill="white">OVO</text>
    </svg>
  ),

  // Lowercase "dana" wordmark
  "DANA": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="17" fontWeight="900" fill="white">dana</text>
    </svg>
  ),

  // "True / Money" stacked
  "TrueMoney": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="15" fontWeight="900" fill="white">True</text>
      <text x="20" y="31" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="9" fontWeight="600" fill="white">Money</text>
    </svg>
  ),

  // Bold "MoMo" wordmark on pink
  "MoMo": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="17" fontWeight="900" fill="white">MoMo</text>
    </svg>
  ),

  // "Paytm" wordmark on dark blue
  "Paytm": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="15" fontWeight="900" fill="white">Paytm</text>
    </svg>
  ),

  // Dark "Kakao / Pay" on yellow
  "Kakao Pay": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="13" fontWeight="900" fill="#3C1E1E">Kakao</text>
      <text x="20" y="32" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="700" fill="#3C1E1E">Pay</text>
    </svg>
  ),

  // Lightning bolt — PromptPay's transfer symbol
  "PromptPay": (
    <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" aria-hidden="true">
      <path d="M24 8L12 22H20L16 32L28 18H20L24 8Z" fill="white"/>
    </svg>
  ),

  // Apple silhouette + "Pay"
  "Apple Pay": (
    <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" aria-hidden="true">
      <path d="M22 8C22 8 20 5.5 21.5 3.5C23 1.5 25.5 3 24 5.5C23 7 22 8 22 8Z" fill="#111"/>
      <path d="M20.5 9.5C17 9.5 13.5 11.5 12 15.5C10.5 19.5 11 25 13.5 28C15 30 16.5 31 18.5 31C19.5 31 20.5 30.5 21.5 30.5C22.5 30.5 23.5 31 24.5 31C26.5 31 28 30 29.5 28C31 26 31.5 22.5 30 19.5C28.5 16.5 26 15.5 24 15.5C23 15.5 22 16 21 15.5C20 15 18.5 12.5 15.5 12C17 10.5 18.5 9.5 20.5 9.5Z" fill="#111"/>
      <text x="20" y="38" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="7" fontWeight="600" fill="#111">Pay</text>
    </svg>
  ),

  // Google blue "G" + "Pay"
  "Google Pay": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="22" fontWeight="900" fill="#4285F4">G</text>
      <text x="20" y="33" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="8" fontWeight="600" fill="#5f6368">Pay</text>
    </svg>
  ),

  // PP double-P overlap mark — PayPal's iconic mark
  "PayPal": (
    <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" aria-hidden="true">
      <path d="M13 8H21C24.5 8 26.5 10.5 26.5 13.5C26.5 17 24 19.5 21 19.5H17L15.5 27H11L13 8Z"
        fill="#003087"/>
      <path d="M16.5 13H24.5C28 13 30 15.5 30 18.5C30 22 27.5 24.5 24.5 24.5H20.5L19 32H14.5L16.5 13Z"
        fill="#009CDE"/>
    </svg>
  ),

  // Italic "stripe" wordmark on purple
  "Stripe": (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <text x="20" y="25" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="800" fontStyle="italic" fill="white">stripe</text>
    </svg>
  ),
};

// Doubled for seamless loop
const DOUBLED = [...APMS, ...APMS];

// ── App-Icon Tile ─────────────────────────────────────────────────────────────
function APMTile({ apm, highlighted }: { apm: typeof APMS[number]; highlighted: boolean }) {
  return (
    <div style={{
      background: apm.bg,
      borderRadius: "16px",
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: highlighted ? "2px solid #d97757" : "none",
      outlineOffset: "1px",
      boxShadow: highlighted
        ? "0 0 14px rgba(217,119,87,0.5), 0 3px 10px rgba(0,0,0,0.2)"
        : "0 2px 8px rgba(0,0,0,0.18)",
      transition: "outline 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* iOS icon top-gloss highlight */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: "45%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
        borderRadius: "0 0 50% 50%",
        pointerEvents: "none", zIndex: 2,
      }}/>
      {/* Logo */}
      <div style={{
        width: "68%", height: "68%",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 3,
      }}>
        {APM_LOGOS[apm.name]}
      </div>
    </div>
  );
}

// ── PhoneScreen ───────────────────────────────────────────────────────────────
export default function PhoneScreen() {
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fire = () => {
      const idx = Math.floor(Math.random() * APMS.length);
      setHighlightIdx(idx);
      setTimeout(() => setHighlightIdx(null), 900);
      timer = setTimeout(fire, 5000 + Math.random() * 3000);
    };
    const init = setTimeout(() => fire(), 2200);
    return () => { clearTimeout(init); clearTimeout(timer); };
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#f2f2f7",
      borderRadius: "inherit",
      display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      overflow: "hidden",
      position: "relative", boxSizing: "border-box",
    }}>
      {/* Glass reflection */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(138deg, rgba(255,255,255,0.09) 0%, transparent 52%)",
        pointerEvents: "none", zIndex: 50, borderRadius: "inherit",
      }}/>

      {/* Top bar */}
      <div style={{
        height: 56, background: "#f8f8f8",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "0 14px 10px",
        flexShrink: 0, position: "relative", zIndex: 5,
      }}>
        <span style={{ fontSize: "14px", color: "#007AFF", lineHeight: 1 }}>←</span>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", letterSpacing: "-0.3px", lineHeight: 1 }}>
          Checkout
        </span>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827", lineHeight: 1 }}>
          $129.00
        </span>
      </div>

      {/* Section heading */}
      <div style={{ padding: "12px 14px 6px", flexShrink: 0, position: "relative", zIndex: 5 }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, color: "#6b7280",
          textTransform: "uppercase", letterSpacing: "0.7px",
        }}>
          Select payment method
        </span>
      </div>

      {/* Scrolling icon grid */}
      <div style={{
        flex: 1, overflow: "hidden",
        padding: "2px 12px 0",
        position: "relative", zIndex: 3,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "10px",
          animation: "apm-grid-scroll 20s linear infinite",
          paddingBottom: "10px",
        }}>
          {DOUBLED.map((apm, i) => (
            <APMTile
              key={i}
              apm={apm}
              highlighted={highlightIdx === i % APMS.length}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        padding: "10px 12px 12px", flexShrink: 0,
        background: "#f8f8f8",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        position: "relative", zIndex: 5,
      }}>
        <div style={{
          width: "100%", height: 50,
          background: "#d97757", borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: "13px", fontWeight: 700, letterSpacing: "-0.2px",
        }}>
          Continue · $129.00
        </div>
      </div>
    </div>
  );
}
