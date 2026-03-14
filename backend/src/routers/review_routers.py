from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.domain.models.schemas import ReviewRequest, ReviewResponse
from src.infrastructure.database.connection import get_db
from src.infrastructure.database.repositories import SQLReviewRepository
from src.usecases.create_review import CreateReviewUseCase

router = APIRouter(prefix="/review", tags=["Review"])

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(request: ReviewRequest, db: Session = Depends(get_db)):
    repository = SQLReviewRepository(db)
    usecase = CreateReviewUseCase(repository)
    return usecase.execute(request)