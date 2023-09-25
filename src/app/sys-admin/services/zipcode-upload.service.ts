import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { ZipUploadModel } from '../zip-code-upload/zipdata.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeApiService {
  public baseURL = environment.API_BASE;
  public zipcodeNameurl = "cmc-campaigns/zipdata/alias"
  public zipcodeListUrl = "cmc-campaigns/zipdata"
  public cmcCloudChecktUrl = "cmc-campaigns/organization"
  MODULE
  httpOptions: any;

  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
    private router: Router) {
    const url = this.router.url;
     this.MODULE = this.ssoAuthService.getRedirectModule(url);
    this.calixOrgId()
  }
  private calixOrgId() {
    let headers: HttpHeaders
    headers = new HttpHeaders({
      'X-Calix-OrgId': this.ssoAuthService.getOrganizationID(this.router.url)
    })
    this.httpOptions = { headers: headers };
  }

  public zipCodeListNames():Observable<any> {
    this.calixOrgId();
    return this.httpClient.get(`${this.baseURL}/v1/${this.zipcodeNameurl}`, this.httpOptions);
  }
  public saveZipPlusFile(saveCSVData: ZipUploadModel):Observable<any> {
    this.calixOrgId();
    return this.httpClient.post(`${this.baseURL}/v1/${this.zipcodeNameurl}`, saveCSVData, this.httpOptions);
  }
  public modifyZipcode(data: any):Observable<any>{
    this.calixOrgId();
    return this.httpClient.put(`${this.baseURL}/v1/${this.zipcodeNameurl}`, data, this.httpOptions);
  }
  public removeZipcode(listName: any):Observable<any> {
    this.calixOrgId();
    return this.httpClient.delete(`${this.baseURL}/v1/${this.zipcodeNameurl}?list-name=${listName}`,this.httpOptions);
  }

  public zipCodeEntryList(listName: any):Observable<any> {
    this.calixOrgId();
    return this.httpClient.get(`${this.baseURL}/v1/${this.zipcodeListUrl}/?list-name=${listName}`, this.httpOptions);
  }

  public editZipcodeEntryList(data: any):Observable<any> {
    this.calixOrgId();
    return this.httpClient.put(`${this.baseURL}/v1/${this.zipcodeListUrl}/`, data, this.httpOptions);
  }

  public deleteZipcodeEntryList(ids: any):Observable<any> {
    this.calixOrgId();
    return this.httpClient.delete(`${this.baseURL}/v1/${this.zipcodeListUrl}/?ids=${ids}`, this.httpOptions);
  }

  public addZipcodeEntryList(postData: any):Observable<any>{
    this.calixOrgId();
    return this.httpClient.post(`${this.baseURL}/v1/${this.zipcodeListUrl}/`, postData, this.httpOptions);
  }

  public marketingCloudCheck() {
    this.calixOrgId();
  //  if( this.MODULE === 'systemAdministration'){
    return this.httpClient.get(`${this.baseURL}/v1/${this.cmcCloudChecktUrl}`, this.httpOptions);
    // }else{
    //   return this.httpClient.get(`${this.baseURL}/v1/${this.cmcCloudChecktUrl}`);  
    // }
  }
  public marketingCloudCheckUpdate(data: any) {
    this.calixOrgId();
  // if( this.MODULE === 'systemAdministration'){
    return this.httpClient.put(`${this.baseURL}/v1/${this.cmcCloudChecktUrl}`, data, this.httpOptions);
  //  }else{
  //   return this.httpClient.put(`${this.baseURL}/v1/${this.cmcCloudChecktUrl}`, data);
  //  }
  }
}
