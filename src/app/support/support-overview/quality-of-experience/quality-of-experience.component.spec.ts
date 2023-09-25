import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import * as Highcharts from 'highcharts';
import { of, throwError } from 'rxjs';
import * as moment from 'moment';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { chartqoe, clienteffvalue, clienteffvalue1, devicemock, getAverageScore, qoeobj, qoescoremock, qoescoremock1, qoescoremock2, qoescoremock3, qoescoremock4, qoescoremock5, qoescoremock6, qoescoremock7, rebootAndUpgradeEventMock, subInfo, summaryDataGet15Mins, summarymock7Days, wanshow, wholehome } from 'src/assets/mockdata/support/overview/quality-of-experience';
import { DataServiceService } from '../../data.service';
import { SharedModule } from '../../shared/shared.module';
import { DeviceService } from '../../support-device/service/device.service';
import { IssuesService } from '../services/issues.service';

import { QualityOfExperienceComponent } from './quality-of-experience.component';
import { By } from '@angular/platform-browser';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { EnglishJSON } from 'src/assets/language/english.service';

describe('QualityOfExperienceComponent', () => {
  let component: QualityOfExperienceComponent;
  let fixture: ComponentFixture<QualityOfExperienceComponent>;
  let issueservice: IssuesService;
  let trustservice: DataServiceService;
  let languageservice: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityOfExperienceComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        HighchartsChartModule,
        NgSelectModule,
        CalendarModule,
        SharedModule, FormsModule, ReactiveFormsModule, NgxSliderModule],
      providers: [TranslateService, DataServiceService, SsoAuthService, DeviceService, IssuesService]
    })
      .compileComponents()
      .then(() => {
        trustservice = TestBed.inject(DataServiceService);
        issueservice = TestBed.inject(IssuesService);
        languageservice = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(QualityOfExperienceComponent);
        component = fixture.componentInstance;
        component.showQOE = true;
        component.MODULE = 'support';
        let eng = new EnglishJSON;
        languageservice?.selectedLanguage.next(of(eng));


        sessionStorage.setItem(`calix.deviceData`, JSON.stringify([{ "_id": "470053-487746-CXNK00778D46", "serialNumber": "CXNK00778D46", "macAddress": "48:77:46:9a:06:9f", "registrationId": "", "ipAddress": "192.168.1.66", "modelName": "GS4227E", "softwareVersion": "22.3.500.451", "opMode": "RG", "manufacturer": "Calix", "pppUsername": "", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "deviceId": "CXNK00778D46", "opModeWithOnt": "RG" }]))
        fixture.detectChanges();
      });
  });


  it('should initialized QOE chart', () => {
    spyOn(issueservice, 'rebootAndUpgradeEvent').and.returnValue(of(rebootAndUpgradeEventMock));
    spyOn(component, 'loadChart').and.callThrough();
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    let eng = new EnglishJSON;
    languageservice?.selectedLanguage.next(of(eng));
    component.orgId = window.localStorage.setItem('calix.org_id', '470053');
    component.loadChart();
    // component.ngAfterViewInit();
    expect(component.TimeFrame).toMatch('2');
    fixture.detectChanges();

  })


  it('clearFilter', () => {
    component.clearFilter();
    fixture.detectChanges();
  })

  it('setMinMax', () => {
    component.setMinMax(6);
    fixture.detectChanges();
  })

  it('setMinMax', () => {
    component.setMinMax(5);
    fixture.detectChanges();
  })


  it('Qoe working', () => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    spyOn(component, 'qoeChartOption').and.callThrough();
    let chartOption = component.qoeChartOption(chartqoe);
    expect(component.TimeFrame).toMatch('2');
    // expect(chartOption.yAxis.title.text).toEqual('QoE Score');
    fixture.detectChanges();
  })

  it('wan service working', fakeAsync(() => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    spyOn(component, 'wanService').and.callThrough();
    let chartOption = component.wanService(chartqoe);
    tick(1000);
    Highcharts.chart("wanServiceChart", component.wanService(chartqoe));
    expect(component.TimeFrame).toMatch('2');
    // expect(chartOption.yAxis[0].title.text).toEqual('Health');
    fixture.detectChanges();
    flush(2000);
    discardPeriodicTasks();
  }))

  it('wan continuity working', fakeAsync(() => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    spyOn(component, 'wanContinuity').and.callThrough();
    let chartOption = component.wanContinuity(chartqoe, wanshow);
    tick(1000);
    Highcharts.chart("wanContinuityChart", component.wanContinuity(chartqoe, wanshow));
    expect(component.TimeFrame).toMatch('2');
    // expect(chartOption.yAxis[0].title.text).toEqual('Status');
    fixture.detectChanges();
    flush(2000);
    discardPeriodicTasks();
  }))

  it('wholeHomeEfficiency working', fakeAsync(() => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    spyOn(component, 'wholeHomeEfficiencyOption').and.callThrough();
    //spyOn(component, 'mapWholeHomeEfficencyChartData').and.callThrough();
    let chartOption = component.wholeHomeEfficiencyOption(wholehome);
    tick(1000);
    Highcharts.chart("wholeHomeEfficiencyChart", component.wholeHomeEfficiencyOption(wholehome));
    //expect(component.mapWholeHomeEfficencyChartData).toHaveBeenCalled();
    expect(component.TimeFrame).toMatch('2');
    // expect(chartOption.yAxis.title.text).toEqual('Efficiency Score (%)');
    flush(2000);
    discardPeriodicTasks();
  }))

  it('clientEfficiencyChartPopup working', () => {
    sessionStorage.setItem('calix.deviceData', JSON.stringify(qoeobj));
    languageservice.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    let average = 79;
    spyOn(issueservice, 'getAverageScore').and.returnValue(of(getAverageScore));
    spyOn(component, 'clientEfficiencyChartPopup').and.callThrough();
    let chartOption = component.clientEfficiencyChartPopup(getAverageScore, average);
    expect(component.TimeFrame).toMatch('2');
    // expect(chartOption.yAxis[0].title.text).toEqual('Device Efficiency (%)');
    fixture.detectChanges();
  })

  it('reload working', () => {
    component.reload();
    component.handleUserTime();
  })

  // it('handleUserTime', fakeAsync(() => {
  //   spyOn(component, 'loadChart').and.callThrough();
  //   component.handleUserTime();
  //   setTimeout(() => {
  //     expect(component.loadChart()).toHaveBeenCalled();
  //   }, 3000)
  //   flush(2500);
  // }) )

  it('ng onint', () => {
    spyOn(issueservice, 'rebootAndUpgradeEvent').and.returnValue(of(getAverageScore));
    component.ngOnInit();
    sessionStorage.setItem('calix.deviceData', JSON.stringify(devicemock));
    fixture.detectChanges();
  })

  it('startTimeUpdate', () => {
    component.TimeFrame = 4;
    component.startDate = new Date();
    component.startTimeUpdate();
    component.endTimeUpdate();
    fixture.detectChanges();
  })

  it('onTimeFrameChange', () => {
    component.TimeFrame = 4;
    component.onTimeFrameChange(component.TimeFrame);
    component.onTimeFrameChange(6);
    component.onTimeFrameChange(2);
    fixture.detectChanges();
  })

  it('dayUpdate', () => {
    component.dayUpdate();
    fixture.detectChanges();
  })

  it('sliderEvent', fakeAsync(() => {
    component.sliderEvent();
    component.TimeFrame == 6;
    component.loadChart();
    tick(1000);
    flush();
    // fixture.detectChanges();
  }))

  it('sliderEvent', () => {
    component.WeekFrame = 1;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 2;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 3;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 4;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 5;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 6;
    component.dropDownchangeweek();
    fixture.detectChanges();
    component.WeekFrame = 7;
    component.dropDownchangeweek();
    fixture.detectChanges();
  })

  it('dropDownchange', () => {
    component.TimeFrame = 6;
    component.dropDownchange();
    component.lastdays15MinOfValues();
    fixture.detectChanges();
    component.TimeFrame = 4;
    component.dropDownchange();
    component.lastdays15MinOfValues();
    fixture.detectChanges();
  })

  it('loadChart', fakeAsync(() => {
    spyOn(issueservice, 'getQoeSummary').and.returnValue(of(chartqoe));
    component.loadChart();
    tick(1000);
    Highcharts.chart("qoeScoreChart", component.qoeChartOption(chartqoe));
    Highcharts.chart("wanServiceChart", component.wanService(chartqoe));
    Highcharts.chart("wanContinuityChart", component.wanContinuity(chartqoe, wanshow));
    Highcharts.chart("wholeHomeEfficiencyChart", component.wholeHomeEfficiencyOption(wholehome));
    fixture.detectChanges();
    flush(2000);
    discardPeriodicTasks();
  }))

  it('loadChartError', fakeAsync(() => {
    spyOn(issueservice, 'getQoeSummary').and.returnValue(throwError(errorStatus401));
    component.loadChart();
    component.summaryData = [];
    component.loader = false;
    tick(1000);
    flush();
    discardPeriodicTasks();
  }))



  it('loadSlider', () => {
    spyOn(issueservice, 'getQoeSummary').and.callThrough();
    component.loadSlider();
    component.loader = false;
    fixture.detectChanges();
  })

  it('loadSliderError', () => {
    spyOn(issueservice, 'getQoeSummary').and.returnValue(throwError(errorStatus401));
    component.loadSlider();
    component.loader = false;
    fixture.detectChanges();
  })

  it('timeForFilter', () => {
    let startTime = new Date();
    let endTime = new Date();
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 1;
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 3;
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 4
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 5;
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 6;
    component.timeForFilter(startTime, endTime);
    fixture.detectChanges();
  })

  it('averageTimeSetter', () => {
    let startTime = new Date();
    let endTime = new Date();
    component.averageTimeSetter(startTime, endTime);
    component.averageTimeSetterNew(startTime, endTime);
    fixture.detectChanges();
    component.TimeFrame = 1;
    component.averageTimeSetterNew(startTime, endTime);
    fixture.detectChanges();
  })


  it('roundOffDate', () => {
    let startTime = new Date();
    let endTime = new Date();
    component.roundOffDate(startTime, endTime);
    fixture.detectChanges();
  })

  it('clickToGet15Mins', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 3;
    component.clickToGet15Mins(qoescoremock);
    fixture.detectChanges();
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock1);
    tick(4500);
    flush();
  }))

  it('clickToGet15Mins2', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock2);
    tick(4500);
    flush();
  }))

  it('clickToGet15Mins3', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock3);
    tick(4500);
    flush();
  }))

  it('clickToGet15Mins4', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock4);
    tick(4500);
    flush();
  }))


  it('clickToGet15Mins5', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock5);
    tick(4500);
    flush();
  }))

  it('clickToGet15Mins6', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock6);
    tick(4500);
    flush();
  }))

  it('clickToGet15Mins7', fakeAsync(() => {
    component.summaryData = summaryDataGet15Mins;
    component.TimeFrame = 1;
    component.TimeFrame == 4;
    component.clickToGet15Mins(qoescoremock7);
    tick(5500);
    flush();
  }))


  it('clientEfficiency', () => {
    spyOn(issueservice, 'getAverageScore').and.returnValue(of(getAverageScore));
    component.clientEfficiency(clienteffvalue);
    fixture.detectChanges();
  })

  it('endForFilter', () => {
    component.TimeFrame = 1;
    component.endForFilter();
    fixture.detectChanges();
    component.TimeFrame = 2;
    component.endForFilter();
    fixture.detectChanges();
    component.TimeFrame = 3;
    component.endForFilter();
    fixture.detectChanges();
    component.TimeFrame = 5;
    component.endForFilter();
    fixture.detectChanges();
  })
  it('periodForWeekFrame', () => {
    component.WeekFrame = 1;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 2;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 3;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 4;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 5;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 6;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
    component.WeekFrame = 7;
    component.periodForWeekFrame(1);
    fixture.detectChanges();
  })
  it('periodForFilter', () => {
    component.TimeFrame = 1;
    component.periodForFilter(2);
    fixture.detectChanges();
    component.TimeFrame = 2;
    component.periodForFilter(2);
    fixture.detectChanges();
    component.TimeFrame = 3;
    component.periodForFilter(2);
    fixture.detectChanges();
    component.TimeFrame = 4;
    component.periodForFilter(2);
    fixture.detectChanges();
    component.TimeFrame = 5;
    component.periodForFilter(2);
    fixture.detectChanges();
    component.TimeFrame = 6;
    component.periodForFilter(2);
    fixture.detectChanges();
  })


  it('downfallCalc', () => {
    component.downfallCalc(wanshow, chartqoe, 2);
    fixture.detectChanges();
  })

  it('showClientEfficencyChart1', () => {
    component.TimeFrame = 4;
    component.showClientEfficencyChart(clienteffvalue);
    fixture.detectChanges();
  })
  it('showClientEfficencyChart2', () => {
    component.showClientEfficencyChart(clienteffvalue);
    fixture.detectChanges();
  })
  it('showClientEfficencyChart3', () => {
    component.TimeFrame = 1;
    component.showClientEfficencyChart(clienteffvalue1);
    fixture.detectChanges();
  })

  it('pageErrorHandle', () => {
    component.pageErrorHandle(errorStatus401);
    fixture.detectChanges();
  })
  it('qoeCheck', () => {
    component.qoeCheck();
    fixture.detectChanges();
  })
  it('getScopes', () => {
    component.getScopes();
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues1', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 1;
    component.lastdays15MinOfValues();
    setTimeout(() => {
      component.showIntervalSlider = true;
    }, 1000)
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues2', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 2;
    component.lastdays15MinOfValues();
    setTimeout(() => {
      component.showIntervalSlider = true;
    }, 1000)
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues3', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 3;
    component.lastdays15MinOfValues();
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues4', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 4;
    component.lastdays15MinOfValues();
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues5', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 5;
    component.lastdays15MinOfValues();
    setTimeout(() => {
      component.showIntervalSlider = true;
    }, 1000)
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues6', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 6;
    component.lastdays15MinOfValues();
    setTimeout(() => {
      component.showIntervalSlider = true;
    }, 1000)
    fixture.detectChanges();
  })
  it('lastdays15MinOfValues7', () => {
    component.TimeFrame = 4;
    component.WeekFrame = 7;
    component.lastdays15MinOfValues();
    setTimeout(() => {
      component.showIntervalSlider = true;
    }, 1000)
    fixture.detectChanges();
  })
  it('filterContent', () => {
    component.filterContent(1, "serviceGood");
    component.TimeFrame == 1;
    Highcharts.chart("qoeScoreChart", component.qoeChartOption(chartqoe));
    fixture.detectChanges();
  })
  it('filterContent', () => {
    component.filterContent(2, "serviceGood");
    component.TimeFrame == 1;
    Highcharts.chart("qoeScoreChart", component.qoeChartOption(chartqoe));
    fixture.detectChanges();
  })
  it('filterContent', () => {
    component.filterContent(3, "serviceGood");
    component.TimeFrame == 1;
    Highcharts.chart("qoeScoreChart", component.qoeChartOption(chartqoe));
    fixture.detectChanges();
  })
  it('filterContent', () => {
    component.filterContent(4, "serviceGood");
    component.TimeFrame == 1;
    Highcharts.chart("qoeScoreChart", component.qoeChartOption(chartqoe));
    fixture.detectChanges();
  })

  it('close', fakeAsync(() => {
    component.modalRef = component.dialogService.open(component.clientEfficencyChartTest);
    component.close();
    tick(1000);
    flush();
  }))


});
