"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import NeuralVisual from "./NeuralVisual";

function useCountUp(end: number, duration = 1500, trigger = false) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * end));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);
  return value;
}

export default function Hero() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const approval = useCountUp(18, 1500, visible);
  const psps = useCountUp(1000, 1500, visible);
  const latency = useCountUp(40, 1500, visible);

  return (
    <header className="relative py-12 md:py-20 px-5 md:px-7 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_80%_0%,rgba(217,119,87,0.08),transparent_60%)] pointer-events-none" />

      {/* Desktop: text left, animation right. Mobile: animation top, text below */}
      <div className="hero-inner max-w-[var(--max)] mx-auto relative z-[2] grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] gap-8 lg:gap-[40px] items-center">
        {/* Animation — appears FIRST on mobile (order-1 mobile, order-2 desktop) */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <NeuralVisual />
        </div>

        {/* Text — appears SECOND on mobile (order-2 mobile, order-1 desktop) */}
        <div className="order-2 lg:order-1 max-w-none lg:max-w-[420px] text-center lg:text-left">
          <h1 className="font-display font-[800] text-[clamp(36px,9vw,72px)] lg:text-[clamp(42px,5vw,72px)] leading-[1.05] tracking-[-0.04em] mb-4 lg:mb-5">
            Payments that{" "}
            <em className="not-italic font-[800] text-accent-deep">think</em>{" "}
            before they fall.
          </h1>

          <p className="text-[16px] leading-[1.5] text-ink-soft max-w-none lg:max-w-[440px] mb-6 lg:mb-7 mx-auto lg:mx-0">
            An AI-powered cascading engine that forecasts declines and tells your team which PSP to wire next.
          </p>

          <Button
            variant="primary" icon="arrow"
            className="!text-[13px] !px-5 !py-[13px] w-full sm:w-auto !py-4 sm:!py-[13px]"
            onClick={() => window.dispatchEvent(new Event("open-chat"))}
          >
            Book a demo
          </Button>

          <div
            ref={metricsRef}
            className="hero-meta mt-8 lg:mt-[38px] flex justify-center lg:justify-start gap-5 lg:gap-7 font-mono text-[10px] tracking-[0.05em] uppercase text-ink-muted"
          >
            <span>
              <strong className="block font-display font-[700] text-[clamp(22px,5vw,25px)] tracking-[-0.02em] text-ink normal-case mb-0.5">
                +{approval}%
              </strong>
              approval rate
            </span>
            <span>
              <strong className="block font-display font-[700] text-[clamp(22px,5vw,25px)] tracking-[-0.02em] text-ink normal-case mb-0.5">
                {psps.toLocaleString()}+
              </strong>
              PSPs ready
            </span>
            <span>
              <strong className="block font-display font-[700] text-[clamp(22px,5vw,25px)] tracking-[-0.02em] text-ink normal-case mb-0.5">
                &lt; {latency}ms
              </strong>
              routing decision
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
