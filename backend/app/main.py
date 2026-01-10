from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes.profiles import router as profiles_router
from app.routes.meta import router as meta_router
from app.routes.nudges import router as nudges_router

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


app.include_router(profiles_router, prefix="/profiles", tags=["profiles"])
app.include_router(meta_router, prefix="/meta", tags=["meta"])
app.include_router(nudges_router, prefix="/nudges", tags=["nudges"])
