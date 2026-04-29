import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms and Conditions — CascadX",
  description: "CascadX terms and conditions governing the use of our AI payment cascading platform.",
  alternates: { canonical: "/terms" },
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms", content: "By accessing or using CascadX services, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use our services." },
  { id: "services", title: "2. Description of Services", content: "CascadX provides an AI-powered payment cascading and orchestration platform. The service routes payment transactions across multiple payment service providers to optimize approval rates." },
  { id: "accounts", title: "3. Account Registration", content: "To use CascadX, you must register for an account and provide accurate information. You are responsible for maintaining the security of your account credentials." },
  { id: "payment", title: "4. Payment Terms", content: "Fees for CascadX services are as described in your service agreement. All fees are non-refundable unless otherwise stated. We reserve the right to modify pricing with 30 days notice." },
  { id: "data", title: "5. Data Processing", content: "CascadX processes payment transaction data as a data processor on your behalf. We handle all data in accordance with our Privacy Policy and applicable data protection regulations including GDPR." },
  { id: "liability", title: "6. Limitation of Liability", content: "CascadX shall not be liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the fees paid in the preceding 12 months." },
  { id: "termination", title: "7. Termination", content: "Either party may terminate the agreement with 30 days written notice. Upon termination, you retain access to your data for 90 days. CascadX may terminate immediately for material breach." },
  { id: "governing", title: "8. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales." },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <PageHero eyebrow="Terms" title="Terms and Conditions" subtitle="Last updated: April 2026. Please read these terms carefully before using CascadX." />

      <section className="relative z-[2] py-[80px] px-7">
        <div className="max-w-[var(--max)] mx-auto flex gap-16">
          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block w-[220px] shrink-0">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-4">On this page</div>
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="text-sm text-ink-muted hover:text-ink transition-colors leading-snug">
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
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
