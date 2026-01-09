# Auth Inventory and Risks (Legacy)

## Summary
The legacy auth stack uses a custom JWT + cookie flow in Express, with both
email/password and Google OAuth. It includes token refresh logic in middleware
and a unified login/signup endpoint.

This document captures how it works today, what is safe, and what is risky.

## Current flows (legacy)
- Email/password login and signup are unified in one flow.
- Google OAuth login is handled server-side and can link to existing accounts.
- JWTs are stored in HttpOnly cookies and also accepted via Authorization header.
- `/api/auth/me` is used by the frontend to validate session state.
- Token refresh is performed by the backend when a token is near expiry.

## Good practices observed
- HttpOnly cookies for JWTs (prevents JS access).
- `bcrypt` for password hashing.
- Centralized `/auth/me` endpoint for session validation.

## Critical risks and weaknesses
- **Account takeover risk:** If a user exists without `password_hash` (Google-only),
  the system accepts the first password submitted and sets it. This allows anyone
  who knows the email to set a password and log in.
- **Long-lived tokens:** JWTs default to 365 days with sliding refresh, expanding
  blast radius if a token leaks.
- **Refresh flow decodes expired tokens** and re-issues if not too old. This is
  fragile and commonly exploited if edge cases slip.
- **DEV JWT secret fallback** exists in production code.
- **Auth middleware mutates cookies** and refreshes tokens on requests, increasing
  complexity and surface area.
- **Cookie handling complexity:** multiple sameSite variations to support OAuth
  creates inconsistent behavior across browsers.

## Files reviewed
- `../liv-monolith/backend/src/services/unified-auth-service.js`
- `../liv-monolith/backend/src/middleware/auth-middleware.js`
- `../liv-monolith/backend/src/utils/jwt-utils.js`
- `../liv-monolith/backend/src/utils/cookie-utils.js`
- `../liv-monolith/frontend/utils/auth.ts`
- `../liv-monolith/frontend/utils/oauth-state-manager.ts`

## Incident observed
- Logging in with Google, then later logging in with a new password for the same
  email is accepted. This is due to the "set password if none exists" behavior.
  This is a must-fix before production.

## Migration implications (Supabase)
- Supabase Auth should replace custom JWT creation and refresh logic.
- Require email verification before allowing password-based login.
- Disallow setting a password on OAuth-only accounts without verified ownership.
- Backend should verify Supabase JWTs (JWKS) and never mint its own auth tokens.
