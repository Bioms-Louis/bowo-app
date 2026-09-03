import { User, Flag, Sparkles as Gift, Heart, ShieldCheck } from "lucide-react";

const QUADRANTS = [
  { icon: User, label: "Who You Are" },
  { icon: Flag, label: "What Drives You" },
  { icon: Gift, label: "Your Strengths" },
  { icon: Heart, label: "Your Impact" },
];

export function PurposeBlueprintSection() {
  return (
    <section id="blueprint" className="mx-auto  bg-brand-50 rounded-2xl border border-border-subtle shadow-lg max-w-6xl px-8 py-20 lg:px-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-3x1 font-medium text-brand-600">Purpose Blueprint</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            One evolving picture, built from everything you&apos;ve written.
          </h2>
          <p className="mt-4 text-base text-muted">
            Your Purpose Blueprint isn&apos;t a personality quiz result you get once and forget. It&apos;s
            a living summary your identity, your strengths, your growth areas, and what
            you&apos;re currently focused on that updates as your journal grows.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Four core areas: who you are, what drives you, your strengths, your impact",
              "Recurring themes and growth areas surfaced from your own entries",
              "A maturity score that reflects how much of your journey you've recorded",
              "Every section backed by evidence you can actually inspect",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stylized preview — not a live data view, just a visual echo
            of the actual /blueprint page so visitors know what they're
            signing up for. */}
        <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Your Purpose Blueprint</p>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
              Dynamic
            </span>
          </div>

          <div className="mb-5 rounded-xl bg-brand-500 p-5 text-center">
            <p className="text-sm font-medium text-white/90">
              &ldquo;To influence lives and build solutions that create meaningful impact.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {QUADRANTS.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-xl border border-border-subtle p-3">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                  <Icon size={14} />
                </div>
                <p className="text-xs font-medium text-slate-700">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
            <p className="text-xs text-muted">Blueprint Maturity</p>
            <p className="text-sm font-semibold text-brand-600">72%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
