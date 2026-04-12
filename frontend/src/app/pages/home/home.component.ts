import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="container">
      <header class="hero-section">
        <h1 class="title">Gestão e análise inteligente de avaliações.</h1>
        <p class="subtitle">Cadastre avaliações, visualize o histórico e gere relatórios de sentimento com IA em poucos cliques.</p>
      </header>

      <section class="cards-grid">
        <a routerLink="/create-review" class="card" title="Registre a opinião de um novo cliente.">
          <h2>Cadastrar Review</h2>
          <p>Registre a opinião de um novo cliente.</p>
        </a>

        <a routerLink="/list-reviews" class="card" title="Consulte e gerencie todas as avaliações cadastradas.">
          <h2>Exibir Histórico</h2>
          <p>Consulte e gerencie todas as avaliações cadastradas.</p>
        </a>

        <a routerLink="/ai-report" class="card" title="Gere uma análise de sentimentos e dicas de melhoria.">
          <h2>Relatório de IA</h2>
          <p>Gere uma análise de sentimentos e dicas de melhoria.</p>
        </a>
      </section>
    </main>
  `,
  styles: [`
    .container {
      background-color: transparent;
      min-height: calc(100vh - 74px);
      display: flex;
      flex-direction: column;
      align-items: center;     
      justify-content: flex-start;
      padding: 6rem 2rem 3rem 2rem;
      box-sizing: border-box;
    }
    
    .hero-section {
      text-align: center;
      max-width: 800px;
      margin-bottom: 4rem;
    }
    
    .title {
      font-family: 'Georgia', serif;
      color: #002244;
      font-size: 2.8rem;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .subtitle {
      color: #555555;
      font-size: 1.2rem;
      line-height: 1.6;
      margin: 0;
    }

    .cards-grid {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap; /* Permite quebrar linha em telas menores */
      max-width: 1000px;
      width: 100%;
    }

    .card {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 2rem;
      width: 280px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05); /* Sombra inicial sutil */
      border-top: 4px solid #002244; /* Detalhe visual com a cor primária */
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .card:hover {
      transform: translateY(-8px); /* Sobe o card ligeiramente */
      box-shadow: 0 12px 24px rgba(0,0,0,0.15); /* Aumenta a sombra */
    }

    .card h2 {
      color: #002244;
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .card p {
      color: #666666;
      font-size: 1rem;
      margin: 0;
      line-height: 1.4;
    }
  `]
})
export class HomeComponent {}