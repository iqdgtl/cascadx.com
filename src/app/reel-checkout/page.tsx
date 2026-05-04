"use client";

import { useEffect, useState, useRef } from "react";

/* ================================================================
   Reuse exact homepage HowItWorks step visuals
   ================================================================ */

/* Step 1 — Credit card typewriter */
function CardStep({ active }: { active: boolean }) {
  const full = "4582 1234 5678 9012";
  const blank = "•••• •••• •••• ••••";
  const [text, setText] = useState(blank);
  const [cursorPos, setCursorPos] = useState(-1);

  useEffect(() => {
    if (!active) { setText(blank); setCursorPos(-1); return; }
    let cancelled = false;
    let i = 0;
    setCursorPos(0);
    const type = setInterval(() => {
      if (cancelled) { clearInterval(type); return; }
      i++;
      if (i > full.length) { clearInterval(type); setCursorPos(-1); return; }
      setText(full.slice(0, i) + blank.slice(i));
      setCursorPos(i);
    }, 120);
    return () => { cancelled = true; clearInterval(type); };
  }, [active]);

  return (
    <div className="w-full max-w-[340px] mx-auto">
      {/* Big background number */}
      <span className="absolute top-4 right-6 font-display font-[800] text-[200px] leading-none text-[#d97757] opacity-[0.06] select-none pointer-events-none">01</span>
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-4">Step 01 · Customer pays</div>
      {/* Card */}
      <div className="relative w-full h-[200px] bg-gradient-to-br from-[#fafaf7] from-0% to-[#1a2622] to-0% rounded-[14px] p-6 flex flex-col justify-between overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0f0e 0%, #1a2622 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#d97757]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-7 rounded-[3px] bg-gradient-to-br from-[#d4a853] to-[#c49a3a]" />
            <svg width="20" height="14" viewBox="0 0 20 14" className="opacity-40"><circle cx="7" cy="7" r="6" fill="none" stroke="#fff" strokeWidth="0.8" /><circle cx="13" cy="7" r="6" fill="none" stroke="#fff" strokeWidth="0.8" /></svg>
          </div>
          <svg viewBox="0 0 48 16" className="w-[36px] h-[12px]"><text x="0" y="13" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="15" fill="rgba(255,255,255,0.5)" letterSpacing="-0.5">VISA</text></svg>
        </div>
        <div className="font-display font-semibold text-[20px] tracking-[0.08em] text-white/90 relative">
          {text}
          {cursorPos >= 0 && <span className="inline-block w-[2px] h-[20px] bg-[#d97757] ml-[1px] align-middle animate-[pulse_0.8s_step-end_infinite]" />}
        </div>
        <div className="flex justify-between items-end">
          <div><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 mb-0.5">Cardholder Name</div><div className="font-display font-medium text-[13px] text-white/70">ALEX MERCER</div></div>
          <div className="text-right"><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 mb-0.5">Valid Thru</div><div className="font-display font-medium text-[13px] text-white/70">12/28</div></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.08]">
        <div><h4 className="font-display font-[700] text-[22px] tracking-[-0.02em] mb-0.5 text-[#fafaf7]">Card details captured</h4><p className="text-sm text-[#7a8178]">Card details captured at checkout</p></div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-[0.06em] uppercase border bg-[#0d0f0e] border-white/[0.08] text-[#7a8178]">Received</span>
      </div>
    </div>
  );
}

/* Step 2 — AI routing */
function RoutingStep({ active }: { active: boolean }) {
  const [chosen, setChosen] = useState(-1);
  useEffect(() => {
    if (!active) { setChosen(-1); return; }
    let i = 0;
    const start = setTimeout(() => setChosen(0), 600);
    const cycle = setInterval(() => { i++; setChosen(i % 3); }, 1200);
    return () => { clearTimeout(start); clearInterval(cycle); };
  }, [active]);

  const psps = [
    { name: "Stripe", color: "#635BFF", approval: "94%" },
    { name: "Adyen", color: "#0ABF53", approval: "89%" },
    { name: "Checkout", color: "#0d0f0e", approval: "96%" },
  ];

  return (
    <div className="w-full max-w-[340px] mx-auto">
      <span className="absolute top-4 right-6 font-display font-[800] text-[200px] leading-none text-[#d97757] opacity-[0.06] select-none pointer-events-none">02</span>
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-4">Step 02 · CascadX routes</div>
      <div className="relative w-full h-[200px] flex items-center justify-center">
        <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full pointer-events-none">
          {psps.map((psp, i) => {
            const angle = -90 + i * 60;
            const rad = (angle * Math.PI) / 180;
            const ex = 140 + Math.cos(rad) * 80;
            const ey = 90 + Math.sin(rad) * 65;
            const isChosen = i === chosen;
            return (<g key={psp.name}><line x1="140" y1="90" x2={ex} y2={ey} stroke={isChosen ? "#d97757" : "rgba(255,255,255,0.08)"} strokeWidth={isChosen ? "2" : "1"} strokeDasharray={isChosen ? "none" : "3 3"} className="transition-all duration-500" />{isChosen && <circle r="3.5" fill="#d97757"><animateMotion dur="1.2s" repeatCount="indefinite" path={`M140,90 L${ex},${ey}`} /><animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" /></circle>}</g>);
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#d97757] grid place-items-center z-10 shadow-[0_0_20px_rgba(217,119,87,0.4)]">
          <span className="font-mono text-[11px] font-bold text-[#fafaf7]">AI</span>
          <div className="absolute inset-[-4px] rounded-full border border-[#d97757] opacity-40 animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
        {psps.map((psp, i) => {
          const angle = -90 + i * 60;
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + Math.cos(rad) * 30;
          const cy = 50 + Math.sin(rad) * 36;
          const isChosen = i === chosen;
          return (<div key={psp.name} className={`absolute flex flex-col items-center gap-1 transition-all duration-500 ${isChosen ? "scale-110" : ""}`} style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%,-50%)${isChosen ? " scale(1.1)" : ""}` }}>
            <div className={`px-3 py-1.5 rounded-lg border text-[12px] font-mono font-bold transition-all duration-500 ${isChosen ? "bg-[rgba(217,119,87,0.1)] border-[#d97757] shadow-[0_4px_12px_rgba(217,119,87,0.3)]" : "bg-[#1e2423] border-white/[0.08]"}`} style={{ color: psp.color }}>{psp.name}</div>
            <span className={`font-mono text-[10px] transition-all duration-500 ${isChosen ? "text-[#b35a3e] font-bold" : "text-[#7a8178]"}`}>{psp.approval}{isChosen ? " ✓" : ""}</span>
          </div>);
        })}
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.08]">
        <div><h4 className="font-display font-[700] text-[22px] tracking-[-0.02em] mb-0.5 text-[#fafaf7]">AI picks the best PSP</h4><p className="text-sm text-[#7a8178]">AI picks the best PSP in &lt;40ms</p></div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-[0.06em] uppercase border bg-[rgba(217,119,87,0.1)] border-[#d97757] text-[#b35a3e]"><span className="w-1.5 h-1.5 rounded-full bg-[#b35a3e] animate-[pulse_1.6s_ease-in-out_infinite]" />Routing</span>
      </div>
    </div>
  );
}

/* Step 3 — Success checkmark */
function SuccessStep({ active }: { active: boolean }) {
  const [drawn, setDrawn] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) { setDrawn(false); setCount(0); return; }
    const d = setTimeout(() => setDrawn(true), 200);
    const start = performance.now();
    let raf: number;
    const step = (now: number) => { const p = Math.min((now - start) / 1500, 1); setCount(parseFloat(((1 - Math.pow(1 - p, 3)) * 48.2).toFixed(2))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(d); };
  }, [active]);

  return (
    <div className="w-full max-w-[340px] mx-auto">
      <span className="absolute top-4 right-6 font-display font-[800] text-[200px] leading-none text-[#d97757] opacity-[0.06] select-none pointer-events-none">03</span>
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-4">Step 03 · Payment approved</div>
      <div className="relative w-full h-[200px] flex flex-col items-center justify-center gap-4">
        {/* Confetti */}
        {[0, 1, 2, 3].map((i) => {
          const angle = i * 90 + 45;
          const rad = (angle * Math.PI) / 180;
          return <div key={i} className="absolute w-2 h-2 rounded-full bg-[#d97757]" style={{ left: `calc(50% + ${Math.cos(rad) * 60}px)`, top: `calc(40% + ${Math.sin(rad) * 60}px)`, animation: drawn ? `pulse 1.8s ease-in-out ${i * 0.2}s infinite` : "none", opacity: drawn ? 0.6 : 0, transition: "opacity 0.5s" }} />;
        })}
        <div className="relative w-[110px] h-[110px]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#d97757" strokeWidth="3" strokeDasharray="264" strokeDashoffset={drawn ? "0" : "264"} style={{ transition: "stroke-dashoffset 1.2s ease" }} />
            <path d="M30 52 l14 14 l26-30" fill="none" stroke="#d97757" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset={drawn ? "0" : "80"} style={{ transition: "stroke-dashoffset 0.8s ease 0.7s" }} />
          </svg>
        </div>
        <div className="font-display font-[700] text-[26px] tracking-[-0.02em] text-[#b35a3e]">
          +${count.toFixed(2)} <span className="text-sm text-[#7a8178] font-mono font-normal">recovered</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.08]">
        <div><h4 className="font-display font-[700] text-[22px] tracking-[-0.02em] mb-0.5 text-[#fafaf7]">Transaction captured</h4><p className="text-sm text-[#7a8178]">Transaction captured</p></div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-[0.06em] uppercase border bg-[#d97757] text-[#0d0f0e] animate-[pulse_2s_ease-in-out_infinite]">Approved</span>
      </div>
    </div>
  );
}

/* ================================================================
   Main page — sequential step playback
   ================================================================ */
export default function ReelCheckout() {
  const [t, setT] = useState(-1);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const LOOP = 12000;

  useEffect(() => {
    const ready = setTimeout(() => {
      startRef.current = performance.now();
      const tick = () => {
        setT((performance.now() - startRef.current) % LOOP);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(ready); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Which step is active (sequential, one at a time)
  // 0-4s: step 1, 4-4.5s: transition, 4.5-8.5s: step 2, 8.5-9s: transition, 9-12s: step 3
  const step = t < 4000 ? 0 : t < 4500 ? -1 : t < 8500 ? 1 : t < 9000 ? -1 : 2;

  // Fade for each step
  const fade0 = t < 3500 ? 1 : t < 4000 ? 1 - (t - 3500) / 500 : 0;
  const fade1 = t < 4500 ? 0 : t < 5000 ? (t - 4500) / 500 : t < 8000 ? 1 : t < 8500 ? 1 - (t - 8000) / 500 : 0;
  const fade2 = t < 9000 ? 0 : t < 9500 ? (t - 9000) / 500 : t < 11500 ? 1 : 1 - (t - 11500) / 500;

  const slide0 = t < 3500 ? 0 : t < 4000 ? -30 * ((t - 3500) / 500) : -30;
  const slide1 = t < 4500 ? 30 : t < 5000 ? 30 * (1 - (t - 4500) / 500) : t < 8000 ? 0 : -30 * ((t - 8000) / 500);
  const slide2 = t < 9000 ? 30 : t < 9500 ? 30 * (1 - (t - 9000) / 500) : 0;

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30 z-10">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="font-mono text-[10px] text-white/40">REC</span>
      </div>

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(400px_400px_at_50%_50%,rgba(217,119,87,0.06),transparent_70%)]" />

      {/* Step container — centered, same position for all steps */}
      <div className="relative w-full max-w-[480px] px-8">
        {/* Step 1 */}
        <div className="absolute inset-0 px-8 flex items-center justify-center" style={{ opacity: fade0, transform: `translateY(${slide0}px)`, pointerEvents: step === 0 ? "auto" : "none" }}>
          <CardStep active={step === 0} />
        </div>

        {/* Step 2 */}
        <div className="absolute inset-0 px-8 flex items-center justify-center" style={{ opacity: fade1, transform: `translateY(${slide1}px)`, pointerEvents: step === 1 ? "auto" : "none" }}>
          <RoutingStep active={step === 1} />
        </div>

        {/* Step 3 */}
        <div className="absolute inset-0 px-8 flex items-center justify-center" style={{ opacity: fade2, transform: `translateY(${slide2}px)`, pointerEvents: step === 2 ? "auto" : "none" }}>
          <SuccessStep active={step === 2} />
        </div>
      </div>
    </div>
  );
}
