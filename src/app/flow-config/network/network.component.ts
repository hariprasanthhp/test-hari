import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  language: any;
  menus: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;

  MODULE: any;
  activeRoute: any;
  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
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
      this.menus[0].title = this.language.devices;
      this.menus[1].title = this.language.subnets;
      this.menus[2].title = this.language.radiusserver;
      //this.menus[2].title = this.language.staticsubnets;
      //this.menus[3].title = this.language.radiusserver;
    })

    this.menus = [
      {
        title: this.language.devices,
        link: 'devices',
        subMenuLink: `/${this.MODULE}/flowAnalyze/network/devices`
      },
      {
        title: this.language.subnets,
        link: 'subnets',
        subMenuLink: `/${this.MODULE}/flowAnalyze/network/subnets`
      },
      // {
      //   title: this.language.staticsubnets,
      //   link: 'static_subnets',
      //   subMenuLink: `/${this.MODULE}/flowAnalyze/network/static_subnets`
      // },
      {
        title: this.language.radiusserver,
        link: 'radius-servers',
        subMenuLink: `/${this.MODULE}/flowAnalyze/network/radius-servers`
      }

    ];

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
