import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService, ReviewData } from '../../services/review.service';

@Component({
  selector: 'app-list-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <main class="container">
      <h2 class="subtitle">Histórico de Avaliações</h2>

      <form [formGroup]="filterForm" (ngSubmit)="applyFilter()" class="filter-container">
        <div class="filter-group">
          <input type="text" formControlName="customer_name" placeholder="Filtrar por nome do cliente...">
        </div>
        
        <div class="filter-group">
          <select formControlName="channel">
            <option value="">Selecione um canal</option>
            <option value="ESTABELECIMENTO">ESTABELECIMENTO</option>
            <option value="LOJA VIRTUAL">LOJA VIRTUAL</option>
            <option value="RECLAME AQUI">RECLAME AQUI</option>
            <option value="WHATSAPP">WHATSAPP</option>
          </select>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-primary">Filtrar</button>
          <button type="button" class="btn-secondary" (click)="clearFilter()">Limpar</button>
        </div>
      </form>

      <div class="table-container">
        <table class="minimal-table">
          <thead>
            <tr>
              <th>Data do Review</th>
              <th>Canal</th>
              <th>Cliente</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let review of paginatedReviews">
              <td>{{ review.created_at | date:'dd/MM/yyyy HH:mm' }}</td>
              <td><span class="channel-badge">{{ review.channel }}</span></td>
              <td>{{ review.customer_name }}</td>
              <td class="message-cell">{{ review.message }}</td>
            </tr>
            <tr *ngIf="paginatedReviews.length === 0">
              <td colspan="4" class="empty-state">Nenhum review encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button class="btn-secondary" (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="btn-secondary" (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages">Próxima</button>
      </div>
    </main>
  `,
  styles: [`
    .container {
      padding: 2rem;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .subtitle {
      color: #002244;
      margin-bottom: 2rem;
      width: 100%;
      max-width: 1000px;
    }
    .filter-container {
      width: 100%;
      max-width: 1000px;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      background-color: #ffffff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      align-items: center;
      box-sizing: border-box; 
    }
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    .button-group {
      display: flex;
      gap: 0.5rem;
    }
    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    .btn-primary { background-color: #003366; color: #ffffff; }
    .btn-primary:hover { background-color: #004080; }
    .btn-secondary { background-color: #f0f0f0; color: #333333; border: 1px solid #ccc; }
    .btn-secondary:hover { background-color: #e0e0e0; }

    .table-container {
      width: 100%;
      max-width: 1000px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      overflow-x: auto;
      box-sizing: border-box; 
    }
    .minimal-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .minimal-table th, .minimal-table td {
      padding: 1rem;
      border-bottom: 1px solid #eeeeee;
    }
    .minimal-table th {
      background-color: #fafafa;
      color: #002244;
      font-weight: bold;
    }
    .minimal-table tbody tr:hover {
      background-color: #f9f9f9;
    }
    .channel-badge {
      font-size: 0.85rem;
      background-color: #e6f0fa;
      color: #003366;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: bold;
    }
    .message-cell {
      max-width: 300px;
      word-wrap: break-word;
    }
    .empty-state {
      text-align: center;
      color: #666;
      padding: 2rem;
    }
    .pagination {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      color: #333;
    }
  `]
})
export class ListReviewsComponent implements OnInit {
  filterForm: FormGroup;
  
  allReviews: ReviewData[] = [];
  filteredReviews: ReviewData[] = [];
  
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder, 
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      customer_name: [''],
      channel: ['']
    });
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (response: any) => {
        let rawData = response?.reviews ? response.reviews : (Array.isArray(response) ? response : []);
        
        let reviews = [...rawData];
        
        reviews.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });

        this.allReviews = reviews;
        
        this.applyFilter();
        
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao buscar reviews', err);
      }
    });
  }

  applyFilter() {
    const rawName = this.filterForm.get('customer_name')?.value;
    const nameFilter = rawName ? rawName.toString().toLowerCase().trim() : '';
    const channelFilter = this.filterForm.get('channel')?.value || '';

    this.filteredReviews = this.allReviews.filter(review => {
      const customerName = review.customer_name ? review.customer_name.toString().toLowerCase() : '';
      const matchName = customerName.includes(nameFilter);
      const matchChannel = channelFilter ? review.channel === channelFilter : true;
      return matchName && matchChannel;
    });
    
    this.currentPage = 1;
  }

  clearFilter() {
    this.filterForm.reset({ customer_name: '', channel: '' });
    this.applyFilter();
  }

  get paginatedReviews(): ReviewData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredReviews.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredReviews.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}