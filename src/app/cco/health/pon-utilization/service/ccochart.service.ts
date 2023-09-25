import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcochartService {

  constructor(private http: HttpClient) { }



  GetBipErrorn(query) {
    return this.http.get(`${environment.API_BASE_URL}health/reports/biperror?${query}`).pipe(
      catchError(this.handleError));
  }
GetNotAtAttainable(query){
  return this.http.get(`${environment.API_BASE_URL}health/reports/dsl/lowrate?${query}`).pipe(
    catchError(this.handleError));
}
GetNotAtSNR(query){
  return this.http.get(`${environment.API_BASE_URL}health/reports/dsl/lowsnr?${query}`).pipe(
    catchError(this.handleError));
}
  BipErrornew(query) {
    let query1 = query + "&countBy=interface"
    return this.http.get(`${environment.API_BASE_URL}health/reports/biperror/count?${query1}`).pipe(
      catchError(this.handleError));
  }
  callRestApi(endpoint, filters?) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }





  GetTimeseries() {
    return this.http.get(`${environment.API_BASE_URL}health/timeseries`)
  }
  GetTimeseriesTableData(query) {
    return this.http.get(`${environment.API_BASE_URL}health/reports/toponts?${query}`)
  }
  GetTop5ONTs(port,system){
    return this.http.get(`${environment.API_BASE_URL}cnap/invmgr/discoveredonts/state/toponts?port=${port}&system=${system}`)
  }
  
  // GetTimeseriesTableData(query) {
  //   return this.http.get(`${environment.API_BASE_URL}health/reports/toponts?${query}`)
  // }

  GetPacketdroppedn(query1, page) {
    let query
    if (page == 'pon') {
      query = query1 + '&interfaceCategory=pon'
      return this.http.get(`${environment.API_BASE_URL}health/reports/packetsdropped?${query}`).pipe(
        catchError(this.handleError));
    }else if(page == 'ae'){
      query = query1 + '&interfaceCategory=ae'
      return this.http.get(`${environment.API_BASE_URL}health/reports/packeterrors?${query}`).pipe(
        catchError(this.handleError));
    }
    else {
      query = query1 + '&interfaceCategory=ethernet'
      return this.http.get(`${environment.API_BASE_URL}health/reports/packeterrors?${query}`).pipe(
        catchError(this.handleError));
    }
  }
  ///reports/utilization/thresholdexceededcount  &min=-1
  Getutilizationthresholdexceededcount(query1, page) {
    let query
    if (page == 'pon')
      query = query1 + '&interfaceCategory=pon'
    else if(page  =='ae')
       query = query1 + '&interfaceCategory=ae'
     else if(page  =='dsl')
        query = query1 + '&interfaceCategory=dsl'
    else
      query = query1 + '&interfaceCategory=ethernet'
    return this.http.get(`${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`).pipe(
      catchError(this.handleError));
  }
  GetAffectedPorts(time, endtime, page){
    return this.http.get(`${environment.API_BASE_URL}health/reports/utilization/thresholdexceeded?tenant=0&granularity=15min&startTime=${time}&endTime=${endtime}&interfaceCategory=${page}`).pipe(
      catchError(this.handleError));
  }
  // reports/utilization
  GetUtilization(query) {
    return this.http.get(`${environment.API_BASE_URL}health/reports/utilization?${query}`).pipe(
      catchError(this.handleError)
    );
  }

  GetThreshold(query, page) {
    query = query + '&interfaceCategory=ae'
    return this.http.get(`${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`).pipe(
      catchError(this.handleError));
  }
  GetPacket(query, page) {
    query = query + '&interfaceCategory=ae'
    return this.http.get(`${environment.API_BASE_URL}health/reports/packeterrors?${query}`).pipe(
      catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {

    // Return obseravle with an error message;

    return throwError(error);
  }

}
