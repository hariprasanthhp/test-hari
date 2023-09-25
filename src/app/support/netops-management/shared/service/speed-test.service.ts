import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { CPESpeedSupportTest } from '../model/cpe-speed-support-test';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpeedTestService {

  API_URI = `${environment.SUPPORT_URL}`;

  constructor(private http : HttpClient) { }

  updateCPESpeedTestDetails(cpeObj : CPESpeedSupportTest, orgId) : Observable<CPESpeedSupportTest>{
    console.log("Url for SpeedTest : " + `${this.API_URI}/device-st/speed-test/config/${orgId}`);
    console.log(cpeObj);
    return this.http.put<any>(`${this.API_URI}/device-st/speed-test/config/${orgId}`, cpeObj).pipe(
      catchError(this.handleError)
    );
  }

  speedTestDetails(orgId):Observable<CPESpeedSupportTest>{
    return this.http.get<any>(`${this.API_URI}/device-st/speed-test/config/${orgId}`).pipe(
      catchError(this.handleError)
    )
  }
  handleError(error) {
    return throwError(error);
  }
////////////////below new speed test conf//////////////
  cafspeedtestDetails(orgId){
    return this.http.get<any>(`${this.API_URI}/netops-perf-testing/cafII-speed-test-server?orgId=${orgId}`).pipe(
      catchError(this.handleError)
    )
  }
  calixtr143serverdetails(orgId){
    return this.http.get<any>(`${this.API_URI}/netops-perf-testing/calix-tr143-speed-test-server?orgId=${orgId}`).pipe(
      catchError(this.handleError)
    )
  }  

  createcafspeedtestDetailspostapi(cpeObj){
    return this.http.post(`${this.API_URI}/netops-perf-testing/cafII-speed-test-server`, cpeObj).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  createcalixtr143serverdetails(cpeObj){
    return this.http.post(`${this.API_URI}/netops-perf-testing/calix-tr143-speed-test-server`, cpeObj).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  deletecalixtr143servers(id) {
    return this.http.delete(`${this.API_URI}/netops-perf-testing/calix-tr143-speed-test-server/${id}`);
  }

  createcafspeedtestDetailsputapi(cpeObj,orgId){
    return this.http.put<any>(`${this.API_URI}/netops-perf-testing/cafII-speed-test-server?orgId=${orgId}`, cpeObj).pipe(
      catchError(this.handleError)
    );
  }

}
