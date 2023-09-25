import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { DataTableDirective } from 'angular-datatables';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { CommonFunctionsService } from '../../flow-config/services/common-functions.service';
import { UsersDetailService } from '../services/users-detail.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, combineLatest, Subject, forkJoin } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
// import { AuthService } from '../../shared/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { AddRoleService } from '../services/add-role.service';

@Component({
  selector: 'app-federated-user-detials',
  templateUrl: './federated-user-detials.component.html',
  styleUrls: ['./federated-user-detials.component.scss']
})
export class FederatedUserDetialsComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;

  createSubnetName: string;
  createView: boolean;
  createCurrentSubnet: any;
  createSubnets: any = [];
  dataAvailable: boolean;
  editOnValue: any;
  tableOptions: DataTables.Settings = {
    rowId: '_id',
    pageLength: 10,
    processing: true,
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    //dom: 't',
    // order: [0, 'asc'],
    // columnDefs: [
    //   { targets: [1], orderable: false },
    // ],
    language: {
      emptyTable: "No role available for current user.",
    },
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        self.displaySelectedRolePerms(data['_id']);
      });
      return row;
    },
    drawCallback: (settings) => {
      $('.user-details-row.odd').css('background-color', '#FFF');
      $('.user-details-row.even').css('background-color', '#FFF');
      this.highlightRowCallback();
    }
  };

  roles: any = [];
  rolesSelected: any = [];
  rolesTableData: any = [];
  rolesTableOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  user: any;

  rolesList: any = []; // All roles
  selectedRoles: any; // selected in dropdown but still not added
  addedRolesList: any = []; // Added users list
  existingRoleError: boolean;
  existingRoleErrorInfo: string;
  countOfRolesAtStart: number = 0;

  editUserPassword: string;
  editUserCPassword: string;
  passwordError: boolean;
  cpasswordError: boolean;

  rolePermissions: any = [];

  usersSubnets: any = [];

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  isLocalUser: boolean = false;
  userTitle: string = '';

  deleteData: any;
  modalTitle: string;
  modalInfo: string;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  landing: any;
  landingSelected: any;

  ORG_ID: string;
  MODULE: string = 'calixAdmin';

  saveCancelShow: boolean = false;
  isPasswordChanged: boolean = false;
  isSubnetChanged: boolean = false;
  isRoleChanged: boolean = false;
  oldRolesList: any = [];

  combineLatestUpdate: any;
  rolesAvail: boolean;
  rolesAvailInterval: any;
  frTable: any;
  translateSubscribe: any;
  modalRef: any;
  loading: boolean = true;
  passSubs: any;
  parallelReqSubscribtionUpdate: any;
  addedRolesName: any = [];
  addedRolesNameAtStart: any = [];
  selectedRoleId: any;
  scopeDisplayName = { 'WiFi': 'WiFi', 'XDSL': 'XDSL', 'Devices': 'Devices', "Subscriber Mgmt": "Subscriber Mgmt" } /* CCL-37865 */
  permissionAvailable: boolean = false;
  permissionAvailableDeploy: boolean = true;
  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private apiService: UsersDetailService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title,
    private http: HttpClient,
    private addRoleService: AddRoleService,
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`Users detail - ${this.MODULE === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.isRerender = true;
      this.renderRolesTable('language');
    });


    this.commonOrgService.currentPageAdder('usersDetail');
    this.user = JSON.parse(sessionStorage.getItem('calixAdminUserDetail') || "{}");
    this.frTable = this.customTranslateService.fr;
    this.isLocalUser = this.checkUserType(this.user);
    this.getData();
  }

  ngOnInit() {
    this.setUserInfo();
    // this.landing = ['cmc', 'csc', 'fa+', 'shad'];
    // this.landingSelected = 'cmc';
    this.saveCancelShow = false;
  }

  ngOnDestroy(): void {
    this.userRolesUpdateSub?.unsubscribe();
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.parallelReqSubscribtionUpdate) {
      this.parallelReqSubscribtionUpdate.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.passSubs) {
      this.passSubs.unsubscribe();
    }
    if (localStorage.getItem('calix.federated_grantee_orgId')) {
      localStorage.removeItem('calix.federated_grantee_orgId')
    }
  }

  getData() {
    //this.getOrgEntitlements();
    const requestEndpoints = [

      `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/roles`,
      //`${environment.CALIX_ADMIN_BASE_URL}user/${this.user?._id}/roles`,
      `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${localStorage.getItem('calix.federated_grantee_orgId')}/users/${this.user._id}/roles`
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.apiService.callRestApi(endpoint).pipe(map((resp: any) => {
        return resp;
      }), catchError((error: any) => {
        return of(error);
      }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  existingRoles = [];
  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.rolesList = response[0];
      let userRoles = response[1] ? response[1] : [];
      this.oldRolesList = userRoles;
      this.addedRolesList = userRoles;
      let existingRoles = [];
      userRoles?.forEach(element => {
        existingRoles.push(element._id);
      });
      this.existingRoles = existingRoles;

      // this.oldRolesList = response[1] ? response[1] : [];
      // this.addedRolesList = response[1] ? response[1] : [];

      this.countOfRolesAtStart = this.addedRolesList ? this.addedRolesList.length : 0;
      this.addedRolesName = this.addedRolesList ? this.getRoleNames(this.addedRolesList) : [];
      this.addedRolesNameAtStart = this.addedRolesList ? this.getRoleNames(this.addedRolesList) : [];

      if (response[0] != null && response[0].error != undefined) {
        this.loading = false;
        if ((response[0].status != 404)) {
          this.pageErrorHandle(response[0]);
          this.commonOrgService.pageScrollTop();
          return;
        }

      } else if (response[1] != null && response[1].error != undefined) {
        this.loading = false;
        if ((response[1].status != 404)) {
          this.pageErrorHandle(response[1]);
          this.commonOrgService.pageScrollTop();
          return;
        }


      }


      setTimeout(() => {
        this.renderRolesTable();
        if (this.addedRolesList.length) {
          this.permissionProcess(this.addedRolesList[0]);
          this.highlightRow(this.addedRolesList[0]._id);
        }

        this.countOfRolesAtStart = this.addedRolesList ? this.addedRolesList.length : 0;
        this.rolesAvail = true;
        this.checkSelected();
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }, 100);

    });
  }

  checkUserType(obj: any) {
    //if (obj.success == 'local') {
    if (obj && obj.idpType == 'local') {
      return true;
    }
    return false;
  }


  changePassword() {
    this.passwordError = false;
    if (this.editUserPassword == '') {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }

    if (this.editUserPassword == this.editUserCPassword) {
      this.passwordError = false;
      this.cpasswordError = false;
      this.isPasswordChanged = true;
    } else {
      this.cpasswordError = true;
    }

    this.checkShowButtons();
  }

  changeConfirmPassword() {
    if (this.editUserPassword == this.editUserCPassword) {
      this.cpasswordError = false;
      this.passwordError = false;
      this.isPasswordChanged = true;
    } else {
      this.cpasswordError = true;
    }

    this.checkShowButtons();
  }

  addRole() {
    this.existingRoleError = false;
    let selRoles = this.selectedRoles;
    let added = [];
    let index;

    let newRolesAdded = this.addedRolesList;
    selRoles.forEach(sel => {
      if (this.addedRolesList.filter(e => e._id === sel._id).length > 0) {
        this.existingRoleErrorInfo = `${sel.username} - ${this.language['Role already added']}`;
        this.existingRoleError = true;
        return;
      }

      index = this.rolesList.findIndex(e => e._id === sel._id);
      this.rolesList[index]['disabled'] = true;
      this.rolesList = [...this.rolesList];

      added.push(sel);
    });

    if (this.existingRoleError) {
      return
    }

    //this.addedRolesList = [...this.addedRolesList, ...added];

    this.selectedRoles = [];
    setTimeout(() => {
      let newAdded = [...this.addedRolesList, ...added];
      this.addedRolesList = newAdded;
      this.addedRolesName = this.getRoleNames(newAdded);
      let i = this.addedRolesList.length - 1;
      this.permissionProcess(this.addedRolesList[i]);
      this.highlightRow(this.addedRolesList[i]['_id']);

      this.isRerender = true;
      this.rerender();
      this.checkRoleChanged();

    }, 200);

  }


  deleteRole(item: any): void {
    this.deleteData = item;
    this.modalTitle = this.language['Delete Role'];
    this.modalInfo = `${item.name}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal);

  }


  confirmDeleteSecleted() {
    let item = this.deleteData;
    let index;
    this.addedRolesList = this.addedRolesList.filter(element => {
      return element._id !== item._id;
    });

    index = this.rolesList.findIndex(e => e._id === item._id);
    this.rolesList[index]['disabled'] = false;
    this.rolesList = [...this.rolesList];

    this.closeModal();
    this.deleteData = undefined;
    this.isRerender = true;
    this.rerender();
    if (this.addedRolesList.length == 0) {
      this.rolePermissions = [];
    } else {
      this.permissionProcess(this.addedRolesList[this.addedRolesList.length - 1]);
      this.highlightRow(this.addedRolesList[this.addedRolesList.length - 1]._id);

    }

    this.addedRolesName = this.getRoleNames(this.addedRolesList);
    this.checkRoleChanged();
  }




  renderRolesTable(type?: string) {
    this.setTableOptions();
    if (type && type == 'language') {
      setTimeout(() => {
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
      }, 150);
      this.dataAvailable = true;
    } else {

      setTimeout(() => {
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
        this.dataAvailable = true;
      }, 150);

    }

  }

  setTableOptions() {
    this.tableLanguageOptions();

  }

  changeDataForTable() {
    let datas = [];
    for (let obj of this.roles) {
      if (this.rolesSelected.includes(obj.value)) {
        datas.push(obj);
      }
    }

    return datas;

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  updateUsersDetails() {
    const requests = [];
    this.loading = true;
    //Roles Update
    if (this.addedRolesList.length) {
      let params = [];
      let roleIds: string;
      this.addedRolesList.forEach(element => {
        params.push(element._id);
      });

      roleIds = params.join(',');
      let url = `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${localStorage.getItem('calix.federated_grantee_orgId')}/users/${this.user._id}/role/${roleIds}`
      const req = this.apiService.updateRolesListByGranteeUserId(url).pipe(map((resp: any) => {
        return resp;
      }), catchError((error: any) => {
        return of(error);
      }));

      requests.push(req);
    } else {
      if (this.countOfRolesAtStart) {
        let url = `${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${localStorage.getItem('calix.federated_grantee_orgId')}/users/${this.user._id}/roles`
        const req = this.apiService.deleteRolesListByGranteeUserId(url).pipe(map((resp: any) => {
          return resp;
        }), catchError((error: any) => {
          return of(error);
        }));
        requests.push(req);
      }

    }

    this.combineLatestUpdate = combineLatest(requests);
    this.makeParallelUpdateRequests();


  }

  makeParallelUpdateRequests() {
    this.parallelReqSubscribtionUpdate = this.combineLatestUpdate.subscribe((response: any) => {
      this.loading = false;

      if (response.length) {
        for (let e of response) {
          if (e != null && e.error != undefined) {
            this.loading = false;
            this.pageErrorHandle(e);
            return;
          }
        }
      }

      this.successMessage();
    });
  }

  userRolesUpdateSub: any;
  updateUserRoles() {
    //this.existingRoles
    let newRoles = [];
    let deletedRoles = [];
    let latestRoles = [];
    this.addedRolesList?.forEach(element => {
      if (this.existingRoles.indexOf(element._id) === -1) {
        newRoles.push(element._id);
      }
      latestRoles.push(element._id);
    });

    this.existingRoles?.forEach((role) => {
      if (latestRoles.indexOf(role) === -1) {
        deletedRoles.push(role);
      }
    });

    console.log('newRoles', newRoles);
    console.log('deletedRoles', deletedRoles);
    const requests = {};
    newRoles?.forEach(role => {
      requests[role] = this.http.post(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${localStorage.getItem('calix.federated_grantee_orgId')}/users/${this.user._id}/role/${role}`, {}).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        })
      );
    });

    deletedRoles?.forEach(role => {
      requests[role] = this.http.delete(`${environment.API_BASE_URL}federated/${this.ORG_ID}/grantee/${localStorage.getItem('calix.federated_grantee_orgId')}/users/${this.user._id}/role/${role}`, {}).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        })
      );
    });

    if (Object.keys(requests)?.length) {
      this.userRolesUpdateSub?.unsubscribe();
      this.userRolesUpdateSub = forkJoin(requests).subscribe((json: any) => {
        console.log(json);
        let errors = [];
        if (json) {
          let keys = Object.keys(json);
          keys?.forEach((key: any) => {
            if (json[key]?.['api-error']) {
              errors.push(this.commonOrgService.pageErrorHandle(json[key]));
            }
          });

          if (errors?.length) {
            this.error = true;
            this.errorInfo = errors.join('<br/>');
            console.log(errors);
            return;
          }
        }
        this.successMessage();
      }, (err: any) => {
        console.log(err);
      });
    }

  }

  cancelUpdate() {
    this.gotoAccountMgmt();
  }

  gotoAccountMgmt(): void {
    this.router.navigate([`${this.MODULE}/account-management`]);
  }

  permissionProcess(roleData: any) {

    if (roleData != undefined) {
      if (roleData.apptype == '118' || roleData.apptype == '119' || roleData.apptype == '102') {
        this.rolePermissions = this.commonOrgService.permProcessForUserDetailV21(roleData);
        this.displayName(roleData.apptype);
        this.subParentName(roleData.apptype);
      }
      else if (roleData.apptype == '200'){

        this.rolePermissions = this.commonOrgService.permProcessForUserDetailDeployment(roleData);
        this.subParentNameDeployment(roleData.apptype);
      } 
      
      else {
        this.rolePermissions = this.commonOrgService.permProcessForUserDetail(roleData);
        this.displayName(roleData.apptype);
        this.subParentName(roleData.apptype);
      }

    } else {
      this.rolePermissions = [];
    }
  }

  displayName(type){
    let  apiResponse:any;
    let matchingobject: any = null;
    this.permissionAvailable = false;
    this.addRoleService.AllPemissionsData(type).subscribe((res: any) => {      
      apiResponse=res;
      this.rolePermissions.forEach((permissions,i) => {
           apiResponse.forEach(element => {
             if(permissions.scopeName === element.name){
                 matchingobject = element;
                 permissions.scopeDisplayName = matchingobject.displayName;          
        }
      });
      if(this.rolePermissions.length - 1 == i){
        this.permissionAvailable = true;
      }
     });
    });
  }

  subParentName(type) {
    this.permissionAvailable = false;
    let scopes = [];
    this.addRoleService.AllPemissionsData(type).subscribe((res: any) => {
    scopes = res;
    scopes.forEach(scope => {
 this.rolePermissions.forEach((element,i) => {
  const subPermission = element.permissions;
  subPermission.forEach(ele => {
    let subScopename = ele.scopeName;
  
        
        if (subScopename === scope.name) {
          const roleDetails = scope.displayName;
          ele.scopeDisplayName = roleDetails;
        }
      });
      if(this.rolePermissions.length - 1 == i){
        this.permissionAvailable = true;
      }  
    });
   
  });
});
  
}  
subParentNameDeployment(type) {
  this.permissionAvailable = false;
  this.permissionAvailableDeploy = false;
  this.rolePermissions.forEach((element,i) => {
    let matchingElement = element;
    const scope = element.scopeName.split('.');
    let scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2];
    this.addRoleService.AllPemissionsData(type).subscribe((res: any) => {
      res.forEach(element => {
        if (scopeBase == element.name) {
          matchingElement.scopeDisplayName = element.displayName;
        }
        if(this.rolePermissions.length - 1 == i){
          this.permissionAvailableDeploy = true;
          this.permissionAvailable = true;

        }
      });
      
    })
   
  });

}
  setUserInfo() {
    let userData = this.user;
    if (userData.firstName != null && userData.firstName !== '') {
      this.userTitle = (userData.lastName != null) ? `${userData.firstName} ${userData.lastName}` : `${userData.firstName}`;
    } else if (userData?.userName) {
      this.userTitle = `${userData.userName}`;
    } else {
      this.userTitle = `${userData._id}`;
    }

  }


  closeAlertRole() {
    this.existingRoleError = false;
  }


  closeAlert() {
    this.error = false;
    this.success = false;
  }

  checkRoleChanged() {
    this.isRoleChanged = false;
    if (this.addedRolesName.length !== this.addedRolesNameAtStart.length) {
      this.isRoleChanged = true;
      this.checkShowButtons();
    } else if (this.addedRolesName.length === this.addedRolesNameAtStart.length && this.addedRolesNameAtStart.length) {
      this.addedRolesName.forEach(el => {
        if (!this.addedRolesNameAtStart.includes(el)) {
          //check for newly added role
          this.isRoleChanged = true;
          this.checkShowButtons();
          return;
        }
      });
      this.checkShowButtons();
    } else if (this.addedRolesName.length === this.addedRolesNameAtStart.length && !this.addedRolesNameAtStart.length) {
      this.isRoleChanged = false;
      this.checkShowButtons();
    }
  }

  checkShowButtons() {
    if (this.isPasswordChanged || this.isRoleChanged || this.isSubnetChanged) {
      this.saveCancelShow = true;
    } else {
      this.saveCancelShow = false;
    }
  }

  hideSearch() {
    setTimeout(() => {
      $('#table-div .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#table-div .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 100);
  }

  displaySelectedRolePerms(roleId) {
    if (roleId) {
      let roleData = this.addedRolesList.filter(e => e._id === roleId);
      if (roleData.length) {
        this.selectedRoleId = roleData[0]._id;
        this.permissionProcess(roleData[0]);
        this.highlightRow(roleData[0]._id);
      }
    }
  }

  successMessage() {
    this.closeAlert();
    this.successInfo = this.language['User details saved successfully'];
    this.success = true;
    this.commonOrgService.pageScrollTop();
    this.loading = false;
    setTimeout(() => {
      this.gotoAccountMgmt();
    }, 1500);
  }

  highlightRow(id) {
    this.selectedRoleId = id;
    setTimeout(() => {
      $('.user-details-row.odd').css('background-color', '#FFF');
      $('.user-details-row.even').css('background-color', '#FFF');
      //$('.user-details-row:hover').css('background-color', 'whitesmoke');
      $('#' + id).css('background-color', 'whitesmoke');
    }, 100);
  }

  highlightRowCallback() {
    if (this.selectedRoleId) {
      let id = this.selectedRoleId;
      $('#' + id).css('background-color', 'whitesmoke');
    }
  }

  checkSelected() {
    // if (!this.rolesAvail) {
    //   this.rolesAvailInterval = setInterval(() => {
    //     if (this.rolesAvail) {
    //       this.checkSelected();
    //       clearInterval(this.rolesAvailInterval);
    //     }
    //   }, 500);
    //   return;
    // }

    this.rolesList.forEach(role => {
      let avail: any = [];
      avail = this.addedRolesList.filter((added) => role._id === added._id);
      if (avail.length) {
        role['disabled'] = true;
      }
    });
    this.rolesList = [...this.rolesList];
  }

  tableLanguageOptions() {

    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
      this.tableOptions.language.emptyTable = "Aucune rôle disponible pour l'utilisateur actuel.";
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.customTranslateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.customTranslateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
      this.tableOptions['language'] = {
        emptyTable: "No role available for current user."
      };
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

  updateAddedRolesName(roles, role?: string, del?: boolean) {
    if (del) {
      this.addedRolesName = this.addedRolesName.filter(e => e !== role);
    } else {
      let roleNames = [];
      roles.forEach(e => {
        roleNames.push(e.name);
      });
      this.addedRolesName = [...this.addedRolesName, ...roleNames];
    }

  }

  getRoleNames(roles) {
    let roleNames = [];
    roles.forEach(e => {
      roleNames.push(e.name);
    });
    return roleNames;
  }


}
