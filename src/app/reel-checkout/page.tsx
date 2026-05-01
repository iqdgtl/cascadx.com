"use client";

import { useEffect, useState, useRef } from "react";

export default function ReelCheckout() {
  const [t, setT] = useState(-1);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const LOOP = 12000;

  useEffect(() => {
    const ready = setTimeout(() => {
      startRef.current = performance.now();
      const tick = () => {
        const elapsed = (performance.now() - startRef.current) % LOOP;
        setT(elapsed);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(ready); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Phases
  const cardNum = "4242 4242 4242 4242";
  const typingEnd = 2000;
  const charsTyped = Math.min(cardNum.length, Math.floor((t / typingEnd) * cardNum.length));
  const displayNum = t < 0 ? "•••• •••• •••• ____" :
    t < typingEnd ? cardNum.slice(0, charsTyped) + (charsTyped < cardNum.length ? "____".slice(0, Math.max(0, 4 - (cardNum.length - charsTyped))) : "") :
    cardNum;
  const cursorVisible = t >= 0 && t < typingEnd && Math.floor(t / 400) % 2 === 0;

  const declinePhase = Math.max(0, Math.min(1, (t - 2000) / 1500)); // 2-3.5s
  const cascadePhase = Math.max(0, Math.min(1, (t - 3500) / 3500)); // 3.5-7s
  const cascadeEval = Math.max(0, Math.min(1, (t - 4500) / 1500)); // PSP evaluation
  const cascadePick = t >= 6000; // AI picks PSP 2
  const approvePhase = Math.max(0, Math.min(1, (t - 7000) / 1500)); // 7-8.5s
  const statPhase = Math.max(0, Math.min(1, (t - 9500) / 1500)); // 9.5-11s
  const resetFade = t >= 11500 ? Math.max(0, 1 - (t - 11500) / 500) : 1;

  const spring = (p: number) => 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.4);

  // PSP nodes
  const psps = [
    { name: "PSP 1", x: 75, y: 35 },
    { name: "PSP 2", x: 80, y: 50 },
    { name: "PSP 3", x: 75, y: 65 },
  ];

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      {/* REC */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-40 z-10">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-[10px] text-white/50">REC</span>
      </div>

      <div className="relative w-full max-w-[480px] px-8" style={{ opacity: resetFade }}>

        {/* === SCENE 1 & 2: Checkout card === */}
        {t < 9500 && (
          <div
            className="bg-[#1e2423] border border-white/[0.08] rounded-2xl p-8 mx-auto transition-all duration-500"
            style={{
              opacity: t >= 7000 ? 1 : t >= 2000 ? 0.6 : 1,
              transform: `scale(${t >= 7000 ? 1 : t >= 2000 ? 0.95 : 1})`,
            }}
          >
            {approvePhase > 0 ? (
              /* Approved state */
              <div className="flex flex-col items-center py-6">
                <div
                  className="w-16 h-16 rounded-full bg-[#d97757] grid place-items-center mb-5"
                  style={{ transform: `scale(${spring(approvePhase)})` }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d0f0e" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div className="font-display font-[700] text-[28px] text-[#fafaf7] mb-2" style={{ opacity: approvePhase }}>Approved</div>
                <div className="font-sans text-[14px] text-white/50" style={{ opacity: Math.max(0, approvePhase - 0.3) }}>via CascadX intelligent routing</div>

                {/* Confetti dots */}
                {approvePhase > 0.3 && Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#d97757]"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 60}%`,
                      top: `${30 - i * 4}%`,
                      opacity: Math.max(0, 0.8 - (approvePhase - 0.3) * 2),
                      transform: `translateY(${-(approvePhase - 0.3) * 40}px)`,
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Card input state */
              <>
                <div className="font-mono text-[12px] text-white/40 uppercase tracking-[0.08em] mb-3">Card number</div>
                <div className="bg-[#0d0f0e] rounded-xl border border-white/[0.06] px-5 py-4 flex items-center"
                  style={{ borderColor: t >= 1800 && t < 2200 ? "rgba(217,119,87,0.5)" : "rgba(255,255,255,0.06)" }}>
                  <span className="font-mono text-[22px] text-[#fafaf7] tracking-[0.12em] leading-none">
                    {displayNum}
                  </span>
                  {cursorVisible && <span className="w-[2px] h-[22px] bg-[#d97757] ml-0.5 animate-pulse" />}
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.08em] mb-1">Name</div>
                    <div className="font-sans text-[14px] text-white/60">Alex Mercer</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.08em] mb-1">Expiry</div>
                    <div className="font-sans text-[14px] text-white/60">12/28</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* === ROUTING VISUALIZATION === */}
        {declinePhase > 0 && t < 9500 && (
          <div className="mt-8 relative h-[200px]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Card node (left) */}
              <rect x="5" y="42" width="16" height="16" rx="3" fill="#1e2423" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <text x="13" y="53" textAnchor="middle" fill="#fafaf7" fontSize="5" fontFamily="Inter,sans-serif" fontWeight="700">💳</text>

              {/* Decline line to PSP 1 */}
              <line x1="21" y1="50" x2={21 + 54 * declinePhase} y2={35 + 15 * (1 - declinePhase)} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* PSP 1 — declined */}
              {declinePhase > 0.5 && (
                <g style={{ opacity: Math.min(1, (declinePhase - 0.5) * 2) }}>
                  <rect x="67" y="27" width="20" height="12" rx="3" fill="#1e2423" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  <text x="77" y="35" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4" fontFamily="Inter,sans-serif">PSP 1</text>
                  <text x="77" y="23" textAnchor="middle" fill="rgba(255,106,61,0.6)" fontSize="8">✗</text>
                </g>
              )}
              {declinePhase > 0.8 && (
                <text x="77" y="46" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="3" fontFamily="JetBrains Mono,monospace">Declined</text>
              )}

              {/* CascadX center node */}
              {cascadePhase > 0 && (
                <g style={{ opacity: cascadePhase }}>
                  <circle cx="45" cy="50" r="8" fill="#262c2b" stroke="rgba(217,119,87,0.4)" strokeWidth="0.8" />
                  <text x="45" y="52" textAnchor="middle" fill="#d97757" fontSize="4.5" fontFamily="Inter,sans-serif" fontWeight="800">CX</text>

                  {/* Lines to PSPs */}
                  {psps.map((psp, i) => {
                    const lineProgress = Math.max(0, Math.min(1, (cascadeEval - i * 0.2) / 0.4));
                    const isChosen = i === 1 && cascadePick;
                    return (
                      <g key={i}>
                        <line
                          x1="53" y1="50"
                          x2={53 + (psp.x - 53) * lineProgress}
                          y2={50 + (psp.y - 50) * lineProgress}
                          stroke={isChosen ? "#d97757" : "rgba(255,255,255,0.1)"}
                          strokeWidth={isChosen ? "0.8" : "0.4"}
                          strokeDasharray={isChosen ? "none" : "1.5 1.5"}
                        />
                        {lineProgress > 0.8 && (
                          <g>
                            <rect
                              x={psp.x - 10} y={psp.y - 6} width="20" height="12" rx="3"
                              fill={isChosen ? "rgba(217,119,87,0.15)" : "#1e2423"}
                              stroke={isChosen ? "#d97757" : "rgba(255,255,255,0.08)"}
                              strokeWidth="0.5"
                            />
                            <text x={psp.x} y={psp.y + 2} textAnchor="middle" fill={isChosen ? "#d97757" : "rgba(255,255,255,0.4)"} fontSize="4" fontFamily="Inter,sans-serif" fontWeight={isChosen ? "700" : "400"}>
                              {psp.name}
                            </text>
                            {isChosen && (
                              <text x={psp.x} y={psp.y + 12} textAnchor="middle" fill="#d97757" fontSize="3" fontFamily="JetBrains Mono,monospace">✓ selected</text>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Cascading label */}
                  {cascadePhase > 0.2 && cascadePhase < 0.8 && (
                    <text x="45" y="68" textAnchor="middle" fill="rgba(217,119,87,0.6)" fontSize="3" fontFamily="JetBrains Mono,monospace">
                      Cascading to optimal route...
                    </text>
                  )}
                </g>
              )}
            </svg>
          </div>
        )}

        {/* === STAT REVEAL === */}
        {statPhase > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: statPhase * resetFade }}>
            <div
              className="font-display font-[800] text-[96px] tracking-[-0.04em] text-[#d97757] leading-none"
              style={{ transform: `translateY(${20 * (1 - spring(statPhase))}px)` }}
            >
              +18%
            </div>
            <div
              className="font-sans font-medium text-[22px] text-white/60 mt-3"
              style={{ opacity: Math.max(0, statPhase - 0.3), transform: `translateY(${12 * (1 - statPhase)}px)` }}
            >
              approval rate lift
            </div>
            <div
              className="mt-12 flex items-baseline gap-1"
              style={{ opacity: Math.max(0, statPhase - 0.6) }}
            >
              <span className="font-display font-[800] text-[28px] text-[#fafaf7] tracking-[-0.035em]">CascadX</span>
              <span className="w-[6px] h-[6px] rounded-full bg-[#d97757] ml-[2px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
