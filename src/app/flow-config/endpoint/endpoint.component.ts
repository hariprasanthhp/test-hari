import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  menus: any

  MODULE: any;
  activeRoute: any;
  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService
  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
  }

  ngOnInit() {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language.mappingsource;
      this.menus[1].title = this.language.management;
      this.menus[2].title = this.language.subnet;
      this.menus[3].title = this.language.settings;
    })

    this.menus = [
      {
        title: this.language.mappingsource,
        link: 'mapping_source',
        subMenuLink: `/${this.MODULE}/flowAnalyze/endpoint/mapping_source`
      },
      {
        title: this.language.management,
        link: 'management',
        subMenuLink: `/${this.MODULE}/flowAnalyze/endpoint/management`
      },
      {
        title: this.language.subnet,
        link: 'subnets',
        subMenuLink: `/${this.MODULE}/flowAnalyze/endpoint/subnets`
      },
      {
        title: this.language.settings,
        link: 'settings',
        subMenuLink: `/${this.MODULE}/flowAnalyze/endpoint/settings`
      },
    ]

    this.activeRoute = this.router.url;

  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }

  // For Sub Menu Page routing function starts
  goPage(page: string) {
    this.router.navigate([page]);
  }

  pageChange(menu) {
    this.activeRoute = menu.subMenuLink;
  }
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
