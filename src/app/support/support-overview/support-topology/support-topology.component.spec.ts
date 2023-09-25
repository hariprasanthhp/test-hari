import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import go from 'gojs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExpectedConditions } from 'protractor';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { HealthService } from 'src/app/cco/health/service/health.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { apmockdata, apsdatamock, clientattributemock, clientdevicesmock, commandmock, devicemock, opmodemock, parentmock, prevelemtmock, topologymock, uplinkmock } from 'src/assets/mockdata/support/overview/topology';
import { DataServiceService } from '../../data.service';
import { SharedModule } from '../../shared/shared.module';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { IssuesService } from '../services/issues.service';

import { SupportTopologyComponent } from './support-topology.component';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';

describe('SupportTopologyComponent', () => {
  let component: SupportTopologyComponent;
  let fixture: ComponentFixture<SupportTopologyComponent>;
  let trustservice: DataServiceService;
  let issuseservice: IssuesService;
  let ssoAuthService: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportTopologyComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule, NgSelectModule, SharedModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, IssuesService, NgxSpinnerService, SsoAuthService, DataServiceService, CommonService, SupportWifiService, HealthService]
    })
      .compileComponents()
      .then(() => {
        trustservice = TestBed.inject(DataServiceService);
        issuseservice = TestBed.inject(IssuesService);
        ssoAuthService = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(SupportTopologyComponent);
        component = fixture.componentInstance;
        component.loading = false;
        component.showQoeTab = false;
        fixture.detectChanges();
      });
  });

  it('should initialized topology onInit()', fakeAsync(() => {
    spyOn(component, 'qoeCheck').and.callThrough();
    ssoAuthService.commandIQData.next(commandmock);
    component.ngOnInit();
    sessionStorage.setItem('calix.deviceData', JSON.stringify(devicemock));
    component.getData();
    component.getAllClientsData(component.routerMac);
    tick(2000);
    expect(component.qoeCheck).toBeTruthy();
    fixture.detectChanges();
  }))

  it('should load the topology of getdata()', fakeAsync(() => {
    sessionStorage.setItem('calix.deviceData',JSON.stringify(devicemock))
    component.showTopologyTab = true;
    component.rgflag = true;
    spyOn(issuseservice, 'setIssues').and.callThrough();
    issuseservice.setIssues(topologymock);
    trustservice.setSubscriberTabInfoData(topologymock.landing.rg['rg-tech-notes']);
    component.rgArr = [{ name: 'bharath', ['note']: (topologymock.landing.rg['rg-tech-notes']) }];
    fixture.detectChanges();
    let rgArr_ = fixture.nativeElement.querySelector('.topo-info-box div:first-child p span:last-child').innerText;
    tick(2000);
    expect(rgArr_).toEqual(component.rgArr[0].note);
    fixture.detectChanges();
  }))

  it('should load issueDescription', fakeAsync(() => {
    spyOn(component, 'issueDescription').and.callThrough();
    sessionStorage.setItem(`calix.deviceData`,JSON.stringify(opmodemock));
    component.issueDescription("ATTACK_DETECTED","rg","CXNK00FEEEA5","");
    component.issueDescription("ATTACK_DETECTED","aps","CXNK00FEEEA5","");
    component.issueDescription("ATTACK_DETECTED","client","CXNK00FEEEA5","");
    component.issueDescription("ATTACK_DETECTED","backhaul","CXNK00FEEEA5","");
    component.issueDescription("CLIENT_DEVICE_LOW_SIGNAL_DETECTED","rg","CXNK00FEEEA5","");
    component.issueDescription("CLIENT_DEVICE_LOW_SIGNAL_DETECTED","ont","CXNK00FEEEA5","");
    component.issueDescription("CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED","rg","CXNK00FEEEA5","");
    component.issueDescription("CLIENT_DEVICE_LOW_PHY_RATE_DETECTED","rg","CXNK00FEEEA5","");
    component.issueDescription("CLIENT_DEVICE_LEGACY_DEVICE_DETECTED","rg","CXNK00FEEEA5","");
    component.issueDescription("REBOOT_ISSUE","rg","CXNK00FEEEA5","");
    component.issueDescription("SOFTWARE_UPGRADE_FAILED","rg","CXNK00FEEEA5","");
    component.issueDescription("STALE_SOFTWARE_VERSION","rg","CXNK00FEEEA5","");
    component.issueDescription("The memory usage on the RG has crossed X threshold - discussion on if to track ","rg","CXNK00FEEEA5","");
    component.issueDescription("The Operation Temperature has crossed X threshold - intenral threshold","rg","CXNK00FEEEA5","");
    component.issueDescription("WAP_FAILED","rg","CXNK00FEEEA5","");
    component.issueDescription("GATEWAY_FAILED","rg","CXNK00FEEEA5","");
    component.issueDescription("SPEED_LOW_75_80","rg","CXNK00FEEEA5","");
    component.issueDescription("SPEED_LOW_75","rg","CXNK00FEEEA5","");
    component.issueDescription("TRAFFIC_HIGH","rg","CXNK00FEEEA5","");
    component.issueDescription("LATENCY_HIGH","rg","CXNK00FEEEA5","");
    component.issueDescription("A configured voice service has been detect as down.","rg","CXNK00FEEEA5","");
    component.issueDescription("WIFI_INTERFERENCE_HIGH_24G","rg","CXNK00FEEEA5","");
    component.issueDescription("WIFI_INTERFERENCE_HIGH_5G","rg","CXNK00FEEEA5","");
    component.issueDescription("LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G","rg","CXNK00FEEEA5","");
    component.issueDescription("LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G","rg","CXNK00FEEEA5","");
    component.issueDescription("LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G","rg","CXNK00FEEEA5","");
    component.issueDescription("LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G","rg","CXNK00FEEEA5","");
    component.issueDescription("MESH_DEGRADE","rg","CXNK00FEEEA5","");
    component.issueDescription("BACKHAUL_TOO_CLOSE","rg","CXNK00FEEEA5","");
    component.issueDescription("BACKHAUL_TOO_FAR","rg","CXNK00FEEEA5","");
    component.issueDescription("Utilization of Wi-Fi Airtime has crossed 50% Average for bin on radio (2.4Ghz|5Ghz)","rg","CXNK00FEEEA5","");
    component.issueDescription("Detected DFS (radar)","rg","CXNK00FEEEA5","");
    component.issueDescription("WIFI_RADIO_DISABLED","rg","CXNK00FEEEA5","");
    component.issueDescription("WIFI_RADIO_DISABLED_24G","rg","CXNK00FEEEA5","");
    component.issueDescription("WIFI_RADIO_DISABLED_5G","rg","CXNK00FEEEA5","");
    component.issueDescription("DS_SPEED_LOW_85","rg","CXNK00FEEEA5","");
    component.issueDescription("US_SPEED_LOW_85","rg","CXNK00FEEEA5","");
    component.issueDescription("DS_SPEED_LOW_75","rg","CXNK00FEEEA5","");
    component.issueDescription("US_SPEED_LOW_75","rg","CXNK00FEEEA5","");
    component.issueDescription("THERMAL_HIGH","rg","CXNK00FEEEA5","");
    component.issueDescription("THERMAL_TOO_HIGH","rg","CXNK00FEEEA5","");
    component.issueDescription("ONT_OFFLINE","rg","CXNK00FEEEA5","");
    component.issueDescription("GC_MAX_DOWNSTREAM_ACHIEVED","rg","CXNK00FEEEA5","");
    component.issueDescription("GC_MAX_UPSTREAM_ACHIEVED","rg","CXNK00FEEEA5","");
    component.issueDescription("WFH_SSID_WITHOUT_CIQ","rg","CXNK00FEEEA5","");
    component.issueDescription("QOS_DAMP_ALERT","rg","CXNK00FEEEA5","");
    component.issueDescription("MAP_CONNECTIVITY_FAILED","rg","CXNK00FEEEA5","");
    component.issueDescription("UI_CREATED_ISSUE_FOR_TR069MAPDOWN","rg","CXNK00FEEEA5","");
    component.issueDescription("MAP_CONNECTIVITY_FAILED","rg","CXNK00FEEEA5","");
    tick(2000);
    fixture.detectChanges();
  }))






  it('should load the topology of getdata()', fakeAsync(() => {
    sessionStorage.setItem('calix.deviceData',JSON.stringify(devicemock))
    spyOn(issuseservice, 'topologyValue').and.returnValue(of(topologymock));
    component.getData();
    tick(2000);
    fixture.detectChanges();
  }))

  // it('load diagram', fakeAsync(() => {
  //   component.rgModel = 'GS4227E';
  //   component.loadInitialDiagram(topologymock);
  //   sessionStorage.setItem('calix.deviceData',JSON.stringify(devicemock))
  //   tick(2000);
  //   fixture.detectChanges();
  // }))

  it('client Node Details', fakeAsync(() => {
    component.clientNodeDetails(clientattributemock);
    tick(2000);
    fixture.detectChanges();
  }))

  it('getAPDatas', fakeAsync(() => {
    component.getAPData(apmockdata);
    component.getAllClientsData(apmockdata);
    component.enable("ScrollToPart", false);
    tick(3000);
    fixture.detectChanges();
  }))

  it('zoomfunctionalities', fakeAsync(() => {
    component.zoomfunctionalities("");
    tick(2000);
    fixture.detectChanges();
  }))

  it('searchDiagram', fakeAsync(() => {
    component.searchText = "CXNK00AB3A5A"
    component.searchDiagram();
    tick(2000);
    fixture.detectChanges();
  }))

  it('refreshClick', fakeAsync(() => {
    component.refreshClick();
    tick(4000);
    fixture.detectChanges();
  }))

  // it('changeScaleDiagram', fakeAsync(() => {
  //   component.loadSupportTopology(true);
  //   fixture.detectChanges();
  //   component.changeScaleDiagram(1, "dropDown");
  //   fixture.detectChanges();
  //   component.changeScaleDiagram(1, "decrease");
  //   fixture.detectChanges();
  //   component.changeScaleDiagram(1, "increase");
  //   // component.updateDivHeight();
  //   tick(6000);
  //   fixture.detectChanges();
  // }))

  it('populateAps', fakeAsync(() => {
    component.populateAps(apsdatamock, topologymock, prevelemtmock,uplinkmock);
    tick(5000);
    fixture.detectChanges();
  }))

  it('populateClientDevices', fakeAsync(() => {
    component.populateClientDevices(clientdevicesmock, parentmock);
    tick(5000);
    fixture.detectChanges();
  }))

  it('qoeCheck', () => {
    component.qoeCheck();
    fixture.detectChanges();
  });

  it('should initialize all arrays with default values', () => {
    component.totalissues = 5;
    component.initalize();

    expect(component.isIconClicked.length).toEqual(5);
    expect(component.primaryActionButton.length).toEqual(5);
    expect(component.Description.length).toEqual(5);
    expect(component.reason.length).toEqual(5);
    expect(component.severity.length).toEqual(5);

    for (let i = 0; i < component.totalissues; i++) {
      expect(component.isIconClicked[i]).toBeFalsy();
      expect(component.primaryActionButton[i]).toBeFalsy();
      expect(component.Description[i]).toEqual(" ");
      expect(component.reason[i]).toEqual(" ");
      expect(component.severity[i]).toEqual(" ");
    }
  });

  it('should return the correct size in bytes', () => {
    expect(component.bytesToSize(0)).toEqual('0 bytes');
    expect(component.bytesToSize(1023)).toEqual('1023 bytes');
    expect(component.bytesToSize(1024)).toEqual('1.0 Kbps');
    expect(component.bytesToSize(1048576)).toEqual('1.0 Mbps');
    expect(component.bytesToSize(1073741824)).toEqual('1.0 Gbps');
    expect(component.bytesToSize(1099511627776)).toEqual('1.0 Tbps');
    expect(component.bytesToSize(1125899906842624)).toEqual('1.0 Pbps');
    expect(component.bytesToSize(1152921504606846976)).toEqual('1.0 Ebps');
  });


  it('should set errorInfo to Access Denied when HttpErrorResponse status is 401', () => {
    component.pageErrorHandle(errorStatus401);
  });

  it('should call ssoAuthService.pageErrorHandle when HttpErrorResponse status is not 401', () => {
    component.pageErrorHandle(errorStatus500);

  });

  it('should set error to true', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.error).toBeTrue();
  });

  it('should call closeAlert', () => {
    spyOn(component, 'closeAlert');
    component.pageErrorHandle(errorStatus401);
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('should set error to false', () => {
    component.error = true;
    component.closeAlert();
    expect(component.error).toBeFalse();
  });

});