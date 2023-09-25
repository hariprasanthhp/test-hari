import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { PerformanceServiceService } from '../../performance-testing.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import * as $ from 'jquery';

import { SsoAuthService } from '../../../../../../shared/services/sso-auth.service';
import { DateUtilsService } from "src/app/shared-utils/date-utils.service";


@Component({
  selector: 'app-review-wizard',
  templateUrl: './review-wizard.component.html',
  styleUrls: ['./review-wizard.component.scss']
})
export class ReviewWizardComponent implements OnInit {
  language: any;
  languageSubject;

  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    paging: false,
    info: false
  };

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  @Input() inputData
  @Output() outputdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();

  constructor(private translateService: TranslateService,
    private service: PerformanceServiceService,
    private router: Router,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private dateUtilsService: DateUtilsService) {

  }

  ngOnInit(): void {
    this.inputData.levelPassed = 5;
    this.outputdata.emit(this.inputData);
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  btnDisabled = false;
  save(): void {
    let data = this.buildParams(this.inputData);
    // if (!data.serviceTierDownloadSpeed && !data.serviceTierUploadSpeed) {
    //   delete data.serviceTierDownloadSpeed;
    //   delete data.serviceTierUploadSpeed;
    //   delete data.latencyThreshold;
    //   delete data.speedThreshold;
    //   delete data.consumerDataRateThreshold;
    //   delete data.consumerDataRateThresholdUs;
    //   delete data.subscribers;
    // }

    // delete data.status;
    // delete data.serviceTierandTrshldChecked;
    // delete data['levelPassed'];
    // delete data['protocols'];
    // delete data['verifyDevice'];

    this.btnDisabled = true;

    if (data['_id']) {
      this.service.update(data).subscribe((json: any) => {

        this.successInfo = `${this.language.ptUpdatedText(data.name)}`;
        this.showSuccess(this.successInfo);

        setTimeout(() => {
          this.reload();
        }, 2000);
      }, (err: any) => {

        this.pageErrorHandle(err);
        this.btnDisabled = false;
      });
    } else {
      delete data['acsDeviceInfoMap'];
      delete data['jobId'];

      this.service.save(data).subscribe((json: any) => {
        this.successInfo = `${this.language.ptSuccessText(data.name)}`;
        this.showSuccess(this.successInfo);

        setTimeout(() => {
          this.reload();
        }, 2000);
      }, (err: any) => {

        this.pageErrorHandle(err);
        this.btnDisabled = false;
      });
    }


  }

  reload(): any {
    if (window.location.href?.indexOf('/cco/operations/configuration/performance-testing') !== -1) {
      this.router.navigate(['./cco/operations/configuration/performance-testing']);
      return;
    }
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing`,
      `cco/operations/cco-system-operations/performance-testing`, '',
      `/cco/operations/cco-subscriber-operations/operations/performance-testing`,
    ]);
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
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

  gotoPrevious() {
    this.outputdata.emit(this.inputData);
    this.activeTab.emit('TestSchedule');
  }

  buildParams(inpdata: any) {
    // let data = inpdata;


    let data = {
      // orgId: inpdata['orgId'],
      name: inpdata['name'],
      devices: inpdata['devices'],
      description: inpdata['description'],
      timezone: inpdata['timezone'],
      primaryOoklaServerId: inpdata['primaryOoklaServerId'],
      secondaryOoklaServerId: inpdata['secondaryOoklaServerId'],
      primaryOoklaServerHostname: inpdata['primaryOoklaServerHostname'],
      secondaryOoklaServerHostname: inpdata['secondaryOoklaServerHostname'],
      primaryOoklaServerCityState: inpdata['primaryOoklaServerCityState'],
      secondaryOoklaServerCityState: inpdata['secondaryOoklaServerCityState'],
      primaryOoklaServerAsn: inpdata['primaryOoklaServerAsn'],
      secondaryOoklaServerAsn: inpdata['secondaryOoklaServerAsn'],
      startDate: inpdata['startDate'],
      numberOfDays: inpdata['numberOfDays'],
      startHour: inpdata['startHour'],
      numberOfHours: inpdata['numberOfHours'],
      serviceTierDownloadSpeed: inpdata['serviceTierDownloadSpeed'],
      serviceTierUploadSpeed: inpdata['serviceTierUploadSpeed'],
      speedThreshold: inpdata['speedThreshold'],
      latencyThreshold: inpdata['latencyThreshold'],
      consumerDataRateThreshold: inpdata['consumerDataRateThreshold'],
      consumerDataRateThresholdUs: inpdata['consumerDataRateThresholdUs'],
      subscribers: inpdata['subscribers'],
      serviceTier: inpdata['serviceTier'],
      downloadUrl: inpdata['downloadUrl'],
      uploadUrl: inpdata['uploadUrl'],
      uploadFileSize: inpdata['uploadFileSize'],
    };

    if (!data.serviceTierDownloadSpeed && !data.serviceTierUploadSpeed) {
      delete data.serviceTierDownloadSpeed;
      delete data.serviceTierUploadSpeed;
      delete data.latencyThreshold;
      delete data.speedThreshold;
      delete data.consumerDataRateThreshold;
      delete data.consumerDataRateThresholdUs;
      delete data.subscribers;
    }

    if (inpdata._id) {
      data['acsDeviceInfoMap'] = inpdata['acsDeviceInfoMap'];
      data['jobId'] = inpdata['jobId'];
      data['_id'] = inpdata['_id'];

    }

    return data;
  }

  getDate(dateStr: any) {
    return this.dateUtilsService.getUserDateTimeByTimeZone(dateStr);
  }

}