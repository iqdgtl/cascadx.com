"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

type CookieCategory = { id: string; name: string; description: string; required: boolean };

const categories: CookieCategory[] = [
  { id: "essential", name: "Essential", description: "Required for the platform to function. Authentication, security, and session management.", required: true },
  { id: "analytics", name: "Analytics", description: "Help us understand how visitors interact with CascadX. Used to improve the platform experience.", required: false },
  { id: "marketing", name: "Marketing", description: "Used to deliver relevant content and measure campaign effectiveness.", required: false },
  { id: "preferences", name: "Preferences", description: "Remember your settings and personalization choices across sessions.", required: false },
];

const cookieTable = [
  { name: "_cx_session", category: "Essential", purpose: "Session management", duration: "Session" },
  { name: "_cx_auth", category: "Essential", purpose: "Authentication token", duration: "7 days" },
  { name: "_cx_csrf", category: "Essential", purpose: "CSRF protection", duration: "Session" },
  { name: "_cx_analytics", category: "Analytics", purpose: "Usage analytics", duration: "1 year" },
  { name: "_cx_perf", category: "Analytics", purpose: "Performance monitoring", duration: "30 days" },
  { name: "_cx_campaign", category: "Marketing", purpose: "Campaign attribution", duration: "90 days" },
  { name: "_cx_prefs", category: "Preferences", purpose: "UI preferences", duration: "1 year" },
];

function Toggle({ on, disabled, onToggle }: { on: boolean; disabled?: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={disabled ? undefined : onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? "bg-accent" : "bg-surface"} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      aria-pressed={on}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-200 ${on ? "translate-x-5 bg-[#0d0f0e]" : "translate-x-0 bg-ink-muted"}`} />
    </button>
  );
}

export default function CookiesPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const toggle = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Nav />
      <PageHero eyebrow="Terms · Cookies" title="Cookie preferences" subtitle="Manage how CascadX uses cookies on your browser." />

      <section className="relative z-[2] py-[80px] px-7">
        <div className="max-w-[720px] mx-auto">
          {/* Toggle cards */}
          <div className="space-y-4 mb-12">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-surface-el border border-line rounded-[var(--radius)] p-5 flex items-start justify-between gap-6">
                <div>
                  <div className="font-display font-[600] text-base mb-1">{cat.name}</div>
                  <p className="text-sm text-ink-soft leading-relaxed m-0">{cat.description}</p>
                  {cat.required && <span className="font-mono text-[10px] text-ink-muted uppercase tracking-[0.08em] mt-2 inline-block">Always active</span>}
                </div>
                <Toggle on={settings[cat.id]} disabled={cat.required} onToggle={() => toggle(cat.id)} />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-16">
            <button onClick={() => setSettings({ essential: true, analytics: true, marketing: true, preferences: true })} className="px-5 py-3 bg-accent text-[#0d0f0e] rounded-full text-sm font-semibold transition-all hover:bg-accent-deep hover:-translate-y-0.5">
              Accept all
            </button>
            <button onClick={() => setSettings({ essential: true, analytics: false, marketing: false, preferences: false })} className="px-5 py-3 border border-line-strong bg-white/[0.04] text-ink rounded-full text-sm font-semibold transition-all hover:border-accent">
              Reject non-essential
            </button>
            <button className="px-5 py-3 border border-line-strong bg-white/[0.04] text-ink rounded-full text-sm font-semibold transition-all hover:border-accent">
              Save preferences
            </button>
          </div>

          {/* Cookie table */}
          <h3 className="font-display font-[700] text-lg mb-4">Cookies we use</h3>
          <div className="bg-surface-el border border-line rounded-[var(--radius-lg)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">Cookie</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">Category</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">Purpose</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">Duration</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((c) => (
                  <tr key={c.name} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-accent">{c.name}</td>
                    <td className="px-5 py-3 text-ink-soft">{c.category}</td>
                    <td className="px-5 py-3 text-ink-soft">{c.purpose}</td>
                    <td className="px-5 py-3 text-ink-muted">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
