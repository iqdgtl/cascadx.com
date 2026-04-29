import Kicker from "./ui/Kicker";
import Logo from "./ui/Logo";

const chips = [
  { name: "Stripe", cls: "top-[10%] left-[8%] animate-[float_6s_ease-in-out_0s_infinite]" },
  { name: "Adyen", cls: "top-[6%] left-[42%] animate-[float_6s_ease-in-out_-1s_infinite]" },
  { name: "Worldpay", cls: "top-[16%] right-[10%] animate-[float_6s_ease-in-out_-2s_infinite]" },
  { name: "Checkout.com", cls: "top-[48%] left-[2%] animate-[float_6s_ease-in-out_-0.5s_infinite]" },
  { name: "Braintree", cls: "top-[52%] right-0 animate-[float_6s_ease-in-out_-2.5s_infinite]" },
  { name: "Nuvei", cls: "bottom-[14%] left-[14%] animate-[float_6s_ease-in-out_-1.5s_infinite]" },
  { name: "Trustly", cls: "bottom-[8%] left-[46%] animate-[float_6s_ease-in-out_-3s_infinite]" },
  { name: "Airwallex", cls: "bottom-[18%] right-[12%] animate-[float_6s_ease-in-out_-2s_infinite]" },
];

const chipSvgPaths = [
  "M130,80 L480,210",
  "M430,40 L480,210",
  "M830,100 L480,210",
  "M60,220 L480,210",
  "M920,220 L480,210",
  "M190,360 L480,210",
  "M480,390 L480,210",
  "M810,360 L480,210",
];

export default function IntegrationsNetwork() {
  return (
    <section
      id="network"
      className="relative z-[2] py-[100px] px-7 overflow-hidden bg-bg-alt border-t border-b border-line"
    >
      <div className="max-w-[var(--max)] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Kicker className="justify-center">04 · The Network</Kicker>
          <h2 className="font-display font-[800] text-[clamp(32px,4vw,52px)] tracking-[-0.04em] leading-[1.05] mx-auto max-w-[700px]">
            One API. <em className="not-italic font-[800] text-accent-deep">1,000+</em> providers. Any geography.
          </h2>
        </div>

        {/* Cloud */}
        <div className="integ-cloud relative h-[420px] max-w-[960px] mx-auto">
          {/* Connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 960 420"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chipLink" x1="0" x2="1">
                <stop offset="0%" stopColor="#d97757" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="url(#chipLink)" strokeWidth="1" fill="none">
              {chipSvgPaths.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-surface-el border border-line-strong grid place-items-center shadow-[0_0_0_10px_rgba(255,255,255,0.05),0_0_0_20px_rgba(255,255,255,0.02),0_0_60px_rgba(217,119,87,0.2)] z-[3] before:content-[''] before:absolute before:inset-[-1px] before:rounded-full before:border before:border-accent before:opacity-40 before:animate-[pulse_2.6s_ease-in-out_infinite]">
            <Logo className="text-[20px]" dotSize={5} />
          </div>

          {/* Chips */}
          {chips.map((c) => (
            <div
              key={c.name}
              className={`absolute px-4 py-[10px] bg-surface border border-line rounded-full font-mono text-xs tracking-[0.04em] text-ink-soft shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-default hover:border-accent hover:text-accent-deep hover:-translate-y-1 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:mr-2 before:align-middle ${c.cls}`}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
