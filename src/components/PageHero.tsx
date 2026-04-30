"use client";

import { useEffect, useState } from "react";
import Kicker from "./ui/Kicker";
import RobotMascot from "./RobotMascot";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  robotVariant?: "idle" | "thinking" | "waving" | "confused";
  robotSize?: number;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  robotVariant = "idle",
  robotSize = 80,
}: PageHeroProps) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); }, []);

  return (
    <section className="relative z-[2] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(500px_300px_at_80%_20%,rgba(217,119,87,0.08),transparent_60%)] pointer-events-none" />

      <div
        className="max-w-[var(--max)] mx-auto px-5 md:px-7 pt-14 md:pt-20 pb-10 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 600ms ease, transform 600ms ease",
        }}
      >
        <div className="max-w-[720px]">
          <Kicker>{eyebrow}</Kicker>
          <h1 className="font-display font-[800] text-[clamp(32px,8vw,68px)] md:text-[clamp(38px,5vw,68px)] leading-[1.05] tracking-[-0.04em] mb-3 md:mb-4">
            {title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-ink-soft max-w-[640px] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="hidden md:block shrink-0 opacity-80">
          <RobotMascot size={robotSize} variant={robotVariant} />
        </div>
      </div>

      <div className="mx-5 md:mx-7">
        <div className="max-w-[var(--max)] mx-auto border-t border-line" />
      </div>
    </section>
  );
}
