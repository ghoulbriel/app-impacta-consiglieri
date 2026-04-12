import uuid
from datetime import datetime, timezone
from src.infrastructure.database.repositories import SQLReviewRepository
from src.domain.models.entities import Review
from src.domain.models.enums import ReviewChannelsEnum

def test_sql_review_repository_save(db_session):
    repository = SQLReviewRepository(db_session)
    
    new_review = Review()
    new_review.review_id = str(uuid.uuid4())
    new_review.created_at = datetime.now(timezone.utc)
    new_review.channel = ReviewChannelsEnum.ESTABELECIMENTO
    new_review.customer_name = "Fulano da Silva"
    new_review.message = "O estabelecimento é muito limpo e organizado."
    
    saved_review = repository.save(new_review)
    
    assert saved_review.review_id == new_review.review_id
    assert saved_review.customer_name == "Fulano da Silva"
    
def test_sql_review_repository_list(db_session):
    repository = SQLReviewRepository(db_session)

    new_review = Review()
    new_review.review_id = str(uuid.uuid4())
    new_review.created_at = datetime.now(timezone.utc)
    new_review.channel = ReviewChannelsEnum.LOJA_VIRTUAL
    new_review.customer_name = "Maria da Silva"
    new_review.message = "Ótima experiência de compra."
    
    repository.save(new_review)
    
    reviews_list = repository.list()
    
    assert len(reviews_list) == 1
    assert reviews_list[0].customer_name == "Maria da Silva"
    assert reviews_list[0].message == "Ótima experiência de compra."
    assert reviews_list[0].channel == "LOJA VIRTUAL"