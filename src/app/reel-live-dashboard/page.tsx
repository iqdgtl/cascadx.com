"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import { darkTheme } from "@/lib/themes";

const LOOP = 15000;
const BOOT_DUR = 1000;
const DAY_START = 1000, DAY_END = 12000; // 11s of "day"
const SUMMARY_IN = 12000, SUMMARY_DUR = 800;
const OUTRO_START = 13500, OUTRO_DUR = 1500;

// Transaction templates
const txTemplates = [
  { amount: "€129.00", country: "Spain" },
  { amount: "$89.00", country: "Canada" },
  { amount: "£45.00", country: "UK" },
  { amount: "$200.00", country: "US" },
  { amount: "€75.00", country: "Germany" },
  { amount: "R$340.00", country: "Brazil" },
  { amount: "$1,200.00", country: "Australia" },
  { amount: "€59.99", country: "France" },
  { amount: "$29.00", country: "Mexico" },
  { amount: "¥8,900", country: "Japan" },
  { amount: "€450.00", country: "Netherlands" },
  { amount: "$19.99", country: "US" },
];

// Pre-determine which transactions decline (seed-based, ~30%)
const txCount = 18; // total transactions over the day
const declineIndices = new Set([2, 5, 8, 11, 14, 17]); // ~30%
const recoveryAmounts = [129, 89, 75, 200, 59, 450]; // amounts recovered

type TxState = "approved" | "declined" | "routing" | "recovered";
type Tx = { id: number; amount: string; country: string; state: TxState; enteredAt: number };

export default function Page() {
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
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  // Clock: 09:00 → 19:00 over DAY_START to DAY_END
  const dayProgress = Math.max(0, Math.min(1, (t - DAY_START) / (DAY_END - DAY_START)));
  const hours = 9 + dayProgress * 10;
  const clockH = String(Math.floor(hours)).padStart(2, "0");
  const clockM = String(Math.floor((hours % 1) * 60)).padStart(2, "0");

  // Generate transactions based on time
  const txInterval = (DAY_END - DAY_START) / txCount;
  const transactions = useMemo(() => {
    const txs: Tx[] = [];
    for (let i = 0; i < txCount; i++) {
      const tmpl = txTemplates[i % txTemplates.length];
      const enteredAt = DAY_START + i * txInterval;
      const isDecline = declineIndices.has(i);
      txs.push({ id: i, amount: tmpl.amount, country: tmpl.country, state: isDecline ? "declined" : "approved", enteredAt });
    }
    return txs;
  }, []);

  // Visible transactions (entered and not too old)
  const visibleTxs = transactions.filter(tx => t >= tx.enteredAt && t < tx.enteredAt + 5000).slice(-7);

  // Get current state of a transaction
  const getTxState = (tx: Tx): TxState => {
    if (tx.state === "approved") return "approved";
    const elapsed = t - tx.enteredAt;
    if (elapsed < 400) return "declined";
    if (elapsed < 800) return "routing";
    return "recovered";
  };

  // Recovered counter — accumulates as recoveries happen
  let recoveredTotal = 0;
  let recoveryCount = 0;
  transactions.forEach((tx, i) => {
    if (declineIndices.has(i) && t >= tx.enteredAt + 800) {
      recoveredTotal += recoveryAmounts[recoveryCount % recoveryAmounts.length];
      recoveryCount++;
    }
  });
  const targetRecovered = Math.min(14900, recoveredTotal);

  // Approval rate: starts 87%, climbs to 94.2%
  const approvalRate = 87 + dayProgress * 7.2;

  // Boot
  const bootP = ease(Math.max(0, Math.min(1, t / BOOT_DUR)));

  // Summary
  const summaryP = ease(Math.max(0, Math.min(1, (t - SUMMARY_IN) / SUMMARY_DUR)));
  const contentFade = t < SUMMARY_IN - 300 ? 1 : t < SUMMARY_IN ? Math.max(0, 1 - (t - (SUMMARY_IN - 300)) / 300) * 0.7 + 0.3 : 0.3;

  // Outro
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= LOOP - 500 ? Math.max(0, 1 - (t - (LOOP - 500)) / 500) : 1;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: "#0d0f0e" }}>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 px-5 py-4 flex items-center justify-between" style={{ opacity: bootP, zIndex: 5 }}>
          <div className="flex items-center gap-2">
            <span className="font-display font-[700] text-[16px] text-[#fafaf7] tracking-[-0.02em]">CascadX Live</span>
            <span className="w-[6px] h-[6px] rounded-full bg-[#d97757]" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
          <span className="font-mono text-[14px] text-[#7a8178]">{clockH}:{clockM}</span>
        </div>

        {/* Stat cards */}
        <div className="absolute top-[6%] left-0 right-0 px-4 flex gap-3" style={{ opacity: bootP, zIndex: 5 }}>
          {/* Recovered */}
          <div className="flex-1 rounded-xl p-4" style={{ background: "#1e2423", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#7a8178] mb-2">Recovered</div>
            <div className="font-display font-[700] text-[24px] text-[#d97757] tracking-[-0.02em]">
              ${targetRecovered.toLocaleString()}
            </div>
          </div>
          {/* Approval */}
          <div className="flex-1 rounded-xl p-4" style={{ background: "#1e2423", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#7a8178] mb-2">Approval</div>
            <div className="font-display font-[700] text-[24px] text-[#fafaf7] tracking-[-0.02em]">
              {dayProgress > 0.05 ? `${approvalRate.toFixed(1)}%` : "--"}
            </div>
            {dayProgress > 0.3 && (
              <div className="font-mono text-[10px] text-[#d97757] mt-1">↑ from 87%</div>
            )}
          </div>
        </div>

        {/* Transaction stream */}
        <div className="absolute left-0 right-0 px-4" style={{ top: "18%", bottom: "20%", overflow: "hidden", opacity: contentFade * bootP, zIndex: 4 }}>
          {visibleTxs.map((tx) => {
            const state = getTxState(tx);
            const age = t - tx.enteredAt;
            const entryP = spring(Math.min(1, age / 300));
            const fadeP = age > 4000 ? Math.max(0, 1 - (age - 4000) / 1000) : 1;
            const isGlow = state === "recovered" && age < 1500;

            return (
              <div key={tx.id} className="flex items-center justify-between py-3 px-4 mb-2 rounded-lg" style={{
                background: isGlow ? "rgba(217,119,87,0.08)" : "#1e2423",
                border: `1px solid ${isGlow ? "rgba(217,119,87,0.2)" : "rgba(255,255,255,0.05)"}`,
                opacity: entryP * fadeP,
                transform: `translateY(${-12 * (1 - entryP)}px)`,
                boxShadow: isGlow ? "0 0 16px rgba(217,119,87,0.15)" : "none",
                transition: "background 300ms, border-color 300ms, box-shadow 300ms",
              }}>
                <div>
                  <span className="font-mono text-[14px] text-[#fafaf7]">{tx.amount}</span>
                  <span className="font-mono text-[12px] text-[#7a8178] ml-2">{tx.country}</span>
                </div>
                <div className="font-mono text-[11px] font-medium">
                  {state === "approved" && <span className="text-[#d97757]">✓ Approved</span>}
                  {state === "declined" && <span className="text-[#ff6a3d]">✗ Declined</span>}
                  {state === "routing" && (
                    <span className="text-[#7a8178] flex items-center gap-1">
                      <span className="inline-block w-3 h-3 border border-[#d97757] border-t-transparent rounded-full animate-spin" />
                      Routing...
                    </span>
                  )}
                  {state === "recovered" && <span className="text-[#d97757]">✓ Recovered</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* End of day summary */}
        {summaryP > 0 && (
          <div className="absolute inset-0 flex items-center justify-center px-8" style={{ zIndex: 10, opacity: summaryP }}>
            <div className="w-full max-w-[360px] rounded-2xl p-8 text-center" style={{
              background: "#1e2423", border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              transform: `scale(${0.95 + 0.05 * summaryP})`,
            }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d97757] mb-4">End of day</div>
              <div className="font-display font-[800] text-[56px] text-[#fafaf7] tracking-[-0.03em] leading-none">1,247</div>
              <div className="font-mono text-[13px] text-[#7a8178] mt-2 mb-6">transactions recovered</div>
              <div className="space-y-3 text-left">
                <div className="flex justify-between font-mono text-[14px]">
                  <span className="text-[#7a8178]">Revenue saved</span>
                  <span className="text-[#d97757] font-bold">$14,900</span>
                </div>
                <div className="flex justify-between font-mono text-[14px]">
                  <span className="text-[#7a8178]">Approval rate</span>
                  <span className="text-[#fafaf7]">87% → <span className="text-[#d97757]">94.2%</span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0" style={{ zIndex: 50, opacity: outroP * outroFade }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(13,15,14,0.9)" }} />
            <ReelLogoOutro progress={outroP} theme={darkTheme} />
          </div>
        )}
      </div>
    </div>
  );
}
