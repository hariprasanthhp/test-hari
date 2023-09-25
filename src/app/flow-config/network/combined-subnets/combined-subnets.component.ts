declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { Subject, Observable, forkJoin, from, of, concat } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { NetworkSubnetsApiService } from '../../services/network-subnets-api.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-combined-subnets',
  templateUrl: './combined-subnets.component.html',
  styleUrls: ['./combined-subnets.component.scss']
})
export class CombinedSubnetsComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;
  editsubnetStatic: boolean = false;
  formVisible: boolean = false;
  buttonVisible: boolean = true;
  currentTableRowCount = 0;
  /* CCL-40355 */
  public updateDis: boolean = true;
  selectOptions = ['No', 'Yes'];
  selectedSubnet = 'No';
  storageData = {};
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

      this.resetDelete();

      this.currentTableRowCount = settings.aiDisplay.length;
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  subnetData: any = [];
  exportData: any;
  dataAvailable: boolean;
  newSubnet: string = '';
  newSubnetV6: string;
  newSubnetipv4: any;
  newSubnetipv6: any;
  subnet: string;
  //newASN: string;
  params: {};
  empty = {
    'Subnet': '',
    'Excluded': '',
    'Is v4': '',
    'Static': ''
  }

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
  editSubnet: string;
  editSubnetv4: string;
  editSubnetv6: string;
  editSelectedExcluded: any;

  deleteData: any;


  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtTrigger: Subject<any> = new Subject();

  isRerender = false;


  deleteIds = [];
  deleteSubnets = [];

  ORG_ID: string;

  subnetVersions: any = ['SubnetIPV4', 'SubnetIPV6'];
  subnetStatic: any = ['Yes', 'No'];
  subnetVersionsSelected: any = 'SubnetIPV4';
  editSubnetVersionsSelected: any;
  subnetStaticSelected: any = 'No';
  eidtsubSelected: any;

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
  sortData = {
    column: 1,
    type: 'asc'
  }
  private columnName = {
    subnet: 'Subnet',
    excluded: 'Excluded',
    isv4: 'Is v4',
    isstatic: 'Static',
    /* CCL-42127 */
    /* orgId: 'Org Id',
    tenantId: 'Tenant Id' */
  };
  exportColoumnNames:any;

  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private apiService: NetworkSubnetsApiService,
    private exportExcel: ExportExcelService,
    private dataTablecreatorService: DataTablecreatorService,
    // private customTranslateService: CustomTranslateService,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private router: Router,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private titleService: Title,
    private common:common,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.exportColoumnNames = {
      subnet:  this.language['Subnet'],
      excluded:  this.language['excluded'],
      isv4:this.language['isv4'],
      isstatic: this.language['Static'],
      /* CCL-42127 */
      /* orgId: 'Org Id',
      tenantId: 'Tenant Id' */
    }
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      this.exportColoumnNames = {
        subnet:  this.language['Subnet'],
        excluded:  this.language['excluded'],
        isv4:this.language['isv4'],
        isstatic: this.language['Static'],
        /* CCL-42127 */
        /* orgId: 'Org Id',
        tenantId: 'Tenant Id' */
      }
      this.dataAvailable = false;
      this.isRerender = true;
      this.titleService.setTitle(`${this.language['subnets']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ?
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.setTableOptions('language');
    });

    this.commonOrgService.closeAlert();

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['subnets']} - ${this.language['Network']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ?
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);

  }

  subscription;
  ngOnInit() {
    this.removeState();
    this.getSubnets();
    this.tableLanguageOptions();
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;

    this.subscription = this.dataTablecreatorService.tableOptionsData.subscribe((res: any) => {
      try {
        (res || []).forEach(el => this.commonFunctionsService.keysFromColumnName(el, this.exportColoumnNames))
        this.recreateTable = res;
        this.submitImport(true);
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


  create() {
    this.buttonVisible = false;
    this.formVisible = true;
    this.reset();
  }

  getSubnets() {
    this.listSubs = this.apiService.getSubnets(this.ORG_ID, true).subscribe((data: any) => {
      if (data) {
        this.subnetData = [...this.processData(data)];
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
        this.exportData = this.apiService.exportProcess(data);
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
      for (let key in obj) {
        if (key == 'excluded') {
          obj['excluded'] = obj[key] ? 'Yes' : 'No';
        }
        if (key == 'isstatic') {
          obj['isstatic'] = obj[key] ? 'Yes' : 'No';
        }
      }

      obj.subnetIP4 = obj.isv4 ? obj.subnet : '';
      obj.subnetIP6 = !obj.isv4 ? obj.subnet : '';
    });

    return data;
  }



  submit() {

    if (this.subnetVersionsSelected == 'SubnetIPV4' && this.newSubnetipv4 != undefined) {
      this.validateSubnetv4(this.newSubnetipv4);
    } else if (this.subnetVersionsSelected == 'SubnetIPV6' && this.newSubnetipv6 != undefined) {
      this.validateSubnetv6(this.newSubnetipv6);
    }

    if ((this.newSubnetipv4 == undefined || this.newSubnetipv4 == '') && (this.newSubnetipv6 == undefined || this.newSubnetipv6 == '')) {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }

    if (this.subnetError) {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = this.newSubnetipv4 ? this.newSubnetipv4 : this.newSubnetipv6;
      this.openInfoModal();
      return;
    }

    let params = {
      excluded: (this.selectedSubnet == 'Yes') ? true : false,
      isstatic: (this.subnetStaticSelected == 'Yes') ? true : false,
      isv4: this.isIPv4,
      orgId: this.ORG_ID,
      subnet: this.subnet,
      tenantId: 0
    };
    this.loading = true;
    this.createSubs = this.apiService.addSubnet(params, this.ORG_ID).subscribe((json: any) => {
      this.isRerender = true;
      this.cancel();
      this.getSubnets();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  edit(item) {
    this.editData = item;
    this.editOnValue = item._id;
    this.editSubnetv4 = item.subnet; // using this editSubnetv4 var as common for edit ipv4  ipv6
    // this.editSubnetv6 = item.subnetIP6;
    this.eidtsubSelected = item.isstatic;
    this.editSelectedExcluded = item.excluded;
    this.editSubnetVersionsSelected = item.isv4 ? 'SubnetIPV4' : 'SubnetIPV6';
    if (this.deleteIds.indexOf(item._id) !== -1) {

      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteSubnets.splice(this.deleteSubnets.indexOf(item.subnet), 1);

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
    /* CCL-40355 */
    if (this.updateDis) return;

    if (this.editSubnetv4 == undefined || this.editSubnetv4 == '') {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = "";
      this.openInfoModal();
      return;
    }

    if (this.editSubnetv4 != undefined && this.editSubnetv4 != '' && this.editSubnetVersionsSelected == 'SubnetIPV4') {
      this.validateSubnetv4(this.editSubnetv4);
    } else if (this.editSubnetv4 != undefined && this.editSubnetv4 != '' && this.editSubnetVersionsSelected == 'SubnetIPV6') {
      this.validateSubnetv6(this.editSubnetv4);
    }

    if (this.subnetError) {
      this.infoTitle = this.language['Invalid subnet'];
      this.infoBody = (this.editSubnetVersionsSelected == 'SubnetIPV4') ? this.editSubnetv4 : this.editSubnetv6;
      this.openInfoModal();
      return;
    }

    let params = {
      _id: id,
      excluded: (this.editSelectedExcluded == 'Yes') ? true : false,
      isstatic: (this.eidtsubSelected == 'Yes') ? true : false,
      isv4: this.isIPv4,
      orgId: this.ORG_ID,
      subnet: this.subnet,
      tenantId: 0
    };

    this.loading = true;
    this.updateSubs = this.apiService.updateSubnet(id, params, this.ORG_ID).subscribe(res => {
      this.isRerender = true;
      this.cancel();
      this.getSubnets();
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

  validateSubnetv4(subnet: string) {
    this.subnetError = false;
    if (!subnet) {
      this.subnetError = true;
      return;
    }
    let ip = this.apiService.trimSubnet(subnet);
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

  /** Validation for Subent Ipv4 ends */

  /** Validation for Subnet IPv6 starts */

  validateSubnetv6(subnet: string) {
    this.subnetError = false;
    if (!subnet) {
      this.subnetError = true;
      return;
    }
    let ip = this.apiService.trimSubnet(subnet);
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

  /** Validation for Subent Ipv6 ends */

  cancel() {
    this.formVisible = false;
    this.buttonVisible = true;
    this.tablePreview = false;
    this.reset();
  }

  delete(item) {
    this.deleteData = item;
    this.infoTitle = this.language['Delete subnet?'];
    this.infoBody = `${item.subnet}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDelete() {
    let id = this.deleteData._id;
    this.loading = true;
    this.deleteSubs = this.apiService.deleteSubnet(id, this.ORG_ID).subscribe((res: any) => {
      this.isRerender = true;
      this.getSubnets();
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
      this.deleteSubnets.push(item.subnet);

      let tot = $('input[name^="delete_id_"]').length;
      if (this.deleteIds.length == tot) {
        $('#selectDeselectAll').prop('checked', true);
        $('#selectDeselectAll-span').hide();
      } else {
        $('#selectDeselectAll-span').show();
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item._id), 1);
      this.deleteSubnets.splice(this.deleteSubnets.indexOf(item.subnet), 1);


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
        that.deleteSubnets.push(d[0].subnet);
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
      this.infoTitle = this.language[this.deleteSubnets.length === 1 ? 'Delete selected subnet?' : 'Delete selected subnets?'];
      this.infoBody = this.deleteSubnets.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }

  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.loading = true;
    // this.deleteIds.forEach(id => {
    //   deleteCalls.push(this.apiService.deleteSubnet(id, this.ORG_ID));
    // });
    // forkJoin(deleteCalls).subscribe(
    //   resultArray => {
    //     this.deleteIds = [];
    //     this.deleteSubnets = [];
    //     this.isRerender = true;
    //     this.getSubnets();

    //     this.closeMultiDeleteModal();

    //   }, (err: HttpErrorResponse) => {
    //     this.pageErrorHandle(err);
    //   });

    let deleteSubnetsIds = this.subnetData.filter(el => this.deleteIds.includes(el._id)).sort((a, b) => (a.excluded === b.excluded) ? 0 : (a.excluded === 'Yes') ? -1 : 1).map(el => el._id);
    deleteSubnetsIds.forEach(id => {
      deleteCalls.push(this.apiService.deleteSubnet(id, this.ORG_ID));
    });
    const len = deleteCalls.length;
    let i = 0;
    concat(...deleteCalls).subscribe((res) => {
      i++;
      if (len == i) {
        this.deleteIds = [];
        this.deleteSubnets = [];
        this.isRerender = true;
        this.getSubnets();
        this.closeMultiDeleteModal();
      }
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      })
  }

  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deleteSubnets = [];
    this.closeModal();
  }



  fullImportFileUpload(ev) {
    this.commonFunctionsService.onFileChange(ev).subscribe(data => {
    });

  }

  export() {
    let name = this.commonFunctionsService.generateExportName('subnet_file_export', true);

    this.exportSubs = this.apiService.Export('combined-subnets', this.ORG_ID).subscribe((res: any) => {
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

  exportPdf() {
    // this.exportSubs = this.apiService.Export('subnets', this.ORG_ID).subscribe((res: any) => {
    //   let name = this.commonFunctionsService.generateExportName('subnet');
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
    // },(err: HttpErrorResponse) => {
    //   this.pageErrorHandle(err);
    // });
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
        Object.keys(this.exportColoumnNames).forEach(key => {
          el[this.exportColoumnNames[key]] = el[key] !== null && el[key] !== undefined ? el[key] : '';
          delete el[key]
        })
        /* CCL-42127 */
        delete el._id;
        delete el['orgId'];
        delete el['tenantId'];
        // delete el['Org Id'];
        // delete el['Tenant Id'];
      });
    }
    return array;
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
    $("#fullImportUpload").val('');
    $("inc-import").val('');
  }

  fullImport(file, type) {
    this.isFullImport = type;
    this.dataTablecreatorService.generateJsonFromCsv(file);

  }


  submitImport(isDryRun = false) {

    let importRows;
    let importParams = {
      clientIP: this.storageData["clientIp"],
      dry_run: isDryRun,
      full_import: this.isFullImport,
      import_data: [],
      orgId: this.ORG_ID ? this.ORG_ID : 50,
      userId: this.storageData["UserId"]
    }
    let action;
    let data = [], deleteObj = [];
    if (isDryRun) {
      action = 'Create';
      this.recreateTable.forEach((element: any) => {
        if (element.subnet && element.excluded != undefined && element.isstatic != undefined) {
          data.push(this.importTemplate(element, action));
        }
      });
    } else {
      this.recreateTable.forEach((element: any) => {
        if (element.subnet && element.excluded != undefined && element.isstatic != undefined) {
          data.push(this.importTemplate(element));
        }
      });;
    }
    //let deleteObj = [], data = this.apiService.importDataProcess(this.recreateTable, this.isFullImport, isDryRun, importParams.orgId);
    if (isDryRun) {
      const dataLength = data.length;
      this.subnetData.forEach(existingObj => {
        let isAvailable = false;
        for (let i = 0; i < dataLength; i++) {
          if (existingObj.subnet == data[i].subnet) {
            isAvailable = true;
            if (this.isFullImport) {
              data[i]["action"] = "Create";
              this.importUpdateASCreate.push(existingObj);
            } else {
              if (this.findObjectsCountByValue(data, data[i].subnet) > 1) {
                const isStatic = typeof existingObj.isstatic == "boolean" ? existingObj.isstatic : (existingObj.isstatic.toUpperCase() == 'N' || existingObj.isstatic.toUpperCase() == "NO") ? false : existingObj.isstatic === "" ? false : true;
                if (isStatic === data[i].isstatic) {
                  data[i]["action"] = "Update";
                } else {
                  data[i]["action"] = "Create";
                }
              } else {
                data[i]["action"] = "Update";
              }
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
      this.loading = true;
    }

    if (!data.length) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
      return;
    }

    importParams.import_data = data;

    this.importSubs = this.apiService.importSubnets(importParams, this.ORG_ID, true).subscribe((res: any) => {
      if (isDryRun) {
        res = res.map(obj => {
          obj["action"] = obj["validationResult"].toLowerCase() == "ok" ? obj["action"] : obj["validationResult"];
          return obj;
        });
        this.recreateTable = res;
        this.previewOrder([...res, ...deleteObj]);
        this.buttonVisible = false;
        this.tablePreview = true;
      } else {
        this.importUpdateASCreate = [];
        this.cancel();
        this.isRerender = true;
        this.getSubnets();
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 400) {
        if (isDryRun) {
          this.infoTitle = this.language.objectNotFound;
          this.infoBody = '';
          this.closeModal();
          this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
        } else {
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
      action: action ? action : element.action,
      subnet: element.subnet,
      excluded: typeof element.excluded == "boolean" ? element.excluded : (element.excluded.toUpperCase() == 'N' || element.excluded.toUpperCase() == "NO") ? false : element.excluded === "" ? false : true, /* CCL-42128 */
      isstatic: typeof element.isstatic == "boolean" ? element.isstatic : (element.isstatic.toUpperCase() == 'N' || element.isstatic.toUpperCase() == "NO") ? false : element.isstatic === "" ? false : true, /* CCL-42128 */
      isv4: typeof element.isv4 == "boolean" ? element.isv4 : (element.isv4.toUpperCase() == 'N' || element.isv4.toUpperCase() == "NO") ? false : true,
      orgId: this.ORG_ID,
      tenantId: 0
    }
  }

  previewOrder(res) {
    if (!res || res.length == 0) {
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal();
      return;
    }
    let previewData = [];
    const streamInputCheck = ["excluded"], keysToExclude = ["validationResult"], keysWithoutOld = ["action", "subnet"];
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
      this.subnetData.forEach(tableObj => {
        if (resObj.subnet == tableObj.subnet) {
          for (const [key, value] of Object.entries(newObj)) {
            if (key.includes("Old")) {
              const exactKey = key.replace("Old ", "");
              if (streamInputCheck.includes(exactKey) && (tableObj[exactKey] || (tableObj[exactKey] && tableObj[exactKey].toString().toUpperCase == 'Y'))) newObj[key] = 'Yes';
              else if (streamInputCheck.includes(exactKey) && (!tableObj[exactKey] || (tableObj[exactKey] && tableObj[exactKey].toString().toUpperCase == 'N'))) newObj[key] = 'No';
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

  reset() {
    this.newSubnetipv4 = undefined;
    this.newSubnetipv6 = undefined;
    this.subnet = undefined;
    this.selectedSubnet = 'No';
    this.subnetStaticSelected = 'No';

    this.editData = undefined;
    this.editOnValue = undefined;

  }

  subnetVerChoose() {
  }

  editSubnetVerChoose() {
    if (this.editSubnetVersionsSelected == 'SubnetIPV4') {
      this.editSubnetv6 = undefined;
    } else {
      this.editSubnetv4 = undefined;
    }
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
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language || this.language.fileLanguage == 'en' && this.importTableOptions.language) {
      delete this.tableOptions.language;
      delete this.importTableOptions.language;
    }
  }

  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.deleteSubnets = [];
  }


  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if (err.status == 400) {
      let info = this.commonOrgService.pageErrorHandle(err);
      info = info ? info.trim() : '';
      if (info.toLowerCase() == 'subnet has excluded subnets') {
        this.infoBody = this.language['Subnet has excluded subnets, please delete the excluded subnets first'];
      } else this.infoBody = info;
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

  /* CCL-40355 */
  public objmodifycheck(id: string) {
    this.updateDis = true;
    let isStatic = 'No';
    this.subnetData.forEach(objSubnet => {
      if (objSubnet._id == id) {
        isStatic = (objSubnet.isstatic == true || objSubnet.isstatic == 'Yes') ? 'Yes' : 'No';
        if (objSubnet.excluded != this.editSelectedExcluded || (objSubnet.isv4 ? 'SubnetIPV4' : 'SubnetIPV6') != this.editSubnetVersionsSelected || objSubnet.subnet != this.editSubnetv4.trim() || isStatic != this.eidtsubSelected) {
          this.updateDis = false;
        } else {
          this.updateDis = true;
        }
      }
    })
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('network_subnets', url);
  }

  private findObjectsCountByValue(jsObjects, value: string): number {
    let count = 0;
    if (jsObjects && jsObjects.length) {
      for (let i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['subnet'] == value) {
          count++;
        }
      }
    }
    return count;
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
