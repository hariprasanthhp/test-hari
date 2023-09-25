import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../shared/services/websocket.service';
import { CcochartService } from './service/ccochart.service';
import { NfainventoryService } from './service/nfainventory.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Subject } from 'rxjs';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { ThresholdService } from 'src/app/sys-admin/cco-admin/cco-health-threshold/threshold.service';
@Component({
  selector: 'app-pon-utilization',
  templateUrl: './pon-utilization.component.html',
  styleUrls: ['./pon-utilization.component.scss']
})
export class PonUtilizationComponent implements OnInit, OnDestroy {
  private _iDisplayStart: number;
  language;
  languageSubject;
  ponCounts: any = 0;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  loading: boolean;
  countData: any;
  count: any = 0;
  totalcount: any;
  quarantinedcount: any;
  quarantinedcounts: any;
  ponutilizationchart: any;
  PONCAPACITY: any = 0;
  FromDate: any;
  menus: any = [];
  isToggleSidebar = false;
  topONTs:boolean = false;
  ponCapacitytd:boolean;
  modalRef: any;
  startTime: Date;
  endTime: Date;
  affectedPorts: any;
  errormsg: any;
  TopONt: any;
  interface: any;
  system: any;
  dtsub: any;
  isTableLoaded: boolean;
  thresholdData: any;
  hasWriteAccess: boolean;
  hasShowAccess: boolean;
  showTheshold: boolean;
  constructor(
    private translateService: TranslateService,
    private nfainventoryservice: NfainventoryService,
    private ccochatservice: CcochartService,
    private sso: SsoAuthService,
    private dateUtils: DateUtilsService,
    private websocketService: WebsocketService,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private router: Router,
    private service: ThresholdService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;

    })
    this.getData();
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']) {
      this.hasShowAccess = true;
    }
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {


          if (validScopes[i].indexOf('cloud.rbac.coc.health.pon.realtime') !== -1) {
            this.menus['realtime'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.health.pon.report') !== -1) {
            this.menus['report'] = true;
            continue;
          }
        }
      }

    } else {
      this.menus = {
        realtime: true,
        report: true
      }
    }
    this.totalcount = this.nfainventoryservice.GetPonCount('totalcount').subscribe((res: any) => {
      this.ponCounts = res?.count?.toLocaleString();
    });

    // this.quarantinedcount = this.nfainventoryservice.GetPonCount('quarantine').subscribe((res: any) => {
    //   this.quarantinedcounts = res;
    // });
    // let date = new Date();
    // this.FromDate = new Date(date.getTime() - (0 * 24 * 60 * 60 * 1000));
    this.FromDate = Math.ceil(((this.dateUtils.getStartUtcTimeByDaysseconds(0) - 86400000)) / 1000);
    let pFromDate = Math.ceil(this.dateUtils.getStartUtcTimeByDaysseconds(0) / 1000);
    let query = `tenant=0&granularity=15min&startTime=${this.FromDate}&endTime=${pFromDate}`;
    this.ponutilizationchart = this.ccochatservice.Getutilizationthresholdexceededcount(query, 'pon').subscribe(res => {
      if (res) {
        let data = []
        data = Object.values(res);
        data.forEach(element => {
          if (element.dsUtilExcCnt && element.dsUtilExcCnt != 'undefined')
            this.PONCAPACITY = this.PONCAPACITY + element.dsUtilExcCnt;
          if (element.usUtilExcCnt && element.usUtilExcCnt != 'undefined')
            this.PONCAPACITY = this.PONCAPACITY + element.usUtilExcCnt;
        });
        this.PONCAPACITY = this.PONCAPACITY?.toLocaleString();
        //console.log(this.PONCAPACITY, 'this.PONCAPACITY ');
      }
    })
  }
  convert_number(value) {
    if (value) {
      return parseFloat((value * 100).toPrecision(12));
    } else {
      return value;
    }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if(this.dtsub) this.dtsub.unsubscribe();
    if (this.totalcount) this.totalcount.unsubscribe();
    if (this.quarantinedcount) this.quarantinedcount.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  toggleSideBar() {
    this.isToggleSidebar = !this.isToggleSidebar;
    this.websocketService.shouldReflow = true;
    this.sso.triggerToggle();
  }
  getData() {
    this.service.getThresholds().subscribe((data: any) => {
      this.loading = false;
      //this.thresholdData=data
      if (data ){
        this.thresholdData=data;
        this.showTheshold =true;
      }
      else{
        this.showTheshold =false;
      }
    }, err => {
      this.loading = false;
      
      //this.pageErrorHandle(err);
    })
  }
  showPonModelOpen(){
    this.router.navigate([ '/cco/health/pon-utilization/ONT']);
  }
  
  rerender(): void {
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
    });
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  GoBack(){
    this.topONTs=false
    this.ponCapacitytd=true
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number, true, 5)
  }

  errorHandler(err){
    if (err.status == 401) {
      this.errormsg = this.language['Access Denied'];
    }
    else {
      this.errormsg = this.commonOrgService.pageErrorHandle(err);
    }
  }

  navigateThreshold(){
    this.router.navigate(['/cco/operations/health/monitoring-thresholds'])
  }

 
}
