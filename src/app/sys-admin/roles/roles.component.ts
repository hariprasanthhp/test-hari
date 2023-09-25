import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
// import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  showConstructionPage: boolean;
  private tableMinView: number;


  @HostListener('click', ['$event'])
  onClick(el) {

    let clsList = el.target.className;
    let tag = el.target.localName;
    let table = '';
    if (tag == 'a') {
      table = el.target.attributes['aria-controls'].value;
    }

    if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'supportCloud-table') {
      this.supportTablePageChange();
    } else if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'marketingCloud-table') {
      this.marketingTablePageChange();
    } else if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'smartHome-table') {
      this.smartHomeTablePageChange();
    } else if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'fa-table') {
      this.faTablePageChange();
    } else if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'cco-table') {
      this.ccoTablePageChange();
    } else if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a' && table == 'foundation-table') {
      this.foundationTablePageChange();
    }
  }

  tableDisplay: boolean = false;
  language: any;
  pageAvailable: boolean = false;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;

  supportCloudRolesData = [];
  marketingCloudRolesData = [];
  smartHomeRoles = [];
  faRoles = [];
  systemRoles = [];
  foundationRoles = [];
  ccoRoles = [];
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthChange: false,
    ordering: false,
    searching: false,
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  modalTitle: string;
  modalInfo: string;

  supportCloudChecked = false;
  supportCloudDataSelcted = [];
  marketingCloudChecked = false;
  marketingCloudCheckedSelected = [];
  smartHomeChecked = false;
  smartHomeCheckedSelected = [];
  faChecked = false;
  faSelected = [];
  ccoChecked = false;
  ccoSelected = [];
  foundationChecked = false;
  foundationSelected = [];

  dataAvailable: boolean = false;

  supportCloudDeletes = [];
  marketingCloudDeletes = [];
  smartHomeDeletes = [];
  faDeletes = [];
  deleteRoles = [];
  ccoDeletes: any = [];
  foundationDeletes: any = [];

  deleteData: any;

  ORG_ID: string;
  MODULE: string = 'calixAdmin';

  orgEntitlements: any;
  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  supportCloudShow: boolean = false;
  marketingCloudShow: boolean = false;
  smartHomeShow: boolean = false;
  faShow: boolean = false;
  frTable: any;
  translateSubscribe: any;
  modalRef: any;
  delRoleSubs: any;

  pageReady: boolean = false;

  ccoRoleShow: boolean = false;
  foundationRoleShow: boolean = false;
  scopeWriteAccess = false;
  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    // private customTranslateService: CustomTranslateService,
    private organizationApiService: OrganizationApiService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    let scopes = this.sso.getScopes();
    this.scopeWriteAccess = this.checkScope();
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.setTableOptions('language');
      this.titleService.setTitle(`${this.language['roles']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.currentPageAdder('roles');
    this.getData();
    this.frTable = this.translateService.fr;
    //this.getRolesData();
    this.titleService.setTitle(`${this.language['roles']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    if (environment.VALIDATE_SCOPE) {
      this.showConstructionPage = false;
    } else {
      this.showConstructionPage = true;
    }
    this.closeAlert();
    this.tableLanguageOptions();
  }

  ngOnDestroy(): void {

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.delRoleSubs) {
      this.delRoleSubs.unsubscribe();
    }

  }

  getData() {
    //this.getOrgEntitlements();
    const requestEndpoints = [
      `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/roles`,
      //`${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/${this.ORG_ID}`
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.organizationApiService.callRestApi(endpoint).pipe(map((resp: any) => {
        return resp;
      }), catchError((error: any) => {
        return of(error);
      }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      let res = response[0];
      //this.orgEntitlements = response[1];

      this.showRoles();
      this.systemRoles = [];
      this.marketingCloudRolesData = [];
      this.supportCloudRolesData = [];
      this.smartHomeRoles = [];
      this.faRoles = [];
      this.foundationRoles = [];
      this.ccoRoles = [];
      this.resetAllDeletes();

      if (res != null && res.error != undefined) {
        this.pageErrorHandle(res);
        this.dataAvailable = true;
        return;
      }

      res.forEach(el => {
        if (el.apptype == 0) {
          this.systemRoles.push(el);
        } else if (el.apptype == 118) {
          this.supportCloudRolesData.push(el);
        } else if (el.apptype == 119) {
          this.marketingCloudRolesData.push(el)
        } else if (el.apptype == 'shad') {
          this.smartHomeRoles.push(el)
        } else if (el.apptype == 102) {
          //this.faRoles.push(el);
          this.ccoRoles.push(el)
        } else if (el.apptype == 200) {
          this.foundationRoles.push(el);
        }
      });

      // setTimeout(() => {
      this.dataAvailable = true;
      // }, 500);
      setTimeout(() => {
        this.tableDisplay = true;
      }, 100);

    });
  }



  setTableOptions(type?: string) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      ordering: false,
      searching: false,
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };
    this.tableLanguageOptions(type);
    if (!type) {
      setTimeout(() => {
        this.dataAvailable = true;
      }, 200);
    }

  }

  roleDelete(data) {
    this.deleteData = data;
    this.modalTitle = this.language['Delete Role'];
    this.modalInfo = `${data.name}`;
    this.openDeleteModal();
  }


  confirmDelete() {
    this.closeModal();
    this.delRoleSubs = this.organizationApiService.RoleDelete(this.deleteData._id).subscribe((res: any) => {
      this.dataAvailable = false;
      this.closeAlert();
      this.getData();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.dataAvailable = true;
    })
  }

  someClickHandler(info: any): void {
    //this.message = info.id + ' - ' + info.firstName;
  }

  addRole(page) {
    sessionStorage.setItem('calixAdminAddRole', page);
    this.router.navigate([`${this.MODULE}/addRole`]);
  }

  gotoRoleDetail(data, page) {
    sessionStorage.setItem('calixAdminAddRole', page);
    sessionStorage.setItem('calixAdminAddRoleId', data._id);
    this.router.navigate([`${this.MODULE}/roleDetails`]);
  }

  supportCloudCheckall(isChecked) {

    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="support_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.supportCloudRolesData.forEach(element => {
          if (element._id == id) {
            that.supportCloudDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="support_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.supportCloudDeletes = [];
        i++;
      });
    }

  }


  supportCloudCheckOne(data, isChecked) {
    if (isChecked) {
      this.supportCloudDeletes.push(data);
      let tot = $('input[name^="support_del"]').length;
      const tableMaxViewLocal = 5;
      if (this.supportCloudDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#supportCloudCheckall').prop('checked', true);
        $('#supportCloudCheckall-span').hide();
      } else if (this.supportCloudDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.supportCloudDeletes.length;
        if (this.tableMinView >= tot) {
          (document.getElementById('supportCloudCheckall') as HTMLInputElement).checked = true;
          document.getElementById('supportCloudCheckall-span').style.display = 'none';
        }
      } else {
        $('#supportCloudCheckall-span').show();
      }
    } else {
      this.supportCloudDeletes = this.supportCloudDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="support_del"]').length;
      if (this.supportCloudDeletes.length) {
        if (this.supportCloudDeletes.length != tot || this.tableMinView != tot) {
          $('#supportCloudCheckall').prop('checked', false);
          $('#supportCloudCheckall-span').show();
        } else {
          $('#supportCloudCheckall-span').hide();
        }
      } else {
        $('#supportCloudCheckall').prop('checked', false);
        $('#supportCloudCheckall-span').hide();
      }
    }
  }

  showAllUserCheckBox(event, table): any {
    $('#' + event.target.id).hide();
    if (table == 'supportCloud') {
      $('#supportCloudCheckall').prop("checked", true);
      this.supportCloudCheckall(true);
    } else if (table == 'marketingCloud') {
      $('#marketingCloudCheckedAll').prop("checked", true);
      this.marketingCloudCheckedAll(true);
    } else if (table == 'smartHome') {
      $('#smartHomeCheckedAll').prop("checked", true);
      this.smartHomeCheckedAll(true);
    } else if (table == 'cco') {
      $('#ccoCheckedAll').prop("checked", true);
      this.ccoCheckedAll(true);
    } else if (table == 'foundation'){
      (document.getElementById('foundationCheckedAll') as HTMLInputElement).checked = true;
      this.foundationCheckedAll(true);
    } else {
      $('#faCheckedAll').prop("checked", true);
      this.faCheckedAll(true);
    }

  }

  marketingCloudCheckedAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="marketing_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.marketingCloudRolesData.forEach(element => {
          if (element._id == id) {
            that.marketingCloudDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="marketing_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.marketingCloudDeletes = [];
        i++;
      });
    }


  }
  marketingCloudCheckedOne(data, isChecked) {
    if (isChecked) {
      this.marketingCloudDeletes.push(data);
      let tot = $('input[name^="marketing_del"]').length;
      const tableMaxViewLocal = 5;

      if (this.marketingCloudDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#marketingCloudCheckedAll').prop('checked', true);
        $('#marketingCloudCheckedAll-span').hide();
       } else if (this.marketingCloudDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.marketingCloudDeletes.length;
        if (this.tableMinView >= tot) {
          (document.getElementById('marketingCloudCheckedAll') as HTMLInputElement).checked = true;
          document.getElementById('marketingCloudCheckedAll-span').style.display = 'none';
        }
      } else {
        $('#marketingCloudCheckedAll-span').show();
      }
    } else {
      this.marketingCloudDeletes = this.marketingCloudDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="marketing_del"]').length;
      if (this.marketingCloudDeletes.length) {
        if (this.marketingCloudDeletes.length != tot || this.tableMinView != tot) {
          $('#marketingCloudCheckedAll').prop('checked', false);
          $('#marketingCloudCheckedAll-span').show();
        } else {
          $('#marketingCloudCheckedAll-span').hide();
        }
      } else {
        $('#marketingCloudCheckedAll').prop('checked', false);
        $('#marketingCloudCheckedAll-span').hide();
      }
    }
  }

  smartHomeCheckedAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="smarthome_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.smartHomeRoles.forEach(element => {
          if (element._id == id) {
            that.smartHomeDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="smarthome_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.smartHomeDeletes = [];
        i++;
      });
    }

  }
  smartHomeCheckedOne(data, isChecked) {
    if (isChecked) {
      this.smartHomeDeletes.push(data);
      let tot = $('input[name^="smarthome_del"]').length;
      const tableMaxViewLocal = 5;
      if (this.smartHomeDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#smartHomeCheckedAll').prop('checked', true);
        $('#smartHomeCheckedAll-span').hide();
      } else if (this.smartHomeDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.smartHomeDeletes.length;
        if (this.tableMinView >= tot) {
          (document.getElementById('smartHomeCheckedAll') as HTMLInputElement).checked = true;
          document.getElementById('smartHomeCheckedAll-span').style.display = 'none';
        }
      } else {
        $('#smartHomeCheckedAll-span').show();
      }
    } else {
      this.smartHomeDeletes = this.smartHomeDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="smarthome_del"]').length;
      if (this.smartHomeDeletes.length) {
        if (this.smartHomeDeletes.length != tot || this.tableMinView != tot) {
          $('#smartHomeCheckedAll').prop('checked', false);
          $('#smartHomeCheckedAll-span').show();
        } else {
          $('#smartHomeCheckedAll-span').hide();
        }
      } else {
        $('#smartHomeCheckedAll').prop('checked', false);
        $('#smartHomeCheckedAll-span').hide();
      }
    }
  }

  faCheckedAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="fa_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.faRoles.forEach(element => {
          if (element._id == id) {
            that.faDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="fa_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.faDeletes = [];
        i++;
      });
    }

  }
  faCheckedOne(data, isChecked) {
    if (isChecked) {
      this.faDeletes.push(data);
      let tot = $('input[name^="fa_del"]').length;
      const tableMaxViewLocal = 5;
      if (this.faDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#faCheckedAll').prop('checked', true);
        $('#faCheckedAll-span').hide();
      } else if (this.faDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.faDeletes.length;
          if (this.tableMinView >= tot) {
            (document.getElementById('faCheckedAll') as HTMLInputElement).checked = true;
            document.getElementById('faCheckedAll-span').style.display = 'none';
          }
      } else {
        $('#faCheckedAll-span').show();
      }
    } else {
      this.faDeletes = this.faDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="fa_del"]').length;
      if (this.faDeletes.length) {
        if (this.faDeletes.length != tot || this.tableMinView != tot) {
          $('#faCheckedAll').prop('checked', false);
          $('#faCheckedAll-span').show();
        } else {
          $('#faCheckedAll-span').hide();
        }
      } else {
        $('#faCheckedAll').prop('checked', false);
        $('#faCheckedAll-span').hide();
      }
    }

  }

  ccoCheckedAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="cco_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.ccoRoles.forEach(element => {
          if (element._id == id) {
            that.ccoDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="cco_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.ccoDeletes = [];
        i++;
      });
    }
  }

  ccoCheckedOne(data, isChecked) {
    if (isChecked) {
      this.ccoDeletes.push(data);
      let tot = $('input[name^="cco_del"]').length;
      const tableMaxViewLocal = 5;
      if (this.ccoDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#ccoCheckedAll').prop('checked', true);
        $('#ccoCheckedAll-span').hide();
      } else if (this.ccoDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.ccoDeletes.length;
        if (this.tableMinView >= tot) {
          (document.getElementById('ccoCheckedAll') as HTMLInputElement).checked = true;
          document.getElementById('ccoCheckedAll-span').style.display = 'none';
        }
      } else {
        $('#ccoCheckedAll-span').show();
      }
    } else {
      this.ccoDeletes = this.ccoDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="cco_del"]').length;
      if (this.ccoDeletes.length) {
        if (this.ccoDeletes.length != tot || this.tableMinView != tot) {
          $('#ccoCheckedAll').prop('checked', false);
          $('#ccoCheckedAll-span').show();
        } else {
          $('#ccoCheckedAll-span').hide();
        }
      } else {
        $('#ccoCheckedAll').prop('checked', false);
        $('#ccoCheckedAll-span').hide();
      }
    }
  }

  foundationCheckedAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="foundation_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.foundationRoles.forEach(element => {
          if (element._id == id) {
            that.foundationDeletes.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="foundation_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.foundationDeletes = [];
        i++;
      });
    }
  }

  //Foundation
  foundationCheckedOne(data, isChecked) {
    if (isChecked) {
      this.foundationDeletes.push(data);
      let tot = $('input[name^="foundation_del"]').length;
      const tableMaxViewLocal = 5;
      if (this.foundationDeletes.length >= tot && tot == tableMaxViewLocal) {
        $('#foundationCheckedAll').prop('checked', true);
        $('#foundationCheckedAll-span').hide();
      } else if (this.foundationDeletes.length >= tot && tot != tableMaxViewLocal) {
        this.tableMinView = this.foundationDeletes.length;
        if (this.tableMinView >= tot) {
          (document.getElementById('foundationCheckedAll') as HTMLInputElement).checked = true;
          document.getElementById('foundationCheckedAll-span').style.display = 'none';
        }
      } else {
        $('#foundationCheckedAll-span').show();
      }
    } else {
      this.foundationDeletes = this.foundationDeletes.filter((e) => {
        return e._id != data._id;
      });
      let tot = $('input[name^="foundation_del"]').length;
      if (this.foundationDeletes.length) {
        if (this.foundationDeletes.length != tot || this.tableMinView != tot) {
          $('#foundationCheckedAll').prop('checked', false);
          $('#foundationCheckedAll-span').show();
        } else {
          $('#foundationCheckedAll-span').hide();
        }
      } else {
        $('#foundationCheckedAll').prop('checked', false);
        $('#foundationCheckedAll-span').hide();
      }
    }
  }


  deleteMultiRoles(roleType: string) {
    if (roleType == 'supportCloud') {
      this.deleteRoles = this.supportCloudDeletes;
    } else if (roleType == 'marketingCloud') {
      this.deleteRoles = this.marketingCloudDeletes;
    } else if (roleType == 'smartHome') {
      this.deleteRoles = this.smartHomeDeletes;
    } else if (roleType == 'cco') {
      this.deleteRoles = this.ccoDeletes;
    } else if (roleType == 'foundation') {
      this.deleteRoles = this.foundationDeletes;
    } else {
      this.deleteRoles = this.faDeletes;
    }

    this.modalTitle = this.language['Delete Multiple Roles'];
    let names: any = [];
    this.deleteRoles.forEach(element => {
      names.push(element.name);
    });
    const namesUniq = [...new Set(names)];
    this.modalInfo = namesUniq.join(', ');
    this.openMultiDeleteModal();
  }

  confirmDeleteSecleted(): void {
    this.closeModal();
    const deleteCalls: Observable<any>[] = [];
    this.deleteRoles.forEach(el => {
      deleteCalls.push(this.organizationApiService.RoleDelete(el._id));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.supportCloudDeletes = [];
        this.marketingCloudDeletes = [];
        this.smartHomeDeletes = [];
        this.faDeletes = [];
        this.ccoDeletes = [];
        this.foundationDeletes = [];
        this.deleteRoles = [];

        this.dataAvailable = false;
        this.getData();
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );
  }

  roleDetails() {
    this.router.navigate([`${this.MODULE}/roleDetails`]);
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  openDeleteModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  openMultiDeleteModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
  }

  resetAllDeletes() {
    this.supportCloudDeletes = [];
    this.marketingCloudDeletes = [];
    this.smartHomeDeletes = [];
    this.faDeletes = [];
    this.ccoDeletes = [];
  }

  showRoles() {
    this.supportCloudShow = true;
    this.marketingCloudShow = true;
    this.smartHomeShow = false; // to fix CCL-29076
    this.faShow = false;
    this.ccoRoleShow = true;
    this.foundationRoleShow = true;
    // this.orgEntitlements.forEach(el => {

    //   if (el.appType == 118) {
    //     this.supportCloudShow = true;
    //   } else if (el.appType == 119) {
    //     this.marketingCloudShow = true;
    //   } else if (el.appType == 'shad' || el.appType == 200 || el.appType == 201) {
    //     this.smartHomeShow = true;
    //   } else if (el.appType == 102) {
    //     this.faShow = true;
    //   }
    // });
  }

  tableLanguageOptions(type?) {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
    this.marketingCloudDeletes=[]
    this.supportCloudDeletes=[]
    this.foundationDeletes= [];
    this.ccoDeletes = [];
    if (type) {
      setTimeout(() => {
        this.dataAvailable = true;
      }, 200);
    }

  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.commonOrgService.pageScrollTop();
  }

  supportTablePageChange() {
    setTimeout(() => {
      $('#supportCloudCheckall-span').hide();
      $('#supportCloudCheckall').prop("checked", false);
      this.supportCloudCheckall(false);
    }, 100);
  }

  marketingTablePageChange() {
    setTimeout(() => {
      $('#marketingCloudCheckedAll-span').hide();
      $('#marketingCloudCheckedAll').prop("checked", false);
      this.marketingCloudCheckedAll(false);
    }, 100);
  }

  smartHomeTablePageChange() {
    setTimeout(() => {
      $('#smartHomeCheckedAll-span').hide();
      $('#smartHomeCheckedAll').prop("checked", false);
      this.smartHomeCheckedAll(false);
    }, 100);
  }

  faTablePageChange() {
    setTimeout(() => {
      $('#faCheckedAll-span').hide();
      $('#faCheckedAll').prop("checked", false);
      this.faCheckedAll(false);
    }, 100);
  }

  ccoTablePageChange() {
    setTimeout(() => {
      $('#ccoCheckedAll-span').hide();
      $('#ccoCheckedAll').prop("checked", false);
      this.ccoCheckedAll(false);
    }, 100);
  }

  foundationTablePageChange() {
    setTimeout(() => {
      $('#foundationCheckedAll-span').hide();
      $('#foundationCheckedAll').prop("checked", false);
      this.foundationCheckedAll(false);
    }, 100);
  }

  checkScope() {
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      if (scopes && (scopes['cloud.admin.roles']) && scopes['cloud.admin.roles'].indexOf('write') !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
