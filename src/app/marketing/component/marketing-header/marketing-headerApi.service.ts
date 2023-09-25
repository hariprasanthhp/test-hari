import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarketingExploreCommonService } from '../../marketing-explore-data/basic/shared/services/explore-data-common.service';



const httpOptions = {
  headers: new HttpHeaders({
    responseType: 'text'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MarketingHeaderApiService {
  public subscriberSubject = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    private marketingExploreCommonService: MarketingExploreCommonService
  ) {

  }
  setsubscriberId(id: any) {
    this.subscriberSubject.next({ id: id });
  }
  getsubscriberId(): Observable<any> {
    return this.subscriberSubject.asObservable();
  }
  setSearchName(name: any) {
    this.subscriberSubject.next({ name: name });
  }
  // getSearchName(): Observable<any> {
  //   return this.subscriberSubject.asObservable();
  // }
}
