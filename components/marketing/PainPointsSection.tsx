import { HelpCircle, ShuffleIcon, Hourglass, MessageSquareOff } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: HelpCircle,
    title: "\u201cDiscover your purpose\u201d isn\u2019t instructions.",
    desc: "Every app and sermon tells you to find your purpose. Almost none tell you how so you're left staring at the question with no process to actually answer it.",
  },
  {
    icon: ShuffleIcon,
    title: "You've journaled before. You never went back.",
    desc: "Notes apps and old notebooks are full of moments that mattered scattered, unread, disconnected from each other. The patterns are in there. Nobody's looking for them.",
  },
  {
    icon: MessageSquareOff,
    title: "Generic advice doesn't know your story.",
    desc: "Self-help content is written for everyone, which means it's really written for no one. It can't reference the thing you wrote about six weeks ago that actually explains what you're feeling now.",
  },
  {
    icon: Hourglass,
    title: "Insight fades before you act on it.",
    desc: "A breakthrough moment in a journal entry or a conversation is easy to feel and easy to lose. Without something tracking it over time, most of it never turns into a clearer sense of direction.",
  },
];

export function PainPointsSection() {
  return (
    <section
      className="mt-10 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border-subtle px-8 py-20 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image/pain-points.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/50 to-white/65" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-3xl font-medium text-brand-600">The Pain Points</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Purpose doesn&apos;t announce itself. It has to be noticed.
        </h2>
        <p className="mt-4 text-base text-slate-900">
          Most people aren&apos;t missing purpose they&apos;re missing a way to see the pattern
          in what they&apos;ve already lived and written.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PAIN_POINTS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border-subtle bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
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
