import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsApiService {

  public baseURL = environment.faAdminURL;;
  public org_id: any;
  private locationList: string;
  private locationAdd: string;
  private locationExport: string;
  private locationImport: string;
  private locationDelete: string;
  private locationEdit: string;
  options: any;
  export: any;

  constructor(
    private httpClient: HttpClient,
    private sso: SsoAuthService
  ) {
    this.org_id = this.sso.getOrgId();
    this.locationList = this.baseURL + `location?org-id=${this.org_id}`;
    this.locationAdd = this.baseURL + `location?org-id=${this.org_id}`;
    this.locationExport = this.baseURL + `location?org-id=${this.org_id}`;
    this.locationImport = this.baseURL + `location?org-id=${this.org_id}`;
    this.locationDelete = this.baseURL + `location`;
    this.locationEdit = this.baseURL + `location`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = { headers: headers };
    this.export = this.baseURL + `export/`;

  }



  public LocationList<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(this.baseURL + `location?org-id=${orgId}`)
  }
  public LocationAdd<T>(reqBody: T, orgId): Observable<T> {
    return this.httpClient.post<T>(this.baseURL + `location?org-id=${orgId}`, reqBody)
  }

  public exportSubnets<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(this.baseURL + `location?org-id=${orgId}`);
  }

  public importLocationSubnets<T>(params, orgId): Observable<T> {
    return this.httpClient.put<T>(this.baseURL + `fa_import/locations?org-id=${orgId}`, params);
  }

  public LocationDelete<T>(id: T, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${this.locationDelete}/${id}?org-id=${orgId}`)
  }

  public LocationUpdate<T>(id, reqBody: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.locationEdit}/${id}?org-id=${orgId}`, reqBody)
  }





  // exportProcess(data: any) {
  //   let exports = [];
  //   data.forEach(obj => {

  //     obj['subnets'] = obj.subnetsV4 + obj.subnetsV6;

  //     obj['subnets'] = obj.subnetsV4 + ';' + obj.subnetsV6;
  //     exports.push({
  //       'Name': obj.name ? obj.name : '',
  //       // 'Subnets V4': obj.subnetsV4 ? obj.subnetsV4 : '',
  //       // 'Subnets V6': obj.subnetsV6 ? obj.subnetsV6 : '',
  //       'Subnets': obj.subnets ? obj.subnets : '',
  //       'Region': obj.region ? obj.region : '',
  //       'Address': obj.address ? obj.address : '',
  //       'Geo': obj.geo ? obj.geo : ''
  //     });
  //   },
  //   );
  //   return exports;
  // }

 

  arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item
      return obj
    }, {});

  importDataProcess(data: any, isFullImport, isDryRun, orgId) {
    // data.forEach((obj) => {
    //   obj.excluded = (obj.excluded.toUpperCase() == 'N' || obj.excluded.toUpperCase() == "NO") ? false : true;
    // });

    // return this.arrayToObject(data, keyField);

    let newData = [];

    data.forEach((obj) => {
      obj.action = isDryRun ? 'Create' : obj.action;
      if (obj.SubnetsV4) {
        obj.subnetsV4 = obj.SubnetsV4 ? obj.SubnetsV4.trim() : '';
      }

      if (obj.SubnetsV6) {
        obj.subnetsV6 = obj.SubnetsV6 ? obj.SubnetsV6.trim() : '';
      }

      if (obj.Region) {
        obj.region = obj.Region ? obj.Region : '';
      }

      if (obj.Address) {
        obj.address = obj.Address ? obj.Address : '';
      }
      if (obj.Geo) {
        obj.geo = obj.Geo ? obj.Geo : '';
      }

      if (obj.name && (obj.subnetsV4 || obj.subnetsV6)) {
        newData.push({
          subnetsV4: obj.subnetsV4,
          subnetsV6: obj.subnetsV6,
          region: obj.region,
          address: obj.address,
          action: obj.action,
          geo: obj.geo,
          name: obj.name,
          orgId: orgId
        })
      }



    });

    return newData;

  }

  public Export<T>(module, orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.export}${module}?org-id=${orgId}`)
  }
}
