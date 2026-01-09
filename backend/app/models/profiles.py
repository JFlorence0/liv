from datetime import datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, field_validator


class ProfileBase(BaseModel):
    first_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    sex: Optional[str] = None
    height: Optional[float] = None
    height_unit: Literal["in", "cm"] = "in"
    weight: Optional[float] = None
    weight_unit: Literal["lb", "kg"] = "lb"
    time_zone: Optional[str] = None
    basic_info_completed: bool = False

    @field_validator("first_name")
    @classmethod
    def normalize_first_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        trimmed = value.strip()
        return trimmed or None

    @field_validator("age")
    @classmethod
    def validate_age(cls, value: Optional[int]) -> Optional[int]:
        if value is None:
            return None
        if value < 0 or value > 120:
            raise ValueError("Age must be between 0 and 120.")
        return value

    @field_validator("sex")
    @classmethod
    def normalize_sex(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        normalized = value.strip().lower()
        if not normalized:
            return None
        if normalized not in {"male", "female"}:
            raise ValueError("Sex must be either 'male' or 'female'.")
        return normalized

    @field_validator("height")
    @classmethod
    def validate_height(cls, value: Optional[float]) -> Optional[float]:
        if value is None:
            return None
        if value <= 0:
            raise ValueError("Height must be a positive number.")
        return value

    @field_validator("weight")
    @classmethod
    def validate_weight(cls, value: Optional[float]) -> Optional[float]:
        if value is None:
            return None
        if value <= 0:
            raise ValueError("Weight must be a positive number.")
        return value

    @field_validator("time_zone")
    @classmethod
    def normalize_time_zone(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        trimmed = value.strip()
        return trimmed or None


class ProfileCreate(ProfileBase):
    id: UUID


class ProfileUpdate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
