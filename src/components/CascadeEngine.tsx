import SectionHead from "./ui/SectionHead";

const cascadeFeatures = [
  { title: "Cost-aware routing", desc: "Optimise for approval, cost, or both — per country, per PSP." },
  { title: "3DS cascading", desc: "Skip challenges where allowed, fall back cleanly when required." },
  { title: "BIN-level rules", desc: "Route specific issuer ranges to the PSPs that convert them best." },
  { title: "Auto-learning", desc: "CascadX adjusts weights daily from your real approval data." },
];

export default function CascadeEngine() {
  return (
    <section id="cascading" className="relative z-[2] py-[120px] px-7">
      <div className="max-w-[var(--max)] mx-auto">
        <SectionHead
          kicker="03 · Cascading Engine"
          title={
            <>
              One transaction. <em className="not-italic font-[800] text-accent-deep">Many</em> paths to yes.
            </>
          }
          lede="When a provider declines, CascadX instantly reroutes the transaction through the next best PSP — based on real-time performance, cost and issuer behaviour. The customer sees one seamless checkout."
        />

        {/* Visualization */}
        <div className="relative mt-[60px] p-[40px_30px] bg-surface-el rounded-[var(--radius-lg)] border border-line shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-40px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-70 pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(217,119,87,0.04)_50%,transparent),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_80px)]" />

          <div className="cascade-grid relative z-[1] grid grid-cols-5 gap-5 items-center">
            {/* Node: Stripe — declined */}
            <div className="relative p-[18px_16px] border border-warn bg-warn-soft rounded-[var(--radius)] font-mono text-xs text-center transition-all duration-300">
              <span className="block mx-auto mb-[10px] w-8 h-8 rounded-lg bg-[rgba(255,106,61,0.15)] grid place-items-center text-warn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </span>
              <strong className="block font-display font-[700] text-base text-ink mb-1 tracking-[-0.02em] normal-case">
                Stripe
              </strong>
              <span className="inline-block mt-1.5 px-[7px] py-[3px] rounded text-[10.5px] tracking-[0.06em] uppercase bg-warn text-white">
                Declined
              </span>
            </div>

            {/* Arrow */}
            <div className="cascade-arrow relative h-px bg-line-strong self-center after:content-[''] after:absolute after:right-[-1px] after:top-1/2 after:-translate-y-1/2 after:border-l-[6px] after:border-l-ink-soft after:border-t-[4px] after:border-t-transparent after:border-b-[4px] after:border-b-transparent" />

            {/* Node: Adyen — retry */}
            <div className="relative p-[18px_16px] border border-line-strong bg-bg rounded-[var(--radius)] font-mono text-xs text-center transition-all duration-300">
              <span className="block mx-auto mb-[10px] w-8 h-8 rounded-lg bg-surface grid place-items-center text-ink-soft">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-3-6.7" />
                  <path d="M21 3v6h-6" />
                </svg>
              </span>
              <strong className="block font-display font-[700] text-base text-ink mb-1 tracking-[-0.02em] normal-case">
                Adyen
              </strong>
              <span className="inline-block mt-1.5 px-[7px] py-[3px] rounded text-[10.5px] tracking-[0.06em] uppercase bg-ink text-bg">
                Retry
              </span>
            </div>

            {/* Active arrow */}
            <div className="cascade-arrow relative h-px bg-accent self-center after:content-[''] after:absolute after:right-[-1px] after:top-1/2 after:-translate-y-1/2 after:border-l-[6px] after:border-l-accent-deep after:border-t-[4px] after:border-t-transparent after:border-b-[4px] after:border-b-transparent" />

            {/* Node: Checkout.com — success */}
            <div className="relative p-[18px_16px] border border-accent bg-[rgba(217,119,87,0.12)] rounded-[var(--radius)] font-mono text-xs text-center transition-all duration-300">
              <span className="block mx-auto mb-[10px] w-8 h-8 rounded-lg bg-[rgba(217,119,87,0.12)] grid place-items-center text-accent-deep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <strong className="block font-display font-[700] text-base text-ink mb-1 tracking-[-0.02em] normal-case">
                Checkout.com
              </strong>
              <span className="inline-block mt-1.5 px-[7px] py-[3px] rounded text-[10.5px] tracking-[0.06em] uppercase bg-accent-deep text-white">
                Captured
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-[26px] mt-[30px] pt-[22px] border-t border-line font-mono text-[11.5px] text-ink-muted tracking-[0.05em]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warn" /> Declined — issuer 05
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ink-soft" /> Retry route — AI selected
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" /> Captured — +$48.20 recovered
            </span>
          </div>
        </div>

        {/* Feature grid */}
        <div className="cascade-features-grid grid grid-cols-4 gap-5 mt-[60px]">
          {cascadeFeatures.map((f) => (
            <div key={f.title} className="pt-6 border-t border-line-strong">
              <h5 className="m-0 mb-[10px] font-display font-[700] text-[17px] tracking-[-0.02em]">
                {f.title}
              </h5>
              <p className="m-0 text-sm text-ink-soft leading-[1.5]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
