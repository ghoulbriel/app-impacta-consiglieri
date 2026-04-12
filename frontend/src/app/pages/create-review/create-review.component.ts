import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <main class="container">
      <h2 class="subtitle">Cadastre uma nova review</h2>
      
      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-group">
          <label for="channel">Canal de originação</label>
          <select id="channel" formControlName="channel">
            <option value="" disabled selected>Selecione um canal</option>
            <option value="ESTABELECIMENTO">ESTABELECIMENTO</option>
            <option value="LOJA VIRTUAL">LOJA VIRTUAL</option>
            <option value="RECLAME AQUI">RECLAME AQUI</option>
            <option value="WHATSAPP">WHATSAPP</option>
          </select>
        </div>

        <div class="form-group">
          <label for="customer_name">Nome do cliente</label>
          <input id="customer_name" type="text" formControlName="customer_name">
        </div>

        <div class="form-group">
          <label for="message">Feedback</label>
          <textarea id="message" formControlName="message" rows="4"></textarea>
        </div>

        <div class="button-group">
          <button type="button" class="btn-secondary" (click)="onClear()">Limpar</button>
          <button type="submit" class="btn-primary" [disabled]="reviewForm.invalid">Cadastrar</button>
        </div>
      </form>

      <div *ngIf="showModal" class="modal-overlay">
        <div class="modal-content">
          <p [ngClass]="{'success-text': isSuccess, 'error-text': !isSuccess}">
            {{ modalMessage }}
          </p>
          <button class="btn-primary" (click)="closeModal()">Fechar</button>
        </div>
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
    }
    .form-container {
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    label { color: #002244; font-weight: bold; }
    input, select, textarea {
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    .btn-primary { background-color: #003366; color: #ffffff; }
    .btn-primary:hover:not(:disabled) { background-color: #004080; }
    .btn-primary:disabled { background-color: #cccccc; cursor: not-allowed; }
    .btn-secondary { background-color: #f0f0f0; color: #333333; border: 1px solid #ccc; }
    .btn-secondary:hover { background-color: #e0e0e0; }
    
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex; justify-content: center; align-items: center;
    }
    .modal-content {
      background: #ffffff; padding: 2rem; border-radius: 8px; text-align: center;
      min-width: 300px;
    }
    .success-text { color: green; font-weight: bold; margin-bottom: 1.5rem; }
    .error-text { color: red; font-weight: bold; margin-bottom: 1.5rem; }
  `]
})
export class CreateReviewComponent {
  reviewForm: FormGroup;
  showModal = false;
  isSuccess = false;
  modalMessage = '';

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      channel: ['', Validators.required],
      customer_name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onClear() {
    this.reviewForm.reset();
    this.reviewForm.get('channel')?.setValue('');
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.showModalMessage(true, 'Review cadastrada com sucesso!');
            this.onClear();
          } else {
            this.showModalMessage(false, 'Erro ao cadastrar review!');
          }
        },
        error: () => {
          this.showModalMessage(false, 'Erro ao cadastrar review!');
        }
      });
    }
  }

  showModalMessage(success: boolean, message: string) {
    this.isSuccess = success;
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}