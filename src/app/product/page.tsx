import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import SectionHead from "@/components/ui/SectionHead";
import Kicker from "@/components/ui/Kicker";

const copilotFeatures = [
  {
    title: "Natural language queries",
    desc: "Ask 'Why is approval down in Germany?' and get a structured answer with data, root cause, and a suggested fix.",
  },
  {
    title: "One-click rule drafts",
    desc: "The Copilot writes routing changes for you. Your team reviews and approves — CascadX executes instantly.",
  },
  {
    title: "Transaction explainer",
    desc: "Point at any transaction. The AI tells you what happened, why, and what to do — in one sentence.",
  },
  {
    title: "Trained on your data",
    desc: "The model sees your routing rules, PSP performance, issuer behaviour, and live flow. Not generic — yours.",
  },
];

const signalsFeatures = [
  {
    title: "Multi-dimensional anomaly detection",
    desc: "Monitors PSP, BIN, issuer, country, device, merchant, currency, and 3DS simultaneously.",
  },
  {
    title: "Predictive forecasting",
    desc: "Flags approval rate drops hours before they materialise. Gives you time to act, not react.",
  },
  {
    title: "Prescriptive alerts",
    desc: "Every alert comes with a recommended action — not just a number. Reroute, add a PSP, adjust 3DS rules.",
  },
  {
    title: "< 3 second detection",
    desc: "From the moment a pattern bends to the moment you see an alert — under three seconds.",
  },
];

const cascadingFeatures = [
  {
    title: "Cost-aware routing",
    desc: "Optimise for approval, cost, or both — per country, per PSP, per card type.",
  },
  {
    title: "3DS cascading",
    desc: "Skip challenges where allowed by regulation, fall back cleanly when required.",
  },
  {
    title: "BIN-level intelligence",
    desc: "Route specific issuer ranges to the providers that convert them best, based on real data.",
  },
  {
    title: "Continuous learning",
    desc: "The engine adjusts routing weights daily from your actual approval data. No manual tuning.",
  },
  {
    title: "Fail-safe architecture",
    desc: "If a PSP goes down, traffic cascades in milliseconds. Your customers never notice.",
  },
  {
    title: "Full audit trail",
    desc: "Every routing decision is logged with the reason, the alternatives considered, and the outcome.",
  },
];

function FeatureGrid({ features }: { features: { title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {features.map((f) => (
        <div key={f.title} className="pt-6 border-t border-line-strong">
          <h4 className="m-0 mb-2.5 font-display font-[700] text-lg tracking-[-0.02em]">{f.title}</h4>
          <p className="m-0 text-sm text-ink-soft leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative z-[2] pt-24 pb-16 px-7">
        <div className="max-w-[var(--max)] mx-auto">
          <Kicker>Product</Kicker>
          <h1 className="font-display font-[800] text-[clamp(40px,5vw,72px)] leading-[1] tracking-[-0.04em] max-w-[800px]">
            Three systems. One <em className="not-italic font-[800] text-accent-deep">intelligent</em> platform.
          </h1>
          <p className="text-lg text-ink-soft max-w-[600px] mt-6 leading-relaxed">
            CascadX combines an AI Copilot, real-time Signals, and a Cascading Engine into a single
            orchestration layer that sits between your checkout and your PSPs.
          </p>
        </div>
      </section>

      {/* AI Copilot */}
      <section className="relative z-[2] py-[100px] px-7 border-t border-line">
        <div className="max-w-[var(--max)] mx-auto">
          <SectionHead
            kicker="01 · AI Copilot"
            title={
              <>
                A payments analyst that <em className="not-italic font-[800] text-accent-deep">never sleeps</em>.
              </>
            }
            lede="Ask any question. Get data, root causes, and recommended actions — in plain language."
          />
          <FeatureGrid features={copilotFeatures} />
        </div>
      </section>

      {/* Signals */}
      <section className="relative z-[2] py-[100px] px-7 bg-bg-alt border-t border-b border-line">
        <div className="max-w-[var(--max)] mx-auto">
          <SectionHead
            kicker="02 · Signals & Forecasting"
            title={
              <>
                See a decline <em className="not-italic font-[800] text-accent-deep">before</em> it becomes a trend.
              </>
            }
            lede="Real-time anomaly detection across 30+ dimensions with predictive forecasting."
          />
          <FeatureGrid features={signalsFeatures} />
        </div>
      </section>

      {/* Cascading Engine */}
      <section className="relative z-[2] py-[100px] px-7">
        <div className="max-w-[var(--max)] mx-auto">
          <SectionHead
            kicker="03 · Cascading Engine"
            title={
              <>
                One transaction. <em className="not-italic font-[800] text-accent-deep">Many</em> paths to yes.
              </>
            }
            lede="Intelligent, cost-aware, real-time routing that recovers revenue your current stack leaves on the table."
          />
          <FeatureGrid features={cascadingFeatures} />
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
