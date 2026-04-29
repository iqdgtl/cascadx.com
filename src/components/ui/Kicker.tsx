type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Kicker({ children, className = "" }: KickerProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent-deep mb-[18px] ${className}`}
    >
      <span className="w-7 h-px bg-accent" />
      {children}
    </div>
  );
}
