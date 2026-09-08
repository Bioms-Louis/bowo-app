import { MarketingHeader } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <div className="mx-auto max-w-3xl px-8 py-16 lg:px-16">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">{children}</div>
      </div>

      <Footer />
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-slate-900">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
