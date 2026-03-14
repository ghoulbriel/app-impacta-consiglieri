from datetime import datetime
from pydantic import BaseModel
from src.domain.models.enums import ReviewChannelsEnum

class ReviewRequest(BaseModel):
    """Request to create a new review."""
    
    channel: ReviewChannelsEnum
    customer_name: str
    message: str
    
    
class ReviewResponse(BaseModel):
    """Response for review creation."""
    
    review_id: str
    created_at: datetime
    channel: ReviewChannelsEnum
    customer_name: str
    message: str