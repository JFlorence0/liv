alter table public.nudge_histories enable row level security;

-- Allow users to select their own nudge history
create policy "nudge_histories_select_own"
on public.nudge_histories
for select
to authenticated
using (auth.uid() = user_id);

-- Allow users to insert their own nudge history (server-side generation)
create policy "nudge_histories_insert_own"
on public.nudge_histories
for insert
to authenticated
with check (auth.uid() = user_id);

-- Allow users to update their own nudge history (e.g., mark complete)
create policy "nudge_histories_update_own"
on public.nudge_histories
for update
to authenticated
using (auth.uid() = user_id);
