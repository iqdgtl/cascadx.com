"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";

const LOOP = 10000;
const LETTER_IN = 0, LETTER_DUR = 1500;
const LETTER_HOLD = 1500; // letter alone
const LETTER_BREATH_END = 2500;
const TYPE_START = 2500, CHAR_MS = 65;
const HOLD_START = 7000, HOLD_DUR = 1500;
const OUTRO_START = 8500, OUTRO_DUR = 1500;

type BgVariant = "cascade" | "neural" | "path" | "capture" | "world" | "timer" | "cross";

function genDelays(len: number): number[] {
  const seed = [62, 78, 55, 72, 67, 80, 58, 74, 69, 63, 77, 56, 71, 65, 81, 57, 73, 68, 61, 76];
  return Array.from({ length: len }, (_, i) => seed[i % seed.length]);
}

/* ================================================================
   Background animations — tech-style, subtle
   ================================================================ */

function BgCascade({ t }: { t: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 8 + i * 7.5;
        return (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2="100" stroke={pastel.accent} strokeWidth="0.15" />
            {[0, 1, 2].map(j => {
              const offset = ((t / 3000 + i * 0.12 + j * 0.33) % 1) * 100;
              return <circle key={j} cx={x} cy={offset} r="0.6" fill={pastel.accent} opacity="0.35" />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

function BgNeural({ t }: { t: number }) {
  const nodes = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    x: 10 + (i * 37 + i * i * 7) % 80,
    y: 10 + (i * 53 + i * i * 3) % 80,
  })), []);
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.07 }}>
      {nodes.map((a, i) => nodes.slice(i + 1).filter(b => Math.hypot(a.x - b.x, a.y - b.y) < 25).map((b, j) => (
        <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={pastel.accent} strokeWidth="0.1" />
      )))}
      {nodes.map((n, i) => {
        const pulse = Math.sin(t / 800 + i * 1.1);
        return <circle key={i} cx={n.x} cy={n.y} r={0.4 + 0.3 * Math.max(0, pulse)} fill={pastel.accent} opacity={0.3 + 0.5 * Math.max(0, pulse)} />;
      })}
    </svg>
  );
}

function BgPath({ t }: { t: number }) {
  const cycle = (t / 6000) % 1;
  const len = Math.min(1, cycle * 1.5);
  const fade = cycle > 0.8 ? 1 - (cycle - 0.8) / 0.2 : 1;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.1 * fade }}>
      <path d="M5,50 C20,30 35,70 50,45 C65,20 75,60 95,40" fill="none" stroke={pastel.accent} strokeWidth="0.25" strokeDasharray="300" strokeDashoffset={300 * (1 - len)} />
      {[25, 50, 75].map((pct, i) => {
        const show = len > pct / 100;
        return show && <circle key={i} cx={pct === 25 ? 27 : pct === 50 ? 50 : 75} cy={pct === 25 ? 48 : pct === 50 ? 45 : 50} r="1" fill={pastel.accent} opacity="0.4" />;
      })}
    </svg>
  );
}

function BgCapture({ t }: { t: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.06 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="5" y1={30 + i * 10} x2="95" y2={30 + i * 10} stroke={pastel.accent} strokeWidth="0.08" strokeDasharray="0.5 1" />
      ))}
      {Array.from({ length: 40 }).map((_, i) => {
        const seed = (i * 73 + 17) % 100;
        const drift = Math.sin(t / 2000 + i * 0.5) * 3;
        const converge = Math.sin(t / 4000 + i * 0.2) * 0.3;
        const x = 10 + seed * 0.8 + drift + (50 - (10 + seed * 0.8)) * Math.max(0, converge);
        const y = 20 + ((i * 47) % 60) + Math.cos(t / 3000 + i * 0.7) * 2;
        return <circle key={i} cx={x} cy={y} r="0.25" fill={pastel.accent} opacity="0.25" />;
      })}
    </svg>
  );
}

function BgWorld({ t }: { t: number }) {
  const pings = useMemo(() => [
    { x: 25, y: 35 }, { x: 65, y: 30 }, { x: 45, y: 55 },
    { x: 15, y: 60 }, { x: 75, y: 50 }, { x: 55, y: 70 },
    { x: 35, y: 42 }, { x: 80, y: 38 },
  ], []);
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
      <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke={pastel.accent} strokeWidth="0.12" />
      <ellipse cx="50" cy="50" rx="20" ry="25" fill="none" stroke={pastel.accent} strokeWidth="0.1" />
      <line x1="10" y1="50" x2="90" y2="50" stroke={pastel.accent} strokeWidth="0.08" />
      {pings.map((p, i) => {
        const phase = ((t / 2500 + i * 0.35) % 1);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={0.4 + phase * 4} fill="none" stroke={pastel.accent} strokeWidth="0.1" opacity={Math.max(0, 0.5 - phase * 0.6)} />
            <circle cx={p.x} cy={p.y} r="0.4" fill={pastel.accent} opacity={phase < 0.3 ? 0.6 : 0.2} />
          </g>
        );
      })}
    </svg>
  );
}

function BgTimer({ t }: { t: number }) {
  const sweep = ((t / 38) % 360); // 38ms per full rotation — fast!
  const rad = (sweep - 90) * Math.PI / 180;
  const msDisplay = 37 + Math.floor(((t / 800) % 3));
  const flashOpacity = (t % 2000 < 300) ? 0.4 : 0;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
      <circle cx="75" cy="25" r="12" fill="none" stroke={pastel.accent} strokeWidth="0.15" />
      <line x1="75" y1="25" x2={75 + 10 * Math.cos(rad)} y2={25 + 10 * Math.sin(rad)} stroke={pastel.accent} strokeWidth="0.2" />
      <text x="75" y="26" textAnchor="middle" fill={pastel.accent} fontSize="3" fontFamily="Inter,sans-serif" fontWeight="700" opacity={flashOpacity}>{msDisplay}ms</text>
    </svg>
  );
}

function BgCross({ t }: { t: number }) {
  const len = Math.min(1, Math.max(0, t / 3000));
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
      {/* Declined line (grey) */}
      <line x1="15" y1="25" x2={15 + 70 * len} y2={25 + 50 * len} stroke="#999" strokeWidth="0.4" opacity="0.5" />
      {/* Approved line (terracotta) */}
      <line x1="85" y1="25" x2={85 - 70 * len} y2={25 + 50 * len} stroke={pastel.accent} strokeWidth="0.5" />
      {/* Flash at center where they cross */}
      {len >= 0.9 && (
        <circle cx="50" cy="50" r={1 + 2 * Math.abs(Math.sin(t / 200))} fill="#fff" opacity={0.15 * Math.abs(Math.sin(t / 200))} />
      )}
      {/* Data packets */}
      {len > 0.3 && [0, 1].map(i => {
        const pPhase = ((t / 2000 + i * 0.5) % 1);
        const isApproved = i === 1;
        const sx = isApproved ? 85 : 15;
        const sy = 25;
        const ex = isApproved ? 15 : 85;
        const ey = 75;
        return <circle key={i} cx={sx + (ex - sx) * pPhase} cy={sy + (ey - sy) * pPhase} r="0.5" fill={isApproved ? pastel.accent : "#999"} opacity={0.4} />;
      })}
    </svg>
  );
}

const bgMap: Record<BgVariant, React.FC<{ t: number }>> = {
  cascade: BgCascade, neural: BgNeural, path: BgPath,
  capture: BgCapture, world: BgWorld, timer: BgTimer, cross: BgCross,
};

/* ================================================================
   Main component
   ================================================================ */
export default function LetterReel({ letter, phrase, bgVariant }: { letter: string; phrase: string; bgVariant: BgVariant }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const letterP = ease(Math.max(0, Math.min(1, (t - LETTER_IN) / LETTER_DUR)));
  const letterBreath = t >= LETTER_HOLD && t < LETTER_BREATH_END ? 1 + 0.02 * Math.sin(((t - LETTER_HOLD) / 1000) * Math.PI) : 1;
  const holdBreath = t >= HOLD_START && t < HOLD_START + HOLD_DUR ? 1 + 0.015 * Math.sin(((t - HOLD_START) / HOLD_DUR) * Math.PI) : 1;

  // Typewriter
  const delays = useMemo(() => genDelays(phrase.length), [phrase]);
  const cumulative = useMemo(() => { const a = [0]; for (let i = 0; i < delays.length; i++) a.push(a[i] + delays[i]); return a; }, [delays]);
  const typeElapsed = Math.max(0, t - TYPE_START);
  let chars = 0;
  for (let i = 0; i < cumulative.length; i++) { if (typeElapsed >= cumulative[i]) chars = i; }
  chars = Math.min(chars, phrase.length);
  const typing = t >= TYPE_START && chars < phrase.length;
  const phraseVisible = t >= TYPE_START;

  // Outro
  const outroP = ease(Math.max(0, (t - OUTRO_START) / OUTRO_DUR));
  const mainFade = t < OUTRO_START - 300 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 300)) / 300);

  const BgComponent = bgMap[bgVariant];

  // Logo outro
  const logoLetters = "CascadX".split("");
  const logoStarts = [
    { x: -80, y: -50, r: -12 }, { x: 60, y: -70, r: 10 }, { x: -40, y: 60, r: -8 },
    { x: 100, y: 40, r: 15 }, { x: -60, y: -25, r: -6 }, { x: 40, y: 80, r: 9 }, { x: -55, y: -65, r: -14 },
  ];

  return (
    /* Outer wrapper — centers the 9:16 frame in the viewport */
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      {/* 9:16 frame */}
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9 / 16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Background animation — runs from 0s, full frame */}
        <BgComponent t={Math.max(0, t)} />

        {/* Big letter — positioned at 25%-55% of frame height */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center"
          style={{
            top: "22%",
            height: "33%",
            opacity: mainFade,
          }}
        >
          <span
            className="font-display font-[800] leading-none select-none"
            style={{
              fontSize: "min(500px, 55vh, 70vw)",
              color: pastel.letter,
              opacity: 0.85 * letterP,
              transform: `scale(${(1.4 - 0.4 * letterP) * letterBreath * holdBreath * (1 - outroP * 0.6)})`,
            }}
          >
            {letter}
          </span>
        </div>

        {/* Phrase text — positioned at 60% of frame, below the letter */}
        {phraseVisible && (
          <div
            className="absolute left-0 right-0 flex justify-center px-[10%]"
            style={{ top: "60%", opacity: mainFade }}
          >
            <p
              className="font-display font-[600] text-center leading-[1.3] tracking-[-0.01em]"
              style={{ fontSize: "min(38px, 4vh)", color: pastel.ink, maxWidth: "80%" }}
            >
              {phrase.slice(0, chars)}
              {typing && (
                <span
                  className="inline-block w-[2px] align-middle ml-[1px]"
                  style={{ height: "min(34px, 3.5vh)", background: pastel.accent, animation: "pulse 0.8s step-end infinite" }}
                />
              )}
            </p>
          </div>
        )}

        {/* Logo outro — bottom area */}
        {outroP > 0 && (
          <div className="absolute left-0 right-0 bottom-[8%] flex flex-col items-center" style={{ opacity: outroP }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => {
                const p = Math.max(0, Math.min(1, (outroP * logoLetters.length - i * 0.5) / 1.2));
                const sp = spring(p);
                const ls = logoStarts[i];
                return (
                  <span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block"
                    style={{ fontSize: "min(40px, 4vh)", color: pastel.ink, transform: `translate(${ls.x * (1 - sp)}px, ${ls.y * (1 - sp)}px) rotate(${ls.r * (1 - sp)}deg)`, opacity: p > 0 ? Math.min(1, p * 3) : 0 }}>
                    {char}
                  </span>
                );
              })}
              <span className="inline-block rounded-full ml-[2px]"
                style={{ width: "min(6px, 0.7vh)", height: "min(6px, 0.7vh)", background: pastel.accent, transform: `scale(${spring(Math.max(0, (outroP - 0.7) / 0.15))})` }} />
            </div>
            <p className="font-display font-[400] tracking-[-0.01em] mt-2"
              style={{ fontSize: "min(18px, 2vh)", color: pastel.inkSoft, opacity: Math.max(0, (outroP - 0.8) / 0.2) }}>
              Payments that think.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
