import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";
import StatsBar from "@/components/StatsBar";
import ProcessSteps from "@/components/ProcessSteps";
import ComparisonSection from "@/components/ComparisonSection";
import StatStrip from "@/components/StatStrip";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "E-Commerce — CascadX",
  description: "Maximize checkout approval rates with AI-powered payment cascading built for e-commerce. Every cart, every checkout, every chance to say yes.",
  alternates: { canonical: "/solutions/ecommerce" },
};

/* --- Icons --- */
const CartIcon = () => (<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="40" r="3"/><circle cx="36" cy="40" r="3"/><path d="M4 4h8l5 28h22l5-18H14"/></svg>);
const CardIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 10h20"/></svg>);
const RouteIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>);
const CheckIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>);
const MobileIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><rect x="10" y="2" width="20" height="36" rx="4"/><line x1="18" y1="32" x2="22" y2="32"/></svg>);
const RepeatIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M30 8l4 4-4 4M6 20a14 14 0 0 1 28-8M10 32l-4-4 4-4M34 20a14 14 0 0 1-28 8"/></svg>);
const RetentionIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><path d="M20 6v28M6 20h28"/><circle cx="20" cy="20" r="14"/></svg>);

export default function EcommercePage() {
  return (
    <>
      <Nav />

      {/* 1. Hero */}
      <PageHero
        eyebrow="Our Solutions · E-Commerce"
        title={<>Every cart. Every checkout. Every chance to say <em className="not-italic font-[800] text-accent-deep">yes</em>.</>}
        subtitle="CascadX routes each transaction through the optimal PSP in real time — recovering revenue that static checkout stacks leave on the table."
      />

      {/* 2. Stats bar */}
      <StatsBar stats={[
        { value: 23, suffix: "%", label: "Lift in approval rate" },
        { value: 1200, prefix: "$", suffix: "M+", label: "Recovered annually" },
        { value: 1000, suffix: "+", label: "E-commerce merchants" },
        { value: 40, prefix: "<", suffix: "ms", label: "Routing speed" },
      ]} />

      {/* 3. Feature section with animated diagram */}
      <PageSection variant="split" kicker="The Problem" title="Abandoned carts aren't always the customer's fault.">
        <p className="text-ink-soft leading-relaxed mb-5">
          Up to 15% of failed e-commerce payments are soft declines that a different provider would have approved.
          Without intelligent cascading, that revenue simply vanishes — your customer gets an error, your
          cart abandonment rate climbs, and the sale is lost forever.
        </p>
        <ul className="space-y-3 mt-6">
          {[
            "Issuer soft-declines account for 60% of payment failures",
            "Static routing can't adapt to PSP-level fluctuations in real time",
            "Every failed checkout erodes customer trust and lifetime value",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5" /></svg>
              {item}
            </li>
          ))}
        </ul>
      </PageSection>

      {/* 4. Process / How it works */}
      <ProcessSteps
        kicker="How It Works"
        title={<>Four steps. <em className="not-italic font-[700] text-accent-deep">Zero friction.</em></>}
        steps={[
          { number: "01", icon: <CartIcon />, title: "Customer adds to cart", description: "Your checkout flow stays exactly as it is. CascadX sits invisibly between your checkout and your PSPs." },
          { number: "02", icon: <CardIcon />, title: "Checkout initiated", description: "The customer enters card details or selects a wallet. CascadX receives the transaction in real time." },
          { number: "03", icon: <RouteIcon />, title: "AI routes optimally", description: "The model evaluates 30+ signals — BIN, issuer, geography, PSP health — and picks the best provider in <40ms." },
          { number: "04", icon: <CheckIcon />, title: "Payment captured", description: "If the first PSP declines, CascadX instantly cascades to the next best. The customer sees one seamless checkout." },
        ]}
      />

      {/* 5. Showcase cards */}
      <PageSection variant="showcase" kicker="Capabilities" title="Built for modern commerce.">
        <ShowcaseCard
          icon={<MobileIcon />}
          title="Mobile-first checkout"
          description="Optimized for mobile conversion with fast fallback routing that keeps total latency under 40ms — even on cascaded retries."
        />
        <ShowcaseCard
          icon={<RepeatIcon />}
          title="Subscription-optimized"
          description="Smart retry logic for recurring payments — recover failed renewals with AI-timed retries before the subscriber even notices."
        />
        <ShowcaseCard
          icon={<RetentionIcon />}
          title="One-click retention"
          description="Reduce involuntary churn with AI-driven dunning that cascades retries across multiple providers and payment methods."
        />
      </PageSection>

      {/* 6. Comparison section */}
      <ComparisonSection
        kicker="The Difference"
        title={<>What changes when your payments <em className="not-italic font-[700] text-accent-deep">think</em>.</>}
        before={{
          heading: "Without CascadX",
          items: [
            "Static routing sends every transaction to a single PSP",
            "Soft declines result in lost sales — no automatic retry",
            "Approval rates stagnate at 78-82%",
            "Revenue leakage grows with every failed checkout",
            "Manual PSP tuning required weekly by ops team",
          ],
        }}
        after={{
          heading: "With CascadX",
          items: [
            "AI selects the optimal PSP for every individual transaction",
            "Declined transactions automatically cascade to backup providers",
            "Approval rates climb to 91-96% within weeks",
            "Recovered revenue compounds monthly — typically +$140K/month",
            "Model self-optimizes daily — zero manual intervention",
          ],
        }}
      />

      {/* 7. Stat strip */}
      <StatStrip
        value={94}
        suffix="%"
        text="of soft-declined transactions recovered through CascadX cascading — revenue that was already earned, just waiting to be captured."
      />

      {/* 8. FAQ */}
      <FAQ
        kicker="FAQ"
        title="Frequently asked questions."
        items={[
          { question: "How does CascadX integrate with my checkout?", answer: "CascadX sits between your checkout and your PSPs via a single API integration. Your frontend doesn't change — we intercept the payment request server-side, route it optimally, and return the result. Most merchants go live in under a day." },
          { question: "Will customers experience any friction during cascading?", answer: "No. Cascading happens server-side in under 40ms. The customer sees a single checkout flow. If the first PSP declines, the retry happens invisibly — no re-entering card details, no error messages, no delays." },
          { question: "Does CascadX handle subscription billing?", answer: "Yes. Our recurring billing module includes AI-timed retry logic for failed renewals, smart dunning sequences, and multi-PSP cascading for stored payment methods. Dating and SaaS companies see 14-23% improvement in renewal recovery." },
          { question: "Can I keep my existing PSP relationships?", answer: "Absolutely. CascadX doesn't replace your PSPs — it orchestrates between them. Keep Stripe, Adyen, Checkout.com, or any of the 1,000+ providers in our network. We make your existing stack smarter." },
          { question: "How quickly can I go live?", answer: "Most merchants integrate and go live within 24 hours. Our sandbox mirrors production exactly — flip a key to switch from test to live. No code changes required." },
          { question: "What about chargebacks and refunds?", answer: "CascadX routes the refund back through the same PSP that captured the original charge, automatically. Chargeback data feeds into the routing model so we learn to avoid dispute-prone corridors." },
        ]}
      />

      {/* 9. CTA */}
      <CTA />
      <Footer />
    </>
  );
}
