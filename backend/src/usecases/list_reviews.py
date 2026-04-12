from typing import List
from src.domain.models.schemas import ListReviewsResponse, GetReviewResponse
from src.domain.repositories.review_repository import ReviewRepository

class ListReviewsUseCase:
    def __init__(self, repository: ReviewRepository):
        self.repository = repository
        
    def execute(self) -> ListReviewsResponse:
        reviews_entities = self.repository.list()
        
        reviews_list: List[GetReviewResponse] = []
        
        for review in reviews_entities:
            review_response = GetReviewResponse(
                created_at=review.created_at,
                channel=review.channel,
                customer_name=review.customer_name,
                message=review.message
            )
            reviews_list.append(review_response)
            
        return ListReviewsResponse(reviews=reviews_list)