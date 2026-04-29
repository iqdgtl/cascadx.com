import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "AI Routing — CascadX",
  description: "Every transaction routed by intelligence. CascadX's AI engine makes sub-40ms routing decisions using real-time approval data across 30+ dimensions.",
  alternates: { canonical: "/technology/ai-routing" },
};

const BrainIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="20" cy="20" r="16"/><path d="M14 14c2-2 10-2 12 0M14 26c2 2 10 2 12 0M20 8v24"/></svg>);
const ClockIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="20" cy="20" r="16"/><path d="M20 10v10l7 7"/></svg>);
const EyeIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><path d="M4 20s6-12 16-12 16 12 16 12-6 12-16 12S4 20 4 20z"/><circle cx="20" cy="20" r="5"/></svg>);

export default function AIRoutingPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Technology · AI Routing" title="Every transaction, routed by intelligence." subtitle="The CascadX AI engine processes 30+ real-time signals to pick the optimal PSP for every single transaction — in under 40ms." robotVariant="thinking" />

      <PageSection variant="feature" kicker="Overview" icon={<BrainIcon />} title="Not rules. Not thresholds. Actual intelligence.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">Traditional routing uses static rules: "send Visa DE to Stripe." CascadX's model evaluates BIN, issuer, country, time-of-day, PSP health, and 25+ more signals to choose the best route for THIS specific transaction.</p>
      </PageSection>

      <PageSection variant="split" kicker="How It Works" title="Inputs → Model → Decision." alt>
        <p className="text-ink-soft leading-relaxed mb-6">The AI considers every dimension available at transaction time. Here's what it sees:</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {["BIN range", "Issuer bank", "Country", "Card type", "Time of day", "PSP health", "Historical AR", "3DS outcome"].map((feat) => (
            <div key={feat} className="bg-surface border border-line rounded-[var(--radius-sm)] px-3 py-2 font-mono text-xs text-ink-soft">{feat}</div>
          ))}
        </div>
      </PageSection>

      <PageSection variant="showcase" kicker="Capabilities" title="Intelligence at every layer.">
        <ShowcaseCard icon={<ClockIcon />} title="Real-time inference" description="Sub-40ms routing decisions. No batch processing, no delays. Every transaction gets a fresh prediction." />
        <ShowcaseCard icon={<BrainIcon />} title="Continual learning" description="The model retrains daily on your actual approval data. Routes improve automatically — no manual tuning." />
        <ShowcaseCard icon={<EyeIcon />} title="Explainability" description="Every routing decision logged with the reason, the alternatives considered, and the projected impact." />
      </PageSection>

      <PageSection variant="split" kicker="Performance" title={<>Sub-40ms decisions. <em className="not-italic font-[700] text-accent-deep">Every time.</em></>} alt reverse>
        <p className="text-ink-soft leading-relaxed">The model runs on edge infrastructure distributed across 8 regions. Latency is measured from transaction ingress to route selection — not from API call to response. Your customers never wait.</p>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
