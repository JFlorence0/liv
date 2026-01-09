# Liv Backend (FastAPI)

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker

```bash
docker compose up --build
```

Run this from the repo root so both services can be included.
Frontend will be available on `http://localhost:3001`.

## Configuration

- Copy `backend/.env.example` to `backend/.env` for local development.
- In production, set the same values as environment variables.

## Endpoints

- `GET /health` -> `{ "status": "ok" }`
