import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

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
      this.menus[0].title = this.language.definition;
      this.menus[1].title = this.language.applicationgroups;
    })

    this.menus = [
      {
        title: this.language.definition,
        link: 'definitions',
        subMenuLink: `/${this.MODULE}/flowAnalyze/applications/definitions`
      },
      {
        title: this.language.applicationgroups,
        link: 'app_groups',
        subMenuLink: `/${this.MODULE}/flowAnalyze/applications/app_groups`
      },
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
