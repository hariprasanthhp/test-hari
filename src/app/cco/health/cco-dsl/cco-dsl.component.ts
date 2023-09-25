import { Component, OnInit, ViewChild, TemplateRef, QueryList, ViewChildren } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Drilldown from "highcharts/modules/drilldown";
Drilldown(Highcharts);
import data from "highcharts/modules/no-data-to-display"
data(Highcharts);
import Highchartsscroller from "highcharts/modules/accessibility";
Highchartsscroller(Highcharts);
import customEvents from "highcharts-custom-events";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DatePipe } from '@angular/common';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe'
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DataTableDirective } from 'angular-datatables';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { catchError, map} from 'rxjs/operators';
import _ from 'lodash';
import { CcochartService } from 'src/app/cco/health/pon-utilization/service/ccochart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { HealthService } from '../service/health.service';
import { ThresholdService } from 'src/app/sys-admin/cco-admin/cco-health-threshold/threshold.service';
customEvents(Highcharts);

@Component({
  selector: 'app-cco-dsl',
  templateUrl: './cco-dsl.component.html',
  styleUrls: ['./cco-dsl.component.scss']
})
export class CcoDslComponent implements OnInit {
  maxDate = new Date();
  ponCounts: any = 0;
  PONCAPACITY: any = 0;
  chartTitleDsl="Threshold By Region";
  chartTitleAttainable='Not At Attainable Rate By Region';
  chartTitleSnr='Not At Target SNR By Region';
  chartSubTitle='Select a region to view locations in that region';
  chartName="PON Port Courts";
  language: any = {};
  minDateForstart = new Date(new Date().setDate(new Date().getDate() - 727));
  regionDataArray = ["All"];
  systemDataArray = ["All"];
  locationDataArray = ["All"];
  fromDate: any;
  toDate: any;
  chartType:any="Region";
  chartDownType='region';
  tableType: any = "Region";
  tableName: any ="Regions";
  searchType:any='Search regions';
  regionSelected: any = "All";
  locationSelected: any = "All";
  hideInterface:boolean=false
  systemName: any;
  regionName: any;
  locationName: any;
  systemSubject;
  languageSubject;
  regionsSubject;
  LocationSubject: any;
  systemSelected: any = "All";
  fullScreenChartName: string = '';
  fullScreen: boolean = false;
  showUtilization: boolean = false;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  modalRef: any;
  modalInfo: any;
  modalTitle: any;
  chartTitle = 'PON Error Counts';
  categories: any;
  value: number = 8;
  options: Options = {
    floor: 1,
    ceil: 8,
    translate: (value: number, label: LabelType): string => {
      switch (value) {
        case 8:
          return "<b>Today</b> ";
          break;
        case 7:
          return "<b>-1</b> ";
          break;
        case 6:
          return "<b>-2</b> ";
          break;
        case 5:
          return "<b>-3</b> ";
          break;
        case 4:
          return "<b>-4</b> ";
          break;
        case 3:
          return "<b>-5</b> ";
          break;
        case 2:
          return "<b>-6</b> ";
          break;
        case 1:
          return "<b>-7</b> ";
          break;
        default:
          return "<b>-7</b>";
      }
    }
  };
  dateParam: string;
  loading: boolean;
  bipErrorRateData: any;
  packetDroppedData: any;
  groupBy: any = "region";
  errorMsg: any;
  packetDroppedErrormsg: any;
  bipErrormsg: any;
  ponChartbyLocation: any;
  utilizationData: any;
  fullScreenChartType: any;
  fullScrChart: string;
  fullScreenData: any;
  fullScreenChart: any;
  fullScreenMsg: any;
  dtInstance: Promise<DataTables.Api>;
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  singleTimeseries: boolean;
  loadedMultipleTimeseriesChart: any = [];
  count: number;
  utilization: any;
  ponutilizationchart: any;
  ponpackage: any;
  ponbiperror: any;
  interfaceDataArray: any = ["All"];
  interfaceSelected: any = "All";
  interfaceName: any;
  downloadTitle: string;
  last24hours: boolean = false;
  applyCount: any = 3;
  bipChart: any = { location: {}, system: {}, interface: {} };
  packageChart: any = { location: {}, system: {}, interface: {} };
  thresholdChart: any = { location: {}, system: {}, interface: {} };
  hasScopeAccess = false;
  fullscreen_Filter: any = false;
  chartGroupby: any;
  toggleSubscription: any;
  combineLatest: Observable<unknown[]>;
  parallelReqSubscribtion: any;
  dtOptions: DataTables.Settings = {};
  searchText: string;
  regionNameSelected: any;
  locationNameSelected: any;
  systemNameSelected: any;
  redenderOnce: boolean = false;
  viaHomePage:boolean=false;
  tableData: any = [];
  params: any;
  extraData: any;
  chartId='regionId';
  dtSub: any;
  dtSub1: any;
  chartSubTitleforPacket:any;
  chartSubTitleforPon:any;
  chartSubTitleforSys:any;
  subTitle: string;
  timeSeriesOptionFilter1 = [
    { id: 'both', name: 'Highest Total Usage' },
    { id: 'down', name: 'Highest Downstream Usage' },
    { id: 'up', name: 'Highest Upstream Usage' },
  ];
  timeSeriesOptionFilter2 = [
    { id: 10, name: 'View 10 Subscribers' },
    { id: 25, name: 'View 25 Subscribers' },
    { id: 50, name: 'View 50 Subscribers' },
  ];
  tableValue: any;
  dtSub2: any;
  timeSeriesData1="both";
  timeSeriesData2: number=10;
  timeSeriesParams: { startTime: string; endTime: string; system: any; interface: any; count: number; direction: string; };
  ORG_ID: string;
  ontInfoSubs: any;
  deviceInfo: any;
  Tableloading: boolean=false;
  subscriber: void;
  closeSub: boolean=false;
  totalcount: any;
  FromDate: number;
  idCount =0;
  thresholdData: any;
  hasWriteAccess: boolean;
  hasShowAccess: boolean;
  showTheshold: boolean;
  getTitle(id, array, key, value) {
    if (id.toLowerCase() == 'all') return 'All';
    let find = array.find(e => e[value] === id);
    return find ? find[key] : ''
  }
  fromNs = 'false';
  networkSystemsFilters: any;
  constructor(
    private translateService: TranslateService,
    private healthService: HealthService,
    private CcochartService: CcochartService,
    private nfainventoryservice: NfainventoryService,
    private exportExcelService: ExportExcelService,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private dateUtilsService: DateUtilsService,
    private sso: SsoAuthService,
    private titleService: Title,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: ThresholdService,
    
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.fromNs = params['fromNs'] && params.fromNs == 'true' ? params.fromNs : 'false';
      if(this.fromNs == 'true'){
        this.networkSystemsFilters = params;
        this.hideInterface=true;
        this.singleTimeseries = true;
      }
    })
    this.ORG_ID = this.sso.getOrganizationID(this.router.url)
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.language = this.translateService.defualtLanguage;
    this.regionsApiLoader();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.chartTitle = this.language.Number_of_PONs
      this.tableLanguageOptions();
      this.applyfilter(true);
      this.titleService.setTitle(`${this.language['DSL']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.toggleSubscription = this.sso.toggled$.subscribe((data: any) => {
      console.log(Highcharts.charts);
      Highcharts.charts.forEach((chart) => {
        setTimeout(() => {
          if (chart != undefined)
            chart.reflow();
        }, 100)
      });
    });
  }

  ngOnInit(): void {
    this.totalcount = this.nfainventoryservice.GetDslCount(false).subscribe((res: any) => {
      this.ponCounts = res?.count?.toLocaleString();
    });
    
    this.ponutilizationchart = this.nfainventoryservice.GetDslCount(true).subscribe((res:any) => {
      if (res) {
        this.PONCAPACITY = res?.count?.toLocaleString();
        //console.log(this.PONCAPACITY, 'this.PONCAPACITY ');
      }
    })
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
        targets: [3],
      }],
    }
    this.titleService.setTitle(`${this.language['DSL']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function (p, points, mouseEvent) {
      p.call(this, points, mouseEvent);
      if (!this.isHidden && this.shared) {
        var seriesTooltipBorderColor = points[0] && points[0].series && points[0].series.options.tooltip && points[0].series.options.tooltip.borderColor,
          borderColor = seriesTooltipBorderColor,
          label = this.label;
        if (label && borderColor) {
          label.attr({
            stroke: borderColor
          });
        }
      }
    });

    let scopes = this.sso.getScopes();
    this.getData();
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']) {
      this.hasShowAccess = true;
    }
    if (environment.VALIDATE_SCOPE) {
      if (scopes['cloud.rbac.coc.health.dsl']) {
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
    this.count = 0;
    let date = new Date();
    this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
     this.toDate = new Date();
    this.tableLanguageOptions();
    
    if (history.state?.days) {
      this.viaHomePage=true
      let days = history.state?.days - 1
      this.regionSelected = history.state?.categoryid;
      this.regionName = history.state?.categoryname;
      this.fromDate = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
      this.toDate = new Date();
      this.applyfilter(true);
    }
    else if (history.state?.last24hours) {
      this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
      this.toDate = new Date();
      this.last24hours = true;
      this.applyCount = -1;
      this.applyfilter(true);
    }
    else if(this.fromNs != 'true')
      this.applyfilter(true);
  }

  navigateThreshold(){
    this.router.navigate(["cco/operations/health/monitoring-thresholds"])
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

  // Region Api Loader
  regionsApiLoader() {
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
          if(this.networkSystemsFilters && this.networkSystemsFilters['region_uuid']){
            if(this.regionDataArray.findIndex(el => el['id'] == this.networkSystemsFilters['region_uuid']) !== -1){
              this.regionSelected = this.networkSystemsFilters['region_uuid'];
              this.getLocationValue('');
            } else{
              this.fromNs = 'false';
              this.applyfilter(true);
            }
          }
        }
      }, (error) => {
    })
  }
 
  // location value
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
        this.packageChart.location = { region: this.regionSelected, regionname: this.regionName }
        this.bipChart.location = this.thresholdChart.location = this.packageChart.location
      }
    })
  }

  // system value
  getSystemValue(event: any) {
    let regionid = this.regionSelected == "All" ? "" : this.regionSelected
    let locationid = this.locationSelected == "All" ? "" : this.locationSelected;
    this.groupBy = "location";
    this.systemSelected = "All";
    this.interfaceSelected = 'All';
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    if (this.locationSelected != "All" && this.regionSelected != "All") {
      this.systemSubject = this.nfainventoryservice.GetSystems(regionid, locationid, "dsl")
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
        this.packageChart.system = { region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName }
        this.bipChart.system = this.thresholdChart.system = this.packageChart.system
      }
    })
  }

  //load interface
  getInterfaceValue(event: any) {
    this.interfaceSelected = 'All';
    this.interfaceDataArray = ["All"];
    let params1 = {
      system: this.systemSelected == "All" ? "" : this.systemSelected,
      interfaceCategory: "dsl"
    }
    let query = "";
    for (var key in params1) {
      if (params1[key] == undefined || params1[key] == "" || params1[key] === []) {
        continue;
      }
      if (query != "") {
        query += "&";
      }
      query += key + "=" + encodeURIComponent(params1[key]);
    }
    if (this.systemSelected != "All" && this.locationSelected != "All" && this.regionSelected != "All") {
      this.ponbiperror = this.healthService.GetInterfaces(query, 'dsl').subscribe((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: true }))
        this.interfaceDataArray = ['All'];
        this.interfaceDataArray = [...this.interfaceDataArray, ...res];

        if(this.fromNs == 'true'){
          if(this.networkSystemsFilters && this.networkSystemsFilters['interface']){
            if(this.interfaceDataArray.findIndex(el => el['name'] == this.networkSystemsFilters['interface']) !== -1){
              this.interfaceSelected = this.networkSystemsFilters['interface'];
              this.fromNs = 'false';
              this.applyfilter(true);
            } else{
              this.fromNs = 'false';
              this.applyfilter(true);
            }
          }
        }
      })
      this.systemDataArray.forEach((element: any) => {
        if (element.uuid == this.systemSelected) {
          this.systemName = element.name;
          this.packageChart.interface = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName,
            system: this.systemSelected, systemname: this.systemName
          }
          this.bipChart.interface = this.thresholdChart.interface = this.packageChart.interface
        }
      })
    }
  }

  //select the interface
  selectInterface(event: any) {
    this.interfaceDataArray.forEach((element: any) => {
      if (element.name == this.interfaceSelected) {
        this.interfaceName = element.name;
        this.packageChart.interface = {
          region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName,
          system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
        }
        this.bipChart.interface = this.thresholdChart.interface = this.packageChart.interface
      }
    })
  }

  changeDate() {
    if(!this.interfaceSelected)this.loadedMultipleTimeseriesChart=[];
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

  applyfilter(val,chart?,data?) {
    this.closeSub=false;
    console.log(data)
    if(val || chart){
      this.searchText='';
      if(chart?.type == "Interface" || data?.interface){
        this.rerender();
        this.closeSub=false
      }    
    }
    if(val){
      this.applyCount++;
      if (this.last24hours && this.applyCount >= 1)
        this.last24hours = false;
    } 
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
    if (this.fullScreen == true) {
      this.fullscreen_Filter = true;
      if (this.systemSelected && this.systemSelected != "All") {
        let chartname;
        this.chartId = 'interface';
        if (this.fullScreenChart == "ponchart") {
          chartname = 'Threshold By Interface'
        }
        else if (this.fullScreenChart == "bipchart") {
          chartname = "Not At Target SNR By Interface";
        }
        else if (this.fullScreenChart == "packagechart") {
          chartname = 'Not At Attainable Rate By Interface';
        }
        else if (this.fullScreenChart == "UtilizationChart") {
          chartname = 'HUtilizationByInterface';
        }
        this.fullScreenExpandFunction(chartname, 'Interface', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.locationSelected && this.locationSelected != "All") {
        let chartname;
        this.chartId = 'systemId';
        if (this.fullScreenChart == "ponchart") {
          chartname = 'Threshold By System'
        }
        else if (this.fullScreenChart == "bipchart") {
          chartname = "Not At Target SNR By System"
        }
        else if (this.fullScreenChart == "packagechart") {
          chartname = "Not At Attainable Rate By System"
        }
        this.fullScreenExpandFunction(chartname, 'System', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.regionSelected && this.regionSelected != "All") {
        let chartname;
        this.chartId = 'locationId';
        if (this.fullScreenChart == "ponchart") {
          chartname = 'Threshold By Location'
        }
        else if (this.fullScreenChart == "bipchart") {
          chartname = "Not At Target SNR By Location"
        }
        else if (this.fullScreenChart == "packagechart") {
          chartname = "Not At Attainable Rate By Location"
        }
        this.fullScreenExpandFunction(chartname, 'Location', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.regionSelected == "All") {
        let chartname;
        this.chartId="regionId";
        if (this.fullScreenChart == "ponchart") {
          chartname = 'Threshold By Region'
        }
        else if (this.fullScreenChart == "bipchart") {
          chartname = "Not At Target SNR By Region"
        }
        else if (this.fullScreenChart == "packagechart") {
          chartname = "Not At Attainable Rate By Region"
        }
        this.fullScreenExpandFunction(chartname, 'Region', this.fullScreenChart,'',this.chartId)
        return
      }
    }
    else {
      this.hideInterface=false
      this.showUtilization = false;
      this.singleTimeseries = false;
      this.fullscreen_Filter = false;
      if ((this.interfaceSelected && this.interfaceSelected != "All") ||chart?.type == "Interface" || data?.interface) {
        if(chart || data){
          let istimeseries, date, enddate, groupBy;
          istimeseries = true;
          date = this.fromDate;
          enddate = this.toDate;
          groupBy = "";
          this.getInterfaceValue(chart)
          let interfaceSelected=chart.category?chart.category:data.interface
          if (istimeseries) {
            let params = {
              tenant: "0",
              startTime: this.fromDate,
              endTime: this.toDate,
              region: chart?.extradata?.region ? chart?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || chart.type == "Location" ? "" : this.regionSelected,
              location: chart?.extradata?.location ? chart?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
              system: chart?.extradata?.system ? chart?.extradata?.system :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: interfaceSelected
            }
            
            let paramsname = {
              regionname: chart?.extradata?.regionname ?chart?.extradata?.regionname:this.regionNameSelected,
              locationname: chart?.extradata?.locationname?chart?.extradata?.locationname:this.locationNameSelected,
              systemname: chart?.extradata?.systemname ?chart?.extradata?.systemname:this.systemNameSelected,
              interfacename: chart.name ?chart.name :interfaceSelected
            }
            this.timeSeriesParams={
              startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
              system: chart?.extradata?.system ? chart?.extradata?.system :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: interfaceSelected,
              count:10,
              direction:'both'
            }
            params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
            this.timeSeriesParams["granularity"] = this.healthService.getGranularity(this.timeSeriesParams.startTime, this.timeSeriesParams.endTime)
            this.singleTimeseries = true;
            let system =chart?.extradata?.system ?chart?.extradata?.system:this.systemSelected
            let chartName = 'ponPon' +system  + interfaceSelected;
            this.loadMultipleChart(params, paramsname, "General" ,chartName, interfaceSelected)
            //this.getTimeSeriesTableData(this.timeSeriesParams)
            return
          }
        } else{
          this.loadedMultipleTimeseriesChart = [];
          this.hideInterface=true
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
            let paramsname = {
              regionname: this.regionName,
              locationname: this.locationName,
              systemname: this.systemName,
              interfacename: this.interfaceName
            }
            this.systemNameSelected = this.systemName;
            this.timeSeriesParams={
              startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
              system: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: this.interfaceSelected == "All" ? "" : this.interfaceSelected,
              count:10,
              direction:'both'
            }
            this.timeSeriesParams["granularity"] = this.healthService.getGranularity(this.timeSeriesParams.startTime, this.timeSeriesParams.endTime)
            this.singleTimeseries = true;
            this.loadMultipleChart(params, paramsname, "General", "General",this.interfaceSelected)
            //this.getTimeSeriesTableData(this.timeSeriesParams)
            return;
          }      
      }
      if(((this.systemSelected && this.systemSelected != "All") ||chart?.type == "System" || data?.system) || ((this.locationSelected && this.locationSelected != "All")||chart?.type == "Location"  || data?.location) ||((this.regionSelected && this.regionSelected != "All") || chart?.type == "Region" || data?.region) ){
        if ((this.systemSelected && this.systemSelected != "All")||chart?.type == "System" || data?.system) {
          this.loadedMultipleTimeseriesChart=[];
          this.chartTitleDsl="Threshold By Interface"
          this.chartTitleAttainable='Not At Attainable Rate By Interface';
          this.chartTitleSnr='Not At Target SNR By Interface';
          this.chartType="Interface";
          this.chartSubTitle='Uplink_port_Sub';
          this.chartSubTitleforPacket='Select an interface to view not at attainable rate on that interface';
          this.chartSubTitleforPon='Select an interface to view not at target SNR on that interface';
          this.chartDownType="interface";
          this.tableType="Interface";
          this.tableName="Interfaces";
          this.chartId = 'interface';
          this.searchType='Search interfaces';
          let value = val ?{ type: "System", charttype: "ponchart", category: this.systemSelected, name: this.systemName, extradata: this.thresholdChart.system }:chart
          let groupBy, chartid;
          groupBy = "interface"
          this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
          this.locationSelected=value.extradata?.location?value.extradata?.location:this.locationSelected
          this.systemSelected=value.category ?value.category:data.systemId
          this.systemNameSelected=value.name ? value.name:data?.system
          console.log(this.systemSelected)
          if(!val)this.getInterfaceValue(value)
          this.extraData = {
            region: this.regionSelected, regionname:value?.extradata?.regionname?value?.extradata?.regionname: this.regionNameSelected?this.regionNameSelected:this.thresholdChart.system?.regionname, location: this.locationSelected, locationname: value?.extradata?.locationname ? value?.extradata?.locationname:this.locationNameSelected,
            system: this.systemSelected, systemname: this.systemNameSelected
          }
          this.thresholdChart.interface = this.extraData
          this.packageChart.interface=this.extraData
          this.bipChart.interface=this.extraData
          chartid = "Interface_chart";
      
          this.params = {
            tenant: "0",
            startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
            region: value?.extradata?.region ? value?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
            location: value?.extradata?.location ? value?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
            system: value.category ? value.category :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
            groupBy: groupBy,
          }
          if(val){
            this.LoadbySystem("UtilizationChart");
          }
          this.loading = true;
          this.params ["granularity"] = this.healthService.getGranularity( this.params .startTime,  this.params .endTime);
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

          let query1 = query + "&countBy=interface"
          query = query + '&interfaceCategory=dsl'
          let requestEndpoints = [
            `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
            `${environment.API_BASE_URL}health/reports/dsl/lowrate?${query1}`,
            `${environment.API_BASE_URL}health/reports/dsl/lowsnr?${query1}`,
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
          this.makeParallelRequest(this.extraData,this.chartDownType);
          return;
        }
        if ((this.locationSelected && this.locationSelected != "All")||chart?.type == "Location"  || data?.location) {
          this.chartTitleDsl="Threshold By System"
          this.chartTitleAttainable='Not At Attainable Rate By System'
          this.chartTitleSnr='Not At Target SNR By System'
          this.chartType="System"
          this.chartSubTitle='Health_System_Sub';
          this.chartSubTitleforSys='PON_BIP_System';
          this.tableType="System"
          this.tableName="Systems"
          this.chartDownType="system"
          this.chartId = 'systemId'
          this.searchType='Search systems'
          let value = val?{ type: "Location", charttype: "ponchart", category: this.locationSelected, name: this.locationName, extradata: this.thresholdChart.location }:chart
          let groupBy,chartid;
          groupBy = "system";
        chartid = "System_chart";
        this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
        this.locationSelected=value.category ?value.category: data.locationId
        this.locationNameSelected=value.name ?value.name:data.location
        if(!val)this.getSystemValue(value)
        this.extraData = { region: this.regionSelected, regionname: value.extradata?.regionname ?value.extradata?.regionname:this.regionNameSelected , location:this.locationSelected, locationname: value.name ?value.name:data.location }
        this.thresholdChart.system = this.extraData
        this.packageChart.system=this.extraData
        this.bipChart.system=this.extraData
  
        this.params = {
          tenant: "0",
          startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
          endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
          region: value?.extradata?.region ? value?.extradata?.region : this.regionSelected? this.regionSelected:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
          location: value.category ? value.category : this.locationSelected?this.locationSelected:this.locationSelected == "All" ? "" : this.locationSelected,
          groupBy: groupBy,
        }
        this.params ["granularity"] = this.healthService.getGranularity( this.params .startTime,  this.params .endTime);
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
        let query1 = query + "&countBy=interface"
        query = query + '&interfaceCategory=dsl'
        let requestEndpoints = [
          `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
          `${environment.API_BASE_URL}health/reports/dsl/lowrate?${query1}`,
            `${environment.API_BASE_URL}health/reports/dsl/lowsnr?${query1}`,
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
        this.loading = true; 
        this.combineLatest = combineLatest(requests);
        this.makeParallelRequest(this.extraData,this.chartDownType);
        return;   
        }
        if ((this.regionSelected && this.regionSelected != "All")||chart?.type == "Region" || data?.region) {
          let groupBy, chartid;
          this.chartTitleDsl="Threshold By Location";
          this.chartTitleAttainable='Not At Attainable Rate By Location';
          this.chartTitleSnr='Not At Target SNR By Location';
          this.chartType="Location";
          this.chartSubTitle='Select a location to view systems in that location';
          this.chartDownType='location';
          this.tableType = "Location";
          this.tableName="Locations";
          this.chartId = 'locationId';
          this.searchType ='Search locations';
          let value = val?{ type: "Region", charttype: "ponchart", category: this.regionSelected, name: this.regionName }:chart
          groupBy = "location";
          chartid = "Location_chart";
          this.extraData = { region: value.category ? value.category: data?.regionId, regionname: value.name? value.name:data.region}
          this.regionSelected=value.category ? value.category: data.regionId
          this.regionNameSelected=value.name ? value.name:data.region
          if(!val || this.viaHomePage)this.getLocationValue(value)
          this.thresholdChart.location = this.extraData
          this.packageChart.location=this.extraData
          this.bipChart.location=this.extraData
          this.params = {
            tenant: "0",
            startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
            region: value.category ? value.category : data.regionId? data.regionId:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
            groupBy: groupBy,
          }
        }
        this.params ["granularity"] = this.healthService.getGranularity( this.params .startTime,  this.params .endTime);
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
        let query1 = query + "&countBy=interface"
        query = query + '&interfaceCategory=dsl'
        this.loading = true; 
        let requestEndpoints = [
          `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
          `${environment.API_BASE_URL}health/reports/dsl/lowrate?${query1}`,
          `${environment.API_BASE_URL}health/reports/dsl/lowsnr?${query1}`,
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
        this.makeParallelRequest(this.extraData,this.chartDownType);
        return;
      }
      this.chartType="Region";
      this.chartDownType='region';
      this.tableType="Region";
      this.tableName="Regions";
      this.chartId="regionId";
      this.chartTitleDsl="Threshold By Region";
      this.chartSubTitle='Select a region to view locations in that region';
      this.chartTitleAttainable='Not At Attainable Rate By Region';
      this.chartTitleSnr='Not At Target SNR By Region';
      this.searchType='Search regions';
      let params = {
        tenant: "0",
        startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
        endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
        groupBy: "region"
      }
      this.chartId="regionId"
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
        this.loading = true; this.errorMsg = "";this.bipErrormsg = "";this.packetDroppedErrormsg = "";
      let query1 = query + "&countBy=interface"
      query = query + '&interfaceCategory=dsl'
      let requestEndpoints = [
        `${environment.API_BASE_URL}health/reports/utilization/thresholdexceededcount?${query}`,
        `${environment.API_BASE_URL}health/reports/dsl/lowrate?${query1}`,
            `${environment.API_BASE_URL}health/reports/dsl/lowsnr?${query1}`,
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
      this.makeParallelRequest(false,this.chartDownType);
    }
  }
 
  makeParallelRequest(extradata?,type?){
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      if (response[0] && response[0].error) {
        if (response[0].status == 401) {
          this.errorMsg = this.language['Access Denied'];
        } else {
          this.errorMsg = this.commonOrgService.pageErrorHandle(response[0]);
        }
        this.ponChartbyLocation = [];
      } else {
        response[0] = this.totalCoutSort(response[0], "usUtilExcCnt", "dsUtilExcCnt", this.chartType)
        this.ponChartbyLocation = response[0];
        Highcharts.chart('PortCourtChart', this.portCountChartOptionsn(Object.assign([],this.ponChartbyLocation.map(element => Object.assign({},element))) || [], this.chartType, false,extradata));
        this.GetSubTitle(Object.assign([],this.ponChartbyLocation.map(element => Object.assign({},element))) || [], this.chartType, false,extradata)
      }
  
      if (response[1] && response[1].error) {
        if (response[1].status == 401) {
          this.packetDroppedErrormsg = this.language['Access Denied'];
        } else {
          this.packetDroppedErrormsg = this.commonOrgService.pageErrorHandle(response[1]);
        }
        this.packetDroppedData = [];
      } else {
        response[1] = this.totalCoutSort(response[1], "usCurRateBelowThresCnt", "dsCurRateBelowThresCnt", this.chartType)
        this.packetDroppedData = response[1];      
        Highcharts.chart('PacketDroppedChart', this.notAtAttainableChartOptionsn(Object.assign([],this.packetDroppedData.map(element => Object.assign({},element))) || [], this.chartType, false,extradata));
      }
      this.GetSubTitle(Object.assign([],this.packetDroppedData.map(element => Object.assign({},element))) || [], this.chartType, false,extradata)
  
      if (response[2] && response[2].error) {
        if (response[2].status == 401) {
          this.bipErrormsg = this.language['Access Denied'];
        } else {
          this.bipErrormsg = this.commonOrgService.pageErrorHandle(response[2]);
        }
        this.bipErrorRateData = [];
      } else {
        response[2] = this.totalCoutSort(response[2], "usSnrBelowThresCnt", "dsSnrBelowThresCnt", this.chartType)
        this.bipErrorRateData = response[2];   
        Highcharts.chart('BIPErrorRateChart', this.notAtTargetSNRChartOptionsn(Object.assign([],this.bipErrorRateData.map(element => Object.assign({},element))) || [], this.chartType, false,extradata));
      } 
      this.GetSubTitle(Object.assign([],this.bipErrorRateData.map(element => Object.assign({},element))) || [], this.chartType, false,extradata)
  
        this.getTableData([ Object.assign([],this.ponChartbyLocation.map(element => Object.assign({},element))),Object.assign([],this.packetDroppedData.map(element => Object.assign({},element))),Object.assign([],this.bipErrorRateData.map(element => Object.assign({},element)))], this.chartId,this.chartType) 
        this.loading=false   
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  LoadbySystem(charttype?) {
    this.showUtilization = true;
    let params = {
      tenant: "0",
      startTime: `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
      endTime: `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
      system: this.systemSelected == "All" ? "" : this.systemSelected,
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

  ngOnDestroy(): void {
    if (this.dtSub) this.dtSub.unsubscribe();
    if (this.dtSub1) this.dtSub1.unsubscribe()
    if (this.dtSub2) this.dtSub2.unsubscribe()
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.LocationSubject) this.LocationSubject.unsubscribe();
    if (this.regionsSubject) this.regionsSubject.unsubscribe();
    if (this.systemSubject) this.systemSubject.unsubscribe();
    if (this.utilization) this.utilization.unsubscribe();
    if (this.ponutilizationchart) this.ponutilizationchart.unsubscribe();
    if (this.ponpackage) this.ponpackage.unsubscribe();
    if (this.ponbiperror) this.ponbiperror.unsubscribe();
    if (this.toggleSubscription) this.toggleSubscription.unsubscribe();
    if (this.parallelReqSubscribtion)this.parallelReqSubscribtion.unsubscribe();
  }
  
  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  validateStartEndDates() {
    let currentdate = new Date();
    if (!this.fromDate) {
      this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      return false;
    }
    if (this.fromDate > currentdate || this.toDate > currentdate) {
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

  loadMultipleChart(param, paramsname, charttype?, chartname?,value?) {
    this.count = this.count + 1;
    let IsDuplicate = false;
    if (this.loadedMultipleTimeseriesChart.length) {
      this.loadedMultipleTimeseriesChart.forEach(element => {
        if (element.chartname == chartname) {
          IsDuplicate = true;
          var elmnt = document.getElementById(chartname);
          if (elmnt) elmnt.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    if (IsDuplicate)
        return

    setTimeout(() => {
      this.loadedMultipleTimeseriesChart.push({
        params: param,
        paramname: paramsname,
        charttype: charttype,
        chartname: chartname,
        divid: chartname + this.count,
        page: 'dsl',
        last24hours: this.last24hours,
        title:value,
        system:this.systemNameSelected ? this.systemNameSelected:this.systemName,
      });
      this.loadedMultipleTimeseriesChart = [...this.loadedMultipleTimeseriesChart];
    }, 100)
  }

  totalCoutSort(data, key1, key2, charttype = 'Region') {
    let a = [];
    let b = [];
    let name = charttype.toLowerCase();
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

  singlecountsort(data, key1, charttype = 'Region') {
    let a = [];
    let b = [];
    let name = charttype.toLowerCase();
    if (name == "interface")
      data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: true }))
    else {
      data.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: false }))
    }
    data.forEach(obj => {
      if (obj[key1] || obj[key1] == 0) {
        a.push(obj);
      }
      else
        b.push(obj);
    });
    a.sort(function (a, b) {
      return ((b[key1] ? b[key1] : null) - (a[key1] ? a[key1] : null))
    });
    data = [...a, ...b];
    return data;
  }
 
  portCountChartOptionsn(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxvalue = 0;
    var seriesData = [];
    var seriesData1 = [];
    var xAxisCategories = [];
    var groupby;
    if (type == 'Region') {
      groupby = 'region',
        categoryid = 'regionId'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId'
    }
    else if (type == 'System') {
      groupby = 'system',
        categoryid = 'systemId'
    }
    else if (type == 'Interface') {
      groupby = 'interface'
      categoryid = 'interface'
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData1.push({
          y: element.dsUtilExcCnt ? element.dsUtilExcCnt : 0,
          color: this.healthService.chart_color(element, "dsUtilExcCnt","second")
        });
        seriesData.push({
          y: element.usUtilExcCnt ? element.usUtilExcCnt : 0,
          color: this.healthService.chart_color(element, "usUtilExcCnt", "first")
        });    
      });
      maxvalue = xAxisCategories.length > 8 ? 10 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      title: {
        text: type,
        style: {
          display: 'none'
        }
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue <= 7 ? maxvalue - 1 : 7,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 10 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language['DSL Interface Count']
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1
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
        shared: true
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
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
                  if (element[groupby] == this.category) {
                    Deleted = element?.deleted
                    if (!fullscreen && !Deleted) { 
                      this.graphic.attr({
                        cursor: 'pointer'
                      });
                    }
                  }
                })                      
              },
              click: function (event) {
                if (fullscreen) 
                  return
                let isDeleted : boolean = false;
                data.forEach((element: any) => {               
                  if (element[groupby] == event.point.category) {
                    category = element[categoryid];
                    isDeleted = element?.deleted
                    if(isDeleted){
                      return
                    }
                  }
                })
                let data1 = { type: this.series.chart.options.title.text, charttype: "ponchart", category: category, name: event.point.category, extradata: event?.point.series.options.extradata }
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
          name: this.language["Upstream"],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first
          },
        },
        {
          name: this.language["Downstream"],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second,
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second
          },
        }
      ]
    };
  }

  notAtAttainableChartOptionsn(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxvalue = 0;
    var seriesData = [];
    var seriesData1 = [];
    var xAxisCategories = [];
    var groupby;
    if (type == 'Region') {
      groupby = 'region',
        categoryid = 'regionId'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId'
    }
    else if (type == 'System') {
      groupby = 'system',
        categoryid = 'systemId'
    }
    else if (type == 'Interface') {
      groupby = 'interface'
      categoryid = 'interface'
    }
    else if (type == 'Ont') {
      groupby = 'ont',
        categoryid = 'ontId'
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData.push({
          y: element.usCurRateBelowThresCnt ? element.usCurRateBelowThresCnt : 0,
          color: this.healthService.chart_color(element, "usCurRateBelowThresCnt", "first")
        });
        seriesData1.push({
          y: element.dsCurRateBelowThresCnt ? element.dsCurRateBelowThresCnt : 0,
          color: this.healthService.chart_color(element, "dsCurRateBelowThresCnt", "second")
        });
      });
      maxvalue = xAxisCategories.length > 8 ? 10 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      subtitle: {
        text: subTitle
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      title: {
        text: type,
        style: {
          display: 'none'
        }
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue <= 7 ? maxvalue - 1 : 7,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 10 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: this.language['DSL Interface Count']
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1,
        min: 0,
        softMax: 1,
        minRange: 0
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
        shared: true
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
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
                  if (element[groupby] == this.category) {
                    Deleted = element?.deleted
                    if (!fullscreen && !Deleted) { 
                      this.graphic.attr({
                        cursor: 'pointer'
                      });
                    }
                  }
                })                      
              },
              click: function (event) {
                if (fullscreen) 
                return
              let isDeleted : boolean = false;
              data.forEach((element: any) => {
                if (element[groupby] == event.point.category) {
                  category = element[categoryid];
                  isDeleted = element?.deleted
                  if(isDeleted){
                    return
                  }
                }
                })
                let data1 = { type: this.series.chart.options.title.text, charttype: "packagechart", category: category, name: event.point.category, extradata: event?.point.series.options.extradata }
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
          name: this.language["Upstream"],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first
          },
        },
        {
          name: this.language["Downstream"],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second,
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second
          },
        }
      ]
    };
  }

  notAtTargetSNRChartOptionsn(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxvalue = 0;
    var seriesData = [];
    var seriesData1 = [];
    var xAxisCategories = [];
    var groupby;
    if (type == 'Region') {
      groupby = 'region',
        categoryid = 'regionId'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId'
    }
    else if (type == 'System') {
      groupby = 'system',
        categoryid = 'systemId'
    }
    else if (type == 'Interface') {
      groupby = 'interface'
      categoryid = 'interface'
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData1.push({
          y: element.usSnrBelowThresCnt ? element.usSnrBelowThresCnt : 0,
          color: this.healthService.chart_color(element, "usSnrBelowThresCnt", "first")
        });
        seriesData.push({
          y: element.dsSnrBelowThresCnt ? element.dsSnrBelowThresCnt : 0,
          color: this.healthService.chart_color(element, "dsSnrBelowThresCnt", "second")
        });       
      });
      maxvalue = xAxisCategories.length > 8 ? 10 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      title: {
        text: type,
        style: {
          display: 'none'
        }
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue <= 7 ? maxvalue - 1 : 7,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 10 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language['DSL Interface Count']
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1
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
        shared: true
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
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
                  if (element[groupby] == this.category) {
                    Deleted = element?.deleted
                    if (!fullscreen && !Deleted) { 
                      this.graphic.attr({
                        cursor: 'pointer'
                      });
                    }
                  }
                })                      
              },
              click: function (event) {
                if (fullscreen) 
                  return
                let isDeleted : boolean = false;
                data.forEach((element: any) => {               
                  if (element[groupby] == event.point.category) {
                    category = element[categoryid];
                    isDeleted = element?.deleted
                    if(isDeleted){
                      return
                    }
                  }
                })

                let data1 = { type: this.series.chart.options.title.text, charttype: "ponchart", category: category, name: event.point.category, extradata: event?.point.series.options.extradata }
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
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first
          },
        },
        {
          name: this.language['Downstream'],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second,
          extradata: extradata,
          tooltip: {
            borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].second
          },
        }
      ]
    };
  }

  clearFilter() {
    if(this.loading){
      return
    }
    this.subTitle='';
    this.searchText='';
    let date = new Date();
    this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.toDate = this.toDate = new Date();
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
    this.groupBy = null;
    this.chartId="regionId";
    this.loadedMultipleTimeseriesChart=[]
    if (this.fullScreen == true) {
      this.fullscreen_Filter = true;
      let chartname;
      if (this.fullScreenChart == "ponchart") {
        chartname = 'Threshold By Region'
      }
      else if (this.fullScreenChart == "bipchart") {
        chartname = "Not At Target SNR By Region"

      }
      else if (this.fullScreenChart == "packagechart") {
        chartname = 'Not At Attainable Rate By Region'
      }
      this.fullScreenExpandFunction(chartname, 'Region', this.fullScreenChart,'',this.chartId)
      return
    }
    else {
    this.applyfilter(true);
     this.chartType="Region";
     this.chartDownType='region';
     this.tableType="Region";
     this.tableName="Regions";
     this.chartSubTitle='Select a region to view locations in that region';
     this.chartId="regionId";
     this.chartTitleDsl="Threshold By Region";
     this.chartTitleAttainable='Not At Attainable Rate By Region';
     this.chartTitleSnr='Not At Target SNR By Region';
     this.searchType='Search regions';
    }
  }

  heading(chartName, type, idName, title?) {
    let region, location, system, interfaces, heading;
    let pipe = new DatePipe('en-US');
    if (chartName.includes("Threshold")) {
      heading = this.extraData;
    }
    else if (chartName.includes("Not At Attainable")) {
      heading = this.packageChart[type];
    }
    else if (chartName.includes("Not At Target")) {
      heading = this.bipChart[type];
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

  downloadFunction(chartName: string, idName?: string, type?: string, chartdata?, title?,chartId?) {
    this.idCount++
    console.log(chartdata)
    let extraData = this.heading(chartName, type, idName, title)
    let id = idName+this.idCount;
    $(id).addClass('spinnershow');
    let data;
    if(chartId)  data = this.healthService.duplicateDataHandle(chartdata,type,chartId)
     data = this.healthService.chartDataFraming(chartdata, chartName, type, extraData, 'DSL');
    let fname = this.healthService.generateDownloadName(chartName, type, 'DSL');
    setTimeout(() => {
      $(id).removeClass('spinnershow');
    }, 1000);
    this.exportExcelService.downLoadCSV(fname, data, extraData);
  }

  fullScreenExpandFunction(chartName: string, charttype?, chart?, chartdata?,type?) {
    this.fullScreenData = [];
    this.fullScreen = true;
    this.fullScreenChartType = charttype;
    this.fullScreenMsg = "";
    this.chartGroupby = charttype;
    this.fullScreenChartName = this.language[chartName] ? this.language[chartName] : chartName;
    this.fullScreenChart = chart
    this.downloadTitle = chartName;
    let groupBy
    if (charttype == "Region") { groupBy = 'region'; this.fullScreenChartType = 'region'; }
    else if (charttype == 'Location') { groupBy = 'location'; this.fullScreenChartType = 'location'; }
    else if (charttype == 'System') { groupBy = 'system'; this.fullScreenChartType = 'system'; }
    else if (charttype == 'Interface') { groupBy = 'interface'; this.fullScreenChartType = 'interface'; }
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
    let query1 = query + "&countBy=interface"
    if (chartdata) {
      this.fullScreenMsg = ""; 
      this.fullScreenData = chartdata;
      this.rerender();
      if (chart == 'ponchart') {
        this.fullScrChart = 'PON Interface Count'
        Highcharts.chart('fullScreenChart', this.portCountChartOptionsn(chartdata || [], charttype, true, this.thresholdChart[groupBy]));
      } else if (chart == "bipchart") {
        this.fullScrChart = 'BIP Error Rate'
        Highcharts.chart('fullScreenChart', this.notAtTargetSNRChartOptionsn(chartdata || [], charttype, true, this.bipChart[groupBy]));        
      } else if (chart == "packagechart") {
        this.fullScrChart = 'Packet Dropped'
        Highcharts.chart('fullScreenChart', this.notAtAttainableChartOptionsn(chartdata || [], charttype, true, this.packageChart[groupBy]));       
      }
      // else if (chart == "UtilizationChart") {
      //   this.fullScrChart = 'systemUtilization'
      //   Highcharts.chart('fullScreenChart', this.utilizationChartOption(chartdata || [], charttype));    
      // }
      setTimeout(() => {
        var elmnt = document.getElementById("full_screen");
        elmnt.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
    else {
      this.fullScreenData = [];
      this.rerender();
      if (chart == "ponchart") {
        this.fullScrChart = 'PON Interface Count'
        this.ponutilizationchart = this.CcochartService.Getutilizationthresholdexceededcount(query, 'dsl').subscribe(res => {
          res = this.totalCoutSort(res, "usUtilExcCnt", "dsUtilExcCnt", charttype)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', this.portCountChartOptionsn(res || [], charttype, true, this.thresholdChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
      else if (chart == "bipchart") {
        this.fullScrChart = 'BIP Error Rate';
        this.ponbiperror = this.CcochartService.GetNotAtSNR(query1).subscribe(res => {
   
          res= this.totalCoutSort(res, "usSnrBelowThresCnt", "dsSnrBelowThresCnt", charttype)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', this.notAtTargetSNRChartOptionsn(res || [], charttype, true, this.bipChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
      else if (chart == "packagechart") {
        this.fullScrChart = 'Packet Dropped';
        this.ponpackage = this.CcochartService.GetNotAtAttainable(query1).subscribe(res => {
          res= this.totalCoutSort(res, "usCurRateBelowThresCnt", "dsCurRateBelowThresCnt", charttype)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', this.notAtAttainableChartOptionsn(res || [], charttype, true, this.packageChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
    }
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

  charttabledata(groupBy, data) {
    let duplicate = [];
    let fullscreendata = []
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
          let c = 0
          let temp = 1
          do {
            c = c + 1
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
        fullscreendata.push(element)
      });
    }
    this.fullScreenData = fullscreendata;
  }
 
  fullScreenInvertFunction() { 
    this.searchText='';
    this.fullScreen = false;
    if(this.fullscreen_Filter)
    this.applyfilter(true);    
  }

  clearChartContainer(values: any) {
    var findindex = this.loadedMultipleTimeseriesChart.findIndex(x => x.chartname === values.chartname);
    if (findindex > -1) {
      this.loadedMultipleTimeseriesChart.splice(findindex, 1);
    }
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number, true, 5)
  }

  decimalconvert(number){
    let no =(number*100).toFixed(2);
    if(no==='0.00'){
     return 0
    }else{
      return no
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
 
  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtSub=this.dtTrigger.next();
      this.dtSub1=this.dtTrigger1.next();
      this.dtSub2=this.dtTrigger2.next();
    });
  }

  getTableData(data:any, type: any, chartType?){
    let arr = _.groupBy(_.flatten([JSON.parse(JSON.stringify(data[0])), JSON.parse(JSON.stringify(data[1])), JSON.parse(JSON.stringify(data[2]))]), type);
    this.tableData = _.map(arr, function (val) { return _.merge.apply(_, val) });  
    let groupby = type.replace('Id', '');
   this.tableData=this.healthService.duplicateDataHandle(this.tableData,groupby,type)
   this.tableData=this.healthService.totalcountsort(this.tableData, 'usUtilExcCnt','dsUtilExcCnt','rxDis','txDis',"count", chartType)
    if(!this.redenderOnce){
      this.dtTrigger.next();
      this.redenderOnce = true;
    } else {
      this.rerender();
    }
  }

  closeSubTable(){
    this.closeSub=true
  }
  
  clearSearch(value) {
    this.searchText = "";
    this.rerender()
  }
  
}
