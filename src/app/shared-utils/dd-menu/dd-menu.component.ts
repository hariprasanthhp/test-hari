import { Component, OnDestroy, OnInit } from '@angular/core';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
//import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-dd-menu',
  templateUrl: './dd-menu.component.html',
  styleUrls: ['./dd-menu.component.scss']
  // providers: [MessageService]

})
export class DdMenuComponent implements OnInit {
  language: any;
  pageAvailable: boolean = false;
  userInfo = '';
  userOrg = '';
  enIcon = true;
  userName: string;
  baseUrl: string;
  icons = {
    en: true,
    fr: false,
    es: false,
    de_DE: false
  }
  specificlangliteralsobj: any = {};
  loader;

  secureAccessSub: any;
  federatedLoginSub: any;
  languageSubject: any;
  showGranteeListOption = false;

  constructor(private router: Router,
    private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private pcalendarconfig: PrimeNGConfig,
    //   private messageService: MessageService,
    private http: HttpClient) {
    this.showApps();

  }

  // onChangeLanguage(languageCode: string) {

  //   if (languageCode == 'en') {
  //     sessionStorage.setItem('defaultLanguage', 'en')
  //   } else {
  //     sessionStorage.setItem('defaultLanguage', 'fr')
  //   }
  //   console.log('language Code : ' + languageCode);

  //   if (sessionStorage.getItem('defaultLanguage') == "en") {
  //     this.enIcon = true;

  //     document.getElementById("en").classList.add("sub-active");
  //     document.getElementById("fr").classList.remove("sub-active");
  //     document.getElementById("en").classList.add("sub-active-icon");
  //     document.getElementById("fr").classList.remove("sub-active-icon");

  //   } else {
  //     this.enIcon = false;
  //     document.getElementById("fr").classList.add("sub-active");
  //     document.getElementById("en").classList.remove("sub-active");
  //     document.getElementById("en").classList.remove("sub-active-icon");
  //     document.getElementById("fr").classList.add("sub-active-icon");
  //   }

  //   this.translateService.changeLanguage(languageCode);
  //   this.customTranslateService.changeLanguage(languageCode);

  // }

  onChangeLanguage(languageCode: string) {
    this.icons = {
      en: false,
      fr: false,
      es: false,
      de_DE: false
    }
    localStorage.removeItem("defaultLanguage");
    this.icons[languageCode] = true;
    sessionStorage.setItem('defaultLanguage', languageCode);
    this.translateService.changeLanguage(languageCode);
    this.customTranslateService.changeLanguage(languageCode);
    this.setUserPreference(languageCode);
    this.specificliterals(languageCode)
    this.pcalendarconfig.setTranslation(this.setCalendarLanguage(languageCode));
  }


  ngOnInit(): void {
    this.baseUrl = WindowRefService.prototype.nativeWindow;
    let languageCode = sessionStorage.getItem('defaultLanguage');
    this.icons = {
      en: false,
      fr: false,
      es: false,
      de_DE: false
    }

    this.icons[languageCode] = true;
    this.pcalendarconfig.setTranslation(this.setCalendarLanguage(languageCode))
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.secureAccessSub = this.sso.secResult$.subscribe((json: any) => {
      this.showApps();
    });

    this.federatedLoginSub = this.sso.federatedLogin$.subscribe((json: any) => {
      this.showApps();
    });

    this.userInfo = this.sso.getUserInfo();
    this.userOrg = this.sso.getOrgName();
    this.userName = this.setUserName();
    // this.pcalendarconfig.ripple = true;

  }

  apps: any = {
    cmc: false,
    csc: false,
    fa: false,
    shad: false,
    orgAdmin: false,
    calixAdmin: false,
    OrgAccess: false,
    exitOrgAccess: false,
    federatedAccess: false
  };

  userIconPath = 'assets/images/nick.png';
  showApps(): void {
    let roles = this.sso.getRoles();
    this.apps = this.sso.showApps();

    if (roles && roles.indexOf('OrgAccess') !== -1) {
      this.apps.OrgAccess = true;
      sessionStorage.setItem('Orgacceforssid', 'true');
    }
    /*else{
      sessionStorage.setItem('Orgacceforssid', 'false');
    }*/

    if (this.sso.isSecureAccess()) {
      this.apps.exitOrgAccess = true;
      this.userIconPath = 'assets/images/secure-user.png';
    } else {
      this.apps.exitOrgAccess = false;
      this.userIconPath = 'assets/images/nick.png';
    }

    if (this.sso.isFederatedLogin()) {
      this.apps.federatedAccess = true;
    } else {
      this.apps.federatedAccess = false;
    }

    let landingPage = this.sso.getLandingPage();

    if (landingPage && landingPage.toLowerCase() == 'grantor_orgs' && !this.sso.isFederatedLogin() && window.location.href?.indexOf('/federated-dashboard') === -1) {
      this.showGranteeListOption = true;
    }

  }

  doExitSecureAccess(): any {
    localStorage.setItem('secureAccessExitedAt', new Date().getTime().toString());
    this.sso.doExitSecureAccess();
    if (this.sso.isFederatedLogin()) {
      this.sso.setFederatedLogin('');
    }
    sessionStorage.setItem('Orgacceforssid', 'false');
  }

  specificliterals(languageCode) {
    let lang_id
    let getlangid = localStorage.getItem('lang_id') ? JSON.parse(localStorage.getItem('lang_id')) : '';
    for (var i = 0; i < getlangid?.length; i++) {
      if (getlangid[i]?.code == languageCode) {
        lang_id = getlangid[i]?.id
      }
    }
    this.sso.getspecificliterals(lang_id).subscribe(
      (res: any) => {
        if (res) {
          for (var i = 0; i < res?.length; i++) {
            this.specificlangliteralsobj[res[i]?.literals.key] = res[i]?.literals.value
          }
        }

        // console.log("specificlangliteralsobj",this.specificlangliteralsobj.length, this.specificlangliteralsobj)
        // console.log(JSON.stringify(this.specificlangliteralsobj))

        localStorage.setItem('specificlangliterals', JSON.stringify(this.specificlangliteralsobj))
        let retrived = localStorage.getItem('specificlangliterals') ? JSON.parse(localStorage.getItem('specificlangliterals')) : '';

        // console.log("retrived",retrived.length,retrived)

      }, (err: any) => {
        //this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});

      });
  }

  doLogout(): any {
    this.router.navigate(['logout']);
  }

  isActive(basePath) {
    return this.router.url.includes(basePath);
  }
  refresh() {
    // window.location.reload();
  }

  setUserName() {
    let name = '';
    if (this.userInfo) {
      let infos = [], names = [];
      infos = this.userInfo.split(',');

      infos.forEach(e => {
        if (e) {
          e = e.trim();
          names.push(e);
        }
      });
      if (names.length > 1) {
        name = `${names[0].substr(0, 1).toUpperCase()}${names[1].substr(0, 1).toUpperCase()}`;
      } else if (names.length == 1) {
        name = `${names[0].substr(0, 1).toUpperCase()}${names[0].substr(1, 1).toUpperCase()}`;
      } else {
        name = '';
      }
    }
    // console.log(name)
    return name;
  }

  setUserPreference(language: any) {

    let languageObjForApi = {
      en: 'en_US',
      fr: 'fr_CA',
      es: 'es_US',
      de_DE: 'de_DE'
    }

    this.http.post(`${environment.calixAdminURL}user/${this.sso.getUserId()}`, { language: languageObjForApi[language] }).subscribe((json: any) => {
    });
  }

  setCalendarLanguage(lan_code) {
    switch (lan_code) {
      case "fr":
        {
          return {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre',
              'Novembre', 'Décembre'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Aujourd\'hui',
            clear: 'Supprimer',
            cancel: 'Annuler',
          }
        }
      case "es":
        {
          return {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
              'Noviembre', 'Diciembre'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Hoy',
            clear: 'Borrar',
            cancel: 'Cancelar',
          }
        }
      case "de_DE":
        {
          return {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
              'November', 'Dezember'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Heute',
            clear: 'Löschen',
            cancel: 'Abbrechen',
          }
        }
      default:
        {
          return {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
              'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            cancel: 'Cancel',
          }
        }
    }

  }

  doExitFederatedAccess(): any {
    this.sso.doExitFederatedAccess();
  }

  ngOnDestroy() {
    this.languageSubject?.unsubscribe();
    this.federatedLoginSub?.unsubscribe();
    this.secureAccessSub?.unsubscribe();
  }

}
