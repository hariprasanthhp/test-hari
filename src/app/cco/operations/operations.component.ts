import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  menus = {
    'system-onboarding': false,
    'alarms': false,
    'health': false,
    'configuration': false,
    'cco-reports': false
  }

  menuConfig = {
    'systemonboarding': {
      urls: [],
      scopes: ['axoscallhome.systems', 'axoscallhome.callhome', 'cmsexacallhome', 'regionsettings']
    },
    'alarms': {
      urls: [],
      scopes: ['transformalarmrules', 'alarmsandhealthnotifications', 'alarmsettings']
    },
    'health': {
      urls: [],
      scopes: ['monitoringthresholds']
    },
    'configuration': {
      urls: [],
      scopes: ['workflows', 'systemgroups', 'softwareimages', 'performancetesting', 'configurationfiles', 'axosmigration']
    },
    'report': {
      urls: [],
      scopes: ['mappedeplists', 'epcountbymapper', 'ontdevices', 'unmappedips', 'invreports', 'calloutcomereports', 'auditreports', 'auditreports', 'unassociatedsystems']
    },
  }

  operationsUrl = '/cco/operations';
  hasPageAccess = true;
  pageAcceesObs: any;
  isSubscriberOperationsActive = false;

  activeMenus = {
    'system-onboarding': false,
    'alarms': false,
    'health': false,
    'configuration': false,
    'cco-reports': false
  }

  constructor(private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.setActiveMenu();
    if (((this.router.url).indexOf('/cco/operations/cco-subscriber-operations/') !== -1)) {
      this.isSubscriberOperationsActive = true;
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });

    let scopes = this.sso.getScopes();
    let urlsInfo = this.sso.getCCOUrlInfo();
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.operationsUrl = '/cco/operations';
    } else {
      this.setOperationsUrl();
    }
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.systemonboarding') !== -1) {
            this.menus['system-onboarding'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.alarms') !== -1) {
            this.menus.alarms = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.health') !== -1) {
            this.menus.health = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.configuration') !== -1) {
            this.menus.configuration = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report') !== -1) {
            this.menus['cco-reports'] = true;
            continue;
          }


        }
      }

    } else {
      this.menus = {
        'system-onboarding': true,
        'alarms': true,
        'health': true,
        'configuration': true,
        'cco-reports': true
      }

    }

    for (let menu in this.menuConfig) {
      this.menuConfig[menu]?.scopes?.forEach(element => {
        if (scopes[`cloud.rbac.coc.operations.${menu}.${element}`]) {
          this.menuConfig[menu]?.urls?.push(urlsInfo['operations']?.[`cloud.rbac.coc.operations.${menu}.${element}`]?.path);
        }
      });
    }

    //console.log(this.menuConfig);

  }

  ngOnDestroy(): void {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  setOperationsUrl() {
    let scopes = this.sso.getScopes();
    let urlsInfo = {
      subcriber_operations: {
        scope: 'cloud.rbac.coc.operations.subscriber.operations',
        path: '/cco/operations/cco-subscriber-operations/operations/devices-groups'
      },

      subcriber_configurations: {
        scope: 'cloud.rbac.coc.operations.subscriber.configurations',
        path: '/cco/operations/cco-subscriber-operations/configurations/dial-plan'
      }
    }

    let keys = Object.keys(urlsInfo);
    for (let i = 0; i < keys.length; i++) {
      if (scopes[urlsInfo[keys[i]].scope]) {
        this.operationsUrl = urlsInfo[keys[i]].path;
        break;
      }
    }

  }

  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.sso.isMenuActive(menu);
    }

  }

}
