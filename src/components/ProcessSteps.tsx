"use client";

import { useEffect, useRef, useState } from "react";

type Step = { number: string; icon: React.ReactNode; title: string; description: string };

export default function ProcessSteps({ kicker, title, steps }: { kicker: string; title: React.ReactNode; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-[2] py-[100px] px-7 bg-bg-alt" ref={ref}>
      <div className="max-w-[var(--max)] mx-auto">
        <div className="flex items-center gap-3 font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent-deep mb-[18px]">
          <span className="w-7 h-px bg-accent" />{kicker}
        </div>
        <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.035em] mb-14">{title}</h2>

        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="contents">
              <div
                className="relative flex-1 bg-surface-el border border-line rounded-[var(--radius-lg)] p-7 min-h-[280px] flex flex-col gap-4 overflow-hidden opacity-0 translate-y-3 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_40px_-20px_rgba(0,0,0,0.3)]"
                style={{ animation: vis ? `msgIn 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 150}ms forwards` : "none" }}
              >
                {/* Big background number */}
                <span className="absolute top-3 right-4 font-display font-[800] text-[80px] leading-none text-accent opacity-[0.08] select-none pointer-events-none">
                  {step.number}
                </span>
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                  Step {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-surface border border-line grid place-items-center text-accent">
                  {step.icon}
                </div>
                <h4 className="font-display font-[700] text-lg tracking-[-0.02em]">{step.title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed m-0">{step.description}</p>
              </div>
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center shrink-0 py-4 lg:py-0">
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="hidden lg:block">
                    <line x1="0" y1="12" x2="36" y2="12" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M34 6l10 6-10 6" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle r="2.5" fill="#d97757">
                      <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,12 L36,12" />
                      <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="block lg:hidden">
                    <line x1="12" y1="0" x2="12" y2="30" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M6 28l6 10 6-10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
