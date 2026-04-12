from fastapi import APIRouter, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from src.domain.models.schemas import ReviewRequest, ReviewResponse, ListReviewsResponse
from src.infrastructure.database.connection import get_db
from src.infrastructure.database.repositories import SQLReviewRepository
from src.usecases.create_review import CreateReviewUseCase
from src.usecases.list_reviews import ListReviewsUseCase


router = APIRouter(prefix="/review", tags=["Review"])

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(request: ReviewRequest, db: Session = Depends(get_db)):
    repository = SQLReviewRepository(db)
    usecase = CreateReviewUseCase(repository)
    return usecase.execute(request)

@router.get("", response_model=ListReviewsResponse, status_code=status.HTTP_200_OK)
def list_review(db: Session = Depends(get_db)):
    repository = SQLReviewRepository(db)
    usecase = ListReviewsUseCase(repository)
    return usecase.execute()