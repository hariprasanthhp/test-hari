import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, HostListener } from '@angular/core';
//import { CommonFunctionAllService } from '../../flow-config/services/common-function-all.service';
import { CommonService } from '../services/common.service';
import { Location } from '@angular/common';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
// import { OrganizationApiService } from '../services/organization-api.service';
import { AddRoleService } from '../services/add-role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../shared/services/auth.service';
import { combineLatest, Subject, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { catchError, map } from 'rxjs/operators';

declare var require;
const $: any = require('jquery');
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  isExpanded: any = {};

  @HostListener('click', ['$event'])
  onClick(el) {
    let clsList = el.target.className;
    let tag = el.target.localName;
    if (clsList.indexOf('paginate_button') > -1 && clsList.indexOf('disabled') == -1 && clsList.indexOf('current') == -1 && tag == 'a') {
      this.tablePageChange();
    }
  }

  loader: any = true;
  language: any;
  pageAvailable: boolean = false;

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;

  rolesAddForm: string = 'supportCloud';
  pageTitle: any;

  usersList: any = []; // All users
  usersFiltered: any = [] // Users list except added 
  selectedUsers: any; // selected in dropdown but still not added
  addedUsersList: any = []; // Added users list

  existingUserError: boolean = false;

  usersDelSelected = [];
  usersDelSelectedChecked = false;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'tipr',
    ordering: false,
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };

  supportCloudRolesData = [];
  marketingCloudRolesData = [];
  smartHomeRoles = [];
  systemRoles = [];

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  modalTitle: string;
  modalInfo: string;

  warning: boolean;
  warningInfo: string = '';

  supportDataAvailable: boolean = false;
  marketingDataAvailable: boolean = false;
  smartDataAvailable: boolean = false;
  systemDataAvailable: boolean = false;
  dataAvailable: boolean = false;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  roleName: string;
  roleDescription: string;
  appType: string;

  editRoleId: string;
  roleDatas: any;

  allPermissions: any = [];

  ORG_ID: string;
  deleteItem: any;

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  allPrmsnfrmApi = [];

  MODULE: string = 'systemAdministration';
  usersCount: number | string = 0;
  frTable: any;
  translateSubscribe: any;
  modalRef: any;
  allPermsSubs: any;
  usersCountSubs: any;
  usersListSubs: any;
  roleGetSubs: any;
  roleUpdateSubs: any;
  scopesToBeDisabled = [
    "cloud.rbac.csc.qoe", "cloud.rbac.csc.apps.arlo", "cloud.rbac.csc.apps.servify",
    "cloud.rbac.csc.apps.mycommunityiq", "cloud.rbac.csc.apps.bark", "cloud.rbac.csc.devices",
    "cloud.rbac.csc.topology","cloud.rbac.csc.calloutcome.enforce"
  ];
  scopeDisplayName = {'WiFi': 'WiFi', 'XDSL': 'XDSL', 'Devices': 'Devices', "Subscriber Mgmt": "Subscriber Mgmt"} /* CCL-37865 */
  scopeWriteAccess = false;
  constructor(
    private location: Location,
    //private commonFunctionAllService: CommonFunctionAllService,
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,
    // private organizationApiService: OrganizationApiService,
    public addRoleService: AddRoleService,
    private router: Router,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    let scopes = this.sso.getScopes();
    // debugger;
    this.scopeWriteAccess = this.checkScope();
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.pageTitleCreator();
      this.dataAvailable = false;
      this.isRerender = true;
      this.titleService.setTitle(`${this.language['Role detail']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.renderUsersTable('language');
    });
    this.frTable = this.customTranslateService.fr;

    this.rolesAddForm = sessionStorage.getItem('calixAdminAddRole');
    this.editRoleId = sessionStorage.getItem('calixAdminAddRoleId');
    this.commonOrgService.currentPageAdder('roleDetails');
    this.getDatas();
    this.pageTitleCreator();
    this.titleService.setTitle(`${this.language['Role detail']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {

    this.closeAlert();
    this.tableLanguageOptions();
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

  ngOnDestroy(): void {

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.allPermsSubs) {
      this.allPermsSubs.unsubscribe();
    }

    if (this.usersCountSubs) {
      this.usersCountSubs.unsubscribe();
    }

    if (this.usersListSubs) {
      this.usersListSubs.unsubscribe();
    }

    if (this.roleGetSubs) {
      this.roleGetSubs.unsubscribe();
    }

    if (this.roleUpdateSubs) {
      this.roleUpdateSubs.unsubscribe();
    }
  }

  getDatas() {
    this.getRoleData();
    this.getUserList();
  }

  getRoleData() {
    this.roleGetSubs = this.addRoleService.RoleData(this.editRoleId).subscribe((res: any) => {
      this.roleDatas = res;
      this.appType = res.apptype;
      //this.appType = (this.appType == 'shad') ? '200' : this.appType;

      this.processData(res);
      this.getAllPermissions();

      this.roleName = res.name;
      this.roleDescription = (res.description == undefined || res.description == null) ? '' : res.description;

      this.addedUsersList = (res.users != undefined) ? this.changeUsersData(res.users) : [];
      setTimeout(() => {
        this.renderUsersTable();
      }, 250);

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;

      this.addedUsersList = [];
      setTimeout(() => {
        this.renderUsersTable();
      }, 250);
    })
  }


  getAllPermissions() {
    this.allPermsSubs = this.addRoleService.AllPemissionsData(this.appType).subscribe((res: any) => {
      this.allPrmsnfrmApi = res;
      this.allPermissionsDataProcess(res);

      setTimeout(() => {
        this.getSlctdParams();
        if (this.rolesAddForm == 'marketingCloud') {
          $('.oneLevelDisable').prop('disabled', true);
        }
      }, 1000);
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
    })
  }

  allPermissionsDataProcess(data) {
    //this.allPermissions = this.commonOrgService.allSupportDataProcess(data, this.selectedPermissions);
    if (this.rolesAddForm == 'supportCloud' || this.rolesAddForm == 'marketingCloud' || this.rolesAddForm == 'cco') {
      this.allPermissions = this.commonOrgService.allSupportDataProcessV21(data, this.selectedPermissions);
      if (this.rolesAddForm == 'marketingCloud') {
        this.allPermissions = this.allPermissions.map(obj => {
          if (obj.displayName == "Subscriber" || obj.displayName == "Revenue") obj.isSubscriber = true;
          return obj;
        });
      }
    } else {
      this.allPermissions = this.commonOrgService.allSupportDataProcess(data, this.selectedPermissions);;
    }
    /* This is to disable scopes which doesn't have api to write/change anything
    Fix for CCL-36870 */
    this.allPermissions = this.disableScopeDoesntNeedWrite(this.allPermissions, 1);    
  }

  disableScopeDoesntNeedWrite(permissions, ind) { 
    permissions.forEach(obj => {
      const tempInd = (ind == 1 ? '' : ind);
      if (this.scopesToBeDisabled.includes(obj.name)) {
        obj.disableScope = true;
        obj.readWrite = false;
      }
      if (!this.scopeWriteAccess) {
        obj.disableScope = true;
      }
      if (obj.hasOwnProperty(`permissions${tempInd}`) && obj[`permissions${tempInd}`]) {
        obj = this.disableScopeDoesntNeedWrite(obj[`permissions${tempInd}`], (ind + 1));
      }
    });
    return permissions;
  }



  changeUsersData(data: any) {
    let modifiedData = [];
    data.forEach(element => {
      element['_id'] = element.userId;
      modifiedData.push(element);
    });
    return modifiedData;
  }

  getUserList() {
    this.usersCountSubs = this.addRoleService.UsersCountByOrgId(this.ORG_ID).subscribe((res: any) => {
      this.usersCount = res;
      this.usersListSubs = this.addRoleService.UsersListByOrgId(this.ORG_ID, res).subscribe((res: any) => {
        this.usersList = res;
        if (this.usersList.length) {
          this.selectedUsers = this.usersList[0];
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      })
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }

  addUser() {
    this.warning = false;
    let id = this.selectedUsers._id;
    if (this.addedUsersList.filter(e => e._id === id).length > 0) {
      this.warningInfo = `${this.selectedUsers.username} - ${this.language['User already added']}`;
      this.warning = true;
      return;
    }

    this.addedUsersList.push(this.selectedUsers);
    //this.redraw();
    this.isRerender = true;
    this.renderUsersTable();
    this.deleteUserCheckAll(false)
    this.resetMultiDelete();
  }

  deleteUser(item: any) {
    this.deleteItem = item;
    this.modalTitle = this.language['Delete User'];
    this.modalInfo = `${item.username}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDeleteSecleted() {
    this.closeModal();
    let item = this.deleteItem;
    let temp = [];
    this.addedUsersList.forEach(element => {
      if (element._id !== item._id) {
        temp.push(element);
      }
    });
    this.usersDelSelected = this.usersDelSelected.filter(ele => ele._id !== item._id)
    this.addedUsersList = temp;
    this.dataAvailable = false;
    this.isRerender = true;
    this.renderUsersTable();
    setTimeout(() => {
      this.deleteUserCheckAll(false);
      this.resetMultiDelete();
      }, 200);
  }

  deleteUserCheckAll(isChecked) {
    let i = 0;
    var that = this;
    let id: string;
    if (isChecked) {
      $('input[name^="user_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', true);
        id = $(this).attr('id');
        that.addedUsersList.forEach(element => {
          if (element._id == id && !that.usersDelSelected.includes(element)) {
            that.usersDelSelected.push(element);
          }

        });

        i++;
      });
    } else {
      $('input[name^="user_del"]').each(function () {
        if (i >= 5) {
          return false
        }
        $(this).prop('checked', false);
        that.usersDelSelected = [];
        i++;
      });

    }

  }

  deleteUserCheckOne(data, isChecked) {
    if (isChecked) {
      this.usersDelSelected.push(data);
      if (this.usersDelSelected.length == $('input[name^="user_del"]').length) {
        $('#user-all-delete').prop('checked', true);
        $('#user-all-delete-span').hide();
      } else {
        $('#user-all-delete-span').show();
      }
    } else {
      this.usersDelSelected = this.usersDelSelected.filter((e) => {
        return e._id != data._id;
      });

      if (this.usersDelSelected.length) {
        if (this.usersDelSelected.length != $('input[name^="user_del"]').length) {
          $('#user-all-delete').prop('checked', false);
          $('#user-all-delete-span').show();
        } else {
          $('#user-all-delete-span').hide();
        }
      } else {
        $('#user-all-delete').prop('checked', false);
        $('#user-all-delete-span').hide();
      }

    }
  }


  deleteMultiUsers() {
    this.modalTitle = this.language['Delete Multiple Users'];
    let names: any = [];
    this.usersDelSelected.forEach(element => {
      names.push(element.username);
    });
    this.modalInfo = names.join(', ');
    this.closeModal();
    this.modalRef = this.dialogService.open(this.multiDeleteModal);
  }

  confirmMultiDeleteSecleted() {
    this.closeModal();
    this.addedUsersList = this.addedUsersList.filter(({ _id }) => !this.usersDelSelected.some(x => x._id == _id));
    this.isRerender = true;
    this.renderUsersTable();

    // this.usersDelSelected = [];
    // $('#user-all-delete').prop('checked', false);
    // $('#user-all-delete-span').hide();
    setTimeout(() => {
      this.deleteUserCheckAll(false);
      this.resetMultiDelete();
      }, 200);
  }

  resetMultiDelete() {
    this.usersDelSelected = [];
    $('#user-all-delete').prop('checked', false);
    $('#user-all-delete-span').hide();
  }


  closeAlert() {
    this.error = false;
    this.success = false;
  }

  renderUsersTable(type?: string) {
    this.setTableOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }, 50);
    } else {
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
      }
    }


  }

  setTableOptions() {
    this.tableOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      //searching: false,
      ordering: false,
      dom: 'tipr',
      // paging: false,
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }

        //clear Delete  selection
        $('.paginate_button.next:not(.disabled)').click(() => {
        })

        setTimeout(() => {
          $('#add-role-users_paginate').on('click', '.paginate_button.next:not(.disabled)', () => {
            alert($(this).text());
          });
        }, 100);


      }
    };
    this.tableLanguageOptions();

    this.dataAvailable = true;

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  pageTitleCreator() {
    // if (this.rolesAddForm == 'smartHome') {
    //   this.pageTitle = 'Add new role for SmartHome Admin Dashboard';
    // } else if (this.rolesAddForm == 'marketingCloud') {
    //   this.pageTitle = 'Add new role for Marketing Cloud';
    // } else if (this.rolesAddForm == 'supportCloud') {
    //   this.pageTitle = 'Add new role for Support Cloudd';
    // }
    this.pageTitle = this.language.configure;
  }

  addRole() {
    this.closeAlert();
    if (this.roleName == undefined || this.roleName == '' || (this.roleName.length && this.roleName.trim() == '')) {
      this.errorInfo = this.language['Role name cannot be empty'];
      this.error = true;
      this.commonOrgService.pageScrollTop();
      return;
    } else {
      let name = this.roleName.trim();
      if (name == '' || name.length < 2) {
        this.errorInfo = this.language['Invalid name'];
        this.error = true;
        this.commonOrgService.pageScrollTop();
        return;
      }
    }

    var perParams = {};

    var fields = $('#permissionsForm').serializeArray();

    $.each(fields, function (i, field) {
      if (typeof perParams[field.name] != 'undefined') {
        if (jQuery.type(perParams[field.name]) != 'array') {
          var old = perParams[field.name];
          perParams[field.name] = [old];
        }
        perParams[field.name].push(field.value);
      } else {
        perParams[field.name] = field.value;
      }
    });

    let pd = perParams['scopeName'];

    /* const baseScope = pd.length ? pd[0].split('.').filter((obj, i) => i < 3).join('.') : '';
    for (let i = 0; (pd instanceof Array && i < pd.length); i++) {
      let concatScope = '';
      pd[i].split('.').forEach(scope => {
        concatScope += concatScope ? `.${scope}` : scope;
        if (concatScope.includes(baseScope) && concatScope !== baseScope && !pd.includes(concatScope)) {
          pd.push(concatScope);
        }
      });
    } */

    let pdData = [];
    if (pd) {
      if (typeof pd == 'string') {
        pdData.push({
          scopeName: pd,
          action: perParams[pd] ? 'read,write' : 'read'
        });

      } else {
        for (let i = 0; i < pd.length; i++) {
          pdData.push({
            scopeName: pd[i],
            action: perParams[pd[i]] ? 'read,write' : 'read'
          });
        }
      }
    }

    let params = {
      apptype: this.appType,
      name: this.roleName,
      description: this.roleDescription ? this.roleDescription : '',
      orgDefault: true,
      orgId: this.ORG_ID
    };
    this.loader = true;
    this.roleUpdateSubs = this.addRoleService.RoleUpdate(params, this.editRoleId).subscribe((res: any) => {
      this.addOtherDetailsToRole(pdData);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
    });

  }


  addOtherDetailsToRole(pdData) {

    const requests = [];

    let users = [];
    this.addedUsersList.forEach(element => {
      users.push(element._id);
    });
    const req = this.addRoleService.AddUsersByRoleId(users, this.roleDatas._id).pipe(map((resp: any) => {
      return resp;
    }), catchError((error: any) => {
      return of(error);
    }));
    requests.push(req);


    let params = [];
    params = pdData ? pdData : [];
    const req2 = this.addRoleService.AddRolePermissions(params, this.roleDatas._id).pipe(map((resp: any) => {
      return resp;
    }), catchError((error: any) => {
      return of(error);
    }));
    requests.push(req2);

    this.combineLatest = combineLatest(requests);
    this.makeParallelAddRequest();
  }

  makeParallelAddRequest() {
    this.loader = true;
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.loader = false;

      if (response.length) {
        for (let e of response) {
          if (e != null && e.error != undefined) {
            this.pageErrorHandle(e);
            return;
          }
        }
      }

      this.closeAlert();
      this.successInfo = this.language['Users with roles data saved successfully'];
      this.success = true;
      this.commonOrgService.pageScrollTop();
      setTimeout(() => {
        this.goToOrgRoles();
      }, 1500);
    });
  }

  goBack() {
    this.goToOrgRoles();
  }

  selectedPermissions: any;
  processData(res: any): any {
    let csc = res;

    let cscObj = {};
    if (csc.permissions == undefined) {
      this.selectedPermissions = cscObj;
      return
    }
    for (let i = 0; i < csc.permissions.length; i++) {
      if (csc.permissions[i].implied) {
        continue;
      }
      cscObj[csc.permissions[i].scopeName] = csc.permissions[i].action;
    }

    this.selectedPermissions = cscObj;
  }

   levelOneChange(scopeName: any, isChecked: any, item?: any) {
    $('.' + scopeName).prop('checked', isChecked);

    if (!isChecked) {
      //$('#' + scopeName + '_parent_span').show();
      $('#' + scopeName + '_parent').prop('checked', isChecked);

      $('.' + scopeName + '_action').prop('checked', isChecked);
      $('.' + scopeName + '_action').prop('disabled', true);
    } else {
      $('.' + scopeName + '_action').prop('disabled', false);
      $('#' + scopeName + '_parent').prop('checked', isChecked);
    }

    this.getSlctdParams();
    $('.oneLevelDisable').prop('disabled', true);
    if (item.name === 'cloud.rbac.csc.calloutcome') {
      // const enforceCalloutcomeId = item.permissions.find(e => e.name === 'cloud.rbac.csc.calloutcome.enforce')?._id;
      // let enforceCalloutcomeSwitch = document.getElementById(`${enforceCalloutcomeId}` + '_action') as HTMLInputElement;
      // enforceCalloutcomeSwitch.disabled = true;
      this.levelOneAction(item, isChecked);
    } else {
      this.renderChild(item, isChecked);
    }   
  }

  levelTwoChange(obj: any, isChecked: any, parentClass?: any) {
    const scopeName = obj._id;

    $('.' + scopeName).prop('checked', isChecked);

    if (!isChecked) {
      if (obj.name === 'cloud.rbac.csc.calloutcome.createview') {
        const calloutcomePermission = this.allPermissions.find(e => e.name === 'cloud.rbac.csc.calloutcome')?.permissions;
        const enforceCalloutcomeId = calloutcomePermission.find(e => e.name === 'cloud.rbac.csc.calloutcome.enforce')?._id;
        let enforceElement: HTMLInputElement = document.querySelector(`#${enforceCalloutcomeId}` + '_parent')
        enforceElement.checked = false;
      }
      $('#' + parentClass + '_parent_span').show();
      $('#' + parentClass + '_parent').prop('checked', isChecked);
      //$('.' + scopeName + '_action').prop('checked', isChecked);
      $('.' + scopeName + '_action').prop('disabled', true);
    } else {
      $('.' + parentClass + '_action').prop('disabled', obj.disableScope || false);
      $('#' + parentClass + '_parent_span').show();
      if (obj.name === 'cloud.rbac.csc.calloutcome.enforce') {
        const calloutcomePermission = this.allPermissions.find(e => e.name === 'cloud.rbac.csc.calloutcome')?.permissions;
        const createViewCalloutcomeId = calloutcomePermission.find(e => e.name === 'cloud.rbac.csc.calloutcome.createview')?._id;
        let createViewCalloutcomeElement = document.getElementById(`${createViewCalloutcomeId}` + '_parent') as HTMLInputElement;
        createViewCalloutcomeElement.checked = true;
        let createViewCalloutcomeSwitch = document.getElementById(`${createViewCalloutcomeId}` + '_action') as HTMLInputElement;
        createViewCalloutcomeSwitch.checked = true;
        let calloutcomeSwitch = document.getElementById(`${parentClass}` + '_action') as HTMLInputElement;
        calloutcomeSwitch.checked = true;
      }
      let checked = true;

      $('.' + parentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + parentClass + '_parent').prop('checked', isChecked);
        $('#' + parentClass + '_parent_span').hide();
      }
    }

    this.getSlctdParams();

    //Main parent
    if ($(`.${parentClass}`).length == $(`.${parentClass}:checked`).length) {
      $(`#${parentClass}_parent`).prop('checked', true).show();
      $(`#${parentClass}_parent_span`).hide();
    }
    else if ($(`.${parentClass}:checked`).length > 0) {
      $(`#${parentClass}_parent`).prop('checked', false).hide();
      $(`#${parentClass}_parent_span`).show();
    }
    else {
      $(`#${parentClass}_parent`).prop('checked', false).show();
      $(`#${parentClass}_parent_span`).hide();
    }
    if (obj.name === 'cloud.rbac.csc.calloutcome.enforce') {
      let enforceCalloutcomeSwitch = document.getElementById(`${scopeName}` + '_action') as HTMLInputElement;
      enforceCalloutcomeSwitch.disabled = true;
    }
  }

  levelThreeChange(obj: any, isChecked: any, parentClass?: any, mainParentClass?: any) {
    const scopeName = obj._id;
    $('.' + scopeName).prop('checked', isChecked);
    if (!isChecked) {
      $('#' + parentClass + '_parent').prop('checked', isChecked);
      $('#' + mainParentClass + '_parent').prop('checked', isChecked);
      $('#' + mainParentClass + '_parent_span').show();
      $('#' + scopeName + '_action').prop('disabled', true);
      //$('#' + scopeName + '_action').prop('checked', false);

      $('#' + parentClass + '_parent_span').show();
      $('#' + parentClass + '_parent').hide();
    } else {
      $('.' + scopeName + '_action').prop('disabled', obj.disableScope || false);
      $('#' + parentClass + '_parent_span').show();
      $('#' + mainParentClass + '_parent_span').show();
      $('#' + parentClass + '_parent').hide();
      let checked = true;

      $('.' + parentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + parentClass + '_parent').prop('checked', isChecked);
        $('#' + parentClass + '_parent_span').hide();
        $('#' + parentClass + '_parent').show();
      }

      checked = true;

      $('.' + mainParentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + mainParentClass + '_parent').prop('checked', isChecked);
        $('#' + mainParentClass + '_parent_span').hide();
        $('#' + parentClass + '_parent_span').hide();
      }

    }

    this.getSlctdParams();

    // Parent
    if ($(`.${parentClass}`).length == $(`.${parentClass}:checked`).length) {
      $(`#${parentClass}_parent`).prop('checked', true).show();
      $(`#${parentClass}_parent_span`).hide();
    }
    else if ($(`.${parentClass}:checked`).length > 0) {
      $(`#${parentClass}_parent`).prop('checked', false).hide();
      $(`#${parentClass}_parent_span`).show();
    }
    else {
      $(`#${parentClass}_parent`).prop('checked', false).show();
      $(`#${parentClass}_parent_span`).hide();
    }

    //Main parent
    if ($(`.${mainParentClass}`).length == $(`.${mainParentClass}:checked`).length) {
      $(`#${mainParentClass}_parent`).prop('checked', true).show();
      $(`#${mainParentClass}_parent_span`).hide();
    }
    else if ($(`.${mainParentClass}:checked`).length > 0) {
      $(`#${mainParentClass}_parent`).prop('checked', false).hide();
      $(`#${mainParentClass}_parent_span`).show();
    }
    else {
      $(`#${mainParentClass}_parent`).prop('checked', false).show();
      $(`#${mainParentClass}_parent_span`).hide();
    }
  }

  levelFourChange(obj: any, isChecked: any, innerParentClass?: any, parentClass?: any, mainParentClass?: any) {
    const scopeName = obj._id;

    if (!isChecked) {
      $('#' + parentClass + '_parent').prop('checked', isChecked);


      $('#' + mainParentClass + '_parent').prop('checked', isChecked);
      $('#' + mainParentClass + '_parent_span').show();

      let checked = true;

      $('.' + innerParentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });
      if (checked) {
        $('#' + innerParentClass + '_inner_parent_span').show();
        $('#' + innerParentClass + '_inner_parent').prop('checked', checked);
      } else {
        $('#' + innerParentClass + '_inner_parent_span').hide();
        $('#' + innerParentClass + '_inner_parent').prop('checked', checked);
      }


      // $('.' + scopeName + '_action').prop('checked', isChecked);
      // //$('.' + scopeName + '_action').prop('disabled', true);
      $('#' + scopeName + '_action').prop('disabled', true);
      $('#' + scopeName + '_action').prop('checked', false);

      $('#' + parentClass + '_parent_span').show();
      $('#' + parentClass + '_parent').hide();
    } else {
      $('.' + scopeName + '_action').prop('disabled', obj.disableScope || false);
      $('#' + parentClass + '_parent_span').show();
      $('#' + mainParentClass + '_parent_span').show();
      $('#' + parentClass + '_parent').hide();
      $('#' + innerParentClass + '_inner_parent').prop('checked', true);
      $('#' + innerParentClass + '_inner_parent_span').show();
      let checked = true;

      $('.' + parentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + parentClass + '_parent').prop('checked', isChecked);
        $('#' + parentClass + '_parent_span').hide();
        $('#' + parentClass + '_parent').show();
      }

      checked = true;

      $('.' + innerParentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + innerParentClass + '_inner_parent').prop('checked', checked);
        $('#' + innerParentClass + '_inner_parent_span').hide();
      }

      checked = true;

      $('.' + mainParentClass).each(function () {
        if (!$(this).prop('checked')) {
          checked = false;
        }
      });

      if (checked) {
        $('#' + mainParentClass + '_parent').prop('checked', isChecked);
        $('#' + mainParentClass + '_parent_span').hide();
        $('#' + parentClass + '_parent_span').hide();
      }

    }

    this.getSlctdParams();

    //First parent
    if ($(`.${scopeName}`).length == $(`.${scopeName}:checked`).length) {
      $(`#${innerParentClass}_parent`).prop('checked', true).show();
      $(`#${innerParentClass}_parent_span`).hide();
    }
    else if ($(`.${scopeName}:checked`).length > 0) {
      $(`#${innerParentClass}_parent`).prop('checked', false).hide();
      $(`#${innerParentClass}_parent_span`).show();
    }
    else {
      $(`#${innerParentClass}_parent`).prop('checked', false).show();
      $(`#${innerParentClass}_parent_span`).hide();
    }

    // Parent of parent
    if ($(`.${parentClass}`).length == $(`.${parentClass}:checked`).length) {
      $(`#${parentClass}_parent`).prop('checked', true).show();
      $(`#${parentClass}_parent_span`).hide();
    }
    else if ($(`.${parentClass}:checked`).length > 0) {
      $(`#${parentClass}_parent`).prop('checked', false).hide();
      $(`#${parentClass}_parent_span`).show();
    }
    else {
      $(`#${parentClass}_parent`).prop('checked', false).show();
      $(`#${parentClass}_parent_span`).hide();
    }

    //Main parent
    if ($(`.${mainParentClass}`).length == $(`.${mainParentClass}:checked`).length) {
      $(`#${mainParentClass}_parent`).prop('checked', true).show();
      $(`#${mainParentClass}_parent_span`).hide();
    }
    else if ($(`.${mainParentClass}:checked`).length > 0) {
      $(`#${mainParentClass}_parent`).prop('checked', false).hide();
      $(`#${mainParentClass}_parent_span`).show();
    }
    else {
      $(`#${mainParentClass}_parent`).prop('checked', false).show();
      $(`#${mainParentClass}_parent_span`).hide();
    }
  }

  // levelOneAction(scopeName: any, isChecked: any) {
  //   $('.' + scopeName + '_action').prop('checked', isChecked);
  // }

  levelOneAction(scope: any, isChecked: any) {
    $('.' + scope._id + '_action').not('[disabled]').prop('checked', isChecked);

    if (isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "false") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    } else if (!isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "true") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    }
    if (isChecked && !this.isExpanded.hasOwnProperty(scope._id)) {
      this.expandCollapse(scope._id);
    } else if (!isChecked && this.isExpanded.hasOwnProperty(scope._id)) {
      this.expandCollapse(scope._id);
    }
    if (scope.name === 'cloud.rbac.csc.calloutcome') {
      if (!isChecked) {
        const enforceCalloutcomeId = scope?.permissions.find(e => e.name === 'cloud.rbac.csc.calloutcome.enforce')?._id;
        let enforceElement: HTMLInputElement = document.querySelector(`#${enforceCalloutcomeId}` + '_parent');
        enforceElement.checked = false;
        let calloutcomeSwitch = document.getElementById(`${scope._id}` + '_action') as HTMLInputElement;
        calloutcomeSwitch.disabled = true;
        const createViewCalloutcomeId = scope?.permissions.find(e => e.name === 'cloud.rbac.csc.calloutcome.createview')?._id;
        let createViewCalloutcomeElement = document.getElementById(`${createViewCalloutcomeId}` + '_parent') as HTMLInputElement;
        if (createViewCalloutcomeElement.checked) {
          let calloutcomeElement: HTMLInputElement = document.querySelector(`#${scope?._id}` + '_parent');
          calloutcomeElement.checked = false;
          let calloutcomeSpan: HTMLInputElement = document.querySelector(`#${scope?._id}` + '_parent_span');
          calloutcomeSpan.style.display = 'inline';
        }
      } else {
        const enforceCalloutcomeId = scope?.permissions.find(e => e.name === 'cloud.rbac.csc.calloutcome.enforce')?._id;
        let enforceElement: HTMLInputElement = document.querySelector(`#${enforceCalloutcomeId}` + '_parent');
        enforceElement.checked = true;
        let calloutcomeElement: HTMLInputElement = document.querySelector(`#${scope?._id}` + '_parent');
        calloutcomeElement.checked = true;
        let calloutcomeSpan: HTMLInputElement = document.querySelector(`#${scope?._id}` + '_parent_span');
        calloutcomeSpan.style.display = 'none';
      }
    }

  }

  levelTwoAction(scope: any, isChecked: any, parent?: string) {

    $('.' + scope._id + '_action').not('[disabled]').prop('checked', isChecked);

    if ($(`.${parent}_action:not(.firstLevel)`).length == $(`.${parent}_action:not(.firstLevel):checked`).length) $(`#${parent}_action.firstLevel`).prop('checked', true);
    else $(`#${parent}_action.firstLevel`).prop('checked', false)

    if (isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "false") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    } else if (!isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "true") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    }

    if (!isChecked) {
      if (scope.name === 'cloud.rbac.csc.calloutcome.createview') {
        const calloutcomeScope = this.allPermissions.find(e => e.name === 'cloud.rbac.csc.calloutcome');
        const enforceCalloutcomeId = calloutcomeScope?.permissions.find(e => e.name === 'cloud.rbac.csc.calloutcome.enforce')?._id;
        let enforceElement: HTMLInputElement = document.querySelector(`#${enforceCalloutcomeId}` + '_parent');
        enforceElement.checked = false;
        let calloutcomeElement: HTMLInputElement = document.querySelector(`#${calloutcomeScope?._id}` + '_parent');
        calloutcomeElement.checked = false;
        let calloutcomeSpan: HTMLInputElement = document.querySelector(`#${calloutcomeScope?._id}` + '_parent_span');
        calloutcomeSpan.style.display = 'inline';
        let calloutcomeSwitch = document.getElementById(`${calloutcomeScope._id}` + '_action') as HTMLInputElement;
        calloutcomeSwitch.disabled = true;
        
      }
      $('#' + parent + '_action').prop('checked', false);
    }
  }

  levelThreeAction(scope: any, isChecked: any, parent?, mainParent?) {
   
    $('.' + scope._id + '_action').not('[disabled]').prop('checked', isChecked);

    if ($(`.${parent}_action`).length == $(`.${parent}_action:checked`).length) $(`#${parent}_action`).prop('checked', true);
    else $(`#${parent}_action`).prop('checked', false)

    if ($(`.${mainParent}_action:not(.firstLevel)`).length == $(`.${mainParent}_action:not(.firstLevel):checked`).length) $(`#${mainParent}_action.firstLevel`).prop('checked', true);
    else $(`#${mainParent}_action.firstLevel`).prop('checked', false)


    if (isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "false") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    } else if (!isChecked && $(`a[id^="collapse-btn-${scope.displayName}"]`).length && $(`a[id^="collapse-btn-${scope.displayName}"]`).attr('aria-expanded') == "true") {
      document.getElementById("collapse-btn-" + scope.displayName).click();
    }
  }

  levelFourAction(thisSiblings, parent, parentOfParent, mainParent) {

    if ($(`.${thisSiblings}_action`).length == $(`.${thisSiblings}_action:checked`).length) $(`#${parent}_action`).prop('checked', true);
    else $(`#${parent}_action`).prop('checked', false)

    if ($(`.${parentOfParent}_action`).length == $(`.${parentOfParent}_action:checked`).length) $(`#${parentOfParent}_action`).prop('checked', true);
    else $(`#${parentOfParent}_action`).prop('checked', false)

    if ($(`.${mainParent}_action:not(.firstLevel)`).length == $(`.${mainParent}_action:not(.firstLevel):checked`).length) $(`#${mainParent}_action.firstLevel`).prop('checked', true);
    else $(`#${mainParent}_action.firstLevel`).prop('checked', false)
  }


  goToOrgRoles() {
    this.router.navigate([`${this.MODULE}/roles`]);
  }

  showCheckBox(event, item: any): any {

    $('#' + event.target.id).hide();

    let idArr = event.target.id.split('_');
    this.levelOneChange(idArr[0], true, item);
  }

  closeAlertWarning() {
    this.warning = false;
  }

  hideSearch() {
    setTimeout(() => {
      $('#table-div .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#table-div .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 10);
  }

  getSlctdParams(): any {
    var perParams = {};
    
    var fields = $('#permissionsForm').serializeArray();
    $.each(fields, function (i, field) {
      if (typeof perParams[field.name] != 'undefined') {
        if (jQuery.type(perParams[field.name]) != 'array') {
          var old = perParams[field.name];
          perParams[field.name] = [old];
        }
        perParams[field.name].push(field.value);
      } else {
        perParams[field.name] = field.value;
      }
    });

    let obj = {};

    if (perParams['scopeName']) {

      if (typeof perParams['scopeName'] !== 'object') {
        perParams['scopeName'] = [perParams['scopeName']];
      }
      perParams['scopeName'].forEach((element: any) => {
        obj[element] = element;
      });
    }
    //obj['cloud.rbac.csc.netops.operations'] = 'cloud.rbac.csc.netops.operations';
    let data;
    if (this.rolesAddForm == 'supportCloud' || this.rolesAddForm == 'marketingCloud' || this.rolesAddForm == 'cco') {
      data = this.commonOrgService.getSelectedSubScopeNames(this.allPrmsnfrmApi, obj, true);
    } else {
      data = this.commonOrgService.getSelectedSubScopeNames(this.allPrmsnfrmApi, obj);
    }

    data.scopes.forEach((element: any) => {
      //if(element == 'JAXiE9gO6odL') {
      let html = data.selectedData[element] ? `(${data.selectedData[element]})` : '';
      $("#" + element + "_info").html(html);
      const noWriteApi = document.getElementById((`${element}_action`))?.getAttribute("noWriteApi") == "true";
      $("#" + element + "_parent").prop("checked", data.checkedScopes[element]);
      $("#" + element + "_action").prop("disabled", noWriteApi ? true : !data.checkedScopes[element]);

      if (!data.checkedScopes[element] && this.scopeWriteAccess) {
        $("#" + element + "_action").prop("checked", data.checkedScopes[element]);
      }
      if (data.selectedData[element] === ' ') $("#" + element + "_info").html('');
      if (data.selectedData[element] && !data.checkedScopes[element]) {

        $("#" + element + "_parent_span").show();

        if (data.scopeNames[element]) {

          let arr = data.scopeNames[element].split('.');
          if (arr.length > 3) {
            $("#" + element + "_parent").hide();
          }

        }
      } else {
        $("#" + element + "_parent_span").hide();
      }

      if (data.checkedScopes[element]) {
        $("#" + element + "_parent").show();
        $("#" + element + "_parent_span").hide();
      }

      //}
    });

  }

  showAllUserCheckBox(event): any {

    $('#' + event.target.id).hide();
    $('#user-all-delete').prop("checked", true);
    this.deleteUserCheckAll(true);
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

  closeModal(): void {
    this.closeAlertWarning();
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

  tablePageChange() {
    setTimeout(() => {
      $('#user-all-delete-span').hide();
      $('#user-all-delete').prop("checked", false);
      this.deleteUserCheckAll(false);
    }, 100);
  }

  expandCollapse(id) {   
    this.isExpanded.hasOwnProperty(id) ? delete this.isExpanded[id] : this.isExpanded[id] = true;
  }

  renderChild(scope: any, isChecked: any) {
    const collapseBtn = document.querySelector(`a[id^="collapse-btn-${scope.displayName}"]`) as HTMLAnchorElement;
    if (isChecked && collapseBtn && collapseBtn.getAttribute('aria-expanded') === "false") {
      collapseBtn.click();
    } else if (!isChecked && collapseBtn && collapseBtn.getAttribute('aria-expanded') === "true") {
      collapseBtn.click();
    }
    if (isChecked && !this.isExpanded.hasOwnProperty(scope._id)) {
      this.expandCollapse(scope._id);
    } else if (!isChecked && this.isExpanded.hasOwnProperty(scope._id)) {
      this.expandCollapse(scope._id);
    }
  }
}
