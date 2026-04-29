import SectionHead from "./ui/SectionHead";
import RobotMascot from "./RobotMascot";

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="shrink-0 mt-[3px] text-accent-deep"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const features = [
  "Detects decline spikes by BIN, country, PSP and issuer within seconds.",
  "Recommends the next PSP to add to lift approval rate, with projected impact.",
  "Explains any transaction in one sentence — what happened, why, what to do.",
  "Writes new cascading rules on request. Your ops team approves, CascadX executes.",
];

export default function AIChat() {
  return (
    <section id="intelligence" className="relative z-[2] py-[120px] px-7">
      <div className="max-w-[var(--max)] mx-auto">
        <SectionHead
          kicker="01 · Intelligence Layer"
          title={
            <>
              An analyst <em className="not-italic font-[800] text-accent-deep">lives</em> inside your payments dashboard.
            </>
          }
          lede="Ask any question in plain language. The CascadX AI reads your live flow, spots emerging decline clusters, and prescribes the fix — before finance even notices."
        />

        <div className="chat-layout grid grid-cols-[1fr_1.05fr] gap-20 items-center">
          {/* Copy */}
          <div>
            <h3 className="font-display font-[700] text-[44px] leading-[1.05] tracking-[-0.035em] mb-[22px]">
              Not a bot. A <em className="not-italic font-[700] text-accent-deep">payments operator</em> that never sleeps.
            </h3>
            <p className="text-[17px] text-ink-soft leading-[1.6] max-w-[480px] mb-[18px]">
              The on-platform assistant is trained on your routing rules, historical performance, PSP behaviour
              and live issuer response codes. It explains declines, suggests new connections to raise approvals,
              and drafts routing changes for your team to approve in one click.
            </p>
            <ul className="list-none p-0 mt-8 grid gap-3.5">
              {features.map((f) => (
                <li key={f} className="flex gap-3.5 items-start text-[15px] text-ink-soft">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat card */}
          <div className="bg-surface-el rounded-[var(--radius-lg)] border border-line shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-30px_rgba(0,0,0,0.4),0_10px_30px_-20px_rgba(217,119,87,0.15)] p-6 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(600px_200px_at_100%_0%,var(--accent-glow),transparent_60%),radial-gradient(400px_180px_at_0%_100%,rgba(217,119,87,0.08),transparent_60%)]" />

            {/* Header */}
            <div className="flex items-center justify-between pb-[18px] border-b border-line mb-5 relative z-[1]">
              <div className="flex items-center gap-3 font-display font-[700] text-[18px] tracking-[-0.02em]">
                <div className="relative w-[42px] h-[42px] rounded-[12px] bg-surface-el border border-line grid place-items-center">
                  <RobotMascot size={36} variant="thinking" />
                </div>
                <div>
                  CascadX Copilot
                  <div className="font-mono text-[11px] text-ink-muted tracking-[0.05em] mt-0.5 font-normal">
                    trained on your live flow
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[7px] font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-[pulse_1.6s_ease-in-out_infinite]" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3.5 relative z-[1] min-h-[360px]">
              <div className="self-end max-w-[88%] px-4 py-[13px] rounded-[14px] rounded-br-[4px] text-[14.5px] leading-[1.5] bg-accent text-[#0d0f0e] opacity-0 translate-y-2 animate-[msgIn_0.5s_cubic-bezier(0.2,0.8,0.2,1)_0.2s_forwards]">
                Why is our EU card approval down this morning?
              </div>
              <div className="self-start max-w-[88%] px-4 py-[13px] rounded-[14px] rounded-bl-[4px] text-[14.5px] leading-[1.5] bg-surface border border-line text-ink opacity-0 translate-y-2 animate-[msgIn_0.5s_cubic-bezier(0.2,0.8,0.2,1)_1.3s_forwards]">
                I&apos;m seeing a <strong>4.2%</strong> drop in DE &amp; NL approvals since 06:40 UTC — traced to Stripe issuer responses on Visa consumer credit.
                <div className="flex gap-[10px] items-center p-[10px_12px] mt-[10px] bg-warn-soft rounded-lg text-[#b44324] font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-warn shrink-0" />
                  12 declines / min on BIN range 445692 · likely issuer soft-decline
                </div>
                <div className="mt-[10px] p-[10px_12px] bg-[rgba(217,119,87,0.1)] border-l-2 border-accent rounded text-[13.5px] text-accent-deep">
                  → Recommend cascading these BINs to Adyen first. Projected recovery: <strong>+$8.4K</strong> today.
                </div>
              </div>
              <div className="self-end max-w-[88%] px-4 py-[13px] rounded-[14px] rounded-br-[4px] text-[14.5px] leading-[1.5] bg-accent text-[#0d0f0e] opacity-0 translate-y-2 animate-[msgIn_0.5s_cubic-bezier(0.2,0.8,0.2,1)_2.4s_forwards]">
                Apply it to the EU route.
              </div>
            </div>

            {/* Input */}
            <div className="mt-5 flex items-center gap-[10px] px-[18px] py-[10px] border border-line rounded-full bg-bg relative z-[1]">
              <input
                type="text"
                placeholder="Ask about any transaction, route or PSP…"
                className="flex-1 bg-transparent border-none outline-none font-sans text-sm text-ink placeholder:text-ink-muted"
                readOnly
              />
              <button className="w-[38px] h-[38px] rounded-full bg-ink text-bg grid place-items-center transition-colors hover:bg-accent-deep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
