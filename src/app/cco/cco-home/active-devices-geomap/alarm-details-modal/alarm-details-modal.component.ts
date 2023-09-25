import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { HomeGeomapService } from '../../services/home-geomap.service';

@Component({
  selector: 'app-alarm-details-modal',
  templateUrl: './alarm-details-modal.component.html',
  styleUrls: ['./alarm-details-modal.component.scss'],
})
export class AlarmDetailsModalComponent implements OnInit {
  systemDetails: any;
  hasWriteAccess: boolean = false;
  index: any;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  errorInfo: any;
  error: boolean = false;
  language: any;
  languageSubject;
  loading: boolean = false;
  list: any = [];
  dataAvailable: boolean;
  constructor(
    private issueService: IssueService,
    private homeGeomapService: HomeGeomapService,
    public ssoService: SsoAuthService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        // this.loadIntialData();
        // if (this.renderOnce) {
        //   this.loadChart();
        // }
      }
    );
    let scopes = this.ssoService.getScopes();
    if (
      scopes['cloud.rbac.coc.insights.activdevicesgeomap']?.indexOf('write') !==
      -1
    ) {
      this.hasWriteAccess = true;
    }

    this.systemDetails = this.issueService.getGeomapAppliedFilters();
    this.getAlarmDetails();
    console.log(this.systemDetails);
  }

  getAlarmDetails() {
    this.list = [];
    this.dataAvailable = false;
    this.loading = true;
    this.error = false;
    let params = {};
    params = {
      // region: this.systemDetails['systemDetails']['deviceRegion']['region_uuid'],
      // location: this.systemDetails['systemDetails']['deviceLocation']['networkgroup_uuid'],
      // system: this.systemDetails['systemDetails']['deviceUuid'],
      // fsan_serialnumber: this.systemDetails['systemDetails']['fsan_serialnumber']
      //   ? this.systemDetails['systemDetails']['fsan_serialnumber']
      //   : '',
      //date: `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['startDate'])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['endDate'], true)}`,
      // historyReport: false,
      severity: 'MAJOR,MINOR,CRITICAL,INFO,WARNING',
      notificationType: 'Alarm',
      // alarmEventName: this.systemDetails['system'] ? this.systemDetails['system'] : undefined,
      searchValue: this.systemDetails['systemDetails']['outageAlarmId']
        ? this.systemDetails['systemDetails']['outageAlarmId']
        : undefined,
      searchField: 'alarmId',
      // cco_ack: 'all',
    };
    let query = '';
    for (var key in params) {
      if (params[key] == undefined || params[key] == '') {
        continue;
      }

      if (query != '') {
        query += '&';
      }

      query += key + '=' + encodeURIComponent(params[key]);
    }
    let url = `${this.baseUrl}alarmListByPagination?historyReport=false&pageSize=1&${query}`;
    this.http.get(url).subscribe(
      (resp : any) => {
        this.processListResp(resp);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.pageErrorHandle(err);
      }
    );
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }
  processListResp(resp: any) {
    if (resp && resp['alarms']) {
      resp['alarms'].forEach((element) => {
        if (!element['subject']['deviceName']) {
          element['subject']['deviceName'] =
          this.systemDetails['systemDetails']['deviceUuid'];
        }

        element['subject']['deviceName'] = element['subject'][
          'deviceName'
        ]?.replace('device=', '');
        element['subject']['deviceName'] = element['subject'][
          'deviceName'
        ]?.replace('DEVICE=', '');
        element['subject']['resourceForUI'] =
          this.issueService.generateResourceForUI(
            element,
            element.type === 'EXA' ? true : false
          );
      });
      this
      this.list = resp['alarms'];
      if(this.list && this.list.length > 0){
        this.viewDetails(this.list[0], 0);
        this.dataAvailable = true;
      }
    } else {
      this.dataAvailable = false;
      this.list = [];
    }

    this.loading = false;
  }
  onAckShelve(data: any) {
    console.log(data);
    if (typeof data?.ack !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoAck = data?.ack;
      }
    } else if (typeof data?.shelve !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoShelved = data?.shelve;
      }
    }
  }
  onRefreshAckShelve(value: any) {
    this.showAckShelveBtn = false;
    this.homeGeomapService.closeModal();
  }

  showAckShelveBtn = false;
  fullData: any = {};
  hideSource = false;
  viewDetails(item: any, index?: any) {
    this.hideSource = false;
    this.index = index;
    this.fullData = item;
    this.showAckShelveBtn = true;
    this.loading = false;
  }
}
