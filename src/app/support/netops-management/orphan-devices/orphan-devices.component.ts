import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { OrphandevicesService } from '../orphan-devices/orphandevices.service'
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DateUtilsService } from '../../../shared-utils/date-utils.service';
import { DataServiceService } from '../../data.service';
import { HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface OrphanDevices {
  "serialnumber": string,
  "macaddress": string,
  "ipaddress": string,
  "softwareversion": string,
  "modelname": number,
  "createtime": number,
  "lastinformtime": number

}

@Component({
  selector: 'app-orphan-devices',
  templateUrl: './orphan-devices.component.html',
  styleUrls: ['./orphan-devices.component.scss']
})
export class OrphanDevicesComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  error: boolean;
  language: any;
  languageSubject;
  searchtext: string;
  orphanDeviceDataCount: any;
  loading: any;
  showcloseicon: boolean = false;
  orgId: any;
  errorInfo: string = '';
  showNoResults = false;
  public orphanDeviceData: OrphanDevices[] = [];
  tableHide: boolean = true;
  tableOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 15,
    // responsive: true,
    serverSide: false,
    processing: false,
    searching: true,
    columnDefs: [
      { targets: [-1], orderable: false }
    ],
    dom: 'tipr',
  };

  frTable: any;
  esTable: any;
  germanTable: any;
  hasScopeAccess: boolean = false;
  orphanId: any;

  constructor(private translateService: TranslateService, private orphandevice: OrphandevicesService,
    private router: Router,
    private sso: SsoAuthService,
    private dateUtils: DateUtilsService,
    private service: DataServiceService,
    private commonOrgService: CommonService, private titleService: Title,
    private modalService: NgbModal

  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE

  }
setTitle(url){
  if (!this.router.url.includes('cco/operations/cco-reports') && !this.router.url.includes('cco-foundation')) {
    this.titleService.setTitle(`${this.language['Orphan Systems']}-${this.language['Reports']}-${this.language['NetOps']}-${this.language['Calix Cloud']}`);
  } else if (this.router.url.includes('cco-foundation')) {
    this.titleService.setTitle(`${this.language['Reports']}-${this.language['Deployment']}-${this.language['Calix Cloud']}`);
  } else {
    this.titleService.setTitle(`${this.language['Orphan Systems']}-${this.language['Reports']}-${this.language['Operations']}-${this.language['Operations']}-${this.language['Calix Cloud']}`);
  }
}


  ngOnInit(): void {
    // this.titleService.setTitle('Calix Cloud - Reports - Orphan Systems');


    this.orgId = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.rerender();
      //this.fetchConfigurationList();
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    if (this.router.url.includes('cco/operations/cco-reports/orphan-devices')) {
      let scopes = this.sso.getScopes();
      if (environment.VALIDATE_SCOPE) {

        let validScopes: any = Object.keys(scopes);
        if (validScopes) {
          for (let i = 0; i < validScopes.length; i++) {
            if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.orphansystems') !== -1) {
              this.hasScopeAccess = true;
              break;
            }
          }
        }
      } else {
        this.hasScopeAccess = true;
      }
      if (!this.hasScopeAccess) {
        this.sso.setPageAccess(false);
        return;
      }
    }

    this.getDeviceCount();
  }

  fetchConfigurationList() {

    this.tableOptions = {
      pagingType: "full_numbers",
      pageLength: 15,
      // responsive: true,
      serverSide: false,
      processing: false,
      searching: true,
      ordering: true,
      dom: 'tipr',

    };
  }


  startTime = 0;
  endTime = 0;
  manufacturer: any = '';
  modelname: any = '';
  opmode: any = '';
  serialnumber: any = '';
  subscriber: any = '';
  inversely_time_period: any = false;
  getDeviceCount() {
    this.loading = true;
    this.orphandevice.getOrphanDeviceDataCount(this.sso.getOrgId()).subscribe((deviceData: any) => {
      this.loading = false;
      this.orphanDeviceDataCount = deviceData.count
      if (this.orphanDeviceDataCount === 0 || this.orphanDeviceDataCount != undefined) {
        this.showNoResults = true;
        this.tableHide = true;
      }
      this.tableHide = false;
      this.getDevices();
      this.getDateAndTimeConverted();
      this.getTable();
    }, (err: HttpErrorResponse) => {
      this.showNoResults = true;
      this.orphanDeviceDataCount = 0;
      this.loading = false;
      this.pageErrorHandle(err);
      $("body").scrollTop(0);
    })

  }

  getDevices() {
    this.loading = true;
    let params = {
      orgId: this.sso.getOrgId(),
      limit: this.orphanDeviceDataCount,
      skip: 0,
      manufacturer: this.manufacturer,
      modelname: this.modelname,
      opmode: this.opmode,
      serialnumber: this.serialnumber,
      subscriber: this.subscriber,
      startTime: this.startTime,
      endTime: this.endTime,
      inversely_time_period: 'false',
      group_name: '',
      timeZ: '',
      // pageSize: 10,
      // pageNumber: 1,
    };

    this.orphandevice.getOrphanDeviceData(params).subscribe((deviceData: any[]) => {
      this.orphanDeviceData = deviceData
      this.loading = false;
      this.tableHide = false;
      this.dtTrigger.next();


    }, (err: HttpErrorResponse) => {
      this.showNoResults = true;
      this.loading = false;
      this.pageErrorHandle(err);
      $("body").scrollTop(0);
    })
    this.tableLanguageOptions();
  }

  assignToOrg(id) {
    this.loading = true;
    this.modalService.dismissAll();
    this.orphandevice.assignToOrg(id, this.orphanId).subscribe((res: any[]) => {
      this.loading = false;
      this.tableHide = true;
      //this.getDeviceCount();
      this.router.navigateByUrl('/support/dummy', { skipLocationChange: true }).then(() => {
        this.router.navigate(['support/netops-management/reports/orphan-devices'])
      });
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      $("body").scrollTop(0);
    })
  }

  openOutModal(content, orphanId) {
    this.orphanId = orphanId;
    const ngbOptions: any =
      { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-lg-modal' } //, backdrop: "static"

    this.modalService.open(content, ngbOptions).result.then((result) => {

    }, (reason) => {

    });
  }

  closeicon(term: string) {
    this.searchtext = ""

    this.showcloseicon = false
    this.search(this.searchtext);
  }
  /*  search(term: string) {
     if (term.length) this.showcloseicon = true;
     else this.showcloseicon = false;
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.columns(0).search(term).draw();
     });
     this.loading = false;
   } */
  search(term: string) {
    this.searchtext = term;
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  getDateAndTimeConverted() {
    let timeConversion = this.dateUtils.getCurrentUtcTime()
    return;
  }

  getTable() {
    this.tableHide = true;
  }

  snRedirection(obj) {
    const textEntered: string = obj.serialnumber;
    let device = []
    device.push(obj);
    const response = {
      devices: device
    }
    localStorage.setItem("calix.Device_Details", JSON.stringify(response));
    if (textEntered.length < 2) return;
    this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
      (res: any) => {
        console.log("res value", res);

        if (res) {
          if (this.router.url.includes('/cco/')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            this.router.navigate([`/cco/system/cco-subscriber-system/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/orphan-devices' } })
          } else if (this.router.url.includes('cco-foundation')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/orphan-devices' } })
          } else {
            sessionStorage.removeItem("calix.subscriberId");
            sessionStorage.setItem("calix.deviceData", JSON.stringify(res.records[0].devices));
            sessionStorage.setItem('calix.serialNo', textEntered)
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            this.router.navigate(['./support/router']);
          }
        }
      },
      err => {

      }
    );
    //obj.opMode='';


  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }
}
