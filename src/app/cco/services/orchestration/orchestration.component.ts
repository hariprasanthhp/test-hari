import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orchestration',
  templateUrl: './orchestration.component.html',
  styleUrls: ['./orchestration.component.scss']
})
export class OrchestrationComponent implements OnInit {

  language: any;
  languageSubject;
  menus: any = {};
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    private titleService: Title) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      //todo
    } else {

    }


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.titleService.setTitle(`${this.language['L2 VPN']} - ${this.language['Orchestration']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    this.languageSubject.unsubscribe();
  }

}
