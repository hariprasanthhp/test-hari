import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NetworkSubnetsApiService {

  baseUrl: string;
  subnet: string = 'subnet';
  staticSubnet: string = 'staticsubnet';
  export: any;

  options: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.faAdminURL;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = { headers: headers };
    this.export = this.baseUrl + `export/`
  }

  getSubnets<T>(orgId, flag?): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${this.subnet}?org-id=${orgId}${flag ? '&all=true' : ''}`);
  }

  getStaticSubnets<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${this.staticSubnet}?org-id=${orgId}`);
  }

  addSubnet(params: any, orgId): any {
    return this.httpClient.post(`${this.baseUrl}${this.subnet}?org-id=${orgId}`, params, this.options);
  }

  addStaticSubnet(params: any, orgId): any {
    return this.httpClient.post(`${this.baseUrl}${this.subnet}?org-id=${orgId}`, params, this.options);
  }

  exportSubnets<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}devices?org-id=${orgId}`);
  }

  importSubnets<T>(params, orgId, combined?): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}fa_import/${combined ? 'combined-subnets' : 'subnets'}?org-id=${orgId}`, params);
  }

  importStaticSubnets<T>(params, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}fa_import/static-subnets?org-id=${orgId}`, params);
  }

  deleteSubnet<T>(id: T, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${this.subnet}/${id}?org-id=${orgId}`)
  }

  deleteStaticSubnet<T>(id: T, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${this.subnet}/${id}?org-id=${orgId}`)
  }

  updateSubnet<T>(id, params: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${this.subnet}/${id}?org-id=${orgId}`, params)
  }

  updateStaticSubnet<T>(id, params: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${this.subnet}/${id}?org-id=${orgId}`, params)
  }


  getRadiusServers<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${environment.FA_ADMIN_CONFIG_URL}radius?org-id=${orgId}&tenant-id=0`);
  }

  addRadiusServer(params: any, orgId): any {
    return this.httpClient.post(`${environment.FA_ADMIN_CONFIG_URL}radius?org-id=${orgId}&tenant-id=0`, params, this.options);
  }

  updateRadiusServer<T>(id, params: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${environment.FA_ADMIN_CONFIG_URL}radius/${id}?org-id=${orgId}&tenant-id=0`, params)
  }

  deleteRadiusServer<T>(id: T, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${environment.FA_ADMIN_CONFIG_URL}radius/${id}?org-id=${orgId}&tenant-id=0`)
  }



  exportProcess(data: any) {

    let exports = [];
    data.forEach(obj => {
      exports.push({
        'subnet': obj.subnet ? obj.subnet : '',
        'excluded': obj.excluded ? obj.excluded : ''
      });
    });

    return exports;
  }


  arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item
      return obj
    }, {});

  importDataProcess(data: any, isFullImport, isDryRun, orgId, isStatic = false) {
    data.forEach((obj) => {
      obj.excluded = typeof obj.excluded == "boolean" ? obj.excluded : (obj.excluded.toUpperCase() == 'N' || obj.excluded.toUpperCase() == "NO") ? false : true;
      obj.isstatic = isStatic;
      obj.isv4 = true;
      obj.action = isFullImport ? 'Create' : 'Update';
      obj.orgId = orgId;
      obj.tenantId = 0;
    });

    //return this.arrayToObject(data, keyField);
    return data;
  }

  checkData(data: any) {
    if (Array.isArray(data[0])) {
      let newData = [];
      data.forEach(arr => {
        newData.push({
          subnet: arr[0],
          excluded: arr[1]
        });
      });

      return newData;
    }
    return data;
  }

  trimSubnet(str) {
    str = str.trim();
    while (str[str.length - 1] === ".")
      str = str.slice(0, -1);
    return str;
  }

  isSubnetV4(ip: string) {
    let arr = ip.split('/');
    let ipArray = arr[0].split('.');
    if (ipArray.length == 4) {
      return true;
    }
    return false;
  }

  isSubnetV6(ip: string) {
    let arr = ip.split('/');
    let ipArray = arr[0].split('.');
    if (ipArray.length == 6) {
      return true;
    }
    return false;
  }

  deleteObjectFromArray(data, id) {
    let newData = data.filter(item => item._id !== id);
    return newData;
  }

  public Export<T>(module, orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.export}${module}?org-id=${orgId}`)
  }


}
