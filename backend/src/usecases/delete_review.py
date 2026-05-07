from fastapi import HTTPException, status
from src.domain.repositories.review_repository import ReviewRepository

class DeleteReviewUseCase:
    def __init__(self, repository: ReviewRepository):
        self.repository = repository
        
    def execute(self, review_id: str) -> None:
        success = self.repository.delete(review_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Review with id {review_id} not found"
            )
        return None