import httpx
from fastapi import APIRouter, Header, HTTPException, status

from app.core.config import settings
from app.services.nudges import get_or_generate_today_nudges
from app.utils.supabase import get_supabase_user

router = APIRouter()


@router.get("/today")
async def get_today_nudge(
    authorization: str | None = Header(default=None),
) -> dict:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization token.",
        )

    async with httpx.AsyncClient(timeout=10) as client:
        user_data = await get_supabase_user(client, authorization)
        user_id = user_data.get("id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to resolve user.",
            )

        result = await get_or_generate_today_nudges(client, user_id, authorization)
        return result
