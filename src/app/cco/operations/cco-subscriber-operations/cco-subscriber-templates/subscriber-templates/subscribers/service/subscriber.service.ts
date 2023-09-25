import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  bandwidhtbaseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`;

  baseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/serviceTemplates`;
  constructor(private http: HttpClient) { }
  getbandwidth() {
    return this.http.get(this.bandwidhtbaseUrl).pipe(
      map((res: any) => {
        if (typeof res === 'object') {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        } else return res;
      }),
      catchError(this.handleError)
    );
  }


  getsubscriber() {
    return this.http.get(this.baseUrl).pipe(
      map((res: any) => {
        if (typeof res === 'object') {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        } else return res;
      }),
      catchError(this.handleError)
    );
  }


  getsubscriberDetail(name) {
    return this.http.get(`${this.baseUrl}?name=${name}`).pipe(
      catchError(this.handleError)
    );
  }

  delsubscriber(name) {
    return this.http.delete(this.baseUrl + "/" + `${name}`).pipe(
      catchError(this.handleError)
    );
  }

  postdata(data) {
    return this.http.post(this.baseUrl, data).pipe(catchError(this.handleError));
  }

  putdata(data) {
    return this.http.put(this.baseUrl, data).pipe(catchError(this.handleError));
  }
  handleError(error) {
    return throwError(error);
  }
}
