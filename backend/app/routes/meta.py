from fastapi import APIRouter

from app.utils.pillars import PILLAR_KEYS, PILLAR_META

router = APIRouter()


@router.get("/pillars")
def get_pillars() -> dict:
    return {"keys": PILLAR_KEYS, "meta": PILLAR_META}
