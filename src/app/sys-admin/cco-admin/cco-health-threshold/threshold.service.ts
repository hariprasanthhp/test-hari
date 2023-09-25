import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThresholdService {
  public baseURL = environment.API_BASE_URL;
  constructor(private httpClient: HttpClient) { }
  threshold = this.baseURL + 'health/config/thresholds';


  getThresholds() {
    return this.httpClient.get(`${this.threshold}`).pipe(
      catchError(this.handleError)
    )
  }

  AddThresholds(data) {
    return this.httpClient.post(this.threshold, data).pipe(
      catchError(this.handleError)
    )
  }

  updateThreshold(data) {
    return this.httpClient.put(this.threshold, data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
