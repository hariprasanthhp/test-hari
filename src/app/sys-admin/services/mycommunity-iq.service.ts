import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})
export class MycommunityIqService {

  constructor(
    private http: HttpClient,
    private Sso: SsoAuthService
  ) { }
  communityListSubject = new BehaviorSubject([]);
  GetBspproviderInfo() {
    return this.http.get(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider`);
  }

  AddBspInfo(data) {
    return this.http.post(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider`, data);
  }
  DeleteBspInfo() {
    return this.http.delete(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider`);
  }
  EditBspInfo(data) {
    return this.http.put(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider`, data);
  }

  GetMicrosite() {
    return this.http.get(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider/microsites`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["communityName"] || "").toString().localeCompare((b["communityName"] || "").toString(), 'en', { numeric: true }))
        return res;
      }),
      catchError(this.handleError)
    )
  }
  GetpredefinedCommunities() {
    return this.http.get(`${environment.MYCOMMUNITYIQ_URL}/community/predefined/bsp-available`);
  }
  AddMicrosite(data) {
    return this.http.post(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider/microsite`, data);
  }

  EditMicrosite(data, id) {
    return this.http.put(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider/microsite?micrositeId=${id}`, data);
  }

  DeleteMicrosite(id) {
    return this.http.delete(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider/microsite?micrositeId=${id}`);
  }
  WarToDelMicrosite(orgId, data) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow?${ID}matcher=${data}`);
  }
  GetMicrositeForEdit(id) {
    return this.http.get(`${environment.MYCOMMUNITYIQ_URL}/bsp-provider/microsite?micrositeId=${id}`);
  }
  Uploadcsv(data) {
    return this.http.put(`${environment.API_BASE_URL}billing-upload-service/usoc`, data,
      { responseType: 'text' });
  }
  getCommunitySubscribers(orgId, micrositeId?, filter?, offset?, limit?) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.MYCOMMUNITYIQ_URL}/subscriber-systems/passpoint-subscribers?${ID}${micrositeId ? ('&micrositeId=' + micrositeId) : ''}${filter ? ('&filter=' + filter) : ''}${offset ? ('&offset=' + offset) : ''}${limit ? ('&limit=' + limit) : ''}`)
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  saveUsers(value, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/passpoint-subscribers?${ID}`, value);
  }

  // ORG ID is an required one for editCommunityAccess Please don't remove 
  editCommunityAccess(data,orgId,subscriberId){
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/subscriber?orgId=${orgId}&subscriberId=${subscriberId}`,data);
  }
  getSmartTownUsersCount(micrositeId,filter) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/passpoint-subscribers/count?${micrositeId ? ('micrositeId='+micrositeId + (filter?'&':'')) : ''}${filter ? ('filter='+filter) : ''}`);
  }
}
