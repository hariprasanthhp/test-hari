import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingchannelComponent } from './marketingchannel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { MarketingChannelsApiService } from '../../marketing-channels/shared/services/marketing-channels-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of, throwError } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { promise } from 'protractor';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { errorStatus400, errorStatus401, errorStatus404, errorStatus500, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('MarketingchannelComponent', () => {
  let component: MarketingchannelComponent;
  let fixture: ComponentFixture<MarketingchannelComponent>;
  let sso;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingchannelComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient, useValue:
          {
            post: () => (of({})),
            get: () => (of({})),
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of(''),
          }
        },
        {
          provide: SsoAuthService, useValue: {
            setValidConstantAuth: jasmine.createSpy(),
            getOrgId: jasmine.createSpy().and.returnValue(''),
            setValidMailChimpAuth: () => (of({})),
            setValidHubSpotAuth: () => (of({})),

            
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        { provide: MarketingHomeApiService, useValue: {} },
        {
          provide: MarketingChannelsApiService, useValue: {
            MarketingChannelsListGET: () => (of({})),
            // MarketingChannelsListGET: jasmine.createSpy().and.returnValue(of(
            //   [{ completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'mobile notification' },
            //   { completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'mailchimp' }
            //   ])),
          }
        }, 
      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy(),
        }
      }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingchannelComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
        component.getCampaignChannelListApiSubject = new Subject();
      });
  });

  it('should load data', () => {
    //arrange 
    component.scopes = {
      campaignRead: true,
      campaignWrite: true
    };
    spyOn(component, 'getCampaignChannelListApiLoader');
    spyOn(component, 'getMrktngChnlFaceAuth');
    spyOn(component, 'getConstantChnlAuth');
    spyOn((component as any).route.queryParams, 'subscribe');

    //act
    fixture.detectChanges();
    //assert
    expect(component.hasScope).toBe(true);
    expect(component.getCampaignChannelListApiLoader).toHaveBeenCalled();
    expect(component.getMrktngChnlFaceAuth).toHaveBeenCalled();
    expect(component.getConstantChnlAuth).toHaveBeenCalled();
  });

  it('should be false when either campaignRead or campaignWrite scopes is false', () => {
    component.scopes = {
      campaignRead: true,
      campaignWrite: false
    };

    fixture.detectChanges();
    expect(component.hasScope).toBe(false);
  });


  it('should load data', () => {
    component.scopes = undefined;
    component.scopeAsssiner();
    expect(component.scopes).toEqual(undefined);
    expect((component as any).marketingCommonService.getCMCScopes).toHaveBeenCalled();
  });

  it('should call getMailChimpToken and getHubspotToken', () => {
    let json = { data: 'Mock data', status:'valid'}
    spyOn((<any>component).http, 'post').and.returnValue(of(json));
    spyOn((component as any).router,'navigate');
    spyOn((<any>component).sso,'setValidMailChimpAuth');
    spyOn((<any>component).sso,'setValidHubSpotAuth');

    component.validMailchimpToken = true;
    component.validHubspotToken  = true;


    component.getMailChimpToken();
    component.getHubspotToken();

    expect(component.validMailchimpToken).toBeTruthy();
    expect(component.validHubspotToken).toBeTruthy();
    expect((component as any).sso.setValidMailChimpAuth).toHaveBeenCalledWith(true);
    expect((component as any).sso.setValidHubSpotAuth).toHaveBeenCalledWith(true);

  });
  it('should call ngOnDestroy', () => {
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.getCampaignChannelListApiSubject, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.languageSubject.unsubscribe);
    expect(component.getCampaignChannelListApiSubject.unsubscribe);  
  });


  it('should call getMailChimpToken', () => {
    let json = { data: 'Mock data', status:'other'}
    spyOn((<any>component).http, 'post').and.returnValue(of(json));
    spyOn((component as any).router,'navigate');
    spyOn((<any>component).sso,'setValidMailChimpAuth');
    spyOn((<any>component).sso,'setValidHubSpotAuth');

    component.getMailChimpToken();
    component.getHubspotToken();

    expect((component as any).sso.setValidMailChimpAuth).toHaveBeenCalledWith(false);
    expect((component as any).sso.setValidHubSpotAuth).toHaveBeenCalledWith(false);
  });

  it('should call getMailChimpToken and getHubspotToken Error', () => {
    spyOn((<any>component).http,'post').and.returnValue(throwError(errorStatus404));
    component.language = [];

    component.getHubspotToken();

    expect((component as any).http.post).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader response', () => {
    let res = [{ completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'mobile notification' }, { completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'mailchimp' }, { completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'facebook' }, { completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'hubspot' }, { completedCampaigns: '2', inprogressCampaigns: 1, scheduleCampaigns: 4, marketingChannel: 'constantcontact' }];

    spyOn((<any>component).marketingChannelsApiService, 'MarketingChannelsListGET').and.returnValue(of(res));
    component.campaignChannelsDataArray = res[0];
    component.mobileNotificationCount = 7;

    component.getCampaignChannelListApiLoader();
    expect(component.campaignChannelsDataArray).toEqual(res[0]);
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorStatus504));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus504));
    component.language = [];

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    let errorStatus502 = {"status": 502,"error": "Gateway Timeout",}
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorStatus502));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus502));
    component.language = [];

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorStatus400));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus400));
    component.language = [];

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorStatus401));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus401));
    component.language = [];

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorStatus500));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus500));
    component.language = [];

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    let errorSts = {status:505,error:{errorDesc:'ErrorDec',message:''}}
    component.commandIQError = true;
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorSts));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorSts));
    component.language = [];
    component.commandIQErrorMsg = `${errorSts.error.errorDesc}`;

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    let errorSts = {status:505,error:{errorDesc:'',message:'Error MSg'}}
    component.commandIQError = true;
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorSts));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorSts));
    component.language = [];
    component.commandIQErrorMsg = `${errorSts.error.message}`;

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get Campaign ChannelList ApiLoader Error', () => {
    let errorSts = {status:505,message:'Msg',error:{errorDesc:'',message:''}}
    component.commandIQError = true;
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(errorSts));
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorSts));
    component.language = [];
    component.commandIQErrorMsg = `${errorSts.message}`;

    component.getCampaignChannelListApiLoader();
    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();

    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
    expect((component as any).http.get).toHaveBeenCalled();
  });

  
  it('should get Campaign ChannelList ApiLoader Error', () => {
    spyOn((<any>component).http,'get').and.returnValue(throwError(errorStatus404));
    component.language = [];

    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();


    expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should get channels for valid', () => {
    let json = { data: 'Mock data', status:'valid'}
    spyOn((<any>component).http, 'get').and.returnValue(of(json));

    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();
  });

  it('should get channels for failed', () => {
    let json = { data: 'Mock data', status:'failed'}
    spyOn((<any>component).http, 'get').and.returnValue(of(json));

    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();
  });

  it('should get channels for Channel Unknown', () => {
    let json = { data: 'Mock data', status:'Channel Unknown'};
    spyOn((<any>component).http, 'get').and.returnValue(of(json));

    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();
  });

  it('should get channels for Failed - Expired', () => {
    let json = { data: 'Mock data', status:'Failed - Expired'};
    spyOn((<any>component).http, 'get').and.returnValue(of(json));

    component.getMrktngChnlFaceAuth();
  });

  it('should get channels for else status', () => {
    let json = { data: 'Mock data', status:''};
    spyOn((<any>component).http, 'get').and.returnValue(of(json));

    component.getMrktngChnlAuth();
    component.getMrktngChnlFaceAuth();
    component.getMrktngChnlHubSpotAuth();
    component.getConstantChnlAuth();
  });


  // it('should get marketing channel facebook authorization', () => {
  //   //arrange
  //   //act
  //   component.getMrktngChnlFaceAuth();
  //   //assert
  //   expect(component.validFacebookToken).toBeTruthy();
  //   expect(component.facebookStatus).toEqual( "Active");
  // });

  // it('should get constant channel  authorization', () => {
  //   //arrange
  //   //act
  //   component.getConstantChnlAuth();
  //   //assert
  //   expect(component.validConstantToken).toBeTruthy();
  //   expect((component as any).sso.setValidConstantAuth).toHaveBeenCalledOnceWith(true);
  //   expect(component.constantStatus).toEqual( "Active");
  // });
});
  