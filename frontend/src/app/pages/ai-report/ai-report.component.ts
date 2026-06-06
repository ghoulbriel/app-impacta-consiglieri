import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService, FeedbackReportResponse } from '../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ai-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container">
      <div class="content-wrapper">
        <h1 class="title">Relatório de Feedback</h1>
        <p class="subtitle">Análise inteligente gerada a partir das avaliações dos clientes.</p>

        <div *ngIf="isLoading" class="loading-container">
          <div class="spinner"></div>
          <p>Analisando avaliações com Inteligência Artificial...</p>
        </div>

        <div *ngIf="!isLoading && reportData" class="report-container">
          <div class="sentiment-card">
            <h2>Termômetro de Sentimento</h2>
            <div class="sentiment-badge" [ngClass]="getSentimentClass(reportData.general_sentiment)">
              {{ reportData.general_sentiment || 'Não identificado' }}
            </div>
          </div>

          <div class="points-grid">
            <div class="points-card positive">
              <h3>Pontos Fortes Analisados</h3>
              <ul>
                <li *ngFor="let point of reportData.positive_points">{{ point }}</li>
              </ul>
              <p *ngIf="!reportData.positive_points || reportData.positive_points.length === 0" class="empty-msg">
                Nenhum ponto forte identificado.
              </p>
            </div>

            <div class="points-card negative">
              <h3>Pontos de Melhoria Analisados</h3>
              <ul>
                <li *ngFor="let point of reportData.negative_points">{{ point }}</li>
              </ul>
              <p *ngIf="!reportData.negative_points || reportData.negative_points.length === 0" class="empty-msg">
                Nenhum ponto negativo identificado.
              </p>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading && errorMessage" class="error-container">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .container {
      min-height: calc(100vh - 74px);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem 2rem 6rem 2rem;
      box-sizing: border-box;
    }

    .content-wrapper {
      max-width: 900px;
      width: 100%;
    }

    .title {
      font-family: 'Georgia', serif;
      color: #002244;
      font-size: 2.4rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .subtitle {
      color: #555555;
      font-size: 1.1rem;
      text-align: center;
      margin-bottom: 3rem;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      color: #002244;
      font-weight: bold;
    }

    .spinner {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #002244;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin-bottom: 1.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .report-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .sentiment-card {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border-top: 4px solid #002244;
    }

    .sentiment-card h2 {
      margin-top: 0;
      color: #002244;
      margin-bottom: 1.5rem;
    }

    .sentiment-badge {
      display: inline-block;
      padding: 0.8rem 2rem;
      border-radius: 50px;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sentiment-badge.positive { background-color: #d4edda; color: #155724; }
    .sentiment-badge.negative { background-color: #f8d7da; color: #721c24; }
    .sentiment-badge.neutral { background-color: #e2e3e5; color: #383d41; }

    .points-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .points-grid { grid-template-columns: 1fr; }
    }

    .points-card {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .points-card.positive { border-top: 4px solid #28a745; }
    .points-card.negative { border-top: 4px solid #dc3545; }

    .points-card h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #333333;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 0.5rem;
    }

    .points-card ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .points-card li {
      padding: 0.8rem 0;
      border-bottom: 1px dashed #eeeeee;
      color: #555555;
      line-height: 1.4;
      position: relative;
      padding-left: 1.5rem;
    }

    .points-card li:last-child { border-bottom: none; }

    .points-card.positive li::before {
      content: "✓"; color: #28a745; position: absolute; left: 0; font-weight: bold;
    }

    .points-card.negative li::before {
      content: "✕"; color: #dc3545; position: absolute; left: 0; font-weight: bold;
    }

    .empty-msg { color: #999999; font-style: italic; }

    .error-container {
      text-align: center; padding: 2rem; background-color: #f8d7da; color: #721c24; border-radius: 8px; margin-top: 2rem;
    }
  `]
})
export class AiReportComponent implements OnInit {
  isLoading = true;
  reportData: FeedbackReportResponse | null = null;
  errorMessage = '';

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.fetchReport();
  }

  fetchReport(): void {
    this.isLoading = true;
    this.reportService.getFeedbackReport().subscribe({
      next: (response: any) => {
        let data = response;
        
        if (typeof response === 'string') {
          try {
            data = JSON.parse(response);
          } catch (e) {
            console.error('Falha ao tentar converter a resposta em JSON', e);
          }
        }

        this.reportData = data;
        this.isLoading = false;
        
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao buscar o relatório:', err.message);
        this.errorMessage = 'Ocorreu um erro ao gerar o relatório. Tente novamente mais tarde.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getSentimentClass(sentiment: string | undefined): string {
    if (!sentiment) return 'neutral';
    
    const s = String(sentiment).toLowerCase();
    
    if (s.includes('positivo')) return 'positive';
    if (s.includes('negativo')) return 'negative';
    return 'neutral';
  }
}