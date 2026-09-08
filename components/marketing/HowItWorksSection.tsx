import { NotebookPen, Sparkles, ShieldCheck, Layers, UserCheck, Compass } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: NotebookPen,
    title: "Start with your story",
    subtitle: "Write what actually happened.",
    desc: [
      "A reflection. A decision. A goal. A difficult moment. Something you're grateful for. A lesson you learned. Whatever is real today.",
      "There are no right answers and no personality test to complete. You simply tell BOWO what happened.",
    ],
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Let BOWO read between the lines",
    subtitle: "Your story becomes the evidence.",
    desc: [
      "As your reflections accumulate, BOWO analyzes what you're sharing for recurring themes, values, motivations, strengths, experiences, behaviors, and areas of growth. Its analysis is guided by the BOWO Purpose Framework — a body of teachings and principles developed by Olajide Ajibowo over more than two decades, through his books, teachings, and understanding of purpose inspired by the Holy Spirit, with psychological analysis applied where relevant.",
    ],
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "See the patterns. Follow the evidence.",
    subtitle: "Every insight has a trail.",
    desc: [
      "When BOWO identifies a recurring pattern, you can see the reflections that contributed to it. Instead of simply telling you who you are, BOWO shows you why an insight emerged. You can revisit the evidence, reflect on it, question it, and decide whether it genuinely represents you. No black-box answers. No purpose manufactured from a single prompt.",
    ],
  },
  {
    number: "04",
    icon: Layers,
    title: "Watch your Purpose Blueprint emerge",
    subtitle: "A picture of purpose, built over time.",
    desc: [
      "As enough patterns emerge, BOWO begins bringing them together into your Purpose Blueprint. Your Blueprint can reveal connections between your:",
    ],
    list: [
      "Purpose",
      "Calling",
      "Assignment",
      "Destiny Warnings",
      "Talents",
      "Spiritual Gifts",
      "Biblical & Contemporary Tribes",
      "Encounters",
      "and more",
    ],
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Put your Blueprint to the test",
    subtitle: "Discovery is not the same as confirmation.",
    desc: [
      "Once your Purpose Blueprint has taken shape, you can submit it to the BOWO Verification Team for a deeper human review.",
      "Your Blueprint becomes the starting point for a more intentional process of prophetic prayer, counselling, discernment, and guidance.",
      "The team reviews what has emerged, considers the patterns and themes in your Blueprint, and helps you explore what may be next.",
      "AI helps you discover the picture. Human guidance helps you discern what to do with it.",
    ],
  },
  {
    number: "06",
    icon: Compass,
    title: "Discover what comes next",
    subtitle: "Purpose isn't the end of the journey.",
    desc: [
      "After verification, you're not simply handed a conclusion and left alone.",
      "Your next steps can include personalized counselling, practical direction, continued reflection, and ongoing support as you begin to understand and live out what you've discovered.",
      "And because your story continues, your Blueprint can continue to evolve with you.",
      "Discover. Discern. Develop. Live.",
    ],
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto mt-10 w-full bg-background p-2 px-8 py-20 lg:px-16">
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
        {STEPS.map(({ number, icon: Icon, title, subtitle, desc, list }) => (
          <li
            key={title}
            className="relative transition-all duration-200 shadow-lg p-5 ease-in-out rounded-4xl hover:scale-[1.05] hover:p-5 hover:rounded-4xl hover:shadow-lg active:scale-95"
          >
            <p className="mb-2 text-sm font-bold tracking-wide text-brand-500">{number} —</p>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-4xl bg-brand-500 text-white">
              <Icon size={18} />
            </div>
            <p className="text-lg font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm font-medium text-brand-600">{subtitle}</p>

            <div className="mt-3 mb-4 max-w-2xl space-y-3">
              {desc.map((paragraph, i) => (
                <p key={i} className="text-sm text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {list && (
              <ul className="mb-4 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                {list.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}