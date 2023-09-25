import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NfainventoryService {
  public baseURL = environment.API_BASE_URL;
  private regions: string;
  private locations: string;
  private systems: string;
  private Count: string;


  constructor(
    private http: HttpClient,
    private ssoauthservice: SsoAuthService

  ) {

    let orgId = this.ssoauthservice.getOrgId()
    this.regions = this.baseURL + 'nfa/regions?tenant=0';
    this.locations = this.baseURL + 'nfa/locations?tenant=0';
    this.systems = this.baseURL + 'nfa/systems?tenant=0';
    //this.Count = this.baseURL + 'nfa/interfaces/pon/count?tenant=0';

  }
  // &org-id=${this.ssoauthservice.getOrgId()}
  GetRegions() {
    return this.http.get(`${this.regions}`).pipe(
      catchError(this.handleError)
    )
  }

  GetLocations(id: any) {
    let region = '&region=' + id;
    return this.http.get(`${this.locations}${region}`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        return res;
      }),
      catchError(this.handleError)
    )
  }

  GetSystems(regionId: any, locationId: any, page?) {
    let region = '&region=' + regionId;
    let location = '&location=' + locationId;
    if (page == 'ae') location += '&aeMgmt=true'
    if (page == 'pon' || page == 'ont' ) location += `&interfaceCategory=${page}`;
    return this.http.get(`${this.systems}${region}${location}`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        return res;
      }),
      catchError(this.handleError)
    )
  }
  GetPonCount(state) {
    if (state == 'quarantine')
      this.Count = this.baseURL + 'nfa/interfaces/pon/count?tenant=0&quarantinedOnt=true'
    else
      this.Count = this.baseURL + 'nfa/interfaces/pon/count?tenant=0&quarantinedOnt=false'
    return this.http.get(`${this.Count}`).pipe(
      catchError(this.handleError)
    );
  }
  GetDslCount(value){
    return this.http.get(`${this.baseURL}nfa/interfaces/dsl/count?tenant=0&showtime=${value}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {

    // Return userfriendly   error message;

    return throwError(error);
  }

}
