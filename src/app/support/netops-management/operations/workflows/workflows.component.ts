import { HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { DataServiceService } from 'src/app/support/data.service';
import { FilesListModel, requestType } from 'src/app/support/netops-management/operations/model/files-list.model';
import { Subject } from 'rxjs';
import { getSwFileList } from 'src/app/support/netops-management/operations/services/endpoint';
import { FileService } from 'src/app/support/netops-management/operations/services/files.service';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { AcessModifiers, CheckScopes, SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { NetopsServiceService } from '../../netops-management.service';
import { HSIModel, WifiSsidExos } from 'src/app/cco-foundation/cco-foundation-model/hsi.model';
import { HSIService } from 'src/app/cco-foundation/cco-foundation-service/hsi.service';
import { TimeZone, TimeZoneValues } from 'src/app/cco-foundation/cco-foundation-service/util';
import * as jquery from 'jquery';
import { FilesModel } from '../model/files.model';
import { FileResponseModel } from '../model/file-response.model';
import { exosModuleMap, ModuleMap } from '../services/utility-class';
import { DEFAULT_VALUE } from 'src/app/support/shared/service/utility.class';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('initOnboardingModel', { static: true }) private initOnboardingModel: TemplateRef<any>;

  orgId;
  count: number;
  language: any;
  foundWorkData: any;
  wifiSsidExosType: any;
  submitWorflow: boolean = false;
  ssidMandatory: boolean = false;
  public showSuccess: boolean = false;
  public showSummaryStep: boolean = false;
  public successMsg: string;
  enabletoggle: boolean = true;
  enable_toggle: boolean = false;
  subnetDeleteModalRef: boolean = false;
  softwareImageOfficial: boolean = false;
  isEditSSid: boolean = false;
  public errorMsg: string;
  public showError: boolean = false;
  fileRequired: boolean = false;
  scopeFlag: any = {};
  showWarning;
  modalInfo;
  showWorkflow: boolean = true;
  showIobFlow: boolean = false;
  inibttndisabled: boolean = false;
  ibfEditFlag: boolean = false;
  defaultEnable: boolean = false;
  showErrorini: boolean = false;
  public dtOptions: DataTables.Settings = {};
  private subnetConfigUrl = `${environment[`SUPPORT_URL`]}/netops-subnet/subnet`;
  pageAvailable: boolean = false;
  public subnetList: any[];
  private httpParam: HttpParams;
  public selectedSubnetObj: any;
  hsiModel: HSIModel;
  hsiModelDis: any;
  swConfrmMsg: string;
  selectedSSID: WifiSsidExos = new WifiSsidExos();
  timeZone = TimeZone;
  timeZoneValues = TimeZoneValues;
  selectedTimeZone: any;
  isRerender: boolean = false;
  loading: boolean = true;
  showSecureAcces: boolean = false;
  status: boolean = false;
  dataAvailable: boolean;
  showDetailspage: boolean
  wrkflwTableData: any = [];
  WfData: any = [];
  wrkflowDtl: any;
  deleteSubs: any;
  suspendSubs: any;
  resumeSubs: any;
  resumedata: any;
  deletedata: any;
  suspenddata: any;
  error: boolean;
  success: boolean;
  warning: boolean
  delete: boolean
  inprpwarn: boolean
  errorInfo: string = '';
  successInfo: string = '';
  warningInfo: string = '';
  deleteInfo: string = '';
  inprpwarnInfo: string = '';
  tableCounts;
  wfCount: number;
  uniqueimagename: any;
  uniqueimageoldname: any;
  secretEyeIcon: boolean = false
  softwareTableOptions: DataTables.Settings = {}
  // workFlowtableOptions: DataTables.Settings = {}
  workFlowtableOptions: DataTables.Settings = {
    paging: false,
    searching: false,
    info: false,
    ordering: true,
    serverSide: true,
    processing: false,
    responsive: true,
    order: [],
    dom: 'tipr',
    columnDefs: [
      { targets: [0, 1, 2, 3, 4], orderable: true, searchable: false },
      { targets: 5, orderable: false }
    ],
  };
  type: any;
  type1: any;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject<any>();
  frTable: any;
  esTable: any;
  germanTable: any;
  datatableVisible: boolean = false;
  hasWriteAccess: boolean = false;
  translateSubscribe: any;
  allwrkflowSubscribe: any;
  wrkflowDtlSubscribe: any;
  sysAdminRoute: string = 'systemAdministration';
  modalRef: any;
  resume: boolean
  languageSubject: any;
  loader: boolean;
  showNetops = false;
  Shown: boolean;
  enable1: boolean;
  softwareImageObj: FilesListModel[] = [];
  dataCount: any;
  countReceived: boolean;
  officialImage: boolean = false;
  officialImageId: FilesListModel;
  swLoading: boolean = false;
  validateScopeStage: boolean = false;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  workflowId
  getWorkflowData
  workflowData
  getDeviceGrpData
  deviceData
  deviceArray
  startDateTime: Date
  windowlength
  frequency
  noOfDays
  customEndRange
  tableRevOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    paging: false,
    ordering: false,
    dom: 't'
  };
  weekdays = []
  prioritizeCheckBox: boolean = false;
  baseUrl = "";
  hasScopeAccess = false;
  HideModel: boolean;
  worFlowdata: any;
  enableMyCommunity: boolean;
  newwrkstate: boolean = false;
  activeSortElement: any;
  flowLimited_readOnly: boolean = false;
  constructor(
    private commonOrgService: CommonService,
    public router: Router,
    private service: DataServiceService,
    private customTranslateService: CustomTranslateService,
    private api: NetopsServiceService,
    private modalService: NgbModal,
    private http: HttpClient,
    private httpService: ApiService,
    private fileService: FileService, private authService: SsoAuthService,
    private hsiService: HSIService,
    private sso: SsoAuthService,
    private dialogService: NgbModal, public ssoAuthService: SsoAuthService,
    private translateService: TranslateService, private titleService: Title
  ) {
    let entitlement = this.sso.getEntitlements();
    this.enableMyCommunity = (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222 || entitlement['223']?.apptype === 223)) ? true : false;
    // flow limited only for operations
    this.flowLimited_readOnly = (this.router.url.includes('cco/operations') && entitlement && (entitlement[210] && !entitlement[102])) ? true : false;

    //this.orgId = this.sso.getOrgId();
    // this.language = this.customTranslateService.defualtLanguage;
    // if (this.language) {
    //   this.pageAvailable = true
    // }
    // this.translateSubscribe = this.customTranslateService.selectedLanguage.subscribe(data => {
    //   this.language = data;
    //   this.dataAvailable = false;
    //   this.loading = true;
    //   this.isRerender = true;
    //   this.showDetailspage = false
    //   // this.setTableOptions('language');
    // });
    this.orgId = this.sso.getOrgId();
    this.hsiModel = new HSIModel();
    // this.GetWorkFlowCount();
    this.HideModel = window.localStorage.getItem("HideModel") ? true : false
    this.getWrkflwData();
    this.commonOrgService.currentPageAdder('workflow');
    this.frTable = this.customTranslateService.fr;
    this.esTable = this.customTranslateService.es;
    this.germanTable = this.translateService.de_DE
    this.sysAdminRoute = environment.SYS_ADMIN_ROUTE;
  }

  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Operations']}  - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/operations/configuration')) {
      //this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Operations']} - ${this.language['Subscriber_Operations']} - ${this.language['Operations']} - ${this.language['Operations']}  -  ${this.language['Calix Cloud']}`);
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Workflows']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit() {
    this.initialTableOptions()
    // this.titleService.setTitle('Calix Cloud - Operations - Workflows');
    let scopes = this.sso.getScopes();
    this.closeAlert();
    this.tableLanguageOptions();

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url);
      this.deleteInfo = `${this.language.workflowDeleteInfo(this.deletedata.name)}?`

      this.tableLanguageOptions();
      //this.rerender();
    });
    this.setTitle(this.router.url);
    let base = `${environment.API_BASE}`;
    this.baseUrl = base;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.validateScopeStage = true;
    } else this.validateScopeStage = false;
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration/workflows')) {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.sso.getScopes();
        scopes['cloud.rbac.csc.netops.operations.workflow'] = scopes['cloud.rbac.csc.netops.operations.workflow'] ? scopes['cloud.rbac.csc.netops.operations.workflow'] : [];
        if (scopes['cloud.rbac.csc.netops.operations.workflow'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.csc.netops.operations.workflow'] && scopes['cloud.rbac.csc.netops.operations.workflow'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/operations/configuration/workflows')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.operations.configuration.workflows'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.operations.configuration.workflows']?.includes('write'))) {
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
      this.setTitle(this.router.url);

    });

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }
    this.timezoneItem = this.service.timeZoneItem;
    this.securityitem = [
      { id: "Basic", name: "Security Off" },
      { id: "WPAand11i", name: "WPA WPA2 Personal" },
      { id: "11i", name: "WPA2-Personal" },
      { id: "11iandWPA3", name: "WPA2 WPA3 Personal" },
      { id: "WPA3", name: "WPA3-Personal" }
    ]
    this.encryptionitem = [
      { id: "AESEncryption", name: "AES" },
      { id: "TKIPEncryption", name: "TKIP" },
      { id: "TKIPandAESEncryption", name: "Both" }];
    this.wifiSsidExosType = [
      { id: '1', SSIDNAME: '2.4GHz Primary SSID' },
      { id: '9', SSIDNAME: '5GHz Primary SSID' },

    ]
    if (environment.VALIDATE_SCOPE) {
      // scopes['cloud.rbac.csc.netops'] = scopes['cloud.rbac.csc.netops'] ? scopes['cloud.rbac.csc.netops'] : [];

      // if (scopes && scopes['cloud.rbac.csc.netops'] !== undefined && scopes['cloud.rbac.csc.netops'].indexOf('read') !== -1) {
      //   this.showNetops = true;
      // }

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.netops') !== -1) {
            this.showNetops = true;
            break;
          }
        }
      }

    } else {
      this.showNetops = true;
    }

    this.orgId = this.sso.getOrgId();
    this.getScopes();
  }

  // GetWorkFlowCount() {
  //   this.api.GetWorkFlowCount(this.orgId).subscribe((res: any) => {
  //     this.wfCount = res.count;
  //   })
  // }
  //joy begin
  EnableShow(event, ind = '') {
    if (event) {
      this.Shown = true;
      if ((this.selectedSSID.WlanIndex == '')) {
        //this.selectedSSID.Enable = false;
        this.selectedSSID.SSID = '';
        this.selectedSSID.BeaconType = 'Basic';
        //this.selectedSSID.PreSharedKey[1].KeyPassphrase='';
        this.selectedSSID.SSIDAdvertisementEnabled = false;
      }
    }
    else {
      this.Shown = false;
      /*if((this.selectedSSID.WlanIndex=='')||(!this.hsiModel._id) && !this.defaultEnable){
        //this.selectedSSID.Enable = false;
        this.selectedSSID.SSID='';
        this.selectedSSID.BeaconType='Basic';
        //this.selectedSSID.PreSharedKey[1].KeyPassphrase='';
        this.selectedSSID.SSIDAdvertisementEnabled= false;
        this.selectedSSID.MACAddressControlEnabled = false;
        this.selectedSSID.X_000631_SplitHorizon = false;
        this.selectedSSID.X_000631_IntraSsidIsolation = false;
      }*/
    }

  }
  EnableShow1(event) {
    if (event.isTrusted) {
      this.Shown = false;
    }
    else {
      this.Shown = true;
    }

  }
  enable() {
    this.enable1 = !this.enable1
  }
  getScopes() {
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.dashboards'] = scopes['cloud.rbac.csc.dashboards'] ? scopes['cloud.rbac.csc.dashboards'] : [];

      if (scopes && (scopes['cloud.rbac.csc.dashboards'])) {
        if (scopes['cloud.rbac.csc.dashboards'].indexOf('read') !== -1 || scopes['cloud.rbac.csc.dashboards'].indexOf('write') !== -1) this.scopeFlag.dashboard = true;
      }
      if (this.ssoAuthService.checFoundationScope(AcessModifiers.WRITE, CheckScopes.VALIDATE_SCOPE) || this.ssoAuthService.checFoundationScope(AcessModifiers.READ, CheckScopes.VALIDATE_SCOPE)) {
        this.scopeFlag.initialonboarding = true;
      }
    } else {
      this.scopeFlag.initialonboarding = true;
    }
  }
  onSoftwareChange(event: FilesListModel) {
    JSON.parse(sessionStorage.getItem('swi')).forEach(res => {
      if (res._id == event._id) {
        if (res.isOfficialImage) {
          this.swConfrmMsg = this.language.Make_SW_UnOfficial
        } else {
          let resVersionFilter = [];
          JSON.parse(sessionStorage.getItem('swi')).forEach(res1 => {
            if (res1.isOfficialImage) {
              event.models.filter(obj =>
                (res1.models.indexOf(obj) !== -1) ? resVersionFilter.push(res1.name) : ''
              )
            }
          })
          var unique = resVersionFilter.filter((v, i, a) => a.indexOf(v) === i);
          this.uniqueimagename = resVersionFilter.filter((v, i, a) => a.indexOf(v) === i);
          this.uniqueimageoldname = event?.name
          if (unique.length == 0) {
            this.swConfrmMsg = this.language.Make_SW_Official;

          } else {
            // this.swConfrmMsg = `Are you sure you want to replace this "${unique[0]}" existing official image with current one"${event.name}"?`;
            this.swConfrmMsg = this.language.SoftwareImagesWarrningMsg(this.uniqueimagename, this.uniqueimageoldname);
          }
        }
      }
    })

    this.softwareImageOfficial = true;
    this.officialImageId = event;
    let scrollTop = document.getElementById('SoftwareImages');
    if (scrollTop !== null) {
      scrollTop.scrollIntoView({ behavior: 'smooth' });
      scrollTop = null;
    }
  }
  swOfficialConfirmation() {
    this.softwareImageOfficial = false;
    let model = {
      // orgId: this.orgId,
      imageId: this.officialImageId._id
    }
    if (!this.officialImageId.isOfficialImage) {
      this.fileService.makeUnOfficialImge(this.orgId, this.officialImageId._id).subscribe(res => {
        this.officialImageId = new FilesListModel();
        this.loader = true;
        this.datatableVisible = false;
        this.getSwImagesListCout();
      }, error => {
        this.loader = false;
        // this.errorMsg = error.error.error;
        this.errorMsg = this.ssoAuthService.pageErrorHandle(error);
        this.showError = true;
      })
    } else {
      this.fileService.makeOfficialImage(model).subscribe(res => {
        this.officialImageId = new FilesListModel();
        this.loader = true;
        this.datatableVisible = false;
        this.getSwImagesListCout();
      }, error => {
        this.loader = false;
        // this.errorMsg = error.error.error;
        this.errorMsg = this.ssoAuthService.pageErrorHandle(error);
        this.showError = true;
      })
    }
  }
  closeswOfficialConfirmation() {
    this.softwareImageOfficial = false;
    this.loader = false;
    this.swLoading = false;
    this.datatableVisible = false;
    this.getSwImagesListCout();
  }
  openOutModal(content) {
    this.loader = false;
    let ngbOption: NgbModalOptions = { ariaLabelledBy: 'modal-title', backdrop: "static", centered: true, windowClass: 'custom-lg-modal custom-workflow-modal', scrollable: true }
    //hiding tis.. for a new user tries to setup software images in the step => closed 1st time opened popup and then clicking 2nd time it loading continously
    // this.getSwImagesListCout();
    this.modalService.open(content, ngbOption).result.then((result) => {
    }, (reason) => {
      this.loader = false;
    });

  }
  getSwImagesListCout() {
    this.fileService.getSwFilesCount(this.orgId).subscribe(res => {
      this.count = res.count;
      this.datatableVisible = true;
      this.softwareImageOfficial = false;
      this.softwareImageObj = [];
      this.fetchSoftwareImageList()
    })
  }
  fetchSoftwareImageList() {
    // this.loader = true;
    const that = this;
    this.softwareTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.loader = true;

        const params: HttpParams = new HttpParams()
          // .set("orgId", this.orgId)
          .set("skip", dataTablesParameters.start)
          .set("limit", dataTablesParameters.length)
          .set("type", requestType.SW_FW_Image)
        if (this.ssoAuthService.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        }
        that.http.get(getSwFileList, { params }).subscribe((resp: FilesListModel[]) => {
          sessionStorage.setItem('swi', JSON.stringify(resp));
          that.softwareImageObj = resp;
          that.loader = false;
          callback({
            recordsTotal: this.count,
            recordsFiltered: this.count,
            data: []
          });
        }), error => {
          this.loader = false;
          // this.errorMsg = error.error.error;
          this.errorMsg = this.ssoAuthService.pageErrorHandle(error);
          this.showError = true;
        }
      }, drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
  }

  // changeTableStatusLanguage(dtObj) {
  //   const nf = new Intl.NumberFormat();
  //   this.tableCounts = {
  //     searchText: dtObj.oPreviousSearch.sSearch.trim(),
  //     total: dtObj._iRecordsTotal,
  //     displayCount: dtObj._iDisplayLength,
  //     displayed: dtObj._iRecordsDisplay,
  //     start: dtObj._iDisplayStart
  //   };
  //   const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
  //     filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
  //       (isFrench ?
  //         `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
  //         `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
  //       ''}`;
  //   const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
  //   const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
  //   $('div [role="status"]').text(isFrench ?
  //     `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
  //     `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
  //   )
  //   $(".first").text(isFrench ? 'Le début' : 'First');
  //   $(".previous").text(isFrench ? 'Précédent' : 'Previous');
  //   $(".next").text(isFrench ? 'Suivant' : 'Next');
  //   $(".last").text(isFrench ? 'Dernière' : 'Last');
  // }
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }

  getHSI(isDiscard = false) {
    this.hsiService.getHSI().subscribe(res => {
      localStorage.removeItem('hsiSave');
      this.hsiModel = res;
      /*if (!isDiscard) {
        this.hsiModel = res;
      } else {
        this.hsiModel.wifiSsidExos = res.wifiSsidExos;
      }*/
      /*if (this.hsiModel.wifiSsidExos[0].hasOwnProperty('X_000631_SplitHorizon')) {
        this.hsiModel.wifiSsidExos.forEach(res => {
          delete res.X_000631_SplitHorizon;
          delete res.MACAddressControlEnabled;
          delete res.X_000631_IntraSsidIsolation;
        })
      }*/
      if (this.hsiModel.timezonePosix.hasOwnProperty('NTPServer5')) {
        delete this.hsiModel.timezonePosix.NTPServer5;
      }
      if (this.hsiModel.hasOwnProperty('wifiSsidExos')) {
        delete this.hsiModel.wifiSsidExos;
      }

      localStorage.setItem('hsiSave', JSON.stringify(this.hsiModel));
      this.selectedTimeZone = this.hsiModel.timezonePosix.Tz;
      //this.createSSIDItems();
    }, error => {
      this.loader = false;
      if (error.status != 404) {
        this.errorMsg = this.ssoAuthService.pageErrorHandle(error);
        this.showErrorini = true;
      }
      localStorage.removeItem('hsiSave');
      if (this.hsiModel.hasOwnProperty('wifiSsidExos')) {
        delete this.hsiModel.wifiSsidExos;
      }
      //this.hsiModel._id='';
      //delete this.hsiModel._id;
      //this.createSSIDItems();
      this.hsiModel.timezonePosix.NTPEnable = false;
      this.selectedTimeZone = '';
      this.hsiModel.timezonePosix.NTPServer1 = '';
      this.hsiModel.timezonePosix.NTPServer2 = '';
      this.hsiModel.timezonePosix.NTPServer3 = '';
      this.hsiModel.timezonePosix.NTPServer4 = '';
      this.hsiModel.timezonePosix.NTPServer5 = '';
      this.hsiModel.userCredentials.Username = '';
      this.hsiModel.userCredentials.Password = '';
    })
  }
  createSSIDItems() {
    if (this.hsiModel.wifiSsidExos.length == 0) {
      this.selectedSSID.WlanIndex = '';
      this.selectedSSID.Enable = false;
    } else {
      this.selectedSSID = JSON.parse(localStorage.getItem('hsiSave')).wifiSsidExos[0];
    }
    this.EnableShow(this.selectedSSID?.Enable);
  }
  selectedSecuritySSID(event, flag = '') {
    if (flag == 'drop') {
      this.selectedSSID.IEEE11iEncryptionModes = 'AESEncryption';
    }
    if (event.id == "11iandWPA3" || event.id == "WPA3") {
      this.encryptionitem = [
        { id: "AESEncryption", name: "AES" }]
    } else if (event.id == "WPAand11i" || event.id == "11i") {
      this.encryptionitem = [
        { id: "AESEncryption", name: "AES" },
        { id: "TKIPEncryption", name: "TKIP" },
        { id: "TKIPandAESEncryption", name: "Both" }];
    }
  }
  selectedDropdownSSID(event) {
    this.defaultEnable = false;
    this.selectedSSID.Enable = false;
    this.EnableShow(this.selectedSSID?.Enable);
    this.selectedSSID.SSID = '';
    this.selectedSSID.BeaconType = 'Basic';
    this.selectedSSID.PreSharedKey[1].KeyPassphrase = '';
    this.selectedSSID.SSIDAdvertisementEnabled = false;
    let localHsiSave = JSON.parse(localStorage.getItem('hsiSave'));
    if ((localHsiSave?.wifiSsidExos[0]?.WlanIndex == '1' || localHsiSave?.wifiSsidExos[0]?.WlanIndex == '9')) {
      localHsiSave.wifiSsidExos.forEach(res => {
        if (res.WlanIndex == event.id) {
          this.defaultEnable = true;
          this.selectedSSID = JSON.parse(JSON.stringify(res));
        }
      })
    }
    if (event.id != '') {
      this.EnableShow(this.selectedSSID?.Enable)
      this.selectedSecuritySSID(this.selectedSSID?.BeaconType);
    }

  }
  onTimeZoneChange(event) {
    this.hsiModel.userCredentials.Password
    this.hsiModel.timezonePosix.Tz = event.value;
    this.hsiModel.timezonePosix.TzName = event.value;
    this.hsiModel.timezonePosix.TzValue = this.timeZoneValues[event.displayName].TzValue;

  }
  helpRoute() {
    const helpUrl = (this.sso.getCscType() === "DME") ?
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/dme/index.htm#88478.htm" :
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/help/index.htm#93079.htm";
    window.open(helpUrl, "_blank");
  }


  closeModal(status?: string) {
    this.modalService.dismissAll("closed");
    this.loader = false;
    this.updateData = new FilesModel();
    this.newSoftwareImage = false;
    this.activeTab = "Software Images"
    if (status == "saved") {
      // this.getWrkflwData();// hiding for (CCL-63290) once saved the default workflow need to go workflow list page
      this.closeini();
    }
    // this.getWrkflwData();
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.allwrkflowSubscribe) {
      this.allwrkflowSubscribe.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
    if (this.wrkflowDtlSubscribe) {
      this.wrkflowDtlSubscribe.unsubscribe()
    }
    if (this.suspendSubs) {
      this.suspendSubs.unsubscribe()
    }
    if (this.resumeSubs) {
      this.resumeSubs.unsubscribe()
    }

    this.languageSubject.unsubscribe();
  }
  newRedraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  // getWrkflwData() {
  //   this.workFlowtableOptions = {
  //     /*  pagingType: 'full_numbers',
  //    dom: 't',
  //    ordering: false,
  //    paging: false,

  //    searching: false,
  //    lengthChange: false, */
  //     pagingType: 'full_numbers',
  //     pageLength: 10,
  //     lengthChange: false,
  //     serverSide: true,
  //     ordering: false,
  //     processing: false,
  //     dom: 'tipr',

  //     // columnDefs: [
  //     //   { targets: [0, 1, 2, 3, 4], orderable: false }
  //     // ],
  //     // order: [0, 'asc'],
  //     ajax: (dataTablesParameters: any, callback) => {
  //       const that = this;
  //       let page = dataTablesParameters.start / 10;
  //       let size = dataTablesParameters.length;

  //       //this.modalLoader = true;
  //       // /workflow?orgId=470053&brief=true&skip=0&limit=10&type=Onboarding%20Scheduler&source=Foundation
  //       this.allwrkflowSubscribe = this.api.GetWorkflowGridWithPagination(this.orgId, page, size).subscribe((res: any) => {              

  //         if (res) {
  //           /** to fix CCL-24875 */
  //           let data = [];
  //           this.WfData = res;
  //           this.wrkflwTableData = [];
  //           let wrkflwTableDataTemp = [];
  //           let scheduleWorkFlowTemp = [];
  //           res.forEach((element: any) => {

  //             if (element.execPolicy && element.execPolicy.initialTrigger) {
  //               if (element.execPolicy.initialTrigger.cpeEvent === "CC EVENT - New CPE Discovered") {

  //                 let editableData = element.actions.filter(ele => ele.actionType === 'Download SW/FW Image')
  //                 if (editableData.length) {
  //                   element['editable'] = true;
  //                 }
  //               }
  //             }
  //             if (!this.router.url.includes('cco-foundation')) {
  //               if (!element.source) {
  //                 data.push(element);
  //               }
  //             } else {
  //               data.push(element);
  //             }
  //           });
  //           if (res.length == 0 && this.router.url.includes('cco-foundation')) {
  //             this.showSummaryStep = false;
  //             this.hsiService.getHSI(this.orgId).subscribe(res => {
  //             }, error => {
  //               this.loader = false;
  //               if (error.status == 404 && this.WfData.length == 0 && error.error.error == 'No hsi found with the given query filter!') {
  //                 this.openOutModal(this.initOnboardingModel);
  //               }
  //             })
  //           }
  //           /*if (this.router.url.includes('cco-foundation')) {
  //             this.api.GetWorkflowFoundation(this.orgId).subscribe((res: any) => {
  //               res.length >= 1 ? this.inibttndisabled = true : this.inibttndisabled = false;
  //               this.wrkflwTableData = data.concat(res);
  //             }, (err: HttpErrorResponse) => {
  //               this.loading = false;
  //               this.pageErrorHandle(err);
  //               $("body").scrollTop(0);
  //             }, () => {
  //               //this.loading = false;
  //             })
  //             //data.push(this.getFounWrkflwData());
  //           } else {
  //             this.wrkflwTableData = data;
  //           }*/
  //           let index1;
  //           let swIndex1
  //           wrkflwTableDataTemp = data.filter((value, index) => {
  //             if (value.name == "Default Onboarding Workflow") {
  //               index1 = index;
  //             }
  //             return value.name != "Default Onboarding Workflow";
  //           });
  //           wrkflwTableDataTemp = data.filter((value, index) => {
  //             if (value.type == "Onboarding Scheduler") {
  //               swIndex1 = index;
  //             }
  //             return value.name != "Default Upgrade Scheduler";
  //           });
  //           let swIndex = 1;
  //           if (typeof (data[index1]) == "undefined" && typeof (data[swIndex1]) == "object") {
  //             swIndex = 0
  //           }
  //           (typeof (data[index1]) != "undefined" && this.router.url.includes('cco-foundation')) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, index1, 0) : (this.router.url.includes('cco-foundation') ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Onboarding Workflow", description: "Workflow for basic settings during EXOS system onboarding", "type": "Onboarding Discovery" }) : '');
  //           (typeof (data[swIndex1]) != "undefined" && this.router.url.includes('cco-foundation')) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, swIndex1, swIndex) : (this.router.url.includes('cco-foundation') ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Upgrade Scheduler", "description": "Workflow schedule for upgrade of EXOS systems", "type": "Onboarding Scheduler" }) : '');
  //           if (scheduleWorkFlowTemp.length != 0) {
  //             this.wrkflwTableData = scheduleWorkFlowTemp.concat(wrkflwTableDataTemp);
  //             if (!swIndex1 && index1) {
  //               this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
  //             } else if (!swIndex1 && wrkflwTableDataTemp.length != 0 && swIndex != 0) {
  //               this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
  //             }
  //           } else {
  //             this.wrkflwTableData = wrkflwTableDataTemp;
  //           }
  //           this.dataAvailable = true;
  //           this.loading = false;
  //         }
  //         callback({
  //           recordsTotal: that.wfCount,
  //           recordsFiltered: that.wfCount,
  //           data: []
  //         });
  //         //}, 100);
  //       },
  //         (err: HttpErrorResponse) => {
  //           // this.modalLoader = false;
  //           if (err.status == 404) {

  //             setTimeout(() => {
  //               callback({
  //                 recordsTotal: (that.wfCount != undefined) ? that.wfCount : 0,
  //                 recordsFiltered: (that.wfCount != undefined) ? that.wfCount : that.wfCount,
  //                 data: []
  //               });
  //             }, 100);
  //           } else {
  //             this.pageErrorHandle(err);
  //           }
  //         });
  //     },
  //     drawCallback: (settings) => {
  //       let total = settings.aoData.length;
  //       let length = settings._iDisplayLength;
  //       if (total <= length) {
  //         $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
  //       }
  //     }
  //   };
  // }



  getWrkflwData() {
    this.loading = true;
    let filterOnBoot = this.router.url.includes('/support/netops-management') ? 'excludeOnBoot=true' : 'excludeOnBoot=false';
    this.allwrkflowSubscribe = this.api.GetWorkflowGrid(this.orgId, filterOnBoot).subscribe((res: any) => {
      this.loading = false;
      if (res) {
        // to hide On Boot workflow for csc/foundation
        if (this.router?.url?.includes('support/netops-management/')) {
          res = res.filter(obj => obj?.execPolicy?.initialTrigger?.cpeEvent !== 'CC EVENT - On Boot');
        }
        this.loading = false;
        /** to fix CCL-24875 */
        let data = [];
        this.WfData = res;
        this.wrkflwTableData = [];
        let wrkflwTableDataTemp = [];
        let scheduleWorkFlowTemp = [];
        this.worFlowdata = res.filter(item => item?.actions[0].actionType !== 'myCommunityIQ Bulk Activation');
        if (this.enableMyCommunity) {
          for (var i = 0; i < res?.length; i++) {
            let data = res[i]?.actions
            data = data.filter(el => !el?.isInvalid)
            if (data?.length) {
              res[i].actions = data;
            } else {
              res.splice(i, 1)
              i = 0
            }
          }
          res.forEach((element: any) => {

            if (element.execPolicy && element.execPolicy.initialTrigger) {
              if (element.execPolicy.initialTrigger.cpeEvent === "CC EVENT - New CPE Discovered") {

                let editableData = element.actions.filter(ele => ele.actionType === 'Download SW/FW Image')
                if (editableData.length) {
                  element['editable'] = true;
                }
              }
            }
            if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations')) {
              if (!element.source) {
                data.push(element);
              }
            } else {
              data.push(element);
            }
          });
          if (res.length == 0 && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) {
            this.showSummaryStep = false;
            this.hsiService.getHSI().subscribe(res => {
            }, error => {
              this.loader = false;
              if (error.status == 404 && this.WfData.length == 0 && error.error.error == 'No hsi found with the given query filter!' && !this.HideModel) {
                this.openOutModal(this.initOnboardingModel);
              }
            })
          }
          let index1;
          let swIndex1
          wrkflwTableDataTemp = data.filter((value, index) => {
            if (value.name == "Default Onboarding Workflow") {
              index1 = index;
            }
            return value.name != "Default Onboarding Workflow";
          });
          wrkflwTableDataTemp = data.filter((value, index) => {
            if (value.type == "Onboarding Scheduler") {
              swIndex1 = index;
            }
            return value.name != "Default Upgrade Scheduler";
          });
          let swIndex = 1;
          if (typeof (data[index1]) == "undefined" && typeof (data[swIndex1]) == "object") {
            swIndex = 0
          }
          (typeof (data[index1]) != "undefined" && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, index1, 0) : ((this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations')) ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Onboarding Workflow", description: "Workflow for basic settings during EXOS system onboarding", "type": "Onboarding Discovery" }) : '');
          (typeof (data[swIndex1]) != "undefined" && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, swIndex1, swIndex) : ((this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations')) ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Upgrade Scheduler", "description": "Workflow schedule for upgrade of EXOS systems", "type": "Onboarding Scheduler" }) : '');
          if (scheduleWorkFlowTemp.length != 0) {
            this.wrkflwTableData = scheduleWorkFlowTemp.concat(wrkflwTableDataTemp);
            if (!swIndex1 && index1) {
              this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
            } else if (!swIndex1 && wrkflwTableDataTemp.length != 0 && swIndex != 0) {
              this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
            }
          } else {
            this.wrkflwTableData = wrkflwTableDataTemp;
          }
        } else if (!this.enableMyCommunity) {
          for (var i = 0; i < this.worFlowdata?.length; i++) {
            let data = this.worFlowdata[i]?.actions
            data = data.filter(el => !el?.isInvalid)
            if (data?.length) {
              this.worFlowdata[i].actions = data;
            } else {
              this.worFlowdata.splice(i, 1)
            }
          }
          this.worFlowdata.forEach((element: any) => {

            if (element.execPolicy && element.execPolicy.initialTrigger) {
              if (element.execPolicy.initialTrigger.cpeEvent === "CC EVENT - New CPE Discovered") {

                let editableData = element.actions.filter(ele => ele.actionType === 'Download SW/FW Image')
                if (editableData.length) {
                  element['editable'] = true;
                }
              }
            }
            if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations')) {
              if (!element.source) {
                data.push(element);
              }
            } else {
              data.push(element);
            }
          });
          if (this.worFlowdata.length == 0 && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) {
            this.showSummaryStep = false;
            this.hsiService.getHSI().subscribe(res => {
            }, error => {
              this.loader = false;
              if (error.status == 404 && this.WfData.length == 0 && error.error.error == 'No hsi found with the given query filter!' && !this.HideModel) {
                this.openOutModal(this.initOnboardingModel);
              }
            })
          }
          let index1;
          let swIndex1
          wrkflwTableDataTemp = data.filter((value, index) => {
            if (value.name == "Default Onboarding Workflow") {
              index1 = index;
            }
            return value.name != "Default Onboarding Workflow";
          });
          wrkflwTableDataTemp = data.filter((value, index) => {
            if (value.type == "Onboarding Scheduler") {
              swIndex1 = index;
            }
            return value.name != "Default Upgrade Scheduler";
          });
          let swIndex = 1;
          if (typeof (data[index1]) == "undefined" && typeof (data[swIndex1]) == "object") {
            swIndex = 0
          }
          (typeof (data[index1]) != "undefined" && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, index1, 0) : ((this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations')) ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Onboarding Workflow", description: "Workflow for basic settings during EXOS system onboarding", "type": "Onboarding Discovery" }) : '');
          (typeof (data[swIndex1]) != "undefined" && (this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations'))) ? wrkflwTableDataTemp = this.moveArrayItemToNewIndex(data, swIndex1, swIndex) : ((this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations')) ? scheduleWorkFlowTemp.push({ "_id": "0", "name": "Default Upgrade Scheduler", "description": "Workflow schedule for upgrade of EXOS systems", "type": "Onboarding Scheduler" }) : '');
          if (scheduleWorkFlowTemp.length != 0) {
            this.wrkflwTableData = scheduleWorkFlowTemp.concat(wrkflwTableDataTemp);
            if (!swIndex1 && index1) {
              this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
            } else if (!swIndex1 && wrkflwTableDataTemp.length != 0 && swIndex != 0) {
              this.wrkflwTableData = this.moveArrayItemToNewIndex(this.wrkflwTableData, 0, 1)
            }
          } else {
            this.wrkflwTableData = wrkflwTableDataTemp;
          }
        }
        this.dataAvailable = true;
        this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
          this.workFlowtableOptions.order = [0, 'asc'];
          dtInstance.ajax.reload();
        })
        this.loading = false;
      }

      //}, 100);
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.pageErrorHandle(err);
        $("body").scrollTop(0);
      }, () => {
        //this.loading = false;
      });
  }


  moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };
  render() {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Do your stuff
        dtInstance.draw();
        var btn = document.getElementById('my-btn');
      });
    });

  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  search(term: string) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  gotoWrkflwDetail(item: any): void {
    this.wrkflowDtlSubscribe = this.api.GetWorkflowById(item._id).subscribe((res: any) => {
      if (res) {
        this.showDetailspage = true
        this.wrkflowDtl = res
      }
    },
      (err: HttpErrorResponse) => {
        this.showDetailspage = false
      })
  }

  deleteWrkflw(item: any): void {
    this.closeAlert();
    this.deletedata = item;
    if (this.deletedata.state === 'In Progress') {
      this.inprpwarn = true
      this.inprpwarnInfo = ` ${this.language['Workflow']} "${this.deletedata.name}" ${this.language.Suspend_Workflow_Before_Delete}`
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
      return
    }
    this.delete = true
    this.deleteInfo = `${this.language.workflowDeleteInfo(this.deletedata.name)}?`
    jquery("html, body").animate({ scrollTop: 0 }, "slow");

  }

  suspendWrkflw(item: any): void {
    this.closeAlert();
    this.suspenddata = item;
    this.warning = true
    this.warningInfo = `${this.language.workflowSuspendInfo(this.suspenddata.name)}?`
    jquery("html, body").animate({ scrollTop: 0 }, "slow");

    this.resume = false
  }

  confirmSuspendSecleted(): void {
    this.loading = true;
    this.isRerender = false;
    this.suspendSubs = this.api.suspendWrkflw(this.suspenddata._id).subscribe((res: any) => {
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
      setTimeout(() => {
        this.successInfo = 'Workflow Suspended Successfully';
        this.closeAlert();
        this.loading = false;
        this.isRerender = true;
        this.resume = false
        this.getWrkflwData();
        // this.newRedraw();
      }, 3000);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
    })
  }

  resumeWrkflw(item: any): void {
    this.resumedata = item;
    this.warning = true
    this.warningInfo = `${this.language.workflowResumeInfo(this.resumedata.name)}?`
    jquery("html, body").animate({ scrollTop: 0 }, "slow");
    this.resume = true
  }

  confirm() {
    if (this.resume) {
      this.confirmResumeSecleted()
    }
    else {
      this.confirmSuspendSecleted()
    }
  }

  confirmResumeSecleted(): void {
    this.loading = true;
    this.isRerender = false;
    this.resumeSubs = this.api.resumeWrkflw(this.resumedata._id).subscribe((res: any) => {
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
      setTimeout(() => {
        this.closeAlert();
        this.successInfo = 'Workflow Resume Successfully';
        this.loading = false;
        this.isRerender = true;
        this.getWrkflwData();
        // this.newRedraw()
        this.resume = false
      }, 3000);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
    })
  }

  confirmDeleteSecleted(): void {
    this.loading = true;
    this.isRerender = false;
    this.deleteSubs = this.api.DeleteWrkflw(this.deletedata._id).subscribe((res: any) => {
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
      setTimeout(() => {
        this.loading = false;
        this.successInfo = 'Workflow deleted Successfully';
        this.closeAlert();
        this.isRerender = true;
        this.delete = false
        this.getWrkflwData();
        //this.newRedraw()
      }, 3000);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
      jquery("html, body").animate({ scrollTop: 0 }, "slow");
    })
  }


  addWorkflow() {
    this.newwrkstate = true;
    this.sso.redirectByUrlForWorkflow([
      `/support/netops-management/operations/workflows/workflow-wizard`,
      `/cco/operations/configuration/workflows/workflow-wizard`,
      `/cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-wizard`,
      `/cco/operations/configuration/workflows/workflow-wizard`,
    ], { queryParams: { isNewwrkflw: this.newwrkstate } });
  }
  addAlarmWorkflow() {
    this.sso.redirectByUrlForWorkflow([
      ``,
      `/cco/operations/cco-subscriber-operations/operations/workflows/workflow-alarm-wizard`,
      `/cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-alarm-wizard`,
      `/cco/operations/configuration/workflows/workflow-alarm-wizard`,
    ]);
  }
  addOfficialImageWorkflow() {
    this.sso.redirectByUrlForWorkflow([
      ``,
      ``,
      `cco-foundation/foundation-configuration/configuration-workflow/workflows/official-workflow-wizard`,
      `/cco/operations/configuration/workflows/official-workflow-wizard`
    ]);
  }
  editWorkflow(row, ibflag) {
    if (ibflag == true) {
      this.loader = true
      this.ibfEditFlag = true
      this.activeTab = 'Software Images';
      this.getSwImagesListCout();
      this.showWorkflow = false;
      this.showIobFlow = true;
      this.wrkflwTableData = [];
    } else if (row.type == "Onboarding Scheduler") {
      if (row._id == '0') {
        this.sso.redirectByUrlForWorkflow([
          ``,
          ``,
          `cco-foundation/foundation-configuration/configuration-workflow/workflows/official-workflow-wizard`
        ]);
      } else {
        this.sso.redirectByUrlForWorkflow([
          ``,
          ``,
          `cco-foundation/foundation-configuration/configuration-workflow/workflows/official-workflow-wizard`,
          `/cco/operations/configuration/workflows/official-workflow-wizard`
        ], { queryParams: { item: row._id } });
      }
    } else {
      this.sso.redirectByUrlForWorkflow([
        `/support/netops-management/operations/workflows/workflow-wizard`,
        `/cco/operations/configuration/workflows/workflow-wizard`,
        `cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-wizard`,
        `/cco/operations/configuration/workflows/workflow-wizard`,
      ], { queryParams: { item: row._id } });

    }
    //this.router.navigate(['/support/netops-management/operations/workflows/workflow-wizard'], { queryParams: { item: row._id } })
  }

  getWokflowDetails(row) {
    this.showSummaryStep = false;
    if ((this.router.url.includes('cco-foundation') || this.router.url.includes('cco/operations')) && row.name == 'Default Onboarding Workflow') {
      if (row._id != 0) {
        this.showSummaryStep = true;
        this.activeTab = "Summary"
        this.workflowId = row._id;
        this.getWorkflowById();
      } else {
        if (!this.hasWriteAccess || this.flowLimited_readOnly) return;
        this.activeTab = 'Software Images';
        this.getSwImagesListCout();
      }
      this.HideModel = true
      if (this.HideModel) {
        this.openOutModal(this.initOnboardingModel);
      }

    } else {
      if (row.name == 'Default Upgrade Scheduler' && row._id == 0) {
        if (!this.hasWriteAccess || this.flowLimited_readOnly) return;
        this.addOfficialImageWorkflow();
      } else {
        this.sso.redirectByUrlForWorkflow([
          `/support/netops-management/operations/workflows/workflow-details`,
          `/cco/operations/cco-system-operations/workflows/workflow-details`,
          `cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-details`,
          `/cco/operations/configuration/workflows/workflow-details`,
        ], { queryParams: { item: row._id } });
      }
    }
    //this.router.navigate(['/support/netops-management/operations/workflows/workflow-details'], { queryParams: { item: row } })
  }

  closeAlert() {
    this.error = false;
    this.success = false;
    this.warning = false;
    this.delete = false
    this.inprpwarn = false
  }

  tableLanguageOptions() {
    if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'fr') {
      this.workFlowtableOptions.language = this.frTable;
      this.tableRevOptions.language = this.frTable;
    } else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'es') {
      this.workFlowtableOptions.language = this.esTable;
      this.tableRevOptions.language = this.esTable;
    }
    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'de_DE') {
      this.workFlowtableOptions.language = this.germanTable;
      this.tableRevOptions.language = this.germanTable;
    }

    else if (sessionStorage.getItem('defaultLanguage') && sessionStorage.getItem('defaultLanguage') == 'en' && this.workFlowtableOptions.language) {
      delete this.workFlowtableOptions.language;
      delete this.tableRevOptions.language;
    }
    // if (this.language.fileLanguage == 'fr') {
    //   this.dtOptions.language = this.frTable;
    // } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
    //   delete this.dtOptions.language;
    // }
  }


  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  showStatus(item) {
    this.sso.redirectByUrlForWorkflow([
      `/support/netops-management/operations/workflows/workflow-status`,
      `/cco/operations/cco-system-operations/workflows/workflow-status`,
      `cco-foundation/foundation-configuration/configuration-workflow/workflows/workflow-status`,
      `/cco/operations/configuration/workflows/workflow-status`,
    ], { queryParams: { item: item._id, name: item.name } });
    //this.router.navigate(['/support/netops-management/operations/workflows/workflow-status'], { queryParams: { item: item._id, name: item.name } })
  }
  ssidItems = [];
  securityitem = [];
  timezoneItem = [];
  encryptionitem = [];
  activeTab = 'Software Images';
  newSoftwareImage = false;
  fileToUpload: File = null;
  swFileObj: FilesModel = new FilesModel();
  updateData: FilesModel = new FilesModel();
  public subnetValue: string;
  setActiveTab(event) {
    this.activeTab = event
    this.submitWorflow = false;
    if (this.activeTab === 'Onboarding Workflow') {
      this.getHSI();
    } else if (this.activeTab === 'Software Images') {
      this.newSoftwareImage = false;
      this.fileToUpload = null;
      this.swFileObj = new FilesModel();
      this.loader = true;
      this.datatableVisible = false;
      this.getSwImagesListCout();
    }
  }
  onSWFileSubmit() {
    this.swLoading = true;
    this.softwareImageOfficial = false;
    this.fileService.uploadSwFile(this.swFileObj, this.orgId).subscribe((res: FileResponseModel) => {
      let responseDetails: FileResponseModel = res
      this.uploadFile(this.fileToUpload, responseDetails);
    }, (err: HttpErrorResponse) => {
      this.swLoading = false;
      this.softwareImageOfficial = false;
      if (err.status == 409) {
        this.showWarning = true;
        //this.modalInfo = "Warning! "
        this.updateData = this.swFileObj;
        this.errorMsg = `"${this.swFileObj.name}" already exists. Are you sure you want to Overwrite it?`
      } else {
        // this.errorMsg = err.error.error;
        this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
        this.showError = true;
      }
    }
    )
  }

  uploadFile(file: File, responseDetails: FileResponseModel) {
    this.fileService.fileUploadIntoUrl(file, responseDetails).subscribe(res => {
      this.swLoading = false;
      this.newSoftwareImage = true;
      /*  this.successMsg = "successfully uploaded!"
       this.showSuccess = true; */
      if (this.officialImage) {
        let model = {
          // orgId: this.orgId,
          imageId: responseDetails._id
        }
        this.fileService.makeOfficialImage(model).subscribe(res => {
          this.newSoftwareImage = false;
        }, err => {
          this.swLoading = false;
        })
      } else {
        this.newSoftwareImage = false;
      }
    }, err => {
      this.reverseUpload(false);
      if (err.status == 413) {
        this.errorMsg = err.error;
        this.showError = true;
        this.swLoading = false;
      } else if (err.statusText == "Unknown Error") {
        this.errorMsg = "Image Upload Failed!";
        this.showError = true;
        this.swLoading = false;
      } else {
        if (err.error) {
          this.errorMsg = err.error;
        } else {
          this.errorMsg = err.statusText
        }
        this.showError = true;
      }
    });
  }

  reverseUpload(reUpload: boolean) {
    this.loading = true;
    if (this.swFileObj.name) {
      this.fileService.getSwFilesList(this.orgId, this.swFileObj.name, requestType.SW_FW_Image).subscribe((fileList: FilesListModel[]) => {
        fileList.forEach((file: FilesListModel) => {
          if (file.name == this.swFileObj.name) {
            this.fileService.deleteSwFileById(file._id).subscribe(res => {
              if (reUpload) {
                this.onSWFileSubmit();
              }
            }, (err: HttpErrorResponse) => {
              this.swLoading = false;
              // this.errorMsg = err.error.error;
              this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
              this.showError = true;
            })
          } this.swLoading = false;
        })
      }, (err: HttpErrorResponse) => {
        this.swLoading = false;
        // this.errorMsg = err.error.error;
        this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
        this.showError = true;
      })
    } else {
      this.fileService.getSwFilesList(this.orgId, null, requestType.SW_FW_Image).subscribe((fileList: FilesListModel[]) => {
        fileList.forEach((file: FilesListModel) => {
          if (file.name == this.swFileObj.name) {
            this.fileService.deleteSwFileById(file._id).subscribe(res => {
              if (reUpload) {
                this.onSWFileSubmit();
              }
            }, (err: HttpErrorResponse) => {
              this.swLoading = false;
              // this.errorMsg = err.error.error;
              this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
              this.showError = true;
            })
          } this.swLoading = false;
        })
      }, (err: HttpErrorResponse) => {
        this.swLoading = false;
        // this.errorMsg = err.error.error;
        this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
        this.showError = true;
      })
    }
  }

  confirmUpdateSecleted() {
    this.updateData = new FilesModel();
    this.reverseUpload(true);
  }

  onFileChange(files: FileList) {
    if (files.length > 0) {
      this.fileRequired = true;
      this.fileToUpload = files.item(0);
      this.swFileObj.name = this.fileToUpload.name;
      if (this.swFileObj.name.endsWith('.oneimage')) {
        this.fetchVersionModel(this.fileToUpload)
      } else {
        var startPos = 0;
        var endPos = 4;
        var reader = new FileReader();
        var magicCalxBlob = this.fileToUpload.slice(startPos, endPos);
        var isSignedEXOS = false;
        reader.onload = () => {
          var magicNum = new DataView(<ArrayBuffer>reader.result).getUint32(0);
          if (magicNum == 0xca11fcfc) { // EXOS Signed Image
            isSignedEXOS = true;
            startPos = 5712;
            this.readEXOSVersion(startPos, startPos + 14, isSignedEXOS, reader);
          } else {
            this.readAfterCheckSigned(startPos, endPos, reader, isSignedEXOS, magicCalxBlob);
          }
        };
        reader.readAsArrayBuffer(magicCalxBlob);
      }
      // this.swFileObj.orgId = this.orgId;
      this.swFileObj.type = requestType.SW_FW_Image;
      this.swFileObj.manufacturer = "Calix"
    }
  }


  fetchVersionModel(file: File) {
    let name = file.name;
    var nameLength = name.length - '.oneimage'.length;
    var shortName = name.substring(0, nameLength);
    var nameArray = shortName.split("_");
    if (nameArray.length == 2) {
      var model = nameArray[0];
      var version = nameArray[1];
      this.swFileObj.models.push(model);
      if (/^\d+(\.\d+)+$/.test(version)) {
        this.swFileObj.version = version;
      }
    }
  }

  fillVersionAndName(curVer) {
    var name = this.swFileObj.name;
    var endIndex = curVer.indexOf('\0');
    var version = endIndex >= 0 ? curVer.substr(0, endIndex) : curVer;

    var versionPattern = /^\d[\d\.]+\d$/;
    if (!versionPattern.test(version)) {
      this.swFileObj.version = "N/A"
      this.swFileObj.models = ["N/A"];
      return false;
    } else {
      this.swFileObj.version = version;

      var lastIndex = name.lastIndexOf('.');
      var newName = '';
      if (lastIndex != -1) {
        newName = name.slice(0, lastIndex) + '_' + version + name.slice(lastIndex);
      } else {
        newName = name + '_' + version;
      }
      this.swFileObj.name = newName;
      return true;
    }
  }

  readEXOSModels(startPos, endPos, reader) {
    var moduleIdNumBlob = this.fileToUpload.slice(startPos, endPos);
    reader.onload = () => {
      var moduleIdNum = new DataView(reader.result).getUint32(0);
      startPos = endPos;
      endPos = startPos + 4 * moduleIdNum;
      var moduleIdBlob = this.fileToUpload.slice(startPos, endPos);
      reader.onload = () => {
        var moduleMap = exosModuleMap;
        var result = [];
        for (var i = 0; i < moduleIdNum; i++) {
          var value = new DataView(reader.result).getUint32(i * 4);
          if (moduleMap[value] != null)
            result.push(moduleMap[value]);
        }
        this.swFileObj.models = result;
      };
      reader.readAsArrayBuffer(moduleIdBlob);
    }
    reader.readAsArrayBuffer(moduleIdNumBlob);
  }

  readEXOSVersion(startPos, endPos, isSignedEXOS, reader) {
    var versionBlob = this.fileToUpload.slice(startPos, endPos);
    reader.onload = () => {
      if (this.fillVersionAndName(reader.result)) {
        var modelStartPos = isSignedEXOS ? 5732 : 0x50;
        this.readEXOSModels(modelStartPos, modelStartPos + 4, reader);
      }
    };
    reader.readAsText(versionBlob);
  }

  readAfterCheckSigned(startPos, endPos, reader, isSignedEXOS, magicCalxBlob) {
    reader.onload = () => {
      if ("CALX" === reader.result) {
        // Unsigned EXOS Version Pos
        startPos = 0x10;
        endPos = 0x30;
        this.readEXOSVersion(startPos, endPos, isSignedEXOS, reader);
      } else {
        startPos = 20;
        endPos = 24;
        var versionLengthBlob = this.fileToUpload.slice(startPos, endPos);

        reader.onload = () => {
          var versionLength = new DataView(reader.result).getUint32(0);
          startPos = endPos;
          endPos = startPos + versionLength;
          var versionBlob = this.fileToUpload.slice(startPos, endPos);
          reader.onload = () => {
            if (this.fillVersionAndName(reader.result)) {
              startPos = endPos + 524;
              endPos = startPos + 4;
              var encrypted_w_imageLengthBlob = this.fileToUpload.slice(startPos, endPos);
              reader.onload = () => {
                var encrypted_w_imageLength = new DataView(reader.result).getUint32(0);
                startPos = endPos + encrypted_w_imageLength + 4;
                endPos = startPos + 4;
                var moduleLengthBob = this.fileToUpload.slice(startPos, endPos);
                reader.onload = () => {
                  var moduleLength = new DataView(reader.result).getUint32(0);
                  startPos = endPos;
                  endPos = startPos + moduleLength;
                  var moduleBlob = this.fileToUpload.slice(startPos, endPos);
                  reader.onload = () => {
                    var moduleMap = ModuleMap;
                    var result = [];
                    for (var i = 0; i < (endPos - startPos) / 4; i++) {
                      var value = new DataView(reader.result).getUint32(i * 4);
                      if (moduleMap[value] != null)
                        result.push(moduleMap[value]);
                    }
                    this.swFileObj.models = result;
                  };
                  reader.readAsArrayBuffer(moduleBlob); //get module
                };
                reader.readAsArrayBuffer(moduleLengthBob);
              };
              reader.readAsArrayBuffer(encrypted_w_imageLengthBlob);
            }
          };
          reader.readAsText(versionBlob); //get version
        };
        reader.readAsArrayBuffer(versionLengthBlob);
      }
    };
    reader.readAsText(magicCalxBlob)
  }

  onSubmitSSID() {
    if (!localStorage.getItem('hsiSave')) {
      this.hsiModel.wifiSsidExos[0] = this.selectedSSID;
      localStorage.setItem('hsiSave', JSON.stringify(this.hsiModel));
    } else if (JSON.parse(localStorage.getItem('hsiSave')).wifiSsidExos.length == 1) {
      let localhsi1 = JSON.parse(localStorage.getItem('hsiSave'));
      localhsi1.wifiSsidExos.forEach(res => {
        if (res.WlanIndex == this.selectedSSID?.WlanIndex) {
          if (this.selectedSSID?.Enable == false) {
            this.selectedSSID.SSID = '';
            this.selectedSSID.BeaconType = 'Basic';
            this.selectedSSID.PreSharedKey[1].KeyPassphrase = '';
            this.selectedSSID.SSIDAdvertisementEnabled = false;
          }
          Object.assign(res, this.selectedSSID)
        } else if (this.selectedSSID?.WlanIndex != '') {
          localhsi1.wifiSsidExos[1] = this.selectedSSID;
        }
      })
      localStorage.setItem('hsiSave', JSON.stringify(localhsi1));

    } else {
      let localhsi = JSON.parse(localStorage.getItem('hsiSave'));
      localhsi.wifiSsidExos.forEach(res => {
        if (res.WlanIndex == this.selectedSSID?.WlanIndex) {
          if (this.selectedSSID?.Enable == false) {
            this.selectedSSID.SSID = '';
            this.selectedSSID.BeaconType = 'Basic';
            this.selectedSSID.PreSharedKey[1].KeyPassphrase = '';
            this.selectedSSID.SSIDAdvertisementEnabled = false;
          }
          Object.assign(res, this.selectedSSID)
        } else if (this.selectedSSID?.WlanIndex == '' || res.WlanIndex == '') {
          localhsi.wifiSsidExos.length = 1;
        }
      })
      localStorage.setItem('hsiSave', JSON.stringify(localhsi));
    }
    this.onDiscardSSID();

  }
  onDiscardSSID(discard = "") {
    if (discard == "discard") {
      this.getHSI(true);
    }
    this.createSSIDItems();
  }
  onSaveWorkFlow(validSubmit) {
    this.submitWorflow = true;
    // this.closeModal('saved');
    if (!validSubmit) {
      //this.onSubmitSSID();
      if (this.hsiModel._id) {
        let existing: any = localStorage.getItem('hsiSave');
        existing = existing ? JSON.parse(existing) : {};
        existing.userCredentials.Username = this.hsiModel.userCredentials.Username;
        existing.userCredentials.Password = this.hsiModel.userCredentials.Password;
        existing.timezonePosix.NTPEnable = this.hsiModel.timezonePosix.NTPEnable;
        existing.timezonePosix.NTPServer1 = this.hsiModel.timezonePosix.NTPServer1;
        existing.timezonePosix.NTPServer2 = this.hsiModel.timezonePosix.NTPServer2;
        existing.timezonePosix.NTPServer3 = this.hsiModel.timezonePosix.NTPServer3;
        existing.timezonePosix.NTPServer4 = this.hsiModel.timezonePosix.NTPServer4;
        existing.timezonePosix.NTPServer5 = this.hsiModel.timezonePosix.NTPServer5;
        existing.timezonePosix.Tz = this.hsiModel.timezonePosix.Tz;
        existing.timezonePosix.TzName = this.hsiModel.timezonePosix.TzName;
        existing.timezonePosix.TzValue = this.hsiModel.timezonePosix.TzValue;
        delete existing.orgId;
        localStorage.setItem('hsiSave', JSON.stringify(existing));
        this.hsiService.updateHSI(JSON.parse(localStorage.getItem('hsiSave'))).subscribe(res => {
          localStorage.removeItem('hsiSave');
          //this.showWorkflow = true;
          //this.showIobFlow = false;
          //this.getHSI();
          //Reload workflow table
          this.closeModal('saved');
          this.isRerender = true;
          //this.getWrkflwData();
        }, err => {
          console.log("error=>", err);

        })
      } else {
        delete this.hsiModel._id;
        localStorage.setItem('hsiSave', JSON.stringify(this.hsiModel));
        if (!JSON.parse(localStorage.getItem('hsiSave'))?.orgId) {
          let existing: any = localStorage.getItem('hsiSave');
          existing = existing ? JSON.parse(existing) : {};
          // existing.orgId = this.sso.getOrgId();
          localStorage.setItem('hsiSave', JSON.stringify(existing));
        }
        this.hsiService.postHSI(JSON.parse(localStorage.getItem('hsiSave'))).subscribe(res => {
          localStorage.removeItem('hsiSave');
          //this.showWorkflow = true;
          //this.showIobFlow = false;
          //Reload workflow table
          this.closeModal('saved');
          this.isRerender = true;
          //this.getWrkflwData();
          //this.getHSI();
        }, err => {
          console.log("error=>", err);

        })
      }
    }
  }


  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  hideError() {
    this.showError = false;
    this.errorMsg = '';
    this.showErrorini = false;
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  closeini() {
    this.showIobFlow = false;
    this.showWorkflow = true;
    this.activeTab = "Software Images";
    this.showError = false;
    this.errorMsg = '';
    this.showErrorini = false;
    this.showWarning = false;
    this.modalInfo = '';
    this.softwareImageOfficial = false;
    this.newSoftwareImage = false;
    this.isRerender = true;
    this.datatableVisible = false
    this.loading = true;
    this.getWrkflwData();
    setTimeout(() => {
      // this.loading = true;
      // if(document.getElementById('test2')?.hasAttribute('colspan')) document.getElementById('test2').removeAttribute('colspan');
      // this.loading = false;
    }, 10);
  }
  EnableTZ() {
    if (!this.hsiModel.timezonePosix.NTPEnable) {
      this.hsiModel.timezonePosix.NTPServer1 = '';
      this.hsiModel.timezonePosix.NTPServer2 = '';
      this.hsiModel.timezonePosix.NTPServer3 = '';
      this.hsiModel.timezonePosix.NTPServer4 = '';
      this.hsiModel.timezonePosix.NTPServer5 = '';
    }
  }
  changeWifiSsid() {
    let localhsi = JSON.parse(localStorage.getItem('hsiSave'));
    this.isEditSSid = false;
    localhsi.wifiSsidExos.forEach(res => {
      if (res.WlanIndex == this.selectedSSID?.WlanIndex) {
        if (this.selectedSSID?.Enable != res.Enable || this.selectedSSID?.SSID?.trim() != res.SSID || this.selectedSSID?.SSIDAdvertisementEnabled != res.SSIDAdvertisementEnabled || this.selectedSSID?.BeaconType != res.BeaconType || this.selectedSSID?.IEEE11iEncryptionModes != res.IEEE11iEncryptionModes || this.selectedSSID?.PreSharedKey[1]?.KeyPassphrase?.trim() != res.PreSharedKey[1].KeyPassphrase) {
          this.isEditSSid = true;
        } else {
          this.isEditSSid = false;
        }
      } else {
        this.isEditSSid = true;
      }
    })
  }
  addNewSoftwareImage() {
    this.newSoftwareImage = !this.newSoftwareImage;
    this.officialImage = false;
    this.fileToUpload = null;
    this.swFileObj = new FilesModel();
  }

  checkForOfficialImage() {
    if (this.officialImage) {
      this.softwareImageOfficial = true;
      this.swConfrmMsg = this.language.Make_SW_Official;
    } else {
      this.onSWFileSubmit()
    }
  }
  getWorkflowById() {
    this.getWorkflowData = this.api.getWorkflowById(this.workflowId).subscribe((res) => {
      if (res) {
        this.workflowData = res
        for (let i = 0; i < this.workflowData.actions.length; i++) {
          if (!this.workflowData.actions[i].profileName) {
            switch (this.workflowData.actions[i].actionType) {
              case "Download SW/FW Image": {
                this.fileService.getSwFileById(this.workflowData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowData.actions[i]['profileName'] = res.name
                })
                break;
              }
              case "Configuration File Download": {
                this.fileService.deleteConfigFileById(this.workflowData.actions[i].fileId).subscribe((res: any) => {
                  this.workflowData.actions[i]['profileName'] = res.name
                })
                break;
              }
            }
          }
        }
        if (this.workflowData.execPolicy.initialTrigger.type !== "CPE Event") {
          this.startDateTime = new Date(this.workflowData.execPolicy.window.startDateTime)
          this.windowlength = this.workflowData.execPolicy.window.windowLength / 60
          this.frequency = this.workflowData.execPolicy.window.frequency
          this.noOfDays = this.workflowData.execPolicy.window.daysOfMonth ? this.workflowData.execPolicy.window.daysOfMonth : 1
          this.customEndRange = this.workflowData.execPolicy.window.endDateTime ? new Date(this.workflowData.execPolicy.window.endDateTime) : undefined
          this.prioritizeCheckBox = this.workflowData.priortize === true ? true : false
          if (this.workflowData.execPolicy.window.weekdays) {
            this.weekdays = []
            if (this.workflowData.execPolicy.window.weekdays.includes("SUN")) {
              this.weekdays.push("Sunday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("MON")) {
              this.weekdays.push("Monday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("TUE")) {
              this.weekdays.push("Tuesday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("WEN")) {
              this.weekdays.push("Wednesday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("THU")) {
              this.weekdays.push("Thursday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("FRI")) {
              this.weekdays.push("Friday")
            }
            if (this.workflowData.execPolicy.window.weekdays.includes("SAT")) {
              this.weekdays.push("Saturday")
            }
          }
        }
        this.loading = false
        this.getDeviceGrp()
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.loading = false;
      // this.pageErrorHandle(err);
      // this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  getDeviceGrp() {
    let skip = 0
    let limit = 0
    this.getDeviceGrpData = this.api.GetDeviceGroup(this.orgId, skip, limit).subscribe((res: any) => {
      if (res) {
        this.deviceData = res
        this.dataAvailable = true
        this.deviceArray = this.deviceData.filter((e) => this.workflowData?.groups?.includes(e._id))
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.loading = false;
      // this.pageErrorHandle(err);
      // this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    }
    )
  }
  closeAllModal() {
    this.HideModel = true

    window.localStorage.setItem('HideModel', 'true');
    this.modalService.dismissAll("closed");
    this.loader = false;
    this.updateData = new FilesModel();
    this.newSoftwareImage = false;
    this.activeTab = "Software Images"

    this.getWrkflwData();

  }

  setSorting(element: HTMLElement, dir) {
    let addDir = dir == 'asc' ? 'sorting_asc' : 'sorting_desc';
    let removeDir = dir == 'asc' ? 'sorting_desc' : 'sorting_asc';
    element?.classList?.remove('sorting');
    element?.classList?.remove(removeDir);
    element?.classList?.add(addDir);
  }
  clearSort(element: HTMLElement) {
    if (element) {
      element.classList.add('sorting');
      element.classList.remove('sorting_asc', 'sorting_desc');
    }
  }
  initialTableOptions() {
    this.workFlowtableOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: true,
      serverSide: true,
      processing: false,
      responsive: true,
      order: [0, 'asc'],
      dom: 'tipr',
      columnDefs: [
        { targets: [0, 1, 2, 3, 4], orderable: true, searchable: false },
        { targets: 5, orderable: false }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        if (this.wrkflwTableData.length <= 0 || !dataTablesParameters.order[0]) return;
        this.loading = true;
        let tempData = this.wrkflwTableData,
          //
          defaulOnBoardings: any[] = (!this.router.url.includes("/support/netops-management/")) ? tempData.splice(0, 2) : [];
        // this.wrkflwTableData = [];
        //sorting start
        if (dataTablesParameters.order[0].column == 0) {
          tempData = _.orderBy(tempData, obj => obj.name.trim().toLowerCase(), [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }
        if (dataTablesParameters.order[0].column == 1) {
          tempData = _.orderBy(tempData, ['description'], [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }
        if (dataTablesParameters.order[0].column == 2) {
          tempData = _.orderBy(tempData, ['state'], [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }
        if (dataTablesParameters.order[0].column == 3) {
          tempData = _.orderBy(tempData, obj => obj.start ? obj.start : obj?.execPolicy?.window?.startDateTime ? obj?.execPolicy?.window?.startDateTime : '', [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }
        if (dataTablesParameters.order[0].column == 4) {
          tempData = _.orderBy(tempData, ['end'], [dataTablesParameters.order[0].dir == 'asc' ? 'asc' : 'desc']);
        }
        //sorting end

        //to clear previous sort icon
        if (this.activeSortElement) {
          this.clearSort(this.activeSortElement);
        }
        //to set sort Icon
        let setElement = (document.querySelectorAll(`#workflow-table thead tr th`)[dataTablesParameters.order[0].column] as HTMLElement);
        this.setSorting(setElement, dataTablesParameters.order[0].dir);

        this.activeSortElement = setElement;//after sort data reassigning

        tempData = [...defaulOnBoardings, ...tempData];
        this.wrkflwTableData = tempData;
        this.loading = false;

        callback({
          recordsTotal: tempData?.length,
          recordsFiltered: tempData?.length,
          data: [],
          draw: 0
        });
      },
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#workflow-table_last').addClass('disabled');
        }
      },
    }
  }
}


