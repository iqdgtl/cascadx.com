"use client";
import React, { useEffect, useState } from "react";

// ─── Scene durations (ms) ─────────────────────────────────────────────────────
const SCENE_DURATIONS = [6000, 8000, 4000, 4000];

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
    <div style={{
      width: 34, height: 22, borderRadius: 4, background: "#1A1F71",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0,
    }}>
      <svg viewBox="0 0 34 14" width="30" height="11">
        <text x="17" y="11" textAnchor="middle"
          fontFamily="-apple-system,system-ui,sans-serif"
          fontSize="13" fontWeight="900" fontStyle="italic" fill="white"
        >VISA</text>
      </svg>
    </div>
  );
}

function MastercardLogo() {
  return (
    <div style={{
      width: 34, height: 22, borderRadius: 4, background: "#1a1a1a",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0,
      overflow: "hidden",
    }}>
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
    <div style={{
      width: 34, height: 22, borderRadius: 4, background: "#006FCF",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0,
    }}>
      <svg viewBox="0 0 34 14" width="30" height="11">
        <text x="17" y="10.5" textAnchor="middle"
          fontFamily="-apple-system,system-ui,sans-serif"
          fontSize="9" fontWeight="800" fill="white" letterSpacing="0.5"
        >AMEX</text>
      </svg>
    </div>
  );
}

function UnionPayLogo() {
  return (
    <div style={{
      width: 34, height: 22, borderRadius: 4, display: "flex",
      overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", flexShrink: 0,
    }}>
      <div style={{ flex: 1, background: "#E31837", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 17 14" width="17" height="14">
          <text x="8.5" y="11" textAnchor="middle"
            fontFamily="-apple-system,system-ui,sans-serif"
            fontSize="8" fontWeight="800" fill="white"
          >UP</text>
        </svg>
      </div>
      <div style={{ flex: 1, background: "#00447C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 17 14" width="17" height="14">
          <text x="8.5" y="11" textAnchor="middle"
            fontFamily="-apple-system,system-ui,sans-serif"
            fontSize="7" fontWeight="600" fill="white"
          >银联</text>
        </svg>
      </div>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#f0f5ff",
      border: "1px solid #c8dcf5",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 9px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "#003087" }}>Pay</span>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "#009cde" }}>Pal</span>
    </div>
  );
}

function ApplePayLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 9px", gap: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,0.35)", flexShrink: 0,
    }}>
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
    <div style={{
      height: 22, borderRadius: 4, background: "#fff",
      border: "1px solid #e0ddd8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 8px", gap: 3,
      boxShadow: "0 1px 3px rgba(0,0,0,0.10)", flexShrink: 0,
    }}>
      <svg viewBox="0 0 10 12" width="9" height="10" aria-hidden="true">
        <text x="5" y="10" textAnchor="middle"
          fontFamily="-apple-system,system-ui,sans-serif"
          fontSize="11" fontWeight="700" fill="#4285F4"
        >G</text>
      </svg>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 10, fontWeight: 600, color: "#5f5752" }}>Pay</span>
    </div>
  );
}

function AlipayLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#1677FF",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 9px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>Alipay</span>
    </div>
  );
}

function WeChatPayLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#07C160",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 7px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 9, fontWeight: 800, color: "white", whiteSpace: "nowrap" }}>WeChat Pay</span>
    </div>
  );
}

function GrabPayLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#00B14F",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>GrabPay</span>
    </div>
  );
}

function GCashLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#007DFE",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>GCash</span>
    </div>
  );
}

function PayPayLogo() {
  return (
    <div style={{
      height: 22, borderRadius: 4, background: "#FF0033",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "-apple-system,system-ui,sans-serif", fontSize: 11, fontWeight: 800, color: "white" }}>PayPay</span>
    </div>
  );
}

// ─── Payment method list data ─────────────────────────────────────────────────
const PAY_METHODS: Array<{ id: string; name: string; logos: React.ReactNode }> = [
  {
    id: "credit_card",
    name: "Credit card",
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
];

// ─── Shared components ────────────────────────────────────────────────────────
function TopBar({ left, center, right, processing }: {
  left?: string; center: string; right?: string; processing?: boolean;
}) {
  return (
    <div style={{
      height: 56, background: "#f8f4f1",
      borderBottom: "1px solid #ede6db",
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

// ─── SCENE 1: Vertical payment method list ────────────────────────────────────
function Scene1_PaymentList() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tapping,  setTapping]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSelected("credit_card"), 3000);
    const t2 = setTimeout(() => setTapping(true),  4000);
    const t3 = setTimeout(() => setTapping(false), 4300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#faf7f4" }}>
      <TopBar left="←" center="Checkout" right="$129.00"/>
      <SectionLabel>Select payment method</SectionLabel>
      <div
        className="phone-list"
        style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
      >
        {PAY_METHODS.map((method) => {
          const isSelected = selected === method.id;
          const isTapping  = tapping && isSelected;
          return (
            <div
              key={method.id}
              style={{
                height: 56,
                display: "flex",
                alignItems: "center",
                paddingLeft: isSelected ? 13 : 16,
                paddingRight: 16,
                gap: 12,
                background: isSelected ? "#fef9f3" : "white",
                borderBottom: "1px solid #ede6db",
                borderLeft: isSelected ? "3px solid #d97757" : "3px solid transparent",
                transform: isTapping ? "scale(0.99)" : "scale(1)",
                transition: "background 350ms ease, border-color 350ms ease, transform 100ms ease",
                boxSizing: "border-box",
              }}
            >
              {/* Radio */}
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isSelected ? "#d97757" : "#c7c7cc"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border-color 350ms ease",
                boxSizing: "border-box",
              }}>
                {isSelected && (
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#d97757",
                    animation: "phone-pop 250ms cubic-bezier(0.175,0.885,0.32,1.275) both",
                  }} />
                )}
              </div>
              {/* Name */}
              <span style={{
                flex: 1,
                fontSize: 15, fontWeight: isSelected ? 600 : 500,
                color: "#1a1a1a",
                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                letterSpacing: "-0.2px",
              }}>
                {method.name}
              </span>
              {/* Logos */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {method.logos}
              </div>
            </div>
          );
        })}
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
  return digits.replace(/(.{4})/g, "$1 ").trimEnd();
}

function Field({ label, value, mono, right, cursor, placeholder, active }: {
  label: string; value: string; mono?: boolean; right?: React.ReactNode;
  cursor?: boolean; placeholder?: string; active?: boolean;
}) {
  return (
    <div>
      <div style={{
        fontSize: 9, fontWeight: 700,
        color: "#6b5d54",
        textTransform: "uppercase", letterSpacing: "0.7px",
        marginBottom: 5,
        fontFamily: "var(--font-mono, 'SF Mono', monospace, system-ui)",
      }}>
        {label}
      </div>
      <div style={{
        height: 44, background: "white", borderRadius: 10,
        border: active ? "1.5px solid rgba(217,119,87,0.65)" : "1.5px solid #ede6db",
        boxShadow: active
          ? "0 0 0 3px rgba(217,119,87,0.12), inset 0 1px 3px rgba(0,0,0,0.04)"
          : "inset 0 1px 3px rgba(0,0,0,0.04)",
        display: "flex", alignItems: "center",
        padding: "0 11px",
        fontFamily: mono ? "'SF Mono', monospace, system-ui" : "-apple-system, system-ui, sans-serif",
        fontSize: 14, color: value ? "#1a1a1a" : "#c0b8b0",
        position: "relative", overflow: "hidden",
        transition: "border-color 250ms ease, box-shadow 250ms ease",
        boxSizing: "border-box",
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

// ─── SCENE 2: Card form — warm premium ───────────────────────────────────────
function Scene2_CardForm() {
  const cardNum = useTyping("4242424242424242", 400,  105);
  const expiry  = useTyping("03/29",            2700, 130);
  const cvv     = useTyping("123",              3900, 120);
  const name    = useTyping("J. MARTINEZ",      4900, 85);
  const [payPulse, setPayPulse] = useState(false);
  const [payTap,   setPayTap]   = useState(false);
  const [shimmer,  setShimmer]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => { setPayPulse(true); setShimmer(true); }, 6800);
    const t2 = setTimeout(() => setPayTap(true),  7200);
    const t3 = setTimeout(() => setPayTap(false), 7450);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const activeField =
    name.length > 0    ? null :
    cvv.length > 0     ? "name" :
    expiry.length > 0  ? "cvv" :
    cardNum.length > 0 ? "expiry" : "card";

  const showVisa = cardNum.length >= 1;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "linear-gradient(180deg, #ffffff 0%, #faf7f4 100%)",
    }}>
      <TopBar left="←" center="Payment" right="$129.00"/>
      <div style={{ flex: 1, padding: "6px 14px 12px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <SectionLabel>Card details</SectionLabel>

        {/* Card number */}
        <Field
          label="Card number"
          value={formatCardNum(cardNum)}
          mono
          cursor={activeField === "card"}
          active={activeField === "card"}
          placeholder="1234 5678 9012 3456"
          right={showVisa ? (
            <div style={{
              flexShrink: 0, marginLeft: 6,
              animation: "phone-pop 300ms ease both",
            }}>
              <div style={{
                width: 28, height: 18, borderRadius: 3, background: "#1A1F71",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}>
                <svg viewBox="0 0 28 12" width="26" height="10">
                  <text x="14" y="9.5" textAnchor="middle"
                    fontFamily="-apple-system,system-ui,sans-serif"
                    fontSize="10" fontWeight="900" fontStyle="italic" fill="white"
                  >VISA</text>
                </svg>
              </div>
            </div>
          ) : undefined}
        />

        {/* Expiry + CVV */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Field label="Expiry" value={expiry} mono cursor={activeField === "expiry"} active={activeField === "expiry"} placeholder="MM/YY"/>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="CVV" value={cvv} mono cursor={activeField === "cvv"} active={activeField === "cvv"} placeholder="•••"/>
          </div>
        </div>

        {/* Name */}
        <Field
          label="Cardholder name"
          value={name}
          cursor={activeField === "name"}
          active={activeField === "name"}
          placeholder="Full name"
        />

        {/* Pay button */}
        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <div style={{
            position: "relative",
            height: 50,
            background: "linear-gradient(180deg, #e88f6d 0%, #d97757 55%, #c86847 100%)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px",
            boxShadow: payPulse
              ? "0 6px 24px rgba(217,119,87,0.55), 0 2px 8px rgba(217,119,87,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12)"
              : "0 3px 12px rgba(217,119,87,0.35), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12)",
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
            Pay $129.00
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 3: Processing / Routing — warm ────────────────────────────────────
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
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "linear-gradient(180deg, #faf7f4 0%, #ffffff 70%)",
    }}>
      <TopBar center="Processing..." right="$129.00" processing/>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12, padding: "0 20px",
      }}>
        {/* Spinner — terracotta with glow */}
        <div style={{
          width: 50, height: 50, borderRadius: "50%",
          border: "3px solid rgba(217,119,87,0.15)",
          borderTopColor: "#d97757",
          animation: "spin 850ms linear infinite",
          marginBottom: 8,
          boxShadow: "0 0 20px rgba(217,119,87,0.35)",
        }} />

        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", margin: 0, textAlign: "center" }}>
          Processing payment
        </p>
        <p style={{ fontSize: 12, color: "#8e7d75", margin: 0, textAlign: "center", lineHeight: 1.4 }}>
          Routing through optimal PSP...
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, alignSelf: "stretch" }}>
          <PspRow name="Stripe"   status="fail"    delay={1400} />
          <PspRow name="Adyen"    status="fail"    delay={2100} />
          <PspRow name="Worldpay" status="success" delay={2800} />
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 4: Approved — celebration ─────────────────────────────────────────
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
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#faf7f4", position: "relative",
    }}>
      {/* Radial warm glow behind checkmark */}
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

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 20px 24px", position: "relative",
      }}>
        {/* Checkmark + confetti wrapper */}
        <div style={{ position: "relative", marginBottom: 22 }}>
          {/* Confetti */}
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

          {/* Checkmark circle — 90px */}
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "radial-gradient(circle at 38% 38%, rgba(232,143,109,0.28) 0%, rgba(217,119,87,0.13) 55%, rgba(180,80,50,0.06) 100%)",
            border: "2px solid rgba(217,119,87,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: v >= 1
              ? "0 0 48px rgba(217,119,87,0.32), 0 0 12px rgba(217,119,87,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
              : "none",
            animation: v >= 1 ? "phone-check-bounce 620ms cubic-bezier(0.175,0.885,0.32,1.275) both" : "none",
            transition: "box-shadow 600ms ease",
          }}>
            <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
              <path d="M5 12L10 17L19 8" stroke="#d97757" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px", letterSpacing: "-0.4px", ...fade(2) }}>
          Payment approved
        </p>

        <p style={{ fontSize: 34, fontWeight: 800, color: "#1a1a1a", margin: "0 0 20px", letterSpacing: "-1.5px", ...fade(3) }}>
          $129.00
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...fade(4) }}>
          <p style={{ fontSize: 12, color: "#8e7d75", margin: 0, letterSpacing: "0.3px" }}>
            Charged to •••• •••• •••• 4242
          </p>
          <p style={{ fontSize: 11, color: "#8e7d75", margin: 0, fontFamily: "'SF Mono', monospace, system-ui", textAlign: "center", lineHeight: 1.4 }}>
            Routed via Worldpay in{" "}
            <span style={{ color: "#d97757", fontWeight: 700 }}>38ms</span>
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

      {/* Scene wrapper */}
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
        .phone-list { -ms-overflow-style: none; scrollbar-width: none; }
        .phone-list::-webkit-scrollbar { display: none; }

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
