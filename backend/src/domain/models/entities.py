from datetime import datetime
from src.domain.models.enums import ReviewChannelsEnum

class Review:
    """
    Domain entity representing a customer review.
    
    Attributes:
        review_id: Unique identifier for the customer review.
        created_at: Timestamp indicating when the review was created.
        channel: The origin channel of the review, mapped using the ReviewChannelEnum.
        customer_name: The name of the customer who provided the review.
        review_message: The feedback content provided by the customer.
    """
    
    review_id: str
    created_at: datetime
    channel: ReviewChannelsEnum
    customer_name: str
    message: str