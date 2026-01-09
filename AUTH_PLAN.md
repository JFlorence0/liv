# Auth Plan (Target)

## Decisions
- Use Supabase Auth for user authentication (email + OAuth).
- Frontend uses Supabase client for login/session management.
- Backend (FastAPI) validates Supabase JWTs; it does not mint auth tokens.
- No custom refresh token logic; rely on Supabase session handling.
- Email verification required before password login.
- OAuth accounts cannot set a password without verified ownership.

## Immediate next step
- Create a Supabase project and obtain `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
