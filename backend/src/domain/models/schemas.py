from typing import List
from datetime import datetime
from pydantic import BaseModel, Field
from src.domain.models.enums import ReviewChannelsEnum

class ReviewRequest(BaseModel):
    """Request to create a new review. """
    
    channel: ReviewChannelsEnum
    customer_name: str = Field(..., max_length=100)
    message: str = Field(..., max_length=100)
    
class ReviewResponse(BaseModel):
    """Response for review creation. """
    
    review_id: str
    created_at: datetime
    channel: ReviewChannelsEnum
    customer_name: str
    message: str

class GetReviewResponse(BaseModel):
    """Base response class representing individual responses"""
    created_at: datetime
    channel: ReviewChannelsEnum
    customer_name: str
    message: str   
 
class ListReviewsResponse(BaseModel):
    """Response containing a list of reviews."""
    reviews: List[GetReviewResponse] 