from typing import Any

import httpx
from fastapi import HTTPException, status

from app.core.config import settings


async def get_supabase_user(
    client: httpx.AsyncClient, authorization: str
) -> dict[str, Any]:
    user_res = await client.get(
        f"{settings.supabase_url}/auth/v1/user",
        headers={
            "Authorization": authorization,
            "apikey": settings.supabase_anon_key,
        },
    )
    if user_res.status_code != status.HTTP_200_OK:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session.",
        )
    return user_res.json()
