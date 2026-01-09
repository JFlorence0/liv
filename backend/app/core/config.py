from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Liv API"
    environment: str = "development"
    database_url: str = "postgresql://user:pass@localhost:5436/liv"
    supabase_url: str = "https://your-project.supabase.co"
    supabase_anon_key: str = "your-anon-key"
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
