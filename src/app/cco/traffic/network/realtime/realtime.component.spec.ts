import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { of, Subject, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { topAPPData, topAppsUpChartoptions, topEndPointUpChartoptions, topEPData, topLocationsUpChartoptions, topLOCData } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
import { recordDetails, recordingStatus } from 'src/assets/mockdata/cco/traffic/network/realtime.data';
import { RecordListComponent } from '../../record-list/record-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { NetworkReportsComponent } from '../network-reports/network-reports.component';
import { RealtimeComponent } from './realtime.component';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;
  let httpTestingController: HttpTestingController;
  let websocketservice: WebsocketService;
  let OptionsService: TrafficeRealtimeOptionsManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RealtimeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/record/list', component: RecordListComponent },
        { path: 'cco/traffic/network/reports', component: NetworkReportsComponent },
        { path: 'cco/traffic/endpoints/realtime', component: RealtimeComponent },
      ]), HttpClientTestingModule,
        CommonModule,
        FormsModule,
        NgSelectModule,
        HighchartsChartModule,
        SharedModule,
        CalendarModule],
      providers: [
        TranslateService,
        SsoAuthService,
        CallOutComeService,
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

  it('get the mapped count', fakeAsync(() => {
    component.getCount();
    const req = httpTestingController.expectOne(request => request.url === `flowendpoint/count?discovered=true&org-id=`);
    req.flush(10);
    const req1 = httpTestingController.expectOne(request => request.url === `flowendpoint/unmapped/count?org-id=&source=true`);
    req1.flush(13);
    flush();
    expect(component.mappedCount).toBe(10);
    expect(component.discoveredCount).toBe(23);
  }));


  it('get recording status', () => {
    spyOn(component, 'getRecordDetails').and.callThrough();
    component.getRecordingStatus();
    const req = httpTestingController.expectOne(request => {
      return true
    });
    req.flush(recordingStatus);
    expect(component.isNow).toBeFalse();
    expect(component.recordingStatus).toBeTrue();
    expect(component.getRecordDetails).toHaveBeenCalled();
  });

  it('get get record details', () => {
    let id = 2883;
    component.getRecordDetails(id);
    const req = httpTestingController.expectOne(request => {
      return true
    });
    req.flush(recordDetails);
    expect(component.lastRecordLength).toBe(1800000);
    expect(component.lastRecordStartTime).toBe(1663850388070);
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
    spyOn(component, 'getCount').and.callThrough();
    spyOn(component, 'getRtData').and.callThrough();
    component.ngOnInit();
    expect(component.loading).toBeTrue();
    expect(component.getCount).toHaveBeenCalled();
    expect(component.getRtData).toHaveBeenCalled();
  });

  it('should change Now And Later', () => {
    //arrange 
    //action
    component.changeNowAndLater();
    //assert
    expect(component.showDate).toBeFalsy();
  });

  it('should get close Alert', () => {
    //arrange 
    //action
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.connectionError).toBeFalsy();
  });

  it('get recording status, else case', () => {
    //arrange
    spyOn((<any>component).http, 'post').and.returnValue(of([]));
    //act
    component.getRecordingStatus();
    //assert
    expect((<any>component).http.post).toHaveBeenCalled();
    expect(component.isNow).toBeTruthy();
    expect(component.recordingStatus).toBeFalsy();
    expect(component.showDate).toBeTruthy();

  });

  it('should create RecordingModal', () => {
    //arrange
    (<any>component).recordingModal = "CreateTrafficRecording";
    component.recordingStatus = true;
    //action
    component.createRecordingModal();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.errorInfo).toEqual("");
    expect(component.recordingName.includes("Network_")).toBeTruthy();
    expect(component.selectedDuration).toEqual("1");
    expect(component.description).toEqual("");
  });
  it('should close', () => {
    //arrange    
    component.modalRef = {
      close: () => { }
    }
    spyOn(component.modalRef, 'close');
    //action
    component.close();
    //assert
    expect(component.btnDisabled).toBeFalsy();
    expect(component.modalRef.close).toHaveBeenCalled();
  });

  it('should create Recording with empty recording name', () => {
    //arrange
    component.isNow = true;
    component.recordingName = "";
    //action
    component.createRecording();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.errorInfo).toEqual('');
    expect(component.isvalid).toBeFalsy();
  });

  it('should create Recording with invalid recording name', () => {
    //arrange
    component.isNow = true;
    component.recordingName = "test recording name test recording name test recording name test recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording name";
    //action
    component.createRecording();
    //assert
    expect(component.isvalid).toBeTruthy();
    expect(component.error).toBeTruthy();
    expect(component.errorInfo).toEqual('Name should not have more than 72 characters');
  });

  it('should create Recording with valid recording name and invalid description', () => {
    //arrange
    component.isNow = true;
    component.recordingName = "test recording name";
    component.description = "test recording name test recording name test recording name test recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording nametest recording name";
    //action
    component.createRecording();
    //assert
    expect(component.isvalid).toBeTruthy();
    expect(component.error).toBeTruthy();
    expect(component.errorInfo).toEqual('Description should not have more than 255 characters ');
  });

  it('should create Recording with valid recording name and description', () => {
    //arrange
    component.isNow = true;
    component.recordingName = "test recording name";
    component.description = "it may test the recording ";
    spyOn(component, 'send');
    (<any>component).websocketservice = {
      recordResponseData$: of('Successfully'),
      recordErrorResponseData$: of({ errorMessage: "error" }),
      listenRecord: () => { },
      clearReplayData: () => { },
      rtData$: new Subject()
    }
    //action
    component.createRecording();
    //assert
    expect(component.isvalid).toBeTruthy();
    expect(component.send).toHaveBeenCalled();
    expect(component.btnDisabled).toBeFalsy();
    expect(component.error).toBeTruthy();
    expect(component.errorInfo).toEqual("error");
  });

  it('should show webSocket ConnectionError', () => {
    //arrange
    (<any>component).websocketservice = {
      rtData$: new Subject(),
      wsConnectionError$: of(true),
      wsNoResponse$: of({ isError: true, type: "error_traffic_LOC" }),
      clearReplayData: () => { }
    }
    //action
    component.webSocketConnectionError();
    //assert
    expect(component.loading).toBeFalsy();
    expect(component.connectionError).toBeTruthy();
    expect(component.connectionErrorInfo);
  });

  it('should reConnect WebSocket', () => {
    //arrange
    spyOn(component, 'send');
    (<any>component).websocketservice = {
      rtData$: new Subject(),
      clearReplayData: () => { },
      connectWS$: of({}),
      WebSocketServer: { hasDisconnectedOnce: true },
      getCurrentMonitorInfo: () => { return { monitorId: "m1" } },
      listen: () => { },
      emit: () => { },
      setWindowLen: () => { }
    };
    //act
    component.reConnectWebSocket();
    //assert
    expect(component.send).toHaveBeenCalled();
  });

  it('should reConnect WebSocket else case', () => {
    //arrange
    spyOn(component, 'getRtData');
    (<any>component).websocketservice = {
      rtData$: new Subject(),
      clearReplayData: () => { },
      connectWS$: of({}),
      WebSocketServer: { hasDisconnectedOnce: true },
      getCurrentMonitorInfo: () => { },
      listen: () => { },
      emit: () => { },
      setWindowLen: () => { }
    };
    //act
    component.reConnectWebSocket();
    //assert
    expect(component.getRtData).toHaveBeenCalled();

  });

  describe('RealtimeComponent', () => {

    beforeEach(() => {
      (<any>component).websocketservice = {
        connectWS$: of({}),
        wsConnectionError$: of(true),
        delay$: of({}),
        rtData$: new Subject(),
        cacheData$: of({}),
        ratePacketStreamData$: new Subject(),
        endPointSearch$: of({}),
        clearReplayData: () => { },
        WebSocketServer: { hasDisconnectedOnce: true },
        getCurrentMonitorInfo: () => { },
        listen: () => { },
        listenRecord: () => { },
        emit: () => { },
        setWindowLen: () => { },
        getWindowLen: () => { },
        setMonitorType: () => { },
        calculatePercentage: () => { },
        previousURL: ""
      };
    });

    it('should apply Filter Or Modal', () => {
      //arrange
      let modal: 'warningModalConfirmation';
      spyOn(component, 'modalOpener');
      sessionStorage.setItem("showSensitiveInfo", "false");
      //act
      component.applyFilterOrModal(true, modal);
      //assert
      expect(component.modalOpener).toHaveBeenCalledWith(modal);
    });

    it('should apply Filter Or Modal-else case', () => {
      //arrange
      let showSensitiveChecked = false;
      let modal: 'warningModalConfirmation';
      sessionStorage.setItem("showSensitiveInfo", "true");
      spyOn(component, 'makeTEPEvents');
      spyOn(component, 'applyFilter');
      component.endpointSensitiveData = { upData: [{ "name": "large-end13", "id": "f7a8a025-9e4b-493e-a393-8fb84892b9be", "value": 787500000 }, { "name": "global-end12", "id": "c906aba4-de28-48f6-812a-f7f1d1d52c24", "value": 54750000 }], downData: [{ "name": "Report_RADIUS", "id": "fe7c207c-9b6d-4311-b00a-74e9f27aa93f", "value": 42749998 }, { "name": "global-end10", "id": "eeb3b3f1-1888-4cbe-b711-e3f9f846b880", "value": 36750000 }] };
      //act
      component.applyFilterOrModal(showSensitiveChecked, modal);
      //assert
      expect(component.makeTEPEvents).toHaveBeenCalledWith(component.endpointSensitiveData);
      expect(component.applyFilter).toHaveBeenCalled();
    });

    it('should confirmShow', () => {
      //arrange
      spyOn((<any>component).callOutComeService, 'Savepasspharseauditlog').and.returnValue(of("success"));
      //act
      component.confirmShow();
      //assert
      expect((<any>component).callOutComeService.Savepasspharseauditlog).toHaveBeenCalled();
      expect(component.loading).toBeFalsy();
    });

    it('should confirmShow,if error response', () => {
      //arrange
      spyOn((<any>component).callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(''));
      //act
      component.confirmShow();
      //assert
      expect(component.error).toBeTruthy();
    });

    it('should make TEPEvents', () => {
      //arrange
      let data = { upData: [{ "name": "large-end13", "id": "f7a8a025-9e4b-493e-a393-8fb84892b9be", "value": 787500000 }, { "name": "global-end12", "id": "c906aba4-de28-48f6-812a-f7f1d1d52c24", "value": 54750000 }], downData: [{ "name": "Report_RADIUS", "id": "fe7c207c-9b6d-4311-b00a-74e9f27aa93f", "value": 42749998 }, { "name": "global-end10", "id": "eeb3b3f1-1888-4cbe-b711-e3f9f846b880", "value": 36750000 }] };
      let testData = JSON.parse(JSON.stringify(data));
      sessionStorage.setItem("showSensitiveInfo", "false");
      //act
      component.makeTEPEvents(data);
      //assert
      expect(component.endpointSensitiveData).toEqual(testData);
      expect(data.upData[0].name).toEqual("la*********");
      expect(data.downData[0].name).toEqual("Re*********");
    });
  });
});
