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

// ── Icon badge logos (viewBox 0 0 36 36, drawn for 36×36 badge) ──────────────
// White marks on colored bg; dark marks for light-bg brands (Apple/Google/PayPal)
const APM_ICONS: Record<string, React.ReactElement> = {

  "Alipay": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="24" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="22" fontWeight="900" fill="white">a</text>
      <path d="M9 29 Q18 26 27 29" stroke="white" strokeWidth="2"
        fill="none" strokeLinecap="round"/>
    </svg>
  ),

  "WeChat Pay": (
    <svg viewBox="0 0 36 36" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="19" height="13" rx="6" fill="white"/>
      <polygon points="5,18 3,24 13,18" fill="white"/>
      <rect x="12" y="14" width="17" height="11" rx="5" fill="white" fillOpacity="0.6"/>
      <polygon points="26,25 29,30 20,25" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  "PayPay": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="16" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="900" fill="white">Pay</text>
      <text x="18" y="28" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="900" fill="white">Pay</text>
    </svg>
  ),

  "GrabPay": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="900" fill="white">Grab</text>
    </svg>
  ),

  "GCash": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="18" fontWeight="900" fill="white">G</text>
      <text x="18" y="29" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="7" fontWeight="700" fill="white">Cash</text>
    </svg>
  ),

  "OVO": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="24" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="16" fontWeight="900" fill="white">OVO</text>
    </svg>
  ),

  "DANA": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="15" fontWeight="900" fill="white">dana</text>
    </svg>
  ),

  "TrueMoney": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="19" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="13" fontWeight="900" fill="white">True</text>
      <text x="18" y="28" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="8" fontWeight="600" fill="white">Money</text>
    </svg>
  ),

  "MoMo": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="15" fontWeight="900" fill="white">MoMo</text>
    </svg>
  ),

  "Paytm": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="13" fontWeight="900" fill="white">Paytm</text>
    </svg>
  ),

  "Kakao Pay": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="19" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="11" fontWeight="900" fill="#3C1E1E">Kakao</text>
      <text x="18" y="29" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="11" fontWeight="700" fill="#3C1E1E">Pay</text>
    </svg>
  ),

  "PromptPay": (
    <svg viewBox="0 0 36 36" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M21 6L11 19H18L15 30L26 16H19L21 6Z" fill="white"/>
    </svg>
  ),

  "Apple Pay": (
    <svg viewBox="0 0 36 36" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M19.5 7C19.5 7 18 5 19 3.5C20 2 22 3 21.5 5C21 6.5 19.5 7 19.5 7Z" fill="#111"/>
      <path d="M18.5 8.5C16 8.5 13.5 10 12.5 13.5C11.5 17 12 21 14 23.5C15 25 16 26 17.5 26C18.5 26 19 25.5 20 25.5C21 25.5 21.5 26 22.5 26C24 26 25 25 26.5 23.5C27.5 22 28 19.5 27 17.5C26 15.5 24 14.5 22.5 14.5C21.5 14.5 21 15 20 14.5C19 14 18 12 15.5 11.5C16.5 9.5 17.5 8.5 18.5 8.5Z" fill="#111"/>
    </svg>
  ),

  "Google Pay": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="23" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="20" fontWeight="900" fill="#4285F4">G</text>
    </svg>
  ),

  "PayPal": (
    <svg viewBox="0 0 36 36" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M11 7H18C21 7 23 9 23 12C23 15 21 17 18 17H15L13.5 24H10L11 7Z" fill="#003087"/>
      <path d="M14 11H21C24 11 26 13 26 16C26 19 24 21 21 21H18L16.5 28H13L14 11Z" fill="#009CDE"/>
    </svg>
  ),

  "Stripe": (
    <svg viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
      <text x="18" y="22" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="800" fontStyle="italic" fill="white">stripe</text>
    </svg>
  ),
};

// Doubled for seamless loop
const DOUBLED = [...APMS, ...APMS];

// ── Payment Method Button ─────────────────────────────────────────────────────
function APMButton({ apm, highlighted }: { apm: typeof APMS[number]; highlighted: boolean }) {
  return (
    <div style={{
      height: 60,
      background: highlighted ? "#fef5f0" : "#ffffff",
      borderRadius: "12px",
      border: highlighted ? "1.5px solid #d97757" : "1.5px solid #e5e5e7",
      boxShadow: highlighted
        ? "0 0 10px rgba(217,119,87,0.25), 0 1px 4px rgba(0,0,0,0.06)"
        : "0 1px 3px rgba(0,0,0,0.06)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0 10px",
      transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      flexShrink: 0,
      boxSizing: "border-box",
    }}>
      {/* Colored icon badge */}
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        borderRadius: "10px",
        background: apm.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
      }}>
        {APM_ICONS[apm.name]}
      </div>

      {/* Brand name */}
      <span style={{
        flex: 1,
        fontSize: "12px",
        fontWeight: 600,
        color: "#1a1a1a",
        letterSpacing: "-0.2px",
        lineHeight: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {apm.name}
      </span>

      {/* iOS-style chevron */}
      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M1 1L6 5.5L1 10" stroke="#c7c7cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
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
      setTimeout(() => setHighlightIdx(null), 800);
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
      <div style={{ padding: "10px 14px 6px", flexShrink: 0, position: "relative", zIndex: 5 }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, color: "#8e8e93",
          textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          Select payment method
        </span>
      </div>

      {/* Scrolling button grid */}
      <div style={{
        flex: 1, overflow: "hidden",
        padding: "2px 12px 0",
        position: "relative", zIndex: 3,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          animation: "apm-grid-scroll 28s linear infinite",
          paddingBottom: "8px",
        }}>
          {DOUBLED.map((apm, i) => (
            <APMButton
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
