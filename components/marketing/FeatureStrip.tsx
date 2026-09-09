"use client";

import { ShieldCheck, User, Flag, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[200px] overflow-hidden rounded-[1.6rem] border-[1px] border-slate-300 bg-brand-50 shadow-lg sm:max-w-[220px] lg:max-w-[240px]">
      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-2 z-20 h-5 w-14 -translate-x-1/2 rounded-full bg-black" />

      {/* Status Bar */}
      <div className="flex h-9 items-center justify-between px-4 pt-1.5 text-[9px] font-medium text-black">
        <span>9:41</span>

        <div className="flex items-center gap-1">
          <span className="text-[7px] font-medium">5G</span>
          <span className="rounded-[3px] bg-black px-1 text-[7px] text-background">
            95
          </span>
        </div>
      </div>

      {/* Screen */}
      <div className="min-h-[290px] px-3.5 pb-4 pt-2 sm:min-h-[310px] lg:min-h-[330px]">
        {children}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Journal",
    desc: "Capture your thoughts, experiences and lessons.",
    rotate: "rotate-0",
    mock: (
      <PhoneFrame>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm">
              ←
            </div>

            <h4 className="font-serif text-sm text-slate-900">
              Journal
            </h4>
          </div>

          <div className="pt-1">
            <p className="font-serif text-lg leading-snug text-slate-900">
              Today&apos;s
              <br />
              Reflections
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted">
              What stood out to you today?
            </p>
          </div>

          <div className="rounded-xl bg-white p-1.5 shadow-sm">
            <p className="text-[10px] font-semibold text-slate-800">
              Today&apos;s Reflection
            </p>

            <p className="mt-1.5 text-[10px] leading-4 text-muted">
              Made progress on work, felt focused and
              finally found some clarity around what
              I&apos;ve been working toward...
            </p>
          </div>

          <div className="rounded-xl bg-white p-1.5 shadow-sm">
            <p className="text-[10px] font-semibold text-slate-800">
              Gratitude
            </p>

            <p className="mt-1.5 text-[10px] leading-4 text-muted">
              Grateful for my health, my family and
              another opportunity to grow.
            </p>
          </div>
        </div>
      </PhoneFrame>
    ),
  },

  {
    title: "Insights",
    desc: "Get personalized insights from your unique story.",
    rotate: "rotate-0",
    mock: (
      <PhoneFrame>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm">
              ←
            </div>

            <h4 className="font-serif text-sm text-slate-900">
              Your personal insights
            </h4>
          </div>

          <div className="pt-1 text-center">
            <p className="font-serif text-lg leading-snug text-slate-900">
              You&apos;ve Built Something
              <br />
              Remarkable
            </p>

            <p className="mx-auto mt-1 max-w-[190px] text-[10px] leading-4 text-muted">
              Your patterns reveal where you&apos;re growing,
              what matters most, and what keeps showing up
              across your journey.
            </p>
          </div>

          <div className="rounded-xl bg-white p-1 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-serif text-xs text-slate-900">
                Consistent Growth
              </p>

              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                ✓
              </div>
            </div>

            <span className="mt-1 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[8px] font-medium text-brand-600">
              Developing Pattern
            </span>

            <p className="mt-1 text-[10px] leading-4 text-muted">
              Shows up across 3 recent entries about
              learning and self-improvement.
            </p>
          </div>
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
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm">
              ←
            </div>

            <h4 className="font-serif text-sm text-slate-900">
              AI Companion
            </h4>
          </div>

          <div className="space-y-2.5 pt-5">
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[10px] leading-4 text-slate-700 shadow-sm">
              I keep saying yes to things I don&apos;t
              actually want to do.
            </div>

            <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-brand-500 px-3 py-2 text-[10px] leading-4 text-white">
              That&apos;s shown up in 3 recent entries.
              Want to look closer?
            </div>

            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[10px] leading-4 text-slate-700 shadow-sm">
              Yes. I think I&apos;ve been putting other
              people&apos;s expectations ahead of my own.
            </div>
          </div>
        </div>
      </PhoneFrame>
    ),
  },

  {
    title: "Evidence",
    desc: "Every insight is backed by your own journey.",
    rotate: "rotate-0",
    mock: (
      <PhoneFrame>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm">
              ←
            </div>

            <h4 className="font-serif text-sm text-slate-900">
              Evidence
            </h4>
          </div>

          <div className="pt-1">
            <p className="font-serif text-lg leading-snug text-slate-900">
              Your story
              <br />
              is the evidence.
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted">
              Every insight links back to what you&apos;ve actually written.
            </p>
          </div>

          <div className="rounded-xl bg-white p-1.5 shadow-sm">
            <p className="text-[9px] font-medium text-brand-500">
              Journal Entry · May 24, 2024
            </p>

            <p className="mt-2 font-serif text-xs italic leading-4 text-slate-700">
              “I want to stay focused and work
              consistently”
            </p>
          </div>
          <div className="rounded-xl bg-white p-1.5 shadow-sm">
            <p className="text-[9px] font-medium text-brand-500">
              Pattern detected
            </p>

            <p className="mt-1 text-[10px] leading-4 text-slate-700">
              Your recent entries repeatedly mention
              consistency and personal growth.
            </p>
          </div>
        </div>
      </PhoneFrame>
    ),
  },

  {
    title: "Purpose Blueprint",
    desc: "See the bigger picture of your life's purpose.",
    rotate: "rotate-0",
    mock: (
      <PhoneFrame>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm">
              ←
            </div>

            <h4 className="font-serif text-sm text-slate-900">
              Purpose Blueprint
            </h4>
          </div>

          <div className="pt-3">
            <p className="font-serif text-lg leading-snug text-slate-900">
              See the bigger
              <br />
              picture.
            </p>

            <p className="mt-2 text-[10px] leading-4 text-muted">
              Connect the patterns in your story into
              a clearer picture of who you are.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: User, label: "Who You Are" },
              { icon: Flag, label: "What Drives You" },
              { icon: ShieldCheck, label: "Your Strengths" },
              { icon: Heart, label: "Your Impact" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl bg-white p-2.5 shadow-sm"
              >
                <Icon
                  size={13}
                  className="mb-2 text-brand-500"
                />

                <p className="text-[9px] font-medium text-slate-700">
                  {label}
                </p>
              </div>
            ))}
          </div>
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
      container.querySelectorAll<HTMLElement>(
        "[data-feature-card]"
      )
    );

    const aiCompanionIndex = FEATURES.findIndex(
      (feature) => feature.title === "AI Companion"
    );

    const middleCopyStart = FEATURES.length;

    const aiCompanionCard =
      cards[middleCopyStart + aiCompanionIndex];

    if (aiCompanionCard) {
      const containerCenter = container.clientWidth / 2;

      const cardCenter =
        aiCompanionCard.offsetLeft +
        aiCompanionCard.offsetWidth / 2;

      container.scrollLeft =
        cardCenter - containerCenter;
    }

    const handleScroll = () => {
      const setWidth = container.scrollWidth / 3;
      const currentScroll = container.scrollLeft;

      if (currentScroll <= 0) {
        container.scrollLeft = currentScroll + setWidth;
      } else if (
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
      container.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const infiniteFeatures = [
    ...FEATURES,
    ...FEATURES,
    ...FEATURES,
  ];

  return (
    <section
      id="features"
      className="bg-brand-50 relative z-10 mx-auto mt-10 px-4 sm:px-8 lg:px-16"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-50 py-10 sm:py-12">
        <h4 className="relative mb-5 text-center text-2xl font-bold text-brand-500">
          BOWO Features
        </h4>
        <h2 className="relative mb-5 text-center text-2xl font-bold text-slate-900">
          Discover BOWO Powerful Features
        </h2>
        <p className="relative mx-auto mb-5 max-w-[600px] text-center text-muted">
          BOWO is designed to help you uncover your purpose through journaling, insights, and AI guidance. Explore the features that make BOWO a unique companion on your journey of self-discovery and purpose.
        </p>
        <div
          ref={scrollRef}
          className="bowo-feature-scroll relative flex items-start gap-5 overflow-x-auto px-6 pb-6 sm:gap-6 sm:px-8 lg:gap-8 lg:px-12"
        >
          {infiniteFeatures.map((feature, index) => (
            <article
              key={`${feature.title}-${index}`}
              data-feature-card
              className={`group w-[210px] shrink-0 origin-bottom transition-all duration-300 hover:translate-y-2 hover:rotate-0 sm:w-[240px] lg:w-[260px] ${feature.rotate}`}
            >
              {/* Liquid glass card: translucent + backdrop-blur, a
                  bright inset top edge and soft dark inset bottom edge
                  to fake light catching a curved glass surface, plus a
                  moving specular sheen on hover. */}
              <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/25 px-4 pt-5 shadow-[0_8px_32px_rgba(31,38,135,0.12),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-shadow duration-300 sm:px-5">
                {/* Small color blob contained entirely within this card
                    (clipped by the card's own overflow-hidden) — gives
                    the glass something local to refract without any
                    color bleeding into the section behind it. */}
                <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-brand-200 blur-3xl" />
                <div className="pointer-events-none absolute -right-12 -bottom-6 h-70 w-70 rounded-full bg-brand-100 blur-2xl" />
                
                {/* Specular highlight — drifts on hover to suggest the
                    glass catching light as you interact with it. */}
                <div className="pointer-events-none absolute -left-1/3 -top-1/3 h-2/3 w-2/3 rotate-12 rounded-full bg-brand-100/50 blur-4xl transition-transform duration-2000 ease-out group-hover:translate-x-8 group-hover:translate-y-6" />
                <div className="pointer-events-none absolute -right-2/6 -bottom-2/6 h-4/6 w-4/6 rotate-24 rounded-full bg-brand-100/50 blur-4xl transition-transform duration-2000 ease-out group-hover:translate-x-16 group-hover:translate-y-12" />

                <div className="relative">
                  {/* Heading */}
                  <div className="text-center">
                    <h3 className="font-serif text-xl leading-tight text-slate-900 sm:text-2xl">
                      {feature.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[200px] font-serif text-[11px] italic leading-4 text-muted sm:text-xs">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="mt-4">
                    {feature.mock}
                  </div>

                  {/* Bottom spacing */}
                  <div className="h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .bowo-feature-scroll::-webkit-scrollbar {
          display: none;
        }

        .bowo-feature-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
}
