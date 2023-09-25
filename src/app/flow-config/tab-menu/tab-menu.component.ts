import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from '../services/common-functions.service';
//import { CustomTranslateService } from '../../../../../App-Services/custom-translate.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  menuItems = [
    { menuName: 'Network', subMenu: true, subMenuItem: [{ menuName: 'Devices', link: '' }] },
    { menuName: 'Locations', subMenu: false, subMenuItem: [] },

  ]

  menus: any;
  routerLinks: Array<Object>;
  url: string;
  MODULE: string = 'calixAdmin';
  activeRoute = './network';
  isSecureAccess: boolean = false;
  showTabMenu : boolean = true;

  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    private commonService: CommonFunctionsService
  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.isSecureAccess = this.sso.isSecureAccess();
    this.showTab();
  }

  ngOnInit() {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language.network;
      this.menus[1].title = this.language.locations;
      this.menus[2].title = this.language.Applications;
      this.menus[3].title = this.language.end;
      this.menus[4].title = this.language.Configurations;
      if(this.menus[5] && this.menus[5].title){
        this.menus[5].title = this.language.Traffic;
      }
      let changedMenu = this.menus;
      this.menus = [...changedMenu];
    })

    this.menus = [
      {
        title: this.language.network, routeLink: './network', subMenuLink: `/${this.MODULE}/flowAnalyze/network`
      },
      { title: this.language.locations, routeLink: './locations', subMenuLink: `/${this.MODULE}/flowAnalyze/locations` },
      { title: this.language.Applications, routeLink: './applications', subMenuLink: `/${this.MODULE}/flowAnalyze/applications` },
      { title: this.language.end, routeLink: './endpoint', subMenuLink: `/${this.MODULE}/flowAnalyze/endpoint` },
      { title: this.language.Configurations, routeLink: './configurations', subMenuLink: `/${this.MODULE}/flowAnalyze/configurations` },
      // { title: 'Traffic', routeLink: './traffic', subMenuLink: `/${this.MODULE}/flowAnalyze/traffic` }
    ];

    let roles = this.sso.getRoles();
    let isSysAdmin: boolean = false;
    if (roles && roles.indexOf('System Admin') !== -1 ) {
      isSysAdmin = true;
    }
    if (roles && roles.indexOf('SysAdmin') !== -1) {
      isSysAdmin = true;
    }

    if (isSysAdmin || this.isSecureAccess) {
      this.menus.push({ title: this.language.Traffic, routeLink: './traffic', subMenuLink: `/${this.MODULE}/flowAnalyze/traffic` })
    }

    this.setSubMenuPage();

  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }
  // For Sub Menu Page routing function starts
  goPage(page: string) {
    this.router.navigate([page]);
  }

  goPageN() {
    this.router.navigate([this.activeRoute]);
  }

  setSubMenuPage() {
    let url = this.router.url;
    if (url.indexOf('/network/') > -1) {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/network`;
    } else if (url.indexOf('/locations') > -1) {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/locations`;
    } else if (url.indexOf('/applications/') > -1) {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/applications`;
    } else if (url.indexOf('/endpoint/') > -1) {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/endpoint`;
    } else if (url.indexOf('/configurations/') > -1) {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/configurations`;
    } else {
      this.activeRoute = `/${this.MODULE}/flowAnalyze/traffic`;
    }

  }

  pageChange(menu) {
    this.activeRoute = menu.subMenuLink;
  }

  showTab(){
    this.commonService.showTabMenu$.subscribe((res: any) =>{
      if(res !== null && res !== undefined){
        this.showTabMenu = res;
      } 
    })
  }

}
