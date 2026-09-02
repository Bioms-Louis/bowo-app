import type { SupabaseClient } from "@supabase/supabase-js";
import type { Evidence, JournalEntry, BlueprintInsight } from "@/types/domain";

export interface EvidenceWithContext extends Evidence {
  journal_entries: Pick<JournalEntry, "id" | "title" | "content" | "entry_date"> | null;
  blueprint_insights: Pick<BlueprintInsight, "id" | "title" | "category" | "status"> | null;
}

/**
 * Lists evidence with its linked journal entry + insight joined in, for
 * the Evidence page. RLS still scopes this to the caller's own rows —
 * the .eq("user_id", ...) is defense-in-depth, not the only guard.
 */
export async function listEvidence(
  supabase: SupabaseClient,
  userId: string
): Promise<EvidenceWithContext[]> {
  const { data, error } = await supabase
    .from("evidence")
    .select(
      `*,
      journal_entries ( id, title, content, entry_date ),
      blueprint_insights ( id, title, category, status )`
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as EvidenceWithContext[];
}
