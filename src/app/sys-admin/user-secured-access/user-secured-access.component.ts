import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';
// import { OrganizationApiService } from '../services/organization-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrgSecureAccessService } from "../services/org-secure-access.service";
// import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var require: any;
const $: any = require('jquery');
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-secured-access',
  templateUrl: './user-secured-access.component.html',
  styleUrls: ['./user-secured-access.component.scss']
})
export class UserSecuredAccessComponent implements OnInit, OnDestroy {

  language: any;
  pageAvailable: boolean = false;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;

  criteria: any = [];
  dataAvailable: any;
  tableOptions: DataTables.Settings = {
    rowId: 'id',
    processing: true,
    lengthChange: false,
    searching: false,
    ordering: false,
    paging: false,
    dom: 't',
  };

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  securedUser: any;

  orgsList: any = []; // All roles
  selectedOrgs: any = []; // selected in dropdown but still not added
  addedOrgsList: any = []; // Added users list

  isAllOrgs: boolean = false;
  isReadOnly: boolean = true;
  hasEndTime: boolean = true;
  startDate: any;
  endDate: any;

  loader: boolean = true;


  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  modalTitle: string;
  modalInfo: string;

  deleteItem: any;
  ORG_ID: string;
  userTitle: string;

  showButtons: boolean = false;
  minimumDate: any;
  frTable: any;
  translateSubscribe: any;
  curLang: string;
  modalRef: any;
  sysAdminRoute: string = 'systemAdministration';

  @ViewChild('picker_start', { static: false }) picker_start: any;
  @ViewChild('picker_end', { static: false }) picker_end: any;

  public date: moment.Moment;
  public minDate = new Date();
  public maxDate: moment.Moment;


  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date());
  public dateControlMinMax = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  orgListSubs: any;
  accessOrgsListSubs: any;
  updateOrgListSubs: any;
  public showErrorMsg:boolean = false;

  constructor(private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
    // private organizationApiService: OrganizationApiService,
    private service: OrgSecureAccessService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private titleService: Title
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['securedaccess']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.dataAvailable = false;
      this.loader = true;
      this.isRerender = true;
      this.setTableOptions('language');
      this.setLanguage();

    });
    this.frTable = this.customTranslateService.fr;
    this.commonOrgService.currentPageAdder('UserSecuredAccess');

    this.securedUser = JSON.parse(sessionStorage.getItem('SecuredAccessUser'));
    this.setUserInfo();
    this.setLanguage();
    this.setDate();
    //this.renderOrgsTable();
    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['securedaccess']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);

  }

  ngOnInit() {
    this.criteria = [
      {
        name: 'Test Org',
        value: 'test org'
      },
      {
        name: 'OneCloudOne',
        value: 'onecloudone'
      },
      {
        name: 'Srinivas Telephone',
        value: 'srinivas telephone'
      }
    ];

    this.getData();
    this.setDate();
    this.tableLanguageOptions();
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.orgListSubs) {
      this.orgListSubs.unsubscribe();
    }
    if (this.accessOrgsListSubs) {
      this.accessOrgsListSubs.unsubscribe();
    }
    if (this.updateOrgListSubs) {
      this.updateOrgListSubs.unsubscribe();
    }


  }
  getData() {
    this.getAllOrgsList();
    // this.getSelectedOrgsList();
  }

  goToUsersList() {
    this.router.navigate([`${this.sysAdminRoute}/users`]);
  }

  goToOrgSecuredAccess() {
    this.router.navigate([`${this.sysAdminRoute}/orgSecuredAccess`]);
  }

  getAllOrgsList(): any {
    this.orgListSubs = this.service.getOrgList().subscribe((res: any) => {
      this.orgsList = res;
      this.getSelectedOrgsList();
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.renderOrgsTable();
    })
  }

  getSelectedOrgsList(): any {
    this.accessOrgsListSubs = this.service.getOrgListByUsername(this.securedUser.username).subscribe((res: any) => {

      this.addedOrgsList = res;
      this.renderOrgsTable();
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.renderOrgsTable();
    })
  }

  addNewDatas() {

    if (this.isAllOrgs == false && this.selectedOrgs.length == 0) {
      this.showErrorMsg = true;
      return;
    }

    let beginTs = this.startDate.getTime();
    let endTs = this.endDate.getTime();

    let common = {};

    let begin = this.service.roundOffTimestamp(beginTs);
    if (this.hasEndTime) {
      let end = this.service.roundOffTimestamp(endTs);
      common = {
        orgId: '',
        orgName: '',
        type: this.isReadOnly ? '*:read' : '*:write',
        beginTime: begin,
        endTime: end,
      }
    } else {

      common = {
        orgId: '',
        orgName: '',
        type: this.isReadOnly ? '*:read' : '*:write',
        //beginTime: this.startDate.getTime(),
        beginTime: begin,
        endTime: -1,
      }
    }

    this.showButtons = true;

    if (this.isAllOrgs) {
      common['orgId'] = '*';
      common['orgName'] = 'All Organizations';
      this.addedOrgsList = [common];
    } else {
      let orgs = this.addedOrgsList;
      let newOrgs = [];

      if (orgs.length == 1 && orgs[0].orgId == '*') {
        orgs = [];
      }

      if (orgs.length) {
        let selOrgs = [];
        this.selectedOrgs.forEach(sel => {
          selOrgs.push({
            orgId: sel.id,
            orgName: sel.name,
            type: common['type'],
            beginTime: common['beginTime'],
            endTime: common['endTime'],
          });
        });


        orgs.forEach(added => {
          let temp;
          temp = selOrgs.filter(sel => sel.orgId === added.orgId)
          if (temp.length) {
            selOrgs = selOrgs.filter(sel => sel.orgId !== added.orgId);
            newOrgs.push({
              orgId: added.orgId,
              orgName: added.orgName,
              type: common['type'],
              beginTime: common['beginTime'],
              endTime: common['endTime'],
            });
          } else {
            newOrgs.push(added);
          }
        });

        newOrgs = [...newOrgs, ...selOrgs];

      } else {
        this.selectedOrgs.forEach(sel => {
          newOrgs.push({
            orgId: sel.id,
            orgName: sel.name,
            type: common['type'],
            beginTime: common['beginTime'],
            endTime: common['endTime'],
          });

        });
      }

      this.addedOrgsList = newOrgs;
    }
    this.showErrorMsg = false;

    this.showButtons = true;
    this.isRerender = true;
    this.renderOrgsTable();

    this.resetForm();

  }

  deleteOneData(item: any): void {
    this.deleteItem = item;
    this.modalTitle = 'Delete Secured Access Organization';
    this.modalInfo = `${item.orgName} : ${this.checkType(item.type)} : ${this.checkExpiry(item)}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal);
  }

  confirmDeleteSecleted() {
    this.closeModal();
    let item = this.deleteItem;
    this.addedOrgsList = this.addedOrgsList.filter(element => {
      return element.orgId !== item.orgId;
    });

    this.showButtons = true;
    this.isRerender = true;
    this.renderOrgsTable();
  }

  renderOrgsTable() {
    this.setTableOptions();
    if (this.isRerender) {
      this.rerender();
      this.isRerender = false;
    } else {
      this.dtTrigger.next();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      rowId: 'id',
      processing: true,
      lengthChange: false,
      searching: false,
      ordering: false,
      paging: false,
      dom: 't',
      columnDefs: [
        { targets: [-1], orderable: false }
      ],
    };
    this.tableLanguageOptions();

    if (type && type == 'language') {
      setTimeout(() => {
        this.dataAvailable = true;
        this.rerender();
        setTimeout(() => {
          this.loader = false;
        }, 100);
      }, 100);
    } else {
      this.dataAvailable = true;
      this.loader = false;
    }



  }

  checkType(str: string) {
    return this.service.checkType(str);
  }

  checkExpiry(obj: any) {
    return this.service.checkExpiry(obj);
  }

  save() {
    let params = [];
    this.addedOrgsList.forEach(element => {
      params.push({
        orgId: element.orgId,
        type: element.type,
        beginTime: element.beginTime,
        endTime: element.endTime,
      })
    });
    this.loader = true;
    this.updateOrgListSubs = this.service.AddOrgListByUsername(this.securedUser.username, params).subscribe((res) => {
      this.closeAlert();
      this.successInfo = 'User secured Access saved successfully';
      this.success = true;
      this.commonOrgService.pageScrollTop();
      this.loader = false;
      setTimeout(() => {
        this.closeAlert();
        this.goToUsersList();
      }, 1500);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
    })
  }

  cancel() {
    //this.goToOrgSecuredAccess();
    this.goToUsersList();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  setDate() {
    let today = new Date();
    this.startDate = today;
    this.endDate = new Date(today.getTime() + (1 * 60 * 1000));
    this.minimumDate = today;
  }

  setUserInfo() {
    let userData = this.securedUser;
    if (userData?.firstName != null && userData?.firstName !== '') {
      this.userTitle = (userData.lastName != null) ? `${userData.firstName} ${userData.lastName}` : `${userData.firstName}`;
    } else {
      this.userTitle = `${userData?.username}`;
    }

  }

  resetForm() {
    this.isAllOrgs = false;
    this.isReadOnly = true;
    this.hasEndTime = true;
  }

  checkAllOrgs(isChecked) {
    this.showErrorMsg = false;
    this.selectedOrgs = [];
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

  setLanguage() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.curLang = 'fr';
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en') {
      this.curLang = 'en';
    }
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }


  addEventTwo(type: string, event: any) {
    this.startDate = new Date(event.value);
  }

  changeDate() {
    if (this.startDate > this.endDate) {
      this.endDate = new Date(this.startDate.getTime() + (1 * 60 * 1000))
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

}
