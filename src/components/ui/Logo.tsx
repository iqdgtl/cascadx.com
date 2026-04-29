type LogoProps = {
  className?: string;
  dotSize?: number;
};

export default function Logo({ className = "", dotSize = 6 }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-[800] tracking-[-0.035em] text-ink ${className}`}
    >
      CascadX
      <span
        className="rounded-full bg-accent inline-block ml-[3px]"
        style={{ width: dotSize, height: dotSize }}
      />
    </span>
  );
}
