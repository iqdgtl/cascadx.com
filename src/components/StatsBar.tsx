"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; prefix?: string; label: string };

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * end));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);
  return val;
}

function StatItem({ stat, trigger, delay }: { stat: Stat; trigger: boolean; delay: number }) {
  const count = useCountUp(stat.value, 1500, trigger);
  return (
    <div
      className="text-center px-6 py-4 opacity-0 translate-y-3"
      style={{
        animation: trigger ? `msgIn 0.5s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms forwards` : "none",
      }}
    >
      <div className="font-display font-[800] text-[clamp(32px,4vw,48px)] tracking-[-0.03em] text-ink leading-none mb-2">
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted">{stat.label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-[2] py-8 md:py-12 px-5 md:px-7 border-t border-b border-line bg-bg-alt" ref={ref}>
      <div className="max-w-[var(--max)] mx-auto grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-16">
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} trigger={vis} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
