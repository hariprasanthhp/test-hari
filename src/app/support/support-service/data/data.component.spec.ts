import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { speedtestconfig, stavailability, devicesummary, latencytestresults, speedtestresults, deviceInfo, runspeedtestresults, runlatencytest } from 'src/assets/mockdata/support/support-service/data/data.service';
import { DataComponent } from './data.component';
import { of, throwError } from 'rxjs';
import Highcharts from 'highcharts';
import { metaData } from 'src/assets/mockdata/support/shared/subscriber-menu.data';
import { errorStatus401, errorStatus404 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { servicestatus, subscriberservicedata } from 'src/assets/mockdata/support/support-service/voice/voice.service';
import { FormsModule } from '@angular/forms';
import { RealtimeComponent } from '../../support-traffic-reports/realtime/realtime.component';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';


describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let ssoService: SsoAuthService;
  let dataservice: DataServiceService;
  let supportWifiService: SupportWifiService;
  let SubscriberId;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/traffic-reports/realtime', component: RealtimeComponent }
        ]),
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule
      ],
      providers: [
        DataServiceService,
        NgbModal,
        TranslateService,
        SsoAuthService,
        SupportWifiService
      ],
    })
      .compileComponents()
      .then(() => {
        dataservice = TestBed.inject(DataServiceService);
        ssoService = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(DataComponent);
        component = fixture.componentInstance;
        SubscriberId = ssoService.getCSCSubscriberId();
        supportWifiService = TestBed.inject(SupportWifiService);
        fixture.detectChanges();
        fixture = TestBed.createComponent(DataComponent);
        component = fixture.componentInstance;
        component.modelName = 'GS4227E'
        component.scopesFlag.runSpeedTestRead = true
        component.speedtestByCountry = true
        component.manufacturer = 'Calix'
        component.speedtestSupported = true
        spyOn(component, 'objectExistence').and.returnValue(5)
        spyOn(ssoService, 'getCscType').and.returnValue(of('EME'))
        fixture.detectChanges();
      });
  });

  it('should initialized onInit()', () => {
    let deviceInfo = [
      {
        "serialNumber": "CXNK01019C7C",
        "macAddress": "b8:94:70:2f:76:82",
        "modelName": "GS2128G",
        "ont": {
          "uuid": "314ab0fd-516b-4f0b-af3e-7f9b8a48676f",
          "serialNumber": "CXNK01019C7C",
          "macAddress": "b8:94:70:2f:76:82",
          "modelName": "GS2128G"
        },
        "deviceId": "CXNK01019C7C",
        "opModeWithOnt": "ONT"
      }
    ]

    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    component.endpointId = 'test';
    component.scopesFlag = {
      trafficReportsRead: true
    }

    component.ssoService.subscriberEndPointId$.next('id');
    component.translateService.selectedLanguage.next({});
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dtOptionStation.pageLength).toBe(10, "Table length is not assigned");
  })

  it('should test ngAfterViewInit()', () => {
    history.pushState({
      isSpeedtest: true,
      islatency: true,
    }, '');
    component.ngAfterViewInit();
  });

  it('ONTipaddressCheck', () => {
    let deviceInfo = [
      {
        "serialNumber": "CXNK01019C7C",
        "macAddress": "b8:94:70:2f:76:82",
        "modelName": "GS2128G",
        "ont": {
          "uuid": "314ab0fd-516b-4f0b-af3e-7f9b8a48676f",
          "serialNumber": "CXNK01019C7C",
          "macAddress": "b8:94:70:2f:76:82",
          "modelName": "GS2128G"
        },
        "deviceId": "CXNK01019C7C",
        "opModeWithOnt": "ONT"
      }
    ]

    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    spyOn(supportWifiService, 'getONTIpaddress').and.returnValue(of({
      "id": "3a009b93-c164-474d-b3ac-02ac72065f55",
      "ipAddress": "10.57.56.25",
      "macAddress": "e4:83:99:5d:03:2a",
      "name": "10.57.56.25",
      "mappedBy": "AXOS",
      "cmAssociationTime": "2023-01-29T15:05:52.129+0000",
      "cmSubscriberKey": "e4:83:99:5d:03:2a",
      "cmSerialNumber": "CXNK01019C7C",
      "cmMappedBy": "AXOS",
      "cmDownstreamMbps": 0,
      "cmUpstreamMbps": 0,
      "cmNetmask": 0,
      "ccServerInfoId": 0,
      "deleted": false,
      "discovered": false,
      "createTime": "2023-01-27T15:01:20.497+0000",
      "updateTime": "2023-01-29T15:05:52.129+0000",
      "orgId": 102,
      "tenantId": 0,
      "aggGroupKey": "e4:83:99:5d:03:2a"
    }))

    component.ONTipaddressCheck();
    fixture.detectChanges();
  })

  // it('should empty data structure', () => {
  //   component.emptyDataStructure();
  // });

  it('should load chart- when API succeeds - case 1', () => {
    component.serialNumberSelected = 'CXNK00FEEEA5';
    dataservice.setMetaData('CXNK00FEEEA5', metaData, false);
    spyOn(dataservice, 'SpeedTestChartOptions').and.returnValue(of(devicesummary))
    component.loadChart();
  });

  it('should load chart- when API succeeds - case 2', () => {
    component.serialNumberSelected = 'CXNK00FEEEA5';
    dataservice.setMetaData('CXNK00FEEEA5', metaData, false);
    spyOn(dataservice, 'SpeedTestChartOptions').and.returnValue(of({
      wanInfo: {
        error: true
      }
    }));
    component.loadChart();
  });

  it('should load chart', () => {
    component.serialNumberSelected = 'CXNK00FEEEA5';
    dataservice.setMetaData('CXNK00FEEEA5', metaData, false);
    spyOn(dataservice, 'SpeedTestChartOptions').and.returnValue(throwError(errorStatus401));
    component.loadChart();
  });

  it('should load bandwidth chart - when API succeeds', fakeAsync(() => {
    spyOn(dataservice, 'RoundedBarChartOptions').and.returnValue(of({}));
    component.loadBandwidthChart('test-endpoint');
    tick(3000);
  }));

  it('should load bandwidth chart - when API succeeds', fakeAsync(() => {
    spyOn(dataservice, 'RoundedBarChartOptions').and.returnValue(of(['test-element']));
    component.loadBandwidthChart('test-endpoint');
    tick(3000);
  }));

  it('should load bandwidth chart - when API fails', fakeAsync(() => {
    spyOn(dataservice, 'RoundedBarChartOptions').and.returnValue(throwError(errorStatus401));
    component.loadBandwidthChart('test-endpoint');
    tick(3000);
  }));



  // it('should filter bandwidth', () => {
  //   let obj = [
  //     {
  //       startPeriodSec: 1234567890,
  //       peakDsRate: 123456,
  //       peakUsRate: 123456,
  //     }
  //   ];
  //   component.filterBandwidth(obj);
  // });

  it('should get meta data - when API succeeds', () => {
    component.serialNumberSelected = true;
    spyOn(dataservice, 'fetchMetaData').and.returnValue(of(metaData));
    component.getMetaData();
  });

  it('should get meta data - when API fails', () => {
    component.serialNumberSelected = true;
    spyOn(dataservice, 'fetchMetaData').and.returnValue(throwError(errorStatus401));
    component.getMetaData();
  });

  it('should select WAN', () => {
    component.wanInfo = [
      {
        Name: 'test-wan',
        Enable: 'test-wan',
        Uptime: 1
      }
    ]
    component.wanSelection(0);

    component.wanInfo[0].Uptime = 0
    component.wanSelection(0);
  });

  it('should test speed - when API succeeds - case 1', () => {
    spyOn(dataservice, 'speedTestPrivPolicy').and.returnValue(of(speedtestconfig))
    component.speedTest(true);
  });

  it('should test speed - when API succeeds - case 2', () => {
    component.isgs = true;
    spyOn(dataservice, 'speedTestPrivPolicy').and.returnValue(of({ ooklaEndpoint: '' }))
    component.speedTest(true);
  });

  it('should test speed - when API fails', () => {
    spyOn(dataservice, 'speedTestPrivPolicy').and.returnValue(throwError(errorStatus401));
    component.speedTest(true);
  });

  // it('should check ookla endpoint - when API fails', () => {
  //   spyOn(dataservice, 'speedTestPrivPolicy').and.returnValue(of({
  //     ooklaApply: true,
  //     ooklaEndpoint: null,
  //     calixnetspeed: 'calix_tr143'
  //   }));
  //   component.ooklaEndpointcheck();
  // });

  // it('should check ookla endpoint - when API fails', () => {
  //   spyOn(dataservice, 'speedTestPrivPolicy').and.returnValue(throwError(errorStatus401));
  //   component.ooklaEndpointcheck();
  // });

  // time limit seems high and has to be fixed
  // it('should test speed test post - when API succeeds', fakeAsync(() => {
  //   spyOn(dataservice, 'speedTest').and.returnValue(of([]));
  //   component.speedTestPost({}, true);
  //   tick(40000);
  // }));

  it('should test speed test post - when API fails -case 1', () => {
    component.serialNumberSelected = 123;
    const errorStatus: any = {
      status: 401,
      statusText: "Unauthorized User",
      ok: false,
      name: "HttpErrorResponse",
      error: {
        errorMessage: `EXOS can not be found in database by fsn(${component.serialNumberSelected})`
      }
    };
    spyOn(dataservice, 'speedTest').and.returnValue(throwError(errorStatus));
    component.speedTestPost({}, true);
  });

  it('should test speed test post - when API fails', () => {
    component.serialNumberSelected = 123;
    const errorStatus: any = {
      status: 401,
      statusText: "Unauthorized User",
      ok: false,
      name: "HttpErrorResponse",
      error: {
        error: `The manual speed test is not available for this country`
      }
    };
    spyOn(dataservice, 'speedTest').and.returnValue(throwError(errorStatus));
    component.speedTestPost({}, true);
  });

  it('should test speed test post - when API fails', () => {
    spyOn(dataservice, 'speedTest').and.returnValue(throwError(errorStatus401));
    component.speedTestPost({}, true);
  });

  it('should test speed test post - when API succeeds', () => {
    spyOn(dataservice, 'speedTestPublicChart').and.returnValue(of([1, 2, 3]));
    component.speedTestChart();
  });

  it('should test speed test post - when API fails', () => {
    spyOn(dataservice, 'speedTestPublicChart').and.returnValue(throwError(errorStatus401));
    component.speedTestChart();
  });

  it('should test latency - when API succeeds - case 1', () => {
    spyOn(dataservice, 'latencyTestChart').and.returnValue(of([
      {
        createTime: 1674027530000
      },
      {
        createTime: 1674027540000
      },
    ]));
    sessionStorage.setItem('defaultLanguage', 'en');
    component.latencyTestChart();
  });

  it('should test latency - when API succeeds - case 2', () => {
    spyOn(dataservice, 'latencyTestChart').and.returnValue(of([
      {
        createTime: 1674027530000,
        packetsSent: 1000,
        packetsReceived: 500
      },
      {
        createTime: 1674027540000,
        packetsSent: 1000,
        packetsReceived: 500
      },
    ]));
    sessionStorage.setItem('defaultLanguage', 'fr');
    component.latencyTestChart();
  });

  it('should test latency', () => {
    spyOn(dataservice, 'latencyTestChart').and.returnValue(throwError(errorStatus401));
    component.latencyTestChart();
  });

  it('should test latency', () => {
    spyOn(dataservice, 'serviceTabInfo').and.returnValue(of({}));
    component.serviceLatest();
  });

  it('should test latency', () => {
    spyOn(dataservice, 'serviceTabInfo').and.returnValue(throwError(errorStatus401));
    component.serviceLatest();
  });

  it('should test latency - when API succeeds', () => {
    spyOn(dataservice, 'latencyTest').and.returnValue(of({}));
    component.latencyTest();
  });

  it('should test latency - when API fails - case 1', () => {
    component.serialNumberSelected = 123;
    let errorStatus = {
      "status": 401,
      "statusText": "Unauthorized User",
      "ok": false,
      "name": "HttpErrorResponse",
      "error": {
        errorMessage: `EXOS can not be found in database by fsn(${component.serialNumberSelected})`
      }
    };

    spyOn(dataservice, 'latencyTest').and.returnValue(throwError(errorStatus));
    component.latencyTest();
  });

  it('should test latency - when API fails - case 2', () => {
    spyOn(dataservice, 'latencyTest').and.returnValue(throwError(errorStatus401));
    component.latencyTest();
  });

  it('should set speed test value', () => {
    sessionStorage.setItem("createTimeofspeedtest", JSON.stringify({ createTimeofspeedtest: "1674027530000" }));
    sessionStorage.setItem('defaultLanguage', 'en');
    ssoService.setServiceDownSpeed(12345);
    component.speedTestValueSetter([
      {
        createTime: 1674027530000
      },
      {
        createTime: 1674027540000
      },
    ]);

    sessionStorage.setItem('defaultLanguage', 'fr');
    ssoService.setServiceDownSpeed(0);
    component.speedTestValueSetter([
      {
        createTime: 1674027530000
      },
      {
        createTime: 1674027540000
      },
    ]);

    component.speedTestValueSetter([]);
  });

  it('should set speed test level', () => {
    sessionStorage.setItem("createTimeofspeedtest", JSON.stringify({ createTimeofspeedtest: "1674027530000" }));
    sessionStorage.setItem('defaultLanguage', 'en');
    component.speedTestLevelSetter([{
      createTime: 1674027530000
    }]);

    sessionStorage.setItem('defaultLanguage', 'fr');
    fixture.detectChanges();
    component.speedTestLevelSetter([{
      createTime: 1674027530000
    }]);
  });

  it('should get L2 Security - when API succeeds', () => {
    spyOn(dataservice, 'getL2SecurityData').and.returnValue(of({}))
    component.getL2Security();
  });

  it('should get L2 Security - when API succeeds', () => {
    spyOn(dataservice, 'getL2SecurityData').and.returnValue(of({
      l2Res: 'test'
    }))
    component.getL2Security();
  });

  it('should get L2 Security - when API fails', () => {
    spyOn(dataservice, 'getL2SecurityData').and.returnValue(throwError(errorStatus401))
    component.getL2Security();
  });

  it('should get speed test availability - when API succeeds', () => {
    spyOn(dataservice, 'getSpeedTestAvailability').and.returnValue(of(stavailability))
    component.speedTestAvailability();
  });

  it('should get speed test availability - when API succeeds', () => {
    spyOn(dataservice, 'getSpeedTestAvailability').and.returnValue(of(stavailability))
    component.modelName = 'test';
    component.speedTestAvailability();
  });

  it('should get speed test availability - when API fails', () => {
    spyOn(dataservice, 'getSpeedTestAvailability').and.returnValue(throwError(errorStatus401))
    component.speedTestAvailability();
  });

  it('should reset base line - when API succeeds', () => {
    spyOn(dataservice, 'resetBaseline').and.returnValue(of({}));
    component.resetBaseline();
  });

  it('should reset base line - when API fails', () => {
    spyOn(dataservice, 'resetBaseline').and.returnValue(throwError(errorStatus401));
    component.resetBaseline();
  });

  it('should load all simple functions', () => {
    component.gotoTraffic();
    component.getDismissReason(0);
    component.getDismissReason(1);
    component.getDismissReason(2);
    component.speedTestOption([1, 2, 3]);
    component.latencyTestOption([1, 2, 3]);
    component.bandWidthUtilOption([1, 2, 3]);
    component.formatBytes(123456);
    component.l2sOptionChange('test');
    component.isSpeedTestAvail();
    component.speedTestDsOption([{
      DUevel: 'test',
      DUVAlue: '123',
    }], '', 'test', 'public');
    component.manufacturer = 'test';
    component.speedTestDsOption([{
      DUevel: 'test',
      DUVAlue: '123',
    }], '', 'test', 'private');

    component.speedTestDsOptiondefaultchart([{
      DUevel: 'test',
      DUVAlue: '123',
    }], '', 'test', 'public');
    component.speedTestDsOptiondefaultchart([{
      DUevel: 'test',
      DUVAlue: '123',
    }], '', 'test', 'private');

    // overview api
    sessionStorage.setItem('responseofoverview', JSON.stringify({
      networkStatus: {
        lastSpeedTestResult: true,
      },
    }));
    component.overviewApi();

    // get scopes
    environment.VALIDATE_SCOPE = 'true';
    let scopes = {
      'cloud.rbac.csc.services.data.trafficreports': ['read', 'write'],
      'cloud.rbac.csc.services.data.speed_test': ['read', 'write'],
      'cloud.rbac.csc.services.data.wan_status': ['read', 'write']
    };
    window.localStorage.setItem('calix.scopes', JSON.stringify(scopes));
    component.getScopes();

    // set table language options
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();

    //page error handler
    component.pageErrorHandle(errorStatus401);
    component.pageErrorHandle(errorStatus404);
    component.getStatusColor();
  });

  it('should show speed progress', fakeAsync(() => {
    component.showSpeedProgress();
    tick(2000);
  }));

  it('should rerender and loadL2Security', fakeAsync(() => {
    component.rerender();
    component.loadL2Security();
    tick(2000);
  }));

  it('should load od filter - when API succeeds - case 1', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    component.manufacturer = 'test';
    spyOn(dataservice, 'speedTestThirdPartyChart').and.returnValue(of(latencytestresults));
    component.odFilter('test');
  });

  it('should load od filter - when API succeeds - case 1', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    component.manufacturer = 'test';
    spyOn(dataservice, 'speedTestThirdPartyChart').and.returnValue(of([]));
    component.odFilter('test');
  });

  it('should load od filter - when API succeeds - case 3', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPublicChart').and.returnValue(of(latencytestresults));
    component.odFilter('test');
  });

  it('should load od filter - when API succeeds - case 4', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPublicChart').and.returnValue(of([]));
    component.odFilter('test');
  });

  it('should load od filter - when API fails - case 1', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    component.manufacturer = 'test';
    spyOn(dataservice, 'speedTestThirdPartyChart').and.returnValue(throwError(errorStatus401));
    component.odFilter('test');
  });

  it('should load od filter - when API fails - case 2', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPublicChart').and.returnValue(throwError(errorStatus401));
    component.odFilter('test');
  });

  it('should load bg filter - when API succeeds - case 1', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPrivateChart').and.returnValue(of(latencytestresults))
    component.bgFilter('test');
  });

  it('should load bg filter - when API succeeds - case 2', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPrivateChart').and.returnValue(of([]))
    component.bgFilter('test');
  });

  it('should load bg filter - when API succeeds - case 3', () => {
    component.modelName = '813G';
    component.bgFilter('test');
  });

  it('should load bg filter - when API fails', () => {
    component.orgId = 50;
    component.serialNumberSelected = '123';
    spyOn(dataservice, 'speedTestPrivateChart').and.returnValue(throwError(errorStatus401))
    component.bgFilter('test');
  });

  // // it('Latency chart working', () => {
  // //   spyOn(component, 'latencyTestChart').and.callThrough();
  // //   spyOn(dataservice, 'latencyTestChart').and.returnValue(of(latencytestresults))
  // //   Highcharts.chart("latencyTestChart", component.latencyTestOption(latencytestresults));
  // //   fixture.detectChanges();
  // // })

  // // it('Speedtestchart working', () => {
  // //   console.log(fixture.debugElement.nativeElement)
  // //   spyOn(dataservice, 'speedTestPublicChart').and.returnValue(of(speedtestresults))
  // //   spyOn(dataservice, 'speedTestPrivateChart').and.returnValue(of(speedtestresults))
  // //   spyOn(component, 'odFilter').and.callThrough();
  // //   spyOn(ssoService, 'supportsGsRg').and.returnValue(of('GS1034'))
  // //   localStorage.setItem('calix.csc_type', 'EME');
  // //   component.odFilter('');
  // //   console.log(fixture.debugElement.nativeElement.querySelector('#speedTestUploadChart'))
  // //   component.avgandwan = false
  // //   fixture.detectChanges();
  // // })


  it('getAllSubsServicesData function', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(of(subscriberservicedata))
    component.getAllSubsServicesData();
    component.allSubsServicesDataSubs = subscriberservicedata;
    component.allSubsServicesData = subscriberservicedata ? subscriberservicedata : {};
    var services = component.allSubsServicesData.services;
    component.dataservice = services[0] ? services[0] : {};;
    component.servicesData = component.dataservice
    component.dataser = component.servicesData?.data;
    component.usoc = component.servicesData?.usoc;
    expect(component).toBeTruthy();
  })

  it('getAllSubsServicesData error case', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(throwError(errorStatus401));
    component.getAllSubsServicesData();
  });

  it('getservicestatus function', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(of(servicestatus))
    component.getservicestatus();
    expect(component).toBeTruthy();
  })

  it('getservicestatus error case', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(throwError(errorStatus401));
    component.getservicestatus();
  });

  it('should check backup WAN Status - when API succeeds', () => {
    component.userid = '0dd0d2da-f565-46af-9126-6e86e4c3fba3';
    let subscriberInfoObj = {
      devices: [{
        bSmbMode: true,
      }],
      isSmbOnboarded: true
    };
    sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify(subscriberInfoObj));
    let response = {
      backupWifis: [{
        ssid: true
      }]
    };
    spyOn(supportWifiService, 'backupwanwifi').and.returnValue(of(response));
    spyOn(supportWifiService, 'backupwanstatus').and.returnValue(of({ running: true }));
    component.checkBackupWanSataus(); // change spelling
  });

  it('should check backup WAN Status - when API fails - case 1', () => {
    let subscriberInfoObj = {
      devices: [{
        bSmbMode: true,
      }],
      isSmbOnboarded: true
    };
    let response = {
      backupWifis: [{
        ssid: true
      }]
    };
    component.userid = '0dd0d2da-f565-46af-9126-6e86e4c3fba3';
    sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify(subscriberInfoObj));
    spyOn(supportWifiService, 'backupwanwifi').and.returnValue(of(response));
    spyOn(supportWifiService, 'backupwanstatus').and.returnValue(throwError(errorStatus401));
    component.checkBackupWanSataus(); // change spelling
  });


  it('should check backup WAN Status - when API fails - case 2', () => {
    component.userid = '0dd0d2da-f565-46af-9126-6e86e4c3fba3';
    let subscriberInfoObj = {
      devices: [{
        bSmbMode: true,
      }],
      isSmbOnboarded: true
    };
    sessionStorage.setItem(`calix.subscriberInfo`, JSON.stringify(subscriberInfoObj));
    spyOn(supportWifiService, 'backupwanwifi').and.returnValue(throwError(errorStatus401));
    component.checkBackupWanSataus(); // change spelling
  });

  it('should check bandwidth tiers - when API succeeds', () => {
    let response = [
      {
        name: 'test',
        tierName: 'test',
      }
    ];
    spyOn(dataservice, 'servicedefinitionsapicall').and.returnValue(of(response));
    spyOn(dataservice, 'bandwidthtiers').and.returnValue(of({}));
    component.bandwidthtiers('test');
  });

  it('should check bandwidth tiers - when API fails - case 1', () => {
    let response = [
      {
        name: 'test',
        tierName: 'test',
      }
    ];
    spyOn(dataservice, 'servicedefinitionsapicall').and.returnValue(of(response));
    spyOn(dataservice, 'bandwidthtiers').and.returnValue(throwError(errorStatus401));
    component.bandwidthtiers('test');
  });

  it('should check bandwidth tiers - when API fails - case 1', () => {
    spyOn(dataservice, 'servicedefinitionsapicall').and.returnValue(throwError(errorStatus401));
    component.bandwidthtiers('test');
  });

});


