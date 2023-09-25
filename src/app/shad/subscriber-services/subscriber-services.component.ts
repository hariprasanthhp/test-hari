import { Component, OnInit, OnDestroy } from '@angular/core';

import { RouterService } from '../../../app-services/routing.services';
import { ValidatorService } from './../../../app-services/validator.services';
import { SubscriberServicesService } from "../service/subscriber-services.service";
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { TranslateService } from 'src/app-services/translate.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-subscriber-services',
  templateUrl: './subscriber-services.component.html',
  styleUrls: ['./subscriber-services.component.scss']
})
export class SubscriberServicesComponent implements OnInit, OnDestroy {

  subscribersData = [];
  loader: boolean = true;
  showAddSbscrbr = false;
  language: any;
  languageSubject;
  downloadSubscription: any;

  constructor(
    private routerService: RouterService,
    private validatorService: ValidatorService,
    private service: SubscriberServicesService,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private router: Router,
    private titleCasePipe: TitleCasePipe

  ) { }

  ngOnInit() {

    let scope = this.sso.getScopes();

    if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('write') !== -1) {
      this.showAddSbscrbr = true;
    }

    this.loadRecords();
    this.appendData();
    this.windowScrollEvent();

    //this.subscribersData = this.dataService.subcribersData;
    this.service.getSubscriberServicesCount();
    this.downloadSubscription = this.service.result$.subscribe(
      (res: any) => {
        if (typeof res == 'object' && res['error']) {
          this.showError(res['errorMsg']);
          this.loader = false;
          return;
        }
        this.subscribersData = res.results;
        ////console.log(this.subscribersData);
        this.loader = false;

      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.appendData();
    });
  }

  error = false;
  errorMsg: any = '';

  showError(errorMsg: any) {
    this.error = true;
    this.errorMsg = errorMsg;
  }

  hideError() {
    this.error = false;
    this.errorMsg = '';
  }

  exportToExcel() {
    this.validatorService.exportAsExcelFile(this.subscribersData, 'SubscriberDetails')
  }
  addSubscriber() {
    this.routerService.routerManagementPage();
  }
  update(data) {
    //  //console.log(data);
    this.routerService.routerManagementPageEdit(data.macAddr);

  }

  ngOnDestroy() {
    if(this.languageSubject){
    this.languageSubject.unsubscribe();
    }
    this.service.setDefaultValue()

    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }

  }

  showLoadMoreBtn = true;
  loadRecords(): void {
    if (!this.showLoadMoreBtn) {
      return;
    }

    this.service.getList();

  }

  windowScrollEvent(): void {
    $(window).scroll(() => {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
        this.loadRecords();
      }
    });
  }

  serviceSubscription: any;
  appendData(): void {
    this.serviceSubscription = this.service.ssresult$.subscribe(
      (jdata: any) => {
        if (jdata && jdata['error']) {
          this.loader = false;
          this.showLoadMoreBtn = false;
          this.showError(jdata['errorMsg']);
          return;
        }

        if (jdata && jdata.results) {
          let data = jdata.results;
          let length = data.length;
          let i: number;
          let name: string, ud: any, defaultStr: any, d: any, ld: any;


          let tr: HTMLElement;
          let td: HTMLElement;
          let btn: any;

          for (i = 0; i < length; i++) {
            if (!data[i]) {
              continue;
            }

            tr = document.createElement('tr');
            tr.setAttribute('id', data[i].id + '_row');
            td = document.createElement('td');
            td.innerText = `${data[i].macAddr}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${this.titleCasePipe.transform(data[i].firstName)}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${this.titleCasePipe.transform(data[i].lastName)}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${data[i].city}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${data[i].state}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${data[i].containersSelectedNames ? data[i].containersSelectedNames : '-'}`;
            tr.appendChild(td);

            td = document.createElement('td');
            btn = document.createElement('span') as HTMLElement;
            btn.setAttribute('id', data[i].macAddr);
            btn.addEventListener('click', (e: any) => {
              ////console.log(e.target.id);
              this.gotoView(e.target.id);
            }, false);
            btn.style.cursor = 'pointer';
            btn.classList.add('btn');
            btn.classList.add('btn-sm');
            btn.classList.add('btn-success');
            btn.classList.add('margin-left-10');
            btn.innerText = this.language['Update'];

            td.appendChild(btn);
            tr.appendChild(td);

            document.getElementById('subscriber-services-list').appendChild(tr);
          }


        }

        this.showLoadMoreBtn = jdata['showLoadMoreBtn'];
        this.loader = false;
      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );
  }

  gotoView(id: any): void {

    this.router.navigate([`/shad/router_management/${id}`]);
  }

}
