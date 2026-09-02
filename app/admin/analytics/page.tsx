import { createServiceRoleClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

const EVENT_LABELS: Record<string, string> = {
  user_registered: "New Users",
  journal_entry_created: "Journal Entries",
  ai_conversation_started: "AI Conversations",
  ai_analysis_run: "AI Analysis Runs",
  blueprint_insight_generated: "Insights Generated",
  login: "Logins",
};

/**
 * Basic trend counts over the last 30 days, grouped by event_type.
 * A straightforward query against activity_events — no separate
 * analytics service, per the spec's "don't overengineer" rule.
 */
export default async function AdminAnalyticsPage() {
  const supabase = createServiceRoleClient();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: events } = await supabase
    .from("activity_events")
    .select("event_type, created_at")
    .gte("created_at", since.toISOString());

  const totals: Record<string, number> = {};
  (events ?? []).forEach((e) => {
    totals[e.event_type] = (totals[e.event_type] ?? 0) + 1;
  });

  return (
    <div className="p-8">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Analytics</h1>
      <p className="mb-6 text-sm text-muted">Activity trends over the last 30 days.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Object.entries(EVENT_LABELS).map(([key, label]) => (
          <Card key={key} className="p-5">
            <p className="text-2xl font-bold text-slate-900">{totals[key] ?? 0}</p>
            <p className="text-sm text-muted">{label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
