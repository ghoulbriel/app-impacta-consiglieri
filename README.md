# app-impacta-consiglieri

**Author:** Gabriel Moreira  
**Version:** 0.1.5  

**Description:** This repository is dedicated to the Graduation Project (TCC) at Faculdade Impacta. Consiglieri is a platform designed to collect and manage customer feedback for commercial establishments, leveraging Artificial Intelligence to generate detailed analyses and strategic reports.

## Technologies Used
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL
- **Frontend:** Angular
- **Containerization:** Docker, Docker Compose
- **Testing:** Pytest

## Implemented Features
- **Create Review:** A feature that allows the user to register a new review containing the service channel, customer name, and feedback message. This information is stored in the PostgreSQL database, and a unique identifier (UUID) for the respective review is returned.

## How to Run Locally

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>´´´
   
2. Navigate to the project directory and create a virtual environment (optional, for local development):
	```bash
	python -m venv .venv
	source .venv/bin/activate  # On Windows use: .venv\Scripts\activate´´´
	
3. Start the application using Docker:
	```bash
	docker compose up --build´´´
	
4. Access the interactive API documentation (Swagger UI) at:
http://localhost:8000/docs/

5. Access the Consiglieri Website at:
http://localhost:4200/