from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    api_title: str = "Consiglieri API"
    api_version: str = "1.0.0"
    database_url: str = "postgresql://user:password@db:5432/consiglieri"
    gemini_api_key: str = ""

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()