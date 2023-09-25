import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsChartServiceService } from '../marketing-campaigns-result/marketing-campaigns-chart-service.service';
import { MarketingExploreDataAssignerService } from '../../marketing-explore-data/basic/shared/services/data-assigners.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import * as moment from 'moment';
@Component({
  selector: 'app-marketing-totalsubscriber',
  templateUrl: './marketing-totalsubscriber.component.html',
  styleUrls: ['./marketing-totalsubscriber.component.scss']
})
export class MarketingTotalsubscriberComponent implements OnInit {
  totalRevenue: any
  totalSubscriber: any
  Highcharts = Highcharts;
  deduplicatedDataAvailable: boolean = false
  deduplicatedDataAvailable_sub: boolean = false
  revenueArray: any = []
  subscriberArray: any = []
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
  campaign_id: any
  selectVal = '3'
  fullScreen: boolean = false
  expand: boolean = false
  revenueData: boolean = false
  errorcamInfo: any
  errorcamInfoSubscriber: any
  revenueDataSubscriber: boolean = false;

  constructor(private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCommonService: MarketingCommonService,
    private translateService: TranslateService,
    private exportExcelService: ExportExcelService,
    private marketingCampaignsChartServiceService: MarketingCampaignsChartServiceService,
    private marketingExploreDataAssignerService: MarketingExploreDataAssignerService,) { }

  ngOnInit(): void {
    this.campaign_id = sessionStorage.getItem('id_camp')
    this.chartApiCall(this.selectVal, 0)
    this.chartSubcreibeApiCall(this.selectVal, 0)
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      if (this.chartSubcreibeApiCallFunctionArgs.length) {
        this.chartSubcreibeApiCall(...this.chartSubcreibeApiCallFunctionArgs);
      }
      if (this.chartApiCallFunctionArgs.length) {
        this.chartApiCall(...this.chartApiCallFunctionArgs)
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
    this.activePeriod = this.language.revenue_month.Past_3_months;
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
    this.chartApiCall(this.selectVal, 0)
    this.chartSubcreibeApiCall(this.selectVal, 0)

  }
  chartApiCallFunctionArgs = [];
  chartApiCall(id?, val?) {
    this.chartApiCallFunctionArgs = [id, val]
    let start_date = moment(sessionStorage.getItem('start_date')).format("MM/DD/YYYY")
    let end_date = moment(sessionStorage.getItem('end_date')).format("MM/DD/YYYY")
    let data = this.marketingCampaignsApiService.SubscriberChartSeries(id).subscribe((res: any) => {
      if (res != null) {
        this.revenueData = true
        // this.revenueArray = res.data.filter((v, i, a) => a.findIndex(t => (t.timestamp === v.timestamp)) === i)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].timestamp != null) {
            var formate_date = res.data[i].timestamp.split('T')
            res.data[i].timestamp = moment(formate_date[0]).format("MM/DD/YYYY")
          }
        }
        this.revenueArray = res.data
        let arrRev = []
        let arrzone = []
        let arrTot = []
        let categories = []
        let series = [];
        let total
        let total_val = 0
        if (this.revenueArray) {
          for (var i = 0; i < this.revenueArray.length; i++) {
            total_val += this.revenueArray[i].totalSubscribers
            arrRev.push(this.revenueArray[i].totalSubscribers)
            this.revenueArray[i].timestamp = this.revenueArray[i].timestamp
            categories.push(this.marketingCommonService.formatMonthForRevCampaignChart(this.revenueArray[i].timestamp))
          }
          //this.totalRevenue = arrRev[arrRev.length - 1]
          this.totalRevenue = this.abbreviate_number(parseInt(arrRev[arrRev.length - 1]), 0);

          let last_index = this.revenueArray.length - 1
          let start_index = this.revenueArray.findIndex(x => x.timestamp === start_date);
          let end_index = this.revenueArray.findIndex(x => x.timestamp === end_date);

          let from
          let to

        if (start_index === -1 || end_index === -1) {
            if (start_index === -1) {
              start_index = this.revenueArray.findIndex(x => new Date(x.timestamp).getTime() > new Date(start_date).getTime() && new Date(x.timestamp).getTime() < new Date(end_date).getTime());
            }
            if (end_index === -1) {
              let end_index1 = [...this.revenueArray].reverse().findIndex(x => new Date(x.timestamp).getTime() < new Date(end_date).getTime());
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

          if(this.revenueArray.length == 1){
            from = -1;
            to = -1;
          }else{
          from = start_index;
          to = end_index;
          }
          
          let RevSeriesObject = { name: this.language['Total_Subscribers'], data: arrRev, zoneAxis: 'x', zones: arrzone };
          series.push(RevSeriesObject)
          if (val == 0) {
            this.marketingCampaignsChartServiceService.revenueTrendsOption(series, categories, this.language['Subscribers'], from, to).subscribe((data: any) => {
              setTimeout(() => {
                Highcharts.setOptions({
                  lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                  }
                });
                let chart = Highcharts.chart('subscribe-total-chart', data)
              }, 500);
            })
          } else {
            this.marketingCampaignsChartServiceService.revenueTrendsOption(series, categories, this.language['Subscribers'], from, to).subscribe((data: any) => {
              setTimeout(() => {
                Highcharts.setOptions({
                  lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                  }
                });
                let chart = Highcharts.chart('subscribe-total-chart-ex', data)
              }, 500);
            })
          }
        }
      } else {
        this.revenueData = false
        this.errorcamInfo = "No data available"
      }
    }, (error) => {
      this.revenueData = false
      this.errorcamInfo = "No data available"
    })
  }
  chartSubcreibeApiCallFunctionArgs = []
  chartSubcreibeApiCall(id?, val?) {
    this.chartSubcreibeApiCallFunctionArgs = [id, val];
    let start_date = moment(sessionStorage.getItem('start_date')).format("MM/DD/YYYY")
    let end_date = moment(sessionStorage.getItem('end_date')).format("MM/DD/YYYY")
    this.marketingCampaignsApiService.SubRevChartSeries(id, this.campaign_id).subscribe((res: any) => {
      if (res != null) {
        this.revenueDataSubscriber = true
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].timestamp != null) {
            var formate_date = res.data[i].timestamp.split('T')
            res.data[i].timestamp = moment(formate_date[0]).format("MM/DD/YYYY")
          }
        }
        //  this.subscriberArray = res.data.filter((v, i, a) => a.findIndex(t => (t.timestamp === v.timestamp)) === i)
        this.subscriberArray = res.data
        let arrRev = []
        let arrzone = []
        let arrTot = []
        let arropt = []
        let categories = []
        let series = [];
        let total
        let total_val = 0
        if (this.subscriberArray) {
          for (var i = 0; i < this.subscriberArray.length; i++) {
            total_val += this.subscriberArray[i].totalSubscribers
            arrRev.push(this.subscriberArray[i].totalSubscribers)
            arropt.push(this.subscriberArray[i].totalNonOptOutRevenue)
            this.subscriberArray[i].timestamp = this.subscriberArray[i].timestamp
            categories.push(this.marketingCommonService.formatMonthForRevCampaignChart(this.subscriberArray[i].timestamp))
          }
          //this.totalRevenue = arrRev[arrRev.length - 1]
          this.totalSubscriber = this.abbreviate_number(parseInt(arrRev[arrRev.length - 1]), 0);

          let last_index = this.subscriberArray.length - 1
          let start_index = this.subscriberArray.findIndex(x => x.timestamp === start_date);
          let end_index = this.subscriberArray.findIndex(x => x.timestamp === end_date);

          let from
          let to

        if (start_index === -1 || end_index === -1) {
            if (start_index === -1) {
              start_index = this.subscriberArray.findIndex(x => new Date(x.timestamp).getTime() > new Date(start_date).getTime() && new Date(x.timestamp).getTime() < new Date(end_date).getTime());
            }
            if (end_index === -1) {
              let end_index1 = [...this.subscriberArray].reverse().findIndex(x => new Date(x.timestamp).getTime() < new Date(end_date).getTime());

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

          if(this.subscriberArray.length == 1){
            from = -1;
            to = -1;
          }else{
          from = start_index;
          to = end_index;
          }
          let RevSeriesObject = { name: 'Campaign Subscribers - Not Opted Out', data: arrRev, zoneAxis: 'x', zones: arrzone };
          // let PotenSeriesObject = { name: 'Campaign Subscribers - Not Opted Out', data: arropt, zoneAxis: 'x', zones: arrzone };
          series.push(RevSeriesObject)
          if (val == 0) {
            this.marketingCampaignsChartServiceService.revenueTrendsOption(series, categories, 'Subscribers', from, to).subscribe((data: any) => {
              setTimeout(() => {
                Highcharts.setOptions({
                  lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                  }
                });
                let chart = Highcharts.chart('subscriber-total-chart', data)
              }, 500);
            })
          } else {
            this.marketingCampaignsChartServiceService.revenueTrendsOption(series, categories, this.language['Subscribers'], from, to).subscribe((data: any) => {
              setTimeout(() => {
                Highcharts.setOptions({
                  lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                  }
                });
                let chart = Highcharts.chart('subscriber-total-chart-ex', data)
              }, 500);
            })
          }
        }
      } else {
        this.revenueDataSubscriber = false
        this.errorcamInfoSubscriber = "No data available"
      }
    }, (error) => {
      this.revenueDataSubscriber = false
      this.errorcamInfoSubscriber = "No data available"
    })
  }
  download() {
    if (this.revenueArray != null) {
      let data = this.usageByAppDataForming(this.revenueArray)
      this.exportExcelService.downLoadCSVRevenue(this.language.Total_Subscribers, data);
    }
  }
  downloadSubcriber() {
    if (this.subscriberArray != null) {
      let data = this.usageByAppDataFormingSub(this.subscriberArray)
      this.exportExcelService.downLoadCSVRevenue(this.language.segment_subs, data);
    }
  }
  usageByAppDataForming(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['Total_Subscribers']]: el.totalSubscribers, [this.language['TIME STAMP']]: el.timestamp })
    });

    return returnArray;
  }

  usageByAppDataFormingSub(array, page?: any) {
    let returnArray = [];
    let obj = {}

    let totals = this.getArraySum(array.map(el => el.originalValue));
    array.forEach(el => {
      returnArray.push({ [this.language['SEGMENT SUBSCRIBERS']]: el.totalSubscribers, [this.language['TIME STAMP']]: el.timestamp })
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
  expandFull() {
    this.expand = true
    this.fullScreen = true
    this.deduplicatedDataAvailable = true
    this.deduplicatedDataAvailable_sub = false
    if (this.revenueArray != null && this.revenueArray.length > 0) {
      this.chartApiCall(this.selectVal, 1)
      this.revenueData = true
    } else {
      this.revenueData = false

      //this.revenuecampEdgeSuitsError = true
    }
  }
  expandFullSubcriber() {
    this.expand = true
    this.fullScreen = true
    this.deduplicatedDataAvailable = false
    this.deduplicatedDataAvailable_sub = true
    if (this.subscriberArray != null && this.subscriberArray.length > 0) {
      this.chartSubcreibeApiCall(this.selectVal, 1)
      this.revenueDataSubscriber = true
    } else {
      this.revenueDataSubscriber = false

      //this.revenuecampEdgeSuitsError = true
    }
  }


  expandFull1() {
    this.expand = false
    this.fullScreen = false
    this.deduplicatedDataAvailable = false
    this.deduplicatedDataAvailable_sub = false
    if (this.revenueArray != null && this.revenueArray.length > 0) {
      this.chartApiCall(this.selectVal, 0)
      this.revenueData = true
    } else {
      this.revenueData = false
      this.errorcamInfo = "No data available"
      //this.revenuecampEdgeSuitsError = true
    }
    if (this.subscriberArray != null && this.subscriberArray.length > 0) {
      this.chartSubcreibeApiCall(this.selectVal, 0)
      this.revenueDataSubscriber = true
    } else {
      this.revenueDataSubscriber = false
      this.errorcamInfoSubscriber = "No data available"
      //this.revenuecampEdgeSuitsError = true
    }
  }
  public abbreviate_number = function (num, fixed) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
  }

}
