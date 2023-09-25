import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HealthService } from '../service/health.service';
import { CcochartService } from 'src/app/cco/health/pon-utilization/service/ccochart.service';
import * as Highcharts from 'highcharts/highstock';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import Drilldown from "highcharts/modules/drilldown";
Drilldown(Highcharts);
import Highchartsscroller from "highcharts/modules/accessibility";
Highchartsscroller(Highcharts);
import data from "highcharts/modules/no-data-to-display"
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
data(Highcharts);
import _ from 'lodash';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { ThresholdService } from 'src/app/sys-admin/cco-admin/cco-health-threshold/threshold.service';


@Component({
  selector: 'app-cco-ont',
  templateUrl: './cco-ont.component.html',
  styleUrls: ['./cco-ont.component.scss']
})
export class CcoOntComponent implements OnInit {
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
  ontSelected: any = "All";
  ontDataArray: any = ["All"];
  regionDataArray = ["All"];
  systemDataArray = ["All"];
  interfaceDataArray: any = ["All"];
  locationDataArray = ["All"];
  modalTitle: any;
  modalInfo: any;
  modalRef: any;
  groupBy: any = "region";
  LocationSubject: any;
  regionName: any;
  systemName: any;
  locationName: any;
  interfaceName: any;
  ontName: any;
  systemSubject;
  fullScreen: boolean = false;
  fullScreen_Filter: any = false;
  fullScreenChart: any;
  hideInterface:boolean=false;
  singleTimeseries: boolean;
  loading: boolean;
  params: any;
  regionNameSelected: any;
  locationNameSelected: any;
  systemNameSelected: any;
  loadedMultipleTimeseriesChart= [];
  chartTitlePon='HBIPErrorbyregion';
  chartTitleLowLight='HLowLightLevelbyregion';
  chartType:any="Region";
  chartSubTitle='Select a region to view locations in that region';
  chartSubTitleforLowlight:any;
  chartDownType='region';
  tableName: any ="Regions";
  searchType :any='Search regions';
  chartId='regionId';
  chartName='PON Error Rate';
  extraData: any;
  PonChart: any = { location: {}, system: {}, interface: {}, ont: {}};
  lowLightChart: any = { location: {}, system: {}, interface: {}, ont: {} };
  last24hours: boolean = false;
  combineLatest: Observable<unknown[]>;
  errorMsg: any;
  packetErrormsg: any;
  ponChart: any;
  searchText: string;
  parallelReqSubscribtion: any;
  ponchartLocMsg: any;
  lowLightData: any;
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
  idCount =0;
  frTable: DataTables.LanguageSettings;
  esTable: DataTables.LanguageSettings;
  languageSubject;
  regionsSubject: any;
  fsan: string;
  fsanvalid: boolean;
  fsanName: any;
  totalOnt: any;
  quarantinedCount: any;
  bipCount: any;
  lowCount: any;
  ontPonError: any;
  ontlowlight: any;
  ontCounts: any;
  bipErrorCount: any = 0;
  lowlightlevelCounts: any = 0;
  quarantinedCounts: any;
  subTitle: string;
  nosystem: boolean = false;
  thresholdData: any;
  hasWriteAccess: boolean;
  hasShowAccess: boolean;
  showTheshold: boolean;
  constructor(
    private dateUtilsService: DateUtilsService,
    private dialogService: NgbModal,
    private healthService: HealthService,
    private titleService: Title,
    private sso: SsoAuthService,
    private CcochartService: CcochartService,
    private commonOrgService: CommonService,
    private ShortnumberPipe: ShortnumberPipe,
    private exportExcelService: ExportExcelService,
    private translateService: TranslateService,
    private nfainventoryservice: NfainventoryService,
    private route: ActivatedRoute,
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
        this.titleService.setTitle(`${this.language['ONT']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      });
    }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.language['ONT']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.getData();
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']) {
      this.hasShowAccess = true;
    }
    if (environment.VALIDATE_SCOPE) {
      if (scopes['cloud.rbac.coc.health.ont']) {
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
    this.applyfilter(true);
      //Total Count
      this.totalOnt = this.healthService.getOnt().subscribe((res: any) => {
        this.ontCounts = res?.count?.toLocaleString();
      });
      //quarantine
      this.quarantinedCount = this.nfainventoryservice.GetPonCount('quarantine').subscribe((res: any) => {
        this.quarantinedCounts = res?.count?.toLocaleString();
      });
      // ONTS WITH HIGH BIP ERROR count
      let startdate = Math.ceil(((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000)) / 1000);
      let endDate = Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000);
      this.bipCount = this.healthService.getOntBipError(startdate, endDate).subscribe(res => {
        this.bipErrorCount = Object.values(res).toLocaleString();
      });
      //ONT WITH LOW LIGHT LEVELS count
      this.lowCount = this.healthService.getLowlightlevelcount(startdate, endDate).subscribe(res => {
        if (res) {
          Object.values(res).forEach(element => {
            if (element.count && element.count != 'undefined' && element.deleted != true)
              this.lowlightlevelCounts = this.lowlightlevelCounts + element.count;
          });
          this.lowlightlevelCounts = this.lowlightlevelCounts.toLocaleString();
        }
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

  getRegionsValue() {
    this.regionsSubject = this.healthService.getRegions()
      .subscribe((res: any) => {
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
      }, (error) => {
      })
  }

  getLocationValue(event: any) {
    let id = this.regionSelected == "All" ? "" : this.regionSelected
    this.locationSelected = "All"
    this.systemSelected = "All"
    this.interfaceSelected = "All"
    this.ontSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    this.ontDataArray = ["All"];
    this.fsan = null;
    if (this.regionSelected != "All") {
      this.LocationSubject = this.healthService.getLocations(id)
        .subscribe((res: any) => {
          this.locationDataArray = ["All"];
          this.locationDataArray = [...this.locationDataArray, ...res];
        }, (error) => {
        })
    }
    this.regionDataArray.forEach((element: any) => {
      if (element.id == this.regionSelected) {
        this.regionName = element.name;
        this.PonChart.location = { region: this.regionSelected, regionname: this.regionName };
        this.lowLightChart.location = { region: this.regionSelected, regionname: this.regionName };
      }
    })
  }

  getSystemValue(event: any) {
    this.fsan = null;
    this.systemSelected = "All"
    this.interfaceSelected = "All"
    this.ontSelected = "All";
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    this.ontDataArray = ["All"];
    let regionId = this.regionSelected == "All" ? "" : this.regionSelected;
    let locationId = this.locationSelected == "All" ? "" : this.locationSelected;
    if (this.locationSelected != "All" && this.regionSelected != "All") {
      this.systemSubject = this.healthService.getSystems(regionId, locationId, 'ont.pon')
        .subscribe((res: any) => {
          this.systemDataArray = ["All"];
          this.systemDataArray = [...this.systemDataArray, ...res];
        }, (error) => {
        })
    }
    this.locationDataArray.forEach((element: any) => {
      if (element.id == this.locationSelected) {
        this.locationName = element.name;
        this.PonChart.system = { region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName }
        this.lowLightChart.system = { region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName }
      }
    });
  }

  getInterfaceValue(event: any) {
    this.interfaceSelected = "All"
    this.ontSelected = "All";
    this.interfaceDataArray = ["All"];
    this.ontDataArray = ["All"];
    this.fsan = null;
    let params1 = {
      system: this.systemSelected == "All" ? "" : this.systemSelected,
      interfaceCategory: "pon"
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
      this.healthService.GetInterfaces(query, 'ont').subscribe((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: true }))
        this.interfaceDataArray = ['All'];
        this.interfaceDataArray = [...this.interfaceDataArray, ...res];
      })
      this.systemDataArray.forEach((element: any) => {
        if (element.uuid == this.systemSelected) {
          this.systemName = element.name;
          this.PonChart.interface = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName
          }
          this.lowLightChart.interface = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName
          }
        }
      })
    }
  }

  getOntValue(event: any) {
    this.ontSelected = "All";
    this.ontDataArray = ["All"];
    this.fsan = null;
    let params1 = {
      system: this.systemSelected == "All" ? "" : this.systemSelected,
      interface: this.interfaceSelected == "All" ? "" : this.interfaceSelected
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
    if (this.interfaceSelected != "All" && this.systemSelected != "All" && this.locationSelected != "All" && this.regionSelected != "All") {
      this.healthService.GetOntNames(query).subscribe((res: any) => {
        this.ontDataArray = ['All'];
        this.ontDataArray = [...this.ontDataArray, ...res];
      })
      this.interfaceDataArray.forEach((element: any) => {
        if (element.name == this.interfaceSelected) {
          this.interfaceName = element.name;
          this.PonChart.ont = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
          }
          this.lowLightChart.ont = {
            region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
            , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
          }
        }
      })
    }
  }

  selectOnt(event: any) {
    this.fsan = null;
    this.ontDataArray.forEach((element: any) => {
      if (element.fsan == this.ontSelected) {
        this.ontName = element.name;
        this.PonChart.ont = {
          region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
          , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
          , ont: this.ontSelected, ontname: this.ontName
        }
        this.lowLightChart.ont = {
          region: this.regionSelected, regionname: this.regionName, location: this.locationSelected, locationname: this.locationName
          , system: this.systemSelected, systemname: this.systemName, interface: this.interfaceSelected, interfacename: this.interfaceName
          , ont: this.ontSelected, ontname: this.ontName
        }
      }
    })
  }

  removespecialcharacter(event) {
    var key;
    key = event.keyCode
    return ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123));
  }

  fsanChanges($event) {
    if (this.fsan.length == 0 || this.fsan.length == 12) this.fsanvalid = false;
    this.interfaceSelected = "All";
    this.ontSelected = "All";
    this.regionSelected = "All";
    this.systemSelected = "All";
    this.locationSelected = "All";
    this.locationDataArray = ["All"];
    this.systemDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    this.ontDataArray = ["All"];
  }

  applyfilter(val,chart?,data?) {
    this.nosystem = false;
    if(val || chart){
      this.searchText='';
      if(chart?.type == "Ont"){
        this.rerender();
      }
    }
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
    if (this.fsanValidated("d")) return;
   this.fromDate = this.fromDate;
   this.toDate = this.toDate;
    if (this.fullScreen == true) {
      this.fullScreen_Filter = true;
      if (this.interfaceSelected && this.interfaceSelected != "All") {
        let chartname;
        this.chartId = 'ont';
        if (this.fullScreenChart == "Lowlighchart") {
          chartname = 'Low Level Light By Ont'
        }
        else if (this.fullScreenChart == "ponchart") {
          chartname = 'Bip Error By Ont'
        }
        this.fullScreenExpandFunction(chartname, 'Ont', this.fullScreenChart,'',this.chartId )
        return
      }
      if (this.systemSelected && this.systemSelected != "All") {
        let chartNames;
        this.chartId = 'interface';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'HBIPErrorByInterface';
        }
        else if (this.fullScreenChart == "Lowlighchart") {
          chartNames = 'HLowLightLevelByInterface';
        }   
        this.fullScreenExpandFunction(chartNames, 'Interface', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.locationSelected && this.locationSelected != "All") {
        let chartNames;
        this.chartId = 'systemId';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'HBIPErrorBySystem'
        }
        else if (this.fullScreenChart == "Lowlighchart") {
          chartNames = 'HLowLightLevelBySystem'
        }
        this.fullScreenExpandFunction(chartNames, 'System', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.regionSelected && this.regionSelected != "All") {
        let chartNames;
        this.chartId = 'locationId';
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'HBIPErrorByLocation'
        }
        else if (this.fullScreenChart == "Lowlighchart") {
          chartNames = 'HLowLightLevelByLocation'
        }
        this.fullScreenExpandFunction(chartNames, 'Location', this.fullScreenChart,'',this.chartId)
        return
      }
      if (this.regionSelected == "All") {
        let chartNames;
        this.chartId="regionId";
        if (this.fullScreenChart == "ponchart") {
          chartNames = 'HBIPErrorbyregion'
        }
        else if (this.fullScreenChart == "Lowlighchart") {
          chartNames = 'HLowLightLevelbyregion'
        }
        this.fullScreenExpandFunction(chartNames, 'Region', this.fullScreenChart,'',this.chartId)
        return
      }
    }
    else {
      this.hideInterface=false;
      this.singleTimeseries = false;
      this.fullScreen_Filter = false;
      if (this.fsan) {
        this.loadedMultipleTimeseriesChart = [];
        this.hideInterface=true
        let params = {
          tenant: "0",
          startTime: this.fromDate,
          endTime: this.toDate,
          fsan: this.fsan
        }
        params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
        let paramsname = {
          ont: this.fsanName
        }
        this.singleTimeseries = true;
        this.nosystem = true
        this.loadMultipleChart(params, paramsname, "General", this.fsan,this.fsan);
        return
      }
      if ((this.ontSelected && this.ontSelected != "All")||chart?.type == "Ont" || data?.ont) {
        if(chart || data){
          let isTimeSeries, date, endDate, groupBy;
          isTimeSeries = true;
          date = this.fromDate;
          endDate = this.toDate;
          groupBy = "";
          this.selectOnt(chart)
          let ontselected=chart.category ? chart.category : data.fsan
          if (isTimeSeries) {
            let params = {
              tenant: "0",
              startTime: this.fromDate,
              endTime: this.toDate,
              region: chart?.extradata?.region ? chart?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || chart.type == "Location" ? "" : this.regionSelected,
              location: chart?.extradata?.location ? chart?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
              system:chart?.extradata?.system ? chart?.extradata?.system :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
              interface: chart?.extradata?.interface ? chart?.extradata?.interface :this.interfaceSelected?this.interfaceSelected: this.interfaceName == "All" ? "" : this.interfaceName,
              fsan: ontselected,
            }
            params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
            let paramsName = {
              regionname: chart?.extradata?.regionname ?chart?.extradata?.regionname:this.regionNameSelected,
              locationname: chart?.extradata?.locationname?chart?.extradata?.locationname:this.locationNameSelected,
              systemname: chart?.extradata?.systemname ?chart?.extradata?.systemname:this.systemNameSelected,
              interfacename: chart?.extradata?.interface ?chart?.extradata?.interface:this.interfaceSelected,
              ont: chart.name ?chart.name:data.ont,
              fsan: ontselected,
            }
            this.singleTimeseries = true;
            let chartName = 'ontPonError'+ ontselected;
            this.loadMultipleChart(params, paramsName, "General" ,chartName, ontselected)
            return
          }
        } else{
          this.loadedMultipleTimeseriesChart = [];
          this.hideInterface=true
        let params = {
          tenant: "0",
          startTime: this.fromDate,
          endTime: this.toDate,
          fsan: this.ontSelected == "All" ? "" : this.ontSelected,
        }
        params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
        let paramsName = {
          regionname: this.regionName,
          locationname: this.locationName,
          systemname: this.systemName,
          interfacename: this.interfaceName,
          ont: this.ontSelected
        }
        this.singleTimeseries = true;
        this.loadMultipleChart(params, paramsName, "General", "Genernal", this.ontSelected)
        return;
        }
      }

      if ((this.interfaceSelected && this.interfaceSelected != "All") ||chart?.type == "Interface" || data?.interface) {
          this.chartTitlePon='Bip Error By Ont';
          this.chartTitleLowLight='Low Level Light By Ont';
          this.chartType="Ont";
          this.chartSubTitle='Ont_Bip_Sub';
          this.chartSubTitleforLowlight='Ont_low_Sub';
          this.chartDownType="ont";
          this.tableName="ONTs";
          this.chartId = 'ont';
          this.searchType = 'Search ONTs';
          let value = val ?{ type: "System", valueType: "ponchart", category: this.interfaceSelected, name: this.interfaceName, extradata: this.lowLightChart.interface }:chart
          let groupBy, chartsId;
          groupBy = "ont"
        
          this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
          this.locationSelected=value.extradata?.location?value.extradata?.location:this.locationSelected
          this.systemSelected=chart?.extradata?.system ? chart?.extradata?.system :this.systemSelected
          this.systemNameSelected=chart?.extradata?.systemname ?chart?.extradata?.systemname:this.systemNameSelected,
          this.interfaceSelected=value.category ?value.category:data.interface
          this.interfaceName=value.name ? value.name:data.interface
          if(!val)this.getOntValue(value)
          this.extraData = {
            region: this.regionSelected, regionname: this.regionNameSelected ? this.regionNameSelected:value?.extradata?.regionname, location: this.locationSelected, locationname: this.locationNameSelected ?this.locationNameSelected :value?.extradata?.locationname,
            system: this.systemSelected, systemname: this.systemNameSelected ? this.systemNameSelected:value?.extradata?.systemname,
            interface: this.interfaceSelected, interfacename: this.interfaceName
          }
          this.lowLightChart.ont = this.extraData;
          this.PonChart.ont=this.extraData;
          chartsId = "Ont_chart";  
          this.params = {
            tenant: "0",
            startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.fromDate)}`,
            endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.toDate, true)}`,
            region: value?.extradata?.region ? value?.extradata?.region : this.regionSelected?this.regionSelected:this.regionSelected == "All" || value.type == "Location" ? "" : this.regionSelected,
            location: value?.extradata?.location ? value?.extradata?.location :this.locationSelected?this.locationSelected: this.locationSelected == "All" ? "" : this.locationSelected,
            system:value?.extradata?.system ? value?.extradata?.system :this.systemSelected?this.systemSelected: this.systemSelected == "All" ? "" : this.systemSelected,
            interface: value.category ? value.category :this.interfaceSelected?this.interfaceSelected: this.interfaceSelected == "All" ? "" : this.interfaceSelected,
            groupBy: groupBy,
          }
          this.loading = true;
          this.makeQuery()
          return     
      }
      if(((this.systemSelected && this.systemSelected != "All") ||chart?.type == "System" || data?.system) || ((this.locationSelected && this.locationSelected != "All")||chart?.type == "Location"  || data?.location) ||((this.regionSelected && this.regionSelected != "All") || chart?.type == "Region" || data?.region) ){
        if ((this.systemSelected && this.systemSelected != "All")||chart?.type == "System" || data?.system) {
          this.loadedMultipleTimeseriesChart=[];
          this.chartTitlePon="HBIPErrorByInterface";
          this.chartTitleLowLight="HLowLightLevelByInterface";
          this.chartType="Interface";
          this.chartSubTitle='Health_Interface_Sub';
          this.chartDownType="interface";
          this.tableName="Interfaces";
          this.chartId = 'interface';
          this.searchType= 'Search interfaces';
          let value = val ?{ type: "System", valueType: "ponchart", category: this.systemSelected, name: this.systemName, extradata: this.lowLightChart.system }:chart
          let groupBy, chartsId;
          groupBy = "interface"
          this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
          this.locationSelected=value.extradata?.location?value.extradata?.location:this.locationSelected
          this.systemSelected=value.category ?value.category:data.systemId
          this.systemNameSelected=value.name ? value.name:data?.system
          if(!val)this.getInterfaceValue(value)
          console.log(this.systemSelected)      
          this.extraData = {
            region: this.regionSelected, regionname: value?.extradata?.regionname ? value?.extradata?.regionname:this.regionNameSelected, location: this.locationSelected, locationname:value?.extradata?.locationname ?value?.extradata?.locationname :this.locationNameSelected,
            system: this.systemSelected, systemname: this.systemNameSelected
          }
          this.lowLightChart.interface = this.extraData
          this.PonChart.interface=this.extraData;
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
          this.chartTitlePon='HBIPErrorBySystem';
          this.chartTitleLowLight="HLowLightLevelBySystem";
          this.chartType="System";
          this.chartSubTitle='Health_System_Sub';
          this.tableName="Systems";
          this.chartDownType="system";
          this.chartId = 'systemId';
          this.searchType = 'Search systems';
          let value = val?{ type: "Location", valueType: "ponchart", category: this.locationSelected, name: this.locationName, extradata: this.lowLightChart.location }:chart;
          let groupBy,chartsId;
          groupBy = "system";
        chartsId = "System_chart";
        this.regionSelected=value.extradata?.region ?value.extradata?.region:this.regionSelected
        this.locationSelected=value.category ?value.category: data.locationId
        this.locationNameSelected=value.name ?value.name:data.location
        if(!val)this.getSystemValue(value)
        this.extraData = { region: this.regionSelected, regionname: value.extradata?.regionname ?value.extradata?.regionname:this.regionNameSelected , location:this.locationSelected, locationname: value.name ?value.name:data.location }
        this.lowLightChart.system = this.extraData;
        this.ponChart.system=this.extraData
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
          this.chartTitlePon='HBIPErrorByLocation';
          this.chartTitleLowLight= "HLowLightLevelByLocation";
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
          this.lowLightChart.location = this.extraData;
          this.ponChart.location=this.extraData
          if(!val)this.getLocationValue(value);
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
      this.chartTitlePon='HBIPErrorbyregion';
      this.chartSubTitle='Select a region to view locations in that region';
      this.chartTitleLowLight='HLowLightLevelbyregion';
      this.searchType= 'Search regions';
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
        let queryPon= query + '&countBy=ont'
      let requestEndpoints = [
        `${environment.API_BASE_URL}health/reports/biperror/count?${queryPon}`,
        `${environment.API_BASE_URL}health/reports/lowlightlevelcount?${query}`,
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
  let queryPon = query + '&countBy=ont'
  let requestEndpoints = [
    `${environment.API_BASE_URL}health/reports/biperror/count?${queryPon}`,
    `${environment.API_BASE_URL}health/reports/lowlightlevelcount?${query}`,
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

  makeParallelRequest(valueData?){
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      if (response[0] && response[0].error) {
        if (response[0].status == 401) {
          this.errorMsg = this.language['Access Denied'];
        } else {
          this.errorMsg = this.commonOrgService.pageErrorHandle(response[0]);
        }
        this.ponChart = [];
      } else {
        response[0] = this.singleCountSort(response[0], "count", this.chartType)
        this.ponChart = response[0];
       this.ponchartLocMsg = "";
        Highcharts.chart('PortCourtChart', this.chartType !== 'Ont' ? this.PONErrorRateChartOptionsn(Object.assign([],this.ponChart.map(element => Object.assign({},element))) || [], this.chartType, false,valueData):this.PONErrorRateChartOptionONT(Object.assign([],this.ponChart.map(element => Object.assign({},element))) || [], this.chartType, false,valueData));
        this.GetSubTitle(Object.assign([],this.ponChart.map(element => Object.assign({},element))) || [], this.chartType, false,valueData);
      }
      if (response[1] && response[1].error) {
        if (response[1].status == 401) {
          this.packetErrormsg = this.language['Access Denied'];
        } else {
          this.packetErrormsg = this.commonOrgService.pageErrorHandle(response[1]);
        }
        this.lowLightData = [];
      } else {
        response[1] = this.singleCountSort(response[1], "count", this.chartType)
        this.lowLightData = response[1];
        Highcharts.chart('PacketDroppedChart', this.chartType !== 'Ont' ? this.lowLivelChartOptions(Object.assign([],this.lowLightData.map(element => Object.assign({},element))) || [], this.chartType, false,valueData):this.lowLivelChartOptionONT(Object.assign([],this.lowLightData.map(element => Object.assign({},element))) || [], this.chartType, false,valueData));
        this.GetSubTitle(Object.assign([],this.lowLightData.map(element => Object.assign({},element))) || [], this.chartType, false,valueData)
      }

      this.ponChart.forEach(el=>{
        el['ponCount']=el['count'];
      })
      this.lowLightData.forEach(el=>{
        el['LowLigthCount']=el['count'];
      })
        this.getTableData([ Object.assign([],this.ponChart.map(element => Object.assign({},element))),Object.assign([],this.lowLightData.map(element => Object.assign({},element)))], this.chartId)
        this.loading = false;   
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.commonOrgService.pageScrollTop();
    }, () => {
      this.loading = false;
    })
  }

  fsanValidated($event) {
    let flength = this.fsan?.length
    if (flength != 0 && flength < 12) {
      this.fsanvalid = true; return true;
    }
    else { this.fsanvalid = false; return false }
  }

  changeDate() {
    if(!this.ontSelected)this.loadedMultipleTimeseriesChart=[];
    if (!this.validateStartEndDates()) {
      this.modalTitle = this.language.Time_Period;
      this.openModalInfo();
      return;
    };
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
  
  PONErrorRateChartOptionONT(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxvalue = 0;
    var xAxisCategories = [];
    var seriesData1 = [];
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
      groupby = 'fsan',
        categoryid = 'fsan'
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData1.push({
          y: element.count ? element.count : 0,
          color: this.healthService.chart_color(element, "count")
        })
      });
      maxvalue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    let options = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      rangeSelector: {
        selected: 3
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
        max: maxvalue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 15 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        max: 1,
        allowDecimals: false,
        title: {
          text: this.language["ONT Count"]
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1,
        style: {
        },
      },
      tooltip: {
        useHTML: true,
        shared: true,
        borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px"> ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${self.healthService.toolip_color(point.color)};padding:0'> ${point.series.name} : </td>
            <td style='padding:0;margin-left:10px'>&nbsp ${self.ShortnumberPipe.transform(point.y)} </b></td></tr>`
          });
          let g = s + f;
          return h + g;
        }
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          minPointLength: 3,
          point: {
            events:
            {
              mouseOver: function () {
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
                let data1 = { type: this.series.chart.options.title.text, charttype: "BipChart", category: category, nameofthebar: this.series, name: event.point.category, extradata: event?.point.series.options.extradata }
                if(!isDeleted){
                  self.applyfilter(false,data1);
                } 
                
              }
            }
          },
        },
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: this.language["BIP Error Count"],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata
        }
      ]
    };
    return options;
  }

  PONErrorRateChartOptionsn(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let category, categoryid, subTitle;
    let maxvalue = 0;
    var xAxisCategories = [];
    var seriesData1 = [];
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
      groupby = 'fsan',
        categoryid = 'fsan'
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData1.push({
          y: element.count ? element.count : 0,
          color: this.healthService.chart_color(element, "count")
        })
      });
      maxvalue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    let options = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      rangeSelector: {
        selected: 3
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
        max: maxvalue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 15 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language["ONT Count"]
        },
        labels: {
          formatter: function () {
            return self.ShortnumberPipe.transform(this.value, false, 0);
          }
        },
        gridLineWidth: 1,
        style: {
        },
      },
      tooltip: {
        useHTML: true,
        shared: true,
        borderColor: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
        formatter: function () {
          var s = "", h = "", f = "", info = " ";
          f = "</table>"
          this.points.forEach(point => {
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first) {
              info = " (Deleted)"
            }
            h = `<span style = "font-size:10px"> ${point.key} ${info}  </span><table>`;
            s += `<tr><td style='color:${self.healthService.toolip_color(point.color)};padding:0'> ${point.series.name} : </td>
            <td style='padding:0;margin-left:10px'>&nbsp ${self.ShortnumberPipe.transform(point.y)} </b></td></tr>`
          });
          let g = s + f;
          return h + g;
        }
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          minPointLength: 3,
          point: {
            events:
            {
              mouseOver: function () {
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
                let data1 = { type: this.series.chart.options.title.text, charttype: "BipChart", category: category, nameofthebar: this.series, name: event.point.category, extradata: event?.point.series.options.extradata }
                if(!isDeleted){
                  self.applyfilter(false,data1);
                } 
                
              }
            }
          },
        },
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: this.language["BIP Error Count"],
          data: (seriesData1 || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata
        }
      ]
    };
    return options;
  }

  lowLivelChartOptionONT(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let subTitle;
    let maxvalue = 0;
    let category, categoryid;
    var seriesData = [];
    var xAxisCategories = [];
    var groupby;
    if (type == 'Region') {
      groupby = 'region',
        categoryid = 'regionId'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId';
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
      groupby = 'fsan',
        categoryid = 'fsan';
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData.push({
          y: element.count ? element.count : 0,
          color: this.healthService.chart_color(element, "count")
        })
      });
      maxvalue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      rangeSelector: {
        selected: 3
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
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 15 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        max: 1,
        allowDecimals: false,
        title: {
          text: this.language["ONT Count"]
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
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first) {
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
              mouseOver: function () {
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
                let data1 = { type: this.series.chart.options.title.text, charttype: "BipChart", category: category, nameofthebar: this.series, name: event.point.category, extradata: event?.point.series.options.extradata }
                if(!isDeleted){
                  self.applyfilter(false,data1);
                }               
              }
            }
          },
        }
      },
      series: [
        {
          name: this.language["Optical Power Low Threshold Count"],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata
        }
      ]
    };
  }

  lowLivelChartOptions(data, type?, fullscreen?: boolean, extradata?): any {
    const self = this;
    let subTitle;
    let maxvalue = 0;
    let category, categoryid;
    var seriesData = [];
    var xAxisCategories = [];
    var groupby;
    if (type == 'Region') {
      groupby = 'region',
        categoryid = 'regionId'
    }
    else if (type == 'Location') {
      groupby = 'location',
        categoryid = 'locationId';
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
      groupby = 'fsan',
        categoryid = 'fsan';
    }
    if (data.length) {
      data=this.healthService.duplicateDataHandle(data,groupby,categoryid)
      data.forEach(element => {
        xAxisCategories.push(element[groupby]);
        seriesData.push({
          y: element.count ? element.count : 0,
          color: this.healthService.chart_color(element, "count")
        })
      });
      maxvalue = xAxisCategories.length > 14 ? 15 : xAxisCategories.length
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      rangeSelector: {
        selected: 3
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
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        min: 0,
        max: maxvalue - 1,
        scrollbar: {
          barBackgroundColor: '#CCCCCC',
          barBorderColor: '#ccc',
          rifleColor: 'transparent',
          barBorderRadius: 3,
          trackBorderRadius: 3,
          buttonArrowColor: 'transparent',
          trackBackgroundColor: '#EBEAEF',
          height: 6,
          enabled: maxvalue == 15 ? true : false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language["ONT Count"]
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
            if (point.color == environment.OPERATIONS.HEALTH['HEALTH_DELETED_BAR_CHART_COLORS'].first || point.color == environment.OPERATIONS.HEALTH['DELETED_TRANSPARENT'].first) {
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
              mouseOver: function () {
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
                let data1 = { type: this.series.chart.options.title.text, charttype: "BipChart", category: category, nameofthebar: this.series, name: event.point.category, extradata: event?.point.series.options.extradata }
                if(!isDeleted){
                  self.applyfilter(false,data1);
                }               
              }
            }
          },
        }
      },
      series: [
        {
          name: this.language["Optical Power Low Threshold Count"],
          data: (seriesData || []),
          color: environment.OPERATIONS.HEALTH['HEALTH_BAR_CHART_COLORS'].first,
          extradata: extradata
        }
      ]
    };
  }

  getTableData(data:any, type: any, chartType?){
    let arr = _.groupBy(_.flatten([JSON.parse(JSON.stringify(data[0])), JSON.parse(JSON.stringify(data[1]))]), type);
    this.tableData = _.map(arr, function (val) { return _.merge.apply(_, val) });  
    let groupby = type.replace('Id', '');
    this.tableData=this.healthService.duplicateDataHandle(this.tableData,groupby,type)
    this.tableData=this.healthService.totalcoutsort(this.tableData,"count",'ponCount', chartType)
    if(this.chartType=="Ont"){
      this.tableData.forEach(element=>{
        if(element.ponCount === 0 || !element.ponCount) {
          element.ponCount = 'No'
        }else if(element.ponCount === 1){
          element.ponCount = 'Yes'
        }
        if(element.LowLigthCount === 0 || !element.LowLigthCount){
          element.LowLigthCount = 'No'
        }else if(element.LowLigthCount === 1){
          element.LowLigthCount = 'Yes'
        }
      })
    }
    if(!this.redenderOnce){
      this.dtTrigger.next();
      this.redenderOnce = true;
    } else {
      this.rerender();
    }
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
    let data;
    if(chartId)  data = this.healthService.duplicateDataHandle(valueData,type,chartId)
    $(id).addClass('spinnershow');
     data = this.healthService.chartDataFraming(valueData, chartName, type, extraData);
    let fname = this.healthService.generateDownloadName(chartName, type, 'ONT');
    setTimeout(() => {
      $(id).removeClass('spinnershow');
    }, 1000);
    this.exportExcelService.downLoadCSV(fname, data, extraData);
  }

  heading(chartName, type, idName, title?) {
    let region, location, system, interfaces, heading;
    let pipe = new DatePipe('en-US');
    if (chartName == 'low light') {
      heading = this.extraData ?this.extraData:this.lowLightChart[type];
    }
    else if (chartName == 'PON Error Rate') {
      heading = this.PonChart[type];
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
    else if (type == 'interface')
      extraData = `${this.language[title]} \r\n${this.language.region} : ${region} \r\n${this.language.location} : ${location}\r\n${this.language.System} : ${system}\r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')} \r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')}\r\n\r\n`;
    else
      extraData = `${this.language[title]} \r\n${this.language.region} : ${region} \r\n${this.language.location} : ${location}\r\n${this.language.System} : ${system}\r\n${this.language.Interface} : ${interfaces}\r\n${this.language['START_DATE']} : ${pipe.transform(this.fromDate, 'MM/dd/yyyy')} \r\n${this.language['END_DATE']} : ${pipe.transform(this.toDate, 'MM/dd/yyyy')}\r\n\r\n`;

    return extraData;
  }
  
  fullScreenExpandFunction(chartName: string, valType?, chart?, valueData?, type?) {
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
    else if (valType == 'Ont') { groupBy = 'ont'; this.fullScreenChartType = 'ont'; }
    if (valueData) {
      this.fullScreenMsg = ""; 
      this.fullScreenData = valueData;
      this.rerender();
      if (chart == 'ponchart') {
        this.fullScrChart = 'PON Error Rate';
        Highcharts.chart('fullScreenChart', valType !== 'Ont' ?this.PONErrorRateChartOptionsn(valueData || [], valType, true, this.lowLightChart[groupBy]):this.PONErrorRateChartOptionONT(valueData || [], valType, true, this.lowLightChart[groupBy]));
      }else if (chart == "Lowlighchart") {
        this.fullScrChart = 'low light';
        Highcharts.chart('fullScreenChart', valType !== 'Ont' ?this.lowLivelChartOptions(valueData || [], valType, true, this.lowLightChart[groupBy]):this.lowLivelChartOptionONT(valueData || [], valType, true, this.PonChart[groupBy]));       
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
        interface: this.interfaceSelected == "All" ? "" : this.interfaceSelected,
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
        this.fullScrChart = 'PON Error Rate';
        this.ontPonError = this.healthService.ontBipErrornew(query).subscribe(res => {
          res = this.singleCountSort(res, "count", valType)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart', valType !== 'Ont'?this.PONErrorRateChartOptionsn(res || [], valType, true, this.lowLightChart[groupBy]):this.PONErrorRateChartOptionONT(res || [], valType, true, this.lowLightChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
      else if (chart == "Lowlighchart") {
        this.fullScrChart = 'low light';
        this.ontlowlight = this.healthService.Lowlightlevelcount(query).subscribe(res => {
          res = this.singleCountSort(res, "count", valType)
          this.getTableFullscreen(res,groupBy,type)
          Highcharts.chart('fullScreenChart',  valType !== 'Ont'?this.lowLivelChartOptions(res || [], valType, true, this.lowLightChart[groupBy]):this.lowLivelChartOptionONT(res || [], valType, true, this.PonChart[groupBy]));
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler(err)
        });
      }
    }
  }

  singleCountSort(data, key1, charttype = 'Region') {
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

  fullScreenInvertFunction() { 
    this.searchText='';
    this.fullScreen = false;
    if(this.fullScreen_Filter)
    this.applyfilter(true);  
  }

  loadMultipleChart(param, paramsName, valType?, valName?,value?) {
    this.count = this.count + 1;
    let IsDuplicate = false;
    if (this.loadedMultipleTimeseriesChart.length) {
      this.loadedMultipleTimeseriesChart.forEach(element => {
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
      this.loadedMultipleTimeseriesChart.push({
        params: param,
        paramname: paramsName,
        charttype: valType,
        chartname: valName,
        divid: valName + this.count,
        page: 'ont',
        title:value,
        interface:this.interfaceSelected?this.interfaceSelected:paramsName?.interfacename,
        system:this.nosystem?'':value && this.systemNameSelected ?this.systemNameSelected:paramsName?.systemname,
      });
      this.loadedMultipleTimeseriesChart = [...this.loadedMultipleTimeseriesChart];
    }, 100)
  }

  search(term: string) {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns(0).search(term).draw();
        });
    });
  }

  countconvert(number) {
    return this.ShortnumberPipe.transform(number);
  }

  clearChartContainer(values: any) {
    var findindex = this.loadedMultipleTimeseriesChart.findIndex(x => x.chartname === values.chartname);
    if (findindex > -1) {
      this.loadedMultipleTimeseriesChart.splice(findindex, 1);
    }
  }

  navigateThreshold(){
    this.router.navigate(["cco/operations/health/monitoring-thresholds"])
  }

  clearFilter() {
    if(this.loading){
      return
    }
    this.subTitle='';
    this.searchText='';
    let date = new Date();
    this.fromDate = this.fromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.toDate = this.toDate = new Date();
    this.last24hours = false;
    this.systemDataArray = ["All"];
    this.locationDataArray = ["All"];
    this.interfaceDataArray = ["All"];
    this.locationSelected = "All";
    this.regionSelected = "All";
    this.systemSelected = "All";
    this.interfaceSelected = "All";
    this.ontSelected='All';
    this.fsan='';
    this.regionName = null;
    this.locationName = null;
    this.systemName = null;
    this.interfaceName=null;
    this.groupBy = null;
    this.chartId="regionId";
    this.loadedMultipleTimeseriesChart=[]
    if (this.fullScreen == true) {
      this.fullScreen_Filter = true;
      let chartNames;
      if (this.fullScreenChart == "ponchart") {
        chartNames = 'PON Error By Region'
      }
      else if (this.fullScreenChart == "Lowlighchart") {
        chartNames = 'HLowLightLevelbyregion'
      }
      this.fullScreenExpandFunction(chartNames, 'Region', this.fullScreenChart, '', this.chartId)
      return
    }
    else {
    this.applyfilter(true);
     this.chartType="Region";
     this.chartDownType='region';
     this.tableName="Regions";
     this.chartId="regionId";
     this.chartTitlePon='HBIPErrorbyregion';
     this.chartSubTitle='Select a region to view locations in that region';
     this.chartTitleLowLight='HLowLightLevelbyregion';
     this.searchType= 'Search regions';
    }
  }

  ngOnDestroy(): void {
    if (this.dtSub)this.dtSub.unsubscribe();
    if (this.dtSubs)this.dtSubs.unsubscribe()
    if (this.parallelReqSubscribtion)this.parallelReqSubscribtion.unsubscribe();
    if (this.ontPonError)this.ontPonError .unsubscribe();
    if (this.ontlowlight)this.ontlowlight.unsubscribe();
    if (this.lowCount) this.lowCount.unsubscribe();
    if (this.bipCount) this.bipCount.unsubscribe();
    if (this.totalOnt) this.totalOnt.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.LocationSubject) this.LocationSubject.unsubscribe();
    if (this.regionsSubject) this.regionsSubject.unsubscribe();
    if (this.systemSubject) this.systemSubject.unsubscribe();
  }
  
  clearSearch(value) {
    this.searchText = "";
    this.rerender()
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
