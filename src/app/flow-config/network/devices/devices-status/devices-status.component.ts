import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';
import { EndpointManagementService } from 'src/app/flow-config/services/endpoint-management.service';
import { NetworkDevicesApiService } from 'src/app/flow-config/services/network-devices-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-devices-status',
  templateUrl: './devices-status.component.html',
  styleUrls: ['./devices-status.component.scss']
})
export class DevicesStatusComponent implements OnInit {
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  public language: any;
  public statusTableOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'full_numbers',
    stateSave: false,
    order: [0, 'asc'],
    columnDefs: [
      { targets: [1, 2, 3, 4], orderable: false },
    ],
    lengthChange: true,
    ordering: true,
    searching: true,
  };
  public dtInstance: Promise<DataTables.Api>;

  public dtTrigger: Subject<any> = new Subject();
  public countSub: any
  public getDeviceStatusListSub: any;
  private translateSub: any;
  public MODULE: string;
  public ORG_ID: number | string;
  public counts = {
    discoveredCount: null,
    mappedCount: null,
  }

  public show = {
    count: false,
    loading: false
  }
  public mappedPercentage: any = 0;
  public deviceStatusData = []

  public infoTitle: string;
  public infoBody: string;
  public modalRef: any;

  constructor(
    public translateService: TranslateService,
    public commonOrgService: CommonService,
    private titleService: Title,
    private router: Router,
    private sso: SsoAuthService,
    private endpointManagementService : EndpointManagementService,
    private http: HttpClient,
    private networkDeviceApiService: NetworkDevicesApiService,
    private dialogService: NgbModal,

  ) {
    this.language = this.translateService.defualtLanguage;

    const url = this.router.url;
    this.commonOrgService.closeAlert();
    this.MODULE = this.sso.getRedirectModule(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    // this.setTableOptions();
    this.translateSub = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    //  this.setTableOptions('language')
      this.titleService.setTitle(`${this.language['Bsp_Microsite_Status']} - ${this.language['devices']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
        this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
        this.reloadCurrentRoute();
    });

    this.titleService.setTitle(`${this.language['Bsp_Microsite_Status']} - ${this.language['devices']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.commonOrgService.setKey('deviceIp', null);
    // this.setTableOptions();
  }

  ngOnInit(): void {
    this.getCounts();
    this.getDeviceStatusList();
  }


  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

    if (this.translateSub) {
      this.translateSub.unsubscribe();
    }

    if (this.countSub) {
      this.countSub.unsubscribe();
    }
  }

  getDeviceStatusList() {
    this.show.loading = true;
    this.getDeviceStatusListSub = this.networkDeviceApiService.DeviceStatusList(this.ORG_ID).subscribe((res: any) => {
      this.show.loading = false;
    //  this.rerender();
      if (res && res.metrics && res.metrics.length) {
        this.deviceStatusData = res.metrics;
      //  this.dtTrigger.next();
      }
      this.tableLanguageOptions();
      this.dtTrigger.next();
    }, (err: HttpErrorResponse) => {
      this.show.loading = false;
      this.rerender();
      this.pageErrorHandle(err);
    });
  }

  getCounts() {
    const responses = {};
    responses['mappedCount'] = this.endpointManagementService.getMappedcount(this.ORG_ID).pipe(
      catchError(err => {
        return of(err);
      })
    );

    responses['unmappedCount'] = this.endpointManagementService.getUnmappedcount(this.ORG_ID).pipe(
      catchError(err => {
        return of(err);
      })
    );
    this.countSub = forkJoin(responses).subscribe((json: any) => {

      this.counts.discoveredCount = json?.mappedCount + json?.unmappedCount;
      this.counts.mappedCount = json?.mappedCount;
      this.getMappedPercentage();
      this.show.count = true;
    });

  }

  getMappedPercentage() {
    this.mappedPercentage = (this.counts.mappedCount / this.counts.discoveredCount) * 100;
    this.mappedPercentage = this.mappedPercentage ? this.mappedPercentage.toFixed(2) : 0;
  }

  public routeToDevicePlaceholder(deviceIp: string) {
    this.commonOrgService.setKey('deviceIp', deviceIp);
    this.router.navigate([`${this.MODULE}/devices-name-placeholder`], { state: { data: deviceIp } });
  }

  public setTableOptions(type?: string) {
    // this.statusTableOptions = {
    //   pagingType: 'full_numbers',
    //   order: [0, 'asc'],
    //   columnDefs: [
    //     { targets: [1, 2, 3, 4], orderable: false },
    //   ],
    //   stateSave: false,
    //   pageLength: 10,
    //   lengthChange: true,
    //   ordering: true,
    //   searching: true,
    //   dom:'tipr',
    // };

    this.tableLanguageOptions();

    if (type && type == 'language') {
      setTimeout(() => {
       // this.rerender();
        // this.dataAvailable = true;
        this.show.loading = false;
      }, 200);
    } else {
      setTimeout(() => {
        // this.dataAvailable = true;
        this.show.loading = false;
      }, 200);
    }
  }

  public rerender(): void {
    this.dtTrigger.next();
  }
  

  public tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.statusTableOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.statusTableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.statusTableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.statusTableOptions.language) {
      delete this.statusTableOptions.language;
    }
  }

  public openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal);
  }

  public closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse, title?: string) {
    let errorInfo = '';
      if (err?.error?.code === 404) {
        return;
        }
    if (err.status == 400 || err.status == 417) {
      if (err.status == 417 && err?.error?.message) {
        this.infoBody = err?.error?.message;
      } else {
        this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      }
      this.infoTitle = title ? title : 'Error';
      this.openInfoModal();
      this.show.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.show.loading = false;
      setTimeout(() => {
        this.commonOrgService.closeAlert();
      }, 3000)
    }

  }


  formatBytes(bits, decimals = 2) {
    if (!+bits) return '0 Bits'
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bits', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']
    const i = Math.floor(Math.log(bits) / Math.log(k));

    return `${parseFloat((bits / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  formatPacket(packets, decimals = 2) {
    if (!+packets) return '0 pps'
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tbps', 'Ppps', 'Epps', 'Zpps', 'Ypsps']
    const i = Math.floor(Math.log(packets) / Math.log(k));

    return `${parseFloat((packets / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
