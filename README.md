# app-impacta-consiglieri

**Author:** Gabriel Moreira  
**Version:** 1.0.0  

**Description:** This repository is dedicated to the Graduation Project (TCC) at Faculdade Impacta. Consiglieri is a platform designed to collect and manage customer feedback for commercial establishments, leveraging Artificial Intelligence to generate detailed analyses and strategic reports.

## Technologies Used
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL
- **Frontend:** Angular
- **Containerization:** Docker, Docker Compose
- **Testing:** Pytest

## Implemented Features
- **Create Review:** A feature that allows the user to register a new review containing the service channel, customer name, and feedback message. This information is stored in the PostgreSQL database, and a unique identifier (UUID) for the respective review is returned.
- **List Reviews:** A feature that allows the user to view the history of all registered reviews fetched from the PostgreSQL database. The data is displayed in a paginated grid, sorted by the most recent dates, and includes dynamic filtering capabilities by customer name and service channel. 
- **Delete Review:** A feature that allows the user to delete a review from the PostgreSQL database. This feature is located in the "List Reviews" page as a button "Excluir". 
- **Feedback Report:** A feature that provider an AI-Generated report with customers feedback.

## How to Run Locally

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>´´´
   
2. Navigate to the project directory and create a virtual environment (optional, for local development):
	```bash
	python -m venv .venv
	source .venv/bin/activate  # On Windows use: .venv\Scripts\activate´´´

3. In the "settings.py" file include de ApiKey in the varible gemini_api_key
	
4. Start the application using Docker:
	```bash
	docker compose up --build´´´
	
5. Access the interactive API documentation (Swagger UI) at:
http://localhost:8000/docs/

1. Access the Consiglieri Website at:
http://localhost:4200/