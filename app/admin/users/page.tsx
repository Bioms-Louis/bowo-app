import { createServiceRoleClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Lists users with basic profile info + activity counts. Deliberately
 * never joins/selects journal_entries.content, ai_messages.content, or
 * evidence.excerpt — admin gets counts and metadata, never the
 * substance of a user's private reflections.
 */
export default async function AdminUsersPage() {
  const supabase = createServiceRoleClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role, last_active_at, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const userIds = (profiles ?? []).map((p) => p.id);

  const { data: journalCounts } = await supabase
    .from("journal_entries")
    .select("user_id")
    .in("user_id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]);

  const countsByUser = new Map<string, number>();
  (journalCounts ?? []).forEach((row) => {
    countsByUser.set(row.user_id, (countsByUser.get(row.user_id) ?? 0) + 1);
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Users</h1>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-subtle bg-slate-50 text-xs uppercase text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Journal Entries</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).map((p) => (
              <tr key={p.id} className="border-b border-border-subtle last:border-0">
                <td className="px-5 py-3 font-medium text-slate-900">
                  {[p.first_name, p.last_name].filter(Boolean).join(" ") || "Unnamed user"}
                </td>
                <td className="px-5 py-3">
                  <Badge color={p.role === "admin" ? "brand" : "slate"}>{p.role}</Badge>
                </td>
                <td className="px-5 py-3 text-muted">{countsByUser.get(p.id) ?? 0}</td>
                <td className="px-5 py-3 text-muted">
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
