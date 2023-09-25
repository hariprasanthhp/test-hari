import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaptivePortalService {

  constructor(private http: HttpClient) { }

  getCaptivePortal(userId: string) {
    return this.http.get(`${environment.SUPPORT_URL}/smbiq/portal?userId=${userId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  setCaptivePortal(inp) {
    return this.http.put(`${environment.SUPPORT_URL}/smbiq/portal`, inp).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  createCaptivePortal(inp) {
    return this.http.post(`${environment.SUPPORT_URL}/smbiq/portal`, inp).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  deleteUploadedImg(path, userId) {
    return this.http.delete(`${environment.SUPPORT_URL}/smbiq/portal/image/${path}?userId=${userId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
