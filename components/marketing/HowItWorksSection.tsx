"use client";

import { useState } from "react";
import { NotebookPen, Sparkles, ShieldCheck, Layers, UserCheck, Compass, MousePointerClick, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string[];
  list?: string[];
}

const STEPS: Step[] = [
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
      "As your reflections accumulate, BOWO analyzes what you're sharing for recurring themes, values, motivations, strengths, experiences, behaviors, and areas of growth. Its analysis is guided by the BOWO Purpose Framework a body of teachings and principles developed by Olajide Ajibowo over more than two decades, through his books, teachings, and understanding of purpose inspired by the Holy Spirit, with psychological analysis applied where relevant.",
    ],
  },
  {
    number: "03",
    icon: RefreshCw,
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
      "Encounters and more",
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

function StepCardBody({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <>
      <p className="mb-2 text-sm font-bold tracking-wide text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
        {step.number}
      </p>
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-4xl bg-brand-500 text-white transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
        <Icon size={18} />
      </div>

      <p className="inline-block text-lg font-semibold text-slate-900">{step.title}</p>
      <div className="mb-1 h-0.5 w-0 rounded-full bg-brand-400 transition-all duration-300 ease-out group-hover:w-10" />
      <p className="text-sm font-medium text-brand-600">{step.subtitle}</p>

      <div className="mt-3 mb-4 max-w-2xl space-y-3">
        {step.desc.map((paragraph, j) => (
          <p key={j} className="text-sm text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {step.list && (
        <ul className="mb-4 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-1.5">
          {step.list.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="h-1 w-1 shrink-0 rounded-full bg-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function HowItWorksSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="how-it-works" className="mx-auto mt-10 w-full bg-background p-2 px-8 py-20 lg:px-16">
      <style>{`
        @keyframes bowoStepIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bowo-step-pop {
          opacity: 0;
          animation: bowoStepIn 0.5s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .bowo-step-pop {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>

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

      {!expanded ? (
        <div className="mt-12 flex justify-center">
          <div
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            onClick={() => setExpanded(true)}
            onMouseEnter={() => setExpanded(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setExpanded(true);
            }}
            className="group relative w-full max-w-sm cursor-pointer rounded-4xl p-6 shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <StepCardBody step={STEPS[0]} />
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand-500 opacity-70 transition-opacity group-hover:opacity-100">
              <MousePointerClick size={13} />
              Hover or tap to see the full journey
            </p>
          </div>
        </div>
      ) : (
        <ol className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="bowo-step-pop group relative rounded-4xl p-5 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:bg-brand-50/60 active:scale-95"
              style={{ animationDelay: `${i * 1000}ms` }}
            >
              <StepCardBody step={step} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}