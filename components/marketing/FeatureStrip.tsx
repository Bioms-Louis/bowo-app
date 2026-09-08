"use client";

import { ShieldCheck, User, Flag, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
      <div className="flex items-center justify-between px-3 pt-2 text-[10px] font-medium text-slate-900">
        <span>9:41</span>
        <span className="h-4.5 w-14 rounded-full bg-slate-900/80" />
        <span className="tracking-widest">••••</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Journal",
    desc: "Capture your thoughts, experiences and lessons.",
    rotate: "-rotate-2",
    mock: (
      <PhoneFrame>
        <div className="space-y-2 h-40">
          <div className="rounded-lg border border-border-subtle p-2">
            <p className="text-[11px] font-semibold text-slate-800">Today&apos;s Reflections</p>
            <p className="text-[10px] text-muted">Made progress on work, felt focused...</p>
          </div>
          <div className="rounded-lg border border-border-subtle p-2">
            <p className="text-[11px] font-semibold text-slate-800">Gratitude</p>
            <p className="text-[10px] text-muted">Grateful for my health, my family...</p>
          </div>
        </div>
      </PhoneFrame>
    ),
  },
  {
    title: "Insights",
    desc: "Get personalized insights from your unique story.",
    rotate: "rotate-1",
    mock: (
      <PhoneFrame>
        <div className="rounded-lg border border-border-subtle p-2 h-40">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-800">Consistent Growth Focus</p>
          </div>
          <span className="inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-medium text-brand-600">
            Developing Pattern
          </span>
          <p className="mt-1.5 text-[10px] text-muted">
            Shows up across 3 recent entries about learning and self-improvement.
          </p>
        </div>
      </PhoneFrame>
    ),
  },
  {
    title: "AI Companion",
    desc: "Chat anytime for guidance, clarity and encouragement.",
    rotate: "rotate-0",
    mock: (
      <PhoneFrame>
        <div className="space-y-1.5 h-40">
          <div className="max-w-[85%] rounded-lg bg-slate-100 px-2 py-1.5 text-[10px] text-slate-700">
            I keep saying yes to things I don&apos;t want to do.
          </div>
          <div className="ml-auto max-w-[85%] rounded-lg bg-brand-500 px-2 py-1.5 text-[10px] text-white">
            That&apos;s shown up in 3 recent entries — want to look closer?
          </div>
        </div>
      </PhoneFrame>
    ),
  },
  {
    title: "Evidence",
    desc: "Every insight is backed by your own journey.",
    rotate: "rotate-2",
    mock: (
      <PhoneFrame>
        <div className="rounded-lg bg-slate-50 p-2 h-40">
          <p className="text-[10px] font-medium text-slate-600">Journal Entry · May 24</p>
          <p className="mt-1 text-[10px] italic text-muted">
            &ldquo;I want to stay focused, keep learning, and work consistently...&rdquo;
          </p>
        </div>
      </PhoneFrame>
    ),
  },
  {
    title: "Purpose Blueprint",
    desc: "See the bigger picture of your life's purpose.",
    rotate: "-rotate-1",
    mock: (
      <PhoneFrame>
        <div className="grid grid-cols-2 gap-1.5 h-40">
          {[
            { icon: User, label: "Who You Are" },
            { icon: Flag, label: "Drives You" },
            { icon: ShieldCheck, label: "Strengths" },
            { icon: Heart, label: "Impact" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-md border border-border-subtle p-1.5">
              <Icon size={11} className="mb-1 text-brand-500" />
              <p className="text-[9px] text-slate-700">{label}</p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
  },
];

export function FeatureStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-feature-card]")
    );

    // Find the AI Companion card in the middle copy
    const aiCompanionIndex = FEATURES.findIndex(
      (feature) => feature.title === "AI Companion"
    );

    const middleCopyStart = FEATURES.length;
    const aiCompanionCard =
      cards[middleCopyStart + aiCompanionIndex];

    if (aiCompanionCard) {
      const containerCenter = container.clientWidth / 2;
      const cardCenter = aiCompanionCard.offsetLeft + aiCompanionCard.offsetWidth / 2;

      container.scrollLeft = cardCenter - containerCenter;
    }

    const handleScroll = () => {
      const setWidth = container.scrollWidth / 3;
      const currentScroll = container.scrollLeft;

      // Infinite scrolling to the left
      if (currentScroll <= 0) {
        container.scrollLeft = currentScroll + setWidth;
      }

      // Infinite scrolling to the right
      else if (
        currentScroll >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = currentScroll - setWidth;
      }
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const infiniteFeatures = [...FEATURES, ...FEATURES, ...FEATURES];

  return (
    <section
      id="features"
      className="relative z-10 mx-auto mt-10 max-w-12xl px-8 lg:px-16"
    >
      <style>{`
        .bowo-feature-scroll::-webkit-scrollbar {
          display: none;
        }

        .bowo-feature-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div className="rounded-[2.5rem] bg-brand-50/50 py-14">
        <div
          ref={scrollRef}
          className="bowo-feature-scroll flex gap-8 overflow-x-auto px-8 pb-4 lg:px-16"
        >
          {infiniteFeatures.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              data-feature-card
              className={`group relative w-64 shrink-0 origin-bottom transition-transform duration-300 ease-out hover:translate-y-2 hover:rotate-0 sm:w-72 ${feature.rotate}`}
            >
              <div
                className={`rounded-3xl bg-white p-5 shadow-lg ${
                  feature.title === "AI Companion"
                }`}
              >

                <h3 className="font-serif text-2xl text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 font-serif text-sm italic text-muted">
                  {feature.desc}
                </p>

                <div className="mt-5">{feature.mock}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}