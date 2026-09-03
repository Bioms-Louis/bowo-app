import { Hero } from "@/components/marketing/Hero";
import { FeatureStrip } from "@/components/marketing/FeatureStrip";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MarketingHeader } from "@/components/marketing/Header";
import { AboutSection } from "@/components/marketing/AboutSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { PainPointsSection } from "@/components/marketing/PainPointsSection";
import { PurposeBlueprintSection } from "@/components/marketing/PurposeBlueprintSection";
import { AICompanionSection } from "@/components/marketing/AICompanionSection";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MarketingHeader />
      <Hero />
      <FeatureStrip />
      <PainPointsSection />
      <HowItWorksSection />
      <PurposeBlueprintSection />
      <AICompanionSection />
      <AboutSection />

      <section id="contact" className="rounded-4xl mx-auto max-w-5xl mt-1 mb-10 px-8 bg-brand-50/60 shadow-lg lg:px-16 p-15">
        <h2 className="mb-1 -mt-10 text-center text-4xl font-bold text-brand-500">Get in touch</h2>
        <p className="mb-6 text-center text-sm text-muted">
          Questions about BOWO? Send us a message.
        </p>
        <ContactForm />
      </section>

    </div>
  );
}
