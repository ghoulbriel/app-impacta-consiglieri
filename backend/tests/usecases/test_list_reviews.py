from datetime import datetime, timezone
from src.usecases.list_reviews import ListReviewsUseCase
from src.domain.models.enums import ReviewChannelsEnum
from src.domain.models.entities import Review

class MockReviewRepository:
    def list(self) -> list[Review]:
        review = Review()
        review.created_at = datetime.now(timezone.utc)
        review.channel = ReviewChannelsEnum.WHATSAPP.value
        review.customer_name = "Cliente Teste"
        review.message = "Mensagem de teste para listagem"
        return [review]

def test_list_reviews_usecase_success():
    repository = MockReviewRepository()
    usecase = ListReviewsUseCase(repository)
    
    response = usecase.execute()
    
    assert len(response.reviews) == 1
    assert response.reviews[0].customer_name == "Cliente Teste"
    assert response.reviews[0].message == "Mensagem de teste para listagem"
    assert response.reviews[0].created_at is not None