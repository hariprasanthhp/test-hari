import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { PerformanceServiceService } from './performance-testing.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';

import { DevicesWizardComponent } from './performance-wizard/devices-wizard/devices-wizard.component';
import { InstanceWizardComponent } from './performance-wizard/instance-wizard/instance-wizard.component';
import { ServerDetailsWizardComponent } from "./performance-wizard/server-details-wizard/server-details-wizard.component";
import { ScheduleWizardComponent } from './performance-wizard/schedule-wizard/schedule-wizard.component';
import { DownloadService } from '../../../../shared/services/download.service';
import { environment } from 'src/environments/environment';
import { DateUtilsService } from "src/app/shared-utils/date-utils.service";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-performance-testing',
  templateUrl: './performance-testing.component.html',
  styleUrls: ['./performance-testing.component.scss']
})
export class PerformanceTestingComponent implements OnInit {
  @ViewChild(DevicesWizardComponent)
  private devicesWizardComponent: DevicesWizardComponent;

  @ViewChild(InstanceWizardComponent)
  private instanceWizardComponent: InstanceWizardComponent;

  @ViewChild(ServerDetailsWizardComponent)
  private serverDetailsWizardComponent: ServerDetailsWizardComponent;

  @ViewChild(ScheduleWizardComponent)
  private scheduleWizardComponent: ScheduleWizardComponent;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  enTable: DataTables.LanguageSettings;
  language: any;
  languageSubject;
  activeTab: string = 'TestInstance';

  orgId;
  performanceDataSubscribe;
  performanceDataGrid: any = [];

  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    ordering: false
  };

  isRerender = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  loading: boolean = true;
  addPerformance = false
  inputData = {
    // orgId: 0,
    name: "",
    devices: [],
    description: "",
    timezone: "",
    primaryOoklaServerId: 0,
    secondaryOoklaServerId: 0,
    primaryOoklaServerHostname: "",
    secondaryOoklaServerHostname: "",
    primaryOoklaServerCityState: "",
    secondaryOoklaServerCityState: "",
    primaryOoklaServerAsn: 0,
    secondaryOoklaServerAsn: 0,
    startDate: '',
    numberOfDays: 0,
    startHour: 0,
    numberOfHours: 0,
    serviceTierDownloadSpeed: 0,
    serviceTierUploadSpeed: 0,
    speedThreshold: 0,
    latencyThreshold: 0,
    consumerDataRateThreshold: 0,
    consumerDataRateThresholdUs: 0,
    subscribers: [],
    levelPassed: 0,
    status: '',
    serviceTierandTrshldChecked: false,
    serviceTier: '',
    protocols: [],
    downloadUrl: '',
    uploadUrl: '',
    uploadFileSize: '',
    verifyDevice: false
  };

  valid = {
    TestInstance: 1,
    Devices: 2,
    TestServerDetails: 3,
    TestSchedule: 4,
    Review: 5
  };

  validlevels = {
    1: 'TestInstance',
    2: 'Devices',
    3: 'TestServerDetails',
    4: 'TestSchedule',
    5: 'Review'
  };




  viewPerformanceTest = false;

  dataAvailable: boolean;
  hasWriteAccess = false;

  dtOptions: DataTables.Settings = {};
  hasScopeAccess = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private performanceService: PerformanceServiceService,
    private commonOrgService: CommonService,
    public sso: SsoAuthService,
    private downloadService: DownloadService,
    private dateUtilsService: DateUtilsService, private titleService: Title

  ) {
    this.orgId = this.sso.getOrgId();
    console.log(this.router.url);
    this.frTable = this.translateService.fr;
    this.enTable = this.translateService.en;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE
  }

  testId: any = '';
  downloadAccess = false;
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration/performance-testing')) {
      this.titleService.setTitle(`${this.language['Performance Testing']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco/operations/configuration/performance-testing')) {
      this.titleService.setTitle(`${this.language['Performance Testing']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Performance Testing']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    // this.titleService.setTitle('Calix Cloud - Operations - Operations - Performance Testing');
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.testId = id;
      this.viewTest(id);
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      setTimeout(() => {
        this.rerender();
      }, 500);
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    let scopes = this.sso.getScopes();

    if (!this.router.url.includes('cco/operations/configuration')) {
      if (environment.VALIDATE_SCOPE) {

      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }

      scopes['cloud.rbac.csc.netops.operations.perf_testing'] = scopes['cloud.rbac.csc.netops.operations.perf_testing'] ? scopes['cloud.rbac.csc.netops.operations.perf_testing'] : [];

      if (scopes['cloud.rbac.csc.netops.operations.perf_testing'].length) {
        this.hasScopeAccess = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.netops.operations.perf_testing'] && scopes['cloud.rbac.csc.netops.operations.perf_testing'].indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {

        if (scopes?.['cloud.rbac.coc.operations.configuration.performancetesting']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.operations.configuration.performancetesting']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

    this.GetPerformanceDataGrid();
    this.inputData['orgId'] = this.sso.getOrgId();

    let entArr = this.sso.getEntitlementsArr();
    if (entArr.indexOf("131") !== -1) {
      this.downloadAccess = true;
    }

  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  GetPerformanceDataGrid() {
    this.dtOptions = {
      info: false,
      paging: false,
      lengthChange: false,
      searching: false,
      order: [[3, 'asc']],
      columnDefs: [
        { targets: [0, 1, 2, 3, 4], orderable: true, searchable: false },
        { targets: 5, orderable: false }
      ],
    };

    this.performanceDataSubscribe = this.performanceService.GetPerformanceDataGrid(this.orgId).subscribe((res: any) => {
      if (res) {
        //this.performanceDataGrid = res;
        let data = [];
        if (res) {

          let length = res.length;
          for (let i = 0; i < length; i++) {
            res[i]['startDateNew'] = this.dateUtilsService.getUserDateTimeByTimeZone(res[i]['startDate']);
            data.push(res[i]);
          }
        }
        this.performanceDataGrid = data;


        // console.log(this.performanceDataGrid);
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
          setTimeout(() => {
            this.dataAvailable = true;
          }, 200);
        }
      }
    }, (err: HttpErrorResponse) => {
      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
        this.dataAvailable = true;
      }
      this.loading = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      //this.loading = false;
    });
    this.tableLanguageOptions();
  }

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (sessionStorage.getItem('defaultLanguage') == 'es') {
      this.dtOptions.language = this.esTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') == 'en' && this.dtOptions.language) {
      this.dtOptions.language = this.enTable;
    }
  }

  setTableOptions(type?: string) {
    this.loading = false;
    return;
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: 'id',
      lengthChange: false,
      pageLength: 2,
      //searching: false,
      dom: 'tipr',
      columnDefs: [
        { targets: [1, 2, 3, 4], orderable: false },
        { targets: [0], orderable: true }
      ],
      order: [0, 'asc'],
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
        }

        setTimeout(() => {
          $('.odd').css('display', 'none');
        }, 100);

      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        console.log('row callback')
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          alert(1);
        });
        return row;
      }
    };

    // this.tableLanguageOptions();
    if (type && type == 'language') {
      console.log('type && type')
      setTimeout(() => {
        this.rerender();
        setTimeout(() => {
          // this.dataAvailable = true;
          this.loading = false;
        }, 100);
      }, 100);
    } else {
      setTimeout(() => {
        // this.dataAvailable = true;
        // this.hideSearch();
        this.loading = false;
      }, 500);
    }

  }

  // Add performance

  getStartData(event) {
    this.inputData = event;
    this.setValidation('TestInstance');
  }
  getDeviceData(event) {
    this.inputData = event
    console.log('event', this.inputData)
    this.setValidation('Devices');

  }
  getServerData(event) {
    console.log('sdf', event)
    this.inputData = event;
    this.setValidation('TestServerDetails');
  }
  getScheduleData(event) {
    console.log('sdf', event)

    this.inputData = event;
    this.setValidation('TestSchedule');
  }
  getReviewData(event) {
    this.inputData = event;
    this.setValidation('Review');
  }

  getCurrentTab(event) {
    this.activeTab = event
    this.setStepperColors();
    console.log('event', this.inputData)
  }



  addForm() {
    this.addPerformance = true;
  }

  deleteId = '';
  testName = '';
  btnDisabled = false;
  deleteTest(item) {
    this.deleteId = item._id;
    this.testName = item.name;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  doDeleteTest() {
    this.btnDisabled = true;
    this.performanceService.delete(this.deleteId).subscribe((json: any) => {
      console.log(json);
      this.btnDisabled = false;
      this.deleteId = '';

      this.isRerender = true;
      this.GetPerformanceDataGrid();

    }, (err: any) => {
      this.btnDisabled = false;
      this.deleteId = '';
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  cloneTest(obj): any {
    this.addPerformance = true;
    obj.name = '';
    delete obj._id;
    if (obj['serviceTierDownloadSpeed'] && obj['serviceTierDownloadSpeed'] >= 1000 && obj['serviceTierUploadSpeed'] && obj['serviceTierUploadSpeed'] >= 1000) {
      obj['serviceTier'] = 'Mbps';
    }
    this.inputData = obj;
    this.inputData.levelPassed = 0;
    this.inputData.verifyDevice = true;

    console.log(this.inputData);
  }

  setValidation(key) {
    //this.inputData.levelPassed = this.valid[key];
  }

  setActiveTab(value) {

    let tab = this.valid[value];

    if (this.activeTab == 'TestInstance') {
      this.instanceWizardComponent.go_next();

    } else if (this.activeTab == 'Devices') {
      if (!this.devicesWizardComponent.go_next()) {
        return;
      }

    } else if (this.activeTab == 'TestServerDetails') {
      if (!this.serverDetailsWizardComponent.go_next()) {
        return;
      }
    } else if (this.activeTab == 'TestSchedule') {
      if (!this.scheduleWizardComponent.go_next()) {
        return;
      }
    }


    if (this.inputData.levelPassed >= tab - 1) {
      this.activeTab = value;
    } else {
      this.activeTab = this.validlevels[this.inputData.levelPassed + 1]
    }

    // setTimeout(() => {

    // }, 500);

    this.setStepperColors();


  }

  setStepperColors() {

    let activeInt = this.valid[this.activeTab];

    for (let i = 1; i <= this.inputData.levelPassed; i++) {
      $(`#stepper-${this.validlevels[i]}`).removeClass('step-current');
      $(`#stepper-${this.validlevels[i]}`).removeClass('step-done');

      // if (i == 1) {
      //   continue;
      // }

      if (activeInt === i) {
        $(`#stepper-${this.validlevels[i]}`).addClass('step-current');
      } else {
        $(`#stepper-${this.validlevels[i]}`).addClass('step-done');
      }

    }

    if (this.inputData.levelPassed === 5 && activeInt !== 5) {
      $(`#stepper-Review`).removeClass('step-done');
      $(`#stepper-Review`).removeClass('step-current');
    }

  }

  viewTestId: any;
  viewTest(_id): any {
    this.loading = true;
    this.viewTestId = _id;
    this.viewPerformanceTest = true;

    this.performanceService.view(_id).subscribe((json: any) => {
      this.loading = false;
      if (json && json['serviceTierDownloadSpeed'] && json['serviceTierDownloadSpeed'] >= 1000 && json['serviceTierUploadSpeed'] && json['serviceTierUploadSpeed'] >= 1000) {
        json['serviceTier'] = 'Mbps';
      }
      this.inputData = json;
      this.inputData.levelPassed = 5;
      this.btnDisabled = false;

      console.log(this.inputData);
    }, (err: any) => {
      console.log(err);
      this.loading = false;
      this.btnDisabled = false;
      this.pageErrorHandle(err);
    });
  }

  gotoViewTest(id) {
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing/${id}`,
      `./cco/operations/cco-system-operations/performance-testing/${id}`, '',
      `/cco/operations/configuration/performance-testing/${id}`

    ]);
    // /cco/operations/cco-subscriber-operations/operations/performance-testing
  }

  editTestFlag = false;
  editTest(): any {
    if (this.inputData['status'] == 'In Progress') {
      return;
    }
    this.viewPerformanceTest = false;
    this.editTestFlag = true;
    this.addPerformance = true;
  }

  suspend(id) {
    this.btnDisabled = true;
    this.performanceService.suspend(id).subscribe((json: any) => {
      console.log(json);
      this.btnDisabled = false;
      this.successInfo = `Test ${this.inputData.name} ${this.language['Successfully_Suspended']}`;
      this.showSuccess(this.successInfo);

      setTimeout(() => {
        this.reload();
      }, 2000);

    }, (err: any) => {
      this.btnDisabled = false;
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  resume(id) {
    this.btnDisabled = true;
    this.performanceService.resume(id).subscribe((json: any) => {
      console.log(json);
      this.btnDisabled = false;
      this.successInfo = `Test ${this.inputData.name} ${this.language['Successfully_Resumed']}`;
      this.showSuccess(this.successInfo);

      setTimeout(() => {
        this.reload();
      }, 2000);


    }, (err: any) => {
      this.btnDisabled = false;
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  reload(): any {

    let pathname = window.location.pathname;

    if (pathname.indexOf('/cco/operations/') !== -1) {
      this.router.navigate([pathname]);
      setTimeout(() => {
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
      }, 200);

      return;

    }

    this.sso.redirectByUrl([
      (this.router.url.includes('/cco') ? '' : this.router.url),
      (this.router.url.includes('/cco') ? this.router.url : '')
    ]);
    setTimeout(() => {
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }, 200);
    //this.router.navigate([this.router.url]);
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
    this.success = false;
  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  cancelDelete() {
    this.deleteId = '';
  }

  downloadReport(): any {
    this.performanceService.download(this.testId).subscribe((json: any) => {
      console.log(json);
      let fileName = `${this.inputData.name}-test-results-${this.inputData.startDate}`
      this.downloadService.saveToDisk(json.filename, fileName);
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  getDate(dateStr: any) {
    return this.dateUtilsService.getUserDateTimeByTimeZone(dateStr);
  }

}
