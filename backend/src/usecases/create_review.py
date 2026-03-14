import uuid
from datetime import datetime, timezone
from src.domain.models.schemas import ReviewRequest, ReviewResponse
from src.domain.models.entities import Review
from src.domain.repositories.review_repository import ReviewRepository

class CreateReviewUseCase:
    def __init__(self, repository: ReviewRepository):
        self.repository = repository

    def execute(self, request: ReviewRequest) -> ReviewResponse:
        review = Review()
        review.review_id = str(uuid.uuid4())
        review.created_at = datetime.now(timezone.utc)
        review.channel = request.channel
        review.customer_name = request.customer_name
        review.message = request.message

        self.repository.save(review)

        return ReviewResponse(
            review_id=review.review_id,
            created_at=review.created_at,
            channel=review.channel,
            customer_name=review.customer_name,
            message=review.message
        )