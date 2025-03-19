import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/prompt`;

  generateText(prompt: string): Observable<{ text: string }> {
    return this.http.post<{ text: string }>(this.apiUrl, { prompt });
  }
}
