import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  baseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions`;
  bandwidhtbaseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`;

  subscriberbaseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/serviceTemplates`;
  ouibaseurl = `${environment.COC_SERVICES_ACTIVATION_URL}/ouiMatchList`;
  multirangebaseurl = `${environment.COC_SERVICES_ACTIVATION_URL}/multicastRange`;
  multicastvlansbaseurl = `${environment.COC_SERVICES_ACTIVATION_URL}/multicastVlan`;
  url: string;
  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  getServiceTemplateType(orgId, name) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceTemplates/type?${ID}type=${name}`).pipe(
      catchError(this.handleError)
    );
  }
  saveProfile(orgId, params,type?) {
    if(type !=='RG')  params = Object.assign({},Object.fromEntries(Object.entries(params).filter(([key, value])=> !(key !== 'smpDetails' && (value && typeof value === 'object')))));
    return this.http.post(`${environment.COC_SERVICE_MIGRATION_URL}/${type=='RG'?'rg':'ont'}/smp`, params).pipe(
      catchError(this.handleError)
    );
  }
  updateJobMig(id,name, des,type){
    if(type == 'ONT'){
      this.url = `${environment.COC_SERVICE_MIGRATION_URL}/ont/migrate/${id}?name=${name}`
    }else{
      this.url = `${environment.COC_SERVICE_MIGRATION_URL}/migration/rg/migrate/${id}?name=${name}`
    }
    
    if (des) {
      this.url  =  this.url  + `&description=${des}`
    }
    return this.http.put( this.url , '').pipe(
      catchError(this.handleError)
    );
  }
  saveJobMig(orgId, params, name, des) {
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/ont/migrate?name=${name}`
    if (des) {
      url = url + `&description=${des}`
    }
    return this.http.post(url, params).pipe(
      catchError(this.handleError)
    );
  }
  updateJobMigFou(id,name,mtype,sysGroup, des){
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/ont/migrate/${id}?name=${name}` +`&migrationtype=${mtype}`+`&systemGroup=${sysGroup}`
    if (des) {
      url = url + `&description=${des}`
    }
    return this.http.put(url, '').pipe(
      catchError(this.handleError)
    );
  }
  saveJobMigFou(orgId, params, name,mtype,sysGroup, des) {
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/ont/migrate?name=${name}`+`&migrationtype=${mtype}`+`&systemGroup=${sysGroup}`
    if (des) {
      url = url + `&description=${des}`
    }
    return this.http.post(url, params).pipe(
      catchError(this.handleError)
    );
  }
  saveJobMigRG(params){
    let url = `${environment.COC_SERVICE_MIGRATION_URL}/migration/rg/migrate`
    return this.http.post(url, params).pipe(
      catchError(this.handleError)
    );
  }
  startMigration(id, orgId, params) {
    return this.http.put(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}/accept`, '').pipe(
      catchError(this.handleError)
    );
  }
  ExportMigration(id) {
    // let options = {
    //   headers: new HttpHeaders()
    //   .set("content-type", "text/csv")
    // }
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/export/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  AbortMigration(id, orgId, params) {
    return this.http.put(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}/abort`, '').pipe(
      catchError(this.handleError)
    );
  }
  DeleteMigration(id, orgId, params) {
    return this.http.delete(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  undoMigration(id, orgId, params) {
    return this.http.put(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}/revert`, '').pipe(
      catchError(this.handleError)
    );
  }
  UpdateProfile(orgId, params, id,type?) {
    return this.http.put(`${environment.COC_SERVICE_MIGRATION_URL}/${type=='RG'?'rg':'ont'}/smp/${id}`, params).pipe(
      catchError(this.handleError)
    );
  }
  GetAllservices(id) {
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}/services?page=0&size=10`).pipe(
      catchError(this.handleError)
    );
  }
  GetAllsummary(id) {
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/migration/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  GetAllProfile(orgId, page, size) {
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/migration/smps?page=${page}&size=10`).pipe(
      catchError(this.handleError)
    );
  }
  GetAllJob(orgId, page, size) {
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/migration/all?page=${page}&size=10`).pipe(
      catchError(this.handleError)
    );
  }
  GetProfile(id,type?) {
    return this.http.get(`${environment.COC_SERVICE_MIGRATION_URL}/${type=='RG'?'rg':'ont'}/smp/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  DeleteProfile(id, orgId,type?) {
    return this.http.delete(`${environment.COC_SERVICE_MIGRATION_URL}/${type=='RG'?'rg':'ont'}/smp/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getsubscriber() {
    return this.http.get(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOuiList() {
    return this.http.get(this.ouibaseurl).pipe(
      map((res: any) => {
        if (typeof res === 'object') {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        } else return res;

      }),
      catchError(this.handleError)
    );
  }
  getMultipleRange(): any {
    return this.http.get(this.multirangebaseurl).pipe(
      map((res: any) => {
        if (typeof res === 'object') {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        } else return res;
      }),
      catchError(this.handleError)
    );
  }
  getMultiplecastVlan(): any {
    return this.http.get(this.multicastvlansbaseurl).pipe(
      map((res: any) => {
        if (typeof res === 'object') {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }));
          return res;
        } else return res;
      }),
      catchError(this.handleError),
    );
  }

  getsubscriberDetail(name, type) {
    name = encodeURIComponent(name);
    switch (type) {
      case "Service Defintion":
        {
          return this.http.get(`${this.baseUrl}?name=${name}`).pipe(
            catchError(this.handleError)
          );

        }
      case "Subscriber":
        {
          return this.http.get(`${this.subscriberbaseUrl}?name=${name}`).pipe(
            catchError(this.handleError)
          );
        }
      case "Bandwidth tier":
        {
          return this.http.get(`${this.bandwidhtbaseUrl}?name=${name}`).pipe(
            catchError(this.handleError)
          );
        }
      case "ouiMatchList":
        {
          return this.http.get(`${this.ouibaseurl}?name=${name}`).pipe(
            catchError(this.handleError)
          );
        }
      case "Multicast Range":
        {
          return this.http.get(`${this.multirangebaseurl}?name=${name}`).pipe(
            catchError(this.handleError));
        }
      case "Multicast VLAN":
        {
          return this.http.get(`${this.multicastvlansbaseurl}?name=${name}`).pipe(
            catchError(this.handleError));
        }
    }

  }

  delsubscriber(name, type) {
    name = encodeURIComponent(name);
    switch (type) {
      case "Service Defintion":
        {
          return this.http.delete(this.baseUrl + "/" + `${name}`).pipe(
            catchError(this.handleError));

        }
      case "Subscriber":
        {
          return this.http.delete(this.subscriberbaseUrl + "/" + `${name}`).pipe(
            catchError(this.handleError));
        }
      case "Bandwidth tier":
        {
          return this.http.delete(this.bandwidhtbaseUrl + "/" + `${name}`).pipe(
            catchError(this.handleError));
        }
      case "ouiMatchList":
        {
          return this.http.delete(this.ouibaseurl + "/" + `${name}`).pipe(
            catchError(this.handleError));
        }
      case "Multicast Range":
        {
          return this.http.delete(this.multirangebaseurl + "/" + `${name}`).pipe(
            catchError(this.handleError));
        }
      case "Multicast VLAN":
        {
          return this.http.delete(this.multicastvlansbaseurl + "/" + `${name}`).pipe(
            catchError(this.handleError));
        }
    }
  }

  postdata(data, type) {
    switch (type) {
      case "service_Definition_Profile":
        {
          return this.http.post(this.baseUrl, data).pipe(catchError(this.handleError));
        }
      case "subscriber_profile":
        {
          return this.http.post(this.subscriberbaseUrl, data).pipe(catchError(this.handleError));
        }
      case "bandWidth_profile":
        {
          return this.http.post(this.bandwidhtbaseUrl, data).pipe(catchError(this.handleError));
        }
      case "oui_profile":
        {
          return this.http.post(this.ouibaseurl, data).pipe(catchError(this.handleError));
        }
      case "Multicast_Range_Profile":
        {
          return this.http.post(this.multirangebaseurl, data).pipe(catchError(this.handleError));
        }
      case 'Multicast_Vlan_Profile':
        {
          return this.http.post(this.multicastvlansbaseurl, data).pipe(catchError(this.handleError));
        }
    }
    // return this.http.post(this.baseUrl, data).pipe(catchError(this.handleError));
  }

  putdata(data, type) {
    switch (type) {
      case "service_Definition_Profile":
        {
          return this.http.put(this.baseUrl, data).pipe(catchError(this.handleError));
        }
      case "subscriber_profile":
        {
          return this.http.put(this.subscriberbaseUrl, data).pipe(catchError(this.handleError));
        }
      case "bandWidth_profile":
        {
          return this.http.put(this.bandwidhtbaseUrl, data).pipe(catchError(this.handleError));
        }
      case "oui_profile":
        {
          return this.http.put(this.ouibaseurl, data).pipe(catchError(this.handleError));
        }
      case "Multicast_Range_Profile":
        {
          return this.http.put(this.multirangebaseurl, data).pipe(catchError(this.handleError));
        }
      case 'Multicast_Vlan_Profile':
        {
          return this.http.put(this.multicastvlansbaseurl, data).pipe(catchError(this.handleError));
        }
    }
    //return this.http.put(this.baseUrl, data).pipe(catchError(this.handleError));
  }
  handleError(error) {
    return throwError(error);
  }

  getProfileList(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile?${ID}`);
  }
  convert_to_kpbs(number, unit = 'mbps') {
    switch (unit) {
      case 'gbps':
        {
          return number * 1000000;
        }
      case 'mbps':
        {
          return number * 1000;
        }
      default: return number;
    }
  }
  convert_kbps_to(number, unit = 'mbps', convert: any = { start: { count: 0 } }) {
    if (convert.start.count > 1)
      return number;

    switch (unit) {
      case 'gbps':
        {
          return number / 1000000;
        }
      case 'mbps':
        {
          return number / 1000;
        }
      default: return number;
    }
  }
}
