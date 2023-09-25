
import { uploadSwFile, uploadConfigFile, getConfigFileList, getSwFileList, updateConfigFile, updateSwFile, getConfigFileById, getSwFileById, deleteConfigFileById, deleteSwFileById, getSwListCount, getConfigListCount, sw_upload_Url, makeOfficialImage, makeUnOfficialImage } from './endpoint';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { requestType, FilesListModel } from '../model/files-list.model';
import { FilesModel } from '../model/files.model';
import { FileResponseModel } from '../model/file-response.model';
import { UtilityClass } from '../../shared/service/utility-class';
import { createBinaryFile, extractHostname } from 'src/app/support/shared/service/utility.class';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class FileService {
  Software_URL = `${environment.SUPPORT_URL}/netops-sw/softwareThreshold`;
  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  // Read
  getConfigFilesList(orgId?: string, name?: string, type?: requestType): Observable<FilesListModel[]> {
    let params = new HttpParams();
    if (orgId) {
      params = params.set('orgId', orgId)
    }
    if (name) {
      params = params.set("name", name)
    } if (type) {
      params = params.set("type", type)
    }
    return this.http.get<FilesListModel[]>(getConfigFileList, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  // Read
  getSwFilesList(orgId?: string, name?: string, type?: requestType): Observable<FilesListModel[]> {
    const params = new HttpParams()
      // .set('orgId', orgId)
      .set("type", type)
      .set("name", name);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    const paramsKeys = params.keys();
    paramsKeys.forEach((key) => {
      const value = params.get(key);
      if (!value) {
        params['map'].delete(key);
      }
    });
    return this.http.get<FilesListModel[]>(getSwFileList, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  //This api is used to update only description field
  updateConfigFile(body: FilesModel, orgId: string): Observable<any> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.put(updateConfigFile, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  //This api is used to update only description field
  updateSwFile(body: FilesModel, orgId: string): Observable<any> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.put(updateSwFile, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  uploadSwFile(body: FilesModel, orgId: string): Observable<FileResponseModel> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.post<FileResponseModel>(uploadSwFile, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  uploadConfigFile(body: FilesModel, orgId: string): Observable<FileResponseModel> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.post<FileResponseModel>(uploadConfigFile, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }



  getConfigFileById(_id: string): Observable<any> {
    return this.http.get(getConfigFileById + "/" + _id).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getSwFileById(_id: string): Observable<any> {
    return this.http.get(getSwFileById + "/" + _id).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getSwFilesCount(orgId: string): Observable<any> {
    const params = new HttpParams()
      .set("type", requestType.SW_FW_Image)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(getSwListCount, { params }).pipe(
      catchError(this.handleError) //  handle the error
    )
  }

  getConfigFilesCount(orgId: string): Observable<any> {
    const params = new HttpParams()
      // .set("orgId", orgId)
      .set("type", "Configuration File")
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<any>(getConfigListCount, { params }).pipe(
      catchError(this.handleError) //  handle the error
    )
  }

  fileUploadIntoUrl(body: File, uploadDetails: FileResponseModel) {
    let authorizationData = 'Basic ' + btoa(uploadDetails.username + ':' + uploadDetails.password);
    const options = {
      headers: new HttpHeaders().set('Authorization', authorizationData)
        .set("Content-Type", "application/octet-stream")
    }
    let url = uploadDetails.uploadUrl.replace(extractHostname(uploadDetails.uploadUrl), sw_upload_Url)
    return this.http.post(url, body, options).pipe(
      catchError(this.handleError) //handel the error 
    )
  }

  makeOfficialImage(body: any): Observable<any> {
    return this.http.post(makeOfficialImage, body).pipe(
      catchError(this.handleError) //handel the error 
    )
  }
  makeUnOfficialImge(orgId: string, Id: string): Observable<any> {
    const params = new HttpParams()
      // .set("orgId", orgId)
      .set("imageId", Id);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.delete(makeUnOfficialImage, { params }).pipe(
      catchError(this.handleError) //handel the error 
    )
  }

  deleteConfigFileById(_Id: string): Observable<any> {
    return this.http.delete(deleteConfigFileById + "/" + _Id).pipe(
      catchError(this.handleError) //  handle the error
    );
  }


  deleteSwFileById(_Id: string): Observable<any> {
    return this.http.delete(deleteSwFileById + "/" + _Id).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  getConfigurationFileList(getConfigFileList, body) {
    return this.http.post(getConfigFileList, body).pipe(
      catchError(this.handleError) //handel the error 
    )
  }
  getSoftwareImageList(getSoftwareImagesList, body) {
    return this.http.post(getSoftwareImagesList, body).pipe(
      catchError(this.handleError) //handel the error 
    )
  }
  getFileType() {
    let arr = new UtilityClass();
    return arr.FileType;
  }


  getSoftwareImageversion() {
    // const ID = this.sso.getOrg(orgId);
    return this.http.get(`${this.Software_URL}`).pipe(
      catchError(this.handleError)
    );
  }

  putSoftwareImageversion(requestBody) {
    return this.http.put(`${this.Software_URL}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  postSoftwareImageversion(requestBody) {
    return this.http.post(`${this.Software_URL}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  deleteSoftwareImageversion(orgId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete(`${this.Software_URL}?orgId=${ID}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}