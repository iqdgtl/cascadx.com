import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Kicker from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Contact Us — CascadX",
  description: "Get in touch with the CascadX team. We respond to every inquiry within 24 hours.",
  alternates: { canonical: "/contact" },
};

const contactInfo = [
  { label: "Email", value: "hello@cascadx.com" },
  { label: "Response time", value: "< 24 hours" },
  { label: "Location", value: "Limassol & Hong Kong" },
];

export default function ContactPage() {
  return (
    <>
      <Nav />

      <section className="relative z-[2] pt-24 pb-[140px] px-7">
        <div className="max-w-[var(--max)] mx-auto">
          <Kicker>Contact</Kicker>
          <h1 className="font-display font-[800] text-[clamp(40px,5vw,72px)] leading-[1] tracking-[-0.04em] max-w-[700px] mb-6">
            Let&apos;s talk <em className="not-italic font-[800] text-accent-deep">payments</em>.
          </h1>
          <p className="text-lg text-ink-soft max-w-[520px] mb-16 leading-relaxed">
            Whether you want a demo, have a technical question, or want to explore a pilot — we&apos;d love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            {/* Form */}
            <form className="bg-surface-el rounded-[var(--radius-lg)] border border-line p-8 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-40px_rgba(0,0,0,0.4)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-line bg-white/[0.04] text-ink font-sans text-sm outline-none focus:border-accent transition-colors placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-[var(--radius)] border border-line bg-white/[0.04] text-ink font-sans text-sm outline-none focus:border-accent transition-colors placeholder:text-ink-muted"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Your company"
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-line bg-white/[0.04] text-ink font-sans text-sm outline-none focus:border-accent transition-colors placeholder:text-ink-muted"
                />
              </div>
              <div className="mb-6">
                <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your payment stack and what you're looking for…"
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-line bg-white/[0.04] text-ink font-sans text-sm outline-none focus:border-accent transition-colors placeholder:text-ink-muted resize-y"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-[10px] px-6 py-[15px] bg-accent text-[#0d0f0e] rounded-full text-[15px] font-semibold transition-all duration-250 hover:bg-accent-deep hover:text-[#0d0f0e] hover:-translate-y-0.5 shadow-[0_6px_30px_-10px_rgba(217,119,87,0.5)] hover:shadow-[0_14px_40px_-10px_rgba(217,119,87,0.55)]"
              >
                Send message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            {/* Sidebar */}
            <div>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="pt-5 border-t border-line-strong">
                    <span className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted mb-1.5">
                      {item.label}
                    </span>
                    <span className="font-display font-[700] text-xl tracking-[-0.02em]">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-[var(--radius-lg)] bg-surface border border-line">
                <h4 className="font-display font-[700] text-lg mb-2 tracking-[-0.02em]">Prefer a live demo?</h4>
                <p className="text-sm text-ink-soft leading-relaxed m-0">
                  We&apos;ll connect CascadX to your real corridors and show you the AI in action.
                  Thirty minutes, zero commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
