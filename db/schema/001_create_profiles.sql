-- Enable extension for UUIDs if needed
create extension if not exists "pgcrypto";

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  age integer,
  gender text,
  sex text,
  height numeric,
  height_unit text not null default 'in' check (height_unit in ('in', 'cm')),
  weight numeric,
  weight_unit text not null default 'lb' check (weight_unit in ('lb', 'kg')),
  time_zone text,
  basic_info_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();
