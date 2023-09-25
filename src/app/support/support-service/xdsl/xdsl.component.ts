import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportServiceService } from '../services/support-service.service';

@Component({
  selector: 'app-xdsl',
  templateUrl: './xdsl.component.html',
  styleUrls: ['./xdsl.component.scss']
})
export class XdslComponent implements OnInit, OnDestroy {

  constructor(private ssoService: SsoAuthService,
    private supportService: SupportServiceService,
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title
  ) { }

  mySubscription: any;
  isError: boolean;
  deviceInfo: any;
  serialNumberSelected: any = '';
  // data : any = [];
  modalLoader: boolean = true;

  downstreamAttenuation: any = [];
  downstreamCurrRate: any = [];
  downstreamMaxRate: any = [];
  downstreamNoiseMargin: any = [];
  downstreamPower: any = [];
  enable = [];
  status = [];
  upstreamAttenuation: any = [];
  upstreamCurrRate: any = [];
  upstreamMaxRate: any = [];
  upstreamNoiseMargin: any = [];
  upstreamPower: any = [];

  updatedNumbers;
  alertMessage

  language;
  languageSubject;

  orgId = this.ssoService.getOrgId();

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['XDSL']} - ${this.language['Service']} 
      - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['XDSL']} - ${this.language['Service']} 
    - ${this.language['Service']} - ${this.language['Calix Cloud']}`);

    this.onRefresh();
  }

  onRefresh() {
    this.modalLoader = true;
    this.deviceInfo = sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`) ? JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`)).filter(obj => obj.manufacturer !== 'Calix') : '';
    this.serialNumberSelected = this.deviceInfo.length ? this.deviceInfo[0]?.serialNumber : '';

    this.supportService.getXsdlDetails(this.serialNumberSelected, this.orgId)
      .subscribe((res: any) => {

        // let xdslValues = Object.values(data);
        // xdslValues.forEach((element : any)=> {
        //   this.updatedNumbers = Number.parseFloat(element).toFixed(2);
        //   console.log("Xdsl values : " + this.updatedNumbers);
        // });
        this.resetTable();
        this.modalLoader = false;
        if (res && res.length) {
          res.forEach(data => {
            if (data.status === '408 Request Timeout') {
              this.alertMessage = this.language.Time_Out;
              this.isError = true;
            } else {
              this.downstreamAttenuation.push(Number.parseFloat(data.DownstreamAttenuation).toFixed(2));
              this.downstreamCurrRate.push(Number.parseFloat(data.DownstreamCurrRate).toFixed(2));
              this.downstreamMaxRate.push(Number.parseFloat(data.DownstreamMaxRate).toFixed(2));
              this.downstreamNoiseMargin.push(Number.parseFloat(data.DownstreamNoiseMargin).toFixed(2));
              this.downstreamPower.push(Number.parseFloat(data.DownstreamPower).toFixed(2));
              this.enable.push(data.Enable);
              this.status.push(data.Status);
              this.upstreamAttenuation.push(Number.parseFloat(data.UpstreamAttenuation).toFixed(2));
              this.upstreamCurrRate.push(Number.parseFloat(data.UpstreamCurrRate).toFixed(2));
              this.upstreamMaxRate.push(Number.parseFloat(data.UpstreamMaxRate).toFixed(2));
              this.upstreamNoiseMargin.push(Number.parseFloat(data.UpstreamNoiseMargin).toFixed(2));
              this.upstreamPower.push(Number.parseFloat(data.UpstreamPower).toFixed(2));
            }
          });
        }
      }, err => {
        this.modalLoader = false;
        this.resetTable();
        this.pageErrorHandle(err);
      }
      )
  }

  resetTable() {
    this.downstreamAttenuation = [];
    this.downstreamCurrRate = [];
    this.downstreamMaxRate = [];
    this.downstreamNoiseMargin = [];
    this.downstreamPower = [];
    this.enable = [];
    this.status = [];
    this.upstreamAttenuation = [];
    this.upstreamCurrRate = [];
    this.upstreamMaxRate = [];
    this.upstreamNoiseMargin = [];
    this.upstreamPower = [];
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else if (err.status == 408) {
      this.alertMessage = this.language.Time_Out
    }
    this.isError = true;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  sumOfArray(arr) {
    return arr.reduce((a, b) => a + parseFloat(b), 0).toFixed(2);
  }


}
