import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EndpointManagementService } from '../services/endpoint-management.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy{

  language: any;
  pageAvailable: boolean = false;
  languageLocalStorage: any;
  menus: { title: string; link: string; subMenuLink: string }[] = []; // Initialize menus as an empty array
  MODULE: any;
  activeRoute: any;
  public isSecureAccess: boolean = false;
  private isProd: boolean = false;
  public isSysAdmin = false;
  public ORG_ID: string;
  private orgSubs: any;
  public cocEntitlementCheck = false;

  constructor(
    private router: Router,
    public customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    public service: EndpointManagementService,

  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.isSecureAccess = this.sso.isSecureAccess();
    this.isProd = this.sso.isProdCheckFromBaseURL();
    this.checkSysAdmin();
  }

  ngOnInit(): void {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.service.flowDataSync.subscribe((res: any) => {
      if (!res.flowDataTab && this.menus) {
        const index = this.menus.findIndex(obj => obj.link.includes('flow-data'));
        if (index !== -1) {
          this.menus.splice(index, 1);
        }
      }
    });
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language['Real-time Delay'];
      this.menus[1].title = this.language['Flow Data'];
      if (this.menus.length === 3) {
       this.menus[2].title = this.language['Unmapped IP Aggregation']
      } else if (this.menus.length === 4) {
        this.menus[2].title = this.language['1-Minute Aggregation']
        this.menus[3].title = this.language['Unmapped IP Aggregation']      }
        // if (this.MODULE === 'systemAdministration' && !this.isSecureAccess) {
        //   if (!this.cocEntitlementCheck) {
        // this.menus[1].title = this.language['1-Minute Aggregation']
        //   }
        // }
        // this.menus[2].title = this.language['Unmapped IP Aggregation']
    })

    this.menus = [
      {
        title: this.language['Real-time Delay'],
        link: 'realtime-delay',
        subMenuLink: `/${this.MODULE}/flowAnalyze/configurations/realtime-delay`
      },   
     ];
    this.getData();
    
    this.activeRoute = this.router.url;
  }

  ngOnDestroy(): void {
    if (this.orgSubs) {
      this.orgSubs.unsubscribe();
    }
  }
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }

  goPage(page: string) {
    this.router.navigate([page]);
  }

  pageChange(menu) {
    this.activeRoute = menu.subMenuLink;
  }

  private checkSysAdmin() {
    let roles = this.sso.getRoles();
    if (roles?.includes('SysAdmin')) {
      this.isSysAdmin = true;
    } else {
      this.isSysAdmin = false;
    }
  }

  public getData() {
    this.orgSubs = this.service.getOrg(this.ORG_ID).subscribe((res: any) => {
      // let cocEntitlementCheck = false;
      if (res) {
        if (res && res.entitlement && res.entitlement.length) {
          this.cocEntitlementCheck = res.entitlement.split(',').includes('COC') ? true : false;
        } else {
          this.cocEntitlementCheck = false;
        }
      } else {
        this.cocEntitlementCheck = false;
      }
      if (this.MODULE === 'systemAdministration' && !this.isSecureAccess) {
        if (!this.cocEntitlementCheck) {
          this.menus.push({ title: this.language['1-Minute Aggregation'], link: 'one-minute-agggregation', subMenuLink: `/${this.MODULE}/flowAnalyze/configurations/one-minute-agggregation`})
        }
        this.menus.push({ title: this.language['Unmapped IP Aggregation'], link: 'unmapped-ip-aggregation', subMenuLink: `/${this.MODULE}/flowAnalyze/configurations/unmapped-ip-aggregation`})
      }
      if (res.useAsmApplications){
        this.menus.push({title: this.language['Flow Data'],link: 'flow-data',subMenuLink: `/${this.MODULE}/flowAnalyze/configurations/flow-data`})      
      }
    })

  }
}
