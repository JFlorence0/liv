from __future__ import annotations

from datetime import datetime
from typing import Any, Dict

import httpx

from app.core.config import settings
from app.utils.pillars import PILLAR_META, PILLAR_SCHEDULE
from app.utils.timezones import get_local_day_range


async def fetch_profile(
    client: httpx.AsyncClient, user_id: str, authorization: str
) -> dict[str, Any] | None:
    profile_res = await client.get(
        f"{settings.supabase_url}/rest/v1/profiles",
        params={"select": "first_name,time_zone,updated_at", "id": f"eq.{user_id}"},
        headers={
            "apikey": settings.supabase_anon_key,
            "Authorization": authorization,
        },
    )
    if profile_res.status_code >= 400:
        return None
    data = profile_res.json()
    return data[0] if data else None


async def fetch_nudge_by_type(
    client: httpx.AsyncClient,
    user_id: str,
    nudge_type: str,
    start_utc: datetime,
    end_utc: datetime,
    authorization: str,
) -> dict[str, Any] | None:
    params = [
        ("select", "*"),
        ("user_id", f"eq.{user_id}"),
        ("nudge_type", f"eq.{nudge_type}"),
        ("created_at", f"gte.{start_utc.isoformat()}"),
        ("created_at", f"lt.{end_utc.isoformat()}"),
        ("order", "created_at.desc"),
        ("limit", "1"),
    ]
    nudge_res = await client.get(
        f"{settings.supabase_url}/rest/v1/nudge_histories",
        params=params,
        headers={
            "apikey": settings.supabase_anon_key,
            "Authorization": authorization,
        },
    )
    if nudge_res.status_code >= 400:
        return None
    data = nudge_res.json()
    return data[0] if data else None


async def create_nudge(
    client: httpx.AsyncClient,
    user_id: str,
    pillar_key: str,
    nudge_type: str,
    day: str,
    first_name: str | None,
    authorization: str,
) -> dict[str, Any]:
    label = PILLAR_META.get(pillar_key, {}).get("label", pillar_key)
    greeting = first_name or "there"
    content = {
        "title": f"{day} = {label}",
        "content": f"Hi {greeting}! Your personalized {label.lower()} nudge is ready.",
        "day": day,
        "pillar": pillar_key,
    }
    subject = content["title"]

    create_res = await client.post(
        f"{settings.supabase_url}/rest/v1/nudge_histories",
        headers={
            "apikey": settings.supabase_anon_key,
            "Authorization": authorization,
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        json={
            "user_id": user_id,
            "pillar": pillar_key,
            "nudge_type": nudge_type,
            "content": content,
            "subject": subject,
        },
    )
    create_res.raise_for_status()
    return create_res.json()[0]


async def delete_today_nudges(
    client: httpx.AsyncClient,
    user_id: str,
    start_utc: datetime,
    end_utc: datetime,
    authorization: str,
) -> None:
    for nudge_type in ("nudge", "challenge"):
        params = [
            ("user_id", f"eq.{user_id}"),
            ("nudge_type", f"eq.{nudge_type}"),
            ("created_at", f"gte.{start_utc.isoformat()}"),
            ("created_at", f"lt.{end_utc.isoformat()}"),
        ]
        await client.delete(
            f"{settings.supabase_url}/rest/v1/nudge_histories",
            params=params,
            headers={
                "apikey": settings.supabase_anon_key,
                "Authorization": authorization,
            },
        )


async def get_or_generate_today_nudges(
    client: httpx.AsyncClient, user_id: str, authorization: str
) -> Dict[str, Any]:
    profile = await fetch_profile(client, user_id, authorization)
    time_zone = profile.get("time_zone") if profile else None
    first_name = profile.get("first_name") if profile else None

    date_str, start_utc, end_utc, weekday = get_local_day_range(time_zone)
    pillar_key = PILLAR_SCHEDULE.get(weekday, "food_nutrition")

    nudge = await fetch_nudge_by_type(
        client, user_id, "nudge", start_utc, end_utc, authorization
    )
    challenge = await fetch_nudge_by_type(
        client, user_id, "challenge", start_utc, end_utc, authorization
    )

    profile_updated_at = None
    if profile and profile.get("updated_at"):
        profile_updated_at = datetime.fromisoformat(profile["updated_at"].replace("Z", "+00:00"))

    should_regenerate = False
    for record in (nudge, challenge):
        if record and profile_updated_at and record.get("created_at"):
            created_at = datetime.fromisoformat(record["created_at"].replace("Z", "+00:00"))
            if profile_updated_at > created_at:
                should_regenerate = True

    if not nudge or not challenge or should_regenerate:
        await delete_today_nudges(client, user_id, start_utc, end_utc, authorization)
        nudge = await create_nudge(
            client, user_id, pillar_key, "nudge", weekday, first_name, authorization
        )
        challenge = await create_nudge(
            client, user_id, pillar_key, "challenge", weekday, first_name, authorization
        )

    return {"nudge": nudge, "challenge": challenge}


async def invalidate_today_nudges(
    client: httpx.AsyncClient, user_id: str, time_zone: str | None, authorization: str
) -> None:
    _, start_utc, end_utc, _ = get_local_day_range(time_zone)
    await delete_today_nudges(client, user_id, start_utc, end_utc, authorization)
