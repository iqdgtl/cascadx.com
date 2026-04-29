"use client";

import { useEffect, useRef, useState } from "react";

type ComparisonProps = {
  kicker: string;
  title: React.ReactNode;
  before: { heading: string; items: string[] };
  after: { heading: string; items: string[] };
};

export default function ComparisonSection({ kicker, title, before, after }: ComparisonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-[2] py-[100px] px-7 bg-bg-alt" ref={ref}>
      <div className="max-w-[var(--max)] mx-auto">
        <div className="flex items-center gap-3 font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent-deep mb-[18px]">
          <span className="w-7 h-px bg-accent" />{kicker}
        </div>
        <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-[-0.03em] mb-12">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div
            className="bg-surface border border-line rounded-[var(--radius-lg)] p-7 opacity-0 translate-y-3"
            style={{ animation: vis ? "msgIn 0.5s cubic-bezier(0.2,0.8,0.2,1) 0ms forwards" : "none" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-warn" />
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-warn">{before.heading}</span>
            </div>
            <ul className="space-y-3">
              {before.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a3d" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className="bg-surface-el border border-accent/20 rounded-[var(--radius-lg)] p-7 opacity-0 translate-y-3 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_40px_-20px_rgba(217,119,87,0.15)]"
            style={{ animation: vis ? "msgIn 0.5s cubic-bezier(0.2,0.8,0.2,1) 150ms forwards" : "none" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent">{after.heading}</span>
            </div>
            <ul className="space-y-3">
              {after.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
