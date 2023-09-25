import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, forkJoin } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service'
import { AcessModifiers, SsoAuthService } from 'src/app/shared/services/sso-auth.service'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import _ from 'lodash';
import { isArray } from 'jquery';
import * as moment from 'moment';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
import { DataServiceService } from 'src/app/support/data.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';
import * as $ from 'jquery';
import { log } from 'console';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-foundation-system-list',
  templateUrl: './foundation-system-list.component.html',
  styleUrls: ['./foundation-system-list.component.scss'],
})
export class FoundationSystemListComponent implements OnInit, OnDestroy {
  modalRef: any;
  @ViewChild('dissasciateDeviceModel', { static: true })
  private dissasciateDeviceModel: TemplateRef<any>;
  @ViewChild('deleteSubscriberModal', { static: true })
  private deleteSubscriberModal: TemplateRef<any>;
  @ViewChild('deleteDevicerModal', { static: true })
  private deleteDevicerModal: TemplateRef<any>;
  @ViewChild('associateSubscriberModal', { static: true }) private associateSubscriberModal: TemplateRef<any>;
  closeModal: string;
  @ViewChild('resetconfirmModal', { static: true }) private resetconfirmModal: TemplateRef<any>;
  @ViewChild('disassociateSystemModal', { static: true }) private disassociateSystemModal: TemplateRef<any>;

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

    },
  };

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
  createSubscriber: any;
  accountSearchText: string = "";
  isAddError = false
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
  systemSearchText: any;
  searchText: any;
  loading: boolean;

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
  queryParams: { sn: any; subscriber: any; regId: any; };
  successInfo: any;
  allListSubs: any;
  private systemSearchText$ = new Subject<string>();
  subscribers$: any;
  showFilterCount: boolean;
  count: number = 0;
  countAvailable: any;
  deletedevice: any;
  deletesubscriber: any;
  deleteFactoryResetSub: any;
  orgData: any;
  accountSearchResult: any[];
  searchSubscriber: any;
  unassociatedSubscriber: any;
  submitted: boolean;
  systemid: any;
  associateSubs: any;
  addSusbsciberSubs: any;
  subscriber: any;
  disableSub: boolean = false;
  hasWrite: boolean;
  isDev: boolean;
  showwarning: boolean;
  bootHappening: boolean;
  rbtStatus: boolean;
  completionStatus: any[] = [];
  systemId_Reset: any;
  @ViewChild('factoryresetModal', { static: true })
  private factoryresetModal: TemplateRef<any>;
  validateScopeStage: boolean;
  esTable: any;
  de_DETable: any;
  deviceInfo: any;
  enableMyCommunity: boolean;
  serviceEnable:boolean = false;
  isProvisioned:boolean = false;
  // ServiceTemplateView:boolean;
  ServiceTemplateView:boolean = false;
  records:any;
  exportCount:any;
  exportDataToCSV: any[];
  extractedValues: any;
  recordsToExport:any;
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
    private systemservice: FoundationManageService,
    private addSystemservice: AddSubscriberService,
    private sso: SsoAuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private changeDetect: ChangeDetectorRef,
    private routerService: SupportRouterService,
    private dataService: DataServiceService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;


    this.ccoCommonService.currentPageAdder('system-table-view');
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
    this.getScopes();
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.formGrouping({});
    $(".asso-search-dropdown").hide();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        const tempObj = {
          _iDisplayStart: this.tableCounts.start,
          _iDisplayLength: this.tableCounts.displayCount,
          _iRecordsDisplay: this.tableCounts.displayed,
          _iRecordsTotal: this.tableCounts.total,
          oPreviousSearch: {
            sSearch: this.tableCounts.searchText
          }
        };
        this.changeTableStatusLanguage(tempObj);
        this.tableLanguageOptions();
      }

    );
    this.route.queryParams.subscribe((params)=>{
      this.searchText = params?.name;
      if(params?.isProvisioned) this.isProvisioned = params?.isProvisioned;
      this.ServiceTemplateView = params?.redirectFromServiceProfiles == 'true'? true : false;
    })
    // this.route.queryParams.subscribe(params => {
    //   this.showResult = true;
    //   this.systemSearchText = history.state.systemSearchText || history.state?.subscriberId;
    //   if (this.systemSearchText || this.systemSearchText == "") {
    //     this.searchText = this.systemSearchText;
    //     setTimeout(() => {
    //       this.redraw();
    //     }, 1000)
    //   }
    //   // In a real app: dispatch action to load the details here.
    // });
    // this.serviceEnable = history.state.backtoService
    // console.log("serviceEnable",this.serviceEnable);
    
    this.getDeleteAndFactoryResetData();
    this.showResult = true;
    this.systemSearchText = history?.state?.systemSearchText || history?.state?.subscriberId;
    sessionStorage.removeItem('foundation_list_search');
    if (this.systemSearchText || this.systemSearchText == "") {
      this.searchText = this.systemSearchText;
      setTimeout(() => {
        this.redraw();
      }, 1000)
    }
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.showResult = true;
        this.systemSearchText = history?.state?.systemSearchText || history.state?.subscriberId;
        if (this.systemSearchText || this.systemSearchText == "") {
          this.searchText = this.systemSearchText;
          setTimeout(() => {
            this.redraw();
          }, 1000)
        }
      }
    });

    $("body").off('click', '.languageContent ul li a');
    $("body").on('click', '.languageContent ul li a', () => {
      const tempObj = {
        _iDisplayStart: this.tableCounts.start,
        _iDisplayLength: this.tableCounts.displayCount,
        _iRecordsDisplay: this.tableCounts.displayed,
        _iRecordsTotal: this.tableCounts.total,
        oPreviousSearch: {
          sSearch: this.tableCounts.searchText
        }
      };
      this.changeTableStatusLanguage(tempObj);
    });
    this.doSearch()
    this.getCount();


    this.exportEventSubs = this.ccoCommonService.ccoPageExport.subscribe(
      (data) => {
        if (data && data == 'subscriber-system-table-list') {
          this.export();
        }
      }
    );
    this.tableLanguageOptions();
    //this.performSearch();
    // this.getListData();
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

  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `${this.language['Closed_with']}: ${res}`;
        },
        (res) => {
          this.closeModal = `${this.language['Dismissed']
            } ${this.getDismissReason(res)}`;
        }
      );
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

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.exportEventSubs) this.exportEventSubs.unsubscribe();
    if (this.deletedevice) {
      this.deletedevice.unsubscribe();
    }
    if (this.allListSubs) {
      this.allListSubs.unsubscribe();
    }
    if (this.disassociateDevice) {
      this.disassociateDevice.unsubscribe();
    }
    if (this.deletesubscriber) {
      this.deletesubscriber.unsubscribe();
    }
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    if (this.associateSubs) this.associateSubs.unsubscribe();
    if (this.addSusbsciberSubs) this.addSusbsciberSubs.unsubscribe();
    if (this.deleteFactoryResetSub) this.deleteFactoryResetSub.unsubscribe();
  }
  clearSearch(value) {
    this.searchText = "";
    if(this.isProvisioned && this.systemSearchText){
      this.isProvisioned = false;
      this.systemSearchText = '';
      this.router.navigate(['cco-foundation/foundation-systems/foundation-manage/foundation-system-list'])
      return
    }
    this.getCount(true);
    this.systemSearchText$.next('');
    // this.changeTableStatusLanguage()
  }

  getListData(rerender?) {
    this.service.getSubscribersSystemList().subscribe((res: any) => {
      console.log("tableData",res)
      this.tableData = res ? res : [];
      for (var i = 0; i < this.tableData.length; i++) {
        this.systemId = this.tableData[i].serielNumber
      }

      this.renderTable(rerender);
    });
  }
  
  getCount(redraw = false) {
    this.systemservice.performSearch(this.ORG_ID, this.searchText ? this.searchText : '', 0, 0).subscribe((res: any) => {
      this.count = res.metadata.totalHits;
      this.tableCount = res.metadata.totalHits;
      this.records = res;
      // if (this.tableCount > 10000) {
      //   this.tableCount = 10000;
      // }
      this.countAvailable = true;
      if (redraw) {
        this.performSearch();
      } else this.tableRender();
        setTimeout(()=>{
          if(!this.tableCount && this.ServiceTemplateView){
            (document.getElementsByClassName('odd')[0] as HTMLElement).style.display = 'table-row';
          }
        },2000)
    
      

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.tableCount = 0;
      this.tableRender();
    })

  }
  firstValues: boolean;
  Settings: any;
  show: boolean;
  tableRender() {
    this.showResult = true;
    const that = this;
    let orgId = this.ORG_ID;
    let pageNumber: number;
    let url = `${environment.SUPPORT_URL}/subscriber-search`
    let exportDetailsList =
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      dom: 'tipr',
      // order: [0, 'asc'],
      // columnDefs: [
      //   { targets: [3], orderable: false }
      // ],
      ordering: false,
      lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        // console.log('dataTablesParameters', dataTablesParameters);

        if (dataTablesParameters.start == 0) {
          pageNumber = 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }

        if (this.Settings && dataTablesParameters.start == 9990) {
          this.show = true
          this.changeTableStatusLanguage(this.Settings);
        } else {
          this.show = false;
        }

        sessionStorage.setItem('foundation_list_search', this.systemSearchText || '');

        if(this.searchText){
          this.systemSearchText = this.searchText;
          
        }
        this.ccoCommonService.searchTextEmit({searchText:this.systemSearchText,isProvisioned:this.isProvisioned})

        const params = new HttpParams()
          //.set("orgId", orgId)
          .set("filter",this.isProvisioned ? `servicetemplate:"${this.systemSearchText || ""}"` : this.systemSearchText || "")
          .set("pageNumber", `${pageNumber + 1}`)
          .set("pageSize", dataTablesParameters.length)
          .set("servicenote",this.systemSearchText || "")

        that.http
          .get<DataTablesResponse>(
            url, { params }
          ).subscribe((resp: any) => {
            // const isArray = Array.isArray(resp);
            // if (isArray) {
            //   that.systemsList = this.sortData(resp, that.sortBy, that.sortType);
            // } else {
            //   that.systemsList = [resp];
            // }
            that.searchResult = resp ? resp : {};
            //that.tableCount = (resp && resp.metadata && resp.metadata?.totalHits) ? resp.metadata?.totalHits : 0;
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
            if (resp?.records && resp?.records.length) {
              if (resp?.records) {
                resp?.records.forEach(obj => {
                  const RGDevices = obj?.devices?.filter(device => device.opMode == "RG");
                  if (obj?.devices?.length) {
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

              //to fix CCL-35780
              const order = {
                'RG': 1,
                'WAP': 2,
                'ONT': 3,
                'emp': 4
              }
              for (let i = 0; i < resp.records.length; i++) {
                if (resp?.records[i]?.devices) {
                  resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
                    let opmodeA = a['ont'] && (a['opModeWithOnt'] === "ONT") ? 'ONT' : a?.opMode ? a?.opMode : 'emp';
                    let opmodeB = b['ont'] && (b['opModeWithOnt'] === "ONT") ? 'ONT' : b?.opMode ? b?.opMode : 'emp';
                    return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
                  });
                }
              }
              // fix-end CCL-35780
              //that.systemsList = this.sortData(resp?.records, that.sortBy, that.sortType);
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
            }, 100)

          },
            (err: HttpErrorResponse) => {
              //that.tableCount = 0;
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
        //console.log('drawCallback');
        setTimeout(() => {
          $('.odd').css('display', 'none');
        }, 100);
        setTimeout(() => {
          //this.resetDelete();+
          this.loading = false;
        }, 200);
      }
    };
    this.tableLanguageOptions();


  }


  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  tableLanguageOptions(value?) {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.de_DETable;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.tableOptions.language
    ) {
      delete this.tableOptions.language;
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

  export() {
    let name = this.ccoCommonService.generateExportName('subscribers-system');
    let exportData = this.ccoCommonService.exportDataConvertor(this.tableData);
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData);
    } else {
      this.exportExcel.downLoadCSV(name, [this.empty]);
    }
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
      return this.http.get(exporturl, {params: {filter:this.isProvisioned ? `servicetemplate:"${this.systemSearchText || ""}"` : this.systemSearchText || "",pageNumber : i+1}})
    })
 
    forkJoin(requests).subscribe(res=>{
      this.recordsToExport= (res.reduce((a:any,c:any)=> a.concat(c.records ),[]))
      this.exportResult(name);
      console.log("recordsToExport",this.recordsToExport)
    })

  }

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

  opendissasciateDeviceModel(item?: any, device?: any, content?: any) {
    this.modalLoader = false;
    this.isModalError = false
    if (Object.keys(device).length) {
      if (device.length !== 0 && device.length !== undefined) {
        this.syssN = device[0]?.deviceId ? device[0].deviceId : (device[0].serialNumber ? device[0].serialNumber : (device[0].macAddress ? device[0].macAddress : ''));
      }
      else {
        this.syssN = device?.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
      }
    } else {
      this.syssN = device?.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    }
    this.subID = item?.subscriberId;
    this.deleteServicesAssociateWithSbscrbrMsg = `
    ${this.language['Del_assoc']}`;
    this.modalService.open(content, {
      centered: true,
      windowClass: 'disassociate-modal',
    });
  }
  // opendeleteSubscriberModal(item?: any, device?: any,content?:any) {
  //   this.isModalError=false
  //   this.syssN = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
  //   this.subID = item?.subscriberId;
  //   this.modalLoader = true;
  //    this.systemservice.deleteWarningSubscriber(this.ORG_ID, this.subID).subscribe((res: any) => {
  //     this.deleteSbscrbrMsg = `${this.language['This operation will remove subscriber information.']}
  //     <br/>
  //     ${this.language['warning_message_subscriber2']} ${this.language['warning_Servify']}`
  //     this.deleteServicesAssociateWithSbscrbrMsg = '';
  //     this.modalService.open(content, {
  //       centered: true,
  //       windowClass: 'disassociate-modal',
  //     });
  //     this.modalLoader = false;
  //   }, (err: HttpErrorResponse) => {
  //      //this.pageErrorHandle(err);
  //     this.deleteSbscrbrMsg = `${this.language['This operation will remove subscriber information.']}
  //     <br/>
  //     ${this.language['warning_message_subscriber2']}`
  //     this.deleteServicesAssociateWithSbscrbrMsg = '';
  //     this.modalService.open(content, {
  //       centered: true,
  //       windowClass: 'disassociate-modal',
  //     });
  //     this.modalLoader = false;
  //   })

  // }
  servifySubscriptionActive = false;
  @ViewChild('deleteSubscriberModalNew', { static: true })
  private deleteSubscriberModalNew: TemplateRef<any>;
  currentSubscriber: string;
  opendeleteSubscriberModal(item?: any, device?: any, content?: any) {
    this.isModalError = false;
    this.currentSubscriber = item?.name;
    this.syssN = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.subID = item?.subscriberId;
    this.modalLoader = true;
    if (!this.enableMyCommunity) {
      this.servifyShow();
      return
    }
    this.systemservice.deleteCommunitySubscriber(this.ORG_ID, this.subID).subscribe((response: any) => {

      if (response.communities) {
        this.systemservice.deleteWarningSubscriber(this.ORG_ID, this.subID).subscribe((serivyCare: any) => {
          if (serivyCare) {
            this.servifySubscriptionActive = true;
            this.modalService.open(this.deleteSubscriberModalNew, {
              centered: true,
              windowClass: 'alert-warning-modal',
            });
          }
        }, error => {
          this.modalService.open(this.deleteSubscriberModalNew, {
            centered: true,
            windowClass: 'alert-warning-modal',
          });
        });
      }
      else {
        this.servifyShow();
      }
    }, error => {
      this.servifyShow();
    });

  }
  servifyShow() {
    this.systemservice.deleteWarningSubscriber(this.ORG_ID, this.subID).subscribe((res2: any) => {
      if (res2) {

        this.deleteSbscrbrMsg = `${this.language['This operation will remove subscriber information.']}
        <br/>
        ${this.language['warning_message_subscriber2']} ${this.language['warning_Servify']}`
        this.deleteServicesAssociateWithSbscrbrMsg = '';
        this.modalService.open(this.deleteSubscriberModal, {
          centered: true,
          windowClass: 'disassociate-modal',
        });
        this.modalLoader = false;
      }
    }, error => {
      this.deleteSbscrbrMsg = `${this.language['This operation will remove subscriber information.']}
      <br/>
      ${this.language['warning_message_subscriber2']}`
      this.deleteServicesAssociateWithSbscrbrMsg = '';
      this.modalService.open(this.deleteSubscriberModal, {
        centered: true,
        windowClass: 'disassociate-modal',
      });
      this.modalLoader = false;
    });
  }
  opendeleteDevicerModal(item?: any, device?: any, content?: any) {
    //debugger;
    //this.syssN = item.devices[0]?.deviceId;
    this.isModalError = false
    this.syssN = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    this.subID = item?.subscriberId;
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `${this.language['This operation will remove system and delete all information associated with the system, including service provisioning. Before deleting the system, please make sure the system is disconnected, otherwise it will keep trying to reconnect.']}<br/><br/>

    ${this.language['warning_message_system1']}`
    this.modalService.open(content, {
      centered: true,
      windowClass: 'disassociate-modal',
    });
  }
  DeleteAndDisassociated() {

    this.systemId = (this.syssN).replace(/\s+/g, "");
    this.modalLoader = true;
    this.deletedevice = this.systemservice.deleteAndDisassociatedDevice(this.ORG_ID, this.systemId).subscribe((res: any) => {
      setTimeout(() => {
        this.getCount(true);
      }, 3500);
      this.success = true;
      this.showwarning = false;
      this.showSuccessMessage(this.language['The system has been deleted successfully']);
      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.modalLoader = false;
    })
    this.closeAllModal();
  }
  getSubscriberData() {
    //debugger;
    this.allListSubs = this.systemservice.GetSubscriberData(this.ORG_ID, this.subscriber).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  disassociateDeviceData() {
    this.modalLoader = true;
    this.disassociate = {
      systemId: (this.syssN).replace(/\s+/g, ""),
      subscriberId: this.subID
    };
    this.disassociateDevice = this.systemservice.disassociateDevice(this.ORG_ID, this.disassociate).subscribe((res: any) => {
      this.success = true;
      //this.getSubscriberData();
      setTimeout(() => {
        this.getCount(true);;
      }, 3500);
      this.showwarning = false;
      this.showSuccessMessage(this.language['System disassociated from subscriber successfully']);
      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      this.modalLoader = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    }else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    return this.errorInfo
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
  closeSucess() {
    this.error = false;
    this.success = false;
    //this.performSearch();
  }
  deleteSubscriber() {
    this.loading = true;
    this.subscriberId = this.subID;
    this.deletesubscriber = this.systemservice.deleteSubscriber(this.subscriberId, this.ORG_ID).subscribe((res: any) => {
      setTimeout(() => {
        this.getCount(true);;
      }, 3500);
      this.showwarning = false;
      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
  }

  goToSystemEdit(subscriber: any, device?: any) {
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['../system-edit'], { relativeTo: this.route, queryParams: this.queryParams });
    //this.router.navigate(['../system-edit' + '/' + item.devices[0].deviceId], { relativeTo: this.route });
  }
  closeAllModal() {
    this.modalService.dismissAll();
  }

  goToAddSystem() {
    this.router.navigate(['../add-system'], { relativeTo: this.route });
  }

  goToSystemDetails(subscriber, device?: any) {
    localStorage.setItem("calix.DeviceDetails", JSON.stringify(device));
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }
    //this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: sn, subscriber: subscriberId } });
    this.router.navigate(['../system-details'], { relativeTo: this.route, queryParams: this.queryParams });
    //this.router.navigate(['../system-details'], { relativeTo: this.route });
  }
  downloadExport() {
    this.ccoCommonService.doExport('subscriber-system-table-list');
  }
  deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  deleteServicesAssociateWithSbscrbrMsg = '';
  deleteSbscrbrMsg = '';

  confirmDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.showwarning = true;
    if (this.orgData?.factoryResetOnDelete === true) {
      this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `
      ${this.language['warning_message_system2']}
    <br/>
     ${this.language['warning_message_system1']}
     <br/>
     <br/>
     ${this.language['sys_del']}`
    } else {
      this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `${this.language['warning_message_system2']}<br/><br/>

   ${this.language['sys_del']}`
    }

  }

  closeDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.showwarning = false;
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
    this.closeAllModal();
  }
  confirmDeleteServicesAssociateWithSbscrbrMsg() {
    this.showwarning = true;
    this.deleteServicesAssociateWithSbscrbrMsg = `${this.language.Warning}:
    ${this.language['Del_assoc']}
  <br/>
  <br/>
   ${this.language['Do you want to proceed with the dissociate device?']}`
  }
  confirmWithSbscrbrMsg() {
    this.showwarning = true;
    if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === true) {
      this.deleteSbscrbrMsg = `${this.language['warning_message_subscriber3']}
      <br/>
      ${this.language['warning_message_subscriber1']}
    <br/>
    <br/>
     ${this.language['Do you want delete subscriber?']}`
    }
    else if (this.orgData?.deleteAssociatedSystems === true && this.orgData?.factoryResetOnDelete === false) {
      this.deleteSbscrbrMsg = `${this.language['warning_message_subscriber3']}
      <br/>
      ${this.language['warning_message_subscriber2']}
    <br/>
    <br/>
     ${this.language['Do you want delete subscriber?']}`
    }
    else if (this.orgData?.deleteAssociatedSystems === false && this.orgData?.factoryResetOnDelete === false) {
      this.deleteSbscrbrMsg = `
      ${this.language['warning_message_subscriber3']}
    <br/>
    <br/>
     ${this.language['Do you want delete subscriber?']}`
    } else {
      this.deleteSbscrbrMsg = `
    ${this.language['warning_message_subscriber3']}
  <br/>
  <br/>
   ${this.language['Do you want delete subscriber?']}`
    }

  }
  closeSbscrbrMsg() {
    this.deleteSbscrbrMsg = '';
    this.showwarning = false;
    this.closeAllModal();
  }
  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    this.showwarning = false;
    this.closeAllModal();
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
    const filtered = `${dtObj._iRecordsTotal > 10000 && (dtObj.oPreviousSearch.sSearch == '' || dtObj.oPreviousSearch.sSearch != '') ?
      (isFrench ?
        `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isSpanish ? `(filtrado de un total de  ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isGermen ? `(gefiltert aus  ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
          `(filtered from  ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '')) :
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
    this.systemSearchText = this.searchText;
    this.redraw();
  }
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

  formQueryParams(subscriber: any, device?: any) {
    let sn: any = '';
    let regId: string = '';
    let system: any = '';
    if (device) {
      if (_.isArray(device)) {
        let match = device.filter(el => el.opMode && el.opMode == 'RG');
        if (match.length) {
          let dev = match[0];
          sn = dev.serialNumber ? dev.serialNumber : dev.deviceId ? dev.deviceId : dev.macAddress ? dev.macAddress : '';
          system = dev.deviceId ? dev.deviceId : '';
          regId = dev.registrationId ? dev.registrationId : '';
        }
      } else {
        sn = device.serialNumber ? device.serialNumber : device.deviceId ? device.deviceId : device.macAddress ? device.macAddress : '';
        system = device.deviceId ? device.deviceId : '';
        if (subscriber.devices && subscriber.devices.length) {
          let match = subscriber?.devices?.filter(el => el.opMode && el.opMode == 'RG');
          if (match.length) {
            let dev = match[0];
            regId = dev.registrationId ? dev.registrationId : '';
          }
        }

      }

    }
    let subscriberId = subscriber.subscriberId ? subscriber.subscriberId : '';
    this.queryParams = { sn: sn, subscriber: subscriberId, regId: regId };
    if (subscriber?.devices?.length && subscriber?.devices?.filter(el => el && el.modelName == 'GM2037' && el.opMode != 'RG').length) {
      this.queryParams['radio3'] = true;
    }

    return;
  }

  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();

    this.systemSearchText = textEntered;
    if (textEntered.length == 0) {
      this.systemSearchText = "";
      this.router.navigate(['cco-foundation/foundation-systems/foundation-manage/foundation-system-list'])

    }
    // if (textEntered.length < 2) return;
    // this.searchResult = [];

    this.systemSearchText$.next(textEntered);
  }

  doSearch() {
    this.subscribers$ = this.systemSearchText$.pipe(
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
   if (dtInstance.search(this.systemSearchText).hasOwnProperty('draw'))   dtInstance.search(this.systemSearchText).draw();
    });
  }

  getDeleteAndFactoryResetData() {
    this.deleteFactoryResetSub = this.systemservice.getDeleteAndFactoryreset(this.ORG_ID).subscribe((res: any) => {
      this.orgData = res ? res : [];
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
    })
  }

  DeleteFactoryReset() {
    const params =
    {
      "deleteAssociatedSystems": false,
      "factoryResetOnDelete": false,
      "factoryResetOnRma": false
    }
    this.deleteFactoryResetSub = this.systemservice.DeleteAndFactoryreset(this.ORG_ID, params).subscribe((res: any) => {
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }

  //associate device
  addDevice(subscriber, isUnassociateSubscriber = false) {
    //debugger;
    this.submitted = true;
    this.loading = true;
    this.modalLoader =true
    // if (!Object.keys(subscriber).length && isUnassociateSubscriber) {
    //   return;
    // }
    if (!subscriber?.subscriberId) {
      if (!this.createSubscriber.value.subscriberLocationId || !this.createSubscriber.value.name || this.modalForm.email.errors) {
        return
      }
      else {
        const paramsub = this.createSubscriber.value;
        this.addSusbsciberSubs = this.systemservice.AddSubscriberData(this.ORG_ID, paramsub).subscribe((res: any) => {
          this.subscriberId = res?._id;
          const params = {
            systemId: (this.systemid).replace(/\s+/g, ""),
            subscriberId: this.subscriberId
          }
          this.associateSubs = this.systemservice.associateDevice(this.ORG_ID, params).subscribe(res => {
            setTimeout(() => {
              this.getCount(true);;
            }, 2500);
            let msg = 'System  associated with subscriber successfully';
            this.showSuccessMessage(msg);
            this.loading = false;
            this.modalLoader =false
            this.cancelAssociate();
            //this.closeAllModal();
          }, (err: HttpErrorResponse) => {
            this.pageErrorHandle(err);
            this.loading = false;
            this.modalLoader =false
            this.closeAllModal();
          });

        }, (err: HttpErrorResponse) => {
          //console.log(err);
          this.pageErrorHandle(err);
          this.loading = false;
          this.modalLoader =false
        });
      }

    }
    else {
      this.subscriberId = subscriber.subscriberId;
      const params = {
        systemId: (this.systemid).replace(/\s+/g, ""),
        subscriberId: this.subscriberId
      }
      this.associateSubs = this.systemservice.associateDevice(this.ORG_ID, params).subscribe(res => {
        setTimeout(() => {
          this.getCount(true);;
        }, 2500);
        let msg = 'System  associated with subscriber successfully';
        this.showSuccessMessage(msg);
        this.loading = false;
        this.modalLoader =false
        this.cancelAssociate();
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.modalLoader =false
        this.pageErrorHandle(err);
        this.closeAllModal();
      });
    }

  }
  closeSearch() {
    $(".asso-search-dropdown").hide();
  }

  formGrouping(input) {
    this.createSubscriber = this.formBuilder.group({
      account: [input.account || ''],
      subscriberLocationId: [input.subscriberLocationId || '', Validators.required],
      name: [input.name || '', Validators.required],
      serviceAddress: [input.serviceAddress || ''],
      phone: [input.phone || ''],
      email: [input.email || '', Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")],
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
  showSubscriber(subscriberId) {
    this.disableSub = true;
    $(".asso-search-dropdown").hide();
    this.formGrouping(subscriberId);
    this.unassociatedSubscriber = subscriberId;
  }
  showAddSubscriberModal(item?, device?) {
    //debugger;
    this.submitted = false;
    this.systemid = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    this.modalRef = this.modalService.open(this.associateSubscriberModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  get modalForm() { return this.createSubscriber.controls; }

  getScopes() {
    let scopes = this.sso.getScopes();

    scopes['cloud.rbac.foundation.systems'] = scopes['cloud.rbac.foundation.systems'] ? scopes['cloud.rbac.foundation.systems'] : [];

    if (scopes && (scopes['cloud.rbac.foundation.systems'])) {
      if (scopes['cloud.rbac.foundation.systems'].indexOf('read') !== -1 && scopes['cloud.rbac.foundation.systems'].indexOf('write') !== -1)
        this.hasWrite = true;
    }

  }
  associateChange() {
    this.disableSub = false;
    this.unassociatedSubscriber = '';
    this.createSubscriber.patchValue({
      serviceAddress: '',
      phone: '',
      email: ''
    })
  }
  cancelAssociate() {
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
  cancelModel() {
    this.showwarning = false;
    this.closeAllModal();
  }

  openOutModal(content, device?) {
    if (device && device.serialNumber) {
      this.subscriberId = device.serialNumber;
    }
    this.isModalError = false;
    // this.isModalSuccess = false;
    if (!this.rbtStatus) {
      this.rbtStatus = true;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
    }, (reason) => {
      this.modalLoader = false;
    });
    if (this.rbtStatus && this.bootHappening) {
      setTimeout(() => {
        let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
        element.click();
      }, 900);
    }
  }

  rebootDevice() {
    this.modalLoader = true;
    if (!this.bootHappening) {
      this.bootHappening = true;
      this.completionStatus = [{
        isTime: moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
        isResponse: 'Starting Reboot',
      }];
    } else {
      return;
    }
    this.routerService.doReboot(this.ORG_ID, this.subscriberId).subscribe(res => {
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
        isResponse: this.pageModalErrorHandle(err, false),
      });
      this.bootHappening = false;
      this.rbtStatus = false;
    });
  }

  pageModalErrorHandle(err: any, showError = true) {
    if (err.status === 401) {
      this.modalWarningMessage = 'Access Denied';
    } else if (err.status === 500 && err.error.error != "Error_CannotResolveHostName" && err.error.error != "Error_NoRouteToHost") {
      this.modalWarningMessage = 'Internal Server Error';
    } else if (err.status === 504) {
      this.modalWarningMessage = 'Gateway Timeout';
    } else if (err.status === 500 && err.error.error == "Error_CannotResolveHostName") {
      this.modalWarningMessage = 'Cannot Resolve Host Name';
    } else if (err.status === 500 && err.error.error == "Error_NoRouteToHost") {
      this.modalWarningMessage = 'No Route To Host';
    } else {
      this.modalWarningMessage = this.dataService.pageErrorHandle(err);
    }
    if (showError) this.isModalError = true;
    return this.modalWarningMessage;
  }

  //factory_Reset
  openResetModal(item?: any, device?: any) {
    this.systemId_Reset = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
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
        isResponse: `${this.language.factoryResetLabel(data)} has been initiated.` //'Starting Factory Reset',
      }];
    } else {
      return;
    }
    const params = {
      'systemId': this.systemId_Reset
    }
    this.addSystemservice.factoryReset(this.ORG_ID, params).subscribe(res => {
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

  openResetconfirmModal() {
    this.modalRef = this.modalService.open(this.resetconfirmModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  checkONT(device) {
    // Will return true if device is pure ONT
    if (device && device.ont) {
      if (device._id || (device.opMode && device.opMode === "RG")) {
        return false;
      } else return true;
    }
    return false;
  }

  openDisassociateSystemModal() {
    this.modalService.open(this.disassociateSystemModal, {
      centered: true,
      windowClass: 'disassociate-modal',
    });
  }
  numberOnly(event) {
   if(/[A-z\^\~\_]/.test(event.key))event.preventDefault();
  }
  gotoServiceProfiles(){
    this.router.navigate(['/cco-foundation/foundation-configuration/configuration-prerequisites/foundation-profiles/ONT-profile'])
  }

  exportSubscribers(){
    let exportCount = this.searchResult.records;
    this.exportDetails();
    // this.exportResult();
    }

}

