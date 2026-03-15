import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; 2026 Consiglieri - Faculdade Impacta</p>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #002244;
      color: #ffffff;
      text-align: center;
      padding: 1.3rem; /* Aumentado 30% verticalmente */
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    p { margin: 0; font-size: 0.875rem; }
  `]
})
export class FooterComponent {}