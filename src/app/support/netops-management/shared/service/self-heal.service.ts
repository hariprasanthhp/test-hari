import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import{ getSelfHeal,putSelfHeal } from './endpoint'
import { SelfHealModel } from '../model/self-heal.model';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class SelfHealService {

  constructor(private http: HttpClient) { }
  
// Read
getSelfHeal(orgId:string): Observable<SelfHealModel> {
    return this.http.get<SelfHealModel>(getSelfHeal+"/"+orgId).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

putSelfHeal(body:SelfHealModel, orgId: string){
  return this.http.put(putSelfHeal+"/"+orgId,body).pipe(
    catchError(this.handleError) //  handle the error
  );
}

private handleError(error: HttpErrorResponse) {
  // Return an observable with a user-facing error message.
  return throwError(error);
}

}