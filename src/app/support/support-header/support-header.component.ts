import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { DataServiceService } from '../data.service';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { SubscribeService } from '../shared/service/subscriber.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-support-header',
  templateUrl: './support-header.component.html',
  styleUrls: ['./support-header.component.scss']
})
export class SupportHeaderComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;

  searchSubscriber;
  searchResult;
  orgId;
  searchText: string;
  scopeFlag: any = {};
  showNetops = false;
  showDashboard = false;
  showHome = false;
  constructor(
    private translateService: TranslateService,
    private service: DataServiceService,
    private router: Router,
    public ssoService: SsoAuthService,
    private changeDetect: ChangeDetectorRef,
    private subscribeService: SubscribeService,
    private route: ActivatedRoute,
    private callOutComeService: CallOutComeService,
    private modalService: NgbModal,
  ) { }

  menus = {
    home: false,
    netops: false,
    dashboard: false
  }

  ngOnInit(): void {
    let scopes = this.ssoService.getScopes();
    this.doSearch();


    if (environment.VALIDATE_SCOPE) {
      // scopes['cloud.rbac.csc.netops'] = scopes['cloud.rbac.csc.netops'] ? scopes['cloud.rbac.csc.netops'] : [];

      // if (scopes && scopes['cloud.rbac.csc.netops'] !== undefined && scopes['cloud.rbac.csc.netops'].indexOf('read') !== -1) {
      //   this.showNetops = true;
      // }

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.subscriber') !== -1) {
            this.showHome = true;
            break;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops') !== -1) {
            this.showNetops = true;
            break;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.dashboards') !== -1) {
            this.showDashboard = true;
            break;
          }
        }
      }

    } else {
      this.showHome = true;
      this.showNetops = true;
      this.showDashboard = true;
    }




    this.orgId = this.ssoService.getOrgId();
    const self = this;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    /* window.onclick = e => {
      console.log(e.target);  // to get the element
      console.log(e.target.tagName);  // to get the element tag name alone
    } */
    this.route.queryParams.subscribe(params => {
      if (this.router.url !== "/support/netops-management/subscriber-management") {
        this.searchText = history?.state?.searchText || history.state?.subscriberId;
      }
    });
    this.getScopes();

  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.dashboards'] = scopes['cloud.rbac.csc.dashboards'] ? scopes['cloud.rbac.csc.dashboards'] : [];
      scopes['cloud.rbac.csc.search'] = scopes['cloud.rbac.csc.search'] ? scopes['cloud.rbac.csc.search'] : [];

      if (scopes && (scopes['cloud.rbac.csc.dashboards'])) {
        if (scopes['cloud.rbac.csc.dashboards'].indexOf('read') !== -1 || scopes['cloud.rbac.csc.dashboards'].indexOf('write') !== -1) this.scopeFlag.dashboard = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.search'])) {
        if (scopes['cloud.rbac.csc.search'].indexOf('read') !== -1) this.scopeFlag.search = true;
      }
    } else {
      this.scopeFlag.dashboard = true;
      this.scopeFlag.search = true;
    }
  }

  // searchByCharacters(event) {
  //   const textEntered: string = $(event.target).val().toString();
  //   console.log("69", textEntered);
  //   if (textEntered.length < 2) return;
  //   this.searchResult = [];
  //   if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
  //   this.searchSubscriber = this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
  //     (res: any) => {
  //       if (res) {
  //         this.searchResult = res.records;
  //         this.changeDetect.detectChanges();
  //       }
  //     },
  //     err => {

  //     }
  //   );
  // }


  subscribers$;
  private searchText$ = new Subject<string>();

  search(subscribersName: string) {
    this.searchText$.next(subscribersName);
  }

  doSearch() {
    this.subscribers$ = this.searchText$.pipe(
      debounceTime(500),
      // distinctUntilChanged(), // removing for ==> this method makes if we search same value twise it not listing the data
      // switchMap(textEntered => 
      //   this.service.performSearch(this.orgId, textEntered, 1, 500))
      switchMap(textEntered => {
        this.ssoService.setRefreshTokenNew();
        return this.service.performSearch(this.orgId, textEntered, 1, 500)
      })
    ).subscribe(
      (res: any) => {
        if (res) {
          this.searchResult = res.records;
          this.changeDetect.detectChanges();
        }
      },
      err => {

      }
    );
  }


  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();  //this.ssoService.sanitizeSearch();
    console.log("69", textEntered);
    if (textEntered.length < 2) return;
    this.searchResult = [];

    this.searchText$.next(textEntered);
  }

  showSubscriber(subscriberId, devices) {
    localStorage.removeItem("callOutComeTicketID")
    if ((sessionStorage.getItem('insideSubView') == 'true' || sessionStorage.getItem('supportInsights')) && this.ssoService.commonOutcomeWarnConditn()) {
      document.getElementById('extUserCreateWarning').classList.remove('d-none')
      return;
    }
    $("#paramsPassed").text(subscriberId ? subscriberId : '');
    this.getSubscriberInfo(subscriberId, devices);
  }

  performSearch() {
    //this.searchText = this.ssoService.sanitizeSearch(this.searchText);
    localStorage.removeItem("callOutComeTicketID")
    this.subscribeService.showCount(false);
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    $("#paramsPassed").text($("#supportSearchId").val().toString());
    this.router.navigate(['/support/subscriber/search'], { state: { searchText: this.searchText || "" } });
  }

  getSubscriberInfo(subscriberId, devices) {
    const RGDevices = devices.filter(device => device.opMode == "RG");
    if (RGDevices.length > 1) {
      devices = [
        RGDevices[0],
        ...devices.filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
      ];
    }
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.deviceData`, JSON.stringify(devices));
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.subscriberId`, subscriberId);
    this.ssoService.setSubscriberEndpointId('');
    this.ssoService.setTrafficReportChartSubscriberInfo('');
    this.service.setSubscriberInfo(undefined);
    this.service.setSubscriberTabInfoData(undefined);
    this.service.removeDataSaver();
    this.service.multipleRegInstance = undefined;
    this.router.navigate(['/support/overview'], { state: { searchText: this.searchText || "" } });
    /* this.service.getSubscriberInfo(this.orgId, subscriberId)
    .then((res:any) => {
      if(res) {
        this.service.setSubscriberInfo(res);
        this.service.setSubscriberTabInfoData(res);
        this.router.navigate(['/support/overview']);
      }
    })
    .catch(err => {

    }); */
  }

  helpRoute() {
    const helpUrl = (this.ssoService.getCscType() === "DME") ?
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/dme/index.htm#88478.htm" :
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/help/index.htm#93079.htm";
    window.open(helpUrl, "_blank");
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
  }

  netopsClick() {
    this.service.removeDataSaver();
  }

  isMenuActive(menuName: string) {
    if ((window.location.pathname).indexOf(`${menuName}`) !== -1) {
      return true;
    }

    return false;
  }

  openOutModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', windowClass: 'custom-warning-modal clx-custom-modal',
      centered: true
    }).result.then((result) => {

      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  callOutcomeNotSavedLog() {
    (document.querySelector('#openLogoutConfirmationModel') as HTMLButtonElement).remove();
    const request = this.ssoService.auditLogParam(`Call Outcome not saved on logout`, 'Call outcome not saved');
    this.callOutComeService.Savepasspharseauditlog(request).subscribe(res => {
      this.router.navigate(['logout'])
    }, (error: any) => {
      this.router.navigate(['logout'])
    });
  }

  closeAllModal() {
    this.modalService.dismissAll();
  }

}
