import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CcoCommonService } from '../shared/services/cco-common.service';
import { AddSubscriberService } from '../system/cco-subscriber-system/add-service-system/add-subscriber.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  currentPage: any;
  isDev: boolean = false;

  menus = {
    'subscribers': false,
    'service-profiles': false,
    //'orchestration': false,
    'configuration': false
  }

  menuConfig = {
    'subscribers': {
      urls: [],
      scopes: ['subscriberslist']
    },
    'serviceprofiles': {
      urls: [],
      scopes: ['serviceprofiles', 'rgprofiles', 'rgdialplans']
    },
    'configuration': {
      urls: [],
      scopes: ['ontconfigurations', 'externalfileserver', 'secureonboarding', 'stalesystempurge', 'subnetconfiguration', 'speedtest',]
    }
  }



  module: string = 'network';
  subscriberStepperInfo: string = '';
  subsSystemStepSubs: any;
  isSystemsMainPage: boolean = false;

  showSubscriberSystems = false;
  allowSubscriberSystems = true;
  systemView: boolean;
  pageAcceesObs: any;
  hasPageAccess: boolean = true; TableView: boolean = false;
  ccoSearchText: any;
  isProvisioned: any;

  constructor(
    private translateService: TranslateService,
    private ccoCommonService: CcoCommonService,
    private sso: SsoAuthService,
    private router: Router,
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
  activeMenus = {
    'subscribers': false,
    'service-profiles': false,
    //'orchestration': false,
    'configuration': false
  }

  ngOnInit(): void {
    this.setActiveMenu();
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
    let urlsInfo = this.sso.getCCOUrlInfo();
    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.services.subscribers') !== -1) {
            this.menus.subscribers = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.services.serviceprofiles') !== -1) {
            this.menus['service-profiles'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.services.configuration') !== -1) {
            this.menus.configuration = true;
            continue;
          }

        }
      }



    } else {
      this.menus = {
        'subscribers': true,
        'service-profiles': true,
        //'orchestration': false,
        'configuration': true
      }

    }

    for (let menu in this.menuConfig) {
      this.menuConfig[menu]?.scopes?.forEach(element => {
        if (scopes[`cloud.rbac.coc.services.${menu}.${element}`]) {
          this.menuConfig[menu]?.urls?.push(urlsInfo['services']?.[`cloud.rbac.coc.services.${menu}.${element}`]?.path);
        }
      });
    }

    //console.log(this.menuConfig);

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.ccoCommonService.textSearch.subscribe((value)=>{
      this.ccoSearchText = value.searchText;
      this.isProvisioned = value.isProvisioned;
    })
  }

 

  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.sso.isMenuActive(menu);
    }

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

  gotoServiceProfiles(){
    this.router.navigate(['/cco/services/service-profiles/ONT-profile'])
  }

}
