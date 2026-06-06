from google import genai
from src.settings import settings

class GeminiClient:
    """Client for interacting with the Gemini API using the new google-genai SDK."""
    
    def __init__(self):
        self.client = genai.Client(api_key=settings.gemini_api_key)
        self.model_name = "gemini-3.5-flash"

    def analyze_reviews(self, prompt: str, reviews_text: str) -> str:
        """
        Sends a prompt and the reviews to the Gemini model.
        Forces the model to return a pure response.
        """
        full_prompt = (
            f"{prompt}\n\n"
            "Regra estrita: Retorne apenas a resposta direta. "
            "Não inclua saudações, não use formatação markdown além do texto puro.\n\n"
            f"Feedbacks:\n{reviews_text}"
        )
        
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=full_prompt
        )
        
        return response.text.strip()