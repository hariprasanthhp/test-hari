declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
// import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { NetworkSubnetsApiService } from '../../services/network-subnets-api.service';
// import { DataTablecreatorService } from '../../services/data-tablecreator.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
@Component({
  selector: 'app-radius-servers',
  templateUrl: './radius-servers.component.html',
  styleUrls: ['./radius-servers.component.scss']
})
export class RadiusServersComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;

  formVisible: boolean = false;
  buttonVisible: boolean = true;

  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    order: [1, 'asc'],
    columnDefs: [
      { targets: [0, 2, 3], orderable: false }
    ],
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
  radiusData: any = [];
  exportData: any;
  dataAvailable: boolean;

  add: any = {
    excluded: true,
    isstatic: false,
    isv4: true,
    subnet: ''
  };

  infoTitle: string;
  infoBody: string;
  modalRef: any;
  rowId: any;

  importTableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    order: [0, 'asc'],
    //"scrollX": true,
    dom: 'tipr',
  }
  tablePreview: boolean = false;

  fullLoader: boolean = true;
  isFullImport: boolean = true;

  subnetError: boolean = false;
  isIPv4: boolean = true;

  editOnValue: any;
  editData: any;
  editSecret: string;
  editIP: string;
  deleteData: any;


  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtTrigger: Subject<any> = new Subject();

  isRerender = false;


  deleteIds = [];
  deleteIPs = [];

  ORG_ID: string;

  subnetVersions: any = ['SubnetIPV4', 'SubnetIPV6'];
  subnetVersionsSelected: any = 'SubnetIPV4';
  editSubnetVersionsSelected: any;

  loaded: boolean;
  translateSubscribe: any;
  frTable: any;
  previewTableHeader;
  previewTableBody;
  recreateTable;
  loading: boolean = true;
  listSubs: any;
  createSubs: any;
  updateSubs: any;
  deleteSubs: any;
  exportSubs: any;
  importSubs: any;
  importUpdateASCreate: any = [];
  currentTableRowCount = 0;
  newIP: any;
  port: any;
  secret: string;
  addSecret: boolean = true;
  ip: any;

  sortData = {
    column: 1,
    type: 'asc'
  }
  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private apiService: NetworkSubnetsApiService,
    // private exportExcel: ExportExcelService,
    // private dataTablecreatorService: DataTablecreatorService,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private titleService: Title,
    private common:common
  ) {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.isRerender = true;
      this.titleService.setTitle(`${this.language['radiusserver']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.setTableOptions('language');
    });

    this.commonOrgService.closeAlert();

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['radiusserver']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);


  }

  subscription;
  ngOnInit() {
    this.port = '1813';
    this.getRadiusServers();
    this.tableLanguageOptions();
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
  }


  create() {
    this.buttonVisible = false;
    this.formVisible = true;
    this.reset();
  }

  getRadiusServers() {
    this.listSubs = this.apiService.getRadiusServers(this.ORG_ID).subscribe((data: any) => {
      if (data) {
        this.radiusData = [...this.processData(data)];
        this.setTableOptions();
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
        //this.exportData = this.apiService.exportProcess(data);
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);

      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
        this.loading = false;
      } else {
        this.dtTrigger.next();
      }

    });
  }

  setTableOptions(type?: string) {
    let that = this;
    this.tableOptions = {
      pagingType: 'full_numbers',
      order: [that.sortData.column, that.sortData.type],
      columnDefs: [
        { targets: [0, 2, 3], orderable: false }
      ],
      stateSave: false,
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
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
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
      this.dataAvailable = true;
      this.loading = false;
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

  processData(data: any) {
    data.forEach(obj => {
      obj['port'] = '1813';
      obj['hideSecret'] = true;
    });

    return data;
  }



  submit() {

    if (this.newIP == undefined || this.newIP == '') {
      this.infoTitle = this.language['Invalid IP address'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }

    this.validateIP4(this.newIP);

    if (this.subnetError) {
      this.infoTitle = this.language['Invalid IP address'];
      this.infoBody = this.newIP ? this.newIP : '';
      this.openInfoModal();
      return;
    }

    this.secret = this.secret ? this.secret.trim() : '';
    if (this.secret == '') {
      this.infoTitle = this.language['Invalid secret'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }

    let params = {
      ip: this.newIP ? this.newIP.trim() : '',
      secret: this.secret ? this.secret.trim() : '',
      orgId: this.ORG_ID,
      tenantId: 0
    };
    this.loading = true;
    this.createSubs = this.apiService.addRadiusServer(params, this.ORG_ID).subscribe((json: any) => {
      this.isRerender = true;
      this.cancel();
      this.getRadiusServers();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;
    this.editSecret = item.secret;
    this.editIP = item.ip;
    if (this.deleteIds.indexOf(item._id) !== -1) {

      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteIPs.splice(this.deleteIPs.indexOf(item.ip), 1);

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

  updateSave(id: string) {

    if (this.editIP == undefined || this.editIP == '') {
      this.infoTitle = this.language['Invalid IP address'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }

    this.validateIP4(this.editIP);

    if (this.subnetError) {
      this.infoTitle = this.language['Invalid IP address'];
      this.infoBody = this.editIP ? this.editIP : '';
      this.openInfoModal();
      return;
    }

    this.editSecret = this.editSecret ? this.editSecret.trim() : '';
    if (this.editSecret == '') {
      this.infoTitle = this.language['Invalid secret'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }
    let params = {
      _id: this.editOnValue,
      ip: this.editIP ? this.editIP.trim() : '',
      secret: this.editSecret ? this.editSecret.trim() : '',
      orgId: this.ORG_ID,
      tenantId: 0
    };

    this.loading = true;
    this.updateSubs = this.apiService.updateRadiusServer(id, params, this.ORG_ID).subscribe(res => {
      this.isRerender = true;
      this.cancel();
      this.getRadiusServers();
      this.editOnValue = undefined;
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );

  }

  updateCancel() {
    this.editOnValue = undefined;
  }

  validateIP4(subnet: string) {
    this.subnetError = false;
    if (!subnet) {
      this.subnetError = true;
      return;
    }
    let ip = this.apiService.trimSubnet(subnet);
    if (ip) {
      if (this.commonFunctionsService.isValidIpV4Addr(ip)) {
        this.isIPv4 = true;
        this.ip = ip;
        return true;
      } else {
        this.subnetError = true;
        return;
      }
    } else {
      this.subnetError = true;
      return;
    }
  }

  /** Validation for Subent Ipv4 ends */


  cancel() {
    this.formVisible = false;
    this.buttonVisible = true;
    this.tablePreview = false;
    this.reset();
  }

  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete radius'];
    this.infoBody = `${item.ip}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal,  { backdrop: 'static', keyboard: false });
  }

  confirmDelete() {
    let id = this.deleteData._id;
    this.loading = true;
    this.deleteSubs = this.apiService.deleteRadiusServer(id, this.ORG_ID).subscribe((res: any) => {
      this.isRerender = true;
      this.getRadiusServers();
      this.closeDeleteModal();
    },
      (err: HttpErrorResponse) => {
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
      this.deleteIPs.push(item.ip);

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteIPs.splice(this.deleteIPs.indexOf(item.ip), 1);


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
    this.deleteIPs = [];

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
        let d = that.radiusData.filter((el) => el._id === id);
        that.deleteIds.push(id);
        that.deleteIPs.push(d[0].ip);
        i++;
      });
    } else {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.deleteIPs = [];
        i++;
      });
    }

  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.deleteIPs = [];
    this.selectDeselectAll(true);
  }

  deleteAllSelected() {

    if (this.deleteIPs) {
      this.infoTitle = this.language['Delete selected radius'];
      this.infoBody = this.deleteIPs.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal,  { backdrop: 'static', keyboard: false });
    }

  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.loading = true;
    this.deleteIds.forEach(id => {
      deleteCalls.push(this.apiService.deleteRadiusServer(id, this.ORG_ID));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.deleteIPs = [];
        this.isRerender = true;
        this.getRadiusServers();

        this.closeMultiDeleteModal();

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deleteIPs = [];
    this.closeModal();
  }

  reset() {
    this.newIP = undefined;
    this.secret = undefined;
    this.addSecret = true;
    this.editData = undefined;
    this.editOnValue = undefined;

  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deleteIPs = [];
  }


  toggleSecret(key) {
    if (key == 'addSecret') {
      this.addSecret = !this.addSecret;
    } else {
      key.hideSecret = !key.hideSecret;
    }
  }


  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400) {
      // this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoBody = this.commonOrgService.pageErrorHandle(err);
      this.infoTitle = this.language['Invalid request'];
      this.openInfoModal();
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

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('radius_server', url);
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
}
