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
import { recordingStatusAPP } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
import { locations, modifiedApplication, modifiedLocation } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { RecordListComponent } from '../../record-list/record-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TrafficeRealtimeOptionsManagerService } from '../../shared/traffic-realtime-options-manger.service';
import { ApplicationReportsComponent } from '../application-reports/application-reports.component';
import { ApplicationReportApiService } from '../reports/application-report-api.service';
import { Subject, combineLatest, of, throwError } from 'rxjs';
import { RealtimeComponent } from './realtime.component';
import { topEndPointUpChartoptions, topEPData, topLocationsUpChartoptions, topLOCData } from 'src/assets/mockdata/cco/traffic/application/realtime.data';
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
        { path: 'cco/traffic/applications/reports', component: ApplicationReportsComponent },
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
        ApplicationReportApiService,
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
    expect(component.locations[1].name).toMatch("XGS_Manual");
    expect(component.locations[1].name).toEqual(modifiedLocation[0].name);
  });

  it('should get application', () => {
    spyOn(component, 'makeParallelRequest').and.callThrough();
    component.getApps();
    expect(component.makeParallelRequest).toHaveBeenCalled();
  });

  it('should call make Parallel Request', () => {
    spyOn(component, 'combineApps').and.callThrough();
    const observableData = combineLatest([
      of(modifiedApplication)
    ]);
    component.combineLatest = observableData;
    component.urlParams = undefined;
    component.makeParallelRequest();
    expect(component.applications[0]).toEqual(modifiedApplication[0]);
    expect(component.globalApps).toEqual(modifiedApplication);
    expect(component.combineApps).toHaveBeenCalled();
  });

  it('get recording status', () => {
    spyOn(component, 'getRecordDetails').and.callThrough();
    component.applicationsSelected = ['4d34303d-6c09-4437-8328-502db6aad4a5'];
    component.locationsSelected = ['2a8f142b-9157-46d6-8899-5e66f90e82cf'];
    component.orgId = "12221";
    localStorage.setItem("calix.userId", "1sss21daa4");
    component.getRecordingStatus();
    const req = httpTestingController.expectOne(request => request.url === `record/job/status/Recording?orgId=12221&tenentid=0&userId=1sss21daa4`);
    req.flush(recordingStatusAPP);
    expect(component.isNow).toBeFalse();
    expect(component.recordingStatus).toBeTrue();
    expect(component.getRecordDetails).toHaveBeenCalled();
  });

  // it('get get record details', () => {
  //   let id = 2939;
  //   component.getRecordDetails(id);
  //   const req = httpTestingController.expectOne(request => request.url === `record/job/list/2939`);
  //   req.flush(recordDetailsAPP);
  //   let time = new Date().getTime();
  //   expect(component.timeDiff).toEqual(recordDetailsAPP.length - (time - recordDetailsAPP.startTime));
  // });


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

  it('modify current options to full screen', () => {
    spyOn(component, 'makeTEPEvents').and.callThrough();
    spyOn(OptionsService, 'getTopEP').and.returnValue(topEPData)
    component.modifyCurrentOptionsToFS('TEP');
    expect(component.fsChartDetails.topChart).toBe('TEP');
    expect(component.makeTEPEvents).toHaveBeenCalled();
  });

  it('goto full screen', () => {
    spyOn(component, 'modifyCurrentOptionsToFS').and.callThrough();
    spyOn(OptionsService, 'getTopEP').and.returnValue(topEPData);
    component.language = [];
    component.fullscreen('TEP');
    expect(component.fsView).toBeTrue();
    expect(component.fsName).toBe('TEP');
    expect(component.modifyCurrentOptionsToFS).toHaveBeenCalled();
  });

  it('close full screen', () => {
    spyOn(component, 'makeTLOCEvents').and.callThrough();
    spyOn(OptionsService, 'getTopLoc').and.returnValue(topLOCData)
    component.fsName = 'TLOC'
    component.closeFullscreen();
    expect(component.fsView).toBeFalse();
    expect(component.selectedTopLength).toBe(5);
    expect(component.makeTLOCEvents).toHaveBeenCalled();
  });

  it('change top length', () => {
    spyOn(component, 'makeTLOCEvents').and.callThrough();
    spyOn(OptionsService, 'getTopLoc').and.returnValue(topLOCData)
    component.fsName = 'TLOC'
    component.changeTopLength();
    expect(component.makeTLOCEvents).toHaveBeenCalled();
  });

  it('call on ngOnit()', () => {
    spyOn(component, 'getRtData').and.callThrough();
    spyOn(sso, 'getRealtimeDelay').and.returnValue(60000);
    component.ngOnInit();
    expect(component.loading).toBeFalse();
    expect(component.wsDelay).toBe(1);
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
        getCurrentMonitorInfo: () => ({ monitorId: "test@@once" }),
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
      component.applicationsSelected = ["whtasApp", "twitter"];
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
      component.applicationsSelected = ["whtasApp", "twitter"];
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
