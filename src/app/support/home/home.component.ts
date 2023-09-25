import { compileNgModule } from '@angular/compiler';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { DateUtilsService } from './../../shared-utils/date-utils.service';
import { HomeserviceService } from './homeservice/homeservice.service';
import { forkJoin, Subject } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
import { DataServiceService } from '../data.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { param } from 'jquery';

declare var require: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  showchart: boolean = false;
  loading: boolean = false;
  scopeFlag: any = {};
  public subscriberList: any = [];
  renderedOnce: boolean;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  insight: any = {};
  ponOutage: any = 0;
  ontSubImpact: any = {};
  hasCco: boolean = false;
  impacts: any = {};
  subAvailable: boolean;
  hasScopeAccess: boolean = false;

  constructor(private modalService: NgbModal,
    private translateService: TranslateService,
    private dataChartService: DataServiceService,
    public ssoService: SsoAuthService,
    private subscriberService: HomeserviceService,
    public dateService: DateUtilsService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private titleService: Title) {
    let url = this.router.url;
    this.ssoService.setActionLog('CSC', 'pageHit', 'RECENT_SUBSCRIBER', url, 'Home page loaded');
    this.frTable = this.customTranslateService.fr;
    this.esTable = this.translateService.es
    this.germanTable = this.translateService.de_DE
    setTimeout(() => {
      if (this.renderedOnce) this.renderTable(true);
    }, 500);
  }

  ngOnInit(): void {
    sessionStorage.removeItem('insideSubView');
    sessionStorage.removeItem('outsideUser');
    this.hasCco = this.ssoService.getEntitlements()[102];
    if (this.ssoService.getCscType() !== 'DME') {
      this.loadchart();
      this.insightStatus();
      this.getSubscribers();
      if (this.hasCco) this.getOutageStatus();
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.titleService.setTitle(`${this.language["Home"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);
      this.tableLanguageOptions();
      this.rerender()
    });
    this.titleService.setTitle(`${this.language["Home"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);
    this.getScopes();
    this.renderedOnce = false;
    this.tableLanguageOptions();
    if (history?.state?.externalUser) this.subAvailable = true;
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    scopes['cloud.csc.subscriber.list'] = scopes['cloud.csc.subscriber.list'] ? scopes['cloud.csc.subscriber.list'] : [];
    scopes['cloud.rbac.csc.search'] = scopes['cloud.rbac.csc.search'] ? scopes['cloud.rbac.csc.search'] : [];

    if (scopes && (scopes['cloud.rbac.csc.search'])) {
      if (scopes['cloud.rbac.csc.search'].indexOf('read') !== -1) this.scopeFlag.search = true;
    }
    if (scopes && (scopes['cloud.csc.subscriber.list'])) {
      if (scopes['cloud.csc.subscriber.list'].indexOf('read') !== -1 || scopes['cloud.csc.subscriber.list'].indexOf('write') !== -1) this.scopeFlag.subscriberList = true;
    }
    this.hasScopeAccess = false;
    if (scopes?.[`cloud.rbac.coc.issues.servicedisruptions`]) {
      this.hasScopeAccess = true;
    }
  }

  closeResult = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    localStorage.removeItem('OutageError');
  }

  loadchart() {
    this.dataChartService.singleColumnChartOptions().subscribe((data: any) => {
      this.showchart = true
      // const chart = Highcharts.chart('Network-chart', data);
    })
  }
  getSubscribers() {
    let orgId = this.ssoService.getOrgId();
    let userid = localStorage.getItem("calix.userId");
    this.loading = true;
    this.subscriberService.getsubscriber(orgId, userid)
      .subscribe((data: any) => {
        this.subscriberList = data;
        //this.hideNoDataRow();
        this.loading = false;
        let timer = 0;
        let intervalSet = setInterval(() => {
          timer++;
          if ($('tr .dataTables_empty').length && data && data.length) $('tr .dataTables_empty').parent().hide();
          if (timer == 10) clearInterval(intervalSet);
        }, 50);
        this.renderTable(false);
      },
        (err) => {

          this.loading = false;
          this.renderTable(false);
        });

  }

  subscriberView(subscriberId, subscriberAccount, subscriberName) {
    this.loading = true;
    this.dataChartService.searchBySubscriberId(subscriberId, this.ssoService.getOrgId()).subscribe(
      (res: any) => {
        this.loading = false;
        if (res && Object.keys(res).length) {
          const RGDevices = (res?.deviceData || []).filter(device => device.opMode == "RG");
          if (RGDevices.length > 1) {
            let firstRgDevice = res.deviceData.map(obj => obj.serialNumber);
            res.deviceData = [
              RGDevices[0],
              ...res?.deviceData.filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
            ];
            res.devices = [
              ...res.deviceData.map(obj => obj.serialNumber),
              ...res.devices.filter(obj => !firstRgDevice.includes(obj))
            ];
          }
          const discovered = (res?.deviceData || [])
            .reduce((curr, obj) => [...curr, ...[obj.macAddress, obj.registrationId, obj.serialNumber]], []);
          let undiscovered = ((res?.devices || []).reduce((initial, sn) => {
            if (!discovered.includes(sn)) {
              initial.push({ deviceId: sn });
            }
            return initial;
          }, [])) || [];
          sessionStorage.setItem(`${this.ssoService.getTabId()}calix.subscriberId`, subscriberId);
          //sessionStorage.setItem(`${this.ssoService.getTabId()}calix.deviceData`, JSON.stringify(res?.deviceData || []));
          sessionStorage.setItem(
            `${this.ssoService.getTabId()}calix.deviceData`,
            JSON.stringify([
              ...(res?.deviceData || []),
              ...undiscovered
            ])
          );
          this.dataChartService.setSubscriberInfo(undefined);
          this.dataChartService.multipleRegInstance = undefined;
          this.dataChartService.setSubscriberTabInfoData(undefined);
          this.dataChartService.removeDataSaver();
          this.router.navigate(['/support/overview']);
        } else {
          /* $('#supportSearchId').val(filterValue);
          setTimeout(() => {
            $('#performSearchId').trigger('click');
          }, 500); */
          this.router.navigate(['./support/subscriber/search'], { state: { subscriberId: subscriberId, filterValue: subscriberName, isHome: true } });
        }
      },
      err => {
        this.loading = false;
        this.router.navigate(['./support/subscriber/search'], { state: { subscriberId: subscriberId, filterValue: subscriberName, isHome: true } });
      }
    );
  }
  orgId;
  subscriberViewWithSearchApi(subscriberId, subscriberAccount, subscriberName) {
    localStorage.removeItem("callOutComeTicketID")
    /* 
      Previously subscriberView() function was triggered on subscriber selection
    */
    this.loading = true;
    const params = new HttpParams()
      // .set("orgId", this.ssoService.getOrgId())
      .set("filter", (subscriberId ? (`subscriberid:${subscriberId}`) : ""))
      .set("pageNumber", '1')
      .set("pageSize", '1')
    if (this.ssoService.getOrg(this.orgId)) {
      params.set("orgId", this.ssoService.getOrgId())
    }
    this.dataChartService.cscSearch(params).subscribe(
      (res: any) => {
        this.loading = false;
        if (res && Object.keys(res).length) {
          let deviceSet = res?.metadata?.totalHits ? res?.records[0]?.devices : []
          const RGDevices = deviceSet.filter(device => device.opMode == "RG");
          if (RGDevices.length > 1) {
            deviceSet = [
              RGDevices[0],
              ...deviceSet.filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
            ];
          }
          const devices = (deviceSet.length && Array.isArray(deviceSet[0])) ? deviceSet[0] : deviceSet;
          sessionStorage.setItem(`${this.ssoService.getTabId()}calix.subscriberId`, subscriberId);
          sessionStorage.setItem(`calix.deviceData`, JSON.stringify(devices));
          this.dataChartService.setSubscriberInfo(undefined);
          this.dataChartService.multipleRegInstance = undefined;
          this.dataChartService.setSubscriberTabInfoData(undefined);
          this.dataChartService.removeDataSaver();
          this.ssoService.setSubscriberEndpointId('');
          this.ssoService.setTrafficReportChartSubscriberInfo('');
          this.router.navigate(['/support/overview']);
        } else {
          this.router.navigate(['./support/subscriber/search'], { state: { subscriberId: subscriberId, filterValue: subscriberName, isHome: true } });
        }
      },
      err => {
        this.loading = false;
        this.router.navigate(['./support/subscriber/search'], { state: { subscriberId: subscriberId, filterValue: subscriberName, isHome: true } });
      }
    );
  }


  timeConvertor(date) {
    if (date) {
      if (date.includes("Z") || date.includes("z")) { return date.toLocaleString(); }
      else {
        let newDate = new Date(date + 'Z');
        return newDate.toLocaleString();
      }
    }
    else
      return date;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  renderTable(rerender?) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      processing: false,
      dom: 'tipr',
      columnDefs: [
        // {
        //   targets: [0, 2], orderable: false
        // }
        { orderable: false, targets: [0, 2, 3, 4] }
      ],
      order: []
    }

    this.tableLanguageOptions();
    setTimeout(() => {
      this.dtTrigger.next();
      this.rerender();
    }, 200);
  }

  rerender(): void {
    if (!this.dtElement?.dtInstance) return;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  lastContactSort() {
    /* setTimeout(() => {
      const table = $('#recentListTable').DataTable();
      this.subscriberList = this.subscriberList.sort((a, b) => (a.lastContact < b.lastContact) ? 1 : ((a.lastContact > b.lastContact) ? -1 : 0))
      let data = table.column(-1).data().sort((a, b) => (a.includes('11')) ? 1 : ((!a.includes('11')) ? -1 : 0));
      data.rows().invalidate().draw();
      $('#recentListTable').DataTable();
    }, 400); */
  }

  insightStatus() {
    const orgId = this.ssoService.getOrgId();
    const insightApi = [
      //this.subscriberService.getActiveSubscriber(orgId),
      this.subscriberService.getActiveRGs(orgId),
      this.subscriberService.getSystemReboot(orgId),
      //this.subscriberService.getSpeedTestFailure(orgId),
    ];
    forkJoin(insightApi).subscribe(res => {
      const [RGs, sysReboot] = [
        //this.calculateInsights(res[0], "count"),
        this.calculateInsights(res[0], "rgActive"),
        this.calculateInsights(res[1], "count"),
        //this.calculateInsights(res[2], "failures")
      ]
      this.insight = {
        /* subsVal: subs[0],
        subsPerc: subs[1],
        subsState: subs[2], */
        RGsVal: RGs[0],
        RGsPerc: RGs[1],
        RGsState: RGs[2],
        sysRebootVal: sysReboot[0],
        sysRebootPerc: sysReboot[1],
        sysRebootState: sysReboot[2],
        /* STFailureVal: STFailure[0],
        STFailurePerc: STFailure[1],
        STFailureState: STFailure[2] */
      };
    }, err => {

    });
  }

  calculateInsights(value, key) {
    if (!value.length) return [0, 0, 1]
    else if (value.length == 1) return [value[0][key], 100, 1]
    else {
      const diff = value[0][key] - value[1][key];
      return [
        value[0][key],
        diff ? (diff == value[0][key] ? (diff * 100) : ((Math.abs(diff) / value[1][key]) * 100).toFixed(2)) : 0,
        (diff > -1 ? 1 : 0)];
    }

  }
  alertMessage;
  isError: boolean = false;
  pageErrorHandle(err: HttpErrorResponse, type = "") {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 500 && type == "callcoutcome") {
      this.alertMessage = this.language['internalServerError'];
    }
    else {
      this.alertMessage = this.ssoService.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }
  getOutageStatus() {
    this.subscriberService.getTotalImpacts().subscribe((res: any) => {
      this.impacts = res?.length ? res[0] : {};
    }, err => {
      this.pageErrorHandle(err);
    });
  }
  navigateToCCOAlerts() {
    window.open('/cco/alerts/disruption/list', "_blank");
    //  this.router.navigate(['/cco/alerts/disruption/list']);
  }
}
