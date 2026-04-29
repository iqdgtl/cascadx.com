import Script from "next/script";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AIChat from "@/components/AIChat";
import SignalsDashboard from "@/components/SignalsDashboard";
import CascadeEngine from "@/components/CascadeEngine";
import IntegrationsNetwork from "@/components/IntegrationsNetwork";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CascadX",
            url: "https://cascadx.com",
            description: "AI-powered payment cascading orchestration",
            sameAs: [
              "https://twitter.com/cascadx",
              "https://linkedin.com/company/cascadx",
              "https://instagram.com/cascadx",
            ],
          }),
        }}
      />
      <Nav />
      <Hero />
      <HowItWorks />
      <AIChat />
      <SignalsDashboard />
      <CascadeEngine />
      <IntegrationsNetwork />
      <CTA />
      <Footer />
    </>
  );
}
