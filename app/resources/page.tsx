import { MarketingHeader } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MarketingHeader />
        
        <div className="mx-auto max-w-5xl mt-1 px-8 bg-brand-50 lg:px-16 shadow-lg p-5">
          <h2 className="mb-1 text-center text-4xl font-bold text-brand-500">Resources</h2>
          <p className="mb-6 text-center text-sm text-muted">
            Coming soon!
          </p>
        </div>

        <Footer />
      </div>  
  );
}
