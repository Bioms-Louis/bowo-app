import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmptyState } from "@/components/ui/states";
import { Card } from "@/components/ui/card";
import { NotebookPen, Sparkles, Layers, ShieldCheck, MessagesSquare } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name")
    .eq("id", user.id)
    .single();

  const [{ count: journalCount }, { count: insightCount }, { count: evidenceCount }, { count: convoCount }, { data: blueprint }] =
    await Promise.all([
      supabase
        .from("journal_entries")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("blueprint_insights")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("evidence")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("ai_conversations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("blueprints")
        .select("maturity_percent")
        .eq("user_id", user.id)
        .eq("is_current", true)
        .single(),
    ]);

  const { data: recentEntries } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false })
    .limit(4);

  const firstName = profile?.first_name ?? "there";

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Good to see you, {firstName} 👋</h1>
        <p className="text-sm text-muted">You&apos;re making progress on your purpose journey.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={NotebookPen} label="Journal Entries" value={journalCount ?? 0} />
        <StatCard icon={Sparkles} label="AI Insights" value={insightCount ?? 0} />
        <StatCard
          icon={Layers}
          label="Blueprint Progress"
          value={`${blueprint?.maturity_percent ?? 0}%`}
        />
        <StatCard icon={ShieldCheck} label="Evidence Items" value={evidenceCount ?? 0} />
        <StatCard icon={MessagesSquare} label="AI Conversations" value={convoCount ?? 0} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Recent Journal Entries</h2>
            <Link href="/journal" className="text-sm font-medium text-brand-600">
              View all
            </Link>
          </div>
          {!recentEntries || recentEntries.length === 0 ? (
            <EmptyState
              title="No entries yet"
              description="Your journal is the key to understanding your journey and building a better future."
            />
          ) : (
            <div className="space-y-3">
              {recentEntries.map((e) => (
                <div key={e.id} className="flex items-center justify-between border-b border-border-subtle pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{e.title}</p>
                    <p className="line-clamp-1 text-xs text-muted">{e.content}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {new Date(e.entry_date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-slate-900">Continue Your Journey</h2>
          <div className="space-y-2">
            <Link
              href="/journal"
              className="block rounded-lg border border-border-subtle p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Write in Journal
            </Link>
            <Link
              href="/blueprint"
              className="block rounded-lg border border-border-subtle p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View Blueprint
            </Link>
            <Link
              href="/evidence"
              className="block rounded-lg border border-border-subtle p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View Evidence
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
