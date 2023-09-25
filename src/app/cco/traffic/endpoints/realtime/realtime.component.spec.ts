import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { recordDetailsENP, recordingStatusENP } from 'src/assets/mockdata/cco/traffic/endpoint/realtime.data';
import { RecordListComponent } from '../../record-list/record-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { topAPPData, topAppsUpChartoptions, topEndPointUpChartoptions, topEPData, topLocationsUpChartoptions, topLOCData } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
import { RealtimeComponent } from './realtime.component';

describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;
  let httpTestingController: HttpTestingController;
  let websocketservice: WebsocketService;
  let OptionsService: TrafficeRealtimeOptionsManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealtimeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/record/list', component: RecordListComponent },
        { path: 'cco/traffic/network/realtime', component: RealtimeComponent }
      ]),
      HttpClientTestingModule,
        CommonModule,
        HighchartsChartModule,
        NgSelectModule,
        FormsModule,
        SharedModule,
        CalendarModule],
      providers: [
        TranslateService,
        SsoAuthService,
        WebsocketService,
        TrafficeRealtimeOptionsManagerService,
        NgbModal
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RealtimeComponent);
      httpTestingController = TestBed.inject(HttpTestingController);
      websocketservice = TestBed.inject(WebsocketService);
      OptionsService = TestBed.inject(TrafficeRealtimeOptionsManagerService);
      component = fixture.componentInstance;
    });
  });

  it('get recording status', () => {
    spyOn(component, 'getRecordDetails').and.callThrough();
    component.getRecordingStatus();
    const req = httpTestingController.expectOne(request => {
      return true
    });
    req.flush(recordingStatusENP);
    expect(component.isNow).toBeFalse();
    expect(component.recordingStatus).toBeTrue();
    expect(component.getRecordDetails).toHaveBeenCalled();
  });

  it('get getRecord details', () => {
    let id = 2942;
    component.getRecordDetails(id);
    const req = httpTestingController.expectOne(request => {
      return true
    });
    req.flush(recordDetailsENP);
    expect(component.lastRecordLength).toBe(1800000);
    expect(component.lastRecordStartTime).toBe(1665669184324);
  });


  it('get make TEP Events', () => {
    spyOn(websocketservice, 'calculatePercentage').and.callThrough();
    spyOn(OptionsService, 'makeOptionsForRTBC').and.returnValue(topEndPointUpChartoptions)
    component.fsView = false;  
    component.makeTEPEvents(topEPData);
    expect(component.tEPrcntData.downPercentage).toBe('27.66');
    expect(component.tEPrcntData.upPercentage).toBe('27.65');
    expect(component.tEPData.downData).toEqual(topEPData.downData);
    expect(component.tEPData.upData).toEqual(topEPData.upData);
    expect(component.topEndPointUpChartoptions).toEqual(topEndPointUpChartoptions);
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

  it('modify current options to full screen', () => {
    spyOn(component, 'makeTEPEvents').and.callThrough();
    spyOn(OptionsService, 'getNetworkRealTimeGraphData').and.callThrough();
    component.modifyCurrentOptionsToFS('TEP');
    expect(component.fsChartDetails.topChart).toBe('TEP');
    expect(component.makeTEPEvents).toHaveBeenCalled();
    expect(OptionsService.getNetworkRealTimeGraphData).toHaveBeenCalled();
  });

  it('goto full screen', () => {
    spyOn(component, 'modifyCurrentOptionsToFS').and.callThrough();
    spyOn(component, 'createTopLengthItems').and.callThrough();
    component.fullscreen('TLOC');
    expect(component.fsView).toBeTrue();
    expect(component.fsName).toBe('TLOC');
    expect(component.modifyCurrentOptionsToFS).toHaveBeenCalled();
    expect(component.createTopLengthItems).toHaveBeenCalled();
  });

  it('close full screen', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    spyOn(OptionsService, 'getNetworkRealTimeGraphData').and.callThrough();
    component.fsName = 'TAPP'
    component.closeFullscreen();
    expect(component.fsView).toBeFalse();
    expect(component.selectedTopLength).toBe(5);
    expect(component.makeTAPPEvents).toHaveBeenCalled();
    expect(OptionsService.getNetworkRealTimeGraphData).toHaveBeenCalled();
  });

  it('change top length', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    component.fsName = 'TAPP'
    component.changeTopLength();
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  });

  it('call on ngOnit()', () => {
    spyOn(component, 'getRtData').and.callThrough();
    spyOn(component, 'checkLastSubscriptiontime').and.callThrough();
    component.ngOnInit();
    expect(component.loading).toBeTrue();
    expect(component.getRtData).toHaveBeenCalled();
    expect(component.checkLastSubscriptiontime).toHaveBeenCalled();
  });

});
