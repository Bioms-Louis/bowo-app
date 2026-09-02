-- ============================================================
-- BOWO V1 — Initial Schema Migration
-- Target: Supabase Postgres
-- ============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- PROFILES
-- Extends auth.users (Supabase Auth). One row per user.
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  onboarding_completed boolean not null default false,
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);

-- ------------------------------------------------------------
-- JOURNAL ENTRIES
-- ------------------------------------------------------------
create table public.journal_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  content text not null,
  category text not null default 'reflection'
    check (category in ('reflection', 'goals', 'gratitude', 'lesson')),
  entry_date date not null default current_date,
  ai_prompt_requested boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index journal_entries_user_id_idx on public.journal_entries(user_id);
create index journal_entries_entry_date_idx on public.journal_entries(entry_date);
create index journal_entries_category_idx on public.journal_entries(category);

-- ------------------------------------------------------------
-- BLUEPRINTS
-- One "current" blueprint per user + versioned history.
-- ------------------------------------------------------------
create table public.blueprints (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  version int not null default 1,
  is_current boolean not null default true,
  who_you_are text,
  what_drives_you text,
  your_strengths text,
  your_impact text,
  core_purpose_statement text,
  maturity_percent int not null default 0 check (maturity_percent between 0 and 100),
  identity_clarity_percent int not null default 0,
  purpose_alignment_percent int not null default 0,
  impact_understanding_percent int not null default 0,
  calling_activation_percent int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blueprints_user_id_idx on public.blueprints(user_id);
create unique index blueprints_one_current_per_user
  on public.blueprints(user_id) where (is_current);

-- ------------------------------------------------------------
-- BLUEPRINT INSIGHTS
-- Individual AI-generated insights attached to a blueprint.
-- ------------------------------------------------------------
create table public.blueprint_insights (
  id uuid primary key default uuid_generate_v4(),
  blueprint_id uuid not null references public.blueprints(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null
    check (category in ('theme', 'strength', 'growth_area', 'current_focus', 'core_value', 'identity')),
  status text not null default 'observation'
    check (status in ('observation', 'developing_pattern', 'strong_recurring_pattern')),
  confidence text not null default 'low' check (confidence in ('low', 'medium', 'high')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blueprint_insights_blueprint_id_idx on public.blueprint_insights(blueprint_id);
create index blueprint_insights_user_id_idx on public.blueprint_insights(user_id);
create index blueprint_insights_category_idx on public.blueprint_insights(category);

-- ------------------------------------------------------------
-- EVIDENCE
-- Links an insight to the journal entry (or AI conversation)
-- that actually supports it. Never fabricated — always FK'd
-- to a real source row.
-- ------------------------------------------------------------
create table public.evidence (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  insight_id uuid not null references public.blueprint_insights(id) on delete cascade,
  journal_entry_id uuid references public.journal_entries(id) on delete cascade,
  source_type text not null default 'journal_entry'
    check (source_type in ('journal_entry', 'ai_conversation')),
  ai_message_id uuid, -- set only when source_type = 'ai_conversation' (FK added below)
  excerpt text not null,
  relevance_note text,
  created_at timestamptz not null default now(),
  constraint evidence_source_check check (
    (source_type = 'journal_entry' and journal_entry_id is not null)
    or (source_type = 'ai_conversation' and ai_message_id is not null)
  )
);

create index evidence_user_id_idx on public.evidence(user_id);
create index evidence_insight_id_idx on public.evidence(insight_id);
create index evidence_journal_entry_id_idx on public.evidence(journal_entry_id);

-- ------------------------------------------------------------
-- AI CONVERSATIONS + MESSAGES
-- Powers the floating AI companion chatbox.
-- ------------------------------------------------------------
create table public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index ai_conversations_user_id_idx on public.ai_conversations(user_id);

create table public.ai_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  context_used jsonb, -- record of which journal_entry_ids / insight_ids were sent as context
  created_at timestamptz not null default now()
);

create index ai_messages_conversation_id_idx on public.ai_messages(conversation_id);
create index ai_messages_user_id_idx on public.ai_messages(user_id);

alter table public.evidence
  add constraint evidence_ai_message_fk
  foreign key (ai_message_id) references public.ai_messages(id) on delete cascade;

-- ------------------------------------------------------------
-- AI ANALYSIS RUNS
-- Audit trail of each batch analysis job (journal -> insights).
-- Useful for admin metrics + debugging + not re-analyzing
-- the same entries repeatedly.
-- ------------------------------------------------------------
create table public.ai_analysis_runs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  triggered_by text not null default 'journal_entry_created'
    check (triggered_by in ('journal_entry_created', 'manual', 'scheduled')),
  journal_entry_ids uuid[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  insights_created int not null default 0,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index ai_analysis_runs_user_id_idx on public.ai_analysis_runs(user_id);

-- ------------------------------------------------------------
-- PRODUCT ANALYTICS (lightweight event log for admin dashboard)
-- ------------------------------------------------------------
create table public.activity_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  event_type text not null
    check (event_type in (
      'user_registered', 'journal_entry_created', 'ai_conversation_started',
      'ai_analysis_run', 'blueprint_insight_generated', 'login'
    )),
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index activity_events_type_idx on public.activity_events(event_type);
create index activity_events_created_at_idx on public.activity_events(created_at);

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.journal_entries
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.blueprints
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.blueprint_insights
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.ai_conversations
  for each row execute function public.set_updated_at();

-- ============================================================
-- Auto-create profile row on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');

  insert into public.activity_events (user_id, event_type)
  values (new.id, 'user_registered');

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.journal_entries enable row level security;
alter table public.blueprints enable row level security;
alter table public.blueprint_insights enable row level security;
alter table public.evidence enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.ai_analysis_runs enable row level security;
alter table public.activity_events enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- PROFILES: users can read/update their own row; admins can read all.
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- JOURNAL_ENTRIES: strictly private to owner. No admin read access
-- (spec: "Do not expose sensitive user journal content unnecessarily").
create policy "journal_select_own" on public.journal_entries
  for select using (auth.uid() = user_id);
create policy "journal_insert_own" on public.journal_entries
  for insert with check (auth.uid() = user_id);
create policy "journal_update_own" on public.journal_entries
  for update using (auth.uid() = user_id);
create policy "journal_delete_own" on public.journal_entries
  for delete using (auth.uid() = user_id);

-- BLUEPRINTS
create policy "blueprints_select_own_or_admin" on public.blueprints
  for select using (auth.uid() = user_id or public.is_admin());
create policy "blueprints_insert_own" on public.blueprints
  for insert with check (auth.uid() = user_id);
create policy "blueprints_update_own" on public.blueprints
  for update using (auth.uid() = user_id);

-- BLUEPRINT_INSIGHTS
create policy "insights_select_own_or_admin" on public.blueprint_insights
  for select using (auth.uid() = user_id or public.is_admin());
create policy "insights_insert_own" on public.blueprint_insights
  for insert with check (auth.uid() = user_id);
create policy "insights_update_own" on public.blueprint_insights
  for update using (auth.uid() = user_id);

-- EVIDENCE: private to owner only (references journal content).
create policy "evidence_select_own" on public.evidence
  for select using (auth.uid() = user_id);
create policy "evidence_insert_own" on public.evidence
  for insert with check (auth.uid() = user_id);

-- AI_CONVERSATIONS / AI_MESSAGES: private to owner only.
create policy "ai_conv_select_own" on public.ai_conversations
  for select using (auth.uid() = user_id);
create policy "ai_conv_insert_own" on public.ai_conversations
  for insert with check (auth.uid() = user_id);
create policy "ai_conv_update_own" on public.ai_conversations
  for update using (auth.uid() = user_id);

create policy "ai_msg_select_own" on public.ai_messages
  for select using (auth.uid() = user_id);
create policy "ai_msg_insert_own" on public.ai_messages
  for insert with check (auth.uid() = user_id);

-- AI_ANALYSIS_RUNS
create policy "analysis_runs_select_own_or_admin" on public.ai_analysis_runs
  for select using (auth.uid() = user_id or public.is_admin());

-- ACTIVITY_EVENTS: users can insert their own events; only admins can read
-- the aggregate feed (individual users don't need to browse this table).
create policy "activity_insert_own" on public.activity_events
  for insert with check (auth.uid() = user_id or user_id is null);
create policy "activity_select_admin_only" on public.activity_events
  for select using (public.is_admin());

-- Note: all AI-driven writes (insights, evidence, blueprint updates,
-- analysis runs) happen server-side via a service-role client in
-- Server Actions/Route Handlers, authenticated as the acting user's
-- session — never with a client-exposed key. RLS above is the backstop
-- for any direct client access.
