from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.domain.models.schemas import FeedbackReportResponse
from src.infrastructure.database.connection import get_db
from src.infrastructure.database.repositories import SQLReviewRepository
from src.usecases.generate_feedback_report import GenerateFeedbackReportUseCase

router = APIRouter(prefix="/report", tags=["Report"])

@router.get("/feedback", response_model=FeedbackReportResponse, status_code=status.HTTP_200_OK)
def get_feedback_report(db: Session = Depends(get_db)):
    repository = SQLReviewRepository(db)
    usecase = GenerateFeedbackReportUseCase(repository)
    return usecase.execute()