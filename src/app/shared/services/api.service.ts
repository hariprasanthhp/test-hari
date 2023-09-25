import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description - Method to construct get req.
   * @param - {string} url
   * @param - params
   */
  public get(url: string, params?: HttpParams) {
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description - Method to construct post req.
   * @param - {any} body
   * @param - params
   */
  public post(url: string, body: any, params?: HttpParams) {
    return this.http.post(url, JSON.stringify(body), { params }).pipe(
      //catchError(this.handleError)
    );
  }

  /**
   * @description - Method to construct put req.
   * @param - {string} url
   * @param - { any } body
   * @param - params.
   */
  public put(url: string, body: any, params?: HttpParams) {
    return this.http.put(url, JSON.stringify(body), { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description - Method to construct delete
   * @param - { string } url.
   */
  public delete(url: string) {
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description - Method to handle error.
   * @param - error.
   */
  public handleError(error: HttpErrorResponse | any): string {
    let errMsg = '';
    if (error.error instanceof Error) {
      const body = error.json() || '';
      const err = body.error || body.Message || JSON.stringify(body);
      errMsg = `${err}`;
    } else {
      errMsg = error.error.message ? error.error.message : error.error.toString();
    }
    return errMsg;
  }
}
