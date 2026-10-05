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
  { name: "Apple Pay",  bg: "#1a1a1a" },
  { name: "Google Pay", bg: "#FFFFFF", dark: true },
  { name: "PayPal",     bg: "#003087" },
  { name: "Stripe",     bg: "#635BFF" },
];

// ── Icon badge logos (white on color, or dark for light-bg brands) ────────────
const APM_ICONS: Record<string, React.ReactElement> = {

  "Alipay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="22" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="20" fontWeight="900" fill="white">a</text>
      <path d="M8 27 Q16 24 24 27" stroke="white" strokeWidth="2"
        fill="none" strokeLinecap="round"/>
    </svg>
  ),

  "WeChat Pay": (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="17" height="12" rx="6" fill="white"/>
      <polygon points="4,16 3,21 12,16" fill="white"/>
      <rect x="11" y="13" width="16" height="10" rx="5" fill="white" fillOpacity="0.6"/>
      <polygon points="24,23 27,27 19,23" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  "PayPay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="14" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="11" fontWeight="900" fill="white">Pay</text>
      <text x="16" y="25" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="11" fontWeight="900" fill="white">Pay</text>
    </svg>
  ),

  "GrabPay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="13" fontWeight="900" fill="white">Grab</text>
    </svg>
  ),

  "GCash": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="19" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="17" fontWeight="900" fill="white">G</text>
      <text x="16" y="27" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="7" fontWeight="700" fill="white">Cash</text>
    </svg>
  ),

  "OVO": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="15" fontWeight="900" fill="white">OVO</text>
    </svg>
  ),

  "DANA": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="900" fill="white">dana</text>
    </svg>
  ),

  "TrueMoney": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="17" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="900" fill="white">True</text>
      <text x="16" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="7.5" fontWeight="600" fill="white">Money</text>
    </svg>
  ),

  "MoMo": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="14" fontWeight="900" fill="white">MoMo</text>
    </svg>
  ),

  "Paytm": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="12" fontWeight="900" fill="white">Paytm</text>
    </svg>
  ),

  "Kakao Pay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="17" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="10" fontWeight="900" fill="#3C1E1E">Kakao</text>
      <text x="16" y="26" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="10" fontWeight="700" fill="#3C1E1E">Pay</text>
    </svg>
  ),

  "PromptPay": (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M19 5L10 17H16L13 27L23 14H17L19 5Z" fill="white"/>
    </svg>
  ),

  "Apple Pay": (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M17.5 6C17.5 6 16 4 17 2.5C18 1 20 2 19.5 4C19 5.5 17.5 6 17.5 6Z" fill="white"/>
      <path d="M16.5 7C14 7 11.5 8.5 10.5 12C9.5 15.5 10 20 12 22.5C13 24 14 25 15.5 25C16.5 25 17 24.5 18 24.5C19 24.5 19.5 25 20.5 25C22 25 23 24 24.5 22.5C25.5 21 26 18.5 25 16.5C24 14.5 22 13.5 20.5 13.5C19.5 13.5 19 14 18 13.5C17 13 16 11 13.5 10.5C14.5 8.5 15.5 7 16.5 7Z" fill="white"/>
    </svg>
  ),

  "Google Pay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="22" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="20" fontWeight="900" fill="#4285F4">G</text>
    </svg>
  ),

  "PayPal": (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M10 6H17C19.5 6 21 8 21 10.5C21 13 19.5 15 17 15H14L12.5 22H9L10 6Z" fill="white"/>
      <path d="M13 10H20C22.5 10 24 12 24 14.5C24 17 22.5 19 20 19H17L15.5 26H12L13 10Z" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  "Stripe": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="11" fontWeight="800" fontStyle="italic" fill="white">stripe</text>
    </svg>
  ),
};

// Doubled for seamless loop
const DOUBLED = [...APMS, ...APMS];

// ── Square App-Icon Tile ──────────────────────────────────────────────────────
function APMTile({ apm, highlighted }: { apm: typeof APMS[number]; highlighted: boolean }) {
  return (
    <div style={{
      aspectRatio: "1",
      background: highlighted ? "#fef5f0" : "#ffffff",
      borderRadius: "14px",
      border: highlighted ? "1.5px solid #d97757" : "1px solid #e5e5e7",
      boxShadow: highlighted
        ? "0 0 10px rgba(217,119,87,0.3), 0 2px 6px rgba(0,0,0,0.08)"
        : "0 1px 4px rgba(0,0,0,0.07)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "8px 4px 7px",
      transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
      flexShrink: 0,
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Brand color icon badge */}
      <div style={{
        width: 42, height: 42, flexShrink: 0,
        borderRadius: "11px",
        background: apm.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 6px rgba(0,0,0,0.15)",
      }}>
        {APM_ICONS[apm.name]}
      </div>

      {/* Brand name */}
      <span style={{
        fontSize: "9px",
        fontWeight: 600,
        color: "#1a1a1a",
        lineHeight: 1,
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingLeft: "2px",
        paddingRight: "2px",
      }}>
        {apm.name}
      </span>
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

      {/* Scrolling icon grid — overflow hidden keeps everything inside the frame */}
      <div style={{
        flex: 1,
        overflow: "hidden",
        padding: "2px 14px 0",
        position: "relative", zIndex: 3,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          animation: "apm-grid-scroll 28s linear infinite",
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
