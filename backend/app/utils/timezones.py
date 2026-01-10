from __future__ import annotations

from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo


DEFAULT_TIMEZONE = "America/New_York"


def resolve_timezone(time_zone: str | None) -> ZoneInfo:
    if not time_zone:
        return ZoneInfo(DEFAULT_TIMEZONE)

    # Prefer IANA identifiers when available.
    if "/" in time_zone:
        try:
            return ZoneInfo(time_zone)
        except Exception:
            return ZoneInfo(DEFAULT_TIMEZONE)

    # Fallback for formatted strings like "(UTC-05:00) — City".
    return ZoneInfo(DEFAULT_TIMEZONE)


def get_local_day_range(time_zone: str | None) -> tuple[str, datetime, datetime, str]:
    tz = resolve_timezone(time_zone)
    now_local = datetime.now(tz)
    local_date = now_local.date()
    start_local = datetime.combine(local_date, datetime.min.time(), tz)
    end_local = start_local + timedelta(days=1)

    start_utc = start_local.astimezone(timezone.utc)
    end_utc = end_local.astimezone(timezone.utc)
    weekday = now_local.strftime("%A")

    return local_date.isoformat(), start_utc, end_utc, weekday
