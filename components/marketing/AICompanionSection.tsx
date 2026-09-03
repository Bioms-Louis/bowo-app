import { MessageCircle, ShieldCheck, Clock } from "lucide-react";

export function AICompanionSection() {
  return (
    <section className="rounded-2xl border border-border-subtle shadow-lg mx-auto max-w-6xl px-8 mt-10 py-20 lg:px-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-md active:scale-95 order-2 rounded-2xl border border-border-subtle bg-white p-5 shadow-lg lg:order-1">
          <div className="mb-4 flex items-center gap-2 border-b border-border-subtle pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
              <MessageCircle size={14} />
            </span>
            <p className="text-3x1 font-semibold text-slate-900">Your BOWO AI Companion</p>
          </div>

          <div className="space-y-3">
            <div className="ml-auto max-w-[85%] rounded-2xl bg-brand-500 px-3 py-2 text-sm text-white">
              I keep saying yes to things I don&apos;t actually want to do. Is that a pattern?
            </div>
            <div className="max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
              It shows up in three of your recent entries all around saying yes out of guilt
              rather than genuine interest. Want to look at what they have in common?
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-medium text-brand-600">BOWO AI Companion</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Someone to think out loud with, who already knows your story.
          </h2>
          <p className="mt-4 text-base text-muted">
            Your companion isn&apos;t a generic chatbot starting from zero every time. It has
            your recent journal entries and current Blueprint in view, so a conversation with it
            picks up where your reflection left off no re-explaining your life story.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <p className="text-sm text-slate-700">
                Available anytime, right inside the app no separate tab, no waiting.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <p className="text-sm text-slate-700">
                Reflective, not directive it asks questions and points to patterns, it
                doesn&apos;t hand you a verdict about who you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
