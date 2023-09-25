import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { alldevices, devicedatamock, devicedetail, featureProp, issuesdevices, substabinfo } from 'src/assets/mockdata/support/devices/devices';
import { DataServiceService } from '../data.service';
import { SharedModule } from '../shared/shared.module';
import { IssuesService } from '../support-overview/services/issues.service';
import { SupportRouterService } from '../support-system/support-router/services/support-router.service';
import { SupportWifiService } from '../support-wifi/services/support-wifi.service';
import { DeviceComponent } from './device/device.component';
import { DeviceService } from './service/device.service';

import { SupportDeviceComponent } from './support-device.component';

describe('SupportDeviceComponent', () => {
  let component: SupportDeviceComponent;
  let fixture: ComponentFixture<SupportDeviceComponent>;
  let deviceService: DeviceService;
  let supportwifi: SupportWifiService;
  let dataservice: DataServiceService;
  let ssoAuthService: SsoAuthService;
  let issuseservice: IssuesService;

  //child 
  let app: DeviceComponent;
  let fixt: ComponentFixture<DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportDeviceComponent, DeviceComponent],
      imports: [RouterTestingModule
        , NgSelectModule, SharedModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [TranslateService, SsoAuthService, DeviceService, SupportWifiService, DataServiceService, IssuesService, SupportRouterService, Title]
    })
      .compileComponents()
      .then(() => {
        ssoAuthService = TestBed.inject(SsoAuthService);
        deviceService = TestBed.inject(DeviceService);
        supportwifi = TestBed.inject(SupportWifiService);
        dataservice = TestBed.inject(DataServiceService);
        issuseservice = TestBed.inject(IssuesService);
        fixture = TestBed.createComponent(SupportDeviceComponent);
        component = fixture.componentInstance;
        component.isDeviceTable = true;
        component.orgId = "102";
        component.IserialNumber = "CXNK00FEEEA5";
        component.deviceData = devicedatamock;
        fixture.detectChanges();
        window.history.pushState({ isDataModel: true }, '');

        // child
        fixt = TestBed.createComponent(DeviceComponent);
        app = fixt.componentInstance;
        app.index = devicedetail;
        app.currentTime = 1665739315489;
        app.deviceReleaseDatecal(1665668715000);
        fixt.detectChanges();
        app.ngOnInit();
      })
  });

  // it('should initialized all device onInit()', () => {
  //   spyOn(component, 'qoeCheck');
  //   // component.ngOnInit();
  //   // expect(component.qoeCheck).toHaveBeenCalled();
  //   // expect(component.dtOptions.pageLength).toBeFalsy();
  //   fixture.detectChanges();
  // })

  it('table data of all devices', () => {
    ssoAuthService.setTabId('0.9512329164600677');
    sessionStorage.setItem('calix.deviceData', JSON.stringify(devicedatamock));
    dataservice.setSubscriberTabInfoData(substabinfo);
    issuseservice.setIssues(issuesdevices);
    spyOn(deviceService, 'getdevices').and.returnValue(of(alldevices));
    spyOn(dataservice, 'fetchMetaData').and.returnValue(of(featureProp));
    component.ngOnInit();
    // expect(component.deviceList.length).toBe(48);
    fixture.detectChanges();
  });

  it('device details', () => {


    fixt = TestBed.createComponent(DeviceComponent);
    app = fixt.componentInstance;
    app.index = devicedetail;
    app.currentTime = 1665739315489;
    app.deviceReleaseDatecal(1665668715000);
    fixt.detectChanges();
    app.ngOnInit();

    ssoAuthService.setTabId('0.9512329164600677');
    sessionStorage.setItem('calix.deviceData', JSON.stringify(devicedatamock));
    dataservice.setSubscriberTabInfoData(substabinfo);
    issuseservice.setIssues(issuesdevices);
    spyOn(deviceService, 'getdevices').and.returnValue(of(alldevices));
    spyOn(deviceService, 'getDeviceDetails').and.returnValue(of(devicedetail));
    component.ngOnInit();
    component.deviceList;
    // expect(component.deviceDetail).toEqual(devicedetail);
    console.log(component.deviceDetail)
    fixture.detectChanges();
  });
});
