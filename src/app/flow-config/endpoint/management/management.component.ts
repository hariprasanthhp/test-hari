declare var require: any;
const $: any = require('jquery');
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../../shared/services/auth.service';
import { environment } from './../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
// import { filter } from 'rxjs/operators';
import { ExportExcelService } from '../../../shared/services/export-excel.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
// import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';
// import * as jsPDF from "jspdf";
// import 'jspdf-autotable';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

class Management {

}


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;

  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('multiDeleteModal', { static: true }) private multiDeleteModal: TemplateRef<any>;
  @ViewChild('importModal', { static: true }) private importModal: TemplateRef<any>;
  @ViewChild('importFullInput', { static: false }) importFullInput: ElementRef;
  @ViewChild('importInput', { static: false }) importInput: ElementRef;
  @ViewChild('aggGroupsModal', { static: true }) private aggGroupsModal: TemplateRef<any>;

  subnetVersions: any = ['IP-V4', 'IP-V6'];
  subnetVersionsSelected: any = 'IP-V4';
  editIPVersionsSelected: any;
  editSubnetv4: string;
  editSubnetv6: string;
  newIpv4: any;
  newIpv6: any;
  newIP: string;
  tablePreview = false;

  createName: string;
  createView: boolean;
  createCurrentSubnet: any;
  createSubnets: any = [];

  tableOptions: DataTables.Settings = {
    drawCallback: (settings) => {
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  managementData: any = [];
  dataAvailable: any;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  dtTrigger: Subject<any> = new Subject();

  isRerender = false;

  exportData: any;

  dtOptions: DataTables.Settings = {
    order: [1, 'asc'],
    columnDefs: [
      { targets: [0], orderable: false }
    ],
    stateSave: false,
  };
  persons: Person[];

  tableCount: number;

  editOnValue: any;
  editData: any;
  editName: string;
  editIPAddress: string = '';
  editMapped: string;

  ORG_ID: string;

  IPError: boolean = false;
  nameError: boolean = false;
  infoTitle: string;
  infoBody: string;
  valid: boolean;
  importTableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    order: [0, 'asc'],
    //"scrollX": true,
    dom: 'tipr',
  };
  filters: any = [
    { label: 'IP', value: 'ip_address' },
    { label: 'Name', value: 'name' },
    { label: 'Mapped By', value: 'mapped_by' }
  ];
  filterBy: any = {
    label: 'IP', value: 'ip_address'
  };
  public filtersDev: any = [
    { label: 'ALL', value: 'NONE' },
    { label: 'ASSIGNED', value: 'ASSIGNED' },
    { label: 'DHCP', value: 'DHCP' },
    { label: 'CC', value: 'CC' },
    { label: 'CUSTOM', value: 'CUSTOM' },
    { label: 'RADIUS', value: 'RADIUS' },
    { label: 'CMS', value: 'CMS' },
    { label: 'SMx', value: 'SMx' }

  ];

  public filterByDev: any = {
    label: 'ALL', value: 'NONE'
  };

  sortBy: string | number;
  sortType: string;

  filterCount: string | number;
  loaded: boolean;

  frTable: any;
  translateSubscribe: any;
  tableCounts;

  private empty = {
    'IP': '',
    'Name': ''
  };
  storageData = {};
  recreateTable;
  isFullImport;

  importTableSubs: any;
  jsonSubs: any;
  importTableData: any = [];
  enableImportSubmit: boolean = false;
  buttonVisible: boolean = true;
  assignedData: any = [];
  assignedDataCount: number;
  importDeleteData: any = [];
  importData: any = [];
  impAssignedSubs: any;
  loading: boolean = true;
  modalRef: any;
  listSubs: any;
  createSubs: any;
  updateSubs: any;
  deleteSubs: any;
  exportSubs: any;
  importSubs: any;
  countSubs: any;
  filterCountSubs: any;
  importUpdateASCreate: any = [];

  mappedData: any = {};
  allManagementData: any = [];
  allManagementDataById: {};
  allDataLoading: boolean;
  aggregatedGroups: any[];
  aggregatedGroupsLoading: boolean;
  aggregatedGroupsSubs: any;
  aggError: boolean;
  aggErrorInfo: string;
  aggTableOptions: DataTables.Settings = {
    dom: 't',
    ordering: false
  };
  aggreDataAvail: boolean;
  filterLoading: boolean;
  filtering: boolean;
  private columnName = {
    ipAddress: 'IP',
    name: 'Name'
  }
  // public isDev = false;
  showTable = false;
  filterAndSearchFlag = false;
  public invalidImportEndPoint = [];
  exportColoumnNames:any;
  constructor(
    // private service: EndpointManagementService,
    private commonFunctionsService: CommonFunctionsService,
    // private customTranslateService: CustomTranslateService,
    private router: Router,
    private apiService: EndpointManagementService,
    private http: HttpClient,
    private exportExcel: ExportExcelService,
    private dataTablecreatorService: DataTablecreatorService,
    private sso: SsoAuthService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private translateService: TranslateService,
    private titleService: Title,
    private common:common,
  ) {
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    // this.isDev = this.sso.isDevCheckFromBaseURL();
    // this.isDev = !this.isDev;
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.exportColoumnNames={
      ipAddress: this.language['ip'],
      name:this.language['name']
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.exportColoumnNames={
        ipAddress: this.language['ip'],
        name:this.language['name']
      }
      //this.redraw();
      this.titleService.setTitle(`${this.language['management']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      this.reloadCurrentRoute();
      this.setFilterOptions();
    });

    let MODULE = this.sso.getRedirectModule(url);
    this.titleService.setTitle(`${this.language['management']} - ${this.language['end']} - ${this.language['flowconfiguration']} - ${MODULE === 'systemAdministration' ? 
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);


    this.commonOrgService.closeAlert();//*Imp
    this.getTableCount(true);
    this.frTable = this.translateService.fr;
  }

  ngOnInit() {
    this.reset();
    this.removeState();
    //this.managementData = this.service.getData();
    //this.getLists();
    //this.tableRender()
    this.tableLanguageOptions();
    //this.tableRender();

    // $("body").off('click', '.languageContent ul li a');
    // $("body").on('click', '.languageContent ul li a', () => {
    //   const tempObj = {
    //     _iDisplayStart: this.tableCounts.start,
    //     _iDisplayLength: this.tableCounts.displayCount,
    //     _iRecordsDisplay: this.tableCounts.displayed,
    //     _iRecordsTotal: this.tableCounts.total,
    //     oPreviousSearch: {
    //       sSearch: this.tableCounts.searchText
    //     }
    //   };
    //   this.changeTableStatusLanguage(tempObj);
    // });
    this.setFilterOptions();
    const tokenData = JSON.parse(localStorage.getItem("calix.login_data"));
    this.storageData["clientIp"] = tokenData?.clientIp;
    this.storageData["UserId"] = tokenData?.UserId;

    this.jsonSubs = this.dataTablecreatorService.jsonDataOfCSV.subscribe((res: any) => {
      this.invalidImportEndPoint = [];
      try {
        let importValidationFlag = true;
        (res || []).forEach(el => {
          this.commonFunctionsService.keysFromColumnName(el,this.exportColoumnNames)
          if (el.name && el.name.length > 64) {
            this.invalidImportEndPoint.push(el)
            this.infoTitle = this.language['Invalid Value'];
            this.infoBody = `${this.language['Invalid Name - Name should not exceed 64 characters.']}`;
            importValidationFlag = false;
            this.openInfoModal(true);
          }
        });
        // this.recreateTable = res;
        if (importValidationFlag) {
          this.compareJsonToTableData(res);
        }
      } catch (ex) {
      }
    });
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }


  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }

    if (this.jsonSubs) {
      this.jsonSubs.unsubscribe();
    }

    if (this.impAssignedSubs) {
      this.impAssignedSubs.unsubscribe();
    }

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

    if (this.countSubs) {
      this.countSubs.unsubscribe();
    }
    if (this.aggregatedGroupsSubs) this.aggregatedGroupsSubs.unsubscribe();


  }

  getTableCount(callAssignEndpoints: boolean) {
    this.showTable = false;
    this.managementData = [];
    this.countSubs = this.apiService.getCount(this.ORG_ID).subscribe((data: any) => {
      this.tableCount = data;
      if (callAssignEndpoints) {
        this.getAssignedData();
      }

      setTimeout(() => {
        this.showTable = true;
        this.tableRender();
      }, 1000)

      // this.getAllData();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    })
  }


  tableRender() {
    const that = this;
    let orgId = this.ORG_ID;
    let pageNumber: number;
    let url = `${environment.faAdminCorrelatorURL}flowendpoint`
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      order: [1, 'asc'],
      columnDefs: [
        { targets: [0], orderable: false }
      ],
      searchDelay: 1500,
      stateSave: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.filterLoading = true;
        this.sortBy = dataTablesParameters.order[0].column;
        this.sortType = dataTablesParameters.order[0].dir;
        let orderBy: string
        switch (this.sortBy) {
          case 1:
            orderBy = 'name'
            break;
          case 2:
            orderBy = 'ip'
            break;
          case 3:
            orderBy = 'mappedby'
            break;
          case 4:
            orderBy = 'agggroup'
            break;
        }
        let filterUrl: string;
        this.filterCount = undefined;
        if (dataTablesParameters.start == 0) {
          pageNumber = 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        // if (this.isDev) {
        if (dataTablesParameters.search.value && dataTablesParameters.search.value.trim() && dataTablesParameters.search.value.length) {
          this.filterByDev = this.filtersDev.find(el => el.value === 'NONE');
          this.filterAndSearchFlag = true;
          //if (dataTablesParameters.search.value.length > 1) {
          // url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&pagenumber=${pageNumber + 1}&pagesize=${dataTablesParameters.length}&whereclause=${this.filterBy.value}%20ilike%20%27%25${dataTablesParameters.search.value.trim()}%25%27%20AND%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27`  /* CCL-33173 */
          url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&searchstring=${dataTablesParameters.search.value.trim()}&pagenumber=${pageNumber}&pagesize=${dataTablesParameters.length}`
          if (this.sortType && orderBy) {
            url = `${url}&sortdirection=${this.sortType}&orderby=${orderBy}`
          }
          filterUrl = `${url}&count=true`;
          this.getFilterCount(filterUrl);
          that.filtering = true;
          // }
          //url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${dataTablesParameters.start}&pagesize=${dataTablesParameters.length}&${this.filterBy.value}=${dataTablesParameters.search.value}`
        } else {
          url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${pageNumber}&pagesize=${dataTablesParameters.length}&mappedby=${this.filterByDev.value}`
          if (this.sortType && orderBy) {
            url = `${url}&sortdirection=${this.sortType}&orderby=${orderBy}`
          }
          filterUrl = `${url}&count=true`;
          this.getFilterCount(filterUrl);
          that.filtering = true;
          this.filterAndSearchFlag = this.filterByDev.value !== 'NONE' ? true : false;

          // that.filtering = false;
        }
        // } else {
        //   if (dataTablesParameters.search.value && dataTablesParameters.search.value.trim() && dataTablesParameters.search.value.length) {
        //     //if (dataTablesParameters.search.value.length > 1) {
        //     url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&pagenumber=${pageNumber + 1}&pagesize=${dataTablesParameters.length}&whereclause=${this.filterBy.value}%20ilike%20%27%25${dataTablesParameters.search.value.trim()}%25%27%20AND%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27`
        //     filterUrl = `${url}&count=true`;
        //     this.getFilterCount(filterUrl);
        //     that.filtering = true;
        //     //}
        //     //url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${dataTablesParameters.start}&pagesize=${dataTablesParameters.length}&${this.filterBy.value}=${dataTablesParameters.search.value}`
        //   } else {
        //     url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${pageNumber}&pagesize=${dataTablesParameters.length}`
        //     that.filtering = false;
        //   }
        // }
        //that.loading = true;



        if (that.filtering) {
          that.filterCountSubs.subscribe((res: number) => {
            this.filterCount = res;

            //SAME FUNCTIONALITY - excutes after filtering subscritption
            that.http
              .get<DataTablesResponse>(
                url
              ).subscribe((resp: any) => {
                const isArray = Array.isArray(resp);
                if (isArray) {
                  that.managementData = this.sortData(resp, that.sortBy, that.sortType);
                } else {
                  that.managementData = [resp];
                }
                that.commonOrgService.closeAlert();

                that.hideNoDataRow();
                setTimeout(() => {
                  callback({
                    recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                    recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                    data: []
                  });
                  that.filterLoading = false;
                }, 200)

              },
                (err: HttpErrorResponse) => {
                  if (err.status == 404) {
                    that.managementData = [];
                    this.dataAvailable = true;
                    that.hideNoDataRow();
                    setTimeout(() => {
                      callback({
                        recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                        recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                        data: []
                      });
                      that.filterLoading = false;
                    }, 200)

                  } else {
                    this.pageErrorHandle(err);
                    this.dataAvailable = true;
                    that.filterLoading = false;
                  }
                });
          },
            (err: HttpErrorResponse) => {
              if (err.status == 404) {
                this.filterCount = 0;
              } else {
                this.pageErrorHandle(err);
              }

              //SAME FUNCTIONALITY - excutes after filtering subscritption
              that.http
                .get<DataTablesResponse>(
                  url
                ).subscribe((resp: any) => {
                  const isArray = Array.isArray(resp);
                  if (isArray) {
                    that.managementData = this.sortData(resp, that.sortBy, that.sortType);
                  } else {
                    that.managementData = [resp];
                  }
                  that.commonOrgService.closeAlert();

                  that.hideNoDataRow();
                  setTimeout(() => {
                    callback({
                      recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                      recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                      data: []
                    });
                    that.filterLoading = false;
                  }, 200)

                },
                  (err: HttpErrorResponse) => {
                    if (err.status == 404) {
                      that.managementData = [];
                      this.dataAvailable = true;
                      that.hideNoDataRow();
                      setTimeout(() => {
                        callback({
                          recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                          recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                          data: []
                        });
                        that.filterLoading = false;
                      }, 200)

                    } else {
                      this.pageErrorHandle(err);
                      this.dataAvailable = true;
                      that.filterLoading = false;
                    }
                  });
            })
        } else {

          //SAME FUNCTIONALITY - excutes after filtering subscritption
          that.http
            .get<DataTablesResponse>(
              url
            ).subscribe((resp: any) => {
              const isArray = Array.isArray(resp);
              if (isArray) {
                that.managementData = this.sortData(resp, that.sortBy, that.sortType);
              } else {
                that.managementData = [resp];
              }
              that.commonOrgService.closeAlert();

              that.hideNoDataRow();
              setTimeout(() => {
                callback({
                  recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                  recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                  data: []
                });
                that.filterLoading = false;
              }, 200)

            },
              (err: HttpErrorResponse) => {
                if (err.status == 404) {
                  that.managementData = [];
                  this.dataAvailable = true;
                  that.hideNoDataRow();
                  setTimeout(() => {
                    callback({
                      recordsTotal: that.tableCount != undefined ? that.tableCount : 100,
                      recordsFiltered: (that.filterCount != undefined) ? that.filterCount : that.tableCount,
                      data: []
                    });
                    that.filterLoading = false;
                  }, 200)

                } else {
                  this.pageErrorHandle(err);
                  this.dataAvailable = true;
                  that.filterLoading = false;
                }
              });
        }


      },
      drawCallback: (Settings) => {
        //this.changeTableStatusLanguage(Settings);
        this.tableLanguageOptions();
        this.getMappedData();
        setTimeout(() => {
          //this.resetDelete();
          that.loading = false;
          that.filterLoading = false;
          this.selectDeselectAll(false);
          $('#selectDeselectAll').prop("checked", false);
          $('#selectDeselectAll-span').hide();
        }, 200);
      },
      // columns: [{ data: 'ipAddress' }, { data: 'ipAddress' }, { data: 'cmMappedBy' }, { data: '' }]
    };
    this.tableLanguageOptions();


  }

  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }

  getFilterCount(url: string) {
    this.filterCountSubs = this.http.get(url);
    /*this.filterCountSubs = this.http.get(url).subscribe((res: number) => {
      this.filterCount = res;
    },
      (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.filterCount = 0;
        } else {
          this.pageErrorHandle(err);
        }
      })*/
  }

  redraw(clearInput) {
    //this.filterCount = undefined;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //console.log(dtInstance.search('').draw('page'));
      if (clearInput) {
        dtInstance.search('').draw('page');
      } else {
        dtInstance.draw('page');
      }
    });
  }

  setTableOptions() {
    this.tableOptions = {
      rowId: 'id',
      drawCallback: (settings) => {
        let total = settings.aoData.length;
        let length = settings._iDisplayLength;

        setTimeout(() => {
          this.resetDelete()
        }, 0);

        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
        }
      }
    };

    this.dataAvailable = true;

  }

  processData(data: any) {
    // data.forEach(obj => {
    //   for (let key in obj) {
    //     if (key == 'excluded') {
    //       obj['excluded'] = obj[key] ? 'Yes' : 'No';
    //     }
    //   }
    // });

    return data;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  showCreate() {
    this.createView = true;
    this.buttonVisible = false;
    this.tablePreview = false;
  }

  hideCreate() {
    this.createView = false;
    this.buttonVisible = true;
    this.tablePreview = false;
  }

  submit() {
    this.validation();
    if (!this.valid) {
      return;
    }

    if (this.createName && this.createName.length > 64) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = `${this.language['Invalid Name - Name should not exceed 64 characters.']}`;
      this.openInfoModal(false);
      return;
    }
    let name = this.createName.trim();
    this.loading = true;
    let url = `${environment.faAdminCorrelatorURL}assigned/subscriber?org-id=${this.ORG_ID}&ipAddress=${this.newIP}&name=${name}`;
    this.createSubs = this.apiService.AddIP(url).subscribe((res: any) => {
      this.getTableCount(true);
      // this.getAssignedData();
      this.reset();
      this.hideCreate();
      // this.redraw(false);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });

  }

  validation() {
    let ver = this.subnetVersionsSelected;
    this.IPError = false;
    this.nameError = false;
    if (ver == 'IP-V4' && this.newIpv4 != undefined && this.newIpv4 != '') {
      this.ipValidatorIpv4(this.newIpv4);
    } else if (ver == 'IP-V6' && this.newIpv6 != undefined && this.newIpv6 != '') {
      this.ipValidatorIpv6(this.newIpv6);
    } else {
      this.IPError = true;
    }

    if (this.IPError) {
      this.showInfo(this.language['Invalid Request'], this.language['Please enter a valid IP address']);
      this.valid = false;
      return;
    }

    if (this.createName == undefined || this.createName.trim() == '') {
      this.nameError = true;
      this.showInfo(this.language['Invalid Request'], this.language['Name cannot be empty']);
      this.valid = false;
      return;
    }

    if (!this.IPError && !this.nameError) {
      this.valid = true;
    }
    return;

  }

  ipValidatorIpv4(ip: string) {
    this.IPError = false;
    if (ip && ip != '') {
      if (this.commonFunctionsService.isValidIpV4Addr(ip)) {
        this.newIP = ip;
        this.IPError = false;
      } else {
        this.IPError = true;
      }
    }
  }

  ipValidatorIpv6(ip: string) {
    this.IPError = false;
    if (ip && ip != '') {
      if (this.commonFunctionsService.isValidIpV6Addr(ip)) {
        this.newIP = ip;
        this.IPError = false;
      } else {
        this.IPError = true;
      }
    }
  }

  reset() {
    this.createName = undefined;
    this.newIpv4 = undefined;
    this.newIpv6 = undefined;
    this.subnetVersionsSelected = 'IP-V4';
  }


  edit(item) {
    if (item['assignedName'] == '' || !item['assignedName']) { return; } /* CCL-42022 */
    else {
      this.editData = item;
      this.editOnValue = item.id;
      this.editName = item.name;
      this.editIPVersionsSelected = (this.commonFunctionsService.isValidIpV4Addr(item.ipAddress)) ? 'IP-V4' : 'IP-V6'
      this.editIPAddress = item.ipAddress;
      this.editMapped = item.cmMappedBy;

      let ip = item.ipAddress ? item.ipAddress : '';

      if (this.deleteIds.indexOf(item.id) !== -1) {
        this.deleteIds.splice(this.deleteIds.indexOf(item.id), 1);
        this.endpointIps.splice(this.endpointIps.indexOf(ip), 1);

        this.deleteEndpoints = this.deleteEndpoints.filter(function (obj) {
          return obj['id'] !== item.id;
        });

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

  }

  updateSave(id: string) {
    // if (this.editName == undefined || this.editName == '') {
    //   this.openInfoModal('Invalid name', '');
    //   return;
    // }

    let params = this.editData;
    let ver = this.editIPVersionsSelected;
    this.editIPAddress = this.editIPAddress.trim();
    let IPError = false;
    if (ver == 'IP-V4' && this.editIPAddress != '' && this.commonFunctionsService.isValidIpV4Addr(this.editIPAddress)) {
      params.ipAddress = this.editIPAddress;
    } else if (ver == 'IP-V6' && this.editIPAddress != '' && this.commonFunctionsService.isValidIpV6Addr(this.editIPAddress)) {
      params.ipAddress = this.editIPAddress;
    } else {
      IPError = true;
    }

    if (IPError) {
      this.showInfo(this.language['Invalid Request'], this.language['Please enter a valid IP address']);
      this.valid = false;
      return;
    }


    // params.name = this.editName;


    this.loading = true;
    this.updateSubs = this.apiService.updateManagement(this.ORG_ID, params).subscribe((res: any) => {
      this.getTableCount(true);
      // this.getAssignedData();
      this.reset();
      this.hideCreate();
      // this.redraw(false);
      this.editOnValue = undefined;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });

  }

  updateCancel() {
    this.editOnValue = undefined;
  }

  subnetVerChoose() {
  }

  editSubnetVerChoose() {
    if (this.editIPVersionsSelected == 'SubnetIPV4') {
      this.editSubnetv6 = undefined;
    } else {
      this.editSubnetv4 = undefined;
    }
  }
  cancelMultiDelete() {

  }
  gotoSubsDashboard(data: any) {
    sessionStorage.setItem('management_subscriber_data', JSON.stringify(data));
    this.router.navigate(['/subscriber-dashboard'])
  }

  showInfo(title: string, message: string) {
    this.infoTitle = title;
    this.infoBody = message;
    this.openInfoModal(false);
  }

  changeFilter() {
    this.filterAndSearchFlag = this.filterByDev.value !== 'NONE' ? true : false;
    //this.redraw(true);
    this.getTableCount(false);
  }

  sortData(data, by, type): any {
    let sorted = [];
    if (by == 1) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'name');
    } else if (by == 2) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'ipAddress');
    } else if (by == 3) {
      sorted = this.commonFunctionsService.sortByColumn(data, type, 'mappedBy');
    } else if (by == 4) {
      sorted = this.commonFunctionsService.sortByColumnAggregated(data, type, 'aggregated');
    }
    return sorted;
  }

  deleteData: any;
  delete(item) {
    let ip = item.ipAddress ? item.ipAddress : '';
    this.deleteData = item;
    item.name = item.name ? item.name : '';
    item.hostName = item.mappedBy ? item.mappedBy : '';
    this.infoTitle = this.language['Delete endpoint'];
    this.infoBody = `<tr><td>${item.name}</td><td>${ip}</td><td>${item.mappedBy}</td></tr>`;
    this.closeModal();
    this.modalRef = this.dialogService.open(this.deleteModal, { backdrop: 'static', keyboard: false });
  }

  confirmDelete() {
    let id = this.deleteData.id;
    // let name = this.deleteData.name;
    // let params = [{
    //   name: name,
    //   orgId: this.ORG_ID
    // }];
    // let isAssigned = false;
    // if (this.mappedData && this.mappedData[id] && this.mappedData[id] == 'ASSIGNED') {
    //   isAssigned = true;
    // }

    // let url = `${environment.faAdminCorrelatorURL}assigned/subscriber?org-id=${this.ORG_ID}`;
    // if (!isAssigned) {
      let url = `${environment.faAdminCorrelatorURL}/flowendpoint?org-id=${this.ORG_ID}&flowId=${id}`;
    // }
    this.loading = true;
    this.apiService.EndpointDelete(url).subscribe((res: any) => {
      this.deleteIds = [];
      this.endpointIps = [];
      this.deleteEndpoints = [];

      this.getTableCount(true);
      // this.getAssignedData();
      this.reset();
      this.hideCreate();
      // this.redraw(false);
      this.closeDeleteModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
    });
  }

  closeDeleteModal() {
    this.deleteData = undefined;
    this.closeModal();
  }

  deleteIds = [];
  endpointIps = [];
  deleteEndpoints = [];

  getDeleteIds(e: any, item: any): any {
    let ip = item.ipAddress ? item.ipAddress : '';

    let deleteEndpoints = this.deleteEndpoints;

    if (e.target.checked) {

      if (this.deleteIds.indexOf(item.id) === -1) {
        this.deleteIds.push(item.id);
        this.endpointIps.push(ip);
        this.deleteEndpoints.push(item);

        let tot = $('input[name^="delete_id_"]').length;
        if (this.deleteIds.length == tot) {
          $('#selectDeselectAll').prop('checked', true);
          $('#selectDeselectAll-span').hide();
        } else {
          $('#selectDeselectAll-span').show();
        }
      }

    } else {
      this.deleteIds.splice(this.deleteIds.indexOf(item.id), 1);
      this.endpointIps.splice(this.endpointIps.indexOf(ip), 1);

      deleteEndpoints = deleteEndpoints.filter(function (obj) {
        return obj['id'] !== item.id;
      });

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

    this.deleteEndpoints = deleteEndpoints;
  }

  selectDeselectAll(isChecked) {
    this.deleteIds = [];
    this.endpointIps = [];
    this.deleteEndpoints = [];
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
        let d = that.managementData.filter((el) => el.id === id);
        let ip = d[0].ipAddress ? d[0].ipAddress : '';
        that.deleteIds.push(id);
        that.endpointIps.push(ip);
        that.deleteEndpoints.push(d[0]);
        i++;
      });
    } else {
      $('input[name^="delete_id_"]').each(function () {
        if (i >= tot) {
          return false;
        }
        $(this).prop('checked', false);
        that.deleteIds = [];
        that.endpointIps = [];
        that.deleteEndpoints = [];
        i++;
      });
    }
  }

  showAllInnerCheckBox(event): any {
    $('#' + event.target.id).hide();
    $('#selectDeselectAll').prop("checked", true);

    this.deleteIds = [];
    this.endpointIps = [];
    this.deleteEndpoints = [];
    this.selectDeselectAll(true);
  }


  deleteAllSelected() {

    if (this.endpointIps) {
      this.infoTitle = this.language[this.endpointIps.length === 1 ? 'Delete selected endpoint?' : 'Delete selected endpoints?'];
      let html = '';
      for (let i = 0; i < this.endpointIps.length; i++) {
        this.deleteEndpoints[i].name = this.deleteEndpoints[i].name ? this.deleteEndpoints[i].name : '';
        this.deleteEndpoints[i].mappedBy = this.deleteEndpoints[i].mappedBy ? this.deleteEndpoints[i].mappedBy : '';
        html += `<tr><td>${this.deleteEndpoints[i].name}<td>${this.endpointIps[i]}<td>${this.deleteEndpoints[i].mappedBy}</td></tr>`;
      }
      this.infoBody = html;
      this.closeModal();
      this.modalRef = this.dialogService.open(this.multiDeleteModal, { backdrop: 'static', keyboard: false });
    }


  }

  confirmDeleteSecleted(): void {
    const deleteCalls: Observable<any>[] = [];
    // let url = `${environment.faAdminCorrelatorURL}assigned/subscriber?org-id=${this.ORG_ID}`;
    let nonAssignedUrl = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&flowId=`;
    for (let i = 0; i < this.deleteIds.length; i++) {
      // let name = this.deleteEndpoints[i].name;
      let id = this.deleteIds[i];
      // let isAssigned = false;
      // if (this.mappedData && this.mappedData[id] && this.mappedData[id] == 'ASSIGNED') {
      //   isAssigned = true;
      // }

      // if (isAssigned) {
      //   deleteCalls.push(this.apiService.EndpointDelete(`${url}`, [{
      //     name: name,
      //     orgId: this.ORG_ID
      //   }], isAssigned));
      // } 
      // else {
        deleteCalls.push(this.apiService.NonAssignedEndpointDelete(`${nonAssignedUrl}${id}`));
      // }

    }
    this.loading = true;
    forkJoin(deleteCalls).subscribe(
      resultArray => {
        this.deleteIds = [];
        this.endpointIps = [];
        this.deleteEndpoints = [];

        this.getTableCount(true);
        // this.getAssignedData();
        this.reset();
        this.hideCreate();
        // this.redraw(false);
        this.closeMultiDeleteModal();
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );
  }


  closeMultiDeleteModal() {
    this.deleteIds = [];
    this.endpointIps = [];
    this.closeModal();
  }



  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
      this.importTableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
      this.importTableOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
      this.importTableOptions.language = this.translateService.de_DE;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
      delete this.importTableOptions.language;
    }
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
      `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    $(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    $(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    $(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : 'Last');
    $(".dataTables_empty").text(isFrench ? 'Pas de données disponibles dans la table' : 'No data available in table');
  }


  resetDelete() {
    this.selectDeselectAll(false);
    $('#selectDeselectAll').prop("checked", false);
    $('#selectDeselectAll-span').hide();
    this.deleteIds = [];
    this.endpointIps = [];
    this.deleteEndpoints = [];
  }

  setFilterOptions() {
    // if (this.isDev) {
    const filters = [
      { label: this.language['ALL'], value: 'NONE' },
      { label: this.language['ASSIGNED'], value: 'ASSIGNED' },
      { label: this.language['DHCP'], value: 'DHCP' },
      { label: this.language['CC'], value: 'CC' },
      { label: this.language['CUSTOM'], value: 'CUSTOM' },
      { label: this.language['RADIUS'], value: 'RADIUS' },
      { label: this.language['CMS'], value: 'CMS' },
      { label: this.language['SMx'], value: 'SMx' }
    ];

    this.filtersDev = [...filters];
    const filterByDev = {
      label: this.language[this.filterByDev.label], value: this.filterByDev.value
    }
    this.filterByDev = filterByDev
    // } else {
    //   const filters = [
    //     { label: 'IP', value: 'ip_address' },
    //     { label: this.language['Name'], value: 'name' },
    //     { label: this.language['Mapped By'], value: 'mapped_by' }
    //   ];

    //   this.filters = [...filters];
    // }
  }

  export() {
    let name = this.commonFunctionsService.generateExportName('endpoint_export_file', true);

    this.exportSubs = this.apiService.Export(this.ORG_ID).subscribe((res: any) => {
      this.exportData = this.exportDataConvertor(res);
      if (this.exportData && this.exportData.length) {
        this.exportExcel.downLoadCSV(name, this.exportData);
      } else {
        this.exportExcel.downLoadCSV(name, [this.empty]);
      }
    },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      });
  }

  exportPdf() {
    // this.exportSubs = this.apiService.Export(this.ORG_ID).subscribe((res: any) => {
    //   let name = this.commonFunctionsService.generateExportName('endpoint');
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
    // },
    //   (err: HttpErrorResponse) => {
    // this.pageErrorHandle(err);
    //   });
  }

  exportDataConvertor(array) {
    if (Array.isArray(array)) {
      if (array.length === 0) { array.push({ ipAddress: '', name: '' }) }
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
        // el['IP address'] = el.ipAddress ? el.ipAddress : '';
        // el['Name'] = el.name ? el.name : '';
        delete el.id;
        delete el.result;
        // delete el.name;
        // delete el.ipAddress;
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
  }

  fullImport(file, type) {
    this.importData = [];
    this.importDeleteData = [];
    this.importTableData = [];
    this.isFullImport = type;
    this.dataTablecreatorService.getJsonFromCsv(file);
    this.importFullInput.nativeElement.value = "";
    this.importInput.nativeElement.value = "";
  }

  compareJsonToTableData(json: any) {
    let tableData = this.assignedData.length ? this.assignedData : [];
    let orgId: any = this.ORG_ID;
    let importType = sessionStorage.getItem('importType');
    this.importDeleteData = [];

    // if (json) {
    //   json = json.map(el => {
    //     el['name'] = el['Name'];
    //     el['ipAddress'] = el['IP address'];
    //     return el;
    //   });
    // }
    //console.log(tableData);
    let comparedData = [];
    let isAvailable = false;

    json.forEach(imp => {
      if (!imp.name && !imp.ipAddress) {
        return;
      }
      let action = 'Create';
      isAvailable = false;
      if (tableData.filter((tbl) => (imp.name && tbl.name && tbl.name == imp.name)).length) {
        isAvailable = true;
        if (this.isFullImport) {
          action = 'Create';
        }
        else action = 'Update'

        /* CCL-41794 */
        /*   if (this.isFullImport) {
          action = "Create";
          imp.action = action;
          this.importUpdateASCreate.push(imp);
        } else {
          action = "Update";
        } */
      }
      comparedData.push({
        "action": action,
        "ipAddress": imp.ipAddress,
        "name": imp.name,
        // "orgId": orgId,
        // "tenantId": 0
      })

    });

    if (!comparedData.length) {
      this.cancel();
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }

    /* CCL-41794 */
    if (this.isFullImport) {
      let deleteData = [];
      const comparedDataname = comparedData.map(ele => ele.name)
      tableData.forEach(tbl => {
        if (!comparedDataname.includes(tbl.name)) {
          deleteData.push({
            "action": "Delete",
            "ipAddress": tbl.ipAddress,
            "name": tbl.name
          })
        }
      });
      this.importDeleteData = deleteData;
      //comparedData = [...comparedData, ...deleteData];
    }
    this.importSubmit(true, comparedData)
  }


  importSubmit(isDryRun = false, comparedData?: any) {

    let importParams = {
      clientIP: this.storageData["clientIp"],
      dry_run: isDryRun,
      full_import: this.isFullImport,
      import_data: [],
      orgId: this.ORG_ID,
      userId: this.sso.getUserId()
    }

    let data = isDryRun ? comparedData : [];
    if (!isDryRun) {
      this.importTableData.forEach((element: any) => {
        if (element.result && element.result.toLowerCase() == 'ok') {
          data.push({
            "action": this.isFullImport ? 'Create' : element.action,
            "ipAddress": element.ipAddress,
            "name": element.name,
            // "orgId": this.ORG_ID,
            // "tenantId": 0
          })
        }
      });

    }
    if (!data.length) {
      this.cancel();
      this.infoTitle = this.language.noAvailableChange;
      this.infoBody = '';
      this.openInfoModal(false);
      return;
    }
    importParams.import_data = data;

    this.impAssignedSubs = this.apiService.importAssigned(importParams, this.ORG_ID).subscribe((res: any) => {
      if (isDryRun) {
        if (res && res.data && res.data.length == 0) {
          this.infoTitle = this.language.noAvailableChange;
          this.infoBody = '';
          this.openInfoModal(false);
        }
        this.importData = res ? res : [];
        this.checkDryRunData(res);
      } else {
        //this.isRerender = true;
        //this.cancel();
        this.getTableCount(true);
        this.hideCreate();

      }
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.enableImportSubmit = false;
        this.closeImport();
        this.pageErrorHandle(err);
        /*      if (err.status == 400) {
              if (isDryRun) {
                this.infoTitle = this.language.objectNotFound;
                this.infoBody = '';
                this.closeModal();
                this.modalRef = this.dialogService.open(this.infoModal);
                this.loading = false;
              } else {
                this.pageErrorHandle(err);
              }
            } else {
              this.enableImportSubmit = false;
              this.pageErrorHandle(err);
            } */
      });
  }

  checkDryRunData(data: any) {
    if (data && data.length) this.enableImportSubmit = true;
    let tableData = this.assignedData.length ? this.assignedData : [];
    data.forEach(e => {
      // if (e.validationResult != 'ok') {
      //   e.action = e.validationResult
      // }

      //To fix half of CCL-31231 
      if (e.result && e.result.toLowerCase() == 'ok') {
        this.enableImportSubmit = true;
      } else {
        e.action = e.result;
      }

      // if (e.action == 'Create' || e.action == 'Update') {
      //   this.enableImportSubmit = true;
      // }

      e['ipAddress_old'] = '';
      let match = tableData.filter((tbl) => tbl.name == e.name);
      // console.log(match, 'match', tableData);
      if (match.length) {
        if (this.isFullImport && e.action == 'Create') {
          e.action = 'Update';
        }
        e['ipAddress_old'] = match[0].ipAddress ? match[0].ipAddress : '';
      }
      this.importTableData.push(e);
    });

    if (this.isFullImport && this.importDeleteData.length) {
      this.importDeleteData.forEach(e => {
        e['ipAddress_old'] = '';
        this.importTableData.push(e);
      });
    }

    this.createView = false;
    this.buttonVisible = false;
    this.tablePreview = true;
  }

  cancel() {
    this.createView = false;
    this.buttonVisible = true;
    this.tablePreview = false;
    this.reset();
  }

  closeImport() {
    this.cancel();
    this.isFullImport = false;
    this.enableImportSubmit = false;
    this.importTableData = [];
    this.importData = [];
    this.importDeleteData = [];

    this.commonOrgService.closeAlert();//*Imp
  }

  getAssignedData() {
    this.apiService.getAssignedCount(this.ORG_ID).subscribe((res: any) => {
      this.assignedDataCount = res;
      if (res) {
        this.getAssigned();
      } else {
        this.assignedData = [];
      }
    })
  }

  getAssigned() {
    const calls: Observable<any>[] = [];
    let pageLength = 1;
    if (this.assignedDataCount > 1000) {
      pageLength = Math.ceil(this.assignedDataCount / 1000);
    }

    let url = `${environment.faAdminCorrelatorURL}assigned/subscriber?org-id=${this.ORG_ID}`;
    for (let i = 0; i < pageLength; i++) {
      calls.push(this.apiService.getAssigned(this.ORG_ID, i));
    }

    forkJoin(calls).subscribe(
      results => {
        results.forEach((el) => {
          this.assignedData = [...this.assignedData, ...el];
        })
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
      }
    );
  }

  closeModal(isAggModal = false): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    if (isAggModal && this.aggregatedGroupsSubs) {
      this.aggregatedGroupsSubs.unsubscribe();
    }
  }

  pageErrorHandle(err: HttpErrorResponse, widget?) {
    let errorInfo = '';
    if (err.status == 400) {
      this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoTitle = 'Error';
      this.openInfoModal(false);
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        if (err.status == 500) {
          errorInfo = `Internal Server Error`;
        } else if (err.status == 417 && err?.error?.error) {
          errorInfo = err?.error?.error;
        } else {
          errorInfo = this.commonOrgService.pageErrorHandle(err);
        }
      }
      // this.commonOrgService.openErrorAlert(errorInfo);
      // this.commonOrgService.pageScrollTop();

      if (widget && widget === 'agg-groups') {
        this.aggErrorInfo = errorInfo;
        this.aggError = true;
      } else {
        this.infoBody = errorInfo;
        this.infoTitle = 'Error';
        this.openInfoModal(false);
      }
      this.loading = false;
    }

  }

  openInfoModal(invalidImportEndPoint: boolean) {
    if (!invalidImportEndPoint) this.invalidImportEndPoint = [];

    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  getMappedData() {
    if (this.managementData && this.managementData.length) {
      this.managementData.forEach(element => {
        if (!this.mappedData[element.id]) {
          this.mappedData[element.id] = element.mappedBy ? element.mappedBy.toUpperCase() : ''
        }
      });
    } else {
      this.mappedData = {};
    }
  }

  removeState() {
    let url = this.router.url;
    this.commonOrgService.removeTableState('management', url);
  }

  /* getAllData() {
    this.allDataLoading = true;
    const calls: Observable<any>[] = [];
    let pageLength = 1;
    if (this.tableCount > 1000) {
      pageLength = Math.ceil(this.tableCount / 1000);
    }
  
    for (let i = 0; i < pageLength; i++) {
      // if (this.isDev) {
        calls.push(this.apiService.getListsDev(this.ORG_ID, this.filterByDev.value, i, 1000));
      // } else {
      //   calls.push(this.apiService.getLists(this.ORG_ID, i, 1000));
      // }
    }
  
    forkJoin(calls).subscribe(
      results => {
        results.forEach((el) => {
          this.allManagementData = [...this.allManagementData, ...el];
        })
        this.allManagementDataById = {};
        this.allManagementData.forEach(e => {
          this.allManagementDataById[e.id] = e;
          e['delete_select'] = false;
          return e;
        });
        this.allDataLoading = false;
      },
      (err: HttpErrorResponse) => {
        //this.pageErrorHandle(err);
        this.allDataLoading = false;
      }
    );
  } */
  isAggregatedGroupAvail(item) {
    return this.commonFunctionsService.isAggregatedGroupAvail(item);
  }

  openAggregatedGroupsModal(item) {
    this.aggregatedGroups = [];
    this.infoTitle = 'Aggregated Groups';
    this.closeModal();
    this.aggreDataAvail = false;
    this.modalRef = this.dialogService.open(this.aggGroupsModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal',
    });
    this.getAggregatedGroups(item);
  }

  getAggregatedGroups(item) {
    this.aggregatedGroupsLoading = true;
    this.aggError = false;
    this.aggregatedGroupsSubs = this.apiService.getAggregatedGroups(this.ORG_ID, item.aggGroup).subscribe((res: any) => {
      this.aggregatedGroups = (res && res.length) ? res : [];
      this.aggreDataAvail = true;
      this.aggregatedGroupsLoading = false;
    },
      (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.aggregatedGroups = [];
          this.aggreDataAvail = true;
          this.aggregatedGroupsLoading = false;
        } else if (err.status == 400) {
          this.aggregatedGroups = [];
          this.aggreDataAvail = true;
          this.aggregatedGroupsLoading = false;
        } else {
          this.aggregatedGroupsLoading = false;
          this.aggreDataAvail = true;
          this.pageErrorHandle(err, 'agg-groups');
        }
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }
}
