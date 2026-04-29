"use client";

import { useEffect, useRef, useState } from "react";

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

export default function StatStrip({ value, suffix, prefix, text }: { value: number; suffix?: string; prefix?: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const count = useCountUp(value, 1800, vis);

  return (
    <section className="relative z-[2] py-20 px-7" ref={ref}>
      <div className="max-w-[var(--max)] mx-auto text-center">
        <div className="font-display font-[800] text-[clamp(56px,8vw,120px)] tracking-[-0.04em] text-accent leading-none mb-4">
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <p className="text-ink-soft text-lg max-w-[560px] mx-auto leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
