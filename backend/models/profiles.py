from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ProfileBase(BaseModel):
    first_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    sex: Optional[str] = None
    height: Optional[float] = None
    height_unit: str = "in"
    weight: Optional[float] = None
    weight_unit: str = "lb"
    time_zone: Optional[str] = None
    basic_info_completed: bool = False


class ProfileCreate(ProfileBase):
    id: UUID


class ProfileUpdate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
