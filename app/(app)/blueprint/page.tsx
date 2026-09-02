import { createClient } from "@/lib/supabase/server";
import { ensureCurrentBlueprint, listActiveInsights } from "@/lib/db/blueprint";
import { KeyAreaCard, groupByCategory } from "@/components/blueprint/KeyAreaCard";
import { InsightStatusBadge } from "@/components/blueprint/InsightStatusBadge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";
import { User, Flag, Sparkles as Gift, Heart, TrendingUp, Target, Compass, Sun } from "lucide-react";

export default async function BlueprintPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const blueprint = await ensureCurrentBlueprint(supabase, user.id);
  const insights = await listActiveInsights(supabase, user.id);

  const hasContent = Boolean(
    blueprint.who_you_are || blueprint.what_drives_you || insights.length > 0
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Living Blueprint</h1>
          <p className="text-sm text-muted">
            An evolving picture of your purpose, shaped by your journey and the patterns
            revealed in your life.
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
          Dynamic
        </span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-2xl font-bold text-brand-600">{blueprint.maturity_percent}%</p>
          <p className="text-sm text-muted">Blueprint Maturity</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">{insights.length}</p>
          <p className="text-sm text-muted">Insights Integrated</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">{blueprint.identity_clarity_percent}%</p>
          <p className="text-sm text-muted">Identity Clarity</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">{blueprint.calling_activation_percent}%</p>
          <p className="text-sm text-muted">Calling Activation</p>
        </Card>
      </div>

      {!hasContent ? (
        <EmptyState
          title="Your purpose is unfolding."
          description="The more you reflect, the clearer your blueprint becomes. Write in your journal to begin."
        />
      ) : (
        <>
          <Card className="mb-6 p-8">
            <h2 className="mb-6 text-center text-lg font-semibold text-slate-900">
              Your Core Purpose
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuadrantCard icon={User} title="Who You Are" text={blueprint.who_you_are} />
              <QuadrantCard icon={Flag} title="What Drives You" text={blueprint.what_drives_you} />
              <QuadrantCard icon={Gift} title="Your Strengths" text={blueprint.your_strengths} />
              <QuadrantCard icon={Heart} title="Your Impact" text={blueprint.your_impact} />
            </div>
            {blueprint.core_purpose_statement && (
              <p className="mt-6 rounded-xl bg-brand-50 p-5 text-center text-sm font-medium text-brand-700">
                &ldquo;{blueprint.core_purpose_statement}&rdquo;
              </p>
            )}
          </Card>

          <h2 className="mb-3 text-base font-semibold text-slate-900">Key Areas of Your Blueprint</h2>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KeyAreaCard icon={TrendingUp} title="Areas of Growth" insights={groupByCategory(insights, "growth_area")} />
            <KeyAreaCard icon={Target} title="Current Focus" insights={groupByCategory(insights, "current_focus")} />
            <KeyAreaCard icon={Compass} title="Core Values" insights={groupByCategory(insights, "core_value")} />
            <KeyAreaCard icon={Sun} title="What You're Becoming" insights={groupByCategory(insights, "identity")} />
          </div>

          <h2 className="mb-3 text-base font-semibold text-slate-900">Key Insights</h2>
          <div className="space-y-3">
            {insights.slice(0, 8).map((insight) => (
              <Card key={insight.id} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{insight.title}</p>
                  <p className="mt-1 text-sm text-muted">{insight.description}</p>
                </div>
                <InsightStatusBadge status={insight.status} />
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function QuadrantCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof User;
  title: string;
  text: string | null;
}) {
  return (
    <div className="rounded-xl border border-border-subtle p-4">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
        <Icon size={16} />
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-muted">
        {text ?? "Still forming — keep journaling and this will develop."}
      </p>
    </div>
  );
}
