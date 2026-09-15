"use client";

import { useState } from "react";
import { NotebookPen, Sparkles, Layers, UserCheck, Compass, MousePointerClick, RefreshCw } from "lucide-react";
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
      "Whatever is real today. A thought, decision, goal, challenge, gratitude, or lesson.", 
      "No right answers. No tests. Just tell BOWO what happened.",
    ],
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Let BOWO read between the lines",
    subtitle: "Your story becomes the evidence.",
    desc: [
      "BOWO uncovers your purpose patterns through AI and the BOWO Purpose Framework, shaped by Olajide Ajibowo’s teachings and inspired by the Holy Spirit.",  
    ],
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "See the patterns. Follow the evidence.",
    subtitle: "Every insight has a trail.",
    desc: [
      "See the patterns BOWO finds, explore the evidence, and decide what truly resonates with you.",
      "No black boxes just your story and the insights within it.",
    ],
  },
  {
    number: "04",
    icon: Layers,
    title: "Watch your Purpose Blueprint emerge",
    subtitle: "A picture of purpose, built over time.",
    desc: [
      "As patterns emerge, BOWO builds your Purpose Blueprint, revealing connections between your purpose, calling, assignment, warnings, talents, spiritual gifts, tribes, encounters, and more.",  
    ],
    
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Put your Blueprint to the test",
    subtitle: "Discovery is not the same as confirmation.",
    desc: [
      "Once your Purpose Blueprint takes shape, the BOWO Verification Team reviews it through human discernment, prophetic prayer, and counselling.",
      "AI reveals the picture. Human guidance helps you discern the path.",
    ],
  },
  {
    number: "06",
    icon: Compass,
    title: "Discover what comes next",
    subtitle: "Purpose isn't the end of the journey.",
    desc: [
      "After verification, receive personalized guidance, counselling, and ongoing support to help you understand and live out your purpose. Your Blueprint evolves as your journey unfolds",
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
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-brand-500 opacity-70 transition-opacity group-hover:opacity-100">
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