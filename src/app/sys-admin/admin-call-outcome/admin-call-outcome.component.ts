import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
// import { Options, select2 } from 'select2';
import * as $ from 'jquery';
// import { truncate } from 'fs/promises';
// import { createTrue, flattenDiagnosticMessageText } from 'typescript';
// import { TrobuleShootingScopeModel } from 'src/app/support/netops-management/shared/model/scopes.model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
// import { ActivatedRoute, Router } from '@angular/router';
import { CallOutComeService } from '../services/call-out-come.service';
// import { CategoryConfigurationService } from 'src/app/support/netops-management/operations/services/category-config.service';
// import { parse } from 'path';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-admin-call-outcome',
  templateUrl: './admin-call-outcome.component.html',
  styleUrls: ['./admin-call-outcome.component.scss']
})
export class AdminCallOutcomeComponent implements OnInit, OnDestroy {
  ORG_ID: number;
  isNewStatus: boolean = false;
  categories: any = [];
  selectionChange: boolean = true;
  callOutComeData: any = {}; // Adding or updateing
  categoryName: any;
  categoriesDataCount: any = [];
  callOutComeStatuses: any = [];  // Showing in datatable
  addOrUpdateStatus: string = "AddStatus";
  restoreStatuses: any = [];


  errorMessage: string = "";
  language: any;
  languageSubject: any;
  isError: boolean = false;
  successInfo: any;
  success: boolean = false;
  loading: boolean = false;
  previousSelection: any;
  previousStatusName: string = "";

  editData: any;
  calloutcomeRead: boolean;
  calloutcomeWrite: boolean;
  MODULE: any;
  timer = [];
  selectedTime: number = 0;

  constructor(private sso: SsoAuthService,
    private router: Router,
    private callOutComeService: CallOutComeService,
    private translateService: TranslateService,
    private dialogService: NgbModal,
    // private route: ActivatedRoute, 
    private commonOrgService: CommonService,
    private titleService: Title
  ) {
    let url = this.router.url;
    // this.ORG_ID = parseInt(this.sso.getOrgId());
    this.ORG_ID = parseInt(this.sso.getOrganizationID(url));
    this.commonOrgService.currentPageAdder('admin-call-outcome');
    this.callOutComeData = {
      statusName: "",
      selection: "multiple",
      categories: [],
      enableCheckCategories: false,
      statusType: ""
    }
    this.restoreStatuses = []

    this.MODULE = this.sso.getRedirectModule(url);
    
  }
  // @HostListener('keyup.enter')
  // onDocumentClickedEnter(event: KeyboardEvent): void {
  //   if ($('input:focus').length) {

  //   }
  //   // this.close();
  // }

  ngOnInit(): void {
    this.getScopes();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(res => {
      this.language = res;
      this.timer = [
        { id: 0, name: '' },
        { id: 30, name:  `30 ${this.language['Seconds']}` },
        { id: 60, name:  `60 ${this.language['Seconds']}`},
        { id: 90, name:  `90 ${this.language['Seconds']}` },
        { id: 120, name: `120 ${this.language['Seconds']}`},
      ];
      this.titleService.setTitle(`${this.language['Call_Outcome']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.loadstatustypes();
    this.getStatuses();
    this.getTimer();
    this.titleService.setTitle(`${this.language['Call_Outcome']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.timer = [
      { id: 0, name: '' },
      { id: 30, name: `30 ${this.language['Seconds']}` },
      { id: 60, name: `60 ${this.language['Seconds']}`},
      { id: 90, name: `90 ${this.language['Seconds']}` },
      { id: 120, name:`120 ${this.language['Seconds']}`},
    ];
  }
  statusTypes: any = [];
  //statusType: string = "";
  loadstatustypes() {
    this.callOutComeService.loadstatustypes().subscribe((res: any) => {
      this.statusTypes = [];
      if (res?.length > 0) {
        res.forEach(element => {
          var obj = {
            id: element?.statusTypeCode,
            name: element?.statusTypeName

          }
          this.statusTypes.push(obj)
        });
        //    this.statusTypes = res;
      }

    })
  }

  getScopes() {
    let scope = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scope['cloud.rbac.csc.calloutcome.createview'] = scope['cloud.rbac.csc.calloutcome.createview'] ? scope['cloud.rbac.csc.calloutcome.createview'] : [];

      if ((scope['cloud.rbac.csc.calloutcome.createview'] && scope['cloud.rbac.csc.calloutcome.createview'].includes('read'))) {
        this.calloutcomeRead = true;
      }
      if ((scope['cloud.rbac.csc.calloutcome.createview'] && scope['cloud.rbac.csc.calloutcome.createview'].includes('write'))) {
        this.calloutcomeWrite = true;
      }
    } else {
      this.calloutcomeRead = true;
      this.calloutcomeWrite = true;
    }
  }

  ngOnDestroy() {
    if (this.languageSubject)
      this.languageSubject.unsubscribe();
  }

  getStatuses() {
    this.loading = true;
    this.callOutComeService.GetStatuses(this.ORG_ID).subscribe((res: any) => {
      if (res != null && res.length > 0) {
        this.callOutComeStatuses = res;
        this.restoreStatuses = []
        res.forEach(element => {
          let obj = {
            name: element.name,
            isSelected: false
          }
          this.restoreStatuses.push(obj);
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      this.isNewStatus = true;
      this.pageModalErrorHandle(err);

    })
  }
  newStatus(status) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (status) {
      this.clear();
      this.previousSelection = {};
      this.previousStatusName = "";
    }
    this.addOrUpdateStatus = "AddStatus";

    this.isNewStatus = status;
    this.categories = [{
      statusForCategories: true,
      subCategories: [],
      categoryName: "",
      subCategoryName: '',
      enableAddDetailsOption: true,
    }]

    this.callOutComeData.categories = this.categories;
    this.callOutComeData.selection = "multiple";
    this.callOutComeData.statusName = "";
    this.callOutComeData.enableCheckCategories = true;
    this.callOutComeData.statusType = "";
    this.success = false;
    this.isError = false;
    this.loading = false;

  }
  enableCategoriesForStatus(isChecked) {
    let statusForCategories = false;

    if (this.callOutComeData.selection == 'multiple') {


      if (isChecked) {
        statusForCategories = isChecked
      }

      this.callOutComeData.categories.forEach(element => {
        element.statusForCategories = statusForCategories;
      });

    }
    else {
      if (isChecked) {
        statusForCategories = isChecked;
      }
      this.callOutComeData.categories.forEach(element => {
        element.statusForCategories = statusForCategories;
      });

    }

  }


  addDetailsOptions(data) {
    if (this.callOutComeData.selection == 'multiple') {
      if (this.checkStringNullOrEmpty(data.categoryName)) {

        data.enableSubCategoryName = true;
        data.statusForCategories = true;
        if (this.checkStringNullOrEmpty(data.subCategoryName)) {
          data.subCategories.push(data.subCategoryName);
        }
        data.subCategoryName = "";
      }
    }

    else {
      data.enableSubCategoryName = true;
      data.statusForCategories = true;
      if (this.checkStringNullOrEmpty(data.subCategoryName)) {
        data.subCategories.push(data.subCategoryName);
      }
      data.subCategoryName = "";
    }

  }
  checkStringNullOrEmpty(value): boolean {
    if (value != "" && value != undefined && value != null)
      return true;

    return false;
  }
  addCategory() {
    let obj = {
      statusForCategories: true,
      subCategories: [],
      categoryName: "",
      subCategoryName: '',
      enableAddDetailsOption: true,
    };

    this.callOutComeData.categories.push(obj);


  }
  setFilter(data, i) {
    this.categoryName = data.categoryName;
  }
  onBlurEvent(data) {
    if (this.callOutComeData.selection == 'multiple') {
      if (data.categoryName && this.checkStringNullOrEmpty(data.subCategoryName)) {
        data.subCategories.push(data.subCategoryName)
        data.enableAddDetailsOption = true;
        data.enableSubCategoryName = false;
        data.subCategoryName = "";

      }
    }
    else {
      if (this.checkStringNullOrEmpty(data.subCategoryName)) {
        data.subCategories.push(data.subCategoryName)
        data.enableAddDetailsOption = true;
        data.enableSubCategoryName = false;
        data.subCategoryName = "";
      }
    }

  }
  remove(data, i, item) {
    data.subCategories.splice(i, 1);
  }
  changeOption(e) {

    this.callOutComeData.selection = e.target.value

    let data = this.editData;
    if (this.addOrUpdateStatus == "UpdateStatus") {
      if (this.callOutComeData.selection == data.selection) {
        this.commonMethod(data);
      }
      else {
        this.clear();
      }
    }
    else {
      this.editData = {}
      this.clear();
    }
    //this.commonMethod(this.editData)



    //  this.callOutComeData.categories = this.categories;
    //  this.clear();

  }
  clear() {
    this.categories = [{
      statusForCategories: this.callOutComeData.enableCheckCategories,
      subCategories: [],
      categoryName: "",
      subCategoryName: '',
      enableAddDetailsOption: true,

    }]
    this.callOutComeData.categories = this.categories;
    this.callOutComeData.orgId = this.ORG_ID;
  }

  commonMethod(data) {
    this.callOutComeData.categories = [];
    this.callOutComeData.enableCheckCategories = true;
    if (data.categories != null) {
      let categories = Object.keys(data.categories);  //["Hardware", "Other"]
      let subCategories = categories.map(elem => data?.categories[elem]?.subcategories || []);  //[["PC/laptopo issue", "3rd party software issue", "Email setup/issue"], []]
      let categoryNames = [];
      categoryNames = categories;
      if (data.selection == "multiple") {

        categories.forEach((element, i) => {
          let obj = {
            statusForCategories: true,
            subCategories: subCategories[i],
            categoryName: element,
            subCategoryName: '',
            enableAddDetailsOption: true,
          }
          this.callOutComeData.categories.push(obj);
        });
        this.selectionChange = true;
      }
      else {
        let obj = {
          statusForCategories: this.callOutComeData.enableCheckCategories,
          subCategories: categories,
          categoryName: "",
          subCategoryName: '',
          enableAddDetailsOption: true,
        }
        this.selectionChange = false;
        this.callOutComeData.categories.push(obj);

      }


    }
    this.previousSelection = data.selection;
    this.previousStatusName = data.name;
    this.callOutComeData.selection = data.selection;
    this.callOutComeData.statusName = data.name;
    this.callOutComeData.statusType = data.statusType
  }

  editStatus(data, status) {

    this.editData = data;
    //this.previesSelection = data;

    this.addOrUpdateStatus = "UpdateStatus";
    this.isNewStatus = status;

    this.commonMethod(data);
  }

  saveStatus() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.loading = true;
    this.isError = false;
    let categories = {};

    if (this.callOutComeData.selection == 'multiple') {
      this.callOutComeData.categories.forEach(element => {
        categories[element.categoryName] = {
          subcategories: element.subCategories,
          selection: this.callOutComeData.selection
        }
      });
      this.isError = false;
    }
    else {
      let listCategories = [];
      if (this.callOutComeData.categories.length > 0) {
        this.callOutComeData.categories[0].subCategories.forEach(element => {
          categories[element] = {
            subcategories: null,
            selection: this.callOutComeData.selection
          }
        });
      } else {
        categories = {};
      }

      //this.categories[0].subCategories;
    }
    let data = {
      orgId: this.ORG_ID,
      selection: this.callOutComeData.selection,
      categories: categories,
      name: this.callOutComeData.statusName,
      statusType: this.callOutComeData.statusType ? this.callOutComeData.statusType : "-"

    }
    if (this.addOrUpdateStatus == "AddStatus") {
      //data.name=this.callOutComeData.statusName
      this.callOutComeService.CreateStatus(data).subscribe(res => {
        this.successInfo = "Successfully Created";
        this.success = true;
        this.isError = false;
        this.isNewStatus = false;
        this.getStatuses();
      }, err => {
        this.loading = false;
        this.success = false;
        this.isNewStatus = true;
        this.pageModalErrorHandle(err);

      })
    } else {
      let statusName = this.previousStatusName;

      this.callOutComeService.UpdateStatus(data, statusName).subscribe(res => {
        this.isNewStatus = false;
        this.success = true;
        this.isError = false;
        this.successInfo = "Successfully Updated";
        this.getStatuses();
      }, err => {
        this.loading = false;
        this.isNewStatus = true;
        this.pageModalErrorHandle(err);

      })
    }


  }
  // restoreStatus() {

  //   let restoreStatuses = this.restoreStatuses.filter(x => x.isSelected);


  //   if (restoreStatuses.length > 0) {
  //     let restoreNames = restoreStatuses.map(x => x.name);
  //     this.callOutComeService.RestoreStatus(restoreNames, this.ORG_ID).subscribe(
  //       res => {
  //         this.getStatuses();
  //         // this.restoreStatuses = [];

  //       }, err => {
  //         this.loading = false;
  //         this.isNewStatus = true;

  //         this.pageModalErrorHandle(err);

  //       });
  //   }
  //   else {
  //     this.restoreStatuses = [];
  //   }

  // }
  // closeRestoreModelPopUp() {
  //   this.getStatuses();
  // }

  confirmDelete(deletePopup, data) {

    this.dialogService.open(deletePopup, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', keyboard: false }).result.then((result) => {
      if (result == 'confirm') {
        this.deleteStatus(data);
      }
    }, (reason) => {

    });

  }
  deleteStatus(data) {
    this.loading = true;
    this.callOutComeService.DeleteStatus(this.ORG_ID, data.name).subscribe(res => {
      this.success = true;
      this.isError = false;
      this.successInfo = "Successfully Deleted";
      this.getStatuses()
    }, err => {
      this.loading = false;
      this.isNewStatus = true;
      this.pageModalErrorHandle(err);

    })

  }
  pageModalErrorHandle(err: any, showError = true) {
    this.isError = true;
    if (err.status === 401) {
      this.errorMessage = this.language['Access Denied'];
    }
    else {
      this.errorMessage = this.callOutComeService.pageErrorHandle(err);
    }
    return this.errorMessage;
  }

  removeCategory(index) {
    this.callOutComeData.categories.splice(index, 1);
  }
  appAlphabetOnly(event): boolean {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z ]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }


  }

  updateTimer() {
    this.loading = true;
    const inp = this.selectedTime
      ? {
        "orgId": this.ORG_ID,
        "callOutcomeAbortTimer": this.selectedTime,
        "csrName": localStorage['calix.username'] || ''
      }
      : { params: new HttpParams().set('orgId', this.ORG_ID) };
    this.callOutComeService.updateOutcomeTimer(inp, this.selectedTime).subscribe(res => {
      this.loading = false;
      this.success = true;
      this.isError = false;
      this.successInfo = "Successfully Saved";
    }, err => {
      this.loading = false;
      this.pageModalErrorHandle(err);

    })
  }

  getTimer() {
    this.loading = true;
    this.callOutComeService.getOutcomeTimer(this.ORG_ID).subscribe(res => {
      this.loading = false;
      this.selectedTime = res?.abortTimer || 30;
    }, err => {
      this.loading = false;
      this.selectedTime = 0;
      //this.pageModalErrorHandle(err);

    })
  }
}
