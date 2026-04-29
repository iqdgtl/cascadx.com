import Link from "next/link";
import Logo from "./ui/Logo";

/* ================================================================
   Trust/Security Badges — monochrome SVGs for dark footer
   ================================================================ */
const trustBadges = [
  {
    label: "PCI DSS",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8">
        <path d="M16 2 L6 7 v8 c0 7 4.2 11.5 10 14 5.8-2.5 10-7 10-14V7z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <text x="16" y="19" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif">PCI</text>
      </svg>
    ),
  },
  {
    label: "Verified by Visa",
    icon: (
      <svg viewBox="0 0 40 28" fill="none" className="h-8">
        <text x="20" y="14" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif">VISA</text>
        <path d="M14 20l3 3.5 7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    label: "Mastercard SecureCode",
    icon: (
      <svg viewBox="0 0 40 28" fill="none" className="h-8">
        <circle cx="15" cy="12" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="25" cy="12" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M14 22l3 3.5 7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    label: "SSL Secured",
    icon: (
      <svg viewBox="0 0 28 32" fill="none" className="h-8">
        <rect x="4" y="14" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M8 14v-4a6 6 0 1 1 12 0v4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="21.5" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "3D Secure",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8">
        <path d="M16 2 L6 7 v8 c0 7 4.2 11.5 10 14 5.8-2.5 10-7 10-14V7z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <text x="16" y="19" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif">3DS</text>
      </svg>
    ),
  },
  {
    label: "GDPR Ready",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8">
        <circle cx="16" cy="14" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M16 4v3M16 21v3M6 14h3M23 14h3" stroke="currentColor" strokeWidth="0.8" />
        <text x="16" y="30" textAnchor="middle" fill="currentColor" fontSize="5.5" fontWeight="700" fontFamily="Inter, sans-serif">GDPR</text>
      </svg>
    ),
  },
];

/* ================================================================
   Social Icons — inline SVGs
   ================================================================ */
const socials = [
  {
    label: "CascadX on Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "CascadX on Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "CascadX on X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "CascadX on LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] bg-[#050606] text-white/60 border-t border-line">
      {/* Logo + copyright */}
      <div className="px-7 pt-12 pb-6">
        <div className="max-w-[var(--max)] mx-auto flex flex-col md:flex-row justify-between items-center gap-5 font-mono text-xs tracking-[0.04em]">
          <Link href="/" className="text-white">
            <Logo className="text-[18px]" dotSize={5} />
          </Link>
          <span>&copy; 2026 CascadX · AI Payment Orchestration</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-7">
        <div className="max-w-[var(--max)] mx-auto border-t border-white/[0.08]" />
      </div>

      {/* Bottom row: trust badges left, social icons right */}
      <div className="px-7 py-8 pb-10">
        <div className="max-w-[var(--max)] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Trust/security badges — left */}
          <div className="flex flex-wrap items-center gap-3">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                title={badge.label}
                className="text-white/80 hover:text-white transition-all duration-250 cursor-default"
              >
                {badge.icon}
              </span>
            ))}
          </div>

          {/* Social icons — right */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-white/50 hover:text-accent transition-all duration-250 hover:scale-110 [&_svg]:w-[22px] [&_svg]:h-[22px]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
