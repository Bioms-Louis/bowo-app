import { z } from "zod";

export const InsightCategorySchema = z.enum([
  "theme",
  "strength",
  "growth_area",
  "current_focus",
  "core_value",
  "identity",
]);

export const InsightStatusSchema = z.enum([
  "observation",
  "developing_pattern",
  "strong_recurring_pattern",
]);

export const ConfidenceSchema = z.enum(["low", "medium", "high"]);

/**
 * Shape Claude must return from the analysis prompt. journalEntryId
 * values are checked against the actual context set server-side after
 * parsing — this schema only validates shape, not truthfulness.
 */
export const InsightEvidenceSchema = z.object({
  journalEntryId: z.string().uuid(),
  excerpt: z.string().min(1).max(500),
});

export const InsightSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(600),
  category: InsightCategorySchema,
  status: InsightStatusSchema,
  confidence: ConfidenceSchema,
  evidence: z.array(InsightEvidenceSchema).min(1).max(6),
});

export const AnalysisResponseSchema = z.object({
  insights: z.array(InsightSchema).max(8),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
export type Insight = z.infer<typeof InsightSchema>;

/**
 * Chat responses are plain text (no structured output needed), but we
 * still validate basic shape/length before storing.
 */
export const ChatReplySchema = z.object({
  reply: z.string().min(1).max(4000),
});
export type ChatReply = z.infer<typeof ChatReplySchema>;
