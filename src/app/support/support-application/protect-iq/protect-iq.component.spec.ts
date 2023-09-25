////////////// ************************************ ////////////// **
// NEW OPTIMISED MODULE IS CREATED FOR PROTECT IQ
// THIS COMPONENT WILL BE DROPPED LATER
////////////// ************************************ //////////////


// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { Title } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';
// import { TranslateService } from 'src/app-services/translate.service';
// import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
// import { EnglishJSON } from 'src/assets/language/english.service';
// import { entitle } from 'src/assets/mockdata/shared/Entitles';
// import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
// import { scopes } from 'src/assets/mockdata/shared/scopes.data';
// import {
//   alert_res,
//   availability_res,
//   device_status,
//   newData,
//   notification_res,
//   onboarded_res,
//   security_setting_res,
//   service_enable_disable,
//   sessionDeviceData,
//   sessionsubscriber,
//   skipped_device_res,
//   ssidPool,
//   subscriberStructure,
//   trusted_list_res
// } from 'src/assets/mockdata/support/edge-suites/protectIQ';
// import { environment } from 'src/environments/environment';
// import { DataServiceService } from '../../data.service';
// import { DeviceCatogryPipe } from '../../shared/custom-pipes/device-catogry.pipe';
// import { SkipDeviceIconPipe } from '../../shared/custom-pipes/skip-device-icon-pipe';
// import { ProtectIqService } from '../shared/service/protect-iq.service';

// import { ProtectIQComponent } from './protect-iq.component';

// describe('ProtectIQComponent', () => {
//   let component: ProtectIQComponent;
//   let fixture: ComponentFixture<ProtectIQComponent>;

//   let protectIqservices: ProtectIqService;
//   let dataService: DataServiceService;
//   let sso: SsoAuthService;
//   let router: Router;

//   let translateService: TranslateService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ProtectIQComponent, SkipDeviceIconPipe, DeviceCatogryPipe],
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule,
//         FormsModule
//       ],
//       providers: [
//         ProtectIqService,
//         SsoAuthService,
//         DataServiceService,
//         TranslateService,
//         Title,
//         { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
//       ]
//     })
//       .compileComponents().then(() => {
//         protectIqservices = TestBed.inject(ProtectIqService);
//         dataService = TestBed.inject(DataServiceService);
//         sso = TestBed.inject(SsoAuthService);
//         router = TestBed.inject(Router);
//         translateService = TestBed.inject(TranslateService);

//         fixture = TestBed.createComponent(ProtectIQComponent);
//         component = fixture.componentInstance;
//         component.deviceSubscription = true;
//         component.deviceStatus = true;
//         component.showSkippedDevice = availability_res.psd;
//         component.showSecuritySetting = availability_res.securityByPass;
//         sessionStorage.setItem('calix.deviceData', JSON.stringify(sessionDeviceData));
//         // spyOn(protectIqservices, 'getUserId').and.returnValue(of(onboarded_res));
//         // spyOn(protectIqservices, 'getDeviceStatus').and.returnValue(of(device_status));
//         // spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(sessionsubscriber));
//         // spyOn(protectIqservices, 'getNotification').and.returnValue(of(notification_res));
//         // spyOn(protectIqservices, 'getFeatureAvailability').and.returnValue(of(availability_res));
//         // spyOn(protectIqservices, 'setEnableStatus').and.returnValue(of(service_enable_disable));
//         fixture.detectChanges();
//       })
//   });

//   afterEach(() => {
//     fixture.destroy();
//   });

//   it('Ng-OnInit test', fakeAsync(() => {
//     component.deviceInfo = sessionDeviceData[0];
//     sessionStorage.setItem('overviewStatus', 'isLoaded');
//     localStorage.setItem('calix.entitlements', JSON.stringify(entitle));
//     localStorage.setItem('calix.scopes', JSON.stringify(scopes));
//     spyOn(component, 'getScopes').and.callThrough();
//     environment.VALIDATE_SCOPE = 'true';
//     component.ngOnInit();
//     const ENG = new EnglishJSON();
//     translateService.selectedLanguage.next(of(ENG));
//     tick(500);
//   }));

//   it('loadContent test', () => {
//     spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(sessionsubscriber));
//     spyOn(protectIqservices, 'getDeviceStatus').and.returnValue(of(device_status));
//     spyOn(component, 'getSubscribedStatus').and.callThrough();
//     spyOn(component, 'getDeviceStatus').and.callThrough();
//     component.loadContent();
//   });

//   it('getSubscribedStatus test', () => {
//     spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(sessionsubscriber));
//     sessionStorage.setItem(`calix.subscriberId`, 'ececc931-b76b-4951-a068-1612fe4ac31b')
//     component.getSubscribedStatus();
//   });
//   it('getSubscribedStatus test if case', () => {
//     spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(sessionsubscriber));
//     sessionStorage.setItem(`calix.subscriberId`, 'ececc931-b76b-4951-a068-1612fe4ac31b')
//     component.getSubscribedStatus(true);
//   });
//   it('getSubscribedStatus test error', () => {
//     spyOn(protectIqservices, 'getArloAccount').and.returnValue(throwError(errorStatus401));
//     sessionStorage.setItem(`calix.subscriberId`, 'ececc931-b76b-4951-a068-1612fe4ac31b')
//     component.getSubscribedStatus();
//   });

//   it('getDeviceStatus test else', () => {
//     component.newData = newData;
//     component.deviceStatus = true;
//     component.deviceInfo = sessionDeviceData[0];
//     spyOn(protectIqservices, 'getDeviceStatus').and.returnValue(of(device_status));
//     component.getDeviceStatus(true);
//   });
//   it('getDeviceStatus test', () => {
//     component.deviceInfo = sessionDeviceData[0];
//     // component.deviceStatus = true;
//     // component.newData = newData;
//     spyOn(protectIqservices, 'getDeviceStatus').and.returnValue(of(device_status));
//     component.getDeviceStatus(true);
//   });

//   it('getDeviceStatus test error', () => {
//     spyOn(protectIqservices, 'getDeviceStatus').and.returnValue(throwError(errorStatus401));
//     component.deviceInfo = 'CXNK00778D46';
//     component.showStatusNotification();
//   });

//   it('showStatusNotification test', () => {
//     spyOn(protectIqservices, 'getNotification').and.returnValue(of(notification_res));
//     component.showStatusNotification();
//   });

//   it('showStatusNotification test error', () => {
//     spyOn(protectIqservices, 'getNotification').and.returnValue(throwError(errorStatus401));
//     component.showStatusNotification();
//   });

//   it('subscribe/unsubscribe test', () => {
//     spyOn(protectIqservices, 'setEnableStatus').and.returnValue(of(service_enable_disable));

//     component.deviceStatus = false;
//     component.toggleEnable(true);
//     fixture.detectChanges();

//     component.hasSubscriber = true;
//     component.subscriberStructure = subscriberStructure;
//     component.deviceSubscription = false;
//     fixture.detectChanges();
//     spyOn(protectIqservices, 'toggleAppSubscription').and.returnValue(of());
//     spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of({ "estimatedDelay": 0 }));
//     component.toggleSubscription(true);
//     fixture.detectChanges();
//   });

//   it('alert tab click', () => {
//     spyOn(protectIqservices, 'getAlerts').and.returnValue(of(alert_res));
//     spyOn(protectIqservices, 'addWhitelistDetails').and.returnValue(of({}));
//     spyOn(component, 'addTrustList').and.callThrough();
//     component.sectionToShow = 'alert';
//     component.isError = false;
//     component.showAlerts(true);
//     component.alertDetails = alert_res.datas;
//     fixture.detectChanges();

//     //add to trustedlist button
//     fixture.nativeElement.querySelector('#whitelabelbtn0').click();
//   });

//   it('alert tab click error', () => {
//     spyOn(protectIqservices, 'getAlerts').and.returnValue(throwError(errorStatus401));
//     spyOn(protectIqservices, 'addWhitelistDetails').and.returnValue(throwError(errorStatus401));
//     spyOn(component, 'addTrustList').and.callThrough();
//     component.sectionToShow = 'alert';
//     component.isError = false;
//     component.showAlerts(true);
//     component.alertDetails = alert_res.datas;
//     fixture.detectChanges();

//     //add to trustedlist button
//     fixture.nativeElement.querySelector('#whitelabelbtn0').click();
//   });

//   it('Trusted_List tab click', () => {
//     spyOn(protectIqservices, 'getTrustList').and.returnValue(of(trusted_list_res));
//     spyOn(protectIqservices, 'removeItemInTrustList').and.returnValue(of());
//     spyOn(component, 'deleteWhiteListItem').and.callThrough();

//     component.newData = newData;
//     component.showTrustList(true);
//     component.sectionToShow = 'trusted'; component.isError = false;
//     component.trustListDetails = trusted_list_res;
//     fixture.detectChanges();
//     let deleteBtn = fixture.nativeElement.querySelector('#protect-iq-trusted-list tbody tr:nth-child(1) td:nth-child(1) ul li:last-child button')
//     deleteBtn.click();
//   })

//   it('Trusted_List tab click error', () => {
//     spyOn(protectIqservices, 'getTrustList').and.returnValue(throwError(errorStatus401));
//     spyOn(protectIqservices, 'removeItemInTrustList').and.returnValue(of());
//     spyOn(component, 'deleteWhiteListItem').and.callThrough();

//     component.newData = newData;
//     component.showTrustList(true);
//     component.sectionToShow = 'trusted'; component.isError = false;
//     component.trustListDetails = trusted_list_res;
//     fixture.detectChanges();
//     let deleteBtn = fixture.nativeElement.querySelector('#protect-iq-trusted-list tbody tr:nth-child(1) td:nth-child(1) ul li:last-child button')
//     deleteBtn.click();
//   })

//   it('skipped Device tab click', () => {
//     spyOn(protectIqservices, 'getSkipList').and.returnValue(of(skipped_device_res));
//     spyOn(protectIqservices, 'updateSkipStatus').and.returnValue(of({}));
//     spyOn(protectIqservices, 'setAllSkipStatus').and.returnValue(of());
//     spyOn(component, 'showSkipDevices').and.callThrough();
//     spyOn(component, 'changeSkipStatus').and.callThrough();

//     //for skipped_device menu click
//     component.sectionToShow = 'skipped';
//     component.isError = false;
//     component.showSkipDevices();
//     fixture.detectChanges();

//     //for skipped device list click one device
//     fixture.nativeElement.querySelector('#piq-skipped-device tbody:nth-child(3) tr td div div div div').click();
//     fixture.detectChanges();

//     //for change skip
//     fixture.nativeElement.querySelector('.protectiq-skipped-table tbody:nth-child(1) tr td:nth-child(3) div button').click();
//     fixture.detectChanges();

//     //for skipAll click
//     fixture.nativeElement.querySelector('#sd-skip-all').click();
//     fixture.detectChanges();

//     //for scanAll click
//     fixture.nativeElement.querySelector('#sd-scan-all').click();
//   });


//   it('skipped Device tab click error', () => {
//     spyOn(protectIqservices, 'getSkipList').and.returnValue(of(skipped_device_res));
//     spyOn(protectIqservices, 'updateSkipStatus').and.returnValue(throwError(errorStatus401));
//     spyOn(protectIqservices, 'setAllSkipStatus').and.returnValue(of());
//     spyOn(component, 'showSkipDevices').and.callThrough();
//     spyOn(component, 'changeSkipStatus').and.callThrough();

//     //for skipped_device menu click
//     component.sectionToShow = 'skipped';
//     component.isError = false;
//     component.showSkipDevices();
//     fixture.detectChanges();

//     //for skipped device list click one device
//     fixture.nativeElement.querySelector('#piq-skipped-device tbody:nth-child(3) tr td div div div div').click();
//     fixture.detectChanges();

//     //for change skip
//     fixture.nativeElement.querySelector('.protectiq-skipped-table tbody:nth-child(1) tr td:nth-child(3) div button').click();
//     fixture.detectChanges();

//     //for skipAll click
//     fixture.nativeElement.querySelector('#sd-skip-all').click();
//     fixture.detectChanges();

//     //for scanAll click
//     fixture.nativeElement.querySelector('#sd-scan-all').click();
//   });

//   it('security setting tab click', () => {
//     spyOn(protectIqservices, 'getSecurityList').and.returnValue(of(security_setting_res));
//     spyOn(protectIqservices, 'setSecuritySettings').and.returnValue(of());
//     spyOn(component, 'showSecuritySettings').and.callThrough();
//     spyOn(component, 'onPAClick').and.callThrough();
//     spyOn(component, 'onPSDClick').and.callThrough();

//     //for security_settings tab click
//     fixture.nativeElement.querySelector('#piq-security-settings').click();
//     fixture.detectChanges();

//     //for IPS Protocol Anomaly click
//     fixture.nativeElement.querySelector('#selfHealbox').click();
//     fixture.detectChanges();
//     expect(component.securityType).toEqual(1);//for PA

//     //for IPS Port Scan Defense click
//     fixture.nativeElement.querySelector('#selfHealbox1').click();
//   });

//   it('security setting tab click error', () => {
//     spyOn(protectIqservices, 'getSecurityList').and.returnValue(throwError(errorStatus401));
//     spyOn(protectIqservices, 'setSecuritySettings').and.returnValue(of());
//     spyOn(component, 'showSecuritySettings').and.callThrough();
//     spyOn(component, 'onPAClick').and.callThrough();
//     spyOn(component, 'onPSDClick').and.callThrough();

//     //for security_settings tab click
//     fixture.nativeElement.querySelector('#piq-security-settings').click();
//     fixture.detectChanges();

//     //for IPS Protocol Anomaly click
//     fixture.nativeElement.querySelector('#selfHealbox').click();
//     fixture.detectChanges();
//     expect(component.securityType).toEqual(1);//for PA

//     //for IPS Port Scan Defense click
//     fixture.nativeElement.querySelector('#selfHealbox1').click();
//   });

//   it('onBoardedCheck test', () => {
//     spyOn(protectIqservices, 'getUserId').and.returnValue(of(newData));
//     component.onBoardedCheck();
//   });

//   it('onBoardedCheck test error', () => {
//     spyOn(protectIqservices, 'getUserId').and.returnValue(throwError(errorStatus401));
//     component.deviceInfo = 'CXNK00778D46';
//     component.onBoardedCheck();
//   });

//   it('onPAClick test', () => {
//     spyOn(protectIqservices, 'setSecuritySettings').and.returnValue(of({}));
//     component.onPAClick();
//     component.onPSDClick();
//   });
//   it('onPAClick test error', () => {
//     spyOn(protectIqservices, 'setSecuritySettings').and.returnValue(throwError(errorStatus401));
//     component.onPAClick();
//     component.onPSDClick();
//   });

//   it('deleteWhiteListItem test', () => {
//     spyOn(protectIqservices, 'removeItemInTrustList').and.returnValue(of({}));
//     component.deleteWhiteListItem('12345678');
//   });
//   it('deleteWhiteListItem test error', () => {
//     spyOn(protectIqservices, 'removeItemInTrustList').and.returnValue(throwError(errorStatus401));
//     component.deleteWhiteListItem('12345678');
//   });

//   it('changeSkipStatus test', () => {
//     spyOn(protectIqservices, 'updateSkipStatus').and.returnValue(of({}));
//     component.changeSkipStatus('12345678', true);
//   });
//   it('changeSkipStatus test error', () => {
//     spyOn(protectIqservices, 'updateSkipStatus').and.returnValue(throwError(errorStatus401));
//     component.changeSkipStatus('12345678', true);
//   });

//   it('skipStatusChangeAll test', () => {
//     spyOn(protectIqservices, 'setAllSkipStatus').and.returnValue(of({}));
//     component.skipStatusChangeAll(true);
//   });
//   it('skipStatusChangeAll test error', () => {
//     spyOn(protectIqservices, 'setAllSkipStatus').and.returnValue(throwError(errorStatus401));
//     component.skipStatusChangeAll(true);
//   });

//   it('showFeatureAvailability test', () => {
//     spyOn(protectIqservices, 'getFeatureAvailability').and.returnValue(of(availability_res));
//     component.showFeatureAvailability();
//   });
//   it('showFeatureAvailability test error', () => {
//     spyOn(protectIqservices, 'getFeatureAvailability').and.returnValue(throwError(errorStatus401));
//     component.showFeatureAvailability();
//   });

//   it('subscribe/unsubscribe test res', fakeAsync(() => {
//     spyOn(protectIqservices, 'setEnableStatus').and.returnValue(of(service_enable_disable));

//     component.deviceStatus = false;
//     component.toggleEnable(true);
//     tick(210000);
//     flush();
//   }));
//   it('subscribe/unsubscribe test error', fakeAsync(() => {
//     spyOn(protectIqservices, 'setEnableStatus').and.returnValue(throwError(errorStatus401));

//     component.deviceStatus = false;
//     component.toggleEnable(true);
//     tick(210000);
//     flush();
//   }));

//   it('showSkipDevices test', () => {
//     spyOn(protectIqservices, 'getSkipList').and.returnValue(of(skipped_device_res));
//     component.showSkipDevices(true);
//   });
//   it('showFeatureAvailability test error', () => {
//     spyOn(protectIqservices, 'getSkipList').and.returnValue(throwError(errorStatus401));
//     component.showSkipDevices();
//   });

//   it('onSubscription test', fakeAsync(() => {
//     component.deviceStatus = false;
//     spyOn(protectIqservices, 'setInstall').and.returnValue(of({}));
//     component.onSubscription(true);
//     tick(210000);
//     flush();
//   }));
//   it('onSubscription test', fakeAsync(() => {
//     component.deviceStatus = false;
//     component.enabledUpdated = true;
//     spyOn(protectIqservices, 'setInstall').and.returnValue(of({}));
//     component.onSubscription(true);
//     tick(210000);
//     flush();
//   }));
//   it('onSubscription test error', fakeAsync(() => {
//     component.deviceStatus = false;
//     spyOn(protectIqservices, 'setInstall').and.returnValue(throwError(errorStatus401));
//     component.onSubscription(true);
//     tick(210000);
//     flush();
//   }));

//   it('onSubscription test 1', fakeAsync(() => {
//     component.deviceStatus = true;
//     spyOn(protectIqservices, 'setUnInstall').and.returnValue(of({}));
//     component.onSubscription(false);
//     tick(210000);
//     flush();
//   }));
//   it('onSubscription test 1.1', fakeAsync(() => {
//     component.deviceStatus = true;
//     component.enabledUpdated = true;
//     spyOn(protectIqservices, 'setUnInstall').and.returnValue(of({}));
//     component.onSubscription(false);
//     tick(210000);
//     flush();
//   }));
//   it('onSubscription test error', fakeAsync(() => {
//     component.deviceStatus = true;
//     spyOn(protectIqservices, 'setUnInstall').and.returnValue(throwError(errorStatus401));
//     component.onSubscription(false);
//     tick(210000);
//     flush();
//   }));

//   it('toggleSubscription test', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscription').and.returnValue(of({}));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));
//   it('toggleSubscription test 1', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = true;
//     component.subscriptionUpdated = true;
//     component.undiscoveredGS = true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscription').and.returnValue(of({}));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));
//   it('toggleSubscription test error', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscription').and.returnValue(throwError(errorStatus401));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));

//   it('toggleSubscription test 2', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = !true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of({}));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));
//   it('toggleSubscription test 2.1', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = !true;
//     component.subscriptionUpdated = true;
//     component.undiscoveredGS = true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(of({}));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));
//   it('toggleSubscription test error', fakeAsync(() => {
//     component.deviceSubscription = true;
//     component.hasSubscriber = !true;
//     component.subscriberStructure = subscriberStructure;
//     spyOn(protectIqservices, 'toggleAppSubscriptionwithoutsubscriber').and.returnValue(throwError(errorStatus401));
//     component.toggleSubscription(!true);
//     tick(210000);
//     flush();
//   }));

//   it('onEnabled test', fakeAsync(() => {
//     component.deviceSubscription = true;
//     spyOn(protectIqservices, 'setEnabled').and.returnValue(of({}));
//     component.onEnabled();
//     tick(210000);
//     flush();
//   }));
//   it('onEnabled test error', fakeAsync(() => {
//     component.deviceSubscription = true;
//     spyOn(protectIqservices, 'setEnabled').and.returnValue(throwError(errorStatus401));
//     component.onEnabled();
//     tick(210000);
//     flush();
//   }));
//   it('onEnabled test setUnEnabled', fakeAsync(() => {
//     component.deviceSubscription = false;
//     spyOn(protectIqservices, 'setUnEnabled').and.returnValue(of({}));
//     component.onEnabled();
//     tick(210000);
//     flush();
//   }));
//   it('onEnabled test setUnEnabled error', fakeAsync(() => {
//     component.deviceSubscription = false;
//     spyOn(protectIqservices, 'setUnEnabled').and.returnValue(throwError(errorStatus401));
//     component.onEnabled();
//     tick(210000);
//     flush();
//   }));

//   it('updateAppTile test', fakeAsync(() => {
//     component.subscriberStructure = subscriberStructure;
//     component.deviceInfo = 'CXNK00778D46';
//     component.deviceSubscription = false;
//     spyOn(protectIqservices, 'tileStatus').and.returnValue(of({ profile: [] }));
//     component.updateAppTile();
//     tick(210000);
//     flush();
//   }));
//   it('updateAppTile test setUnEnabled error', fakeAsync(() => {
//     component.subscriberStructure = subscriberStructure;
//     component.deviceInfo = 'CXNK00778D46';
//     component.deviceSubscription = false;
//     spyOn(protectIqservices, 'tileStatus').and.returnValue(throwError(errorStatus401));
//     component.updateAppTile();
//     tick(210000);
//     flush();
//   }));

//   it('isWfhAvailable test', () => {
//     spyOn(dataService, 'fetchMetaDatavaluesNew').and.returnValue(of(ssidPool));
//     component.isWfhAvailable();
//   });

//   it('Is smarttown activated', () => {
//     sessionsubscriber.edgeSuites.myCommunityIQ.passpoint.enable = true;
//     spyOn(protectIqservices, 'getArloAccount').and.returnValue(of(sessionsubscriber));
//     component.getSubscribedStatus(true);
//     expect(fixture.nativeElement.querySelector('#materialInline3').getAttribute('disabled')).toEqual(false);
//     expect(fixture.nativeElement.querySelector('#materialInline10').getAttribute('disabled')).toEqual(true);
//   });

// });
