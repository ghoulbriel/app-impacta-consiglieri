import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeedbackReportResponse {
  general_sentiment: string;
  positive_points: string[];
  negative_points: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/report/feedback';

  constructor(private http: HttpClient) {}

  getFeedbackReport(): Observable<FeedbackReportResponse> {
    return this.http.get<FeedbackReportResponse>(this.apiUrl, {
      headers: { 'Accept': 'application/json' }
    });
  }
}