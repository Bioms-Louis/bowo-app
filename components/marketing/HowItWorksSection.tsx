import { NotebookPen, Sparkles, ShieldCheck, Layers, MessageCircle } from "lucide-react";

const STEPS = [
  {
    icon: NotebookPen,
    title: "Write what actually happened",
    desc: "A reflection, a goal, a moment of gratitude, a lesson learned whatever's real today. No prompts to perform for, no right way to do it.",
  },
  {
    icon: Sparkles,
    title: "BOWO looks for what repeats",
    desc: "Across your entries, it looks for themes that show up more than once not from a single line, but from a pattern across several entries.",
  },
  {
    icon: ShieldCheck,
    title: "Every pattern comes with its receipts",
    desc: "Each insight links back to the specific entries that support it, so you can always trace an idea back to your own words and judge it yourself.",
  },
  {
    icon: Layers,
    title: "Your Blueprint takes shape",
    desc: "Strengths, values, growth areas, and current focus accumulate into a single evolving picture one that changes as you keep writing, not a one-time result.",
  },
  {
    icon: MessageCircle,
    title: "Talk it through, anytime",
    desc: "Your AI companion is there when you want to think out loud it already knows your recent entries and Blueprint, so you're not repeating yourself.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-12xl px-8 py-20 lg:px-16">
      <div className="text-center">
        <h4 className="text-3xl font-bold text-brand-500">How It Works</h4>
        <h2 className="mt-3 text-4xl font-medium text-slate-900 sm:text-4xl">
          From a single entry to a picture of your purpose.
        </h2>
        <p className="mt-4 mb-8 text-base text-muted">
          Nothing about this happens in one sitting. Here&apos;s what the process actually looks
          like, step by step.
        </p>
      </div>

      <ol className="relative space-y-10 pl-10 px-12 sm:pl-12 sm:px-8 lg:pl-16 lg:px-16">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="relative transition-all duration-200 ease-in-out hover:scale-[1.05] hover:shadow-lg hover:p-2 hover:border border-brand-200 hover:rounded-2xl hover:bg-brand-50 active:scale-95">
            <span className="absolute -left-[52px] flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white text-sm font-semibold text-brand-600">
              {i + 1}
            </span>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <Icon size={20} />
            </div>
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="mt-1 mb-4 max-w-lg text-sm text-muted">{desc}</p>
          </li>
        ))}
      </ol>

      <div className=" transition-all duration-200 ease-out hover:scale-[1.05] hover:shadow-lg hover:border border-brand-200 hover:rounded-2xl hover:bg-white active:scale-95 mt-10 rounded-2xl bg-brand-50 shadow-lg p-8">
        <h3 className="text-lg font-bold text-slate-900">What this isn&apos;t</h3>
        <p className="mt-3 text-sm text-muted">
          BOWO doesn&apos;t predict your future or tell you what you&apos;re destined for.
          Language like &ldquo;this appears to be a recurring theme&rdquo; or &ldquo;your
          reflections suggest&rdquo; is deliberate it reflects what&apos;s actually in your
          journal, not a claim about what comes next.
        </p>
      </div>
    </section>
  );
}
