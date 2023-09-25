declare var require: any;
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
const $: any = require('jquery');
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EndpointSubnetService } from '../../services/endpoint-subnet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
import { type } from 'os';
@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss']
})
export class SubnetComponent implements OnInit, OnDestroy {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  @ViewChild('fullImportInput', { static: false }) fullImportInput: ElementRef;
  @ViewChild('incImportInput', { static: false }) incImportInput: ElementRef;
  language: any;
  pageAvailable: boolean = false;

  formVisible: boolean = false;
  buttonVisible: boolean = true;

  currentTableRowCount = 0;

  selectOptions = ['No', 'Yes'];
  selectedSubnet = 'No';
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    order: [1, 'asc'],
    columnDefs: [
      { targets: [0], orderable: false }
    ],
    stateSave: true,
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
  subnetData: any;
  exportData: any;
  dataAvailable: boolean;
  newSubnet: string = '';
  newSubnetV6: string;
  newSubnetipv4: any;
  newSubnetipv6: any;
  subnet: string;
  //newASN: string;
  params: {};
  private empty = {
    'Subnets': '',
    'Name': ''
  };

  add: any = {
    name: '',
    subnets: '',
    //orgId: '0',
    //recordId: 'test',
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


  // editSubnetv4: string;
  // editSubnetv6: string;
  // editSelectedExcluded: any;




  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtTrigger: Subject<any> = new Subject();

  isRerender = false;


  deleteIds = [];
  deleteSubnets = [];

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
  createName: string;
  createSubnet: string;
  createSubnetsList: any = [];

  editOnValue: any;
  editData: any;
  editName: string;
  editSubnet: string = '';
  editSubnetsList: any = [];

  deleteData: any;
  getSubnetsSubs: any;
  addSubs: any;

  editSubs: any;
  deleteSubs: any;
  fileChangeSubs: any;
  exportCSVSubs: any;
  exportPDFSubs: any;
  importSubs: any;
  storageData = {};
  importDeleteData: any = [];
  importData: any = [];
  enableImportSubmit: boolean;
  importTableData: any = [];
  compareJSONSubs: any;
  importUpdateASCreate: any = [];

  sortData = {
    column: 1,
    type: 'asc'
  }
  modifyDataInfo: any = {};
  newEditDataValue: string = '';
  private columnName = {
    subnets: 'Subnets',
    name: 'Name'
  }
  public invalidImportSubnet = [];
  public disableIcImportSubmitBtn = false;
  disableSubmitFullImport:boolean;
  //variables for ngtest
  subnetResponseData:any;
  addSubnetResponse:any;
  deleteResponse:any;
  updateResponse:any;
  selectedDelete:any;
  exportColoumnNames:any;
  disableSubmitImport: boolean;
  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private exportExcel: ExportExcelService,
    //private dialogService: NbDialogService,
    private dataTablecreatorService: DataTablecreatorService,
    // private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    private router: Router,
    private service: EndpointSubnetService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private titleService: Title,
    private common:common
  ) {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.titleService.setTitle(`${this.language['Subnet']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ?
        this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.dataAvailable = false;
      this.isRerender = true;
      this.setTableOptions('language');
      this.exportColoumnNames={
        subnets: this.language['subnets'],
        name:this.language['Name']
      }
    });
    this.exportColoumnNames={
      subnets: this.language['subnets'],
      name:this.language['Name']
    }
    this.commonOrgService.closeAlert();//*Imp
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['Subnet']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ?
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit() {
    this.removeState();
    this.getSubnets();
    this.tableLanguageOptions();

    this.compareJSONSubs = this.dataTablecreatorService.jsonDataOfCSV.subscribe((res: any) => {
      this.invalidImportSubnet = [];
      try {
        let importValidationFlag = true;
        (res || []).forEach(el => {
          this.commonFunctionsService.keysFromColumnName(el, this.exportColoumnNames);
          /* CCL-42080 */
          if (el.name && el.name.length > 64) {
            this.invalidImportSubnet.push(el)
            this.infoTitle = this.language['Invalid Value'];
            this.infoBody = `${this.language['Invalid Name - Name should not exceed 64 characters.']}`;
            importValidationFlag = false;
            this.openInfoModal(true);
            return;
          }
        });
        if (importValidationFlag) {
          this.recreateTable = res;
          //this.submitImport(true);
          this.compareJsonToTableData(res);
        }
      } catch (ex) {
      }
    });
    this.setStorageData();
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.loaded = true;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }
    if (this.getSubnetsSubs) {
      this.getSubnetsSubs.unsubscribe();
    }
    if (this.addSubs) {
      this.addSubs.unsubscribe();
    }
    if (this.editSubs) {
      this.editSubs.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
    if (this.fileChangeSubs) {
      this.fileChangeSubs.unsubscribe();
    }
    if (this.exportCSVSubs) {
      this.exportCSVSubs.unsubscribe();
    }
    if (this.exportPDFSubs) {
      this.exportPDFSubs.unsubscribe();
    }
    if (this.importSubs) {
      this.importSubs.unsubscribe();
    }

    if (this.compareJSONSubs) {
      this.compareJSONSubs.unsubscribe();
    }
  }


  create() {
    this.buttonVisible = false;
    this.formVisible = true;
    this.reset();
  }

  getSubnets() {
    this.getSubnetsSubs = this.service.getSubnets(this.ORG_ID).subscribe((data: any) => {
      this.subnetResponseData=data
      if (data) {
        this.subnetData = [...this.processData(data)];
        this.setTableOptions();
        if (this.isRerender) {
          this.rerender();
          this.isRerender = false;
        } else {
          this.dtTrigger.next();
        }

        setTimeout(() => {
          this.resetDelete();
        }, 100);
      }
    }, (err: HttpErrorResponse) => {

      this.setTableOptions();
      if (this.isRerender) {
        this.rerender();
      } else {
        this.dtTrigger.next();
      }
      this.pageErrorHandle(err);
    });
  }

  setTableOptions(type?: string) {
    this.tableOptions = {
      pagingType: 'full_numbers',
      order: [this.sortData.column, this.sortData.type],
      columnDefs: [
        { targets: [0], orderable: false }
      ],
      stateSave: true,
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
        this.rerender();
        this.dataAvailable = true;
        this.loading = false;
      }, 200);
    } else {
      setTimeout(() => {
        this.dataAvailable = true;
        this.loading = false;
      }, 200);
    }


  }

  rerender(): void {
    this?.dtElement.dtInstance?.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.tableOptions.order = [this.sortData.column, this.sortData.type],
        setTimeout(() => {
          this.dtTrigger.next();
        }, 10);

    });
  }

  processData(data: any) {
    data.forEach(obj => {
      obj['newSubnets'] = this.commonFunctionsService.splitData(obj.subnets, '|');
      obj['_id'] = this.uuidv4();
    });

    return data;
  }


  addSubnet() {

    this.createSubnet = this.createSubnet.trim();
    if (this.createSubnet == '') {
      return;
    }

    if (this.createSubnet != '') {
      if (!this.subnetValidatorIpv4(this.createSubnet) && !this.subnetValidatorIpv6(this.createSubnet)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = `${this.createSubnet}`;
        this.openInfoModal(false);
        return;
      }

      if (this.createSubnetsList.includes(this.createSubnet)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Duplicate Subnet'];
        this.openInfoModal(false);
        return;

      }

      this.createSubnetsList.push(this.createSubnet);
      this.createSubnet = '';
    }

  }


  removeSubnet(rid) {
    this.createSubnetsList.splice(rid, 1);
  }



  submit() {
    this.commonOrgService.closeAlert();
    this.createName = this.createName ? this.createName.trim() : '';
    if (!this.createName) {
      this.infoTitle = this.language['Name Cannot be empty'];
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    } else if (this.createName.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Name']} - Name should not exceed 64 characters.`;
      this.openInfoModal(false);
      return;
    } else if (this.subnetData.filter(el => el.name == this.createName).length) {
      this.infoTitle = 'Name Cannot be duplicate';
      this.infoBody = '';
      this.openInfoModal(false);
      return
    }

    this.createSubnet = this.createSubnet ? this.createSubnet.trim() : '';
    if (this.createSubnet == '' && !this.createSubnetsList.length) {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }
    let subnets = this.createSubnetsList;

    if (this.createSubnet != '') {
      if (!this.subnetValidatorIpv4(this.createSubnet) && !this.subnetValidatorIpv6(this.createSubnet)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = `${this.createSubnet}`;
        this.openInfoModal(false);
        return;
      }

      if (subnets.includes(this.createSubnet)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Duplicate Subnet'];
        this.openInfoModal(false);
        return;

      }

      subnets = [this.createSubnet, ...subnets];
    }


    let params = this.add;
    params.name = this.createName ? encodeURI(this.createName).replace(/-/g, '%2D') : '';
    params.subnets = (subnets.length != 0) ? subnets.join('|') : '';
    params.orgId = this.ORG_ID;
    this.loading = true;
    this.addSubs = this.service.addSubnet(params, this.ORG_ID).subscribe((json: any) => {
      this.addSubnetResponse=json;
      this.isRerender = true;
      this.cancel();
      this.getSubnets();

    }, (err: HttpErrorResponse) => {
      let errTitle = this.language['Create Fail!'];
      this.pageErrorHandle(err, errTitle);
    });
  }

  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;
    this.editName = item.name;
    this.editSubnetsList = this.commonFunctionsService.splitData(item.subnets, '|');
    if (this.deleteIds.indexOf(item._id) !== -1) {

      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteSubnets.splice(this.deleteSubnets.indexOf(item.name), 1);

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
    // this.editSubnetv4 = item.subnet; // using this editSubnetv4 var as common for edit ipv4  ipv6
    // // this.editSubnetv6 = item.subnetIP6;
    // this.editSelectedExcluded = item.excluded;
    // this.editSubnetVersionsSelected = item.isv4 ? 'SubnetIPV4' : 'SubnetIPV6';
    const indexOfObject = this.deleteSubnets.findIndex(object => {
      return object == item.subnets;
    });
    this.deleteSubnets.splice(indexOfObject, 1);

    this.hideEditDataInput();
  }

  updateSave(id: string) {

    if (this.editName && this.editName == '') {
      this.infoTitle = this.language['Invalid name'];
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }

    if (this.editName?.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Name']} - Name should not exceed 64 characters.`;
      this.openInfoModal(false);
      return;
    }

    this.editSubnet = this.editSubnet.trim();
    if (this.editSubnet == '' && !this.editSubnetsList.length) {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }
    let subnets = this.editSubnetsList;

    if (this.editSubnet != '') {
      if (!this.subnetValidatorIpv4(this.editSubnet) && !this.subnetValidatorIpv6(this.editSubnet)) {
        this.infoTitle = this.language['Invalid subnet'];
        this.infoBody = `${this.editSubnet}`;
        this.openInfoModal(false);
        return;
      }

      if (subnets.includes(this.editSubnet)) {
        this.infoTitle = this.language['Invalid request'];
        this.infoBody = this.language['Duplicate Subnet'];
        this.openInfoModal(false);
        return;

      }
      subnets = [this.editSubnet, ...subnets];
    }


    let params = {
      name: this.editName ? this.editName : '',
      subnets: (subnets.length != 0) ? subnets.join('|') : ''
    };
    this.loading = true;
    this.editSubs = this.service.updateSubnet(this.editData._id, params, this.ORG_ID).subscribe(res => {
      this.updateResponse=res;
      this.isRerender = true;
      this.cancel();
      this.getSubnets();
      this.editOnValue = undefined;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });

  }

  updateCancel() {
    this.editOnValue = undefined;
  }

  validateSubnetv4(subnet: string) {
    this.subnetError = false;
    if (!subnet) {
      this.subnetError = true;
      return;
    }
    let ip = this.service.trimSubnet(subnet);
    if (ip) {
      if (this.commonFunctionsService.isValidSubnetV4(ip)) {
        this.isIPv4 = true;
        this.subnet = ip;
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

  validateSubnetv6(subnet: string) {
    this.subnetError = false;
    if (!subnet) {
      this.subnetError = true;
      return;
    }
    let ip = this.service.trimSubnet(subnet);
    if (ip) {
      if (this.commonFunctionsService.isValidSubnetV6(ip)) {
        this.isIPv4 = false;
        this.subnet = ip;
        return;
      } else {
        this.subnetError = true;
        return;
      }
    } else {
      this.subnetError = true;
      return;
    }
  }

  cancel() {
    this.formVisible = false;
    this.buttonVisible = true;
    this.tablePreview = false;
    this.disableIcImportSubmitBtn = false;
    this.reset();
  }


  getDeleteIds(e: any, item: any): any {
    if (e.target.checked) {

      this.deleteIds.push(item._id);
      this.deleteSubnets.push(item.name);

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteSubnets.splice(this.deleteSubnets.indexOf(item.name), 1);


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

  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete endpoint subnet rule?'];
    this.infoBody = `${item.name}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal,  { backdrop: 'static', keyboard: false });
  }

  confirmDelete() {
    // let id = this.deleteData?._id;
    let params = [{
      name: this.deleteData.name,
      subnets: this.deleteData.subnets
    }];

    this.deleteSubs = this.service.deleteSubnet(this.ORG_ID, params).subscribe((res: any) => {
      this.deleteResponse=res;
      this.isRerender = true;
      this.getSubnets();
      this.closeDeleteModal();
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  cancelDelete() {
    this.deleteData = undefined;
  }

  closeDeleteModal() {
    this.deleteData = undefined;
    this.closeModal();
  }

  selectDeselectAll(isChecked) {
    this.deleteIds = [];
    this.deleteSubnets = [];
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
        let d = that.subnetData.filter((el) => el._id === id);
        that.deleteIds.push(id);
        that.deleteSubnets.push(d[0].name);
        i++;
      });
    } else {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.deleteSubnets = [];
        i++;
      });
    }

  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.deleteSubnets = [];
    this.selectDeselectAll(true);
  }

  deleteAllSelected() {

    if (this.deleteSubnets) {
      this.deleteSubnets.sort();
      this.deleteIds.sort();
      this.infoTitle = this.language[this.deleteSubnets.length === 1 ? 'Delete selected endpoint subnet rule?' : 'Delete selected endpoint subnet rules?'];
      this.infoBody = this.deleteSubnets.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }


  }

  confirmDeleteSecleted(): void {
    let params = [];
    this.subnetData?.forEach(element => {
      if (this.deleteIds.includes(element._id)) {
        params.push({
          name: element.name,
          subnets: element.subnets,
        })
      }
    });

    this.deleteSubs = this.service.deleteSubnet(this.ORG_ID, params).subscribe((res: any) => {
      this.selectedDelete=res;
      this.isRerender = true;
      this.deleteIds = [];
      this.deleteSubnets = [];
      this.getSubnets();
      this.closeMultiDeleteModal();
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }


  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deleteSubnets = [];
    this.closeModal();
  }

  //CCL-52025
  // fullImportFileUpload(ev) {
  //   this.fileChangeSubs = this.commonFunctionsService.onFileChange(ev).subscribe(data => {
  //   });

  // }

  export() {
    let name = this.commonFunctionsService.generateExportName('subnet_rule', true);

    this.exportCSVSubs = this.service.Export(this.ORG_ID).subscribe((res: any) => {
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

  //exportPdf() {
    // this.exportPDFSubs = this.service.Export(this.ORG_ID).subscribe((res: any) => {
    //   let name = this.commonFunctionsService.generateExportName('subnet_rule');
    //   let exportData = this.exportDataConvertor(res);
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
    // });
  //}

  exportDataConvertor(array) {
    if (Array.isArray(array)) {
      if (array.length === 0) { array.push({ name: '', subnets: '' }) }
      array.forEach(el => {
        el = this.commonFunctionsService.columnNameFromKeys(el, this.exportColoumnNames);
        delete el._id
        for (const key in el) {
          if (typeof el[key] == 'boolean') {
            if (el[key] == true) {
              el[key] = 'Yes'
            } else {
              el[key] = 'No'
            }
          }
        }
      });
    }
    return array;
  }
  //cancelImport() { }

  fullImportUpload() {
    this.infoTitle = this.language.fullImport;
    this.infoBody = this.language.fullImportPrompt;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.importModal, { backdrop: 'static', keyboard: false });
  }

  proceedImport() {
    $("#fullImportUpload").click();
    this.closeModal();
  }

  fullImport(file, full: boolean) {
    this.isFullImport = full;
    const input: any = [...file.target.files];
    if (input[0].name.split('.').pop() == 'csv') {      
      this.dataTablecreatorService.getJsonFromCsv(file);
      file.target.value = '';
    } else {
      file.target.value = '';

      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      this.loading = false;
      this.cancel()
      return;
    }
  }

  //COMMENT FOR CCL-52025 
  // tableDataRecreate(excelData, staticSubnets, locationSubnets) {
  //   let tempRecreateTable, existingIPs = [], checkedIPs = [], tempSubnetData = Object.assign([], this.subnetData);
  //   const importType = sessionStorage.getItem('importType');

  //   tempSubnetData.forEach(obj => {
  //     if (obj.subnet && obj.subnet.trim()) existingIPs.push(obj.subnet);
  //   });

  //   excelData.forEach((excelObj, i) => {
  //     let index = existingIPs.indexOf(excelObj.subnet);
  //     const ip = this.service.trimSubnet(excelObj.subnet);
  //     const isValid = this.commonFunctionsService.isValidSubnetV4(ip) || this.commonFunctionsService.isValidSubnetV6(ip);

  //     if (excelObj.subnet.trim() != "" && (index + 1) && importType != "IncImport") {
  //       if (staticSubnets.includes(excelObj.subnet) && locationSubnets.includes(excelObj.subnet))
  //         excelObj["action"] = "Can not delete as static subnet and location is linked to it";
  //       else if (staticSubnets.includes(excelObj.subnet))
  //         excelObj["action"] = "Can not delete as static subnet is linked to it";
  //       else if (excelObj.subnet.trim() != "" && isValid)
  //         excelObj["action"] = "InvalidSubnet";
  //       else if (checkedIPs.includes(excelObj["subnet"]))
  //         excelObj["action"] = "Duplication subnet name. this line will be ignored.";
  //       else
  //         excelObj["action"] = "Delete";

  //       excelObj[`old_excluded`] = tempSubnetData[index]["excluded"];
  //       if (tempSubnetData[index]["subnet"].trim()) checkedIPs.push(tempSubnetData[index]["subnet"]);
  //       existingIPs.splice(index, 1);
  //       tempSubnetData.splice(index, 1);
  //     } else {
  //       if (excelObj.subnet.trim() != "" && isValid)
  //         excelObj["action"] = "InvalidSubnet";
  //       else if (checkedIPs.includes(excelObj["subnet"]))
  //         excelObj["action"] = "Duplication subnet name. this line will be ignored.";
  //       else
  //         excelObj["action"] = "Create";
  //       excelObj[`old_excluded`] = "";
  //       if (excelObj["subnet"].trim()) checkedIPs.push(excelObj["subnet"]);
  //     }

  //     for (const [key, value] of Object.entries(excelObj)) {
  //       if (value === true) excelObj[key] = "Yes"
  //       else if (value === false) excelObj[key] = "No"
  //     }
  //   });

  //   tempRecreateTable = Object.assign([], excelData);
  //   let previewResult = Object.assign([], excelData);
  //   if (tempSubnetData.length && importType != "IncImport") {
  //     tempSubnetData.forEach(element => {
  //       element["action"] = "Delete"
  //       for (const [key, value] of Object.entries(element)) {
  //         if (value === true) element[key] = "Yes"
  //         else if (value === false) element[key] = "No"
  //       }
  //       previewResult.push(element);
  //     });
  //   }

  //   this.recreateTable = tempRecreateTable;
  //   return previewResult;
  // }

  disabledSubmitBtn() {
    if (!this.isFullImport && this.disableIcImportSubmitBtn ||this.isFullImport && !this.disableSubmitFullImport || this.isFullImport && !this.disableSubmitImport ) {
      return true;
    } else {
      return false;
    }
  }

  compareJsonToTableData(json: any) {
    let tableData = this.subnetData.length ? this.subnetData : [];
    let comparedData = [];
    let isAvailable = false;
    json.forEach(imp => {
      let action = 'Create';
      isAvailable = false;
      if (tableData.filter((tbl) => (tbl.subnets == imp.subnets)).length) {
        isAvailable = true;
        action = 'Update';
        if (this.isFullImport) {
          action = "Create";
          imp.action = action;
          this.importUpdateASCreate.push(imp);
        } else {
          action = "Update";
        }

      }

      if (imp.subnets || imp.name) {
        comparedData.push({
          "action": action,
          "subnets": imp.subnets,
          "name": imp.name
        });
      }
    });

    if (!comparedData.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      this.loading = false;
      this.cancel()
      return;
    }


    if (this.isFullImport) {
      let deleteData = [];
      tableData.forEach(tbl => {
        isAvailable = false;
        if (comparedData.filter((cmp) => (cmp.subnets == tbl.subnets)).length == 0) {
          deleteData.push({
            "action": "Delete",
            "subnets": tbl.subnets,
            "name": tbl.name
          })
        }
      });
      this.importDeleteData = deleteData;
      //comparedData = [...comparedData, ...deleteData];
    }
    /* CCL-50376 */
    /* Check duplicate name if exist merge ip with single object */
    let temp = {};
    const lookup = comparedData.reduce((a, e) => {
      if (temp[e.name]) {
        temp[e.name].subnets = `${temp[e.name].subnets}|${e.subnets}`
      } else {
        temp[e.name] = e;
      }
      return temp;
    }, {});
    comparedData = Object.values(temp);
    this.loading = true;
    this.submitImport(true, comparedData);
  }

  submitImport(isDryRun = false, comparedData?) {
    this.disableIcImportSubmitBtn = false;
    let importRows;
    let importParams = {
      clientIP: this.storageData["clientIp"],
      dry_run: isDryRun,
      full_import: this.isFullImport,
      import_data: [],
      orgId: this.ORG_ID ? this.ORG_ID : 50,
      userId: this.sso.getUserId()
    }

    let data = isDryRun ? comparedData : [];
    if (!isDryRun) {
      this.importData.forEach((element: any) => {
        if (['Create', 'Update'].includes(element.action)) {
          data.push({
            "action": this.isFullImport ? 'Create' : element.action,
            "subnets": element.subnets,
            "name": element.name,
            // "orgId": this.ORG_ID,
            // "tenantId": 0
          })
        }
      });
      if (!data.length && this.importDeleteData.length) {
        this.disableSubmitFullImport = false;
        this.disableSubmitImport =false;
      }
      if (!data.length && !this.importDeleteData.length) {
        this.infoTitle = this.language.noAvailableChange;
        this.infoBody = '';
        this.openInfoModal(false);
        this.loading = false;
        this.cancel();
        return;
      }

      if (!this.isFullImport) {
        const keys = this.subnetData.map(e => String(e.subnets))
        data = data.filter(e => !keys.includes(String(e.subnets)))
      }
    }
    importParams.import_data = data;

    this.importSubs = this.service.importSubnets(importParams, this.ORG_ID).subscribe((res: any) => {
      //if (isDryRun) {
      //   res = res.map(obj => {
      //     obj["action"] = obj["validationResult"].toLowerCase() == "ok" ? obj["action"] : obj["validationResult"];
      //     return obj;
      //   });
      //   this.recreateTable = res;
      //   this.previewOrder([...res, ...deleteObj]);
      //   this.buttonVisible = false;
      //   this.tablePreview = true;
      // } else {
      //   this.cancel();
      //   this.isRerender = true;
      //   this.getSubnets();
      // }

      if (isDryRun) {
        if (res && res.data && res.data.length == 0) {
          this.infoTitle = this.language.noAvailableChange;
          this.infoBody = '';
          this.openInfoModal(false);
          this.loading = false;
        }
        this.importData = res ? res : [];
        this.checkDryRunData(res);
        this.loading = false;
      } else {
        this.cancel();
        this.isRerender = true;
        this.getSubnets();

      }

    },
      (err: HttpErrorResponse) => {
        if (err.status == 400) {
          if (isDryRun) {
            this.infoTitle = this.language.objectNotFound;
            this.infoBody = '';
            this.closeModal();
            this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
          } else {
            this.pageErrorHandle(err);
          }
        } else {
          this.pageErrorHandle(err);
        }
        this.loading = false;
      });
  }

  checkDryRunData(resData: any) {
    let data = resData ? resData.slice(0) : [];

    this.enableImportSubmit = false;
    //if (data && data.length) this.enableImportSubmit = true;
    this.importTableData = [];
    let tableData = this.subnetData?.length ? this.subnetData : [];
    data.forEach(e => {
      if (e.validationResult.toLowerCase() != 'ok') {
        e.action = e.validationResult;
      }

      if (e.validationResult.toLowerCase() == 'ok') {
        this.enableImportSubmit = true;
      }

      e['subnets_old'] = '';
      let match = tableData.filter((tbl) => tbl.name == e.name);
      if (match.length) {
        if (this.isFullImport && e.action == 'Create') {
          e.action = 'Update';
        }
        e['subnets_old'] = match[0].subnets ? match[0].subnets : '';
      }
      this.importTableData.push(e);
    });

    if (!this.isFullImport) {
      let keys = tableData.map(e => String(e.subnets))
      if (!data.filter(e => !keys.includes(String(e.subnets)) && e.validationResult === 'ok').length) {
        this.disableIcImportSubmitBtn = true;
      } else {
        this.disableIcImportSubmitBtn = false;
      }
    }

    if (this.isFullImport && this.importDeleteData.length) {
      this.importDeleteData.forEach(e => {
        e['subnets_old'] = '';
        this.importTableData.push(e);
      });
    }
      if(this.importTableData){
        this.disableSubmitFullImport = this.importTableData?.some(obj => obj.validationResult !== "Invalid subnet");
        this.disableSubmitImport = this.importTableData?.some(obj => obj.validationResult !== "Not in a valid subnet");
      }

    this.formVisible = false;
    this.buttonVisible = false;
    this.tablePreview = true;
  }

  //CCL-52025
  // importTemplate(element, action) {
  //   return {
  //     "action": action,
  //     "name": element.name,
  //     "subnets": element.subnets
  //   }
  // }

  //previewOrder(res) {
    // if (!res || res.length == 0) {
    //   this.infoTitle = this.language.noAvailableChange;
    //   this.infoBody = '';
    //   this.openInfoModal(false);
    //   return;
    // }
    // let previewData = [];
    // const streamInputCheck = [""], keysToExclude = ["validationResult"], keysWithoutOld = ["action", "name"];
    // //this.importTableOptions.columns = this.dataTablecreatorService.tableOptionsCreator(res[0], this.language, keysToExclude, keysWithoutOld);
    // res.forimport { element } from 'protractor';
    // Each(resObj => {
    //   let newObj = {};
    //   Object.keys(resObj).forEach(keys => {
    //     if (!keysToExclude.includes(keys)) {
    //       if (streamInputCheck.includes(keys) && (resObj[keys] === "true" || resObj[keys].toString().toUpperCase == 'Y')) newObj[keys] = 'Yes';
    //       else if (streamInputCheck.includes(keys) && (resObj[keys] === "false" || resObj[keys].toString().toUpperCase == 'N')) newObj[keys] = 'No';
    //       else newObj[keys] = resObj[keys];
    //       if (!keysWithoutOld.includes(keys)) newObj['Old ' + keys] = '';
    //     }
    //   });
    //   this.subnetData.forEach(tableObj => {
    //     if (resObj.name == tableObj.name) {
    //       for (const [key, value] of Object.entries(newObj)) {
    //         if (key.includes("Old")) {
    //           const exactKey = key.replace("Old ", "");
    //           if (streamInputCheck.includes(exactKey) && (tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'Y')) newObj[key] = 'Yes';
    //           else if (streamInputCheck.includes(exactKey) && (!tableObj[exactKey] || tableObj[exactKey].toString().toUpperCase == 'N')) newObj[key] = 'No';
    //           newObj[key] = tableObj[exactKey]
    //         }
    //       }
    //       return false;
    //     }
    //   });
    //   previewData.push(newObj);
    // });
    // this.previewTableBody = previewData;
 // }

  reset() {
    this.createName = '';
    this.createSubnet = '';
    this.editName = '';
    this.editSubnet = '';

    this.createSubnetsList = [];
    this.editSubnetsList = [];

    this.editData = undefined;
    this.editOnValue = undefined;

  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
      this.importTableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.translateService.es;
      this.importTableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.importTableOptions.language = this.translateService.de_DE;
      this.tableOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language|| this.language.fileLanguage == 'en' && this.importTableOptions.language ) {
      delete this.tableOptions.language;
      delete this.importTableOptions.language 
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deleteSubnets = [];
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

  addEditSubnet() {
   
    this.editSubnet = this.editSubnet.trim();
    if (this.editSubnet == '') {
      return;
    }

    if (!this.subnetValidatorIpv4(this.editSubnet) && !this.subnetValidatorIpv6(this.editSubnet)) {
      this.infoTitle = 'Invalid request';
      this.infoBody = "";
      this.openInfoModal(false);
      return;
    }

    if (this.editSubnetsList.includes(this.editSubnet)) {
      this.infoTitle = 'Invalid request';
      this.infoBody = this.language['Duplicate Subnet'];
      this.openInfoModal(false);
      return;

    }
    this.editSubnetsList.push(this.editSubnet);
    this.editSubnet = '';
  }

  removeEditSubnet(rid) {
    this.editSubnetsList.splice(rid, 1);
  }

  setStorageData() {
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse, title?: string) {
    let errorInfo = '';
    if (err.status == 400 || err.status == 417) {
      if (err.status == 417 && err?.error?.message) {
        this.infoBody = err?.error?.message;
      } else {
        this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      }
      this.infoTitle = title ? title : 'Error';
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
      setTimeout(() => {
        this.commonOrgService.closeAlert();
      }, 3000)
    }

  }

  openInfoModal(invalidImportSubnet: boolean) {
    if (!invalidImportSubnet) this.invalidImportSubnet = []
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('endpoint_subnets', url);
  }
  showEditDataInput(ind, type) {

    this.modifyDataInfo = {
      index: ind,
      type: type
    };
    this.newEditDataValue = '';
    this.newEditDataValue = this.editSubnetsList[ind];

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
    if (this.newEditDataValue == '') {
      this.infoTitle = this.language['Subnet cannot be empty'];
      this.infoBody = ``;
      this.openInfoModal(false);
      return;
    }

    if (!this.subnetValidatorIpv4(this.newEditDataValue) && !this.subnetValidatorIpv4(this.newEditDataValue)) {
      this.infoTitle = this.language['Invalid Subnet format'];
      this.infoBody = `${this.newEditDataValue}`;
      this.openInfoModal(false);
      return;
    }

    if (this.editSubnetsList.includes(this.newEditDataValue) && this.editSubnetsList.indexOf(this.newEditDataValue) != index) {
      this.infoTitle = this.language['Duplicate Subnet'];
      this.infoBody = `${this.newEditDataValue}`;
      this.openInfoModal(false);
      return;

    }
    this.editSubnetsList[index] = this.newEditDataValue;
    this.newEditDataValue = '';
    this.hideEditDataInput();
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
