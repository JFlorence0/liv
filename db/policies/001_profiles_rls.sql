-- Enable RLS for profiles table
alter table public.profiles enable row level security;

-- Users can view their own profile
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

-- Users can insert their own profile
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

-- Users can update their own profile
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);
