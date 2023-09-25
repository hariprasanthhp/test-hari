import { Component, OnInit, OnDestroy } from '@angular/core';
//import { CommonFunctionsService } from '../../administration/shared/services/common-functions.service';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { Router } from '@angular/router';
import { OrgSecureAccessService } from "../services/org-secure-access.service";
// import { AuthService } from '../../shared/services/auth.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from './../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-secured-access',
  templateUrl: './secured-access.component.html',
  styleUrls: ['./secured-access.component.scss']
})
export class SecuredAccessComponent implements OnInit, OnDestroy {

  securedAccessTableOptions: DataTables.Settings = {};
  securedTableData: any;
  pageAvailable: boolean = false;
  tableOptions: DataTables.Settings = {
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  language: any;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;
  dataAvailable: any;
  editOnValue: any;

  orgData: any;
  loader: boolean = true;

  ORG_ID: string;
  orgName: string;
  frTable: any;
  translateSubscribe: any;
  sysAdminRoute: string = 'systemAdministration';
  errorInfo: any;
  error: boolean;
  saListSubs: any;
  constructor(
    //private commonFunctionsService: CommonFunctionsService,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private service: OrgSecureAccessService,
    private sso: SsoAuthService,
    private titleService: Title
  ) {

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);

    this.commonOrgService.currentPageAdder('orgSecuredAccess');
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));
    if (this.orgData) {
      this.orgName = this.orgData.name ? this.orgData.name : 'Calix';
    }
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;
  }

  ngOnInit() {
    let url = this.router.url;
    let MODULE = this.sso.getRedirectModule(url);
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.setTableOptions('language');
      this.titleService.setTitle(`${this.language['Secured Access Users']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    
    this.titleService.setTitle(`${this.language['Secured Access Users']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.frTable = this.customTranslateService.fr;
    this.tableLanguageOptions();
    this.closeAlert();
    this.getSAList();
  }

  ngOnDestroy() {
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.saListSubs) {
      this.saListSubs.unsubscribe();
    }
  }

  someClickHandler(info: any): void {
    //this.message = info.id + ' - ' + info.firstName;
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      rowId: 'id',
      pagingType: 'full_numbers',
      lengthChange: false,
      searching: false,
      dom: 'tipr',
      columnDefs: [
          { targets: [-1], orderable: false }
      ],
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };
    this.tableLanguageOptions();

    if (type && type == 'language') {
      setTimeout(() => {
        this.dataAvailable = true;
        this.loader = false;
      }, 150);
    } else {
      this.dataAvailable = true;
      this.loader = false;
    }


  }


  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }

  goToOrgList() {
    this.router.navigate([`${this.sysAdminRoute}/organizations`]);
  }

  getSAList(): any {
    this.saListSubs = this.service.getSCLByOrg(this.ORG_ID).subscribe((res: any) => {
      this.securedTableData = res;
      this.setTableOptions();
    }, (err: HttpErrorResponse) => {
      this.securedTableData = [];
      this.setTableOptions();
      this.loader = false;
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.closeAlert();
      this.error = true;
    });
  }

  gotoSecuredAccessData(item: any) {
    sessionStorage.setItem('SecuredAccessUser', JSON.stringify(item));
    this.router.navigate([`${this.sysAdminRoute}/UserSecuredAccess`]);
  }

  checkType(str: string) {
    return this.service.checkType(str);
  }

  checkExpiry(obj: any) {
    return this.service.checkExpiry(obj);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.customTranslateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.customTranslateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }

  closeAlert() {
    this.error = false;
  }

}
