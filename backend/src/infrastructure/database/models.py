from sqlalchemy import Column, String, DateTime
from src.infrastructure.database.connection import Base

class ReviewORM(Base):
    __tablename__ = "reviews"

    review_id = Column(String, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False)
    channel = Column(String, nullable=False)
    customer_name = Column(String(100), nullable=False)
    review_message = Column(String(500), nullable=False)