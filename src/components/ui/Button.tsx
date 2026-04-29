import React from "react";

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  </svg>
);

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
  icon?: "arrow" | "play" | "none";
  className?: string;
  invertColors?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  href,
  children,
  icon = "none",
  className = "",
  invertColors = false,
  ...rest
}: ButtonProps) {
  const base = "group inline-flex items-center gap-[10px] rounded-full text-[15px] font-semibold transition-all duration-250 ease-out";

  const primaryDefault =
    "px-6 py-[15px] bg-accent text-[#0d0f0e] shadow-[0_6px_30px_-10px_rgba(217,119,87,0.5)] hover:bg-accent-deep hover:text-[#0d0f0e] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(217,119,87,0.55)]";
  const primaryInvert =
    "px-6 py-[15px] bg-accent text-[#0d0f0e] shadow-[0_6px_30px_-10px_rgba(217,119,87,0.5)] hover:bg-accent-deep hover:text-[#0d0f0e] hover:-translate-y-0.5";
  const ghostDefault =
    "px-[22px] py-[15px] border border-line-strong bg-white/[0.04] text-ink hover:border-accent hover:bg-white/[0.08]";
  const ghostInvert =
    "px-[22px] py-[15px] border border-white/20 bg-transparent text-ink hover:border-accent hover:bg-white/[0.06]";

  let variantClass: string;
  if (variant === "primary") {
    variantClass = invertColors ? primaryInvert : primaryDefault;
  } else {
    variantClass = invertColors ? ghostInvert : ghostDefault;
  }

  const iconEl =
    icon === "arrow" ? <ArrowIcon /> : icon === "play" ? <PlayIcon /> : null;

  const classes = `${base} ${variantClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {iconEl && icon === "play" && iconEl}
        {children}
        {iconEl && icon === "arrow" && iconEl}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {iconEl && icon === "play" && iconEl}
      {children}
      {iconEl && icon === "arrow" && iconEl}
    </button>
  );
}
