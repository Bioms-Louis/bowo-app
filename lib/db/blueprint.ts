import type { SupabaseClient } from "@supabase/supabase-js";
import type { Blueprint, BlueprintInsight, InsightCategory } from "@/types/domain";

export async function getCurrentBlueprint(
  supabase: SupabaseClient,
  userId: string
): Promise<Blueprint | null> {
  const { data, error } = await supabase
    .from("blueprints")
    .select("*")
    .eq("user_id", userId)
    .eq("is_current", true)
    .single();

  if (error) return null;
  return data;
}

/**
 * Ensures a user has a current blueprint row, creating an empty one if
 * this is their first visit. Called from the Blueprint page rather than
 * at signup, so the DB doesn't accumulate blueprint rows for users who
 * never engage.
 */
export async function ensureCurrentBlueprint(
  supabase: SupabaseClient,
  userId: string
): Promise<Blueprint> {
  const existing = await getCurrentBlueprint(supabase, userId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from("blueprints")
    .insert({ user_id: userId, version: 1, is_current: true })
    .select()
    .single();

  if (error || !data) throw error ?? new Error("Failed to create blueprint.");
  return data;
}

export async function listActiveInsights(
  supabase: SupabaseClient,
  userId: string,
  category?: InsightCategory
): Promise<BlueprintInsight[]> {
  let query = supabase
    .from("blueprint_insights")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("updated_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function countInsightsByCategory(
  supabase: SupabaseClient,
  userId: string
): Promise<Record<string, number>> {
  const { data } = await supabase
    .from("blueprint_insights")
    .select("category")
    .eq("user_id", userId)
    .eq("is_active", true);

  const counts: Record<string, number> = {};
  (data ?? []).forEach((row) => {
    counts[row.category] = (counts[row.category] ?? 0) + 1;
  });
  return counts;
}
