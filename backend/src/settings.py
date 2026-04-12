from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    api_title: str = "Consiglieri API"
    api_version: str = "0.1.5"
    database_url: str = "postgresql://user:password@db:5432/consiglieri"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()