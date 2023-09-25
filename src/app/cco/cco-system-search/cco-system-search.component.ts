import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service'
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { CommonFunctionsService as sharedCommonService } from 'src/app/shared/services/common-functions.service'; 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import _ from 'lodash';
import { DataServiceService } from 'src/app/support/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddServiceSystemComponent } from '../system/cco-subscriber-system/add-service-system/add-service-system.component';
import { AddSubscriberService } from '../system/cco-subscriber-system/add-service-system/add-subscriber.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';
import { log } from 'console';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-cco-system-search',
  templateUrl: './cco-system-search.component.html',
  styleUrls: ['./cco-system-search.component.scss']
})
export class CcoSystemSearchComponent implements OnInit {
  modalRef: any;
  @ViewChild('dissasciateDeviceModel', { static: true })
  private dissasciateDeviceModel: TemplateRef<any>;
  @ViewChild('deleteSubscriberModal', { static: true })
  private deleteSubscriberModal: TemplateRef<any>;
  @ViewChild('deleteDevicerModal', { static: true })
  private deleteDevicerModal: TemplateRef<any>;
  @ViewChild('associateSubscriberModal', { static: true }) private associateSubscriberModal: TemplateRef<any>;
  @ViewChild('CreateSubscriberModal', { static: true }) private CreateSubscriberModal: TemplateRef<any>;
  @ViewChild('factoryresetModal', { static: true })
  private factoryresetModal: TemplateRef<any>;
  @ViewChild('resetconfirmModal', { static: true }) private resetconfirmModal: TemplateRef<any>;
  closeModal: string;
  @ViewChild('reboot', { static: false }) private reboot: TemplateRef<any>;
  @ViewChild('rebootStatus', { static: false }) private rebootStatus: TemplateRef<any>;

  // tableOptions: DataTables.Settings = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   dom: 'tipr',
  //   ordering: false,
  //   drawCallback: (settings) => {
  //     let total = settings.aoData.length;
  //     let length = settings._iDisplayLength;
  //     // if (total <= length) {
  //     //   $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
  //     // }
  //   },
  // };

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr'
  };
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  frTable: any;
  tableData: any = [];
  dataAvailable: boolean;
  modalLoader: boolean;
  isModalError: boolean = false;
  modalWarningMessage: any = '';
  empty = {
    FSAN:"",
      ModelName:'',
      RegistrationID:'',
      SubscriberName:'',
      Account:'',
      MacAddress:''
  };
  exportEventSubs: any;
  servicePlans = [];
  servicePlanSelected = '1G';
  swapExisting: any;
  bDeleteServices: any;
  language: any = {};
  languageSubject;
  newSystemId: any;
  systemId: any;
  syssN: any;
  disassociate: any;
  disassociateDevice: any;
  ORG_ID: any;
  errorInfo: any;
  error: boolean;
  success: boolean;
  showResult: boolean;
  ccoSystemSearchText: any;
  searchText: any;
  loading: boolean;
  accountSearchText: string = "";
  isAssociateError = false

  searchResult: any = {};
  sortBy: any;
  sortType: any;
  filterCount: any;
  systemsList: any = [];
  tableCount: any = 0;
  tableCounts: any;
  subID: any;
  bFactoryReset: boolean;
  subscriberId: any;
  _array = Array;
  queryParams: { sn: any; subscriber: any; regId: any };
  successInfo: any;
  allListSubs: any;
  private ccoSystemSearchText$ = new Subject<string>();
  subscribers$: any;
  showFilterCount: boolean;
  count: number = 0;
  countAvailable: any;
  showCount: boolean;
  showCountSubs: any;
  devicesSelected: any;

  isSystemView: boolean = false;
  deletedevice: any;
  deletesubscriber: any;
  orgData: any;
  deleteFactoryResetSub: any;
  associateSubs: any;
  submitted: boolean;
  associateSubscriber: any;
  associateSubsciberSubs: any;
  systemid: any;
  accountSearchResult: any[];
  searchSubscriber: any;
  disableSub: boolean;
  unassociatedSubscriber: any;


  createSubscriber: any;
  createSubscriberSubs: any;
  isAddError: boolean = false;
  createSubmitted: boolean;
  createdSubscriberId: any;
  createdSubcriberData: any;
  successMsg: any;
  showSuccess: boolean;
  createdSubscriberName: any;
  editSubscriberData: any;
  editSubscriber: boolean;
  showwarning: boolean;
  isDev: boolean;
  bootHappening: any;
  completionStatus: {
    isTime: any; //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
    isResponse: any; //'Starting Factory Reset',
  }[];
  systemId_Reset: any;
  systemId_Reboot: any;
  rbtStatus: boolean;
  hasWrite: boolean = false;
  showconfirmation: boolean = true;
  ccoSystemSearchPageNo: number;
  displayPage: number;
  previouspage: number;
  rebootsub: any;
  factoryResetsub: any;
  searchsub: any;
  getcountsub: any;
  Isontdevice: boolean;
  ontSn: any;
  ontsn: any;
  vendor: any;
  sn: any;
  serialNum: any;
  allowAddSystems = true;
  hasScopeAccess = false;
  deviceType: any;
  linkageType: string;
  orgEnable: any;
  allowsupportCloud: boolean = false;
  esTable: any;
  de_DETable: DataTables.LanguageSettings;
  deviceInfo: any;
  model: any;
  deleteONT: boolean;
  servify: boolean;
  enableMyCommunity: boolean;
  show: boolean;
  Settings: any;
  syssNONT: any;
  subscriberName: any;
  deletebothDevice: boolean = false;
  serviceEnable:boolean =false;
  ServiceTemplateView:boolean;
  isProvisioned:boolean = false;
  records:any;
  recordsToExport: any;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private commonFunctionsService: CommonFunctionsService,
    private modalService: NgbModal,
    private ccoCommonService: CcoCommonService,
    private commonOrgService: CommonService,
    private service: CcoSystemService,
    private exportExcel: ExportExcelService,
    private systemservice: AddSubscriberService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private dataService: DataServiceService,
    private formBuilder: FormBuilder,
    private changeDetect: ChangeDetectorRef,
    private titleService: Title,
    private commonService: sharedCommonService,
    private supportrouterservice: SupportRouterService,

  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.showCountSubs = this.systemservice.showCountStatus$.subscribe((res: boolean) => {
      this.showCount = res;
    })


    let url = this.router.url;
    if (url.indexOf('/cco/services/subscribers/system/list') > -1) {
      this.isSystemView = true;
    } else this.isSystemView = false;
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }
    this.ccoCommonService.currentPageAdder('system-table-view');
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
    let base = `${environment.API_BASE}`;
    let host = window.location.host;
    if (base.indexOf('/dev.api.calix.ai') > -1 || host.indexOf('localhost') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    this.isDev = true;

  }

  ngOnInit(): void {
    this.getOrgAdminData();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.tableLanguageOptions();
        const tempObj = {
          _iDisplayStart: this.displayPage,
          _iDisplayLength: this.tableCounts.displayCount,
          _iRecordsDisplay: this.tableCounts.displayed,
          _iRecordsTotal: this.tableCounts.total,
          oPreviousSearch: {
            sSearch: this.tableCounts.searchText
          }
        };
        this.changeTableStatusLanguage(tempObj);
        this.redraw();
        this.titleService.setTitle(`${this.language['Subscriber List']} - ${this.language['Subscribers']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      });

    this.titleService.setTitle(`${this.language['Subscriber List']} - ${this.language['Subscribers']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      if (scopes['cloud.rbac.coc.services.subscribers'] || scopes['cloud.rbac.coc.services.subscribers.subscriberslist']) {
        this.hasScopeAccess = true;
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }
    
    this.route.queryParams.subscribe((params)=>{
      
      this.searchText = params?.name;
      if(params?.isProvisioned) this.isProvisioned = params?.isProvisioned;
      this.ServiceTemplateView = params?.redirectFromServiceProfiles == 'true'? true : false;
    })

    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowAddSystems = false;
    }
    if (enttlmnts[118] || enttlmnts[120]) {
      this.allowsupportCloud = true;
    }
    this.loading = true;
    this.formGrouping({});
    this.getScopes();
    $(".asso-search-dropdown").hide();
    this.getDeleteAndFactoryResetData();
    this.showResult = true;



    sessionStorage.removeItem('cco_susb_system_list_search');
    sessionStorage.removeItem('cco_susb_system_list_search_p_no');

    this.ccoSystemSearchText = history?.state?.ccoSystemSearchText || history?.state?.subscriberId;
    this.ccoSystemSearchPageNo = history?.state?.ccoSystemSearchPageNo ? parseInt(history?.state?.ccoSystemSearchPageNo) : 0;
    if (this.ccoSystemSearchText || this.ccoSystemSearchText == "" || this.ccoSystemSearchPageNo) {
      this.searchText = this.ccoSystemSearchText;
      setTimeout(() => {
        this.redraw();
      }, 1000)
    }

    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.showResult = true;
        this.ccoSystemSearchPageNo = history?.state?.ccoSystemSearchPageNo ? parseInt(history?.state?.ccoSystemSearchPageNo) : 0;
        this.ccoSystemSearchText = history?.state?.ccoSystemSearchText || history?.state?.subscriberId;
        if (this.ccoSystemSearchText || this.ccoSystemSearchText == "" || this.ccoSystemSearchPageNo) {
          this.searchText = this.ccoSystemSearchText;
          setTimeout(() => {
            this.redraw();
          }, 1000)
        }
      }
    });

    $("body").off('click', '.languageContent ul li a');
    $("body").on('click', '.languageContent ul li a', () => {
      const tempObj = {
        _iDisplayStart: this.displayPage,
        _iDisplayLength: this.tableCounts.displayCount,
        _iRecordsDisplay: this.tableCounts.displayed,
        _iRecordsTotal: this.tableCounts.total,
        oPreviousSearch: {
          sSearch: this.tableCounts.searchText
        }
      };
      this.changeTableStatusLanguage(tempObj);
    });
    this.serviceEnable = history.state.backtoService
    this.doSearch()
    this.getCount();
    this.tableLanguageOptions();
    //this.performSearch();
    //this.getListData();
    this.servicePlans = [
      {
        name: '1G',
        value: '1G',
      },
      {
        name: '2G',
        value: '2G',
      },
      {
        name: '3G',
        value: '3G',
      },
      {
        name: '4G',
        value: '4G',
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.exportEventSubs) this.exportEventSubs.unsubscribe();
    if (this.showCountSubs) this.showCountSubs.unsubscribe();
    if (this.getcountsub) this.getcountsub.unsubscribe();
    if (this.searchsub) this.searchsub.unsubscribe();
    if (this.deletedevice) this.deletedevice.unsubscribe();
    if (this.disassociateDevice) this.disassociateDevice.unsubscribe();
    if (this.allListSubs) this.allListSubs.unsubscribe();
    if (this.deletesubscriber) this.deletesubscriber.unsubscribe();
    if (this.deleteFactoryResetSub) this.deleteFactoryResetSub.unsubscribe();
    if (this.associateSubsciberSubs) this.associateSubsciberSubs.unsubscribe();
    if (this.associateSubs) this.associateSubs.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    if (this.createSubscriberSubs) this.createSubscriberSubs.unsubscribe();
    if (this.factoryResetsub) this.factoryResetsub.unsubscribe();
    if (this.rebootsub) this.rebootsub.unsubscribe();
  }

  clearSearch(value) {
    this.searchText = "";
    if(this.isProvisioned && this.ccoSystemSearchText){
      this.isProvisioned = false;
      this.ccoSystemSearchText = '';
      this.router.navigate(['/cco/services/subscribers/system/list'])
      return
    }
    this.getCount(true);
    this.ccoSystemSearchText$.next('');
  }
  
  getCount(redraw = false, page?) {
    this.getcountsub = this.ccoCommonService.performSearch(this.ORG_ID, this.searchText ? this.searchText : '', 0, 0).subscribe((res: any) => {
      this.count = res.metadata.totalHits;
      this.tableCount = res.metadata.totalHits;
      this.records = res;
      // if (this.tableCount > 10000) {
      //   this.tableCount = 10000;
      // }
      this.countAvailable = true;
      if (redraw) {
        this.performSearch();
      } else this.tableRender(page);
      setTimeout(()=>{
        if(!this.tableCount && this.ServiceTemplateView){
          (document.getElementsByClassName('odd')[0] as HTMLElement).style.display = 'table-row';
        }
      },2000)

    }, error => {
      this.loading = false;
      this.tableCount = 0;
      this.tableRender(page);
    })

  }
  firstValues: boolean;
  tableRender(pageno?) {
    this.showResult = true;
    const that = this;
    this.displayPage = pageno ? pageno : that.ccoSystemSearchPageNo ? (that.ccoSystemSearchPageNo * 10) : 0;
    let count = 0;
    let orgId = this.ORG_ID;
    let pageNumber: number;
    let url = `${environment.SUPPORT_URL}/subscriber-search`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      displayStart: this.displayPage,
      // order: [0, 'asc'],
      // columnDefs: [
      //   { targets: [3], orderable: false }
      // ],
      ordering: false,
      lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        if (dataTablesParameters.start == 0 && that.ccoSystemSearchPageNo && count == 0) {
          pageNumber = pageno ? pageno : that.ccoSystemSearchPageNo ? that.ccoSystemSearchPageNo : 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        if (this.Settings && dataTablesParameters.start == 9990) {
          this.show = true
          this.changeTableStatusLanguage(this.Settings);
        } else {
          this.show = false;
        }
        sessionStorage.setItem('cco_susb_system_list_search', this.ccoSystemSearchText || '');
        //ToFix CCL-32991-P2 -  start
        // if (that.ccoSystemSearchPageNo) {
        //   pageNumber = that.ccoSystemSearchPageNo ? that.ccoSystemSearchPageNo : pageNumber;
        // }
        sessionStorage.setItem('cco_susb_system_list_search_p_no', `${(pageNumber != undefined) ? pageNumber : 0}`);
        //ToFix CCL-32991-P2 -  End
        if(this.searchText){
          this.ccoSystemSearchText = this.searchText;
          
        }
        this.ccoCommonService.searchTextEmit({searchText:this.ccoSystemSearchText,isProvisioned:this.isProvisioned})
        const params = new HttpParams()
          //.set("orgId", orgId)
          .set("filter",this.isProvisioned ? `servicetemplate:"${this.ccoSystemSearchText || ""}"` : this.ccoSystemSearchText || "")
          .set("pageNumber", `${pageNumber + 1}`)
          .set("pageSize", dataTablesParameters.length).set("servicenote",this.ccoSystemSearchText || "")

        this.searchsub = that.http
          .get<DataTablesResponse>(
            url, { params }
          ).subscribe((resp: any) => {
            this.tableCount = resp?.metadata?.totalHits;
            that.searchResult = resp ? resp : {};
            if (that.searchResult.records?.length === 0 && count === 0) {
              that.previouspage = that.ccoSystemSearchPageNo - 1;

              setTimeout(() => {
                this.getCount(true, that.previouspage);
              }, 1000);
            }
            if (resp && resp.metadata && resp.metadata?.totalHits) {
              that.filterCount = resp.metadata?.totalHits;
              if (that.filterCount > 10000) {
                that.firstValues = true;
                that.filterCount = 10000;
                resp.metadata.totalHits = 10000;
              } else {
                that.firstValues = false;
              }
            } else {

              that.filterCount = 0;
            };
            this.showCount = true;


            if (resp?.records && resp?.records.length) {
              if (resp?.records) {
                resp?.records.forEach(obj => {
                  const RGDevices = obj?.devices.filter(device => device.opMode == "RG");
                  if (obj?.devices.length) {
                    const index = obj?.devices.findIndex(device => device.opMode == "RG");
                    if (index > -1) obj?.devices.splice(0, 0, obj?.devices.splice(index, 1)[0]);
                  }
                  // if (RGDevices.length > 1) {
                  //   let deviceSet: any = [];
                  //   RGDevices.forEach(rg => {
                  //     let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn && device.wapGatewaySn == rg.serialNumber)];
                  //     deviceSet.push(deviceCollector);
                  //   });
                  //   const ds = deviceSet.flat(2).map(devs => devs.deviceId);
                  //   const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
                  //   if (notMatched.length > 0) deviceSet.push()
                  //   obj.devices = deviceSet;
                  // }
                });
              }
              //to fix CCL-35753
              const order = {
                'ONT': 1,
                'RG': 2,
                'WAP': 3
              }
              if (resp?.records.length) {
                for (let i = 0; i < resp.records.length; i++) {
                  if (resp?.records[i]?.devices) {
                       resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
                      let opmodeA = a['ont'] ? 'ONT' : a?.opMode ? a?.opMode : '';
                      let opmodeB = b['ont'] ? 'ONT' : b?.opMode ? b?.opMode : '';
                      return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
                    });
                    for (let j = 0; j < resp?.records[i].devices.length; j++) {
                       let device =resp?.records[i].devices[j];
                      resp.records[i].devices[j]['reboot'] = false;
                      if (device?.opMode != undefined || device?.opModeWithOnt != undefined) {
                      if (device?.opMode == 'ONT' || device?.opModeWithOnt == 'ONT' || device?.opMode == 'ONT/RG' || device?.opModeWithOnt == 'ONT/RG') {
                      let fsan = device?.fsan ? device?.fsan : device?.serialNumber ? device?.serialNumber : device.deviceId;
                      this.systemservice.afterOntReboot(fsan).subscribe((res: any) => {
                        if (res && res?.ontDevices && res?.ontDevices?.length && res?.ontDevices[0].state === 'ONLINE' && res.ontDevices[0].isPresent == true) {
                          resp.records[i].devices[j]['reboot'] = true;
                      }
                    },err => {
                      this.pageErrorHandle(err);
                    });
                  }
                  if(device?.opMode == 'RG' || device?.opModeWithOnt == 'RG') {
                    let fsan = device?.fsan ? device?.fsan : device?.serialNumber ? device?.serialNumber : device.deviceId;
                    this.supportrouterservice.getConnectivityStatusNew(this.ORG_ID, fsan, true).subscribe((res: any) => {
                      if (res && res?.status  === 'Online') {
                        resp.records[i].devices[j]['reboot'] = true;
                      }
                    },err => {
                      this.pageErrorHandle(err);
                    })
                  }
                 }
                    }
                  }
                }
              }
              // fix-end CCL-35753
              that.systemsList = resp?.records;
            } else {
              that.systemsList = [];
            }
            that.dataAvailable = true;
            setTimeout(() => {
              callback({
                recordsTotal: that.tableCount,
                recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                data: []
              });
              that.showFilterCount = true;
              that.loading = false;
            }, 1000)

          },
            (err: HttpErrorResponse) => {
              //that.tableCount = 0;
              this.showCount = true;
              if (err.status == 404) {
                that.systemsList = [];
                that.dataAvailable = true;
                that.loading = false;
                that.hideNoDataRow();
                callback({
                  recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                  data: []
                });
              } else {
                that.pageErrorHandle(err);
                that.systemsList = [];
                that.dataAvailable = true;
                that.loading = false;
                that.hideNoDataRow();
                callback({
                  recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                  data: []
                });
              }
            });
      },
      drawCallback: (Settings) => {
        this.Settings = Settings
        this.changeTableStatusLanguage(Settings);
        if (that.ccoSystemSearchPageNo && Settings._iDisplayStart === 0 && count == 0) {
          Settings._iDisplayStart = this.displayPage ? this.displayPage : Settings._iDisplayStart;
        }
        setTimeout(() => {
          $('.odd').css('display', 'none');
        }, 100);
        setTimeout(() => {
          //this.resetDelete();
          this.loading = false;
        }, 5000);
        count++
      }
    };
    this.tableLanguageOptions();
  }


  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
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
    }, 800);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    }else if(err.status === 500 && this.Isontdevice){
      this.errorInfo = `${err.error.message}`
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 4000)
    setTimeout(() => {
      this.closeAlert();
    }, 6000)

    this.error = true;
    return this.errorInfo
  }
  closeAlert() {
    this.error = false;
    this.success = false;
    this.showSuccess = false;
  }
  closeSucess() {
    this.error = false;
    this.success = false;
    //this.performSearch();
  }
  // openChangeServiceModal(item: any) {
  //   this.modalRef = this.modalService.open(this.changeServiceModal, {
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'custom-modal',
  //   });
  // }

  checkMackAddress(value) {
    value = value ? value : '';
    var format = /[:]+/;
    if (format.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  checkRegIdAndMac(value) {
    value = value ? value : '';
    var format = /[:]+/;
    if (format.test(value) || value.length <= 10) {
      return true;
    } else {
      return false;
    }
  }

  checkRegId(value) {
    value = value ? value : '';
    if (value.length <= 10) {
      return true;
    } else {
      return false;
    }
  }

  closeAllModal() {
    this.modalService.dismissAll();
    this.showconfirmation = true;
  }

  downloadExport() {
    this.ccoCommonService.doExport('subscriber-system-table-list');
  }


  redraw() {
    this.loading = true;
    this.showResult = true;
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  showSuccessMessage(msg: any) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2500)
  }
  sortData(data, by, type): any {
    let sorted = [];
    if (by == 0) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'name');
    } else if (by == 1) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'ipAddress');
    } else if (by == 2) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'mappedBy');
    }
    return sorted;
  }

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
    const filtered = `${dtObj._iRecordsTotal > 10000 && (dtObj.oPreviousSearch.sSearch == '' || dtObj.oPreviousSearch.sSearch != '') && dtObj._iRecordsDisplay > 0 ?
      (isFrench ?
        `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isSpanish ? `(filtrado de un total de  ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
          `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '')) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.firstValues ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }

  performSearch() {
    this.ccoSystemSearchText = this.searchText;
    this.redraw();
  }

  formQueryParams(subscriber: any, device?: any) {
    let sn: any = '';
    let regId: string = '';
    if (device) {
      if (_.isArray(device)) {
        let match = device.filter(el => el.opMode && el.opMode == 'RG');
        if (match.length) {
          let dev = match[0];
          sn = dev.deviceId ? dev.deviceId : (dev.serialNumber ? dev.serialNumber : (dev.macAddress ? dev.macAddress : ''));
          regId = dev.registrationId ? dev.registrationId : '';
        }
      } else {
        sn = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
        if (subscriber.devices && subscriber.devices.length) {
          let match = subscriber.devices.filter(el => el.opMode && el.opMode == 'RG');
          if (match.length) {
            let dev = match[0];
            regId = dev.registrationId ? dev.registrationId : '';
          }
        }

      }

    } else if (subscriber.devices && subscriber.devices.length) {
      let match = subscriber.devices.filter(el => el.opMode && el.opMode == 'RG');
      if (match.length) {
        let dev = match[0];
        sn = dev.deviceId ? dev.deviceId : (dev.serialNumber ? dev.serialNumber : (dev.macAddress ? dev.macAddress : ''));
        regId = dev.registrationId ? dev.registrationId : '';
      } else {
        let dev = subscriber.devices[0];
        sn = dev.deviceId ? dev.deviceId : (dev.serialNumber ? dev.serialNumber : (dev.macAddress ? dev.macAddress : ''));
        regId = dev.registrationId ? dev.registrationId : '';
      }
    }
    let subscriberId = subscriber.subscriberId ? subscriber.subscriberId : '';
    this.queryParams = { sn: sn, subscriber: subscriberId, regId: regId };
    return;
  }

  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();

    this.ccoSystemSearchText = textEntered;
    if (textEntered.length == 0) {
      this.ccoSystemSearchText = "";
      this.router.navigate(['/cco/services/subscribers/system/list'])
    }
    
    // if (textEntered.length < 2) return;
    // this.searchResult = [];

    this.ccoSystemSearchText$.next(textEntered);
  }

  doSearch() {
    this.subscribers$ = this.ccoSystemSearchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap(textEntered => 
      //   this.service.performSearch(this.orgId, textEntered, 1, 500))

    ).subscribe(
      () => {
        this.search();
      }
    );
  }

  search() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.loading = true;
      if (dtInstance.search(this.ccoSystemSearchText).hasOwnProperty('draw'))   dtInstance.search(this.ccoSystemSearchText).draw();
    });
  }

  stringify(devices) {
    return JSON.stringify(devices);
  }

  // openNote(subscriberId, deviceData, event) {
  //   localStorage.setItem('searchSubscriberId', subscriberId);
  //   if (deviceData.length && Array.isArray(deviceData[0])) deviceData = deviceData[0];
  //   localStorage.setItem('searchDevices', JSON.stringify(deviceData));
  //   setTimeout(() => {
  //     this.showSubscriber(subscriberId, deviceData, event);
  //   }, 2000);
  // }

  showSubscriber(subscriberId, devices, deviceData, event, mulRG = false) {
    /* event.stopPropagation();
    event.preventDefault(); */
    const state = {
      fromSearch: true,
      subscriberData: subscriberId,
      devices: devices
    }
    localStorage.setItem('searchSubscriberId', subscriberId);
    if (deviceData.length && Array.isArray(deviceData[0])) deviceData = deviceData[0];
    localStorage.setItem('searchDevices', JSON.stringify(deviceData));
    if (this.devicesSelected) return;
    if (deviceData.length && Array.isArray(deviceData[0])) deviceData = deviceData[0];
    this.devicesSelected = deviceData;
    //$("#paramsPassed").text(subscriberId).attr("searchString", $("#supportSearchId").val().toString());
    this.getSubscriberInfo(subscriberId, deviceData);
    this.router.navigate(['/cco/overview'], { state: state });
  }

  getSubscriberInfo(subscriberId, deviceData) {
    sessionStorage.setItem(`${this.sso.getTabId()}calix.deviceData`, JSON.stringify(deviceData));
    sessionStorage.setItem(`${this.sso.getTabId()}calix.subscriberId`, subscriberId);
    this.dataService.setSubscriberInfo(undefined);
    this.dataService.setSubscriberTabInfoData(undefined);
    this.dataService.multipleRegInstance = undefined;
  }

  //

  opendissasciateDeviceModel(item?: any, device?: any) {

    this.syssN = device.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.syssNONT = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.subID = item?.subscriberId;
    this.modalRef = this.modalService.open(this.dissasciateDeviceModel, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  opendeleteDevicerModal(item?: any, device?: any, value?) {
    //debugger;
    //this.syssN = item.devices[0]?.deviceId;
    if (value) {
      this.deleteONT = true;
    }
    if (device?.opModeWithOnt === 'ONT/RG') {
      this.deletebothDevice = true
    }
    this.syssN = device?.serialNumber ? device?.serialNumber : (device?.deviceId ? device?.deviceId : (device.macAddress ? device.macAddress : ''));
    this.syssNONT = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.subID = item?.subscriberId;
    this.modalRef = this.modalService.open(this.deleteDevicerModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  showServifyText = false;
  opendeleteSubscriberModal(item?: any, device?: any, modal?: any) {
    this.showServifyText = false;
    this.servify = false;
    this.syssN = device?.serialNumber ? device?.serialNumber : (device?.deviceId ? device?.deviceId : (device?.macAddress ? device?.macAddress : ''));
    this.syssNONT = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.subID = item?.subscriberId;
    this.subscriberName = item?.name
    this.modalLoader = true;
    this.systemservice.deleteWarningSubscriber(this.ORG_ID, this.subID).subscribe((res: any) => {
      this.servify = true
      this.deleteServicesAssociateWithSbscrbrMsg = '';
      if (this.subscriberHasCommunity) {
        this.showServifyText = true;
        this.openDeleteSubscriberModal(modal)
      } else {
        this.modalRef = this.modalService.open(this.deleteSubscriberModal, {
          size: 'lg',
          centered: true,
          windowClass: 'custom-modal',
        });
      }

      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.servify = false
      this.deleteServicesAssociateWithSbscrbrMsg = '';
      if (this.subscriberHasCommunity) {
        this.openDeleteSubscriberModal(modal)
      } else {
        this.modalRef = this.modalService.open(this.deleteSubscriberModal, {
          size: 'lg',
          centered: true,
          windowClass: 'custom-modal',
        });
      }
      this.modalLoader = false;
    })
  }

  DeleteAndDisassociated() {

    this.systemId = (this.syssN).trim();
    this.modalLoader = true;
    if (this.deleteONT || this.deletebothDevice) {
      this.deletedevice = this.systemservice.DeleteONT(this.systemId).subscribe((res: any) => {
        setTimeout(() => {
          if (this.subID) {
            this.disassociateDeviceData(true);
          } else {
            this.getCount(true);
            this.success = true;
            this.showSuccessMessage(this.language['The system has been deleted successfully']);
          }

        }, 1500);
        this.success = true;
        this.showwarning = false;
        this.modalLoader = false;
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.modalLoader = false;
      })
    }
    if (!this.deleteONT || this.deletebothDevice) {
      this.deletedevice = this.systemservice.deleteAndDisassociatedDevice(this.ORG_ID, this.systemId).subscribe((res: any) => {
        setTimeout(() => {
          this.getCount(true);
        }, 1500);
        this.success = true;
        this.showwarning = false;
        this.showSuccessMessage(this.language['The system has been deleted successfully']);
        this.modalLoader = false;
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.modalLoader = false;
      })
    }

    this.closeAllModal();
  }

  disassociateDeviceData(value?) {
    this.modalLoader = true;
    this.systemId = (this.syssNONT).trim();
    this.disassociateDevice = this.systemservice.disassociateDevice(this.subID, this.systemId).subscribe((res: any) => {
      this.success = true;
      this.getSubscriberData();
      setTimeout(() => {
        this.getCount(true);;
      }, 1500);
      this.showwarning = false;
      if (value) {
        this.showSuccessMessage(this.language['The system has been deleted successfully']);
      } else {
        this.showSuccessMessage(this.language['System disassociated from subscriber successfully']);
      }
      this.modalLoader = false;
      this.cancelAssociate();
    }, (err: HttpErrorResponse) => {
      this.modalLoader = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
  }

  getSubscriberData() {
    this.allListSubs = this.systemservice.GetSubscriberData(this.ORG_ID, this.subID).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  subscriberHasCommunity = false;
  subscriber: string = '';

  @ViewChild('deletesubscriberModal') deletesubscriberModalViewChild: TemplateRef<any>;
  systemLength: number;
  checkSubscriberHasCommunities(data, modal) {
    this.subscriberHasCommunity = false;
    // if (!data?.devices?.length) {
    //   this.opendeleteSubscriberModal(data)
    //   return;
    // }
    this.systemLength = data?.devices?.length;
    if (!this.enableMyCommunity) {
      this.opendeleteSubscriberModal(data)
      return
    }
    this.subscriber = data?.name;
    this.loading = true;
    this.subID = data?.subscriberId;
    this.systemservice.checkSubscriberCommunity(data.subscriberId, this.ORG_ID).subscribe((res) => {
      this.loading = false;
      this.subscriberHasCommunity = !(res.hasOwnProperty('enable') && !res['enable']);
      this.opendeleteSubscriberModal(data, false, modal);
      // this.openDeleteSubscriberModal(modal);
    }, err => {
      this.loading = false;
      this.opendeleteSubscriberModal(data);
    })
  }
  openDeleteSubscriberModal(modal) {
    this.modalService.open(this.deletesubscriberModalViewChild, {
      centered: true,
      windowClass: 'alert-warning-modal',
    });
  }

  deleteSubscriber() {
    this.loading = true;
    this.subscriberId = this.subID;
    this.deletesubscriber = this.systemservice.deleteSubscriber(this.subscriberId, this.ORG_ID).subscribe((res: any) => {
      setTimeout(() => {
        this.getCount(true);;
      }, 3000);
      this.showwarning = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
  }

  deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  deleteServicesAssociateWithSbscrbrMsg = '';
  deleteSbscrbrMsg = '';

  confirmDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.showwarning = true;
    this.showconfirmation = false;
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `
    ${this.language['warning_message_subscriber_mng']}
    ${this.orgData?.factoryResetOnDelete === true ? `<br/>${this.language['checkRestoreorResetInSystem']}` : ''}
    <br/><br/>${this.language['sys_del']}
  `
  }

  closeDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.showwarning = false;
    //this.showconfirmation = true;
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
    this.closeAllModal();
  }
  confirmDeleteServicesAssociateWithSbscrbrMsg() {
    this.showwarning = true;
    this.showconfirmation = false;
    this.deleteServicesAssociateWithSbscrbrMsg = `Warning:
    ${this.language['Del_assoc']}
  <br/>

   ${this.language['Do you want to proceed with the dissociate device?']}`
  }
  confirmWithSbscrbrMsg() {
    this.showwarning = true;
    this.showconfirmation = false;
    if (this.servify) {
      if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === true) {
        this.deleteSbscrbrMsg = `
        ${this.language['checkRestoreorReset']}
      <br/>
      ${this.language['warning_Servify']}`
      }
      else if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === false) {
        this.deleteSbscrbrMsg = `
        ${this.language['warning_message_subscriber5']}
      <br/>
      ${this.language['warning_Servify']} `
      }
      else if (this.orgData?.deleteAssociatedSystems === false && this.orgData?.factoryResetOnDelete === false) {
        this.deleteSbscrbrMsg = `
        ${this.language['warning_message_subscriber6']}
      <br/>
    
       ${this.language['warning_Servify']}`
      } else {
        this.deleteSbscrbrMsg = `
      ${this.language['warning_message_subscriber6']}
    <br/>
    ${this.language['warning_Servify']}`
      }
    } else {
      if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === true) {
        this.deleteSbscrbrMsg = `
        ${this.language['checkRestoreorReset']}
      <br/>
    
       ${this.language['Do you want delete subscriber?']}`
      }
      else if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === false) {
        this.deleteSbscrbrMsg = `
        ${this.language['warning_message_subscriber5']}
      <br/>
    
       ${this.language['Do you want delete subscriber?']}`
      }
      else if (this.orgData?.deleteAssociatedSystems === false && this.orgData?.factoryResetOnDelete === false) {
        this.deleteSbscrbrMsg = `
        ${this.language['warning_message_subscriber6']}
      <br/>
    
       ${this.language['Do you want delete subscriber?']}`
      } else {
        this.deleteSbscrbrMsg = `
      ${this.language['warning_message_subscriber6']}
    <br/>
  
     ${this.language['Do you want delete subscriber?']}`
      }
    }


  }
  closeSbscrbrMsg() {
    this.deleteSbscrbrMsg = '';
    this.showwarning = false;
    this.closeAllModal();
    //this.showconfirmation = true;
  }
  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    this.showwarning = false;
    this.closeAllModal();
    //this.showconfirmation = true;
  }

  getDeleteAndFactoryResetData() {
    this.deleteFactoryResetSub = this.systemservice.getDeleteAndFactoryreset(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
    })
  }

  //associate device
  saveAssociate(subscriber, isUnassociateSubscriber = false) {
    //debugger;
    this.submitted = true;
    this.loading = true;
    // if (!Object.keys(subscriber).length && isUnassociateSubscriber) {
    //   return;
    // }
    if (!subscriber?.subscriberId) {
      if (!this.associateSubscriber.value.subscriberLocationId || !this.associateSubscriber.value.name || this.modalForm.email.errors) {
        return;
      }

      this.formChange('fccSubscriberId');
      if (!this.valid.fccSubscriberId) {
        return;
      }

      const paramsub = this.associateSubscriber.value;
      this.associateSubsciberSubs = this.systemservice.AddSubscriberData(this.ORG_ID, paramsub).subscribe((res: any) => {
        this.subscriberId = res?._id;
        let systemId = this.systemid.trim()
        const params = {
        }
        this.associateSubs = this.systemservice.associateDevice(params, this.subscriberId, systemId).subscribe(res => {
          setTimeout(() => {
            this.getCount(true);;
          }, 1500);
          let msg = this.language['System  associated with subscriber successfully'];
          this.showSuccessMessage(msg);
          this.loading = false;
          this.closeAllModal();
          this.commonService.trackPendoEvents('Operations_Cloud','system associated')
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
          this.loading = false;
          this.closeAllModal();
        });

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      });

    }
    else {
      this.subscriberId = subscriber.subscriberId;
      let systemId = this.systemid.trim()
      const params = {
      }
      this.associateSubs = this.systemservice.associateDevice(params, this.subscriberId, systemId).subscribe(res => {
        setTimeout(() => {
          this.getCount(true);;
        }, 1500);
        let msg = this.language['System  associated with subscriber successfully'];
        this.showSuccessMessage(msg);
        this.loading = false;
        this.closeAllModal();
        this.commonService.trackPendoEvents('Operations_Cloud','system associated')
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.pageErrorHandle(err);
        this.closeAllModal();
      });
    }

  }

  closeSearch() {
    $(".asso-search-dropdown").hide();
  }


  formGrouping(input) {
    this.associateSubscriber = this.formBuilder.group({
      account: [input.account || ''],
      subscriberLocationId: [input.subscriberLocationId || '', Validators.required],
      name: [input.name || '', Validators.required],
      serviceAddress: [input.serviceAddress || ''],
      phone: [input.phone || ''],
      email: [input.email || '', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      hubbLocationId: [input.hubbLocationId || ''],
      fccSubscriberId: [input.fccSubscriberId || ''],
    });
  }

  searchByCharacters1(event) {
    $(".asso-search-dropdown").hide();
    const textEntered: string = $(event.target).val().toString();
    if (textEntered.length < 2) return;
    this.accountSearchResult = [];
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    this.searchSubscriber = this.systemservice.performSearch(this.ORG_ID, textEntered, 1, 500).subscribe(
      (res: any) => {
        if (res) {
          this.accountSearchResult = res.records;
          if (this.accountSearchResult.length > 0) $(".asso-search-dropdown").show();
          this.changeDetect.detectChanges();
        }
      },
      err => {

      }
    );
  }

  showSubscriberdata(subscriberId) {
    this.disableSub = true;
    $(".asso-search-dropdown").hide();
    this.formGrouping(subscriberId);
    this.unassociatedSubscriber = subscriberId;
  }

  showAssociateSubscriberModal(item?, device?) {
    this.submitted = false;
    this.formGrouping({});
    if (this.linkageType === "REG_ID") {
      this.systemid = device?.registrationId ? device?.registrationId : device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    } else {
      this.systemid = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    }

    this.cancelAssociate();
    this.modalRef = this.modalService.open(this.associateSubscriberModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  get modalForm() { return this.associateSubscriber.controls; }

  associateChange() {
    this.disableSub = false;
    this.unassociatedSubscriber = '';
    this.associateSubscriber.patchValue({
      subscriberLocationId: '',
      name: '',
      serviceAddress: '',
      phone: '',
      email: '',
      hubbLocationId: '',
      fccSubscriberId: '',
    })
  }

  cancelAssociate() {
    this.associateSubscriber.patchValue({
      subscriberLocationId: '',
      name: '',
      serviceAddress: '',
      phone: '',
      email: '',
      account: '',
      hubbLocationId: '',
      fccSubscriberId: '',
    })
    this.closeAllModal();
  }

  get createSubsModalForm() { return this.createSubscriber.controls; }
  openAddSubscriberModal(subscriber?) {
    this.editSubscriber = false;
    this.closeAlert();
    if (!subscriber) {
      this.editSubscriber = false;
      this.createSubscriber = this.formBuilder.group({
        account: '',
        subscriberLocationId: '',
        name: '',
        serviceAddress: '',
        phone: '',
        email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      });
    } else {
      this.editSubscriber = true;
      this.editSubscriberData = subscriber;
      this.createSubscriber = this.formBuilder.group({
        account: [subscriber.account || ''],
        subscriberLocationId: [subscriber.subscriberLocationId || '', Validators.required],
        name: [subscriber.name || '', Validators.required],
        serviceAddress: [subscriber.serviceAddress || ''],
        phone: [subscriber.phone || ''],
        email: [subscriber.email || '', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      });
    }

    this.isAddError = false;
    this.createSubmitted = false;
    this.createdSubscriberId = '';

    this.modalRef = this.modalService.open(AddServiceSystemComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-lg-modal',
    });

  }

  closeAddSubscriberModal() {
    this.createSubscriber.patchValue({
      subscriberLocationId: '',
      name: '',
      serviceAddress: '',
      phone: '',
      email: '',
      account: ''
    })
    this.closeAllModal();
  }

  createSubscriberSave() {
    this.createSubmitted = true;
    this.createSubscriber.value.subscriberLocationId = this.createSubscriber.value.subscriberLocationId.trim();
    this.createSubscriber.value.name = this.createSubscriber.value.name.trim();
    this.createSubscriber.value.email = this.createSubscriber.value.email.trim();


    if (!this.createSubscriber.value.subscriberLocationId || !this.createSubscriber.value.name || this.createSubsModalForm.email.errors) {
      return
    }

    let params = this.createSubscriber.value;
    this.loading = true;
    this.createdSubscriberName = this.createSubscriber.value.name;

    if (this.editSubscriber) {
      const subsId = this.editSubscriberData.subscriberId;
      this.createSubscriberSubs = this.systemservice.UpdateSubscriberData(this.ORG_ID, params, subsId).subscribe((res: any) => {
        this.createdSubscriberId = res?.subscriberId;
        this.createdSubcriberData = res;
        this.closeAllModal();
        this.showSuccess = true;
        this.successMsg = this.language['Click here to add a device.'];
        setTimeout(() => {
          this.redraw();
          this.loading = false;
        }, 1000);
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      });
    } else {
      this.createSubscriberSubs = this.systemservice.AddSubscriberData(this.ORG_ID, params).subscribe((res: any) => {
        this.createdSubscriberId = res?.subscriberId;
        this.createdSubcriberData = res;
        this.closeAllModal();
        this.showSuccess = true;
        this.successMsg = this.language['Click here to add a device.'];
        setTimeout(() => {
          this.redraw();
          this.loading = false;
        }, 1000);
      }, (err: HttpErrorResponse) => {

        this.pageErrorHandle(err);
        this.loading = false;
      });
    }
  }

  //To Edit Subscriber, Subs Service, Add Sysem to Subscriber
  goToEditSubscriber(subscriber, page?) {
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    let name = subscriber.name ? subscriber.name : '';
    this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.queryParams.subscriber, page: page || 'add-details', sName: name } });
  }
  goToSupportCloud(subscriber, device?) {
    sessionStorage.setItem('calix.subscriberId', subscriber?.subscriberId);
    sessionStorage.setItem('calix.deviceData', JSON.stringify(device));
    // this.router.navigate([]).then(result => { window.open('support/service/data', '_blank') });
    window.open('support/service/data', '_blank');
  }

  //To Edit Subscriber's System
  goToEditSubscriberSystem(subscriber: any, device?: any) {
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber);
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }
    let name = subscriber.name ? subscriber.name : '';
    this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.queryParams.subscriber, sn: this.queryParams?.sn || '', page: 'add-system', sName: name } });
  }

  showDetailedView(subscriber, device?) {
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }

    this.router.navigate(['/cco/system/cco-subscriber-system/system-details'], { queryParams: this.queryParams });
  }


  addSystem(subscriber, isUnassociateSubscriber = false) {
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['/cco/system/cco-subscriber-system/add-system'], { queryParams: { subscriber: this.queryParams.subscriber } });

  }

  goToSystemEdit(subscriber: any, device?: any) {
    return;
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['../system-edit'], { relativeTo: this.route, queryParams: this.queryParams });
  }

  goAddServices(subscriber) {
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['/cco/system/cco-subscriber-system/add-service'], { queryParams: { subscriber: this.queryParams.subscriber } });
  }
  cancelModel() {
    this.showwarning = false;
    this.closeAllModal();
    this.showconfirmation = true;
  }
  //factory_Reset
  openResetModal(item?: any, device?: any) {
    this.systemId_Reset = device?.serialNumber ? device.serialNumber : (device?.deviceId ? device.deviceId : (device.macAddress ? device.macAddress : ''));
    this.deviceInfo = device;
    this.modalRef = this.modalService.open(this.factoryresetModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  factoryReset(data) {
    setTimeout(() => {
      this.modalLoader = true;
    }, 50);
    if (!this.bootHappening) {
      this.bootHappening = true;
      this.completionStatus = [{
        isTime: '', //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: `${this.language.factoryResetLabel(data)} has been initiated.`    //'Starting Factory Reset,
      }];
    } else {
      return;
    }
    const params = {
      'systemId': this.systemId_Reset
    }
    this.factoryResetsub = this.systemservice.factoryReset(this.ORG_ID, params).subscribe(res => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: '',   //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: 'Please check back after ~10 minutes'    //'Factory Reset Complete',
      });
      this.bootHappening = false;
    }, err => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageErrorHandle(err),
      });
      this.bootHappening = false;
    });
  }

  openResetconfirmModal(data) {
    this.model = data
    this.modalRef = this.modalService.open(this.resetconfirmModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  //Reboot
  openRebootModal(item?: any, device?: any, data?) {
    this.systemId_Reboot = device?.serialNumber ? device?.serialNumber : '';
    if (data === 'ont' || device?.opModeWithOnt == 'ONT/RG' ) {
      this.Isontdevice = true;
      this.vendor = device?.ont?.vendorId;
      this.sn = device?.ont?.serialNo;
      this.serialNum = device?.serialNumber ? device?.serialNumber : '';

    } else { this.Isontdevice = false; }

    this.modalRef = this.modalService.open(this.reboot, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  rebootDevice() {
    //debugger;
    this.modalLoader = true;
    if (this.Isontdevice) {
      if (!this.bootHappening) {
        this.bootHappening = true;
        this.completionStatus = [{
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Starting Reboot',
        }];
      } else {
        return;
      }
      this.rebootsub = this.systemservice.doRebootforont(this.ORG_ID, this.serialNum).subscribe((res: any) => {
        this.modalLoader = false;
        let message = 'Reboot Succeeded';
        if (res?.status !== "SUCCESS") {
          message = res?.message;
        } else {
          setTimeout(() => {
            this.ontAfterReboot(this.vendor, this.sn);
          }, 30000);
          this.modalLoader = true;
          return;
        }
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: message,
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      }, err => {
        this.modalLoader = false;
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: this.pageErrorHandle(err),
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      });
    } else {
      if (!this.bootHappening) {
        this.bootHappening = true;
        this.completionStatus = [{
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Starting Reboot',
        }];
      } else {
        return;
      }
      this.rebootsub = this.systemservice.doReboot(this.ORG_ID, this.systemId_Reboot).subscribe(res => {
        this.modalLoader = false;
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Reboot Succeeded',
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      }, err => {
        this.modalLoader = false;
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: this.pageErrorHandle(err),
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      });
    }

  }

  ontAfterReboot(vendor, sn, i = 0) {
    this.modalLoader = true;
    this.systemservice.afterOntReboot(this.systemId_Reboot).subscribe((res: any) => {
      if (res && res?.ontDevices && res?.ontDevices?.length && res?.ontDevices[0].state === 'ONLINE' && res.ontDevices[0].isPresent == true) {
        this.modalLoader = false;
        this.completionStatus.push({
          isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
          isResponse: 'Reboot Succeeded',
        });
        this.bootHappening = false;
        this.rbtStatus = false;
      } else {
        if (i < 30 && res.ontDevices[0].isPresent !== true) {
          setTimeout(() => {
            this.ontAfterReboot(vendor, sn, ++i);
          }, 20000);
        } else {
          this.modalLoader = false;
          this.completionStatus.push({
            isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
            isResponse: 'Reboot Unsuccessful'
          });
          this.bootHappening = false;
          this.rbtStatus = false;
        }
      }
    }, (err: any) => {
      this.modalLoader = false;
      this.completionStatus.push({
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: this.pageErrorHandle(err),
      });
      this.bootHappening = false;
      this.rbtStatus = false;
    })
  }
  openrebootStatusModel() {
    this.modalRef = this.modalService.open(this.rebootStatus, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  valid = {
    subscriberLocationId: true,
    name: true,
    serviceAddress: true,
    phone: true,
    email: true,
    account: true,
    hubbLocationId: true,
    fccSubscriberId: true,
  }
  formChange(field) {
    let value = this.associateSubscriber.value[field];
    switch (field) {
      case 'name':
        value = value ? value.trim() : '';
        this.valid[field] = (value !== '');
        break;
      case 'subscriberLocationId':
        value = value ? value.trim() : '';
        this.valid[field] = (value !== '');
        break;
      case 'email':
        value = value ? value.trim() : '';
        this.valid[field] = (value === '' || (value !== '' && this.validateEmail(value)));
        break;
      case 'account':
        value = value ? value.trim() : '';
        let val2 = this.associateSubscriber.value['fccSubscriberId'];
        this.valid[field] = (value === '' || (value !== '' && value !== val2));
        break;
      case 'fccSubscriberId':
        value = value ? value.trim() : '';
        let val3 = this.associateSubscriber.value['account'];
        this.valid[field] = (value === '' || (value !== '' && value !== val3));
        break;
      default:
        break;
    }
  }

  validateEmail(value) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      //this.emailmsg = "";
      return true;
    } else {
      return false
    }

  }

  getScopes() {
    //debugger;
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.coc.systems'] = scopes['cloud.rbac.coc.services.subscribers'] ? scopes['cloud.rbac.coc.services.subscribers'] : [];
      if (scopes && (scopes['cloud.rbac.coc.systems']) && scopes['cloud.rbac.coc.systems'].indexOf('write') !== -1) {
        this.hasWrite = true;
      }
    } else {
      this.hasWrite = true;
    }

  }

  getOrgAdminData() {
    this.loading = true;
    this.systemservice.fetchAmdins('All').subscribe((data: any) => {
      this.loading = false;
      if (data == 'Org Admin Data not found') {
        return;
      }
      if (data) {
        this.orgEnable = data.orgEnable;
        this.deviceType = data?.ontNameFormat;
        this.linkageType = data?.ontIdType;
      }
      this.loading = false;
    }, err => {
      this.pageErrorHandle(err);
    })
  }
  gotoServiceProfiles(){
    this.router.navigate(['/cco/operations/cco-subscriber-operations/operations/ONT-profile'])
  }
  exportDetails(){
    let pageNumber: number;
    let exporturl = `${environment.SUPPORT_URL}/subscriber-search`;
    let name = this.ccoCommonService.generateExportName('provisioned-subscribers');
  //   if(!this.searchResult.metadata.totalHits){
  //     this.exportExcel.downLoadCSV(name, [this.empty]);
  //     return
  //  };
    let requests = Array.from({length: Math.ceil(this.searchResult.metadata.totalHits/10)}, (_,i)=>{
      return this.http.get(exporturl, {params: {filter:this.isProvisioned ? `servicetemplate:"${this.ccoSystemSearchText || ""}"`:this.ccoSystemSearchText || "",pageNumber : i+1}})
    })
 
    forkJoin(requests).subscribe(res=>{
      this.recordsToExport= (res.reduce((a:any,c:any)=> a.concat(c.records ),[]))
      this.exportResult(name);
      console.log("recordsToExport",this.recordsToExport)
    })

  }
  exportDataToCSV:any;
  extractedValues:any;
  exportResult(name) {
    let exportData = this.ccoCommonService.exportDataConvertor(this.recordsToExport);
    console.log("exportData",exportData)
    this.exportDataToCSV = [];
    this.extractedValues = exportData.forEach((val)=>{
      if(val.devices.length){
      val.devices.forEach((x)=>{
      let newValues ={}
      newValues['FSAN'] = x?.serialNumber ? x?.serialNumber : x?.deviceId.length > 10 ? x?.deviceId  :''
      newValues['ModelName'] = x.modelName ? x.modelName :''
      newValues['RegistrationID'] = x?.registrationId ? x?.registrationId : x.ont?.registrationId ? x.ont?.registrationId : x?.deviceId.length < 10 ? x?.deviceId :''
      newValues['MacAddress'] = x?.macAddress ? x?.macAddress  :''
      newValues['SubscriberName'] = val.name? val.name :''
      newValues['Account'] = val.account? val.account :''
      this.exportDataToCSV.push(newValues)
      })
    }else{
      let newValues ={}
      newValues['FSAN'] = ''
      newValues['ModelName'] = ''
      newValues['RegistrationID'] = ''
      newValues['MacAddress'] = ''
      newValues['SubscriberName'] = val.name? val.name :''
      newValues['Account'] = val.account? val.account :''
      this.exportDataToCSV.push(newValues)
    }
      
})
     this.exportExcel.downLoadCSV(name, this.exportDataToCSV);
  }

  exportSubscribers(){
    let exportCount = this.searchResult.records;
    this.exportDetails();
    
    
  }

}
