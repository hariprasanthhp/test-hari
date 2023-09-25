import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { topAPPData, topAppsUpChartoptions, topEndPointUpChartoptions, topEPData, topLocationsUpChartoptions, topLOCData } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
import { barchartData, downloadUrl, recordDetails } from 'src/assets/mockdata/cco/traffic/recording/record.data';
import { WebsocketService } from '../../shared/services/websocket.service';
import { RealtimeComponent } from '../endpoints/realtime/realtime.component';
import { RecordListComponent } from '../record-list/record-list.component';
import { TrafficeRealtimeOptionsManagerService } from '../shared/traffic-realtime-options-manger.service';
import { RecordViewComponent } from './record-view.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RecordViewComponent', () => {
  let component: RecordViewComponent;
  let fixture: ComponentFixture<RecordViewComponent>;
  let dateUtilsService: DateUtilsService;
  let websocketservice: WebsocketService;
  let OptionsService: TrafficeRealtimeOptionsManagerService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordViewComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/record/list', component: RecordListComponent },
        { path: 'cco/traffic/endpoints/realtime', component: RealtimeComponent },
      ]),
        HttpClientTestingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        DataTablesModule,
        NgxSliderModule],
      providers: [
        TranslateService,
        SsoAuthService,
        CommonService,
        WebsocketService,
        DateUtilsService,
        TrafficeRealtimeOptionsManagerService,
        CommonFunctionsService
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RecordViewComponent);
        dateUtilsService = TestBed.inject(DateUtilsService);
        websocketservice = TestBed.inject(WebsocketService);
        OptionsService = TestBed.inject(TrafficeRealtimeOptionsManagerService);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('component initialized', () => {
    spyOn(dateUtilsService, 'convertSecondsToTime').and.callThrough();
    component.ngOnInit();
    expect(component.topLengths.length).toBe(1);
    expect(dateUtilsService.convertSecondsToTime).toHaveBeenCalled();
  });

  it('goto full screen', () => {
    spyOn(component, 'modifyCurrentOptionsToFS').and.callThrough();
    spyOn(component, 'gettepData').and.returnValue(topEPData)
    component.fullscreen('TEP');
    expect(component.fsView).toBeTrue();
    expect(component.fsName).toBe('TEP');
    expect(component.modifyCurrentOptionsToFS).toHaveBeenCalled();
  });

  it('close full screen', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    spyOn(component, 'gettapData').and.returnValue(topAPPData)
    component.fsName = 'TAPP'
    component.closeFullscreen();
    expect(component.fsView).toBeFalse();
    expect(component.selectedTopLength).toBe(5);
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  });

  it('modify current options to fs', () => {
    spyOn(component, 'makeTLOCEvents').and.callThrough();
    spyOn(component, 'gettlocData').and.returnValue(topLOCData)
    component.modifyCurrentOptionsToFS('TLOC');
    expect(component.fsChartDetails.topChart).toBe('TLOC');
    expect(component.makeTLOCEvents).toHaveBeenCalled();
  });

  it('check slider event', fakeAsync(() => {
    spyOn(component, 'startBarChartTimer').and.callThrough();
    spyOn(dateUtilsService, 'convertSecondsToTime').and.callThrough();
    component.sliderEvent();
    expect(component.playedTimeStr).toBe('02:00:00');
    expect(dateUtilsService.convertSecondsToTime).toHaveBeenCalled();
    setTimeout(() => {
      expect(component.startBarChartTimer).toHaveBeenCalled();
    }, 500)
    flush();
  }));

  it('play video', () => {
    spyOn(component, 'startBarChartTimer').and.callThrough();
    component.playVideo();
    expect(component.play).toBeTrue();
    expect(component.reload).toBeTrue();
    expect(component.startBarChartTimer).toHaveBeenCalled();
  });

  it('pause video', () => {
    spyOn(component, 'stopBarChartTimer').and.callThrough();
    component.pauseVideo();
    expect(component.play).toBeFalse();
    expect(component.stopBarChartTimer).toHaveBeenCalled();
  });

  it('get make TEP Events', () => {
    sessionStorage.setItem("showSensitiveInfo", "false");
    spyOn(websocketservice, 'calculatePercentage').and.callThrough();
    spyOn(OptionsService, 'makeOptionsForRTBC').and.returnValue(topEndPointUpChartoptions)
    component.fsView = false;
    component.makeTEPEvents(topEPData);
    expect(component.tEPrcntData.downPercentage).toBe('27.66');
    expect(component.tEPrcntData.upPercentage).toBe('27.65');
    expect(component.tEPData.downData[0].name).toEqual("wa*********");
    expect(component.tEPData.upData[2].name).toEqual("CX*********");
    expect(component.topEndPointUpChartoptions).toEqual(topEndPointUpChartoptions);
  }); 

  it('get make LOC Events', () => {
    spyOn(websocketservice, 'calculatePercentage').and.callThrough();
    spyOn(OptionsService, 'makeOptionsForRTBC').and.returnValue(topLocationsUpChartoptions)
    component.fsView = false;
    component.makeTLOCEvents(topLOCData);
    expect(component.tLPrcntData.downPercentage).toBe('22.13');
    expect(component.tLPrcntData.upPercentage).toBe('22.12');
    expect(component.tLData.downData).toEqual(topLOCData.downData);
    expect(component.tLData.upData).toEqual(topLOCData.upData);
    expect(component.topLocationsUpChartoptions).toEqual(topLocationsUpChartoptions);
  });

  it('get make APP Events', () => {
    spyOn(websocketservice, 'calculatePercentage').and.callThrough();
    spyOn(OptionsService, 'makeOptionsForRTBC').and.returnValue(topAppsUpChartoptions)
    component.fsView = false;
    component.makeTAPPEvents(topAPPData);
    expect(component.tAPrcntData.downPercentage).toBe('99.57');
    expect(component.tAPrcntData.upPercentage).toBe('99.52');
    expect(component.tAData.downData).toEqual(topAPPData.downData);
    expect(component.tAData.upData).toEqual(topAPPData.upData);
    expect(component.topAppsUpChartoptions).toEqual(topAppsUpChartoptions);
  });

  it('change top length', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    spyOn(component, 'gettapData').and.returnValue(topAPPData)
    component.changeTopLength("TAPP");
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  });

  it('should get endpoint details', () => {
    component.getData();
    const req = httpTestingController.expectOne(request => {
      console.log(request.url)
      return true;
    });
    req.flush(recordDetails);
    expect(component.recordInfo).toEqual(recordDetails);
    expect(component.traffic.endpoints).toBeTrue();
    expect(component.traffic.locations).toBeFalse();
  })

  it('process Other GT', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    component.barChartData = barchartData;
    component.play = false;
    component.showRealTime = true;
    component.playedTime = undefined;
    component.processOtherGT();
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  })

  // it('get recordData by Id', () => {
  //   component.getRecordDataById();
  //   const req = httpTestingController.expectOne(request => {
  //     console.log(request.url)
  //     return true;
  //   });
  //   req.flush(downloadUrl);
  // })

});
