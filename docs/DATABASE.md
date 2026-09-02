# BOWO V1 — Database Design

Postgres via Supabase. Migration: `supabase/001_init_schema.sql`.

## Entity overview

```
auth.users (Supabase managed)
   │ 1:1
   ▼
profiles ──────────────┬──────────────┬────────────────┬───────────────┐
   │ 1:N                │ 1:N          │ 1:N             │ 1:N           │ 1:N
   ▼                    ▼              ▼                 ▼               ▼
journal_entries    blueprints    ai_conversations   ai_analysis_runs  activity_events
   │ 1:N (via evidence)  │ 1:N          │ 1:N
   │                     ▼              ▼
   │              blueprint_insights  ai_messages
   │                     │ 1:N              │
   └─────────────────────┴──────────────────┘
                       evidence
```

## Tables

**profiles** — extends `auth.users`. Holds `role` (`user`/`admin`), onboarding state,
last-active timestamp. A row is auto-created by the `handle_new_user()` trigger on
signup, so app code never inserts profiles directly.

**journal_entries** — the core user-generated data source. `category` is one of
`reflection | goals | gratitude | lesson`, matching the Journal mockup's tabs.
Strictly owned by `user_id`; nothing else in the system may read another user's
entries, including admins (see RLS notes below).

**blueprints** — one **current** row per user (`is_current = true`, enforced by a
partial unique index) plus historical versions when regenerated, satisfying the
spec's requirement to preserve history rather than overwrite. Holds the four
"Core Purpose" quadrant fields (who you are / what drives you / strengths / impact)
and the four progress percentages shown in the mockup's sidebar.

**blueprint_insights** — individual insights inside a blueprint. `category` maps to
the mockup's "Key Areas" (theme, strength, growth_area, current_focus, core_value,
identity). `status` implements the spec's required three-tier language:
`observation → developing_pattern → strong_recurring_pattern`. `confidence` is a
separate low/medium/high signal so the UI can visually distinguish certainty from
recurrence.

**evidence** — the traceability layer. Every row must point to a real
`journal_entry_id` or `ai_message_id` (enforced by a CHECK constraint) — the AI is
architecturally incapable of inserting evidence that isn't backed by an actual
record, which satisfies "do not fabricate evidence."

**ai_conversations / ai_messages** — the floating companion chatbox. `ai_messages`
stores `context_used` (jsonb) recording exactly which journal entries / insights
were sent to Claude for that turn — an audit trail for the context-selection
requirement.

**ai_analysis_runs** — one row per batch analysis job (new journal entry(ies) →
Claude → insights). Prevents re-analyzing the same entries repeatedly and gives
admin a real "AI Interactions" metric instead of an estimate.

**activity_events** — minimal event log (`user_registered`, `journal_entry_created`,
`ai_conversation_started`, `ai_analysis_run`, `blueprint_insight_generated`, `login`)
powering the admin Overview/Analytics charts without a separate analytics platform.

## Row Level Security

- **journal_entries, evidence, ai_conversations, ai_messages**: owner-only, full
  stop — no admin bypass. The spec is explicit that admin must not see journal
  content, so these tables have no admin-read policy at all.
- **profiles, blueprints, blueprint_insights, ai_analysis_runs**: owner can
  read/write their own; admins can additionally *read* (for the admin analytics
  views) via an `is_admin()` `security definer` helper function.
- **activity_events**: any authenticated user (or the server, via `user_id is
  null` for system events) can insert; only admins can select — this is the
  table the admin Overview/Analytics screens query.
- All AI-generated writes (insights, evidence, blueprint updates) happen through
  server-side Server Actions using the user's authenticated session — the app
  never lets a client insert directly into `blueprint_insights` or `evidence`.
  RLS is the defense-in-depth backstop, not the primary write path.

## Indexes

Foreign keys and frequently-filtered columns (`user_id`, `category`,
`entry_date`, `event_type`, `created_at`) are indexed. No full-text or vector
index in V1 per the spec's "no unnecessary vector databases" constraint —
journal search in V1 is a simple `ilike`/trigram filter, which can be added as
a follow-up index (`pg_trgm`) if search volume warrants it.
