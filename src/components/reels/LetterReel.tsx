"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel, type LetterTheme } from "@/lib/pastelTheme";
import LivingGlobe from "./LivingGlobe";

const LOOP = 14000;
const LETTER_IN = 0, LETTER_DUR = 1500;
const LETTER_HOLD_END = 2500;
const SHRINK_START = 2500, SHRINK_DUR = 1000;
const TYPE_START = 3500;
const CHAR_MS = 125;
const HOLD_START = 7500, HOLD_DUR = 2500; // phrase visible for 2.5s
const OUTRO_START = 10000, OUTRO_DUR = 2000; // logo plays for 2s
const OUTRO_HOLD = 12000; // logo holds visible until 13.5s
const HIGHLIGHT_FADEOUT_START = 7200;

function genDelays(len: number): number[] {
  // Natural variance: 110-140ms per character
  const seed = [118, 135, 112, 130, 125, 140, 115, 132, 127, 119, 137, 113, 129, 122, 138, 114, 131, 126, 117, 134, 120, 136, 111, 128, 124, 139, 116, 133, 121, 141];
  return Array.from({ length: len }, (_, i) => seed[i % seed.length]);
}

export default function LetterReel({ letter, phrase, bgVariant: _, theme = pastel }: { letter: string; phrase: string; bgVariant: string; theme?: LetterTheme }) {
  const T = theme;
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => {
      s.current = performance.now();
      const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); };
      raf.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const smoothEase = (p: number) => {
    if (p <= 0) return 0; if (p >= 1) return 1;
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  };
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const letterP = ease(Math.max(0, Math.min(1, (t - LETTER_IN) / LETTER_DUR)));
  const letterBreath = t >= 1500 && t < LETTER_HOLD_END ? 1 + 0.02 * Math.sin(((t - 1500) / 1000) * Math.PI) : 1;
  const shrinkP = smoothEase(Math.max(0, Math.min(1, (t - SHRINK_START) / SHRINK_DUR)));
  const letterDone = t >= SHRINK_START + SHRINK_DUR;

  // Typewriter for rest of phrase
  const restPhrase = phrase.slice(1);
  const delays = useMemo(() => genDelays(restPhrase.length), [restPhrase]);
  const cumulative = useMemo(() => { const a = [0]; for (let i = 0; i < delays.length; i++) a.push(a[i] + delays[i]); return a; }, [delays]);
  const typeElapsed = Math.max(0, t - TYPE_START);
  let chars = 0;
  for (let i = 0; i < cumulative.length; i++) { if (typeElapsed >= cumulative[i]) chars = i; }
  chars = Math.min(chars, restPhrase.length);
  const typing = t >= TYPE_START && chars < restPhrase.length;
  const typingComplete = t >= TYPE_START && chars >= restPhrase.length;

  // Highlight glow — follows cursor position, fades after complete
  const highlightOpacity = typing ? 0.3 : typingComplete ? Math.max(0, 1 - (t - HIGHLIGHT_FADEOUT_START) / 600) * 0.3 : 0;
  // Approximate cursor X position (chars typed * avg char width)
  const cursorProgress = (1 + chars) / (1 + restPhrase.length); // 0→1

  // Phrase fades out starting 500ms before logo starts
  const mainFade = t < OUTRO_START - 500 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 500)) / 800);
  // Logo animates in, then holds, then fades in last 0.5s
  const outroP = ease(Math.max(0, Math.min(1, (t - (OUTRO_START - 300)) / OUTRO_DUR)));
  const outroFade = t >= LOOP - 500 ? Math.max(0, 1 - (t - (LOOP - 500)) / 500) : 1;
  const showBigLetter = t < SHRINK_START + SHRINK_DUR && t >= 0;

  const logoLetters = "CascadX".split("");
  const logoStarts = [
    { x: -80, y: -50, r: -12 }, { x: 60, y: -70, r: 10 }, { x: -40, y: 60, r: -8 },
    { x: 100, y: 40, r: 15 }, { x: -60, y: -25, r: -6 }, { x: 40, y: 80, r: 9 }, { x: -55, y: -65, r: -14 },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.outerBg, overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9 / 16", position: "relative", overflow: "hidden", background: T.bg }}>

        {/* Living globe background */}
        <LivingGlobe t={Math.max(0, t)} />

        {/* Reading stage gradient — z-index 8, above icons, below text */}
        {letterDone && (
          <div className="absolute pointer-events-none" style={{
            left: "50%", top: "42%",
            transform: "translate(-50%, -50%)",
            width: "700px", height: "400px",
            maxWidth: "100%",
            background: `radial-gradient(ellipse at center, ${T.bg}cc 0%, ${T.bg}00 70%)`,
            zIndex: 8,
            opacity: mainFade,
          }} />
        )}

        {/* Big letter — morphs into phrase — z-index 10 */}
        {showBigLetter && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10,
              opacity: mainFade * letterP,
              transform: shrinkP > 0
                ? `translateY(${shrinkP * 8}vh) scale(${1 - shrinkP * 0.92})`
                : `scale(${(1.4 - 0.4 * letterP) * letterBreath})`,
            }}>
            <span className="font-display font-[800] leading-none select-none"
              style={{
                fontSize: shrinkP > 0 ? "min(38px, 4.2vh)" : "min(480px, 50vh)",
                color: T.letter,
                opacity: 0.85,
              }}>
              {letter}
            </span>
          </div>
        )}

        {/* Phrase text with highlight glow */}
        {letterDone && (
          <div className="absolute left-0 right-0 flex justify-center px-[8%] pointer-events-none" style={{ top: "42%", opacity: mainFade, zIndex: 10 }}>
            <div className="relative" style={{ maxWidth: "85%" }}>
              {/* Highlight glow — behind text */}
              {highlightOpacity > 0 && (
                <div className="absolute pointer-events-none" style={{
                  left: `${cursorProgress * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120px",
                  height: "48px",
                  background: `radial-gradient(ellipse at center, rgba(217,119,87,${highlightOpacity}) 0%, transparent 70%)`,
                  filter: "blur(8px)",
                  transition: "left 180ms ease-out",
                }} />
              )}
              {/* Text */}
              <p className="font-display font-[600] text-center leading-[1.35] tracking-[-0.01em] relative"
                style={{ fontSize: "min(38px, 4.2vh)", color: T.ink }}>
                <span>{letter}</span>
                <span>{restPhrase.slice(0, chars)}</span>
                {typing && (
                  <span className="inline-block w-[2px] align-middle ml-[1px]"
                    style={{ height: "min(32px, 3.5vh)", background: T.accent, animation: "pulse 0.8s step-end infinite" }} />
                )}
              </p>
            </div>
          </div>
        )}

        {/* Logo outro — full overlay, centered, highest z-index */}
        {outroP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: outroP * outroFade, zIndex: 50, background: `${T.bg}e6` }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => {
                const p = Math.max(0, Math.min(1, (outroP * logoLetters.length - i * 0.5) / 1.2));
                const sp = spring(p);
                const ls = logoStarts[i];
                return (
                  <span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block"
                    style={{ fontSize: "48px", color: T.ink, transform: `translate(${ls.x * (1 - sp)}px, ${ls.y * (1 - sp)}px) rotate(${ls.r * (1 - sp)}deg)`, opacity: p > 0 ? Math.min(1, p * 3) : 0 }}>
                    {char}
                  </span>
                );
              })}
              <span className="inline-block rounded-full ml-[3px]"
                style={{ width: "8px", height: "8px", background: T.accent, transform: `scale(${spring(Math.max(0, (outroP - 0.7) / 0.15))})` }} />
            </div>
            <p className="font-display font-[400] tracking-[-0.01em] mt-4"
              style={{ fontSize: "20px", color: T.inkSoft, opacity: Math.max(0, (outroP - 0.8) / 0.2) }}>
              Payments that think.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
