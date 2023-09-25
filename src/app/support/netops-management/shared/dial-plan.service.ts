import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialPlanService {

  constructor(
    private http: HttpClient
  ) { }

  public delete(url: string) {
    return this.http.delete(url)
  }
}
