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
  pageAvailable: boolean = false;
  menus: any
  activeRoute: any;
  showSearch: boolean = false;

  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language['Real Time'];
      this.menus[1].title = this.language.TReports;
    })

    this.menus = [
      {
        title: this.language['Real Time'],
        link: 'realtime'
      },
      {
        title: this.language.TReports,
        link: 'reports'
      }
    ];
    this.activeRoute = this.router.url;
  }
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
