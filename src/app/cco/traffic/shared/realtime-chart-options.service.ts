import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { FaUtilsService } from 'src/app/support/support-traffic-reports/service/fa-utils.service';


@Injectable({
  providedIn: 'root'
})
export class RealtimeChartOptionsService {
  language: any;
  constructor(
    private dateUtils: DateUtilsService,
    private excel: ExportExcelService,
    private utils: FaUtilsService,
    private customTranslateService: CustomTranslateService
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  makeOptionsForRTBC(data: any, type: any, dataType?: any, sliceNum?: any): any {
    let that = this;
    sliceNum = sliceNum ? sliceNum : 5;
    let categories = [];
    let seriesData1 = [];

    let options: any = {
      chart: {
        type: 'bar',
        zoomType: "xy",
        height: 180,
        renderTo: 'container'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'none'
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        opposite: true,
        tickLength: 2,
        labels: {
          // style: {
          //   textOverflow: 'none'
          // },
          formatter: function () {
            let ret = `${that.utils.bitsToSize(this.value, true)}`
            return ret;
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          color: '#E87B00',
          cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: [],
      tooltip: {
        formatter: function () {
          let ret = `${this.x} <br/> ${that.utils.bitsToSize(this.y, false)}`
          return ret;
        }
      },
    };
    let xData = [], ids = [];
    if (type === 'bar') {
      if (dataType === 'upData') {
        data.upData = data.upData.slice(0, sliceNum);
        for (let i = 0; i < data.upData.length; i++) {
          categories.push(data.upData[i].name);
          seriesData1.push(data.upData[i].value);
          xData.push(data.upData[i].name);
          ids.push(data.upData[i].id);
        }
      } else {
        data.downData = data.downData.slice(0, sliceNum);
        for (let i = 0; i < data.downData.length; i++) {
          categories.push(data.downData[i].name);
          seriesData1.push(data.downData[i].value);
          xData.push(data.downData[i].name);
          ids.push(data.downData[i].id);
        }
      }
      options.series = [{
        data: seriesData1,
        // xData: xData,
        // id: ids
      }];
    }
    options.xAxis['categories'] = categories;
    return options;
  }

  convertDate(ts) {
    var date = new Date(ts);
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }

  public setTopEP(data: any) {
    if (data) {
      localStorage.setItem('calix.topep_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.topep_data');
    }
  }

  public getTopEP() {
    return localStorage.getItem('calix.topep_data') ? JSON.parse(localStorage.getItem('calix.topep_data')) : [];
  }

  public setTopApp(data: any) {
    if (data) {
      localStorage.setItem('calix.topapp_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.topapp_data');
    }
  }

  public getTopApp() {
    return localStorage.getItem('calix.topapp_data') ? JSON.parse(localStorage.getItem('calix.topapp_data')) : [];
  }

  public setTopLoc(data: any) {
    if (data) {
      localStorage.setItem('calix.toploc_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.toploc_data');
    }
  }

  public getTopLoc() {
    return localStorage.getItem('calix.toploc_data') ? JSON.parse(localStorage.getItem('calix.toploc_data')) : [];
  }

  getStackedUnit(m) {
    let unit: any;
    if (m > 1099511627776) {
      unit = [1099511627776, 'TB'];
    } else if (m > 1073741824) {
      unit = [1073741824, 'GB'];
    } else if (m > 1048576) {
      unit = [1048576, 'MB'];
    } else if (m > 1024) {
      unit = [1024, 'KB'];
    } else {
      unit = [1, ''];
    }
    return unit;
  }

}
