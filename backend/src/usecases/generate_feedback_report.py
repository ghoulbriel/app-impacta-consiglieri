from typing import List
from src.domain.repositories.review_repository import ReviewRepository
from src.infrastructure.clients.gemini_client import GeminiClient
from src.domain.models.schemas import FeedbackReportResponse
from fastapi import HTTPException, status

class GenerateFeedbackReportUseCase:
    def __init__(self, repository: ReviewRepository):
        self.repository = repository
        self.ai_client = GeminiClient()

    def execute(self) -> FeedbackReportResponse:
        reviews = self.repository.list()
        
        if not reviews:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No reviews found to generate a report."
            )

        reviews_text = "\n".join(
            [f"- Cliente: {r.customer_name} | Canal: {r.channel} | Mensagem: {r.message}" for r in reviews]
        )

        prompt_sentiment = (
            "Analise os feedbacks e defina o sentimento geral dos clientes usando apenas uma "
            "destas opções: Muito positivo, Positivo, Neutro, Negativo, ou Muito negativo."
        )
        general_sentiment = self.ai_client.analyze_reviews(prompt_sentiment, reviews_text)

        prompt_positive = (
            "Analise os feedbacks e liste os principais pontos positivos destacados pelos clientes. "
            "Regra estrita: Retorne APENAS os pontos, um por linha. Não escreva frases introdutórias, "
            "retorne no máximo os 7 pontos positivos de maior relevância, caso existam mais,"
            "não use conclusões e não adicione numeração ou marcadores no início das linhas."
        )
        raw_positive = self.ai_client.analyze_reviews(prompt_positive, reviews_text)
        positive_list = self._parse_ai_response_to_list(raw_positive)

        prompt_negative = (
            "Analise os feedbacks e liste os principais pontos negativos destacados pelos clientes. "
            "Regra estrita: Retorne APENAS os pontos, um por linha. Não escreva frases introdutórias, "
            "retorne no máximo os 7 pontos negativos de maior relevância, caso existam mais,"
            "não use conclusões e não adicione numeração ou marcadores no início das linhas."
        )
        raw_negative = self.ai_client.analyze_reviews(prompt_negative, reviews_text)
        negative_list = self._parse_ai_response_to_list(raw_negative)

        return FeedbackReportResponse(
            general_sentiment=general_sentiment,
            positive_points=positive_list,
            negative_points=negative_list
        )

    def _parse_ai_response_to_list(self, raw_text: str) -> List[str]:
        """Auxiliary method to split the Gemini string response into a clean Python list."""
        if not raw_text:
            return []
            
        lines = raw_text.split("\n")
        cleaned_lines = []
        
        for line in lines:
            cleaned_line = line.strip()
            if cleaned_line.startswith(("-", "*")):
                cleaned_line = cleaned_line[1:].strip()
            elif cleaned_line and cleaned_line[0].isdigit() and "." in cleaned_line[:3]:
                cleaned_line = cleaned_line.split(".", 1)[1].strip()
                
            if cleaned_line:
                cleaned_lines.append(cleaned_line)
                
        return cleaned_lines