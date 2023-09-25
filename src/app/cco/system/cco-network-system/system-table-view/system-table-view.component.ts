import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from './../../../../../app-services/translate.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { Observable, Subject, forkJoin, of, throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcoSystemService } from '../../services/cco-system.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import * as $ from 'jquery';
import { debuglog } from 'util';
import { NfainventoryService } from 'src/app/cco/health/pon-utilization/service/nfainventory.service';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-system-table-view',
  templateUrl: './system-table-view.component.html',
  styleUrls: ['./system-table-view.component.scss']
})
export class SystemTableViewComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('showProbeStatusModal', { static: true }) private showProbeStatusModal: TemplateRef<any>;
  @ViewChild('deleteSuccessModal', { static: true }) private deleteSuccessModal: TemplateRef<any>;

  @ViewChild('disconnectModal', { static: true }) private disconnectModal: TemplateRef<any>;
  @ViewChild('disconnectSuccessModal', { static: true }) private disconnectSuccessModal: TemplateRef<any>;

  @ViewChild('connectModal', { static: true }) private connectModal: TemplateRef<any>;
  @ViewChild('connectingModal', { static: true }) private connectingModal: TemplateRef<any>;
  @ViewChild('connectSuccessModal', { static: true }) private connectSuccessModal: TemplateRef<any>;

  @ViewChild('forceSyncModal', { static: true }) private forceSyncModal: TemplateRef<any>;
  @ViewChild('forceSyncSuccessModal', { static: true }) private forceSyncSuccessModal: TemplateRef<any>;
  @ViewChild('devicesAlarmforceSyncPopup', { static: true }) private devicesAlarmforceSyncPopup: TemplateRef<any>;

  @ViewChild('enableDisableIpfixModal', { static: true }) private enableDisableIpfixModal: TemplateRef<any>;
  @ViewChild('enableDisableIpfixSuccessModal', { static: true }) private enableDisableIpfixSuccessModal: TemplateRef<any>;
  communicationStates = [
    {
      name: 'All',
      value: ''
    },
    {
      name: 'CONNECTION_IN_PROGRESS',
      value: 'CONNECTION_IN_PROGRESS'
    },
    {
      name: 'CONNECTED',
      value: 'CONNECTED'
    },
    {
      name: 'DISCONNECTED',
      value: 'DISCONNECTED'
    },
    {
      name: 'UNKNOWN',
      value: 'UNKNOWN'
    }
  ];

  ipfixStates = [
    {
      name: 'All',
      value: ''
    },
    {
      name: 'CONFIGURED',
      value: 'CONFIGURED'
    },
    {
      name: 'IN_PROGRESS',
      value: 'IN_PROGRESS'
    },
    {
      name: 'NOT_CONFIGURED',
      value: 'NOT_CONFIGURED'
    },
    {
      name: 'PENDING',
      value: 'PENDING'
    },
    {
      name: 'UNSUPPORTED',
      value: 'UNSUPPORTED'
    },
    {
      name: 'DISABLED',
      value: 'DISABLED'
    }
  ];

  geoLocationOptions = [
    {
      name: 'All',
      value: ''
    },
    {
      name: 'Available',
      value: 'exist'
    },
    {
      name: 'Unavailable',
      value: 'missing'
    }
  ];

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  deleteId = '';
  tableCounts: any;
  closeModal: string;
  addUrl = [];

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'tipr',
    ordering: false,
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      // if (total <= length) {
      //   $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      // }
    }
  };
  dtInstance: Promise<DataTables.Api>;
  frTable: DataTables.LanguageSettings;
  tableData: any = [];
  empty = {
    serielNumber: '',
    type: '',
    model: '',
    name: '',
    region: '',
    location: '',
    connection_status: '',
    software_version: ''
  }
  exportEventSubs: any;
  servicePlans = [];
  servicePlanSelected = '1G';
  tableData1: any;
  systemdata: any;
  subscriberData: any;
  servicedata: any;
  tabledatass: {};
  data: any;
  systemdata1: any;

  listObs: any;
  list: any = [];
  loading = false;
  modalRef: any;

  dataAvailable = false;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  isRerender = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  hasScopeAccess = false;
  deleteScope = false;
  disconnectScope = false;
  hasWriteAccess = false;
  isProbeStatus = false;
  probeStatus = '';
  probeStatusUpdatedTime: any = '';
  connectName: any;
  connectId: any;
  modalLoader: boolean;
  message: any;
  states: any = [];
  stateSelected = '';

  filtersForm: any;

  isForceSyncInprogress = false;
  isDisconnectInprogress = false;
  errors = {
    forceSync: {
      message: '',
      error: false
    },
    disconnect: {
      message: '',
      error: false
    },
    connect: {
      message: '',
      error: false
    },
    enableDisableIpfix: {
      message: '',
      error: false
    }
  }

  showRegion = true;
  showLocation = true;
  redrirectUrl = "";
  geoMapIssue = 'false';
  oltNameFilter$: any;
  sortBy = undefined;
  sortType = undefined;
  forceSyncOptions = [
    {
      name: 'Systems',
      value: 'devices',
      checked: true
    },
    {
      name: 'Alarms',
      value: 'alarms',
      checked: false
    }
  ];
  selectedForceSync = "devices";
  deviceAlarmsForceSyncData: any;
  forceSyncMsg: string;
  isDev: boolean = false;
  forceSyncType: string;
  isAxosPage = false;
  constructor(
    private translateService: TranslateService,
    private modalService: NgbModal,
    private ccoCommonService: CcoCommonService,
    private commonOrgService: CommonService,
    private service: CcoSystemService,
    private exportExcel: ExportExcelService,
    private router: Router,
    private http: HttpClient,
    private dateUtilsService: DateUtilsService,
    private issueService: IssueService,
    private dialogService: NgbModal,
    private route: ActivatedRoute,
    private sso: SsoAuthService,
    private NfaService: NfainventoryService,
    private fb: FormBuilder,
    private chref: ChangeDetectorRef,
    private titleService: Title
  ) {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;

    this.ccoCommonService.currentPageAdder('system-table-view');
    this.frTable = this.translateService.fr;
    this.ipfixStates.sort((a, b) => a.name > b.name ? 1 : -1);
  }

  allowAddSystems = true;
  languageSubject;
  language: any;
  submitted = false;

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      type: '',
      region: 'All',
      location: 'All',
      // state: '',
      name: '',
      communicationState: '',
      configState: '',
      faultState: '',
      ipfixState: '',
      geoLocationInfo: '',
      macAddress: ['', [macValidator.bind(this)]],
    });

    this.route.queryParams.subscribe((params: any) => {
      this.redrirectUrl = params['redirect'] ? params.redirect : null;
      this.geoMapIssue = params['geoMapIssue'] && params.geoMapIssue == 'true' ? params.geoMapIssue : 'false';

      if (this.geoMapIssue == 'true') {
        let issuesGeoMapFilters = this.issueService.getGeomapAppliedFilters();
        this.filtersForm?.get('type').setValue('OLT');
        this.filtersForm?.get('name').setValue(issuesGeoMapFilters['oltName'] ? issuesGeoMapFilters['oltName'] : '');
        this.filtersForm?.get('region').setValue(issuesGeoMapFilters['region']['region_uuid'] ? issuesGeoMapFilters['region']['region_uuid'] : 'All');
        this.loadLocationValue('');
        // setTimeout(() => {
        this.filtersForm?.get('location').setValue(issuesGeoMapFilters['location']['networkgroup_uuid'] ? issuesGeoMapFilters['location']['networkgroup_uuid'] : 'All');
        // }, 200);
      }
    })

    this.filtersForm.valueChanges.subscribe((value: any) => {
      this.submitted = false;
    });
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setPageTitle();
      this.tableLanguageOptions();
      this.getCount();
    });

    this.setPageTitle();

    this.exportEventSubs = this.ccoCommonService.ccoPageExport.subscribe(data => {
      if (data && data == 'network-system-table-list') {
        this.export();
      }

    });

    this.servicePlans = [
      {
        name: '1G', value: '1G'
      },
      {
        name: '2G', value: '2G'
      },
      {
        name: '3G', value: '3G',
      },
      {
        name: '4G', value: '4G'
      }
    ];

    if (window.location.href?.indexOf('system-onboarding/cms-exa/list') !== -1) {
      this.types = [
        {
          name: 'All',
          value: ''
        },
        {
          name: 'MGMT_SYSTEM',
          value: 'MGMT_SYSTEM'
        },
        {
          name: 'OLT',
          value: 'OLT'
        }
      ];
    } else {
      this.types = [
        {
          name: 'All',
          value: ''
        },
        {
          name: 'OLT',
          value: 'OLT'
        },
        {
          name: 'ROUTER',
          value: 'ROUTER'
        }
      ];
    }


    this.states = [
      {
        name: 'All',
        value: ''
      },
      {
        name: 'PARTIALLY_SYNCHRONIZED',
        value: 'PARTIALLY_SYNCHRONIZED'
      },
      {
        name: 'SYNCHRONIZED',
        value: 'SYNCHRONIZED'
      },
      {
        name: 'SYNCHRONIZE_IN_PROGRESS',
        value: 'SYNCHRONIZE_IN_PROGRESS'
      },
      {
        name: 'UNKNOWN',
        value: 'UNKNOWN'
      },
      {
        name: 'UNSYNCHRONIZED',
        value: 'UNSYNCHRONIZED'
      }
    ];

    if (history?.state?.state === 'SYNCHRONIZED') {
      this.filtersForm.get('configState').setValue('UNSYNCHRONIZED')
      // this.filtersForm = this.fb.group({
      //   type: '',
      //   region: 'All',
      //   location: 'All',
      //   name: '',
      //   //state: 'SYNCHRONIZED' TODO HERE
      //   configState: '',
      //   communicationState: '',
      //   faultState: '',
      //   ipfixState: '',
      //   geoLocationInfo: ''
      // });
    }

    if (window.location.href?.indexOf('/system-onboarding/axos-callhome/axos/list') !== -1) {
      this.isAxosPage = true;
    }

    let scopes = this.sso.getScopes();
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowAddSystems = false;
    }

    if (environment.VALIDATE_SCOPE && window.location.href.indexOf('/cco/operations/system-onboarding') !== -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        if (window.location.href?.indexOf('/system-onboarding/cms-exa/list') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.cmsexacallhome']?.length) {
          this.hasScopeAccess = true;
        } else if (window.location.href?.indexOf('/system-onboarding/axos-callhome/axos/list') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems']?.length) {
          this.hasScopeAccess = true;
        }

        if (window.location.href?.indexOf('/system-onboarding/cms-exa/list') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.cmsexacallhome']?.indexOf('write') !== -1) {
          this.hasWriteAccess = true;
        } else if (window.location.href?.indexOf('/system-onboarding/axos-callhome/axos/list') !== -1 && scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems']?.indexOf('write') !== -1) {
          this.hasWriteAccess = true;
        }
      }

    } else {
      this.hasScopeAccess = true;
      this.hasWriteAccess = true;
      this.deleteScope = true;
      this.disconnectScope = true;
    }

    if (!this.hasScopeAccess) {
      return;
    }

    if (window.location.href.indexOf('/systemAdministration/cco-admin/') !== -1) {
      this.addUrl = ['/systemAdministration/cco-admin/network-systems/add'];
    } else if (window.location.href.indexOf('/organization-admin/cco-admin/') !== -1) {
      this.addUrl = ['/organization-admin/cco-admin/network-systems/add'];
    } else {
      this.addUrl = ['/cco/system/cco-network-system/add'];
    }

    this.oltNameFilter$ = this.filtersForm?.get('name').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((val) => this.getCount())
    ).subscribe();

    let networkSystemsListFilters = history.state && history.state.networkSystemsListFilters ? JSON.parse(history?.state?.networkSystemsListFilters) : [];

    if (networkSystemsListFilters && this.geoMapIssue != 'true' && networkSystemsListFilters['preFill'] == true) {
      this.filtersForm?.patchValue({
        type: networkSystemsListFilters['type'] || '',
        region: networkSystemsListFilters['region'] || 'All',
        location: 'All',
        // name: networkSystemsListFilters['name'] || '',
        //state: networkSystemsListFilters['location'] || ''
        communicationState: networkSystemsListFilters['communicationState'] || '',
        configState: networkSystemsListFilters['configState'] || '',
        faultState: networkSystemsListFilters['faultState'] || '',
        ipfixState: networkSystemsListFilters['ipfixState'] || ''
      });

      //patch name value
      let emitNameSubscription = false;
      if (networkSystemsListFilters['name']) {
        emitNameSubscription = true;
      }
      this.filtersForm?.get('name').setValue(networkSystemsListFilters['name'], { emitEvent: emitNameSubscription });

      this.loadLocationValue('');
      this.filtersForm?.get('location').setValue(networkSystemsListFilters['location'] || 'All');
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    this.validateType();

    this.getRegions();

    this.getCount();


  }

  regionsSubject: any;
  locationsSubject: any;
  regionsDataArray = ["All"];
  locationDataArray = ["All"];
  regionName = '';
  getRegions() {
    let query = '';
    if (window.location.href?.indexOf('system-onboarding/cms-exa/list') !== -1) {
      query += 'excludeAxosSystem=true';
    } else {
      query += 'excludeMgmtSystem=true';
    }

    this.regionsSubject = this.http.get(`${environment.API_BASE_URL}nfa/regions?tenant=0&${query}`)
      .subscribe((res: any) => {
        if (res && res.length) {
          res.forEach((element: any) => {
            if (this.findObjectsCountByValue(res, element.name) > 1) {
              let fqn = '';
              if (element.fqn) {
                let tmp = element['fqn'].split(',');
                if (tmp.length) {
                  let deviceName = tmp[0];
                  if (deviceName) {
                    let arr = deviceName.split('=');
                    if (arr.length && arr[1]) {
                      fqn = arr[1];
                    }
                  }
                }
              }
              element['tempName'] = `${element.name} ${fqn ? `(${fqn})` : ''}`;
            } else {
              element['tempName'] = element.name;
            }
          });

          res.forEach((element: any) => {
            element['name'] = element.tempName;
          });
        }

        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        this.regionsDataArray = [...this.regionsDataArray, ...res];

      }, (error) => {
        this.pageErrorHandle(error);
      })
  }

  loadLocationValue(event: any) {
    let id = this.filtersForm?.get('region')?.value;
    this.filtersForm?.get('location').setValue('All');
    this.locationDataArray = ["All"];
    if (id && id != 'All') {
      this.locationsSubject = this.NfaService.GetLocations(id).pipe(
        map((res: any) => {
          res = this.issueService.appendFqn(res);
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          return res;
        }),
        catchError(this.handleError))
        .subscribe((res: any) => {
          this.locationDataArray = [...this.locationDataArray, ...res];
        }, (error) => {
        })
    }
    // this.regionsDataArray.forEach((element: any) => {
    //   if (element.id == this.regionSelected) {
    //     this.regionName = element.name;
    //   }
    // })

    if (id == 'All') {
      this.locationDataArray = ["All"];
    }
  }


  triggerModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `${this.language['Closed_with']}: ${res}`;
    }, (res) => {
      this.closeModal = `${this.language['Dismissed']} ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return `${this.language['by_pressing_ESC']}`;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return `${this.language['by_clicking_backdrop']}`;
    } else {
      return `${this.language['with']}: ${reason}`;
    }
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (rerender) {
      this.rerender();
    } else {
      this.dtTrigger.next();
    }

    setTimeout(() => {
      this.dataAvailable = true;
    }, 800)
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    }); 
  }



  export() {
    let name = this.ccoCommonService.generateExportName('systems');
    let exportData = this.ccoCommonService.exportDataConvertor(this.tableData);
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData);
    } else {
      this.exportExcel.downLoadCSV(name, [this.empty]);
    }

  }
  gotoSystem(stateparams: { SN: any }) {
    this.router.navigate(['../cco-add-new-system' + '/' + stateparams.SN], { relativeTo: this.route });
  }

  updateService() {
    this.closeAllModal();
    //console.log('updated')
  }

  closeAllModal() {
    this.modalService.dismissAll();
  }

  goToSystemDetails(stateparams: { SN: any }) {

    this.router.navigate(['../system-details' + '/' + stateparams.SN], { relativeTo: this.route });
  }


  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.loading = false;
  }

  getApiError(err: HttpErrorResponse) {
    if (err.status == 401) {
      return this.language['Access Denied'];
    } else {
      return this.commonOrgService.pageErrorHandle(err);
    }
  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.deleteError = '';
    this.errors['forceSync'].error = false;
    this.errors['disconnect'].error = false;
    this.errors['connect'].error = false;
  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  cancelDelete() {
    this.deleteId = '';
  }

  ngOnDestroy() {
    if (this.listObs) {
      this.listObs.unsubscribe();
    }

    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.exportEventSubs) this.exportEventSubs.unsubscribe();
    if (this.oltNameFilter$) {
      this.oltNameFilter$.unsubscribe();
    }
  }

  deleteName = '';
  deleteError = '';
  delete(id, name) {
    this.deleteError = '';
    this.deleteId = id;
    this.deleteName = name;

    if (this.modalRef) {
      this.close();
    }
    this.modalRef = this.dialogService.open(this.deleteModal, {
      windowClass: 'custom-alert-modal',
    });

  }


  disconnectName = '';
  disconnectId = '';
  disconnect(id, name) {
    this.errors['disconnect'].error = false;
    this.errors['disconnect'].message = '';
    this.isDisconnectInprogress = false;
    this.disconnectId = id;
    this.disconnectName = name;

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.disconnectModal);

  }
  connect(id, name) {
    this.errors['connect'].error = false;
    this.errors['connect'].message = '';
    this.modalLoader = false;
    this.connectId = id;
    this.connectName = name;

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.connectModal);

  }

  forceSynctName = '';
  forceSyncId = '';
  forceSyncWarnMessage = '';
  forceSync(data) {
    this.forceSyncType = '';
    this.errors['forceSync'].error = false;
    this.errors['forceSync'].message = '';
    this.isForceSyncInprogress = false;
    this.forceSyncId = data.uuid;
    this.forceSynctName = data.name;

    if (data?.parentuuid && data?.deviceModel !== 'CMS') {
      this.deviceAlarmsForceSyncData = {};
      this.selectedForceSync = 'devices';
    }

    if (data?.parentuuid) {
      this.forceSyncWarnMessage = this.language['The request will impact system operations and that the activity may take up to 2 hours'];
    } else if ((!data?.parentuuid && data?.deviceModel !== 'CMS') || data?.type === 'MGMT_SYSTEM') {
      this.forceSyncWarnMessage = this.language['The request will impact system operations and that the activity may take up to 60 mins'];
      // if(data?.type === 'MGMT_SYSTEM'){
      this.forceSyncType = this.selectedForceSync == 'devices' ? 'System' : 'Alarm';
      // }
    } else {
      return;
    }

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.forceSyncModal, { windowClass: 'force-sync-modal' });

  }
  connectingprocess() {
    this.modalRef = this.dialogService.open(this.connectingModal);
    this.modalLoader = true;
    this.doConnect();
  }

  doConnect() {
    this.modalLoader = true;
    this.http.post(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.connectId}/connect`, {}, { responseType: 'text' }).subscribe((json: any) => {
      this.modalLoader = false;
      this.close();
      this.modalRef = this.dialogService.open(this.connectSuccessModal);
      if (json.indexOf("connected") !== -1) {
        this.message = "Connected to " + `${this.connectName}`
      } else {
        this.message = "Failed to connect to " + `${this.connectName}`
      }

      this.connectId = '';
      this.isRerender = true;
      this.getCount();

    }, (err: any) => {
      // this.close();
      // this.pageErrorHandle(err);
      this.modalLoader = false;
      this.errors['connect'].error = true;
      this.errors['connect'].message = this.getApiError(err);
    });
  }

  doDisconnect() {
    this.isDisconnectInprogress = true;
    this.http.post(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.disconnectId}/disconnect`, {}, { responseType: 'text' }).subscribe((json: any) => {
      this.close();
      this.modalRef = this.dialogService.open(this.disconnectSuccessModal);
      this.disconnectId = '';
      this.isRerender = true;
      this.getCount();

    }, (err: any) => {
      //this.close();
      //this.pageErrorHandle(err);
      this.errors['disconnect'].error = true;
      this.errors['disconnect'].message = this.getApiError(err);
    });
  }

  doForceSync() {
    if ((this.deviceAlarmsForceSyncData?.type === "MGMT_SYSTEM" || (!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS')) && this.selectedForceSync == 'alarms') {
      this.doCMSAlarmForceSync();
      return;
    }
    this.isForceSyncInprogress = true;
    this.http.put(`${environment.API_BASE_URL}cnap/invmgr/sync/${this.forceSyncId}/full-forced-sync-from-device`, {}, { responseType: 'text' }).subscribe((json: any) => {
      this.http.get(`${environment.API_BASE_URL}nfa/systems/details/${this.forceSyncId}`).subscribe((json: any) => {
        if (json?.cmSyncStatus) {
          document.getElementById(`cmSyncFunction-${this.forceSyncId}`).innerHTML = json?.cmSyncStatus;
          let deviceObj = this.list.find(el => el['uuid'] == this.forceSyncId);
          if (deviceObj) {
            deviceObj['cmSyncStatus'] = json && json.cmSyncStatus ? json.cmSyncStatus : deviceObj['cmSyncStatus'];
          }
          this.canAllowForceSync();
        }
        this.isForceSyncInprogress = false;
      }, (err: any) => {
        this.isForceSyncInprogress = false;
        //todo
      }, () => {
        this.close();
        this.forceSyncMsg = 'Force Sync Initiated Successfully';
        this.isForceSyncInprogress = false;
        this.modalRef = this.dialogService.open(this.forceSyncSuccessModal,);
        this.forceSyncId = '';
      });
    }, (err: any) => {
      this.isForceSyncInprogress = false;
      this.errors['forceSync'].error = true;
      this.errors['forceSync'].message = this.getApiError(err);
    });

  }

  doCMSAlarmForceSync() {
    //disable CNAP device force sync
    //AXOS devices
    // if((!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS')){

    // } else 
    // if(this.deviceAlarmsForceSyncData?.type === "MGMT_SYSTEM"){

    this.isForceSyncInprogress = true;
    let apiUrl = '';
    //CMS devices
    if (!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS') {
      apiUrl = `analytics-engine/${this.deviceAlarmsForceSyncData['uuid']}/forcesync`
    } else {
      apiUrl = `exa-alarm/notifications/${this.deviceAlarmsForceSyncData['uuid']}/forcesync`
    }

    this.http.post(`${environment.API_BASE_URL}${apiUrl}`, {}).subscribe((status: any) => {
      // disable devices forcesync if alarm force sync in progress
      if (!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS') {
        this.refresh(this.deviceAlarmsForceSyncData['uuid'], this.deviceAlarmsForceSyncData);
      } else {
        this.getAlarmForceSyncStatus(this.deviceAlarmsForceSyncData['uuid']);
      }

      if (status?.message?.status != 'COMPLETE' || status?.message?.status != 'FORCE_SYNC_COMPLETED') {
        let alarmsFS = this.forceSyncOptions.filter((el) => el['value'] == 'devices');
        alarmsFS['disabled'] = true;
        this.close();
        this.forceSyncMsg = 'Force Sync Initiated Successfully';
        this.modalRef = this.dialogService.open(this.forceSyncSuccessModal,);
      } else if (status?.message?.status == 'COMPLETE' || status?.message?.status == 'FORCE_SYNC_COMPLETED') {
        this.close();
        this.forceSyncMsg = 'Force Sync Completed Successfully';
        this.modalRef = this.dialogService.open(this.forceSyncSuccessModal,);
      }
      this.isForceSyncInprogress = false;
    }, (err: any) => {
      this.isForceSyncInprogress = false;
      this.errors['forceSync'].error = true;
      if (err?.status == 503) {
        err['error'] = {};
        err['error']['errorMessage'] = err?.message || err?.statusText;
        this.errors['forceSync'].message = this.getApiError(err);
        return;
      }

      // if(!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS'){
      // this.errors['forceSync'].message = err?.message?.displayText
      // }else{
      // err['message'] = err?.error?.message?.displayText;
      err['error']['errorMessage'] = err?.error?.message?.displayText;
      this.errors['forceSync'].message = this.getApiError(err);
      // }
      // this.pageErrorHandle(err);
    });
    // }
  }
  //simulate errors
  // getData(): Observable<Response> {
  //   const error = new HttpErrorResponse({ status: 503 });
  //   return throwError(error) as any;
  // }
  forceSyncPopupOpen(data) {
    this.errors['forceSync'].error = false;
    this.errors['forceSync'].message = '';
    this.selectedForceSync = "devices";
    this.forceSyncOptions.forEach((el) => {
      el['disabled'] = false;
    })

    //disable functionalities
    // disable alarm forcesync
    // if (data?.cmSyncStatus != 'SYNCHRONIZED') {
    //   let alarmsFS = this.forceSyncOptions.find((el) => el['value'] == 'alarms');
    //   this.selectedForceSync = "devices";
    //   alarmsFS['disabled'] = true;
    // }
    // if (data && (data.alarmForceSync && data?.type === "MGMT_SYSTEM" && data.alarmForceSync != 'COMPLETE') || (data.alarmForceSync && !data?.parentuuid && data?.deviceModel !== 'CMS' && data.alarmForceSync != 'FORCE_SYNC_COMPLETED')) {
    //   let alarmsFS = this.forceSyncOptions.find((el) => el['value'] == 'devices');
    //   this.selectedForceSync = "alarms";
    //   alarmsFS['disabled'] = true;
    // }

    this.deviceAlarmsForceSyncData = data;
    // this.dialogService.open(modal);
    // this.modalService.open(modal, { windowClass: 'forceSyncPopup' });
    this.modalRef = this.dialogService.open(this.devicesAlarmforceSyncPopup, { size: 'sm', centered: true, windowClass: 'forceSyncPopup' })
  }

  deviceAlarmForceSync() {
    //checking status and isforcesyncsupported version for CMS devices 
    if (this.selectedForceSync == 'alarms' && this.deviceAlarmsForceSyncData?.type === "MGMT_SYSTEM") {
      this.modalRef.close();
      this.getAlarmForceSyncStatus(this.deviceAlarmsForceSyncData['uuid'], 'doForceSync');
    } else {
      this.forceSync(this.deviceAlarmsForceSyncData);
    }
  }

  close(): void {
    this.modalLoader = false;
    this.modalService.dismissAll();
    this.modalRef.close();
  }

  doDelete() {
    this.http.delete(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.deleteId}`).subscribe((json: any) => {
      this.close();
      this.modalRef = this.dialogService.open(this.deleteSuccessModal);
      this.deleteId = '';
      this.isRerender = true;
      this.getCount();

    }, (err: any) => {
      //this.close();
      this.deleteError = this.commonOrgService.pageErrorHandle(err);
    });
  }

  gotoEdit(id: any) {
    if (window.location.href.indexOf('/systemAdministration/cco-admin/') !== -1) {
      this.router.navigate([`systemAdministration/cco-admin/network-systems/edit/${id}`]);
    } else if (window.location.href.indexOf('/organization-admin/cco-admin/') !== -1) {
      this.router.navigate([`organization-admin/cco-admin/network-systems/edit/${id}`]);
    } else {
      let preFilterForm = { ...this.filtersForm?.value };
      preFilterForm['preFill'] = true;
      this.router.navigate([`cco/system/cco-network-system/edit/${id}`], { state: { networkSystemsListFilters: JSON.stringify(preFilterForm) } });
    }

  }

  probeStatusData: any = {};
  showProbeStatus(id) {
    this.probeStatusData = {};
    this.http.get(`${environment.API_BASE_URL}cnap/invmgr/devices/${id}`).subscribe((json: any) => {
      let cmsid = '';
      if (json?.resourceNameList?.length !== 0) {
        for (var i = 0; i < json.resourceNameList.length; i++) {
          if (json.resourceNameList[i].valueName === 'cmsid') {
            cmsid = json.resourceNameList[i]?.value;
          }
        }
      }

      if (cmsid) {
        this.http.get(`${environment.API_BASE_URL}exa-alarm/CmsProbeStatus?cms_uuid=${id}&cms_id=${this.sso.getSPID()}-${cmsid}`).subscribe((response: any) => {

          if (response.message) {
            if (response.message.status) {
              this.probeStatusData = response.message;
              this.probeStatus = response.message.status;
              this.probeStatusUpdatedTime = new Date(response.message.timestamp * 1000);
              this.isProbeStatus = true;
            } else {
              this.probeStatus = response.message;
              this.isProbeStatus = false;
            }
          } else if (response == 'No cms status') {
            this.probeStatus = response;
            this.isProbeStatus = false;
          }
        }, (err: any) => {
          if (err.statusText == "Not Found") {
            this.probeStatus = "No Data Found";
          }
        }, () => {
          if (this.modalRef) {
            this.close();
          }
          this.modalRef = this.dialogService.open(this.showProbeStatusModal);
        });
      }

    }, (err: any) => {
      this.pageErrorHandle(err);
    });

  }
  refresh(id, systemData?) {
    this.deviceAlarmsForceSyncData = systemData;
    var btn = document.getElementById(`refresh-${id}`);
    btn.children[0].classList.add('spin-animation');
    this.http.get(`${environment.API_BASE_URL}nfa/systems/details/${id}?tenant=0`).subscribe((item: any) => {
      btn.children[0].classList.remove('spin-animation');

      item['name'] = item['name'].replace('device=', '');
      item['name'] = item['name'].replace('DEVICE=', '');

      //$(`#name-${id}`).html(`${item.name ? item.name : ''}`);
      $(`#regionlocation-${id}`).html(`${item.regionName ? item.regionName : ''}${item.locationName ? '/' : ''}${item.locationName ? item.locationName : ''}`);
      $(`#macAddress-${id}`).html(`${item.macAddress ? item.macAddress : ''}`);
      $(`#deviceModel-${id}`).html(`${item.deviceModel ? item.deviceModel : ''}`);
      $(`#swVersion-${id}`).html(`${item.swVersion ? item.swVersion : ''}`);
      $(`#serialNumber-${id}`).html(`${item.serialNumber ? item.serialNumber : ''}`);
      $(`#communicationState-${id}`).html(`${(item.protocolInfos && item.protocolInfos[0] && item.protocolInfos[0].communicationState) ?
        item.protocolInfos[0].communicationState : ''}`);
      let cmSyncFunctionData = ``;
      systemData['cmSyncStatus'] = item && item.cmSyncStatus ? item.cmSyncStatus : systemData.cmSyncStatus;
      cmSyncFunctionData += `<div class="d-inline-flex w-100">${(item.cmSyncStatus) ? item.cmSyncStatus : ''}`;
      if (item?.cmFailMsg) {
        cmSyncFunctionData += `<img data-toggle="tooltip" data-placement="top" title="" id="cmSyncFunctionTitle-${item.uuid}"
                    class="pointer" src="assets/img/tooltip-icon.svg" />`;
      }
      cmSyncFunctionData += `</div>`;

      let fmSyncFunctionData = ``;
      fmSyncFunctionData += `<div class="d-inline-flex w-100" id = "fmSyncFunctionStatus">${(item.fmSyncStatus) ? item.fmSyncStatus : ''}`;

      if (item?.fmFailMsg) {
        fmSyncFunctionData += `<img data-toggle="tooltip" data-placement="top" title="" id="fmSyncFunctionTitle-${item.uuid}"
                    class="pointer" src="assets/img/tooltip-icon.svg" />`;
      }
      fmSyncFunctionData += `</div>`;

      if (item?.type == 'MGMT_SYSTEM' || (!item?.parentuuid && item?.deviceModel !== 'CMS')) {
        fmSyncFunctionData += `<div class="text-grey-status" id="alarmForceSync-${item.uuid}"></div>`;
      }


      document.getElementById(`cmSyncFunction-${id}`).innerHTML = cmSyncFunctionData;
      document.getElementById(`fmSyncFunction-${id}`).innerHTML = fmSyncFunctionData;

      document.getElementById(`cmSyncFunctionTitle-${id}`)?.setAttribute('title', item?.cmFailMsg);
      document.getElementById(`fmSyncFunctionTitle-${id}`)?.setAttribute('title', item?.fmFailMsg);

      let ipfixStatus = document.getElementById(`ipfixExportConfigurationStatus-${id}`);
      if (ipfixStatus) {
        if (item && item.ipfixExportConfigurationStatus) {
          systemData.ipfixExportConfigurationStatus = item.ipfixExportConfigurationStatus;
          ipfixStatus.innerHTML = item.ipfixExportConfigurationStatus;
        }
      }

      if (item?.type == 'MGMT_SYSTEM' || (!item?.parentuuid && item?.deviceModel !== 'CMS')) {
        // this.chref.detectChanges();
        this.getAlarmForceSyncStatus(id)
      }
    }, (err: any) => {
      btn.children[0].classList.remove('spin-animation');
      this.pageErrorHandle(err);
    });
  }


  count: any = 0;
  initLoad = false;
  types: any = [];
  showTable = false;


  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }


  getCount() {
    this.submitted = true;
    if (!this.filtersForm?.valid) {
      return;
    }
    this.loading = true;
    this.initLoad = false;
    this.showTable = false;

    let params = this.filtersForm?.value;
    if (params['region'] === 'All') {
      delete params['region'];
    }

    if (params['location'] === 'All') {
      delete params['location'];
    }

    let query = "";
    for (var key in params) {

      if (!params[key]) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    if (query != "") {
      query += "&";
    }

     if (window.location.href?.indexOf('system-onboarding/cms-exa/list') !== -1) {
      query += 'axos=false';
    } else {
      query += 'axos=true';
    }


    this.http.get(`${environment.API_BASE_URL}nfa/systems/count?${query}`).subscribe((json: any) => {

      this.showTable = true;
      if (json && json.count) {

        this.count = json.count;
 
        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList();
        }
      } else {
        this.count = 0;
        this.list = [];
        this.getList();
      }
    }, (err: any) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }


  getList() {
    let params = this.filtersForm?.value;
    if (params['region'] === 'All') {
      delete params['region'];
    }

    if (params['location'] === 'All') {
      delete params['location'];
    }

    params['tenant'] = '0';

    let query = "";
    for (var key in params) {

      if (!params[key]) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    if (window.location.href?.indexOf('system-onboarding/cms-exa/list') !== -1) {
      query += '&axos=false';
    } else {
      query += '&axos=true';
    }

    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      //responsive: true,
      serverSide: true,
      processing: false,
      searching: false,
      lengthChange: false,
      ordering: true,
      //scrollX: true,
      dom: 'tipr',
      order: [],
      columnDefs: [
        { targets: [0, 1, 2, 3, 5, 6, 7], orderable: true },
        { targets: [4, 8, 9, 10, 11], orderable: false },
      ],
      ajax: (dataTablesParameters: any, callback) => {

        let url = `${environment.API_BASE_URL}nfa/systems/details?offset=${dataTablesParameters.start}&limit=${dataTablesParameters.length}&${query}`;

        this.sortBy = dataTablesParameters.order && dataTablesParameters.order.length > 0 ? dataTablesParameters.order[0]?.column : undefined;
        this.sortType = dataTablesParameters.order && dataTablesParameters.order.length > 0 ? dataTablesParameters.order[0]?.dir : undefined;

        let orderBy = parseInt(this.sortBy) == 0 ? 'name' : parseInt(this.sortBy) == 1 ? 'region' : parseInt(this.sortBy) == 2 ? 'address' : parseInt(this.sortBy) == 3 ? 'swVersion' : parseInt(this.sortBy) == 5 ? 'configState' : parseInt(this.sortBy) == 6 ? 'faultState' : parseInt(this.sortBy) == 7 ? 'ipfixState' : undefined;

        if (orderBy) {
          url += `&sortBy=${orderBy}&sortOrder=${this.sortType}`;
        }

        that.http
          .get(url)
          .subscribe((resp: any) => {

            this.loading = false;

            let data = [];
            if (resp && resp.devices) {
              resp['devices'].forEach(element => {
                if (element && element['name']) {
                  element['ui_modified_name'] = element['name'].replace('device=', '');
                  element['ui_modified_name'] = element['ui_modified_name'].replace('DEVICE=', '')
                }

                let communicationState = '';
                if (element.protocolInfos && element.protocolInfos.length) {
                  for (let i = 0; i < element.protocolInfos.length; i++) {
                    if ((element.protocolInfos[i].communicationState)?.toUpperCase() === 'DISCONNECTED') {
                      communicationState = element.protocolInfos[i].communicationState;
                      break;
                    } else {
                      communicationState = element.protocolInfos[i].communicationState;
                    }
                  }
                }

                if (element?.place?.point?.latitude && element?.place?.ufLocation) {
                  element['ui_modified_service_address'] = `${element?.place?.ufLocation}<br>(${element?.place?.point?.latitude}, ${element?.place?.point?.longitude})`;
                  element['ui_modified_service_address_latlong'] = `<b>${element?.place?.ufLocation}</b> <br> (${element?.place?.point?.latitude}, ${element?.place?.point?.longitude})`;
                } else if (element?.place?.point?.latitude && !element?.place?.ufLocation) {
                  element['ui_lat_long_only'] = true;
                  element['ui_modified_service_address'] = `${element?.place?.point?.latitude}, ${element?.place?.point?.longitude}`;
                  element['ui_modified_service_address_latlong'] = `${element?.place?.point?.latitude}, ${element?.place?.point?.longitude}`;
                } else {
                  element['ui_modified_service_address'] = element?.place?.ufLocation;
                  element['ui_modified_service_address_latlong'] = element?.place?.ufLocation ? `<b>${element?.place?.ufLocation}</b>` : '';
                }

                element['ui_modified_communication_state'] = communicationState;

                data.push(element);
              });
            }

            this.list = data;

            // if (resp && resp.devices) {
            //   this.list = resp.devices;
            // } else {
            //   this.list = [];
            // }

            this.initLoad = true;
            this.loading = false;
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.count ? this.count : 0,
              data: []
            });
          }, (err: any) => {
            this.loading = false;
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.count ? this.count : 0,
              data: []
            });
          });
      }, drawCallback: (settings) => {
        if (this.list.some(el => el?.type == 'MGMT_SYSTEM' || (!el?.parentuuid && el?.deviceModel !== 'CMS'))) {
          this.getAlarmForceSyncStatus();
        }

        this.tableLanguageOptions();
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
    this.tableLanguageOptions();
  }
  getAlarmForceSyncStatus(uuid?, type?) {

    if (uuid) {
      let apiUrl = ``;
      if (!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS') {
        apiUrl = `analytics-engine/${this.deviceAlarmsForceSyncData['uuid']}/forcesync`
      } else {
        apiUrl = `exa-alarm/notifications/${this.deviceAlarmsForceSyncData['uuid']}/forcesync`
      }
      this.http.get(`${environment.API_BASE_URL}${apiUrl}`).subscribe((status: any) => {
        if (status) {
          if (type == 'doForceSync') {
            if (status.message && status.message.isForceSyncSupported) {
              this.forceSync(this.deviceAlarmsForceSyncData);
            } else {
              this.errors['forceSync'].error = true;
              this.errors['forceSync'].message = "Notification force sync is not supported for this CMS Probe version. Expected version higher than 'CMSP-R23.1.0'.";
              this.modalRef = this.dialogService.open(this.forceSyncModal, { windowClass: 'force-sync-modal' });
            }
            return;
          }
          let obj = this.list.find(el => el['uuid'] == uuid);
          if (obj) {
            obj['alarmForceSync'] = status?.message?.status;
            obj['alarmForceSyncStatus'] = status?.message?.displayText;

            if (status.message && status.message.time && status.message.time > 0) {
              let dateConv = new Date(Number(status.message.time));

              obj['alarmForceSyncStatus'] = obj['alarmForceSyncStatus'] + " (" + dateConv.toLocaleString() + ")"
            }
            //update Device Alarm Status based on Alarm force sync status because they share same column
            let fmSyncElement = document.getElementById(`fmSyncFunction-${obj?.uuid}`);
            if (fmSyncElement) {
              let innerChild = fmSyncElement.querySelector<HTMLElement>('#fmSyncFunctionStatus');
              if (innerChild) {
                let childNodeElements = innerChild.childNodes;
                if (childNodeElements && childNodeElements.length > 0) {
                  childNodeElements.forEach((nodes) => {
                    if (nodes.nodeName == '#text') {
                      if (status && status.message && status.message.status != '' && ((status.message.status != 'COMPLETE' && obj?.type === "MGMT_SYSTEM"))) {
                        nodes.nodeValue = 'UNSYNCHRONIZED';
                      } else if (obj?.type === "MGMT_SYSTEM") {
                        nodes.nodeValue = obj?.fmSyncStatus;
                      }
                    }
                  });
                }
              }
            }
            //Update Alarm force sync status
            let forceSyncElement = document.getElementById(`alarmForceSync-${uuid}`);
            if (forceSyncElement) {
              forceSyncElement.innerHTML = '';
              forceSyncElement.innerHTML = obj['alarmForceSyncStatus'];
            }
            this.canAllowForceSync();
          }

        } else {
          this.canAllowForceSync();
        }
      }, (err: any) => {
        // if(!this.deviceAlarmsForceSyncData?.parentuuid && this.deviceAlarmsForceSyncData?.deviceModel !== 'CMS'){
        if (!err?.error?.message?.displayText) {
          err.error.message = undefined;
        } else {
          err['error']['errorMessage'] = err?.error?.message?.displayText;
        }
        // err['error']['errorMessage'] = err?.error?.message?.displayText;
        // }
        this.pageErrorHandle(err);
      });

    } else {
      // if(this.list && this.list.length > 0){
      //   this.list.forEach(element => {
      // if(element && element.uuid && element['type'] == 'MGMT_SYSTEM'){
      // element['alarmForceSyncStatus'] = '';
      // let url = `${environment.API_BASE_URL}${apiUrl}`;
      // const apiUrls = [
      //   //this.subscriberService.getActiveSubscriber(orgId),
      //   `${environment.API_BASE_URL}analytics-engine/forcesync`,
      //   `${environment.API_BASE_URL}exa-alarm/notifications/forcesync`,
      //   //this.subscriberService.getSpeedTestFailure(orgId),
      // ];
      const requests: any = {};
      if (this.list.some(el => el?.type == 'MGMT_SYSTEM')) {
        requests['cms'] = this.http.get(`${environment.API_BASE_URL}exa-alarm/notifications/forcesync`).pipe(
          catchError(err => {
            err['api-error'] = true;
            return of(err);
          })
        );
      }

      if (this.list.some(el => !el?.parentuuid && el?.deviceModel !== 'CMS')) {
        requests['axos'] = this.http.get(`${environment.API_BASE_URL}analytics-engine/forcesync`).pipe(
          catchError(err => {
            err['api-error'] = true;
            return of(err);
          })
        );
      }

      forkJoin(requests).subscribe(res => {
        // if (res && res['cms']) {
        this.setAlarmForceSyncMessage(res && res['cms'] ? res['cms'] : undefined, 'cms');
        // }
        // if (res && res['axos']) {
        this.setAlarmForceSyncMessage(res && res['axos'] ? res['axos'] : undefined, 'axos');
        // }
      }, err => {
        if (!err?.error?.message?.displayText) {
          err.error.message = undefined;
        } else {
          err['error']['errorMessage'] = err?.error?.message?.displayText;
        }
        this.pageErrorHandle(err);
      });
      // this.http.get(url).subscribe((data: any) => {
      //   this.setAlarmForceSyncMessage(res[0])
      //   // this.loading = false;
      // }, (err: any) => {
      //   // this.loading = false;
      //   this.pageErrorHandle(err);
      // });
      // }
      // });
      // }
    }

  }
  setAlarmForceSyncMessage(data, type) {
    if (data && data.message && data.message.length > 0 && Array.isArray(data.message)) {
      data.message.forEach((element) => {
        let listObj;
        if (type == 'axos') {
          listObj = this.list.find(el => el['uuid'] == element['deviceId']);
        } else {
          listObj = this.list.find(el => el['uuid'] == element['cmsUUID']);
        }

        if (listObj) {
          listObj['alarmForceSync'] = element?.status;
          element['alarmForceSync'] = element?.status;
          element['alarmForceSyncStatus'] = element['displayText'] ? element['displayText'] : "-";

          if (element['time'] && Number(element['time']) > 0) {
            let dateConv = new Date(Number(element['time']));

            element['alarmForceSyncStatus'] = `${this.language[element['alarmForceSyncStatus']] || element['alarmForceSyncStatus']} ` + " (" + dateConv.toLocaleString() + ")"
          }

          //update Device Alarm Status based on Alarm force sync status because they share same column
          let fmSyncElement = document.getElementById(`fmSyncFunction-${listObj?.uuid}`);
          if (fmSyncElement) {
            let innerChild = fmSyncElement.querySelector<HTMLElement>('#fmSyncFunctionStatus');
            if (innerChild) {
              let childNodeElements = innerChild.childNodes;
              if (childNodeElements && childNodeElements.length > 0) {
                childNodeElements.forEach((nodes) => {
                  if (nodes.nodeName == '#text') {
                    if (element && element.status != '' && ((element.status != 'COMPLETE' && listObj?.type === "MGMT_SYSTEM"))) {
                      nodes.nodeValue = 'UNSYNCHRONIZED';
                    } else if (listObj?.type === "MGMT_SYSTEM") {
                      nodes.nodeValue = listObj?.fmSyncStatus;
                    }
                  }
                });
              }
            }
          }

          // Update Alarm force sync status
          let forceSyncElement = document.getElementById(`alarmForceSync-${listObj?.uuid}`);
          if (forceSyncElement) {
            forceSyncElement.innerHTML = '';
            forceSyncElement.innerHTML = element['alarmForceSyncStatus'];
          }
          // Object.assign(listObj, element);
        }
      });
      this.canAllowForceSync();
      // element['alarmForceSyncStatus'] = status?.message?.status;
      // document.getElementById(`alarmForceSync-${element.uuid}`).innerHTML = status?.message?.status;
    } else {
      this.canAllowForceSync();
    }
  }

  canAllowForceSync() {
    this.list.forEach((data) => {
      data['disableForceSync'] = false;

      if (data?.cmSyncStatus == 'UNSYNCHRONIZED') {
        data['disableForceSync'] = true;
        data['disableForceSyncMsg'] = 'This option is disabled when a system is "UNSYNCHRONIZED".';
        return;
      }
      
      if (data?.ui_modified_communication_state == 'DISCONNECTED') {
        data['disableForceSync'] = true;
        data['disableForceSyncMsg'] = 'This option is disabled when the system is in DISCONNECTED state.';
        return;
      }
      //Axos devices
      if (!data?.parentuuid && data?.deviceModel !== 'CMS') {
        data['disableForceSync'] = false;
        if ((data?.alarmForceSync && data?.alarmForceSync != 'FORCE_SYNC_ERROR' && data?.alarmForceSync != 'FORCE_SYNC_COMPLETED') || (data?.cmSyncStatus != 'SYNCHRONIZED')) {
          data['disableForceSync'] = true;
          data['disableForceSyncMsg'] = 'This option is disabled when a Force Sync action is in progress.';
        }
      }
      //CMS devices
      if (data?.type === 'MGMT_SYSTEM') {
        data['disableForceSync'] = false;
        if ((data?.alarmForceSync && data?.alarmForceSync != 'COMPLETE' && data?.alarmForceSync != 'CANCELED' && data?.alarmForceSync != 'ERROR' && data?.alarmForceSync != 'NA') || data?.cmSyncStatus != 'SYNCHRONIZED') {
          data['disableForceSync'] = true;
          data['disableForceSyncMsg'] = 'This option is disabled when a Force Sync action is in progress.';
        }
      }
    })
  }
  clearFilter() {
    this.filtersForm?.get('region').enable();
    this.filtersForm?.get('location').enable();
    this.locationDataArray = ["All"];
    this.clearSearch('')

    this.filtersForm?.patchValue({
      type: '',
      region: 'All',
      location: 'All',
      name: '',
      //state: ''
      communicationState: '',
      configState: '',
      faultState: '',
      ipfixState: '',
      geoLocationInfo: '',
      macAddress: ''
    });

    this.getCount();

  }

  validateType(): void {
    this.filtersForm?.get("type").valueChanges.subscribe((value: any) => {
      if (value === 'MGMT_SYSTEM') {
        this.filtersForm?.get('region').setValue('All');
        this.filtersForm?.get('location').setValue('All');
        this.filtersForm?.get('region').disable();
        this.filtersForm?.get('location').disable();

        this.locationDataArray = ["All"];
        this.showRegion = false;
        this.showLocation = false;
      } else {
        this.filtersForm?.get('region').enable();
        this.filtersForm?.get('location').enable();

        this.showRegion = true;
        this.showLocation = true;
      }
    })


  }

  findObjectsCountByValue(jsObjects, value: any) {
    let count: any = 0;

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['name'].toLowerCase() == value?.toLowerCase()) {
          count++;
        }
      }
    }


    return count;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  // closeNetworkSystems(){
  //   if (this.redrirectUrl) {
  //     if (this.geoMapIssue == 'true') {
  //       this.issueService.fromMapNavigation(true);
  //     }
  //     this.router.navigate([this.redrirectUrl]);
  //   } 
  // }

  showDetailedView(data: any) {
    data.cmSyncStatus = document.getElementById(`cmSyncFunction-${data.uuid}`)?.innerText;
    localStorage.setItem("calix.network.system.details", JSON.stringify(data));
    let preFilterForm = { ...this.filtersForm?.value };
    preFilterForm['preFill'] = true;
    preFilterForm['isAxos'] = this.isAxosPage;
    this.router.navigate(['/cco/system/cco-network-system/show-details'], { state: { networkSystemsListFilters: JSON.stringify(preFilterForm) } });
  }
  clearSearch(value) {
    this.filtersForm?.get('name').setValue('');
  }

  enableDisableIpfixWarnMessage = '';
  enableDisableIpfixInprogress = false;
  ipfixData: any;
  ipfixStatusMsg: any;
  enableDisableIpfix(data: any, status) {
    this.ipfixStatusMsg = status;
    this.errors['enableDisableIpfix'].error = false;
    this.errors['enableDisableIpfix'].message = '';
    this.enableDisableIpfixInprogress = false;
    this.ipfixData = data;

    if (data?.parentuuid || (!data?.parentuuid && data?.deviceModel !== 'CMS')) {
      this.enableDisableIpfixWarnMessage = this.language['The request will impact system operations and that the activity may take up to 2 hours'];
    } else {
      return;
    }

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.enableDisableIpfixModal, { windowClass: 'force-sync-modal' });

  }

  doEnableDisableIpfix() {
    this.enableDisableIpfixInprogress = true;
    this.ipfixStatusMsg = 'enabled';
    let url = `${environment.API_BASE_URL}cnap/invmgr/pm/ipfix/${this.ipfixData?.uuid}/enable`;
    if (this.ipfixData?.ipfixExportConfigurationStatus === 'CONFIGURED') {
      this.ipfixStatusMsg = 'disabled';
      url = `${environment.API_BASE_URL}cnap/invmgr/pm/ipfix/${this.ipfixData?.uuid}/disable`;
    }
    let that = this;
    that.http.post(url, {}, { responseType: 'text' }).subscribe((json: any) => {
      that.http.get(`${environment.API_BASE_URL}nfa/systems/details/${that.ipfixData?.uuid}`).subscribe((json: any) => {
        if (json?.cmSyncStatus) {
          document.getElementById(`ipfixExportConfigurationStatus-${that.ipfixData?.uuid}`).innerHTML = json?.ipfixExportConfigurationStatus;
        }
      }, (err: any) => {
        //todo
      }, () => {
        that.close();
        that.modalRef = that.dialogService.open(that.enableDisableIpfixSuccessModal,);
        that.ipfixData = undefined;
        this.isRerender = true;
        this.getCount();
      });
    }, (err: any) => {
      that.errors['enableDisableIpfix'].error = true;
      that.errors['enableDisableIpfix'].message = that.getApiError(err);
    });
  }
  get formControls() { return this.filtersForm.controls; }

  setPageTitle() {
    if (window.location.href?.indexOf('/system-onboarding/cms-exa/list') !== -1) {
      this.titleService.setTitle(`CMS/EXA Systems - ${this.language['System Onboarding']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else if (window.location.href?.indexOf('/system-onboarding/axos-callhome/axos/list') !== -1) {
      this.titleService.setTitle(`Systems - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }
}



export function macValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value) {
    return null;
  }

  if (!(/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(control?.value)) {
    return { 'invalidId': true };
  }

  return null;

}

