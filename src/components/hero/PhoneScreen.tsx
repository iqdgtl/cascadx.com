"use client";
import React, { useEffect, useState } from "react";

// ─── Scene durations (ms) ─────────────────────────────────────────────────────
const SCENE_DURATIONS = [10000, 8000, 4000, 4000];

// ─── Confetti (16 particles) ──────────────────────────────────────────────────
const CONFETTI = [
  { dx: -45, dy: -60, size: 5, delay: 0,   color: "#d97757" },
  { dx:  45, dy: -60, size: 5, delay: 40,  color: "#d97757" },
  { dx:   0, dy: -72, size: 4, delay: 20,  color: "#b35a3e" },
  { dx: -62, dy: -38, size: 3, delay: 80,  color: "#d97757" },
  { dx:  62, dy: -38, size: 3, delay: 100, color: "#d97757" },
  { dx: -28, dy: -76, size: 4, delay: 60,  color: "#e8a87c" },
  { dx:  28, dy: -76, size: 3, delay: 120, color: "#d97757" },
  { dx: -70, dy: -22, size: 3, delay: 140, color: "#b35a3e" },
  { dx:  70, dy: -22, size: 2, delay: 160, color: "#d97757" },
  { dx: -52, dy: -68, size: 3, delay: 50,  color: "#e8a87c" },
  { dx:  52, dy: -68, size: 3, delay: 70,  color: "#e8a87c" },
  { dx: -18, dy: -82, size: 2, delay: 90,  color: "#d97757" },
  { dx:  18, dy: -82, size: 2, delay: 110, color: "#b35a3e" },
  { dx: -78, dy: -8,  size: 3, delay: 130, color: "#d97757" },
  { dx:  78, dy: -8,  size: 3, delay: 150, color: "#e8a87c" },
  { dx:   0, dy: -86, size: 2, delay: 170, color: "#b35a3e" },
];

// ─── Brand Logo Components ────────────────────────────────────────────────────

function VisaLogo() {
  return (
    <div style={{ width: 34, height: 22, borderRadius: 4, background: "#1A1F71", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0 }}>
      <svg viewBox="0 0 34 14" width="30" height="11">
        <text x="17" y="11" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="13" fontWeight="900" fontStyle="italic" fill="white">VISA</text>
      </svg>
    </div>
  );
}

function MastercardLogo() {
  return (
    <div style={{ width: 34, height: 22, borderRadius: 4, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0, overflow: "hidden" }}>
      <svg viewBox="0 0 24 16" width="22" height="15">
        <circle cx="9"  cy="8" r="8" fill="#EB001B"/>
        <circle cx="15" cy="8" r="8" fill="#F79E1B" opacity="0.9"/>
        <path d="M12 1.7A8 8 0 0 1 12 14.3 8 8 0 0 1 12 1.7z" fill="#FF5F00"/>
      </svg>
    </div>
  );
}

function AmexLogo() {
  return (
    <div style={{ width: 34, height: 22, borderRadius: 4, background: "#006FCF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0 }}>
      <svg viewBox="0 0 34 14" width="30" height="11">
        <text x="17" y="10.5" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="9" fontWeight="800" fill="white" letterSpacing="0.5">AMEX</text>
      </svg>
    </div>
  );
}

function UnionPayLogo() {
  return (
    <div style={{ width: 34, height: 22, borderRadius: 4, display: "flex", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0 }}>
      <div style={{ flex: 1, background: "#E31837", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 17 14" width="17" height="14"><text x="8.5" y="11" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="8" fontWeight="800" fill="white">UP</text></svg>
      </div>
      <div style={{ flex: 1, background: "#00447C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 17 14" width="17" height="14"><text x="8.5" y="11" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="7" fontWeight="600" fill="white">银联</text></svg>
      </div>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#f0f5ff", border: "1px solid #c8dcf5", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 9px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "#003087" }}>Pay</span>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "#009cde" }}>Pal</span>
    </div>
  );
}

function ApplePayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 9px", gap: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.35)", flexShrink: 0 }}>
      <svg viewBox="0 0 10 12" width="8" height="10" fill="white" aria-hidden="true">
        <path d="M7.5 0C7.5 1.5 6.5 2.3 5.5 2.3 5.5 1 6.5.2 7.5 0z"/>
        <path d="M5.2 3.2C3.2 3.2 1 4.8 1 7.5 1 10.5 3 13 5 13c.8 0 1.5-.5 2.2-.5.7 0 1.4.5 2.2.5C11.4 13 12 10.5 12 7.5c0-2.4-1.7-4-3-4-.8 0-1.5.5-2.2.5-.7 0-1.3-.8-1.6-.8z"/>
      </svg>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 10, fontWeight: 600, color: "white" }}>Pay</span>
    </div>
  );
}

function GooglePayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#fff", border: "1px solid #e0ddd8", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", gap: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.10)", flexShrink: 0 }}>
      <svg viewBox="0 0 10 12" width="9" height="10" aria-hidden="true"><text x="5" y="10" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#4285F4">G</text></svg>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 10, fontWeight: 600, color: "#5f5752" }}>Pay</span>
    </div>
  );
}

function AlipayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#1677FF", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 9px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>Alipay</span>
    </div>
  );
}

function WeChatPayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#07C160", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 7px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 9, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>WeChat Pay</span>
    </div>
  );
}

function GrabPayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#00B14F", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>GrabPay</span>
    </div>
  );
}

function GCashLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#007DFE", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>GCash</span>
    </div>
  );
}

function PayPayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#FF0033", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>PayPay</span>
    </div>
  );
}

function OVOLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#4C3494", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 9px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>OVO</span>
    </div>
  );
}

function DANALogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#118EEA", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 9px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>dana</span>
    </div>
  );
}

function TrueMoneyLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 7px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 8.5, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>TrueMoney</span>
    </div>
  );
}

function MoMoLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#A50064", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>MoMo</span>
    </div>
  );
}

function PaytmLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#002E6E", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>Paytm</span>
    </div>
  );
}

function KakaoPayLogo() {
  return (
    <div style={{ height: 22, borderRadius: 4, background: "#FEE500", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.12)", flexShrink: 0 }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 10, fontWeight: 800, color: "#3C1E1E" }}>Kakao Pay</span>
    </div>
  );
}

// ─── 15-item payment method list (doubled for seamless scroll) ────────────────
const PAY_METHODS_FULL: Array<{ id: string; name: string; logos: React.ReactNode }> = [
  {
    id: "credit_card", name: "Credit card",
    logos: (
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        <VisaLogo /><MastercardLogo /><AmexLogo /><UnionPayLogo />
      </div>
    ),
  },
  { id: "paypal",     name: "PayPal",     logos: <PayPalLogo /> },
  { id: "apple_pay",  name: "Apple Pay",  logos: <ApplePayLogo /> },
  { id: "google_pay", name: "Google Pay", logos: <GooglePayLogo /> },
  { id: "alipay",     name: "Alipay",     logos: <AlipayLogo /> },
  { id: "wechat",     name: "WeChat Pay", logos: <WeChatPayLogo /> },
  { id: "grabpay",    name: "GrabPay",    logos: <GrabPayLogo /> },
  { id: "gcash",      name: "GCash",      logos: <GCashLogo /> },
  { id: "paypay",     name: "PayPay",     logos: <PayPayLogo /> },
  { id: "ovo",        name: "OVO",        logos: <OVOLogo /> },
  { id: "dana",       name: "DANA",       logos: <DANALogo /> },
  { id: "truemoney",  name: "TrueMoney",  logos: <TrueMoneyLogo /> },
  { id: "momo",       name: "MoMo",       logos: <MoMoLogo /> },
  { id: "paytm",      name: "Paytm",      logos: <PaytmLogo /> },
  { id: "kakaopay",   name: "Kakao Pay",  logos: <KakaoPayLogo /> },
];

const PAY_METHODS_DOUBLED = [...PAY_METHODS_FULL, ...PAY_METHODS_FULL];

// ─── Shared components ────────────────────────────────────────────────────────
function TopBar({ left, center, right, processing }: {
  left?: string; center: string; right?: string; processing?: boolean;
}) {
  return (
    <div style={{
      height: 56, background: "#f8f4f1", borderBottom: "1px solid #ede6db",
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      padding: "0 14px 10px", flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, color: "#d97757", lineHeight: 1, minWidth: 20 }}>{left}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: processing ? "#8e7d75" : "#1a1a1a", letterSpacing: "-0.3px", lineHeight: 1 }}>{center}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", lineHeight: 1, minWidth: 40, textAlign: "right" }}>{right}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ padding: "8px 16px 5px", flexShrink: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#6b5d54", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {children}
      </span>
    </div>
  );
}

// ─── SCENE 1: Scrolling payment method list ───────────────────────────────────
function Scene1_PaymentList() {
  const [selected,     setSelected]     = useState<string | null>(null);
  const [tapping,      setTapping]      = useState(false);
  const [scrollPaused, setScrollPaused] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => { setScrollPaused(true); setSelected("credit_card"); }, 6000);
    const t2 = setTimeout(() => setTapping(true),  7000);
    const t3 = setTimeout(() => setTapping(false), 7300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#faf7f4" }}>
      <TopBar left="←" center="Checkout" right="$129.00"/>
      <SectionLabel>Select payment method</SectionLabel>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{
          animation: "payment-list-scroll 27s linear infinite",
          animationDelay: "-14s",
          animationPlayState: scrollPaused ? "paused" : "running",
          willChange: "transform",
        }}>
          {PAY_METHODS_DOUBLED.map((method, i) => {
            const isSelected = selected === method.id && i >= PAY_METHODS_FULL.length;
            const isTapping  = tapping && isSelected;
            return (
              <div key={i} style={{
                height: 56, display: "flex", alignItems: "center",
                paddingLeft: isSelected ? 13 : 16, paddingRight: 16, gap: 12,
                background: isSelected ? "#fef9f3" : "white",
                borderBottom: "1px solid #ede6db",
                borderLeft: isSelected ? "3px solid #d97757" : "3px solid transparent",
                transform: isTapping ? "scale(0.99)" : "scale(1)",
                transition: "background 350ms ease, border-color 350ms ease, transform 100ms ease",
                boxSizing: "border-box",
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${isSelected ? "#d97757" : "#c7c7cc"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 350ms ease", boxSizing: "border-box",
                }}>
                  {isSelected && (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#d97757", animation: "phone-pop 250ms cubic-bezier(0.175,0.885,0.32,1.275) both" }} />
                  )}
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: isSelected ? 600 : 500, color: "#1a1a1a", fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif", letterSpacing: "-0.2px" }}>
                  {method.name}
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>{method.logos}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Scene 2 helpers ──────────────────────────────────────────────────────────
function useTyping(target: string, startMs: number, rateMs: number) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const timers = target.split("").map((_, i) =>
      setTimeout(() => setTyped(target.slice(0, i + 1)), startMs + i * rateMs)
    );
    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return typed;
}

// Formats 16 raw digits into "XXXX XXXX XXXX XXXX" with bullet placeholders
function formatCardDisplay(typed: string): string {
  const padded = typed.padEnd(16, "•");
  return [padded.slice(0, 4), padded.slice(4, 8), padded.slice(8, 12), padded.slice(12, 16)].join(" ");
}

// ─── SCENE 2: Visual credit card ─────────────────────────────────────────────
function Scene2_CardForm() {
  // Typing sequence:
  // 0.5-2.7s:  card number (500ms start, 140ms/char × 16 chars)
  // 3.5-4.5s:  expiry      (3500ms start, 200ms/char × 5 chars)
  // 4.5-4.9s:  CVV         (4500ms start, 130ms/char × 3 chars)
  // 5.0-6.2s:  name        (5000ms start, 85ms/char × 14 chars)
  const cardNum = useTyping("4242424242424242", 500, 140);
  const expiry  = useTyping("03/29",            3500, 200);
  const cvv     = useTyping("123",              4500, 130);
  const name    = useTyping("JAMES MARTINEZ",   5000, 85);

  const [payPulse, setPayPulse] = useState(false);
  const [payTap,   setPayTap]   = useState(false);
  const [shimmer,  setShimmer]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => { setPayPulse(true); setShimmer(true); }, 7000);
    const t2 = setTimeout(() => setPayTap(true),  7300);
    const t3 = setTimeout(() => setPayTap(false), 7550);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const showVisa = cardNum.length >= 2;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "linear-gradient(180deg, #f8f4f1 0%, #ede8e3 100%)",
    }}>
      <TopBar left="←" center="Payment" right="$129.00"/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "6px 14px 14px" }}>
        <SectionLabel>Card details</SectionLabel>

        {/* ── Visual Credit Card ──────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{
            width: "100%",
            borderRadius: 16,
            background: "linear-gradient(135deg, #1a1a1c 0%, #2a1f1c 38%, #3d2b25 68%, #c86847 100%)",
            boxShadow: "0 20px 48px rgba(0,0,0,0.32), 0 8px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden",
            padding: "14px 16px 14px",
            boxSizing: "border-box",
            aspectRatio: "1.586 / 1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: "phone-pop 500ms cubic-bezier(0.22,1,0.36,1) both",
          }}>
            {/* Ambient card shimmer — sweeps every ~5s */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.07) 48%, transparent 66%)",
              animation: "card-shimmer 5s ease-in-out 1.5s infinite",
            }} />
            {/* Subtle inner radial highlight (top-left light source) */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 50% at 20% 15%, rgba(255,255,255,0.08) 0%, transparent 100%)",
            }} />

            {/* Row 1: EMV Chip + Contactless */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
              {/* EMV Chip */}
              <svg width="30" height="22" viewBox="0 0 30 22" fill="none" aria-hidden="true">
                <rect width="30" height="22" rx="3" fill="#c8a244"/>
                <rect width="30" height="22" rx="3" fill="url(#chipG)"/>
                <line x1="10" y1="0"  x2="10" y2="22" stroke="#8a6a1a" strokeWidth="0.7" opacity="0.8"/>
                <line x1="20" y1="0"  x2="20" y2="22" stroke="#8a6a1a" strokeWidth="0.7" opacity="0.8"/>
                <line x1="0"  y1="7.5" x2="30" y2="7.5" stroke="#8a6a1a" strokeWidth="0.7" opacity="0.8"/>
                <line x1="0"  y1="14.5" x2="30" y2="14.5" stroke="#8a6a1a" strokeWidth="0.7" opacity="0.8"/>
                <rect x="10" y="7.5" width="10" height="7" rx="1" fill="rgba(255,210,80,0.22)"/>
                <rect x="1"  y="1"   width="28" height="4" rx="1.5" fill="rgba(255,255,255,0.22)"/>
                <defs>
                  <linearGradient id="chipG" x1="0" y1="0" x2="30" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#e8c05a" stopOpacity="0.7"/>
                    <stop offset="50%"  stopColor="#c8942a" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#a07020" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Contactless */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" opacity="0.72">
                <circle cx="10" cy="14" r="1.6" fill="white"/>
                <path d="M7 11.5a4.2 4.2 0 0 1 6 0" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M5 9a7 7 0 0 1 10 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.65"/>
                <path d="M3 6.5a9.8 9.8 0 0 1 14 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.35"/>
              </svg>
            </div>

            {/* Row 2: Card number */}
            <div style={{
              fontFamily: "'SF Mono','JetBrains Mono','Courier New',monospace",
              fontSize: 13,
              letterSpacing: "2.2px",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              position: "relative", zIndex: 1,
              userSelect: "none",
            }}>
              {formatCardDisplay(cardNum)}
            </div>

            {/* Row 3: Bottom info */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
              {/* Left: name + expiry + cvv */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                {/* Cardholder name */}
                <div>
                  <div style={{ fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.48)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3, fontFamily: "monospace" }}>
                    Card Holder
                  </div>
                  <div style={{ fontSize: 9.5, fontWeight: 500, color: name ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.28)", letterSpacing: "0.6px", minWidth: 74, fontFamily: "-apple-system,system-ui,sans-serif" }}>
                    {name || "FULL NAME"}
                  </div>
                </div>

                {/* Expiry */}
                <div>
                  <div style={{ fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.48)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3, fontFamily: "monospace" }}>
                    Expires
                  </div>
                  <div style={{ fontSize: 9.5, fontWeight: 500, color: expiry ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.28)", letterSpacing: "0.6px", minWidth: 26, fontFamily: "-apple-system,system-ui,sans-serif" }}>
                    {expiry || "MM/YY"}
                  </div>
                </div>

                {/* CVV */}
                <div>
                  <div style={{ fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.48)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3, fontFamily: "monospace" }}>
                    CVV
                  </div>
                  <div style={{ fontSize: 9.5, fontWeight: 500, color: cvv ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.28)", letterSpacing: "0.6px", minWidth: 20, fontFamily: "-apple-system,system-ui,sans-serif" }}>
                    {cvv || "•••"}
                  </div>
                </div>
              </div>

              {/* Right: Visa logo */}
              <div style={{
                opacity: showVisa ? 1 : 0,
                transform: showVisa ? "scale(1)" : "scale(0.85)",
                transition: "opacity 500ms ease, transform 500ms ease",
              }}>
                <svg viewBox="0 0 44 14" width="44" height="14" aria-label="Visa">
                  <text x="22" y="12" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="14" fontWeight="900" fontStyle="italic" fill="rgba(255,255,255,0.9)">VISA</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pay button ───────────────────────────────────────────── */}
        <div style={{ paddingTop: 12 }}>
          <div style={{
            position: "relative", height: 52,
            background: "linear-gradient(180deg, #e88f6d 0%, #d97757 55%, #c86847 100%)",
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px",
            color: "white", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px",
            boxShadow: payPulse
              ? "0 6px 28px rgba(217,119,87,0.6), 0 2px 8px rgba(217,119,87,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12)"
              : "0 4px 16px rgba(217,119,87,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12)",
            transform: payTap ? "scale(0.97)" : "scale(1)",
            transition: "box-shadow 400ms ease, transform 120ms ease",
            overflow: "hidden",
          }}>
            {shimmer && (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
                animation: "phone-btn-shimmer 700ms ease-out both",
                pointerEvents: "none",
              }} />
            )}
            <span>Pay $129.00</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 3: Processing / Routing ────────────────────────────────────────────
interface PspRowProps { name: string; status: "fail" | "success"; delay: number }

function PspRow({ name, status, delay }: PspRowProps) {
  const [visible,    setVisible]    = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true),    delay);
    const t2 = setTimeout(() => setShowResult(true), delay + 550);
    return () => [t1, t2].forEach(clearTimeout);
  }, [delay]);

  if (!visible) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: "'SF Mono', monospace, system-ui", fontSize: 11,
      color: status === "fail" ? "#9b8880" : "#1a1a1a",
      animation: "phone-slide-left 280ms ease both",
      letterSpacing: "-0.2px",
    }}>
      <span>Trying {name}...</span>
      {showResult && (
        <span style={{
          fontSize: 13, fontWeight: 700, lineHeight: 1,
          color: status === "fail" ? "#c4564a" : "#d97757",
          animation: status === "success"
            ? "phone-pop 220ms cubic-bezier(0.175,0.885,0.32,1.275) both"
            : "phone-pop 220ms cubic-bezier(0.175,0.885,0.32,1.275) both, phone-shake 450ms ease 220ms",
          textShadow: status === "success" ? "0 0 10px rgba(217,119,87,0.5)" : "none",
        }}>
          {status === "fail" ? "✕" : "✓"}
        </span>
      )}
    </div>
  );
}

function Scene3_Processing() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "linear-gradient(180deg, #faf7f4 0%, #ffffff 70%)" }}>
      <TopBar center="Processing..." right="$129.00" processing/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 20px" }}>
        <div style={{
          width: 50, height: 50, borderRadius: "50%",
          border: "3px solid rgba(217,119,87,0.15)",
          borderTopColor: "#d97757",
          animation: "spin 850ms linear infinite",
          marginBottom: 8,
          boxShadow: "0 0 20px rgba(217,119,87,0.35)",
        }} />
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", margin: 0, textAlign: "center" }}>Processing payment</p>
        <p style={{ fontSize: 12, color: "#8e7d75", margin: 0, textAlign: "center", lineHeight: 1.4 }}>Routing through optimal PSP...</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, alignSelf: "stretch" }}>
          <PspRow name="Stripe"   status="fail"    delay={1400} />
          <PspRow name="Adyen"    status="fail"    delay={2100} />
          <PspRow name="Worldpay" status="success" delay={2800} />
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 4: Approved ────────────────────────────────────────────────────────
function Scene4_Success() {
  const [v, setV] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setV(1), 100);
    const t1 = setTimeout(() => setV(2), 700);
    const t2 = setTimeout(() => setV(3), 1100);
    const t3 = setTimeout(() => setV(4), 1500);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  const fade = (minV: number): React.CSSProperties => ({
    opacity: v >= minV ? 1 : 0,
    transform: v >= minV ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 400ms ease, transform 400ms ease",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#faf7f4", position: "relative" }}>
      {v >= 1 && (
        <div style={{
          position: "absolute", left: "50%", top: "38%",
          width: 240, height: 240,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(217,119,87,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "phone-fade-up 800ms ease both",
        }} />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px 24px", position: "relative" }}>
        <div style={{ position: "relative", marginBottom: 22 }}>
          {v >= 1 && CONFETTI.map((p, i) => (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "50%",
              width: p.size, height: p.size, borderRadius: "50%",
              background: p.color, pointerEvents: "none",
              ["--cdx" as string]: `${p.dx}px`,
              ["--cdy" as string]: `${p.dy}px`,
              animation: `phone-confetti 950ms ease-out ${p.delay}ms both`,
            } as React.CSSProperties} />
          ))}
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "radial-gradient(circle at 38% 38%, rgba(232,143,109,0.28) 0%, rgba(217,119,87,0.13) 55%, rgba(180,80,50,0.06) 100%)",
            border: "2px solid rgba(217,119,87,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: v >= 1 ? "0 0 48px rgba(217,119,87,0.32), 0 0 12px rgba(217,119,87,0.2), inset 0 1px 0 rgba(255,255,255,0.3)" : "none",
            animation: v >= 1 ? "phone-check-bounce 620ms cubic-bezier(0.175,0.885,0.32,1.275) both" : "none",
            transition: "box-shadow 600ms ease",
          }}>
            <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
              <path d="M5 12L10 17L19 8" stroke="#d97757" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px", letterSpacing: "-0.4px", ...fade(2) }}>Payment approved</p>
        <p style={{ fontSize: 34, fontWeight: 800, color: "#1a1a1a", margin: "0 0 20px", letterSpacing: "-1.5px", ...fade(3) }}>$129.00</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...fade(4) }}>
          <p style={{ fontSize: 12, color: "#8e7d75", margin: 0, letterSpacing: "0.3px" }}>Charged to •••• •••• •••• 4242</p>
          <p style={{ fontSize: 11, color: "#8e7d75", margin: 0, fontFamily: "'SF Mono', monospace, system-ui", textAlign: "center", lineHeight: 1.4 }}>
            Routed via Worldpay in <span style={{ color: "#d97757", fontWeight: 700 }}>38ms</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PhoneScreen — scene cycle ────────────────────────────────────────────────
export default function PhoneScreen() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    const dur = SCENE_DURATIONS[sceneIdx];
    const t1 = setTimeout(() => setVisible(false), dur - 400);
    const t2 = setTimeout(() => {
      setSceneIdx(i => (i + 1) % 4);
      setVisible(true);
    }, dur);
    return () => [t1, t2].forEach(clearTimeout);
  }, [sceneIdx]);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#faf7f4",
      borderRadius: "inherit",
      overflow: "hidden",
      position: "relative",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    }}>
      {/* Glass reflection */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none",
        background: "linear-gradient(138deg, rgba(255,255,255,0.09) 0%, transparent 52%)",
        borderRadius: "inherit",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.98)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}>
        {sceneIdx === 0 && <Scene1_PaymentList />}
        {sceneIdx === 1 && <Scene2_CardForm />}
        {sceneIdx === 2 && <Scene3_Processing />}
        {sceneIdx === 3 && <Scene4_Success />}
      </div>

      <style>{`
        @keyframes payment-list-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-840px); }
        }
        @keyframes card-shimmer {
          0%, 100% { transform: translateX(-160%) skewX(-12deg); opacity: 0; }
          8%        { opacity: 1; }
          22%       { transform: translateX(180%)  skewX(-12deg); opacity: 0; }
        }
        @keyframes phone-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes phone-pop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes phone-check-bounce {
          0%   { transform: scale(0);    opacity: 0; }
          60%  { transform: scale(1.18); opacity: 1; }
          80%  { transform: scale(0.93); }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes phone-confetti {
          0%   { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--cdx), var(--cdy)) scale(0.2); }
        }
        @keyframes phone-slide-left {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes phone-shake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-3px); }
          40%      { transform: translateX(3px); }
          60%      { transform: translateX(-2px); }
          80%      { transform: translateX(2px); }
        }
        @keyframes phone-btn-shimmer {
          0%   { transform: translateX(-150%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
