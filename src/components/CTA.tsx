"use client";

import Button from "./ui/Button";
import RobotMascot from "./RobotMascot";

export default function CTA() {
  return (
    <section id="cta" className="relative z-[2] py-16 md:py-[140px] px-5 md:px-7 bg-gradient-to-b from-[#0d0f0e] to-[#050606] text-ink overflow-hidden">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(500px_300px_at_80%_20%,rgba(217,119,87,0.35),transparent_65%),radial-gradient(400px_250px_at_20%_80%,rgba(217,119,87,0.12),transparent_60%)]" />

      {/* Waving robot — bottom right on desktop, centered on mobile */}
      <div className="absolute bottom-10 right-[12%] opacity-90 hidden md:block">
        <RobotMascot size={140} variant="waving" />
      </div>
      <div className="relative z-[2] max-w-[var(--max)] mx-auto text-center">
        {/* Robot on mobile — centered above content */}
        <div className="flex justify-center mb-8 md:hidden">
          <RobotMascot size={90} variant="waving" />
        </div>

        <h2 className="font-display font-[800] text-[clamp(44px,6vw,88px)] leading-none tracking-[-0.04em] mb-[30px] mx-auto max-w-[880px]">
          Ready to turn declines into <em className="not-italic font-[800] text-accent">revenue</em>?
        </h2>

        <p className="text-ink-soft text-[18px] max-w-[560px] mx-auto mb-11">
          See a live CascadX instance connected to your real corridors. Thirty minutes, zero commitment.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap">
          <Button variant="primary" icon="arrow" onClick={() => window.dispatchEvent(new Event("open-chat"))}>
            Book a demo
          </Button>
          <Button href="#" variant="ghost">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  );
}
