import { getExternalFileServer, postExternalFileServer, deleteExternalFileServer } from './endpoint';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExternalFileServerModel } from '../model/external-file-server-model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})

export class ExternalFileServerService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  // Read
  getExternalFileServer(orgId: string): Observable<ExternalFileServerModel> {
    const params = new HttpParams()
    // .set('orgId', orgId)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<ExternalFileServerModel>(getExternalFileServer, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  postExternalFileServer(body: ExternalFileServerModel) {
    return this.http.post(postExternalFileServer, body).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  deleteExternalFileServer(orgId: string) {
    const params = new HttpParams()
    // .set('orgId', orgId)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.delete(deleteExternalFileServer, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}