import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
const httpOptions = {
    headers: new HttpHeaders({
        //'X-Calix-Username': 'admin@calix.com'
    })
};

@Injectable({
    providedIn: 'root'
})
export class CallOutComeService {

    public baseURL = environment.SUPPORT_URL;
    public org_id = environment.faAdminOrgId;

    public callOutComeStartTime: string = null;

    public subscriberId: string = null;
    public escalationEmail: string = null;

    // public addRole: string;
    // public addUsers: string;
    // public users: string;
    constructor(
        private httpClient: HttpClient, private Sso: SsoAuthService
    ) {
        //    this.addRole = this.baseURL + 'role';
        //this.addUsers = this.baseURL + 'role';
        //this.users = this.baseURL + 'users';
    }
    public GetStatuses<T>(orgId): Observable<T> {
        const ID = this.Sso.getOrg(orgId);
        return this.httpClient.get<T>(`${this.baseURL}/statuses`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    public CreateStatus<T>(params: T): Observable<T> {
        return this.httpClient.put<T>(`${this.baseURL}/call/status`, params, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    public UpdateStatus<T>(params: T, statusName): Observable<T> {
        let res = `${this.baseURL}/call/status?editingStatus=${statusName}`;
        let uri = encodeURI(res);

        return this.httpClient.post<T>(uri, params, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    public RestoreStatus<T>(params: T, orgId): Observable<T> {
        const ID = this.Sso.getOrg(orgId);
        return this.httpClient.put<T>(`${this.baseURL}/call/status/restore?${ID}statusNames=${params}`, {}, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    public DeleteStatus<T>(orgId, name): Observable<T> {
        const ID = this.Sso.getOrg(orgId);
        let res = `${this.baseURL}/call/status?${ID}name=${name}`;
        let uri = encodeURI(res);

        return this.httpClient.delete<T>(uri, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    public CallOutCome<T>(params: T): Observable<T> {


        return this.httpClient.put<T>(`${this.baseURL}/calloutcome`, params, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    public GetCallHistory<T>(orgId, subscriberId, csrId, page, size): Observable<T> {
        /* csrId removed based on CCL-33739 */
        const ID = this.Sso.getOrg(orgId);
        return this.httpClient.get<T>(`${this.baseURL}/calloutcome/history?subscriberId=${subscriberId}&page=${page}&pagesize=${size}`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    updateCommandIQEmails(Obj: any): Observable<any> {
        return this.httpClient.put<any>(`${this.baseURL}/smbiq/account/email`, Obj);
    }
    subscriberImpactedOutages(subscriberId) {
        return this.httpClient.get<any>(`${environment.API_BASE_URL}analytics-engine/cscSubscriberOutage/${subscriberId}`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    deleteCommandIQEmails(userId, isPrimary): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseURL}/smbiq/account?userId=${userId}&isPrimary=${isPrimary}`)
    }
    Savepasspharseauditlog(request) {
        //https://stage.api.calix.ai/v1/csc/useraudit/saveAuditLog
        return this.httpClient.post(`${environment.API_BASE_URL}csc/useraudit/saveAuditLog`, request);
    }
    // /device/{orgId}/{deviceId}/deviceinfo

    public UpdateNotes<T>(params: T): Observable<T> {
        return this.httpClient.post<T>(`${this.baseURL}/call/calloutcome/note`, params, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    public GetNotes<T>(ticketId): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}/call/calloutcome/note?ticketId=${ticketId}`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    public showAndHideTicketNumber<T>(orgid): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}/call/calloutcome/extrefconfig/nisc?orgId=${orgid}`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    public loadstatustypes<T>(): Observable<T> {
        return this.httpClient.get<T>(`${this.baseURL}/call/calloutcome/loadstatustypes`, httpOptions).pipe(
            catchError(this.handleError)
        )
    }
    // public ServiceLimit(endpoint_id): Promise<any> {
    //     return this.httpClient.get(`${this.baseURL}/subscriber/single-subscriber-usage'?endpoint-id=${endpoint_id}&month=6&`).toPromise()
    //         .then((res) => { console.log(res); return res; });
    // }
    // getCustomerNameByCustomerID(id): Promise<string> {
    //     return this.httpClient.get(this.baseURL +
    //       'search/prioritySearch/id?orgId=' + this.ssoAuthService.getOrgId() + '&filter="' + id, { responseType: 'text' })
    //       .toPromise()
    //       .then((res) => { console.log(res); return res; });
    //   }


    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    pageErrorHandle(err: any) {
        if (typeof err === 'string' && err) {
            return err;
        }
        let errorInfo;
        if (err?.error?.errorDesc) {
            errorInfo = `${err?.error?.errorDesc}`;
        } else if (err.error != undefined && err.error != null && typeof err.error == 'string') {
            errorInfo = `${err.error}`;
        } else if (err.error != undefined && typeof err.error == 'object' && err.error.error != undefined && typeof err.error.error == 'string') {
            // console.log('1408', `${err.error.error}`);
            errorInfo = `${err.error.error}`;
        } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'string') {
            errorInfo = `${err.error.fault}`;
        } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'object' && err.error.fault.faultstring != undefined && typeof err.error.fault.faultstring == 'string') {
            errorInfo = `${err.error.fault.faultstring}`;
        } else if (err.error && err.error.errorMessage) {
            errorInfo = err.error.errorMessage;
        }
        else if (err.statusText == 'Unknown Error' && err.status == '0') {
            // errorInfo = "Unknown Error - Please refresh the page"; // remove later
            errorInfo = "An unknown error has occurred. Refresh the page to try again";
        }
        else if (err.error != undefined) {
            errorInfo = `${err.error.message}`;
        }
        else {
            errorInfo = `${err.message}`;
        }
        return (errorInfo != 'undefined' && errorInfo.length) ? errorInfo : Object.values(this.flatten(err)).join(' - ');
    }

    flatten(obj) {
        let flattenedObject = {};
        try {
            this.traverseAndFlatten(obj, flattenedObject);
        } catch (ex) {
            flattenedObject = {};
        }
        return flattenedObject;
    }
    traverseAndFlatten(currentNode, target, flattenedKey?) {
        for (var key in currentNode) {
            if (currentNode.hasOwnProperty(key)) {
                var newKey;
                if (flattenedKey === undefined) {
                    newKey = key;
                } else {
                    newKey = flattenedKey + '.' + key;
                }

                var value = currentNode[key];
                if (typeof value === "object") {
                    this.traverseAndFlatten(value, target, newKey);
                } else {
                    target[newKey] = value;
                }
            }
        }
    }

    updateOutcomeTimer(Obj: any, sec): Observable<any> {
        return this.httpClient[sec ? 'put' : 'delete'](`${this.baseURL}/call/calloutcome/abort-timer`, Obj);
    }
    getOutcomeTimer(orgId) {
        return this.httpClient.get<any>(`${this.baseURL}/call/calloutcome/abort-timer?orgId=${orgId}`).pipe(
            catchError(this.handleError)
        )
    }

    commaqndIqInviteEmail(request) {
        //https://stage.api.calix.ai/v1/csc/useraudit/saveAuditLog
        return this.httpClient.post(`${environment.API_BASE_URL}csc/commandiq/notification`, request).pipe(
            catchError(this.handleError)
        );
    }

}
