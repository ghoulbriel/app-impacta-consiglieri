import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="logo">Consiglieri</a>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #002244;
      padding: 1.3rem 2rem; /* Mantive 1.3rem de altura e voltei 2rem nas laterais */
      display: flex;
      justify-content: flex-start; /* Alinha a logo à esquerda */
      align-items: center;
      width: 100%;
      box-sizing: border-box; /* Garante que o padding não estoure a tela */
    }
    .logo {
      color: #ffffff;
      font-family: 'Georgia', serif;
      font-size: 1.5rem;
      text-decoration: none;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {}