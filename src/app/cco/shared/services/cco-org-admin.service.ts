import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcoOrgAdminService {

  constructor(private http: HttpClient) { }

  createAdmin(adminObj) {
    return this.http.post(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData`, adminObj).pipe(
      catchError(this.handleError)
    )
  }

  updateAdminData(adminObj) {
    return this.http.put(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData`, adminObj).pipe(
      catchError(this.handleError)
    )
  }


  fetchAmdins(type?) {
    if (type == 'All' || type == '' || type == 'undefined') {
      return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData`).pipe(
        catchError(this.handleError)
      )
    } else {
      return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData?serviceType=${type}`).pipe(
        catchError(this.handleError)
      )
    }
  }

  deleteAdminData(sType) {
    return this.http.delete(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData?serviceType=${sType}`).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
