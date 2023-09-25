import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { TimeLimitModel } from '../models/timeLimitModel';

@Injectable({
  providedIn: 'root'
})
export class TimeLimitService {

  constructor(private http : HttpClient) { }

  createTimeLimit(body : TimeLimitModel)
    {
    // let data = JSON.stringify(body)
     return this.http.post('https://dev.rgw.calix.ai/map/v1/mobile/parentcontrol/bedtime/multiple/setall',
      body,{
        headers : new HttpHeaders({
          'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'

        })
      } ).pipe(
        catchError(this.handleError)
      )
  };

  getTimeLimit(profileId : String){
    return this.http.get(`https://dev.rgw.calix.ai/map/v1/mobile/parentcontrol/bedtime/multiple?profileId=${profileId}`,{
      headers : new HttpHeaders({
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'
      })
    }).pipe(
      catchError(this.handleError)
    )
  };

  createIndividualDayTimeLimit(body : TimeLimitModel){
    return this.http.post('https://dev.rgw.calix.ai/map/v1/mobile/parentcontrol/bedtime/set', body , {
     headers : new HttpHeaders({
      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'
     })
    }).pipe(
      catchError(this.handleError)
    )
  };

  getIndividualDayTimeLimit(profileId : String){
    return this.http.get(`https://dev.rgw.calix.ai/map/v1/mobile/parentcontrol/bedtime?profileId=${profileId}`, {
      headers : new HttpHeaders({
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'
      })
    }).pipe(
      catchError(this.handleError)
    )
  };

  createMultipleDayTimeLimits(body: TimeLimitModel){
    return this.http.post('https://dev.rgw.calix.ai/map/v1/mobile/persona/bedtime/multiple/set', body, {
      headers : new HttpHeaders({
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'
      })
    }).pipe(catchError(this.handleError))
  };

  getMulitpleDayTimeLimits(profileId : String){
    return this.http.get(`https://dev.rgw.calix.ai/map/v1/mobile/persona/bedtime/multiple?personaId=${profileId}`,{
      headers : new HttpHeaders({
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTQ0ZTAzLThlZWQtNGY5Zi1hZjRmLTk5MmEyZWMwZTU4NCIsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImN1c3RvbWVySWQiOiIiLCJ0eXBlIjoiYXBpIiwiaWF0IjoxNjExMDYyNTU5LCJleHAiOjE2MjY2MTQ1NTl9.6O7cF7yLuD0x6CAwtkQlpQu0CluEdNIB4du9DMT-ASU'
      })
    }).pipe(catchError(this.handleError))
  };

  // deleteDayTimeLimit(profileId: String)

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }


}
