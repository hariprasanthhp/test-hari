declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { Subject, Observable, forkJoin } from 'rxjs';
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
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';

@Component({
  selector: 'app-subnets',
  templateUrl: './subnets.component.html',
  styleUrls: ['./subnets.component.scss']
})
export class SubnetsComponent implements OnInit {

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  language: any;
  pageAvailable: boolean = false;

  formVisible: boolean = false;
  buttonVisible: boolean = true;
  updateDis: boolean = true;
  selectOptions = ['No', 'Yes'];
  selectedSubnet = 'No';
  storageData = {};
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    order: [1, 'asc'],
    columnDefs: [
      { targets: [0], orderable: false }
    ],
    drawCallback: (settings) => {
      let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 1;
      let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'asc';
      this.sortData = {
        column: col,
        type: type
      };
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
    subnet: '',
    excluded: ''
  };

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
  sortData = {
    column: 1,
    type: 'asc'
  }


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
  ) {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;

      this.dataAvailable = false;
      this.isRerender = true;
      this.setTableOptions('language');
    });

    this.commonOrgService.closeAlert();

    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.frTable = this.translateService.fr;

  }

  subscription;
  ngOnInit() {
    this.getSubnets();
    this.tableLanguageOptions();
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;

    this.subscription = this.dataTablecreatorService.tableOptionsData.subscribe((res: any) => {
      try {
        this.recreateTable = res;
        this.submitImport(true);
      } catch (ex) {
        console.log("Exception = " + ex);
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
    this.listSubs = this.apiService.getSubnets(this.ORG_ID).subscribe((data: any) => {
      //console.log(data)
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
      drawCallback: (settings) => {
        let col: number = settings.aaSorting[0][0] ? settings.aaSorting[0][0] : 1;
        let type = settings.aaSorting[0][1] ? settings.aaSorting[0][1] : 'asc';
        this.sortData = {
          column: col,
          type: type
        };
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
      isstatic: false,
      isv4: this.isIPv4,
      orgId: this.ORG_ID,
      subnet: this.subnet,
      tenantId: 0
    };
    this.loading = true;
    this.createSubs = this.apiService.addSubnet(params, this.ORG_ID).subscribe((json: any) => {
      ////console.log(json);
      this.isRerender = true;
      this.cancel();
      this.getSubnets();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  edit(item) {
    //console.log(item);
    this.editData = item;
    this.editOnValue = item._id;
    this.editSubnetv4 = item.subnet; // using this editSubnetv4 var as common for edit ipv4  ipv6
    // this.editSubnetv6 = item.subnetIP6;
    this.editSelectedExcluded = item.excluded;
    this.editSubnetVersionsSelected = item.isv4 ? 'SubnetIPV4' : 'SubnetIPV6';

  }

  updateSave(id: string) {

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
      isstatic: false,
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
    ////console.log(ip)
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
    ////console.log(ip)
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
    this.infoTitle = this.language['Delete subnet'];
    this.infoBody = `${item.subnet}`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal);
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
      this.deleteIds.splice(this.deleteIds.indexOf(item.value), 1);
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

    //console.log(this.deleteIds);
  }

  selectDeselectAll(isChecked) {
    this.deleteIds = [];
    this.deleteSubnets = [];

    let i = 0;
    let tot = $('input[name^="delete_id_"]').length;
    var that = this;
    if (isChecked) {
      $('input[name^="delete_id_"]').each(function () {
        console.log(i)
        if (i >= tot) {
          return false;
        }
        console.log(i)
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

    console.log(this.deleteSubnets);
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
      this.infoTitle = this.language['Delete selected subnet'];
      this.infoBody = this.deleteSubnets.join(", <br>");
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal);
    }

  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    this.loading = true;
    this.deleteIds.forEach(id => {
      deleteCalls.push(this.apiService.deleteSubnet(id, this.ORG_ID));
    });
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.deleteSubnets = [];
        //console.log(resultArray);
        this.isRerender = true;
        this.getSubnets();

        this.closeMultiDeleteModal();

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.deleteSubnets = [];
    this.closeModal();
  }



  fullImportFileUpload(ev) {
    this.commonFunctionsService.onFileChange(ev).subscribe(data => {
      //console.log(data);
    });

  }

  export() {
    let name = this.commonFunctionsService.generateExportName('subnet');

    this.exportSubs = this.apiService.Export('subnets', this.ORG_ID).subscribe((res: any) => {
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
    if (array) {
      array.forEach(el => {
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

  cancelImport() { }

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

  fullImport(file, type) {
    this.isFullImport = type;
    this.dataTablecreatorService.generateJsonFromCsv(file);

  }


  submitImport(isDryRun = false) {
    console.log(this.recreateTable);

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
        if (element.subnet && element.excluded != undefined) {
          data.push(this.importTemplate(element, action));
        }
      });
    } else {
      this.recreateTable.forEach((element: any) => {
        if (element.subnet && element.excluded != undefined) {
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
      this.loading = true;
    }

    if (!data.length) {
      this.infoTitle = this.language.objectNotFound;
      this.infoBody = '';
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal);
      return;
    }

    importParams.import_data = data;

    console.log(data)

    this.importSubs = this.apiService.importSubnets(importParams, this.ORG_ID).subscribe((res: any) => {
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

  importTemplate(element, action?) {
    return {
      action: action ? action : element.action,
      subnet: element.subnet,
      excluded: typeof element.excluded == "boolean" ? element.excluded : (element.excluded.toUpperCase() == 'N' || element.excluded.toUpperCase() == "NO") ? false : true,
      isstatic: typeof element.isstatic == "boolean" ? element.isstatic : (element.isstatic.toUpperCase() == 'N' || element.isstatic.toUpperCase() == "NO") ? false : true,
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

    this.editData = undefined;
    this.editOnValue = undefined;

  }

  subnetVerChoose() {
    //console.log(this.subnetVersionsSelected)
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
    } else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
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
      this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
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
    this.modalRef = this.dialogService.open(this.infoModal);
  }
  objmodifycheck(id) {
    this.updateDis = true;
    this.subnetData.forEach(objSubnet => {
      if (objSubnet._id == id) {
        if (objSubnet.excluded != this.editSelectedExcluded || (objSubnet.isv4 ? 'SubnetIPV4' : 'SubnetIPV6') != this.editSubnetVersionsSelected || objSubnet.subnet != this.editSubnetv4.trim()) {
          this.updateDis = false;
        } else {
          this.updateDis = true;
        }
      }
    })
  }
}
