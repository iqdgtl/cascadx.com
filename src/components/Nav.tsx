"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Logo from "./ui/Logo";

/* ================================================================ */
type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { label: "About Us", items: [
    { label: "Who we are", href: "/about" },
    { label: "Contact us", href: "/contact" },
  ]},
  { label: "Our Solutions", items: [
    { label: "E-Commerce", href: "/solutions/ecommerce" },
    { label: "iGaming", href: "/solutions/igaming" },
    { label: "Dating", href: "/solutions/dating" },
  ]},
  { label: "Technology", items: [
    { label: "AI Routing", href: "/technology/ai-routing" },
    { label: "Integration", href: "/technology/integration" },
    { label: "Hosted Payment", href: "/technology/hosted-payment" },
  ]},
  { label: "Terms", items: [
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Settings", href: "/cookies" },
  ]},
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ================================================================
   Desktop dropdown
   ================================================================ */
function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();
  const isGroupActive = group.items.some((item) => pathname === item.href);

  return (
    <div className="relative" onMouseEnter={() => { clearTimeout(closeTimer.current); setOpen(true); }} onMouseLeave={() => { closeTimer.current = setTimeout(() => setOpen(false), 200); }}>
      <button
        className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${isGroupActive ? "text-ink" : "text-ink-soft hover:text-ink"}`}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((p) => !p); } }}
        aria-expanded={open} aria-haspopup="true"
      >
        {group.label}
        <Chevron open={open} />
        {isGroupActive && <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />}
      </button>
      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="min-w-[220px] p-[10px] bg-surface-el border border-[rgba(255,255,255,0.10)] rounded-[var(--radius)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)_inset]">
          {group.items.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isCurrent ? "bg-[rgba(217,119,87,0.05)] text-ink border-l-2 border-accent pl-3" : "text-ink-soft hover:text-ink hover:bg-white/[0.06]"}`}>
                {!isCurrent && <span className="w-0 group-hover:w-1 h-1 rounded-full bg-accent transition-all duration-200 shrink-0" />}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Nav — main export
   ================================================================ */
export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-[14px] bg-[rgba(13,15,14,0.8)] border-b border-line">
        <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-ink">
            <Logo className="text-[20px] md:text-[22px]" dotSize={6} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navGroups.map((group) => (
              <DesktopDropdown key={group.label} group={group} />
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-[10px] bg-accent text-[#0d0f0e] rounded-full text-[13px] font-semibold shadow-[0_6px_30px_-10px_rgba(217,119,87,0.5)] transition-all duration-250 ease-out hover:bg-accent-deep hover:-translate-y-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0f0e]" />
              Contact us
            </Link>

            {/* Mobile CTA — compact pill */}
            <Link href="/contact"
              className="lg:hidden inline-flex items-center px-3.5 py-1.5 bg-accent text-[#0d0f0e] rounded-full text-[12px] font-semibold h-8">
              Contact us
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — rendered OUTSIDE the nav, at z-[100] */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(13,15,14,0.97)] backdrop-blur-[20px] overflow-y-auto lg:hidden"
          style={{ animation: "msgIn 0.28s ease forwards" }}
        >
          {/* Close button */}
          <div className="flex justify-end px-5 pt-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu content */}
          <div className="px-8 py-6">
            {navGroups.map((group, gi) => (
              <div
                key={group.label}
                className="border-b border-line opacity-0 translate-y-2"
                style={{ animation: `msgIn 0.3s ease ${gi * 80}ms forwards` }}
              >
                <button
                  className="flex items-center justify-between w-full py-5 text-left text-accent font-display font-[700] text-[22px] tracking-[-0.02em]"
                  onClick={() => setExpandedGroup(expandedGroup === group.label ? null : group.label)}
                >
                  {group.label}
                  <Chevron open={expandedGroup === group.label} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: expandedGroup === group.label ? "400px" : "0", opacity: expandedGroup === group.label ? 1 : 0 }}
                >
                  <div className="pb-5 pl-2 flex flex-col">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`py-3.5 px-3 rounded-lg text-[17px] min-h-[44px] flex items-center ${
                          pathname === item.href ? "text-accent font-medium" : "text-ink-soft active:text-ink"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-4 bg-accent text-[#0d0f0e] rounded-full text-[16px] font-semibold active:bg-accent-deep"
                onClick={() => setMobileOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
