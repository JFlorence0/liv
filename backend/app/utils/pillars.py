from typing import Dict, List

PILLAR_META: Dict[str, Dict[str, str]] = {
    "food_nutrition": {
        "label": "Food & nutrition",
        "slug": "food-nutrition",
        "icon": "/food-nutrition.svg",
    },
    "movement_exercise": {
        "label": "Movement & Exercise",
        "slug": "exercise-movement",
        "icon": "/exercise-movement.svg",
    },
    "drugs_supplements": {
        "label": "Drugs & Supplements",
        "slug": "longevity-drugs",
        "icon": "/longevity-drugs.svg",
    },
    "sleep_recovery": {
        "label": "Sleep & Recovery",
        "slug": "better-sleep",
        "icon": "/better-sleep.svg",
    },
    "sexual_health": {
        "label": "Sexual Health",
        "slug": "sexual-health",
        "icon": "/sexual-health.svg",
    },
    "mental_fitness": {
        "label": "Mental Fitness",
        "slug": "mental-fitness",
        "icon": "/social-connection.svg",
    },
    "preventive_healthcare": {
        "label": "Preventive Healthcare",
        "slug": "preventive-healthcare",
        "icon": "/preventive-healthcare.svg",
    },
}

PILLAR_KEYS: List[str] = list(PILLAR_META.keys())

PILLAR_SCHEDULE: Dict[str, str] = {
    "Monday": "movement_exercise",
    "Tuesday": "food_nutrition",
    "Wednesday": "mental_fitness",
    "Thursday": "drugs_supplements",
    "Friday": "preventive_healthcare",
    "Saturday": "sexual_health",
    "Sunday": "sleep_recovery",
}
