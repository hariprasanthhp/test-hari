import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ProtectIqDetailsComponent } from './protect-iq-details.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProtectIqNewRoutingModule } from '../protect-iq-new-routing.module';
import { SupportApplicationModule } from '../../support-application.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import * as PIQmock from 'src/assets/mockdata/support/edge-suites/protectIQ';
import { environment } from 'src/environments/environment';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProtectIqDetailsComponent', () => {
  let component: ProtectIqDetailsComponent;
  let fixture: ComponentFixture<ProtectIqDetailsComponent>;

  let router: Router;
  let httpTestingController: HttpTestingController;
  let protectIqService: ProtectIqService;


  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/support/application/protect-iq/details' };

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectIqDetailsComponent ],
      imports: [
        ProtectIqNewRoutingModule,
        SupportApplicationModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        ProtectIqService,
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ProtectIqDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  
      router = TestBed.inject(Router);
      httpTestingController = TestBed.inject(HttpTestingController);
      protectIqService = TestBed.inject(ProtectIqService);
    })
  });

  it('OnInit test case', fakeAsync(() => {
    spyOn(protectIqService,'getDeviceStatus').and.returnValue(of(PIQmock.statusRes));
    spyOn(protectIqService,'getArloAccount').and.returnValue(of(PIQmock.sessionsubscriber));
    window.localStorage.setItem('calix.scopes',JSON.stringify(scopes));
    environment.VALIDATE_SCOPE = "true";
    protectIqService.availabilityInfo.next(PIQmock.availablityInfo);
    component.ngOnInit();
    flush(3000);
    expect(component).toBeTruthy();
  }));

  it('getSubscribedStatus success case', fakeAsync(() => {
    spyOn(protectIqService,'getArloAccount').and.returnValue(of(PIQmock.sessionsubscriber));
    component.getSubsciberStatus('system',true);
    flush(3000);
    expect(component).toBeTruthy();
  }));

  it('OnInit test getSubscribedStatus error case', fakeAsync(() => {
    spyOn(protectIqService,'getArloAccount').and.returnValue(throwError(errorStatus401));
    window.localStorage.setItem('calix.scopes',JSON.stringify(scopes));
    environment.VALIDATE_SCOPE = "true";
    protectIqService.availabilityInfo.next(PIQmock.availablityInfo);
    component.ngOnInit();
    flush(3000);
    expect(component).toBeTruthy();
  }));


  it('showStatusNotification success case', fakeAsync(() => {
    spyOn(protectIqService,'getNotification').and.returnValue(of(PIQmock.notification_res));
    component.newData = PIQmock.newData;
    component.notificationUserId = true;
    component.showStatusNotification();
    flush(3000);
    expect(component).toBeTruthy();
  }));

  it('showStatusNotification success case', fakeAsync(() => {
    spyOn(protectIqService,'getNotification').and.returnValue(throwError(errorStatus401));
    component.newData = PIQmock.newData;
    component.notificationUserId = true;
    component.showStatusNotification();
    flush(3000);
    expect(component).toBeTruthy();
  }));

  it('getDeviceStatus success case', fakeAsync(() => {
    spyOn(protectIqService,'getDeviceStatus').and.returnValue(of(PIQmock.statusRes));
    component.deviceInfo = PIQmock.availablityInfo.deviceInfo;
    component.getSubsciberStatus('device',true);
    flush(2000);
    expect(component).toBeTruthy();
  }));

  it('getDeviceStatus else test case', fakeAsync(() => {
    spyOn(protectIqService,'getDeviceStatus').and.returnValue(of(PIQmock.statusRes));
    component.deviceInfo = "";
    component.getSubsciberStatus('device',true);
    flush(2000);
    expect(component).toBeTruthy();
  }));

  it('getDeviceStatus error case', fakeAsync(() => {
    spyOn(protectIqService,'getDeviceStatus').and.returnValue(throwError(errorStatus401));
    component.deviceInfo = PIQmock.availablityInfo.deviceInfo;
    component.getSubsciberStatus('device',true);
    flush(2000);
    expect(component).toBeTruthy();
  }));

  it('onBoardedCheck case', fakeAsync(() => {
    spyOn(protectIqService,'getUserId').and.returnValue(of(PIQmock.onboarded_res));
    component.deviceInfo = PIQmock.availablityInfo.deviceInfo;
    component.deviceStatus = true;
    component.onBoardedCheck();
    flush(2000);
    expect(component).toBeTruthy();
  }));

  it('onBoardedCheck error case', fakeAsync(() => {
    spyOn(protectIqService,'getUserId').and.returnValue(throwError(errorStatus401));
    component.deviceInfo = PIQmock.availablityInfo.deviceInfo;
    component.onBoardedCheck();
    flush(2000);
    expect(component).toBeTruthy();
  }));

  it('subscribe/unsubscribe test res', fakeAsync(() => {
    spyOn(protectIqService, 'setEnableStatus').and.returnValue(of(PIQmock.service_enable_disable));
    component.deviceStatus = false;
    component.toggleEnable(true);
    tick(210000);
    flush();
  }));

  it('subscribe/unsubscribe test error', fakeAsync(() => {
    spyOn(protectIqService, 'setEnableStatus').and.returnValue(throwError(errorStatus401));
    component.deviceStatus = false;
    component.toggleEnable(true);
    tick(210000);
    flush();
  }));

  it('toggleSubscription test', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscription').and.returnValue(of({}));
    component.toggleSubscription(!true);
    tick(210000);
    flush();
  }));

  it('toggleSubscription test 1', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = true;
    component.subscriptionUpdated = true;
    component.undiscoveredGS = true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscription').and.returnValue(of({}));
    component.toggleSubscription(!true);
    tick(210000);
    flush();  
  }));

  it('toggleSubscription test error', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscription').and.returnValue(throwError(errorStatus401));
    component.toggleSubscription(!true);
    tick(210000);
    flush();
  }));

  it('toggleSubscription test 2', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = !true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of({}));
    component.toggleSubscription(!true);
    tick(210000);
    flush();
  }));

  it('toggleSubscription test 2.1', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = !true;
    component.subscriptionUpdated = true;
    component.undiscoveredGS = true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of({}));
    component.toggleSubscription(!true);
    tick(210000);
    flush();
  }));

  it('toggleSubscription test error', fakeAsync(() => {
    component.deviceSubscription = true;
    component.hasSubscriber = !true;
    component.subscriberStructure = PIQmock.subscriberStructure;
    spyOn(protectIqService, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(throwError(errorStatus401));
    component.toggleSubscription(!true);
    tick(210000);
    flush();
  }));

  it('onSubscription test', fakeAsync(() => {
    component.deviceStatus = false;
    spyOn(protectIqService, 'setInstall').and.returnValue(of({}));
    component.onSubscription(true);
    tick(210000);
    flush();
  }));
  it('onSubscription test', fakeAsync(() => {
    component.deviceStatus = false;
    component.enabledUpdated = true;
    spyOn(protectIqService, 'setInstall').and.returnValue(of({}));
    component.onSubscription(true);
    tick(210000);
    flush();
  }));
  it('onSubscription test error', fakeAsync(() => {
    component.deviceStatus = false;
    spyOn(protectIqService, 'setInstall').and.returnValue(throwError(errorStatus401));
    component.onSubscription(true);
    tick(210000);
    flush();
  }));

  it('onSubscription test 1', fakeAsync(() => {
    component.deviceStatus = true;
    spyOn(protectIqService, 'setUnInstall').and.returnValue(of({}));
    component.onSubscription(false);
    tick(210000);
    flush();
  }));
  it('onSubscription test 1.1', fakeAsync(() => {
    component.deviceStatus = true;
    component.enabledUpdated = true;
    spyOn(protectIqService, 'setUnInstall').and.returnValue(of({}));
    component.onSubscription(false);
    tick(210000);
    flush();
  }));
  it('onSubscription test error', fakeAsync(() => {
    component.deviceStatus = true;
    spyOn(protectIqService, 'setUnInstall').and.returnValue(throwError(errorStatus401));
    component.onSubscription(false);
    tick(210000);
    flush();
  }));

  it('updateAppTile test', fakeAsync(() => {
    component.subscriberStructure = PIQmock.subscriberStructure;
    component.deviceInfo = 'CXNK00778D46';
    component.deviceSubscription = false;
    spyOn(protectIqService, 'tileStatus').and.returnValue(of({ profile: [] }));
    component.updateAppTile();
    tick(210000);
    flush();
  }));
  it('updateAppTile test setUnEnabled error', fakeAsync(() => {
    component.subscriberStructure = PIQmock.subscriberStructure;
    component.deviceInfo = 'CXNK00778D46';
    component.deviceSubscription = false;
    spyOn(protectIqService, 'tileStatus').and.returnValue(throwError(errorStatus401));
    component.updateAppTile();
    tick(210000);
    flush();
  }));

});
