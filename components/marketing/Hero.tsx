import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-[position:65%_center]"
        style={{
          backgroundImage: "url('/image/hero.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-white/10" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-8 pb-16 pt-10 lg:grid-cols-2 lg:px-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            Discover. Understand.
            <br />
            <span className="text-brand-500">Walk in Purpose.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted">
            BOWO helps you document your journey, uncover meaningful patterns, and walk
            intentionally in the purpose you were created for.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-lg active:scale-95"
              >Start Your Journey <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="secondary"
                className="transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-md active:scale-95"
              >
                <Play
                  size={16}
                  className="transition-transform duration-200 ease-out group-hover:scale-110"
                />
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      <div className="hidden lg:block" />
      </div>
    </section>
  );
}
