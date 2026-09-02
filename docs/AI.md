# BOWO V1 — AI Architecture

## Two entry points, one context layer

1. **Analysis pipeline** (`lib/ai/analysis.ts`) — runs after a journal entry is
   saved (or on-demand). Produces structured `blueprint_insights` + `evidence`.
2. **Companion chat** (`lib/ai/chat.ts`) — the floating chatbox. Conversational,
   uses the same context builder but doesn't write insights directly.

Both share `lib/ai/context.ts` so context-selection logic isn't duplicated.

## Context strategy (`lib/ai/context.ts`)

Never sends the whole database. For a given request, context =

- the triggering entry (analysis) or last ~10 conversation turns (chat)
- the last N (e.g. 8–10) journal entries, prioritizing same-category entries
  and recency — plain relational query, no vector search in V1
- currently active `blueprint_insights` (so Claude doesn't re-discover or
  contradict what's already been established)
- a couple of relevant `evidence` excerpts if the chat message references a
  specific theme

This is deliberately a simple, swappable module — if V2 needs semantic
retrieval, only `context.ts` changes.

## Structured output (`lib/ai/schemas.ts`)

Analysis calls request JSON matching a Zod schema roughly:

```ts
const InsightSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['theme','strength','growth_area','current_focus','core_value','identity']),
  status: z.enum(['observation','developing_pattern','strong_recurring_pattern']),
  confidence: z.enum(['low','medium','high']),
  evidence: z.array(z.object({
    journalEntryId: z.string().uuid(),
    excerpt: z.string(),
  })),
});
const AnalysisResponseSchema = z.object({ insights: z.array(InsightSchema) });
```

Before any insight is persisted:
1. Zod validates the shape.
2. Every `journalEntryId` in `evidence` is checked against the actual set of
   entry IDs that were sent as context for that call — any ID that wasn't in
   the input is rejected (this is what makes fabricated evidence structurally
   impossible, not just discouraged by prompt wording).
3. Only entries that pass both checks are written; a partially-invalid
   response fails the whole run rather than writing partial/unverifiable data.

## Prompting principles (`lib/ai/prompts.ts`)

- System prompt establishes BOWO's voice: reflective, grounded, never
  predictive or prophetic.
- Explicitly instructed to use hedged language ("appears to be," "your
  reflections suggest," "an emerging pattern is") and never certainty language
  ("you are definitely called to," "your destiny is").
- Instructed to only reference journal entries provided in context, never to
  invent entries, experiences, or spiritual claims.
- Instructed to classify pattern strength using the three-tier model
  (observation → developing pattern → strong recurring pattern) based on how
  many independent entries support a theme, not on a single mention.

## Failure handling

- Malformed JSON, schema failure, or an evidence ID that doesn't check out →
  the run is marked `failed` in `ai_analysis_runs`, nothing is written, and
  the user sees "We couldn't update your Blueprint this time — try again
  shortly," never a raw API error.
- Rate limits / API errors are caught, logged, and surfaced as the same kind
  of friendly, non-technical message.

## What V1 does not do

No fine-tuning, no agent frameworks, no autonomous multi-step tool use inside
the AI layer — a single well-scoped Claude call per analysis/chat turn, which
matches the spec's "do not overengineer" directive.
