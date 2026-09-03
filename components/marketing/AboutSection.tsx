import { BookOpen, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

const VALUES = [
  {
    icon: BookOpen,
    title: "Grounded in your own words",
    desc: "Every insight BOWO surfaces traces back to something you actually wrote never a guess, never a prediction dressed up as fact.",
  },
  {
    icon: Compass,
    title: "Reflective, not prophetic",
    desc: "BOWO notices patterns in your journey. It doesn't tell you what your future holds or speak for God that's not its place.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your journal is yours. It's encrypted, never sold, and never used to train anything beyond your own reflection.",
  },
  {
    icon: HeartHandshake,
    title: "Built for the long walk",
    desc: "Purpose isn't discovered in one sitting. BOWO is designed for years of small, honest entries, not a single dramatic answer.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-brand-50 relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl border border-border-subtle px-8 py-20 lg:px-16">
      <div className="relative mx-auto max-w-2xl text-center">
        <h4 className="text-3xl font-bold text-brand-500">About BOWO</h4>
        <h2 className="mt-3 text-2xl font-medium leading-tight text-slate-900 sm:text-2xl">
          We built BOWO because most people don&apos;t lack purpose they lack a record of it.
        </h2>
        <p className="mt-5 mb-8 text-base text-muted">
          The moments that reveal who you are rarely announce themselves. They show up in an
          offhand journal entry, a repeated frustration, a thing you keep coming back to. Written
          down and looked at together, they start to form a picture. BOWO exists to help you see
          that picture as it forms not to hand you a verdict about who you are.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-border-subtle p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <Icon size={18} />
            </div>
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
