import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsApiService {

  public baseURL = environment.faAdminURL;;
  options: any;
  public responseSubject = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = { headers: headers };
  }


  // Get API
  public DefinitionList<T>(orgId: string | number): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}application?org-id=${orgId}`)
  }
  // Add API
  public DefinitionAdd<T>(reqBody: T, orgId): Observable<T> {
    return this.httpClient.post<T>(`${environment.faAdminURL}application?org-id=${orgId}`, reqBody)
  }

  // Export API
  public exportDefinition<T>(org_id): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}application?org-id=${org_id}`);
  }

  // Import API
  public importDefinition<T>(params, org_id): Observable<T> {
    return this.httpClient.put<T>(`${environment.faAdminURL}application?org-id=${org_id}`, params);
  }

  // Delete API
  public DefinitionDelete<T>(id: T, org_id): Observable<T> {
    return this.httpClient.delete<T>(`${environment.faAdminURL}application/${id}?org-id=${org_id}`)
  }

  // Update API
  public DefinitionUpdate<T>(id, reqBody: T, org_id): Observable<T> {
    return this.httpClient.put<T>(`${environment.faAdminURL}application/${id}?org-id=${org_id}`, reqBody)
  }

  // Application Group List API
  public ApplicationGroupList<T>(orgId: string | number): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}application-group?org-id=${orgId}&tenant-id=0`);
  }

  // Application GroupName List API
  public ApplicationGroupNameList<T>(orgId: string | number): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}application-group?org-id=${orgId}&tenant-id=0`);
  }

  // Application Group Member List API
  public ApplicationGroupMmbrList<T>(uuid: string | number, orgId: string | number): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}application-group-member/${uuid}?org-id=${orgId}&tenant-id=0`);
  }

  // Application Group Member Create API
  public ApplicationGroupMmbrCreate<T>(reqBody: T, orgId: string | number): Observable<T> {
    return this.httpClient.post<T>(`${environment.faAdminURL}application-group-member?org-id=${orgId}&tenant-id=0`, reqBody);
  }

  // Application Group Member Update API
  public ApplicationGroupMmbrUpdate<T>(reqBody: T, Id, orgId: string | number): Observable<T> {
    return this.httpClient.put<T>(`${environment.faAdminURL}application-group-member/${Id}?org-id=${orgId}&tenant-id=0`, reqBody);
  }

  public ApplicationGroupMmbrDelete<T>(id: T, orgId: string | number): Observable<T> {
    return this.httpClient.delete<T>(`${environment.faAdminURL}application-group-member/${id}?org-id=${orgId}&tenant-id=0`);
  }

  callRestApi(endpoint, filters?) {
    return this.httpClient.get<any>(`${endpoint}`, this.options)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }

  trimAddress(str) {
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


  combineApps(curOrgApps, defOrgApps) {
    curOrgApps = curOrgApps ? curOrgApps : [];
    defOrgApps = defOrgApps ? defOrgApps : [];
    // let temp;
    // let availCurOrgApps: any = [];
    let appIds = {};

    curOrgApps = curOrgApps.map((obj) => {
      obj.type = "Local";
      obj['v4s'] = this.splitData(obj['addressesV4']);
      obj['v6s'] = this.splitData(obj['addressesV6']);
      obj['newPorts'] = this.splitData(obj['ports']);
      appIds[obj._id] = obj.name;
      return obj;
    });
    let curs = curOrgApps.length ? curOrgApps.slice(0) : [];
    if (defOrgApps && defOrgApps.length) {
      const currentOrgName = curOrgApps.map((obj) => obj.name);
      defOrgApps = defOrgApps.map((obj) => {
        const currentOrgIndex = currentOrgName.indexOf(obj.name);
        if (currentOrgIndex == -1) {
          obj.type = "Global";
          obj['v4s'] = this.splitData(obj['addressesV4']);
          obj['v6s'] = this.splitData(obj['addressesV6']);
          obj['newPorts'] = this.splitData(obj['ports']);
          appIds[obj._id] = obj.name;
        } else {
          obj = curOrgApps[currentOrgIndex];
          curs.splice(currentOrgIndex, 1);
          appIds[obj._id] = obj.name;
        }
        return obj;
      });
      defOrgApps = [...defOrgApps, ...curs];

    } else if (curOrgApps.length) {
      defOrgApps = curOrgApps;
    }
    //defOrgApps = this.processData(defOrgApps);
    let data = {
      allApps: defOrgApps,
      appIds: appIds
    }
    return data;

  }

  splitData(str: any) {
    let data = [];
    if (str != '' && str != null) {
      data = [...str.split(';')];
    }
    return data;
  }

  public ExportAppGroups<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}export/application-groups?org-id=${orgId}`)
  }

  public ExportApps<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${environment.faAdminURL}export/applications?org-id=${orgId}`)
  }

  public ImportApps<T>(orgId, reqBody): Observable<T> {
    return this.httpClient.put<T>(`${environment.faAdminURL}fa_import/applications?org-id=${orgId}`, reqBody)
  }

  public ImportAppGroups<T>(orgId, reqBody): Observable<T> {
    return this.httpClient.put<T>(`${environment.faAdminURL}fa_import/application-groups?org-id=${orgId}`, reqBody)
  }

  portValidation(portStr: string) {
    portStr = portStr ? portStr.trim() : '';
    if (portStr != undefined && /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])((\/TCP)|(\/UDP))?$/igm.test(portStr)) {
      return true;
    }
    return false;
  }

  rPortValidation(portStr: string) {
    portStr = portStr ? portStr.trim() : '';
    if (portStr != undefined && /^([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])(?:-(?:([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])))((\/TCP)|(\/UDP))$/igm.test(portStr) && this.compareStartEndPorts(portStr)) {
      return true;
    }
    return false;
  }

  validateJoinPorts(portStr) {
    portStr = portStr ? portStr.trim() : '';
    if (portStr && /^([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])(?:\|(?:([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5]))){0,2}$/igm.test(portStr)) {
      return true;
    }
    return false;
  }

  compareStartEndPorts(portStr) {
    let port = portStr.split('/')[0];
    if (port && port?.length) {
      let ports = port.split('-');
      if (ports && ports?.length && ports?.length == 2) {
        let start = +ports[0];
        let end = +ports[1];
        if (end > start) return true;
      }
    }
    return false;
  }

  public importDefinitionDPI<T>(reqBody: T, engineId: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/xml'
    });
    return this.httpClient.put<T>(`${environment.faAdminURL}uploadExtApplications?engine-id=${engineId}`, reqBody,
     {headers});
  }

  public importApplicationGroupDPI(reqBody: any, engineId: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/xml',
    });
    return this.httpClient.put(`${environment.faAdminURL}uploadExtApplicationsGroup?engine-id=${engineId}`, reqBody,
     {headers, responseType: 'blob'});
  }

  public applicationsPatch<T>(id, reqBody: T, org_id: any): Observable<T> {
    return this.httpClient.patch<T>(`${environment.faAdminURL}application/${id}?org-id=${org_id}`, reqBody)
  }

  public getApplicationByDomainName<T>(domainName: string, orgId): Observable<T>{
    return this.httpClient.get<T>(`${environment.faAdminURL}getExtApplicationByDomain/${domainName}`)
  }

  public getApplicationAudit(applicationIds: Array<String>, orgId: string): Observable<ArrayBuffer> {
    return this.httpClient.put<ArrayBuffer>(`${environment.faAdminURL}getApplicationAudit`,applicationIds);
  }
}
