import { createClient } from "@/lib/supabase/server";
import { listActiveInsights } from "@/lib/db/blueprint";
import { InsightStatusBadge } from "@/components/blueprint/InsightStatusBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/states";

const CATEGORY_LABELS: Record<string, string> = {
  theme: "Theme",
  strength: "Strength",
  growth_area: "Growth Area",
  current_focus: "Current Focus",
  core_value: "Core Value",
  identity: "Identity",
};

export default async function InsightsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const insights = await listActiveInsights(supabase, user.id);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">AI Insights</h1>
        <p className="text-sm text-muted">
          Patterns and themes BOWO has noticed in your reflections — grounded in what you&apos;ve
          actually written, never predicted.
        </p>
      </div>

      {insights.length === 0 ? (
        <EmptyState
          title="No insights yet"
          description="Insights appear here once BOWO notices patterns across a few of your journal entries."
        />
      ) : (
        <div className="space-y-3">
          {insights.map((insight) => (
            <Card key={insight.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{insight.title}</p>
                    <Badge color="slate">{CATEGORY_LABELS[insight.category] ?? insight.category}</Badge>
                  </div>
                  <p className="text-sm text-muted">{insight.description}</p>
                </div>
                <InsightStatusBadge status={insight.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
