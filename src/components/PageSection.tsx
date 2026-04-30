"use client";

import { useEffect, useRef, useState } from "react";
import Kicker from "./ui/Kicker";

type PageSectionProps = {
  variant?: "feature" | "split" | "showcase";
  kicker?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  alt?: boolean; // alternate background
  reverse?: boolean; // flip split layout
  icon?: React.ReactNode;
};

export default function PageSection({
  variant = "feature",
  kicker,
  title,
  children,
  alt = false,
  reverse = false,
  icon,
}: PageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); io.unobserve(el); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bg = alt ? "bg-bg-alt" : "bg-bg";

  return (
    <section className={`relative z-[2] py-14 md:py-[100px] px-5 md:px-7 ${bg}`} ref={ref}>
      <div
        className="max-w-[var(--max)] mx-auto"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 600ms ease-out, transform 600ms ease-out",
        }}
      >
        {/* Feature — centered */}
        {variant === "feature" && (
          <div className="max-w-[800px] mx-auto text-center">
            {icon && <div className="flex justify-center mb-6 text-accent">{icon}</div>}
            {kicker && <Kicker className="justify-center">{kicker}</Kicker>}
            {title && (
              <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.035em] mb-6">
                {title}
              </h2>
            )}
            {children}
          </div>
        )}

        {/* Split — two columns */}
        {variant === "split" && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${reverse ? "md:[&>:first-child]:order-2" : ""}`}>
            <div>
              {kicker && <Kicker>{kicker}</Kicker>}
              {title && (
                <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-[-0.03em] mb-5">
                  {title}
                </h2>
              )}
              {children}
            </div>
            {/* Visual placeholder — children can pass a second element */}
          </div>
        )}

        {/* Showcase — 3-card grid */}
        {variant === "showcase" && (
          <div>
            {kicker && <Kicker>{kicker}</Kicker>}
            {title && (
              <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.035em] mb-10">
                {title}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* Reusable showcase card */
export function ShowcaseCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <div className="bg-surface-el border border-line rounded-[var(--radius-lg)] p-7 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_40px_-20px_rgba(0,0,0,0.3)] flex flex-col gap-4 transition-all duration-250 hover:-translate-y-0.5">
      <div className="text-accent w-10 h-10">{icon}</div>
      <h3 className="font-display font-[600] text-[18px] tracking-[-0.02em]">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed m-0">{description}</p>
      {href && (
        <a href={href} className="text-sm text-accent font-medium mt-auto hover:text-accent-deep transition-colors">
          Learn more →
        </a>
      )}
    </div>
  );
}
