import { Component, OnInit, AfterViewInit, HostListener, ViewChild, TemplateRef, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, combineLatest, forkJoin, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { ApplicationsApiService } from '../../services/applications-api.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
import { saveAs } from 'file-saver';
import { EndpointManagementService } from '../../services/endpoint-management.service';

@Component({
  selector: 'app-app-groups',
  templateUrl: './app-groups.component.html',
  styleUrls: ['./app-groups.component.scss']
})
export class AppGroupsComponent implements OnInit {
  
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importGlobalInput', { static: false }) importGlobalInput: ElementRef;
  @ViewChild('importLocalInput', { static: false }) importLocalInput: ElementRef;
  @ViewChild('createGroupModal', { static: false }) createGroupModal: ElementRef;
  // @ViewChild('importExportDPIModal', { static: false }) importExportDPIModal: ElementRef;



  language: any;
  pageAvailable: boolean = false;
  apdlength: any;

  appGroupList: any;
  appGroupListLocal: any;
  filterAppGroupSelected: any;
  selected: any;

  types: any = [];
  createTypeSelected: any;
  filterTypeSelected: any;
  appName: any = [];
  appNameSelected: any;
  cloudAppName: string;
  deleteData: any;
  createAppGroupList: any = [];
  createAppGroupSelected: any;
  newAppGroupName: string;
  isCreateNew: boolean = false;
  createAppList: any = [];
  createAppSelected: any;
  appgroupdata: any;
  appgroupdataRes: any = [];
  formError: boolean = false;
  ORG_ID: string;
  tenantId: any;
  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;

  // createView: boolean = false;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    columnDefs: [
      { targets: [0], orderable: false },
    ],
    order: [6, 'desc'],
    "scrollX": true,
    stateSave: false,
    drawCallback: (settings) => {
      setTimeout(() => {
        this.resetDelete()
      }, 0);
      setTimeout(() => {
        $(settings.nTableWrapper).find(`.dataTables_scrollHeadInner`).css('width', '100%');
        $(settings.nTableWrapper).find(`.definitions-table`).css('width', '100%');
      }, 10);

      this.currentTableRowCount = settings.aiDisplay.length;
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  appsTableData: any;

  editOnValue: any;
  editData: any;
  editTrafficname: any;
  editAppNameIdSelected: any;
  editTrafficnameSelected: any;
  editSocialChannelSelected: any;
  editIsCreateNew: boolean = false;
  editCloudTopAppSelected: any;


  add = {
    orgId: "",
    tenantId: 0,
    applicationId: "",
    trafficTypeName: "",
    marketingCloudAppName: "",
    socialChannel: true,
    marketingCloudTopApp: true

  }

  dataAvailable: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  infoTitle: string;
  infoBody: string;

  deleteIds = [];
  deleteApps = [];

  loaded: boolean;

  translateSubscribe: any;
  frTable: any;

  yesNo: any = [];
  socialChannelSelected: boolean = false;
  cloudTopAppSelected: boolean = false;
  cloudName: string;
  editCloudAppName: string;

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  parallelReqSubscribtionAppGroups: ISubscription;
  defOrgApps: any;
  curOrgApps: any;
  apps: any = [];

  type: any;
  isSysAdmin: boolean;
  loading: boolean = true;
  combineLatestGroups: any;
  defOrgAppGroups: any;
  curOrgAppGroups: any;
  exportData: any;
  private empty: any = {
    'Application Group Name': '',
    'Application Name': '',
    // 'OrgId(ReadOnly)': '', /* CCL-42554 */
    'Social Channel': '',
    'Cloud Application Name': '',
    'Cloud Top Application': ''
  };

  importTableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    columnDefs: [
      { targets: [0], orderable: false },
    ],
    order: [6, 'desc'],
    "scrollX": true,
    stateSave: false,
    drawCallback: (settings) => {
      setTimeout(() => {
        this.resetDelete();
      }, 0);
      setTimeout(() => {
        $(settings.nTableWrapper).find(`.dataTables_scrollHeadInner`).css('width', '100%');
        $(settings.nTableWrapper).find(`.definitions-table`).css('width', '100%');
      }, 10);

      this.currentTableRowCount = settings.aiDisplay.length;
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  tablePreview: boolean = false;
  previewHeaderValue;
  recreateTable;
  storageData = {};
  importTableSubs: any;
  jsonSubs: any;
  importTableData: any;
  enableImportSubmit: boolean;
  buttonVisible: boolean = true;
  currentTableRowCount = 0;
  modalRef: any;
  createSubs: any;
  updateSubs: any;
  deleteSubs: any;
  exportSubs: any;
  importSubs: any;
  importDpiSubs: any;
  sortData = {
    column: 6,
    type: 'desc'
  }
  invalidImportCloudAppName = [];
  invalidImportTrafficTypeName = [];
  searchText = '';
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef<HTMLInputElement>>;
  orgInfoSub:any;
  hideDpiAsmfeatures:boolean = true;
  constructor(
    // private customTranslateService: CustomTranslateService,
    private router: Router,
    private apiService: ApplicationsApiService,
    private sso: SsoAuthService,
    private commonFunctionsService: CommonFunctionsService,
    private exportExcel: ExportExcelService,
    private dataTablecreatorService: DataTablecreatorService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private titleService: Title,
    private common:common,
    public endpointManagementService: EndpointManagementService,
  ) {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.dataAvailable = false;
      this.isRerender = true;
      this.tableCreator('language');
      this.changeLangData();
      this.titleService.setTitle(`${this.language['applicationgroups']} - ${this.language['Applications']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });

    this.commonOrgService.closeAlert();//*Imp
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['applicationgroups']} - ${this.language['Applications']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.appGroupList = ["Amazon", "Apple", "Business", "Competitor", "E-Learning", "File Sharing/Transfer", "Gaming", "Messaging and Collaboration", "Network Infrastructure & IP Protocols", "Smart Home", "Social", "Speed Test", "Streaming Media", "VPN", "Web, Cloud, Storage Hosting"];
    this.createAppList = [
      'Coursera.org'
    ];
    this.createAppSelected = 'Coursera.org';
    this.removeState();

    this.tableLanguageOptions();
    this.getAppNamesData();

    this.changeLangData();
    this.createTypeSelected = 'global';
    this.checkSysAdmin();
    this.hideDpiAsm();
    this.jsonSubs = this.dataTablecreatorService.jsonDataOfCSV.subscribe((res: any) => {
      this.invalidImportCloudAppName = [];
      this.invalidImportTrafficTypeName = [];

      try {
        let importValidationFlag = true;
        res.forEach(el => {
          if (!Object.keys(el).every(key => !el[key])) {
            el['trafficTypeName'] = el[this.language['applicationGroupName']] ? el[this.language['applicationGroupName']] : '',
              el['appName'] = el[this.language['appName']] ? el[this.language['appName']] : '',
              // el['orgId(ReadOnly)'] = el['OrgId(ReadOnly)'] ? el['OrgId(ReadOnly)'] : '', /* CCL-42554 */
              el['socialChannel'] = el[this.language['socialchannel']] ? el[this.language['socialchannel']] : '',
              el['marketingCloudAppName'] = el[this.language['cloudAppName']] ? el[this.language['cloudAppName']] : '',
              el['marketingCloudTopApp'] = el[this.language['cloudTopApp']] ? el[this.language['cloudTopApp']] : ''
            // delete el['Application Group Name'];
            // delete el['Application Name'];
            // delete el['OrgId(ReadOnly)'];
            // delete el['Social Channel'];
            // delete el['Cloud Application Name'];
            // delete el['Cloud Top Application']
            if (!el['trafficTypeName']) {
              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = `${this.language["Application group name can't be empty."]}`;
              importValidationFlag = false;
              this.openInfoModal(false);
              return;
            }
            if (el['trafficTypeName'].length && el['trafficTypeName'].length > 64) {
              this.invalidImportTrafficTypeName.push(el)
              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = this.language['Invalid Application Group Name - Name should not exceed 64 characters.'];
              importValidationFlag = false;
              this.openInfoModal(true);
              return;
            }
            // if(!el['appName']) {
            //   this.infoTitle = this.language['Invalid Value'];
            //   this.infoBody = "Application Name can't be empty.";
            //   importValidationFlag = false;
            //   this.openInfoModal(false);
            // }
            if (el['marketingCloudAppName'] && el['marketingCloudAppName'].length > 64) {
              this.invalidImportCloudAppName.push(el)

              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = `${this.language['Invalid Cloud Application Name - Name should not exceed 64 characters.']}`;
              importValidationFlag = false;
              this.openInfoModal(true);
              return
            }
          }
        });
        if (importValidationFlag) {
          this.compareJsonToTableData(res);
        }
      } catch (ex) {
      }
    });

    this.setStorageData();
  }

  ngOnChanges(){
    this.tableCreator()
  }

  ngAfterViewInit(): void {
    this.loaded = true;
    this.checkboxes.changes.subscribe(() => {
      this.updateSelectAllCheckbox();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.parallelReqSubscribtionAppGroups) {
      this.parallelReqSubscribtionAppGroups.unsubscribe();
    }

    if (this.importSubs) {
      this.importSubs.unsubscribe();
    }

    if (this.jsonSubs) {
      this.jsonSubs.unsubscribe();
    }

    if (this.createSubs) {
      this.createSubs.unsubscribe();
    }

    if (this.importDpiSubs) {
      this.importDpiSubs.unsubscribe();
    }
    if (this.orgInfoSub) {
      this.orgInfoSub.unsubscribe();
    }
    if (this.dialogService.hasOpenModals()) {
      this.dialogService.dismissAll();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // setTimeout(() => {
        this.dtTrigger.next();
      // }, 50);
    });
  }

  getAppNamesData() {
    const requestEndpoints = [
      `${environment.faAdminURL}application?org-id=0`,
      `${environment.faAdminURL}application?org-id=${this.ORG_ID}`,
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.apiService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
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
      this.defOrgApps = response[0];
      this.curOrgApps = response[1];
      if (response.length) {
        for (let e of response) {
          if (e != null && e.status != 404 && e.error != undefined) {
            this.pageErrorHandle(e);
            return;
          }
        }
      }

      let appData = this.apiService.combineApps(this.curOrgApps, this.defOrgApps)

      this.appName = appData.allApps;
      this.apps = appData.appIds;
      this.applicationGroupsCombined();
    });
  }


  // ** Application Group List API Starts ** //
  apiServiceLoader() {
    this.apiService.ApplicationGroupList(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        this.appgroupdata = res;
        this.appgroupdataRes = res;
        this.apdlength = res;
        this.tableCreator();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }

        setTimeout(() => {
          this.resetDelete();
        }, 100);

        this.setAppGroupList(res);
      }
    })
  }

  applicationGroupsCombined() {
    const requestEndpoints = [
      `${environment.faAdminURL}application-group?org-id=0&tenant-id=0`,
      `${environment.faAdminURL}application-group?org-id=${this.ORG_ID}&tenant-id=0`,
    ];

    const requests = [];

    requestEndpoints.forEach(endpoint => {
      const req = this.apiService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }), catchError((error: any) => {
        return of(error);
      }));
      requests.push(req);
    });

    this.combineLatestGroups = combineLatest(requests);
    this.makeParallelRequestAppGroups();
  }

  makeParallelRequestAppGroups() {
    this.parallelReqSubscribtionAppGroups = this.combineLatestGroups.subscribe((response: any) => {
      this.defOrgAppGroups = response[0];
      this.curOrgAppGroups = response[1];

      if (response.length) {
        for (let e of response) {
          if (e != null && e.status != 404 && e.error != undefined) {
            this.pageErrorHandle(e);
            this.tableCreator();
            if (this.isRerender) {
              this.rerender();
              this.isRerender = false;
            } else {
              setTimeout(() => {
                this.dtTrigger.next();
              }, 100);

            }
            return;
          }
        }
      }

      let appGroupData = this.combineAppGroups(this.curOrgAppGroups, this.defOrgAppGroups)
      this.appgroupdata = appGroupData;
      this.appgroupdataRes = appGroupData;
      this.tableCreator();
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);

      }

      setTimeout(() => {
        this.resetDelete();
      }, 150);

      this.setAppGroupList(appGroupData);
    });
  }

  setAppGroupList(data) {
    this.appGroupList = data.filter((v, i, a) => a.findIndex(t => (t.trafficTypeName === v.trafficTypeName)) === i)
    this.appGroupListLocal = data.filter((v, i, a) => a.orgId != 0 && a.findIndex(t => (t.trafficTypeName === v.trafficTypeName)) === i)
  }

  addAppGrpMmbr() {
    let params = this.add;
    this.newAppGroupName = this.newAppGroupName ? this.newAppGroupName.trim() : '';
    this.cloudAppName = this.cloudAppName ? this.cloudAppName.trim() : '';

    // if (this.isCreateNew && (this.newAppGroupName == undefined || this.newAppGroupName.trim() == '')) {
    //   this.infoTitle = this.language['Invalid value'];
    //   this.infoBody = `${this.language["Application Group Name can't be empty."]}`;
    //   this.openInfoModal(false);
    //   return;
    // } 
    if (this.isCreateNew && (this.newAppGroupName && this.newAppGroupName.length > 64)) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Application Group Name - Name should not exceed 64 characters.']}`;
      this.openInfoModal(false);
      return;
    }

    if ((this.isCreateNew && !this.newAppGroupName && !this.appNameSelected && !this.appNameSelected?._id) || (!this.createAppGroupSelected && !this.createAppGroupSelected?.trafficTypeName && !this.appNameSelected && !this.appNameSelected?._id)) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `Application Group Name can't be empty.<br>Application Name can't be empty.`;
      this.openInfoModal(false);
      return;
    }

    else if (!this.appNameSelected && !this.appNameSelected?._id) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `Application Name can't be empty.`;
      this.openInfoModal(false);
      return;
    }

    else if ((!this.createAppGroupSelected && !this.createAppGroupSelected?.trafficTypeName && !this.newAppGroupName) || 
    this.isCreateNew && (this.newAppGroupName == undefined || this.newAppGroupName.trim() == '')) {
      
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `Application Group Name can't be empty.`;
      this.openInfoModal(false);
      return;
    }




    if (this.cloudAppName && this.cloudAppName?.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Cloud Application Name - Name should not exceed 64 characters.']}`;
      this.openInfoModal(false);
      return;
    }

    if (this.isSysAdmin && this.createTypeSelected == 'global') {
      params.orgId = `0`;
    } else {
      params.orgId = this.ORG_ID;
    }
    params.tenantId = 0;
    params.applicationId = this.appNameSelected._id;
    if (this.isCreateNew == true) {
      params.trafficTypeName = this.newAppGroupName;
    } else {
      params.trafficTypeName = this.createAppGroupSelected?.trafficTypeName;
    }
    params.marketingCloudAppName = this.cloudAppName ? this.cloudAppName : '';
    params.socialChannel = this.socialChannelSelected;
    params.marketingCloudTopApp = this.cloudTopAppSelected;

    this.loading = true;
    this.createSubs = this.apiService.ApplicationGroupMmbrCreate(params, params.orgId).subscribe((json: any) => {
      this.isRerender = true;
      this.applicationGroupsCombined();
      this.reset();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });

  }

  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;
    this.editTrafficname = item.trafficTypeName;
    this.editTrafficnameSelected = item.trafficTypeName;
    this.editCloudAppName = item.marketingCloudAppName;
    this.editSocialChannelSelected = item.socialChannel;
    this.editCloudTopAppSelected = item.marketingCloudTopApp;
    this.editAppNameIdSelected = item.applicationId

    if (this.deleteIds.indexOf(item._id) !== -1) {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteApps = this.deleteApps.filter((obj) => {
        return obj['_id'] !== item._id;
      });

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length) {
        if (this.deleteIds.length != tot) {
          $('#selectDeselectAll').prop('checked', false);
          $('#selectDeselectAll-span').show();
        } else {
          $('#selectDeselectAll-span').hide();
        }
      } else {
        $('#selectDeselectAll').prop('checked', false);
        $('#selectDeselectAll-span').hide();
      }
    }
  }

  updateSave(id: string) {
    let params = this.add;

    params['_id'] = this.editData._id;
    if (this.editIsCreateNew == true) {
      this.editTrafficname = this.editTrafficname ? this.editTrafficname.trim() : '';
      if (this.editTrafficname.trim() == '') {
        this.infoTitle = this.language['Invalid value'];
        this.infoBody = `${this.language["Application group name can't be empty."]}`;
        this.openInfoModal(false);
        return;
      } else if (this.editTrafficname && this.editTrafficname.length > 64) {
        this.infoTitle = this.language['Invalid Value'];
        this.infoBody = `${this.language['Invalid Application Group Name - Name should not exceed 64 characters.']}`;
        this.openInfoModal(false);
        return;
      }

      params.trafficTypeName = this.editTrafficname;
    } else {
      if (typeof this.editTrafficnameSelected == 'string') {
        params.trafficTypeName = this.editTrafficnameSelected;
      } else {
        params.trafficTypeName = this.editTrafficnameSelected.trafficTypeName;
      }

    }

    if (!this.editAppNameIdSelected) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `Application Name can't be empty.`;
      this.openInfoModal(false);
      return;
    }
    if (this.editCloudAppName && this.editCloudAppName?.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Cloud Application Name - Name should not exceed 64 characters.']}`;
      this.openInfoModal(false);
      return;
    }

    params.applicationId = this.editAppNameIdSelected;
    params.orgId = this.editData.orgId;
    params.marketingCloudAppName = this.editCloudAppName;
    params['socialChannel'] = this.editSocialChannelSelected;
    params['marketingCloudTopApp'] = this.editCloudTopAppSelected;
    this.loading = true;
    params.tenantId = 0;
    this.updateSubs = this.apiService.ApplicationGroupMmbrUpdate(params, this.editData._id, params.orgId).subscribe(res => {
      this.isRerender = true;
      this.applicationGroupsCombined();
      this.editOnValue = undefined;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });

  }

  updateCancel() {
    this.editOnValue = undefined;
    this.editIsCreateNew = false;
  }

  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete application group?'];
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDelete() {
    let id = this.deleteData._id;
    this.loading = true;
    this.deleteSubs = this.apiService.ApplicationGroupMmbrDelete(id, this.deleteData.orgId).subscribe((res: any) => {
      this.isRerender = true;
      this.closeDeleteModal();
      this.applicationGroupsCombined();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  closeDeleteModal() {
    this.deleteData = undefined;
    this.closeModal();
  }


  deleteGroups: any = [];
  getDeleteIds(e: any, item: any): any {

    if (e.target.checked) {
      this.deleteIds.push(item._id);
      //this.deleteGroups.push(item.trafficTypeName);
      this.deleteApps.push(item);

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteApps = this.deleteApps.filter((obj) => {
        return obj['_id'] !== item._id;
      });


      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length) {
        if (this.deleteIds.length != tot) {
          $('#selectDeselectAll').prop('checked', false);
          $('#selectDeselectAll-span').show();
        } else {
          $('#selectDeselectAll-span').hide();
        }
      } else {
        $('#selectDeselectAll').prop('checked', false);
        $('#selectDeselectAll-span').hide();
      }
    }

  }

  selectDeselectAll(isChecked) {
    this.deleteIds = [];
    this.deleteApps = [];
    let i = 0;
    let tot = $('input[name^="delete_id_"]').length;
    var that = this;
    if (isChecked) {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }

        $(this).prop('checked', true);

        var classes = $(this).attr('class').split(' ');
        let id = classes[0].substring('delete_id_'.length);
        let d = that.appgroupdata.filter((el) => el._id === id);
        that.deleteIds.push(id);
        that.deleteApps.push(d[0]);
        i++;
      });
    } else {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.deleteApps = [];
        i++;
      });
    }

  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.deleteApps = [];
    this.selectDeselectAll(true);
  }


  deleteAllSelected() {
    if (!this.deleteApps.length) {
      this.infoTitle = '';
      this.infoBody = `<tr><td>${this.language['Application Groups not Selected']}</td></tr>`;
      this.openInfoModal(false);
      return;
    }

    if (this.deleteApps) {
      this.infoTitle = this.language[this.deleteApps.length === 1 ? 'Delete selected application group?' : 'Delete selected application groups?'];
      // let html = '';
      // for (let i = 0; i < this.deleteIds.length; i++) {
      //   html += `<tr><td>${this.deleteApps[i].trafficTypeName ? this.deleteApps[i].trafficTypeName : ''}</td><td>${this.deleteApps[i].marketingCloudAppName ? this.deleteApps[i].marketingCloudAppName : ''}</td></tr>`;
      // }
      // this.infoBody = html;
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }

  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.loading = true;
    this.deleteApps.forEach(el => {
      deleteCalls.push(this.apiService.ApplicationGroupMmbrDelete(el._id, el.orgId));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.deleteApps = [];
        this.isRerender = true;
        this.applicationGroupsCombined();
        this.closeMultiDeleteModal();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deleteApps = [];
    this.closeModal();
  }

  tableCreator(type?: string) {
    let that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: '_id',
      columnDefs: [
        { targets: [0], orderable: false },
      ],
      lengthChange:true,
      searching: true,
      order: [that.sortData.column, that.sortData.type],
      "scrollX": true,
      stateSave: true,
      info: true,
      // dom:'ltipr',
      "dom": '<"top"f>rt<"bottom"ilp><"clear">',
      drawCallback: (settings) => {
        let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 6;
        let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'desc';
        that.sortData = {
          column: col,
          type: type
        };

        setTimeout(() => {
          this.resetDelete()
        }, 0);

        this.currentTableRowCount = settings.aiDisplay.length;
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };

    this.tableLanguageOptions();
    let extraTime = 0;
    if (this.appgroupdata && this.appgroupdata.length) {
      let l = this.appgroupdata.length;
      extraTime = Math.ceil(l / 100) * 1000;
    }

    if (type && type == 'language') {
      setTimeout(() => {
        //this.dataAvailable = true;
        this.rerender();
        //this.loading = false;
        this.changeHidden(extraTime);
      }, 200);
    } else {
      //this.dataAvailable = true;
      setTimeout(() => {
        //this.loading = false;
        this.changeHidden(extraTime);
      }, 100);
    }
  }

  changeHidden(time) {
    time = time ? time : 0;
    if(this.appgroupdata.length <= 10000){
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 1500);
    }
    else {
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, time);
    }

  }

  showCreate() {
    // this.createView = true;
    this.tablePreview = false;
    this.buttonVisible = false;
  }

  closeCrossIcon() {
    this.resetForm();
    this.closeModal()
  }

  hideCreate() {
    this.resetForm();
    this.closeModal()
    // this.createView = false;
    this.tablePreview = false;
    this.buttonVisible = true;
  }

  setTableOptions() {
    this.tableOptions = {
      rowId: '_id',
      columnDefs: [
        { targets: [0], orderable: false },
      ],
      order: [1, 'asc'],
      "scrollX": true,
    };

    this.dataAvailable = true;

  }


  closeAlert() {
    this.error = false;
    this.success = false;
  }

  doFilter() {
    let app;
    if (this.filterAppGroupSelected && !this.filterTypeSelected) {
      app = this.filterAppGroupSelected.trafficTypeName;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.column(1).search(app).column(6).search('').draw();
      });
      return;

    } else if (this.filterAppGroupSelected && this.filterTypeSelected) {
      app = this.filterAppGroupSelected.trafficTypeName;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.column(1).search(app).column(6).search(this.filterTypeSelected).draw();
      });
      return;

    } else if (!this.filterAppGroupSelected && this.filterTypeSelected) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.column(1).search('').column(6).search(this.filterTypeSelected).draw();
      });
      return;
    } else {
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   dtInstance.column(1).search('').column(6).search(this.filterTypeSelected).draw();
      // });
      this.removeState(); /* CCL-43672 */
    }
    this.searchText = '';
    this.isRerender = true;
    this.rerender();
    // return
  }

  // redraw() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.draw();
  //   });
  // }


  reset() {
    this.hideCreate();
  }
  resetForm() {
    this.createTypeSelected = 'global';
    this.createAppGroupSelected = undefined;
    this.isCreateNew = false;
    this.newAppGroupName = undefined;
    this.appNameSelected = undefined;
    this.socialChannelSelected = false;
    this.cloudTopAppSelected = false;
    this.cloudAppName = undefined;

    this.filterAppGroupSelected = null;
    this.filterTypeSelected = null;
    // let e = new Event('change');
    // document.getElementById('appGroup-filter-group-naame').dispatchEvent(e);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
      this.importTableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
      this.importTableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
      this.importTableOptions.language = this.translateService.de_DE;
    } else {
      this.tableOptions.language = this.translateService.en;
      this.importTableOptions.language = this.translateService.en;
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deleteApps = [];
  }

  changeLangData() {
    let temp = [
      { label: this.language.yes, value: true },
      { label: this.language.no, value: false },
    ];
    this.yesNo = [...temp];

    let types = [
      { label: this.language['Global'], value: 'global' },
      { label: this.language['Local'], value: 'local' },
    ];
    this.types = [...types];
  }

/*   getAppNameOfId(id: string) {
    let nameArray = this.appName.filter((el) => el.applicationId == id);
    return nameArray[0].name;
  } */

  checkSysAdmin() {
    let roles = this.sso.getRoles();
    if (roles?.includes('SysAdmin')) {
      this.createTypeSelected = 'global';
      this.isSysAdmin = true;
    } else {
      this.isSysAdmin = false;
    }

  }

  combineAppGroups(curOrgApps, defOrgApps) {
    curOrgApps = curOrgApps ? curOrgApps : [];
    defOrgApps = defOrgApps ? defOrgApps : [];
    // let temp;
    // let availCurOrgApps: any = [];
    let appIds = {};

    curOrgApps = curOrgApps.map((obj) => {
      obj.type = "Local";
      // obj['v4s'] = this.apiService.splitData(obj['addressesV4']);
      // obj['v6s'] = this.apiService.splitData(obj['addressesV6']);
      // obj['newPorts'] = this.apiService.splitData(obj['ports']);
      // appIds[obj._id] = obj.name;
      return obj;
    });
    if (defOrgApps && defOrgApps.length) {
      //const currentOrgName = curOrgApps.map((obj) => obj.trafficTypeName);
      defOrgApps = defOrgApps.map((obj) => {
        let currentMatch = curOrgApps.filter((cur) => (cur.trafficTypeName == obj.trafficTypeName && cur.applicationId == obj.applicationId));

        if (currentMatch.length) {
          obj = currentMatch[0];
          curOrgApps = curOrgApps.filter((cur) => (cur.trafficTypeName !== obj.trafficTypeName || cur.applicationId !== obj.applicationId));
        } else {
          obj.type = "Global";
        }
        return obj;
      });
      defOrgApps = [...defOrgApps, ...curOrgApps];

    } else if (curOrgApps.length) {
      defOrgApps = curOrgApps;
    }

    let data = {
      allApps: defOrgApps,
      appIds: appIds
    }
    return defOrgApps;

  }

  export(type?: string) {
    let orgId: string | number = this.ORG_ID;
    let nameStr: string = 'local_application_group';
    if (type && type == 'global') {
      orgId = 0;
      nameStr = 'global_application_group';
    }
    let name = this.commonFunctionsService.generateExportName(nameStr, true);

    this.exportSubs = this.apiService.ExportAppGroups(orgId).subscribe((res: any) => {
      this.exportData = this.exportDataConvertor(res);
      if (this.exportData && this.exportData.length) {
        this.exportExcel.downLoadCSV(name, this.exportData);
      } else {
        this.exportExcel.downLoadCSV(name, [this.empty]);
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  exportPdf(type?: string) {
    // let orgId: string | number = this.ORG_ID;
    // let nameStr: string = 'local_application_group';
    // if (type && type == 'global') {
    //   orgId = 0;
    //   nameStr = 'global_application_group';
    // }
    // this.exportSubs = this.apiService.ExportAppGroups(orgId).subscribe((res: any) => {
    //   let name = this.commonFunctionsService.generateExportName(nameStr);
    //   let exportData = this.exportDataConvertor(res);
    //   const doc = new jsPDF();
    //   let headerArray = [], bodyData = [];
    //   exportData.forEach(obj => {
    //     for (let key in obj) {
    //       if (headerArray.indexOf(key) == -1) headerArray.push(key);
    //     }
    //   });

    //   exportData.forEach(obj => {
    //     let rowData = [];
    //     headerArray.forEach(key => {
    //       rowData.push(obj.hasOwnProperty(key) ? obj[key] : '');
    //     });
    //     bodyData.push(rowData);
    //   });

    //   doc.autoTable({
    //     margin: { top: 0, right: 0, bottom: 0, left: 0 },
    //     pageBreak: 'auto',
    //     theme: 'striped',
    //     head: [headerArray],
    //     body: bodyData,
    //   })

    //   doc.save(`${name}.pdf`);
    // }, (err: HttpErrorResponse) => {
    //   this.pageErrorHandle(err);
    // });
  }

  exportDataConvertor(array) {
    let newArray = [];
    if (Array.isArray(array)) {
      array.forEach(el => {
        delete el._id
        for (const key in el) {
          if (typeof el[key] == 'boolean') {
            if (el[key] == true) {
              el[key] = 'Yes'
            } else {
              el[key] = 'No'
            }
          }
        }

        newArray.push({
          'Application Group Name': el.trafficTypeName ? el.trafficTypeName : '',
          'Application Name': el.applicationId ? this.apps[el.applicationId] : '',
          // 'OrgId(ReadOnly)': el.orgId, /* CCL-42554 */
          'Social Channel': el.socialChannel ? el.socialChannel : '',
          'Cloud Application Name': el.marketingCloudAppName ? el.marketingCloudAppName : '',
          'Cloud Top Application': el.marketingCloudTopApp ? el.marketingCloudTopApp : ''
        });
      });
    }
  
    const translatedArray = newArray.map(el => {
      const translatedObj = {};
      for (const key in el) {
        if (el.hasOwnProperty(key)) {
          let translatedKey;
          switch (key) {
            case 'Application Group Name':
              translatedKey = this.language['applicationGroupName'] || key;
              break;
            case 'Application Name':
              translatedKey = this.language['appName'] || key;
              break;
            case 'Social Channel':
              translatedKey = this.language['socialchannel'] || key;
              break;
            case 'Cloud Application Name':
              translatedKey = this.language['cloudAppName']|| key;
              break;
            case 'Cloud Top Application':
              translatedKey = this.language['cloudTopApp'] || key;
              break;
            default:
              translatedKey = key;
          }
          translatedObj[translatedKey] = el[key];
        }
      }
      return translatedObj;
    });
  
    return translatedArray;
  }
  

  // For Import
  fullImport(importType, file) {
    if (file && file.target.files.length && file.target.files[0].name.split('.')[1] != 'csv') {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }
    sessionStorage.setItem('importType', importType)
    let data = this.curOrgAppGroups;
    if (importType == 'global') {
      data = this.defOrgAppGroups;
    }

    this.dataTablecreatorService.getJsonFromCsv(file);
    if (this.importGlobalInput) {
      this.importGlobalInput.nativeElement.value = "";
    }
    this.importLocalInput.nativeElement.value = "";
  }

  compareJsonToTableData(json: any) {
    let tableData = this.curOrgAppGroups;
    let orgId: any = this.ORG_ID;
    let importType = sessionStorage.getItem('importType')
    if (importType == 'global') {
      tableData = this.defOrgAppGroups;
      orgId = 0;
    }

    // if (!json.length) {
    //   this.infoTitle = this.language.noAvailableChange;
    //   this.infoBody = '';
    //   this.openInfoModal(false);
    //   return;
    // }
    tableData = this.appgroupdata;
    let apps = this.apps;
    let comparedData = [];
    json.forEach(imp => {
      let action = 'Create';
      if (tableData.filter((tbl) => (tbl.trafficTypeName == imp.trafficTypeName && apps[tbl.applicationId] == imp.appName)).length) {
        action = 'Update';
      }
      // if (importType == 'global' && tableData.filter((tbl) => (tbl.trafficTypeName == imp.trafficTypeName && apps[tbl.applicationId] == imp.appName && tbl.orgId == 0)).length) {
      //   action = 'Update';
      // } else if (importType == 'local' && tableData.filter((tbl) => (tbl.trafficTypeName == imp.trafficTypeName && apps[tbl.applicationId] == imp.appName && tbl.orgId == this.ORG_ID)).length) {
      //   action = 'Update';
      // }
      if (imp.trafficTypeName && imp.appName) {
        comparedData.push({
          "action": action,
          "trafficTypeName": imp.trafficTypeName,
          "applicationName": imp.appName,
          "socialChannel": (imp.socialChannel && imp.socialChannel.toUpperCase() == 'YES' || imp.socialChannel.toUpperCase() == 'Y') ? true : false,
          "marketingCloudAppName": imp.marketingCloudAppName ? imp.marketingCloudAppName : '',
          "marketingCloudTopApp": (imp.marketingCloudTopApp && imp.marketingCloudTopApp.toUpperCase() == 'YES' || imp.marketingCloudTopApp.toUpperCase() == 'Y') ? true : false,
          "orgId": orgId,
          "tenantId": 0
        })
      }


    });

    if (!comparedData.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }

    this.importSubmit(true, comparedData)
  }

  //  For Submit Import
  importSubmit(isDryRun = false, comparedData?: any) {
    let orgId = this.ORG_ID;
    let importType = sessionStorage.getItem('importType')
    if (importType == 'global') {
      orgId = '0';
    }
    let requestObject: any = {
      "clientIP": this.storageData["clientIp"],
      "dry_run": isDryRun,
      "full_import": false,
      "import_data": [],
      "orgId": orgId,
      "userId": this.sso.getUserId()
    }
    let action = 'Create';
    // if (importType == 'FullImport') {
    //   requestObject.full_import = true;
    //   action = 'Create';
    // } else {
    //   requestObject.full_import = false;
    //   action = 'Update';
    // }
    let data = isDryRun ? comparedData : [];
    if (!isDryRun) {
      this.importTableData.forEach((element: any) => {
        if (element.validationResult == 'ok') {
          data.push({
            "action": element.action,
            "trafficTypeName": element.trafficTypeName,
            "applicationName": element.applicationName,
            "socialChannel": element.socialChannel,
            "marketingCloudAppName": element.marketingCloudAppName ? element.marketingCloudAppName : '',
            "marketingCloudTopApp": element.marketingCloudTopApp,
            "orgId": orgId,
            "tenantId": 0
          })
        }
      });
    }

    requestObject.import_data = data;
    this.importSubs = this.apiService.ImportAppGroups(orgId, requestObject).subscribe((res: any) => {
      if (isDryRun) {
        if (res && res.data && res.data.length == 0) {
          this.infoTitle = this.language.noAvailableChange;
          this.infoBody = '';
          $('#openModalButton').click();
          return;
        }
        this.importTableData = res ? res : [];
        this.checkDryRunData(this.importTableData);
      } else {
        sessionStorage.removeItem('importType');
        this.cancel();
        this.isRerender = true;
        this.applicationGroupsCombined();
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 400) {
        if (isDryRun) {
          this.infoTitle = this.language.objectNotFound;
          this.infoBody = '';
          this.closeModal();
          this.modalRef = this.dialogService.open(this.infoModal,{ backdrop: 'static', keyboard: false });
        }
        else this.pageErrorHandle(err);
      } else {
        this.pageErrorHandle(err);
      }

    });


  }

  checkDryRunData(data: any) {
    this.enableImportSubmit = false;
    let tableData = this.curOrgAppGroups;
    let importType = sessionStorage.getItem('importType')
    if (importType == 'global') {
      tableData = this.defOrgAppGroups;
    }
    data.forEach(e => {
      if (e.validationResult != 'ok') {
        e.action = e.validationResult
      }
      if (e.validationResult == 'ok') {
        this.enableImportSubmit = true;
      }
      e['trafficTypeName_old'] = '';
      e['applicationName_old'] = '';
      e['socialChannel_old'] = '';
      e['marketingCloudAppName_old'] = '';
      e['marketingCloudTopApp_old'] = '';

      let match = tableData.filter((tbl) => (tbl.trafficTypeName == e.trafficTypeName && this.apps[tbl.applicationId] == e.applicationName));
      if (match.length) {
        e['trafficTypeName_old'] = match[0].trafficTypeName ? match[0].trafficTypeName : '';
        e['applicationName_old'] = e.applicationName ? e.applicationName : '';
        e['socialChannel_old'] = match[0].socialChannel ? 'Yes' : 'No';
        e['marketingCloudAppName_old'] = match[0].marketingCloudAppName ? match[0].marketingCloudAppName : '';
        e['marketingCloudTopApp_old'] = match[0].marketingCloudTopApp ? 'Yes' : 'No';
      }
    });
    // this.createView = false;
    this.buttonVisible = false;
    this.tablePreview = true;
  }

  cancel() {
    // this.createView = false
    this.tablePreview = false;
    this.buttonVisible = true;
    this.reset();
  }


  closeImport() {
    this.cancel();
    this.enableImportSubmit = false;
    this.importTableData = [];
    setTimeout(() => {
      this.doFilter();
    },100)
  }

  setStorageData() {
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400) {
      this.infoBody = this.commonOrgService.pageErrorHandle(err);
      this.infoTitle = 'Error';
      this.openInfoModal(false);
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }

  }

  openInfoModal(invalidImportAppGroup: boolean) {
    if (!invalidImportAppGroup) {
      this.invalidImportCloudAppName = [];
      this.invalidImportTrafficTypeName = []
    }

    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('app_groups', url);
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
  createAppModalOpen(){
    this.modalRef =this.dialogService.open(this.createGroupModal, { backdrop: 'static',windowClass:'create-custom-modal'});
  }

  clearSearch(){
    this.searchText = '';
    this.search(this.searchText);
  }

  search(term: string) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  importDPI(input) {
    this.closeModal();
    if (input && input.target.files && input.target.files[0]) {
      if (input.target.files[0].name.split(".").pop() !== 'xml') {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Please upload XML file'];
        this.openInfoModal(false);
        return;
      }
      this.loading = true;
      const file = input.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const file = event.target.result;
        this.importDpiSubs = this.apiService.importApplicationGroupDPI(file, '0x17').subscribe(res=> {
          this.isRerender = true;
          const filename = `${Math.floor(new Date().getTime() / 1000)}.csv`;
          const blob = new Blob([res], { type: 'text/csv' });
          this.loading = false;
          saveAs(blob, filename);
          this.applicationGroupsCombined();
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
        })
      };
      reader.onerror = (error) => {
        console.log('errir => ', error)
      };
  
      reader.readAsText(file);
    }
  }
  // importExportDpi(){
  //   this.modalRef = this.dialogService.open(this.importExportDPIModal, { backdrop: 'static',windowClass:'create-custom-modal ie-custom-modal'});
  // }
  updateSelectAllCheckbox(): void {
    const selectAllCheckbox = document.getElementById('selectDeselectAll') as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.disabled = !this.isAnyCheckboxAvailable();
    }
  }
  isAnyCheckboxAvailable() {
    return document.querySelectorAll('.test_check').length;
  }

  hideDpiAsm() {
    this.orgInfoSub = this.endpointManagementService.getOrg(this.ORG_ID).subscribe((res: any) => {
      if (res && res?.useAsmApplications) {
        this.hideDpiAsmfeatures = true;
      } else {
        this.hideDpiAsmfeatures = false;

      }

    })

  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
