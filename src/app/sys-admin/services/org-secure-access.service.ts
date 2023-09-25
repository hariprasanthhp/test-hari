import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
const httpOptions = {
  headers: new HttpHeaders({
    //'X-Calix-Username': 'admin@calix.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrgSecureAccessService {

  constructor(private http: HttpClient) {

  }

  getSCLByOrg(orgId: any): any {
    return this.http.get(`${environment.CALIX_ADMIN_BASE_URL}org-access/org/${orgId}/_expand`, httpOptions);
  }

  getOrgList(): any {
    return this.http.get(`${environment.CALIX_ADMIN_ORG_BASE_URL}organizations`, httpOptions);
  }

  getOrgListByUsername(username: string): any {
    return this.http.get(`${environment.CALIX_ADMIN_BASE_URL}org-access/username/${username}`, httpOptions);
  }


  AddOrgListByUsername(username: string, params: any): any {
    return this.http.post(`${environment.CALIX_ADMIN_BASE_URL}org-access/username/${username}`, params, httpOptions);
  }



  checkType(str: string) {
    if (str.indexOf('write') > -1) {
      return 'Read and Write';
    }
    return 'Read only	';
  }

  checkExpiry(obj: any) {
    if (obj.endTime == -1) {
      if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
        return "Pas d'expiration";
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
        return "Sin caducidad";
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
        return "Kein Ablaufdatum";
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
        return "No Expiry";
      }
      return 'No Expiry';
    }
    if (obj.beginTime && obj.endTime) {
      let begin = this.roundOffTimestamp(obj.beginTime);
      let end = this.roundOffTimestamp(obj.endTime);
      //return `${new Date(obj.beginTime).toLocaleString()} - ${new Date(obj.endTime).toLocaleString()}`;

      if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
        moment.locale('fr');
        return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
        moment.locale('es');
        return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
        moment.locale('de_DE');
        return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
      } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
        moment.locale('en');
        return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
      }
      return `${new Date(begin).toLocaleString()} - ${new Date(end).toLocaleString()}`;
    }

  }

  checkExpiryOrgAccess(obj: any) {
    // if (obj.endTime == -1) {
    //   return `${new Date(obj.beginTime).toLocaleString()} - No Expiry	`;
    // } else if (obj.beginTime && obj.endTime) {
    //   return `${new Date(obj.beginTime).toLocaleString()} - ${new Date(obj.endTime).toLocaleString()}`;
    // } {

 // }
 if (obj.endTime == -1) {
   let begin = this.roundOffTimestamp(obj.beginTime);
   if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
     moment.locale('en');
     return `${moment(begin).format('DD MMM YYYY, HH:mm')} - No Expiry`;
 } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
   moment.locale('fr');
   return `${moment(begin).format('DD MMM YYYY, HH:mm')} - Pas d'expiration`;
 } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
   moment.locale('es');
   return `${moment(begin).format('DD MMM YYYY, HH:mm')} - Sin caducidad`;
 } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      moment.locale('de_DE');
   return `${moment(begin).format('DD MMM YYYY, HH:mm')} - Kein Ablaufdatum `;
 } 
 return `${new Date(begin).toLocaleString()} - No Expiry	`;
} else if (obj.beginTime && obj.endTime) {
     let begin = this.roundOffTimestamp(obj.beginTime);
     let end = this.roundOffTimestamp(obj.endTime);
     if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
       moment.locale('fr');
       return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
     } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
       moment.locale('en');
       return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
     } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
       moment.locale('es');
       return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
     } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
       moment.locale('de_DE');
       return `${moment(begin).format('DD MMM YYYY, HH:mm')} - ${moment(end).format('DD MMM YYYY, HH:mm')}`;
     }
     return `${new Date(begin).toLocaleString()} - ${new Date(end).toLocaleString()}`;
   } 


}

  localTimestampToUTC(d) {
    let x = new Date(d)
    let UTCseconds = (x.getTime() + x.getTimezoneOffset() * 60 * 1000);
    return UTCseconds;
  }

  utcTimestampTolocal(utc) {
    let i = new Date();
    let local = (utc - i.getTimezoneOffset() * 60 * 1000);
    return local;
  }


  roundOffTimestamp(ts) {
    let newTS = (Math.floor(ts / 1000)) * 1000;
    return newTS;
  }

}


