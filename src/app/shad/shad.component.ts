import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from "../shared/services/sso-auth.service";

@Component({
  selector: 'app-shad',
  templateUrl: './shad.component.html',
  styleUrls: ['./shad.component.scss']
})
export class ShadComponent implements OnInit, OnDestroy {
  menu_items = [];

  language;
  languageSubject;

  constructor(private sso: SsoAuthService, private titleService: Title, private translateService: TranslateService) {
    this.titleService.setTitle('Calix Cloud')
  }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.getLeftMenu();
    })
    this.getLeftMenu();
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }

  shadAccess = false;
  getLeftMenu() {
    this.menu_items = [];
    let scope = this.sso.getScopes();
    //console.log(scope);

    if (scope) {
      if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('read') !== -1) {
        this.shadAccess = true;
        this.menu_items.push({
          title: this.language['Dashboards'],
          icon: { icon: 'fa-home', pack: 'fa' },
          link: '/shad/dashboard',
        });

        this.menu_items.push({
          title: this.language['Router_Management'],
          icon: { icon: 'fa-server', pack: 'fa' },
          link: '/shad/router_management',
          pathMatch: 'prefix'
        });

        this.menu_items.push({
          title: this.language['Subscriber_Services'],
          icon: { icon: 'fa-cogs', pack: 'fa' },
          link: '/shad/subscriber_services',
        });

        this.menu_items.push({
          title: this.language['Onboarded_Routers'],
          // icon: { icon: 'airplay', pack: 'feather'},
          icon: { icon: 'fa-hdd-o', pack: 'fa' },
          link: '/shad/onboard_routers',
        });

        this.menu_items.push({
          title: this.language['Block_Page_Temp'],
          icon: { icon: 'fa-ban', pack: 'fa' },
          link: '/shad/block_page_template_list',
          pathMatch: 'prefix'
        });

        this.menu_items.push({
          title: this.language['White Label'],
          icon: { icon: 'fa-tag', pack: 'fa' },
          link: '/shad/whitelabel',
          pathMatch: 'prefix'
        });
      } else {
        this.shadAccess = false;
      }

    } else {
      this.shadAccess = false;
    }

  }

  menus: any;


}
