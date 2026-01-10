from datetime import datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel


class NudgeContent(BaseModel):
    title: str
    content: str
    day: Optional[str] = None
    pillar: Optional[str] = None


Pillar = Literal[
    "food_nutrition",
    "movement_exercise",
    "drugs_supplements",
    "sleep_recovery",
    "sexual_health",
    "mental_fitness",
    "preventive_healthcare",
]


class NudgeHistoryBase(BaseModel):
    user_id: UUID
    pillar: Pillar
    nudge_type: Literal["nudge", "challenge"]
    content: NudgeContent
    subject: str
    score: Optional[int] = None
    completed: bool = False
    delivered: bool = False
    delivery_method: Optional[Literal["email", "sms", "both"]] = None
    difficulty: int = 1
    yes: bool = False
    no: bool = False
    challenge_taken_at: Optional[datetime] = None


class NudgeHistoryCreate(NudgeHistoryBase):
    pass


class NudgeHistoryUpdate(BaseModel):
    pillar: Optional[str] = None
    nudge_type: Optional[Literal["nudge", "challenge"]] = None
    content: Optional[NudgeContent] = None
    subject: Optional[str] = None
    score: Optional[int] = None
    completed: Optional[bool] = None
    delivered: Optional[bool] = None
    delivery_method: Optional[Literal["email", "sms", "both"]] = None
    difficulty: Optional[int] = None
    yes: Optional[bool] = None
    no: Optional[bool] = None
    challenge_taken_at: Optional[datetime] = None


class NudgeHistory(NudgeHistoryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
