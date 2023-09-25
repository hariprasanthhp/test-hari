import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SsidData, availability, iosdata, statusData, addSsidData, updateSsidData, deleteSsidData, deviceData, radioSummary, getUserIds, networkLoadedTypes, smbwifitypes, smbEditSSID, updateScondarySSID, editPrimarySsid, encryptionTypes, updateSMBSSID, getCaptivePortal, ssidAvailability, deviceInfo } from 'src/assets/mockdata/support/support-wifi/ssid.dada';
import { DataServiceService } from '../../data.service';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import { SupportWifiService } from '../services/support-wifi.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { SsidPoolingComponent } from './ssid-pooling.component';
import { from, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { EnglishJSON } from 'src/assets/language/english.service';
import { metaData } from 'src/assets/mockdata/support/shared/subscriber-menu.data';
import { SupportRadioObjectModel } from '../../shared/models/support-radio-object.model';
import { CaptivePortalService } from '../../support-application/shared/service/captive-portal.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { CustomReplacePipe } from '../../shared/custom-pipes/coustom-replace.pipe';
import { wifiFetchSecurityOptionsFromSSIDMeta } from '../../shared/service/utility.class';
import { CommandiqProComponent } from 'src/app/sys-admin/mobile-app/commandiq-pro/commandiq-pro.component';

describe('SsidPoolingComponent', () => {
  let component: SsidPoolingComponent;
  let fixture: ComponentFixture<SsidPoolingComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let dataService: DataServiceService;
  let radioService: SupportRadioService;
  let ssoAuthService: SsoAuthService;
  let api: SupportWifiService;
  let languageService: TranslateService;
  let captivePortalService: CaptivePortalService
  let primary_Two_four_ghz: any;
  let primary_Five_ghz: any;
  let six_ghz: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SsidPoolingComponent, CustomReplacePipe],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'support/wifi/ssid', component: SsidPoolingComponent },
        ]),
        HttpClientTestingModule
        , NgSelectModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        SupportRadioService,
        SsoAuthService,
        NgbModal,
        SupportWifiService,
        DataServiceService,
        HttpClient,
        PrimeNGConfig,
      ]
    })
      .compileComponents().then(() => {
        dataService = TestBed.inject(DataServiceService);
        radioService = TestBed.inject(SupportRadioService);
        languageService = TestBed.inject(TranslateService);
        ssoAuthService = TestBed.inject(SsoAuthService);
        captivePortalService = TestBed.inject(CaptivePortalService);
        api = TestBed.inject(SupportWifiService);
        fixture = TestBed.createComponent(SsidPoolingComponent);
        component = fixture.componentInstance;
        //component.serialNumber = "CXNK00FF9B31";
        // component.serialNumber = "CXNK008A79A9";
        component.serialNumber = "CXNK01027635";
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
        localStorage.setItem('calix.csc_type', 'EME')
        component.ssidObjectobj = SsidData["secondary-ssid"];
        component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
        component.checkingvaluesArray = SsidData["availability"];
        component.smbSsidList = SsidData["smb-ssid"];
        primary_Two_four_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID1");
        primary_Five_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID9");
        six_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17" && !x.SSID?.startsWith("RESERVED-6G-"));
      });;
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SsidPoolingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";

    spyOn(api, 'getRadioSummary').and.returnValue(of(radioSummary));
    component.deviceData = deviceData;
    component.serialNumber = "1234";
    component.hasPassPhraseAccess = true;
    component.isRgWfifiAvailable = true;
    ssoAuthService.setCscType('EME');
    component.deviceWoRG = [];

    component.deviceList = [];
    component.ngOnInit();
    fixture.detectChanges();

    ssoAuthService.setCscType('DME');
    component.ngOnInit();
    fixture.detectChanges();


    component.deviceData = deviceData;
    component.serialNumber = '';
    component.isRgWfifiAvailable = false;
    component.deviceWoRG = [];
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();

  })


  it('availability data', fakeAsync(() => {
    component.serialNumber = "1234";
    component.fetchMetaData('1234')
    component.landingPage();
    flush(500);
  }));

  it('should get availability data', () => {

    spyOn(dataService, 'getAvailibilityStatus').and.returnValue(of(availability));

    spyOn(component, 'landingPage').and.callThrough();
    component.landingPage();
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });
  // it('should fetchSSIDListValues', () => {
  //   spyOn(dataService, 'fetchMetaDatavaluesNew').and.returnValue(of(SsidData));
  //   component.fetchSSIDListValues(component.orgId, component.serialNumber);
  //   expect(component).toBeTruthy();
  // });
  it('should comparePrimarySSID', () => {

    component.isSSID2_4GZ = true;
    component.isSSID5_4GZ = true;
    component.isSSID6_4GZ = true;
    component.ssidObjectobj = SsidData["secondary-ssid"];
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    component.checkingvaluesArray = SsidData["availability"];
    component.smbSsidList = SsidData["smb-ssid"];
    primary_Two_four_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID1");
    primary_Five_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID9");
    six_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17" && !x.SSID?.startsWith("RESERVED-6G-"));
    primary_Five_ghz[0].securityType = "Basic";


    component.comparePrimarySSID(primary_Five_ghz[0], primary_Five_ghz[0], primary_Five_ghz[0]);
    fixture.detectChanges();

    component.isSSID2_4GZ = true;
    component.isSSID5_4GZ = true;
    component.isSSID6_4GZ = false;
    component.comparePrimarySSID(primary_Five_ghz[0], primary_Five_ghz[0], primary_Five_ghz[0]);
    fixture.detectChanges();

    expect(component).toBeTruthy();

  });
  it('should fetchSSIDListValues', () => {
    spyOn(dataService, 'fetchMetaDatavaluesNew').and.returnValue(of(SsidData));
    component.deviceInfo = deviceInfo;

    component.checkThirdParty();
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    var iscompared = component.comparePrimarySSID(primary_Five_ghz[0], primary_Five_ghz[0], primary_Five_ghz[0]);
    console.log(iscompared, "iscompared")
    component.compareConstructEditSSIDData(primary_Two_four_ghz[0])
    component.compareConstructEditSSIDData(primary_Five_ghz[0])
    component.compareConstructEditSSIDData(six_ghz[0]);
    component.metaData = metaData;

    component.fetchSSIDListValues(component.orgId, component.serialNumber, false);
    fixture.detectChanges();

    // six_ghz = component.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17" && !x.SSID?.startsWith("RESERVED-6G-"));
    let index = component.ssidObjectobj2?.findIndex(x => x.SSIDName == "SSID17");
    console.log(index, "index")
    if (index != -1) {
      component.ssidObjectobj2[index].SSID = "RESERVED-6G-Test";
    }


    component.fetchSSIDListValues(component.orgId, component.serialNumber, false);
    fixture.detectChanges();

    expect(component.ssidObjectobj).toBeTruthy("No data available");
    expect(component.ssidObjectobj?.length).toBe(13, "Length is wrong");
    expect(component.ssidObjectobj[1]?.ssid).toMatch('SMBSTF_CXNK0092349001');

  });



  it('should get getqoslist_V2 data', () => {
    component.serialNumber = "CXNK00FF9B31";
    spyOn(dataService, 'getqoslist_V2').and.returnValue(of(iosdata));

    spyOn(component, 'getQosListData').and.callThrough();
    component.getQosListData("06eae341-6e18-4253-a893-5f0fac3c45b2");
    expect(component.iosdata).toBeTruthy("No data available");

    expect(component.iosdata).toBe(true);

  });
  it('sshould get getqoslist_V2 data error', () => {
    spyOn(dataService, 'getqoslist_V2').and.returnValue(throwError(errorStatus401));
    spyOn(component, 'getQosListData').and.callThrough();
    component.getQosListData("06eae341-6e18-4253-a893-5f0fac3c45b2");
    expect(component).toBeTruthy();
  });
  it('should get getDeviceStatus data', () => {
    spyOn(dataService, 'getDeviceStatus').and.returnValue(of(statusData));

    spyOn(component, 'getDeviceStatus').and.callThrough();
    component.getDeviceStatus();
    expect(component.tempDeviceStatus).toBeTruthy("No data available");
    expect(component.tempDeviceStatus).toBe(true);

  });
  it('should get getDeviceStatus data error', () => {
    spyOn(dataService, 'getDeviceStatus').and.returnValue(throwError(errorStatus401));
    spyOn(component, 'getDeviceStatus').and.callThrough();
    component.getDeviceStatus();
    expect(component).toBeTruthy();
  });


  it('should onSubmitAddSSID', () => {
    spyOn(component, 'onSubmitAddSSID').and.callThrough();

    const frm = <NgForm>{
      valid: true
    };

    spyOn(dataService, 'addfunctionforssidpolling').and.returnValue(of(addSsidData));
    spyOn(component, 'closeModal').and.callThrough()
    component.ssidobjectFormAdd = addSsidData;
    component.softwareVersion = 22.2

    component.ssidobjectFormAdd.type = 1;
    component.onSubmitAddSSID(frm);

    component.ssidobjectFormAdd.type = 2;
    component.onSubmitAddSSID(frm);

    component.ssidobjectFormAdd.type = 3;
    component.onSubmitAddSSID(frm);

    component.ssidobjectFormAdd.type = 4;
    component.onSubmitAddSSID(frm);

    component.ssidobjectFormAdd.type = 5;
    component.onSubmitAddSSID(frm);

    component.ssidobjectFormAdd.type = 6;
    component.onSubmitAddSSID(frm);


    expect(component.onSubmitAddSSID).toHaveBeenCalled();
    // expect(component.onSubmitAddSSID).toHaveBeenCalledTimes(2);

    expect(component.closeModal()).toBeUndefined();

  });

  it('should updateUnfiedPrimary ssid', () => {

    component.oldPassword = "98765432345678";
    component.oldSsidData = updateSsidData;
    component.oldSSIDForm = updateSsidData;
    component.wiFi6Enable = true;
    component.ssidObjectForm = updateSsidData;
    spyOn(radioService, 'updateSSIDConfigList').and.returnValue(of(updateSsidData));
    component.ssidObjectForm.isUnifiedPrimary = true;
    spyOn(component, 'updateSsidManager').and.callThrough();
    component.updateSsidManager();

    spyOn(component, 'closeModal').and.callThrough()

    expect(component.updateSsidManager).toHaveBeenCalled();
    expect(component.updateSsidManager).toHaveBeenCalledTimes(1);

    expect(component.closeModal()).toBeUndefined();

  });
  it('should updatePrimaryAllBands ssid', () => {

    component.oldPassword = "98765432345678";
    component.oldSsidData = updateSsidData;
    component.oldSSIDForm = updateSsidData;
    component.wiFi6Enable = true;
    component.ssidObjectForm = updateSsidData;
    spyOn(radioService, 'updateSSIDConfigList').and.returnValue(of(updateSsidData));
    component.two_fourSSIDFrequenyBands = true;
    component.five_gSSIDFrequenyBands = true;
    component.six_gSSIDFrequenyBands = true;
    spyOn(component, 'updateSsidManager').and.callThrough();
    component.updateSsidManager();

    spyOn(component, 'closeModal').and.callThrough()

    expect(component.updateSsidManager).toHaveBeenCalled();
    expect(component.updateSsidManager).toHaveBeenCalledTimes(1);

    expect(component.closeModal()).toBeUndefined();

  }); it('should updatePrimaryTwoBands ssid', () => {

    component.oldPassword = "98765432345678";
    component.oldSsidData = updateSsidData;
    component.oldSSIDForm = updateSsidData;
    component.wiFi6Enable = true;
    component.ssidObjectForm = updateSsidData;
    spyOn(radioService, 'updateSSIDConfigList').and.returnValue(of(updateSsidData));
    component.two_fourSSIDFrequenyBands = true;
    component.five_gSSIDFrequenyBands = true;
    component.six_gSSIDFrequenyBands = false;
    component.ssidObjectForm.isUnifiedPrimary = false;
    spyOn(component, 'updateSsidManager').and.callThrough();
    component.updateSsidManager();

    spyOn(component, 'closeModal').and.callThrough()

    expect(component.updateSsidManager).toHaveBeenCalled();
    expect(component.updateSsidManager).toHaveBeenCalledTimes(1);

    expect(component.closeModal()).toBeUndefined();

  });

  it('delete SSID', () => {

    let id = 'a303ca50-fee9-4cc4-b25d-e8d12f8467b0';
    spyOn(dataService, 'deleteSSID').and.returnValue(of(deleteSsidData));


    spyOn(component, 'delete').and.callThrough();
    component.delete(deleteSsidData);

    spyOn(component, 'closeModal').and.callThrough()
    expect(component.closeModal()).toBeUndefined();
  });
  it('should getUserIds', () => {

    component.isbSmb = true;
    spyOn(dataService, 'getUserIdValues').and.returnValue(of(getUserIds));


    spyOn(component, 'getUserIds').and.callThrough();
    component.getUserIds(component.serialNumber);

    expect(component.getUserIds).toHaveBeenCalled();
    expect(component.getUserIds).toHaveBeenCalledTimes(1);
  });

  it('should networkload', () => {

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getnetworktypevalues').and.returnValue(of(networkLoadedTypes));


    spyOn(component, 'networkload').and.callThrough();
    component.networkload(userId);

    expect(component.networkload).toHaveBeenCalled();
    expect(component.networkload).toHaveBeenCalledTimes(1);
  });

  it('should networkload', () => {

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));


    spyOn(component, 'Encryptionload').and.callThrough();
    component.Encryptionload(userId);

    expect(component.Encryptionload).toHaveBeenCalled();
    expect(component.Encryptionload).toHaveBeenCalledTimes(1);
  });


  it('should getSMBWifiTypes', () => {

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getSMBWifiTypes').and.returnValue(of(smbwifitypes));


    spyOn(component, 'getSMBWifiTypes').and.callThrough();
    component.getSMBWifiTypes();

    expect(component.getSMBWifiTypes).toHaveBeenCalled();
    expect(component.getSMBWifiTypes).toHaveBeenCalledTimes(1);
  });




  it('should addSSID', () => {
    // component.ssidobjectFormAdd = {};
    component.softwareVersion = 22.2
    component.tempDeviceStatus = true;
    spyOn(dataService, 'getnetworktypevalues').and.returnValue(of(networkLoadedTypes));

    spyOn(component, 'addSSID').and.callThrough();
    component.addSSID();

    component.tempDeviceStatus = false;
    component.addSSID();
    fixture.detectChanges();


    component.tempDeviceStatus = true;
    component.iosdata = true;
    component.softwareVersion = 22.0;
    component.addSSID();

    component.tempDeviceStatus = false;;
    component.iosdata = true;
    component.softwareVersion = 22.0;
    component.addSSID();
    expect(component.addSSID).toHaveBeenCalled();
    expect(component.addSSID).toHaveBeenCalledTimes(4);
  });
  it('should edit SSID', () => {
    let ssidobject = SsidData["primary-operator-ssid"][0];
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    let secSsidobject = SsidData["secondary-ssid"][0];
    spyOn(component, 'editSSID').and.callThrough();
    component.metaData = metaData;
    component.ssidObjectForm.SSIDName = 'SSID17'
    // component.metaData = metaData;
    component.show = true;

    component.isInL2BridgeWarningMsg = true;

    component.editSSIDold(ssidobject);
    component.fetchAllSSIDRadioName(ssidobject);
    component.metaData = metaData;
    ssidobject.networktype = "Primary";
    component.ssidObjectForm.SSIDName = 'SSID17'
    component.editSSID(ssidobject);
    fixture.detectChanges();

    component.hasSmbSSIDs = true;
    smbEditSSID.type = 3;
    smbEditSSID.clientIsolated = true;
    smbEditSSID.enabledStatus = true;
    smbEditSSID.hidden = true;
    component.getSMBWifiTypes();
    component.SMBWifiTypes = smbwifitypes.types;

    component.editSSID(smbEditSSID);
    fixture.detectChanges();

    smbEditSSID.type = 2;
    smbEditSSID.passwordMode = 2;
    component.editSSID(smbEditSSID);
    fixture.detectChanges()

    component.hasSmbSSIDs = false;
    secSsidobject.networktype = "";
    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    component.networkload(userId);
    component.NetworkTypes = networkLoadedTypes.types;
    component.EncryptionTypes = encryptionTypes.types;
    // component.softwareVersion = 22.3;
    component.editSSID(secSsidobject);
    fixture.detectChanges();


    component.softwareVersion = 22.0;
    component.tempDeviceStatus = false;
    component.editSSID(secSsidobject);
    fixture.detectChanges();

    component.softwareVersion = 22.3;
    component.tempDeviceStatus = true;

    component.bwShapingOn = true;
    component.iosdata = false;
    component.editSSID(secSsidobject);
    fixture.detectChanges();

    component.bwShapingOn = false;
    component.iosdata = true;
    component.editSSID(secSsidobject);
    fixture.detectChanges();

    component.bwShapingOn = false;
    component.iosdata = false;
    component.editSSID(secSsidobject);
    fixture.detectChanges();

    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));
    spyOn(dataService, 'getnetworktypevalues').and.returnValue(of(networkLoadedTypes));
    component.editSSID(secSsidobject);
    fixture.detectChanges();
    expect(component.editSSID).toHaveBeenCalled();
    // expect(component.editSSID).toHaveBeenCalledTimes(1);
  });

  it('should updateSecondarySSID', () => {
    const frm = <NgForm>{
      valid: true
    };
    component.datapickershow = false;
    component.ssidObjectForm = updateScondarySSID;
    let result = {
      "result": "OK"
    }
    component.ssidObjectForm.type = 1;
    component.updateSSID(frm);
    fixture.detectChanges();

    component.ssidObjectForm.type = 2;
    component.updateSSID(frm);
    fixture.detectChanges();

    component.ssidObjectForm.type = 3;
    component.updateSSID(frm);
    fixture.detectChanges();

    component.ssidObjectForm.type = 4;
    component.updateSSID(frm);
    fixture.detectChanges();

    component.ssidObjectForm.type = 5;
    component.updateSSID(frm);
    fixture.detectChanges();

    component.ssidObjectForm.type = 6;
    component.updateSSID(frm);
    fixture.detectChanges();

    spyOn(dataService, 'updatefunctionssidpolling').and.returnValue(of(result));
    spyOn(component, 'updateSSID').and.callThrough();
    component.updateSSID(frm);
    component.closeModal();
    setTimeout(() => {

      component.fetchSSIDListValues(component.orgId, component.serialNumber);

    }, 1000);

    expect(component.updateSSID).toHaveBeenCalled();
    expect(component.updateSSID).toHaveBeenCalledTimes(1);
  });
  it('sshould get updateSSID data error', () => {
    const frm = <NgForm>{
      valid: true
    };
    component.ssidObjectForm = updateScondarySSID;
    spyOn(dataService, 'updatefunctionssidpolling').and.returnValue(throwError(errorStatus401));
    spyOn(component, 'updateSSID').and.callThrough();
    component.updateSSID(frm);
    expect(component).toBeTruthy();
  });


  it('should fetchMetaData', () => {

    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));
    spyOn(dataService, 'fetchMetaData').and.returnValue(of(metaData));
    spyOn(component, 'fetchMetaData').and.callThrough();

    component.fetchMetaData(component.serialNumber);

    expect(component.fetchMetaData).toHaveBeenCalled();
    expect(component.fetchMetaData).toHaveBeenCalledTimes(1);
  });
  it('should toglePasswordDisplay', () => {
    component.showPassword = "password";
    spyOn(component, 'toglePasswordDisplay').and.callThrough();
    component.toglePasswordDisplay();

    expect(component.toglePasswordDisplay).toHaveBeenCalled();
    expect(component.toglePasswordDisplay).toHaveBeenCalledTimes(1);
  });
  it('should onSecurityChange', () => {
    var event = { id: "11iandWPA3" };
    component.ssidObjectForm = SsidData["primary-operator-ssid"][0];
    spyOn(component, 'onSecurityChange').and.callThrough();
    component.onSecurityChange(event);

    expect(component.onSecurityChange).toHaveBeenCalled();
    expect(component.onSecurityChange).toHaveBeenCalledTimes(1);
  });


  it('should showPrimaryPassword', () => {
    var event = {};
    spyOn(component, 'showPrimaryPassword').and.callThrough();
    let ssidobject = SsidData["primary-operator-ssid"][0];
    component.showPrimaryPassword(event, ssidobject);

    expect(component.showPrimaryPassword).toHaveBeenCalled();
    expect(component.showPrimaryPassword).toHaveBeenCalledTimes(1);
  });
  it('should hidePrimaryPassword', () => {
    var event = 3;
    spyOn(component, 'hidePrimaryPassword').and.callThrough();
    let ssidobject = SsidData["primary-operator-ssid"][0];
    component.hidePrimaryPassword(event);

    expect(component.hidePrimaryPassword).toHaveBeenCalled();
    expect(component.hidePrimaryPassword).toHaveBeenCalledTimes(1);
  });


  it('should showSecondaryPassword', () => {
    var event = 0;
    spyOn(component, 'showSecondaryPassword').and.callThrough();
    var object = SsidData["secondary-ssid"][0];
    component.showSecondaryPassword(event, object);

    expect(component.showSecondaryPassword).toHaveBeenCalled();
    expect(component.showSecondaryPassword).toHaveBeenCalledTimes(1);
  });
  it('should hideSecondaryPassword', () => {
    var event = 0;
    spyOn(component, 'hideSecondaryPassword').and.callThrough();
    component.hideSecondaryPassword(event);

    expect(component.hideSecondaryPassword).toHaveBeenCalled();
    expect(component.hideSecondaryPassword).toHaveBeenCalledTimes(1);
  });
  it('should fetchAllSSIDRadioName', () => {
    let ssidobject = SsidData["primary-operator-ssid"][0];
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    spyOn(component, 'fetchAllSSIDRadioName').and.callThrough();
    component.fetchAllSSIDRadioName(ssidobject);

    expect(component.fetchAllSSIDRadioName).toHaveBeenCalled();
    expect(component.fetchAllSSIDRadioName).toHaveBeenCalledTimes(1);
  });

  it('should editSSIDold', () => {
    let ssidobject = SsidData["primary-operator-ssid"][0];
    spyOn(component, 'editSSIDold').and.callThrough();
    //spyOn(component, 'fetchAllSSIDRadioName').and.callThrough();
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    component.editSSIDold(ssidobject);
    component.metaData = metaData;
    component.fetchAllSSIDRadioName(ssidobject);

    expect(component.editSSIDold).toHaveBeenCalled();
    expect(component.editSSIDold).toHaveBeenCalledTimes(1);
  });

  it('should constructEditSSIDData', () => {
    let ssidobject = SsidData["primary-operator-ssid"][0];
    component.metaData = metaData;
    spyOn(component, 'constructEditSSIDData').and.callThrough();
    //spyOn(component, 'fetchAllSSIDRadioName').and.callThrough();
    component.ssidObjectobj2 = SsidData["primary-operator-ssid"];
    component.constructEditSSIDData(ssidobject);


    expect(component.constructEditSSIDData).toHaveBeenCalled();
    expect(component.constructEditSSIDData).toHaveBeenCalledTimes(1);
  });
  it('should CheckBoxChangeAddBand24', () => {
    component.ssidobjectFormAdd = addSsidData;
    spyOn(component, 'CheckBoxChangeAddBand24').and.callThrough();
    component.CheckBoxChangeAddBand24(true);
    expect(component.CheckBoxChangeAddBand24).toHaveBeenCalled();
    expect(component.CheckBoxChangeAddBand24).toHaveBeenCalledTimes(1);
  });
  it('should CheckBoxChangeAddBand5', () => {

    component.ssidobjectFormAdd = addSsidData;
    spyOn(component, 'CheckBoxChangeAddBand5').and.callThrough();
    component.CheckBoxChangeAddBand5(true);
    expect(component.CheckBoxChangeAddBand5).toHaveBeenCalled();
    expect(component.CheckBoxChangeAddBand5).toHaveBeenCalledTimes(1);
  });
  it('should CheckBoxChangeAddBand6', () => {

    component.ssidobjectFormAdd = addSsidData;
    spyOn(component, 'CheckBoxChangeAddBand6').and.callThrough();
    component.CheckBoxChangeAddBand6(true);
    expect(component.CheckBoxChangeAddBand6).toHaveBeenCalled();
    expect(component.CheckBoxChangeAddBand6).toHaveBeenCalledTimes(1);
  });

  it('should onSecurityChangeADD', () => {
    var event = {
      "description": "SecurityOff",
      "value": 0
    }
    component.ssidobjectFormAdd = addSsidData;
    spyOn(component, 'onSecurityChangeAdd').and.callThrough();
    component.onSecurityChangeAdd(event);

    expect(component.onSecurityChangeAdd).toHaveBeenCalled();
    expect(component.onSecurityChangeAdd).toHaveBeenCalledTimes(1);
  });
  it('should onSecurityChangeEdit', () => {
    var event = {
      "description": "SecurityOff",
      "value": 0
    }
    component.ssidobjectFormAdd = addSsidData;
    spyOn(component, 'onSecurityChangeedit').and.callThrough();
    component.onSecurityChangeedit(event);

    expect(component.onSecurityChangeedit).toHaveBeenCalled();
    expect(component.onSecurityChangeedit).toHaveBeenCalledTimes(1);
  });
  it('should TypechangeAdd', () => {
    component.ssidobjectFormAdd = {};
    var event = {
      "description": "Guest",
      "value": 1
    }
    component.EncryptionTypes = encryptionTypes.types
    component.ssidobjectFormAdd = addSsidData;

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));
    spyOn(component, 'Encryptionload').and.callThrough();
    component.Encryptionload(userId);


    spyOn(component, 'TypechangeAdd').and.callThrough();
    component.TypechangeAdd(event);
    fixture.detectChanges();

    event.description = "WFH";
    event.value = 2;
    component.bwShapingOn = true;
    component.TypechangeAdd(event);
    fixture.detectChanges();

    event.description = "WFH";
    event.value = 2;
    component.bwShapingOn = false;
    component.TypechangeAdd(event);
    fixture.detectChanges();

    event.description = "Custom unified";
    event.value = 3;
    component.TypechangeAdd(event);
    fixture.detectChanges();

    event.description = "Custom 2.4 GHz";
    event.value = 4;
    component.TypechangeAdd(event);
    fixture.detectChanges();
    event.description = "Custom 2.4 GHz";

    event.description = "Custom 5 GHz";
    event.value = 5;
    component.TypechangeAdd(event);
    fixture.detectChanges();

    event.description = "Custom 6 GHz";
    event.value = 6;
    component.TypechangeAdd(event);
    fixture.detectChanges();

    // expect(component.TypechangeAdd).toHaveBeenCalled();
    // expect(component.TypechangeAdd).toHaveBeenCalledTimes(1);
  });
  it('should TypechangeEditload', () => {

    component.ssidObjectForm = addSsidData;
    let event = "Guest";
    component.EncryptionTypes = encryptionTypes.types
    component.ssidobjectFormAdd = addSsidData;

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));
    spyOn(component, 'Encryptionload').and.callThrough();
    component.Encryptionload(userId);


    spyOn(component, 'TypechangeEditload').and.callThrough();
    component.TypechangeEditload(event);
    fixture.detectChanges();

    event = "WFH";
    component.bwShapingOn = true;
    component.TypechangeEditload(event);
    fixture.detectChanges();

    event = "WFH";
    component.bwShapingOn = false;
    component.TypechangeEditload(event);
    fixture.detectChanges();

    event = "Custom unified";
    component.TypechangeEditload(event);
    fixture.detectChanges();

    event = "Custom 2.4 GHz";
    component.TypechangeEditload(event);
    fixture.detectChanges();
    event = "Custom 2.4 GHz";

    event = "Custom 5 GHz";

    component.TypechangeEditload(event);
    fixture.detectChanges();

    event = "Custom 6 GHz";
    component.TypechangeEditload(event);
    fixture.detectChanges();

    // expect(component.TypechangeEditload).toHaveBeenCalled();
    // expect(component.TypechangeEditload).toHaveBeenCalledTimes(1);
  });
  it('should TypechangeEdit', () => {
    component.ssidobjectFormAdd = {};
    var event = {
      "description": "Guest",
      "value": 1
    }
    component.EncryptionTypes = encryptionTypes.types
    component.ssidobjectFormAdd = addSsidData;

    let userId = "2ab6ec48-dd53-4108-afc4-1150a1bcc7ec"
    spyOn(dataService, 'getEncryptionvalues').and.returnValue(of(networkLoadedTypes));
    spyOn(component, 'Encryptionload').and.callThrough();
    component.Encryptionload(userId);


    spyOn(component, 'TypechangeEdit').and.callThrough();
    component.TypechangeEdit(event);
    fixture.detectChanges();

    event.description = "WFH";
    event.value = 2;
    component.bwShapingOn = true;
    component.TypechangeEdit(event);
    fixture.detectChanges();

    event.description = "WFH";
    event.value = 2;
    component.bwShapingOn = false;
    component.TypechangeEdit(event);
    fixture.detectChanges();

    event.description = "Custom unified";
    event.value = 3;
    component.TypechangeEdit(event);
    fixture.detectChanges();

    event.description = "Custom 2.4 GHz";
    event.value = 4;
    component.TypechangeEdit(event);
    fixture.detectChanges();
    event.description = "Custom 2.4 GHz";

    event.description = "Custom 5 GHz";
    event.value = 5;
    component.TypechangeEdit(event);
    fixture.detectChanges();

    event.description = "Custom 6 GHz";
    event.value = 6;
    component.TypechangeEdit(event);
    fixture.detectChanges();

    // expect(component.TypechangeEdit).toHaveBeenCalled();
    // expect(component.TypechangeEdit).toHaveBeenCalledTimes(1);
  });

  it('should TypeChangeSmbEdit', () => {
    var event = "Primary"

    spyOn(component, 'TypeChangeSmbEdit').and.callThrough();
    component.TypeChangeSmbEdit(event);

    expect(component.TypeChangeSmbEdit).toHaveBeenCalled();
    expect(component.TypeChangeSmbEdit).toHaveBeenCalledTimes(1);
  });
  it('should changeSSIDName', () => {
    var event = "Primary";
    component.oldSSIDForm = SsidData["primary-operator-ssid"][0];
    component.oldSsidData = SsidData["primary-operator-ssid"][0];
    component.ssidObjectForm = SsidData["primary-operator-ssid"][0];
    spyOn(component, 'changeSSIDName').and.callThrough();
    component.changeSSIDName(event);

    expect(component.changeSSIDName).toHaveBeenCalled();
    expect(component.changeSSIDName).toHaveBeenCalledTimes(1);
  });
  it('should updateSMBSSID', () => {
    const frm = <NgForm>{
      valid: true
    };
    var res = {
      "result": "OK"
    }
    component.ssidObjectForm = updateSMBSSID;
    spyOn(dataService, 'updateSMBssidpolling').and.returnValue(of(res));
    spyOn(component, 'updateSMBSSID').and.callThrough();
    component.updateSMBSSID(frm);

    expect(component.updateSMBSSID).toHaveBeenCalled();
    expect(component.updateSMBSSID).toHaveBeenCalledTimes(1);
  });
  it('should DeleteSMBSSID', () => {
    var res = {
      "result": "OK"
    }
    component.ssidObjectForm = updateSMBSSID;
    spyOn(dataService, 'deleteSMBSSID').and.returnValue(of(res));
    spyOn(component, 'DeleteSMBSSID').and.callThrough();
    component.DeleteSMBSSID();

    expect(component.DeleteSMBSSID).toHaveBeenCalled();
    expect(component.DeleteSMBSSID).toHaveBeenCalledTimes(1);
  });
  it('should getCaptivePortal', () => {
    component.ssidObjectForm = updateSMBSSID;
    spyOn(captivePortalService, 'getCaptivePortal').and.returnValue(of(getCaptivePortal));
    spyOn(component, 'getCaptivePortal').and.callThrough();
    component.getCaptivePortal();

    expect(component.getCaptivePortal).toHaveBeenCalled();
    expect(component.getCaptivePortal).toHaveBeenCalledTimes(1);
  });
  it('should setCaptivePortal', () => {
    component.portalDetail = getCaptivePortal
    component.ssidObjectForm = updateSMBSSID;
    spyOn(captivePortalService, 'setCaptivePortal').and.returnValue(of(getCaptivePortal));
    spyOn(component, 'setCaptivePortal').and.callThrough();
    component.setCaptivePortal();

    expect(component.setCaptivePortal).toHaveBeenCalled();
    expect(component.setCaptivePortal).toHaveBeenCalledTimes(1);
  });
  it('should accesspopupedit', () => {
    let res = {
      Result: "success"
    }
    let ssidObjectForm = SsidData["primary-operator-ssid"][0];
    spyOn(radioService, 'Savepasspharseauditlog').and.returnValue(of(res));
    spyOn(component, 'accesspopupedit').and.callThrough();
    component.accesspopupedit(ssidObjectForm);

    expect(component.accesspopupedit).toHaveBeenCalled();
    expect(component.accesspopupedit).toHaveBeenCalledTimes(1);
  });
  it('pageErrorHandle function if case', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('pageErrorHandle function else case', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('changeSSIDOperator', () => {
    component.SSIDFilterValue = "All Types";
    component.fetchSSIDListValues(component.orgId, component.serialNumber);
    spyOn(component, 'changeSSIDOperator').and.callThrough();
    component.changeSSIDOperator(null);
    expect(component.changeSSIDOperator).toHaveBeenCalled();
  });
  it('onKeyPhraseChange', () => {
    let event = {
      target: {
        value: "Test"
      }
    }
    component.oldSsidData = SsidData;
    spyOn(component, 'onKeyPhraseChange').and.callThrough();
    component.onKeyPhraseChange(event);
    expect(component.onKeyPhraseChange).toHaveBeenCalled();
  });



  // Time Schedules

  it('should create', () => {

    component.networkAccessType = 'Custom';

    component.ngOnInit();
    let newScheduleFormGroup = {
      timeRanges: [{
        startTime: '0000',
        stopTime: '2359'
      }],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.ngOnInit();


    let schedules = [
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'mon'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'tue'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'wed'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'thu'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'fri'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'sat'
      },
      {
        timeRanges: [{
          startTime: '0900',
          stopTime: '0930'
        }],
        weekDays: 'sun'
      },
    ];
    component.scheduleFormArray = [];
    schedules.forEach((schedule: any) => {
      newScheduleFormGroup =
      {
        timeRanges: [schedule.timeRanges],
        weekDays: schedule.weekDays
      }

      component.scheduleFormArray.push(newScheduleFormGroup);
      component.schedules = component.scheduleFormArray;
    });

    component.networkAccessType = 'Everyday';
    component.ngOnInit();
  });


  it('load all simple functions', () => {
    component.days = [
      { id: 'mon', name: 'Monday', label: component.language['Monday'], timeRanges: [] },
      { id: 'tue', name: 'Tuesday', label: component.language['Tuesday'], timeRanges: [] },
      { id: 'wed', name: 'Wednesday', label: component.language['Wednesday'], timeRanges: [] },
      { id: 'thu', name: 'Thursday', label: component.language['Thursday'], timeRanges: [] },
      { id: 'fri', name: 'Friday', label: component.language['Friday'], timeRanges: [] },
      { id: 'sat', name: 'Saturday', label: component.language['Saturday'], timeRanges: [] },
      { id: 'sun', name: 'Sunday', label: component.language['Sunday'], timeRanges: [] },
    ];
    component.initNewSchedule();
    component.formatTime('12,30', 'object');
    component.formatTime('00,00', 'string');
    component.getDateString(new Date());
    component.networkChange();
    component.networkAccessType = 'always';
    component.networkChange();
    component.networkAccessType = 'Everyday';
    component.networkChange();
    component.newSchedule.startTime = new Date();
    component.calcualteStopTime('get');
    component.calcualteStopTime('set');
    component.disabledNetworkAccess();
    component.newSchedule.enabled = false;
    component.disabledNetworkAccess();

    let timeRange = {
      startTime: '1205',
      stopTime: '1305',
    }
    component.getTimeString(timeRange);
    timeRange.startTime = '0000';
    timeRange.stopTime = '0000';
    fixture.detectChanges();
    component.getTimeString(timeRange);

    component.getMinDate()
  });

  it('should validate days', () => {
    // case 1 - when formatted schedules is empty
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [];
    component.validateDays();

    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: false,
      startTime: new Date('1/1/1 10:30:00'),
      stopTime: new Date(new Date().setMinutes(new Date('1/1/1 11:30:00').getMinutes() + 1)),
    };
    component.validateDays();

    component.newSchedule.enabled = true;
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];

    // case 2 - adding date and time which already exists
    let newScheduleFormGroup = {
      timeRanges: [{
        startTime: '10:30 am',
        stopTime: '11:30 am',
      }],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.validateDays();

    // case 3 - adding date which already exists 5 times
    component.scheduleFormArray = [];
    newScheduleFormGroup = {
      timeRanges:
        [
          {
            startTime: '0530',
            stopTime: '0630',
          },
          {
            startTime: '0635',
            stopTime: '0735',
          },
          {
            startTime: '0740',
            stopTime: '0840',
          },
          {
            startTime: '0845',
            stopTime: '0945',
          },
          {
            startTime: '1045',
            stopTime: '1145',
          },
        ],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.validateDays();
  });

  it('should add schedule', () => {
    // case 1 when no days are selected
    component.networkAccessType = 'Custom';
    component.newSchedule.selectedDays = [];
    component.addSchedule(false);

    // case 2 when schedule for everyday are added
    component.newSchedule.selectedDays = ['mon', 'tue'];
    component.networkAccessType = 'Everyday';
    component.addSchedule(false);

    // case 3 when fresh custom schedules are added
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [];
    component.newSchedule.selectedDays = ['mon', 'tue'];
    component.addSchedule(true);

    // case 4 when a day in custom schedules is disabled
    component.scheduleFormArray = [];
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 00:00:00'),
      stopTime: new Date('1/1/1 00:00:00'),
    };
    let newScheduleFormGroup = {
      timeRanges: [{
        startTime: '0200',
        stopTime: '0300'
      }],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.addSchedule(true);

    // case 5 when new custom schedule is added to disabled day
    component.scheduleFormArray = [];
    component.networkAccessType = 'Custom';
    component.formattedSchedules = [
      {
        timeRanges: {
          startTime: '11:30 am',
          stopTime: '12:30 am',
        },
        label: 'Monday'
      }
    ];
    component.newSchedule = {
      selectedDays: ['mon'],
      enabled: true,
      startTime: new Date('1/1/1 01:00:00'),
      stopTime: new Date('1/1/1 02:00:00'),
    };
    newScheduleFormGroup = {
      timeRanges: [{
        startTime: '0000',
        stopTime: '0000'
      }],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.addSchedule(true);
  });

  it('should delete schedule', () => {
    // case 1 - when there is only one schedule in a day
    let newScheduleFormGroup = {
      timeRanges: [{
        startTime: '0000',
        stopTime: '0000'
      }],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.deleteNetworkAccess('mon', 0);

    // case 2 - when there are multiple schedules in a day
    newScheduleFormGroup = {
      timeRanges: [
        {
          startTime: '0930',
          stopTime: '1030'
        },
        {
          startTime: '1030',
          stopTime: '1130'
        },
      ],
      weekDays: 'mon'
    };
    component.scheduleFormArray.push(newScheduleFormGroup);
    component.schedules = component.scheduleFormArray;
    component.deleteNetworkAccess('mon', 0);
  });

});
