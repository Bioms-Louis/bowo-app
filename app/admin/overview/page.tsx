import { createServiceRoleClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, NotebookPen, MessagesSquare, Layers } from "lucide-react";

/**
 * Uses the service-role client because admin needs cross-user aggregate
 * counts, which RLS would otherwise block per-user. Safe here ONLY
 * because AdminLayout already called requireAdmin() and this route is
 * unreachable by non-admins. This page queries counts and event logs
 * only — it must never select journal_entries.content or ai_messages
 * content, per the spec's "don't expose sensitive user content" rule.
 */
export default async function AdminOverviewPage() {
  const supabase = createServiceRoleClient();

  const [{ count: totalUsers }, { count: journalEntries }, { count: aiInteractions }, { count: blueprintsGenerated }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("journal_entries").select("*", { count: "exact", head: true }),
      supabase.from("ai_messages").select("*", { count: "exact", head: true }),
      supabase.from("blueprint_insights").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div className="p-8">
      <div className="mb-6 rounded-2xl bg-brand-50 p-6">
        <h1 className="text-xl font-bold text-slate-900">Welcome to BOWO Admin</h1>
        <p className="text-sm text-muted">
          Monitor platform performance, user activity and system insights.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={totalUsers ?? 0} />
        <StatCard icon={NotebookPen} label="Journal Entries" value={journalEntries ?? 0} />
        <StatCard icon={MessagesSquare} label="AI Interactions" value={aiInteractions ?? 0} />
        <StatCard icon={Layers} label="Blueprints Generated" value={blueprintsGenerated ?? 0} />
      </div>
    </div>
  );
}
