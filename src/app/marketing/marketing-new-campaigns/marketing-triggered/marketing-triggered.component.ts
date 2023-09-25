import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import moment from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingExploreDataAssignerService } from '../../marketing-explore-data/basic/shared/services/data-assigners.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingCampaignsChartServiceService } from '../marketing-campaigns-result/marketing-campaigns-chart-service.service';

@Component({
  selector: 'app-marketing-triggered',
  templateUrl: './marketing-triggered.component.html',
  styleUrls: ['./marketing-triggered.component.scss']
})
export class MarketingTriggeredComponent implements OnInit {
  expand: boolean = false
  errorInfo: any
  errorcamInfo: any
  revenueEdgeSuitsError: boolean = false
  revenuecampEdgeSuitsError: boolean = false
  totalRevenue: any
  totalcampRevenue: any
  Highcharts = Highcharts;
  revenueArray: any = []
  campaignArray: any = []
  myset: any = []
  categories_rev_2: any = []
  fullScreen: boolean = false
  fullScreen_rev: boolean = false
  deduplicatedDataAvailable: boolean = false
  deduplicatedDataAvailable_cam: boolean = false
  deduplicatedDataAvailable_rev: boolean = false
  fullScreen_cam: boolean = false
  selectVal = '3'
  timeframes = [
    { value: '1', name: 'Past 1 month' },
    { value: '3', name: 'Past 3 months' },
    { value: '6', name: 'Past 6 months' },
    { value: '12', name: 'Past 12 months' },
  ];
  channelResultTable = []
  filterSearchList = [];
  activePeriod = 'Past 3 months'
  language: any;
  languageSubject: any;
  campaign_id: any;
  totalNonOptRevenue: any
  constructor(private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService,
    private exportExcelService: ExportExcelService,
    private marketingCampaignsChartServiceService: MarketingCampaignsChartServiceService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,) { }

  ngOnInit(): void {
    this.campaign_id = sessionStorage.getItem('id_camp')
    this.chartApiCall(this.selectVal, this.campaign_id)
    this.language = this.translateService.defualtLanguage;
    let activePeriodIndex = 0;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (this.ChartFinalDataArgs.length) {
        this.ChartFinalData(...this.ChartFinalDataArgs);
      }
      if (this.campaignChartArgs.length) {
        this.campaignChart(...this.campaignChartArgs);
      }
    });
    this.setLanguageTimeFrame();
  }
  setLanguageTimeFrame() {
    this.timeframes = [
      { value: '1', name: this.language.revenue_month.Past_1_month },
      { value: '3', name: this.language.revenue_month.Past_3_months },
      { value: '6', name: this.language.revenue_month.Past_6_months },
      { value: '12', name: this.language.revenue_month.Past_12_months },

    ];
    this.activePeriod = this.language.revenue_month.Past_3_months
  }
  selectTimeFrame(data) {
    this.timeframes.filter(x => {
      if (x.name == data) {
        this.selectVal = x.value;
      }
    })
    
    this.chartApiCall(this.selectVal, this.campaign_id)

  }

  chartApiCall(id, camp) {
    this.marketingCampaignsApiService.TriggeredChartSeries_rev(id, camp).subscribe((res: any) => {
      if (res != null) {
        this.campaignArray = res.data
        this.revenuecampEdgeSuitsError = false
        this.campaignChart(this.campaignArray, 0)
        this.revenueArray = res.data
        this.revenueEdgeSuitsError = false
        this.ChartFinalData(this.revenueArray, 0)
      } else {
        this.campaignArray = []
        this.errorcamInfo = "No data available"

        this.revenuecampEdgeSuitsError = true
        this.revenueArray = []
        this.errorInfo = "No data available"

        this.revenueEdgeSuitsError = true
      }
     
    }, (error) => {
      this.campaignArray = []
      this.errorcamInfo = "No data available"
      this.revenuecampEdgeSuitsError = true
      this.revenueArray = []
      this.errorInfo = "No data available"
      this.revenueEdgeSuitsError = true
    })
  }

 
  ChartFinalDataArgs = [];
  ChartFinalData(revenueArray?, val?) {
    this.ChartFinalDataArgs = [revenueArray, val]
    let arrRev = []
    let categories = []
    let series = [];
    let arropt =[]
    if (revenueArray.length > 0) {
      for (var i = 0; i < revenueArray.length; i++) {
        arropt.push(revenueArray[i].totalOrgSubscribers != null ? revenueArray[i].totalOrgSubscribers : 0)
        arrRev.push({y:revenueArray[i].totalOrgSubscribers != null ? revenueArray[i].totalOrgSubscribers : 0,showDot:revenueArray[i].showDot})
        categories.push(moment(revenueArray[i].timestamp).utc().format('MM/DD/YYYY'))
      }
      this.totalRevenue = arropt[arropt.length - 1]
      let RevSeriesObject = { name:  this.language.campaign_period,  zones: this.buildZones(arrRev), zoneAxis: 'x', data: arrRev };
      let PotenSeriesObject = { name: this.language.prior_post, data: [], zoneAxis: 'x',  color: '#0027FF',dashStyle: 'dot'};
      series.push(RevSeriesObject,PotenSeriesObject)
    
      if (val == 0) {
        this.passChartOption(series, categories, `${this.language['Subscribers']}`,val)
      } else {
        this.passChartOption(series, categories, `${this.language['Subscribers']}`,val)
      }
    }
  }

  buildZones(data) {
    var zones = [], i = -1, len = data.length, current, previous, dashStyle, value;
    
    while (++i < len) {
      current = data[i];
      dashStyle = '';
    
      if (current.showDot === false) {
        dashStyle = 'solid';
        value = i;
      } else {
        dashStyle = 'dot';
        value = i;
      }
      
      if (dashStyle) {
        zones.push({
          dashStyle: dashStyle,
          value: value
        });
      }
    }
    
    return zones;
  }
  campaignChartArgs = [];
  campaignChart(campaignArray?, val?) {
    this.campaignChartArgs = [campaignArray, val];
    let arrRev = []
    let categories_rev = []
    let series = [];
    let arropt =[]
    if (campaignArray != null && campaignArray.length > 0) {
      for (var i = 0; i < campaignArray.length; i++) {
        arropt.push(campaignArray[i].totalCampaignAudience == null ? 0 : campaignArray[i].totalCampaignAudience )
        arrRev.push({y:campaignArray[i].totalCampaignAudience == null ? 0 : campaignArray[i].totalCampaignAudience ,showDot:campaignArray[i].showDot})
        categories_rev.push(moment(campaignArray[i].timestamp).utc().format('MM/DD/YYYY'))
      }
      this.totalNonOptRevenue = arropt[arropt.length - 1]
      let RevSeriesObject = { name:  this.language.campaign_period,  zones: this.buildZones(arrRev), zoneAxis: 'x', data: arrRev };
      let PotenSeriesObject = { name: this.language.prior_post, data: [], zoneAxis: 'x', color: '#0027FF', dashStyle: 'dot'};
      series.push(RevSeriesObject,PotenSeriesObject)
      if (val == 0) {
        this.passChartOptioncamp(series, categories_rev, `${this.language['Subscribers']}`,val)
      } else {
        this.passChartOptioncamp(series, categories_rev, `${this.language['Subscribers']}`,val)
      }
     
    }
  }
  passChartOption(series, categories, Revenue, val) {

    if (val == 0) {
      this.marketingCampaignsChartServiceService.triggered(series, categories,Revenue,val).subscribe((data: any) => {
        setTimeout(() => {
          Highcharts.setOptions({
            lang: {
              decimalPoint: '.',
              thousandsSep: ','
            }
          });
          let chart = Highcharts.chart('subscribe-home-chart', data)
        }, 500);
      })
    } else {

      this.marketingCampaignsChartServiceService.triggered(series, categories,Revenue,val).subscribe((data: any) => {
        setTimeout(() => {
          Highcharts.setOptions({
            lang: {
              decimalPoint: '.',
              thousandsSep: ','
            }
          });
          let chart = Highcharts.chart('subscribe-home-chart-ex', data)
        }, 500);
      })
    }
  }
  passChartOptioncamp(series, categories,name,val) {
    if (val == 0) {
      this.marketingCampaignsChartServiceService.triggered(series, categories,name,val).subscribe((data: any) => {
        setTimeout(() => {
          Highcharts.setOptions({
            lang: {
              decimalPoint: '.',
              thousandsSep: ','
            }
          });
          let chart = Highcharts.chart('revenue-home-chart', data)
        }, 500);
      })
    } else {
      console.log(series)
      this.marketingCampaignsChartServiceService.triggered(series, categories,name,val).subscribe((data: any) => {
        setTimeout(() => {
          Highcharts.setOptions({
            lang: {
              decimalPoint: '.',
              thousandsSep: ','
            }
          });
          let chart = Highcharts.chart('revenue-home-chart-ex', data)
          console.log(data)
        }, 500);
      })
    }
  }
  expandFull() {
    this.expand = true
    this.fullScreen = true
    // this.fullScreen_cam = true
    // this.fullScreen_rev = false
    this.deduplicatedDataAvailable_cam = true
    this.deduplicatedDataAvailable_rev = false

    if (this.campaignArray != null && this.campaignArray.length > 0) {
      this.revenuecampEdgeSuitsError = false
      this.campaignChart(this.campaignArray, 1)
    } else {
      this.campaignChart(this.campaignArray, 1)
      this.errorcamInfo = "No data available"
      this.revenuecampEdgeSuitsError = true
    }
  }
  expandFull_rev() {
    this.expand = true
    this.fullScreen = true
    // this.fullScreen_rev = true
    // this.fullScreen_cam = false
    this.deduplicatedDataAvailable_rev = true
    this.deduplicatedDataAvailable_cam = false
    if (this.revenueArray != null && this.revenueArray.length > 0) {
      this.revenueEdgeSuitsError = false
      this.ChartFinalData(this.revenueArray, 1)
    } else {
      this.errorInfo = "No data available"
      this.revenueEdgeSuitsError = true
    }
  }
  expandFull1() {
    this.expand = false
    this.fullScreen = false
    this.deduplicatedDataAvailable = false
    this.deduplicatedDataAvailable_rev = false
    this.deduplicatedDataAvailable_cam = false
    if (this.revenueArray != null && this.revenueArray.length > 0) {
      this.revenueEdgeSuitsError = false
      this.ChartFinalData(this.revenueArray, 1)
    } else {
      this.errorInfo = "No data available"
      this.revenueEdgeSuitsError = true
    }
    // this.chartApiCall(selectVal, this.campaign_id)
    // this.chartSeries(selectVal)
  }


  download() {
    if (this.revenueArray != null) {
      let data = this.usageByAppDataForming(this.revenueArray)
      this.exportExcelService.downLoadCSVRevenue(this.language.Total_Subscribers, data);
    }
  }

  usageByAppDataForming(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['TIME STAMP']]:this.marketingCommonService.formatMonthForRevCampaignChart(el.timestamp), [this.language.Total_Subscribers]: el.totalOrgSubscribers != null ?  el.totalOrgSubscribers  : 0})
    });

    return returnArray;
  }
  download_camp() {
    if (this.campaignArray != null) {
      let data = this.usageByAppDataForming_1(this.campaignArray)
      this.exportExcelService.downLoadCSVRevenue(this.language.Campaign_Audience_Size, data);
    }
  }

  usageByAppDataForming_1(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['TIME STAMP']]:this.marketingCommonService.formatMonthForRevCampaignChart(el.timestamp) , [this.language.Campaign_Audience_Size]: el.totalCampaignAudience != null ? el.totalCampaignAudience : 0 })
    });

    return returnArray;
  }
  getArraySum(value) {
    let arrayData = value;
    if (typeof arrayData == 'object') {
      arrayData = Object.values(value);
    }
    let sum = value.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  }
  campaignRevFormatter(totalRevenue, num = 1) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return totalRevenue >= item.value;
    });
    return item ? (totalRevenue / item.value).toFixed(num).replace(rx, "$1") + item.symbol : "0";

  }
  campaignSegFormatter(totalcampRevenue, num = 1) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return totalcampRevenue >= item.value;
    });
    return item ? (totalcampRevenue / item.value).toFixed(num).replace(rx, "$1") + item.symbol : "0";

  }
}
