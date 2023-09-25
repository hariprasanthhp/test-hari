import { Component, OnInit, AfterViewInit, HostListener, ViewChild, TemplateRef, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, combineLatest, forkJoin, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../../shared/services/auth.service';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { ApplicationsApiService } from '../../services/applications-api.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import _ from 'lodash';
declare var require: any;
//const MASK: any = require('netaddr');
const Addr = require('netaddr').Addr;
import { getMatch, IPMatch, IPSubnetwork, IPRange, matches } from 'ip-matching';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';
@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss']
})
export class DefinitionsComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  //@ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  @ViewChild('importGlobalInput', { static: false }) importGlobalInput: ElementRef;
  @ViewChild('importLocalInput', { static: false }) importLocalInput: ElementRef;
  @ViewChild('createDefinitionModal', { static: true }) private createDefinitionModal: TemplateRef<any>;

  language: any;
  pageAvailable: boolean = false;
  // createView: boolean = false;
  createName: string;
  createCurrentAddress: any;
  createCurrentAddressV6: any;

  createSubnetsV4: any = [];
  createSubnetsV6: any = [];

  createSubnetV4: string = '';
  createSubnetV6: string = '';
  currentTableRowCount = 0;
  createCurrentPorts: any;
  createCurrentRPorts: any;
  createAddresses: any = [];
  createPorts: any = [];
  createRPorts: any = [];
  definitionData: any = [];
  deleteData: any;
  dataAvailable: boolean = false;
  searchText = '';
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    columnDefs: [
      { targets: [0], orderable: false },
    ],
    lengthChange: false,
    searching: true,
    // retrieve: true,
    // processing: true,
    order: [6, 'desc'],
    "scrollX": true,
    stateSave: true,
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
  appProtocols: any = [];
  appProtocolSelected = 'ICMP';

  editOnValue: any;
  editData: any;

  infoTitle: string;
  infoBody: string;
  modalRef: any;
  createDefinitionModalRef: any;

  rowId: any;
  showingDeviceIp: any;

  params: {};
  private empty = {
    'Application Address IPv4': '',
    'Application Address IPv6': '',
    'Application Name': '',
    'Application Port(s)': '',
    'Ranged Port(s)': '',
  };

  add: any = {
    ports: "",
    rangePorts: "",
    name: "",
    domainName: "",
    protocol: "",
    addressesV4: "",
    addressesV6: "",
    tenantId: 0
  };

  importTableOptions: DataTables.Settings = {
     pagingType: 'full_numbers',
      pageLength: 10,
      order: [0, 'asc'],
      "scrollX": true,
      dom: 'tipr', 
  };
  tablePreview: boolean = false;

  fullLoader: boolean = true;
  isFullImport: boolean = true;

  editname: any;
  editprotocol: any;
  editaddress: string;
  editSubnet4: string = '';
  editSubnet6: string = '';
  editSubnets4: any = [];
  editSubnets6: any = [];
  editPort: string = '';
  editRPort: string = '';
  editPortList: any = [];
  editRPortList: any = [];
  editType: string;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  addressError: boolean;
  formError: boolean;
  addressV4: any;
  addressV6: any;

  ORG_ID: string;

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;

  curOrgApps: any = [];
  defOrgApps: any = [];
  sortColumn: number;

  loaded: boolean;
  translateSubscribe: any;
  frTable: any;

  isSysAdmin: boolean = true;
  tableInstance: any;
  loading: boolean = true;
  IP4s: any = [];
  IP6s: any = [];

  types: any = [];
  createTypeSelected: any;
  exportData: any[];

  previewHeaderValue;
  recreateTable;
  storageData = {};
  importTableSubs: any;
  jsonSubs: any;
  importTableData: any;
  enableImportSubmit: boolean;
  buttonVisible: boolean = true;

  listSubs: any;
  createSubs: any;
  updateSubs: any;
  deleteSubs: any;
  exportSubs: any;
  importSubs: any;
  importDpiSubs: any;
  updateDpiSubs: any;

  deleteIds = [];
  deviceIps = [];
  deleteApps = [];
  tableHidden: boolean;
  sortData = {
    column: 7,
    type: 'desc'
  }
  modifyDataInfo: any = {};
  newEditDataValue: any = '';
  private columnName = {
    addressesV4: 'Application Address IPv4',
    addressesV6: 'Application Address IPv6',
    domainName: 'Domain Name',
    name: 'Application Name',
    ports: 'Application Port(s)',
    rangePorts: 'Ranged Port(s)',
    overrideDpi: 'Ignore IPFIX App ID'
  }
  invalidImportDefinitation = [];
  createOverrideDpi = false;
  public MODULE: string;
  domainName: string = '';
  public overrideDEFswitchEnabled = false;
  public applicationsIds = [];
  public showAudit = false;
  public showDelete = false;
  public showLookUpSuccess = false;
  editDomainame:string = '';
  orgInfoSub:any;
  hideDpiAsmfeatures:boolean = true;
  editEngineId:any;
  editExtAppEnum:any;
  editExtProtocolId:any;
  editOverRideDpi:any;
  errorLookUpMsg: '';
  exportColoumnNames:any;
  lookupLoading:boolean = false;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef<HTMLInputElement>>;
  constructor(
    public apiService: ApplicationsApiService,
    // private customTranslateService: CustomTranslateService,
    private commonFunctionsService: CommonFunctionsService,
    private sso: SsoAuthService,
    private exportExcel: ExportExcelService,
    private dataTablecreatorService: DataTablecreatorService,
    private router: Router,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private titleService: Title,
    private common:common,
    public endpointManagementService: EndpointManagementService,
  ) {
    this.commonOrgService.recordView.show = false;
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.MODULE = this.sso.getRedirectModule(url);

    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.exportColoumnNames = {
      addressesV4: this.language['applicationAddressIPV4'],
      addressesV6: this.language['applicationAddressIPV6'],
      domainName: this.language['Domain_Name'],
      name: this.language['applicationname'],
      ports: this.language['applicationPorts'],
      rangePorts: this.language['rangedports'],
      overrideDpi: this.language['ignore_ipfix_app_id']
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.exportColoumnNames = {
        addressesV4: this.language['applicationAddressIPV4'],
        addressesV6: this.language['applicationAddressIPV6'],
        domainName: this.language['Domain_Name'],
        name: this.language['applicationname'],
        ports: this.language['applicationPorts'],
        rangePorts: this.language['rangedports'],
        overrideDpi: this.language['ignore_ipfix_app_id']
      }
      this.loading = true;
      this.dataAvailable = false;
      this.isRerender = true;
     // this.tableCreator('language');
      this.changeLangData();
      //this.renderTable();
      this.titleService.setTitle(`${this.language['Definitions']} - ${this.language['Applications']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
        this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.commonOrgService.closeAlert();//*Imp

    this.titleService.setTitle(`${this.language['Definitions']} - ${this.language['Applications']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);

    this.frTable = this.translateService.fr;
  }

  ngOnInit() {
    this.createCurrentAddress = '';
    this.createCurrentAddressV6 = '';
    this.createCurrentPorts = '';
    this.createCurrentRPorts = '';

    this.appProtocols = [
      'NONE', 'ICMP', 'IGMP', 'OSPF', 'RSVP', 'IGRP', 'GRE', 'ESP'
    ];
    this.removeState();
    this.getData();
    this.hideDpiAsm();
    this.tableLanguageOptions();
    this.changeLangData();
    this.checkSysAdmin();
    this.jsonSubs = this.dataTablecreatorService.jsonDataOfCSV.subscribe((res: any) => {
      this.invalidImportDefinitation = [];
      try {
        let importValidationFlag = true;
        (res || []).forEach(el => {
          this.commonFunctionsService.keysFromColumnName(el, this.exportColoumnNames)
          if (!Object.keys(el).every(key => !el[key])) {
            if (!el.name) {
              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = `${this.language['Invalid Application Name']}`;
              importValidationFlag = false;
              this.openInfoModal(false);
              return;
            } else if (el.name.length && el.name.length > 64) {
              this.invalidImportDefinitation.push(el)
              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = `${this.language['Invalid Application Name']} - Name should not exceed 64 characters.`;
              importValidationFlag = false;
              this.openInfoModal(true);
              return;
            }
          }
        });
        // this.recreateTable = res;  
        if (importValidationFlag) {
          this.compareJsonToTableData(res);
        }
      } catch (ex) {
      }
    });
    this.setStorageData();
  }

  ngAfterViewInit(): void {
    this.loaded = true;
    this.checkboxes.changes.subscribe(() => {
      this.updateSelectAllCheckbox();
    });
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) this.dtTrigger.unsubscribe();

    if (this.parallelReqSubscribtion) {
      this.parallelReqSubscribtion.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.jsonSubs) {
      this.jsonSubs.unsubscribe();
    }

    if (this.importSubs) {
      this.importSubs.unsubscribe();
    }

    if (this.importDpiSubs) {
      this.importDpiSubs.unsubscribe();
    }

    if (this.updateDpiSubs) {
      this.updateDpiSubs.unsubscribe();
    }
    if (this.orgInfoSub) {
      this.orgInfoSub.unsubscribe();
    }
    if (this.dialogService.hasOpenModals()) {
      this.dialogService.dismissAll();
    }
   // this.closeModal();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  search(term: string) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(term).draw();
    });
  }

  getData() {
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
          if (e != null && e.error != undefined) {
            this.pageErrorHandle(e);
            setTimeout(() => {
              this.renderTable();
            }, 1000);
            return;
          }
        }
      }
      this.definitionData = [];
      this.definitionData = [...this.combineApps()];
      this.dataAvailable = false;
      setTimeout(() => {
        this.renderTable();
      }, 500);
    });
  }

  renderTable() {
    this.tableCreator();
    // if (this.isRerender) {
    //   this.rerender();
    //   this.isRerender = false;
    // } else {
    //   this.dtTrigger.next();
    // }

    setTimeout(() => {
      this.resetDelete();

    }, 100);
  }

  tableCreator(type?: string) {
    let that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: '_id',
      lengthChange: true,
      searching: true,
      info: true,
      columnDefs: [
        { targets: [0], orderable: false },
      ],
      order: [that.sortData.column, that.sortData.type],
      "scrollX": true,
      stateSave: true,
      // dom:'ltipr',
      "dom": '<"top"f>rt<"bottom"ilp><"clear">',

      drawCallback: (settings) => {
        let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 7;
        let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'desc';
        that.sortData = {
          column: col,
          type: type
        };

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

    this.tableLanguageOptions();
    let extraTime = 0;
    if (this.definitionData && this.definitionData.length) {
      let l = this.definitionData.length;
      extraTime = Math.ceil(l / 100) * 100;
    }

    this.tableHidden = true;
    if (type && type == 'language') {
      // setTimeout(() => {
      setTimeout(() => {
        this.dataAvailable = true;
        this.changeHidden(extraTime);
      }, 300);
      //this.loading = false;
      //this.rerender();
      // }, 300);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        this.changeHidden(extraTime);
      }, 200);

    }
  }

  changeHidden(time) {
    time = time ? time : 0;
    if(this.definitionData.length <= 10000){
      setTimeout(() => {
        this.tableHidden = false;
        this.loading = false;
      }, 1500);
    }
    else {
      setTimeout(() => {
        this.tableHidden = false;
        this.loading = false;
      }, time);
    }

  }

  // Getting Data To The Table

  /*
  definitionloader() {
    this.apiService.DefinitionList(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        if (res.length) {
          this.definitionData = [...this.processData(res)];
        } else {
          let dummy = [{
            "_id": "123",
            "addressesV4": "1.1.1.1/20;1.1.0.1/20",
            "addressesV6": "192.168.2.2.2.1/80",
            "name": "test",
            "orgId": 50,
            "ports": "20",
            "protocol": "ICMP",
            "rangePorts": "25",
            "tenantId": 0
          }];

          //this.definitionData = [...this.processData(dummy)];
        }

        this.tableCreator();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }

        //this.exportData = this.api.exportProcess(res);
      }
    })
  }
  */



  /*  processData(res: any) {
     res.forEach(obj => {
       for (let key in obj) {
         let datasV4, datasV6 = [];
         if (obj['addressesV4'] != '' && obj['addressesV4'] != null) {
           datasV4 = [...obj['addressesV4'].split(';')];
         }
         if (obj['addressesV6'] != '' && obj['addressesV6'] != null) {
           datasV6 = [...obj['addressesV6'].split(';')];
         }
         //obj['addresses'] = this.checkNull(obj.addressesV4) + ';' + this.checkNull(obj.addressesV6);
         obj['v4s'] = datasV4.slice(0, 2);
         obj['v6s'] = datasV6.slice(0, 2);
         //obj['type'] = 'Global';
       }
     });
     return res;
   } */

  splitData(str: any) {
    let data = [];
    if (str != '' && str != null) {
      data = [...str.split(';')];
    }
    return data;
  }


  checkNull(str) {
    if (str == null) {
      return '';
    }
    return str;
  }


  hideShow(id) {
    if (this.showingDeviceIp == id) {
      this.showingDeviceIp = undefined;
    } else {
      this.showingDeviceIp = id;
    }
  }


  // For Submitting Data to the Table
  submit() {
    this.createName = this.createName ? this.createName.trim() : '';
    this.createSubnetV4 = this.createSubnetV4 ? this.createSubnetV4.trim() : '';
    this.domainName = this.domainName ? this.domainName : '';
    this.createSubnetV6 = this.createSubnetV6 ? this.createSubnetV6.trim() : '';
    this.createCurrentPorts = this.createCurrentPorts ? this.createCurrentPorts.trim() : '';
    this.createCurrentRPorts = this.createCurrentRPorts ? this.createCurrentRPorts.trim() : '';
    let ports = [];
    let rports = [];

    if (!this.createName.length) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Application Name'];
      // this.cancel();
      this.openInfoModal(false);
      return;
    } else if (this.createName.length && this.createName.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Application Name']} - Name should not exceed 64 characters.`;
      // this.cancel();
      this.openInfoModal(false);
      return;
    }

    if ((this.createSubnetV4 == '' && !this.createSubnetsV4.length) && (this.createSubnetV6 == '' && !this.createSubnetsV6.length)
      && (this.createCurrentPorts == '' && !this.createPorts.length) && (this.createCurrentRPorts == '' && !this.createRPorts.length)) {
      this.infoTitle = this.language['Invalid request'];
      this.infoBody = `${this.createName} ${this.language['has invalid address format']}`;
      // this.cancel();
      this.openInfoModal(false);
      return;
    }
    this.IP4s = this.createSubnetsV4;
    this.IP6s = this.createSubnetsV6;
    ports = this.createPorts;
    rports = this.createRPorts;

    if (this.createSubnetV4 != '') {
      if (!this.subnetValidatorIpv4(this.createSubnetV4)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `${this.createName} ${this.language['has invalid address format']} ${this.createSubnetV4}`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }
      if (this.checkSubnetIntersect('ip4', this.createSubnetsV4, this.createSubnetV4)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.createSubnetV4} intersects with other subnet in the create list`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }

      this.IP4s = [this.createSubnetV4, ...this.IP4s];
      //this.createSubnetV4 = '';
    }

    if (this.createSubnetV6 != '') {
      if (!this.subnetValidatorIpv6(this.createSubnetV6)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `${this.createName} ${this.language['has invalid address format']} ${this.createSubnetV6}`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }
      if (this.checkSubnetIntersect('ip6', this.createSubnetsV6, this.createSubnetV6)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.createSubnetV6} intersects with other subnet in the create list`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }
      this.IP6s = [this.createSubnetV6, ...this.IP6s];
    }

    if (this.createCurrentPorts != '') {
      if (!this.apiService.portValidation(this.createCurrentPorts)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `The port ${this.createCurrentPorts} format is invalid`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }
      ports = [this.createCurrentPorts.toUpperCase(), ...ports];
    }
    if (this.createCurrentRPorts != '') {
      if (!this.apiService.rPortValidation(this.createCurrentRPorts)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `The ranged port ${this.createCurrentRPorts} format is invalid`;
        // this.cancel();
        this.openInfoModal(false);
        return;
      }
      rports = [this.createCurrentRPorts.toUpperCase(), ...rports];
    }

    let params = this.add;
    params.name = this.createName ? this.createName.trim() : '';
    params.domainName = this.domainName ? this.domainName : '';
    params.addressesV4 = (this.IP4s.length != 0) ? this.IP4s.join(';').trim() : '';
    params.addressesV6 = (this.IP6s.length != 0) ? this.IP6s.join(';').trim() : '';
    params.ports = (ports.length != 0) ? ports.join(';').trim() : '';
    params.rangePorts = (rports.length != 0) ? rports.join(';').trim() : '';
    //params.protocol = (this.appProtocolSelected == 'NONE') ? null : this.appProtocolSelected;
    params.protocol = null;
    delete params._id; /* CCL-43766 */
    if (this.isSysAdmin && this.createTypeSelected == 'global') {
      params.orgId = 0;
    } else {
      params.orgId = this.ORG_ID;
    }

    params.tenantId = 0;
    params.overrideDpi = this.createOverrideDpi;
    this.loading = true;
    this.apiService.DefinitionAdd(params, params.orgId).subscribe((json: any) => {
      this.isRerender = true;
      //this.loading = false;
      this.domainName = '';
      this.showLookUpSuccess = false;
      this.cancel(true);
      this.loading = true;
      this.getData();
    }, (err: HttpErrorResponse) => {
      this.cancel(true);
      this.pageErrorHandle(err, 'add');
    });
  }

  validateInputs(): void {
    this.formError = false;
    if (this.createName == '' || this.createCurrentPorts == '' || this.createCurrentRPorts == '') {
      this.formError = true;
    }
  }

  validateAddress(ipCategory, address: string) {
    this.addressError = false;
    if (!address) {
      return true;
    }
    let ip = this.apiService.trimAddress(address);
    if (ip) {
      if (ipCategory == 'v4' && this.commonFunctionsService.isValidIpV4Addr(ip)) {
        this.addressV4 = ip;
        return true;
      } else if (ipCategory == 'v6' && this.commonFunctionsService.isValidIpV6Addr(ip)) {
        this.addressV6 = ip;
        return true;
      } else {
        this.addressError = true;
        return false;
      }
    } else {
      this.addressError = true;
      return false;
    }
  }


  // Edit Data in the Table
  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;
    this.editname = item.name;
    this.editSubnet4 = '';
    this.editSubnet6 = '';
    this.editPort = '';
    this.editRPort = '';
    this.editDomainame = item.domainName || '';
    this.editSubnets4 = this.splitData(item.addressesV4);
    this.editSubnets6 = this.splitData(item.addressesV6);
    this.editPortList = this.splitData(item.ports);
    this.editRPortList = this.splitData(item.rangePorts);
    this.editOverRideDpi = item.overrideDpi;
    this.editEngineId = item.engineId || null;
    this.editExtAppEnum = item.extAppEnum || null;
    this.editExtProtocolId = item.extProtocolId || null;
    if (this.deleteIds.indexOf(item._id) !== -1) {

      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deviceIps.splice(this.deviceIps.indexOf(item.name), 1);
      this.deleteApps = this.deleteApps.filter((el) => el._id !== item._id);

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
    //this.editprotocol = (item.protocol != null && item.protocol != '') ? item.protocol : 'NONE';
    this.hideEditDataInput();
  }

  updateSave(id: string) {
    this.editname = this.editname ? this.editname.trim() : '';
    this.editSubnet4 = this.editSubnet4.trim();
    this.editSubnet6 = this.editSubnet6.trim();
    this.editPort = this.editPort ? this.editPort.trim() : '';
    this.editRPort = this.editRPort ? this.editRPort.trim() : '';
    this.editDomainame = this.editDomainame ? this.editDomainame.trim() : '';
    this.editOverRideDpi = this.editOverRideDpi;
    this.editEngineId = this.editEngineId ||null;
    this.editExtAppEnum =  this.editExtAppEnum || null;
    this.editExtProtocolId = this.editExtAppEnum || null;
    let IP4s = [];
    let IP6s = [];
    let ports = [];
    let rports = [];

    if (!this.editname.length) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Application Name'];
      this.openInfoModal(false);
      return;
    } else if (this.editname.length && this.editname.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Application Name']} - Name should not exceed 64 characters.`;
      this.openInfoModal(false);
      return;
    }

    if ((this.editSubnet4 == '' && !this.editSubnets4.length) && (this.editSubnet6 == '' && !this.editSubnets6.length)
      && (this.editPort == '' && !this.editPortList.length) && (this.editRPort == '' && !this.editRPortList.length)) {
      this.infoTitle = this.language['Invalid request'];
      this.infoBody = `${this.editname} ${this.language['has invalid address format']}`;
      this.openInfoModal(false);
      return;
    }
    IP4s = this.editSubnets4;
    IP6s = this.editSubnets6;
    ports = this.editPortList;
    rports = this.editRPortList;

    if (this.editSubnet4 != '') {
      if (!this.subnetValidatorIpv4(this.editSubnet4)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `${this.editname} ${this.language['has invalid address format']} ${this.editSubnet4}`;
        this.openInfoModal(false);
        return;
      }
      if (this.checkSubnetIntersect('ip4', this.editSubnets4, this.editSubnet4, true)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.editSubnet4} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }
      IP4s = [this.editSubnet4, ...IP4s];
      //this.createSubnetV4 = '';
    }

    if (this.editSubnet6 != '') {
      if (!this.subnetValidatorIpv6(this.editSubnet6)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `${this.editname} ${this.language['has invalid address format']} ${this.editSubnet6}`;
        this.openInfoModal(false);
        return;
      }
      if (this.checkSubnetIntersect('ip6', this.editSubnets6, this.editSubnet6, true)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.editSubnet6} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }
      IP6s = [this.editSubnet6, ...IP6s];
    }

    if (this.editPort != '') {
      if (!this.apiService.portValidation(this.editPort)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `The port ${this.editPort} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      ports = [this.editPort.toUpperCase(), ...ports];
    }
    if (this.editRPort != '') {
      if (!this.apiService.rPortValidation(this.editRPort)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `The ranged port ${this.editRPort} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      rports = [this.editRPort.toUpperCase(), ...rports];
    }

    let params = this.add;
    params.name = this.editname ? this.editname.trim() : '';
    params.domainName = this.editDomainame ? this.editDomainame.trim() : '';
    params.addressesV4 = IP4s.length != 0 ? IP4s.join(';').trim() : '';
    params.addressesV6 = IP6s.length != 0 ? IP6s.join(';').trim() : '';
    params.ports = ports.length != 0 ? ports.join(';').trim() : '';
    params.rangePorts = rports.length != 0 ? rports.join(';').trim() : '';
    //params.protocol = (this.editprotocol == 'NONE') ? null : this.editprotocol;
    params.protocol = null;
    params['_id'] = this.editData._id;
    // if (this.isSysAdmin) {
    //   params.orgId = `0`;
    // } else {
    //   params.orgId = this.ORG_ID;
    // }
    params.orgId = this.editData.orgId;
    params.tenantId = 0;
    params.overrideDpi = this.editOverRideDpi;
    params.engineId = this.editEngineId;
    params.extAppEnum = this.editExtAppEnum;
    params.extProtocolId = this.editExtProtocolId;

    this.loading = true;
    this.apiService.DefinitionUpdate(id, params, params.orgId).subscribe(
      (res) => {
        this.isRerender = true;
        this.cancel(true);
        this.getData();
        this.editOnValue = undefined;
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, 'add');
      }
    );
  }

  updateCancel() {
    this.editOnValue = undefined;
  }

  // Delete Data from the Table
  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete application'];
    this.infoBody = `${item.name}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }
  confirmDelete() {
    let id = this.deleteData._id;
    let orgId = this.deleteData.orgId;
    this.closeModal();
    this.loading = true;
    this.apiService.DefinitionDelete(id, orgId).subscribe((res: any) => {
      this.isRerender = true;
      this.getData();
      this.closeDeleteModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  closeDeleteModal() {
    this.deleteData = undefined;
    this.closeModal();
  }


  getDeleteIds(e: any, item: any): any {
    if (e.target.checked) {

      this.deleteIds.push(item._id);
      if (item._id) {
        this.applicationsIds.push(item._id);
      }
      this.deviceIps.push(item.name);
      this.deleteApps.push(item);
      this.showDelete = true;
      this.showAudit = true;

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deviceIps.splice(this.deviceIps.indexOf(item.name), 1);
      this.deleteApps = this.deleteApps.filter((el) => el._id !== item._id);
      this.applicationsIds.splice(this.applicationsIds.indexOf(item._id), 1);

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length) {
        this.showDelete = true;
        this.showAudit = true;
        if (this.deleteIds.length != tot) {
          $('#selectDeselectAll').prop('checked', false);
          $('#selectDeselectAll-span').show();
        } else {
          $('#selectDeselectAll-span').hide();
        }
      } else {
        this.showDelete = false;
        this.showAudit = false;
        $('#selectDeselectAll').prop('checked', false);
        $('#selectDeselectAll-span').hide();
      }
    }
  }

  selectDeselectAll(isChecked) {
    this.deleteIds = [];
    this.deviceIps = [];
    this.applicationsIds = [];
    this.deleteApps = [];
    let i = 0;
    let tot = $('input[name^="delete_id_"]').length;
    var that = this;
    if (isChecked) {
      this.showAudit = true;
      this.showDelete = true;
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', true);

        var classes = $(this).attr('class').split(' ');
        let id = classes[0].substring('delete_id_'.length);
        let d = that.definitionData.filter((el) => el._id === id);
        that.deleteIds.push(id);
        that.deviceIps.push(d[0].name);
        if (d[0].name) {
          that.applicationsIds.push(d[0]._id);
        }
        that.deleteApps.push(d[0]);
        i++;
      });
    } else {
      this.showAudit = false;
      this.showDelete = false;
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.deviceIps = [];
        that.deleteApps = [];
        that.applicationsIds = [];
        i++;
      });
    }

  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.deviceIps = [];
    this.deleteApps = [];
    this.selectDeselectAll(true);
  }

  deleteAllSelected() {

    if (this.deviceIps.length) {
      this.infoTitle = this.language[this.deviceIps.length === 1 ? 'Delete selected application' : 'Delete selected applications'];
      this.infoBody = this.deviceIps.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }
  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.deleteApps.forEach(el => {
      deleteCalls.push(this.apiService.DefinitionDelete(el._id, el.orgId));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.deviceIps = [];
        this.deleteApps = [];
        this.isRerender = true;
        this.getData();
        this.loading = true;
        this.closeMultiDeleteModal();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }


  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deviceIps = [];
    this.deleteApps = [];
    this.closeModal();
  }

  // Show Errors
  showError(title: string, message: string) {
    this.infoTitle = title;
    this.infoBody = message;
    this.openInfoModal(false);
  }

  // For Export
  export(type?: string) {
    let orgId: string | number = this.ORG_ID;
    let nameStr: string = 'local_application';
    if (type && type == 'global') {
      orgId = 0;
      nameStr = 'global_application';
    }
    let name = this.commonFunctionsService.generateExportName(nameStr, true);

    this.exportSubs = this.apiService.ExportApps(orgId).subscribe((res: any) => {
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

  // exportPdf(type?: string) {
  // let orgId: string | number = this.ORG_ID;
  // let nameStr: string = 'local_application';
  // if (type && type == 'global') {
  //   orgId = 0;
  //   nameStr = 'global_application';
  // }
  // this.exportSubs = this.apiService.ExportApps(orgId).subscribe((res: any) => {
  //   let name = this.commonFunctionsService.generateExportName(nameStr);
  //   let exportData = this.exportDataConvertor(res);
  //   if (!exportData.length) {
  //     exportData = [this.empty];
  //   }
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
  // }

  exportDataConvertor(array) {
    if (Array.isArray(array)) {
      array.forEach((el) => {
        for (const key in el) {
          if (typeof el[key] == 'boolean') {
            if (el[key] == true) {
              el[key] = 'Yes';
            } else {
              el[key] = 'No';
            }
          }
          if (key === 'overrideDpi') {
            if (el[key] === null) {
              el[key] = 'No';
            }
          }
        }
        el = this.commonFunctionsService.columnNameFromKeys(
          el,
          this.exportColoumnNames
        );
        
        if(!this.hideDpiAsmfeatures && el.hasOwnProperty("Ignore IPFIX App ID")){
          delete el['Ignore IPFIX App ID'];
        }
        
        delete el._id;
        delete el.orgId;
        delete el.tenantId;
        delete el.protocol;
        delete el.engineId;
        delete el.extAppEnum;
        delete el.extProtocolId;
        // delete el.overrideDpi;

        // let ads;
        // if (el.addressesV4) {
        //   ads = `${el.addressesV4}; ${el.addressesV6 ? el.addressesV6 : ''}`
        // } else {
        //   ads = `${el.addressesV6 ? el.addressesV6 : ''}`
        // }

        // newArray.push({
        //   //addresses: ads,
        //   //appName: el.name ? el.name : '',
        //   //appId: '',
        //   addressesV4: el.addressesV4 ? el.addressesV4 : '',
        //   addressesV6: el.addressesV6 ? el.addressesV6 : '',
        //   name: el.name ? el.name : '',
        //   ports: el.ports ? el.ports : '',
        //   rangedPorts: el.rangePorts ? el.rangePorts : '',
        // });
      });
    }
    return array;
  }

  cancel(createDefFlag = false) {
    this.showLookUpSuccess = false;
    this.domainName = '';
    if (createDefFlag) {
      if (this.createDefinitionModalRef) {
        this.createDefinitionModalRef.close();
      }
    }
    // this.createView = false;
    this.buttonVisible = true;
    this.tablePreview = false;
    this.closeModal();
    this.reset();
  }

  reset() {
    this.createTypeSelected = 'global';
    this.createName = undefined;
    this.createSubnetsV4 = [];
    this.createSubnetsV6 = [];
    this.createSubnetV4 = '';
    this.createSubnetV6 = '';
    this.createPorts = [];
    this.createRPorts = [];
    this.createCurrentAddress = undefined;
    this.createCurrentPorts = undefined;
    this.createCurrentRPorts = undefined;
    this.createOverrideDpi = false;
    //this.appProtocolSelected = 'ICMP';
  }
  /* CCL-50447 */
  // showCreate() {
  //   // this.createView = true;
  //   this.tablePreview = false;
  //   this.buttonVisible = false;
  // }

  // hideCreate() {
  //   // this.createView = false;
  //   this.tablePreview = false;
  //   this.buttonVisible = true;
  // }

  /*
  addAddress() {
    if (this.createCurrentAddress == '') {
      return;
    }
    this.createAddresses.push(this.createCurrentAddress);
    this.createCurrentAddress = '';
  }

  removeAddress(rid) {
    this.createAddresses.splice(rid, 1);
  }


  addPort() {
    if (this.createCurrentPorts == '') {
      return;
    }
    this.createPorts.push(this.createCurrentPorts);
    this.createCurrentPorts = '';
  }

  removePort(rid) {
    this.createPorts.splice(rid, 1);
  }

  addRangePort() {
    if (this.createCurrentRPorts == '') {
      return;
    }
    this.createRPorts.push(this.createCurrentRPorts);
    this.createCurrentRPorts = '';
  }

  removeRangePort(rid) {
    this.createRPorts.splice(rid, 1);
  }

  */


  tableFuctionsAdder() {
    let selectedBtn = document.getElementById('delete-selected-btn');
    let editBtn = document.getElementById('edit-btn');
    let deleteBtn = document.getElementById('delete-btn');
    //let collapse = document.getElementsByClassName('collapse-btn');
    if (selectedBtn) {
      selectedBtn.addEventListener("click", this.deleteAllSelected);
    }
    if (editBtn) {
      editBtn.addEventListener("click", function () {
        // $(this).children('i').toggle();
      }, false);
    }
    if (deleteBtn) {
      deleteBtn.addEventListener("click", this.delete);
    }

    // if (collapse) {
    //   collapse.addEventListener("click", function () {
    //     $(this).children('.hide-on-open').toggle();
    //   }, false);
    // }
  }



  collapseBtnClick(event) {
    let id = event.id.split('-')[2];
    $('#collapse-address-' + id).toggle();
    if ($('#collapse-icon-' + id).hasClass('fa-chevron-right')) {
      $('#collapse-icon-' + id).removeClass('fa-chevron-right');
      $('#collapse-icon-' + id).addClass('fa-chevron-down');
    } else {
      $('#collapse-icon-' + id).removeClass('fa-chevron-down');
      $('#collapse-icon-' + id).addClass('fa-chevron-right');
    }

  }

  combineApps() {
    let curOrgApps = this.curOrgApps ? this.curOrgApps : [];
    let defOrgApps = this.defOrgApps ? this.defOrgApps : [];

    curOrgApps = curOrgApps.map((obj) => {
      if (!obj) return;
      obj.type = "Local";
      obj['v4s'] = this.splitData(obj['addressesV4']);
      obj['v6s'] = this.splitData(obj['addressesV6']);
      obj['newPorts'] = this.splitData(obj['ports']);
      obj['newRPorts'] = this.splitData(obj['rangePorts']);
      return obj;
    });
    let curs = curOrgApps.length ? curOrgApps.slice(0) : [];
    if (defOrgApps && defOrgApps.length) {
      const currentOrgName = curOrgApps.map((obj) => obj.name);
      defOrgApps = defOrgApps.filter((obj) => {
        if (obj) {
          const currentOrgIndex = currentOrgName.indexOf(obj.name);
          if (currentOrgIndex == -1) {
            obj.type = "Global";
            obj['v4s'] = this.splitData(obj['addressesV4']);
            obj['v6s'] = this.splitData(obj['addressesV6']);
            obj['newPorts'] = this.splitData(obj['ports']);
            obj['newRPorts'] = this.splitData(obj['rangePorts']);
            return obj;
          } else {
            // obj = curOrgApps[currentOrgIndex];
            // curs.splice(currentOrgIndex, 1);
          }

        }

      });
      //defOrgApps = [...defOrgApps, ...curs];
      defOrgApps = [...defOrgApps, ...curOrgApps];
    } else if (curOrgApps.length) {
      defOrgApps = curOrgApps;
    }
    //defOrgApps = this.processData(defOrgApps);
    return defOrgApps;

  }

  sortingTable(colId: number, e) {
    this.sortColumn = colId;
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
      this.importTableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.importTableOptions.language = this.translateService.es;
      this.tableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
      this.importTableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language ||this.language.fileLanguage == 'en' && this.importTableOptions.language  ) {
      delete this.tableOptions.language;
      delete this.importTableOptions.language 
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deviceIps = [];
    this.deleteApps = [];
  }

  checkSysAdmin() {
    let roles = this.sso.getRoles();
    if (roles?.includes('SysAdmin')) {
      this.isSysAdmin = true;
      this.createTypeSelected = 'global';
    } else {
      this.isSysAdmin = false;
    }


  }

  addSubnet(type: string) {

    if (type && type == 'v4') {
      this.createSubnetV4 = this.createSubnetV4.trim();
      if (this.createSubnetV4 == '') {
        return;
      }
      if (this.createSubnetV4 != '') {
        if (!this.subnetValidatorIpv4(this.createSubnetV4)) {
          this.infoTitle = this.language['Invalid address format'];
          this.infoBody = `${this.createSubnetV4}`;
          this.openInfoModal(false);
          return;
        }

        if (this.createSubnetsV4.includes(this.createSubnetV4)) {
          this.infoTitle = this.language['Duplicate Address'];
          this.infoBody = `${this.createSubnetV4}`;
          this.openInfoModal(false);
          return;

        }
        if (this.checkSubnetIntersect('ip4', this.createSubnetsV4, this.createSubnetV4)) {
          this.infoTitle = `Invalid request`;
          this.infoBody = `Subnet ${this.createSubnetV4} intersects with other subnet in the create list`;
          this.openInfoModal(false);
          return;
        }
        this.createSubnetsV4.push(this.createSubnetV4);
        this.createSubnetV4 = '';
      }

    } else {
      this.createSubnetV6 = this.createSubnetV6.trim();
      if (this.createSubnetV6 == '') {
        return;
      }
      if (this.createSubnetV6 != '') {
        if (!this.subnetValidatorIpv6(this.createSubnetV6)) {
          this.infoTitle = this.language['Invalid address format'];
          this.infoBody = `${this.createSubnetV6}`;
          this.openInfoModal(false);
          return;
        }
        if (this.createSubnetsV6.includes(this.createSubnetV6)) {
          this.infoTitle = this.language['Duplicate Address'];
          this.infoBody = `${this.createSubnetV6}`;
          this.openInfoModal(false);
          return;
        }
        if (this.checkSubnetIntersect('ip6', this.createSubnetsV6, this.createSubnetV6)) {
          this.infoTitle = `Invalid request`;
          this.infoBody = `Subnet ${this.createSubnetV6} intersects with other subnet in the create list`;
          this.openInfoModal(false);
          return;
        }
        this.createSubnetsV6.push(this.createSubnetV6);
        this.createSubnetV6 = '';
      }
    }

  }

  removeSubnetV4(rid) {
    this.createSubnetsV4.splice(rid, 1);
  }

  removeSubnetV6(rid) {
    this.createSubnetsV6.splice(rid, 1);
  }

  subnetValidatorIpv4(ip: string) {
    if (ip && ip != '') {
      let ips = ip.split(':');
      if (ips.length) {
        if (ips.length > 1) {
          if (this.commonFunctionsService.isValidSubnetV4(ips[0]) && (this.apiService.validateJoinPorts(ips[1]))) {
            return true;
          } else return false;
        } else {
          if (this.commonFunctionsService.isValidSubnetV4(ips[0])) {
            return true;
          } else return false;
        }
      }
    }
    return false;
  }
  subnetValidatorIpv6(ip: string) {
    if (ip && ip != '') {
      /*
      let ips = ip.split(':');
      if (ips.length) {
        if (ips.length > 1) {
          if (this.commonFunctionsService.isValidSubnetV6(ips[0]) && (/^[0-9]{1,5}(\|[0-9]{1,5})+$/.test(ips[1]))) {
            return true;
          } else return false;
        } else {
          if (this.commonFunctionsService.isValidSubnetV6(ips[0])) {
            return true;
          } else return false;
        }
      }
      */
      /* if (this.commonFunctionsService.isValidIpV6Addr(ip)) { */
      if (this.commonFunctionsService.isValidSubnetV6(ip)) { /* CCL-44149 */
        return true;
      } else return false;
    }
    return false;
  }


  addPort(type?: string) {
    if (type && type == 'edit') {
      if (this.editPort == '') {
        return;
      }

      if (!this.apiService.portValidation(this.editPort)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The port ${this.editPort} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      this.editPortList.push(this.editPort.toUpperCase());
      this.editPort = '';
    } else {
      if (this.createCurrentPorts == '') {
        return;
      }

      if (!this.apiService.portValidation(this.createCurrentPorts)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The port ${this.createCurrentPorts} format is invalid`;
        this.openInfoModal(false);
        return;
      }

      this.createPorts.push(this.createCurrentPorts.toUpperCase());
      this.createCurrentPorts = '';
    }
  }

  removePort(rid, type?: string) {
    if (type && type == 'edit') {
      this.editPortList.splice(rid, 1);
    } else {
      this.createPorts.splice(rid, 1);
    }
  }

  addRangePort(type?: string) {
    if (type && type == 'edit') {
      if (this.editRPort == '') {
        return;
      }
      if (!this.apiService.rPortValidation(this.editRPort)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The ranged port ${this.editRPort} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      this.editRPortList.push(this.editRPort.toUpperCase());
      this.editRPort = '';
    } else {
      if (this.createCurrentRPorts == '') {
        return;
      }
      if (!this.apiService.rPortValidation(this.createCurrentRPorts)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The ranged port ${this.createCurrentRPorts} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      this.createRPorts.push(this.createCurrentRPorts.toUpperCase());
      this.createCurrentRPorts = '';
    }

  }

  removeRangePort(rid, type?: string) {
    if (type && type == 'edit') {
      this.editRPortList.splice(rid, 1);
    } else {
      this.createRPorts.splice(rid, 1);
    }

  }

  changeLangData() {
    let types = [
      { label: this.language['Global'], value: 'global' },
      { label: this.language['Local'], value: 'local' },
    ];
    this.types = [...types];
  }

  addEditSubnet(ver: string) {
    if (ver == 'ip4') {
      this.editSubnet4 = this.editSubnet4 ? this.editSubnet4.trim() : '';
      if (this.editSubnet4 == '') {
        return;
      }

      if (!this.subnetValidatorIpv4(this.editSubnet4)) {
        this.infoTitle = this.language['Invalid address format'];
        this.infoBody = `${this.editSubnet4}`;
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets4.includes(this.editSubnet4)) {
        this.infoTitle = this.language['Duplicate Address'];
        this.infoBody = `${this.editSubnet4}`;
        this.openInfoModal(false);
        return;

      }
      if (
        this.checkSubnetIntersect(
          'ip4',
          this.editSubnets4,
          this.editSubnet4,
          true
        )
      ) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.editSubnet4} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }
      this.editSubnets4.push(this.editSubnet4);
      this.editSubnet4 = '';
    } else {
      this.editSubnet6 = this.editSubnet6 ? this.editSubnet6.trim() : '';
      if (this.editSubnet6 == '') {
        return;
      }

      if (!this.subnetValidatorIpv6(this.editSubnet6)) {
        this.infoTitle = this.language['Invalid address format'];
        this.infoBody = `${this.editSubnet6}`;
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets6.includes(this.editSubnet6)) {
        this.infoTitle = this.language['Duplicate Address'];
        this.infoBody = `${this.editSubnet6}`;
        this.openInfoModal(false);
        return;

      }
      if (this.checkSubnetIntersect('ip6', this.editSubnets6, this.editSubnet6, true)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.editSubnet4} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }
      this.editSubnets6.push(this.editSubnet6);
      this.editSubnet6 = '';
    }
  }

  removeEditSubnet(rid, ver: string) {
    if (ver == 'ip4') {
      this.editSubnets4.splice(rid, 1);
    } else {
      this.editSubnets6.splice(rid, 1);
    }
  }

  setStorageData() {
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;
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
    let data = this.curOrgApps;
    if (importType == 'global') {
      data = this.defOrgApps;
    }
    this.dataTablecreatorService.getJsonFromCsv(file);

    if (this.importGlobalInput) {
      this.importGlobalInput.nativeElement.value = "";
    }
    this.importLocalInput.nativeElement.value = '';
  }

  compareJsonToTableData(json: any) {
    let tableData = this.curOrgApps;
    let orgId: any = this.ORG_ID;
    let importType = sessionStorage.getItem('importType');
    if (importType == 'global') {
      tableData = this.defOrgApps;
      orgId = 0;
    }
    let comparedData = [];
    if (!json.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }
    json.forEach(imp => {
      let action = 'Create';
      if (tableData.filter((tbl) => tbl.name == imp.name).length) {
        action = 'Update';
      }

      if (imp.name && (imp.addressesV4 || imp.addressesV6 || imp.ports || imp.rangePorts)) {
        comparedData.push({
          "action": action,
          "name": imp.name,
          "addressesV4": imp.addressesV4 ? imp.addressesV4 : '',
          "addressesV6": imp.addressesV6 ? imp.addressesV6 : '',
          "domainName": imp.domainName ? imp.domainName : '',
          "ports": imp.ports ? imp.ports : '',
          "rangePorts": imp.rangePorts ? imp.rangePorts : '',
          "orgId": orgId,
          "tenantId": 0,
          "overrideDpi": imp?.overrideDpi === 'Yes' || imp?.overrideDpi === 'yes' ? true : false
        })
      }
    });
    if (!comparedData.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }

    this.importSubmit(true, comparedData);
  }

  //  For Submit Import
  importSubmit(isDryRun = false, comparedData?: any) {
    this.loading = true;
    let orgId = this.ORG_ID;
    let importType = sessionStorage.getItem('importType');
    if (importType == 'global') {
      orgId = '0';
    }
    let requestObject: any = {
      "clientIP": this.storageData["clientIp"],
      "dry_run": isDryRun,
      "full_import": false,
      "import_data": [],
      "orgId": orgId,
      "userId": this.sso.getUserId(),
      "tenantId": 0
    }
    // let action = 'Create';
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
        if (element.validationResult && element.validationResult.toLowerCase() == 'ok') {
          data.push({
            "action": element.action,
            "addressesV4": element.addressesV4,
            "addressesV6": element.addressesV6,
            "domainName": element.domainName,
            "name": element.name,
            "ports": element.ports,
            "rangePorts": element.rangePorts,
            "orgId": orgId,
            "tenantId": 0,
            "overrideDpi": element?.overrideDpi
          })
        }
      });
    }

    requestObject.import_data = data;


    this.importSubs = this.apiService.ImportApps(orgId, requestObject).subscribe((res: any) => {
      this.loading = false;
      if (isDryRun) {
        if (res && res.data && res.data.length == 0) {
          this.infoTitle = this.language.noAvailableChange;
          this.infoBody = '';
          this.openInfoModal(false);
          return;
        }
        this.importTableData = res ? res : [];
        this.checkDryRunData(this.importTableData);
      } else {
        sessionStorage.removeItem('importType');
        this.cancel(true);
        this.loading = true;
        this.getData();
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      if (err.status == 400) {
        if (isDryRun) {
          this.infoTitle = this.language.objectNotFound;
          this.infoBody = '';
          this.closeModal();
          this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
        }
        else this.pageErrorHandle(err);
      } else {
        this.pageErrorHandle(err);
      }
    });


  }

  checkDryRunData(data: any) {
    let tableData = this.curOrgApps;
    let orgId: any = this.ORG_ID;
    let importType = sessionStorage.getItem('importType')
    if (importType == 'global') {
      tableData = this.defOrgApps;
      orgId = 0;
    }
    this.enableImportSubmit = false;
    data.forEach(e => {
      if (e.validationResult && e.validationResult.toLowerCase() != 'ok') {
        e.action = e.validationResult
      }
      if (e.validationResult && e.validationResult.toLowerCase() == 'ok') {
        this.enableImportSubmit = true;
      }
      e['domainName_old'] = '';
      e['addressesV4_old'] = '';
      e['addressesV6_old'] = '';
      e['ports_old'] = '';
      e['rangePorts_old'] = '';
      e['overrideDpi_old'] = '';

      let match = tableData.filter((tbl) => tbl.name == e.name);
      if (match.length) {
        e['domainName_old'] = match[0].domainName ? match[0].domainName : '';
        e['addressesV4_old'] = match[0].addressesV4 ? match[0].addressesV4 : '';
        e['addressesV6_old'] = match[0].addressesV6 ? match[0].addressesV6 : '';
        e['ports_old'] = match[0].ports ? match[0].ports : '';
        e['rangePorts_old'] = match[0].rangePorts ? match[0].rangePorts : '';
        e['overrideDpi_old'] = match[0]?.overrideDpi ? match[0]?.overrideDpi : '';
      }
    });

    // this.createView = false;
    this.buttonVisible = false;
    this.tablePreview = true;
  }

  // For Increemental Import
  incrementalImport() {
    this.isFullImport = false;
  }

  closeImport() {
    this.cancel(true);
    this.enableImportSubmit = false;
    this.importTableData = [];
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    // if (this.createDefinitionModalRef) {
    //   this.createDefinitionModalRef.close();
    // }
  }

  pageErrorHandle(err: HttpErrorResponse, flow?: any) {
    let errorInfo = '';
    this.infoTitle = "Error";
    if (err.status == 400 || err.status == 409) {
      let infoBody = (flow && flow == 'add') ? this.commonOrgService.pageErrorHandle(err) : this.commonOrgService.pageInvalidRqstErrorHandle(err);
      if (err.status == 409 && (infoBody.toLowerCase().indexOf('already') > -1 || infoBody.toLowerCase().indexOf('already exists'))) {
        infoBody = "Application name is already used";
      }
      this.infoBody = infoBody;
      this.infoTitle = this.language['Invalid request'];
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

  openInfoModal(invalidImportDefinitation: boolean) {
    if (!invalidImportDefinitation) this.invalidImportDefinitation = [];
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('definitions', url);
  }
  showEditDataInput(ind, type) {

    this.modifyDataInfo = {
      index: ind,
      type: type
    };
    this.newEditDataValue = '';
    if (type == 'ip4') {
      this.newEditDataValue = this.editSubnets4[ind];
    } else if (type == 'ip6') {
      this.newEditDataValue = this.editSubnets6[ind];
    } else if (type == 'port') {
      this.newEditDataValue = this.editPortList[ind];
    } else if (type == 'rport') {
      this.newEditDataValue = this.editRPortList[ind];
    }
  }

  hideEditDataInput() {
    this.modifyDataInfo = {
      index: undefined,
      type: undefined
    };
  }

  modifyEditData() {
    let ver = this.modifyDataInfo.type;
    let index = this.modifyDataInfo.index;
    this.newEditDataValue = this.newEditDataValue.trim();
    if (ver == 'ip4') {
      if (!this.subnetValidatorIpv4(this.newEditDataValue)) {
        this.infoTitle = this.language['Invalid address format'];
        this.infoBody = `${this.newEditDataValue}`;
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets4.includes(this.newEditDataValue) && this.editSubnets4.indexOf(this.newEditDataValue) != index) {
        this.infoTitle = this.language['Duplicate Address'];
        this.infoBody = `${this.newEditDataValue}`;
        this.openInfoModal(false);
        return;
      }

      if (this.checkSubnetIntersect('ip4', this.editSubnets4, this.newEditDataValue, true, index)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.newEditDataValue} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }

      this.editSubnets4[index] = this.newEditDataValue;
    } else if (ver == 'ip6') {
      if (!this.subnetValidatorIpv6(this.newEditDataValue)) {
        this.infoTitle = this.language['Invalid address format'];
        this.infoBody = `${this.newEditDataValue}`;
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets6.includes(this.newEditDataValue) && this.editSubnets6.indexOf(this.newEditDataValue) != index) {
        this.infoTitle = this.language['Duplicate Address'];
        this.infoBody = `${this.newEditDataValue}`;
        this.openInfoModal(false);
        return;
      }

      if (this.checkSubnetIntersect('ip6', this.editSubnets6, this.newEditDataValue, true, index)) {
        this.infoTitle = `Invalid request`;
        this.infoBody = `Subnet ${this.newEditDataValue} intersects with other subnet in the list`;
        this.openInfoModal(false);
        return;
      }

      this.editSubnets6[index] = this.newEditDataValue;
    } else if (ver == 'port') {
      if (this.newEditDataValue == '') {
        this.infoTitle = 'Invalid Port';
        this.infoBody = `Cannot add Invalid Port`;
        this.openInfoModal(false);
        return;
      } else if (!this.apiService.portValidation(this.newEditDataValue)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The port ${this.newEditDataValue} format is invalid`;
        this.openInfoModal(false);
        return;
      }

      this.editPortList[index] = this.newEditDataValue;
    } else if (ver == 'rport') {
      if (this.newEditDataValue == '') {
        this.infoTitle = 'Invalid Ranged port';
        this.infoBody = `Cannot add Invalid Ranged port`;
        this.openInfoModal(false);
        return;
      } else if (!this.apiService.rPortValidation(this.newEditDataValue)) {
        this.infoTitle = this.language['Invalid port format'];
        this.infoBody = `The ranged port ${this.newEditDataValue} format is invalid`;
        this.openInfoModal(false);
        return;
      }
      this.editRPortList[index] = this.newEditDataValue;
    }
    this.newEditDataValue = '';
    this.hideEditDataInput();
  }

  /**
   * 
   * @param type iptype
   * @param ip ip value
   * @param comapreData array of datas to comapre
   * @param edit to identify add/edit flow, setted true if edit, false by default
   * @param editIndex edit index to skip compare with it own value
   * @returns true/false
   */
  checkSubnetIntersect(type = 'ip4', comapreData, ip, edit?: boolean, editIndex?: number) {
    //const Addr = MASK.Addr;
    if (type == 'ip4') {
      let ips = ip.split(':');
      let subnet = Addr(ips[0]);
      if (edit) {
        return comapreData.some((el, i) => {
          let isOverlap = this.checkIP4Contains(ip, el) || this.checkIP4Contains(el, ip);
          if (i != editIndex && isOverlap) {
            return true;
          }
        });
      } {
        return comapreData.some((el, i) => {
          let isOverlap = this.checkIP4Contains(ip, el) || this.checkIP4Contains(el, ip);
          if (isOverlap) {
            return true;
          }
        });
      }
    } else {
      if (edit) {
        return comapreData.some((el, i) => {
          if (i != editIndex && this.checkIP6Contains(ip, el)) {
            return true;
          }
        });
      } {
        return comapreData.some((el, i) => this.checkIP6Contains(ip, el));
      }
    }
  }

  checkIP6Contains(p1, p2) {
    p1 = p1.trim();
    let ip1 = p1.split('/')[0];

    let ip1Prefix = p1.split('/')[1];
    let ip2 = p2.split('/')[0];
    const subnet: IPMatch = getMatch(p1);
    return subnet.matches(ip2);
  }

  checkIP4Contains(p1, p2) {
    p1 = p1.trim();
    let ip1 = p1.split(':')[0];
    let ip2 = p2.split(':')[0];
    var subnet = Addr(ip1);
    var contains = subnet.contains(Addr(ip2));
    return contains;
  }

  portInputChanges(e) {
    var regex = new RegExp("^[a-zA-Z0-9/-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }

  createAppModalOpen() {
    this.errorLookUpMsg = '';
    this.tablePreview = false;
    this.buttonVisible = false;
    this.createDefinitionModalRef = this.dialogService.open(this.createDefinitionModal, { backdrop: 'static', windowClass: 'create-custom-modal' });
  }

  clearSearch() {
    this.searchText = '';
    this.search(this.searchText);
  }

  importDPI(input) {
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
        this.importDpiSubs = this.apiService.importDefinitionDPI(file, '0x17').subscribe(res => {
          this.getData();
          // this.loading = false;
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err, 'add');
        })
      };
      reader.onerror = (error) => {
        console.log('errir => ', error)
      };

      reader.readAsText(file);
    }
  }

  changeOverrideDpi(checked: boolean) {
    if (checked) {
      this.overrideDEFswitchEnabled = checked;
      this.createOverrideDpi = true;
    } else {
      this.overrideDEFswitchEnabled = false;
      this.createOverrideDpi = false;
    }
  }

  updateOverrideDpi(checked: boolean, id: string, orgId: any) {
    const params = {
      overrideDpi: checked
    }
    this.loading = true;
    this.updateDpiSubs = this.apiService.applicationsPatch(id, params, orgId).subscribe(res => {
      this.isRerender = true;
      // this.cancel();
      this.getData();
      this.editOnValue = undefined;
    }, (err: HttpErrorResponse) => {
      this.getData();
      this.pageErrorHandle(err, 'add');
    });
  }

  routeToAudit() {
    if (Array.isArray(this.applicationsIds) && this.applicationsIds.length) {
      this.loading = true;
      this.apiService
        .getApplicationAudit(this.applicationsIds, this.ORG_ID).subscribe(
          (res: any) => {
            this.loading = false;
            if (res && res.length) {
              this.apiService.responseSubject.next(res);
              this.router.navigate([`${this.MODULE}/applications-audit`], {
                state: { domainNameRes: res },
              });
            }
          },
          (err: HttpErrorResponse) => {
            this.loading = false;
            this.pageErrorHandle(err, 'add')
            // let errorMessage = err?.error && err?.error.message ? err.error.message : this.language['Something went wrong'];
            // this.infoBody = errorMessage;
            // this.infoTitle = this.language['Invalid request'];
            // this.openInfoModal(false);
          }
        );
    } else {
      this.infoTitle = this.language['Invalid request'];
      this.infoBody = this.language['No Domain Name available'];
      this.openInfoModal(false);
      return;
    }
  }



  public fetchLookUp(domainName: string) {
    this.lookupLoading = true;
    if (!domainName) {
      this.infoTitle = this.language['Invalid request'];
      this.infoBody = this.language.invalid_domain_name;
      this.openInfoModal(false);
      return;
    }
    this.createSubnetsV4 = [];
    this.createSubnetsV6 = [];
    this.apiService.getApplicationByDomainName(domainName, this.ORG_ID).subscribe((res: any) => {
      this.lookupLoading = false;
      this.errorLookUpMsg = '';
      if (res?.addressesV4) {
        const lookUpv4 = [];
        lookUpv4.push(...res.addressesV4.split(';'));
        this.createSubnetsV4 = [];
        this.createSubnetV4 = '';
        this.createSubnetsV4 = lookUpv4;
      }

      if (res?.addressesV6) {
        const lookUpv6 = [];
        lookUpv6.push(...res.addressesV6.split(';'));
        this.createSubnetsV6 = [];
        this.createSubnetV6 = '';
        this.createSubnetsV6 = lookUpv6;
      }
      this.showLookUpSuccess = true;
    },
      (error: HttpErrorResponse) => {
        this.lookupLoading = false;
        this.showLookUpSuccess = false;
        this.errorLookUpMsg = this.commonOrgService.pageErrorHandle(error);
      }
    );
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
  
  updateSelectAllCheckbox(): void {
    const selectAllCheckbox = document.getElementById('selectDeselectAll') as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.disabled = !this.isAnyCheckboxAvailable();
    }
  }

  isAnyCheckboxAvailable() {
    return document.querySelectorAll('.test_check').length;
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

 