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
  selector: 'app-marketing-snapshot',
  templateUrl: './marketing-snapshot.component.html',
  styleUrls: ['./marketing-snapshot.component.scss']
})
export class MarketingSnapshotComponent implements OnInit {

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
  updatedDate:any = ''
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
    // if (data == 'Past 1 month') {
    //   this.selectVal = '1';
    // } else if (data == 'Past 3 months') {
    //   this.selectVal = '3';
    // } else if (data == 'Past 6 months') {
    //   this.selectVal = '6';
    // } else if (data == 'Past 12 months') {
    //   this.selectVal = '12';
    // } else {
    //   this.selectVal = '1';
    // }
    this.chartApiCall(this.selectVal, this.campaign_id)

  }

  chartApiCall(id, camp) {
      this.marketingCampaignsApiService.SubscriberChartSeries_rev(id, camp).subscribe((res: any) => {
        if (res != null) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].timestamp != null) {
              var formate_date = res.data[i].timestamp.split('T')
              res.data[i].timestamp = moment(formate_date[0]).format("MM/DD/YYYY")
            }
          }
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
    let start_date = moment(sessionStorage.getItem('start_date')).format("MM/DD/YYYY")
    let end_date = moment(sessionStorage.getItem('end_date')).format("MM/DD/YYYY")
    let arrRev = []
    let arrzone = []
    let categories = []
    let series = [];
    let time = [];
    let total_val = 0
    let start_index
    let end_index
    if (revenueArray != null && revenueArray.length > 0) {
      this.updatedDate = this.getUpdatedDate(revenueArray)
      for (var i = 0; i < revenueArray.length; i++) {
        total_val += revenueArray[i].totalRevenue
        arrRev.push(revenueArray[i].totalRevenue == null ? 0 : revenueArray[i].totalRevenue)
        categories.push(revenueArray[i].timestamp)
        time.push(revenueArray[i].timestamp)
        revenueArray[i].timestamp = this.marketingCommonService.formatMonthForRevCampaignChart(revenueArray[i].timestamp)
      }

      this.totalRevenue = arrRev[arrRev.length - 1]
      let last_index = revenueArray.length - 1
      let from
      let to

      start_index = revenueArray.findIndex(x => x.timestamp === start_date);
      end_index = revenueArray.findIndex(x => x.timestamp === end_date);

     if (start_index === -1 || end_index === -1) {
        if (start_index === -1) {
          start_index = revenueArray.findIndex(x => new Date(x.timestamp).getTime() > new Date(start_date).getTime() && new Date(x.timestamp).getTime() < new Date(end_date).getTime());
        }
        if (end_index === -1) {
          let end_index1 = [...revenueArray].reverse().findIndex(x => new Date(x.timestamp).getTime() < new Date(end_date).getTime());
          end_index = last_index - end_index1;
        }
      }

      if (start_index > -1 && end_index > -1) {
        arrzone.push({
          value: start_index,
          dashStyle: 'dot'
        }, {
          value: end_index,
          dashStyle: 'solid'
        });
      }

      arrzone.push({
        value: last_index,
        dashStyle: 'dot'
      });

      if(revenueArray.length == 1){
        from = -1;
        to = -1;
      }else{
      from = start_index;
      to = end_index;
      }

      let RevSeriesObject = { name: this.language.campaign_period, data: arrRev, zoneAxis: 'x', zones: arrzone };
      let PotenSeriesObject = { name: this.language['postcampaign'], data: [], zoneAxis: 'x', color: '#0027FF', dashStyle: 'dot' };

      series.push(RevSeriesObject, PotenSeriesObject)
    
        this.passChartOption(series, categories, `${this.language['Revenue']} ($)`, from, to, val)
      
    }
  }

  campaignChartArgs = [];
  campaignChart(campaignArray?, val?) {
    this.campaignChartArgs = [campaignArray, val];
    let start_date = moment(sessionStorage.getItem('start_date')).format("MM/DD/YYYY")
    let end_date = moment(sessionStorage.getItem('end_date')).format("MM/DD/YYYY")
    let arrzone = []
    let arrseg = []
    let categories_rev = []
    let series = [];
    let time = [];
    let total_val_rev = 0
    let start_index
    let end_index
    if (campaignArray != null && campaignArray.length > 0) {
      this.updatedDate = this.getUpdatedDate(campaignArray)
      for (var i = 0; i < campaignArray.length; i++) {
        total_val_rev += campaignArray[i].totalRevenue
        arrseg.push(campaignArray[i].totalRevenue == null ?  (0/parseInt(campaignArray[i].totalSubscribers)) : (parseInt(campaignArray[i].totalRevenue)/parseInt(campaignArray[i].totalSubscribers)))
        categories_rev.push(campaignArray[i].timestamp)
        time.push(campaignArray[i].timestamp)
        campaignArray[i].timestamp = this.marketingCommonService.formatMonthForRevCampaignChart(campaignArray[i].timestamp)
      }
      this.totalcampRevenue = arrseg[arrseg.length - 1]
      let last_index = campaignArray.length - 1
      let from
      let to
      start_index = campaignArray.findIndex(x => x.timestamp === start_date);
      end_index = campaignArray.findIndex(x => x.timestamp === end_date);
      console.log(start_index,end_index,start_date,end_date,last_index)

     if (start_index === -1 || end_index === -1) {
        if (start_index === -1) {
          start_index = campaignArray.findIndex(x => new Date(x.timestamp).getTime() > new Date(start_date).getTime() && new Date(x.timestamp).getTime() < new Date(end_date).getTime());
        }
        if (end_index === -1) {
         let end_index1 = [...campaignArray].reverse().findIndex(x => new Date(x.timestamp).getTime() < new Date(end_date).getTime());
          end_index = last_index - end_index1;
        }
      }

      if (start_index > -1 && end_index > -1) {
        arrzone.push({
          value: start_index,
          dashStyle: 'dot'
        }, {
          value: end_index,
          dashStyle: 'solid'
        });
      }

      arrzone.push({
        value: last_index,
        dashStyle: 'dot'
      });

      if(campaignArray.length == 1){
        from = -1;
        to = -1;
      }else{
      from = start_index;
      to = end_index;
      }

      //console.log(arrzone, start_index, end_index);

      let SegmentSeriesObject = { name: this.language.campaign_period, data: arrseg, zoneAxis: 'x', zones: arrzone };
      let PotenSeriesObject = { name: this.language['postcampaign'], data: [], zoneAxis: 'x', color: '#0027FF', dashStyle: 'dot'};
      series.push(SegmentSeriesObject, PotenSeriesObject)

      this.passChartOptioncamp(series, categories_rev, `${this.language.revenue_household} ($)`, from, to, val)

    }
  }
  passChartOption(series, categories, Revenue, from, to, val) {

    if (val == 0) {
      this.marketingCampaignsChartServiceService.revenuenewTrendsOption(series, categories, Revenue, from, to).subscribe((data: any) => {
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

      this.marketingCampaignsChartServiceService.revenuenewTrendsOption(series, categories, Revenue, from, to).subscribe((data: any) => {
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
  passChartOptioncamp(series, categories, Revenue, from, to, val) {
    if (val == 0) {
      this.marketingCampaignsChartServiceService.revenuenewTrendsOption(series, categories, Revenue, from, to).subscribe((data: any) => {
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
      this.marketingCampaignsChartServiceService.revenuenewTrendsOption(series, categories, Revenue, from, to).subscribe((data: any) => {
        setTimeout(() => {
          Highcharts.setOptions({
            lang: {
              decimalPoint: '.',
              thousandsSep: ','
            }
          });
          let chart = Highcharts.chart('revenue-home-chart-ex', data)
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
    if (this.campaignArray != null && this.campaignArray.length > 0) {
      this.revenuecampEdgeSuitsError = false
      this.campaignChart(this.campaignArray, 0)
    } else {
      this.errorcamInfo = "No data available"
      this.revenuecampEdgeSuitsError = true
    }
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
      this.exportExcelService.downLoadCSVRevenue(this.language.total_audience, data);
    }
  }
  getUpdatedDate(dateArray){
    let latestDate :any = Math.max(...dateArray.map((ele) => new Date(ele.timestamp)));
   return moment(new Date(latestDate)).format("MM/DD/YYYY");
  }

  usageByAppDataForming(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['TIME STAMP']]: el.timestamp, [this.language['total_audience']]: el.totalRevenue == null ? 0 : el.totalRevenue})
    });

    return returnArray;
  }
  download_camp() {
    if (this.campaignArray != null) {
      let data = this.usageByAppDataForming_1(this.campaignArray)
      this.exportExcelService.downLoadCSVRevenue(this.language.Average_revenue, data);
    }
  }

  usageByAppDataForming_1(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['TIME STAMP']]: el.timestamp, [this.language['Average_revenue']]:el.totalRevenue == null ?  (0/parseInt(el.totalSubscribers)) : (parseInt(el.totalRevenue)/parseInt(el.totalSubscribers))})
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
