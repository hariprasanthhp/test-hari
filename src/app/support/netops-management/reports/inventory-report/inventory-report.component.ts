import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ReportsService } from '../reports.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { DateUtilsService } from '../../../../shared-utils/date-utils.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DeviceGroupService } from '../../operations/services/device-group.service'
import * as jquery from 'jquery';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import { ValidatorService } from '../../../../../app-services/validator.services';
import { DownloadService } from '../../../../shared/services/download.service'
import { DataServiceService } from '../../../data.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);


interface InventoryReports {
  Id: string,
  rowNo: number,
  Subid: string,
  orgid: string,
  serialnumber: string,
  opmode: string,
  manufacturer: string,
  modelname: string,
  lastdiscovertime: number,
  lastinformtime: number,
  createtime: number,
  periodicinformenable: string,
  periodicinforminterval: string,
  productclass: string,

  registrationid: string,
  softwareversion: string,
  subnetmask: string,
  additionalhardwareversion: string,
  hardwareversion: string,
  ipaddress: string,
  macaddress: string,
  normalizedipaddress: string,
  wanaccesstype: string,
  connectionrequesturl: string,
  subscriberId: string,
  subscriberName: string,
  manufactureroui: string,
  location: string,
  subscriberAccount: string,
  subscriberPhone: string,
  subscriberType: string,
  email: string,
  billingAddress: string,
  serviceAddress: string,
  region: string,
  lastboottime: number,
  lastdiscovertimestamp: number,
  lastinformtimestamp: number,
  lastdiscoverdate: string,
  lastinformdate: string
}
@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  maxForStartDate = new Date();
  minDateForCse = this.router.url.includes('support/router') ? new Date(new Date().setDate(new Date().getDate() - 90)) : new Date('1970')
  showNoResults = false;
  showFilters = false;
  devicetime = '';
  isError: boolean = false;
  deviceDate = '';
  deviceGroup = '';
  startErrorMessage = false;
  endErrorMessage = false;
  inventoryTableData = [];
  softwareVersionChart: any = [];
  inventoryCount: number | string;
  noresultfound
  error: any;
  stateinfo: any;
  searchResult: any;
  filterCount
  manufacture = "";
  modName = "";
  mode = "";
  orgId
  sortBy: string;
  sortType: string;
  CountRecieved: boolean = false;
  noRecordsFound: boolean = false;
  hideNotInTimePeriod: boolean = false;
  softwareversion = false;
  unassosSystem = false;
  hasWriteAccess = false;
  customStartDate: any = 0;
  customEndDate: any = 0;
  routerTabRead = false;
  tableCounts;
  public inventoryReports: InventoryReports[] = [];
  // maxDate = new Date();
  isOnLoadBtn: boolean = false;
  loading
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  tableOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    processing: true,
    dom: 'tipr',
    order: [0, 'asc'],
  };


  language: any;
  languageSubject;
  timePeriod = ['Last 30 days', 'Last 60 days', 'Last 90 days'];
  reportTypes = [
    { id: '', name: '' },
    { id: 'DiscoveredDevice', name: 'Discovered System' },
    { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
    { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
    { id: 'GroupedDevices', name: 'Grouped Systems' },
    { id: 'Software', name: 'Software Versions' },
    { id: 'SwapPendingReport', name: 'Swapped Systems' },
  ];
  reportType: any;
  timeperiod: any;
  timeperiods = [
    { id: '', name: '' },
    { id: 1, name: 'Day' },
    { id: 7, name: 'Past Week' },
    { id: 30, name: 'Past Month' },
    { id: 'custom', name: 'Customized Time Period' },
  ];

  manufactures = [
    { id: '0', name: '' },
    { id: 'ZyXEL', name: 'ZyXEL' },
    { id: 'Calix', name: 'Calix' },
    { id: 'SmartRG', name: 'SmartRG' },
  ];
  modNames = [
    { id: '0', name: '' },
    { id: 'VMG4825-B10A', name: 'VMG4825-B10A' },
    { id: 'GS2026E', name: 'GS2026E' },
    { id: 'GS4220E', name: 'GS4220E' },
  ];

  modes = [
    { id: '', name: '' },
    { id: 'RG', name: 'RG' },
    { id: 'Modem', name: 'Modem' },
    { id: 'Managed ONT', name: 'Managed ONT' },
    { id: 'WAP-IGMP', name: 'WAP-IGMP' },
    { id: 'WAP', name: 'WAP' },
    // { id: 'SmartTown', name: 'SmartTown' },
    // { id: 'SmartBiz', name: 'SmartBiz' },
  ];

  deviceGroups = [
    { id: 'anne_844G', name: 'anne_844G' },
    { id: 'lai_CXNK005C6752', name: 'lai_CXNK005C6752' },
    { id: 'CXNK005A85CF', name: 'CXNK005A85CF' },
    { id: 'Ray_Topo2_RG', name: 'Ray_Topo2_RG' },
    { id: 'Jason_GS2026E_Satellite', name: 'Jason_GS2026E_Satellite' },
  ]
  dropdwonOutData: { manufacturer: any; model: any; mode: any; };
  isTimePeriod: boolean = false;
  isRunActive: any;
  initLoad = false;
  hasScopeAccess = false;
  alertMessage: any = '';
  swapReportsData: any;
  swapCount: any;
  showSwapReport: boolean = false;
  showTime: boolean = true;
  notInTime: boolean;
  searchtext: string='';
  showcloseicon: boolean = false;
  datatableElement: DataTableDirective;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  germanTable: DataTables.LanguageSettings;
  old_regid: any;
  macaddres: any;
  new_system_id: any;
  macAddress: any;
  registrationId: any;
  swapParams: {
    // orgId: this.sso.getOrg(this.orgId),
    filter: any;
  };
  initLoadSwap: boolean = false;

  constructor(private translateService: TranslateService,
    private http: HttpClient,

    public cdr: ChangeDetectorRef,
    private reportService: ReportsService,
    private router: Router,
    private service: DataServiceService,
    public sso: SsoAuthService,
    private dateUtils: DateUtilsService,
    private validatorService: ValidatorService,
    private deviceGroupService: DeviceGroupService,
    private el: ElementRef,
    private downloadService: DownloadService, private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,) {
  }

  ngAfterViewInit() {
    this.timeperiods = [
      { id: '', name: '' },
      { id: 1, name: this.language['Day'] },
      { id: 7, name: this.language['past_week'] },
      { id: 30, name: this.language['past_month'] },
      { id: 'custom', name: this.language['Customized Time Period'] },
    ];
    this.dtTrigger.next();
  }
  setTitle(url) {
    if (!this.router.url.includes('cco/operations/cco-reports') && !this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Inventory_Report']} - ${this.language['Reports']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Reports']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Inventory_Report']} - ${this.language['Reports']} - ${this.language['Operations']} - ${this.language['Operations']}  - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    // this.titleService.setTitle('Calix Cloud - Reports - Inventory Reports');

    this.appendDeviceGroup();
    this.orgId = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      // this.tableLanguageOptions();
      // this.rerender();
      this.setTitle(this.router.url);//after changing language to tab describtion
      if (this.dtElement) {
        this.redraw();
      }
      if (this.router.url.includes('cco-foundation')) {
        this.reportTypes = [
          { id: '', name: '' },
          { id: 'DiscoveredDevice', name: 'Systems Discovered' },
          { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
          { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
          { id: 'Unassosiated', name: 'Systems Unassociated' },
          { id: 'GroupedDevices', name: 'Systems Groups' },
          { id: 'Software', name: 'Software Versions' },
          { id: 'SwapPendingReport', name: 'Systems Swapped' },
        ];
      } else if(this.router.url.includes('cco/operations')) {
        this.reportTypes = [
          { id: '', name: '' },
          { id: 'DiscoveredDevice', name: 'Discovered System' },
          { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
          { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
          { id: 'GroupedDevices', name: 'Grouped Systems' },
          { id: 'Software', name: 'Software Versions' },
        ];
      }
      else {
        this.reportTypes = [
          { id: '', name: '' },
          { id: 'DiscoveredDevice', name: 'Discovered System' },
          { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
          { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
          { id: 'GroupedDevices', name: 'Grouped Systems' },
          { id: 'Software', name: 'Software Versions' },
          { id: 'SwapPendingReport', name: 'Swapped Systems' },
        ];
      }


      this.timeperiods = [
        { id: '', name: '' },
        { id: 1, name: this.language['Day'] },
        { id: 7, name: this.language['past_week'] },
        { id: 30, name: this.language['past_month'] },
        { id: 'custom', name: this.language['Customized Time Period'] },
      ];
    });
    this.setTitle(this.router.url);//for initial language setting
    let scopes = this.sso.getScopes();
    if (!this.router.url.includes('/cco/operations/cco-reports/')) {
      if (environment.VALIDATE_SCOPE) {
        let scopeFlagCheck: any = {};
        let validScopes: any = Object.keys(scopes);
        if (validScopes) {
          for (let i = 0; i < validScopes.length; i++) {
            if (validScopes[i].indexOf('cloud.rbac.csc.cpe') !== -1) {
              this.routerTabRead = true;
              continue;
            }
          }
        }
        scopes['cloud.rbac.csc.netops.reports.inv_report'] = scopes['cloud.rbac.csc.netops.reports.inv_report'] ? scopes['cloud.rbac.csc.netops.reports.inv_report'] : [];
        scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] = scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] ? scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] : [];
        scopes['cloud.rbac.csc.netops.reports.call_outcome'] = scopes['cloud.rbac.csc.netops.reports.call_outcome'] ? scopes['cloud.rbac.csc.netops.reports.call_outcome'] : [];
        scopes['cloud.rbac.csc.netops.reports.auditreports'] = scopes['cloud.rbac.csc.netops.reports.auditreports'] ? scopes['cloud.rbac.csc.netops.reports.auditreports'] : [];

        scopes['cloud.rbac.csc.netops.reports.call_avoidance'] = scopes['cloud.rbac.csc.netops.reports.call_avoidance'] ? scopes['cloud.rbac.csc.netops.reports.call_avoidance'] : [];

        if (scopes && scopes['cloud.rbac.csc.netops.reports.inv_report'] && scopes['cloud.rbac.csc.netops.reports.inv_report'].indexOf('read') !== -1) {
          scopeFlagCheck.showInventoryReport = true;
        }

        if (scopes && scopes['cloud.rbac.csc.netops.reports.unassociated_devices'] && scopes['cloud.rbac.csc.netops.reports.unassociated_devices'].indexOf('read') !== -1) {
          scopeFlagCheck.showUnassociatedDevices = true;
        }

        if (scopes && scopes['cloud.rbac.csc.netops.reports.call_avoidance'] && scopes['cloud.rbac.csc.netops.reports.call_avoidance'].indexOf('read') !== -1) {
          scopeFlagCheck.showCallAvoidance = true;
        }

        if (scopes && scopes['cloud.rbac.csc.netops.reports.call_outcome'] && scopes['cloud.rbac.csc.netops.reports.call_outcome'].indexOf('read') !== -1) {
          scopeFlagCheck.showCallOutcome = true;
        }
        if (scopes && scopes['cloud.rbac.csc.netops.reports.auditreports'] && scopes['cloud.rbac.csc.netops.reports.auditreports'].indexOf('read') !== -1) {
          scopeFlagCheck.showAuditReport = true;
        }

        if (scopeFlagCheck.showInventoryReport) { }
        else if (scopeFlagCheck.showCallOutcome && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/reports/call-outcome-report']) }
        else if (scopeFlagCheck.showAuditReport && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/reports/audit-report']) }
        else if (scopeFlagCheck.showUnassociatedDevices) { this.router.navigate(['./support/netops-management/reports/unassociated-devices']) }
        else if (scopeFlagCheck.showCallAvoidance && this.sso.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/reports/call-avoidance-report']) }


        scopes['cloud.rbac.csc.netops.reports.inv_report'] = scopes['cloud.rbac.csc.netops.reports.inv_report'] ? scopes['cloud.rbac.csc.netops.reports.inv_report'] : [];

        if (scopes && (scopes['cloud.rbac.csc.netops.reports.inv_report'] && scopes['cloud.rbac.csc.netops.reports.inv_report'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
        this.routerTabRead = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.coc.operations.report.invreports'] = scopes['cloud.rbac.coc.operations.report.invreports'] ? scopes['cloud.rbac.coc.operations.report.invreports'] : [];

        if (scopes['cloud.rbac.coc.operations.report.invreports'].length) {
          this.hasScopeAccess = true;
          this.routerTabRead = true;
        }

        if (scopes && (scopes['cloud.rbac.coc.operations.report.invreports'] && scopes['cloud.rbac.coc.operations.report.invreports'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;


        }
      } else {
        this.hasWriteAccess = true;

        this.hasScopeAccess = true;
      }
    }

    if (!this.router.url.includes('cco-foundation')) {
      if (!this.hasScopeAccess) {
        this.sso.setPageAccess(false);
        return;
      }
    }


    if (this.router.url.includes('cco-foundation')) {
      this.reportTypes = [
        { id: '', name: '' },
        { id: 'DiscoveredDevice', name: 'Systems Discovered' },
        { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
        { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
        { id: 'Unassosiated', name: 'Systems Unassociated' },
        { id: 'GroupedDevices', name: 'Systems Groups' },
        { id: 'Software', name: 'Software Versions' },
        { id: 'SwapPendingReport', name: 'Systems Swapped' },
      ];
    } else if(this.router.url.includes('cco/operations')) {
      this.reportTypes = [
        { id: '', name: '' },
        { id: 'DiscoveredDevice', name: 'Discovered System' },
        { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
        { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
        { id: 'GroupedDevices', name: 'Grouped Systems' },
        { id: 'Software', name: 'Software Versions' },
      ];
    }else {
      this.reportTypes = [
        { id: '', name: '' },
        { id: 'DiscoveredDevice', name: 'Discovered System' },
        { id: 'DevicesNotCheckedIn', name: 'Systems Not Checked In' },
        { id: 'DeviceCheckedIn', name: 'Systems Checked In' },
        { id: 'GroupedDevices', name: 'Grouped Systems' },
        { id: 'Software', name: 'Software Versions' },
        { id: 'SwapPendingReport', name: 'Swapped Systems' },
      ];
    }

    this.timeperiods = [
      { id: '', name: '' },
      { id: 1, name: this.language['Day'] },
      { id: 7, name: this.language['past_week'] },
      { id: 30, name: this.language['past_month'] },
      { id: 'custom', name: this.language['Customized Time Period'] },
    ];

    this.initDataTable();
  }
  startTime = 0;
  endTime = 0;
  manufacturer: any = '';
  modelName: any = '';
  opmode: any = '';
  serialNumber: any = '';
  subscriber: any = '';
  inversely_time_period: any = false;
  submit: boolean = false;
  bttnDissable: boolean = false;
  hrs: any;
  minutes: any;
  seconds: any;
  appendDeviceGroup() {
    this.deviceGroupService.getDeviceGoupCount(this.sso.getOrgId()).subscribe((data: any) => {
      this.deviceGroupService.getDeviceGoupList(this.sso.getOrgId(), data.count).subscribe((data: any) => {
        //this.deviceGroups[0] =  { id: '0', name: '' };
        this.deviceGroups = data;
        this.deviceGroups.unshift({ id: '0', name: '' });
      }, (err: any) => {
        this.pageErrorHandle(err)
        this.error = err.error;
        jquery('.error').show();
        this.loading = false;
      });
    }, (err: any) => {
      this.pageErrorHandle(err)
      this.error = err.error;
      jquery('.error').show();
      this.loading = false;
    });
  }

  params = {};
  doFilter() {
    this.submit = true;
    this.bttnDissable = true;
    let reportType = this.reportType;
    if (this.reportType && this.reportType != 'Unassosiated') {
      if (this.showCustomTimePeriod) {
        this.startTime = this.dateUtils.getUtcTimeByDate(this.customStartDate, '00', '00', '00');
        this.endTime = this.dateUtils.getUtcTimeByDate(this.customEndDate, '23', '59', '59');
        //this.endTime = this.dateUtils.getUtcTimeByEndDate(this.customEndDate, this.hrs, this.minutes, this.seconds);
        if (this.customStartDate) {
          jquery('#stDateValidation').hide();
        } else {
          jquery('#stDateValidation').show();
        }
        if (this.customEndDate) {
          jquery('#enDateValidation').hide();
        } else {
          jquery('#enDateValidation').show();
        }
        // this.compareDate();
        this.compareStartDate();
        this.compareEndDate();
      } else {
        if (this.reportType !== 'GroupedDevices') {
          this.startTime = this.dateUtils.getUtcTimeByBeforeDays(this.devicetime);
          this.endTime = this.dateUtils.getCurrentUtcTime();
        } else {
          if (this.deviceGroup) {
            jquery('#deviceValidation').hide();
          } else {
            jquery('#deviceValidation').show();
          }
        }

      }
      if (this.reportType) {
        if (this.showCustomDeviceGroup == false && this.hideCustomSelect == false) {
          if (this.devicetime) {
            if (this.showCustomTimePeriod) {
              if (this.customStartDate && this.customEndDate && Date.parse(this.customEndDate) >= Date.parse(this.customStartDate)) {
                if (reportType != 'Software') {
                  this.bttnDissable = true;
                  this.getInventoryReport(reportType);
                  this.getDropDownDatas();
                } else if (reportType == 'Software') {
                  this.bttnDissable = false;
                  this.getInventorySoftwareReport();
                }
                // else if(reportType == 'SwapPendingReport'){
                //   this.showSwapReport = true;
                //   this.bttnDissable = false;
                //   this.getInventoryReport(reportType);
                // }
              }
            } else {
              if (reportType != 'Software') {
                this.getInventoryReport(reportType);
                this.getDropDownDatas();
              } else if (reportType == 'Software') {
                this.bttnDissable = false;
                this.getInventorySoftwareReport();
              }
              // else if(reportType == 'SwapPendingReport'){
              //   this.showSwapReport = true;
              //   this.bttnDissable = false;
              //   this.getInventoryReport(reportType);
              // }
            }
          }
        } else {
          if (this.showCustomDeviceGroup == true && this.deviceGroup) {
            if (reportType != 'Software') {
              this.getInventoryReport(reportType);
              this.getDropDownDatas();
            } else if (reportType == 'Software') {
              this.bttnDissable = false;
              this.getInventorySoftwareReport();
            }
            // else if(reportType == 'SwapPendingReport'){
            //   this.showSwapReport = true;
            //   this.bttnDissable = false;
            //   this.getInventoryReport(reportType);
            // }
          } else if (this.hideCustomSelect == true && this.showCustomDeviceGroup == false) {
            if (reportType == 'SwapPendingReport') {
              this.showSwapReport = true;
              this.bttnDissable = true;
              this.getInventoryReport(reportType);
            }
            else if (reportType != 'Software' && reportType != 'SwapPendingReport') {
              this.getInventoryReport(reportType);
              this.getDropDownDatas();
            } else if (reportType == 'Software') {
              this.bttnDissable = false;
              this.getInventorySoftwareReport();
            }
          }

        }

      }
    } else if (this.reportType) {
      this.unassosSystem = true;
    }
    this.maxDate = new Date();
  }
  onchangeStartDate() {
    this.maxForStartDate = this.customEndDate;
    if (this.customStartDate) {
      jquery('#stDateValidation').hide();
      if (this.devicetime && this.reportType && this.customEndDate && this.customStartDate) {
        this.bttnDissable = false;
      }
    } else {
      jquery('#stDateValidation').show();
      this.bttnDissable = true;

    }
  }
  changeDate() {

    if (this.customEndDate) {
      jquery('#enDateValidation').hide();
      if (this.devicetime && this.reportType && this.customEndDate && this.customStartDate) {
        this.bttnDissable = false;
      }
    } else {
      jquery('#enDateValidation').show();
      this.bttnDissable = true;
    }
  }

  onChangeDeviceGroup() {
    if (this.deviceGroup) {
      jquery('#deviceValidation').hide();
      if (this.deviceGroup && this.reportType) {
        this.bttnDissable = false;
      }
    } else {
      jquery('#deviceValidation').show();
      this.bttnDissable = true;

    }
  }
  clearValidation() {
    if (this.devicetime && this.reportType && this.customEndDate && this.customStartDate) {
      this.bttnDissable = false;
    }
    this.CountRecieved = false;
    jquery('.alert').hide();
  }
  onchangeEndDate() {
    this.maxForStartDate = this.customEndDate;
    if (this.customEndDate) {
      jquery('#enDateValidation').hide();
      if (this.devicetime && this.reportType && this.customEndDate && this.customStartDate) {
        this.bttnDissable = false;
      }
    } else {
      jquery('#enDateValidation').show();
      this.bttnDissable = true;

    }
  }
  getDropDownDatas() {
    let payload = { "orgId": this.sso.getOrgId() }
    if (this.reportType != 'Software' || this.reportType != 'SwapPendingReport') {
      this.loading = true;
      this.reportService.getDropDownData(JSON.stringify(payload)).subscribe((response: any) => {

        let manufacturerData: any = [{ "id": '', "name": ' ' }];
        let modelData: any = [{ "id": '', "name": ' ' }];
        let modeData: any = [{ "id": '', "name": ' ' }];
        if (response) {
          response.forEach(element => {
            if (element['manufacturer'] != '') {
              manufacturerData.push({
                "id": element['manufacturer'],
                "name": element['manufacturer'],
              });
            }
            if (element['modelName'] != '') {
              modelData.push({
                "id": element['modelName'],
                "name": element['modelName'],
              });
            }
            if (element['opMode'] != '') {
              modeData.push({
                "id": element['opMode'],
                "name": element['opMode'],
              });
            }
          });
        }
        manufacturerData = this.getUniqueData(manufacturerData);
        modelData = this.getUniqueData(modelData);
        modeData = this.getUniqueData(modeData);
        this.dropdwonOutData = {
          "manufacturer": manufacturerData,
          "model": modelData,
          "mode": modeData,
        }
      }, (err: HttpErrorResponse) => {
        this.loading = true;
        this.pageErrorHandle(err);
      });
    }

  }
  getUniqueData(elements) {
    let uniqueArr = [];
    for (var i = 0; i < elements.length; i++) {
      let existed = false
      for (var j = 0; j < uniqueArr.length; j++)
        if (elements[i].name === uniqueArr[j].name) {
          existed = true
          break
        }
      if (existed) continue
      uniqueArr.push(elements[i])
    }
    return uniqueArr;
  }
  showCustomTimePeriod = false;
  onChangeTimePeriod() {
    if (this.devicetime && this.reportType) {
      this.bttnDissable = false;
    } else {
      this.bttnDissable = true;
    }
    this.showFilters = false;
    if (this.devicetime == 'custom') {
      this.showCustomTimePeriod = true;
      this.bttnDissable = true;
      //this.hrs = new Date().getHours();
      //this.minutes = new Date().getMinutes();
      //this.seconds = new Date().getSeconds();
    } else {
      this.showCustomTimePeriod = false;
      this.customStartDate = "";
      this.customEndDate = "";
      jquery('.alert').hide();
    }
    this.CountRecieved = false;
    this.inventoryTableData.length = 0;
    this.getUnset();
  }
  showCustomDeviceGroup = false;
  hideCustomSelect = false;
  hideCalender = false;
  hideTimePeriod: boolean = false;
  onChangeReportType() {
    this.showFilters = false;
    this.softwareversion = false;
    this.unassosSystem = false;
    this.showNoResults = false;
    this.deviceGroup = "";
    this.showTime = true;
    this.showcloseicon = false;
    this.searchtext = "";

    if (this.reportType == 'GroupedDevices') {
      this.showCustomDeviceGroup = true;
      this.showCustomTimePeriod = false;
      this.hideCustomSelect = true;
      this.customStartDate = "";
      this.customEndDate = "";
      this.devicetime = "";
      this.hideNotInTimePeriod = true;
      this.hideTimePeriod = false;
      if (this.reportType) {
        this.bttnDissable = false;
      } else {
        this.bttnDissable = true;
      }
      //return
    } else if (this.reportType == 'Software') {
      this.hideCustomSelect = true;
      this.showCustomTimePeriod = false;
      this.showCustomDeviceGroup = false;
      this.customStartDate = "";
      this.customEndDate = "";
      this.devicetime = "";
      if (this.reportType) {
        this.bttnDissable = false;
      } else {
        this.bttnDissable = true;
      }
    } else if (this.reportType == 'Unassosiated') {
      this.hideCustomSelect = true;
      this.showCustomTimePeriod = false;
      this.showCustomDeviceGroup = false;
      this.customStartDate = "";
      this.customEndDate = "";
      this.devicetime = "";
      if (this.reportType) {
        this.bttnDissable = false;
      } else {
        this.bttnDissable = true;
      }
    } else if (this.reportType == 'SwapPendingReport') {

      this.hideCustomSelect = true;
      this.showCustomTimePeriod = false;
      this.showCustomDeviceGroup = false;
      this.customStartDate = "";
      this.customEndDate = "";
      this.devicetime = "";


      this.showSwapReport = true;
      this.showTime = false;
      this.notInTime = false;
      if (this.reportType) {
        this.bttnDissable = false;
      }
      else this.bttnDissable = true;
    }
    else {
      this.showCustomDeviceGroup = false;
      this.hideCustomSelect = false;
      this.hideCalender = true;
      this.hideNotInTimePeriod = false;
      this.deviceGroup = "";
      if (this.reportType) {
        if (this.devicetime) {
          this.bttnDissable = false;
        }
      } else {
        this.bttnDissable = true;
      }

    }

    if ((this.reportType == 'Discovered' || this.reportType == 'DevicesNotCheckedIn' || this.reportType == 'DeviceChecked') && (this.devicetime == 'custom')) {
      this.showCustomTimePeriod = true;
    }
    if (this.devicetime == 'custom' && (!this.customEndDate || !this.customStartDate)) {
      this.bttnDissable = true;
    }
    this.CountRecieved = false;
    jquery('.alert').hide();
    this.inventoryTableData.length = 0;
    this.getUnset();
  }
  OnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

  }

  clear: any;
  search(term: string) {
    if (term.length) this.showcloseicon = true;
    else this.showcloseicon = false;
    if (this.clear) clearTimeout(this.clear);
    this.clear = setTimeout(() => {
  
      this.searchtext = term;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.getInventoryReport(this.reportType);
        dtInstance.search(term).draw();
      });
      this.loading = false;
    }, 500)

  }

  totalSwapRecords: number = 0;

  totalRecords: number = 0;
  getInventoryReport(reportType: string) {
    this.loading = true;
    let params = {
      // orgId: this.sso.getOrg(this.orgId),
      reportType: reportType,
      manufacturer: this.manufacturer,
      modelName: this.modelName,
      opmode: this.opmode,
      serialNumber: this.serialNumber ? this.serialNumber.trim() : '',
      subscriber: this.subscriber ? this.subscriber.trim() : '',
      startTime: (this.reportType !== 'GroupedDevices') ? this.startTime : '',
      endTime: (this.reportType !== 'GroupedDevices') ? this.endTime : '',
      inversely_time_period: (this.reportType !== 'GroupedDevices' && this.isTimePeriod) ? this.isTimePeriod : 'false',
      group_name: this.reportType === 'GroupedDevices' ? this.deviceGroup : '',
      timeZ: ''//Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    let swapParams = {
      filter: this.searchtext ? this.searchtext.trim() : '',
    };


    if (this.reportType == 'Software') {
      params.inversely_time_period = 'false';
    }
    if (reportType != 'SwapPendingReport') {
      this.showSwapReport = false;
      this.params = params;
      this.reportService.getInventoryCount(params).subscribe((res: any) => {
        this.showSwapReport = false;
        this.showFilters = true;
        this.loading = false;
        if (res.totalNum != undefined && res.totalNum && res.totalNum != 0) {

          this.inventoryCount = res.totalNum;
          this.CountRecieved = true;
          if (this.initLoad) {
            this.redraw();
          } else {
            this.getInventoryList();
          }
        } else {
          this.showNoResults = true;
          this.inventoryCount = 0;
          this.CountRecieved = false;
          this.noRecordsFound = true;
          //this.getUnset();
        }
      }, (err: any) => {
        this.pageErrorHandle(err)
        this.error = err.error;
        jquery('.error').show();
        this.loading = false;
      });
    }

    else if (reportType == 'SwapPendingReport') {
      // this.showSwapReport = true;
      // this.unassosSystem = false;
      this.swapParams = swapParams
      this.reportService.getSwapReportsCount(swapParams).subscribe((res: any) => {
        this.showFilters = false;
        this.loading = false;
        this.showSwapReport = true;
        if (res?.count) {
          this.showSwapReport = true;
          this.swapCount = res.count;
          this.CountRecieved = true;
          if (this.initLoadSwap) {
            this.redraw();
            // this.getSwapList();
          } else {
            this.getSwapList();
          
          }
        } else {
          this.initDataTable();
          this.showSwapReport = true;
          // this.showNoResults = true;
          this.swapCount = 0;
          this.CountRecieved = true;
          this.noRecordsFound = true;
        }
      }, (err: any) => {
        this.pageErrorHandle(err)
        this.error = err.error;
        jquery('.error').show();
        this.loading = false;
      });

    }

  }

  redraw() {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
      // dtInstance.destroy();
      // this.dtTrigger.next();
    });
  }
  dtOptions: DataTables.Settings = {
    pagingType: "full_numbers",
  pageLength: 15,
  // responsive: true,
  serverSide: true,
  processing: false,
  searching: false,
  lengthChange: false,
  ordering: false,
  //scrollX: true,
  dom: 'tipr',}
  dtOptionsSwap: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 15,
    serverSide: true,
    processing: false,
    searching: true,
    ordering: true,
    columnDefs: [
       {
        searchable: false,
        targets: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        orderable: true,
      },
    ],
    dom: 'tipr',
  }


  getInventoryList() {
    const that = this;
    this.showSwapReport = false;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 15,
      // responsive: true,
      serverSide: true,
      processing: false,
      searching: false,
      lengthChange: false,
      ordering: false,
      //scrollX: true,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        let reportType = this.reportType;
        let isExtrafilter, isTypeSoft;
        if (this.manufacturer) {
          isExtrafilter = `&manufacturer=${this.manufacturer}`;
        }
        if (this.modelName) {
          isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&modelName=${this.modelName}`;
        }
        if (this.opmode) {
          isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&opmode=${this.opmode}`;
        }
        if (this.serialNumber) {
          isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&serialNumber=${this.serialNumber ? this.serialNumber.trim() : ''}`;
        }
        if (this.subscriber) {
          isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&subscriber=${this.subscriber ? this.subscriber.trim() : ''}`;
        }
        if (this.reportType == 'Software') {
          isTypeSoft = `&inversely_time_period=false`;
        } else {
          isTypeSoft = `&inversely_time_period=${this.isTimePeriod ? this.isTimePeriod : 'false'}`;
        }
        this.isRunActive = isExtrafilter;
        //let timeZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let urls = `${environment.SUPPORT_URL}/netops-report/inventory-report?${this.sso.getOrg(this.orgId)}reportType=${reportType}&startTime=${this.startTime}&endTime=${this.endTime}${isTypeSoft ? isTypeSoft : ''}${isExtrafilter ? isExtrafilter : ''}`;

        if (this.reportType === 'GroupedDevices') {
          let query = "";
          delete this.params['inversely_time_period'];
          for (var key in this.params) {

            if (this.params[key]) {
              if (query != "") {
                query += "&";
              }

              query += key + "=" + encodeURIComponent(this.params[key]);
            }

          }

          urls = `${environment.SUPPORT_URL}/netops-report/inventory-report?${query}`;
        }
        let pageNo = null;
        if (dataTablesParameters.start == 0) {
          pageNo = 0;
        } else {
          pageNo = dataTablesParameters.start / dataTablesParameters.length;
        }
        pageNo = pageNo + 1;
        let url = urls + "&pageNumber=" + pageNo + "&pageSize=" + dataTablesParameters.length
        that.http
          .get(url)
          .subscribe((resp: any) => {
            this.showSwapReport = false;
            this.showFilters = true;
            this.inventoryTableData = resp;
            this.initLoad = true;
            this.hideNoDataRow;
            this.loading = false;
            callback({
              recordsTotal: this.inventoryCount ? this.inventoryCount : 0,
              recordsFiltered: this.inventoryCount ? this.inventoryCount : 0,
              data: []
            });
          });
      }, drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
  }

  initDataTable(): void {
    const table = $(this.el.nativeElement).find('table'); // Assuming you have a <table> element
    $.fn.dataTable.ext.errMode = 'throw';

    $(table).DataTable({
      // Your DataTable configuration options
    });
  }


  orderfilternew;
  filterExport;
  getSwapList() {
    const that = this;
    this.showSwapReport = true;
    this.dtOptionsSwap = {
      pagingType: "full_numbers",
      pageLength: 15,
      serverSide: true,
      processing: false,
      searching: true,
      ordering: true,
      columnDefs: [
        {
          searchable: false,
          targets: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          orderable: true,
        },
      ],
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        let reportType = this.reportType;
        let isExtrafilter, orderFilter;
        if (this.swapParams.filter) {
          isExtrafilter = `&filter=${this.swapParams.filter}`;
        }
        let columnSelected = {};
        let col: any = ["subscriberLocalId", "subscriberAccount", "subscriberName", "oldSystemFsan", "oldSystemMac", "oldSystemRegId", "newSystemId","swapInitializeTime", "oldSystemLastInformTime"];

        if ((dataTablesParameters.order[0].column || dataTablesParameters.order[0].column == 0) && dataTablesParameters.order[0].dir) {
          columnSelected[col.at(dataTablesParameters.order[0].column)] = dataTablesParameters.order[0].dir == 'asc' ? 1 : 0;
          orderFilter = `&orderBy=${JSON.stringify(columnSelected)}`
        }

        this.orderfilternew = JSON.stringify(columnSelected);
        this.filterExport = this.swapParams.filter;
        let pageNo = null;
        if (dataTablesParameters.start == 0) {
          pageNo = 0;
        } else {
          pageNo = dataTablesParameters.start / dataTablesParameters.length;
        }
        pageNo = pageNo + 1;
        // let url = urls + "&pageNumber=" + pageNo + "&pageSize=" + dataTablesParameters.length
        let url = `${environment.SUPPORT_URL}/netops-swapsystem/queryPendingSwapSystem?${isExtrafilter ? isExtrafilter : ''}${orderFilter ? orderFilter : ''}`
        that.http
          .get(url)
          .subscribe((resp: any) => {
            if(resp.length){
              this.noRecordsFound = false;
            }
           else if(!resp.length){
              this.noRecordsFound = true;
            }
            this.showSwapReport = true;
            this.showFilters = false;
            this.swapReportsData = resp;
            this.initLoadSwap = true;
            this.hideNoDataRow;
            this.loading = false;
            if(resp.length){
              callback({
                recordsTotal: this.swapCount ? this.swapCount : 0,
                recordsFiltered: this.swapCount ? this.swapCount : 0,
                data: []
              });
            }
            else if(!resp.length){
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            }


          }, (err: any) => {
            this.noRecordsFound = true;
            this.pageErrorHandle(err)
            this.error = err.error;
            jquery('.error').show();
            this.loading = false;
          });
      }, drawCallback: (settings) => {
        // this.tableLanguageOptions();
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
    // this.datatableElement?.dtInstance.then((dtInstance: DataTables.Api) => {
            
    //   dtInstance.ajax.reload();
    // });
    // this.tableLanguageOptions();
  }

  closeicon(term: string) {
    this.searchtext = ""

    this.showcloseicon = false
    this.search(this.searchtext);
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.tableOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.tableOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.tableOptions.language = this.germanTable;
    }
    else if (this.language.fileLanguage == 'en' && this.tableOptions.language) {
      delete this.tableOptions.language;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  callCount(str) {
    this.http.get(`${environment.SUPPORT_URL}/netops-report/inventory-report/count?${this.sso.getOrg(this.orgId)}reportType=${this.reportType}&startTime=${this.startTime}&endTime=${this.endTime}&inversely_time_period=${this.inversely_time_period}`).subscribe((res) => {
      this.filterCount = res;
    });


  }
  hideNoDataRow() {
    setTimeout(() => {
      $('.odd').css('display', 'none');
    }, 100);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.languageSubject.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
  toggleSwitch() {
    this.showFilters = false;
    this.CountRecieved = false;
    this.inventoryTableData.length = 0;
    this.noRecordsFound = false;
    this.bttnDissable = false;
    this.getUnset();
  }
  getUnset() {
    this.manufacturer = undefined;
    this.modelName = undefined;
    this.opmode = undefined;
    this.serialNumber = undefined;
    this.subscriber = undefined;
    this.isRunActive = undefined;
  }

  clickSerialNumber(data) {
    this.searchByCharacters(data, "serno");
  }

  navigateToTroubleShootPage(columns) {
    this.searchByCharacters(columns, "name");

  }


  getInventorySoftwareReport() {
    this.softwareversion = true;
    this.loading = true;
    this.reportService.getInventorySoftwareReport(this.orgId).subscribe((res: any) => {
      this.loading = false;
      res.forEach(element => {

        let expObj = {
          'Id': `${element['id'] ? element['id'] : ''}`,
          'Org Id': `${element['orgid'] ? element['orgid'] : ''}`,
          'Model Name': `${element['modelname'] ? element['modelname'] : ''}`,
          'Manufacturer': `${element['manufacturer'] ? element['manufacturer'] : ''}`,
          'Software Version': `${element['softwareversion'] ? element['softwareversion'] : ''}`,
          'CPE Count': `${element['cpecount'] ? element['cpecount'] : ''}`,
        }

        this.softwareVersionsData.push(expObj);
      })
      // this.softwareVersionsData = res;

      this.showFilters = false;

      this.inventoryCount = 1;
      let options = this.softwareReportOption(res || []);
      const chart = Highcharts.chart('container', options);
      this.showNoResults = true;

    }, (err: any) => {
      this.pageErrorHandle(err)
      this.error = err.error
      jquery('.error').show();
      this.loading = false;

    });
  }

  cpeCount = 0;
  firmwareCount = 0;
  softwareReportOption(data): any {
    let categories = [], finalObject = [], initialDataArray = [], yaxistext: any;
    var totalCPECount = 0;
    let softwareVersion = [];
    let softwareVersionArr = [];

    data.forEach(obj => {
      if (obj.modelname == null) {
        obj.modelname = "Others";
      }

      if (obj.softwareversion == null) {
        obj.softwareversion = "other";
      }

      const category = obj.modelname;
      totalCPECount += obj.cpecount;
      if (categories.indexOf(category) == -1) {
        categories.push(category);
      }

      softwareVersion.push(obj.softwareversion);

    });

    this.cpeCount = totalCPECount;

    var uniqueData = function (value, index, self) {
      return self.indexOf(value) === index;
    };

    softwareVersionArr = softwareVersion.filter(uniqueData);
    this.firmwareCount = softwareVersionArr.length;

    for (let i = 0; i < categories.length; i++) {
      initialDataArray[i] = 0;
    }



    data.forEach(obj => {

      var flag = true;
      if (finalObject.length) {
        finalObject.forEach(obj1 => {
          if (obj1.name.hasOwnProperty(obj.softwareversion)) {
            obj1.data[categories.indexOf(obj.modelname)] = obj.cpecount;
            flag = false;
          }
        })

      }


      if (flag) {
        let finalObj: any = {};
        initialDataArray = new Array(categories.length).fill(0);
        finalObj.name = obj.softwareversion;
        finalObj.data = initialDataArray;
        finalObj.data[categories.indexOf(obj.modelname)] = obj.cpecount;
        finalObject.push(finalObj);
      }
    });


    var chartHeight = 400;
    if (categories && categories.length > 0) {
      let catLength = categories.length * 30;
      chartHeight = catLength < chartHeight ? chartHeight : catLength;
    }

    let colors = ["rgba(122,108,176,0.75)", "rgba(238,174,0,0.75)", "rgba(102,153,204,0.75)", "rgba(102,153,0,0.75)", "rgba(232,123,0,0.75)", "rgba(68,54,125,0.75)", "rgba(0,132,126,0.75)", "rgba(23,190,207,0.75)", "rgba(153,0,0,0.75)"];
    return {
      title: {
        text: ''
      },
      chart: {
        type: 'bar',
        height: chartHeight
      },
      xAxis: {
        categories: (categories || []),
        labels: {
          // style: { cursor: 'pointer' },
        },
        title: {
          text: 'Models'
        }
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        lineColor: '#ddd',
        title: {
          text: 'Firmware Image Count (%) / Model'
        },
        opposite: true,
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold'
          }
        }
      },
      series: finalObject,
      plotOptions: {
        series: {
          stacking: 'normal',
          animation: {
            duration: 500
          }
        }
      },
      credits: {
        enabled: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      tooltip: {
        formatter: function () {
          if (this.point.category) {
            return this.point.category + '<br>' + this.series.name + ' : ' +
              this.point.y + ' (' + Highcharts.numberFormat(this.point.percentage, 2) + '%)';
          } else {
            return 'See Export for details.'
          }
        }
      },
      legend: {
        enabled: false
      },

      colors: colors,
      exporting: {
        enabled: false
      },

    };
  }

  softwareVersionsData = [];
  downloadSftwreReport() {
    this.validatorService.exportAsExcelFile(this.softwareVersionsData, 'export')
  }

  export() {

    let reportType = this.reportType;
    let isExtrafilter, isTypeSoft;
    if (this.manufacturer) {
      isExtrafilter = `&manufacturer=${this.manufacturer}`;
    }
    if (this.modelName) {
      isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&modelName=${this.modelName}`;
    }
    if (this.opmode) {
      isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&opmode=${this.opmode}`;
    }
    if (this.serialNumber) {
      isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&serialNumber=${this.serialNumber}`;
    }
    if (this.subscriber) {
      isExtrafilter = `${isExtrafilter ? isExtrafilter : ''}&subscriber=${this.subscriber}`;
    }
    if (this.reportType == 'Software') {
      isTypeSoft = `&inversely_time_period=false`;
    } else {
      isTypeSoft = `&inversely_time_period=${this.isTimePeriod ? this.isTimePeriod : 'false'}`;
    }
    this.isRunActive = isExtrafilter;

    if (this.reportType != 'SwapPendingReport') {
      var url = `${environment.SUPPORT_URL}/netops-report/inventory-report/download?${this.sso.getOrg(this.orgId)}reportType=${reportType}&startTime=${this.startTime}&endTime=${this.endTime}${isTypeSoft ? isTypeSoft : ''}${isExtrafilter ? isExtrafilter : ''}`;

      if (this.reportType === 'GroupedDevices') {
        let query = "";
        delete this.params['inversely_time_period'];
        for (var key in this.params) {

          if (this.params[key]) {
            if (query != "") {
              query += "&";
            }

            query += key + "=" + encodeURIComponent(this.params[key]);
          }

        }


        url = `${environment.SUPPORT_URL}/netops-report/inventory-report/download?${query}`;
      }
      let timeZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

      url += `&timeZ=${timeZ}`;

      url += `&file=true`;
    }
    this.http.get(url).subscribe((json: any) => {
      this.downloadService.saveToDisk(json);
    }, (err: any) => {
      this.pageErrorHandle(err)
      this.error = err.error;
      jquery('.error').show();
      this.loading = false;
    });
  }

  exportSwapReport() {

    let reportType = this.reportType;
    if (this.reportType == 'SwapPendingReport') {
      let paramsD = {
        // orgId: this.sso.getOrgId(),
        file: 'true',
        timeZ: this.dateUtils.getLocalTimeZoneName(),
        filter: this.filterExport,
        orderBy: this.orderfilternew
      };
      let query = "";
      for (var key in paramsD) {
        if (paramsD[key]) {
          if (query != "") {
            query += "&";
          }

          query += key + "=" + encodeURIComponent(paramsD[key]);
        }
      }


      var url = `${environment.SUPPORT_URL}/netops-swapsystem/downloadLogByGFS?${query}`
    }
    this.http.get(url).subscribe((json: any) => {
      this.downloadService.saveToDisk(json);
    }, (err: any) => {
      this.pageErrorHandle(err)
      this.error = err.error;
      jquery('.error').show();
      this.loading = false;
    });
  }
  public closeAlert() {
    jquery('.time').hide('slow');
    jquery('.error').hide('slow');
  }
  pageErrorHandle(err) {
    // if (err.status === 401) {
    //   this.alertMessage = 'Unauthorized User';
    // } 
    if (err.status === 500) {
      this.alertMessage = 'Internal Server Error';
    }
    else if (err.status === 504 || err.status == 502) {
      this.alertMessage = 'Gateway Time-Out';
    } else {
      this.alertMessage = this.sso.pageErrorHandle(err);
    }
  }
  // compareDate() {
  //   if (this.customEndDate > 0 && this.customStartDate > 0) {
  //     if (Date.parse(this.customEndDate) < Date.parse(this.customStartDate)) {
  //       jquery('.time').show();
  //       this.bttnDissable = true;
  //     } else {
  //       jquery('.time').hide();
  //       this.bttnDissable = false;
  //     }
  //   }

  // }
  compareStartDate() {

    if (this.customEndDate > 0 && this.customStartDate > 0) {
      if (Date.parse(this.customEndDate) > Date.parse(this.customStartDate)) {
        // jquery('.time').show();
        this.startErrorMessage = false;
        this.endErrorMessage = false;
        this.bttnDissable = false;
      } else if (Date.parse(this.customEndDate) < Date.parse(this.customStartDate)) {
        this.endErrorMessage = false;
        this.startErrorMessage = true;
        this.bttnDissable = true;
      }
      else if (Date.parse(this.customEndDate) == Date.parse(this.customStartDate)) {
        this.startErrorMessage = false;
        this.endErrorMessage = false;
        this.bttnDissable = false;
      }
      else {
        // jquery('.time').hide();
        this.bttnDissable = false;
        this.startErrorMessage = false;
        this.endErrorMessage = false;
      }
    }

  }

  compareEndDate() {
    this.maxDate = this.customEndDate;
    if (this.customEndDate > 0 && this.customStartDate > 0) {
      if (Date.parse(this.customEndDate) > Date.parse(this.customStartDate)) {
        // jquery('.time').show();
        this.startErrorMessage = false;
        this.endErrorMessage = false;
        this.bttnDissable = false;
      } else if (Date.parse(this.customEndDate) < Date.parse(this.customStartDate)) {
        this.endErrorMessage = true;
        this.startErrorMessage = false;
        this.bttnDissable = true;
      }
      else if (Date.parse(this.customEndDate) == Date.parse(this.customStartDate)) {
        this.startErrorMessage = false;
        this.endErrorMessage = false;
        this.bttnDissable = false;
      }
      else {
        // jquery('.time').hide();
        this.bttnDissable = false;
        this.startErrorMessage = false;
        this.endErrorMessage = false;
      }
    }

  }
  searchByCharacters(columns, name) {
    let textEntered: string;
    if (this.reportType != "SwapPendingReport") {
      textEntered = columns.serialnumber;
    }
    else if (this.reportType == "SwapPendingReport") {
      textEntered = columns.oldSystemFsan || columns.oldSystemRegId || columns.subscriberName || columns.subscriberAccount || columns.oldSystemMac || columns.newSystemId;
    }
    if(this.reportType !== "SwapPendingReport"){
      if (textEntered.length < 2){
        return;
      } 
    }

    this.searchResult = [];
    this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
      (res: any) => {
        if (res) {
          this.searchResult = res.records;
          this.stateinfo = { serialNumber: columns.serialnumber, isRouter: true };
          const RGs = (this.searchResult[0]?.devices || []).filter(obj => obj.opMode == "RG").map(obj => obj.serialNumber);
          if (RGs.length > 1) {
            const selectDevicesRg = RGs.includes(textEntered)
              ? textEntered
              : (this.searchResult[0]?.devices || [])
                .filter(obj => obj.serialNumber == textEntered)
                .map(obj => obj.wapGatewaySn)
                .join()

            this.searchResult[0].devices = (this.searchResult[0]?.devices || [])
              .filter(obj => obj.serialNumber == selectDevicesRg || obj.wapGatewaySn == selectDevicesRg);
          }

          if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco')) {
            sessionStorage.setItem("calix.deviceData", JSON.stringify(this.searchResult[0].devices));
            sessionStorage.setItem('calix.subscriberId', this.searchResult[0].subscriberId);
            if (name == "name" && this.searchResult.length) {
              this.router.navigate([]).then(result => { window.open('/support/overview/issues', '_blank') });
              sessionStorage.setItem('calix.serialNo', columns.serialnumber);
            } else {
              //this.router.navigate([window.open('/support/router','_blank')], { state: this.stateinfo })
              this.router.navigate([]).then(result => { window.open('/support/router', '_blank') });
              this.service.setSubscriberInfo(undefined);
              this.service.setSubscriberTabInfoData(undefined);
              sessionStorage.setItem('calix.serialNo', columns.serialnumber)
            }
          } else if (this.router.url.includes('cco-foundation')) {
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            let subId = res.records[0].subscriberId ? res.records[0].subscriberId : ''
            this.router.navigate([]).then(result => { window.open(`/cco-foundation/foundation-systems/foundation-manage/system-details?sn=${textEntered}&subscriber=${res.records[0].subscriberId}`, '_blank') })

          } else if (this.router.url.includes('/cco/')) {
            localStorage.setItem("calix.Device_Details", JSON.stringify(res.records[0]));
            this.service.setSubscriberInfo(undefined);
            this.service.setSubscriberTabInfoData(undefined);
            let subId = res.records[0].subscriberId ? res.records[0].subscriberId : ''
            window.open(`/cco/system/cco-subscriber-system/system-details?sn=${textEntered.trim()}&subscriber=${subId}`, '_blank')
          }

        }
      },
      err => {

      }
    );
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
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    //$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
    //$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
    //$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
  clearFilters() {
    this.manufacturer = '';
    this.modelName = '';
    this.opmode = '';
    this.serialNumber = '';
    this.subscriber = '';
    this.doFilter();
  }
}
















