import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Tick } from 'highcharts';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { arloaccountmock, arlodevices, arlohealth, devicedata, deviceupdateinfo, updatedevicemock } from 'src/assets/mockdata/support/edge-suites/arlo-smart';
import { ProtectIqService } from '../shared/service/protect-iq.service';
import * as Quill from 'quill';
import { ArloSmartComponent } from './arlo-smart.component';
// import { deviceDetailsMock, emailMock } from 'src/assets/mockdata/support/edge-suites/servify-care';
import { CallOutComeService } from 'src/app/sys-admin/services/call-out-come.service';

describe('ArloSmartComponent', () => {
  let component: ArloSmartComponent;
  let fixture: ComponentFixture<ArloSmartComponent>;
  let service: ProtectIqService;
  let callOutComeService: CallOutComeService;
  let translateService: TranslateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArloSmartComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [ProtectIqService, TranslateService]
    })
      .compileComponents()
      .then(() => {
        service = TestBed.inject(ProtectIqService);
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        callOutComeService = TestBed.inject(CallOutComeService);
        fixture = TestBed.createComponent(ArloSmartComponent);
        component = fixture.componentInstance;
        component.fFamily = Quill.import('attributors/style/font');
        component.fSize = Quill.import('attributors/style/size');
        fixture.detectChanges();
      })
  });

//   it('ngOnInit', () => {
//     component.ngOnInit();
//     Quill.register(component.fFamily, true);
//     Quill.register(component.fSize, true);
//     sessionStorage.setItem("calix.deviceData",JSON.stringify(devicedata))
//     component.getAccount();
//     component.getHealth();
//     fixture.detectChanges();
//   })

//   it('getAccount', () => {
//     spyOn(service, 'getArloAccount').and.returnValue(of(arloaccountmock));
//     component.getAccount();
//     fixture.detectChanges();
//   })

//   it('getAccount', () => {
//     spyOn(service, 'getArloAccount').and.returnValue(throwError(errorStatus401));
//     component.getAccount();
//     fixture.detectChanges();
//   })

//   it('get Devices', () => {
//     spyOn(service, 'getArloDevice').and.returnValue(of(arlodevices[0].devices));
//     spyOn(service, 'getdevices').and.returnValue(of(arlodevices[1]));
//     component.getDevices("9f9692af-dbbf-4b77-85e4-4ff8fd0ee31c");
//     component.deviceLoader = true;
//     expect(component.devices.length).toBeGreaterThan(0);
//     fixture.detectChanges();
//   })

//   it('get Devices', () => {
//     spyOn(service, 'getArloDevice').and.returnValue(throwError(errorStatus401));
//     spyOn(service, 'getdevices').and.returnValue(throwError(errorStatus401));
//     component.getDevices("9f9692af-dbbf-4b77-85e4-4ff8fd0ee31c");
//     component.deviceLoader = true;
//     fixture.detectChanges();
//   })

//   it('arlo secure get health', () => {
//     spyOn(service, 'getArloOverallStatus').and.returnValue(of(arlohealth));
//     component.getHealth();
//     component.healthLoader = false;
//     fixture.detectChanges();
//   })

//   it('arlo secure get health', () => {
//     spyOn(service, 'getArloOverallStatus').and.returnValue(throwError(errorStatus401));
//     component.getHealth();
//     component.healthLoader = false;
//     fixture.detectChanges();
//   })

//   it('updateDeviceInfo', fakeAsync(() => {
//     component.devices=updatedevicemock;
//     spyOn(service, 'updateArloPostDevice').and.returnValue(of(updatedevicemock));
//     spyOn(service, 'updateArloDevice').and.returnValue(of(updatedevicemock));
//     component.updateDeviceInfo("A471067YAB8F4",0);
//     component.deviceLoader = false;
//     component.isRefresh = false;
//     tick(31000);
//     fixture.detectChanges();
//   }))

//   it('updateDeviceInfo', fakeAsync(() => {
//     spyOn(service, 'updateArloPostDevice').and.returnValue(throwError(errorStatus401));
//     spyOn(service, 'updateArloDevice').and.returnValue(throwError(errorStatus401));
//     component.updateDeviceInfo("A471067YAB8F4",0);
//     tick(31000);
//     fixture.detectChanges();
//   }))

//  it('updateDeviceInfo', () => {
//     spyOn(service, 'updateArloDevice').and.returnValue(throwError(errorStatus401));
//     component.updateDeviceInfo("A471067YAB8F4",0);
//     fixture.detectChanges();
//   })

//   it('copyToClipboard', fakeAsync(() => {
//     document.getElementById('#arloTemplateSubject');
//     component.copyToClipboard();
//     component.copyForOldBrowser('Subject:\n');
//     tick(2000);
//     fixture.detectChanges();
//   }))

//   it('copyForOldBrowser', () => {
//     component.copyForOldBrowser('Subject:\n');
//     fixture.detectChanges();
//   })


//   it('viewDeviceDetails', () => {
//     component.viewDeviceDetails(updatedevicemock[0].macAddress);
//     fixture.detectChanges();
//   })
//   it('viewDeviceDetails', () => {
//     component.viewDeviceDetails(!updatedevicemock[0].macAddress);
//     fixture.detectChanges();
//   })

//   it('escalationProcessEditorModal', () => {
//     spyOn(service, 'getUserEmail').and.returnValue(of(emailMock));
//     component.escalationProcessEditorModal();
//     fixture.detectChanges();
//   })

//   it('escalationProcessEditorModal', () => {
//     spyOn(service, 'getUserEmail').and.returnValue(throwError(errorStatus401));
//     localStorage.setItem('calix.userId','323423423423')
//     component.escalationProcessEditorModal();
//     fixture.detectChanges();
//   })

//   it('sendEmail', () => {
//     component.sendTo = 'abcd@gmail.com';
//     spyOn(service, 'sendEmail').and.returnValue(of("success"));
//     component.sendEmail();
//     fixture.detectChanges();
//   })

//   it('patternCheck', () => {
//     component.patternCheck("calix@gmail.com");   
//     fixture.detectChanges();
//   })
//   it('patternCheck', () => {
//     component.patternCheck("calix.com");   
//     fixture.detectChanges();
//   })

//   it('appendSubscriberDeviceData', () => {
//     sessionStorage.setItem('calix.subscriberInfo',JSON.stringify(deviceDetailsMock))
//     component.appendSubscriberDeviceData('model');  
//     fixture.detectChanges();
//   })

//   it('appendSubscriberDeviceData', () => {
//     sessionStorage.setItem('calix.subscriberInfo',JSON.stringify(deviceDetailsMock))
//     component.appendSubscriberDeviceData('serialNumber');  
//     fixture.detectChanges();
//   })

//   it('emailTemplate', () => {
//     component.emailTemplate();   
//     fixture.detectChanges();
//   })
});
