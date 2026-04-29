import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — CascadX",
  description: "How CascadX collects, processes, and protects your data. GDPR-compliant privacy policy for our AI payment cascading platform.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  { id: "overview", title: "1. Overview", content: "CascadX is committed to protecting your privacy. This policy explains how we collect, use, and safeguard personal data when you use our payment cascading platform." },
  { id: "collection", title: "2. Data We Collect", content: "We collect transaction data (amounts, currencies, card BIN ranges), account information (name, email, company), and usage analytics. We never store full card numbers — these are handled by PCI-compliant PSP partners." },
  { id: "usage", title: "3. How We Use Your Data", content: "Transaction data is used to train our AI routing models and improve approval rates. Account data is used for service delivery and communication. Analytics data helps us improve the platform." },
  { id: "sharing", title: "4. Data Sharing", content: "We share transaction data with PSP partners only as necessary to process payments. We do not sell personal data. We may share anonymized, aggregated data for industry benchmarking." },
  { id: "retention", title: "5. Data Retention", content: "Transaction data is retained for 24 months for model training, then anonymized. Account data is retained for the duration of your service agreement plus 12 months." },
  { id: "rights", title: "6. Your Rights (GDPR)", content: "You have the right to access, rectify, erase, and port your personal data. You may object to processing or request restriction. Contact privacy@cascadx.com to exercise any right." },
  { id: "security", title: "7. Security Measures", content: "We employ encryption at rest and in transit, SOC 2 Type II controls, regular penetration testing, and access controls based on the principle of least privilege." },
  { id: "contact", title: "8. Contact", content: "For privacy inquiries: privacy@cascadx.com. Data Protection Officer: dpo@cascadx.com." },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Terms · Privacy" title="Privacy Policy" subtitle="Last updated: April 2026. This policy describes how CascadX handles your data." />

      <section className="relative z-[2] py-[80px] px-7">
        <div className="max-w-[var(--max)] mx-auto flex gap-16">
          <aside className="hidden lg:block w-[220px] shrink-0">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-4">On this page</div>
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (<a key={s.id} href={`#${s.id}`} className="text-sm text-ink-muted hover:text-ink transition-colors leading-snug">{s.title}</a>))}
              </nav>
            </div>
          </aside>
          <div className="max-w-[720px] flex-1">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="mb-12 scroll-mt-24">
                <h2 className="font-display font-[700] text-xl tracking-[-0.02em] mb-4">{s.title}</h2>
                <p className="text-ink-soft leading-[1.7]">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
