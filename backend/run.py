from contextlib import asynccontextmanager
from fastapi import FastAPI
from src.routers import review_routers
from src.infrastructure.database.connection import engine, Base
from src.settings import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title=settings.api_title, 
    version=settings.api_version,
    lifespan=lifespan
)

app.include_router(review_routers.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)