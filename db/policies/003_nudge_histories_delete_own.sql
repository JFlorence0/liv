create policy "nudge_histories_delete_own"
on public.nudge_histories
for delete
to authenticated
using (auth.uid() = user_id);
