import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "iGaming — CascadX",
  description: "Payment cascading built for the pace of play. Handle high-volume deposits, crypto + fiat, and jurisdictional routing with AI precision.",
  alternates: { canonical: "/solutions/igaming" },
};

const BoltIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L8 24h12l-2 14L32 16H20l2-14z"/></svg>);
const ShieldIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 4L6 10v10c0 8.4 6 14 14 16 8-2 14-7.6 14-16V10L20 4z"/></svg>);
const GlobeIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="20" cy="20" r="16"/><ellipse cx="20" cy="20" rx="8" ry="16"/><path d="M4 20h32"/></svg>);

export default function IGamingPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Our Solutions · iGaming" title="Built for the pace of play." subtitle="High transaction volume, regulatory friction, deposit/withdrawal asymmetry — iGaming payments are uniquely complex. CascadX handles all of it." />

      <PageSection variant="feature" kicker="The Challenge" icon={<BoltIcon />} title="Gaming moves fast. Your payments should too.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">Players expect instant deposits and seamless withdrawals. Every failed transaction is a lost session — and possibly a lost player.</p>
      </PageSection>

      <PageSection variant="split" kicker="The Solution" title="Instant decisioning at scale." alt>
        <p className="text-ink-soft leading-relaxed">CascadX processes thousands of concurrent deposits with sub-40ms routing decisions. When one PSP hiccups, traffic cascades automatically — no manual intervention, no player friction.</p>
      </PageSection>

      <PageSection variant="showcase" kicker="Capabilities" title="Purpose-built for gaming operators.">
        <ShowcaseCard icon={<ShieldIcon />} title="High-risk BIN handling" description="Route high-risk BIN ranges to providers that specialize in gaming acceptance. Lift approval by 12-18%." />
        <ShowcaseCard icon={<BoltIcon />} title="Crypto + fiat cascading" description="Seamlessly cascade between crypto rails and traditional card payments within a single transaction flow." />
        <ShowcaseCard icon={<GlobeIcon />} title="Jurisdictional routing" description="Automatically route to locally-licensed PSPs per jurisdiction. Stay compliant across every market." />
      </PageSection>

      <PageSection variant="split" kicker="Compliance" title="Compliance-ready from day one." alt reverse>
        <p className="text-ink-soft leading-relaxed">Built-in KYC/AML provider cascading, responsible gambling checks, and jurisdiction-aware routing. CascadX doesn't just process payments — it helps you stay licensed.</p>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
