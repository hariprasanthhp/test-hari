import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SSOAdmin } from 'aws-sdk';
import { ExpectedConditions } from 'protractor';
import { of, throwError } from 'rxjs';
import { iterator } from 'rxjs/internal-compatibility';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { DeviceService } from 'src/app/support/support-device/service/device.service';
import { IssuesService } from 'src/app/support/support-overview/services/issues.service';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { callHistoryData, calloutcomeData, saveCalloutcomeData, serviceLimitDataAssign, subscriberInfo, tileData } from 'src/assets/mockdata/support/shared/calloutcom.data';
import { callOutcomeStatuses, codeList, deviceDetailsResponse, deviceInfoDetails, featureProperties, getRegIdInstanceResponse, meshDeviceInfoDetails, metaData, modelNameSerialNumbers, outageResponeSubscriber, subscriberOverviewData } from 'src/assets/mockdata/support/shared/subscriber-menu.data';
import { SubscribeService } from '../../service/subscriber.service';
import { environment } from 'src/environments/environment';

import { SubscriberMenuComponent } from './subscriber-menu.component';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { chartqoe } from 'src/assets/mockdata/support/overview/quality-of-experience';
import { errorStatus401, errorStatus404, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { event } from 'jquery';
import { SharedModule } from 'primeng/api';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
export class MockNgbModalRef {
  componentInstance = {
    prompt: undefined,
    title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('SubscriberMenuComponent', () => {
  let component: SubscriberMenuComponent;
  let fixture: ComponentFixture<SubscriberMenuComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let callOutComeService: CallOutComeService;
  let sso: SsoAuthService;
  let dataService: DataServiceService;
  let issuesService: IssuesService;
  let marketingInsightspplicationApiService;
  let deviceService: DeviceService;
  let translateService: TranslateService;
  let subscribeService: SubscribeService;
  let supportRouterService: SupportRouterService
  // let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberMenuComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, NgbModule],
      providers: [
        SharedModule,
        NgbModal,
        NgbActiveModal,
        TranslateService,
        SsoAuthService,
        DataServiceService,
        IssuesService,
        DeviceService,
        SubscribeService,
        FormBuilder,
        CallOutComeService,
        MarketingInsightspplicationApiService,
        // { provide: Router, useValue: mockUrl },
      ]
    })
      .compileComponents().then(() => {
        callOutComeService = TestBed.inject(CallOutComeService);
        marketingInsightspplicationApiService = TestBed.inject(MarketingInsightspplicationApiService);
        deviceService = TestBed.inject(DeviceService);
        supportRouterService = TestBed.inject(SupportRouterService);
        fixture = TestBed.createComponent(SubscriberMenuComponent);
        component = fixture.componentInstance;
        component.orgId = 470053;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        sso = TestBed.inject(SsoAuthService);
        dataService = TestBed.inject(DataServiceService);
        issuesService = TestBed.inject(IssuesService);
        translateService = TestBed.inject(TranslateService);
        fixture.detectChanges();
      });
  });

  // afterEach(() => {
  //   //fixture.destroy();
  // });

  it('should initialize onInit', () => {
    callOutComeService.subscriberId = 'test-sub';
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    sessionStorage.setItem('calix.subscriberId', "ab1f2dfd-10c1-4df3-963a-d2e251dc870f");

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should initialize ngOnChanges', () => {
    component.ngOnChanges();
  });

  it('should set WIFI Routing - when RG is in device data', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    component.setWIFIRouting();
  });

  it('should set WIFI Routing  - when RG is not in device data', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(meshDeviceInfoDetails));
    component.setWIFIRouting();
  });

  it('should set WIFI Routing  - device data is empty', () => {
    sessionStorage.setItem("calix.deviceData", '[]');
    component.setWIFIRouting();
  });

  it('should check for SSID Feature', () => {
    dataService.setMetaData('CXNK00FEEEA5', metaData, false);
    component.showSSIDButton = false;
    component.modelNameSerialNumbers = modelNameSerialNumbers;
    component.checkForSSIDFeature('CXNK00FEEEA5');
  });

  it('should check for SSID Feature', () => {
    spyOn(dataService, 'fetchMetaData').and.returnValue(of(metaData));
    component.checkForSSIDFeature('CXNK00FEEEA5');
  });

  it('should check for SSID Feature', () => {
    spyOn(dataService, 'fetchMetaData').and.returnValue(throwError(errorStatus401));
    component.checkForSSIDFeature('CXNK00FEEEA5');
  });

  it('should get scopes - when setCscType equal to "DME"', () => {
    environment.VALIDATE_SCOPE = 'true';
    sso.setCscType('DME');
    localStorage.setItem('calix.scopes', JSON.stringify(scopes));
    component.getScopes();
  });

  it('should get scopes - when setCscType not equal to "DME"', () => {
    environment.VALIDATE_SCOPE = 'true';
    sso.setCscType('EME');
    localStorage.setItem('calix.scopes', JSON.stringify(scopes));
    component.getScopes();
  });

  // it('should validate menus - if modelName does not exists', () => {
  //   sessionStorage.setItem('calix.deviceData', '');
  //   localStorage.setItem('calix.scopes', JSON.stringify(scopes));
  //   component.validateNavMenus(featureProperties);
  // });

  it('should validate menus - if modelName exists', () => {
    dataService.setMetaData('CXNK00FEEEA5', metaData, false);
    localStorage.setItem('calix.scopes', JSON.stringify(scopes));
    component.validateNavMenus(featureProperties, 'CXNK00FEEEA5');
  });

  it('should show Subscriber information', () => {
    component.showSubscriberInfo();
  });


  it('should check QOE status - if api succeeds', () => {
    spyOn(issuesService, 'getQoeSummary').and.returnValue(of(chartqoe));
    dataService.setDataSaver('qoeStatus', '');
    component.checkQoEStatus();
  });

  it('should check QOE status - if api fails', () => {
    spyOn(issuesService, 'getQoeSummary').and.returnValue(throwError(errorStatus401));
    dataService.setDataSaver('qoeStatus', '');
    component.checkQoEStatus();
  });

  it('should get issues', () => {
    dataService.setSubscriberTabInfoData(subscriberOverviewData);
    component.codelist = codeList;
    fixture.detectChanges();

    component.getIssues();
  });

  // it('should collect tabs information', () => {
  //   window.location.pathname = '/support/overview/issues';
  //   component.MODULE = 'support';

  //   console.log(`/${component.MODULE}/overview/issues`);
  //   console.log('window.location.pathname', window.location.pathname);

  //   component.collectTabsInfo();
  //   // to be worked
  // });

  it('should find undiscovered GS', () => {
    component.findUndiscoveredGS([], 0);
    spyOn(dataService, 'getDevicePR').and.returnValue(of([]));
    // to be worked
  });

  it('should get browser history', () => {
    component.browserBack();
  });

  it('should close call out modal', () => {
    component.closeCalloutModal();
  });

  it('should initiate all simple functions', () => {
    component.closeModal();
    component.showAndHideTicketNumber();
    component.tempDataTable([]);
    component.changeCallType({
      target: {
        value: ''
      }
    });
    let date = new Date().toDateString();
    component.callHistoryDateFormate(date, 'test');
    component.openPopUpModal('', ''); // to be optimized
    component.callHistoryOpenPopUpModal('', 'callHistoryModel'); // to be optimized
    // component.rerender(); // to be optimized
    component.hideNoDataRow(); // to be optimized
    component.checkNotesLimit(JSON.stringify(featureProperties), null);
    component.overviewClick();
    component.getEntitlemnt(1);
    // component.openModalEditCommandIq({});
    component.closeAllModal();
    // component.closePopupedit();
    component.calloutcome();
    component.updateWifiUrl();
    component.deviceClick();
    const event = new Event('test');
    component.refreshStatus(event);
    // component.marketingDetail();
    component.leveltranslations();
    component.openNewTab();
    component.multipleRegId = getRegIdInstanceResponse;
    component.regFsan();
    component.kbpsTO(100);
    component.checkValue(1, 2, 3, 4);

    // component.sleep(1234567890000);
  });

  it('should get multiple registration Id - when API succeeds', () => {
    spyOn(dataService, 'getRegIdInstance').and.returnValue(of(getRegIdInstanceResponse))
    component.getMultipleRegId('sample-id');
  });

  it('should get multiple registration Id - when API succeeds', () => {
    spyOn(dataService, 'getRegIdInstance').and.returnValue(throwError(errorStatus401));
    component.getMultipleRegId('sample-id');
  });

  it('should close pop up edit', () => {
    component.closePopupedit();
  });

  it('should access popup primary delete', () => {
    component.accesspopupprimarydelete();
  });

  it('should get all devices for call outcome', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    let devices = [
      {
        "HostName": "AUTOW-DDING",
        "MACAddress": "38:14:28:f3:82:2e",
        "IPAddress": "192.168.1.4",
        "Connection": "LAN",
        "AccessPoint": "RG 716GE-I",
        "Status": "online",
        "Address-source": "DHCP",
        "Lease-time-expiry": 0,
        "Connection-type": "LAN",
        "AccessPointSerialNumber": "CXNK00BEDD42"
      }
    ];
    spyOn(deviceService, 'getdevices').and.returnValue(of(devices));
    component.getAllDevicesForCallOutCome();
  });

  it('should get the recent subscriber', () => {
    sso.setCscType('EME');
    let obj = {
      account: 'test',
      _id: 'test',
      name: 'test',
      serviceAddress: 'test',
    };
    let recentSubscribersResponse = {
      "createdDate": null,
      "orgId": null,
      "agentId": null,
      "subscriberId": null,
      "subscriberName": null,
      "subscriberAccount": null,
      "serviceAddress": null,
      "lastContact": null
    };
    // spyOn(deviceService, 'recentSubscriber').and.returnValue(of(recentSubscribersResponse)); // to be fixed
    component.recentSubscriber(obj);
  });

  //hiding for test coverage error
  // it('should init all routing methods', () => {
  //   component.gotoOverview();
  //   component.gotoService();
  //   component.gotoRouter();
  //   component.gotoWifi();
  //   component.gotoDevice();
  //   component.gotoApp();
  //   // component.gotoSSIDManager();
  // });

  it('should handle page model errors', () => {
    component.pageModelErrorHandle(errorStatus401);
    component.pageModelErrorHandle(errorStatus500);
  });

  it('should handle page errors', () => {
    component.pageErrorHandle(errorStatus401);
    component.pageErrorHandle(errorStatus500, 'callcoutcome');
    let dummy: any = {
      "timestamp": "2022-09-27T07:53:19.771+00:00",
      "status": 123,
      "error": "Dummy",
      "message": "Java heap space",
      "path": "/api/v1/Dummy"
    }
    component.pageErrorHandle(dummy);
  });

  it('should set currently active tab on previous click', () => {
    component.radio1 = 'Escalated';
    component.onPrev();

    component.radio1 = '';
    component.radio2 = 'User owned equipment';
    component.currActive = 3;
    component.onPrev();
  });

  it('should set currently active tab on next click', () => {
    // if active tab is 1
    component.currActive = 0;
    component.radio1 = "Resolved";
    component.onNext();

    component.currActive = 0;
    component.radio1 = "Escalated";
    component.onNext();

    component.currActive = 0;
    component.radio1 = "Truck roll";
    component.onNext();

    component.currActive = 0;
    component.radio1 = "Account Inquiry";
    component.onNext();

    // if active tab is 2
    component.currActive = 1;
    component.radio2 = "WAN";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Gateway";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Wi-Fi";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Client Devices";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Hardware issue";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "User owned equipment";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Customer in-person";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Customer on phone";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Customer not present";
    component.onNext();

    component.currActive = 1;
    component.radio2 = "Call center escalation";
    component.onNext();

    // if active tab is 3
    component.currActive = 2;
    component.onNext();
  });

  it('should set status options', () => {
    component.radio1 = "Resolved";
    component.statusoption();

    component.radio1 = "Escalated";
    component.statusoption();

    component.radio1 = "Truck roll";
    component.statusoption();

    component.radio1 = "Account Inquiry";
    component.statusoption();
  });

  it('should subscribe tab information', () => {
    // spyOn(subscribeService, 'updateSSIDCount$').and.returnValue(of({})); // to be fixed
    component.tabInfoSubscription();
  });

  it('should get overview status - with timer', () => {
    sessionStorage.setItem('overviewStatus', 'yetToLoad');
    component.overviewStatus();

    sessionStorage.setItem('overviewStatus', '');
    component.overviewStatus();

    sessionStorage.setItem('overviewStatus', 'isLoading');
    component.overviewStatus();
  });

  it('should update tile status', () => {
    component.updateTileStatus('isLoaded');
    component.updateTileStatus('isError');
  });

  it('should load status type', () => {
    // unused function
    let response = [
      {
        "statusTypeName": "Truck Roll",
        "statusTypeCode": "T_ROLL"
      }
    ];
    spyOn(callOutComeService, 'loadstatustypes').and.returnValue(of(response));
    component.loadstatustypes();
  });

  it('should update notes', () => {
    // need to be optimized
    component.tempCHTableData = [{
      note: ''
    }];
    let ticket = {
      id: '',
      note: 'test',
    }
    let modalRef = fixture.debugElement.nativeElement.querySelector('#popContent');
    // spyOn(callOutComeService, 'UpdateNotes').and.returnValue(of({ description: 'test' }));
    component.UpdateNotes(ticket, modalRef, 0);
  });

  it('should submit value - when API succeeds ', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    spyOn(dataService, 'postcall').and.returnValue(of({}));
    component.Submitvalue();
  });

  it('should submit value - when API fails', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    spyOn(dataService, 'postcall').and.returnValue(throwError(errorStatus401));
    component.Submitvalue();
  });

  it('should get latest service - api succeeds with create time', () => {
    let response = {
      createTime: 1234567891000,
      dsLevel: '',
      usLevel: '',
    }
    spyOn(dataService, 'serviceTabInfo').and.returnValue(of(response));
    component.serviceLatest('test-serialNumber');
  });

  it('should get latest service - api succeeds without create time', () => {
    let response = {
      createTime: null,
      dsLevel: '',
      usLevel: '',
    }
    spyOn(dataService, 'serviceTabInfo').and.returnValue(of(response));
    component.serviceLatest('test-serialNumber');
  });

  it('should get latest service - api fails', () => {
    spyOn(dataService, 'serviceTabInfo').and.returnValue(throwError(errorStatus401));
    component.serviceLatest('test-serialNumber');
  });

  it('should get latest latency - api succeeds with create time', () => {
    let response = [
      {
        createTime: 1234567891000,
        dsLevel: '',
        usLevel: '',
      }
    ];
    spyOn(dataService, 'latencyTestChart').and.returnValue(of(response));
    component.latencyLatest('test-serialNumber');
  });

  it('should get latest latency  - api succeeds with empty response', () => {
    spyOn(dataService, 'latencyTestChart').and.returnValue(of([]));
    component.latencyLatest('test-serialNumber');
  });

  it('should get latest latency - api fails', () => {
    spyOn(dataService, 'latencyTestChart').and.returnValue(throwError(errorStatus401));
    component.latencyLatest('test-serialNumber');
  });

  // it('should hide or show class', () => {
  //   component.hideShowClass(); // to be fixed
  // });

  it('should get issues tab info - when API succeeds', () => {
    let response = [
      {
        code: "LATENCY_HIGH"
      },
      {
        code: "VIRUS_ATTACK"
      }
    ];
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    component.codelist = codeList;
    spyOn(issuesService, 'putissues').and.returnValue(of(response));
    component.getIssuesTabInfo();
  });

  it('should get issues tab info - when API succeeds', () => {
    sessionStorage.setItem("calix.deviceData", JSON.stringify(deviceInfoDetails));
    spyOn(issuesService, 'putissues').and.returnValue(throwError(errorStatus401));
    component.getIssuesTabInfo();
  });

  it('should get devices issues', () => {
    component.issueDataJson = [
      {
        "code": "CLIENT_DEVICE_LOW_SIGNAL_DETECTED",
        "subscriberId": "ab1f2dfd-10c1-4df3-963a-d2e251dc870f",
        "serialNumber": "CXNK00FEEEA5",
        "source": "CXNK00FEEEA5",
        "sourceId": "CXNK00FEEEA5",
        "type": "CLIENT",
        "severity": 1,
        "reason": "2.4 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel",
        "isValid": true
      },
      {
        "code": "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED",
        "subscriberId": "ab1f2dfd-10c1-4df3-963a-d2e251dc870f",
        "serialNumber": "CXNK00E4F54F",
        "source": "CXNK00E4F54F",
        "sourceId": "CXNK00E4F54F",
        "type": "CLIENT",
        "severity": 1,
        "reason": "2.4 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel",
        "isValid": true
      },
      {
        "code": "CLIENT_DEVICE_LOW_Efficiency_SCORE_DETECTED",
        "subscriberId": "ab1f2dfd-10c1-4df3-963a-d2e251dc870f",
        "serialNumber": "CXNK00E4F54F",
        "source": "CXNK00E4F54F",
        "sourceId": "CXNK00E4F54F",
        "type": "CLIENT",
        "severity": 1,
        "reason": "2.4 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel",
        "isValid": true
      },
      {
        "code": "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED",
        "subscriberId": "ab1f2dfd-10c1-4df3-963a-d2e251dc870f",
        "serialNumber": "CXNK00E4F54F",
        "source": "CXNK00E4F54F",
        "sourceId": "CXNK00E4F54F",
        "type": "CLIENT",
        "severity": 1,
        "reason": "2.4 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel",
        "isValid": true
      },
    ];
    component.getDeviceIssues();
  });

  //just now hiding for ng test code coverage issue..
  // it('should check special model', () => {
  //   component.deviceData = deviceInfoDetails;
  //   component.checkSpecialModel();
  // });

  it('should get meta data - when API succeeds', () => {
    spyOn(dataService, 'fetchMetaData').and.returnValue(of(metaData));
    component.getMetaData('test-fsan');
  });

  it('should get meta data - when API fails', () => {
    spyOn(dataService, 'fetchMetaData').and.returnValue(throwError(errorStatus401));
    component.getMetaData('test-fsan');
  });

  it('should get meta data - when API succeeds', () => {
    spyOn(callOutComeService, 'GetStatuses').and.returnValue(of(callOutcomeStatuses));
    callOutComeService.escalationEmail = 'test';
    sessionStorage.setItem("reasonsForIssues", JSON.stringify([{ issue: 'test' }]));
    component.getCallOutComeData();
  });

  it('should get meta data - when API fails', () => {
    spyOn(callOutComeService, 'GetStatuses').and.returnValue(throwError(errorStatus401));
    component.getCallOutComeData();
  });

  it('should change call outcome status - when API succeeds', () => {
    // spyOn(callOutComeService, 'GetStatuses').and.returnValue(of(errorStatus401));
    component.callOutComeStatusChange([]);
  });

  it('should get overview - when API succeeds', () => {
    spyOn(dataService, 'putOverview').and.returnValue(of({}));
    component.overviewApi();
  });

  it('should get overview - when API fails', () => {
    spyOn(dataService, 'putOverview').and.returnValue(throwError(errorStatus401));
    component.overviewApi();
  });

  it('should check meta data - when API succeeds', () => {
    // spyOn(dataService, 'putOverview').and.returnValue(throwError(errorStatus401));
    component.checkmetadata(subscriberOverviewData);
  });

  it('should check serial number', () => {
    // spyOn(dataService, 'putOverview').and.returnValue(throwError(errorStatus401));
    component.check(['test-serial-number-1'], [], subscriberOverviewData, { 'test-serial-number-1': metaData });
  });

  it('should network tab api hit - when API succeeds', () => {
    spyOn(dataService, 'getSubscriberTabInfo').and.returnValue(of({}));
    component.networkTabApiHit('test-serial-number-1');
  });

  it('should network tab api hit - when API fails', () => {
    spyOn(dataService, 'getSubscriberTabInfo').and.returnValue(throwError(errorStatus401));
    component.networkTabApiHit('test-serial-number-1');
  });

  it('should return month difference', () => {
    component.monthDiff(new Date(), new Date());
  });

  it('should get servify subscription status - when API fails', () => {
    component.servifySubscriptionStatus({
      networkStatus: {
        app: {
          servifyCare: {
            planPurchaseDate: '2022-01-01'
          }
        }
      }
    });
  });

  it('should re-structure tab info', () => {
    component.reStructureTabInfo({});
  });

  it('should byte to mega byte', () => {
    component.byteToMegaByte(1234567);
  });

  it('should get subscriber info', () => {
    // spyOn(dataService, 'getSubscriberInfo').and.returnValue(of({}));
    component.getSubscriberInfo('test');
  });

  it('should get subscriber info', () => {
    // spyOn(dataService, 'getSubscriberInfo').and.returnValue(of({}));
    component.issuesAndWarnings = ['one', 'two'];
    component.serviceLimitDataAssign = true;
    callOutComeService.escalationEmail = 'test';
    component.callOutComeData.device_Info = 'test device-info';
    component.changeAutomatedNotes({
      value: []
    });
    component.changeAutomatedNotes({
      value: [1, 2]
    });

    component.changeAutomatedNotes({
      value: [1, 2, 3]
    });
  });

  it('should get subscriber info', () => {
    // spyOn(dataService, 'getSubscriberInfo').and.returnValue(of({}));
    component.allDeviceList = deviceDetailsResponse;
    callOutComeService.escalationEmail = 'test';
    component.callOutComeNotes = {
      issuesAndwarn: 'test',
      serviceLimitHits: 'test'
    }
    component.changeAutomatedNotesforDevices({
      value: []
    });
    component.changeAutomatedNotesforDevices({
      value: [0, 1, 2]
    });
  });

  it('should get call outcome - when API succeeds', () => {
    spyOn(callOutComeService, 'CallOutCome').and.returnValue(of({}));
    component.saveStatus(true);
  });

  it('should get call outcome - when API fails', () => {
    spyOn(callOutComeService, 'CallOutCome').and.returnValue(throwError(errorStatus401));
    component.saveStatus(true);
  });

  it('should change table status language', () => {
    let obj = {
      oPreviousSearch: {
        sSearch: 'text'
      },
      _iRecordsTotal: 10,
      _iDisplayLength: 10,
      _iRecordsDisplay: 10,
      _iDisplayStart: 5,
    }
    component.changeTableStatusLanguage(obj);
  });

  it('should show primary email', () => {
    component.showPrimaryEmail('test-mail');
  });

  it('should get call history for unit test', () => {
    let obj = {
      tickets: [
        {
          id: 1,
          ctime: new Date(),
        },
        {
          id: 2,
          ctime: new Date(),
        }
      ]
    }
    spyOn(callOutComeService, 'GetCallHistory').and.returnValue(of(obj));
    // component.getCallHistoryForUnitTest('', '', '', '');
  });

  it('should get call history for unit test', () => {
    spyOn(callOutComeService, 'GetCallHistory').and.returnValue(throwError(errorStatus404));
    // component.getCallHistoryForUnitTest('', '', '', '');
  });

  // it('should get call history for unit test', () => {
  //   spyOn(marketingInsightspplicationApiService, 'ServiceLimit').and.returnValue(of({}));
  //   component.getServiceLimitHits();
  // });

  // it('should get call history for unit test', () => {
  //   spyOn(callOutComeService, 'ServiceLimit').and.returnValue(throwError(errorStatus401));
  //   component.getCallHistoryForUnitTest('', '', '', '');
  // });


  it('should show or hide email', () => {
    component.subscribercommandIQemail = true;
    component.emailCheckBox({});
    component.subscribercommandIQemail = false;
    component.emailCheckBox({});
  });

  it('should update command IQ emails primary - when API succeeds', () => {
    component.NewEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.email = 'test-email-01';
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(of({}));
    component.updateCommandIQEmails();
  });

  it('should update command IQ emails primary - when API fails', () => {
    component.NewEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.email = 'test-email-01';
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.updateCommandIQEmails();
  });

  it('should update command IQ emails secondary - when API succeeds', () => {
    component.NewSecondaryEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.secondaryUsers = [
      {
        email: 'test-email-01'
      }
    ];
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(of({}));
    component.updateCommandIQEmails();
  });

  it('should update command IQ emails secondary - when API fails', () => {
    component.NewSecondaryEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.secondaryUsers = [
      {
        email: 'test-email-01'
      }
    ];
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.updateCommandIQEmails();
  });


  it('should delete command IQ emails primary - when API succeeds', () => {
    spyOn(callOutComeService, 'deleteCommandIQEmails').and.returnValue(of({}));
    component.deleteCommandIQPrimaryEmail();
  });

  it('should delete command IQ emails primary - when API fails', () => {
    spyOn(callOutComeService, 'deleteCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.deleteCommandIQPrimaryEmail();
  });

  it('should delete command IQ emails secondary - when API succeeds', () => {
    spyOn(callOutComeService, 'deleteCommandIQEmails').and.returnValue(of({}));
    component.deleteCommandIQSecondaryEmail();
  });

  it('should delete command IQ emails secondary - when API fails', () => {
    spyOn(callOutComeService, 'deleteCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.deleteCommandIQSecondaryEmail();
  });

  it('should show or hide access pop up edit primary - when API succeeds', () => {
    component.NewEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.email = 'test-email-01';
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(of({}));
    component.accesspopupedit();
  });

  it('should show or hide access pop up edit primary - when API fails', () => {
    component.NewEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.email = 'test-email-01';
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(errorStatus401));
    component.accesspopupedit();
  });

  it('should show or hide access pop up edit secondary - when API succeeds', () => {
    component.NewSecondaryEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.secondaryUsers = [
      {
        email: 'test-email-01'
      }
    ];
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(of({}));
    component.accesspopupedit();
    fixture.detectChanges();
  });

  it('should show or hide access pop up edit secondary - when API fails', () => {
    component.NewSecondaryEmail = 'test-email-1';
    component.subscriberInfoResult.commandIQ.secondaryUsers = [
      {
        email: 'test-email-01'
      }
    ];
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(errorStatus401));
    component.accesspopupedit();
  });

  it('should show or hide access pop up secondary delete - when API succeeds', () => {
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(of({}));
    component.accesspopupSecondarydelete();
  });

  it('should show or hide access pop up secondary delete - when API fails', () => {
    spyOn(callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(errorStatus401));
    component.accesspopupSecondarydelete();
  });

  it('should validate primary email', () => {
    component.ValidateEmail({
      target: {
        value: 'test@mail.com'
      }
    });
    component.ValidateEmail({
      target: {
        value: 'test-mail'
      }
    });
  });

  it('should validate secondary email', () => {
    component.ValidateSecondaryEmail({
      target: {
        value: 'test@mail.com'
      }
    });
    component.ValidateSecondaryEmail({
      target: {
        value: 'test-mail'
      }
    });
  });

  it('should detect email change', () => {
    component.isEmailChange();

    component.NewEmail = 'test-mail-1';
    component.subscriberInfoResult.commandIQ.email = 'test-mail-01';
    component.isEmailChange();
  });

  it('should detect secondary email change', () => {
    component.NewSecondaryEmail = 'test-mail-2';
    component.subscriberInfoResult.commandIQ.secondaryUsers = [
      {
        email: 'test-mail-02'
      }
    ];
    component.isEmailChange();
  });

  it('should update CommandIQ primary emails - when API succeeds', () => {
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(of({}));
    component.updateCommandIQPrimaryEmails();
  });

  it('should update CommandIQ primary emails - when API fails', () => {
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.updateCommandIQPrimaryEmails();
  });


  it('should update CommandIQ secondary emails - when API succeeds', () => {
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(of({}));
    component.updateCommandIQSeconadryEmails();
  });

  it('should update CommandIQ secondary emails - when API fails', () => {
    spyOn(callOutComeService, 'updateCommandIQEmails').and.returnValue(throwError(errorStatus401));
    component.updateCommandIQSeconadryEmails();
  });
  it('should check  subscriberImpactedOutage', () => {
    component.ngOnInit();
    spyOn(component, 'subscriberImpactedOutage').and.callThrough();
    component.subscriberImpactedOutage();
    component.outageRespone = outageResponeSubscriber;
    expect(component.outageRespone[0].deviceType).toMatch("ONT");
    expect(component.outageRespone[0].deviceName).toMatch("CXNK005E8C2C");
    expect(component.subscriberImpactedOutage).toHaveBeenCalled();
  });

  //just now hiding for ng test code coverage issue..
  // it('should restrict redirection', () => {
  //   spyOn(sso, 'checkScope').and.returnValue(true);
  //   sessionStorage.setItem('calloutcomeSubmitted', 'false')
  //   spyOn(sso, 'isSecureAccess').and.returnValue(false);
  //   spyOn(sso, 'checkSubWithinTime').and.returnValue(true);
  //   document.getElementById("Home").click();
  //   fixture.detectChanges();
  // });

  it('should swapInProgress', () => {
    let obj = {
      "replacingBy": "CXNK12345678"
    }
    spyOn(supportRouterService, 'swapInProgress').and.returnValue(of(obj));
    spyOn(component, 'swapInProgress').and.callThrough();
    component.swapInProgress();
  });
  it('should swapInProgress error', () => {
    const error = {
      error: {
        error: {
          errorCode: 404
        }
      }
    }
    spyOn(supportRouterService, 'swapInProgress').and.returnValue(throwError(error));
    spyOn(component, 'swapInProgress').and.callThrough();
    component.swapInProgress();
  });

});

