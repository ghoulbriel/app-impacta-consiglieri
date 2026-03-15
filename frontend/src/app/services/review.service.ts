import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewPayload {
  channel: string;
  customer_name: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/review';

  constructor(private http: HttpClient) {}

  createReview(review: ReviewPayload): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, review, {
      observe: 'response'
    });
  }
}