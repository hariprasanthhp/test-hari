import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { SupportServiceService } from '../services/support-service.service';
import { voicedetails, deviceInfo, servicestatus, subscriberservicedata , voiceserviceempty} from 'src/assets/mockdata/support/support-service/voice/voice.service';

import { VoiceComponent } from './voice.component';
import { of, throwError } from 'rxjs';
import { errorStatus401, errorStatus404 } from 'src/assets/mockdata/shared/error.data';
import { metaData } from 'src/assets/mockdata/support/shared/subscriber-menu.data';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

describe('VoiceComponent', () => {
  let component: VoiceComponent;
  let fixture: ComponentFixture<VoiceComponent>;
  let ssoService: SsoAuthService;
  let dataservice: DataServiceService;
  let supportService: SupportServiceService;
  let SubscriberId
  let translateService :TranslateService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, FormsModule],
      providers: [TranslateService, DataServiceService, SsoAuthService, SupportServiceService]

    })
      .compileComponents()
      .then(() => {
        dataservice = TestBed.inject(DataServiceService);
        supportService = TestBed.inject(SupportServiceService);
        ssoService = TestBed.inject(SsoAuthService);
        localStorage.setItem('languageLocalStorage','en');
      
        fixture = TestBed.createComponent(VoiceComponent);
        //  component.serialNumberSelected='CXNK00A0D228'
        // component.orgId='470053'
        SubscriberId = ssoService.getCSCSubscriberId();
      
        fixture.detectChanges();
      });
  });
  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('voice functions with onInit flow', () => {
    component.language = translateService.defualtLanguage;
    component.languageSubject = translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    });
    sessionStorage.setItem('calix.deviceData', JSON.stringify(deviceInfo));
    environment.VALIDATE_SCOPE = 'true';
    let scopes = {
      'cloud.rbac.csc.services.voice': ['read', 'write'],
    };
    window.localStorage.setItem('calix.scopes', JSON.stringify(scopes));
  
    spyOn(component, 'loadData').and.callThrough();
    spyOn(dataservice, 'getMetaData').and.returnValue(of(voicedetails))
    spyOn(dataservice, 'getServiceVoice').and.returnValue(of(voicedetails))
  
    // spyOn(component,'restartVoice').and.callThrough();
    // spyOn(component,'resetVoice').and.callThrough();
    expect(component).toBeTruthy();

    component.ngOnInit();
    component.getScopes();
    fixture.detectChanges();
  })
 
  it('voice service error case', () => {
    spyOn(dataservice, 'getServiceVoice').and.returnValue(throwError(errorStatus401));
    component.loadData("");

  });
  it('voice service error case on refresh', () => {
    spyOn(dataservice, 'getServiceVoice').and.returnValue(throwError(errorStatus404));
    component.loadData("");

  });
  /*it('language function',fakeAsync(() => { 
    fixture.detectChanges();
    setTimeout(() => {

  component.language = 'en';
        //component.languageSubject = englishdata
        //component.language = component.languageSubject;
        console.log("languageSubject")
    
        component.languageSubject = translateService.selectedLanguage.subscribe(data => {
          console.log("data",data)
          component.language = data;
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
      }, 3000)
      tick(6000);
    }));*/
  it('should select WAN', () => {
    component.wanInfo = voicedetails.wanInfo.data;
    component.wanInfoToDisplay.Uptime = 1;
    component.wanSelection(0);
    component.dataRender(voicedetails);

    component.wanInfoToDisplay.Uptime = 0;
    component.wanSelection(0);
    component.dataRender(voicedetails);
  });

  it('should fetch meta data - when API succeeds', () => {
    spyOn(dataservice, 'fetchMetaData').and.returnValue(of(metaData));
    component.getMetaData();
  });

  it('should fetch meta data - when API fails', () => {
    spyOn(dataservice, 'fetchMetaData').and.returnValue(throwError(errorStatus401));
    component.getMetaData();
  });

  it('should restart and reset voice - when API succeeds', () => {
    spyOn(supportService, 'getResetVoice').and.returnValue(of({}));
    spyOn(supportService, 'getRestartVoice').and.returnValue(of({}));
    component.resetVoice();
    component.restartVoice();

    component.voiceLine = 1;
    component.resetVoice();
    component.restartVoice();
  });

  it('should reset voice - when API fails', () => {
    spyOn(supportService, 'getResetVoice').and.returnValue(throwError(errorStatus401));
    spyOn(supportService, 'getRestartVoice').and.returnValue(throwError(errorStatus401));
    component.restartVoice();
    component.resetVoice();
  });

  it('should initialize all simple functions', () => {
    component.pageErrorHandle(errorStatus401);
    component.pageErrorHandle(errorStatus404);
    component.lineSelection({});
  });

  it('getAllSubsServicesData function', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(of(subscriberservicedata))

    // sessionStorage.setItem('calix.deviceData',JSON.stringify(deviceInfo));
    component.getAllSubsServicesData();
    component.allSubsServicesDataSubs = subscriberservicedata
    component.getservicestatus();
    component.allSubsServicesData = subscriberservicedata ? subscriberservicedata : {};
    var services = component.allSubsServicesData.services;
    component.VoiceService = services[0] ? services[0] : {};;
    component.servicesData = component.VoiceService

    expect(component).toBeTruthy();
  })

  it('getAllSubsServicesData error case', () => {
    spyOn(dataservice, 'getDetailedSubscriberServices').and.returnValue(throwError(errorStatus401));
    component.getAllSubsServicesData();
  });

  it('getservicestatus voiceserviceempty function', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(of(voiceserviceempty))
    component.getservicestatus();
    expect(component).toBeTruthy();
  })

  it('getservicestatus function', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(of(servicestatus))
    component.getservicestatus();
    expect(component).toBeTruthy();
  })

  

  it('getservicestatus error case', () => {
    spyOn(dataservice, 'servicestatusapicall').and.returnValue(throwError(errorStatus401));
    component.getservicestatus();
  });

});
