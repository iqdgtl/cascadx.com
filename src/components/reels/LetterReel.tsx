"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";

const LOOP = 10000;
const LETTER_IN = 0, LETTER_DUR = 1500;
const BG_IN = 1500;
const TYPE_START = 3000, CHAR_MS = 60;
const HOLD_START = 7000, HOLD_DUR = 1500;
const OUTRO_START = 8500, OUTRO_DUR = 1500;

type BgVariant = "cascade" | "neural" | "path" | "capture" | "world" | "timer" | "cross";

function genDelays(len: number): number[] {
  const seed = [58, 72, 51, 68, 63, 74, 55, 70, 66, 59, 73, 52, 67, 61, 75, 54, 69, 64, 57, 71];
  return Array.from({ length: len }, (_, i) => seed[i % seed.length]);
}

/* Background animations — all subtle, pastel */
function BgCascade({ t }: { t: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.12 }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 90 + i * 80;
        const offset = ((t / 4000 + i * 0.15) % 1) * 1920;
        return <line key={i} x1={x} y1={offset - 200} x2={x} y2={offset + 200} stroke={pastel.accent} strokeWidth="1.5" />;
      })}
    </svg>
  );
}
function BgNeural({ t }: { t: number }) {
  const nodes = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ x: 200 + (i % 4) * 200, y: 600 + Math.floor(i / 4) * 400 })), []);
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.1 }}>
      {nodes.map((a, i) => nodes.slice(i + 1).map((b, j) => <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={pastel.accent} strokeWidth="0.8" />))}
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={4 + 2 * Math.sin(t / 800 + i)} fill={pastel.accent} />)}
    </svg>
  );
}
function BgPath({ t }: { t: number }) {
  const len = Math.min(1, Math.max(0, (t - 1500) / 4000));
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.1 }}>
      <path d="M100,960 C300,800 500,1100 700,900 C900,700 980,960 980,960" fill="none" stroke={pastel.accent} strokeWidth="2" strokeDasharray="2000" strokeDashoffset={2000 * (1 - len)} />
    </svg>
  );
}
function BgCapture({ t }: { t: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.08 }}>
      {Array.from({ length: 6 }).map((_, i) => {
        const y = 600 + i * 120;
        return <line key={i} x1="100" y1={y} x2="980" y2={y} stroke={pastel.accent} strokeWidth="0.8" strokeDasharray="4 8" />;
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const p = ((t / 3000 + i * 0.2) % 1);
        return <circle key={`p${i}`} cx={200 + i * 160} cy={660 + p * 500} r="3" fill={pastel.accent} opacity={1 - p} />;
      })}
    </svg>
  );
}
function BgWorld({ t }: { t: number }) {
  const pulses = useMemo(() => [
    { x: 300, y: 800 }, { x: 700, y: 700 }, { x: 500, y: 1000 },
    { x: 200, y: 1100 }, { x: 800, y: 900 }, { x: 600, y: 1200 },
  ], []);
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.1 }}>
      <ellipse cx="540" cy="960" rx="400" ry="300" fill="none" stroke={pastel.accent} strokeWidth="1" />
      <ellipse cx="540" cy="960" rx="200" ry="300" fill="none" stroke={pastel.accent} strokeWidth="0.8" />
      <line x1="140" y1="960" x2="940" y2="960" stroke={pastel.accent} strokeWidth="0.6" />
      {pulses.map((p, i) => {
        const s = Math.sin(t / 1000 + i * 1.2);
        return <circle key={i} cx={p.x} cy={p.y} r={3 + 2 * Math.max(0, s)} fill={pastel.accent} opacity={0.3 + 0.4 * Math.max(0, s)} />;
      })}
    </svg>
  );
}
function BgTimer({ t }: { t: number }) {
  const angle = ((t / 500) % 360);
  const rad = (angle - 90) * Math.PI / 180;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.08 }}>
      <circle cx="540" cy="960" r="200" fill="none" stroke={pastel.accent} strokeWidth="1.5" />
      <line x1="540" y1="960" x2={540 + 180 * Math.cos(rad)} y2={960 + 180 * Math.sin(rad)} stroke={pastel.accent} strokeWidth="2" />
    </svg>
  );
}
function BgCross({ t }: { t: number }) {
  const p = Math.min(1, Math.max(0, (t - 1500) / 2000));
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1920" style={{ opacity: 0.1 }}>
      <line x1="240" y1="660" x2={240 + 600 * p} y2={660 + 600 * p} stroke="#999" strokeWidth="2" opacity="0.5" />
      <line x1="840" y1="660" x2={840 - 600 * p} y2={660 + 600 * p} stroke={pastel.accent} strokeWidth="2.5" />
    </svg>
  );
}

const bgMap: Record<BgVariant, React.FC<{ t: number }>> = {
  cascade: BgCascade, neural: BgNeural, path: BgPath,
  capture: BgCapture, world: BgWorld, timer: BgTimer, cross: BgCross,
};

/* Main component */
export default function LetterReel({ letter, phrase, bgVariant }: { letter: string; phrase: string; bgVariant: BgVariant }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const letterP = ease(Math.max(0, Math.min(1, (t - LETTER_IN) / LETTER_DUR)));
  const bgVisible = t >= BG_IN;
  const breathe = t >= HOLD_START && t < HOLD_START + HOLD_DUR ? 1 + 0.02 * Math.sin(((t - HOLD_START) / HOLD_DUR) * Math.PI) : 1;

  // Typewriter with variance
  const delays = useMemo(() => genDelays(phrase.length), [phrase]);
  const cumulative = useMemo(() => { const a = [0]; for (let i = 0; i < delays.length; i++) a.push(a[i] + delays[i]); return a; }, [delays]);
  const typeElapsed = Math.max(0, t - TYPE_START);
  let chars = 0;
  for (let i = 0; i < cumulative.length; i++) { if (typeElapsed >= cumulative[i]) chars = i; }
  chars = Math.min(chars, phrase.length);
  const typing = t >= TYPE_START && chars < phrase.length;

  // Outro
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < OUTRO_START - 300 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 300)) / 300);
  const letterShrink = t >= OUTRO_START ? 1 - outroP * 0.7 : 1;

  const BgComponent = bgMap[bgVariant];

  // Logo outro
  const logoLetters = "CascadX".split("");
  const logoStarts = [
    { x: -100, y: -60, r: -15 }, { x: 70, y: -90, r: 12 }, { x: -50, y: 80, r: -10 },
    { x: 120, y: 50, r: 18 }, { x: -80, y: -30, r: -7 }, { x: 50, y: 100, r: 11 }, { x: -70, y: -80, r: -16 },
  ];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start overflow-hidden" style={{ cursor: "none", background: pastel.bg }}>

      {/* Background animation */}
      {bgVisible && <BgComponent t={t} />}

      {/* Big letter */}
      <div className="relative mt-[20vh]" style={{ opacity: mainFade }}>
        <span
          className="font-display font-[800] leading-none select-none"
          style={{
            fontSize: "min(650px, 70vw)",
            color: pastel.letter,
            opacity: 0.8 * letterP,
            transform: `scale(${(1.4 - 0.4 * letterP) * breathe * letterShrink})`,
            display: "block",
            textAlign: "center",
          }}
        >
          {letter}
        </span>
      </div>

      {/* Phrase below the letter */}
      <div className="px-10 mt-4 text-center" style={{ opacity: mainFade }}>
        <p className="font-display font-[600] text-[38px] tracking-[-0.02em] leading-[1.25]" style={{ color: pastel.ink }}>
          {phrase.slice(0, chars)}
          {typing && <span className="inline-block w-[2px] h-[34px] ml-[2px] align-middle" style={{ background: pastel.accent, animation: "pulse 0.8s step-end infinite" }} />}
        </p>
      </div>

      {/* Logo outro */}
      {outroP > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: outroP }}>
          {/* Wordmark */}
          <div className="flex items-baseline">
            {logoLetters.map((char, i) => {
              const p = Math.max(0, Math.min(1, (outroP * logoLetters.length - i * 0.5) / 1.2));
              const sp = spring(p);
              const ls = logoStarts[i];
              return (
                <span key={i} className="font-display font-[800] text-[48px] tracking-[-0.035em] inline-block"
                  style={{ color: pastel.ink, transform: `translate(${ls.x * (1 - sp)}px, ${ls.y * (1 - sp)}px) rotate(${ls.r * (1 - sp)}deg)`, opacity: p > 0 ? Math.min(1, p * 3) : 0 }}>
                  {char}
                </span>
              );
            })}
            <span className="inline-block w-[7px] h-[7px] rounded-full ml-[3px]"
              style={{ background: pastel.accent, transform: `scale(${spring(Math.max(0, (outroP - 0.7) / 0.15))})` }} />
          </div>
          {/* Tagline */}
          <p className="font-display font-[400] text-[20px] mt-4 tracking-[-0.01em]"
            style={{ color: pastel.inkSoft, opacity: Math.max(0, (outroP - 0.8) / 0.2) }}>
            Payments that think.
          </p>
        </div>
      )}
    </div>
  );
}
