import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "Hosted Payment — CascadX",
  description: "Checkout, handled. CascadX hosted payment pages reduce PCI scope while giving you full brand control and built-in analytics.",
  alternates: { canonical: "/technology/hosted-payment" },
};

const PaintIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="32" height="24" rx="4"/><path d="M4 12h32"/><circle cx="20" cy="20" r="3" fill="#d97757" stroke="none"/></svg>);
const CurrencyIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><circle cx="20" cy="20" r="16"/><path d="M16 14h8a4 4 0 0 1 0 8h-8M16 22h8a4 4 0 0 1 0 8h-8M20 10v4M20 26v4"/></svg>);
const PhoneIcon = () => (<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"><rect x="10" y="2" width="20" height="36" rx="4"/><line x1="18" y1="32" x2="22" y2="32"/></svg>);

export default function HostedPaymentPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Technology · Hosted Payment" title="Checkout, handled." subtitle="Let CascadX host your payment page — reduce PCI scope, keep your brand, and get analytics out of the box." />

      <PageSection variant="feature" kicker="Overview" icon={<PaintIcon />} title="Your brand. Our infrastructure.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">CascadX hosted payment pages look like yours — custom colors, fonts, logo — but run on our PCI-compliant infrastructure. Zero card data touches your servers.</p>
      </PageSection>

      <PageSection variant="split" kicker="PCI Scope" title="Customization without compliance headache." alt>
        <p className="text-ink-soft leading-relaxed">By redirecting to a CascadX-hosted page, your PCI scope drops from SAQ D to SAQ A — the simplest tier. You save months of compliance work while maintaining full design control.</p>
      </PageSection>

      <PageSection variant="showcase" kicker="Features" title="Every checkout, optimized.">
        <ShowcaseCard icon={<PaintIcon />} title="Brand-aware theming" description="Match your hosted page to your site — colors, typography, logo, and language. White-label by default." />
        <ShowcaseCard icon={<CurrencyIcon />} title="Multi-currency" description="Accept 135+ currencies with automatic conversion. Display prices in the customer's local currency." />
        <ShowcaseCard icon={<PhoneIcon />} title="Mobile-optimized" description="Responsive from the ground up. Apple Pay and Google Pay enabled with a single toggle." />
      </PageSection>

      <PageSection variant="split" kicker="Analytics" title="Analytics built in." alt reverse>
        <p className="text-ink-soft leading-relaxed">Every hosted payment page comes with built-in analytics: conversion funnel, drop-off points, approval rates by method, and A/B testing. No third-party scripts needed.</p>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
