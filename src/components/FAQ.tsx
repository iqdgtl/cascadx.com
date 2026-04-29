"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-line transition-colors ${isOpen ? "border-l-2 border-l-accent pl-5" : "pl-0"}`}>
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-display font-[600] text-[17px] tracking-[-0.01em] pr-4 transition-colors ${isOpen ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}>
          {item.question}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-ink-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-ink-soft text-[15px] leading-relaxed pb-6 pr-10">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ kicker, title, items }: { kicker: string; title: React.ReactNode; items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative z-[2] py-[100px] px-7">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center gap-3 font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent-deep mb-[18px]">
          <span className="w-7 h-px bg-accent" />{kicker}
        </div>
        <h2 className="font-display font-[700] text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-[-0.03em] mb-10">{title}</h2>
        <div>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
