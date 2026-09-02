-- ============================================================
-- BOWO — Migration 002: first_name/last_name instead of full_name
-- Run this AFTER 001_init_schema.sql, on top of an existing database.
-- ============================================================

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text;

-- Best-effort backfill for any existing rows: split full_name on the
-- first space. Fine for a dev/test dataset. If you already have real
-- users with full_name set, review the result before relying on it —
-- multi-word first names or single-word full names will split
-- imperfectly.
update public.profiles
set
  first_name = coalesce(first_name, split_part(full_name, ' ', 1)),
  last_name = coalesce(
    last_name,
    nullif(trim(substring(full_name from position(' ' in full_name) + 1)), '')
  )
where full_name is not null;

alter table public.profiles drop column if exists full_name;

-- Replace the signup trigger to populate first_name/last_name instead.
-- Falls back to Google's given_name/family_name claims when the
-- first_name/last_name keys aren't present (e.g. for OAuth signups,
-- where we don't control what's in raw_user_meta_data the way we do
-- for the email/password form).
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'given_name'),
    coalesce(new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'family_name')
  );

  insert into public.activity_events (user_id, event_type)
  values (new.id, 'user_registered');

  return new;
end;
$$ language plpgsql security definer;
