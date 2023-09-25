// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

// import { NetworkResilienceComponent } from './network-resilience.component';
// import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { async, of, throwError } from 'rxjs';
// import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';
// import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
// import { HttpTestingController } from '@angular/common/http/testing';
// import { environment } from 'src/environments/environment';

// describe('NetworkResilienceComponent', () => {
//   let component: NetworkResilienceComponent;
//   let fixture: ComponentFixture<NetworkResilienceComponent>;
//   const formBuilder: FormBuilder = new FormBuilder();
//   let supportWifiService: SupportWifiService;


//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [
//         NetworkResilienceComponent
//       ],
//       imports: [
//         ReactiveFormsModule,
//         RouterTestingModule,
//         HttpClientModule
//         // FormsModule,
//         // NgSelectModule,
//         // CalendarModule,
//       ],
//       providers: [
//         FormGroupDirective,
//         // { provide: FormBuilder, useValue: formBuilder }
//       ]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NetworkResilienceComponent);
//     component = fixture.componentInstance;
//     supportWifiService = TestBed.inject(SupportWifiService);
//     component.deviceConfigurationForm = formBuilder.group({
//       ssid: '',
//       password: '',
//     });
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     component.translateService.selectedLanguage.next({});
//     component.ngOnInit();
//     component.ssid;
//     expect(component).toBeTruthy();
//   });

//   it('should call all simple functions', () => {
//     component.signalStrength(0);
//     component.signalStrength(123);
//     component.siteSelected('', '');
//     component.onHotspotNameChanged();
//     component.deviceConfigurationForm.patchValue({
//       ssid: 'test',
//       password: 'test123'
//     });
//     component.onHotspotNameChanged();
//     component.onPasswordChange();

//     component.togglePasswordVisibility();
//     component.submitSelectedSSID();
//     component.selectedSecuritytype = 1;
//     component.submitSelectedSSID();
//     component.pageErrorHandle({
//       status: 401
//     });
//   });

//   it('should submit hotspot details - when API succeeds', () => {
//     spyOn(supportWifiService, 'backupwanwifiadd').and.returnValue(of({}));
//     component.submitHotspotDetails(false);
//   });

//   it('should submit hotspot details - when API fails', () => {
//     spyOn(supportWifiService, 'backupwanwifiadd').and.returnValue(throwError(errorStatus401));
//     component.submitHotspotDetails(false);
//   });

//   it('should get backup wifi info - case 1', () => {
//     spyOn(supportWifiService, 'backupwanwifi').and.returnValue(of({
//       backupWifis: [{
//         id: 1,
//         password: '',
//         ssid: 'new-connection',
//       }]
//     }));
//     component.getBackupWifiInfo(false);
//   });

//   it('should get backup wifi info - case 2', () => {
//     spyOn(supportWifiService, 'backupwanwifi').and.returnValue(of({
//       backupWifis: [{
//         id: 1,
//         password: '',
//         ssid: 'new-connection',
//       }]
//     }));
//     component.getBackupWifiInfo(true);
//   });

//   it('should get backup wifi info - case 3', () => {
//     spyOn(supportWifiService, 'backupwanwifi').and.returnValue(of({
//       backupWifis: []
//     }));
//     component.getBackupWifiInfo(false);
//   });

//   it('should get backup wan test status - case 1', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(of({
//       failReason: "",
//       result: "success"
//     }));
//     component.getBackupWanTestStatus();
//   });

//   it('should get backup wan test status - case 2', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(of({
//       failReason: "test-reason",
//       result: "failed"
//     }));
//     component.getBackupWanTestStatus();
//   });

//   it('should start backup wan test - case 1', () => {
//     spyOn(supportWifiService, 'teststartbw').and.returnValue(of({}));
//     component.startBackupWanTest();
//   });

//   it('should get backup wan test status periodically - when API succeeds - case 1', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(of({
//       failReason: "",
//       result: "success",
//     }));
//     component.getBackupWanTestStatusPeriodically();
//   });

//   it('should get backup wan test status periodically - when API succeeds - case 2', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(of({
//       failReason: "",
//       result: "failed",
//     }));
//     component.getBackupWanTestStatusPeriodically();
//   });

//   it('should get backup wan test status periodically - when API succeeds - case 3', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(of({
//       failReason: "",
//       result: "",
//     }));
//     component.getBackupWanTestStatusPeriodically();
//   });

//   it('should get backup wan test status periodically - when API fails', () => {
//     spyOn(supportWifiService, 'teststatusbw').and.returnValue(throwError(errorStatus401));
//     component.getBackupWanTestStatusPeriodically();
//   });

//   it('should run site scan - when API succeeds', () => {
//     spyOn(supportWifiService, 'sitestartbw').and.returnValue(of({}));
//     component.runSiteScan();
//   });

//   it('should run site scan - when API fails', () => {
//     spyOn(supportWifiService, 'sitestartbw').and.returnValue(throwError(errorStatus401));
//     component.runSiteScan();
//   });

//   it('should end hotspot - when API succeeds', () => {
//     spyOn(supportWifiService, 'teststopbw').and.returnValue(of({}));
//     component.endHotspot();
//   });

//   it('should end hotspot - when API fails', () => {
//     spyOn(supportWifiService, 'teststopbw').and.returnValue(throwError(errorStatus401));
//     component.endHotspot();
//   });

//   it('should get site scan result - when API succeeds', () => {
//     spyOn(supportWifiService, 'sitescanresultbw').and.returnValue(of({}));
//     component.sitescanresult();
//   });

//   it('should get site scan result - when API fails', () => {
//     spyOn(supportWifiService, 'sitescanresultbw').and.returnValue(throwError(errorStatus401));
//     component.sitescanresult();
//   });

// });
