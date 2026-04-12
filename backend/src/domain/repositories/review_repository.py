from abc import ABC, abstractmethod
from typing import List
from src.domain.models.entities import Review

class ReviewRepository(ABC):
    """Abstract class used for adding a new review in the database."""
    @abstractmethod
    def save(self, review: Review) -> Review:
        pass
    
    @abstractmethod
    def list(self) -> List[Review]:
        pass