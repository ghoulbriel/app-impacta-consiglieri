import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';
import { ListReviewsComponent } from './pages/list-reviews/list-reviews.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-review', component: CreateReviewComponent },
  { path: 'list-reviews', component: ListReviewsComponent },
  { path: '**', redirectTo: '' }
];