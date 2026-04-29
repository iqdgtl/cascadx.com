import SectionHead from "./ui/SectionHead";
import Kicker from "./ui/Kicker";

const metrics = [
  { k: "Approval", v: "87.4%", d: "▲ 2.1% vs yest.", down: false },
  { k: "Recovered", v: "$142K", d: "via cascading", down: false },
  { k: "Decline Anom.", v: "2", d: "alerts active", down: true },
];

const alerts = [
  {
    warn: true,
    title: "Spike in 05 — Do Not Honor · Visa DE",
    sub: "AI recommends rerouting to Adyen · projected +3.1% AR",
    time: "09:42",
  },
  {
    warn: false,
    title: "Checkout.com latency normalised",
    sub: "auto-resumed as primary on GB route",
    time: "09:17",
  },
  {
    warn: true,
    title: "Forecast: –5% AR on MX corridor in 2h",
    sub: "add local PSP to raise coverage · suggested: Kushki",
    time: "08:55",
  },
];

const kpis = [
  { value: "< 3s", label: "Anomaly detection" },
  { value: "30+", label: "Dimensions tracked" },
  { value: "94%", label: "Forecast precision" },
  { value: "24/7", label: "Always watching" },
];

export default function SignalsDashboard() {
  return (
    <section id="signals" className="relative z-[2] py-[120px] px-7 bg-bg-alt">
      <div className="max-w-[var(--max)] mx-auto">
        <SectionHead
          kicker="02 · Signals & Forecasting"
          title={
            <>
              See a decline <em className="not-italic font-[800] text-accent-deep">before</em> it becomes a trend.
            </>
          }
          lede="Real-time anomaly detection on every dimension — PSP, BIN, issuer, country, device, merchant — with forecasts that flag drops hours before they hit the dashboard."
        />

        <div className="alert-grid grid grid-cols-[1.1fr_1fr] gap-[60px] items-stretch">
          {/* Dashboard */}
          <div className="bg-surface-el border border-line rounded-[var(--radius-lg)] p-[26px] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-40px_rgba(0,0,0,0.4)] flex flex-col gap-5">
            {/* Head */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h4 className="m-0 font-display font-[700] text-[18px] tracking-[-0.02em]">
                Approval Rate · Last 24h
              </h4>
              <div className="font-mono text-[11px] text-ink-muted tracking-[0.08em] uppercase">LIVE</div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3.5">
              {metrics.map((m) => (
                <div key={m.k} className="p-3.5 bg-surface-sub rounded-[var(--radius)] border border-line">
                  <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-muted mb-1.5">{m.k}</div>
                  <div className="font-display font-[700] text-[26px] tracking-[-0.02em]">{m.v}</div>
                  <div className={`font-mono text-[11px] mt-0.5 ${m.down ? "text-warn" : "text-accent-deep"}`}>{m.d}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="relative h-40">
              <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d97757" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g strokeDasharray="2 4">
                  <line x1="0" y1="40" x2="600" y2="40" stroke="var(--line)" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="var(--line)" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="var(--line)" />
                </g>
                <path
                  className="opacity-0 animate-[fadeIn_0.8s_ease_1.5s_forwards]"
                  fill="url(#areaGrad)"
                  d="M0,90 C60,80 90,95 150,70 C210,50 240,60 300,55 C360,50 390,30 450,45 C510,60 540,35 600,20 L600,160 L0,160 Z"
                />
                <path
                  className="fill-none stroke-accent-deep stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:1000] [stroke-dashoffset:1000] animate-[draw_2.5s_ease_forwards]"
                  d="M0,90 C60,80 90,95 150,70 C210,50 240,60 300,55 C360,50 390,30 450,45 C510,60 540,35 600,20"
                />
                <circle cx="150" cy="70" r="4" fill="#ff6a3d" />
                <circle cx="450" cy="45" r="4" fill="#d97757" />
              </svg>
            </div>

            {/* Alert feed */}
            <div className="flex flex-col gap-2.5">
              {alerts.map((a) => (
                <div
                  key={a.title}
                  className="grid grid-cols-[auto_1fr_auto] gap-3.5 items-center p-[12px_14px] border border-line rounded-[var(--radius)] bg-surface-sub text-[13px] transition-all duration-250 hover:translate-x-1 hover:border-accent hover:bg-surface"
                >
                  <span className={`w-2 h-2 rounded-full ${a.warn ? "bg-warn shadow-[0_0_10px_var(--warn)]" : "bg-accent shadow-[0_0_10px_var(--accent)]"}`} />
                  <div>
                    <strong className="block text-ink font-medium">{a.title}</strong>
                    <span className="text-ink-muted text-xs">{a.sub}</span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-muted">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy side */}
          <div>
            <Kicker className="!text-ink-soft">What CascadX watches</Kicker>
            <h3 className="font-display font-[700] text-[36px] leading-[1.1] tracking-[-0.035em] mt-3.5 mb-[22px]">
              Every dimension of your{" "}
              <em className="not-italic font-[700] text-accent-deep">payment surface</em>, in parallel.
            </h3>
            <p className="text-ink-soft text-base leading-[1.6]">
              CascadX watches approval rate, 3DS drop-off, authorisation codes, issuer response codes, currency
              conversion, chargeback velocity and PSP uptime — at the same time. When a pattern bends, you get an alert
              with a prescription, not just a number.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="pt-[22px] border-t border-line-strong">
                  <strong className="block font-display font-[700] text-[42px] tracking-[-0.02em] text-ink">
                    {kpi.value}
                  </strong>
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
