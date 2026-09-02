# BOWO — Future Features (explicitly out of V1 scope)

Per the V1 spec, these are documented but not implemented. Do not build these
without explicit sign-off, even if they seem "technically easy" mid-build.

- **Prayer system** — dedicated prayer journal/tracker, separate from general Journal.
- **Scripture library / Scripture Intelligence** — verse tagging, scripture-linked
  insights, reading plans.
- **Timeline** — a chronological visual of the user's journey (appears as a nav
  item in the mockups but is not a V1 deliverable per the written scope).
- **Notifications / push notifications** — reminders to journal, insight alerts.
- **Goals module (dedicated)** — beyond the existing "goals" journal category.
- **Subscription / payments** — any paid tier, billing, Stripe integration.
- **Native mobile apps** — iOS/Android; V1 is responsive web only.
- **Advanced analytics platform** — cohort analysis, funnels, retention curves
  beyond the basic counts/trends in the admin dashboard.
- **Advanced admin tools** — bulk user management, impersonation, content
  moderation tooling.
- **Community / social features** — public profiles, sharing, following.
- **Marketplace / complex recommendation engine.**
- **Semantic/vector search** — journal search in V1 is relational
  (`ilike`/trigram), not embeddings-based.
- **Multi-step AI agent behavior** — V1 AI is single-call analysis/chat, not an
  autonomous agent with tool use.

If any of these turn out to be a hard technical prerequisite for a V1 feature
to function (not just "nice to have"), note it here with the reason before
implementing, per the spec's scope-change rule.
