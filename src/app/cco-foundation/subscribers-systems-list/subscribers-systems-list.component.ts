import { AfterViewChecked, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import _ from 'lodash';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-subscribers-systems-list',
  templateUrl: './subscribers-systems-list.component.html',
  styleUrls: ['./subscribers-systems-list.component.scss']
})
export class SubscribersSystemsListComponent implements OnInit, AfterViewChecked {

  modalRef: any;
  @ViewChild('swapSystemModal', { static: true })
  private swapSystemModal: TemplateRef<any>;
  @ViewChild('deleteSubscriberModal', { static: true })
  private deleteSubscriberModal: TemplateRef<any>;
  @ViewChild('deleteDevicerModal', { static: true })
  private deleteDevicerModal: TemplateRef<any>;
  closeModal: string;


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
  empty = {
    serielNumber: '',
    name: '',
    status: '',
    model: '',
    macAddress: '',
    subscriberName: '',
    accountID: '',
    subscriberStatus: '',
    revenue_edge_suits: '',
    service_plan: '',
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
  topSearchResultscount: any = 0;
  tableCounts: any;
  subID: any;
  bFactoryReset: boolean;
  subscriberId: any;
  _array = Array;
  queryParams: { sn: any; subscriber: any; regId: any };
  successInfo: any;
  allListSubs: any;
  private systemSearchText$ = new Subject<string>();
  subscribers$: any;
  showFilterCount: boolean;
  count: number = 0;
  countAvailable: any;
  showCount: boolean;
  showCountSubs: any;
  esTable: any;
  de_DETable: any;
  first10kvalue: boolean;
  show: boolean;
  Settings: any;

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
    private sso: SsoAuthService,
    private http: HttpClient,
    private titleService: Title
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.ccoCommonService.currentPageAdder('system-table-view');
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Search - Home - Deployment - Calix Cloud');
    this.loading = true;
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
    this.showResult = true;
    this.systemSearchText = history.state?.systemSearchText || history.state?.subscriberId;
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
        this.systemSearchText = history.state.systemSearchText || history.state?.subscriberId;
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
    this.tableLanguageOptions();

    this.exportEventSubs = this.ccoCommonService.ccoPageExport.subscribe(
      (data) => {
        if (data && data == 'subscriber-system-table-list') {
          this.export();
        }
      }
    );

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
  ngAfterViewChecked(): void {
    // let oddNoDataAvailableElement = document.getElementsByClassName('odd'),emptyCell = document.getElementsByClassName('dataTables_empty');
    // if(oddNoDataAvailableElement?.length || emptyCell?.length){
    //   if(this.systemsList.length ){
    //     oddNoDataAvailableElement[0]?.classList.remove('odd');
    //     oddNoDataAvailableElement[0]?.classList.add('d-none');
    //     emptyCell[0]?.classList.add('d-none')
    //   }
    // }
  }
  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.exportEventSubs) this.exportEventSubs.unsubscribe();
    if (this.showCountSubs) this.showCountSubs.unsubscribe();
  }

  getListData(rerender?) {
    this.service.getSubscribersSystemList().subscribe((res: any) => {
      this.tableData = res ? res : [];
      for (var i = 0; i < this.tableData.length; i++) {
        this.systemId = this.tableData[i].serielNumber
      }

      this.renderTable(rerender);
    });
  }

  getCount(redraw = false) {
    this.systemservice.performSearch(this.ORG_ID, '', 0, 0).subscribe((res: any) => {
      this.count = res.metadata.totalHits;
      this.topSearchResultscount = res.metadata.totalHits;
      this.tableCount = res.metadata.totalHits;
      //   if (this.tableCount > 10000) {
      //     this.firstvalue = true;
      //     this.tableCount = 10000;
      //     res.metadata.totalHits = 10000;
      // } else {
      //   this.tableCount = res.metadata.totalHits;
      // }
      // if (this.tableCount > 10000) {
      //   this.tableCount = 10000;
      // }
      this.countAvailable = true;
      if (redraw) {
        this.performSearch();
      } else this.tableRender();

    }, error => {
      this.loading = false;
      this.tableCount = 0;
      this.tableRender();
    })

  }

  tableRender() {
    this.showResult = true;
    const that = this;
    let orgId = this.ORG_ID;
    let pageNumber: number;
    let url = `${environment.SUPPORT_URL}/subscriber-search`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      lengthChange: false,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {

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

        const params = new HttpParams()
          // .set("orgId", orgId)
          .set("filter", this.systemSearchText || "")
          .set("pageNumber", `${pageNumber + 1}`)
          .set("pageSize", dataTablesParameters.length)
        if (this.sso.getOrg(orgId)) {
          params.set("orgId", orgId)
        }

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
            that.topSearchResultscount = (resp && resp.metadata && resp.metadata?.totalHits) ? resp.metadata?.totalHits : 0;
            that.filterCount = (resp && resp.metadata && resp.metadata?.totalHits) ? resp.metadata?.totalHits : 0;
            if (that.filterCount > 10000) {
              this.first10kvalue = true;
              that.filterCount = 10000;
              resp.metadata.totalHits = 10000;
            } else {
              this.first10kvalue = false;
              that.filterCount = resp.metadata.totalHits;
            }
            // if (that.filterCount > 10000) {
            //   that.filterCount = 10000;
            // }
            this.showCount = true;


            if (resp?.records && resp?.records.length) {
              if (resp?.records) {
                resp?.records.forEach(obj => {
                  const RGDevices = obj?.devices?.filter(device => device.opMode == "RG");
                  if (obj?.devices?.length) {
                    const index = obj?.devices.findIndex(device => device.opMode == "RG");
                    if (index > -1) obj?.devices.splice(0, 0, obj?.devices.splice(index, 1)[0]);
                  }
                  if (RGDevices?.length > 1) {
                    let deviceSet: any = [];
                    RGDevices.forEach(rg => {
                      let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn && device.wapGatewaySn == rg.serialNumber)];
                      deviceSet.push(deviceCollector);
                    });
                    const ds = deviceSet.flat(2).map(devs => devs.deviceId);
                    const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
                    if (notMatched.length > 0) deviceSet.push()
                    obj.devices = deviceSet;
                  }
                });
              }
              //to fix CCL-35780
              const order = {
                'RG': 1,
                'WAP': 2,
                'ONT': 3
              }
              for (let i = 0; i < resp.records.length; i++) {
                if (resp?.records[i]?.devices) {
                  resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
                    let opmodeA = a['ont'] ? 'ONT' : a?.opMode ? a?.opMode : '';
                    let opmodeB = b['ont'] ? 'ONT' : b?.opMode ? b?.opMode : '';
                    return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
                  });
                }
              }
              // fix-end CCL-35780
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
            }, 0)

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
        setTimeout(() => {
          $('.odd').css('display', 'none');
        }, 100);
        setTimeout(() => {
          //this.resetDelete();
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

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.de_DETable;
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

  export() {
    let name = this.ccoCommonService.generateExportName('subscribers-system');
    let exportData = this.ccoCommonService.exportDataConvertor(this.tableData);
    if (exportData.length) {
      this.exportExcel.downLoadCSV(name, exportData);
    } else {
      this.exportExcel.downLoadCSV(name, [this.empty]);
    }
  }

  openSwapSystemModal(item: any, device?: any) {

    this.syssN = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    this.subID = item.subscriberId;
    this.modalRef = this.modalService.open(this.swapSystemModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  opendeleteSubscriberModal(item: any, device?: any) {
    this.syssN = device?.deviceId ? device?.deviceId : (device?.serialNumber ? device?.serialNumber : (device?.macAddress ? device?.macAddress : ''));
    this.subID = item.subscriberId;
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    this.modalRef = this.modalService.open(this.deleteSubscriberModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  opendeleteDevicerModal(item: any, device?: any) {
    //debugger;
    //this.syssN = item.devices[0]?.deviceId;
    this.syssN = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    this.subID = item.subscriberId;
    this.modalRef = this.modalService.open(this.deleteDevicerModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }
  DeleteAndDisassociated() {

    this.systemId = this.syssN;
    this.bFactoryReset = false;
    this.modalLoader = true;
    this.systemservice.deleteAndDisassociatedDevice(this.ORG_ID, this.systemId).subscribe((res: any) => {
      this.getSubscriberData();
      setTimeout(() => {
        this.performSearch();
      }, 1500);
      this.success = true;
      this.showSuccessMessage(this.language['The system has been deleted successfully']);
      this.modalLoader = false;
      //this.successInfo = this.language['The system has been deleted successfully'];
    }, (err: HttpErrorResponse) => {
      //console.log(err);
      this.pageErrorHandle(err);
      this.modalLoader = false;
    })
    this.closeAllModal();
  }
  getSubscriberData() {
    this.allListSubs = this.systemservice.GetSubscriberData(this.ORG_ID, this.subID).subscribe((res: any) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  swapWithExistingData() {
    this.modalLoader = true;
    this.disassociate = {
      systemId: this.syssN,
      subscriberId: this.subID
    };
    this.disassociateDevice = this.systemservice.disassociateDevice(this.ORG_ID, this.disassociate).subscribe((res: any) => {
      this.success = true;
      this.getSubscriberData();
      setTimeout(() => {
        this.performSearch();
      }, 1500);
      this.showSuccessMessage(this.language['System disassociated from subscriber successfully']);
      this.modalLoader = false;
      //this.successInfo = this.language['System disassociated from subscriber successfully'];
    }, (err: HttpErrorResponse) => {
      //console.log(err);
      this.modalLoader = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
    //console.log('swapped');
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
  closeAlert() {
    this.error = false;
    this.success = false;
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
  deleteSubscriber() {

    this.loading = true;
    this.subscriberId = this.subID;
    this.systemservice.deleteSubscriber(this.subscriberId, this.ORG_ID).subscribe((res: any) => {
      //this.loading = false;
      //this.success = true;
      //this.getSubscriberData();
      setTimeout(() => {
        this.performSearch();
      }, 1500);
      //this.showSuccessMessage(this.language['The subscriber has been deleted successfully']);
      //this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
    this.closeAllModal();
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
    this.router.navigate(['/cco-foundation/foundation-systems/foundation-manage/system-details'], { queryParams: this.queryParams });
    //this.router.navigate(['../system-details'], { relativeTo: this.route });
  }
  downloadExport() {
    this.ccoCommonService.doExport('subscriber-system-table-list');
  }
  deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  deleteServicesAssociateWithSbscrbrMsg = '';
  deleteSbscrbrMsg = '';
  confirmDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `${this.language['warning_message_subscriber_mng']}<br/>

   ${this.language['Dev_del']}`
  }

  closeDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  }
  confirmDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = `Warning:
    ${this.language['Del_assoc']}
  <br/>

   ${this.language['Do you want to proceed with the dissociate device?']}`
  }
  confirmWithSbscrbrMsg() {
    this.deleteSbscrbrMsg = `
    ${this.language['warning_message_subscriber']}
  <br/>

   ${this.language['Do you want delete subscriber?']}`
  }
  closeSbscrbrMsg() {
    this.deleteSbscrbrMsg = '';
  }
  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
  }
  redraw() {
    this.tableLanguageOptions();
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
      searchText: this.systemSearchText ? this.systemSearchText.replace(/\s+/g, "") : '',
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj._iRecordsTotal > 10000 && dtObj._iRecordsDisplay > 0 ?
      (isFrench ?
        `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
          isGermen ? `(gefiltert aus  ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '') :
            `(filtered from  ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + (this.show ? `<b style="font-size: 14px;">${this.language.searchError}</b>` : '')) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
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

  formQueryParams(subscriber: any, device?: any) {
    let sn: any = '';
    let regId: string = '';
    if (device) {
      if (_.isArray(device)) {
        let match = device.filter(el => el.opMode && el.opMode == 'RG');
        if (match.length) {
          let dev = match[0];
          sn = dev.serialNumber ? dev.serialNumber : dev.deviceId ? dev.deviceId : dev.macAddress ? dev.macAddress : '';
          regId = dev.registrationId ? dev.registrationId : '';
        }
      } else {
        sn = device.serialNumber ? device.serialNumber : device.deviceId ? device.deviceId : device.macAddress ? device.macAddress : '';
        if (subscriber.devices && subscriber.devices.length) {
          let match = subscriber.devices.filter(el => el.opMode && el.opMode == 'RG');
          if (match.length) {
            let dev = match[0];
            regId = dev.registrationId ? dev.registrationId : '';
          }
        }

      }

    }
    let subscriberId = subscriber.subscriberId ? subscriber.subscriberId : '';
    this.queryParams = { sn: sn, subscriber: subscriberId, regId: regId };
    if (subscriber?.devices?.length && subscriber?.devices.filter(el => el && el.modelName == 'GM2037' && el.opMode != 'RG').length) {
      this.queryParams['radio3'] = true;
    }
    return;
  }

  searchByCharacters(event) {
    const textEntered: string = $(event.target).val().toString();

    this.systemSearchText = textEntered;
    // if (textEntered.length < 2) {
    //   this.systemSearchText = "";
    // }
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
      dtInstance.search(this.systemSearchText).draw();
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

}
