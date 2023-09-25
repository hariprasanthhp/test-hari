declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { isArray, data } from 'jquery';
import { ExportExcelService } from '../../../../shared/services/export-excel.service';
import { DataTablecreatorService } from '../../../services/data-tablecreator.service';
// import { CustomTranslateService } from '../../../shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthService } from '../../../shared/services/auth.service';
//import * as jsPDF from "jspdf"; // For PDF DOWNLOAD
//import 'jspdf-autotable'; // For PDF DOWNLOAD
import { CommonFunctionsService } from '../../../services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetworkDevicesApiService } from '../../../services/network-devices-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-devices-configuration',
  templateUrl: './devices-configuration.component.html',
  styleUrls: ['./devices-configuration.component.scss']
})
export class DevicesConfigurationComponent implements OnInit {
    @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
    @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
    @ViewChild('multiDeleteModal', { static: false }) private multiDeleteModal: TemplateRef<any>;
    @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
    infoTitle: string = '';
    infoBody: string = '';
  
    language: any;
  
    formVisible: boolean = false;
    editOnValue: any;
    editData: any;
    buttonVisible: boolean = true;
    dataAvailable: boolean = false;
    showingDeviceIp: any;
    showingDeviceIpv6: any = undefined || null;
    selectOptions = [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
    flowType = [
      { name: 'netflow' },
      { name: 'cflow' },
      { name: 'sflow' },
    ]
    importTableOptions: DataTables.Settings = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [0, 'asc'],
      "scrollX": true,
      dom: 'tipr', 
    };
    statusTableOptions:DataTables.Settings = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    previewTableBody;
    previewTableHeader;
    tablePreview: boolean = false;
  
    currentTableRowCount = 0;
  
    tableOptions: DataTables.Settings = {
      pagingType: 'full_numbers',
      pageLength: 10,
      rowId: '_id',
      //"dom": '<"top"i>rt<"bottom"flp><"clear">',
      "scrollX": true,
      stateSave: false,
      order: [1, 'asc'],
      columnDefs: [
        { targets: [0], orderable: false },
      ],
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
    deviceData: any = [];
  
    name: string;
    hostName: string;
  
    deviceIP: any;
    deviceIP6: any;
    deviceIPError: boolean = false;
    deviceIP6Error: boolean = false;
    deviceIPErrorMsg: any;
    deviceIPV4: any;
    deviceIPV6: any;
    ipv4: string;
    ipv6: string;
  
    ignoreUpStream: boolean = false;
  
    ignoreDownStream: boolean = false;
  
    ignoreLocal: boolean = false
  
    samplingLimit: any;
    samplingLimitError: boolean = false;
    samplingLimitErrorMsg: any;
  
    geoCoordinate: any;
    geoCoordinateError: boolean = false;
    geoCoordinateErrorMsg: any;
  
    address: any;
    addressError: boolean = false;
    addressErrorMsg: any;
    // CCL-37642 & CCL-39112
    // observationDomain: string = '';
    // editObservationDomain: string = '';
  
    validation: boolean = false;
    private empty = {
      'Device IPv4': '',
      'Device IPv6': '',
      'Sampling': '',
      'Receiving Port': '',
      'Ignore Upstream': '',
      'Ignore Downstream': '',
      'Host Name': '',
      'Ignore Local': '',
      'Name': '',
      /* CCL-42554 */
      // orgId: '',
      // tenantId: '',
      'Rate Limit': '',
      // CCL-37642 & CCL-39112
      // observationId: '',
      'Flow Type': ''
    };
    rowId: any;
    loading = true;
  
  
    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: DataTables.Settings = {};
  
    dtTrigger: Subject<any> = new Subject();
    isRerender = false;
  
    editName: string;
    editHostName: string;
    // editDeviceIP: string;
    editDeviceIPV4: any;
    editDeviceIPV6: any;
    editIgnoreUpStream: boolean = false;
    editIgnoreDownStream: boolean = false;
    editIgnoreLocal: boolean = false;
    editSamplingLimit: number;
    editGeoCoordinate: any;
  
    ORG_ID: string;
    sortColumn: number;
    sortType: string;
    frTable: any;
    translateSubscribe: any;
    loaded: boolean;
    previewHeaderValue;
    recreateTable;
    storageData = {};
    subscription;
  
    error: boolean;
    success: boolean;
    errorInfo: string = '';
    successInfo: string = '';
    modalRef: any;
    deviceListSubs: any;
    deviceAddSubs: any;
    deviceUpdateSubs: any;
    deviceDeleteSubs: any;
    deviceExportSubs: any;
    deviceImportSubs: any;
    enableImportSubmit: boolean;
    importUpdateASCreate: any = [];
    sortData = {
      column: 1,
      type: 'asc'
    }
    MODULE: string;
  
    private columnName = {
      deviceIpV4: 'Device IPv4',
      deviceIpV6: 'Device IPv6',
      samplingRate: 'Sampling',
      receivingPort: 'Receiving Port',
      ignoreUpstream: 'Ignore Upstream',
      ignoreDownstream: 'Ignore Downstream',
      hostName: 'Host Name',
      ignoreInternal: 'Ignore Local',
      name: 'Name',
      /* CCL-42554 */
      // orgId: 'Org Id',
      // tenantId: 'Tenant Id',
      rateLimit: 'Rate Limit',
    };
    public invalidImportDevice = [];
    exportColoumnNames:any;
    constructor(
      private commonFunctionsService: CommonFunctionsService,
      private api: NetworkDevicesApiService,
      private exportExcel: ExportExcelService,
      // private elementRef: ElementRef,
      private dataTablecreatorService: DataTablecreatorService,
      // private customTranslateService: CustomTranslateService,
      private translateService: TranslateService,
      private router: Router,
      private sso: SsoAuthService,
      private dialogService: NgbModal,
      private commonOrgService: CommonService,
      private titleService: Title,
      private common:common
    ) {
      
      this.language = this.translateService.defualtLanguage;
      this.exportColoumnNames={
        deviceIpV4:  this.language['deviceipv4'],
        deviceIpV6:  this.language['deviceipv6'],
        samplingRate:  this.language['sampling'],
        receivingPort:  this.language['receivingport'],
        ignoreUpstream:  this.language['ignoreUpstream'],
        ignoreDownstream: this.language['ignoreDownstream'],
        hostName: this.language['Host_Name'],
        ignoreInternal: 'Ignore Local' ,
        name:  this.language['Name'],
        /* CCL-42554 */
        // orgId: 'Org Id',
        // tenantId: 'Tenant Id',
        rateLimit:this.language['rateLimit'],
      }
      this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
        this.language = data;
        this.reloadCurrentRoute();
        this.exportColoumnNames={
          deviceIpV4:  this.language['deviceipv4'],
          deviceIpV6:  this.language['deviceipv6'],
          samplingRate:  this.language['sampling'],
          receivingPort:  this.language['receivingport'],
          ignoreUpstream:  this.language['ignoreUpstream'],
          ignoreDownstream: this.language['ignoreDownstream'],
          hostName: this.language['Host_Name'],
          ignoreInternal: 'Ignore Local',
          name:  this.language['Name'],
          /* CCL-42554 */
          // orgId: 'Org Id',
          // tenantId: 'Tenant Id',
          rateLimit:this.language['rateLimit'],
        }
        this.dataAvailable = false;
        this.isRerender = true;
        this.titleService.setTitle(`${this.language.Configuration} - ${this.language['devices']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
       this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
       
        this.tableCreator('language');
      });
      this.commonOrgService.closeAlert();
  
      let url = this.router.url;
      this.frTable = this.translateService.fr;
      this.ORG_ID = this.sso.getOrganizationID(url);
      this.MODULE = this.sso.getRedirectModule(url);
  
      this.titleService.setTitle(`${this.language.Configuration} - ${this.language['devices']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${this.MODULE === 'systemAdministration' ?
       this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  
    }
  
    ngOnInit() {
      this.apiLoader();
      this.tableLanguageOptions();
      const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
      this.storageData["clientIp"] = tokenData?.clientIp;
      this.storageData["UserId"] = tokenData?.UserId;
  
      this.subscription = this.dataTablecreatorService.tableOptionsData.subscribe((res: any) => {
        this.invalidImportDevice = []
        try {
          let importValidationFlag = true;
          (res || []).forEach(el => {
            this.commonFunctionsService.keysFromColumnName(el, this.exportColoumnNames)
            if (el.name.length && el.name.length > 64) {
              this.invalidImportDevice.push(el)
              this.infoTitle = this.language['Invalid Value'];
              this.infoBody = `${this.language['Invalid Device Name']} - Name should not exceed 64 characters.`;
              importValidationFlag = false;
              this.openInfoModal(true);
              return;
            }
            if (el.samplingRate) {
              this.samplingRateValidator(Number(el.samplingRate));
              if (this.samplingLimitError) {
                this.infoTitle = this.language['Invalid value'];
                this.infoBody = this.language['The sampling rate should be an integer value greater than 0 and less than 65536.'];
                importValidationFlag = false;
                this.openInfoModal(false);
                return;
              }
            }
          })
          if (importValidationFlag) {
            this.recreateTable = res;
            this.importSubmit(true);
          }
        } catch (ex) {
        }
      });
  
      this.closeAlert();
      this.removeState();
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
      if (this.deviceListSubs) {
        this.deviceListSubs.unsubscribe();
      }
      if (this.deviceAddSubs) {
        this.deviceAddSubs.unsubscribe();
      }
      if (this.deviceUpdateSubs) {
        this.deviceUpdateSubs.unsubscribe();
      }
      if (this.deviceDeleteSubs) {
        this.deviceDeleteSubs.unsubscribe();
      }
      if (this.deviceExportSubs) {
        this.deviceExportSubs.unsubscribe();
      }
      if (this.deviceImportSubs) {
        this.deviceImportSubs.unsubscribe();
      }
    }
  
  
    apiLoader() {
      this.deviceListSubs = this.api.DeviceList(this.ORG_ID).subscribe((res: any) => {
        this.deviceData = [...res];
        if (this.deviceData) {
          this.deviceData = this.dataConvertor(this.deviceData);
          this.deviceData = [...this.deviceData];
          this.tableCreator();
  
          if (this.isRerender) {
            this.rerender();
            this.isRerender = false;
          } else {
            this.dtTrigger.next();
            this.loading = false;
          }
          setTimeout(() => {
            this.resetDelete();
          }, 100);
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
  
        this.deviceData = [];
        this.tableCreator();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
          this.loading = false;
        }
  
      });
    }
  
    dataConvertor(array) {
      let check = isArray(array);
      if (check) {
        array.forEach(el => {
          let deviceIp = el.deviceIpV4 == null || el.deviceIpV4 == '' ? (el.deviceIpV6 == null || el.deviceIpV6 == '' ? '' : el.deviceIpV6) : el.deviceIpV4;
          let hostName = el.hostName == null || el.deviceIpV4 == '' ? '' : el.hostName;
          el.deviceIp = deviceIp;
          el['address'] = el.address ? el.address : '';
          el['flowType'] = el.flowType ? el.flowType : '';
          el['observationName'] = '';
        });
      }
      return array;
    }
  
    tableCreator(type?: string) {
      let that = this;
      this.tableOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        rowId: '_id',
        "scrollX": true,
        stateSave: false,
        order: [that.sortData.column, that.sortData.type],
        columnDefs: [
          { targets: [0], orderable: false },
        ],
        drawCallback: (settings) => {
          let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 1;
          let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'asc';
          that.sortData = {
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
            $(settings.nTableWrapper).find('#device-table_last').addClass('disabled');
          } else {
            $(settings.nTableWrapper).find('#device-table_last').removeClass('disabled');
          }
        }
      };
      this.tableLanguageOptions();
  
      if (type && type == 'language') {
        setTimeout(() => {
          this.dataAvailable = true;
          this.rerender();
        }, 200);
      } else {
        setTimeout(() => {
          this.dataAvailable = true;
          this.loading = false;
        }, 500);
      }
  
    }
  
  
    tableLanguageOptions() {
      if (this.language.fileLanguage == 'fr') {
        this.tableOptions.language = this.frTable;
        this.importTableOptions.language =this.frTable;
      } else if (this.language.fileLanguage == 'es') {
        this.tableOptions.language = this.translateService.es;
        this.importTableOptions.language = this.translateService.es;
      } else if (this.language.fileLanguage == 'de_DE') {
        this.tableOptions.language = this.translateService.de_DE;
        this.importTableOptions.language = this.translateService.de_DE;
      } else if (this.language.fileLanguage == 'en' && this.tableOptions.language || this.language.fileLanguage == 'en' && this.importTableOptions.language) {
        delete this.tableOptions.language;
        delete this.importTableOptions.language;
      }
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
  
    search(term: string) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.search(term).draw();
      });
    }
  
    create() {
      this.buttonVisible = false;
      this.formVisible = true
  
    }
  
    submit() {
      this.validation = false;
      this.deviceIPError = false;
      this.deviceIP6Error = false;
      this.ipv4 = undefined;
      this.ipv6 = undefined;
      this.name = this.name ? this.name.trim() : ''
      if (this.name.length && this.name.length > 64) {
        this.infoTitle = this.language['Invalid Value'];
        this.infoBody = `${this.language['Invalid Device Name']} - Name should not exceed 64 characters.`;
        this.openInfoModal(false);
        return;
      }
      if (this.deviceIPV4) {
        this.deviceIpValidatorIpv4(this.deviceIPV4);
      }
      if (this.deviceIPV6) {
        this.deviceIpValidatorIpv6(this.deviceIPV6);
      }
      if (this.deviceIPError || this.deviceIP6Error || (!this.deviceIPV4 && !this.deviceIPV6)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Invalid IP address'];
        this.openInfoModal(false);
        return;
      }
      this.samplingRateValidator(this.samplingLimit);
      if (this.samplingLimitError) {
        this.infoTitle = this.language['Invalid value'];
        this.infoBody = this.language['The sampling rate should be an integer value greater than 0 and less than 65536.'];
        /* if (this.samplingLimit) {
          this.infoBody = 'Invalid Sampling rate value';
        } else {
          this.infoBody = this.language['Sampling rate must be in digits'];
        } */
        this.openInfoModal(false);
        return;
      }
  
      let reqBodyObj = {
        deviceIpV4: this.ipv4 ? this.ipv4 : '',
        deviceIpV6: this.ipv6 ? this.ipv6 : '',
        ignoreDownstream: this.ignoreDownStream,
        ignoreInternal: this.ignoreLocal,
        ignoreUpstream: this.ignoreUpStream,
        // orgId: +localStorage.getItem('calix.org_id'),
        orgId: this.ORG_ID ? this.ORG_ID : 50,
        samplingRate: +this.samplingLimit,
        //hostName: this.hostName ? this.hostName.trim() : '',
        name: this.name ? this.name.trim() : '',
        // CCL-37642 & CCL-39112
        // observationId: this.observationDomain ? this.observationDomain.trim() : '',
        rateLimit: 0,
        receivingPort: 2058, /* CCL-43538 */
        tenantId: 0,
        address: this.address ? this.address.trim() : ''
      }
  
      this.loading = true;
      this.deviceAddSubs = this.api.DeviceAdd(reqBodyObj, this.ORG_ID)
        .subscribe((res: any) => {
          this.isRerender = true;
          this.cancel();
          this.apiLoader();
        }, (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
        });
  
    }
  
    cancel() {
      this.formVisible = false
      this.buttonVisible = true;
      this.tablePreview = false;
      this.reset();
    }
  
    edit(item) {
      this.editData = item;
      this.editOnValue = item._id;
      this.editName = item.name ? item.name : '';
      this.editHostName = item.hostName ? item.hostName : '';
      this.editDeviceIPV4 = item.deviceIpV4;
      this.editDeviceIPV6 = item.deviceIpV6;
      this.editIgnoreUpStream = item.ignoreUpstream ? true : false;
      this.editIgnoreDownStream = item.ignoreDownstream ? true : false;
      this.editIgnoreLocal = item.ignoreInternal ? true : false;
      this.editSamplingLimit = item.samplingRate;
      this.editGeoCoordinate = item.tenantId;
  
      let ip = item.deviceIpV4 ?? item.deviceIpV6;
      if (this.deleteIds.indexOf(item._id) !== -1) {
        this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
        this.deviceIps.splice(this.deviceIps.indexOf(ip), 1);
  
        this.deleteDevices = this.deleteDevices.filter((obj) =>
          obj._id !== item._id
        );
        let tot = $('input[name^="delete_device_id"]').length;
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
        // CCL-37642 & CCL-39112
        // this.editObservationDomain = item.observationId;
  
      }
    }
  
    updateSave() {
      this.deviceIPError = false;
      this.deviceIP6Error = false;
      this.ipv4 = "";
      this.ipv6 = "";
      // this.deviceIpValidator(this.editDeviceIP);
      this.editDeviceIPV6 = this.editDeviceIPV6 ? this.editDeviceIPV6.trim() : "";
      this.editDeviceIPV4 = this.editDeviceIPV4 ? this.editDeviceIPV4.trim() : "";
      this.editName = this.editName ? this.editName.trim() : "";
      if (this.editName.length && this.editName.length > 64) {
        this.infoTitle = this.language['Invalid Value'];
        this.infoBody = `${this.language['Invalid Device Name']} - Name should not exceed 64 characters.`;
        this.openInfoModal(false);
        return;
      }
      if (this.editDeviceIPV6) this.deviceIpValidatorIpv6(this.editDeviceIPV6);
      if (this.editDeviceIPV4) this.deviceIpValidatorIpv4(this.editDeviceIPV4);
      if (this.deviceIPError || this.deviceIP6Error || (!this.editDeviceIPV4 && !this.editDeviceIPV6)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Invalid IP address'];
        this.closeModal();
        this.modalRef = this.dialogService.open(this.infoModal);
        return;
      }
  
  
      this.samplingRateValidator(this.editSamplingLimit);
      if (this.samplingLimitError) {
        this.infoTitle = this.language['Invalid value'];
        this.infoBody = this.language['The sampling rate should be an integer value greater than 0 and less than 65536.'];
        /* if (this.editSamplingLimit) {
          this.infoBody = 'Invalid Sampling rate value';
        } else {
          this.infoBody = this.language['Sampling rate must be in digits'];
        } */
        this.openInfoModal(false);
        return;
      }
  
      let reqBodyObj = {
        _id: this.editData._id,
        deviceIpV4: this.ipv4 ? this.ipv4 : '',
        deviceIpV6: this.ipv6 ? this.ipv6 : '',
        ignoreDownstream: this.editIgnoreDownStream,
        ignoreInternal: this.editIgnoreLocal,
        ignoreUpstream: this.editIgnoreUpStream,
        // orgId: +localStorage.getItem('calix.org_id'),
        orgId: this.ORG_ID ? this.ORG_ID : 50,
        samplingRate: +this.editSamplingLimit,
        //hostName: this.editHostName ? this.editHostName.trim() : '',
        name: this.editName ? this.editName.trim() : '',
        // CCL-37642 & CCL-39112
        // observationId: this.editObservationDomain ? this.editObservationDomain.trim() : '',
        rateLimit: 0,
        receivingPort: this.editData.receivingPort ? this.editData.receivingPort : 0,
        tenantId: 0,
        flowType: this.editData.flowType ? this.editData.flowType : ""
      }
      this.loading = true;
      this.deviceUpdateSubs = this.api.DeviceUpdate(this.editData._id, reqBodyObj, this.ORG_ID).subscribe(res => {
        this.isRerender = true;
        this.apiLoader();
        this.cancel();
        this.editOnValue = undefined;
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      })
  
    }
  
    updateCancel() {
      this.editOnValue = undefined;
    }
  
    hideShow(id) {
  
      if (this.showingDeviceIp == id) {
        this.showingDeviceIp = undefined;
      } else {
        this.showingDeviceIp = id;
      }
    }
  
    hideShowV6(id) {
      if (this.showingDeviceIpv6 == id) {
        this.showingDeviceIpv6 = undefined;
      } else {
        this.showingDeviceIpv6 = id;
      }
    }
  
    deleteData: any;
    delete(item) {
      let ip = '';
      if (item.deviceIpV4) {
        ip = item.deviceIpV4;
      } else {
        ip = item.deviceIpV6;
      }
      this.deleteData = item;
      item.name = item.name ? this.strSub(item.name) : '';
      item.hostName = item.hostName ? this.strSub(item.hostName) : '';
      this.infoTitle = this.language['Delete device?'];
      //this.infoBody = `<tr><td>${item.name}</td><td>&nbsp;</td><td>${ip}</td><td>&nbsp;</td><td>${item.hostName}</td></tr>`;
  
      this.closeModal();
      this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  
    }
  
    confirmDelete() {
      let id = this.deleteData._id;
      this.loading = true;
      this.closeModal();
      this.deviceDeleteSubs = this.api.DeviceDelete(id, this.ORG_ID).subscribe((res: any) => {
        this.deleteIds = [];
        this.deviceIps = [];
        this.deleteDevices = [];
  
        this.isRerender = true;
        this.apiLoader();
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
  
      });
    }
  
    cancelDelete() {
      this.deleteData = undefined;
      this.closeModal();
    }
  
    deleteIds = [];
    deviceIps = [];
    deleteDevices = [];
  
    getDeleteIds(e: any, item: any): any {
      var that = this;
      let ip = '';
      if (item.deviceIpV4) {
        ip = item.deviceIpV4;
      } else {
        ip = item.deviceIpV6;
      }
  
      let deleteDevices = this.deleteDevices;
  
      if (e.target.checked) {
  
        if (this.deleteIds.indexOf(item._id) === -1) {
          this.deleteIds.push(item._id);
          this.deviceIps.push(ip);
  
          // let obj: any = {};
          // obj['id'] = item;
          this.deleteDevices.push(item);
  
          let tot = $('input[name^="delete_device_id"]').length;
          if (this.deleteIds.length == tot) {
            $('#selectDeselectAll').prop('checked', true);
            $('#selectDeselectAll-span').hide();
          } else {
            $('#selectDeselectAll-span').show();
          }
        }
  
      } else {
        this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
        this.deviceIps.splice(this.deviceIps.indexOf(ip), 1);
  
        deleteDevices = deleteDevices.filter(function (obj) {
          return obj['_id'] !== item._id;
        });
        this.deleteDevices = deleteDevices;
  
  
        let tot = $('input[name^="delete_device_id"]').length;
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
      let i = 0;
      let tot = $('input[name^="delete_device_id"]').length;
      var that = this;
  
      that.deleteIds = [];
      that.deviceIps = [];
      that.deleteDevices = [];
  
      if (isChecked) {
        $('input[name^="delete_device_id"]').each(function () {
          if (i >= tot) {
            return false;
          }
          $(this).prop('checked', true);
  
          var classes = $(this).attr('class').split(' ');
          let id = classes[0].substring('delete_device_id_'.length);
          let d = that.deviceData.filter((el) => el._id === id);
          let ip = '';
          if (d[0].deviceIpV4) {
            ip = d[0].deviceIpV4;
          } else {
            ip = d[0].deviceIpV6;
          }
          that.deleteIds.push(id);
          that.deviceIps.push(ip);
          that.deleteDevices.push(d[0]);
  
          i++;
        });
      } else {
        $('input[name^="delete_device_id"]').each(function () {
          if (i >= tot) {
            return false;
          }
          $(this).prop('checked', false);
          that.deleteIds = [];
          that.deviceIps = [];
          that.deleteDevices = [];
          i++;
        });
      }
    }
  
    deleteAllSelected() {
  
      if (this.deviceIps) {
        this.infoTitle = this.language[this.deviceIps.length === 1 ? 'Delete selected device?' : 'Delete selected devices?']; /* CCL-43157 */
        let html = '';
        for (let i = 0; i < this.deviceIps.length; i++) {
          this.deleteDevices[i].name = this.deleteDevices[i].name ? this.strSub(this.deleteDevices[i].name) : '';
          this.deleteDevices[i].hostName = this.deleteDevices[i].hostName ? this.strSub(this.deleteDevices[i].hostName) : '';
          html += `<tr><td>${(this.deleteDevices[i].name && this.deleteDevices[i].name.length > 20) ? this.deleteDevices[i].name.slice(0, 20) + '...' : this.deleteDevices[i].name}</td><td>${this.deviceIps[i]}</td><td>${(this.deleteDevices[i].hostName && this.deleteDevices[i].hostName.length > 20) ? this.deleteDevices[i].hostName.slice(0, 20) + '...' : this.deleteDevices[i].hostName}</td></tr><br>`;
        }
        this.infoBody = html;
        this.closeModal();
        this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
      }
  
    }
  
    confirmDeleteSecleted(): void {
      this.closeModal();
      const deleteCalls: Observable<any>[] = [];
      this.deleteIds.forEach(id => {
        deleteCalls.push(this.api.DeviceDelete(id, this.ORG_ID));
      });
      forkJoin(deleteCalls).subscribe(
        resultArray => {
          this.deleteIds = [];
          this.deviceIps = [];
          this.deleteDevices = [];
  
          this.isRerender = true;
          this.cancel();
          this.apiLoader();
        },
        (err: HttpErrorResponse) => {
          this.pageErrorHandle(err);
        }
      );
    }
  
    showAllInnerCheckBox(event): any {
      $('#' + event.target.id).hide();
      $('#selectDeselectAll').prop("checked", true);
  
      this.deleteIds = [];
      this.deviceIps = [];
      this.deleteDevices = [];
      this.selectDeselectAll(true);
    }
  
  
    resetDelete() {
      this.selectDeselectAll(false);
      $('#selectDeselectAll').prop("checked", false);
      $('#selectDeselectAll-span').hide();
      this.deleteIds = [];
      this.deviceIps = [];
      this.deleteDevices = [];
    }
  
    exportDataConvertor(array) {

      if (Array.isArray(array)) {
        array.forEach(el => {
          for (const key in el) {
            if (typeof el[key] == 'boolean') {
              if (el[key] == true) {
                el[key] = 'Yes'
              } else {
                el[key] = 'No'
              }
            }
          }
  
          el = this.commonFunctionsService.columnNameFromKeys(el, this.exportColoumnNames);
          // el.deviceIp = el.deviceIpV6 == null ? el.deviceIpV4 : el.deviceIpV6;
          // delete el.deviceIpV6
          // delete el.deviceIpV4
          // delete el.hostName
          // delete el.name
          delete el.flowType /* CCL-44460 */
          delete el.observationId
          delete el.orgId /* CCL-42554 */
          // delete el.receivingPort
          delete el.tenantId /* CCL-42554 */
          delete el._id
        });
      }
      return array;
    }
  
    export() {
      this.deviceExportSubs = this.api.Export('devices', this.ORG_ID).subscribe((res: any) => {
        let name = this.commonFunctionsService.generateExportName('device_file_export', true);
        let exportData = this.exportDataConvertor(res);
        if (exportData.length) {
          this.exportExcel.downLoadCSV(name, exportData);
        } else {
          this.exportExcel.downLoadCSV(name, [this.empty]);
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      })
  
    }
  
    /*
  
    //EXPORT PDF PROCESS
    exportPdf() {
      this.api.Export('devices', this.ORG_ID).subscribe((res: any) => {
        let name = this.commonFunctionsService.generateExportName('device');
        let exportData = this.exportDataConvertor(res);
        const doc = new jsPDF('l');
        //doc.addPage('a3', 'portrait');
        let headerArray = [], bodyData = [];
        exportData.forEach(obj => {
          for (let key in obj) {
            if (headerArray.indexOf(key) == -1) headerArray.push(key);
          }
        });
  
        exportData.forEach(obj => {
          let rowData = [];
          headerArray.forEach(key => {
            rowData.push(obj.hasOwnProperty(key) ? obj[key] : '');
          });
          bodyData.push(rowData);
        });
  
        doc.autoTable({
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          pageBreak: 'auto',
          theme: 'striped',
          head: [headerArray],
          body: bodyData,
          columnStyles: {
            0: { columnWidth: 35 },
            1: { columnWidth: 40 },
            2: { columnWidth: 15 },
            3: { columnWidth: 15 },
            4: { columnWidth: 15 },
            5: { columnWidth: 15 },
            6: { columnWidth: 50 },
            7: { columnWidth: 15 },
            8: { columnWidth: 40 },
            9: { columnWidth: 15 },
            10: { columnWidth: 10 },
            11: { columnWidth: 15 },
            12: { columnWidth: 18 }
          }
        });
  
        doc.save(`${name}.pdf`);
      });
    }
    */
  
    fullImportUpload() {
      this.infoTitle = this.language.fullImport;
      this.infoBody = this.language.fullImportPrompt;
      this.closeModal();
      this.modalRef = this.dialogService.open(this.importModal);
    }
  
    proceedImport() {
      this.closeModal();
      $("#fullImportUpload").click();
    }
  
    fullImport(importType, file) {
      sessionStorage.setItem('importType', importType)
      this.dataTablecreatorService.generateJsonFromCsv(file, this.deviceData);
    }
  
    tableDataRecreate(excelData) {
      let tempRecreateTable, existingIPs = [], checkedIPs = [], noActionRequired = [], tempDeviceData = Object.assign([], this.deviceData);
      tempDeviceData.forEach(obj => {
        if (obj.deviceIpV4 && obj.deviceIpV4.trim()) existingIPs.push(obj.deviceIpV4);
        else {
          obj.deviceIpV4 = "";
          existingIPs.push("@@@$@@@"); //Temp value to fill gap of IPV4
        }
        if (obj.deviceIpV6 && obj.deviceIpV6.trim()) existingIPs.push(obj.deviceIpV6);
        else {
          obj.deviceIpV6 = "";
          existingIPs.push("@@@$@@@"); //Temp value to fill gap of IPV6
        }
      });
  
      const ipV4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipV6Regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
      excelData.forEach((excelObj, i) => {
        let index = existingIPs.indexOf(excelObj.deviceIpV4) > -1 ?
          existingIPs.indexOf(excelObj.deviceIpV4) :
          (existingIPs.indexOf(excelObj.deviceIpV6) > -1 ? existingIPs.indexOf(excelObj.deviceIpV6) : -1)
  
        if ((excelObj.deviceIpV4.trim() != "" || excelObj.deviceIpV6.trim() != "") && (index + 1)) {
          const isOdd = index % 2 === 0 ? 0 : 1;
          index = isOdd ? (index - 1) / 2 : index / 2;
          if (excelObj.receivingPort != "" && excelObj.receivingPort > 0 && excelObj.receivingPort != tempDeviceData[index]["receivingPort"] && excelObj.receivingPort != 2058)
            excelObj["action"] = "Invalid receiving port, it should be 2058";
          if (excelObj.flowType && excelObj.flowType.trim() && !["netflow", "cflow", "sflow"].includes(excelObj.flowType))
            excelObj["action"] = "Invalid flow type, it should be [netflow, cflow, sflow]";
          if (checkedIPs.includes(excelObj["deviceIpV4"]) || checkedIPs.includes(excelObj["deviceIpV6"]))
            excelObj["action"] = "Device Ip already exist in File .This will be ignored.";
          if ((excelObj.deviceIpV4.trim() != "" && !ipV4Regex.test(excelObj.deviceIpV4)) || (excelObj.deviceIpV6.trim() != "" && !ipV6Regex.test(excelObj.deviceIpV6)))
            excelObj["action"] = "Invalid Device IP";
          if (!excelObj.hasOwnProperty("action")) {
            Object.keys(excelObj).forEach(key => {
              if (tempDeviceData[index][key] === true) tempDeviceData[index][key] = "Yes"
              else if (tempDeviceData[index][key] === false) tempDeviceData[index][key] = "No"
              if (excelObj[key] != tempDeviceData[index][key]) {
                excelObj["action"] = "Update";
                excelObj["_id"] = tempDeviceData[index]["_id"];
              }
            });
          }
          if (!excelObj.hasOwnProperty("action")) noActionRequired.push(i);
  
          this.previewTableHeader.forEach(header => {
            excelObj[`old_${header}`] = tempDeviceData[index][header];
          });
          if (tempDeviceData[index]["deviceIpV4"].trim()) checkedIPs.push(tempDeviceData[index]["deviceIpV4"]);
          if (tempDeviceData[index]["deviceIpV6"].trim()) checkedIPs.push(tempDeviceData[index]["deviceIpV6"]);
          existingIPs.splice(index * 2, 2);
          tempDeviceData.splice(index, 1);
        } else {
          if (excelObj.flowType && excelObj.flowType.trim() && !["netflow", "cflow", "sflow"].includes(excelObj.flowType))
            excelObj["action"] = "Invalid flow type, it should be [netflow, cflow, sflow]";
          if ((excelObj.deviceIpV4.trim() != "" && !ipV4Regex.test(excelObj.deviceIpV4)) || (excelObj.deviceIpV6.trim() != "" && !ipV6Regex.test(excelObj.deviceIpV6)))
            excelObj["action"] = "Invalid Device IP";
          if (!excelObj.hasOwnProperty("action")) {
            excelObj["action"] = "Create";
          }
  
          if (excelObj["deviceIpV4"].trim()) checkedIPs.push(excelObj["deviceIpV4"]);
          if (excelObj["deviceIpV6"].trim()) checkedIPs.push(excelObj["deviceIpV6"]);
          this.previewTableHeader.forEach(header => {
            excelObj[`old_${header}`] = "";
          });
        }
  
        for (const [key, value] of Object.entries(excelObj)) {
          if (value === true) excelObj[key] = "Yes"
          else if (value === false) excelObj[key] = "No"
        }
      });
  
      tempRecreateTable = Object.assign([], excelData);
      let previewResult = Object.assign([], excelData);
      noActionRequired = noActionRequired.sort(function (a, b) { return b - a });
      noActionRequired.forEach(ind => {
        previewResult.splice(ind, 1);
      });
      if (tempDeviceData.length && sessionStorage.getItem('importType') != "IncImport") {
        tempDeviceData.forEach(element => {
          element["action"] = "Delete"
          for (const [key, value] of Object.entries(element)) {
            if (value === true) element[key] = "Yes"
            else if (value === false) element[key] = "No"
          }
          previewResult.push(element);
        });
      }
  
      this.recreateTable = tempRecreateTable;
      return previewResult;
    }
  
    appendOldPrefix(head) {
      return `old_${head}`;
    }
  
    previewHeader() {
      this.previewHeaderValue = [
  
        /* { "key": "rateLimit", "title": `${this.language.name}` },
        { "key": "rateLimit", "title": `${this.language.old} ${this.language.name}` },  */
      ];
    }
  
    importSubmit(isDryRun = false) {
      let importType = sessionStorage.getItem('importType')
      let requestObject: any = {
        "clientIP": this.storageData["clientIp"],
        "dry_run": isDryRun,
        "full_import": (importType == 'FullImport') ? true : false,
        "import_data": [],
        "orgId": this.ORG_ID,
        "userId": this.storageData["UserId"]
      }
      let action;
  
      /* if (importType == 'FullImport') {
        requestObject.full_import = true;
        action = 'Create';
      } else {
        requestObject.full_import = false;
        action = 'Update';
      } */
      let data = [], deleteObj = [];
      if (isDryRun) {
        action = 'Create';
        this.recreateTable.forEach((element: any) => {
          if (element?.deviceIpV4 || element?.deviceIpV6) {
            data.push(this.importTemplate(element, action));
          }
        });
      } else {
        this.recreateTable.forEach((element: any) => {
          data.push(this.importTemplate(element));
        });;
      }
  
      if (isDryRun) {
        const dataLength = data.length;
        this.deviceData.forEach(existingObj => {
          let isAvailable = false;
          for (let i = 0; i < dataLength; i++) {
            if ((existingObj.deviceIpV4 && existingObj.deviceIpV4 == data[i].deviceIpV4) || (existingObj.deviceIpV6 && existingObj.deviceIpV6 == data[i].deviceIpV6)) {
              isAvailable = true;
              if (importType == 'FullImport') {
                data[i]["action"] = "Create";
                this.importUpdateASCreate.push(existingObj);
              } else {
                data[i]["action"] = "Update";
              }
  
            }
          }
          if (!isAvailable && requestObject.full_import) {
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
  
      requestObject.import_data = data;
      this.deviceImportSubs = this.api.Import('devices', requestObject, this.ORG_ID).subscribe(res => {
        if (isDryRun) {
          this.enableImportSubmit = false;
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
          sessionStorage.removeItem('importType');
          this.cancel();
          this.isRerender = true;
          this.apiLoader();
        }
      }, (err: HttpErrorResponse) => {
        if (err.status == 400) {
          if (isDryRun) {
            this.infoTitle = this.language.objectNotFound;
            this.infoBody = '';
            this.closeModal();
            this.modalRef = this.dialogService.open(this.infoModal);
          } else {
            sessionStorage.removeItem('importType');
            this.pageErrorHandle(err);
          }
          this.loading = false;
        } else {
          this.pageErrorHandle(err);
        }
      });
    }
  
    importTemplate(element, action?) {
      return {
        "action": action ? action : element.action,
        "deviceIpV4": element.deviceIpV4,
        "deviceIpV6": element.deviceIpV6,
        //"hostName": element.hostName,
        "orgId": this.ORG_ID,
        "tenantId": 0,
        "ignoreDownstream": (element.ignoreDownstream === 'Yes' || element.ignoreDownstream === true) ? true : false,
        "ignoreInternal": (element.ignoreInternal === 'Yes' || element.ignoreInternal === true) ? true : false,
        "ignoreUpstream": (element.ignoreUpstream === 'Yes' || element.ignoreUpstream === true) ? true : false,
        "name": element.name,
        // CCL-37642 & CCL-39112
        // "observationId": element.observationId,
        "rateLimit": element.rateLimit,
        "receivingPort": element.receivingPort,
        "samplingRate": element.samplingRate
      }
    }
  
    previewOrder(res) {
      if (!res || res.length == 0) {
        this.infoTitle = this.language.noAvailableChange;
        this.infoBody = '';
        this.closeModal();
        this.modalRef = this.dialogService.open(this.infoModal);
        return;
      }
      let previewData = [];
      const streamInputCheck = ["ignoreDownstream", "ignoreInternal", "ignoreUpstream"],
        keysToExclude = ["validationResult"],
        keysWithoutOld = ["action", "deviceIpV4", "deviceIpV6"];
      //this.importTableOptions.columns = this.dataTablecreatorService.tableOptionsCreator(res[0], this.language, keysToExclude, keysWithoutOld);
      res.forEach(resObj => {
        let newObj = {};
        Object.keys(resObj).forEach(keys => {
          if (!keysToExclude.includes(keys)) {
            if (streamInputCheck.includes(keys) && (resObj[keys] === "true" || resObj[keys] === true || (resObj[keys] && resObj[keys].toString().toUpperCase == 'Y'))) newObj[keys] = 'Yes';
            else if (streamInputCheck.includes(keys) && (resObj[keys] === "false" || resObj[keys] === false || (resObj[keys] && resObj[keys].toString().toUpperCase == 'N'))) newObj[keys] = 'No';
            else newObj[keys] = resObj[keys];
            if (!keysWithoutOld.includes(keys)) newObj['Old ' + keys] = '';
          }
        });
        this.deviceData.forEach(tableObj => {
          if (resObj.deviceIpV4 == tableObj.deviceIpV4 && resObj.deviceIpV6 == tableObj.deviceIpV6) {
            for (const [key, value] of Object.entries(newObj)) {
              if (key.includes("Old")) {
                const exactKey = key.replace("Old ", "");
                if (streamInputCheck.includes(exactKey) && (tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'Y')) newObj[key] = 'Yes';
                else if (streamInputCheck.includes(exactKey) && (!tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'N')) newObj[key] = 'No';
                else newObj[key] = tableObj[exactKey]
              }
            }
            if (newObj["action"] == "Create") newObj["action"] = "Update";
            return false;
          }
          //if (resObj.deviceIpV4 == tableObj.deviceIpV4 && resObj.deviceIpV6 == tableObj.deviceIpV6) newObj["action"] = "Update";
        });
        previewData.push(newObj);
      });
      this.previewTableBody = previewData;
    }
  
    cancelImport() {
  
    }
  
    reset() {
      this.name = undefined;
      this.hostName = undefined;
      this.deviceIPV4 = undefined;
      this.deviceIPV6 = undefined;
      this.ignoreDownStream = false;
      this.ignoreUpStream = false;
      this.ignoreLocal = false;
      this.geoCoordinate = undefined;
      this.address = undefined;
      this.samplingLimit = undefined;
    }
  
    resetEdit() {
      this.editName = '';
      this.editHostName = '';
      // this.editDeviceIP = '';
      this.editDeviceIPV4 = '';
      this.editDeviceIPV6 = '';
      this.editIgnoreUpStream = false;
      this.editIgnoreDownStream = false;
      this.editIgnoreLocal = false;
      this.editSamplingLimit = undefined;
      this.editGeoCoordinate = undefined;
    }
  
    samplingRateValidator(samplingLimit) {
      this.samplingLimitError = false;
      if (Number.isInteger(samplingLimit)) {
        if (samplingLimit > 0 && samplingLimit <= 65535) {
          this.samplingLimitError = false;
        } else {
          this.samplingLimitError = true;
        }
      } else {
        this.samplingLimitError = true;
      }
    }
  
    // validator() {
    //   this.deviceIPError = false;
    //   this.deviceIP6Error = false;
    //   this.ipv4 = undefined;
    //   this.ipv6 = undefined;
    //   if (this.deviceIPV4) {
    //     this.deviceIpValidatorIpv4(this.deviceIPV4);
    //   }
    //   if (this.deviceIPV6) {
    //     this.deviceIpValidatorIpv6(this.deviceIPV6);
    //   }
    //   this.samplingRateValidator();
    //   if (!this.deviceIPError && !this.deviceIP6Error && !this.samplingLimitError) {
    //     this.validation = true;
    //   } else {
    //     this.validation = false;
    //     this.infoTitle = this.language['Invalid request'];
  
    //     if (this.deviceIPError) {
    //       this.infoTitle = this.language['Invalid request'];
    //       this.infoBody = this.language['Invalid IP address'];
    //     } else if (this.samplingLimitError) {
    //       this.infoTitle = this.language['Invalid value'];
    //       this.infoBody = this.language['Sampling rate must be in digits'];
    //       //this.infoBody = 'Please enter sampling limit';
    //     }
  
    //     if ((this.deviceIPV4 == undefined || this.deviceIPV4 == '') && (this.deviceIPV6 == undefined || this.deviceIPV6 == '')) {
    //       this.infoTitle = this.language['Invalid request'];
    //       this.infoBody = this.language['Invalid IP address'];
    //     }
  
    //     this.closeModal();
    //     this.modalRef = this.dialogService.open(this.infoModal);
    //   }
  
    // }
  
    deviceIpValidatorIpv4(ip: string) {
  
      if (ip && ip.trim() != '') {
        ip = ip.trim();
        if (this.commonFunctionsService.isValidIpV4Addr(ip)) {
          this.ipv4 = ip;
          //this.deviceIPV6 = '';
          this.deviceIPError = false;
        } else {
          this.deviceIPError = true;
        }
      } else {
        this.deviceIPError = true;
      }
    }
    deviceIpValidatorIpv6(ip: string) {
  
      if (ip && ip.trim() != '') {
        ip = ip.trim();
        if (this.commonFunctionsService.isValidIpV6Addr(ip)) {
          this.ipv6 = ip;
          //this.deviceIPV4 = '';
          this.deviceIP6Error = false;
        } else {
          this.deviceIP6Error = true;
        }
      } else {
        this.deviceIPError = true;
      }
    }
  
  
    sortingTable(colId: number, e) {
  
      setTimeout(() => {
        this.sortColumn = colId;
        let element = e.target;
        let sortAsc = $(element).hasClass('sorting_asc');
        if (sortAsc) {
          this.sortType = 'asc';
        } else {
          this.sortType = 'desc';
        }
      }, 500);
  
  
    }
  
    closeAlert() {
      this.error = false;
      this.success = false;
    }
  
    closeModal(): void {
      if (this.modalRef) {
        this.modalRef.close();
      }
    }
  
    strSub(str: string, len?: number) {
      let length = len ? len : 20;
      if (str.length <= 20) {
        return str;
      }
      return `${str.substr(0, length)}...`;
    }
  
    pageErrorHandle(err: HttpErrorResponse) {
  
      if (err.status == 400) {
        let errString = err?.error ? this.commonOrgService.pageInvalidRqstErrorHandle(err) : '';
  
        if (errString == "object_already_exists") {
          this.infoBody = `${this.language['Conflict found with existing devices']} ${err?.error?.info ? err?.error?.info : ''}`;
        } else if ((errString === "Bad Request") && ((err?.error?.message?.split(':').length) && err?.error?.message?.split(':')[0] === "object_already_exists" || err?.error?.message?.split(':')[0] === "invalid_request")) { /* CCL-42016 */
          this.infoBody = err?.error?.message.split(':')[1];
        } else {
          this.infoBody = errString;
        }
        this.infoTitle = this.language['Invalid request'];
        this.loading = false;
        this.closeModal();
        this.modalRef = this.dialogService.open(this.infoModal);
      } else {
        if (err.status == 401) {
          this.errorInfo = this.language['Access Denied'];
        } else {
          this.errorInfo = this.commonOrgService.pageErrorHandle(err);
        }
        this.commonOrgService.openErrorAlert(this.errorInfo);
        this.commonOrgService.pageScrollTop();
        this.loading = false;
      }
  
    }
  
    openInfoModal(invalidImportDevice: boolean) {
      if (!invalidImportDevice) this.invalidImportDevice = []
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
    }
  
    removeState() {
      if (localStorage.getItem(`DataTables_device-table_/${this.MODULE}/flowAnalyze/network/devices`)) {
        localStorage.removeItem(`DataTables_device-table_/${this.MODULE}/flowAnalyze/network/devices`)
      }
    }
  
    inputValidator(event) {
      var key = event?.keyCode;
      return ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 32 || (key >= 48 && key <= 57));
    }
    removeUnwantedSpace(input,value){
      this[input] = this.common.trimSpaceFromNonObjectInputs(value)
    }
     reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
}
