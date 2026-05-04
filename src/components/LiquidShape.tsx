"use client";
import type { ReelTheme } from "@/lib/themes";
import { darkTheme } from "@/lib/themes";

export default function LiquidShape({ className = "", style = {}, theme = darkTheme }: { className?: string; style?: React.CSSProperties; theme?: ReelTheme }) {
  return (
    <svg viewBox="0 0 400 600" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="lqGrad" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={theme.lqFrom} stopOpacity="0.9" />
          <stop offset="40%" stopColor={theme.accentDeep} stopOpacity="0.7" />
          <stop offset="100%" stopColor={theme.lqTo} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="lqHL" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={theme === darkTheme ? "0.15" : "0.6"} />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,100 C80,0 200,50 280,150 C360,250 320,400 200,500 C80,600 0,450 0,300 Z" fill="url(#lqGrad)" />
      <path d="M40,120 C100,30 180,80 240,170 C300,260 260,380 160,460 C60,540 20,400 40,280 Z" fill="url(#lqHL)" />
    </svg>
  );
}
