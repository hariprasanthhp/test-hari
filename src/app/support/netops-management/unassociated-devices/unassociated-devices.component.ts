import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { UnassociateddevicesService } from '../unassociated-devices/unassociateddevices.service'
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
import { ValidatorService } from 'src/app-services/validator.services';
import { DownloadService } from 'src/app/shared/services/download.service';

interface UnassociatedDevices {
  "serialNumber": string,
  "macAddress": string,
  "ipAddress": string,
  "softwareVersion": string,
  "modelName": number,
  "createTime": number,
  "lastInformTime": number

}

@Component({
  selector: 'app-unassociated-devices',
  templateUrl: './unassociated-devices.component.html',
  styleUrls: ['./unassociated-devices.component.scss']
})
export class UnassociatedDevicesComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  error: boolean;
  language: any;
  languageSubject;
  searchtext: string;
  unassociatedDeviceDataCount: any;
  loading: any;
  showcloseicon: boolean = false;
  orgId: any;
  errorInfo: string = '';
  showNoResults = false;
  public unassociatedDeviceData: UnassociatedDevices[] = [];
  tableHide: boolean = true;
  tableOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 15,
    // responsive: true,
    serverSide: false,
    processing: false,
    searching: true,
    ordering: true,
    dom: 'tipr',
    order: [],
    columnDefs: [
      { searchable: false, targets: [1, 3, 4, 5, 6, 7] },
    ],
  };

  frTable: any;
  esTable: any;
  germanTable: any;
  hasScopeAccess: boolean = false;
  hideExport: boolean = true;

  constructor(private translateService: TranslateService, private unassociateddevice: UnassociateddevicesService,
    private router: Router,
    private sso: SsoAuthService,
    private dateUtils: DateUtilsService,
    private service: DataServiceService,
    private downloadService: DownloadService,
    private commonOrgService: CommonService, private titleService: Title, private validatorService: ValidatorService,

  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE

  }
  setTitle(url) {
    if (!this.router.url.includes('cco/operations/cco-reports') && !this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Unassociated Systems']} - ${this.language['Reports']} - ${this.language['NetOps']} - ${this.language['Service']}- ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Unassociated Systems']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }


  ngOnInit(): void {
    // this.titleService.setTitle('Calix Cloud - Reports - Unassociated Systems');
    if (!this.router.url.includes('support/netops-management/reports/unassociated-devices')) {
      this.hideExport = false
    }
    else {
      this.hideExport = true
    }

    this.orgId = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.rerender();
      this.setTitle(this.router.url)
      //this.fetchConfigurationList();
    });
    this.setTitle(this.router.url)
    if (this.router.url.includes('cco/operations/cco-reports/unassociated-devices')) {
      let scopes = this.sso.getScopes();
      if (environment.VALIDATE_SCOPE) {

        let validScopes: any = Object.keys(scopes);
        if (validScopes) {
          for (let i = 0; i < validScopes.length; i++) {
            if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.unassociatedsystems') !== -1) {
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
  modelName: any = '';
  opmode: any = '';
  serialNumber: any = '';
  subscriber: any = '';
  inversely_time_period: any = false;
  getDeviceCount() {
    this.loading = true;
    this.unassociateddevice.getUnassociatedDeviceDataCount(this.orgId).subscribe((deviceData: any) => {
      this.loading = false;
      this.unassociatedDeviceDataCount = deviceData.count
      if (this.unassociatedDeviceDataCount === 0 || this.unassociatedDeviceDataCount != undefined) {
        this.showNoResults = true;
        this.tableHide = true;
      }
      this.tableHide = false;
      this.getDevices();
      this.getDateAndTimeConverted();
      this.getTable();
    }, (err: HttpErrorResponse) => {
      this.showNoResults = true;
      this.unassociatedDeviceDataCount = 0;
      this.loading = false;
      this.pageErrorHandle(err);
      $("body").scrollTop(0);
    })

  }

  getDevices() {
    this.loading = true;
    let params = {
      // orgId: this.sso.getOrg(this.orgId),
      limit: this.unassociatedDeviceDataCount,
      skip: 0,
      manufacturer: this.manufacturer,
      modelName: this.modelName,
      opmode: this.opmode,
      serialNumber: this.serialNumber,
      subscriber: this.subscriber,
      startTime: this.startTime,
      endTime: this.endTime,
      inversely_time_period: 'false',
      group_name: '',
      timeZ: '',
      // pageSize: 10,
      // pageNumber: 1,
    };

    this.unassociateddevice.getUnassociatedDeviceData(params).subscribe((deviceData: any[]) => {
      this.unassociatedDeviceData = deviceData
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
    const textEntered: string = obj.serialNumber;
    let device = []
    device.push(obj);
    const response = {
      devices: device
    }
    localStorage.setItem("calix.Device_Details", JSON.stringify(response));
    if (textEntered.length < 2) return;
    this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
      (res: any) => {
        if (res) {
          if (this.router.url.includes('/cco/')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            const url = this.router.createUrlTree([`/cco/system/cco-subscriber-system/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/unassociated-devices' } })
            window.open(url.toString(), '_blank')
            // this.router.navigate([`/cco/system/cco-subscriber-system/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/unassociated-devices' } })
          } else if (this.router.url.includes('cco-foundation')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            const url = this.router.createUrlTree([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/unassociated-devices' } })
            window.open(url.toString(), '_blank')
            // this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId, redirect: '/cco/operations/cco-reports/unassociated-devices' } })
          } else {
            sessionStorage.removeItem("calix.subscriberId");
            sessionStorage.setItem("calix.deviceData", JSON.stringify(res.records[0].devices));
            sessionStorage.setItem('calix.serialNo', textEntered)
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            const url = this.router.createUrlTree(['./support/router'])
            window.open(url.toString(), '_blank')
            // this.router.navigate(['./support/router']);
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
  public unassociatedDownloadData: UnassociatedDevices[] = [];
  downloadUnassociatedSysReport() {

    this.loading = true;
    let paramsD = {
      // orgId: this.sso.getOrgId(),
      file: 'true',
      timeZ: this.dateUtils.getLocalTimeZoneName(),
      regex: this.searchtext
    };

    this.unassociateddevice.getUnassociatedDeviceDownload(paramsD).subscribe((downloadData: any[]) => {
      this.unassociatedDownloadData = downloadData
      this.downloadService.saveToDisk(this.unassociatedDownloadData);
      this.loading = false
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.unassociatedDownloadData = []
      this.downloadService.saveToDisk(this.unassociatedDownloadData);
      this.pageErrorHandle(err);
      $("body").scrollTop(0);
    })

  }
  closeAlert() {
    this.error = false;
  }
}
