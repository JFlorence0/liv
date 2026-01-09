# Codex Instructions for Liv (New Repo)

## Decisions (keep current)
- Architecture: Next.js frontend + FastAPI backend.
- Backend is shared by web and mobile clients.
- Background jobs required (plan for queue + worker).
- Keep frontend React component model; Next.js is the React framework for web.

- Containerize with Docker.
- Use Docker Compose (docker compose, not docker-compose).
## Goals
- Fast launch without sacrificing long-term scalability.
- Clean separation of web UI and backend API.

## Legacy Reference
- Legacy repo lives at `../liv-monolith` from this repo.
- When needed, cd to `../liv-monolith` to inspect old code or migrate.
