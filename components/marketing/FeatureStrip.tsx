import { BookOpen, Sparkles, ShieldCheck, Layers, MessageCircle } from "lucide-react";

const FEATURES = [
  { icon: MessageCircle, title: "AI Companion", desc: "Chat anytime for guidance, clarity and encouragement." },
  { icon: BookOpen, title: "Journal Your Journey", desc: "Capture your thoughts, experiences and lessons." },
  { icon: Sparkles, title: "AI-Powered Insights", desc: "Get personalized insights from your unique story." },
  { icon: ShieldCheck, title: "Evidence-Based", desc: "Every insight is backed by your own journey." },
  { icon: Layers, title: "Purpose Blueprint", desc: "See the bigger picture of your life's purpose." },
];

export function FeatureStrip() {
  return (
    <section id="features" className="relative z-10 mx-auto mt-10 max-w-6xl px-8 lg:px-16">
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border-subtle bg-brand-50 p-8 shadow-lg sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-500">
              <Icon size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-xs text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
