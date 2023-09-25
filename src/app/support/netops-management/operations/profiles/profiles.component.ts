import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  language: any;
  languageSubject;
  loading: boolean = true;
  profileTableData: any = [];
  allProfileSubscribe: any;
  profileCountSubscribe: any;
  addProfileObj: any = {};
  tableOptions: DataTables.Settings = {}
  errorMsg: string = undefined;
  modalRef: any;
  modalTitle: string = '';
  orgId: string = '';
  profileCountt: any = {};
  deleteProfileData: any;
  modalInfo: string = '';
  @ViewChild('deleteModal', {
    static: true
  }) private deleteModal: TemplateRef<any>;

  dataAvailable: boolean;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject<any>();
  validateScopeStage: boolean = false;
  isRerender = false;
  frTable: any;
  hasWriteAccess = false;
  hasScopeAccess = false;
  profiledata: any;
  enableMyCommunity: boolean;
  activeSortElement: any;

  constructor(private translateService: TranslateService, public ssoService: SsoAuthService,
    private service: ProfileService, private router: Router,
    private dialogService: NgbModal, private titleService: Title,
    private commonOrgService: CommonService,) {
    let entitlement = this.ssoService.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222 || entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }
    this.frTable = this.translateService.fr;
  }
  isProfileDataAvailable: boolean = false;
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/services/service-profiles/profiles')) {
      this.titleService.setTitle(`${this.language['Profiles']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/services/service-profiles/profiles')) {
      this.titleService.setTitle(`${this.language['RG Profiles']} - ${this.language['Services Profiles']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['RG Profiles']} - ${this.language['Profiles']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.tableOptions = {
      searching: false,
      lengthChange: false,
      ordering: true,
      serverSide: true,
      paging: false,
      info: false,
      order: [0, 'asc'],
      columnDefs: [
        { targets: [0, 1, 2], orderable: true },
        { targets: 3, orderable: false }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        if (!this.profileTableData.length || !dataTablesParameters.order[0]) return;
        let tempData = this.profileTableData;
        this.loading = true;

        if (dataTablesParameters.order[0].column == 0) {
          tempData = _.orderBy(tempData, obj => obj.name.trim().toLowerCase(), [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }

        if (dataTablesParameters.order[0].column == 1) {
          tempData = _.orderBy(tempData, obj => obj.description ? obj.description.trim().toLowerCase() : '', [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }

        if (dataTablesParameters.order[0].column == 2) {
          tempData = _.orderBy(tempData, obj => obj?.configurations[0]?.category.trim().toLowerCase(), [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
          // for feature if we need to concate string values sort..
          // tempData = _.orderBy(tempData,obj => {
          //   return obj?.configurations?.length > 2 ? `${obj?.configurations[0]?.category} and ${obj?.configurations?.length -1} more categories` :
          //   obj?.configurations?.length == 2 ? (obj?.configurations[0]?.category + ' and '+ obj?.configurations[1]?.category) : obj.configurations[0]?.category;
          // } ,[dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }

        //to clear previous sort icon
        if (this.activeSortElement) {
          this.clearSort(this.activeSortElement);
        }

        //to set sort Icon
        let setElement = (document.querySelectorAll(`#profile-list-table thead tr th`)[dataTablesParameters.order[0].column] as HTMLElement);
        this.setSorting(setElement, dataTablesParameters.order[0].dir);

        this.activeSortElement = setElement;//after sort data reassigning

        this.profileTableData = tempData;
        this.loading = false;
        callback({
          recordsTotal: tempData?.length,
          recordsFiltered: tempData?.length,
          data: [],
          draw: 0
        });
      }
      // drawCallback:(settings:any)=>{
      //   if(settings.aaSorting.length) this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //   }, 500);
      // }
    }
    // this.titleService.setTitle('Calix Cloud - Operations - Profiles');
    let scopes = this.ssoService.getScopes();

    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.validateScopeStage = true;
    } else this.validateScopeStage = false;
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/service-profiles/profiles')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.operations.profiles'] = scopes['cloud.rbac.csc.netops.operations.profiles'] ? scopes['cloud.rbac.csc.netops.operations.profiles'] : [];
        if (scopes['cloud.rbac.csc.netops.operations.profiles'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.csc.netops.operations.profiles'] && scopes['cloud.rbac.csc.netops.operations.profiles'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/service-profiles/profiles')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.serviceprofiles.rgprofiles']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.services.serviceprofiles.rgprofiles']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.isRerender = true;
      // this.setTableOptions('language');
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    if (!this.hasScopeAccess) {
      this.ssoService.setPageAccess(false);
      return;
    }

    this.orgId = this.ssoService.getOrgId();
    this.getProfileCount();
    this.getProfileData();
    // setTimeout(() => {
    //   this.getProfileData();
    // }, 1000);

  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  getProfileData(isRerender?: boolean) {
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.profileTableData = []
    this.loading = true;
    this.allProfileSubscribe = this.service.getProfileList(this.orgId).subscribe((res: any) => {
      if (res) {
        if (this.enableMyCommunity) {
          for (var i = 0; i < res?.length; i++) {
            let data = res[i]?.configurations
            data = data.filter(el => !el?.isInvalid)
            if (data?.length) {
              res[i].configurations = data;
            } else {
              res.splice(i, 1)
              i = 0
            }
          }
          this.profileTableData = res;
        } else if (!this.enableMyCommunity) {
          for (var i = 0; i < res?.length; i++) {
            let data = res[i]?.configurations
            data = data.filter(el => !el?.isInvalid)
            if (data?.length) {
              res[i].configurations = data;
            } else {
              res.splice(i, 1)
              i = 0
            }
          }
          this.profileTableData = res.filter(item => item?.configurations[0].category !== 'myCommunityIQ Traffic');
        }
        this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
          this.tableOptions.order = [0, 'asc'];
          dtInstance.ajax.reload();
        })
        // this.loading = false;
        //  this.setTableOptions();
        // if (isRerender) {
        //   this.rerender();
        // } else {
        //   this.dtTrigger.next();
        // }


      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.error;
    }
      //, () => {
      //   this.loading = false;
      // }
    );
    this.hideNoDataRow();
  }

  // setTableOptions(type?: string) {
  //   // this.tableOptions = {
  //   //   pagingType: 'full_numbers',
  //   //   columnDefs: [
  //   //     { targets: [-1], orderable: false },
  //   //   ],
  //   //   drawCallback: (settings) => {
  //   //     let total = settings.aoData.length;
  //   //     let length = settings._iDisplayLength;
  //   //     if (total <= length) {
  //   //       $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
  //   //     }
  //   //   }
  //   // };

  //   this.tableLanguageOptions();

  //   if (type && type == 'language') {
  //     setTimeout(() => {
  //       this.rerender();
  //       this.dataAvailable = true;
  //       this.loading = false;
  //     }, 200);
  //   } else {
  //     setTimeout(() => {
  //       this.dataAvailable = true;
  //       this.loading = false;
  //     }, 200);
  //   }


  // }

  getProfileCount() {
    if (this.profileCountSubscribe) this.profileCountSubscribe.unsubscribe();
    this.profileCountSubscribe = this.service.getProfileCount().subscribe((res: any) => {
      if (res) {
        this.profileCountt = res;
        // this.loading = false;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.error;
    },
      //  () => {
      //   this.loading = false;
      // }
    );
  }


  editProfile(item) {
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.allProfileSubscribe = this.service.getProfileDataById(item._id).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('profileWizardState', JSON.stringify({ profileList: [], editProfile: res, isOverview: false }));
        this.router.url.includes('foundation-operations') ?
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles/profile-wizard',
            './cco/services/service-profiles/profiles/profile-wizard',
            './cco-foundation/foundation-operations/foundation-system-operation/profiles/profile-wizard',
            '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'

          ], { state: { profileList: [], editProfile: res, isOverview: false } }) :
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles/profile-wizard',
            './cco/services/service-profiles/profiles/profile-wizard',
            './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles/profile-wizard',
            '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'

          ], { state: { profileList: [], editProfile: res, isOverview: false } });
      }
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.error;
    }, () => {
    });
  }

  showOverView(item) {
    this.loading = true;
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.allProfileSubscribe = this.service.getProfileDataById(item._id).subscribe((res: any) => {
      if (res) {
        this.loading = false;
        localStorage.setItem('profileWizardState', JSON.stringify({ editProfile: res, isOverview: true }));
        this.router.url.includes('foundation-operations') ?
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles/profile-wizard',
            './cco/services/service-profiles/profiles/profile-wizard',
            './cco-foundation/foundation-operations/foundation-system-operation/profiles/profile-wizard',
            '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'
          ], { state: { editProfile: res, isOverview: true } }) :
          this.ssoService.redirectByUrl([
            '/support/netops-management/operations/profiles/profile-wizard',
            './cco/services/service-profiles/profiles/profile-wizard',
            './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles/profile-wizard',
            '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'
          ], { state: { editProfile: res, isOverview: true } });
      }
    }, (err: HttpErrorResponse) => {
      this.errorMsg = err.error.error;
    }, () => {
    });
  }

  onAddProfile() {
    localStorage.setItem('profileWizardState', JSON.stringify({ profileList: [], editProfile: undefined, isOverview: false }));
    this.router.url.includes('foundation-operations') ?
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles/profile-wizard',
        './cco/services/service-profiles/profiles/profile-wizard',
        './cco-foundation/foundation-operations/foundation-system-operation/profiles/profile-wizard',
        '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'
      ], { state: { profileList: [], editProfile: undefined, isOverview: false } }) :
      this.ssoService.redirectByUrl([
        '/support/netops-management/operations/profiles/profile-wizard',
        './cco/services/service-profiles/profiles/profile-wizard',
        './cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/profiles/profile-wizard',
        '/cco/operations/cco-subscriber-operations/operations/profiles/profile-wizard'
      ], { state: { profileList: [], editProfile: undefined, isOverview: false } })

  }


  deleteProfile(item: any): void {
    this.closeModal();
    this.deleteProfileData = item;
    this.modalTitle = this.language['Delete Profile'];
    this.modalInfo = item.name;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  deleteRes: any = {};
  confirmDeleteSecleted() {

    // this.loading = true;
    if (this.allProfileSubscribe) this.allProfileSubscribe.unsubscribe();
    this.allProfileSubscribe = this.service.deleteProfileById(this.deleteProfileData._id).subscribe((res: any) => {
      if (res) {
        this.deleteRes = res;
        this.getProfileData(true);
        this.deleteProfileData = undefined;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      //this.errorMsg = err.error.error;
      this.deleteProfileData = undefined;
    }, () => {
      // this.loading = false;
      this.closeModal();
    });
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoService.pageErrorHandle(err);
    }

  }
  onCloseError() {
    this.errorMsg = undefined;
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.deleteProfileData = undefined;
  }

  rerender(): void {
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.destroy();
    //   this.dtTrigger.next();
    // });
  }

  tableLanguageOptions() {
    // if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'fr') {
    //   this.tableOptions.language = this.frTable;
    // } else if (localStorage.getItem('defaultLanguage') && localStorage.getItem('defaultLanguage') == 'en' && this.tableOptions.language) {
    //   delete this.tableOptions.language;
    // }
  }
  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 500);
  }
  setSorting(element: HTMLElement, dir) {
    let addDir = dir == 'asc' ? 'sorting_asc' : 'sorting_desc';
    let removeDir = dir == 'asc' ? 'sorting_desc' : 'sorting_asc';
    element.classList.remove('sorting');
    element.classList.remove(removeDir);
    element.classList.add(addDir);
  }
  clearSort(element: HTMLElement) {
    if (element) {
      element.classList.add('sorting');
      element.classList.remove('sorting_asc', 'sorting_desc');
    }
  }
}
