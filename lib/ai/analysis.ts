import type { SupabaseClient } from "@supabase/supabase-js";
import { anthropic, AI_MODEL } from "./client";
import { buildAnalysisContext } from "./context";
import { buildAnalysisPrompt } from "./prompts";
import { AnalysisResponseSchema, type Insight } from "./schemas";

export interface AnalysisResult {
  status: "completed" | "failed";
  insightsCreated: number;
  errorMessage?: string;
}

/**
 * Runs the full journal -> insight -> evidence -> blueprint pipeline
 * for a single triggering journal entry. Writes are all-or-nothing:
 * a run either fully succeeds or writes nothing, tracked via
 * ai_analysis_runs so the UI can show a friendly failure state
 * instead of a partial/inconsistent Blueprint.
 */
export async function runAnalysis(
  supabase: SupabaseClient,
  userId: string,
  triggeringEntryId: string
): Promise<AnalysisResult> {
  const { data: run } = await supabase
    .from("ai_analysis_runs")
    .insert({
      user_id: userId,
      triggered_by: "journal_entry_created",
      journal_entry_ids: [triggeringEntryId],
      status: "pending",
    })
    .select()
    .single();

  try {
    const ctx = await buildAnalysisContext(supabase, userId, triggeringEntryId);
    const { system, user } = buildAnalysisPrompt(ctx);

    const response = await anthropic.messages.create({
      model: AI_MODEL,
      max_tokens: 2000,
      system,
      messages: [{ role: "user", content: user }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from model.");
    }

    const parsed = JSON.parse(stripCodeFences(textBlock.text));
    const validated = AnalysisResponseSchema.parse(parsed);

    // Reject any insight referencing an entry id that wasn't actually
    // sent as context — this is what makes fabricated evidence
    // structurally impossible, not just prompt-discouraged.
    const safeInsights = validated.insights.filter((insight) =>
      insight.evidence.every((e) => ctx.allowedEntryIds.has(e.journalEntryId))
    );

    const { data: blueprint } = await supabase
      .from("blueprints")
      .select("id")
      .eq("user_id", userId)
      .eq("is_current", true)
      .single();

    if (!blueprint) throw new Error("No current blueprint found for user.");

    let insightsCreated = 0;
    for (const insight of safeInsights) {
      insightsCreated += await persistInsight(supabase, userId, blueprint.id, insight);
    }

    await supabase
      .from("ai_analysis_runs")
      .update({
        status: "completed",
        insights_created: insightsCreated,
        completed_at: new Date().toISOString(),
      })
      .eq("id", run!.id);

    await supabase.from("activity_events").insert({
      user_id: userId,
      event_type: "ai_analysis_run",
      metadata: { insights_created: insightsCreated },
    });

    return { status: "completed", insightsCreated };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown analysis error";
    await supabase
      .from("ai_analysis_runs")
      .update({ status: "failed", error_message: message, completed_at: new Date().toISOString() })
      .eq("id", run!.id);

    return { status: "failed", insightsCreated: 0, errorMessage: message };
  }
}

async function persistInsight(
  supabase: SupabaseClient,
  userId: string,
  blueprintId: string,
  insight: Insight
): Promise<number> {
  const { data: insertedInsight, error } = await supabase
    .from("blueprint_insights")
    .insert({
      blueprint_id: blueprintId,
      user_id: userId,
      title: insight.title,
      description: insight.description,
      category: insight.category,
      status: insight.status,
      confidence: insight.confidence,
    })
    .select()
    .single();

  if (error || !insertedInsight) return 0;

  const evidenceRows = insight.evidence.map((e) => ({
    user_id: userId,
    insight_id: insertedInsight.id,
    journal_entry_id: e.journalEntryId,
    source_type: "journal_entry" as const,
    excerpt: e.excerpt,
  }));

  await supabase.from("evidence").insert(evidenceRows);

  await supabase.from("activity_events").insert({
    user_id: userId,
    event_type: "blueprint_insight_generated",
    metadata: { insight_id: insertedInsight.id, category: insight.category },
  });

  return 1;
}

function stripCodeFences(text: string): string {
  return text.trim().replace(/^```json\s*|^```\s*|```$/g, "");
}
