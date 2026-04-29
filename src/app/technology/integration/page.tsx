import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "Integration — CascadX",
  description: "One API. Every payment method. Integrate CascadX into your stack in under a day with our SDK, webhooks, and sandbox environment.",
  alternates: { canonical: "/technology/integration" },
};

const CodeIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12L4 20l10 8M26 12l10 8-10 8"/></svg>);
const WebhookIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="10" cy="30" r="6"/><circle cx="30" cy="30" r="6"/><circle cx="20" cy="10" r="6"/><path d="M16 10l-6 20M24 10l6 20"/></svg>);
const KeyIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="14" cy="20" r="8"/><path d="M22 20h14M30 16v8M36 16v8"/></svg>);
const RocketIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 36V20M20 4c-6 4-10 12-10 20h20c0-8-4-16-10-20z"/><path d="M14 32c-4 0-6-4-6-4M26 32c4 0 6-4 6-4"/></svg>);

export default function IntegrationPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Technology · Integration" title="One API. Every payment method." subtitle="CascadX connects to your stack with a single integration. SDK, REST API, webhooks — your choice." />

      <PageSection variant="feature" kicker="Overview" icon={<CodeIcon />} title="Build once. Route everywhere.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">A single API call sends a transaction into the CascadX engine. The AI picks the PSP, handles the cascade, and returns the result — all through one consistent interface.</p>
      </PageSection>

      <PageSection variant="split" kicker="Code Examples" title="Three lines to production." alt>
        <div className="bg-surface-el border border-line rounded-[var(--radius-lg)] p-5 font-mono text-sm text-ink-soft">
          <div className="text-ink-muted text-xs mb-3 flex gap-4"><span className="text-accent">curl</span><span className="text-ink-muted">JavaScript</span><span className="text-ink-muted">Python</span></div>
          <div><span className="text-accent">curl</span> -X POST https://api.cascadx.com/v1/charge \</div>
          <div className="pl-4">-H <span className="text-accent-deep">&quot;Authorization: Bearer sk_live_...&quot;</span> \</div>
          <div className="pl-4">-d amount=4999 -d currency=EUR -d cascade=true</div>
        </div>
      </PageSection>

      <PageSection variant="showcase" kicker="Features" title="Everything you need to go live.">
        <ShowcaseCard icon={<WebhookIcon />} title="Webhooks" description="Real-time event notifications for every transaction state change. Retry-safe with signature verification." />
        <ShowcaseCard icon={<KeyIcon />} title="Idempotency" description="Built-in idempotency keys prevent duplicate charges. Safe to retry any request without side effects." />
        <ShowcaseCard icon={<RocketIcon />} title="Sandbox-to-live" description="Full sandbox environment mirrors production. Flip a key to go live — no code changes." />
      </PageSection>

      <PageSection variant="feature" kicker="Timeline" title="Integrate in under a day." alt>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
          {[{ step: "1", label: "Get API keys", time: "5 min" }, { step: "2", label: "Send test charge", time: "15 min" }, { step: "3", label: "Configure cascade rules", time: "1 hour" }, { step: "4", label: "Go live", time: "Same day" }].map((s) => (
            <div key={s.step} className="bg-surface-el border border-line rounded-[var(--radius)] p-4 text-center flex-1">
              <div className="font-display font-[800] text-2xl text-accent mb-1">{s.step}</div>
              <div className="font-display font-[600] text-sm mb-1">{s.label}</div>
              <div className="font-mono text-[10px] text-ink-muted uppercase">{s.time}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
