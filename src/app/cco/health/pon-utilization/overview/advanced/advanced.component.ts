import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { HealthService } from '../../../service/health.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  language: any = {};
  languageSubject;
  fullScreenChartName: string = '';
  fullScreen: boolean = false;
  showUtilization: boolean = false;
  chartTitle = 'Number of PON\'s';

  categories: any = ['G141', 'G555', 'R01002', 'G140'];
  Utilizationcategories: any = ['1/1/xp1', '1/2/xp2', '1/3/xp3', '1/4/xp4'];
  Packetcategories: any = ['1/1/xp1', '1/2/xp2', '1/3/xp3', '1/4/xp4'];
  value: number = 8;
  options: Options = {
    floor: 1,
    ceil: 8,
    translate: (value: number, label: LabelType): string => {
      console.log(value)
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
  constructor(private translateService: TranslateService,
    private healthService: HealthService,
    private exportExcelService: ExportExcelService) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.chartTitle = this.language.Number_of_PONs
      this.loadCharts();
    });
  }

  ngOnInit(): void {
    this.loadCharts();
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  chartOptions(xAxisValue): any {
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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
      },

      yAxis: {
        title: {
          text: this.chartTitle
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: this.chartData()
    };
  }

  utilizationChartOptions(xAxisValue): any {
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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
        title: {
          text: "Pon Ports"
        },
      },

      yAxis: {
        title: {
          text: "Percentage"
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: [
        {
          name: "Up Stream",
          data: [1000, 900, 800, 700]
        },
        {
          name: "Down Stream",
          data: [1000, 900, 800, 700]
        },
      ]
    };
  }

  packetDroppedChartOptions(xAxisValue): any {
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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
      },

      yAxis: {
        title: {
          text: "Dropped Count"
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: this.chartData()
    };
  }

  packetDroppedPonChartOptions(xAxisValue): any {

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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
        title: {
          text: "Pon Ports"
        },
      },

      yAxis: {
        title: {
          text: "Bytes"
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: [
        {
          name: "Up Stream",
          data: [1000, 900, 800, 700]
        },
        {
          name: "Down Stream",
          data: [1000, 900, 800, 700]
        },
      ]
    };
  }

  BIPErrorRateChartOptions(xAxisValue): any {

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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
      },

      yAxis: {
        title: {
          text: "BIP Error Count"
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: this.chartData()
    };
  }

  portCountChartOptions(xAxisValue): any {

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
      title: false,
      xAxis: {
        categories: xAxisValue,
        scrollbar: {
          enabled: true
        },
      },

      yAxis: {
        title: {
          text: "Count"
        },
        gridLineWidth: 1
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0;margin-left:10px"><b>{point.y:.1f}  Mbs</b></td></tr>',
        footerFormat: '</table>',
        followPointer: true,
        shared: true
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },

      series: this.chartData()
    };
  }

  loadCharts() {
    Highcharts.chart('PacketDroppedAdvanceChart', this.packetDroppedChartOptions(this.categories || []));
    Highcharts.chart('BIPErrorRateAdvanceChart', this.BIPErrorRateChartOptions(this.categories || []));
    Highcharts.chart('PortCourtAdvanceChart', this.portCountChartOptions(this.categories || []));
    if (this.showUtilization) {
      setTimeout(() => {
        Highcharts.chart('UtilizationAdvanceChart', this.utilizationChartOptions(this.Utilizationcategories || []));
        Highcharts.chart('PacketDroppedPonAdvanceChart', this.packetDroppedPonChartOptions(this.categories || []));
      }, 1000);
    }
  }

  downloadFunction(chartName: string, idName?: string) {
    let id = idName + "DownloadSection"
    $(id).addClass('spinnershow');
    let data = this.healthService.chartDataFraming(this.chartData());
    let fname = this.healthService.generateDownloadName(chartName);
    if (this.chartData()) {
      setTimeout(() => {
        $(id).removeClass('spinnershow');
      }, 1000);
    }
    this.exportExcelService.downLoadCSV(fname, data);
  }

  fullScreenExpandFunction(chartName: string) {
    this.fullScreen = true;
    this.fullScreenChartName = chartName;
    Highcharts.chart('fullScreenAdvanceChart', this.chartOptions(this.categories || []));
  }

  fullScreenInvertFunction() {
    this.fullScreen = false;
    this.loadCharts();
  }

  chartData() {
    let value = [
      {
        name: "Region",
        data: [1000, 900, 800, 700]
      },
      // {
      //   name: this.language.Upstream,
      //   data: [1500, 1400, 1300, 1200, 1100, 1000]
      // }
    ];
    return value;
  }

  change() {
    this.showUtilization = !this.showUtilization;
    if (this.showUtilization) {
      setTimeout(() => {
        Highcharts.chart('UtilizationAdvanceChart', this.utilizationChartOptions(this.Utilizationcategories || []));
        Highcharts.chart('PacketDroppedPonAdvanceChart', this.packetDroppedPonChartOptions(this.Packetcategories || []));
      }, 1000);
    }
  }

}
