import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-review', component: CreateReviewComponent },
  { path: '**', redirectTo: '' }
];