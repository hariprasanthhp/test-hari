import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubscriberService } from '../cco-subscriber-system/add-service-system/add-subscriber.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import { AddServiceSystemComponent } from '../cco-subscriber-system/add-service-system/add-service-system.component';
import moment from 'moment';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-subscribers-impact',
  templateUrl: './subscribers-impact.component.html',
  styleUrls: ['./subscribers-impact.component.scss']
})
export class SubscribersImpactComponent implements OnInit, OnDestroy {
  alarmData: any = {};
  count: any = 0;
  initLoad = false;
  showTable = false;
  listObs: any;
  isModalError: boolean = false;
  modalWarningMessage: any = '';
  list: any = [];
  loading = false;
  orgData: any;
  systemId: any;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
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

  languageSubject;
  language: any;
  successInfo: any;
  success: boolean;
  error: boolean;
  showSuccess: boolean;
  syssN: any;
  subID: any;
  deleteONT: boolean;
  modalLoader: boolean;
  ORG_ID: any;
  servify: boolean;
  deletedevice: any;
  showwarning: boolean;
  showconfirmation: boolean = true;
  allowsupportCloud: boolean = false;
  errorInfo: any;
  disassociateDevice: any;
  allListSubs: any;
  subscriberId: any;
  deletesubscriber: any;
  deleteFactoryResetSub: any;
  submitted: boolean;
  associateSubsciberSubs: any;
  associateSubscriber: any;
  systemid: any;
  associateSubs: any;
  accountSearchResult: any[];
  searchSubscriber: any;
  changeDetect: any;
  disableSub: boolean;
  unassociatedSubscriber: any;
  linkageType: string;
  createSubscriber: any;
  editSubscriber: boolean;
  editSubscriberData: any;
  isAddError: boolean;
  createSubmitted: boolean;
  createdSubscriberId: string;
  createdSubscriberName: any;
  createSubscriberSubs: any;
  createdSubcriberData: any;
  successMsg: any;
  queryParams: any;
  systemId_Reset: any;
  deviceInfo: any;
  bootHappening: any;
  completionStatus: {
    isTime: string; //moment(new Date()).format('MM/DD/YYYY, h:mm:ss A'),
    isResponse: string; //'Starting Factory Reset,
  }[];
  factoryResetsub: any;
  model: any;
  systemId_Reboot: any;
  Isontdevice: boolean;
  vendor: any;
  sn: any;
  _array = Array;
  serialNum: any;
  rebootsub: any;
  rbtStatus: boolean;
  orgEnable: any;
  isAssociateError = false
  deviceType: any;
  subscriberImpacted: boolean;
  FsanList: any;
  searchText: any;
  showResult: boolean;
  hasScopeAccess: boolean = false;
  hasWrite: boolean = false;
  params: any;
  constructor(private translateService: TranslateService,
    private http: HttpClient,
    private sso: SsoAuthService,
    private dataService: DataServiceService,
    private modalService: NgbModal,
    private systemservice: AddSubscriberService,
    private commonOrgService: CommonService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
    this.ORG_ID = this.sso.getOrgId();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.initLoad = false;
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
        this.getList();
      }, 100);
    });
    this.loading = true;
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      if (scopes?.['cloud.rbac.coc.services.subscribers.subscriberslist']) {
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
    this.showTable = true;
    this.getList();
    this.getScopes();
    this.getDeleteAndFactoryResetData();
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
  subscriberFilter(args): any {
    let searchFsan = []
    this.loading = true;
    if (args) {
      searchFsan.push(args)
      this.params = searchFsan
      this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    } else {
      this.params = this.FsanList
      this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }

    // if (!args) this.list = Object.assign([],this.allList);
    // args = args.toLowerCase();

    // this.list = this.allList.filter(function (data) {
    //   return JSON.stringify(data).toLowerCase().includes(args);
    // });
  }
  allList: any
  //check RBAC 
  getScopes() {
    //debugger;
    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {
      if (scopes?.['cloud.rbac.coc.services.subscribers.subscriberslist']?.indexOf('write') !== -1) {
        this.hasWrite = true;
      }
    } else {
      this.hasWrite = true;
    }

  }
  getList(value?) {
    this.loading = true;
    this.alarmData = JSON.parse(localStorage.getItem('calix.impactedSubsFSANData'));
    let searchFsan = []
    if (value) {
      searchFsan.push(value)
      this.params = searchFsan
    } else {
      this.params = this.alarmData?.subject?.impactedSubsFSAN;
    }
    this.FsanList = this.alarmData?.subject?.impactedSubsFSAN;
    this.titleService.setTitle(`Subscribers impacted by ${this.alarmData?.subject?.alarmEventName} (${this.alarmData?.subject?.impactedSubsCount}) - Systems - Operations - Calix Cloud`);
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      //responsive: true,
      serverSide: true,
      processing: false,
      searching: false,
      lengthChange: false,
      ordering: false,
      //scrollX: true,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        let query = "";
        this.params?.forEach(element => {
          if (!element) {
            return;
          }

          if (query != "") {
            query += " OR ";
          }

          query += `device:${encodeURIComponent(element)}`;

        });
        let url = `${environment.API_BASE_URL}csc/subscriber-search?pageNumber=${dataTablesParameters.start !== 0 ? dataTablesParameters.start / 10 + 1 : 1}&pageSize=${dataTablesParameters.length}&filter=${query}`;
        console.log(url);
        that.listObs?.unsubscribe();
        that.listObs = that.http
          .get(url)
          .subscribe((resp: any) => {
            this.count = resp?.metadata?.totalHits;

            this.loading = false;


            let list = resp?.records;
            this.allList = Object.assign([], list);
            this.list = list;

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

  gotoRealtimeAlarmsPage() {
    this.router.navigate([this.alarmData?.redirectUrl ? this.alarmData?.redirectUrl : '/cco/issues/device/realtime/current-issues']);
  }

  ngOnDestroy() {
    this.listObs?.unsubscribe();
  }
  showSuccessMessage(msg: any) {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2500)
  }
  closeAlert() {
    this.error = false;
    this.success = false;
    this.showSuccess = false;
  }
  getSubscriberInfo(subscriberId, deviceData) {
    sessionStorage.setItem(`${this.sso.getTabId()}calix.deviceData`, JSON.stringify(deviceData));
    sessionStorage.setItem(`${this.sso.getTabId()}calix.subscriberId`, subscriberId);
    this.dataService.setSubscriberInfo(undefined);
    this.dataService.setSubscriberTabInfoData(undefined);
    this.dataService.multipleRegInstance = undefined;
  }
  opendissasciateDeviceModel(item?: any, device?: any) {

    this.syssN = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
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
    this.syssN = device?.serialNumber ? device.serialNumber : (device?.deviceId ? device.deviceId : (device.macAddress ? device.macAddress : ''));
    this.subID = item?.subscriberId;
    this.modalRef = this.modalService.open(this.deleteDevicerModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal',
    });
  }

  opendeleteSubscriberModal(item?: any, device?: any) {
    this.syssN = device?.serialNumber ? device.serialNumber : (device?.deviceId ? device.deviceId : (device?.macAddress ? device.macAddress : ''));
    this.subID = item?.subscriberId;
    this.modalLoader = true;
    this.systemservice.deleteWarningSubscriber(this.ORG_ID, this.subID).subscribe((res: any) => {
      this.servify = true
      this.deleteServicesAssociateWithSbscrbrMsg = '';
      this.modalRef = this.modalService.open(this.deleteSubscriberModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
      this.modalLoader = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.servify = false
      this.deleteServicesAssociateWithSbscrbrMsg = '';
      this.modalRef = this.modalService.open(this.deleteSubscriberModal, {
        size: 'lg',
        centered: true,
        windowClass: 'custom-modal',
      });
      this.modalLoader = false;
    })
  }

  DeleteAndDisassociated() {

    this.systemId = (this.syssN).trim();
    this.modalLoader = true;
    if (this.deleteONT) {
      this.deletedevice = this.systemservice.DeleteONT(this.systemId).subscribe((res: any) => {
        setTimeout(() => {
          if (this.subID) {
            this.disassociateDeviceData(true);
          } else {
            this.getList();
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
    } else {
      this.deletedevice = this.systemservice.deleteAndDisassociatedDevice(this.ORG_ID, this.systemId).subscribe((res: any) => {
        setTimeout(() => {
          this.getList();
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
  closeAllModal() {
    this.modalService.dismissAll();
    this.showconfirmation = true;
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
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
  disassociateDeviceData(value?) {
    this.modalLoader = true;
    this.systemId = (this.syssN).trim();
    this.disassociateDevice = this.systemservice.disassociateDevice(this.subID, this.systemId).subscribe((res: any) => {
      this.success = true;
      this.getSubscriberData();
      setTimeout(() => {
        this.getList();
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

  deleteSubscriber() {
    this.loading = true;
    this.subscriberId = this.subID;
    this.deletesubscriber = this.systemservice.deleteSubscriber(this.subscriberId, this.ORG_ID).subscribe((res: any) => {
      setTimeout(() => {
        this.getList();
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
            this.getList();
          }, 1500);
          let msg = this.language['System  associated with subscriber successfully'];
          this.showSuccessMessage(msg);
          this.loading = false;
          this.closeAllModal();
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
          this.getList();
        }, 1500);
        let msg = this.language['System  associated with subscriber successfully'];
        this.showSuccessMessage(msg);
        this.loading = false;
        this.closeAllModal();
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

  private ccoSystemSearchText$ = new Subject<string>();
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
  ccoSystemSearchText: any;
  searchByCharacters(event) {
    if (this.searchText = '') {
      this.searchText = "";
      this.getList();
    } else {
      this.loading = true;
      if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
      this.searchSubscriber = this.systemservice.performSearch(this.ORG_ID, this.searchText, 1, 500).subscribe(
        (res: any) => {
          this.count = res?.metadata?.totalHits;

          this.loading = false;


          let list = res?.records;
          this.allList = Object.assign([], list);
          this.list = list;
        },
        err => {

        }
      );
    }

  }
  performSearch() {
    this.ccoSystemSearchText = this.searchText;
    this.performSearch();
  }
  redraw() {
    this.loading = true;
    this.showResult = true;
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  clearSearch(value) {
    this.searchText = "";
    this.getList();
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
          this.getList();
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
          this.getList();
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
    this.subscriberImpacted = true
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    let name = subscriber.name ? subscriber.name : '';
    this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.queryParams.subscriber, page: page || 'add-details', sName: name, subscriberImpacted: this.subscriberImpacted, Pagefrom: 'Subscriber Impact' } });
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
  goToSupportCloud(subscriber, device?) {
    sessionStorage.setItem('calix.subscriberId', subscriber?.subscriberId);
    sessionStorage.setItem('calix.deviceData', JSON.stringify(device));
    // this.router.navigate([]).then(result => { window.open('support/service/data', '_blank') });
    window.open('support/service/data', '_blank');
  }

  //To Edit Subscriber's System
  goToEditSubscriberSystem(subscriber: any, device?: any) {
    this.subscriberImpacted = true
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber);
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }
    let name = subscriber.name ? subscriber.name : '';
    this.router.navigate(['/cco/system/cco-subscriber-system/edit-service-system'], { queryParams: { subscriber: this.queryParams.subscriber, sn: this.queryParams?.sn || '', page: 'add-system', sName: name, subscriberImpacted: this.subscriberImpacted, Pagefrom: 'Subscriber Impact' } });
  }

  showDetailedView(subscriber, device?) {
    this.subscriberImpacted = true
    localStorage.setItem("calix.Device_Details", JSON.stringify(subscriber));
    this.formQueryParams(subscriber, device);
    if (!this.queryParams?.sn && !this.queryParams?.subscriber) {
      return;
    }

    this.router.navigate(['/cco/system/cco-subscriber-system/system-details'], { queryParams: { subscriber: this.queryParams.subscriber, sn: this.queryParams?.sn || '', regId: this.queryParams?.regId, subscriberImpacted: this.subscriberImpacted } });
  }
  addSystem(subscriber, isUnassociateSubscriber = false) {
    this.subscriberImpacted = true
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['/cco/system/cco-subscriber-system/add-system'], { queryParams: { subscriber: this.queryParams.subscriber, subscriberImpacted: this.subscriberImpacted } });

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
    this.subscriberImpacted = true
    this.formQueryParams(subscriber);
    if (!this.queryParams?.subscriber) {
      return;
    }
    this.router.navigate(['/cco/system/cco-subscriber-system/add-service'], { queryParams: { subscriber: this.queryParams.subscriber, subscriberImpacted: this.subscriberImpacted } });
  }
  cancelModel() {
    this.showwarning = false;
    this.closeAllModal();
    this.showconfirmation = true;
  }
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
    if (data === 'ont' || device?.opModeWithOnt == 'ONT/RG') {
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

}
