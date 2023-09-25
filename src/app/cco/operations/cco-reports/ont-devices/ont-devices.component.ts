import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from './../../../../../app-services/translate.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { Subject, Observable, forkJoin, combineLatest, of } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { catchError } from 'rxjs/operators';

import * as $ from 'jquery';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import * as jquery from 'jquery';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ont-devices',
  templateUrl: './ont-devices.component.html',
  styleUrls: ['./ont-devices.component.scss']
})
export class OntDevicesComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('deleteSuccessModal', { static: true }) private deleteSuccessModal: TemplateRef<any>;
  isDev: boolean = false;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  deleteId = '';
  tableCounts;
  closeModal: string;

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
  //   }
  // };
  dtInstance: Promise<DataTables.Api>;
  frTable: any;
  esTable: DataTables.LanguageSettings;
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

  types: any = [];
  typeSelected: string = 'DISCOVERED_DEVICE';
  showTable = false;

  regionsSubject: any;
  locationsSubject: any;
  regionsDataArray = ["All"];
  regionSelected = '';
  locationSelected = '';
  locationDataArray = ["All"];
  systemSelected: any;
  systemsSubject: any;
  systemDataArray = ["All"];








  timePeriodSelected = 'first';
  firstPresentTimeStart: any;
  firstPresentTimeEnd: any;
  lastPresentTimeStart: any;
  lastPresentTimeEnd: any;
  maxForStartDate: any = new Date();


  firstDiscoverd: Date[];
  lastDiscoverd: Date[];
  hasScopeAccess = false;
  name = '';
  condition: boolean = false;
  exportquery: string;
  exportparams: { reportType: string; tenant: number; region: string; location: string; system: any; firstPresentTimeStart: any; firstPresentTimeEnd: any; lastPresentTimeStart: any; lastPresentTimeEnd: any; fsanMac: string; };
  exportError: boolean;
  fsanvalid: boolean;
  fmmaxlength: number = 17;
  RegionName: any;
  LocationName: any;
  SystemName: any;
  is_DEVICE_NEVER_CHECKED_IN: boolean = false;
  sortBy = undefined;
  sortType = undefined;

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
    private dialogService: NgbModal,
    private route: ActivatedRoute,
    private sso: SsoAuthService,
    private issueService: IssueService,
    private exportExcelService: ExportExcelService,
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
    this.esTable = this.translateService.es;
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
        this.count = 0;
        this.list = [];
        this.getCount();
      }, 100);
      this.titleService.setTitle(`${this.language['ONT Systems']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
  }



  languageSubject;
  language: any;
  ngOnInit(): void {


    //this.ccoCommonService.listen('listsystemData').subscribe((data) => 
    //this.GetallDatas(data));

    this.exportEventSubs = this.ccoCommonService.ccoPageExport.subscribe(data => {
      if (data && data == 'network-system-table-list') {
        this.export();
      }
    });
    this.titleService.setTitle(`${this.language['ONT Systems']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    this.types = [
      {
        name: 'All Systems',
        value: 'DISCOVERED_DEVICE'
      },
      {
        name: 'Systems Not Checked In',
        value: 'DEVICE_NOT_CHECKED_IN'
      },
      {
        name: 'Systems Checked In',
        value: 'DEVICE_CHECKED_IN'
      },
      {
        name: 'System Never Checked In',
        value: 'DEVICE_NEVER_CHECKED_IN'
      },
    ];

    // let date = new Date();
    // this.firstPresentTimeStart = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
    // this.lastPresentTimeStart = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.operations.report.ontdevices') !== -1) {
            this.hasScopeAccess = true;
            break;
          }

        }
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }


    this.getRegions();

    this.getCount();

  }
  changeMAc() {
    if (this.name.length == 0 ||
      (this.name.length == 12 && !this.name.includes(":")) ||
      (this.name.length == 17 && !this.validateMAc())) this.fsanvalid = false;
    if (this.name.length > 0) {
      this.condition = true;
      this.regionSelected = 'All';
      this.locationSelected = "All";
      this.systemSelected = "All";
    }

    else {
      this.condition = false;
      this.fsanvalid = false;
    }
    if (this.name.includes(":") || this.name.length == 0)
      this.fmmaxlength = 17
    else
      this.fmmaxlength = 12
  }
  textselected() {
    this.fmmaxlength = 17
  }
  fsanvalidated($event) {
    if (this.name.includes(":"))
      return true;

    let flength = this.name?.length
    if (flength != 0 && flength < 12) {
      this.fsanvalid = true; return true;
    }
    else { this.fsanvalid = false; return false }
  }
  validateMAc() {
    const maskCharRegExp = /^[x|X]$/;
    const maskPairRegExp = /^[x|X]{2}$/;
    let isValid = false;

    if (!this.name.includes(":"))
      return true;

    if (this.name.length !== 17) {
      this.fsanvalid = true;
      return true;
    }

    let macPairs = this.name.split(":");
    isValid = false;
    if (macPairs.length !== 6) {
      this.fsanvalid = true;
      return true;
    }

    let startMask = false;
    for (let j = 0; j < 6; j++) {
      let curPair = macPairs[j];
      if (curPair.length !== 2) {
        isValid = true;
        break;
      }
      if (startMask) {
        if (!maskCharRegExp.test(curPair[1])) {
          isValid = true;
          break;
        }
      } else {
        let temp = parseInt(curPair, 16);
        if (isNaN(temp)) {
          if (maskPairRegExp.test(curPair)) {
            startMask = true;
          } else {
            isValid = true;
            break;
          }
        } else {
          if (maskCharRegExp.test(curPair[1])) {
            isValid = true;
            break;
          }
        }
      }
    }
    if (isValid) this.fsanvalid = true;
    else this.fsanvalid = false;
    return isValid;
  }

  getRegions() {
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.regionsSubject = this.http.get(`${environment.API_BASE_URL}nfa/regions?tenant=0`)
      .subscribe((res: any) => {
        let counts = {};
        res.forEach((x) => {
          counts[x.name] = (counts[x.name] || 0) + 1;
        });
        res.forEach((element, index) => {
          if (counts[element['name']] > 1) {
            element.name = element.name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")"
          }
        });
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        this.regionsDataArray = [...this.regionsDataArray, ...res];
      }, (error) => {
      })
  }

  getLocations() {
    this.locationSelected = "All";
    this.systemSelected = "All";
    let id = this.regionSelected
    if (this.regionSelected && this.regionSelected != 'All') {
      this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0&region=${id}`)
        .subscribe((res: any) => {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          this.locationDataArray = ["All"]
          this.locationDataArray = [...this.locationDataArray, ...res];
        }, (error) => {
        })
    }
    if (this.regionSelected == 'All') {
      this.locationDataArray = ["All"];
      this.systemDataArray = ["All"];
    }
    // this.regionsDataArray.forEach((element: any) => {
    //   if (element.id == this.regionSelected) {
    //     this.RegionName = element.name;
    //   }
    // })
  }
  loadSystemValue(event: any) {
    //this.clickedLocation = '';
    let regionid = this.regionSelected;
    let locationid = this.locationSelected;
    this.systemSelected = "All"
    if (this.locationSelected && this.regionSelected && this.locationSelected != 'All') {
      this.systemsSubject = this.issueService.getSystems(regionid, locationid)
        .subscribe((res: any) => {
          res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
          this.systemDataArray = ["All"];
          this.systemDataArray = [...this.systemDataArray, ...res];
        }, (error) => {
        })
    }
    // this.locationDataArray.forEach((element: any) => {
    //   if (element.id == this.locationSelected) {
    //     this.locationName = element.name;
    //   }
    // })

    if (this.locationSelected == 'All') {
      //this.locationName = null;
      // this.systemName = null;
      this.systemDataArray = ["All"];
    }
  }



  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    }
    else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  renderTable(rerender?) {
    //this.tableLanguageOptions();
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
  }

  closeAllModal() {
    this.modalService.dismissAll();
  }

  goToSystemDetails(stateparams: { SN: any }) {

    this.router.navigate(['../system-details' + '/' + stateparams.SN], { relativeTo: this.route });
  }


  getListNew(): any {
    this.loading = true;
    this.dtOptions = {
      paging: false,
      lengthChange: false,
      searching: false,
      ordering: false
    };

    const requests: any = {};

    let types = ['ONU'];


    types.forEach(type => {
      const req = this.http.get(`${environment.API_BASE_URL}cnap/invmgr/devices?type=${type}`).pipe(
        catchError(err => of(err.status)),
      );

      requests[type] = req;

    });

    this.listObs = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;
      this.list = json['ONU'];
      this.loading = false;
      if (this.isRerender) {
        this.rerender();
        this.isRerender = false;
      } else {
        this.dtTrigger.next();
        setTimeout(() => {
          this.dataAvailable = true;
        }, 200);
      }
    }, err => {
      this.pageErrorHandle(err);
      this.dataAvailable = true;
    })
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

  closeAlert() {
    this.error = false;
    this.success = false;
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
  }

  deleteName = '';
  delete(id, name) {
    this.deleteId = id;
    this.deleteName = name;

    if (this.modalRef) {
      this.close();
    }

    this.modalRef = this.dialogService.open(this.deleteModal);

  }

  close(): void {
    this.modalRef.close();
  }

  doDelete() {
    this.http.delete(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.deleteId}`).subscribe((json: any) => {
      this.close();
      this.modalRef = this.dialogService.open(this.deleteSuccessModal);
      this.deleteId = '';
      this.isRerender = true;
      this.getListNew();

    }, (err: any) => {
      this.close();
      this.pageErrorHandle(err);
    });
  }

  gotoEdit(id: any) {
    this.router.navigate([`cco/system/cco-network-system/edit/${id}`]);
  }

  refresh(id) {
    this.http.get(`${environment.API_BASE_URL}cnap/invmgr/devices/${id}`).subscribe((item: any) => {
      $(`#name-${id}`).html(`${item.onuId ? item.onuId : ''}`);
      $(`#macAddress-${id}`).html(`${item.macAddress ? item.macAddress : ''}`);
      $(`#deviceModel-${id}`).html(`${item.deviceModel ? item.deviceModel : ''}`);
      $(`#swVersion-${id}`).html(`${item.swVersion ? item.swVersion : ''}`);
      $(`#serialNumber-${id}`).html(`${item.serialNumber ? item.serialNumber : ''}`);
      $(`#communicationState-${id}`).html(`${(item.protocolInfos && item.protocolInfos[0] && item.protocolInfos[0].communicationState) ?
        item.protocolInfos[0].communicationState : ''}`);
      $(`#cmSyncFunction-${id}`).html(`${(item.cmSyncFunction && item.cmSyncFunction['syncStatus']) ? item.cmSyncFunction['syncStatus'] : ''}`);
      $(`#fmSyncFunction-${id}`).html(`${(item.fmSyncFunction && item.fmSyncFunction['syncStatus']) ? item.fmSyncFunction['syncStatus'] : ''}`);

    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }


  count: any = 0;
  initLoad = false;


  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }


  getCount() {
    if (this.fsanvalidated('') && this.validateMAc()) return;


    this.loading = true;
    this.exportError = false;
    this.initLoad = false;
    this.showTable = false;
    //console.log(this.dateUtilsService.getUtCMilliSecByDateObj(this.firstPresentTimeStart));

    if (this.firstDiscoverd) {
      this.firstPresentTimeStart = this.firstDiscoverd[0] ? this.firstDiscoverd[0] : undefined;
      this.firstPresentTimeEnd = this.firstDiscoverd[1] ? this.firstDiscoverd[1] : new Date();
    }

    if (this.lastDiscoverd) {
      this.lastPresentTimeStart = this.lastDiscoverd[0] ? this.lastDiscoverd[0] : undefined;
      this.lastPresentTimeEnd = this.lastDiscoverd[1] ? this.lastDiscoverd[1] : new Date();
    }

    if (this.typeSelected == 'DEVICE_NEVER_CHECKED_IN') {
      this.is_DEVICE_NEVER_CHECKED_IN = true;
    }
    else
      this.is_DEVICE_NEVER_CHECKED_IN = false;



    let params = {
      reportType: this.typeSelected,
      tenant: 0,
      region: this.regionSelected !== 'All' && !this.name ? this.regionSelected : undefined,
      location: this.locationSelected !== 'All' && !this.name ? this.locationSelected : undefined,
      system: this.systemSelected !== 'All' && !this.name ? this.systemSelected : undefined,
      firstPresentTimeStart: this.firstPresentTimeStart ? this.dateUtilsService.getUtCMilliSecByDateObj(this.firstPresentTimeStart) : undefined,
      firstPresentTimeEnd: this.firstPresentTimeEnd ? this.dateUtilsService.getUtCMilliSecByDateObj(this.firstPresentTimeEnd, true) : undefined,
      lastPresentTimeStart: this.lastPresentTimeStart ? this.dateUtilsService.getUtCMilliSecByDateObj(this.lastPresentTimeStart) : undefined,
      lastPresentTimeEnd: this.lastPresentTimeEnd ? this.dateUtilsService.getUtCMilliSecByDateObj(this.lastPresentTimeEnd, true) : undefined,
      fsanMac: this.name ? this.name : undefined
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }


      query += key + "=" + encodeURIComponent(params[key]);

    }

    this.http.get(`${environment.API_BASE_URL}nfa/onts/count?${query}`).subscribe((json: any) => {
      this.showTable = true;
      if (json && typeof json.count !== undefined) {
        this.count = json.count;

        if (this.initLoad) {
          this.redraw();
        } else {
          this.getList();
        }
      } else {
        this.loading = false;
      }
    }, (err: any) => {
      this.loading = false;
      this.pageErrorHandle(err);
    })
  }


  getList() {
    let params = {
      reportType: this.typeSelected,
      tenant: 0,
      region: this.regionSelected !== 'All' && !this.name ? this.regionSelected : undefined,
      location: this.locationSelected !== 'All' && !this.name ? this.locationSelected : undefined,
      system: this.systemSelected !== 'All' && !this.name ? this.systemSelected : undefined,
      firstPresentTimeStart: this.firstPresentTimeStart ? this.dateUtilsService.getUtCMilliSecByDateObj(this.firstPresentTimeStart) : undefined,
      firstPresentTimeEnd: this.firstPresentTimeEnd ? this.dateUtilsService.getUtCMilliSecByDateObj(this.firstPresentTimeEnd, true) : undefined,
      lastPresentTimeStart: this.lastPresentTimeStart ? this.dateUtilsService.getUtCMilliSecByDateObj(this.lastPresentTimeStart) : undefined,
      lastPresentTimeEnd: this.lastPresentTimeEnd ? this.dateUtilsService.getUtCMilliSecByDateObj(this.lastPresentTimeEnd, true) : undefined,
      fsanMac: this.name ? this.name : undefined
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }


      query += key + "=" + encodeURIComponent(params[key]);

    }
    this.exportquery = query; this.exportparams = params;

    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      //responsive: true,
      serverSide: true,
      processing: false,
      searching: false,
      ordering: true,
      order : [],
      //scrollX: true,
      // dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {

        let url = `${environment.API_BASE_URL}nfa/onts?offset=${dataTablesParameters.start}&limit=${dataTablesParameters.length}&${query}`;

        this.sortBy = dataTablesParameters.order && dataTablesParameters.order.length > 0 ?dataTablesParameters.order[0]?.column : undefined;
        this.sortType = dataTablesParameters.order && dataTablesParameters.order.length > 0? dataTablesParameters.order[0]?.dir : undefined;

        let orderBy = parseInt(this.sortBy) == 0 ? 'onuid' : parseInt(this.sortBy) == 1 ? 'fsan' : parseInt(this.sortBy) == 2 ? 'model' : parseInt(this.sortBy) == 3 ? 'registrationid' : parseInt(this.sortBy) == 4 ? 'discoveredPonPort' : parseInt(this.sortBy) == 5 ? 'onumacaddr' : parseInt(this.sortBy) == 6 ? 'currversion' : parseInt(this.sortBy) == 7 ? 'isrogue' : parseInt(this.sortBy) == 8 ? 'region' : parseInt(this.sortBy) == 9 ? 'devicename' : parseInt(this.sortBy) == 10 ? 'firstpresenttime' : parseInt(this.sortBy) == 11 ? 'lastpresenttime' : undefined;

        if(orderBy){
          url += `&sortBy=${orderBy}&sortOrder=${this.sortType}`;
        }

        that.http
          .get(url)
          .subscribe((resp: any) => {
            this.loading = false;
            if (resp && resp['ontDevices'] && resp['ontDevices'].length) {
              if (params['fsanMac']) {
                this.count = 1;
              }
              this.list = resp['ontDevices']
              for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].vendorId == null) {
                  this.list[i].vendorId = this.list[i].discoveredVendorId;
                }
              }
            } else {
              this.list = [];
              if (params['fsanMac']) {
                this.count = 0;
              }
            }

            this.initLoad = true;

            this.loading = false;
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.count ? this.count : 0,
              data: []
            });
          }, (err: any) => {
            this.loading = false;
            this.list = [];
            this.exportError = true;
            this.pageErrorHandle(err);
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
      }, drawCallback: (settings) => {
        // this.changeTableStatusLanguage(settings);
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
    this.Regionname(this.regionSelected);
    this.locationName(this.locationSelected);
    this.systemName(this.systemSelected);
  }


  clearFilter() {
    this.typeSelected = 'DISCOVERED_DEVICE';
    this.regionSelected = 'All';
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    // let date = new Date();
    // this.firstPresentTimeStart = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));
    // this.lastPresentTimeStart = new Date(date.getTime() - (10 * 24 * 60 * 60 * 1000));

    this.firstPresentTimeStart = undefined;
    this.firstPresentTimeEnd = undefined;
    this.lastPresentTimeEnd = undefined;
    this.lastPresentTimeStart = undefined;

    this.firstDiscoverd = undefined;
    this.lastDiscoverd = undefined;

    this.name = "";
    this.condition = false;
    this.exportError = false;
    this.getCount();

  }


  getExportData(exportid) {
    let totalexport = {}; var offset = 0;
    if (this.count == 0) {
      this.Download([], exportid)
      return;
    }
    for (var i = 0; i < Math.ceil(this.count / 500); i++) {
      let url = `${environment.API_BASE_URL}nfa/onts?offset=${offset}&limit=500&${this.exportquery}`
      totalexport[i] = this.http.get(url)
      offset += 500;
    }
    forkJoin(totalexport).subscribe(res1 => {
      let keys = Object.keys(totalexport);
      let totaleportvalue = [];
      keys.map(arrayVal => {
        let value = []
        value = res1[arrayVal]["ontDevices"]
        totaleportvalue.push(...value)
      })
      this.Download(totaleportvalue, exportid)
    }, (err: any) => {
      this.exportError = true;
      this.pageErrorHandle(err);
    })
    // let url = `${environment.API_BASE_URL}nfa/onts?offset=0&limit=${this.count}&${this.exportquery}`;
    // this.http.get(url).subscribe((resp: any) => {
    //   console.log(resp);
    //   this.Download(resp["ontDevices"], exportid)
    // })
  }
  Download(data1, exportid) {
    let timezoneName = 'UTC';
    let pipe = new DatePipe('en-US');
    let extraData = `${this.language['ONT Systems Report']} \r\n${this.language.type} : ${this.reportType(this.exportparams['reportType'])}\r\n${this.language.region} : ${this.exportparams['region'] ? this.RegionName : 'All'}\r\n${this.language.location} : ${this.exportparams['location'] ? this.LocationName : 'All'}\r\n${this.language.System} : ${this.exportparams['system'] ? this.SystemName : 'All'}\r\n${this.language.FSAN}/${this.language.MAC_Address} : ${this.exportparams['fsanMac'] ? this.exportparams['fsanMac'] : ""}\r\n${this.language['First discovered']} : ${this.exportparams['firstPresentTimeStart'] ? this.startISODate(this.exportparams['firstPresentTimeStart'], false) : ""} - ${this.exportparams['firstPresentTimeEnd'] ? this.startISODate(this.exportparams['firstPresentTimeEnd'], false) : ""}\r\n${this.language['Last discovered']} : ${this.exportparams['lastPresentTimeStart'] ? this.startISODate(this.exportparams['lastPresentTimeStart'], false) : ""} - ${this.exportparams['lastPresentTimeEnd'] ? this.startISODate(this.exportparams['lastPresentTimeEnd'], false) : ""}\r\n\r\n`;

    $(exportid).addClass('spinnershow');
    let data = this.chartDataFraming(data1);
    let type_name;
    this.types.some(type => {
      if (type.value === this.exportparams['reportType'])
        type_name = type.name;
    })
    let name = 'ONT_Systems_' + this.typeSelected;
    let fname = this.generateDownloadName(this.language['ONT Systems'] + " (" + this.language[type_name] + ")");
    if (data1) {
      setTimeout(() => {
        $(exportid).removeClass('spinnershow');
      }, 1000);
    }
    this.exportExcelService.downLoadCSV(fname, data, extraData);
  }
  Regionname(id) {
    this.RegionName = 'All';
    this.regionsDataArray.forEach((element: any) => {
      if (element.id == this.regionSelected) {
        this.RegionName = element.name;
      }
    })
  }
  locationName(id) {
    this.LocationName = 'All';
    this.locationDataArray.forEach((element: any) => {
      if (element.id == this.locationSelected) {
        this.LocationName = element.name;
      }
    })
  }
  systemName(id) {
    this.SystemName = 'All';
    this.systemDataArray.forEach((element: any) => {
      if (element.uuid == this.systemSelected) {
        this.SystemName = element.name;
      }
    })
  }
  reportType(type) {
    switch (type) {
      case 'DISCOVERED_DEVICE': return this.language['All Systems'];
      case 'DEVICE_NOT_CHECKED_IN': return this.language['Systems Not Checked In'];
      case 'DEVICE_CHECKED_IN': return this.language['Systems Checked In'];
      case 'DEVICE_NEVER_CHECKED_IN': return this.language['System Never Checked In'];
    }
  }
  chartDataFraming(data1) {
    let resultArray = [];
    for (var i = 0; i < data1?.length; i++) {
      resultArray.push(
        {
          [this.language['ONU ID']]: data1[i].ontId ? data1[i].ontId : "",
          // [this.language['Vendor ID']]: data1[i]?.vendorId ? data1[i]?.vendorId : data1[i]?.discoveredVendorId ? data1[i]?.discoveredVendorId : "",
          // [this.language['Serial Number']]: data1[i].discoveredSerialNumber ? data1[i].discoveredSerialNumber : "",
          [this.language['FSAN']]: data1[i].fsan ? data1[i].fsan : "",
          [this.language['model']]: data1[i].discoveredModel ? data1[i].discoveredModel : "",
          [this.language['Registration_ID']]: data1[i].discoveredRegistrationId ? data1[i].discoveredRegistrationId : "",
          [this.language['Interface']]: data1[i].discoveredPonPort ? `"  "${data1[i].discoveredPonPort}` : "",
          [this.language['ONU Mac Address']]: data1[i].discoveredMacAddress ? data1[i].discoveredMacAddress : "",
          [this.language['Version']]: data1[i].discoveredVersion ? data1[i].discoveredVersion : "",
          [this.language['IsQuarantined']]: data1[i].isRogue ? "Yes" : "No",
          [this.language['Region']]: data1[i].region ? data1[i].region : "",
          [this.language['Location']]: data1[i].location ? data1[i].location : "",
          [this.language['System']]: data1[i].oltName ? data1[i].oltName : "",
          [this.language['First discovered']]: data1[i].firstPresentTime ? this.convertToDateTime(data1[i].firstPresentTime) : "",
          [this.language['Last discovered']]: data1[i].lastPresentTime ? this.convertToDateTime(data1[i].lastPresentTime) : "",
        }
      )
    }
    return resultArray
  }
  generateDownloadName(chartName: string) {
    let splitName = chartName.split(" ");
    let joinName = splitName.join('_');
    let time = new Date().getTime();
    let name = '';
    let date = this.formatTodayDate() ? this.formatTodayDate() : '';
    name += joinName; //+ '-' + date + '-' + time;
    return name;
  }
  formatTodayDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  startISODate(startDate: any, enddata: boolean) {
    if (startDate == undefined)
      return undefined;
    let date = new Date(startDate);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let stdate;

    if (enddata)
      stdate = `${year}-${month}-${day}T23:59:00Z`;
    else
      stdate = `${year}-${month}-${day}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}Z`;
    // let d = new Date(stdate)
    // return d.getTime();
    return stdate;
  }

  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.trim(),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es')
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
      filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
        (isFrench ?
          `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
          `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
        ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    )
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? "Último" : 'Last');
  }




  @ViewChild('calendar') public calendar: any;
  onSelect() {
    if (this.calendar.overlayVisible == false) {

      if (this.firstDiscoverd) {
        this.firstDiscoverd[1] = this.firstDiscoverd[1] ? this.firstDiscoverd[1] : new Date();
        this.firstDiscoverd = [this.firstDiscoverd[0], this.firstDiscoverd[1]];
      } else if (!this.firstDiscoverd) {
        this.firstPresentTimeStart = undefined;
        this.firstPresentTimeEnd = undefined;
        this.firstDiscoverd = undefined;
      }

      if (this.lastDiscoverd) {
        this.lastDiscoverd[1] = this.lastDiscoverd[1] ? this.lastDiscoverd[1] : new Date();
        this.lastDiscoverd = [this.lastDiscoverd[0], this.lastDiscoverd[1]]
      } else if (!this.lastDiscoverd) {
        this.lastPresentTimeEnd = undefined;
        this.lastPresentTimeStart = undefined;
        this.lastDiscoverd = undefined;
      }
    }
  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode  //key = event.charCode;
    return ((key > 47 && key < 59) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }
  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

}
