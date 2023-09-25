import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketingSegmentsApiService {
  recommendedDataSubject = new Subject<any>();
  public baseURL = environment.API_BASE_URL;

  // CAMPAIGN APIS
  private savedSegments: string;
  private recommended: string;
  private savedSegmentsIn: string;
  private recommendedIn: string;
  private savedSegmentscamp: string;
  private recommendedcamp: string;
  private deletesave: string
  savedSegmentsNot: string
  recommendedNot: string
  private savedSegmentsTrig: string;
  private recommendedTrig: string;
  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
  ) {
    this.savedSegments = this.baseURL + 'cmc/segments/savedSegments?details=false';
    this.recommended = this.baseURL + 'cmc/segments/recommendedSegments?details=false';
    this.savedSegmentsIn = this.baseURL + 'cmc/segments/savedSegments?details=true';
    this.recommendedIn = this.baseURL + 'cmc/segments/recommendedSegments?details=true';
    this.savedSegmentscamp = this.baseURL + 'cmc/segments/savedSegments?details=false&counts=false';
    this.recommendedcamp = this.baseURL + 'cmc/segments/recommendedSegments?details=false&counts=false';
    this.deletesave = this.baseURL + 'cmc/segments/savedSegments';
    //
    this.savedSegmentsNot = this.baseURL + 'cmc/segments/savedSegments';
    this.recommendedNot = this.baseURL + 'cmc/segments/recommendedSegments';

    this.savedSegmentsTrig = this.baseURL + 'cmc/segments/savedSegments?subscriberOnly=true&counts=false';
    this.recommendedTrig = this.baseURL + 'cmc/segments/recommendedSegments?subscriberOnly=true&counts=false';
    // /recommendedSegments/{ orgId } /{userId}

  }
  public SavedSegmentsListInGET() {
    return this.httpClient.get(`${this.savedSegmentsIn}`)
    // return this.httpClient.get(`${this.savedSegmentsIn}/${this.ssoAuthService.getOrgId()}/${this.ssoAuthService.getUsername()}`)
  }
  public SavedSegmentsListNotGET() {
    return this.httpClient.get(`${this.savedSegmentsNot}`)
    // return this.httpClient.get(`${this.savedSegmentsIn}/${this.ssoAuthService.getOrgId()}/${this.ssoAuthService.getUsername()}`)
  }
  public recommendedSegmentsListNotGET() {
    return this.httpClient.get(`${this.recommendedNot}`)
  }
  public SavedSegmentsListGET() {
    return this.httpClient.get(`${this.savedSegments}`)
  }
  public SavedSegmentsDELETE(id, type,name) {
    return this.httpClient.delete(`${this.deletesave}/${id}?type=${type}&name=${name}`)
  }
  public recommendedSegmentsListGET() {
    return this.httpClient.get(`${this.recommended}`)
  }
  public recommendedSegmentsListInGET() {
    return this.httpClient.get(`${this.recommendedIn}`)
    // return this.httpClient.get(`${this.recommendedIn}/${this.ssoAuthService.getOrgId()}/${this.ssoAuthService.getUsername()}`)
  }
  setRecommendedSegmentData(array) {
    this.recommendedDataSubject.next(array)
  }
  public SavedSegmentsListCampGET(trigCamp) {
    if(trigCamp){
      return this.httpClient.get(`${this.savedSegmentsTrig}`)
    }else{
    return this.httpClient.get(`${this.savedSegmentscamp}`)
    }
  }
  public recommendedSegmentsListCampGET(trigCamp) {
    if(trigCamp){
      return this.httpClient.get(`${this.recommendedTrig}`)
    }else{
    return this.httpClient.get(`${this.recommendedcamp}`)
    }
  }

}
