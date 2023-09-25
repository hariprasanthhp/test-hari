import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
import { Router } from '@angular/router';
import { OrganizationsService } from '../services/organizations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, combineLatest, Subject, concat, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
// import { AuthService } from '../../shared/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

declare var require;
const $: any = require('jquery');
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;
  languages = [
    { name: "English" },
    { name: "French Canadian" }
  ]
  languageLocalStorage: any;

  dataAvailable: any;
  editOnValue: any;
  appsTableData: any = [];
  definitionData: any;
  userTableOptions: DataTables.Settings = {};
  entitlementAvailable: boolean = false;
  orgData: any;
  roles: any = [];
  usersList: any = []; // All users
  selectedUsers: any; // selected in dropdown but still not added
  addedUsersList: any = []; // Added users list

  entitlements: any;
  orgEntitlements: any;
  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    searching: false,
    ordering: false,
    lengthChange: false,
    language: {
      emptyTable: "No users available in table"
    },
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };

  dtOptions: DataTables.Settings = {
    lengthChange: false,
    searching: false,
    ordering: false,
    paging: false,
    dom: 't',
  };

  existingUserError: boolean;

  orgAdminRoleId: string | number;
  loader: boolean = true;
  newDate: Date;

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  warning: boolean;
  warningInfo: string = '';

  modalTitle: string;
  modalInfo: string;
  deleteItem: any;

  ORG_ID: string;

  endDates = {
    '118_endDate': '',
    '119_endDate': '',
    '120_endDate': '',
    '122_endDate': '',
    '131_endDate': '',
    '200_endDate': '',
    '201_endDate': '',
    '202_endDate': '',
    '203_endDate': '',
    '204_endDate': '',
    '205_endDate': '',

  };

  orgName: string;
  usersCount: number | string = 0;
  showSubmitButtons: boolean = false;
  orgRoleAvail: boolean = true;
  usersAvail: boolean;
  usersAvailInterval: any;

  frTable: any;
  translateSubscribe: any;
  newEntitlesUpdate: any[];
  changedEntitlesUpdate: any[];
  modalRef: any;
  sysAdminRoute: string = 'systemAdministration';
  model = {
    year: parseInt("2020"),
    month: parseInt("10"),
    day: parseInt("1")
  };
  yRange: string;
  statusList = [];
  entStatus: any = [];


  constructor(
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private api: OrganizationsService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);

    this.commonOrgService.currentPageAdder('orgDetail')
    this.orgData = JSON.parse(sessionStorage.getItem('calixAdminOrgDetail'));

    if (this.orgData) {
      this.orgName = this.orgData.name ? this.orgData.name : 'Calix';
    }

    this.getData();
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;

    let MODULE = this.sso.getRedirectModule(url);
  }

  ngOnInit() {
    let url = this.router.url;
    let MODULE = this.sso.getRedirectModule(url);
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.loader = true;
      this.dataAvailable = false;
      this.isRerender = true;
      this.renderUsersTable('language');
      this.titleService.setTitle(`${this.language['Organization detail']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    })
    this.titleService.setTitle(`${this.language['Organization detail']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.frTable = this.customTranslateService.fr;
    this.tableLanguageOptions();
    this.closeAlert();
    this.setYearRange();
    this.statusList = [
      //{ label: '', value: '' },
      { label: this.language['Active'], value: 'active' },
      { label: this.language['About to Expire'], value: "about_to_expire" },
      { label: this.language['In Grace Period'], value: "in_grace_period" },
      { label: this.language['Expired'], value: "expired" }
    ];
  }

  ngAfterViewInit() {
    //this.dtTrigger.next();
  }

  ngOnDestroy(): void {

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.usersAvailInterval) {
      clearInterval(this.usersAvailInterval);
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
  }

  getData() {
    //this.getOrgEntitlements();
    const requestEndpoints = [
      `${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/cloud/all`,
      `${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/${this.ORG_ID}`,
      `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/roles`,
      `${environment.CALIX_ADMIN_BASE_URL}org/${this.ORG_ID}/users/_count`,
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.api.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });

    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      this.entitlements = response[0];
      this.orgEntitlements = response[1];

      this.roles = response[2];
      this.usersCount = response[3];


      if (response.length) {
        for (let e of response) {
          if (e != null && e.error != undefined) {
            this.loader = false;
            this.pageErrorHandle(e);
            this.commonOrgService.pageScrollTop();

            this.addedUsersList = [];
            this.renderUsersTable();
            this.entitlementAvailable = true;
            return;
          }
        }
      }

      if (this.roles.length) {
        this.getOrgAdminUsers();
      } else {
        this.addedUsersList = [];
        this.renderUsersTable();
      }


      if (this.orgEntitlements) {
        this.combineData();
      }
      this.getOrgUsersList();

    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loader = false;
    })
  }

  getOrgUsersList() {
    this.api.UsersListByOrgId(this.ORG_ID, this.usersCount).subscribe((res: any) => {
      this.usersList = res ? res : [];
      this.usersAvail = true;
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    })
  }

  getOrgAdminUsers() {

    var orgRole = this.roles.filter(obj => {
      return obj.name === 'OrgAdmin'
    })

    if (orgRole && orgRole.length) {
      this.orgAdminRoleId = orgRole[0]._id;
      this.roleData();
      this.orgRoleAvail = true;
    } else {
      this.orgRoleAvail = false;
      this.addedUsersList = [];
      this.renderUsersTable();
      this.errorInfo = this.language['Role (null) not found'];
      this.error = true;
      this.commonOrgService.pageScrollTop();
    }

  }

  roleData() {
    this.api.RoleData(this.orgAdminRoleId).subscribe((res: any) => {
      this.addedUsersList = res.users ? this.addId(res.users) : [];
      this.renderUsersTable();
      setTimeout(() => {
        this.checkSelected();
      }, 500);

    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();

      this.addedUsersList = [];
      this.renderUsersTable();
    });
  }

  addId(users: any) {
    users.forEach(e => {
      e['_id'] = e.userId;
    });
    return users;
  }


  addUser() {
    this.warning = false;
    let selUsers = this.selectedUsers;
    let added = [];
    let index;
    selUsers.forEach(sel => {
      if (this.addedUsersList.filter(e => e._id === sel._id).length > 0) {
        this.warningInfo = `${sel.username} - User already added`;
        this.warning = true;
        return;
      }

      index = this.usersList.findIndex(e => e._id === sel._id);
      this.usersList[index]['disabled'] = true;
      this.usersList = [...this.usersList];

      added.push(sel);
    });

    if (this.warning) {
      return
    }

    this.addedUsersList = [...this.addedUsersList, ...added];
    this.selectedUsers = [];
    //this.redraw();
    this.isRerender = true;
    this.renderUsersTable();
    this.showButtons();
  }

  deleteUser(item: any) {
    this.deleteItem = item;
    this.modalTitle = this.language['Delete Administrator'];
    this.modalInfo = `${item.username}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDeleteSecleted() {
    this.closeModal();

    let item = this.deleteItem;
    let temp = [];
    let index;
    this.addedUsersList.forEach(element => {
      if (element._id !== item._id) {
        temp.push(element);
      }
    });

    index = this.usersList.findIndex(e => e._id === item._id);
    if (index !== -1) {
      this.usersList[index]['disabled'] = false;
    }
    this.usersList = [...this.usersList];

    this.addedUsersList = temp;
    this.isRerender = true;
    this.renderUsersTable();
    this.deleteItem = undefined;
    this.showButtons();
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
        this.loader = false;
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
      pageLength: 10,
      processing: true,
      searching: false,
      ordering: false,
      lengthChange: false,
      language: {
        emptyTable: "No users available in table"
      },
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
      // paging: false
    };
    this.tableLanguageOptions();
    this.dataAvailable = true;
    setTimeout(() => {
      this.hideSearch();
    }, 500);

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  languageChange(language) {
    sessionStorage.setItem('defaultLanguage', language)
    this.customTranslateService.changeLanguage(language);
  }

  someClickHandler(info: any): void {
    //this.message = info.id + ' - ' + info.firstName;
  }

  addOrg() {
    this.router.navigate([`${this.sysAdminRoute}/addOrg`]);
  }

  goToOrgList() {
    this.router.navigate([`${this.sysAdminRoute}/organizations`]);
  }

  goToUserList() {
    this.router.navigate([`${this.sysAdminRoute}/blacklist`]);
  }


  selectedEntitlements: any;
  processData(res: any): any {

    let data = res;

    let cscObj = {};
    for (let i = 0; i < data.length; i++) {
      cscObj[data[i].appType] = data[i].overrideEndDate;
    }

    this.selectedEntitlements = cscObj;
  }

  combineData() {

    let orgEntitle = {};
    let allEntitle = [];
    let temp = {};
    let check = false;
    let date = new Date();
    let currentDate = date.getTime();

    for (let i = 0; i < this.orgEntitlements.length; i++) {
      orgEntitle[this.orgEntitlements[i].appType] = this.orgEntitlements[i];
    }

    let appType;
    let greenColor: boolean = false;
    for (let i = 0; i < this.entitlements.length; i++) {
      greenColor = false;
      appType = this.entitlements[i].appType;
      let overrideEndDate_obj_date;
      if (orgEntitle[appType]) {
        //check = this.checkDate(orgEntitle[appType].overrideEndDate);
        overrideEndDate_obj_date = orgEntitle[appType].overrideEndDate ? new Date(orgEntitle[appType].overrideEndDate) : undefined;

        check = this.checkEnttlmnt(orgEntitle[appType]);
        let overriddenDateTime: any = orgEntitle[appType].overrideEndDate ? new Date(`${orgEntitle[appType].overrideEndDate} 23:59:59`) : new Date();
        overriddenDateTime = overriddenDateTime.getTime();
        if (overriddenDateTime && overriddenDateTime >= currentDate) {
          greenColor = true;

        }

        allEntitle.push({
          ...orgEntitle[appType], ...{
            checked: check, override: `${appType}_endDate`, greenColor: greenColor, overrideEndDate_obj_date: overrideEndDate_obj_date, overrideEndDate_obj: {
              day: 1,
              month: 11,
              year: 2020
            }
          }
        });
        temp[appType] = {
          ...orgEntitle[appType], ...{
            checked: check, override: `${appType}_endDate`, greenColor: greenColor, overrideEndDate_obj_date: overrideEndDate_obj_date, overrideEndDate_obj: {
              day: 1,
              month: 11,
              year: 2020
            }
          }
        };

        this.endDates[`${appType}_endDate`] = orgEntitle[appType].overrideEndDate;//new Date(orgEntitle[appType].overrideEndDate);
      } else {
        allEntitle.push({
          ...this.entitlements[i], ...{
            overrideEndDate: null, checked: false, override: `${appType}_endDate`, overrideEndDate_obj_date: undefined, overrideEndDate_obj: {
              day: 1,
              month: 11,
              year: 2020
            }
          }
        });
      }
    }
    this.selectedEntitlements = temp;

    this.entitlements = allEntitle;
    this.entitlements = this.sortByTimestamp(this.entitlements, 'timestamp', 'desc');
    this.entStatus = this.entitlements.map(obj => (obj.status || '').toLowerCase());
    setTimeout(() => {
      this.entStatus.forEach((elem, i) => {
        if (!elem) $(`#status-list${i} input`).attr('placeholder', this.language['Select']);
      })
    }, 100);
    this.entitlementAvailable = true;
    this.loader = false;

  }

  checkEnttlmnt(data: any) {

    let date = new Date();
    let currentDate = date.getTime();
    let endDate: any = '';
    let overriddenDate: any = '';

    endDate = data.endDate ? new Date(data.endDate) : "";
    overriddenDate = data.overrideEndDate ? new Date(`${data.overrideEndDate} 23:59:59`) : "";

    if (data.entitlement && ((!endDate && !overriddenDate && !data.endDate) || ((endDate && endDate > currentDate) || (overriddenDate && overriddenDate > currentDate)))) {
      return true;
    }

    return false;
  }

  objIndex: any;
  setOverrideDate(event: any, data: any, appType: any, ovrRdeDate: any) {

    if (!ovrRdeDate) {
      this.clearOverrideEndDate(event, data, appType, ovrRdeDate);
      return
    }

    let entitlements = this.entitlements;
    let obj = entitlements.find((obj: any, index: any) => {
      this.objIndex = index;
      return obj.appType == appType;
    });



    let date = new Date();
    let currentDate = date.getTime();
    let endDate: any = '';
    //let overriddenDate: any = event;
    let overriddenDate: any = `${ovrRdeDate} 23:59:59`;
    let overriddenDateTime: any;
    endDate = data.endDate ? new Date(data.endDate).getTime() : "";
    overriddenDateTime = new Date(overriddenDate);
    overriddenDateTime = overriddenDateTime.getTime();

    if (data.entitlement && ((!endDate && !overriddenDate && !data.endDate) || ((endDate && endDate > currentDate) || (overriddenDateTime && overriddenDateTime > currentDate)))) {
      obj.overrideEndDate = this.formatDate(overriddenDate);
      obj.checked = true;

      if (overriddenDateTime && overriddenDateTime > currentDate) {
        obj.greenColor = true;
      } else {
        obj.greenColor = false;
      }

    } else if (((!endDate && !overriddenDate && !data.endDate) || ((endDate && endDate > currentDate) || (overriddenDateTime && overriddenDateTime > currentDate)))) {
      obj.overrideEndDate = this.formatDate(overriddenDate);
      obj.checked = true;
      if (overriddenDateTime && overriddenDateTime > currentDate) {
        obj.greenColor = true;
      } else {
        obj.greenColor = false;
      }
    } else {
      obj.overrideEndDate = this.formatDate(overriddenDate);
      obj.checked = false;
      obj.greenColor = false;
    }

    this.endDates[appType + '_endDate'] = ovrRdeDate;
    this.entitlements[this.objIndex] = obj;
    this.showButtons();

  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  checkDate(dat) {
    let oDate
    if (typeof dat == 'object') {
      oDate = new Date(dat);
    } else {
      oDate = new Date(dat + ' 23:59:59');
    }

    let today = new Date();
    if (today < oDate) {
      return true;
    } else {
      return false;
    }
  }

  combineLatestEnt: any;

  save() {
    if (!this.orgRoleAvail) {
      this.errorInfo = this.language['Role (null) not found'];
      this.error = true;
      this.commonOrgService.pageScrollTop();
      return;
    }
    this.updateAdmins();
  }

  updateAdmins() {
    this.loader = true;
    let params = [];
    this.addedUsersList.forEach(element => {
      params.push(element._id);
    });
    this.api.AddAdmin(params, this.orgAdminRoleId).subscribe((res: any) => {


      //To fix CCL-40950
      /* Reenabling below function for CCL-41086 */
      this.saveEntitlements();

      //this.loader = false;
      this.successMessage();
    },
      (err: HttpErrorResponse) => {
        this.loader = false;
        this.pageErrorHandle(err);
        this.commonOrgService.pageScrollTop();
      }, () => {
        this.loader = false;
      })
  }
  saveEntitlements(): any {
    var perParams = {};
    let statusMatch = {
      "": null,
      active: 'Active',
      about_to_expire: 'About_to_Expire',
      in_grace_period: 'In_Grace_Period',
      expired: 'Expired',
    };
    var fields = $('#entitlementsForm').serializeArray();

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

    let appTypes = perParams['appType'];
    let selectedEntlmnts = perParams['entitlement'] ? perParams['entitlement'] : [];
    let data = [];

    //to overcome p-calendar issue
    let tempPerParams = {};
    tempPerParams['appType'] = perParams['appType'];
    tempPerParams['entitlement'] = perParams['entitlement'] ? perParams['entitlement'] : [];
    tempPerParams['name'] = perParams['name'] ? perParams['name'] : [];
    /* Changes for CCL-41086 */
    tempPerParams['overrideEndDate'] = perParams['overrideEndDate'] ? perParams['overrideEndDate'] : [];
    tempPerParams['status'] = [];
    let pLen = appTypes.length;
    for (let e = 0; e < pLen; e++) {
      /* Changes for CCL-41086 */
      /* let type = `overrideEndDate${appTypes[e]}`;
      tempPerParams['overrideEndDate'].push(perParams[type]); */
      //tempPerParams['status'].push(statusMatch[$(`#status-list${e}`).attr('ng-reflect-model')] || '');
      tempPerParams['status'].push(statusMatch[this.entStatus[e]]);
    }

    perParams = tempPerParams;

    let newEntitles = [];
    let changedEntitles = [];

    for (let i = 0; i < perParams['appType'].length; i++) {
      let obj = {
        "createTime": null,
        "updateTime": null,
        "id": null,
        "appType": 999,
        "name": "Service Cloud",
        "entitlement": 100,
        "disabledFlag": false,
        "startDate": null,
        "endDate": null,
        "overrideEndDate": "2021-06-30",
        "contractNumber": null,
        "productFamily": null,
        "partCategory": null,
        "partNumber": null,
        "partDescription": null,
        "qty": null,
        "customer": null,
        "organizationId": this.ORG_ID,
        //"graceDays": null,
        //"bannerDays": null,

        "status": null,
        "serviceName": null,
        "serviceEdition": null
      };

      let index = selectedEntlmnts.indexOf(perParams['appType'][i]);


      if (selectedEntlmnts && index !== -1) {
        if (this.selectedEntitlements[perParams['appType'][i]] != undefined) {
          obj['appType'] = perParams['appType'][i];
          obj['name'] = perParams['name'][i];
          obj['overrideEndDate'] = perParams['overrideEndDate'][i];
          obj['disabledFlag'] = false;
          obj['id'] = this.selectedEntitlements[perParams['appType'][i]].id;
          obj['startDate'] = this.selectedEntitlements[perParams['appType'][i]].startDate;
          obj['endDate'] = this.selectedEntitlements[perParams['appType'][i]].endDate;
          obj['createTime'] = this.selectedEntitlements[perParams['appType'][i]].createTime;
          obj['updateTime'] = this.selectedEntitlements[perParams['appType'][i]].updateTime;

          obj['contractNumber'] = this.selectedEntitlements[perParams['appType'][i]].contractNumber;
          obj['productFamily'] = this.selectedEntitlements[perParams['appType'][i]].productFamily;
          obj['partCategory'] = this.selectedEntitlements[perParams['appType'][i]].partCategory;
          obj['partDescription'] = this.selectedEntitlements[perParams['appType'][i]].partDescription;
          obj['qty'] = this.selectedEntitlements[perParams['appType'][i]].qty;
          obj['customer'] = this.selectedEntitlements[perParams['appType'][i]].customer;

          // obj['graceDays'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.graceDays != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.graceDays : null;
          // obj['bannerDays'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.bannerDays != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.bannerDays : null;

          /* Changes for CCL-41086 */
          obj['status'] = perParams['status'][i] || null;    //typeof this.selectedEntitlements[perParams['appType'][i]]?.status != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.status : null;
          obj['serviceName'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.serviceName != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.serviceName : null;
          obj['serviceEdition'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.serviceEdition != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.serviceEdition : null;


          changedEntitles.push(obj);
          data.push(obj);
        } else {
          obj['appType'] = perParams['appType'][i];
          obj['name'] = perParams['name'][i];
          obj['overrideEndDate'] = perParams['overrideEndDate'][i];
          /* Changes for CCL-41086 */
          obj['status'] = perParams['status'][i] || null;
          obj['disabledFlag'] = false;

          newEntitles.push(obj);
          data.push(obj);
        }

      } else {
        //Newly added 4/12/2020 start
        if (this.selectedEntitlements[perParams['appType'][i]] != undefined) {
          obj['appType'] = perParams['appType'][i];
          obj['name'] = perParams['name'][i];
          obj['overrideEndDate'] = perParams['overrideEndDate'][i];
          obj['disabledFlag'] = false;
          obj['id'] = this.selectedEntitlements[perParams['appType'][i]].id;
          obj['startDate'] = this.selectedEntitlements[perParams['appType'][i]].startDate;
          obj['endDate'] = this.selectedEntitlements[perParams['appType'][i]].endDate;
          obj['createTime'] = this.selectedEntitlements[perParams['appType'][i]].createTime;
          obj['updateTime'] = this.selectedEntitlements[perParams['appType'][i]].updateTime;

          obj['contractNumber'] = this.selectedEntitlements[perParams['appType'][i]].contractNumber;
          obj['productFamily'] = this.selectedEntitlements[perParams['appType'][i]].productFamily;
          obj['partCategory'] = this.selectedEntitlements[perParams['appType'][i]].partCategory;
          obj['partDescription'] = this.selectedEntitlements[perParams['appType'][i]].partDescription;
          obj['qty'] = this.selectedEntitlements[perParams['appType'][i]].qty;
          obj['customer'] = this.selectedEntitlements[perParams['appType'][i]].customer;

          // obj['graceDays'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.graceDays != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.graceDays : null;
          // obj['bannerDays'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.bannerDays != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.bannerDays : null;

          /* Changes for CCL-41086 */
          obj['status'] = perParams['status'][i] || null;     //typeof this.selectedEntitlements[perParams['appType'][i]]?.status != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.status : null;
          obj['serviceName'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.serviceName != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.serviceName : null;
          obj['serviceEdition'] = typeof this.selectedEntitlements[perParams['appType'][i]]?.serviceEdition != 'undefined' ? this.selectedEntitlements[perParams['appType'][i]]?.serviceEdition : null;


          changedEntitles.push(obj);
          data.push(obj);
        } else {
          if (perParams['status'][i]) {    //(perParams['overrideEndDate'][i] != '')
            obj['appType'] = perParams['appType'][i];
            obj['name'] = perParams['name'][i];
            obj['overrideEndDate'] = perParams['overrideEndDate'][i];
            /* Changes for CCL-41086 */
            obj['status'] = perParams['status'][i] || null;
            obj['disabledFlag'] = false;
            newEntitles.push(obj);
            data.push(obj);
          }
        }
        //Newly added 4/12/2020 end
      }
    }


    if (!newEntitles.length && !changedEntitles.length) {
      this.loader = false;
      this.successMessage();
      return;
    }

    this.newEntitlesUpdate = newEntitles;
    this.changedEntitlesUpdate = changedEntitles;

    this.updateEnt();
  }

  updateEnt(): void {
    this.loader = true;
    const calls: Observable<any>[] = [];
    const newCallsForExpiredStatus: Observable<any>[] = []
    const updateCallsForExpiredStatus: Observable<any>[] = []
    let addUrl = `${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/`;
    this.newEntitlesUpdate.forEach(ent => {
      if (ent.status === "Expired") {
        newCallsForExpiredStatus.push(this.api.addEntitlements(addUrl, ent))
      } else {
        calls.push(this.api.addEntitlements(addUrl, ent));
      }
    });


    this.changedEntitlesUpdate.forEach(ent => {
      let flag = false;
      this.orgEntitlements.forEach(orgEnt => {
        if (Number(ent.appType) === orgEnt.appType && ent.status === orgEnt.status) {
          flag = true;
        }
      })
      if (!flag) {
        let url = `${environment.CALIX_ADMIN_ORG_BASE_URL}entitlements/${ent.id}`;
        if (ent.status === "Expired") {
          updateCallsForExpiredStatus.push(this.api.changeEntitlements(url, ent))
        } else {
          calls.push(this.api.changeEntitlements(url, ent));
        }
      }
    });

    const lenForCalls = calls.length;
    let i = 0;

    concat(
      ...newCallsForExpiredStatus,
      ...updateCallsForExpiredStatus,
      ...calls
      //).pipe(
      //  toArray()
    ).subscribe((response: any) => {
      i++;
      if (lenForCalls == i && newCallsForExpiredStatus.length == i && updateCallsForExpiredStatus.length == i) {
        this.successMessage();
      }
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    });

  }

  cancel() {
    this.goToOrgList();
  }


  changeDate(item, appType, dt) {
    dt = dt.toString();
    let check = this.checkDateObject(dt);
    if (check) {
      $(`#${appType}_entitled`).prop('checked', true);
    } else {
      $(`#${appType}_entitled`).prop('checked', false);
    }
  }

  checkDateObject(dat) {
    let oDate
    oDate = new Date(dat);
    let today = new Date();
    if (today < oDate) {
      return true;
    } else {
      return false;
    }
  }

  dateF(str) {
    return new Date(str);
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }
  closeAlertWarning() {
    this.warning = false;
  }

  hideSearch() {
    setTimeout(() => {
      $('#table-div .dataTables_wrapper .dataTables_filter').css('display', 'none');
      $('#table-div .dataTables_wrapper .dataTables_length').css('display', 'none');
    }, 100);
  }

  showButtons() {
    this.showSubmitButtons = true;
  }

  successMessage() {
    this.closeAlert();
    this.successInfo = this.language['Organization updated successfully'];
    this.success = true;
    this.commonOrgService.pageScrollTop();
    setTimeout(() => {
      this.loader = false;
      this.closeAlert();
      this.goToOrgList();
    }, 1500);
  }

  checkSelected() {
    if (!this.usersAvail) {
      this.usersAvailInterval = setInterval(() => {
        if (this.usersAvail) {
          this.checkSelected();
          clearInterval(this.usersAvailInterval);
        }
      }, 500);
      return;
    }

    this.usersList.forEach(users => {
      let avail: any = [];
      avail = this.addedUsersList.filter((added) => users._id === added.userId);
      if (avail.length) {
        users['disabled'] = true;
      }
    });
    this.usersList = [...this.usersList];
  }

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.tableOptions.language = this.frTable;
      this.tableOptions.language.emptyTable = "Aucune utilisateur disponible dans le tableau";
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.customTranslateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.customTranslateService.de_DE;
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
      this.tableOptions['language'] = {
        emptyTable: "No users available in table"
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
  }

  setYearRange() {
    this.yRange = '2000:2030';
    let currentYear = new Date().getFullYear();
    this.yRange = `${currentYear - 20}:${currentYear + 30}`;
  }

  sortByTimestamp(list, key, asc?) {
    let lesser = [], greater = [], zeros = [];
    let now = new Date().getTime();
    list.forEach(e => {
      e['timestamp'] = e.overrideEndDate ? new Date(e.overrideEndDate).getTime() : 0;
    });

    key = 'timestamp';
    asc = 'desc';
    list.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      if (asc && asc == 'asc') {
        return x[key] - y[key];
      }

      if (asc && asc == 'desc') {
        return y[key] - x[key];
      }

    });

    list.forEach(e => {
      if (e.timestamp && e.timestamp < now) {
        lesser.push(e);
      } else if (e.timestamp && e.timestamp > now) {
        greater.push(e);
      } else if (!e.timestamp || e.timestamp == now) {
        zeros.push(e);
      }
    });

    return [...lesser, ...greater, ...zeros];
  }

  clearOverrideEndDate(event: any, data: any, appType: any, ovrRdeDate: any) {
    let entitlements = this.entitlements;
    let hasDate = false;
    let obj = entitlements.find((obj: any, index: any) => {
      this.objIndex = index;
      return obj.appType == appType;
    });
    if (obj.overrideEndDate) {
      hasDate = true;
    }

    let date = new Date();
    let currentDate = date.getTime();
    let endDate: any = '';
    //let overriddenDate: any = event;
    let overriddenDate: any = `${ovrRdeDate} 23:59:59`;
    let overriddenDateTime: any;
    endDate = data.endDate ? new Date(data.endDate).getTime() : "";
    overriddenDateTime = new Date(overriddenDate);
    overriddenDateTime = overriddenDateTime.getTime();

    // if (data.entitlement && endDate && endDate > currentDate) {
    //   obj.overrideEndDate = null;
    //   obj.checked = true;
    //   obj.greenColor = false;

    // } else {
    //   obj.overrideEndDate = null;
    //   obj.checked = false;
    //   obj.greenColor = false;
    // }

    obj.overrideEndDate = null;
    obj.checked = false;
    obj.greenColor = false;

    this.endDates[appType + '_endDate'] = "";
    this.entitlements[this.objIndex] = obj;
    if (hasDate) {
      this.showButtons();
    }

  }

  preventClick(e) {
    e.preventDefault();
  }

  removePlaceholder(i) {
    $(`#status-list${i} input`).attr('placeholder', '');
  }


}
