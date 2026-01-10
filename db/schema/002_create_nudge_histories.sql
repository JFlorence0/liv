-- Enable extension for UUIDs if needed
create extension if not exists "pgcrypto";

create table if not exists public.nudge_histories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pillar text not null,
  nudge_type text not null check (nudge_type in ('nudge', 'challenge')),
  content jsonb not null,
  subject text not null,
  score integer,
  completed boolean not null default false,
  delivered boolean not null default false,
  delivery_method text check (delivery_method in ('email', 'sms', 'both')),
  difficulty integer not null default 1,
  yes boolean not null default false,
  no boolean not null default false,
  challenge_taken_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nudge_histories_user_id_idx
  on public.nudge_histories (user_id);

create index if not exists nudge_histories_pillar_idx
  on public.nudge_histories (pillar);

-- Auto-update updated_at
create or replace function public.set_nudge_histories_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists nudge_histories_set_updated_at on public.nudge_histories;

create trigger nudge_histories_set_updated_at
before update on public.nudge_histories
for each row
execute function public.set_nudge_histories_updated_at();
