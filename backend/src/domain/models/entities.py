from datetime import datetime
from src.domain.models.enums import ReviewChannelsEnum

class Review:
    """
    Domain entity representing a customer review.
    
    Attributes:
        review_id:
        created_at:
        source:
        customer_name:
        review_message:
    """
    
    review_id: str
    created_at: datetime
    channel: ReviewChannelsEnum
    customer_name: str
    message: str