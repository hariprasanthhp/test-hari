import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointSubnetService {

  baseUrl: string;
  orgId: number;
  subnet: string = 'subnet';
  staticSubnet: string = 'staticsubnet';
  export: any;

  options: any;
  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.faAdminURL;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = { headers: headers };
    this.export = this.baseUrl + `export/`
  }

  getSubnets<T>(orgId): Observable<T> {
    //return this.httpClient.get<T>(`${environment.FLOW_BASE_URL}ep/endpoint-subnets?org-id=${orgId}`);
    return this.httpClient.get<T>(`${environment.FLOW_BASE_URL}agg/aggregationsubnet?org-id=${orgId}`);
  }


  addSubnet(params: any, orgId): any {
    return this.httpClient.post(`${environment.FLOW_BASE_URL}agg/aggregationsubnet?org-id=${orgId}&name=${params.name}&subnets=${params.subnets}`, this.options);
  }


  importSubnets<T>(params, orgId): Observable<T> {
    return this.httpClient.post<T>(`${environment.FLOW_BASE_URL}agg/aggregationsubnet/import?org-id=${orgId}`, params);
  }

  deleteSubnet<T>(orgId, params): any {
    //return this.httpClient.delete<T>(`${environment.FLOW_BASE_URL}ep/endpoint-subnets/${id}?org-id=${orgId}`)
    return this.httpClient.request('DELETE', `${environment.FLOW_BASE_URL}agg/aggregationsubnet?org-id=${orgId}`, {
      body: params
    });
  }

  updateSubnet<T>(id, params: T, orgId) {
    //return this.httpClient.put<T>(`${environment.FLOW_BASE_URL}ep/endpoint-subnets/${id}?org-id=${orgId}`, params);
    return this.httpClient.put(`${environment.FLOW_BASE_URL}agg/aggregationsubnet?org-id=${orgId}`, params, this.options);
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

  importDataProcess(data: any, isFullImport) {
    data.forEach((obj) => {
      obj.excluded = (obj.excluded.toUpperCase() == 'N' || obj.excluded.toUpperCase() == "NO") ? false : true;
      obj.isstatic = false;
      obj.isv4 = true;
      obj.action = isFullImport ? 'Create' : 'Update'
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

  public Export<T>(orgId): Observable<T> {
    return this.httpClient.post<T>(`${environment.FLOW_BASE_URL}agg/aggregationsubnet/export?org-id=${orgId}`, {})
  }
}
