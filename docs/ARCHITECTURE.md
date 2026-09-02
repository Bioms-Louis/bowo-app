# BOWO V1 — Architecture

## Stack
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui · Supabase (Postgres,
Auth, Storage) · Anthropic Claude API · Vercel · Web3Forms.

## Project structure

```
app/
  (marketing)/            landing page, public routes
  (auth)/                 login, signup, forgot/reset password
  (app)/
    dashboard/
    journal/
    blueprint/
    insights/
    evidence/
  admin/
    overview/
    users/
    analytics/
  api/
    ai/chat/route.ts          AI companion chatbox endpoint
    ai/analyze/route.ts       journal → insight analysis endpoint

components/
  ui/                     shadcn primitives
  layout/                 shells, nav, sidebar
  dashboard/  journal/  blueprint/  evidence/  admin/
  ai/                     AIChatWidget, InsightCard, EvidenceCard

lib/
  supabase/               server.ts, client.ts, middleware.ts
  ai/                      client.ts, prompts.ts, context.ts, analysis.ts, chat.ts, schemas.ts
  db/                      typed query helpers per entity
  utils/

types/                    generated Supabase types + shared DTOs
```

`(app)` routes sit behind auth middleware; `admin` routes sit behind both auth
middleware and a server-side role check (never a client-side-only guard).

## Data flow — journal → insight → blueprint

```
User writes entry (Journal UI)
  → Server Action: createJournalEntry()
  → insert into journal_entries (RLS: user_id = auth.uid())
  → if ai_prompt_requested: enqueue analysis (fire immediately in V1, no queue infra)
  → lib/ai/context.ts builds a bounded context:
      - the new entry
      - last N entries in the same category (relevance, not everything)
      - current blueprint_insights (so Claude sees what's already known)
  → lib/ai/analysis.ts calls Claude with a structured-output prompt
  → lib/ai/schemas.ts (Zod) validates the JSON response
  → on valid response:
      - upsert blueprint_insights (status/confidence per spec's 3-tier model)
      - insert evidence rows, each FK'd to the real journal_entry_id used
      - update blueprints percentages
      - insert ai_analysis_runs + activity_events rows
  → on invalid/failed response: mark ai_analysis_runs.status = 'failed', no
    partial writes, user sees a friendly "couldn't update your Blueprint this
    time" state — never a raw error or a fabricated insight
```

## AI companion chatbox

Client widget (`components/ai/AIChatWidget.tsx`) is a fixed floating button +
panel mounted once in the `(app)` layout, not a separate page. It posts to
`api/ai/chat`, which:
1. loads/creates the active `ai_conversations` row for the user,
2. builds context via the same `lib/ai/context.ts` module (recent entries +
   active insights — never the full journal history),
3. calls Claude with conversation history,
4. stores both the user and assistant `ai_messages` rows with `context_used`
   recorded for auditability.

## Admin dashboard

Server Components query `activity_events`, `blueprints`, `journal_entries`
(aggregate counts only, never row content) via a service-role Supabase client
that's only reachable from routes protected by the `is_admin()` check. Charts
in the mockup (Platform Activity, User Growth, Recent Insights & Trends) are
straightforward `group by date`/`count` queries — no separate analytics
service.

## Security summary

- Anthropic and Supabase service-role keys live only in server-side env vars,
  never shipped to the client.
- All Claude API calls happen inside Server Actions/Route Handlers.
- RLS enforced at the database layer as defense-in-depth even though the app
  layer also checks ownership.
- Admin routes check `profiles.role = 'admin'` server-side on every request,
  not just at login.
- Zod validates both user input (forms) and AI output (structured JSON) before
  anything is persisted.

## What's intentionally NOT here

No queues, no vector DB, no microservices, no custom email server, no custom
auth — per the spec's "don't overengineer" and "prefer third-party services"
principles. See `FUTURE_FEATURES.md` for what's deferred and why.
