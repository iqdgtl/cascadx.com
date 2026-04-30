import Kicker from "./Kicker";

type SectionHeadProps = {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
};

export default function SectionHead({ kicker, title, lede }: SectionHeadProps) {
  return (
    <div className="section-head-flex flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-10 mb-10 md:mb-[70px] pb-5 md:pb-7 border-b border-line">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-display font-[800] text-[clamp(28px,7vw,62px)] md:text-[clamp(34px,4.4vw,62px)] leading-[1.05] tracking-[-0.04em] max-w-[760px]">
          {title}
        </h2>
      </div>
      {lede && (
        <p className="text-base text-ink-soft max-w-none md:max-w-[340px] leading-[1.55]">
          {lede}
        </p>
      )}
    </div>
  );
}
