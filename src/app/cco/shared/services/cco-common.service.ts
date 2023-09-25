import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
//import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class CcoCommonService {
  subscriberValue: any;
  servicevalue1: any;
  servicevalue6: any;
  servicevalue5: any;
  servicevalue4: any;
  servicevalue3: any;
  servicevalue2: any;
  static save(formValue: any): any {
    throw new Error('Method not implemented.');
  }

  productList: any
  // private socket = io('ws://localhost:8085',{transports: ['websocket', 'polling', 'flashsocket'],autoConnect: true,
  // 'reconnectionDelay': 3000,
  // 'reconnection': true}) ;


  public currentPageData = new Subject<any>();
  public ccoPageExport = new Subject<any>();
  private showCountStatus = new BehaviorSubject<boolean>(false);
  public showCountStatus$ = this.showCountStatus.asObservable();
  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private http: HttpClient, private sso: SsoAuthService
  ) {

  }
  save(formValue) {

    //console.log(formValue)

    this.productList = formValue
    return this.productList;
  }
  savesubscriber(formValue) {

    this.subscriberValue = formValue
    //console.log(formValue)
    return this.subscriberValue;
  }
  savesevice1(formValue) {
    const list = {
      pppoe: {
        username: formValue.username,
        password: formValue.password
      },
      VLanId: formValue.VLanId,
      Pbit: formValue.Pbit
    }
    this.servicevalue1 = list;
    return this.servicevalue1;
  }
  savesevice2(formValue) {
    const list = {
      FaxT38: {
        Enable: formValue.FaxT38
      },
      ServiceType: formValue.ServiceType,
      DialPlan: formValue.DialPlan
    }
    this.servicevalue2 = list;
    //console.log(formValue)
    return this.servicevalue2;
  }
  savesevice3(formValue) {
    this.servicevalue3 = formValue;
    //console.log(formValue)
    return this.servicevalue3;
  }
  savesevice4(formValue) {
    this.servicevalue4 = formValue;
    //console.log(formValue)
    return this.servicevalue4;
  }
  savesevice5(formValue) {
    this.servicevalue5 = formValue;
    //console.log(formValue)
    return this.servicevalue5;
  }
  savesevice6(formValue) {
    this.servicevalue6 = formValue;
    //console.log(formValue)
    return this.servicevalue6;
  }



  currentPageAdder(data) {
    this.currentPageData.next(data);
  };

  doExport(data) {
    this.ccoPageExport.next(data);
  }

  exportDataConvertor(array) {
    let check = Array.isArray(array);
    if (check) {
      array.forEach(el => {
        delete el._id
        for (const key in el) {
          if (typeof el[key] == 'boolean') {
            if (el[key] == true) {
              el[key] = 'Yes'
            } else {
              el[key] = 'No'
            }
          }
        }
      });
    }
    return array;
  }

  generateExportName(firstName: string) {
    return this.commonFunctionsService.generateExportName(firstName);
  }

  showCount(val: boolean) {
    this.showCountStatus.next(val);
  }

  performSearch(orgId, filter, pageNumber, pageSize): Observable<any> {
    const params = new HttpParams()
      // .set("orgId", orgId)
      .set("filter", filter || "")
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-search`, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }
  textSearch = new Subject<any>();
  searchTextEmit(data:any){
    this.textSearch.next(data)
  }
}
