from src.usecases.create_review import CreateReviewUseCase
from src.domain.models.schemas import ReviewRequest
from src.domain.models.enums import ReviewChannelsEnum
from src.domain.models.entities import Review

class MockReviewRepository:
    def save(self, review: Review) -> Review:
        return review

def test_create_review_usecase_success():
    repository = MockReviewRepository()
    usecase = CreateReviewUseCase(repository)
    
    request = ReviewRequest(
        channel=ReviewChannelsEnum.WHATSAPP,
        customer_name="Fulano da Silva",
        message="Adorei o atendimento!"
    )
    
    response = usecase.execute(request)
    
    assert response.customer_name == "Fulano da Silva"
    assert response.channel == ReviewChannelsEnum.WHATSAPP
    assert response.message == "Adorei o atendimento!"
    assert response.review_id is not None
    assert response.created_at is not None