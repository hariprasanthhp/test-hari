import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { CcoCommonService } from '../shared/services/cco-common.service';
import { TranslateService } from './../../../app-services/translate.service';
import { AddSubscriberService } from './cco-subscriber-system/add-service-system/add-subscriber.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit, OnDestroy {

  currentPage: any;
  isDev: boolean = false;

  menus = {
    network: false,
    subscriber: false,
  }

  module: string = 'network';
  subscriberStepperInfo: string = '';
  subsSystemStepSubs: any;
  isSystemsMainPage: boolean = false;

  showSubscriberSystems = false;
  allowSubscriberSystems = true;
  systemView: boolean;
  pageAcceesObs: any;
  hasPageAccess: boolean = true;TableView: boolean=false;
  ccoSearchText:any;
  isProvisioned:any;

  constructor(
    private translateService: TranslateService,
    private ccoCommonService: CcoCommonService,
    private sso: SsoAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private subscriber: AddSubscriberService,
    private titleService: Title,
    private cdRef: ChangeDetectorRef
  ) {
    this.ccoCommonService.currentPageData.subscribe((data: any) => {
      this.currentPage = data;
    });


    let base = `${environment.API_BASE}`;
    let host = window.location.host;
    //console.log(host)
    if (base.indexOf('/dev.api.calix.ai') > -1 || host.indexOf('localhost') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    this.isDev = true;

    if (this.router.url && this.router.url?.indexOf('system-table-view') > -1) {
      this.isSystemsMainPage = true;
    } else this.isSystemsMainPage = false;

  }

  languageSubject;
  language: any;
  ngOnInit(): void {
    this.subsSystemStepSubs = this.subscriber.subsSystemStep.subscribe((data: any) => {
      this.subscriberStepperInfo = data;
      this.cdRef.detectChanges()
    });
    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    })
    //console.log(this.router.url)
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowSubscriberSystems = false;
    }

    let scopes = this.sso.getScopes();
    if ((this.router.url?.indexOf('system-table-view') > -1) ) {
      this.TableView = true;
    }
    if ((this.router.url?.indexOf('system-table-view') > -1) || (this.router.url?.indexOf('cco-network-system') > -1)) {
      this.systemView = true;
    } else {
      this.systemView = false;
    }
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.systems.network') !== -1) {
            this.menus['network'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.systems.subscriber') !== -1) {
            this.menus['subscriber'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        network: true,
        subscriber: true,
      }

    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Network Systems']} - ${this.language['Systems']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Network Systems']} - ${this.language['Systems']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let url = this.router.url;
    if (url.indexOf('/cco-network-system/') > -1) {
      this.module = 'network';
    } else this.module = 'subscriber';

    this.ccoCommonService.textSearch.subscribe((value)=>{
      this.ccoSearchText = value.searchText;
      this.isProvisioned = value.isProvisioned;
    })

  }

  ngOnDestroy(): void {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.subsSystemStepSubs) this.subsSystemStepSubs.unsubscribe();
  }

}
