// import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { RouterTestingModule } from '@angular/router/testing';
// import { TranslateService } from 'src/app-services/translate.service';
// import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
// import { WanFailoverComponent } from './wan-failover.component';

// import { backupwandata, statusapires, backwanerror, sitescanres } from 'src/assets/mockdata/support/support-wifi/wanfailover';
// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SupportWifiService } from '../services/support-wifi.service';
// import { throwError, of } from 'rxjs';
// import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
// import { event } from 'jquery';
// import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';

// describe('WanFailoverComponent', () => {
//   let component: WanFailoverComponent;
//   let fixture: ComponentFixture<WanFailoverComponent>;
//   let api: SupportWifiService
//   let ssoService: SsoAuthService;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [WanFailoverComponent],
//       imports: [RouterTestingModule, HttpClientTestingModule
//       ],
//       providers: [TranslateService, SupportWifiService, SsoAuthService, FormBuilder, FormsModule, ReactiveFormsModule]
//     })
//       .compileComponents()
//       .then(() => {
//         api = TestBed.inject(SupportWifiService);
//         ssoService = TestBed.inject(SsoAuthService);
//         fixture = TestBed.createComponent(WanFailoverComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//       });
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WanFailoverComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('wanfailover functions with onInit flow', () => {
//     spyOn(component, 'backupwanwifi').and.callThrough();
//     expect(component).toBeTruthy();
//     component.ngOnInit();
//     fixture.detectChanges();

//   })
//   it('wanfailover function', () => {
//     spyOn(api, 'backupwanwifi').and.returnValue(of(backupwandata))

//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.backupwanwifi();
//     expect(component).toBeTruthy();
//   })
//   it('testapicall function', fakeAsync(() => {
//     spyOn(api, 'teststartbw').and.returnValue(of({}))

//     let id = 1
//     component.teststatusres = false
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.testapicall(id);
//     component.teststatusintervalcall(id);
//     //expect(component).toBeTruthy();   
//     tick(200000);
//     flush();
//   }))
//   it('endhotspotclick function', () => {
//     spyOn(api, 'teststopbw').and.returnValue(of({}))

//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.endhotspotclick();
//     expect(component).toBeTruthy();
//   })

//   it('teststatusintervalcall success  function', () => {
//     spyOn(api, 'teststatusbw').and.returnValue(of(statusapires))
//     let id = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.teststatusintervalcall(id);
//     statusapires.result = 'success'
//     expect(component).toBeTruthy();
//   })
//   it('teststatusintervalcall failed function', () => {
//     spyOn(api, 'teststatusbw').and.returnValue(of(statusapires))

//     let id = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.teststatusintervalcall(id);
//     statusapires.result = 'failed'
//     expect(component).toBeTruthy();
//   })
//   it('teststatusintervalcall Inprogress  function', () => {
//     spyOn(api, 'teststatusbw').and.returnValue(of(statusapires))

//     let id = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.teststatusintervalcall(id);
//     statusapires.result = 'Inprogress'
//     expect(component).toBeTruthy();
//   })

//   it('runSiteScan function', fakeAsync(() => {
//     spyOn(api, 'sitestartbw').and.returnValue(of())

//     let id = 1
//     component.sitescanreslength = 5
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.runSiteScan();
//     component.sitescanresult();
//     tick(3000);
//     flush();
//   }))

//   it('sitescanresult function', () => {
//     spyOn(api, 'sitescanresultbw').and.returnValue(of(sitescanres))

//     let id = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.sitescanresult();
//     expect(component).toBeTruthy();
//   })


//   it('updateStaffnetworkwhiletoggle function', () => {
//     spyOn(api, 'backupwanwifiupdate').and.returnValue(of({}))

//     let event = true
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.updateStaffnetworkwhiletoggle(event);
//     expect(component).toBeTruthy();
//   })

//   it('updateCaptiveportalwhiletoggle function', () => {
//     spyOn(api, 'backupwanwifiupdate').and.returnValue(of({}))

//     let event = true
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.updateCaptiveportalwhiletoggle(event);
//     expect(component).toBeTruthy();
//   })

//   it('SignalStrength function', () => {
//     let type = 0
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.SignalStrength(type);
//     expect(component).toBeTruthy();
//   })
//   it('SignalStrength function', () => {
//     let type = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.SignalStrength(type);
//     expect(component).toBeTruthy();
//   })

//   it('bakwanandtestapi function', () => {
//     spyOn(api, 'backupwanwifi').and.returnValue(of(backupwandata))

//     let id = 1
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.bakwanandtestapi();
//     component.bakwanreslenght = 5
//     component.testapicall(id);

//     expect(component).toBeTruthy();
//   })
//   it('testhotspotclick first time function', fakeAsync(() => {
//     spyOn(api, 'backupwanwifiadd').and.returnValue(of(backupwandata))
//     component.hotspotnamefrombakwan = ""
//     component.bakwanreslenght = 3
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.testhotspotclick();
//     component.bakwanandtestapi();
//     //expect(component).toBeTruthy();
//     tick(40000);
//     flush();
//   }))

//   it('testhotspotclick existing ssid function', fakeAsync(() => {
//     spyOn(api, 'backupwanwifiupdate').and.returnValue(of(backupwandata))

//     component.hotspotnamefrombakwan = "smb"
//     component.bakwanreslenght = 2
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.testhotspotclick();
//     component.bakwanandtestapi();
//     // expect(component).toBeTruthy();  
//     tick(40000);
//     flush();
//   }))
//   it('showPassPhrasefun function', () => {
//     component.showPassPhrase = true
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.showPassPhrasefun();
//     expect(component).toBeTruthy();
//   })
//   it('hidePassPhrasefun function', () => {
//     component.showPassPhrase = false
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.showPassPhrasefun();
//     expect(component).toBeTruthy();
//   })
//   it('selectssidfun function', () => {
//     component.selectdisable = false
//     component.radioselectiondata = "Automation"
//     component.radioselectionsecuritytype = 3
//     // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
//     component.selectssidfun(false, "Automation", 3);
//     expect(component).toBeTruthy();
//   })

//   it('selectssidoverlay 0 function', () => {
//     component.radioselectionsecuritytype = 0

//     component.selectssidoverlay();
//     expect(component).toBeTruthy();
//   })
//   it('selectssidoverlay 1 function', () => {
//     component.radioselectionsecuritytype = 1

//     component.selectssidoverlay();
//     expect(component).toBeTruthy();
//   })
//   it('selectoverlay', () => {

//     component.selectoverlay();
//     expect(component).toBeTruthy();
//   })
//   it('onKeyPhraseChange', () => {
//     let event = { "target": { "value": "ssid" } }
//     component.onKeyPhraseChange(event);
//     expect(component).toBeTruthy();
//   })
//   it('onKeyPhraseChange', () => {
//     let event = { "target": { "value": "wanfailover" } }
//     component.onKeyPhraseChange(event);
//     expect(component).toBeTruthy();
//   })

//   it('pageErrorHandle function', () => {
//     spyOn(component, 'pageErrorHandle').and.callThrough();
//     component.pageErrorHandle(backwanerror);
//     expect(component.pageErrorHandle).toHaveBeenCalled();
//   });


// });
