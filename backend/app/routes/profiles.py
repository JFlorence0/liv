from typing import Any

import httpx
from fastapi import APIRouter, Header, HTTPException, status

from app.core.config import settings
from app.models.profiles import ProfileUpdate

router = APIRouter()


@router.patch("/me")
async def update_profile(
    payload: ProfileUpdate,
    authorization: str | None = Header(default=None),
) -> dict[str, Any]:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization token.",
        )

    async with httpx.AsyncClient(timeout=10) as client:
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

        user_data = user_res.json()
        user_id = user_data.get("id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to resolve user.",
            )

        update_payload = payload.model_dump(exclude_unset=True, exclude_none=True)
        if not update_payload:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No profile fields provided.",
            )

        update_res = await client.patch(
            f"{settings.supabase_url}/rest/v1/profiles",
            params={"id": f"eq.{user_id}"},
            headers={
                "Authorization": authorization,
                "apikey": settings.supabase_anon_key,
                "Content-Type": "application/json",
                "Prefer": "return=representation",
            },
            json=update_payload,
        )

        if update_res.status_code >= 400:
            error_detail = update_res.json()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_detail,
            )

        return {"data": update_res.json()}
