import type { SupabaseClient } from "@supabase/supabase-js";
import type { JournalEntry, JournalCategory } from "@/types/domain";

export async function listJournalEntries(
  supabase: SupabaseClient,
  userId: string,
  category?: JournalCategory
): Promise<JournalEntry[]> {
  let query = supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createJournalEntry(
  supabase: SupabaseClient,
  userId: string,
  input: {
    title: string;
    content: string;
    category: JournalCategory;
    entry_date: string;
    ai_prompt_requested: boolean;
  }
): Promise<JournalEntry> {
  const { data, error } = await supabase
    .from("journal_entries")
    .insert({ ...input, user_id: userId })
    .select()
    .single();

  if (error || !data) throw error ?? new Error("Failed to create journal entry.");

  await supabase.from("activity_events").insert({
    user_id: userId,
    event_type: "journal_entry_created",
  });

  return data;
}

export async function updateJournalEntry(
  supabase: SupabaseClient,
  userId: string,
  entryId: string,
  input: Partial<Pick<JournalEntry, "title" | "content" | "category" | "entry_date">>
): Promise<JournalEntry> {
  const { data, error } = await supabase
    .from("journal_entries")
    .update(input)
    .eq("id", entryId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error || !data) throw error ?? new Error("Failed to update journal entry.");
  return data;
}

export async function deleteJournalEntry(
  supabase: SupabaseClient,
  userId: string,
  entryId: string
): Promise<void> {
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  if (error) throw error;
}
