import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { Subject, forkJoin} from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { SubscriberService } from '../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { ProfileService } from './profile.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { OntCategoryConfigurationService } from './ont-category-configuration.service';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
@Component({
  selector: 'app-cco-subscriber-profile',
  templateUrl: './cco-subscriber-profile.component.html',
  styleUrls: ['./cco-subscriber-profile.component.scss']
})
export class CcoSubscriberProfileComponent implements OnInit, OnDestroy {
  items = [{ name: "" }
  ]

  language;
  languageSubject;
  subscriberList;
  loading: boolean = false;
  deletedata: any;
  modalInfo: any;
  modalRef: any;
  btnDisabled: boolean;
  errorInfo: any;
  error: boolean;
  renderedOnce: boolean = true;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  successInfo: any;
  success: boolean = false;
  dataAvailable: boolean;
  subscriberTemplateList: any[];
  baseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`;
  http: any;
  bandWidthData: any;
  subsciberdefintionlist: any;
  detail: any;
  showDetails: boolean = false;
  scope: any = [];
  searchtext: string;
  MulticastRangetext = [{ 0: 'Filter #1 Starting IP Address', 1: 'Filter #1 Ending IP Address' }, { 0: 'Filter #2 Starting IP Address', 1: "Filter #2 Ending IP Address" },
  { 0: 'Filter #3 Starting IP Address', 1: 'Filter #3 Ending IP Address' }, { 0: 'Filter #4 Starting IP Address', 1: "Filter #4 Ending IP Address" },
  { 0: 'Filter #5 Starting IP Address', 1: 'Filter #5 Ending IP Address' }, { 0: 'Filter #6 Starting IP Address', 1: "Filter #6 Ending IP Address" },
  { 0: 'Filter #7 Starting IP Address', 1: 'Filter #7 Ending IP Address' }, { 0: 'Filter #8 Starting IP Address', 1: "Filter #8 Ending IP Address" }]
  MVRIdText = ['1st MVR VLAN ID', '2nd MVR VLAN ID', '3rd MVR VLAN ID', '4th MVR VLAN ID']
  MVRRangeText = ['1st VLAN - Total # of Range(s)', '2nd VLAN - Total # of Range(s)', '3rd VLAN - Total # of Range(s)', '4th VLAN - Total # of Range(s)']

  MulticastvlanRangestarttext = [{ 0: '1st VLAN - Range #1 Starting IP Address', 1: '1st VLAN - Range #2 Starting IP Address', 2: '1st VLAN - Range #3 Starting IP Address', 3: '1st VLAN - Range #4 Starting IP Address' },
  { 0: '2nd VLAN - Range #1 Starting IP Address', 1: '2nd VLAN - Range #2 Starting IP Address', 2: '2nd VLAN - Range #3 Starting IP Address', 3: '2nd VLAN - Range #4 Starting IP Address' },
  { 0: '3rd VLAN - Range #1 Starting IP Address', 1: '3rd VLAN - Range #2 Starting IP Address', 2: '3rd VLAN - Range #3 Starting IP Address', 3: '3rd VLAN - Range #4 Starting IP Address' },
  { 0: '4th VLAN - Range #1 Starting IP Address', 1: '4th VLAN - Range #2 Starting IP Address', 2: '4th VLAN - Range #3 Starting IP Address', 3: '4th VLAN - Range #4 Starting IP Address' }]
  MulticastvlanRangeendtext = [{ 0: '1st VLAN - Range #1 Ending IP Address', 1: '1st VLAN - Range #2 Ending IP Address', 2: '1st VLAN - Range #3 Ending IP Address', 3: '1st VLAN - Range #4 Ending IP Address' },
  { 0: '2nd VLAN - Range #1 Ending IP Address', 1: '2nd VLAN - Range #2 Ending IP Address', 2: '2nd VLAN - Range #3 Ending IP Address', 3: '2nd VLAN - Range #4 Ending IP Address' },
  { 0: '3rd VLAN - Range #1 Ending IP Address', 1: '3rd VLAN - Range #2 Ending IP Address', 2: '3rd VLAN - Range #3 Ending IP Address', 3: '3rd VLAN - Range #4 Ending IP Address' },
  { 0: '4th VLAN - Range #1 Ending IP Address', 1: '4th VLAN - Range #2 Ending IP Address', 2: '4th VLAN - Range #3 Ending IP Address', 3: '4th VLAN - Range #4 Ending IP Address' }]
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  // modalRef: any;
  // modalInfo: any;
  modalTitle: any;
  detail1: any;
  orgAdmin: boolean = false;
  showcloseicon: boolean = false;
  isNewRecord: boolean;
  addProfileObj: any = {
    addProfileTab: [],
    start: {
      name: '',
      description: '',
      isNameEntered: false
    },
    buildProfile: {
      allProfileData: [],
      isStepperClicked: true,
      innerProfileCategory: [],
      disableAddCategoryBtn: true,
      isFromDataModel: false,
      dataModelCategoryObj: {
        isFormValid: false,
        name: 'Set Parameter Value',
        displayName: 'Set Parameter Value',
        parameters: history.state?.dataModel,
      },
      exisitingCategory: [],
      categoryList: [],
      reviewPageCategoryList: [],
      categoryConfigData: []
    }
  };
  addProfileTab: any;
  profileTableData: any;
  innerProfileCategory: any;
  showOverViewPage: any;
  categoryConfigurationSubject: any;
  categoryListData: any;
  groupOfCategory: any;
  categoryConfigData: any;
  innerProfileConfigurationSubject: any;
  selectedCategoryType: any;
  buildCategoryFormData: any[];
  hasScopeAccess = false;
  readonly radiolblValue = ['Enabled', 'Disabled']
  voiceProfileList: any;
  Showprofile: boolean = false;
  voiceService: any;
  Type: any;
  getAllDialPlanSubscribe: any;
  dialPlanList: any[];
  isCOC: boolean;
  searchkey: any;
  constructor(private translateService: TranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private service: ProfileService,
    private dialogService: NgbModal,
    private subscriberService: SubscriberService,
    private ccoOrgAdminService: CcoOrgAdminService,
    private sso: SsoAuthService,
    private titleService: Title,
    private managementService: ManagementService,
    private categoryConfigService: OntCategoryConfigurationService, private route: ActivatedRoute) {
    this.getDialPlanList()
    this.isCOC = this.router.url.includes('cco/services');
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
  }

  setTitle() {
    this.titleService.setTitle(this.isCOC ? `${this.language['ONT Services Profiles']} - ${this.language['Services Profiles']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}` : `${this.language['ONT Services Profiles']}  - ${this.language['Profiles']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
  }
  ngOnInit(): void {
    this.categoryConfigurationSubject = this.categoryConfigService.categoryConfigData().subscribe(data => {
      this.categoryListData = data;
      this.groupOfCategory = _.uniq(_.map(data, 'group')).sort();
      this.categoryConfigData = _.mapValues(_.groupBy(data, 'group'),
        groupList => groupList.map(group => _.omit(group, 'group')));
    });
    this.innerProfileConfigurationSubject = this.categoryConfigService.innerProfileCategory().subscribe(data => {
      this.innerProfileCategory = data['result'];

    });

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableLanguageOptions();
      this.rerender();
      this.setTitle()
    });
    this.setTitle()
    let scopes = this.sso.getScopes();


    if (environment.VALIDATE_SCOPE) {

      // let validScopes: any = Object.keys(scopes);
      if (scopes && ((scopes['cloud.rbac.coc.services.serviceprofiles.serviceprofiles']) || (this.router.url.includes('cco-foundation') && scopes['cloud.rbac.foundation.configurations']))) {
        this.hasScopeAccess = true;
        if (this.router.url.includes('/services/service-profiles/')) {
          if (scopes['cloud.rbac.coc.services.serviceprofiles.serviceprofiles']?.indexOf('read') !== -1) this.scope['read'] = true;
          if (scopes['cloud.rbac.coc.services.serviceprofiles.serviceprofiles']?.indexOf('write') !== -1) this.scope['write'] = true;
        } else {
          if (scopes['cloud.rbac.foundation.configurations']?.indexOf('read') !== -1) this.scope['read'] = true;
          if (scopes['cloud.rbac.foundation.configurations']?.indexOf('write') !== -1) this.scope['write'] = true;
        }
      }

    } else {
      this.hasScopeAccess = true;
      this.scope = {
        read: true,
        write: true
      }

    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

    this.showDetails = false;
    this.renderedOnce = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      stateSave: true,
      // stateDuration: -1,
      autoWidth: false,
      columnDefs: [
        { targets: [0], orderable: true },
        { targets: [1], width: '25%' },
        { targets: [2], width: '25%' },
        { targets: [3], width: '150px', orderable: false },

      ],
      order: [0, 'asc'],

      // drawCallback: function () {
      //   this.api().state.clear();
      // },
      // 'stateSaveCallback': function (settings, data) {
      //   // make changes here before saving
      //   window.localStorage['pageUrl'] = data;
      // },
      // 'stateLoadCallback': function (settings) {
      //   // make changes here before loading
      //   return window.localStorage['pageUrl'];
      // }
    }
    this.route.queryParams.subscribe((params: any) => {
      if (params['searchkey'] ) {
        this.searchkey = params['searchkey'];
        
      }
    })
    this.tableLanguageOptions();
    //this.getAdmins();
    this.testForkjoin();

  }

  getprofilelist() {
    this.loading = true;
    this.service.getsubscriber().subscribe((data: any) => {     
      if (data == 'Service template not found')
        this.subscriberList = [];
      else
        //this.subscriberList = data;
        this.renderTable(false);
      this.loading = false;
    },
      (err) => {
        this.error = true;
        this.pageErrorHandle(err);
        this.loading = false;
        this.renderTable(false);
        this.dataAvailable = true;
      });
  }

  copysubscriber(name, type) {
    //debugger;
    let term = "", profiletype;
    this.search(term);
    if (type == "Service Definition Template(Voice)" || type == "Service Definition Template(Data)" || type == "Service Definition Template(Video)")
      profiletype = 'Service Defintion'
    else if (type == "Bandwidth Tier")
      profiletype = "Bandwidth tier";
    else if (type == "Subscriber Template" || type == "Service Profile(Data)"
      || type == "Service Profile(Voice)" || type == "Service Profile(Video)")
      profiletype = "Subscriber";
    else if (type == "Oui Match List")
      profiletype = "ouiMatchList";
    else if (type == "Multicast Range")
      profiletype = "Multicast Range";
    else if (type == "Multicast VLAN")
      profiletype = "Multicast VLAN";
    // this.router.navigate([`/cco/services/service-profiles/ONT-profile/add/${name}/${profiletype}`]);
    this.router.navigate([this.isCOC ? '/cco/services/service-profiles/ONT-profile/add' : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile/edit'], { queryParams: { name: name, type: profiletype, key: 'copy' } });
  }

  editsubscriber(name, type) {
    let term = "", profiletype;
    this.search(term);
    if (type == "Service Definition Template(Voice)" || type == "Service Definition Template(Data)" || type == "Service Definition Template(Video)")
      profiletype = 'Service Defintion'
    else if (type == "Bandwidth Tier")
      profiletype = "Bandwidth tier";
    else if (type == "Subscriber Template" || type == "Service Profile(Data)"
      || type == "Service Profile(Voice)" || type == "Service Profile(Video)")
      profiletype = "Subscriber";
    else if (type == "Oui Match List")
      profiletype = "ouiMatchList";
    else if (type == "Multicast Range")
      profiletype = "Multicast Range";
    else if (type == "Multicast VLAN")
      profiletype = "Multicast VLAN";
    // this.router.navigate([`/cco/services/service-profiles/ONT-profile/add/${name}/${profiletype}`]);
    this.router.navigate([this.isCOC ? '/cco/services/service-profiles/ONT-profile/add' : 'cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile/edit'], { queryParams: { name: name, type: profiletype } });
  }

  delete(list) {
    this.deletedata = list;
    this.modalInfo = this.deletedata.name;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  showdetails(list) {
    // debugger
    if (!this.scope['read'])
      return;

    this.showDetails = true;
    this.detail = list;
    this.detail.Type = this.detail?.acsJsonb?.Type
    this.detail.X_000631_MaxStreams = this.detail?.acsJsonb?.X_000631_MaxStreams
    this.voiceProfileList = []
    this.subscriberList.forEach(element => {
      if (element.type == "Service Profile(Video)") {
        this.voiceProfileList.push(element)
      }
    });
    this.voiceProfileList.forEach(element => {
      if (element.name === this.detail?.serviceTemplateName) {
        this.Showprofile = true
      }
    })
    //  if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
    let serviceObj = {
      DATA: 'Data Service',
      VIDEO: 'Video Service',
      VOICE: 'Voice Service'
    }

    if (serviceObj[this.detail['serviceType']]) {
      this.patchValue();

    }

    //  }

  }
  showTable() {
    // this.searchtext = "";
    // this.dtTrigger = new Subject();
    // setTimeout(() => {
    //   this.dtTrigger.next();
    // }, 10);
    this.showDetails = false;

  }
  Deletesubscriber() {
    this.btnDisabled = true;
    this.loading = true; let profiletype;
    if (this.deletedata.type == 'Service Definition' || this.deletedata.type == "Service Definition Template(Voice)" || this.deletedata.type == "Service Definition Template(Data)" || this.deletedata.type == "Service Definition Template(Video)")
      profiletype = 'Service Defintion'
    else if (this.deletedata.type == "Bandwidth Tier")
      profiletype = "Bandwidth tier";
    else if (this.deletedata.type == "Subscriber Template" || this.deletedata.type == "Service Profile(Data)"
      || this.deletedata.type == "Service Profile(Voice)" || this.deletedata.type == "Service Profile(Video)")
      profiletype = "Subscriber";
    else if (this.deletedata.type == "Oui Match List")
      profiletype = "ouiMatchList";
    else if (this.deletedata.type == "Multicast Range")
      profiletype = "Multicast Range";
    else if (this.deletedata.type == "Multicast VLAN")
      profiletype = "Multicast VLAN";
    this.service.delsubscriber(this.deletedata.name, profiletype).subscribe((data: any) => {
      //this.loading = false;
      // this.success = true;
      // this.successInfo = this.language['Deleted Successfully'];
      // $("html, body").animate({ scrollTop: 0 }, "slow");
      // setTimeout(() => {
      //  
      // }, 500)
      this.testForkjoin();
      this.btnDisabled = false;
      this.deletedata = "";
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.error = true;

      if (typeof err.error.message === "object") {
        this.errorInfo = err.error.message.message;
      } else if (typeof err.error === "string") {
        this.errorInfo = err.error;
      } else if (typeof err.error === 'object' && !err.error.message) {
        if (err.error.errorMessage)
          this.errorInfo = err.error.errorMessage
        else
          this.errorInfo = err.error.error;
      } else {
        this.errorInfo = err.error.message;
      }
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.btnDisabled = false;
      this.deletedata = "";
    })
  }

  closeModal(): void {
    this.deletedata = "";
  }
  renderTable(rerender?) {
    this.tableLanguageOptions();
    if (this.renderedOnce) {
      this.rerender();
      setTimeout(() => {
        this.dataAvailable = true;
        this.renderedOnce = false;
        this.loading = false;
      }, 800)
    } else {
      this.rerender();
      this.dataAvailable = false;
      this.loading = true;
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 800)
    }
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }

  closeAlert() {
    this.error = false;
  }
  search(term: string) {
   if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();

    });
    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.columns(0).search(term).draw();
    // });
  }



  rerender(): void {
    this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance?.destroy();
      this.dtTrigger?.next();
    });
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    sessionStorage.removeItem('DataTables_subscriber-template_/cco/operations/cco-subscriber-operations/operations/ONT-profile');
    localStorage.removeItem('DataTables_subscriber-template_/cco/operations/cco-subscriber-operations/operations/ONT-profile');
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  
  isTableLoaded = false; 
  testForkjoin() {
    this.loading = true;
    let observables = [
      this.subsciberdefintionlist = this.service.getsubscriber(),
      this.subscriberService.getsubscriber(),
      this.service.getOuiList(),
      this.service.getMultipleRange(),
      // this.service.getMultiplecastVlan()
    ]
    forkJoin(this.isCOC ? [...observables, this.subscriberService.getbandwidth()] : observables).subscribe((alldatas: any) => {
      if (alldatas?.length) {
        if (typeof alldatas[0] === 'object' && alldatas[0]) {
          alldatas[0].forEach(ele => {          
            if (ele.serviceType == "VOICE")
              ele = Object.assign(ele, { type: "Service Definition Template(Voice)" });   
            else if (ele.serviceType == "DATA")
              ele = Object.assign(ele, { type: "Service Definition Template(Data)" });
            else if (ele.serviceType == "VIDEO")
              ele = Object.assign(ele, { type: "Service Definition Template(Video)" });             
          });
          
        } else {
          alldatas[0] = [];
        }

        if (typeof alldatas[1] === 'object' && alldatas[1]) {
          alldatas[1].forEach(ele => {
            if (ele.serviceType == "VOICE")
              ele = Object.assign(ele, { type: "Service Profile(Voice)" });
            else if (ele.serviceType == "DATA")
              ele = Object.assign(ele, { type: "Service Profile(Data)" });
            else if (ele.serviceType == "VIDEO")
              ele = Object.assign(ele, { type: "Service Profile(Video)" });
            // ele = Object.assign(ele, { type: "Subscriber Template" });
          });
        } else {
          alldatas[1] = [];
        }

        if (typeof alldatas[4] === 'object' && alldatas[4]) {
          alldatas[4].forEach(ele => {
            ele = Object.assign(ele, { type: "Bandwidth Tier", innerProfileCategory: "Bandwidth" });
          });
        } else {
          alldatas[4] = [];
        }

        if (typeof alldatas[2] === 'object' && alldatas[2]) {
          alldatas[2].forEach(ele => {
            ele = Object.assign(ele, { type: "Oui Match List" });
          });
        } else {
          alldatas[2] = [];
        }

        if (typeof alldatas[3] === 'object' && alldatas[3]) {
          alldatas[3].forEach(ele => {
            ele = Object.assign(ele, { type: "Multicast Range", innerProfileCategory: 'Video - Multicast Range Filters' });
          });
        } else {
          alldatas[3] = [];
        }

        // if (typeof alldatas[4] === 'object' && alldatas[4]) {
        //   alldatas[4].forEach(ele => {
        //     ele = Object.assign(ele, { type: "Multicast VLAN", innerProfileCategory: 'Video - Multicast VLAN Registration (MVR)' });
        //   });
        // } else {
        //   alldatas[4] = [];
        // }


        this.subscriberList = [...alldatas[0], ...alldatas[1], ...alldatas[2], ...alldatas[3], ...alldatas[4]];
        if(this.searchkey){
          let obj=this.subscriberList.find(data => data?.name == this.searchkey );
          if(obj){
            this.showdetails(obj)
          }
        }
        
      }
      else this.subscriberList = [];


      this.loading = false;
      // this.reDrawTable()
      //this.renderTable(false);
      // this.search("");

      if (this.isTableLoaded) {
        this.tableLanguageOptions();
        this.rerender();
      } else {
        this.isTableLoaded = true;
        this.tableLanguageOptions();
        this.dtTrigger.next();
        this.search('')
      }
    }, err => {
      this.pageErrorHandle(err);
      this.loading = false;
      //this.renderTable(false);
      if (this.isTableLoaded) {
        this.tableLanguageOptions();
        this.rerender();
      } else {
        this.isTableLoaded = true;
        this.tableLanguageOptions();
        this.dtTrigger.next();
      }
    })
  }
  
  getDialPlanList() {
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
    this.getAllDialPlanSubscribe = this.managementService.getDialPlanList(this.sso.getOrgId()).subscribe((res: any) => {
      if (res) {
        this.dialPlanList = [];
        for (var i = 0; i < res?.length; i++) {
          let data = {
            "value": res[i]._id,
            "displayName": res[i].name
          }
          this.dialPlanList.push(data)
        }

      }
    }, (err: HttpErrorResponse) => {
    }, () => {
    });
  }
  openModel(type, profilename) {
    let apitype;
    this.modalTitle = profilename;
    if (type == "Bandwidth Tier") {
      apitype = "Bandwidth tier"
      this.modalInfo = "Bandwidth Tier"
    }
    else if (type == "Subscriber Template") {
      apitype = "Subscriber"
      this.modalInfo = "Service Profile"
    }
    else if (type == "Oui Match List") {
      apitype = "ouiMatchList"
      this.modalInfo = "Oui Match List"
    }
    else if (type == "Multicast Range") {
      apitype = "Multicast Range"
      this.modalInfo = "Multicast Range"
    }
    else if (type == "Multicast VLAN") {
      apitype = "Multicast VLAN"
      this.modalInfo = "Multicast VLAN"
    }

    this.loading = true;
    this.service.getsubscriberDetail(profilename, apitype).subscribe((data: any) => {
      this.loading = false;
      this.detail1 = data;

      let serviceObj = {
        DATA: 'Data Service',
        VIDEO: 'Video Service',
        VOICE: 'Voice Service'
      }

      if (serviceObj[this.detail1['serviceType']]) {
        this.patchValue(true);
      }

      this.openModalInfo();
    },
      (err) => {
        this.loading = false;
        this.modalInfo = "Error"
        this.pageErrorHandle(err);
        this.openModalInfo();
        // this.error = true;
        //this.errorInfo = err.error.message;
      });
  }
  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  getAdmins() {
    this.loading = true;
    this.ccoOrgAdminService.fetchAmdins('All').subscribe((data: any) => {
      this.loading = false;
      if (data == 'Org Admin Data not found' || data == null || !data) {
        this.orgAdmin = true;
        this.renderTable(false);
        return;
      }
      if (data) {
        if (data?.orgEnable == true) {
          this.orgAdmin = false
          this.testForkjoin();
        }
        else if (data?.orgEnable == false) {
          this.orgAdmin = true
          this.renderTable(false);
        }
      }

    }, err => {
      this.pageErrorHandle(err);
      this.orgAdmin = true
      this.renderTable(false);
    })

  }
  GotoAdd() {
    this.router.navigate(["/cco/services/service-profiles/ONT-profile/add"]);
  }
  closeicon(text) {
    this.searchtext = ""
    this.showcloseicon = false
    this.search(this.searchtext);
  }

  patchValue(forModalInfo = false) {

    let serviceObj = {
      DATA: 'Data Service',
      VIDEO: 'Video Service',
      VOICE: 'Voice Service'
    }

    const profileData: any = {
      "name": this.detail['name'],
      "orgId": this.sso.getOrgId(),
      "configurations": [
        {
          "category": serviceObj[this.detail['serviceType']],
          "parameterValues": this.detail['acsJsonb']
        }]
    };

    if (forModalInfo) {
      profileData.configurations = [
        {
          "category": serviceObj[this.detail1['serviceType']],
          "parameterValues": this.detail1['acsJsonb']
        }]
    }

    if (profileData) {
      this.voiceService = profileData?.configurations[0]?.parameterValues?.Type
      this.isNewRecord = false;
      this.addProfileObj = {
        addProfileTab: this.addProfileTab,
        start: {
          name: profileData.name,
          description: profileData.description,
          isNameEntered: false
        },
        buildProfile: {
          allProfileData: this.subscriberList,
          isStepperClicked: true,
          innerProfileCategory: this.innerProfileCategory,
          disableAddCategoryBtn: true,
          isFromDataModel: history.state.isDataModel,
          dataModelCategoryObj: {
            isFormValid: false,
            name: 'Set Parameter Value',
            displayName: 'Set Parameter Value',
            parameters: history.state.dataModel,
          },
          exisitingCategory: [],
          categoryList: [...this.getCategoryObj(profileData.configurations)],
          reviewPageCategoryList: [...this.getCategoryObj(profileData.configurations)],
          categoryConfigData: []
        }
      }
      this.getCategoryObj(profileData.configurations);
      this.showOverViewPage = history.state.isOverview;
    }
      if (forModalInfo) {
      if (this.detail1['acsJsonb']) {
        this.convertParamsToUser(this.addProfileObj);
      }
    } else {
      if (this.detail['acsJsonb']) {
        this.convertParamsToUser(this.addProfileObj);
      }
    }



  }
  getCategoryObj(selectedCategory) {
    if (selectedCategory && selectedCategory[0]?.parameterValues?.dialPlanRg) {
      this.dialPlanList.forEach(el => {
        if (el.value === selectedCategory[0]?.parameterValues?.dialPlanRg) {
          selectedCategory[0].parameterValues.dialPlanRg = el.displayName
        }
      })
    }

    selectedCategory.forEach(item => {
      for (let key of Object.keys(this.categoryConfigData)) {
        this.categoryConfigData[key].forEach(category => {
          if (category.displayName === item.category || category.name === item.category) {
            this.selectedCategoryType = category;
            this.addProfileObj.buildProfile.exisitingCategory.push(category.displayName);
            this.addProfileObj.buildProfile.exisitingCategory = this.addProfileObj.buildProfile.exisitingCategory.concat(this.NEW_CATEGORY_BUTTON_DISABLE);
          }
        });
      }
      item.selectedCategory = this.selectedCategoryType.parameters;
    });
    let DSCPType = selectedCategory[0].selectedCategory.find(e => e.displayName === 'RTP DSCP Input Type')?.defaultValue;
    selectedCategory[0].selectedCategory = selectedCategory[0].selectedCategory.filter(e => (e.displayName == 'RTP DSCP' ? (DSCPType ? !e.hasOwnProperty('valueEnums') : e.hasOwnProperty('valueEnums')) : true))
    return selectedCategory;
  }
  NEW_CATEGORY_BUTTON_DISABLE(NEW_CATEGORY_BUTTON_DISABLE: any): any[] {
    throw new Error('Method not implemented.');
  }

  convertParamsToUser(value: any): any {
    this.buildCategoryFormData = [];
    let allProfileData = (value.buildProfile && value.buildProfile.allProfileData) ? value.buildProfile.allProfileData : [];
    let allProfilesObj = {};
    if (allProfileData) {
      allProfileData.forEach((element: any) => {
        allProfilesObj[element.id] = element.name;
      });
    }

    if (!(value.buildProfile.reviewPageCategoryList && value.buildProfile.reviewPageCategoryList.length > 0)) {
      return;
    }
    value.buildProfile.reviewPageCategoryList?.forEach(item => {
      //delete item.parameterValues['Type']
      if (typeof item.parameterValues === 'object' && item.parameterValues['version'] === 'dualStack' && item.category !== "Voice Service") {
        delete item.parameterValues['NATEnabled'];
        delete item.parameterValues['X_000631_Dhcp6cForPrefixDelegation'];
      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['Mode'] === "RG L2 Bridged" && item.parameterValues['productFamily'] === "EXOS" && item.category == "Video Service") {
        item.parameterValues['ExosBridgedInterface'] = item.parameterValues['BridgedInterface'];
        delete item.parameterValues['BridgedInterface'];
      }

      /* fix the CCL-23699 */               /* Fix for CCL-28238 item.category !== "Voice Service" */
      if (typeof item.parameterValues === 'object' && item.parameterValues['VlanTagAction'] === false && item.category !== "Voice Service") {
        //delete item.parameterValues['X_000631_VlanMuxID'];
        delete item.parameterValues['AnyPortAnyServiceEnabled'];
        delete item.parameterValues['X_000631_VlanMux8021p'];
        delete item.parameterValues['X_000631_VlanMuxID'];

        //delete item.parameterValues['X_000631_VlanMux8021p'];
      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['QosType'] !== 'Custom' && item.category === 'QOS Rule') {
        delete item.parameterValues['ClassInterface'];
        delete item.parameterValues['DSCPMark'];
        delete item.parameterValues['DestIP'];
        delete item.parameterValues['DestMask'];
        delete item.parameterValues['DestPort'];
        delete item.parameterValues['DestPortRangeMax'];
        delete item.parameterValues['Ethertype'];
        delete item.parameterValues['SourcePort'];
        delete item.parameterValues['SourceIP'];
        delete item.parameterValues['SourceMask'];
        delete item.parameterValues['SourcePortRangeMax'];
      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['QosType'] === 'Custom' && item.category === 'QOS Rule') {
        delete item.parameterValues['DSCPMark'];
        delete item.parameterValues['ClassInterface'];
        delete item.parameterValues['ClassificationEnable'];
      }
      /* fix the CCL-23699 */
      item.buildCategoryFormData = {};
      for (let category of item.selectedCategory) {
        if ((item.parameterValues[category.name] || item.parameterValues[category.name] === false || item.parameterValues[category.name] === 0) && category.displayName && category.name !== 'AdvancedSettings') {
          let skipAttributes = ['X_000631_VlanMux8021p', 'X_000631_VlanMuxID'];
          if (skipAttributes.indexOf(category.name) !== -1) {
            if (!item.parameterValues['VlanTagAction']) {
              continue;
            }
          }
          const formData: any = {}
          if (category.type !== 'radio' && category.valueEnums && category.valueEnums.length > 0) {
            if (!_.isArray(item.parameterValues[category.name])) {
              const dropdownVal = category.valueEnums.filter(option => {
                return (option.value === item.parameterValues[category.name]);
              })[0];
              formData[category.displayName] = (dropdownVal) ? dropdownVal.displayName : undefined;
            } else {
              let tempVal: any = [];
              item.parameterValues[category.name].forEach(item => {
                tempVal.push(category.valueEnums.filter(option => {
                  return (option.value === item);
                })[0].displayName)
              })
              formData[category.displayName] = (tempVal) ? tempVal.toString() : undefined;
            }
          } else {
            formData[category.displayName] = (item.category !== 'Set Parameter Value' &&
              item.parameterValues[category.name] === true) ? this.getRadioBtnLblValue(category, true) :
              (item.category !== 'Set Parameter Value' && item.parameterValues[category.name] === false) ?
                this.getRadioBtnLblValue(category, false) : item.parameterValues[category.name];
          }
          item.buildCategoryFormData = Object.assign(item.buildCategoryFormData, formData);

          let formValues = {};

          if (item.buildCategoryFormData) {
            for (const key in item.buildCategoryFormData) {
              if (allProfilesObj[item.buildCategoryFormData[key]]) {
                formValues[key] = allProfilesObj[item.buildCategoryFormData[key]];
              } else {
                formValues[key] = item.buildCategoryFormData[key];
              }
            }

            item.buildCategoryFormData = formValues;
          }

        }
      };
    });

    this.addProfileObj = value;
  }

  getRadioBtnLblValue(category, btnVal): string {
    if (category.valueEnums && category.valueEnums.length > 0) {
      const selectedObj: any = category.valueEnums.filter(item => {
        return (item.value === btnVal);
      });
      if (selectedObj.length > 0 && this.radiolblValue.indexOf(selectedObj[0].displayName) === -1) {
        return selectedObj[0].displayName;
      } else {
        return (btnVal) ? 'ON' : 'OFF';
      }
    } else {
      return (btnVal) ? 'ON' : 'OFF';
    }
  }

  servicetype(type) {
    let data = {
      DATA: 'Data_Profile',
      VOICE: 'Voice_Profile',
      VIDEO: 'Video_Profile'
    }
    return this.language[data[type]]
  }

  onToggleAccordion(accordionIndex) {
    if (!$('#collapseOne').hasClass('show')) {
      $('.accordion-collaps').removeClass('show');
      $('.card-header').addClass('collapsed');
    }
  }

  convert_kbps_to(value, unit?) {
    return this.service.convert_kbps_to(value, unit);
  }

  gotoAddSP() {
    if (this.router?.url?.indexOf('cco-foundation/foundation-configuration') !== -1) {
      this.router.navigate(['/cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile/add']);
    } else {
      this.router.navigate(['/cco/services/service-profiles/ONT-profile/add']);
    }
  }

  redirectFromServiceProfiles:boolean = true;
  serviceProvisioned(name){ 
    this.router.navigate([this.isCOC ? '/cco/services/subscribers/system/list' : '/cco-foundation/foundation-systems/foundation-manage/foundation-system-list'],{queryParams: { name: name, redirectFromServiceProfiles: this.redirectFromServiceProfiles, isProvisioned:true }})
   
  }
}
