from sqlalchemy.orm import Session
from src.domain.repositories.review_repository import ReviewRepository
from src.domain.models.entities import Review
from src.infrastructure.database.models import ReviewORM

class SQLReviewRepository(ReviewRepository):
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def save(self, review: Review) -> Review:
        db_review = ReviewORM(
            review_id=review.review_id,
            created_at=review.created_at,
            channel=review.channel.value,
            customer_name=review.customer_name,
            review_message=review.message
        )
        self.db_session.add(db_review)
        self.db_session.commit()
        return review