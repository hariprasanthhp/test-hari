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
import { recordingStatusLOC } from 'src/assets/mockdata/cco/traffic/locaion/realtime.data';
import { locations, modifiedLocation } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { RecordListComponent } from '../../record-list/record-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { LocationReportsComponent } from '../location-reports/location-reports.component';
import { topAPPData, topAppsUpChartoptions, topEndPointUpChartoptions, topEPData, topLocationsUpChartoptions, topLOCData } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
import { RealtimeComponent } from './realtime.component';
import { Subject, of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;
  let httpTestingController: HttpTestingController;
  let websocketservice: WebsocketService;
  let OptionsService: TrafficeRealtimeOptionsManagerService;
  let sso: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RealtimeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/record/list', component: RecordListComponent },
        { path: 'cco/traffic/locations/reports', component: LocationReportsComponent },
        { path: 'cco/traffic/endpoints/realtime', component: RealtimeComponent }
      ]),
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        NgSelectModule,
        HighchartsChartModule,
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
        sso = TestBed.inject(SsoAuthService);
        component = fixture.componentInstance;
      });
  });


  it('should get location', () => {
    component.getLocations();
    const req = httpTestingController.match(request => request.url === `config/location?org-id=`);
    req[0].flush(locations);
    expect(component.locations.length).toEqual(2);
    expect(component.locations[0].name).toMatch("Location-FWU-239-214");
    expect(component.locations[1].name).toEqual(modifiedLocation[0].name);
  });

  it('should get location,error case', () => {
    //arrange
    spyOn((<any>component).http, 'get').and.returnValue(throwError(''));
    //act
    component.getLocations();
    //assert
    expect(component.locations).toEqual([]);
    expect(component.multiLocations).toEqual([]);
    expect(component.locLoading).toBeFalsy();
  });

  it('get recording status', () => {
    spyOn(component, 'getRecordDetails').and.callThrough();
    component.locationsSelected = ['2b779e0d-9abf-46c0-95c8-f5347f758d4a'];
    component.orgId = "122211";
    localStorage.setItem("calix.userId", "1sss21daa9");
    component.getRecordingStatus();
    const req = httpTestingController.expectOne(request => request.url === `record/job/status/Recording?orgId=122211&tenentid=0&userId=1sss21daa9`);
    req.flush(recordingStatusLOC);
    expect(component.isNow).toBeFalse();
    expect(component.recordingStatus).toBeTrue();
    expect(component.getRecordDetails).toHaveBeenCalled();
  });

  it('get  record details', () => {
    //arrange
    spyOn((<any>component).http, 'get').and.returnValue(of({ length: 5, startTime: 1000 }));
    let id = 2934;
    //act
    component.getRecordDetails(id);
    //assert
    expect(component.timeDiff);
  });

  it('get  record details,error response', () => {
    //arrange
    spyOn((<any>component).http, 'get').and.returnValue(throwError(''));
    let id = 2934;
    //act
    component.getRecordDetails(id);
    //assert
    expect(component.timeDiff).toEqual(3600000);
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
    spyOn(OptionsService, 'getTopEP').and.returnValue(topEPData)
    component.modifyCurrentOptionsToFS('TEP');
    expect(component.fsChartDetails.topChart).toBe('TEP');
    expect(component.makeTEPEvents).toHaveBeenCalled();
  });

  it('goto full screen', () => {
    spyOn(component, 'modifyCurrentOptionsToFS').and.callThrough();
    spyOn(OptionsService, 'getTopEP').and.returnValue(topEPData)
    component.fullscreen('TEP');
    expect(component.fsView).toBeTrue();
    expect(component.fsName).toBe('TEP');
    expect(component.modifyCurrentOptionsToFS).toHaveBeenCalled();
  });

  it('close full screen', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    spyOn(OptionsService, 'getTopApp').and.returnValue(topAPPData)
    component.fsName = 'TAPP'
    component.closeFullscreen();
    expect(component.fsView).toBeFalse();
    expect(component.selectedTopLength).toBe(5);
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  });

  it('change top length', () => {
    spyOn(component, 'makeTAPPEvents').and.callThrough();
    spyOn(OptionsService, 'getTopApp').and.returnValue(topAPPData)
    component.fsName = 'TAPP'
    component.changeTopLength();
    expect(component.makeTAPPEvents).toHaveBeenCalled();
  });

  it('call on ngOnit()', () => {
    spyOn(component, 'getRtData').and.callThrough();
    spyOn(sso, 'getRealtimeDelay').and.returnValue(60000);
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.wsDelay).toBe(1);
    expect(component.getRtData).toHaveBeenCalled();
  });

  it('should change  Location', () => {
    //arrange
    (component as any).websocketservice.getCurrentMonitorInfo = () => true;
    component.locationsSelected = ['All', '132wew', '132weq'];
    //action
    component.changeLocation();
    //assert
    expect(component.isCallRemove).toBeTruthy();
    expect(component.isSelectedLocationAll).toBeFalsy();
  });


  it('should change Multiple Location', () => {
    //arrange
    component.locations = [{ value: '132we', name: "locName" }];
    component.multipleLocationsSelected = '132we';
    //action
    component.changeMultipleLocation();
    //assert
    expect(component.multiLocationName).toEqual("locName");
  });

  it('should clear Multiple Chart', () => {
    //arrange
    //action
    component.clearMultipleChart();
    //assert
    expect(component.multipleSelectedOption).toEqual(1);
    expect(component.multipleSelectedTime).toEqual(1);
    expect(component.multipleLocationsSelected).toEqual(null);
    expect(component.multiplePageAvailable).toBeFalsy();
    expect(component.showAlert).toBeFalsy();
    expect(component.loadedMultipleChart).toEqual([]);
    expect(component.metricSelected).toEqual("Rate");
    expect(component.btnDisable).toBeFalsy;
  });

  it('should get navigation By Url', () => {
    //arrange 
    let category = "top app";
    let id = "1w23e1";
    component.isCcoTraffic = false;
    spyOn((<any>component).sso, "setEPRredirectFrom");
    (<any>component).router = {
      url: "/${environment.SYS_ADMIN_ROUTE}/organization-admin/flowAnalyze/traffic/endpoint/realtime",
      navigate: () => { }
    }
    //act
    component.navigationByUrl(category, id, module);
    //assert
    expect((<any>component).sso.setEPRredirectFrom).toHaveBeenCalled();
  });

  it('should get navigation By Url,else case', () => {
    //arrange 
    let category = "top app";
    let id = "1w23e11";
    component.isCcoTraffic = false;
    spyOn((<any>component).sso, "setEPRredirectFrom");
    (<any>component).router = {
      url: "/${environment.SYS_ADMIN_ROUTE}/systemAdministration/flowAnalyze/traffic/endpoint/realtime",
      navigate: () => { }
    }
    //act
    component.navigationByUrl(category, id, module);
    //assert
    expect((<any>component).sso.setEPRredirectFrom).toHaveBeenCalled();
  });

  it('should set Window Length', () => {
    //arrange
    spyOn((<any>component).websocketservice, 'setWindowLen');
    //action
    component.setWindowLength();
    //assert
    expect((<any>component).websocketservice.setWindowLen).toHaveBeenCalledWith(component.selectedOption);
  });

  it('should watch EndPoint Search', () => {
    //arrange
    (<any>component).websocketservice.endPointSearch$ = of(10);
    spyOn(component, 'searchEndPoint');
    //action
    component.watchEPSearch();
    //assert
    expect(component.searchEndPoint).toHaveBeenCalledWith(10);
  });

  it('should search EndPoint for UpData ', () => {
    //arrange
    let value = 20;
    component.tepUpDataObj[value] = 20;
    spyOn((<any>component).websocketservice, "setEndPointSearchError")
    spyOn((<any>component).websocketservice, "setEndpointValue")
    //action
    component.searchEndPoint(value);
    //assert
    expect((<any>component).websocketservice.setEndPointSearchError).toHaveBeenCalledWith(false);
    expect((<any>component).websocketservice.setEndpointValue).toHaveBeenCalledWith(20);
  });

  it('should search EndPoint for DownData ', () => {
    //arrange
    let value = 200;
    component.tepDownDataObj[value] = 200;
    spyOn((<any>component).websocketservice, "setEndPointSearchError")
    spyOn((<any>component).websocketservice, "setEndpointValue")
    //action
    component.searchEndPoint(value);
    //assert
    expect((<any>component).websocketservice.setEndPointSearchError).toHaveBeenCalledWith(false);
    expect((<any>component).websocketservice.setEndpointValue).toHaveBeenCalledWith(200);
  });

  it('should search EndPoint without Data ', () => {
    //arrange
    let value = '';
    spyOn((<any>component).websocketservice, "setEndPointSearchError")
    //action
    component.searchEndPoint(value);
    //assert
    expect((<any>component).websocketservice.setEndPointSearchError).toHaveBeenCalledWith(true);
  });

  it('should set Multiple ', () => {
    //arrange
    component.isMultiple = true;
    //action
    component.setMultiple();
    //assert
    expect(component.isMultiple).toBeFalsy();
  });

  it('should get Multiple Chart Value ', () => {
    //arrange
    //action
    component.getMultipleChartValue();
    //assert
  });

  it('should load Multiple Chart with showAlert ', () => {
    //arrange
    component.multipleSelectedTime = 3;
    component.multipleLocationsSelected = '';
    //action
    component.loadMultipleChart();
    //assert
    expect(component.showAlert).toBeTruthy();
  });

  it('should load Multiple Chart', () => {
    //arrange
    component.multipleSelectedTime = 3;
    component.multipleLocationsSelected = '123w32wss1';
    component.metricSelected = 'Rate';
    component.loadedMultipleChart = [{ monitorId: "123w32wss1", Type: "Rate", selectedTime: 3, }];
    //action
    component.loadMultipleChart();
    //assert
    expect(component.showAlert).toBeFalsy();
    expect(component.multiplePageAvailable).toBeTruthy();
    expect(component.btnDisabled).toBeFalsy();
  });

  it('should load Multiple Chart without duplicate loc', () => {
    //arrange
    component.multipleSelectedTime = 33;
    component.multipleLocationsSelected = '123w32wss';
    component.metricSelected = 'Rate';
    let IsDuplicate = false;
    component.loadedMultipleChart = [{ monitorId: "123w32wss1", Type: "Rate", selectedTime: 1 }, { monitorId: "123w32wss2", Type: "Rate", selectedTime: 1 }, { monitorId: "123w32ws1", Type: "Rate", selectedTime: 2 }, { monitorId: "123w3wss1", Type: "Rate", selectedTime: 9 }, { monitorId: "123w42wss1", Type: "Rate", selectedTime: 8 }, { monitorId: "23w32wss1", Type: "Rate", selectedTime: 7 }, { monitorId: "123w32wss15", Type: "Rate", selectedTime: 6 }, { monitorId: "3123w32wss1", Type: "Rate", selectedTime: 5 }, { monitorId: "113w32wss1", Type: "Rate", selectedTime: 4 }];
    //action
    component.loadMultipleChart();
    //assert
    expect(component.showAlert).toBeFalsy();
    expect(component.multiplePageAvailable).toBeTruthy();
    expect(component.btnDisabled).toBeFalsy();
  });

  it('should clear ChartContainer', () => {
    //arrange
    let values = [{ monitorId: "123w32w", Type: "Rate", Position: 2 }];
    component.loadedMultipleChart = [{ monitorId: "123w32w", Type: "Rate", Position: 2 }];
    //action
    component.clearChartContainer(values);
    //assert
    expect(component.btnDisabled).toBeFalsy();
  });

  it('should go To RecordingList', () => {
    //arrange
    component.isCcoTraffic = false;
    let redirectUrl = "/${environment.SYS_ADMIN_ROUTE}/systemAdministration/flowAnalyze/traffic/location/realtime";
    (<any>component).router = {
      url: "/${environment.SYS_ADMIN_ROUTE}/systemAdministration/flowAnalyze/recording/list",
      navigate: () => { }
    }
    //act
    component.goToRecordingList();
    //assert
  });

  it('should go To RecordingList,else case', () => {
    //arrange
    component.isCcoTraffic = true;
    let redirectUrl = "/${environment.SYS_ADMIN_ROUTE}/organization-admin/flowAnalyze/traffic/location/realtime";
    (<any>component).router = {
      url: "/${environment.SYS_ADMIN_ROUTE}/organization-admin/flowAnalyze/recording/list",
      navigate: () => { }
    }
    //act
    component.goToRecordingList();
    //assert
  });

  it('should get recording status, else case', () => {
    //arrange
    component.locationsSelected = ["loc"];
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
    expect(component.recordingName.includes("Location_")).toBeTruthy();
    expect(component.selectedDuration).toEqual("1");
    expect(component.description).toEqual("");
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
    component.locationsSelected = ["loc"];
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
    component.locationsSelected = ["loc"];
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
    component.locationsSelected = ["loc"];
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
    component.locationsSelected = ["loc"];
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

  it('should reConnect WebSocket', () => {
    //arrange
    spyOn(component, 'getRtData').and.returnValue();
    spyOn(component, 'send');
    component.locationsSelected = ['loca'];
    (<any>component).websocketservice = {
      connectWS$: of({}),
      rtData$: new Subject(),
      getCurrentMonitorInfo: () => { return { startTime: "1000" } },
      clearReplayData: () => { },
      listen: () => { },
      emit: () => { },
      setWindowLen: () => { }
    };
    //act
    component.reConnectWebSocket();
    //assert
    expect(component.send).toHaveBeenCalled();
    expect(component.getRtData).toHaveBeenCalled();
  });

  it('should show webSocket ConnectionError', () => {
    //arrange
    (<any>component).websocketservice = {
      wsConnectionError$: of(true),
      wsNoResponse$: of({ isError: true, type: "error_traffic_LOC" }),
      clearReplayData: () => { },
      rtData$: new Subject()
    }
    //action
    component.webSocketConnectionError();
    //assert
    expect(component.loading).toBeFalsy();
    expect(component.connectionError).toBeTruthy();
    expect(component.connectionErrorInfo);
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
      component.locationsSelected = ["texas", "colombia"];
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
      component.locationsSelected = ["texas", "colombia"];
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


