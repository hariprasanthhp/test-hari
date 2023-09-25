import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ManagementService } from './service/management.service';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from '../../data.service';
import { DataTableDirective } from 'angular-datatables';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SearchListModel } from '../../shared/models/search-list.model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { getSubscribeList } from '../../shared/service/endpoints';
import { SubscribeService } from '../../shared/service/subscriber.service';
import { environment } from 'src/environments/environment';
import { DEVICE_MANAGE_MODEL_COLLECTIONS, DEVICE_MODAM_MODEL_COLLECTIONS, DEVICE_MODELS_COLLECTIONS, DEVICE_RG_MODEL_COLLECTIONS, DEVICE_STATIC_GROUP_DATA, DEVICE_WEP_MODEL_COLLECTIONS, SubscriberManagement } from './subscriber.constants';
import * as $ from 'jquery';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-subscriber-management',
  templateUrl: './subscriber-management.component.html',
  styleUrls: ['./subscriber-management.component.scss'],
  providers: [SsoAuthService]
})
export class SubscriberManagementComponent implements OnInit {
  modelList: Array<any> = DEVICE_MODELS_COLLECTIONS;
  deleteDeviceId = '';
  deletePrompt = false;
  deletePromptForCommunity = false;
  isError = false;
  isAddError = false
  public warningMessage = '';
  public errorMessage;
  tableCounts;
  language: any;
  languageSubject;
  loader = true;
  showResult = false;
  result: any = {};
  searchSubscriber;
  searchResult: SearchListModel = new SearchListModel();
  isReRender = false;
  submitted = false;
  createSubscriber: any;
  flag: any = {};
  dataObj: any = {
    option: 'disassociate'
  };

  count: number;
  searchText: string = "";

  accountSearchText: string = "";
  accountSearchResult;
  overallfilterCount: number;
  filterCount: number;
  orgId: string;
  staticGroupData: any;
  showFilterCount: boolean = false;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: false,
    ordering: false,
    dom: "tip",
    responsive: true,
  };
  @ViewChild('addSubscriberModal', { static: true }) private addSubscriberModal: TemplateRef<any>;
  @ViewChild('deviceDelete', { static: true }) private deviceDelete: TemplateRef<any>;
  @ViewChild('replaceConfirm', { static: true }) private replaceConfirm: TemplateRef<any>;
  @ViewChild('hubbIDModel', { static: true }) private hubbIDModel: TemplateRef<any>;
  public showSuccess: boolean = false;
  public successMsg: string;
  createdSubscriberName: string;
  hasWriteAccessForSubscriber: boolean = false;
  hasWriteAccessForDevice: boolean = false;
  hasWriteAccessForDeviceDelete: boolean = false;
  unassociatedSubscriber: any = {};
  modalWarningMessage: any = '';
  isModalError: boolean = false;
  modalLoader = false;
  createHubb: any;
  hubbLoader = false;
  hubbId = '';
  hubbSubId = '';
  subLoader = false;
  orgData: any;
  showProvisionRecord: boolean = true;
  isProvision: boolean = false
  hasServify: boolean;
  first10kvalue: boolean;
  showExcessError: boolean = false
  dtPageNo: any;
  filteredOverallCount: any;
  tempSearchText;
  showDeleteBtnCIQorCWX = '';
  selectedSubsIsCIQorCWX = '';
  searchSubscription: any;
  serialNumber: any;
  tabEvent: any;
  successInfo: any;
  constructor(
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private service: DataServiceService,
    private foundationService: FoundationManageService,
    private changeDetect: ChangeDetectorRef,
    private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, public ssoAuthService: SsoAuthService,
    private subscribeService: SubscribeService, private route: ActivatedRoute,
    private managementService: ManagementService, private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,) {

    this.tabEvent = JSON.parse(localStorage.getItem('Provisioning'));
    this.orgId = this.ssoAuthService.getOrgId();
    let searchText = "";
    if (this.tabEvent?.isMenuSub) {
      const obj = this.tabEvent?.menuSub;
      // this.searchText = `subscriberid:${obj._id}`
      searchText = `subscriberid:${obj._id}`
      this.tempSearchText = searchText;
      // setTimeout(() => { this.searchText = '' }, 2000);
      //  this.search(searchText);
    }

    this.loadSubscriberMetadata(searchText);
    // this.getDeviceModels();


  }


  ngOnInit() {
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'Netops-Subscriber Management', this.router.url, 'Subscriber Management page is loaded');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.titleService.setTitle(`${this.language["Subscriber_Management"]} - ${this.language["NetOps"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);
      this.newRedraw();

    });
    this.titleService.setTitle(`${this.language["Subscriber_Management"]} - ${this.language["NetOps"]} - ${this.language["Service"]} - ${this.language["Calix Cloud"]}`);
    this.getDeleteAndFactoryResetData();
    if (this.getScopes()) return;

    if (this.hasWriteAccessForDevice) this.getDeviceModels();
    $("#search").val("  ");
    this.formGrouping({});
    $(".asso-search-dropdown").hide();

    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || this.tabEvent?.searchText || this.tabEvent?.subscriberId;
      if (this.searchText || this.searchText == "") {
        setTimeout(() => { this.redraw() }, 1000)
      }
    });

    if (this.tabEvent?.isMenu) {
      setTimeout(() => {
        let obj = this.tabEvent?.menuSub;
        obj.subscriberId = obj._id;
        this.editSubscriberModal(obj);
      }, 1000);
    }
    else if (this.tabEvent?.isProvision) {
      this.isProvision = true;
      this.loader = true;
      const obj = this.tabEvent?.menuSub;



      let data = []
      if (obj?.devices != undefined && obj.devices.length > 0) {
        // data = obj.devices.filter(res => {
        //   return res.opMode === 'RG' || 'WAP';
        // })
        data = obj.devices
      }


      // OPTmode undefined chaking for all devices
      /* let otpModeDevices = obj.devices.filter(res => {
        return res.opMode == undefined;
      })

      if (otpModeDevices.length == data.length) {
        let element = data[0];
        this.editDevice(obj, element.deviceId, element.opMode);

      } */

      if (data.length > 0) {
        data = obj.devices.filter(res => {
          // return res.opMode === 'RG' || 'WAP' || 'ONT/RG';
          return res.opMode === 'RG';
        })
        data.forEach(element => {
          if (element.opMode !== undefined) {
            if (element.opMode == "RG") {
              let deviceID = element._id;
              if (element.registrationId) {
                deviceID = element.registrationId
              }
              else {
                deviceID = element.serialNumber
              }
              this.editDevice(obj, deviceID, element.opMode);
              return;
            }
            else {
              if (element.opMode == "WAP") {
                let deviceID = element._id;
                if (element.registrationId) {
                  deviceID = element.registrationId
                }
                else {
                  deviceID = element.serialNumber
                }
                this.editDevice(obj, deviceID, element.opMode);
                return;
              }
            }
          }
        });

      }



      // this.editDevice(obj, data[0]._id, data[0].opMode);
    }
    //this.getCount();
  }

  newRedraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  getScopes() {
    let isntSubscriber = false;
    let scopes = this.ssoAuthService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      const scopeCheck: any = {};
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.mgmt') !== -1) {
            scopeCheck.showSubscriberMngmnt = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.operations') !== -1) {
            scopeCheck.showOperations = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.reports') !== -1) {
            scopeCheck.showReports = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.csc.netops.config') !== -1) {
            scopeCheck.showConfiguration = true;
            continue;
          }
        }
      }

      if (scopeCheck.showSubscriberMngmnt || scopeCheck.showOperations || scopeCheck.showReports || scopeCheck.showConfiguration) {
        if (scopeCheck.showSubscriberMngmnt) { }
        else if (scopeCheck.showReports) { isntSubscriber = true; this.router.navigate(["./support/netops-management/reports"]); }
        else if (scopeCheck.showOperations) { isntSubscriber = true; this.router.navigate(["./support/netops-management/operations"]); }
        else if (scopeCheck.showConfiguration) { isntSubscriber = true; this.router.navigate(["./support/netops-management/configuration"]); }
      }

      scopes['cloud.rbac.csc.netops.mgmt.subscribers'] = scopes['cloud.rbac.csc.netops.mgmt.subscribers'] ? scopes['cloud.rbac.csc.netops.mgmt.subscribers'] : [];
      scopes['cloud.rbac.csc.netops.mgmt.devices'] = scopes['cloud.rbac.csc.netops.mgmt.devices'] ? scopes['cloud.rbac.csc.netops.mgmt.devices'] : [];

      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt.subscribers'] && scopes['cloud.rbac.csc.netops.mgmt.subscribers'].indexOf('write') !== -1)) {
        this.hasWriteAccessForSubscriber = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt.devices'] && scopes['cloud.rbac.csc.netops.mgmt.devices'].indexOf('write') !== -1)) {
        this.hasWriteAccessForDevice = true;
      }
      if (scopes && (scopes['cloud.rbac.csc.netops.mgmt.devices_delete'] && scopes['cloud.rbac.csc.netops.mgmt.devices_delete'].indexOf('write') !== -1)) {
        this.hasWriteAccessForDeviceDelete = true;
      }
    } else {
      this.hasWriteAccessForSubscriber = true;
      this.hasWriteAccessForDevice = true;
      this.hasWriteAccessForDeviceDelete = true;
    }

    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || this.tabEvent?.searchText || this.tabEvent?.subscriberId;
      if (this.searchText || this.searchText == "") {
        setTimeout(() => { this.redraw() }, 1000)
      }
    });

    return isntSubscriber;
  }

  searchByCharacters(event) {
    $(".asso-search-dropdown").hide();
    const textEntered: string = $(event.target).val().toString();
    if (textEntered.length < 2) return;
    this.accountSearchResult = [];
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    this.searchSubscriber = this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
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
    $(".asso-search-dropdown").hide();
    if (subscriberId?.name && subscriberId?.subscriberLocationId) {
      this.formGrouping(subscriberId);
      this.unassociatedSubscriber = subscriberId;
    }
  }
  closeSearch() {
    $(".asso-search-dropdown").hide();
  }
  performSearch() {
    this.subscribeService.updateClickStatus(this.searchText)
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    $(".search-dropdown").hide();
    $("#paramsPassed").text($("#supportSearchId")?.val()?.toString());
    this.router.navigate(['/support/subscriber/search']);
  }
  onSearch: any;
  prevSearchText: string = '';
  search(term: string, event?: any) {

    if (this.onSearch) clearTimeout(this.onSearch);//to clear previous search..

    if (event && (event?.key === "Backspace" || event?.key === "Enter") && term == "" && this.prevSearchText == "") return;

    if (term.length < 2) {//Empty/less then 2 values search API..
      this.keupEnter();
      this.prevSearchText = term;
      return;
    };
    this.prevSearchText = term;
    this.onSearch = setTimeout(() => {
      this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.searchSubscription = this.service.performSearch(this.orgId, term, 0, 0).subscribe((res: SearchListModel) => {
          this.overallfilterCount = res.metadata.totalHits;
          this.filterCount = res.metadata.totalHits;
          if (this.filterCount > 10000) {
            this.first10kvalue = true;
            this.filterCount = 10000;
            res.metadata.totalHits = 10000;
          } else {
            this.filterCount = res.metadata.totalHits;
          }
          this.showResult = true;
          this.showFilterCount = true;
          dtInstance?.search(term).draw();
        }, error => {
          this.loader = false;
          this.searchResult.records = [];
          dtInstance?.draw();
        })
      });
    }, 500)

  }
  keupEnter() {
    this.searchText = this.searchText ? this.searchText : '';
    this.tempSearchText = this.searchText;
    if (this.onSearch) clearTimeout(this.onSearch);//to clear previous search..

    if (this.searchText.length == 0 || this.searchText.length < 2) {
      this.showFilterCount = false;
      let timer = (this.searchText.length > 0 && this.searchText.length < 2) ? 500 : 0;

      this.onSearch = setTimeout(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.service.performSearch(this.orgId, this.searchText, 0, 0).subscribe((res: SearchListModel) => {
            this.overallfilterCount = res.metadata.totalHits;
            this.filterCount = res.metadata.totalHits;
            this.count = res.metadata.totalHits;
            if (this.filterCount > 10000) {
              this.first10kvalue = true;
              this.filterCount = 10000;
              res.metadata.totalHits = 10000;
            } else {
              this.filterCount = res.metadata.totalHits;
            }
            this.showResult = true;
            dtInstance.draw();
          }, error => {
            this.loader = false;
            this.showResult = false;
          }
          )
        });
      }, timer);

    }

  }
  redraw() {
    if (this.searchText && this.searchText.length < 2) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    } else {
      this.search(this.searchText);
    }
  }
  formGrouping(input) {
    this.createSubscriber = this.formBuilder.group({
      account: [input.account || ''],
      subscriberLocationId: [input.subscriberLocationId || '', Validators.required],
      hubbLocationId: [input.hubbLocationId || ''],
      fccSubscriberId: [input.fccSubscriberId || ''],
      name: [input.name || '', Validators.required],
      serviceAddress: [input.serviceAddress || ''],
      phone: [input.phone || '', Validators.pattern('^[^A-z]+$')],
      //email: [input.email || '', Validators.pattern("^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-zA-Z]{2,4}$")],
      email: [input.email || '', Validators.pattern("^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-zA-Z]{2,}$")],
    }, { validators: this.validateSimilarValue });
  }

  validateSimilarValue(control: AbstractControl): ValidationErrors | null {
    if (control && control.get("fccSubscriberId").value && control.get("account").value) {
      const fccSubscriberId = control.get("fccSubscriberId").value;
      const account = control.get("account").value;
      return (account === fccSubscriberId) ? { sameValue: true } : null
    }
    return null;
  }

  hubbFormGroup(input, subId) {
    this.createHubb = this.formBuilder.group({
      hubbId: [input.hubbLocationId || '', Validators.required],
      fccSubscriberId: [input.fccSubscriberId || '', Validators.required],
      subscriberId: [subId || ''],
    });
  }

  getCount() {


    this.showResult = false;
    this.service.performSearch(this.orgId, '', 0, 0).subscribe((res: SearchListModel) => {
      this.filteredOverallCount = res.metadata.totalHits;
      //   if (this.count > 10000) {
      //     this.first10kvalue = true;
      //     this.count = 10000;
      //     res.metadata.totalHits = 10000;
      // } else {
      //   this.count = res.metadata.totalHits;
      // }
      this.showResult = true;
      //this.getCount();
    }, error => {
      this.loader = false;
    })
  }

  get modalForm() { return this.createSubscriber.controls; }

  loadSubscriberMetadata(searchText = "") {


    this.showResult = false;
    this.service.performSearch(this.orgId, searchText, 0, 0).subscribe((res: SearchListModel) => {
      this.filteredOverallCount = this.count = res.metadata.totalHits;
      if (this.count > 10000) {
        this.first10kvalue = true;
        this.count = 10000;
        res.metadata.totalHits = 10000;
      } else {
        this.count = res.metadata.totalHits;
      }
      this.showResult = true;
      this.loadSubscriberData(searchText, true);
    }, error => {
      this.loader = false;
    })
  }

  loadSubscriberData(searchText = "", onEditSub = false) {
    this.loader = true;
    let tempSearchText = "";
    let recursion = 0;

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.loader = true;

        if (this.searchText == undefined) {
          tempSearchText = searchText
        }
        else {
          tempSearchText = this.searchText;
        }
        let pageNo = null;
        if (dataTablesParameters.start == 0) {
          pageNo = 0;
        } else {
          pageNo = dataTablesParameters.start / dataTablesParameters.length;
        }
        // pageNo = 174
        const params = new HttpParams()
          // .set("orgId", this.orgId)
          //.set("filter", this.searchText || "")
          .set("filter", tempSearchText)
          .set("pageNumber", pageNo + 1)
          .set("pageSize", dataTablesParameters.length)
        if (this.ssoAuthService.getOrg(this.orgId)) {
          params.set("orgId", this.orgId)
        }
        that.http.get(`${environment.SUPPORT_URL}${getSubscribeList}`, { params }).subscribe((resp: SearchListModel) => {
          this.loader = false;
          // this.searchText="";
          //do sort
          let records = [];
          recursion = 1;
          let apiRecords: any = resp?.records;
          this.overallfilterCount = resp?.metadata?.totalHits;
          if (resp?.metadata?.totalHits > 10000) {
            this.first10kvalue = true
          } else {
            this.first10kvalue = false
          }
          // this.dtPageNo = pageNo;
          this.showExcessError = pageNo >= 999 ? true : false
          if (apiRecords) {
            apiRecords.forEach((element: any) => {
              let devices = element?.devices;
              let tmpDevices = [];
              if (devices) {
                devices.forEach((ele: any) => {
                  if (ele?.opMode === 'RG' && devices[0] && devices[0].opMode !== 'RG') {
                    tmpDevices.unshift(ele);
                  } else {
                    tmpDevices.push(ele);
                  }
                });

                element.devices = tmpDevices;
              }

              records.push(element);

            });
          }

          //to fix CCL-35753
          const order = {
            'ONT': 1,
            'RG': 2,
            'Managed ONT': 3,
            'WAP': 4,
            'WAP-IGMP': 4
          }
          if (resp?.records.length) {
            for (let i = 0; i < resp.records.length; i++) {
              if (resp?.records[i]?.devices) {
                resp.records[i].devices = resp.records[i].devices.sort((a, b) => {
                  let opmodeA = a['ont'] ? 'ONT' : a?.opMode ? a?.opMode : '';
                  let opmodeB = b['ont'] ? 'ONT' : b?.opMode ? b?.opMode : '';
                  return (order[opmodeA] ? order[opmodeA] : 0) - (order[opmodeB] ? order[opmodeB] : 0);
                });
              }
            }
          }
          // fix-end CCL-35753
          resp.records = records;
          // for (let i = 0; i < resp.records.length; i++) {
          //   resp.records[i].devices.filter(obj => obj._id).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
          // }
          that.searchResult = resp;
          // console.log("records", that.searchResult);

          callback({
            recordsTotal: this.count,
            recordsFiltered: (this.filterCount != undefined) ? this.filterCount : that.count,
            data: []
          });
        }, error => {
          this.loader = false;
          this.isError = true;
          this.warningMessage = this.ssoAuthService.pageErrorHandle(error);
          this.searchResult.records = [];
          callback({
            recordsTotal: this.count,
            recordsFiltered: 0,
            data: []
          });
        })
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      }
    };

    setTimeout(() => {
      if (recursion <= 0 && this.tempSearchText) {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: false,
          ordering: false,
          dom: "tip",
          responsive: true,
        };
        this.loadSubscriberMetadata(searchText);
        // this.tempSearchText = '';
      };
    }, 1500);
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
    const searchError = '<p class="f-s-14px b-600 mb-0">' + this.language.searchError + '</p>';
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    // const filtered = `${this.first10kvalue ? dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
    //   (isFrench ?
    //     `(filtrées à partir des ${nf.format(this.overallfilterCount)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(this.overallfilterCount)} entradas)` :
    //       isGermen ? `(gefiltert aus ${nf.format(this.overallfilterCount)} Einträgen)` :
    //         `(filtered from ${nf.format(this.overallfilterCount)} total entries)`) :
    //   '' : ''}`;
    const filtered = `${this.filteredOverallCount > 10000 && this.filteredOverallCount > 0 ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(this.filteredOverallCount)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(this.filteredOverallCount)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(this.filteredOverallCount)} Einträgen)` :
            `(filtered from ${nf.format(this.filteredOverallCount)} total entries)`) :
      ''}`;
    const excessError = `${this.showExcessError ? searchError : ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered} ${excessError}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered} ${excessError}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered} ${excessError}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${this.first10kvalue ? this.language.first : ''} ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered} ${excessError}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
    if (this.searchResult.records.length <= 0) {
      $(".dataTables_empty").text((this.searchText && this.searchResult.records.length <= 0) ? this.language['No matching records found'] : this.language['No data available in table']);
    } else {
      $(".dataTables_empty").remove();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.loader = false;
    if (err.status == 401) {
      this.warningMessage = this.language['Access Denied'];
    } else {
      this.warningMessage = this.service.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

  modelErrorHandle(err: any) {
    this.loader = false;
    if (err.status == 401) {
      this.errorMessage = this.language['Access Denied'];
    } else {
      this.errorMessage = this.ssoAuthService.pageErrorHandle(err);
    }
    this.isAddError = true;
    $("body").scrollTop(0);
  }

  hideSuccess() {
    this.showSuccess = false;
    this.editSuccess = false
    this.successMsg = '';
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    if (this.onSearch) clearTimeout(this.onSearch);//to clear previous search
    if (localStorage.getItem('Provisioning')) localStorage.removeItem('Provisioning');
  }

  showAddSubscriberModal() {
    this.deletePrompt = false;
    this.isAddError = false;
    this.submitted = false;
    this.hideSuccess();
    this.dialogService.open(this.addSubscriberModal, { size: 'lg', centered: true });
    this.hubbId = '';
    this.hubbSubId = '';
  }

  assignSubInfo(subscriberData) {
    this.hideSuccess();
    this.deletePrompt = false;
    this.isAddError = false;
    this.flag.editSubscriberName = subscriberData.name;
    this.flag.editSubscriberId = subscriberData.subscriberId;
    this.flag.editSubscriberLocationId = subscriberData.subscriberLocationId;
  }

  editSubscriberModal(subscriberData) {
    this.assignSubInfo(subscriberData);
    this.dialogService.open(this.addSubscriberModal, { size: 'lg', centered: true }).result.then((result) => { }, (reason) => {
      if (reason === ModalDismissReasons.ESC || reason === ModalDismissReasons.BACKDROP_CLICK) {
        this.closeModal();
        this.loadSubscriberMetadata(this.tempSearchText || '');
        this.tempSearchText = '';
      }
    });;
    this.fetchEditSubData(subscriberData);
    /* this.formGrouping(subscriberData);
    this.addEditHubbData(subscriberData); */
  }

  fetchEditSubData(subscriberData) {
    this.subLoader = true;
    this.service.searchBySubscriberId(subscriberData.subscriberId, this.orgId).subscribe((res: any) => {
      this.subLoader = false;
      this.formGrouping(res);
      if (this.tabEvent?.menuDelete) this.deleteSubscriberHaveCommunity(res);
    }, (err: any) => {
      this.subLoader = false;
      this.pageErrorHandle(err);
    });
  }

  closeModal(form?) {
    // this.loader = false;
    if (this.tabEvent?.menuDelete) this.tabEvent['menuDelete'] = false;
    if (form) form.reset();
    this.submitted = false;
    this.dataObj.option = 'disassociate'
    this.showDeleteBtn = false;
    this.showDeleteBtnCIQorCWX = '';
    this.selectedSubsIsCIQorCWX = '';
    this.flag.editSubscriberName = undefined;
    this.flag.editSubscriberId = undefined;
    this.flag.editSubscriberLocationId = undefined;
    this.dialogService.dismissAll();
    this.loader = false;
  }

  displayWaringMessageModel(deletePopup, subscriber, device, index) {
    this.dataObj.deleteDeviceWarning = false;
    this.showDeleteBtn = false;
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    this.deleteDeviceId = device.deviceId;
    this.isModalError = false;
    this.dataObj.deleteDeviceSubscriberId = subscriber.subscriberId;
    this.dataObj.deleteDeviceDeviceId = device.deviceId;
    this.dataObj.deleteDeviceSerial = device.serialNumber;
    this.dataObj.index = index
    this.dataObj.subscriber = subscriber
    // this.dialogService.open(deleteWarning, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
    // }, (reason) => {

    // });
    this.service.getSubscriberInfo(this.orgId, subscriber.subscriberId).then((res: any) => {
      let selectedDevice = (res?.devices?.filter(obj => obj.serialNumber == device.serialNumber)[0]?.opMode == 'RG');
      this.selectedSubsIsCIQorCWX = (res?.commandIQ?.referrer == 'SMBIQ' && res?.commandIQ?.email && selectedDevice) ? 'SMBIQ' :
        (((res?.commandIQ?.referrer == 'CIQ' && res?.commandIQ?.email) || res?.commandIQ?.email) && selectedDevice) ? 'CIQ' : '';
    }).catch(err => {
      this.loader = false;
      this.pageErrorHandle(err);
    })
    this.dialogService.open(deletePopup, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
    }, (reason) => {

    });

  }

  getSubscriberInfo(subscriberId) {
    this.searchResult.records.forEach(record => {
      if (record.subscriberId === subscriberId) {
        const RGDevices = (record?.devices || []).filter(device => device.opMode == "RG");
        if (RGDevices.length > 1) {
          record.devices = [
            RGDevices[0],
            ...(record?.devices || []).filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
          ];
        }
        sessionStorage.setItem(
          `${this.ssoAuthService.getTabId()}calix.deviceData`, JSON.stringify(record.devices))
      }
      // if (record?.devices.length == 0) {

      //   this.showProvisionRecord = false
      // }

    })
    sessionStorage.setItem(`${this.ssoAuthService.getTabId()}calix.subscriberId`, subscriberId);
    this.service.setSubscriberInfo(undefined);
    this.service.setSubscriberTabInfoData(undefined);

    //this.router.navigate(['/support/overview'], { state: { searchText: this.searchText || '' } });
    this.router.navigate(['/support/overview']);
  }
  subsData = {}
  editSuccess = false
  addSubscriber(isAddFlow = true, ngtest?) {
    this.tabEvent = {};
    this.submitted = true;
    Object.keys(this.createSubscriber.controls).forEach((key) => this.createSubscriber.get(key).setValue(this.createSubscriber.get(key).value.trim()));
    if (this.createSubscriber.valid) {
      this.loader = true;
      this.createdSubscriberName = this.createSubscriber.value.name;
      if (this.createSubscriber.value.name.trim() !== '' && this.createSubscriber.value.subscriberLocationId.trim() !== '') {
        if (this.flag.editSubscriberId) {
          this.subLoader = true;
          this.managementService.editSubscriber(this.orgId, this.flag.editSubscriberId, this.createSubscriber.value).subscribe(
            res => {
              this.subLoader = false;
              //this.uploadHubbData();
              this.afterSubscriberUpdate();
              this.loadSubscriberMetadata(this.tempSearchText || '')
              /* setTimeout(() => {
                this.editSuccess = true;
                this.successMsg = this.language['Click here to add a system.']
                this.loader = false;
                (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
              }, 3000)
              this.closeModal(this.createSubscriber); */
              if (!ngtest) this.CommonFunctionsService.trackPendoEvents('NetOps', 'Subscriber info is updated');

            },
            (err) => { this.loader = false; this.subLoader = false; this.modelErrorHandle(err); }
          );
        } else {
          this.dataObj.isHubbEdit = false;
          this.subLoader = true;
          this.managementService.addSubscriber(this.orgId, this.createSubscriber.value).subscribe(
            (res: any) => {
              this.subLoader = false;
              let result = res;
              this.subsData = res
              if (isAddFlow) {
                //this.uploadHubbData();
                this.afterSubscriberUpdate();
              } else {
                this.loader = false;
                const deviceData = $("#associateDeviceDataId").attr("device");
                res.devices = deviceData && deviceData.length ? JSON.parse(deviceData) : [];
                this.closeModal(this.createSubscriber);
                this.router.navigate(
                  ['/support/netops-management/subscriber-wizard'],
                  { state: { subscriberData: res, isNewRecord: true, isUnassociateSubscriber: true } }
                );
              }
              if (!ngtest) this.CommonFunctionsService.trackPendoEvents('NetOps', 'new subscriber that is manually created');
            },
            (err) => { this.subLoader = false; this.modelErrorHandle(err); }
          );
        }
      } else {
        this.errorMessage = this.language['Please Enter all required fields']
        this.isAddError = true;
        this.subLoader = false;
        this.loader = false;
      }

      // this.closeModal(this.createSubscriber);
    }
  }

  deleteSubscriber() {
    sessionStorage.setItem(`calix.deviceData`, JSON.stringify([]));
    sessionStorage.setItem(`calix.subscriberId`, '');
    this.service.setSubscriberInfo(undefined);
    this.service.setSubscriberTabInfoData(undefined);
    this.service.multipleRegInstance = undefined;
    this.deletePrompt = false;
    this.loader = true;
    this.managementService.deleteSubscriber(this.orgId, this.flag.editSubscriberId).subscribe(
      (res) => {
        // let searchText = "";
        // if (this.tabEvent?.isMenuSub) {
        //   const obj = this.tabEvent?.menuSub;
        //   this.searchText = `subscriberid:${obj._id}`
        // }

        //this.deleteHubbData();
        setTimeout(() => {
          this.loader = false;
          (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
        }, 3000);
      },
      (err) => { this.loader = false; this.pageErrorHandle(err); }
    );
    this.closeModal(this.createSubscriber)
  }

  showDeleteBtn = false
  getDeleteOption(event) {
    this.dataObj.deleteDeviceWarning = false
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    if (event.target.value === 'delete') {
      this.showDeleteBtn = true;
      this.showDeleteBtnCIQorCWX = '';
    }
    else if (event.target.value === 'deleteCIQ' || event.target.value === 'deleteCommandWx') {
      this.showDeleteBtnCIQorCWX = event.target.value;
      this.showDeleteBtn = false;
    }
    else {
      this.showDeleteBtn = false;
      this.showDeleteBtnCIQorCWX = '';
    }
    this.dataObj.option = event.target.value
  }

  removeDevice() {

    //if(this.dataObj.option === 'delete'){
    this.loader = true;
    this.managementService.deleteDevice(this.orgId, this.dataObj.deleteDeviceSubscriberId, this.dataObj.deleteDeviceDeviceId).subscribe(
      (res) => {
        setTimeout(() => {
          this.loader = false;
          (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
        }, 2000);
      },
      (err) => { this.loader = false; this.pageErrorHandle(err); }
    );
    this.closeModal(this.createSubscriber);
    /* }
    else {
      this.dataObj.subscriber.devices.splice(this.dataObj.index,1)
      let deviceList = this.dataObj.subscriber.devices.map(e=>e.deviceId).join(",")
      this.managementService.updateDevice(this.orgId,this.dataObj.deleteDeviceSubscriberId,this.dataObj.deleteDeviceDeviceId).subscribe(
        (res) => { setTimeout(() => { this.redraw() }, 1000) },
        (err) => { this.pageErrorHandle(err); }
      )
      this.closeModal(this.createSubscriber);
    }  */
  }

  associateSubscriber(modal, devices) {
    this.submitted = false;
    this.unassociatedSubscriber = {};
    $(".asso-search-dropdown").hide();
    this.dialogService.open(modal, { size: 'lg', centered: true });
    $("#associateDeviceDataId").attr("device", JSON.stringify((devices && devices.length) ? [devices[0]] : []));
    this.formGrouping({});
  }

  addDevice(subscriber, isUnassociateSubscriber = false) {
    if (!Object.keys(subscriber).length && isUnassociateSubscriber) {
      this.addSubscriber(false);
      //this.modelErrorHandle({"message" : "Please select a subscriber"});
      return;
    }
    //if (isUnassociateSubscriber && !this.createSubscriber.valid) return;
    if (isUnassociateSubscriber) {
      this.submitted = true;
      if (!this.createSubscriber.valid) return;
    }
    // if (!this.createSubscriber.valid) return;
    // this.closeModal();
    const deviceData = $("#associateDeviceDataId").attr("device");
    subscriber.devices = deviceData && JSON.parse(deviceData).length ? JSON.parse(deviceData) : [];
    this.closeModal();
    this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: subscriber, isNewRecord: true, isUnassociateSubscriber: isUnassociateSubscriber, searchText: this.searchText || '', isProvision: this.isProvision } });
  }

  editDevice(deviceInfo: any, deviceId, opModeWithOnt = '') {
    sessionStorage.setItem('selectedSubDeviceId', deviceId);
    sessionStorage.setItem('selectedSubDeviceopModeWithOnt', opModeWithOnt);
    this.managementService.getDeviceInfo(this.orgId, deviceId).subscribe(
      (res) => {
        //fix CCL-26671
        if (res) {
          this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: res, searchText: this.searchText || '', isProvision: this.isProvision } });

        } else {
          this.service.getDeviceInfo(deviceId).subscribe((json: any) => {
            let prObj = {
              "wifi": {},
              // "orgId": this.orgId,
              "opMode": (json && json.opMode) ? json.opMode : '',
              "deviceId": deviceId,
              "modelName": (json && json.modelName) ? json.modelName : '',
              "subscriberId": deviceInfo.subscriberId,
              "opModeWithOnt": opModeWithOnt,
              "staticGroupMember": []
            };
            this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: prObj, searchText: this.searchText || '', isProvision: this.isProvision } });
          }, (err: any) => {
            let prObj = {
              "wifi": {},
              // "orgId": this.orgId,
              "opMode": "",
              "deviceId": deviceId,
              "modelName": "",
              "subscriberId": deviceInfo.subscriberId,
              "opModeWithOnt": opModeWithOnt,
              "staticGroupMember": []
            };
            this.router.navigate(['/support/netops-management/subscriber-wizard'], { state: { subscriberData: deviceInfo, isNewRecord: false, editDeviceObj: prObj, searchText: this.searchText || '', isProvision: this.isProvision } });
          });
        }

      },
      (err) => { this.pageErrorHandle(err); }
    );
  }

  unassociateDelete(data) {
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
    this.deleteServicesAssociateWithSbscrbrMsg = '';
    this.showDeleteBtn = false;
    this.deleteDeviceId = data.deviceId;
    if (data.serialNumber) {
      this.dataObj.unassociatedDeviceSerial = data.serialNumber || "";
    } else {
      this.dataObj.systemId = (data.systemId) ? data.systemId : (data.deviceId) ? data.deviceId : "";
    }
    this.dialogService.open(this.deviceDelete, { size: 'lg', centered: true });
  }

  deleteUnassociated() {
    this.dialogService.dismissAll();
    this.loader = true;
    let id = "";
    if (this.dataObj.systemId) {
      id = this.dataObj.systemId
    } else {
      id = this.dataObj.unassociatedDeviceSerial
    }
    this.managementService.deleteUnassociated(this.orgId, id).subscribe(
      (res) => {
        setTimeout(() => {
          this.loader = false;
          (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
        }, 3000);
      },
      (err) => { this.loader = false; this.pageErrorHandle(err); }
    );
  }
  cancelModel() {
    this.dialogService.dismissAll();
    this.loader = false;
    this.showDeleteBtnCIQorCWX = '';
    this.selectedSubsIsCIQorCWX = '';
  }

  replaceDeviceBtn = false;
  replaceDevice(subscriberId, oldDeviceId) {
    if (!this.replaceDeviceId.trim()) {
      this.pageModalErrorHandle(this.language['Please enter Registered ID/FSAN/MAC Address /SN']);
      return;
    }
    //this.isReplaceModelNumberReadonly = false;
    this.replaceDeviceBtn = true;
    this.modalLoader = true;
    const newDeviceId = this.replaceDeviceId.trim();
    // this.managementService.getDeviceInfo(this.orgId, oldDeviceId).subscribe(
    //   (prDadata: any) => {
    //     if (typeof prDadata === 'object' && Object.keys(prDadata).length) {
    //       prDadata['deviceId'] = newDeviceId;
    //     }

    //     const addDeviceObj: any = {
    //       isNeedAssociateDeviceToSubscriber: this.tabEvent?.isNewRecord,
    //       subscriber: {
    //         _id: this.cloneSubscriberData.subscriberId,
    //         account: this.cloneSubscriberData.account,
    //         subscriberLocationId: this.cloneSubscriberData.subscriberLocationId,
    //         name: this.cloneSubscriberData.name,
    //         serviceAddress: this.cloneSubscriberData.serviceAddress,
    //         phone: this.cloneSubscriberData.phone,
    //         email: this.cloneSubscriberData.email
    //       },
    //       deviceId: newDeviceId,
    //       provisioningRecord: prDadata
    //     }

    //     this.service.performSearch(this.orgId, newDeviceId, 1, 1).subscribe(
    //       (res: any) => {
    //         if (res?.records && res.records[0]?.devices && res.records[0]?.subscriberId) {
    //           this.modalLoader = false;
    //           this.replaceDeviceBtn = false;
    //           this.pageModalErrorHandle("The new device selected is already associated with a different subscriber.");
    //           return;
    //         } else {
    //           this.managementService.replaceDevice(this.orgId, subscriberId, oldDeviceId, newDeviceId, addDeviceObj).subscribe(
    //             (res) => {
    //               setTimeout(() => {
    //                 this.modalLoader = false;
    //                 this.replaceDeviceBtn = false;
    //                 $(document.elementFromPoint(0, 0)).trigger('click');
    //                 (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
    //               }, 3000);
    //             },
    //             (err) => {
    //               this.modalLoader = false;
    //               this.replaceDeviceBtn = false;
    //               this.pageModalErrorHandle(err);
    //             }
    //           );
    //           //this.modalLoader = false;

    //         }
    //       },
    //       err => {
    //         this.replaceDeviceBtn = false;
    //         this.modalLoader = false;
    //         this.pageModalErrorHandle(err);
    //       }
    //     );
    //   },
    //   (err) => {
    //     this.replaceDeviceBtn = false;
    //     this.pageErrorHandle(err);
    //   }
    // );
    this.doPerformReplaceDevice(subscriberId, oldDeviceId, newDeviceId);
  }

  doPerformReplaceDevice(subscriberId, oldDeviceId, newDeviceId, skipSSID?) {
    const system = {
      "oldSystemId": oldDeviceId,
      "newSystemId": newDeviceId
    }
    this.service.performSearch(this.orgId, newDeviceId, 1, 1).subscribe(
      (res: any) => {
        if (res?.records && res.records[0]?.devices && res.records[0]?.subscriberId && res.records[0]?.devices?.deviceId == newDeviceId) {
          this.modalLoader = false;
          this.replaceDeviceBtn = false;
          this.pageModalErrorHandle(this.language['The new device selected is already associated with a different subscriber.']);
          return;
        } else {
          /**
           * to fix the CCL-27011, change new device FSAN to Uppercase
           */
          let params = {
            orgId: this.orgId,
            newDeviceId: (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(newDeviceId) ? newDeviceId : newDeviceId.toUpperCase(),
            modelName: this.replaceModelNumber,
            opMode: this.deviceMode,
            type: (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(newDeviceId) ? 'MAC Address' : 'FSAN'
          };
          this.foundationService.updateNewSystem(this.orgId, system, skipSSID).subscribe(
            (res) => {
              setTimeout(() => {
                this.modalLoader = false;
                this.replaceDeviceBtn = false;
                this.successInfo = 'Old system replaced by New system successfully';
                $(document.elementFromPoint(0, 0)).trigger('click');
                (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
              }, 3000);
            },
            (err) => {
              this.modalLoader = false;
              this.replaceDeviceBtn = false;
              if (err.status === 400 && [err["errorCode"], err?.error?.errorCode].includes("FAILED_RELOAD_SSID")) {
                this.dialogService.open(this.replaceConfirm, { windowClass: 'custom-warning-modal clx-custom-modal', size: 'lg', centered: true });
              } else {
                this.pageModalErrorHandle(err);
              }
            }
          );
          //this.modalLoader = false;

        }
      },
      err => {
        this.replaceDeviceBtn = false;
        this.modalLoader = false;
        this.pageModalErrorHandle(err);
      }
    );
  }

  cloneSubscriberData: any;
  showReplaceModelNumber = false;
  assignDeviceReplace(deviceId, subscriberId, device, data?: any) {
    this.isModalError = false;
    this.modalWarningMessage = '';
    this.replaceModelNumber = '';
    this.deviceMode = '';
    this.replaceDeviceId = '';
    this.isReplaceModelNumberReadonly = false;
    this.showReplaceModelNumber = false;
    $('.replaceDeviceField').val('');
    this.dataObj.replaceDeviceId = deviceId;
    this.dataObj.replaceDeviceSubId = subscriberId;
    this.cloneSubscriberData = data;
  }

  pageModalErrorHandle(err: any, showError = true) {
    if (err.status === 401) {
      this.modalWarningMessage = this.language['Access Denied'];
    } else if ((!err.status || !err.error) && typeof err == 'string') {
      this.modalWarningMessage = err;
    } else {
      this.modalWarningMessage = this.ssoAuthService.pageErrorHandle(err);
    }
    if (showError) this.isModalError = true;
    return this.modalWarningMessage;
  }

  unassociateAndDelete() {
    this.modalLoader = true;

    // this.service.performSearch(this.orgId, this.dataObj.deleteDeviceDeviceId, 1, 1).subscribe(
    //   (res: any) => {
    //     if (res?.records && !res.records.length) {

    //     } else {
    //       this.modalLoader = false; this.pageModalErrorHandle("Device already exist");
    //     }
    //   },
    //   err => { this.modalLoader = false; this.pageModalErrorHandle(err); }
    // );


    // return;

    let params: any = {
      orgId: this.orgId,
      subscriberId: this.dataObj.deleteDeviceSubscriberId,
      deviceId: this.deleteDeviceId
    };
    if (this.dataObj.deleteDeviceSerial) {
      params['serialNumber'] = this.dataObj.deleteDeviceSerial;
    }

    this.managementService.unassociateAndDelete(
      this.orgId, this.dataObj.deleteDeviceDeviceId, this.dataObj.deleteDeviceSubscriberId, this.deleteDeviceId, params
    ).subscribe(
      (res) => {
        setTimeout(() => {
          this.modalLoader = false;
          this.dialogService.dismissAll();
          (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
        }, 5000);
      },
      (err) => { this.modalLoader = false; this.pageModalErrorHandle(err); })
  }

  unassoDeleteWthFoundationApi(device?) {
    this.modalLoader = true;
    this.loader = true;
    let deleteWithEmail = (device && device !== '');
    this.managementService.unassoDeleteFounApi(this.orgId, this.deleteDeviceId, deleteWithEmail).subscribe(
      (res) => {
        setTimeout(() => {
          this.modalLoader = false;
          this.loader = false;
          (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
          this.dialogService.dismissAll();
        }, 3000);
      },
      (err) => { this.modalLoader = false; this.pageModalErrorHandle(err); })
  }

  replaceDeviceId = '';
  replaceModelNumber = '';
  deviceMode = '';
  isReplaceModelNumberReadonly = false;

  disableRadioInputs() {
    $('input[name="deviceMode"]').prop("disabled", true);
  }

  enaableRadioInputs() {
    $('input[name="deviceMode"]').prop("disabled", true);
  }
  onchangeReplaceDevice() {
    this.enaableRadioInputs();
    if (this.replaceDeviceId && this.replaceDeviceId.trim()) {
      this.showReplaceModelNumber = true;
      this.replaceModelNumber = '';
      this.deviceMode = '';
      this.isReplaceModelNumberReadonly = false;


      this.service.getDeviceInfo(this.replaceDeviceId.trim()).subscribe((res: any) => {
        if (res) {
          this.replaceModelNumber = res.modelName;
          //this.onModeRadioBtnDisplay(this.replaceModelNumber);
          this.getFeatureProperties(this.replaceModelNumber);
          this.deviceMode = res.opMode;
          this.isReplaceModelNumberReadonly = true;

          setTimeout(() => {
            this.disableRadioInputs();
          }, 1000);
        }
      }, error => {
        //this.loader = false;

        this.service.performSearch(this.orgId, this.replaceDeviceId, 1, 1).subscribe((res: SearchListModel) => {
          if (res && res.records && res.records[0]?.devices && res.records[0]?.devices[0]?.modelName) {
            this.replaceModelNumber = res.records[0]?.devices[0]?.modelName;
            this.deviceMode = res.records[0]?.devices[0]?.opMode;
            //this.onModeRadioBtnDisplay(this.replaceModelNumber);
            this.getFeatureProperties(this.replaceModelNumber);
            this.isReplaceModelNumberReadonly = true;
            setTimeout(() => {
              this.disableRadioInputs();
            }, 1000);
          }
        }, error => {
          this.loader = false;
        })
      })
    }
  }

  deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  deleteServicesAssociateWithSbscrbrMsg = '';

  confirmDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = `
      ${this.language['warning_message_subscriber_mng']}
      ${this.orgData?.factoryResetOnDelete === true ? `<br/>${this.language['checkRestoreorResetInSystem']}` : ''}
      <br/><br/>${this.language['sys_del']}
    `
  }

  closeDeleteDeviceAndServicesAssociateWithSbscrbrMsg() {
    this.deleteDeviceAndServicesAssociateWithSbscrbrMsg = '';
  }

  confirmDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = `Warning:
    ${this.language['system_Del_assoc']}
  <br/>

   ${this.language['Do you want to proceed with the dissociate device?']}`
  }

  closeDeleteServicesAssociateWithSbscrbrMsg() {
    this.deleteServicesAssociateWithSbscrbrMsg = '';
  }

  onModelChange(event): void {
    if (event) {
      this.deviceMode = undefined;
      //this.onModeRadioBtnDisplay(event, true);

      this.getFeatureProperties(event, true);

    } else {
      this.isRgBtnShow = false;
      this.isMangeBtnShow = false;
      this.isWapBtnShow = false;
    }
  }

  showMode = false;
  isRgBtnShow: boolean = false;
  isWapBtnShow: boolean = false;
  isMangeBtnShow: boolean = false;
  isModemBtnShow: boolean = false;

  readonly rgBtnArray: Array<any> = DEVICE_RG_MODEL_COLLECTIONS;
  readonly wapBtnArray: Array<string> = DEVICE_WEP_MODEL_COLLECTIONS
  readonly manageBtnArray: Array<string> = DEVICE_MANAGE_MODEL_COLLECTIONS;
  readonly modemBtnArray: Array<string> = DEVICE_MODAM_MODEL_COLLECTIONS;

  onModeRadioBtnDisplay(selectedModel: string, eventChange = false) {
    this.deviceMode = eventChange ? undefined : this.deviceMode;
    this.isRgBtnShow = this.rgBtnArray.indexOf(selectedModel) !== -1;
    this.isWapBtnShow = this.wapBtnArray.indexOf(selectedModel) !== -1;
    this.isMangeBtnShow = this.manageBtnArray.indexOf(selectedModel) !== -1;
    this.isModemBtnShow = this.modemBtnArray.indexOf(selectedModel) !== -1;
    if (this.isRgBtnShow) {
      this.deviceMode = !this.deviceMode ? 'RG' : this.deviceMode;

    }
    if (this.deviceMode !== 'RG') {
      this.deviceMode = this.isWapBtnShow ? 'WAP' : this.isModemBtnShow ? 'Modem' : this.isMangeBtnShow ? 'Managed ONT' : 'RG';
    }

  }

  fpLoader = false;
  getFeatureProperties(modelName: any, eventChange = false) {
    this.fpLoader = true;

    this.http.get(`${environment.CALIX_URL}support/device/feature-properties?${this.ssoAuthService.getOrg(this.orgId)}modelName=${encodeURIComponent(modelName)}`).subscribe((json: any) => {

      if (json && json.properties) {
        let obj = {};

        if (this.findObjByKeyValue('SSID1', json.properties)) {
          obj['2DOT4GHZ_PRIMARY'] = true;

        }

        if (this.findObjByKeyValue('SSID2', json.properties)) {
          obj['2DOT4GHZ_GUEST'] = true;

        }

        if (this.findObjByKeyValue('SSID9', json.properties)) {
          obj['5GHZ_PRIMARY'] = true;

        }

        if (this.findObjByKeyValue('SSID10', json.properties)) {
          obj['5GHZ_GUEST'] = true;

        }

        let opmodes = {};

        let opmodesObj = this.findObjByKeyValue('OpModeOptions', json.properties);

        if (opmodesObj && opmodesObj['configuration']) {
          if (opmodesObj['configuration'].RG) {
            opmodes['RG'] = true;
          }

          if (opmodesObj['configuration'].WAP) {
            opmodes['WAP'] = true;
          }

          if (opmodesObj['configuration']['Managed ONT']) {
            opmodes['Managed ONT'] = true;
          }

          if (opmodesObj['configuration']['WAP-IGMP']) {
            opmodes['WAP-IGMP'] = true;
          }

          if (opmodesObj['configuration']['Modem']) {
            opmodes['Modem'] = true;
          }

        }

        this.onModeRadioBtnDisplayNew(opmodes, modelName, eventChange);


      }

      this.fpLoader = false;


    }, (err: any) => {
      //this.pageErrorHandle(err);

      this.onModeRadioBtnDisplayNew({}, modelName, eventChange);
      this.fpLoader = false;
    });
  }

  onModeRadioBtnDisplayNew(opmodes, selectedModel, eventChange = false) {
    this.deviceMode = eventChange ? undefined : this.deviceMode;
    this.isRgBtnShow = opmodes['RG'] ? true : false;
    this.isWapBtnShow = (opmodes['WAP'] || opmodes['WAP-IGMP']) ? true : false;
    this.isMangeBtnShow = opmodes['Managed ONT'] ? true : false;
    this.isModemBtnShow = (opmodes['Modem'] || this.modemBtnArray.indexOf(selectedModel) !== -1);
    if (this.isRgBtnShow) {
      this.deviceMode = !this.deviceMode ? 'RG' : this.deviceMode;

    }
    if (this.deviceMode !== 'RG') {
      this.deviceMode = this.isWapBtnShow ? 'WAP' : this.isModemBtnShow ? 'Modem' : this.isMangeBtnShow ? 'Managed ONT' : 'RG';
    }

  }

  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] && myArray[i]['featureName'] === value) {
        return myArray[i];
      }
    }
    return false;
  }

  deviceModels = [];
  getDeviceModels() {
    let params = { orgId: this.ssoAuthService.getOrgId() }
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${JSON.stringify(params)}`).subscribe((json: any) => {

      let obj = {};
      if (json) {
        json.forEach((element: any) => {
          if (element && element.modelName) {
            obj[element['modelName'].trim()] = true;
          }
        });

        this.deviceModels = Object.keys(obj);
        this.managementService.setDeviceModels(this.ssoAuthService.getOrg(this.orgId), this.deviceModels);
      }
    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }

  addEditHubbData(subscriberData) {
    /* this.hubbId = '';
    this.hubbSubId = ''; */
    $('#hubbId').val('');
    $('#hubbSubscriberId').val('');
    this.subLoader = true;
    this.service.getHubbData(subscriberData.subscriberId).subscribe((res: any) => {
      this.subLoader = false;
      res = res && Object.keys(res) ? res : {};
      this.dataObj.isHubbEdit = Object.keys(res).length > 0;
      //this.dialogService.open(this.hubbIDModel, { size: 'lg', centered: true });
      //this.hubbFormGroup(res, subscriberData.subscriberId);
      /* this.hubbId = res.hubbLocationId || '';
      this.hubbSubId = res.fccSubscriberId || ''; */
      $('#hubbId').val(res.hubbLocationId || '');
      $('#hubbSubscriberId').val(res.fccSubscriberId || '');
    }, (err: any) => {
      this.subLoader = false;
      if (err.status == 404) {
        this.dataObj.isHubbEdit = false;
        //this.dialogService.open(this.hubbIDModel, { size: 'lg', centered: true });
        //this.hubbFormGroup({}, subscriberData.subscriberId);
        /* this.hubbId = '';
        this.hubbSubId = ''; */
        $('#hubbId').val('');
        $('#hubbSubscriberId').val('');
      } else {
        this.pageErrorHandle(err);
      }
    });
  }

  uploadHubbData() {
    const obj = {
      // "orgId": this.orgId,
      "subscriberId": this.flag.editSubscriberId || (Object.keys(this.subsData).length ? this.subsData['_id'] : ''),
      "hubbLocationId": this.hubbId,
      "fccSubscriberId": this.hubbSubId
    }
    const serviceCall = this.dataObj.isHubbEdit
      ? this.service.updateHubbData(this.flag.editSubscriberId, obj)
      : this.service.createHubbData(obj);

    this.subLoader = true;
    serviceCall.subscribe((res: any) => {
      this.subLoader = false;
      this.afterSubscriberUpdate();
      //this.dialogService.dismissAll();
    }, (err: any) => {
      this.subLoader = false;
      this.modelErrorHandle(err);
    });

  }

  deleteHubbData() {
    this.subLoader = true;
    this.service.deleteHubbData(this.flag.editSubscriberId).subscribe((res: any) => {
      this.subLoader = false;
      this.dialogService.dismissAll();
    }, (err: any) => {
      this.subLoader = false;
      this.pageErrorHandle(err);
    });
  }

  modelClose() {
    this.dialogService.dismissAll();
  }

  afterSubscriberUpdate() {
    const isEdit = this.flag.editSubscriberId;
    setTimeout(() => {
      isEdit ? (this.editSuccess = true) : (this.showSuccess = true);
      this.successMsg = this.language['Click here to add a system.']
      this.loader = false;
      if (this.tabEvent?.isMenuSub) {
        const obj = this.tabEvent?.menuSub;
        // this.searchText = `subscriberid:${obj._id}`
        // setTimeout(() => { this.searchText = '' }, 2000);

        let searchText = `subscriberid:${obj._id}`
        this.search(searchText);
      }
      else (this.searchText && this.searchText.length > 2) ? this.search(this.searchText) : this.keupEnter();
    }, 3000)
    this.closeModal(this.createSubscriber);
  }

  getDeleteAndFactoryResetData() {
    this.service.getDeleteAndFactoryreset(this.orgId).subscribe((res: any) => {
      this.orgData = res ? res : [];
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
    })
  }

  notONT(data) {
    return data.subscriberId ? true : (data.devices || []).filter(device => !(device?.ont && !device?._id)).length;
  }
  notONT1(data) {
    return data.hasOwnProperty("ont");
  }

  isValidOntModel(device) {
    if (device.opModeWithOnt == "ONT") {
      return true;
    }
    return false;
  }

  deleteSubscriberHaveCommunity(subscriberData?) {
    this.subLoader = true;
    // let selectedDevice = this.searchResult.records.filter(res=>this.flag.editSubscriberId == res.subscriberId)[0];
    // device = (selectedDevice.devices.length > 0) ? true : false;
    if (!subscriberData) {
      this.service.searchBySubscriberId(this.flag.editSubscriberId, this.orgId).subscribe((res: any) => {
        this.CheckCommunityById(res);
      })
    } else {
      this.CheckCommunityById(subscriberData);
    }
  }
  // HasDevice = false;
  CheckCommunityById(subscriber?) {
    // if(subscriber?.devices?.length){
    this.foundationService.deleteCommunitySubscriber(this.orgId, this.flag.editSubscriberId).subscribe((res: any) => {
      if (res?.communities?.length) {
        this.service.deleteWarningSubscriber(this.orgId, this.flag.editSubscriberId).subscribe((res: any) => {
          // if(subscriber?.devices?.length) this.HasDevice = true;
          this.deletePromptForCommunity = true;
          this.hasServify = true;
          this.subLoader = false;
        }, err => {
          // if(subscriber?.devices?.length) this.HasDevice = true;
          this.subLoader = false;
          this.hasServify = false;
          this.deletePromptForCommunity = true;
        });
      } else if (res?.enable == false) {
        this.deleteSubscriberConfirmBox();
      }
    }, (err) => {
      this.subLoader = false;
      this.deleteSubscriberConfirmBox();
    })
    // }else{
    //   this.deleteSubscriberConfirmBox();
    // }
  }

  deleteSubscriberConfirmBox() {
    this.subLoader = true;
    this.hasServify = false;

    this.service.deleteWarningSubscriber(this.orgId, this.flag.editSubscriberId).subscribe((res: any) => {
      this.deletePrompt = true;
      this.hasServify = true;
      this.subLoader = false;
    }, err => {
      this.subLoader = false;
      this.hasServify = false;
      this.deletePrompt = true;
    });
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  removeLocaldata() {
    this.tabEvent = {};
    if (localStorage.getItem('Provisioning')) localStorage.removeItem('Provisioning');
  }
}
