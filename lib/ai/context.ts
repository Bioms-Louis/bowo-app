import type { SupabaseClient } from "@supabase/supabase-js";
import type { JournalEntry, BlueprintInsight } from "@/types/domain";

const RECENT_ENTRY_LIMIT = 10;
const CONVERSATION_TURN_LIMIT = 10;

export interface AnalysisContext {
  triggeringEntry: JournalEntry;
  recentEntries: JournalEntry[]; // includes triggeringEntry, deduped
  activeInsights: BlueprintInsight[];
  /** Every journal_entry id that was actually sent to the model —
   *  used to reject any evidence reference Claude invents. */
  allowedEntryIds: Set<string>;
}

export interface ChatContext {
  recentEntries: JournalEntry[];
  activeInsights: BlueprintInsight[];
  recentMessages: { role: "user" | "assistant"; content: string }[];
  allowedEntryIds: Set<string>;
}

/**
 * Builds bounded context for the analysis pipeline: the entry that
 * triggered analysis, its most relevant recent neighbors (same
 * category first, then most recent overall), and the user's current
 * active insights so Claude doesn't rediscover or contradict them.
 *
 * Deliberately NOT a vector/semantic search in V1 — plain relational
 * queries are sufficient at this scale and keep the module simple to
 * replace later if needed (see docs/AI.md).
 */
export async function buildAnalysisContext(
  supabase: SupabaseClient,
  userId: string,
  triggeringEntryId: string
): Promise<AnalysisContext> {
  const { data: triggeringEntry, error: entryError } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", triggeringEntryId)
    .eq("user_id", userId)
    .single();

  if (entryError || !triggeringEntry) {
    throw new Error("Triggering journal entry not found or not owned by user.");
  }

  const { data: sameCategory } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .eq("category", triggeringEntry.category)
    .neq("id", triggeringEntryId)
    .order("entry_date", { ascending: false })
    .limit(5);

  const { data: recentOverall } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .neq("id", triggeringEntryId)
    .order("entry_date", { ascending: false })
    .limit(5);

  const byId = new Map<string, JournalEntry>();
  [triggeringEntry, ...(sameCategory ?? []), ...(recentOverall ?? [])].forEach((e) =>
    byId.set(e.id, e)
  );
  const recentEntries = Array.from(byId.values()).slice(0, RECENT_ENTRY_LIMIT);

  const { data: activeInsights } = await supabase
    .from("blueprint_insights")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(20);

  return {
    triggeringEntry,
    recentEntries,
    activeInsights: activeInsights ?? [],
    allowedEntryIds: new Set(recentEntries.map((e) => e.id)),
  };
}

/**
 * Builds bounded context for a companion chat turn: recent journal
 * entries, active insights, and the last few conversation turns.
 */
export async function buildChatContext(
  supabase: SupabaseClient,
  userId: string,
  conversationId: string
): Promise<ChatContext> {
  const { data: recentEntries } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false })
    .limit(RECENT_ENTRY_LIMIT);

  const { data: activeInsights } = await supabase
    .from("blueprint_insights")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(15);

  const { data: pastMessages } = await supabase
    .from("ai_messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(CONVERSATION_TURN_LIMIT);

  return {
    recentEntries: recentEntries ?? [],
    activeInsights: activeInsights ?? [],
    recentMessages: (pastMessages ?? []).reverse(),
    allowedEntryIds: new Set((recentEntries ?? []).map((e) => e.id)),
  };
}
