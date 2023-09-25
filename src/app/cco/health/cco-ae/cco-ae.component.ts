import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { HealthService } from '../service/health.service';
import { CcochartService } from 'src/app/cco/health/pon-utilization/service/ccochart.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import _ from 'lodash';
import * as Highcharts from 'highcharts/highstock';
import Drilldown from "highcharts/modules/drilldown";
Drilldown(Highcharts);
import Highchartsscroller from "highcharts/modules/accessibility";
Highchartsscroller(Highcharts);
import data from "highcharts/modules/no-data-to-display"
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ThresholdService } from 'src/app/sys-admin/cco-admin/cco-health-threshold/threshold.service';
data(Highcharts);

@Component({
  selector: 'app-cco-ae',
  templateUrl: './cco-ae.component.html',
  styleUrls: ['./cco-ae.component.scss']
})
export class CcoAeComponent implements OnInit {
  hasScopeAccess = false;
  language: any = {};
  fromDate: Date;
  toDate: Date;
  maxDate = new Date();
  minDateForstart = new Date(new Date().setDate(new Date().getDate() - 727));
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  regionSelected: any = "All";
  locationSelected: any = "All";
  systemSelected: any = "All"; 
  interfaceSelected: any = "All";
  regionDataArray = ["All"];
  systemDataArray = ["All"];
  interfaceDataArray: any = ["All"];
  locationDataArray = ["All"];
  dateParam: string;
  modalTitle: any;
  modalInfo: any;
  modalRef: any;
  groupBy: any = "region";
  regionName: any;
  systemName: any;
  locationName: any;
  interfaceName: any;
  fullScreen: boolean = false;
  fullScreen_Filter: any = false;
  fullScreenChart: any;
  hideInterface:boolean=false;
  loading: boolean;
  params: any;
  regionNameSelected: any;
  locationNameSelected: any;
  systemNameSelected: any;
  regionsSubject: any;
  systemSubject;
  LocationSubject: any;
  chartTitlePon="Threshold By Region";
  chartTitlePacket='packetErrorbyRegion';
  chartType:any="Region";
  chartSubTitle='Select a region to view locations in that region';
  chartSubTitleforPackets:any;
  chartDownType='region';
  tableName: any ="Regions";
  searchType :any='Search regions';
  chartId='regionId';
  chartName="PON Port Courts";
  extraData: any;
  packageChart: any = { location: {}, system: {}, interface: {} };
  thresholdChart: any = { location: {}, system: {}, interface: {} };
  searchText: string;
  last24hours: boolean = false;
  combineLatest: Observable<unknown[]>;
  errorMsg: any;
  packetErrormsg: any;
  ponChart: any;
  parallelReqSubscribtion: any;
  ponChartbyLocation: any;
  ponchartLocMsg: any;
  packetErrorData: any;
  tableData: any = [];
  redenderOnce: boolean = false;
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtSub: any;
  dtSubs: any;
  dtOptions: DataTables.Settings = {};
  fullScreenChartName: string = '';
  fullScrChart: string;
  fullScreenChartType: any;
  fullScreenData: any;
  downloadTitle: string;
  fullScreenMsg: any;
  count: number;
  ponPackage: any;
  ponUtilizationChart: any;
  idCount =0;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  languageSubject;
  fsan: string;
  fsanValid: boolean;
  multipleTimeseriesChartList=[];
  timeseriesChart: boolean;
  subTitle: string;
  fromNs = 'false';
  nosystem: boolean = false;
  networkSystemsFilters: any;
  aeCounts: any;
  totalAE: any;
  thresholdData: any;
  hasWriteAccess: boolean;
  showTheshold: boolean;
  hasShowAccess: boolean;
  constructor(
    private dateUtilsService: DateUtilsService,
    private dialogService: NgbModal,
    private nfainventoryservice: NfainventoryService,
    private healthService: HealthService,
    private titleService: Title,
    private sso: SsoAuthService,
    private CcochartService: CcochartService,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private exportExcelService: ExportExcelService,
    private translateService: TranslateService,
    private route : ActivatedRoute,
    private router: Router,
    private service: ThresholdService,
  ) { 
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.applyfilter(true);
      this.titleService.setTitle(`${this.language['ae']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
  }
 
  ngOnInit(): void {
    this.titleService.setTitle(`${this.language['ae']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.getData();
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']) {
      this.hasShowAccess = true;
    }
    if (environment.VALIDATE_SCOPE) {
      if (scopes['cloud.rbac.coc.health.ae']) {
        this.hasScopeAccess = true;
      }
    } else {
      this.hasScopeAccess = true;
    }
    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      processing: false,
      dom: 'tipr',
      destroy: true,  
      ordering: true,
      order: [],
      columnDefs: [{ 
        targets: [2],
      }],
    }
    Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function (p, points, mouseEvent) {
      p.call(this, points, mouseEvent);
      if (!this.isHidden && this.shared) {
        var seriesTooltipBorderColor = points[0] && points[0].series && points[0].series.options.tooltip && points[0].series.options.tooltip.borderColor,
          borderColor = seriesTooltipBorderColor,
          label = this.label;
        if (label && borderColor) {
          label.attr({
            stroke: borderColor,
          });
        }
      }
    });
    this.route.queryParams.subscribe((params: any) => {
      this.fromNs = params['fromNs'] && params.fromNs == 'true' ? params.fromNs : 'false';
      if(this.fromNs == 'true'){
        this.hideInterface=true;
        this.timeseriesChart = true;
        this.networkSystemsFilters = params;
      }
      if (params['fsan']) {
        this.fsan = params['fsan']
      }
    })

    this.count = 0;
    let date = new Date();
    this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.toDate = new Date();
    this.tableLanguageOptions();
    this.getRegionsValue();
    if(this.fromNs != 'true')
    this.applyfilter(true);
    //Total Count
    this.totalAE = this.healthService.getAECount('ont').subscribe((res: any) => {
      this.aeCounts = res?.count?.toLocaleString();
    });
  }

  convert_number(value) {
    if (value) {
      return parseFloat((value * 100).toPrecision(12));
    } else {
      return value;
    }
  }

  getData() {
    this.service.getThresholds().subscribe((data: any) => {
      this.loading = false;
      //this.thresholdData=data
      if (data ){
        this.thresholdData=data;
        this.showTheshold =true;
      }
      else{
        this.showTheshold =false;
      }
    }, err => {
      this.loading = false;
    })
  }
  
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  changeDate() {
    if(!this.interfaceSelected)this.multipleTimeseriesChartList=[];
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
    if (this.fromDate && this.toDate) {
      this.dateParam = '&date=' + this.fromDate.getTime() + '%2C' + this.toDate.getTime();
    } else {
      this.dateParam = "";
    }
  }

  validateStartEndDates() {
    let currentDate = new Date();
    if (!this.fromDate) {
      this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      return false;
    }
    if (this.fromDate > currentDate || this.toDate > currentDate) {
      this.modalInfo = 'Time range not valid, End Date and Start Date should not above current Date';
      return false;
    }
    if (this.fromDate && this.toDate) {
      if (this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate) > this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)) {
        this.modalInfo = 'Time range not valid, end time should be later than start time.';
        return false;
      }
      else if (this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate) == this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)) {
        this.modalInfo = 'Time range not valid, Start Date and End Date should not be same .';
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  getRegionsValue() {
    this.regionsSubject = this.nfainventoryservice.GetRegions()
      .subscribe((res: any) => {
        this.regionDataArray = ["All"];
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
        this.regionDataArray = [...this.regionDataArray, ...res];

        if(this.fromNs == 'true'){
          // this.loading = false;
          if(this.networkSystemsFilters && this.networkSystemsFilters['region_uuid']){
            if(this.regionDataArray.findIndex(el => el['id'] == this.networkSystemsFilters['region_uuid']) !== -1){
              this.regionSelected = this.networkSystemsFilters['region_uuid'];
              this.getLocationValue('');
            } else{
              // this.loading = true;
              this.fromNs = 'false';
              this.applyfilter(true);
            }
          }
        }
      }, (error) => {
    })
  }

  getLocationValue(event: any) {
    let id = this.regionSelected == "All" ? "" : this.regionSelected
    this.groupBy = "region";
    this.locationSelected = "All";
    this.systemSelected = "All";
    this.interfaceSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    if (this.regionSelected && this.regionSelected != "All") {
      this.LocationSubject = this.nfainventoryservice.GetLocations(id)
        .subscribe((res: any) => {
          res.sort();
          this.locationDataArray = ["All"];
          this.locationDataArray = [...this.locationDataArray, ...res];

          if(this.fromNs == 'true'){
            if(this.networkSystemsFilters && this.networkSystemsFilters['location_uuid']){
              if(this.locationDataArray.findIndex(el => el['id'] == this.networkSystemsFilters['location_uuid']) !== -1){
                this.locationSelected = this.networkSystemsFilters['location_uuid'];
                this.getSystemValue('');
              } else{
                // this.loading = true;
                this.fromNs = 'false';
                this.applyfilter(true);
              }
            }
          }
        }, (error) => {
     })
    }
    this.regionDataArray.forEach((element: any) => {
      if (element.id == this.regionSelected) {
        this.regionName = element.name;
        this.thresholdChart.location = { region: this.regionSelected, regionname: this.regionName };
        this.packageChart.location = { region: this.regionSelected, regionname: this.regionName };
      }
    })
  }

  getSystemValue(event: any) {
    let regionId = this.regionSelected == "All" ? "" : this.regionSelected;
    let locationId = this.locationSelected == "All" ? "" : this.locationSelected;
    this.groupBy = "location";
    this.systemSelected = "All";
    this.interfaceSelected = 'All';
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    if (this.locationSelected != "All" && this.regionSelected != "All") {
      this.systemSubject = this.nfainventoryservice.GetSystems(regionId, locationId, 'ae')
        .subscribe((res: any) => {
          this.systemDataArray = ["All"];
          this.systemDataArray = [...this.systemDataArray, ...res];

          if(this.fromNs == 'true'){
            if(this.networkSystemsFilters && this.networkSystemsFilters['system_uuid']){
              if(this.systemDataArray.findIndex(el => el['uuid'] == this.networkSystemsFilters['system_uuid']) !== -1){
                this.systemSelected = this.networkSystemsFilters['system_uuid'];
                this.getInterfaceValue('');
              } else{
                // this.loading = true;
                this.fromNs = 'false';
                this.applyfilter(true);
              }
            }
          }
        }, (error) => {
        })
    }
    this.locationDataArray.forEach((element: any) => {
      if (element.id == this.locationSelected) {
        this.locationName = element.name;
        this.thresholdChart.system = { region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName };
        this.packageChart.system = { region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName };
      }
    })
  }

  getInterfaceValue(event: any) {
    this.interfaceSelected = "All";
    this.interfaceDataArray = ["All"];
    let paramsVal = {
      system: this.systemSelected == "All" ? "" : this.systemSelected,
      interfaceCategory: "ethernet"
    }
    let query = "";
    for (var key in paramsVal) {
      if (paramsVal[key] == undefined || paramsVal[key] == "" || paramsVal[key] === []) {
        continue;
      }
      if (query != "") {
        query += "&";
      }
      query += key + "=" + encodeURIComponent(paramsVal[key]);
    }
    query += '&aeMgmt=true'
    if (this.systemSelected != "All" && this.locationSelected != "All" && this.regionSelected != "All") {
      this.healthService.GetInterfaces(query, 'ethernet').subscribe((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: true }))
        this.interfaceDataArray = ["All"];
        this.interfaceDataArray = [...this.interfaceDataArray, ...res];

        if(this.fromNs == 'true'){
          if(this.networkSystemsFilters && this.networkSystemsFilters['interface']){
            if(this.interfaceDataArray.findIndex(el => el['name'] == this.networkSystemsFilters['interface']) !== -1){
              this.interfaceSelected = this.networkSystemsFilters['interface'];
              // this.loading = true;
              this.fromNs = 'false';
              this.applyfilter(true);
            } else{
              // this.loading = true;
              this.fromNs = 'false';
              this.applyfilter(true);
            }
          }
        }
      })
      this.systemDataArray.forEach((element: any) => {
        if (element.uuid == this.systemSelected) {
          this.systemName = element.name;
          this.thresholdChart.interface = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName
          }
          this.packageChart.interface = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName
          }
        }
      })
    }
  }

  selectInterface(event: any) {
    this.interfaceDataArray.forEach((element: any) => {
      if (element.name == this.interfaceSelected) {
        this.interfaceName = element.name;
        this. thresholdChart.interface = {
          region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
          , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
        }
        this.packageChart.interface = {
          region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
          , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
        }

      }
    })
  }

  fsanChanges($event) {
    if (this.fsan.length == 0 || this.fsan.length == 12) this.fsanValid = false;
    this.interfaceSelected = "All";
    this.regionSelected = "All";
    this.systemSelected = "All";
    this.locationSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

  fsanvalidated($event) {
    let flength = this.fsan?.length
    if (flength != 0 && flength < 12) {
      this.fsanValid = true; return true;
    }
    else { this.fsanValid = false; return false }
  }

  applyfilter(val,chart?,data?) {
    if (this.fsanvalidated("d")) return;
    this.fromDate = this.fromDate;
    this.toDate = this.toDate;
    if(val || chart){
      this.searchText='';
      if(chart?.type == "Interface"){
        this.rerender();
      }
    }
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
    this.fromDate = this.fromDate;
    this.toDate = this.toDate;
    if (this.fullScreen == true) {
      this.fullScreen_Filter = true;
      if (this.systemSelected && this.systemSelected != "All") {
        let chartNames;
        this.chartId = 'interface';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'Threshold By Interface';
        }
        else if (this.fullScreenChart == "packagechart") {
          chartNames = 'PacketErrorByInterface';
        }   
        this.fullScreenExpandFunction(chartNames, 'Interface', this.fullScreenChart, '', this.chartId)
        return
      }
      if (this.locationSelected && this.locationSelected != "All") {
        let chartNames;
        this.chartId = 'systemId';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'Threshold By System'
        }
        else if (this.fullScreenChart == "packagechart") {
          chartNames = "PacketErrorBySystem"
        }
        this.fullScreenExpandFunction(chartNames, 'System', this.fullScreenChart, '',this.chartId )
        return
      }
      if (this.regionSelected && this.regionSelected != "All") {
        let chartNames;
        this.chartId = 'locationId';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'Threshold By Location'
        }
        else if (this.fullScreenChart == "packagechart") {
          chartNames = "PacketErrorByLocation"
        }
        this.fullScreenExpandFunction(chartNames, 'Location', this.fullScreenChart, '',this.chartId )
        return
      }
      if (this.regionSelected == "All") {
        let chartNames;
        this.chartId="regionId";
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'Threshold By Region'
        }
        else if (this.fullScreenChart == "packagechart") {
          chartNames = "packetErrorbyRegion"
        }
        this.fullScreenExpandFunction(chartNames, 'Region', this.fullScreenChart, '',this.chartId)
        return
      }
    }
    else {
      this.hideInterface=false;
      this.timeseriesChart = false;
      this.fullScreen_Filter = false;
      if (this.fsan) {
        this.hideInterface=true;
        let params = {
          tenant: "0",
          startTime: this.fromDate,
          endTime: this.toDate,
          fsan: this.fsan
        }
        params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
        let paramsname = {
          ont: this.fsan
        }
        this.multipleTimeseriesChartList = [];
        this.timeseriesChart = true;
        this.nosystem = true
        this.loadMultipleChart(params, paramsname, "ae_General", this.fsan,this.fsan);
        return
      }
      if ((this.interfaceSelected && this.interfaceSelected != "All") ||chart?.type == "Interface" || data?.interface) {
        if(chart || data){
          let isTimeSeries, date, endDate, groupBy;
          isTimeSeries = true;
          date = this.fromDate;
          endDate = this.toDate;
          groupBy = "";
          this.getInterfaceValue(chart)
          let interfaceSelected=chart.category?chart.category:data.interface
          if (isTimeSeries) {
            let params = {
              tenant: "0",
              startTime: this.fromDate,
              endTime: this.toDate,
              region: chart?.extradata?.region ? chart?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || chart.type == "Location" ? "" : this.regionSelected,
              location: chart?.extradata?.location ? chart?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
              system: chart?.extradata?.system ? chart?.extradata?.system :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: interfaceSelected
            }
            params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
            let paramsName = {
              regionname: chart?.extradata?.regionname ?chart?.extradata?.regionname:this.regionNameSelected,
              locationname: chart?.extradata?.locationname?chart?.extradata?.locationname:this.locationNameSelected,
              systemname: chart?.extradata?.systemname ?chart?.extradata?.systemname:this.systemNameSelected,
              interfacename: chart.name ?chart.name :interfaceSelected
            }
            this.systemNameSelected = this.systemName;
            this.timeseriesChart = true;
            let system =chart?.extradata?.system ?chart?.extradata?.system:this.systemSelected
            let chartName =  'ae_threshold' +system  + interfaceSelected;
            this.nosystem = false
            this.loadMultipleChart(params, paramsName, "General" ,chartName, interfaceSelected)
            return
          }
        } else{
          this.hideInterface=true
          this.multipleTimeseriesChartList = [];
            let params = {
              tenant: "0",
              startTime: this.fromDate,
              endTime: this.toDate,
              region: this.regionSelected == "All" ? "" : this.regionSelected,
              location: this.locationSelected == "All" ? "" : this.locationSelected,
              system: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: this.interfaceSelected == "All" ? "" : this.interfaceSelected,
            }
            params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
            let paramsName = {
              regionname: this.regionName,
              locationname: this.locationName,
              systemname: this.systemName,
              interfacename: this.interfaceName
            }
            this.timeseriesChart = true;
            this.nosystem = false
            this.loadMultipleChart(params, paramsName, "General", "General",this.interfaceSelected)
            return;
          }      
      }
      if(((this.systemSelected && this.systemSelected != "All") ||chart?.type == "System" || data?.system) || ((this.locationSelected && this.locationSelected != "All")||chart?.type == "Location"  || data?.location) ||((this.regionSelected && this.regionSelected != "All") || chart?.type == "Region" || data?.region) ){
        if ((this.systemSelected && this.systemSelected != "All")||chart?.type == "System" || data?.system) {
          this.multipleTimeseriesChartList=[];
          this.chartTitlePon="Threshold By Interface";
          this.chartTitlePacket= 'PacketErrorByInterface';
          this.chartType="Interface";
          this.chartSubTitle='Select an interface to view thresholds exceeded on that interface';
          this.chartSubTitleforPackets='AE_package_Sub';
          this.chartDownType="interface";
          this.tableName="Interfaces";
          this.chartId = 'interface';
          this.searchType = 'Search interfaces';
          let value = val ?{ type: "System", valueType: "ponchart", category: this.systemSelected, name: this.systemName, extradata: this.thresholdChart.system }:chart
          let groupBy, chartsId;
          groupBy = "interface"
          this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
          this.locationSelected=value.extradata?.location?value.extradata?.location:this.locationSelected
          this.systemSelected=value.category ?value.category:data.systemId
          this.systemNameSelected=value.name ? value.name:data?.system
          console.log(this.systemSelected)
          if(!val)this.getInterfaceValue(value)
          this.extraData = {
            region: this.regionSelected, regionname: value?.extradata?.regionname ? value?.extradata?.regionname:this.regionNameSelected, location: this.locationSelected, locationname: value?.extradata?.locationname ?value?.extradata?.locationname :this.locationNameSelected,
            system: this.systemSelected, systemname: this.systemNameSelected
          }
          this.thresholdChart.interface = this.extraData
          this.packageChart.interface=this.extraData
          chartsId = "Interface_chart";
      
          this.params = {
            tenant: "0",
            startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
            region: value?.extradata?.region ? value?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
            location: value?.extradata?.location ? value?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
            system: value.category ? value.category :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
            groupBy: groupBy,
          }
          this.loading = true;
          this.makeQuery()
          return
        }
        if ((this.locationSelected && this.locationSelected != "All")||chart?.type == "Location"  || data?.location) {
          this.chartTitlePon="Threshold Exceeded By System";
          this.chartTitlePacket="PacketErrorBySystem";
          this.chartType="System";
          this.chartSubTitle='Select a system to view interfaces for that system';
          this.tableName="Systems";
          this.chartDownType="system";
          this.chartId = 'systemId';
          this. searchType = 'Search systems';
          let value = val?{ type: "Location", valueType: "ponchart", category: this.locationSelected, name: this.locationName, extradata: this.thresholdChart.location }:chart;
          let groupBy,chartsId;
          groupBy = "system";
        chartsId = "System_chart";
        this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
        this.locationSelected=value.category ?value.category: data.locationId
        this.locationNameSelected=value.name ?value.name:data.location
        if(!val)this.getSystemValue(value)
        this.extraData = { region: this.regionSelected, regionname: value.extradata?.regionname ?value.extradata?.regionname:this.regionNameSelected , location:this.locationSelected, locationname: value.name ?value.name:data.location }
        this.thresholdChart.system = this.extraData;
        this.packageChart.system=this.extraData
  
        this.params = {
          tenant: "0",
          startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
          endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
          region: value?.extradata?.region ? value?.extradata?.region : this.regionSelected? this.regionSelected:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
          location: value.category ? value.category : this.locationSelected?this.locationSelected:this.locationSelected == "All" ? "" : this.locationSelected,
          groupBy: groupBy,
        }
        this.loading = true;
        this.makeQuery()
          return
        }
        if ((this.regionSelected && this.regionSelected != "All")||chart?.type == "Region" || data?.region) {
          let groupBy, chartsId;
          this.chartTitlePon="Threshold Exceeded By Location";
          this.chartTitlePacket="PacketErrorByLocation";
          this.chartType="Location";
          this.chartSubTitle='Select a location to view systems in that location';
          this.chartDownType='location';
          this.tableName="Locations";
          this.chartId = 'locationId';
          this.searchType = 'Search locations';
          let value = val?{ type: "Region", valueType: "ponchart", category: this.regionSelected, name: this.regionName }:chart;
          groupBy = "location";
          chartsId = "Location_chart";
          this.extraData = { region: value.category ? value.category: data?.regionId, regionname: value.name? value.name:data.region};
          this.regionSelected=value.category ? value.category: data.regionId;
          this.regionNameSelected=value.name ? value.name:data.region;
          if(!val)this.getLocationValue(value);
          this.thresholdChart.location=this.extraData;
          this.packageChart.location=this.extraData
          this.params = {
            tenant: "0",
            startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
            region: value.category ? value.category : data.regionId? data.regionId:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
            groupBy: groupBy,
          }
          this.loading = true;
          this.makeQuery()
          return
        }
      }
      this.chartType="Region";
      this.chartDownType='region';
      this.tableName="Regions";
      this.chartId="regionId";
      this.chartTitlePon="Threshold By Region";
      this.chartSubTitle='Select a region to view locations in that region';
      this.chartTitlePacket="packetErrorbyRegion";
      this.searchType = 'Search regions';
      let params = {
        tenant: "0",
        startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
        endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
        groupBy: "region"
      }
      this.chartId="regionId";
      params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
        let query = "";
        for (var key in params) {
          if (params[key] == undefined || params[key] == "undefined" || params[key] == "") {
            continue;
          }
          if (query != "") {
            query += "&";
          }
          query += key + "=" + encodeURIComponent(params[key]);
        }
        this.loading = true; this.errorMsg = "";this.packetErrormsg = "";
      query = query + '&interfaceCategory=ae'
      let requestEndpoints = [
        `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
        `${environment.API_BASE_URL}health/reports/packeterrors?${query}`,
      ];
      const requests = [];
      requestEndpoints.forEach(endpoint => {
        const req = this.CcochartService.callRestApi(endpoint).pipe(map((res: any) => {
          return res;
        }),
          catchError((error: any) => {
            return of(error);
          }));
        requests.push(req);
      });
      this.combineLatest = combineLatest(requests);
      this.makeParallelRequest();
    }
  }

  makeQuery(){
    this.params ["granularity"] = this.healthService.getGranularity( this.params.startTime,  this.params.endTime);
    let query = "";
    for (var key in  this.params ) {
      if ( this.params [key] == undefined ||  this.params [key] == "undefined" ||  this.params [key] == "") {
        continue;
      }
      if (query != "") {
        query += "&";
      }
      query += key + "=" + encodeURIComponent( this.params [key]);     
    }
    query = query + '&interfaceCategory=ae';
    let requestEndpoints = [
      `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
      `${environment.API_BASE_URL}health/reports/packeterrors?${query}`,
    ];
    const requests = [];
    requestEndpoints.forEach(endpoint => {
      const req = this.CcochartService.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest(this.extraData);
  }

  fullScreenExpandFunction(chartName: string, valType?, chart?, valueData?,type?) {
    this.fullScreenData = [];
    this.fullScreen = true;
    this.fullScreenChartType = valType;
    this.fullScreenMsg = "";
    this.fullScreenChartName = this.language[chartName] ? this.language[chartName] : chartName;
    this.fullScreenChart = chart;
    this.downloadTitle = chartName;
    let groupBy;
    if (valType == "Region") { groupBy = 'region'; this.fullScreenChartType = 'region'; }
    else if (valType == 'Location') { groupBy = 'location'; this.fullScreenChartType = 'location'; }
    else if (valType == 'System') { groupBy = 'system'; this.fullScreenChartType = 'system'; }
    else if (valType == 'Interface') { groupBy = 'interface'; this.fullScreenChartType = 'interface'; }
    if (valueData) {
      this.fullScreenMsg = ""; 
      this.fullScreenData = valueData;
      this.rerender();
      if (chart == 'ponchart') {
        this.fullScrChart = 'PON Port Courts';
        Highcharts.chart('fullScreenChart', this.portCountChartOption(valueData || [], valType, true, this.thresholdChart[groupBy]));
      }else if (chart == "packagechart") {
        this.fullScrChart = 'ae_packet';
        Highcharts.chart('fullScreenChart', this.packetDroppedChartOption(valueData || [], valType, true, this.packageChart[groupBy]));       
      }
      setTimeout(() => {
        var elmnt = document.getElementById("full_screen");
        elmnt.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
    else {
      this.fullScreenData = [];
      this.rerender();
      let params = {
        tenant: "0",
        startTime: `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
        endTime: `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
        region: this.regionSelected == "All" ? "" : this.regionSelected,
        location: this.locationSelected == "All" ? "" : this.locationSelected,
        system: this.systemSelected == "All" ? "" : this.systemSelected,
        groupBy: groupBy
      }
      params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
      let query = "";
      for (var key in params) {
        if (params[key] == undefined || params[key] == "undefined" || params[key] == "") {
          continue;
        }
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(params[key]);
      }
      if (chart == "ponchart") {
        this.fullScrChart = 'PON Port Courts';
        this.ponUtilizationChart = this.CcochartService.Getutilizationthresholdexceededcount(query, 'ae').subscribe(res => {
          res = this.totalCoutSort(res, "usUtilExcCnt", "dsUtilExcCnt", valType)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', this.portCountChartOption(res || [], valType, true, this.thresholdChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
      else if (chart == "packagechart") {
        this.fullScrChart = 'ae_packet';
        this.ponPackage = this.CcochartService.GetPacketdroppedn(query, 'ae').subscribe(res => {
          res = this.totalCoutSort(res, "txErr", "rxErr", valType)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', this.packetDroppedChartOption(res || [], valType, true, this.packageChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
    }
  }

  portCountChartOption(data, type?, fullScreen?: boolean, valueData?): any {
    const self = this;
    let category, categoryId, subTitle;
    let maxValue = 0;
    var seriesData = [];
    var seriesData1 = [];
    var xAxisCategories = [];
    var groupsBy;
    if (type == 'Region') {
      groupsBy = 'region';
      categoryId = 'regionId';
    }
    else if (type == 'Location') {
      groupsBy = 'location';
      categoryId = 'locationId';
    }
    else if (type == 'System') {
      groupsBy = 'system';
      categoryId = 'systemId';
    }
    else if (type == 'Interface') {
      groupsBy = 'interface';
      categoryId = 'interface';
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupsBy,categoryId)
      data.forEach(element => {
        xAxisCategories.push(element[groupsBy]);
        seriesData1.push({
          y: element.usUtilExcCnt ? element.usUtilExcCnt : 0,
          color: this.healthService.chart_color(element, "usUtilExcCnt", "first")
        });
        seriesData.push({
          y: element.dsUtilExcCnt ? element.dsUtilExcCnt : 0,
          color: this.healthService.chart_color(element, "dsUtilExcCnt", "second")
        });       
      });
      maxValue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'column',
      },
      legend: {
        enabled: true,
      },
      exporting: {
        enabled: false,
      },
      title: {
        text: type,
        style: {
          display: 'none',
        }
      },
      subtitle: {
        text: subTitle,
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxValue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxValue == 15 ? true : false,
        },
        tickLength: 0,
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language["AE Interface Count"],
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1,
      },
      tooltip: {
        useHTML: true,
        borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first ||
              point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].second || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].second) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px"> ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${self.healthService.toolip_color(point.color)};padding:0'> ${point.series.name} : </td>
          <td style='padding:0;margin-left:10px'>&nbsp ${self.ShortnumberPipe.transform(point.y)} </b></td></tr>`
          });
          let g = s + f;
          return h + g;
        },
        shared: true,
      },
      lang: {
        noData: this.language["No Data Available"],
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false,
          }
        },
        series: {
         minPointLength: 3,
          point: {
            events:
            {
              mouseOver: function (event) {
                data.forEach((element: any) => {
                  let Deleted : boolean = false;
                  if (element[groupsBy] == this.category) {
                    Deleted = element?.deleted
                    if (!fullScreen && !Deleted) { 
                      this.graphic.attr({
                        cursor: 'pointer'
                      });
                    }
                  }
                })                      
              },
              click: function (event) {
                if (fullScreen) 
                  return
                let isDeleted : boolean = false;
                data.forEach((element: any) => {               
                  if (element[groupsBy] == event.point.category) {
                    category = element[categoryId];
                    isDeleted = element?.deleted
                    if(isDeleted){
                      return
                    }
                  }
                })
                let data1 = { type: this.series.chart.options.title.text, valType: "ponchart", category: category, name: event.point.category, valueData: event?.point.series.options.valueData }
                if(!isDeleted){
                  self.applyfilter(false,data1)
                }                                  
              }
            }
          },
        }
      },
      series: [
        {
          name: this.language['Upstream'],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          valueData: valueData,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first
          },
        },
        {
          name: this.language['Downstream'],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second,
          valueData: valueData,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second
          },
        }
      ]
    };
  }

  packetDroppedChartOption(data, type?, fullScreen?: boolean, valueData?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxValue = 0;
    var seriesData = [];
    var seriesData1 = [];
    var xAxisCategories = [];
    var groupsBy;
    if (type == 'Region') {
      groupsBy = 'region',
      categoryid = 'regionId';
    }
    else if (type == 'Location') {
      groupsBy = 'location';
      categoryid = 'locationId';
    }
    else if (type == 'System') {
      groupsBy = 'system';
      categoryid = 'systemId';
    }
    else if (type == 'Interface') {
      groupsBy = 'interface';
      categoryid = 'interface';
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupsBy,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupsBy]);
        seriesData.push({
          y: element.rxErr || element.rxErr == 0 ? element.rxErr : 0,
          color: this.healthService.chart_color(element, "rxErr", "first")
        })
        seriesData1.push({
          y: element.txErr || element.txErr == 0 ? element.txErr : 0,
          color: this.healthService.chart_color(element, "txErr", "second")
        })
      });
      maxValue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'column',
      },
      subtitle: {
        text: subTitle,
      },
      exporting: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
      title: {
        text: type,
        style: {
          display: 'none',
        }
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxValue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxValue == 15 ? true : false,
        },
        tickLength: 0,
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: this.language['Error Count']
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1,
        min: 0,
        softMax: 1,
        minRange: 0,
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first ||
              point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].second || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].second) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px"> ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${self.healthService.toolip_color(point.color)};padding:0'> ${point.series.name} : </td>
        <td style='padding:0;margin-left:10px'>&nbsp ${self.ShortnumberPipe.transform(point.y)} </b></td></tr>`
          });
          let g = s + f;
          return h + g;
        },
        shared: true,
      },
      lang: {
        noData: this.language["No Data Available"],
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false,
          }
        },
        series: {
          minPointLength: 3,
          point: {
            events:
            {
              mouseOver: function (event) {
                data.forEach((element: any) => {
                  let Deleted : boolean = false;
                  if (element[groupsBy] == this.category) {
                    Deleted = element?.deleted
                    if (!fullScreen && !Deleted) { 
                      this.graphic.attr({
                        cursor: 'pointer'
                      });
                    }
                  }
                })                      
              },
              click: function (event) {
                if (fullScreen) 
                return
              let isDeleted : boolean = false;
              data.forEach((element: any) => {
                if (element[groupsBy] == event.point.category) {
                  category = element[categoryid];
                  isDeleted = element?.deleted
                  if(isDeleted){
                    return
                  }
                }
                })
                let data1 = { type: this.series.chart.options.title.text, valType: "packagechart", category: category, name: event.point.category, valueData: event?.point.series.options.valueData }
                if(!isDeleted){
                  self.applyfilter(false,data1)
                }
              }
            }
          },
        }
      },
      series: [
        {
          name: this.language["Received Error Packets"],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: valueData,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first
          },
        },
        {
          name: this.language["Transmitted Error Packets"],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second,
          extradata: valueData,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second
          },
        }
      ]
    };
  }

  totalCoutSort(data, key1, key2, valueType = 'Region') {
    let a = [];
    let b = [];
    let name = valueType.toLowerCase();
    if (name == "interface")
      data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: true }))
    else {
      data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: false }))
    }
    data.forEach(obj => {
      if ((obj[key1] || obj[key2]) || (obj[key1] == 0 || obj[key2] == 0)) {
        a.push(obj);
      }
      else
        b.push(obj);
    });
    a.sort(function (a, b) {
      let a1 = (a[key1] ? a[key1] : null) + (a[key2] ? a[key2] : null)
      let b1 = (b[key1] ? b[key1] : null) + (b[key2] ? b[key2] : null)
      return (b1 - a1)
    });
    data = [...a, ...b];
    return data;
  }

  errorHandler(err){
    if (err.status == 401) {
      this.fullScreenMsg = this.language['Access Denied'];
    }
    else {
      this.fullScreenMsg = this.commonOrgService.pageErrorHandle(err);
    }
  }
  
  getTableFullscreen(res,groupBy,type){
    this.fullScreenMsg = "";
    this.fullScreenData=this.healthService.duplicateDataHandle(res,groupBy,type)
    this.rerender();
    this.loading = false;
  }

  chartTableData(groupBy, data) {
    let duplicate = [];
    let fullScreenDatas = []
    if (data.length) {
      let count = 0; 
      data.forEach((element: any) => {
        count = count + 1;
        if (!element[groupBy] || element[groupBy] == "       ") {
          element[groupBy] = "Other";
        }
        if (duplicate.indexOf(element[groupBy]) === -1) {
          duplicate.push(element[groupBy])
        }
        else {
          let c = 0;
          let temp = 1;
          do {
            c = c + 1;
            let test = element[groupBy] + "(" + c + ")";
            if (duplicate.indexOf(test) === -1) {
              element[groupBy] = test;
              duplicate.push(element[groupBy])
              temp = 0;
            }
          } while (temp != 0);
        }
      });
      data.forEach(element => {
        fullScreenDatas.push(element);
      });
    }
    this.fullScreenData = fullScreenDatas;
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtSub=this.dtTrigger.next();
      this.dtSubs=this.dtTrigger1.next();
    });
  }

  downloadFunction(chartName: string, idName?: string, type?: string, valueData?, title?,chartId?) {
    this.idCount++
    console.log(valueData)
    let extraData = this.heading(chartName, type, idName, title)
    let id = idName+this.idCount;
    $(id).addClass('spinnershow');  
    let fname;
    let data;
    if(chartId)data = this.healthService.duplicateDataHandle(valueData,type,chartId)
    if (chartName == 'ae_packet') {
      fname = this.healthService.generateDownloadName(title, "", 'ae');
      data = this.healthService.chartDataFraming(valueData, "ethernet_packet", type, extraData);
      console.log(data)
    }else {
      fname = this.healthService.generateDownloadName(chartName, type, 'ae');
      data = this.healthService.chartDataFraming(valueData, chartName, type, extraData);
      console.log(data)
      console.log(fname)
    }
    setTimeout(() => {
      $(id).removeClass('spinnershow');
    }, 1000);
    this.exportExcelService.downLoadCSV(fname, data, extraData);
  }

  heading(chartName, type, idName, title?) {
    let region, location, system, interfaces, heading;
    let pipe = new DatePipe('en-US');
    if (chartName == 'PON Port Courts') {
      heading = this.thresholdChart[type];
    }
    else if (chartName == 'ae_packet') {
      heading = this.packageChart[type];
    }
    if (heading) {
      region = heading.regionname ? heading.regionname : this.regionSelected?this.regionSelected:'All';
      location = heading.locationname ? heading.locationname : this.locationSelected;
      system = heading.systemname ? heading.systemname : this.systemSelected;
      interfaces = heading.interfacename ? heading.interfacename : this.interfaceSelected
    }
    let extraData
    if (type == 'region')
      extraData = `${this.language[title]||title} \r\n${this.language.region} : All \r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')} \r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')} \r\n\r\n`;
    else if (type == 'location')
      extraData = `${this.language[title]||title} \r\n${this.language.region} : ${region} \r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')}\r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')} \r\n\r\n`;
    else if (type == 'system')
      extraData = `${this.language[title]||title} \r\n${this.language.region} : ${region} \r\n${this.language.location} : ${location}\r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')}\r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')} \r\n\r\n`;
    else
      extraData = `${this.language[title]} \r\n${this.language.region} : ${region} \r\n${this.language.location} : ${location}\r\n${this.language.System} : ${system}\r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')} \r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')} \r\n\r\n`;
    return extraData;
  }

  fullScreenInvertFunction() { 
    this.searchText='';
    this.fullScreen = false;
    if(this.fullScreen_Filter)
    this.applyfilter(true);  
  }

  loadMultipleChart(param, paramsName, valType?, valName?,value?) {
    this.count = this.count + 1;
    let IsDuplicate = false;
    if (this.multipleTimeseriesChartList.length) {
      this.multipleTimeseriesChartList.forEach(element => {
        if (element.chartname == valName) {
          IsDuplicate = true;
          var elmnt = document.getElementById(valName);
          if (elmnt) elmnt.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    if (IsDuplicate)
        return;
    setTimeout(() => {
      this.multipleTimeseriesChartList.push({
        params: param,
        paramname: paramsName,
        charttype: valType,
        chartname: valName,
        divid: valName + this.count,
        page: valType == 'ae_General' ? 'ae_General' : 'ae',
        title:value,
        system:this.nosystem?'':value && this.systemNameSelected ?this.systemNameSelected:paramsName?.systemname,
      });
      this.multipleTimeseriesChartList = [...this.multipleTimeseriesChartList];
    }, 100)
  }

  makeParallelRequest(valueData?){
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      if (response[0] && response[0].error) {
        if (response[0].status == 401) {
          this.errorMsg = this.language['Access Denied'];
        } else {
          this.errorMsg = this.commonOrgService.pageErrorHandle(response[0]);
        }
        this.ponChartbyLocation = [];
        this.ponChart = [];
      } else {
        response[0] = this.totalCoutSort(response[0], "usUtilExcCnt", "dsUtilExcCnt", this.chartType)
        this.ponChart = response[0];
        console.log(this.ponChart)
        this.ponChartbyLocation = response[0]; this.ponchartLocMsg = "";
        Highcharts.chart('PortCourtChart', this.portCountChartOption(Object.assign([],this.ponChartbyLocation.map(element => Object.assign({},element))) || [], this.chartType, false,valueData));
        this.GetSubTitle(Object.assign([],this.ponChartbyLocation.map(element => Object.assign({},element))) || [], this.chartType, false,valueData)
      }
      if (response[1] && response[1].error) {
        if (response[1].status == 401) {
          this.packetErrormsg = this.language['Access Denied'];
        } else {
          this.packetErrormsg = this.commonOrgService.pageErrorHandle(response[1]);
        }
        this.packetErrorData = [];
      } else {
        response[1] = this.totalCoutSort(response[1], "txErr", "rxErr", this.chartType)
        this.packetErrorData = response[1];
        Highcharts.chart('PacketDroppedChart', this.packetDroppedChartOption(Object.assign([],this.packetErrorData.map(element => Object.assign({},element))) || [], this.chartType, false,valueData));
        this.GetSubTitle(Object.assign([],this.packetErrorData.map(element => Object.assign({},element))) || [], this.chartType, false,valueData)
      }
        this.getTableData([ Object.assign([],this.ponChart.map(element => Object.assign({},element))),Object.assign([],this.packetErrorData.map(element => Object.assign({},element)))], this.chartId) 
        this.loading = false;   
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  getTableData(data:any, type: any, chartType? ){
    let arr = _.groupBy(_.flatten([JSON.parse(JSON.stringify(data[0])), JSON.parse(JSON.stringify(data[1]))]), type);
    this.tableData = _.map(arr, function (val) { return _.merge.apply(_, val) });  
    let groupby = type.replace('Id', '');
    this.tableData=this.healthService.duplicateDataHandle(this.tableData,groupby,type)
    this.tableData=this.healthService.totalcountsort(this.tableData, 'usUtilExcCnt','dsUtilExcCnt','rxErr','txErr',"count", chartType)
    if(!this.redenderOnce){
      this.dtTrigger.next();
      this.redenderOnce = true;
    } else {
      this.rerender();
    }
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number);
  }

  clearChartContainer(values: any) {
    var findindex = this.multipleTimeseriesChartList.findIndex(x => x.chartname === values.chartname);
    if (findindex > -1) {
      this.multipleTimeseriesChartList.splice(findindex, 1);
    }
  }

  clearFilter() {
    if(this.loading){
      return
    }
    this.subTitle='';
    this.searchText='';
    let date = new Date();
    this.fromDate = this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.toDate = new Date();
    this.last24hours = false;
    this.systemDataArray = ["All"];
    this.locationDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    this.locationSelected = "All";
    this.regionSelected = "All";
    this.systemSelected = "All";
    this.interfaceSelected = "All";
    this.regionName = null;
    this.locationName = null;
    this.systemName = null;
    this.fsan = "";
    this.groupBy = null;
    this.chartId="regionId";
    this.multipleTimeseriesChartList=[];
    if (this.fullScreen == true) {
      this.fullScreen_Filter = true;
      let chartNames;
      if (this.fullScreenChart == "ponchart") {
        chartNames = 'Threshold By Region'
      }
      else if (this.fullScreenChart == "packagechart") {
        chartNames = 'packetErrorbyRegion'
      }
      this.fullScreenExpandFunction(chartNames, 'Region', this.fullScreenChart,'',this.chartId)
      return
    }
    else {
    this.applyfilter(true);
     this.chartType="Region";
     this.chartDownType='region';
     this.tableName="Regions";
     this.chartSubTitle='Select a region to view locations in that region';
     this.chartId="regionId";
     this.chartTitlePon="Threshold By Region";
     this.chartTitlePacket="packetErrorbyRegion";
     this.searchType = 'Search regions';
    }
  }

  search(term: string) {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns(0).search(term).draw();
        });
    });
  }

  navigateThreshold(){
    this.router.navigate(["cco/operations/health/monitoring-thresholds"])
  }

  clearSearch(value) {
    this.searchText = "";
    this.rerender()
  }

  ngOnDestroy(): void {
    if (this.dtSub)this.dtSub.unsubscribe();
    if (this.dtSubs)this.dtSubs.unsubscribe()
    if (this.parallelReqSubscribtion)this.parallelReqSubscribtion.unsubscribe();
    if (this.ponUtilizationChart)this.ponUtilizationChart .unsubscribe();
    if (this.ponPackage)this.ponPackage.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.LocationSubject) this.LocationSubject.unsubscribe();
    if (this.regionsSubject) this.regionsSubject.unsubscribe();
    if (this.systemSubject) this.systemSubject.unsubscribe();
    if (this.totalAE) this.totalAE.unsubscribe();
  }

  GetSubTitle(data, type?, fullscreen?: boolean, extradata?){
    var groupby,categoryid
    if (type == 'Region') {
      groupby = 'region'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId'
      this.subTitle = `${this.language['region']}: ${extradata?.regionname}`
    }
    else if (type == 'System') {
      groupby = 'system',
        categoryid = 'systemId'
        this.subTitle = `${this.language['region']}: ${extradata?.regionname},
       ${this.language['location']}: ${extradata?.locationname} `
    }
    else if (type == 'Interface') {
      groupby = 'interface'
      categoryid = 'interface'
      this.subTitle = `${this.language['region']}: ${extradata?.regionname},
       ${this.language['location']}: ${extradata?.locationname}, ${this.language['System']}: ${extradata?.systemname} `
    }
    else if (type == 'Ont') {
      groupby = 'ont',
        categoryid = 'ontId'
        this.subTitle = `${this.language['region']}: ${extradata?.regionname},
       ${this.language['location']}: ${extradata?.locationname}, ${this.language['System']}: ${extradata?.systemname}, ${this.language['interface']}: ${extradata?.interfacename}`
    }
  }

}
