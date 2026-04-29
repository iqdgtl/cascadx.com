"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SectionHead from "./ui/SectionHead";

/* ================================================================
   Card 1 — Looping typewriter credit card
   ================================================================ */
function CreditCardTypewriter({ trigger }: { trigger: boolean }) {
  const full = "4582 1234 5678 9012";
  const blank = "•••• •••• •••• ••••";
  const [text, setText] = useState(blank);
  const [cursorPos, setCursorPos] = useState(-1);

  useEffect(() => {
    if (!trigger) return;
    let cancelled = false;

    const runCycle = () => {
      let i = 0;
      setText(blank);
      setCursorPos(0);

      const type = setInterval(() => {
        if (cancelled) { clearInterval(type); return; }
        i++;
        if (i > full.length) {
          clearInterval(type);
          setCursorPos(-1);
          // pause 1.5s then restart
          setTimeout(() => {
            if (!cancelled) runCycle();
          }, 1500);
          return;
        }
        // build: typed portion + remaining dots
        const typed = full.slice(0, i);
        const rest = blank.slice(i);
        setText(typed + rest);
        setCursorPos(i);
      }, 120);
    };

    const startDelay = setTimeout(runCycle, 300);
    return () => { cancelled = true; clearTimeout(startDelay); };
  }, [trigger]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto h-[180px] bg-gradient-to-br from-ink to-[#1a2622] rounded-[var(--radius)] p-5 flex flex-col justify-between overflow-hidden">
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      {/* Top row: chip + brand */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-6 rounded-[3px] bg-gradient-to-br from-[#d4a853] to-[#c49a3a]" />
          <svg width="20" height="14" viewBox="0 0 20 14" className="opacity-40">
            <circle cx="7" cy="7" r="6" fill="none" stroke="#fff" strokeWidth="0.8" />
            <circle cx="13" cy="7" r="6" fill="none" stroke="#fff" strokeWidth="0.8" />
          </svg>
        </div>
        {/* Visa mini */}
        <svg viewBox="0 0 48 16" className="w-[36px] h-[12px]">
          <text x="0" y="13" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="15" fill="rgba(255,255,255,0.5)" letterSpacing="-0.5">VISA</text>
        </svg>
      </div>

      {/* Card number with cursor */}
      <div className="font-display font-semibold text-[18px] tracking-[0.08em] text-white/90 relative">
        {text}
        {cursorPos >= 0 && (
          <span className="inline-block w-[2px] h-[18px] bg-accent ml-[1px] align-middle animate-[pulse_0.8s_step-end_infinite]" />
        )}
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-end">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 mb-0.5">Cardholder Name</div>
          <div className="font-display font-medium text-[12px] text-white/70 tracking-[0.02em]">ALEX MERCER</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 mb-0.5">Valid Thru</div>
          <div className="font-display font-medium text-[12px] text-white/70">12/28</div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Card 2 — AI routing with cycling highlight
   ================================================================ */
function RoutingViz({ trigger }: { trigger: boolean }) {
  const [chosen, setChosen] = useState(-1);

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const cycle = setInterval(() => {
      setChosen(i % 3);
      i++;
    }, 1200);
    // initial delay
    const start = setTimeout(() => setChosen(0), 600);
    return () => { clearInterval(cycle); clearTimeout(start); };
  }, [trigger]);

  const psps = [
    { name: "Stripe", color: "#635BFF", approval: "94%" },
    { name: "Adyen", color: "#0ABF53", approval: "89%" },
    { name: "Checkout", color: "#0b1512", approval: "96%" },
  ];

  return (
    <div className="relative w-full max-w-[280px] mx-auto h-[180px] flex items-center justify-center">
      {/* SVG connections */}
      <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full pointer-events-none">
        {psps.map((psp, i) => {
          const angle = -90 + i * 60;
          const rad = (angle * Math.PI) / 180;
          const ex = 140 + Math.cos(rad) * 80;
          const ey = 90 + Math.sin(rad) * 65;
          const isChosen = i === chosen;
          return (
            <g key={psp.name}>
              <line
                x1="140" y1="90" x2={ex} y2={ey}
                stroke={isChosen ? "#d97757" : "rgba(255,255,255,0.08)"}
                strokeWidth={isChosen ? "2" : "1"}
                strokeDasharray={isChosen ? "none" : "3 3"}
                className="transition-all duration-500"
              />
              {isChosen && (
                <circle r="3.5" fill="#d97757">
                  <animateMotion
                    dur="1.2s"
                    repeatCount="indefinite"
                    path={`M140,90 L${ex},${ey}`}
                  />
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* AI center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent grid place-items-center z-10 shadow-[0_0_20px_rgba(217,119,87,0.4)]">
        <span className="font-mono text-[10px] font-bold text-ink">AI</span>
        <div className="absolute inset-[-4px] rounded-full border border-accent opacity-40 animate-[pulse_2s_ease-in-out_infinite]" />
      </div>

      {/* PSP nodes */}
      {psps.map((psp, i) => {
        const angle = -90 + i * 60;
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + (Math.cos(rad) * 30);
        const cy = 50 + (Math.sin(rad) * 36);
        const isChosen = i === chosen;

        return (
          <div
            key={psp.name}
            className={`absolute flex flex-col items-center gap-1 transition-all duration-500 ${isChosen ? "scale-110" : "scale-100"}`}
            style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%, -50%)${isChosen ? " scale(1.1)" : ""}` }}
          >
            <div
              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-bold transition-all duration-500 ${
                isChosen
                  ? "bg-accent-ice border-accent shadow-[0_4px_12px_rgba(217,119,87,0.3)]"
                  : "bg-surface border-line"
              }`}
              style={{ color: psp.color }}
            >
              {psp.name}
            </div>
            <span className={`font-mono text-[9px] transition-all duration-500 ${isChosen ? "text-accent-deep font-bold" : "text-ink-muted"}`}>
              {psp.approval}{isChosen ? " ✓" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   Card 3 — Success checkmark with confetti + counter
   ================================================================ */
function SuccessCheck({ trigger }: { trigger: boolean }) {
  const [count, setCount] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    // trigger draw
    const d = setTimeout(() => setDrawn(true), 200);

    // count up
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - start) / 1500, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(parseFloat((ease * 48.2).toFixed(2)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(d); };
  }, [trigger]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto h-[180px] flex flex-col items-center justify-center gap-3">
      {/* Confetti dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = i * 90 + 45;
        const rad = (angle * Math.PI) / 180;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent"
            style={{
              left: `calc(50% + ${Math.cos(rad) * 55}px)`,
              top: `calc(42% + ${Math.sin(rad) * 55}px)`,
              animation: drawn ? `pulse 1.8s ease-in-out ${i * 0.2}s infinite` : "none",
              opacity: drawn ? 0.6 : 0,
              transition: "opacity 0.5s",
            }}
          />
        );
      })}

      {/* Checkmark */}
      <div className="relative w-[100px] h-[100px]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Ring */}
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="#d97757"
            strokeWidth="3"
            strokeDasharray="264"
            strokeDashoffset={drawn ? "0" : "264"}
            style={{ transition: "stroke-dashoffset 1.2s ease" }}
          />
          {/* Check */}
          <path
            d="M30 52 l14 14 l26-30"
            fill="none"
            stroke="#d97757"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            strokeDashoffset={drawn ? "0" : "80"}
            style={{ transition: "stroke-dashoffset 0.8s ease 0.7s" }}
          />
        </svg>
      </div>

      {/* Counter */}
      <div className="font-display font-[700] text-[24px] tracking-[-0.02em] text-accent-deep">
        +${count.toFixed(2)} <span className="text-sm text-ink-muted font-mono font-normal">recovered</span>
      </div>
    </div>
  );
}

/* ================================================================
   Status Chip
   ================================================================ */
function StatusChip({ label, variant }: { label: string; variant: "default" | "pulse" | "success" }) {
  const colors = {
    default: "bg-bg border-line text-ink-muted",
    pulse: "bg-accent-ice border-accent text-accent-deep",
    success: "bg-accent text-ink animate-[pulse_2s_ease-in-out_infinite]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-[0.06em] uppercase border ${colors[variant]}`}>
      {variant === "pulse" && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-deep animate-[pulse_1.6s_ease-in-out_infinite]" />
      )}
      {label}
    </span>
  );
}

/* ================================================================
   Connecting Arrow
   ================================================================ */
function ConnectArrow() {
  return (
    <div className="flex items-center justify-center shrink-0 py-4 lg:py-0">
      {/* Horizontal on desktop */}
      <svg width="56" height="24" viewBox="0 0 56 24" fill="none" className="hidden lg:block">
        <line x1="0" y1="12" x2="44" y2="12" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M42 6 l10 6 -10 6" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="3" fill="#d97757">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,12 L44,12" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
      {/* Vertical on mobile */}
      <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="block lg:hidden">
        <line x1="12" y1="0" x2="12" y2="38" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M6 36 l6 10 6-10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="3" fill="#d97757">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M12,0 L12,38" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ================================================================
   Main Section
   ================================================================ */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cards = [
    {
      step: "01",
      stepLabel: "Step 01 · Customer pays",
      title: "Card details captured",
      desc: "Card details captured at checkout",
      chip: <StatusChip label="Received" variant="default" />,
      visual: <CreditCardTypewriter trigger={visible} />,
      delay: "0s",
    },
    {
      step: "02",
      stepLabel: "Step 02 · CascadX routes",
      title: "AI picks the best PSP",
      desc: "AI picks the best PSP in <40ms",
      chip: <StatusChip label="Routing" variant="pulse" />,
      visual: <RoutingViz trigger={visible} />,
      delay: "0.15s",
    },
    {
      step: "03",
      stepLabel: "Step 03 · Payment approved",
      title: "Transaction captured",
      desc: "Transaction captured",
      chip: <StatusChip label="Approved" variant="success" />,
      visual: <SuccessCheck trigger={visible} />,
      delay: "0.3s",
    },
  ];

  return (
    <section className="relative z-[2] py-[120px] px-7 bg-bg-alt border-t border-b border-line">
      <div className="max-w-[var(--max)] mx-auto" ref={sectionRef}>
        <SectionHead
          kicker="How It Works"
          title={
            <>
              Three steps. <em className="not-italic font-[800] text-accent-deep">One outcome</em>: revenue recovered.
            </>
          }
          lede="From checkout to capture, CascadX orchestrates the entire transaction — finding the fastest path to approval in real time."
        />

        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {cards.map((card, i) => (
            <div key={card.step} className="contents">
              {/* Card */}
              <div
                className="relative flex-1 bg-surface-el rounded-[var(--radius-lg)] border border-line shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-30px_rgba(0,0,0,0.4)] p-6 flex flex-col gap-4 min-h-[380px] opacity-0 translate-y-3 overflow-hidden"
                style={{
                  animation: visible
                    ? `msgIn 0.5s cubic-bezier(0.2,0.8,0.2,1) ${card.delay} forwards`
                    : "none",
                }}
              >
                {/* Large background number */}
                <span className="absolute top-4 right-5 font-display font-[800] text-[60px] leading-none text-accent-deep opacity-[0.12] select-none pointer-events-none">
                  {card.step}
                </span>

                {/* Step label */}
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                  {card.stepLabel}
                </div>

                {/* Visual — takes up the main space */}
                <div className="flex-1 flex items-center justify-center">
                  {card.visual}
                </div>

                {/* Bottom: title + chip */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-line">
                  <div>
                    <h4 className="font-display font-[700] text-[22px] tracking-[-0.02em] mb-0.5">{card.title}</h4>
                    <p className="text-sm text-ink-muted m-0">{card.desc}</p>
                  </div>
                  {card.chip}
                </div>
              </div>

              {/* Arrow between cards */}
              {i < cards.length - 1 && <ConnectArrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
