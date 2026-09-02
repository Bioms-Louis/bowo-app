import { createClient } from "@/lib/supabase/server";
import { listEvidence } from "@/lib/db/evidence";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/states";
import { FileText } from "lucide-react";

export default async function EvidencePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const evidence = await listEvidence(supabase, user.id);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Evidence</h1>
        <p className="text-sm text-muted">
          See the information that supports your insights and patterns. Every insight here is
          traceable to something you actually wrote.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">{evidence.length}</p>
          <p className="text-sm text-muted">Total Evidence</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">
            {new Set(evidence.map((e) => e.journal_entry_id).filter(Boolean)).size}
          </p>
          <p className="text-sm text-muted">Journal Entries Referenced</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-bold text-slate-900">
            {new Set(evidence.map((e) => e.insight_id)).size}
          </p>
          <p className="text-sm text-muted">Insights Backed</p>
        </Card>
      </div>

      {evidence.length === 0 ? (
        <EmptyState
          title="No evidence yet"
          description="Evidence connects the dots between your journal entries and the insights BOWO surfaces. Keep journaling to build this out."
        />
      ) : (
        <div className="space-y-3">
          {evidence.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.blueprint_insights?.title ?? "Insight"}
                  </p>
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                    <FileText size={14} className="mt-0.5 shrink-0 text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-600">
                        {item.journal_entries?.title ?? "Journal entry"} ·{" "}
                        {item.journal_entries?.entry_date
                          ? new Date(item.journal_entries.entry_date).toLocaleDateString()
                          : ""}
                      </p>
                      <p className="mt-1 text-sm text-muted">&ldquo;{item.excerpt}&rdquo;</p>
                    </div>
                  </div>
                </div>
                {item.blueprint_insights?.category && (
                  <Badge color="brand">{item.blueprint_insights.category}</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
