import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PageSection, { ShowcaseCard } from "@/components/PageSection";

export const metadata: Metadata = {
  title: "Who We Are — CascadX",
  description: "CascadX was built by payment operators who watched approval rates drop because the tools weren't fast enough. Meet the team behind AI-powered cascading.",
  alternates: { canonical: "/about" },
};

const MissionIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="12" /><circle cx="24" cy="24" r="4" fill="#d97757" stroke="none" />
  </svg>
);
const TransparencyIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round">
    <rect x="4" y="4" width="32" height="32" rx="6" /><path d="M12 20h16M20 12v16" />
  </svg>
);
const IntelligenceIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="20" cy="16" r="8" /><path d="M8 36c0-6.6 5.4-12 12-12s12 5.4 12 12" /><circle cx="20" cy="16" r="3" fill="#d97757" stroke="none" />
  </svg>
);
const GlobalIcon = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="20" cy="20" r="16" /><ellipse cx="20" cy="20" rx="8" ry="16" /><path d="M4 20h32M6 12h28M6 28h28" />
  </svg>
);

const milestones = [
  { year: "2024", event: "Founded by a team of payments operators and ML engineers." },
  { year: "2024", event: "First AI Copilot prototype — natural language queries on live payment data." },
  { year: "2025", event: "Cascading Engine v1 — real-time failover across multi-PSP stacks." },
  { year: "2025", event: "Signals & Forecasting — predictive anomaly detection across 30+ dimensions." },
  { year: "2026", event: "Limited early access. 1,000+ PSPs connected. Open for pilots." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="About Us · Who We Are"
        title="Payments built by operators, for operators."
        subtitle="We spent years watching approval rates drop because the tools weren't fast enough, smart enough, or connected enough. So we built the platform we wished we had."
        robotVariant="waving"
        robotSize={80}
      />

      {/* Mission */}
      <PageSection variant="feature" kicker="Our Mission" icon={<MissionIcon />} title="Turn every decline into a decision.">
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto">
          Every declined transaction is a question the system should have answered differently. CascadX exists to ensure that
          when a provider says no, there&apos;s always a smarter path to yes — chosen in milliseconds, by an AI that
          never stops learning from your data.
        </p>
      </PageSection>

      {/* Story */}
      <PageSection variant="split" kicker="Our Story" title="Payments are too complex for static rules." alt>
        <div className="space-y-5 text-ink-soft leading-relaxed">
          <p>
            Every PSP behaves differently depending on the card, the country, the issuer, the time of day.
            Static routing rules can&apos;t keep up. By the time your team spots a decline spike, you&apos;ve
            already lost revenue.
          </p>
          <p>
            CascadX was born from a simple idea: what if an AI could watch your entire payment surface in real
            time, predict where approvals are about to drop, and reroute transactions before the damage is done?
          </p>
          <div className="mt-8 space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-5 py-4 border-t border-line">
                <span className="font-mono text-sm text-accent-deep font-medium shrink-0 w-12">{m.year}</span>
                <p className="m-0 text-sm text-ink-soft leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Values */}
      <PageSection variant="showcase" kicker="What We Believe" title={<>Principles that shape <em className="not-italic font-[700] text-accent-deep">every</em> decision.</>}>
        <ShowcaseCard icon={<TransparencyIcon />} title="Transparency by default" description="Every routing decision is logged, explained, and auditable. No black boxes. No surprises." />
        <ShowcaseCard icon={<IntelligenceIcon />} title="AI with guardrails" description="Our models recommend and draft. Your team approves and executes. Human oversight is built into every action." />
        <ShowcaseCard icon={<GlobalIcon />} title="Global from day one" description="1,000+ PSPs across every geography. From Stripe to Alipay, from Klarna to PIX — one API, infinite reach." />
      </PageSection>

      {/* Team */}
      <PageSection variant="feature" kicker="The Team" title="Operators who build." alt>
        <p className="text-ink-soft leading-relaxed max-w-[600px] mx-auto mb-12">
          We&apos;re a team of payment operators, ML engineers, and product thinkers who&apos;ve spent decades inside
          the payment stack. We know the pain because we&apos;ve lived it.
        </p>
        {/* TODO: replace gradient avatars with real team photos when available */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[900px] mx-auto">
          {([
            { name: "Daniel Reyes", initials: "DR", role: "Founder & CEO", bio: "15 years in payment operations across LATAM and Europe.", gradient: "from-accent to-accent-deep" },
            { name: "Anya Volkov", initials: "AV", role: "Chief Technology Officer", bio: "Ex-Adyen. Built routing engines processing $2B+ monthly.", gradient: "from-[#8b5cf6] to-[#5944c9]" },
            { name: "Marcus Chen", initials: "MC", role: "VP of Engineering", bio: "Distributed systems at scale. Previously Stripe and Cloudflare.", gradient: "from-[#f97066] to-[#d44a1f]" },
            { name: "Sofia Almeida", initials: "SA", role: "Head of AI & Data", bio: "ML researcher turned payments operator. PhD in reinforcement learning.", gradient: "from-[#f59e0b] to-[#c98e00]" },
            { name: "Tomás Becker", initials: "TB", role: "Head of Partnerships", bio: "Built PSP networks across 40+ markets. Speaks five languages.", gradient: "from-[#4e9eff] to-[#2980d4]" },
            { name: "Lila Okonkwo", initials: "LO", role: "Head of Customer Success", bio: "Scaled support orgs at two fintech unicorns. Operator-first mindset.", gradient: "from-[#4ade80] to-[#16a34a]" },
          ]).map((member) => (
            <div key={member.name} className="bg-surface-el border border-line rounded-[var(--radius-lg)] p-6 text-center shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_20px_40px_-20px_rgba(0,0,0,0.3)] transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_24px_48px_-16px_rgba(0,0,0,0.4)]">
              {/* Avatar with gradient + initials + terracotta ring */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-[-3px] rounded-full border border-accent/30 transition-all duration-250 group-hover:border-accent/60" />
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                  <span className="font-display font-[700] text-[28px] text-white leading-none">{member.initials}</span>
                </div>
              </div>
              <div className="font-display font-[600] text-base mb-0.5">{member.name}</div>
              <div className="font-mono text-[11px] text-accent-deep uppercase tracking-[0.06em] mb-3">{member.role}</div>
              <p className="text-sm text-ink-muted leading-relaxed m-0">{member.bio}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA />
      <Footer />
    </>
  );
}
