import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from '../../../services/data.service';
import { HomeChartOptionsService } from '../../../services/home-chart-options.service';
import * as Highcharts from 'highcharts/highstock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribers-impacted',
  templateUrl: './subscribers-impacted.component.html',
  styleUrls: ['./subscribers-impacted.component.scss'],
})
export class SubscribersImpactedComponent implements OnInit {
  Highcharts = Highcharts;
  chartData: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  clickedIndexInShrinkView: number;
  @Input() data: any;
  @Input() chsttype: any;
  @Output() showDataTable = new EventEmitter<any>();
  @Output() barClicked = new EventEmitter<any>();

  constructor(
    private dataService: DataService,
    private chartOptions: HomeChartOptionsService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.loadChart();
      }
    );
  }

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.data) {
      this.loadChart();
    }
  }

  loadChart() {
    let that = this;
    //this.chartDataOptions = this.chartOptions.getSubscriberOptions(this.data, 'Number of Subscribers', true);
    this.chartDataOptions = this.chartOptions.getSubscriberBarOptions(
      this.data,
      'Number of Subscribers',
      true
    );

    if (this.chsttype === 'fullscreen') {
      //change border color of selected bar
      this.setSelectedBarBorder();
      setTimeout(() => {
        this.chartDataOptions.plotOptions.series['point']['events'] = {
          click: (event: any) => {
            event.preventDefault();

            //change border color of selected bar
            let clickedPointIndex = event.point.index;
            event.point.series.data.forEach(function (point) {
              if (point.index === clickedPointIndex) {
                point.update({
                  borderColor: '#A9A9A9',
                  borderWidth: 2,
                });
              } else {
                point.update({
                  borderColor: '',
                });
              }
            });
            that.clickedIndexInShrinkView = event?.point?.index;
            let xAxisValue = event?.point?.category;
            this.showDataTable.emit({
              date: xAxisValue,
              selectedBar: that.clickedIndexInShrinkView,
            });
          },
        };

        this.Highcharts.chart(
          'subscriber-impacted-graph-div1',
          this.chartDataOptions
        );
        this.loading = false;
      }, 100);
    } else {
      setTimeout(() => {
        this.chartDataOptions.plotOptions.series['point']['events'] = {
          click: (event: any) => {
            event.preventDefault();
            
            that.clickedIndexInShrinkView = event?.point?.index;
            let xAxisValue = event?.point?.category;
            this.barClicked.emit({
              date: xAxisValue,
              selectedBar: that.clickedIndexInShrinkView,
            });
            // this.navigateByUrl(event, xAxisValue, 'subscriberDisruption');
          },
        };

        this.Highcharts.chart(
          'subscriber-impacted-graph-div',
          this.chartDataOptions
        );
        this.loading = false;
      }, 1000);
    }
  }
  setSelectedBarBorder() {
    let that = this;
    if (
      that.chartDataOptions.series &&
      that.chartDataOptions.series.length > 0 &&
      that.chartDataOptions.series[0].data &&
      that.chartDataOptions.series[0].data.length > 0
    ) {
      that.chartDataOptions.series[0].data[that.data?.selectedBar] = {
        y: that.chartDataOptions.series[0].data[that.data?.selectedBar],
        borderColor: '#A9A9A9',
        borderWidth: 2,
      };
    }
  }
  // navigateByUrl(data: any, xAxisValue: any, type : any){
  //   let url = ``;
  //   if(type == 'serviceDisruption'){
  //     url = `cco/alerts/system/history-reports`;
  //   }else if(type == 'subscriberDisruption'){
  //     url = `cco/alerts/disruption/list`;
  //   }

  //   this.router.navigate([url]);
  // }
  closeAlert() {}
}
