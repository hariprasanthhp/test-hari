import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-operations-cloud-alarms',
  templateUrl: './operations-cloud-alarms.component.html',
  styleUrls: ['./operations-cloud-alarms.component.scss']
})
export class OperationsCloudAlarmsComponent implements OnInit {
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  renderedOnce: boolean = true;
  modalInfo: any;
  isDev = false;
  btnDisabled: boolean;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    paging: true,
    processing: false,
    dom: 'tipr',
    autoWidth: false,
    // stateSave: true,
    // stateDuration: -1,
    columnDefs: [
      { targets: [0], orderable: true, width: '30%' },
      { targets: [1], width: '20%', orderable: true },
      { targets: [2], width: '20%', orderable: true },
      { targets: [3], width: '20%', orderable: false },
      { targets: [4], width: '10%', orderable: false }

    ],
    order: [0, 'asc'],
    // columnDefs: [{targets : [2], width : '140'},{ targets: [3], orderable: false, className: 'dt-right', width : '140' }],
  };
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dataAvailable: boolean;
  frTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  dtInstance: Promise<DataTables.Api>;
  opsCloudAlarms: any = {
    alarmsData: [],
    searchedAlarm: undefined,
    searchedAlarmName: undefined,
    searchSeverity: 'allseverities',
    customAlarmsData: [],
    customBackupAlarmsData: [],
  };
  language: any;
  languageSubject: any;
  loading: boolean = false;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  colorClass = {
    MINOR: 'minor-select-inp',
    MAJOR: 'major-select-inp',
    CRITICAL: 'critical-select-inp',
    WARNING: "warning-select-inp",
    INFO: "severity-info-select-inp"
  };

  severityList = [
    {
      name: 'Critical',
      value: 'critical'
    },
    {
      name: 'Major',
      value: 'major'
    },
    {
      name: 'Minor',
      value: 'minor'
    },
    {
      name: 'Warning',
      value: 'warning'
    },
    {
      name: 'Info',
      value: 'info'
    }
  ]
  showcloseicon: boolean;
  deletedata: any;
  hasScopeAccess: boolean;
  hasWriteAccess: boolean;

  constructor(private translateService: TranslateService,
    private http: HttpClient,
    private commonOrgService: CommonService, private service: SsoAuthService,
    private titleService: Title, private router: Router,
    @Inject(DOCUMENT) private document: Document) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.germanTable = this.translateService.de_DE;
  }

  ngOnInit(): void {
    let scopes = this.service.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.alarms.alarmsettings']?.length) {
      this.hasScopeAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.alarms.alarmsettings']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    } else {
      // this.dtOptions['columnDefs'][3]['visible'] = false;
      this.dtOptions['columnDefs'][4]['visible'] = false;
    }

    if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
      this.isDev = true;
    }

    if (!this.hasScopeAccess) {
      this.service.setPageAccess(false);
      return;
    }

    this.language = this.translateService.defualtLanguage;
    let url = this.router.url;
    let MODULE = this.service.getRedirectModule(url);
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.loading = true;
        this.language = data;
        this.titleService.setTitle(`${this.language['Alarm Settings']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
        this.tableLanguageOptions();
        setTimeout(() => {
          this.rerender(true);
        }, 200)

      }
    );
    this.titleService.setTitle(`${this.language['Alarm Settings']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.renderedOnce = true;

    this.tableLanguageOptions();
    this.getAlarmListData();

  }
  rerender(search?): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    this.loading = false;
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  renderTable(rerender?) {
    //this.tableLanguageOptions();
    if (rerender) {
      this.rerender();
    } else {
      this.dtTrigger.next();
    }

    setTimeout(() => {
      this.dataAvailable = true;
      this.loading = true;
      // if(this.opsCloudAlarms.searchedAlarmName && this.opsCloudAlarms.searchedAlarmName != ''){
      //   this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      //     dtInstance.columns(0).search(this.opsCloudAlarms.searchedAlarmName ? this.opsCloudAlarms.searchedAlarmName : '').draw();
      //   });
      // }
      this.searchCustomAlarms(this.opsCloudAlarms.searchSeverity);
      let term = {
        alarm_name: this.opsCloudAlarms.searchedAlarmName ? this.opsCloudAlarms.searchedAlarmName : ''
      }
      this.searchAlarmsFromMaster(term);
      this.loading = false;
    }, 500)
  }

  getAlarmListData() {
    this.loading = true;
    this.http
      .get(`${this.baseUrl}alarmMasterDetails`)
      .subscribe((json: any) => {
        let alarmsData = [];
        if (json && json.length > 0) {
          json.forEach((element) => {
            element['alarm_name'] = element['name'] ? element['name'] : '';
            element['alarm_category'] = element['category'] ? element['category'] : '';
            element['severity_class'] = element['perceivedSeverity'] ? element['perceivedSeverity']?.toUpperCase() : '';
            element['severity'] = element['perceivedSeverity'] ? element['perceivedSeverity']?.toLowerCase() : '';
            element['originalseverity'] = element['perceivedSeverity'] ? element['perceivedSeverity']?.toUpperCase() : '';
            element['dispOriginalSeverity'] = element['perceivedSeverity'] ? element['perceivedSeverity']?.charAt(0).toUpperCase() + element['perceivedSeverity']?.slice(1)?.toLowerCase() : '';
            element['alarm_id'] = element['id'] ? element['id'] : '';
            element['visibility'] = true;
            alarmsData.push(element);
          });

          alarmsData.sort((a, b) =>
            (a.alarm_name || '')
              .toString()
              .localeCompare((b.alarm_name || '').toString(), 'en', {
                numeric: false,
              })
          );

        }
        this.opsCloudAlarms['alarmsData'] = [...alarmsData];
        this.getCustomAlarmListData();
      }, (err: HttpErrorResponse) => {
        this.getCustomAlarmListData();
        this.loading = false;
        this.error = true;
        this.pageErrorHandle(err);
      });
  }

  getCustomAlarmListData(fromAPI?) {
    this.loading = true;
    this.opsCloudAlarms['customAlarmsData'] = [];
    this.http
      .get(`${this.baseUrl}customAlarms`)
      .subscribe((json: any) => {
        let customAlarmsData = [];
        if (json && json.length > 0) {
          json.forEach((element) => {

            //fetching originalseverity from Alarm Master details (CCL-56089)
            if (this.opsCloudAlarms['alarmsData'] && this.opsCloudAlarms['alarmsData'].length > 0) {
              let foundMasterAlarm = this.opsCloudAlarms['alarmsData'].find((al) => al['alarm_name'] == element['alarmName']);
              if (foundMasterAlarm) {
                element['originalseverity'] = foundMasterAlarm['perceivedSeverity'] ? foundMasterAlarm['perceivedSeverity'] : element['originalseverity'];
              }
            }

            element['alarm_name'] = element['alarmName'] ? element['alarmName'] : '';
            element['alarm_id'] = element['alarmCustomId'] ? element['alarmCustomId'] : '';
            element['severity_class'] = element['severity'] ? element['severity']?.toUpperCase() : '';
            element['severity'] = element['severity'] ? element['severity']?.toLowerCase() : '';
            element['dispOriginalSeverity'] = element['originalseverity'] ? element['originalseverity']?.charAt(0).toUpperCase() + element['originalseverity']?.slice(1)?.toLowerCase() : '';

            customAlarmsData.push(element);
          });

        }
        this.opsCloudAlarms['customAlarmsData'] = [...customAlarmsData];
        this.opsCloudAlarms['customBackupAlarmsData'] = [...customAlarmsData];

        this.loading = false;
        setTimeout(() => {
          if (fromAPI) {
            this.renderTable(true);
          } else {
            this.renderTable(false);
          }
        }, 200)

      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.error = true;
        this.renderTable(false);
        this.pageErrorHandle(err);
      });
  }

  clearAlarmFilter(term) {
    this.opsCloudAlarms.searchedAlarm = undefined;
    this.searchAlarmsFromMaster(term);
  }

  searchAlarmsFromMaster(term) {
    this.loading = true;
    if (term && term?.alarm_name?.length > 0) {
      this.showcloseicon = true;
    } else {
      this.showcloseicon = false;
    }
    if (term && term?.alarm_name != '' && this.opsCloudAlarms['customAlarmsData'].findIndex(el => el['alarm_name']?.toUpperCase() == term?.alarm_name?.toUpperCase()) == -1) {
      if (!term?.alarm_id) {
        term = this.opsCloudAlarms['alarmsData'].find(el => el['alarm_name']?.toUpperCase() == term?.alarm_name?.toUpperCase())
      }
      let customAlarmsData = [...this.opsCloudAlarms['customAlarmsData']];
      customAlarmsData.push({ ...term });
      this.opsCloudAlarms['customAlarmsData'] = [...customAlarmsData];
      this.loading = false;
      this.renderTable(true);
    }

    setTimeout(() => {
      this.opsCloudAlarms.searchedAlarmName = term && term['alarm_name'] ? term['alarm_name'] : '';
      this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
        dtInstance.columns(0).search(this.opsCloudAlarms.searchedAlarmName).draw();
      });
      this.loading = false;
    }, 200);
  }

  searchCustomAlarms(event) {
    this.loading = true;
    let severity;

    if (event && event.length > 0 && event != 'allseverities') {
      severity = event.charAt(0).toUpperCase() + event.slice(1)?.toLowerCase();
    }
    if (event && event == 'allseverities') {
      severity = ''
    }

    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.columns(2).search(severity).draw();
    });
    this.loading = false;
  }

  changeAlarmSeverity(event, customAlarm) {
    this.loading = true;
    let severity = event?.toUpperCase();
    let url = '';
    // if(this.isDev){
    url = `${this.baseUrl}customAlarm/${customAlarm?.alarm_name}/customization?newPerceivedSeverity=${severity}&originalSeverity=${customAlarm?.originalseverity}`;
    // }else{
    //   url = `${this.baseUrl}customAlarm/${customAlarm?.alarm_name}/customization?newPerceivedSeverity=${severity}`;
    // }
    this.http
      .put(url, {}, { responseType: 'text' })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.success = true;
          this.successInfo = this.language['Updated Successfully'];
          setTimeout(() => {
            this.success = false;
            this.successInfo = '';
          }, 4000)
          this.getCustomAlarmListData(true);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
          this.pageErrorHandle(err);
        }
      );
  }

  changeVisibility(customAlarm) {
    this.loading = true;
    let url = '';
    // if(this.isDev){
    url = `${this.baseUrl}updateCustomAlarmVisibility/${customAlarm?.alarm_name}?isVisible=${!customAlarm.visibility}&severity=${customAlarm?.severity?.toUpperCase()}&originalSeverity=${customAlarm?.originalseverity}`;
    // }else{
    //   url = `${this.baseUrl}updateCustomAlarmVisibility/${customAlarm?.alarm_name}?isVisible=${!customAlarm.visibility}&severity=${customAlarm?.severity?.toUpperCase()}`;
    // }
    this.http
      .put(url, {}, { responseType: 'text' })
      .subscribe(
        (res: any) => {
          // this.loading = false;
          this.success = true;
          this.successInfo = this.language['Updated Successfully'];
          setTimeout(() => {
            this.success = false;
            this.successInfo = '';
          }, 4000);
          this.getCustomAlarmListData(true);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
          this.pageErrorHandle(err);
        }
      );
  }
  deletePerceivedSeverity() {
    this.error = false;
    this.success = false;
    this.errorInfo = undefined;
    this.successInfo = undefined;
    this.btnDisabled = true;
    let workflowId = this.deletedata?.uuid;
    this.loading = true;
    this.http
      .delete(`${this.baseUrl}customAlarm/${this.deletedata?.alarm_name}/customization?newPerceivedSeverity=${this.deletedata?.severity?.toUpperCase()}&originalSeverity=${this.deletedata?.originalseverity}`, { responseType: 'text' })
      .subscribe(
        (res: any) => {
          // if (res.includes('Deleted the custom alarm')) {
          this.btnDisabled = false;
          // this.loading = false;
          this.success = true;
          this.successInfo = this.language['Custom Alarm deleted successfully'];
          this.closeModal();
          setTimeout(() => {
            this.success = false;
            this.successInfo = undefined;
            this.getCustomAlarmListData(true);
          }, 3000);
          // }
        },
        (error) => {
          this.btnDisabled = false;
          this.error = true;
          this.loading = false;
          this.pageErrorHandle(error);
        }
      );
  }
  delete(customAlarm) {
    this.deletedata = customAlarm;
    this.modalInfo = this.deletedata['alarmName'] || this.deletedata['alarm_name'];
    // $('html, body').animate({ scrollTop: 0 }, 'slow');
    this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
  closeModal(): void {
    this.deletedata = '';
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }
}

