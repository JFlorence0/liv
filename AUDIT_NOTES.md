# Liv audit concerns (for build reminders)

## Product state
- The product idea is solid and already has real functionality (AI coaching chat, automated nudges via email/SMS, roles).
- Current implementation is closer to a proof-of-concept than production-ready.

## Critical risks to address early
- Authentication/session handling has vulnerabilities; attacker could gain account access.
- Sensitive credentials have been stored in code; risk of leakage.
- Cross-user data access risks via API (IDOR-like issues).
- Logging and file outputs may include sensitive user data.
- Degraded behavior on failures (e.g., DB outages) can lead to silent data loss or inconsistent state.

## Engineering and operational concerns
- Safeguards/build-time checks are disabled; tooling inconsistent.
- Backend in JS; frontend in TS but type checks disabled (no TS safety).
- Excessive logging and temporary fallbacks; not suitable for production.
- Architecture feels like two services in one repo without monorepo tooling.

## Recommendations from audit
- Immediate: secure credentials, fix auth/session flow, enforce user data isolation, tighten security boundaries.
- Stabilize: re-enable automated checks, reduce logging, standardize tooling, make deploys repeatable.
- Longer-term: consider simpler unified architecture with mature auth; reduce custom security surface.

## Proposed direction
- A single Next.js full-stack app + managed auth can reduce risks from custom sessions.
- Consider Vercel AI SDK for chat; managed cron jobs for scheduled nudges.
