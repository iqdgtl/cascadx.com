"use client";
import React, { useEffect, useState } from "react";

// ─── Scene durations (ms) ─────────────────────────────────────────────────────
const SCENE_DURATIONS = [6000, 8000, 4000, 4000];

// ─── Scene 1: APM data ────────────────────────────────────────────────────────
// Credit Card at index 1 = top-right tile, always visible
const S1_APMS: Array<{ name: string; bg: string; dark?: boolean }> = [
  { name: "Alipay",      bg: "#1677FF" },
  { name: "Credit Card", bg: "#222429" },
  { name: "WeChat Pay",  bg: "#07C160" },
  { name: "PayPay",      bg: "#FF0033" },
  { name: "GrabPay",     bg: "#00B14F" },
  { name: "GCash",       bg: "#007DFE" },
  { name: "OVO",         bg: "#4C3494" },
  { name: "DANA",        bg: "#118EEA" },
  { name: "TrueMoney",   bg: "#FF6B00" },
  { name: "MoMo",        bg: "#A50064" },
  { name: "Paytm",       bg: "#002E6E" },
  { name: "Kakao Pay",   bg: "#FEE500", dark: true },
  { name: "PromptPay",   bg: "#003D7E" },
  { name: "Apple Pay",   bg: "#1a1a1a" },
  { name: "Google Pay",  bg: "#FFFFFF", dark: true },
  { name: "Stripe",      bg: "#635BFF" },
];
const S1_DOUBLED = [...S1_APMS, ...S1_APMS];

// ─── APM icons (32×32 viewBox, white marks) ──────────────────────────────────
const APM_ICONS: Record<string, React.ReactElement> = {
  "Credit Card": (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="26" height="18" rx="3" stroke="white" strokeWidth="1.5"/>
      <rect x="3" y="13" width="26" height="4" fill="white" fillOpacity="0.45"/>
      <rect x="6" y="22" width="7" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    </svg>
  ),
  "Alipay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="22" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="20" fontWeight="900" fill="white">a</text>
      <path d="M8 27 Q16 24 24 27" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
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
      <text x="16" y="14" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="900" fill="white">Pay</text>
      <text x="16" y="25" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="900" fill="white">Pay</text>
    </svg>
  ),
  "GrabPay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="13" fontWeight="900" fill="white">Grab</text>
    </svg>
  ),
  "GCash": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="19" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="17" fontWeight="900" fill="white">G</text>
      <text x="16" y="27" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="7" fontWeight="700" fill="white">Cash</text>
    </svg>
  ),
  "OVO": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="15" fontWeight="900" fill="white">OVO</text>
    </svg>
  ),
  "DANA": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="14" fontWeight="900" fill="white">dana</text>
    </svg>
  ),
  "TrueMoney": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="17" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="12" fontWeight="900" fill="white">True</text>
      <text x="16" y="26" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="7.5" fontWeight="600" fill="white">Money</text>
    </svg>
  ),
  "MoMo": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="14" fontWeight="900" fill="white">MoMo</text>
    </svg>
  ),
  "Paytm": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="12" fontWeight="900" fill="white">Paytm</text>
    </svg>
  ),
  "Kakao Pay": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="17" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="10" fontWeight="900" fill="#3C1E1E">Kakao</text>
      <text x="16" y="26" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="10" fontWeight="700" fill="#3C1E1E">Pay</text>
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
      <text x="16" y="22" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="20" fontWeight="900" fill="#4285F4">G</text>
    </svg>
  ),
  "Stripe": (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="800" fontStyle="italic" fill="white">stripe</text>
    </svg>
  ),
};

// ─── Confetti data ────────────────────────────────────────────────────────────
const CONFETTI = [
  { dx: -38, dy: -52, size: 5, delay: 0,   color: "#d97757" },
  { dx:  38, dy: -52, size: 5, delay: 40,  color: "#d97757" },
  { dx:   4, dy: -62, size: 4, delay: 20,  color: "#b35a3e" },
  { dx: -55, dy: -32, size: 3, delay: 80,  color: "#d97757" },
  { dx:  55, dy: -32, size: 3, delay: 100, color: "#d97757" },
  { dx: -22, dy: -68, size: 4, delay: 60,  color: "#b35a3e" },
  { dx:  22, dy: -68, size: 3, delay: 120, color: "#d97757" },
  { dx: -62, dy: -18, size: 3, delay: 140, color: "#b35a3e" },
  { dx:  62, dy: -18, size: 2, delay: 160, color: "#d97757" },
  { dx:   0, dy: -72, size: 4, delay: 30,  color: "#d97757" },
];

// ─── Shared: top bar ──────────────────────────────────────────────────────────
function TopBar({ left, center, right, processing }: {
  left?: string; center: string; right?: string; processing?: boolean;
}) {
  return (
    <div style={{
      height: 56, background: "#f8f8f8",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      padding: "0 14px 10px", flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, color: "#007AFF", lineHeight: 1, minWidth: 20 }}>{left}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: processing ? "#8e8e93" : "#111827", letterSpacing: "-0.3px", lineHeight: 1 }}>{center}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1, minWidth: 40, textAlign: "right" }}>{right}</span>
    </div>
  );
}

// ─── Shared: section label ────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ padding: "10px 14px 6px", flexShrink: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {children}
      </span>
    </div>
  );
}

// ─── Shared: APM square tile ──────────────────────────────────────────────────
function APMTile({ apm, highlighted, tapping }: {
  apm: typeof S1_APMS[number];
  highlighted: boolean;
  tapping: boolean;
}) {
  return (
    <div style={{
      aspectRatio: "1",
      background: highlighted ? "#fef5f0" : "#ffffff",
      borderRadius: 14,
      border: highlighted ? "1.5px solid #d97757" : "1px solid #e5e5e7",
      boxShadow: highlighted
        ? "0 0 12px rgba(217,119,87,0.35), 0 2px 6px rgba(0,0,0,0.08)"
        : "0 1px 4px rgba(0,0,0,0.07)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 6,
      padding: "8px 4px 7px",
      transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.12s",
      transform: tapping ? "scale(0.93)" : "scale(1)",
      overflow: "hidden", boxSizing: "border-box", flexShrink: 0,
    }}>
      <div style={{
        width: 42, height: 42, flexShrink: 0, borderRadius: 11,
        background: apm.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 6px rgba(0,0,0,0.15)",
      }}>
        {APM_ICONS[apm.name]}
      </div>
      <span style={{
        fontSize: 9, fontWeight: 600, color: "#1a1a1a", lineHeight: 1,
        textAlign: "center", maxWidth: "100%", overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap",
        paddingLeft: 2, paddingRight: 2,
      }}>
        {apm.name}
      </span>
    </div>
  );
}

// ─── SCENE 1: Payment method selection ───────────────────────────────────────
function Scene1_APMGrid() {
  const [ccHighlighted, setCcHighlighted] = useState(false);
  const [ccTapping,     setCcTapping]     = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCcHighlighted(true), 2000);
    const t2 = setTimeout(() => setCcTapping(true),     4000);
    const t3 = setTimeout(() => setCcTapping(false),    4250);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar left="←" center="Checkout" right="$129.00"/>
      <SectionLabel>Select payment method</SectionLabel>
      <div style={{
        flex: 1, overflow: "hidden", padding: "2px 14px 0",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
          animation: "apm-grid-scroll 28s linear infinite",
          paddingBottom: 10,
        }}>
          {S1_DOUBLED.map((apm, i) => (
            <APMTile
              key={i} apm={apm}
              highlighted={apm.name === "Credit Card" && ccHighlighted}
              tapping={apm.name === "Credit Card" && ccTapping}
            />
          ))}
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

function formatCardNum(digits: string) {
  // Insert spaces every 4 digits
  return digits.replace(/(.{4})/g, "$1 ").trimEnd();
}

function Field({ label, value, mono, right, cursor, placeholder }: {
  label: string; value: string; mono?: boolean; right?: React.ReactNode;
  cursor?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 9, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        height: 44, background: "white", borderRadius: 10,
        border: "1.5px solid #e5e5e7",
        display: "flex", alignItems: "center",
        padding: "0 11px",
        fontFamily: mono ? "'SF Mono', monospace, system-ui" : "-apple-system, system-ui, sans-serif",
        fontSize: 14, color: value ? "#111" : "#c7c7cc",
        position: "relative", overflow: "hidden",
      }}>
        <span style={{ flex: 1 }}>
          {value || placeholder}
          {cursor && value && <span className="hero-cursor" style={{ color: "#d97757", marginLeft: 1 }}>|</span>}
        </span>
        {right}
      </div>
    </div>
  );
}

// ─── SCENE 2: Card form ───────────────────────────────────────────────────────
function Scene2_CardForm() {
  const cardNum  = useTyping("4242424242424242", 400,  105);
  const expiry   = useTyping("03/29",            2700, 130);
  const cvv      = useTyping("123",              3900, 120);
  const name     = useTyping("J. MARTINEZ",      4900, 85);
  const [payPulse, setPayPulse] = useState(false);
  const [payTap,   setPayTap]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPayPulse(true), 6800);
    const t2 = setTimeout(() => setPayTap(true),   7200);
    const t3 = setTimeout(() => setPayTap(false),  7450);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const activeField =
    name.length > 0  ? null :
    cvv.length > 0   ? "name" :
    expiry.length > 0 ? "cvv" :
    cardNum.length > 0 ? "expiry" : "card";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar left="←" center="Payment" right="$129.00"/>
      <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <SectionLabel>Card details</SectionLabel>

        {/* Card number */}
        <Field
          label="Card number"
          value={formatCardNum(cardNum)}
          mono cursor={activeField === "card"}
          placeholder="1234 5678 9012 3456"
          right={cardNum.length > 0 ? (
            <span style={{ fontSize: 10, fontWeight: 800, color: "#1a1f71", letterSpacing: 0.5, flexShrink: 0, marginLeft: 4 }}>VISA</span>
          ) : undefined}
        />

        {/* Expiry + CVV row */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Field label="Expiry" value={expiry} mono cursor={activeField === "expiry"} placeholder="MM/YY"/>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="CVV" value={cvv} mono cursor={activeField === "cvv"} placeholder="•••"/>
          </div>
        </div>

        {/* Name */}
        <Field
          label="Cardholder name"
          value={name}
          cursor={activeField === "name"}
          placeholder="Full name"
        />

        {/* Pay button */}
        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <div style={{
            height: 50, background: "#d97757", borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px",
            boxShadow: payPulse ? "0 0 24px rgba(217,119,87,0.6)" : "none",
            transform: payTap ? "scale(0.97)" : "scale(1)",
            transition: "box-shadow 400ms ease, transform 120ms ease",
          }}>
            Pay $129.00
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 3: Processing / Routing ───────────────────────────────────────────
interface PspRowProps { name: string; status: "pending" | "fail" | "success"; delay: number }

function PspRow({ name, status, delay }: PspRowProps) {
  const [visible, setVisible]       = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setShowResult(true), delay + 500);
    return () => [t1, t2].forEach(clearTimeout);
  }, [delay]);

  if (!visible) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: "'SF Mono', monospace, system-ui", fontSize: 11,
      color: status === "fail" ? "rgba(0,0,0,0.38)" : "#111",
      animation: "phone-fade-up 250ms ease both",
      letterSpacing: "-0.2px",
    }}>
      <span>Trying {name}...</span>
      {showResult && (
        <span style={{
          fontSize: 13, fontWeight: 700, lineHeight: 1,
          color: status === "fail" ? "#ff3b30" : "#d97757",
          animation: "phone-pop 200ms cubic-bezier(0.175,0.885,0.32,1.275) both",
        }}>
          {status === "fail" ? "✕" : "✓"}
        </span>
      )}
    </div>
  );
}

function Scene3_Processing() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar center="Processing..." right="$129.00" processing/>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12, padding: "0 20px",
      }}>
        {/* Spinner */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          border: "3px solid rgba(217,119,87,0.2)",
          borderTopColor: "#d97757",
          animation: "spin 900ms linear infinite",
          marginBottom: 8,
        }} />

        <p style={{ fontSize: 15, fontWeight: 600, color: "#111", margin: 0, textAlign: "center" }}>
          Processing payment
        </p>
        <p style={{ fontSize: 12, color: "#8e8e93", margin: 0, textAlign: "center", lineHeight: 1.4 }}>
          Routing through optimal PSP...
        </p>

        {/* PSP cascade attempts */}
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
    const t0 = setTimeout(() => setV(1), 100);   // checkmark
    const t1 = setTimeout(() => setV(2), 700);   // "Payment approved"
    const t2 = setTimeout(() => setV(3), 1100);  // amount
    const t3 = setTimeout(() => setV(4), 1500);  // card + routing
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  const fade = (minV: number): React.CSSProperties => ({
    opacity: v >= minV ? 1 : 0,
    transform: v >= minV ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 400ms ease, transform 400ms ease",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px 20px" }}>

        {/* Checkmark circle + confetti */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          {/* Confetti particles */}
          {v >= 1 && CONFETTI.map((p, i) => (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "50%",
              width: p.size, height: p.size, borderRadius: "50%",
              background: p.color, pointerEvents: "none",
              ["--cdx" as string]: `${p.dx}px`,
              ["--cdy" as string]: `${p.dy}px`,
              animation: `phone-confetti 900ms ease-out ${p.delay}ms both`,
            } as React.CSSProperties} />
          ))}

          {/* Checkmark circle */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(217,119,87,0.12)",
            border: "2px solid rgba(217,119,87,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: v >= 1 ? "0 0 32px rgba(217,119,87,0.3)" : "none",
            animation: v >= 1 ? "phone-check-bounce 600ms cubic-bezier(0.175,0.885,0.32,1.275) both" : "none",
            transition: "box-shadow 600ms ease",
          }}>
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
              <path d="M5 12L10 17L19 8" stroke="#d97757" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* "Payment approved" */}
        <p style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 6px", letterSpacing: "-0.4px", ...fade(2) }}>
          Payment approved
        </p>

        {/* Amount */}
        <p style={{ fontSize: 32, fontWeight: 800, color: "#111", margin: "0 0 16px", letterSpacing: "-1px", ...fade(3) }}>
          $129.00
        </p>

        {/* Card + routing info */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...fade(4) }}>
          <p style={{ fontSize: 12, color: "#8e8e93", margin: 0, letterSpacing: "0.5px" }}>
            Charged to •••• •••• •••• 4242
          </p>
          <p style={{ fontSize: 11, color: "#8e8e93", margin: 0, fontFamily: "'SF Mono', monospace, system-ui", textAlign: "center", lineHeight: 1.4 }}>
            Routed via Worldpay in{" "}
            <span style={{ color: "#d97757", fontWeight: 700 }}>38ms</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PhoneScreen — manages 4-scene cycle ─────────────────────────────────────
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
      background: "#f2f2f7",
      borderRadius: "inherit",
      overflow: "hidden",
      position: "relative",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    }}>
      {/* Glass reflection — always on top */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none",
        background: "linear-gradient(138deg, rgba(255,255,255,0.09) 0%, transparent 52%)",
        borderRadius: "inherit",
      }} />

      {/* Scene wrapper — fades between scenes */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.98)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}>
        {sceneIdx === 0 && <Scene1_APMGrid />}
        {sceneIdx === 1 && <Scene2_CardForm />}
        {sceneIdx === 2 && <Scene3_Processing />}
        {sceneIdx === 3 && <Scene4_Success />}
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
