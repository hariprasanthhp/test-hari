declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, HostListener, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ExportExcelService } from '../../shared/services/export-excel.service';
import { DataTableDirective } from 'angular-datatables';
import { isArray } from 'jquery';
import { Router } from '@angular/router';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonFunctionsService } from '../services/common-functions.service';
import { LocationsApiService } from '../services/locations-api.service';
import { DataTablecreatorService } from '../services/data-tablecreator.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;

  createSubnetName: string;
  createSubnets: any = [];
  createSubnetsV4: any = [];
  createSubnetsV6: any = [];

  createSubnetV4: string = '';
  createSubnetV6: string = '';
  currentTableRowCount = 0;
  createSubnetRegion: string;
  createSubnetAddress: string;
  editOnValue: any;
  editData: any;
  table: any;
  createGeo: string;
  createCurrentSubnet: any;
  tempNode: any;
  formVisible: boolean = false;
  buttonVisible: boolean = true;
  exportData: any;
  infoTitle: string;
  infoBody: string;
  modalRef: any;
  rowId: any;
  showingDeviceIp: any;
  dataAvailable: boolean = false;
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    columnDefs: [
      { targets: [0], orderable: false },
    ],
    order: [1, 'asc'],
    stateSave: false,
    drawCallback: (settings) => {
      let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 1;
      let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'asc';
      this.sortData = {
        column: col,
        type: type
      };

      setTimeout(() => {
        this.resetDelete()
      }, 0);

      this.currentTableRowCount = settings.aiDisplay.length;
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  newSubnet: string;
  locationData: any = [];
  deleteData: any;
  params: {};
  empty = {
    'Name': '',
    'SubnetsV4': '',
    'SubnetsV6': '',
    'Region': '',
    'Address': '',
    'Geo': ''
  };

  add: any = {
    address: "",
    geo: "",
    name: "",
    region: "",
    subnetsV4: "",
    subnetsV6: "",
    tenantId: 0,
    orgId: 50
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  importTableOptions: DataTables.Settings = {};
  tablePreview: boolean = false;

  fullLoader: boolean = true;
  isFullImport: boolean = true;

  editname: any;
  editSubnet4: string;
  editSubnet6: string;
  editSubnets4: any = [];
  editSubnets6: any = [];
  editsubnet: any;
  editregion: string;
  editaddress: string;
  editgeo: string;
  subnetError: boolean;

  IP4s: any = [];
  IP6s: any = [];
  allSubnets: any[];
  editSubnets: any[] = [];
  translateSubscribe: any;
  frTable: DataTables.LanguageSettings;

  ORG_ID: string;

  loaded: boolean;
  storageData = {};
  recreateTable;
  previewTableBody;
  loading: boolean = true;
  listSubs: any;
  createSubs: any;
  updateSubs: any;
  deleteSubs: any;
  exportSubs: any;
  importSubs: any;


  deleteIds = [];
  deviceIps = [];
  importUpdateASCreate: any = [];
  enableImportSubmit: boolean;

  sortData = {
    column: 1,
    type: 'asc'
  }

  modifySubnetInfo: any = {};
  newEditSubnet: string;
  newEditSubnetError: string;
  public invalidImportLocationName = [];
  public invalidImportLocationRegion = [];
  public invalidImportLocationAddress = [];
  public invalidImportLocationGeo = [];


  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private exportExcel: ExportExcelService,
    private api: LocationsApiService,
    private dataTablecreatorService: DataTablecreatorService,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private titleService: Title,
    private common:common,
  ) {

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);

    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.dataAvailable = false;
      this.isRerender = true;
      this.titleService.setTitle(`${this.language['Locations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.tableCreator('language');
    });

    this.frTable = this.translateService.fr;

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Locations']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);

  }

  subscription;
  ngOnInit() {
    this.createCurrentSubnet = '';
    this.removeState();
    this.apiLoader();
    this.tableLanguageOptions();
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;

    this.subscription = this.dataTablecreatorService.tableOptionsData.subscribe((res: any) => {
      this.invalidImportLocationName = [];
      this.invalidImportLocationAddress = [];
      this.invalidImportLocationGeo = [];
      this.invalidImportLocationRegion = [];

      try {
        let importValidationFlag = true;
        (res || []).forEach(key => {
          key['name'] = key[this.language['Name']];
          key['address'] = key[this.language['Address']];
          key['region'] = key[this.language['Region']];
          key['geo'] = key[this.language['Geo']];
          delete key['Name'];
          /* CCL-42080 */
          if (key['name'] && key['name'].length > 64) {
            this.invalidImportLocationName.push(key)
            this.infoTitle = this.language['Invalid Value'];
            this.infoBody = this.language['Invalid Name - Name should not exceed 64 characters.'];
            importValidationFlag = false;
            this.openInfoModal(true);
            return;
          }
          if (key['region'] && key['region'].length > 32 || key['address'] && key['address'].length > 32) {
            this.invalidImportLocationRegion.push(key);
            this.invalidImportLocationAddress.push(key);
            this.infoTitle = this.language['Invalid Value'];
            this.infoBody = this.language['Invalid Region/Address - Region/Address should not exceed 32 characters.'];
            importValidationFlag = false;
            this.openInfoModal(true);
            return;
          }
          if (key['geo'] && key['geo'].length > 64) {
            this.invalidImportLocationAddress.push(key);
            this.infoTitle = this.language['Invalid Value'];
            this.infoBody = this.language['Invalid Geo - Geo should not exceed 64 characters.'];
            importValidationFlag = false;
            this.openInfoModal(true);
            return;
          }
        })
        if (importValidationFlag) {
          this.recreateTable = res;
          this.submitImport(true);
        }
      } catch (ex) {
      }
    });
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.subscription) this.subscription.unsubscribe();
    if (this.listSubs) {
      this.listSubs.unsubscribe();
    }
    if (this.createSubs) {
      this.createSubs.unsubscribe();
    }
    if (this.updateSubs) {
      this.updateSubs.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
    if (this.exportSubs) {
      this.exportSubs.unsubscribe();
    }
    if (this.importSubs) {
      this.importSubs.unsubscribe();
    }
  }

  apiLoader() {
    this.listSubs = this.api.LocationList(this.ORG_ID).subscribe((res: any) => {
      if (res) {
        this.locationData = [...this.processData(res)];
        this.tableCreator();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }
        setTimeout(() => {
          this.resetDelete();
        }, 100);
        this.exportData = this.exportProcess(res);
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);

      this.tableCreator();
      if (this.isRerender) {
        this.rerender();
        this.loading = false;
      } else {
        this.dtTrigger.next();
      }

    });
  }


  processData(res: any) {
    res.forEach(obj => {
      for (let key in obj) {
        let v4 = [], v6 = []
        obj['subnets'] = this.checkNull(obj.subnetsV4) + this.checkNull(obj.subnetsV6);
        obj['subnetsForExport'] = [obj.subnetsV4, obj.subnetsV6].filter(s => s != 'null').join(',')

        if (obj['subnetsV4'] != null && obj['subnetsV4'] != '') {
          v4 = [...obj['subnetsV4'].split('|')];
        }
        if (obj['subnetsV6'] != null && obj['subnetsV6'] != '') {
          v6 = [...obj['subnetsV6'].split('|')];
        }

        obj['v4s'] = v4;
        obj['v6s'] = v6;
      }
    });
    return res;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.tableOptions.order = [this.sortData.column, this.sortData.type],
        setTimeout(() => {
          this.dtTrigger.next();
        }, 10);
    });
  }


  checkNull(str) {
    if (str == null) {
      return '';
    }
    return str;
  }

  addSubnet() {
    this.createSubnetV4 = this.createSubnetV4.trim();
    this.createSubnetV6 = this.createSubnetV6.trim();
    if (this.createSubnetV4 == '' && this.createSubnetV6 == '') {
      this.infoTitle = this.language['Subnet cannot be empty'];
      this.infoBody = ``;
      this.openInfoModal(false);
      return;
    }

    if (this.createSubnetV4 != '') {
      if (!this.subnetValidatorIpv4(this.createSubnetV4)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = `${this.createSubnetV4}`;
        this.openInfoModal(false);
        return;
      }

      if (this.createSubnetsV4.includes(this.createSubnetV4)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = this.language["Duplicate Subnet"];
        this.openInfoModal(false);
        return;

      }

      this.createSubnetsV4.push(this.createSubnetV4);
      this.createSubnetV4 = '';
    }

    if (this.createSubnetV6 != '') {
      if (!this.subnetValidatorIpv6(this.createSubnetV6)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = `${this.createSubnetV6}`;
        this.openInfoModal(false);
        return;
      }
      if (this.createSubnetsV6.includes(this.createSubnetV6)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = this.language["Duplicate Subnet"];
        this.openInfoModal(false);
        return;
      }
      this.createSubnetsV6.push(this.createSubnetV6);
      this.createSubnetV6 = '';
    }

    // this.createSubnets.push(this.createCurrentSubnet);
    // this.createCurrentSubnet = '';
  }

  removeSubnetV4(rid) {
    this.createSubnetsV4.splice(rid, 1);
  }

  removeSubnetV6(rid) {
    this.createSubnetsV6.splice(rid, 1);
  }

  tableCreator(type?: string) {
    this.tableOptions = {
      pagingType: 'full_numbers',
      rowId: '_id',
      columnDefs: [
        { targets: [0], orderable: false },
      ],
      order: [1, 'asc'],
      stateSave: false,
      drawCallback: (settings) => {
        let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 1;
        let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'asc';
        this.sortData = {
          column: col,
          type: type
        };

        setTimeout(() => {
          this.resetDelete()
        }, 0);

        this.currentTableRowCount = settings.aiDisplay.length;
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };

    this.tableLanguageOptions();

    if (type && type == 'language') {
      setTimeout(() => {
        this.dataAvailable = true;
        this.rerender();
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }, 300);
    } else {

      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 200);
    }
  }

  hideShow(id) {
    if (this.showingDeviceIp == id) {
      this.showingDeviceIp = undefined;
    } else {
      this.showingDeviceIp = id;
    }
  }



  create() {
    this.buttonVisible = false;
    this.formVisible = true

  }

  submit() {
    if (!this.createSubnetName) {
      this.infoTitle = this.language['Object missing name'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }
    /* CCL-42080 */

    if (this.createSubnetName.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Name - Name should not exceed 64 characters.'];
      this.openInfoModal(false);
      return;
    }

    this.createSubnetV4 = this.createSubnetV4 ? this.createSubnetV4.trim() : '';
    this.createSubnetV6 = this.createSubnetV6 ? this.createSubnetV6.trim() : '';

    if ((this.createSubnetV4 == '' && !this.createSubnetsV4.length) && (this.createSubnetV6 == '' && !this.createSubnetsV6.length)) {
      this.infoTitle = this.language['Location must have at least one subnet'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }
    this.IP4s = this.createSubnetsV4;
    this.IP6s = this.createSubnetsV6;

    if (this.createSubnetV4 != '') {
      if (!this.subnetValidatorIpv4(this.createSubnetV4)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = "";
        this.openInfoModal(false);
        return;
      }
      this.IP4s = [this.createSubnetV4, ...this.IP4s];
    }

    if (this.createSubnetV6 != '') {
      if (!this.subnetValidatorIpv6(this.createSubnetV6)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = "";
        this.openInfoModal(false);
        return;
      }
      this.IP6s = [this.createSubnetV6, ...this.IP6s];
    }

    /* CCL-42112 */
    if (this.createSubnetRegion && this.createSubnetRegion.length > 32 || this.createSubnetAddress && this.createSubnetAddress.length > 32) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Region/Address - Region/Address should not exceed 32 characters.'];
      this.openInfoModal(false);
      return;
    }

    if (this.createGeo && this.createGeo.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Geo - Geo should not exceed 64 characters.'];
      this.openInfoModal(false);
      return;
    }
    //this.splitSubnets(this.allSubnets);

    let params = {
      name: this.createSubnetName ? this.createSubnetName.trim() : '',
      subnetsV4: (this.IP4s.length != 0) ? this.IP4s.join('|') : null,
      subnetsV6: (this.IP6s.length != 0) ? this.IP6s.join('|') : null,
      region: this.createSubnetRegion ? this.createSubnetRegion.trim() : '',
      address: this.createSubnetAddress ? this.createSubnetAddress.trim() : '',
      geo: this.createGeo ? this.createGeo.trim() : '',
      orgId: parseInt(this.ORG_ID),
      tenantId: 0,
    }


    this.loading = true;
    this.createSubs = this.api.LocationAdd(params, this.ORG_ID).subscribe((json: any) => {
      this.isRerender = true;
      this.cancel();
      this.apiLoader();
      this.commonOrgService.closeAlert();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;

    this.editname = item.name;
    this.editSubnets4 = (item.subnetsV4 != null) ? item.subnetsV4.split('|') : [];
    this.editSubnets6 = (item.subnetsV6 != null) ? item.subnetsV6.split('|') : [];
    //this.editSubnets = [...item.subnetsV4.split(',')];
    this.editSubnet4 = '';
    this.editSubnet6 = '';
    //this.editsubnet = item.subnetsV4;
    this.editregion = item.region;
    this.editaddress = item.address;
    this.editgeo = item.geo;

    if (this.deleteIds.indexOf(item._id) !== -1) {

      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deviceIps.splice(this.deviceIps.indexOf(item.name), 1);

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
    this.hideEditSubnetInput();

  }

  updateSave(id: string) {
    if (this.editname == '') {
      this.infoTitle = this.language['Object missing name'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }
    /* CCL-42080 */

    if (this.editname.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Name - Name should not exceed 64 characters.'];
      this.openInfoModal(false);
      return;
    }

    this.editSubnet4 = this.editSubnet4 ? this.editSubnet4.trim() : '';
    this.editSubnet6 = this.editSubnet6 ? this.editSubnet6.trim() : '';

    if ((this.editSubnet4 == '' && !this.editSubnets4.length) && (this.editSubnet6 == '' && !this.editSubnets6.length)) {
      this.infoTitle = this.language['Location must have at least one subnet'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }

    if (!this.validateSubnetEdit()) {
      this.infoTitle = this.language['Invalid subnet'];
      //this.infoBody = "Invalid CIDR format";
      this.openInfoModal(false);
      return;
    }

    /* CCL-42112 */
    if (this.editregion && this.editregion.length > 32 || this.editaddress && this.editaddress.length > 32) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Region/Address - Region/Address should not exceed 32 characters.'];
      this.openInfoModal(false);
      return;
    }

    /* CCL-42112 */
    if (this.editgeo && this.editgeo.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = this.language['Invalid Geo - Geo should not exceed 64 characters.'];
      this.openInfoModal(false);
      return;
    }

    let params = {
      name: this.editname ? this.editname.trim() : '',
      subnetsV4: (this.IP4s.length != 0) ? this.IP4s.join('|') : null,
      subnetsV6: (this.IP6s.length != 0) ? this.IP6s.join('|') : null,
      region: this.editregion ? this.editregion.trim() : '',
      address: this.editaddress ? this.editaddress.trim() : '',
      geo: this.editgeo ? this.editgeo.trim() : '',
      _id: id
    }


    this.loading = true;
    this.updateSubs = this.api.LocationUpdate(id, params, this.ORG_ID).subscribe(res => {
      this.isRerender = true;
      this.cancel();
      this.apiLoader();
      this.editOnValue = undefined;
      this.commonOrgService.closeAlert();
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );

  }
  updateCancel() {
    this.editOnValue = undefined;
  }


  export() {
    let name = this.commonFunctionsService.generateExportName('location_file_export', true);
    this.exportSubs = this.api.Export('locations', this.ORG_ID).subscribe((res: any) => {
      this.exportData = this.exportProcess(res);
      if (this.exportData && this.exportData.length) {
        this.exportExcel.downLoadCSV(name, this.exportData);
      } else {
        this.exportExcel.downLoadCSV(name, [this.empty]);
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  exportPdf() {
    // this.exportSubs =  this.api.Export('locations', this.ORG_ID).subscribe((res: any) => {
    //   let name = this.commonFunctionsService.generateExportName('location');
    //   let exportData = this.api.exportProcess(res);
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

    //   let colAlignment = {};
    //   headerArray.forEach((obj, i) => {
    //     colAlignment[i] = { cellWidth: (i == 1) ? '20' : 'wrap' }
    //   });

    //   doc.autoTable({
    //     margin: { top: 0, right: 0, bottom: 0, left: 0 },
    //     pageBreak: 'auto',
    //     theme: 'striped',
    //     head: [headerArray],
    //     body: bodyData,
    //     columnStyles: colAlignment
    //   })

    //   doc.save(`${name}.pdf`);
    // }, (err: HttpErrorResponse) => {
    //   this.pageErrorHandle(err);
    // });
  }

  cancelImport() { }

  fullImportUpload() {
    this.infoTitle = this.language.fullImport;
    this.infoBody = this.language.fullImportPrompt;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.importModal, { backdrop: 'static', keyboard: false });
  }

  proceedImport() {
    this.closeModal();
    $("#fullImportUpload").click();
  }



  fullImport(file, full: boolean) {
    this.isFullImport = full;
    this.dataTablecreatorService.generateJsonFromCsv(file);

  }

  incrementalImport() {
    this.isFullImport = false;

  }

  submitImport(isDryRun = false) {

    let importParams = {
      clientIP: this.storageData["clientIp"],
      dry_run: isDryRun,
      full_import: this.isFullImport,
      import_data: [],
      orgId: this.ORG_ID ? this.ORG_ID : 50,
      userId: this.sso.getUserId()
    }

    let deleteObj = [], data = this.api.importDataProcess(this.recreateTable, this.isFullImport, isDryRun, importParams.orgId);
    if (isDryRun) {
      this.enableImportSubmit = false;
      const dataLength = data.length;
      this.locationData.forEach(existingObj => {
        let isAvailable = false;
        for (let i = 0; i < dataLength; i++) {
          if (existingObj.name == data[i].name) {
            isAvailable = true;
            if (this.isFullImport) {
              data[i]["action"] = "Create";
              this.importUpdateASCreate.push(existingObj);
            } else {
              data[i]["action"] = "Update";
            }
          }

        }
        if (!isAvailable && this.isFullImport) {
          const tempObj = Object.assign({}, existingObj);
          deleteObj.push(this.importTemplate(tempObj, "Delete"));
        }
      });
    } else {
      data = data.filter(obj => {
        if (["Create", "Update"].includes(obj.action)) return obj;
      });
      if (data.length == 0) {
        this.cancel();
        return;
      }
    }

    if (!data.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }

    importParams.import_data = data;

    this.importSubs = this.api.importLocationSubnets(importParams, this.ORG_ID).subscribe((res: any) => {
      if (isDryRun) {
        res = res.map(obj => {
          obj["action"] = obj["validationResult"].toLowerCase() == "ok" ? obj["action"] : obj["validationResult"];
          if (obj["validationResult"].toLowerCase() == "ok") {
            this.enableImportSubmit = true;
          }
          return obj;
        });
        this.recreateTable = res;
        this.previewOrder([...res, ...deleteObj]);
        this.buttonVisible = false;
        this.tablePreview = true;
      } else {
        this.isRerender = true;
        this.apiLoader();
        this.cancel();
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 400) {
        if (isDryRun) {
          this.infoTitle = this.language.objectNotFound;
          this.infoBody = '';
          this.closeModal();
          this.modalRef = this.dialogService.open(this.infoModal);
        } else {
          this.pageErrorHandle(err);
        }

        this.loading = false;
      } else {
        this.pageErrorHandle(err);
      }
    });
  }

  importTemplate(element, action) {
    return {
      subnetsV4: element.subnetsV4,
      subnetsV6: element.subnetsV6,
      region: element.region,
      address: element.address,
      action: action,
      geo: element.geo,
      name: element.name,
      orgId: this.ORG_ID
    }
  }

  previewOrder(res) {
    if (!res || res.length == 0) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }
    let previewData = [];
    const streamInputCheck = [""], keysToExclude = ["validationResult"], keysWithoutOld = ["action", "name"];
    //this.importTableOptions.columns = this.dataTablecreatorService.tableOptionsCreator(res[0], this.language, keysToExclude, keysWithoutOld);
    res.forEach(resObj => {
      let newObj = {};
      Object.keys(resObj).forEach(keys => {
        if (!keysToExclude.includes(keys)) {
          if (streamInputCheck.includes(keys) && (resObj[keys] === "true" || resObj[keys].toString().toUpperCase == 'Y')) newObj[keys] = 'Yes';
          else if (streamInputCheck.includes(keys) && (resObj[keys] === "false" || resObj[keys].toString().toUpperCase == 'N')) newObj[keys] = 'No';
          else newObj[keys] = resObj[keys];
          if (!keysWithoutOld.includes(keys)) newObj['Old ' + keys] = '';
        }
      });
      this.locationData.forEach(tableObj => {
        if (resObj.name == tableObj.name) {
          for (const [key, value] of Object.entries(newObj)) {
            if (key.includes("Old")) {
              const exactKey = key.replace("Old ", "");
              if (streamInputCheck.includes(exactKey) && (tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'Y')) newObj[key] = 'Yes';
              else if (streamInputCheck.includes(exactKey) && (!tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'N')) newObj[key] = 'No';
              newObj[key] = tableObj[exactKey]
            }
          }
          if (newObj["action"] == "Create") newObj["action"] = "Update";
          return false;
        }
      });
      previewData.push(newObj);
    });
    this.previewTableBody = previewData;
  }

  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete location?'];
    this.infoBody = `${item.name}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }
  confirmDelete() {
    let id = this.deleteData._id;
    this.loading = true;
    this.deleteSubs = this.api.LocationDelete(id, this.ORG_ID).subscribe((res: any) => {
      this.isRerender = true;
      this.apiLoader();
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
      this.deviceIps.push(item.name);

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

  }

  selectDeselectAll(isChecked) {


    this.deleteIds = [];
    this.deviceIps = [];

    let i = 0;
    let tot = $('input[name^="delete_id_"]').length;
    var that = this;
    if (isChecked) {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', true);

        var classes = $(this).attr('class').split(' ');
        let id = classes[0].substring('delete_id_'.length);
        let d = that.locationData.filter((el) => el._id === id);
        that.deleteIds.push(id);
        that.deviceIps.push(d[0].name);
        i++;
      });
    } else {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.deviceIps = [];
        i++;
      });
    }

  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.deviceIps = [];
    this.selectDeselectAll(true);
  }

  deleteAllSelected() {

    if (this.deviceIps) {
      this.infoTitle = this.language[this.deviceIps.length === 1 ? 'Delete selected location?' : 'Delete selected locations?'];
      this.infoBody = this.deviceIps.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }

  }



  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.loading = true;
    this.deleteIds.forEach(id => {
      deleteCalls.push(this.api.LocationDelete(id, this.ORG_ID));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.deviceIps = [];
        this.isRerender = true;
        this.apiLoader();

        this.closeMultiDeleteModal();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deviceIps = [];
    this.closeModal();
  }


  reset() {
    this.createSubnetName = undefined;
    this.createSubnetsV4 = [];
    this.createSubnetsV6 = [];
    this.createSubnetV4 = '';
    this.createSubnetV6 = '';
    this.createSubnetRegion = undefined;
    this.createSubnetAddress = undefined;
    this.createGeo = undefined;
  }

  cancel() {
    this.formVisible = false
    this.buttonVisible = true;
    this.tablePreview = false;
    this.reset();
  }

  showError(title: string, message: string) {
    this.infoTitle = title;
    this.infoBody = message;
    this.openInfoModal(false);
  }

  validateSubnet(subnet: string) {
    if (!subnet) {
      return false;
    }
    let ip = this.commonFunctionsService.trimSubnet(subnet);
    if (ip && (this.commonFunctionsService.isValidSubnetV4(ip) || this.commonFunctionsService.isValidSubnetV6(ip))) {
      return true;
    }
    return false;
  }

  splitSubnets(subnets: any) {
    this.IP4s = [];
    this.IP6s = [];
    subnets.forEach(e => {
      let ip = e.trim();
      if (this.commonFunctionsService.isValidSubnetV4(ip)) {
        this.IP4s.push(ip);
      } else {
        this.IP6s.push(ip);
      }
    });
  }

  subnetValidatorIpv4(ip: string) {
    if (ip && ip != '') {
      if (this.commonFunctionsService.isValidSubnetV4(ip)) {
        return true;
      } else {
        return false;
      }
    }
  }
  subnetValidatorIpv6(ip: string) {
    if (ip && ip != '') {
      if (this.commonFunctionsService.isValidSubnetV6(ip)) {
        return true;
      } else {
        return false;
      }
    }
  }


  addEditSubnet(ver: string) {
    if (ver == 'ip4') {
      this.editSubnet4 = this.editSubnet4.trim();
      if (this.editSubnet4 == '') {
        this.infoTitle = this.language['Subnet cannot be empty'];
        this.infoBody = ``;
        this.openInfoModal(false);
        return;
      }

      if (!this.subnetValidatorIpv4(this.editSubnet4)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Invalid CIDR format";
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets4.includes(this.editSubnet4)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Duplicate Subnet";
        this.openInfoModal(false);
        return;

      }
      this.editSubnets4.push(this.editSubnet4);
      this.editSubnet4 = '';


    } else {
      this.editSubnet6 = this.editSubnet6.trim();
      if (this.editSubnet6 == '') {
        this.infoTitle = this.language['Subnet cannot be empty'];
        this.infoBody = ``;
        this.openInfoModal(false);
        return;
      }

      if (!this.subnetValidatorIpv6(this.editSubnet6)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Invalid CIDR format";
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets6.includes(this.editSubnet6)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Duplicate Subnet";
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

  validateSubnetEdit() {


    this.editSubnet4 = this.editSubnet4 ? this.editSubnet4.trim() : '';
    this.editSubnet6 = this.editSubnet6 ? this.editSubnet6.trim() : '';
    this.IP4s = [];
    this.IP6s = [];

    if ((this.editSubnet4 == '' && !this.editSubnets4.length) && (this.editSubnet6 == '' && !this.editSubnets6.length)) {
      return false;
    }
    this.IP4s = this.editSubnets4 ? this.editSubnets4 : [];
    this.IP6s = this.editSubnets6 ? this.editSubnets6 : [];

    if (this.editSubnet4 != '') {
      if (!this.subnetValidatorIpv4(this.editSubnet4)) {
        return false
      }
      this.IP4s = [this.editSubnet4, ...this.IP4s];
    }

    if (this.editSubnet6 != '') {
      if (!this.subnetValidatorIpv6(this.editSubnets6)) {
        return false
      }
      this.IP6s = [this.editSubnet6, ...this.IP6s];
    }
    return true;

  }



  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
      this.importTableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
      this.importTableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
      this.importTableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
      delete this.importTableOptions.language;
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deviceIps = [];
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    this.infoTitle = "Error";
    if (err.status == 400) {
      // this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoBody = this.commonOrgService.pageErrorHandle(err);
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

  openInfoModal(invalidImportLocation: boolean) {
    if (!invalidImportLocation) {
      this.invalidImportLocationAddress = [];
      this.invalidImportLocationGeo = [];
      this.invalidImportLocationRegion = [];
      this.invalidImportLocationName = [];
    }

    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('locations', url);
  }

  showEditSubnetInput(ind, type) {

    this.modifySubnetInfo = {
      index: ind,
      type: type
    };
    this.newEditSubnetError = '';
    this.newEditSubnet = (type == 'ip4') ? this.editSubnets4[ind] : this.editSubnets6[ind];
  }

  hideEditSubnetInput() {
    this.modifySubnetInfo = {
      index: undefined,
      type: undefined
    };
  }

  modifyEditSubnet() {
    let ver = this.modifySubnetInfo.type;
    let index = this.modifySubnetInfo.index;
    if (ver == 'ip4') {
      this.newEditSubnet = this.newEditSubnet.trim();
      if (this.newEditSubnet == '') {
        this.infoTitle = this.language['Subnet cannot be empty'];
        this.infoBody = ``;
        this.openInfoModal(false);
        return;
      }

      if (!this.subnetValidatorIpv4(this.newEditSubnet)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Invalid CIDR format";
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets4.includes(this.newEditSubnet) && this.editSubnets4.indexOf(this.newEditSubnet) != index) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Duplicate Subnet";
        this.openInfoModal(false);
        return;

      }

      this.editSubnets4[this.modifySubnetInfo.index] = this.newEditSubnet;
      this.newEditSubnet = '';


    } else {
      this.newEditSubnet = this.newEditSubnet.trim();
      if (this.newEditSubnet == '') {
        this.infoTitle = this.language['Subnet cannot be empty'];
        this.infoBody = ``;
        this.openInfoModal(false);
        return;
      }

      if (!this.subnetValidatorIpv6(this.newEditSubnet)) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Invalid CIDR format";
        this.openInfoModal(false);
        return;
      }

      if (this.editSubnets6.includes(this.newEditSubnet) && this.editSubnets6.indexOf(this.newEditSubnet) != index) {
        this.infoTitle = 'Invalid request';
        this.infoBody = "Duplicate Subnet";
        this.openInfoModal(false);
        return;

      }
      this.editSubnets6[this.modifySubnetInfo.index] = this.newEditSubnet;
      this.newEditSubnet = '';
    }

    this.hideEditSubnetInput();
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
  exportProcess(res: any) {
    let exports = [];
    res.forEach(obj => {
      exports.push({
        'Name': obj.name ? obj.name : '',
        'SubnetsV4': obj.subnetsV4 ? obj.subnetsV4 : '',
        'SubnetsV6': obj.subnetsV6 ? obj.subnetsV6 : '',
        'Region': obj.region ? obj.region : '',
        'Address': obj.address ? obj.address : '',
        'Geo': obj.geo ? obj.geo : ''
      });
    });
  
    const translatedExports = exports.map(obj => {
      const translatedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let translatedKey;
          switch (key) {
            case 'Name':
              translatedKey = this.language['Name'] || key;
              break;
            case 'SubnetsV4':
              translatedKey = this.language['SubnetsV4'] || key;
              break;
            case 'SubnetsV6':
              translatedKey = this.language['SubnetsV6'] || key;
              break;
            case 'Region':
              translatedKey = this.language['region'] || key;
              break;
            case 'Address':
              translatedKey = this.language['Address'] || key;
              break;
            case 'Geo':
              translatedKey = this.language['geo'] || key;
              break;
            default:
              translatedKey = key;
          }
          translatedObj[translatedKey] = obj[key];
        }
      }
      return translatedObj;
    });
  
    return translatedExports;
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
