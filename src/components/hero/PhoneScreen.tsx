"use client";
import { useEffect, useState } from "react";

const ACCENT = "#d97757";
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const SCENE_DURATIONS = [5800, 4500, 3000];
const FADE = 400;

// ── Shared nav bar ─────────────────────────────────────────────────────────────
function ScreenNav({ back, title }: { back: string; title: string }) {
  return (
    <>
      <div style={{ height: 58, flexShrink: 0 }} />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 18px 12px", flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: ACCENT, fontWeight: 500 }}>{back}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>{title}</span>
        <span style={{ opacity: 0, fontSize: 13 }}>·</span>
      </div>
      <div style={{ height: 1, background: "#f3f4f6", flexShrink: 0 }} />
    </>
  );
}

// ── Pay button ─────────────────────────────────────────────────────────────────
function PayButton({ pulse }: { pulse?: boolean }) {
  return (
    <div style={{ padding: "14px 18px 32px", flexShrink: 0 }}>
      <div style={{
        height: 48, borderRadius: 100,
        background: `linear-gradient(180deg, #e88f6d 0%, ${ACCENT} 55%, #c86847 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(217,119,87,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
        animation: pulse ? "ps-btn-pulse 1.4s ease-in-out infinite" : undefined,
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "white", letterSpacing: "-0.3px" }}>
          Pay $129.00
        </span>
      </div>
    </div>
  );
}

// ── Scene 1: Payment method selection ─────────────────────────────────────────
function Scene1({ selected, visibleCount, scrollOffset }: { selected: boolean; visibleCount: number; scrollOffset: number }) {
  const Radio = ({ active }: { active: boolean }) => (
    <div style={{
      width: 18, height: 18, borderRadius: "50%",
      border: `2px solid ${active ? ACCENT : "#d1d5db"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, boxSizing: "border-box",
      transition: "border-color 350ms ease",
    }}>
      {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />}
    </div>
  );

  const VisaMC = () => (
    <div style={{ display: "flex", gap: 3 }}>
      <div style={{ width: 26, height: 17, borderRadius: 3, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 26 11" width="22" height="9" aria-hidden="true">
          <text x="13" y="9" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="10" fontStyle="italic" fill="white">VISA</text>
        </svg>
      </div>
      <div style={{ width: 26, height: 17, borderRadius: 3, background: "#111", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true">
          <circle cx="7" cy="7" r="6" fill="#EB001B"/>
          <circle cx="13" cy="7" r="6" fill="#F79E1B" opacity="0.9"/>
          <path d="M10 2.4a6 6 0 0 1 0 9.2A6 6 0 0 1 10 2.4z" fill="#FF5F00"/>
        </svg>
      </div>
    </div>
  );

  const ApplePay = () => (
    <div style={{ height: 17, borderRadius: 3, background: "#000", display: "flex", alignItems: "center", padding: "0 7px", gap: 3 }}>
      <svg viewBox="0 0 8 10" width="7" height="9" fill="white" aria-hidden="true">
        <path d="M5.8 0C5.8 1.1 5.1 1.7 4.3 1.7 4.3.7 5.1.1 5.8 0zM4.1 2.3C2.6 2.3 1 3.4 1 5.5 1 7.9 2.5 10 4 10c.6 0 1.2-.4 1.7-.4.5 0 1 .4 1.7.4C9 10 9.5 7.9 9.5 5.5c0-1.8-1.3-3-2.3-3-.6 0-1.1.4-1.7.4-.5 0-1-.6-1.4-.6z"/>
      </svg>
      <span style={{ fontSize: 9, fontWeight: 600, color: "white" }}>Pay</span>
    </div>
  );

  const PayPalLogo = () => (
    <div style={{ height: 17, borderRadius: 3, background: "#003087", display: "flex", alignItems: "center", padding: "0 7px" }}>
      <span style={{ fontSize: 9, fontWeight: 800, color: "white" }}>Pay</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: "#009cde" }}>Pal</span>
    </div>
  );

  const GooglePay = () => (
    <div style={{ height: 17, borderRadius: 3, background: "#fff", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 6px", gap: 2 }}>
      <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
        <circle cx="6" cy="6" r="6" fill="#4285F4"/>
        <text x="6" y="8.5" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="7" fill="white">G</text>
      </svg>
      <span style={{ fontSize: 9, fontWeight: 600, color: "#111" }}>Pay</span>
    </div>
  );

  // ── Additional APM logos ──
  const AlipayLogo = (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 14, height: 14, borderRadius: 3, background: "#1677ff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 800, color: "#fff", fontFamily: "Arial, sans-serif",
      }}>支</div>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#1677ff" }}>Alipay</span>
    </div>
  );

  const WeChatLogo = (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 14, height: 14, borderRadius: "50%", background: "#07c160",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg viewBox="0 0 10 8" width="8" height="7" aria-hidden="true">
          <circle cx="3" cy="3" r="0.8" fill="#fff"/>
          <circle cx="6" cy="3" r="0.8" fill="#fff"/>
        </svg>
      </div>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#07c160" }}>WeChat</span>
    </div>
  );

  const KlarnaLogo = (
    <div style={{
      padding: "3px 7px", background: "#ffa8cd", borderRadius: 4,
      fontSize: 9, fontWeight: 800, color: "#17120f", letterSpacing: "-0.02em",
      fontFamily: "Arial, sans-serif",
    }}>Klarna.</div>
  );

  const PromptPayLogo = (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        background: "linear-gradient(135deg, #004c99 0%, #0066cc 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 800, color: "#fff",
      }}>฿</div>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#004c99" }}>PromptPay</span>
    </div>
  );

  const opts = [
    { id: "credit",    label: "Credit Card", logo: <VisaMC /> },
    { id: "apple",     label: "Apple Pay",   logo: <ApplePay /> },
    { id: "paypal",    label: "PayPal",      logo: <PayPalLogo /> },
    { id: "google",    label: "Google Pay",  logo: <GooglePay /> },
    { id: "alipay",    label: "Alipay",      logo: AlipayLogo },
    { id: "wechat",    label: "WeChat Pay",  logo: WeChatLogo },
    { id: "klarna",    label: "Klarna",      logo: KlarnaLogo },
    { id: "promptpay", label: "PromptPay",   logo: PromptPayLogo },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: FONT }}>
      <ScreenNav back="← Back" title="Checkout" />

      <div style={{ padding: "16px 18px 10px", flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
          Total amount
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#111827", letterSpacing: "-0.04em", lineHeight: 1 }}>
          $129.00
        </div>
      </div>

      <div style={{ padding: "0 18px 8px", flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Pay with
        </div>
      </div>

      <div style={{ padding: "0 18px", flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{
          display: "flex", flexDirection: "column", gap: 7,
          transform: `translateY(${-scrollOffset}px)`,
          transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
        {opts.map(({ id, label, logo }, idx) => {
          const active = selected && id === "credit";
          const visible = idx < visibleCount;
          return (
            <div key={id} style={{
              border: active ? `2px solid ${ACCENT}` : "1.5px solid #e5e7eb",
              borderRadius: 13,
              padding: "9px 11px",
              background: active ? "rgba(217,119,87,0.04)" : "#fff",
              display: "flex", alignItems: "center", gap: 9,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1), border-color 350ms ease, background 350ms ease",
            }}>
              <Radio active={active} />
              <span style={{ flex: 1, fontSize: 12, fontWeight: active ? 600 : 500, color: active ? "#111827" : "#374151" }}>
                {label}
              </span>
              {logo}
            </div>
          );
        })}
        </div>
      </div>

      <PayButton />
    </div>
  );
}

// ── Scene 2: Card entry form ───────────────────────────────────────────────────
function Scene2({ groups, name, btnPulse }: { groups: number; name: string; btnPulse: boolean }) {
  const GROUPS = ["4557", "2891", "3064", "7152"];
  const displayNum = GROUPS.map((g, i) => i < groups ? g : "••••").join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: FONT }}>
      <ScreenNav back="← Back" title="Card Details" />

      {/* Mini card preview */}
      <div style={{
        margin: "12px 18px 10px",
        height: 108,
        borderRadius: 14,
        background: "linear-gradient(135deg, #1e2860 0%, #0f1744 60%, #2d1a4e 100%)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}>
        {/* Subtle shimmer band */}
        <div style={{
          position: "absolute", top: 0, left: "-60%", width: "40%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          animation: "ps-card-shine 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        {/* Chip */}
        <div style={{
          position: "absolute", top: 18, left: 16,
          width: 30, height: 22, borderRadius: 4,
          background: "linear-gradient(135deg, #d4af37 0%, #b8942a 50%, #d4af37 100%)",
        }} />
        {/* Worldpay label */}
        <div style={{ position: "absolute", top: 20, right: 14, fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1 }}>
          WORLDPAY
        </div>
        {/* Card number */}
        <div style={{
          position: "absolute", bottom: 30, left: 16, right: 16,
          fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.95)",
          letterSpacing: 1.5, fontWeight: 600, whiteSpace: "nowrap",
        }}>
          {displayNum}
        </div>
        {/* Name */}
        <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 9, color: "rgba(255,255,255,0.65)", letterSpacing: 1 }}>
          {name || "CARDHOLDER NAME"}
          {name.length > 0 && name.length < 10 && (
            <span style={{ animation: "ps-cursor 1s step-end infinite", marginLeft: 1 }}>|</span>
          )}
        </div>
        {/* Expiry */}
        <div style={{ position: "absolute", bottom: 12, right: 14, fontSize: 9, color: "rgba(255,255,255,0.65)" }}>
          12/28
        </div>
      </div>

      {/* Form fields */}
      <div style={{ padding: "0 18px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Card number field */}
        <div>
          <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
            Card number
          </div>
          <div style={{
            height: 40, borderRadius: 10, border: "1.5px solid #e5e7eb",
            padding: "0 12px", display: "flex", alignItems: "center",
            fontFamily: "monospace", fontSize: 12, color: "#111827", letterSpacing: 1,
            background: "#fafafa", whiteSpace: "nowrap", overflow: "hidden",
          }}>
            {displayNum}
          </div>
        </div>

        {/* Name field */}
        <div>
          <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
            Cardholder name
          </div>
          <div style={{
            height: 40, borderRadius: 10, border: `1.5px solid ${name.length > 0 ? ACCENT : "#e5e7eb"}`,
            padding: "0 12px", display: "flex", alignItems: "center",
            fontSize: 12, color: "#111827", fontWeight: 500,
            background: name.length > 0 ? "rgba(217,119,87,0.03)" : "#fafafa",
            transition: "border-color 300ms ease",
          }}>
            {name}
            {name.length > 0 && name.length < 10 && (
              <span style={{ animation: "ps-cursor 1s step-end infinite", color: ACCENT, marginLeft: 1 }}>|</span>
            )}
          </div>
        </div>

        {/* Expiry + CVV row */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
              Expiry
            </div>
            <div style={{
              height: 40, borderRadius: 10, border: "1.5px solid #e5e7eb",
              padding: "0 12px", display: "flex", alignItems: "center",
              fontSize: 12, color: "#111827", background: "#fafafa",
            }}>
              12/28
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
              CVV
            </div>
            <div style={{
              height: 40, borderRadius: 10, border: "1.5px solid #e5e7eb",
              padding: "0 12px", display: "flex", alignItems: "center",
              fontSize: 12, color: "#111827", background: "#fafafa", letterSpacing: 4,
            }}>
              •••
            </div>
          </div>
        </div>
      </div>

      <PayButton pulse={btnPulse} />
    </div>
  );
}

// ── Scene 3: Payment success ───────────────────────────────────────────────────
function Scene3() {
  const particles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * 2 * Math.PI;
    const px = Math.round(Math.cos(angle) * 56);
    const py = Math.round(Math.sin(angle) * 56);
    return { px, py, delay: `${i * 80}ms` };
  });

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", fontFamily: FONT, position: "relative",
      padding: "0 24px",
    }}>
      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 8, height: 8, borderRadius: "50%",
          background: "#10b981",
          transformOrigin: "center",
          animation: `ps-particle 900ms ease-out ${p.delay} both`,
          ["--px" as string]: `${p.px}px`,
          ["--py" as string]: `${p.py}px`,
        }} />
      ))}

      {/* Checkmark circle */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
        animation: "ps-check-bounce 600ms cubic-bezier(0.34,1.56,0.64,1) both",
        boxShadow: "0 8px 24px rgba(16,185,129,0.35)",
      }}>
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" aria-hidden="true">
          <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="22" strokeDashoffset="22"
            style={{ animation: "ps-check-draw 450ms ease 300ms both" }}
          />
        </svg>
      </div>

      {/* Title */}
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px", marginBottom: 6 }}>
        Payment approved
      </div>

      {/* Amount */}
      <div style={{ fontSize: 38, fontWeight: 800, color: ACCENT, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 18 }}>
        $129.00
      </div>

      {/* Details */}
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
        Charged to •••• 4242
      </div>

      {/* Provider pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 100,
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
        marginBottom: 24,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
        <span style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>via Worldpay · 38ms</span>
      </div>

      {/* Done button */}
      <div style={{
        width: "100%", height: 44, borderRadius: 100,
        background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Done</span>
      </div>
    </div>
  );
}

// ── Main PhoneScreen ───────────────────────────────────────────────────────────
export default function PhoneScreen() {
  const [scene, setScene] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const [s1Selected, setS1Selected] = useState(false);
  const [s2Groups,   setS2Groups]   = useState(0);
  const [s2Name,     setS2Name]     = useState("");
  const [s2BtnPulse, setS2BtnPulse] = useState(false);
  const [s1Options, setS1Options] = useState(0);
  const [s1Scroll,  setS1Scroll]  = useState(0);

  useEffect(() => {
    setFadeOut(false);
    setS1Selected(false);
    setS2Groups(0);
    setS2Name("");
    setS2BtnPulse(false);
    setS1Options(0);
    setS1Scroll(0);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const dur = SCENE_DURATIONS[scene];

    if (scene === 0) {
      // Phase 1: fade in first 4 options
      timers.push(setTimeout(() => setS1Options(1), 200));
      timers.push(setTimeout(() => setS1Options(2), 400));
      timers.push(setTimeout(() => setS1Options(3), 600));
      timers.push(setTimeout(() => setS1Options(4), 800));
      // Phase 2: scroll down to reveal more APMs + fade them in
      timers.push(setTimeout(() => setS1Scroll(140), 1400));
      timers.push(setTimeout(() => setS1Options(5), 1500));
      timers.push(setTimeout(() => setS1Options(6), 1700));
      timers.push(setTimeout(() => setS1Options(7), 1900));
      timers.push(setTimeout(() => setS1Options(8), 2100));
      // Phase 3: scroll back up to top
      timers.push(setTimeout(() => setS1Scroll(0), 3400));
      // Phase 4: select credit card
      timers.push(setTimeout(() => setS1Selected(true), 4500));
    } else if (scene === 1) {
      const FULL = "JOHN ROBIN";
      timers.push(setTimeout(() => setS2Groups(1), 300));
      timers.push(setTimeout(() => setS2Groups(2), 650));
      timers.push(setTimeout(() => setS2Groups(3), 1000));
      timers.push(setTimeout(() => setS2Groups(4), 1350));
      FULL.split("").forEach((_, i) => {
        timers.push(setTimeout(() => setS2Name(FULL.slice(0, i + 1)), 1300 + i * 50));
      });
      timers.push(setTimeout(() => setS2BtnPulse(true), 3500));
    }

    timers.push(setTimeout(() => setFadeOut(true), dur - FADE));
    timers.push(setTimeout(() => setScene(s => (s + 1) % 3), dur));

    return () => timers.forEach(clearTimeout);
  }, [scene]);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#fafaf7",
      borderRadius: "inherit",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`
        @keyframes ps-check-bounce {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ps-check-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ps-particle {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; }
        }
        @keyframes ps-btn-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(217,119,87,0.4), inset 0 1px 0 rgba(255,255,255,0.4); }
          50%       { box-shadow: 0 4px 32px rgba(217,119,87,0.75), 0 0 0 5px rgba(217,119,87,0.18), inset 0 1px 0 rgba(255,255,255,0.4); }
        }
        @keyframes ps-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes ps-card-shine {
          0%   { left: -60%; }
          40%  { left: 130%; }
          100% { left: 130%; }
        }
      `}</style>

      {/* Glass reflection */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none",
        background: "linear-gradient(138deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
        borderRadius: "inherit",
      }} />

      <div style={{ opacity: fadeOut ? 0 : 1, transition: `opacity ${FADE}ms ease`, height: "100%" }}>
        {scene === 0 && <Scene1 selected={s1Selected} visibleCount={s1Options} scrollOffset={s1Scroll} />}
        {scene === 1 && <Scene2 groups={s2Groups} name={s2Name} btnPulse={s2BtnPulse} />}
        {scene === 2 && <Scene3 />}
      </div>
    </div>
  );
}
