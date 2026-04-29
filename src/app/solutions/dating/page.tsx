import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "Dating — CascadX",
  description: "Match-worthy checkout. AI-powered payment cascading for dating apps — recover failed subscriptions, reduce churn, and keep subscribers matched.",
  alternates: { canonical: "/solutions/dating" },
};

const HeartIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 36S4 26 4 16a8 8 0 0 1 16 0 8 8 0 0 1 16 0c0 10-16 20-16 20z"/></svg>);
const RefreshIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M30 8l4 4-4 4M6 20a14 14 0 0 1 28-8M10 32l-4-4 4-4M34 20a14 14 0 0 1-28 8"/></svg>);
const WalletIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="10" width="32" height="22" rx="4"/><path d="M28 22h4"/><circle cx="30" cy="22" r="2" fill="#d97757" stroke="none"/></svg>);

export default function DatingPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Our Solutions · Dating" title="Match-worthy checkout." subtitle="Subscription retention is everything in dating. CascadX ensures failed payments don't end great matches." robotVariant="idle" />

      <PageSection variant="feature" kicker="The Challenge" icon={<HeartIcon />} title="Every failed renewal is a lost subscriber.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">Dating apps lose 8-12% of subscribers annually to involuntary churn — payment failures that cascade into cancellations. Most of these are recoverable.</p>
      </PageSection>

      <PageSection variant="split" kicker="The Solution" title="Dunning that doesn't feel like dunning." alt>
        <p className="text-ink-soft leading-relaxed">CascadX retries failed subscription renewals across multiple PSPs with intelligent timing — matching the retry to the issuer's known behavior patterns. The subscriber never sees an interruption.</p>
      </PageSection>

      <PageSection variant="showcase" kicker="Features" title="Keep subscribers — automatically.">
        <ShowcaseCard icon={<RefreshIcon />} title="Smart retry logic" description="AI-timed retries based on issuer behavior, card type, and time-of-day patterns. Recover 23% more renewals." />
        <ShowcaseCard icon={<WalletIcon />} title="Global wallet support" description="Apple Pay, Google Pay, Klarna, PayPal — cascade across wallets and cards within a single subscriber's payment flow." />
        <ShowcaseCard icon={<HeartIcon />} title="Frictionless renewal" description="Subscribers stay matched. No 'update your payment' emails, no interruptions, no lost connections." />
      </PageSection>

      <PageSection variant="feature" kicker="Impact" title={<>Dating apps using cascading recover <em className="not-italic font-[700] text-accent-deep">23% more</em> subscriptions on average.</>} alt>
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">That's revenue that was already earned — just waiting to be captured.</p>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
