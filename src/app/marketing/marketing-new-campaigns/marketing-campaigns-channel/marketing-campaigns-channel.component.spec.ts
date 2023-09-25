import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
//import 'jasmine';
import { MarketingCampaignsChannelComponent } from './marketing-campaigns-channel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingChannelsApiService } from '../../marketing-channels/shared/services/marketing-channels-api.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MarketingModule } from '../../marketing.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, Subject, throwError } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { data } from 'jquery';
import Highcharts from 'highcharts';

describe('MarketingCampaignsChannelComponent', () => {
  let component: MarketingCampaignsChannelComponent;
  let fixture: ComponentFixture<MarketingCampaignsChannelComponent>;
  let marketingCampaignDefineApiServiceMock: jasmine.SpyObj<MarketingCampaignDefineApiService>;
  let marketingCommonServiceMock: jasmine.SpyObj<MarketingCommonService>;
  let translateService: TranslateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MarketingCampaignsChannelComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MarketingModule
      ],
      providers: [{
        provide: NgbModal, useValue: {
          open: jasmine.createSpy(),
          dismissAll: jasmine.createSpy(),
        }
      },
      { provide: TranslateService, useCalss: CustomTranslateService },
      {
        provide: MarketingChannelsApiService, useValue: {
          MarketingChannelsListGET: () => (of({})),
        }
      },
      {
        provide: MarketingCampaignsApiService, useValue: {
          CampaignPUT: () => (of({})),
        }
      },
      {
        provide: MarketingCampaignDefineApiService, useValue: {
          getDefineDataEmitter: () => (of({})),
          defineSuccessEmitterSubject: new Subject<any>(),
          channelNextEmitterSubject: new Subject<any>(),
          setDefineDataEmitter: jasmine.createSpy(),
          defineSuccesEventTrigger: jasmine.createSpy(),
          clearCampaignDataSubject: of({}),
          editChannelDataSubject: of({}),
          getMobileChannelDataEmitter: () => (of({})),
          setMobileChannelDataEmitter: jasmine.createSpy(),
          setCsvDataEmitter: jasmine.createSpy(),

        }
      },
      {
        provide: MarketingCampaignChannelsApiService, useValue: {
          GetCampaignDetails: () => (of({})),

        }
      },
      {
        provide: SsoAuthService,
        useValue: {}
      },
      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue({ campaignWrite: true }),
          errorHandling: jasmine.createSpy().and.returnValue('Error Message'),
        }
      }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingCampaignsChannelComponent);
        component = fixture.componentInstance;
      });
    marketingCampaignDefineApiServiceMock = TestBed.inject(MarketingCampaignDefineApiService) as jasmine.SpyObj<MarketingCampaignDefineApiService>;
    marketingCommonServiceMock = TestBed.inject(MarketingCommonService) as jasmine.SpyObj<MarketingCommonService>;
    translateService = TestBed.inject(TranslateService);
    // component.clearCampaignSubject = new Subject();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call Input resetSelectedValues if case', () => {
    spyOn(component,'resetSelectedValues');
    const resetChannelSelctedDataValue = true;
    component.resetChannelSelctedData = resetChannelSelctedDataValue;
    expect(component.resetSelectedValues).toHaveBeenCalled();

  });

  it('should call Input resetSelectedValues else case', () => {
    spyOn(component,'resetSelectedValues');
    const resetChannelSelctedDataValue = false;
    component.resetChannelSelctedData = resetChannelSelctedDataValue;
    expect(component.resetSelectedValues).not.toHaveBeenCalled();

  });

  it('should set selectedSegmentType', () => {
    // Set 
    const data = {
      segmentType: 'Upload',
      segmentName: 'Prospects'
    };
    component.selectedSegmentItemData = data;
    component.isAcquisition = true;
    expect(component.selectedSegmentType).toBe('Upload');
    let name = data.segmentName
    let substring = data.segmentName.substring(name.lastIndexOf("_")+1);
    substring = 'Prospects';
    expect(component.uploadCheck).toBe(true);
    expect(component.isAcquisition).toBe(true); 

    substring = 'not Prospects';
    component.uploadCheck = false;
    expect(component.uploadCheck).toBe(false);
  });

  it('should set uploadCheck to false and isAcquisition to false', () => {
    // Set 
    const data = {
      segmentType: 'not Upload',
      segmentName: 'not Prospects'
    };
    component.selectedSegmentItemData = data;
    component.selectedSegmentType = 'not Upload';
    component.uploadCheck = false;
    expect(component.selectedSegmentType).toBe('not Upload');
    expect(component.uploadCheck).toBe(false);
    // expect(component.isAcquisition).toBe(false);
  });

  it('should set isAcquisition to false ', () => {
    // Set 
    const data = {
      segmentType: 'Upload'
    };

    component.campaignDetailsDataArray = {
      segmentType: 'not upload'
    };
    // component.selectedSegmentItemData = data;
    expect(component.isAcquisition).toBe(false);
  });

  it('should load deployPreviousClicked', () => {
    let value = true;
    component.campaignChannelsData ={marketingChannelId: "678692f0-09a1-11ec-9a03-0242ac130003",marketingChannel: "Hubspot"};
    component.deployPreviousClicked = value;
    component.campaignChannelsDataArray = component.campaignChannelsData;
    expect(component.campaignChannelsDataArray).toEqual(component.campaignChannelsData);
  });

  it('should load deployPreviousClicked else case', () => {
    let value = false;
    component.campaignChannelsData ={};
    component.deployPreviousClicked = value;
    component.campaignChannelsDataArray = '';
    expect(component.campaignChannelsDataArray).toEqual('');
  });

  // it('should subscribe to selectedLanguage', () => {
  //   spyOn(translateService.selectedLanguage, 'subscribe').and.returnValue(of('English'));
  //   fixture.detectChanges();
  //   expect(translateService.selectedLanguage.subscribe).toHaveBeenCalled();
  //   expect(component.language).toBe('English');
  // });

  it('should load data', () => {
    spyOn(component, 'errorReset');
    spyOn(component, 'channelSubmit');
    spyOn(component, 'clearFunction');
    //action
    (component as any).translateService.selectedLanguage = of([]);
    fixture.detectChanges();

    //assert
    expect(component.errorReset).toHaveBeenCalled();
    expect(component.channelSubmit).toHaveBeenCalled();
    expect(component.clearFunction).toHaveBeenCalled();
  });

  it('should load Scope', () => {
    const mockScopes = ['Scope 1', 'Scope 2'];
    marketingCommonServiceMock.getCMCScopes.and.returnValue(mockScopes);

    component.scopeAsssiner();
    expect(marketingCommonServiceMock.getCMCScopes).toHaveBeenCalled();
    expect(component.scopes).toEqual(mockScopes);

    // component.scopes = marketingCommonService.getCMCScopes();
    // expect((component as any).MarketingCommonService.getCMCScopes).toHaveBeenCalled();
  });

  it('should load dtOptionsAssigner', () => {
    component.dtOptionsAssigner();
    expect(component.dtOptions.pagingType).toEqual('full_numbers');
    expect(component.dtOptions.processing).toBeTruthy();
    expect(component.dtOptions.pageLength).toEqual(10);
    expect(component.dtOptions.lengthChange).toBeFalsy();
    expect(component.dtOptions.ordering).toBeFalsy();
    expect(component.dtOptions.searching).toBeFalsy();
  });

  it('should load CampaignChannelList', () => {
    component.scopes = { campaignWrite:true };
    let res = [{ available: true, completedCampaigns: 126, costPerSubscriber: 0, description: "Messages can only be sent to subscribers that have CommandIQ installed", inprogressCampaigns: 7, marketingChannel: "Mobile Notification", marketingChannelId: "2172e774-4498-11eb-b378-0242ac130002", scheduleCampaigns: 0 }];
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(of(res));
    component.getCampaignChannelListApiLoader();
    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
  });

  it('should load CampaignChannelList', () => {
    component.scopes = { campaignWrite:true };
    let error = {status:404, message:'error'}
    spyOn((<any>component).marketingChannelsApiService,'MarketingChannelsListGET').and.returnValue(throwError(error));
    component.getCampaignChannelListApiLoader();
    expect((component as any).marketingChannelsApiService.MarketingChannelsListGET).toHaveBeenCalled();
  });
  

  // it('should load CampaignDetail', () => {
  //   let res = { campaignId: "0ebeaca9-9c06-4d19-bd91-7705c86f78b1", segmentName: "Look-alike Gamers", segmentSize: 0, segmentType: "Acquisition" }
  //   //set
  //   spyOn(component, 'errorReset');
  //   spyOn(component.campaignStatus, 'emit');
  //   //arrange
  //   component.getCampaignDetailsApiLoader();
  //   component.selectedSegmentType = 'Acquisition';
  //   component.campaignDetailsDataArray = res;
  //   //expect
  //   expect(component.isDataAvilable).toBeFalsy();
  //   expect(component.uploadCheck).toBeFalsy();
  //   expect(component.isAcquisition).toBeFalsy();

  // });

  // it('should load CampaignDetail segmentSize to campaignDetailsDataArray.segmentSize if campaignDetailsDataArray exists', () => {
  //   const segmentSize = 0;
  //   let res = { campaignId: "0ebeaca9-9c06-4d19-bd91-7705c86f78b1", segmentName: "Look-alike Gamers", segmentSize: 0, segmentType: "Acquisition" };
  //   component.getCampaignDetailsApiLoader();
  //   component.campaignDetailsDataArray = { segmentSize: segmentSize };
  //   component.campaignDetailsDataArray['segmentMobileAppSize'] != null;
  //   component.definePostObject = res;
  //   component.definePostObject['segmentMobileAppSize'] != null;

  //   fixture.detectChanges();

  //   expect(component.segmentSize).toBe(segmentSize);
  //   expect(component.segmentMobileAppSize).toBe(segmentSize);
  //   expect(component.segmentNonMobileAppSize).toBe(0);


  // });

  // it('should set CampaignDetail segmentSize to 0 if campaignDetailsDataArray is falsy', () => {
  //   component.getCampaignDetailsApiLoader();
  //   component.campaignDetailsDataArray = null;
  //   component.definePostObject = null;

  //   fixture.detectChanges();

  //   expect(component.segmentSize).toBe(0);
  //   expect(component.segmentMobileAppSize).toBe(0);
  //   expect(component.segmentNonMobileAppSize).toBe(0);
  // });

  it('should assign correct error message for status 504 or 502', () => {
    const error = { status: 504,  }; 
    let errMsg = component.language.timeoutErrorError = 'Timeout Error';
    component.channelErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe(errMsg);
  });

  it('should assign correct error message for status 400 and Msg is Ok', () => {
    const error = { status: 400, errorMessage: 'OK'};
    let errMsg = component.language.Bad_Request = 'Bad Request';
    component.channelErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe(errMsg);
  });

  it('should assign correct error message for status 400 and Msg is not Ok', () => {
    const error = { status: 400, errorMessage: 'error', error: 'Bad Request' };
    let errMsg = component.language.Bad_Request = 'Bad Request';
    component.channelErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe(error.error);
  });

  it('should assign correct error message for status 500 and msg is ok', () => {
    const error = { status: 500, errorMessage: 'OK'};
    component.language.internalServerError = 'Internal Server Error';
    component.channelErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe('Internal Server Error');
  });

  it('should assign correct error message for status 500 and msg is not ok', () => {
    const error = { status: 500, errorMessage: 'error', error: 'Internal Server Error' };
    component.language.internalServerError = 'Internal Server Error';
    component.channelErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe(error.error);
  });

  it('should channelSelect', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    component.selectedSegmentType = "Acquisition";
    component.uploadCheck = true;
    component.isAcquisition = true;

    component.channelSelect(event,data);

    expect(component.selectedSegmentType).toEqual('Acquisition');
    expect(component.uploadCheck).toBeTruthy();
    expect(component.isAcquisition).toBeTruthy();
  });

  it('should channelSelect', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    component.triggeredCampaign = true;
    component.definePostObject = {eventType:'Service Limit Hit'};

    component.channelSelect(event,data);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType:'Service Limit Hit'});

    data.marketingChannel = 'Mailchimp';
    component.mailChimp = event;
    component.selectedChannelList.mailChimp = data;
    component.includeMailchimpSelected = 'All';
    component.segmentExecutableSize = 10;

    component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('Mailchimp');
    expect(component.mailChimp).toEqual(event);
    expect(component.selectedChannelList.mailChimp).toEqual(data);
    expect(component.includeMailchimpSelected).toEqual('All');
    expect(component.segmentExecutableSize).toEqual(10);

    event = false;
    component.selectedChannelList.mailChimp = {};
    component.includeMailchimpSelected = 'All';

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mailChimp).toEqual({});
    expect(component.includeMailchimpSelected).toEqual('All');
  });

  it('should channelSelect', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    component.triggeredCampaign = true;
    component.definePostObject = {eventType:'Service Limit Hit'};

    component.channelSelect(event,data);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType:'Service Limit Hit'});

    data.marketingChannel = 'Mobile Notification';
    component.mobileNotification  = event;
    component.selectedChannelList.mobileNotification  = data;

    component.channelSelect(event,data);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType:'Service Limit Hit'});
    expect(data.marketingChannel).toEqual('Mobile Notification');
    expect(component.mobileNotification ).toEqual(event);
    expect(component.selectedChannelList.mobileNotification ).toEqual(data);

    event = false;
    component.selectedChannelList.mobileNotification  = {};

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mobileNotification ).toEqual({});
  });

  it('should channelSelect', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    component.triggeredCampaign = true;
    component.definePostObject = {eventType:'Speed Test Minutes'};


    component.channelSelect(event,data);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType:'Speed Test Minutes'});

    data.marketingChannel = 'Mobile Notification';
    component.mobileNotification  = event;
    component.selectedChannelList.mobileNotification  = data;

    component.channelSelect(event,data);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType:'Speed Test Minutes'});
    expect(data.marketingChannel).toEqual('Mobile Notification');
    expect(component.mobileNotification ).toEqual(event);
    expect(component.selectedChannelList.mobileNotification ).toEqual(data);

    event = false;
    component.selectedChannelList.mobileNotification  = {};

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mobileNotification ).toEqual({});
  });

  it('should channelSelect else part Mailchimp', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    data.marketingChannel = 'Mailchimp';
    component.mailChimp  = event;
    component.selectedChannelList.mailChimp  = data;
    component.includeMailchimpSelected = 'All';
    component.segmentExecutableSize = 20;
    component.segmentSize =20;

    component.uploadCheck = true;
    component.mailChimpSegmentCount = component.segmentExecutableSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeTruthy();
    expect(component.mailChimpSegmentCount).toEqual(component.segmentExecutableSize);

    component.uploadCheck = false;
    component.mailChimpSegmentCount = component.segmentSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeFalsy();
    expect(component.mailChimpSegmentCount).toEqual(component.segmentSize);


    component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('Mailchimp');
    expect(component.mailChimp).toEqual(event);
    expect(component.selectedChannelList.mailChimp ).toEqual(data);
    expect(component.includeMailchimpSelected).toEqual('All');
    expect(component.segmentExecutableSize).toEqual(20);
    expect(component.segmentSize).toEqual(20);


    event = false;
    component.selectedChannelList.mailChimp  = {};
    component.mailChimpSegmentCount = component.segmentExecutableSize;

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mailChimp ).toEqual({});
    expect(component.mailChimpSegmentCount).toEqual(component.segmentExecutableSize);
  });

  it('should channelSelect else part Mobile Notification', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    data.marketingChannel = 'Mobile Notification';
    component.mobileNotification  = event;
    component.selectedChannelList.mobileNotification = data;

    component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('Mobile Notification');
    expect(component.mobileNotification).toEqual(event);
    expect(component.selectedChannelList.mobileNotification ).toEqual(data);

    event = false;
    component.selectedChannelList.mobileNotification  = {};

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mobileNotification ).toEqual({});
  });

  it('should channelSelect else part Facebook', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    data.marketingChannel = 'Facebook';
    component.faceBook   = event;
    component.selectedChannelList.faceBook  = data;
    component.includeFacebookSelected  = 'All';
    component.segmentSize =20;
    component.faceBookSegmentCount  = component.segmentSize;


   component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('Facebook');
    expect(component.faceBook).toEqual(event);
    expect(component.selectedChannelList.faceBook ).toEqual(data);
    expect(component.includeFacebookSelected).toEqual('All');
    expect(component.segmentSize).toEqual(20);
    expect(component.faceBookSegmentCount).toEqual(component.segmentSize);


    event = false;
    component.selectedChannelList.mailChimp  = {};
    component.mailChimpSegmentCount = component.segmentExecutableSize;

    component.channelSelect(event,data);

    expect(component.selectedChannelList.mailChimp ).toEqual({});
    expect(component.mailChimpSegmentCount).toEqual(component.segmentExecutableSize);
  });

  it('should channelSelect else part Hubspot', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    data.marketingChannel = 'Hubspot';
    component.hubspot   = event;
    component.selectedChannelList.hubspot   = data;
    component.includeHubspotSelected  = 'All';
    component.segmentExecutableSize = 20;
    component.segmentSize =20;

    component.uploadCheck = true;
    component.hubspotSegmentCount  = component.segmentExecutableSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeTruthy();
    expect(component.hubspotSegmentCount ).toEqual(component.segmentExecutableSize);

    component.uploadCheck = false;
    component.hubspotSegmentCount  = component.segmentSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeFalsy();
    expect(component.hubspotSegmentCount ).toEqual(component.segmentSize);


    component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('Hubspot');
    expect(component.hubspot ).toEqual(event);
    expect(component.selectedChannelList.hubspot  ).toEqual(data);
    expect(component.includeHubspotSelected ).toEqual('All');
    expect(component.segmentExecutableSize).toEqual(20);
    expect(component.segmentSize).toEqual(20);


    event = false;
    component.selectedChannelList.hubspot   = {};
    component.hubspotSegmentCount  = component.segmentExecutableSize;

    component.channelSelect(event,data);

    expect(component.selectedChannelList.hubspot  ).toEqual({});
    expect(component.hubspotSegmentCount ).toEqual(component.segmentExecutableSize);
  });

  it('should channelSelect else part ConstantContact', () => {
    let data = { marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true };
    let event = true;
    spyOn(component, 'headerCheckBoxChecker');
    data.marketingChannel = 'ConstantContact';
    component.constant    = event;
    component.selectedChannelList.constant    = data;
    component.includeConstantSelected   = 'All';
    component.segmentExecutableSize = 20;
    component.segmentSize =20;

    component.uploadCheck = true;
    component.constantSegmentCount   = component.segmentExecutableSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeTruthy();
    expect(component.constantSegmentCount  ).toEqual(component.segmentExecutableSize);

    component.uploadCheck = false;
    component.constantSegmentCount   = component.segmentSize;
    
    component.channelSelect(event,data);

    expect(component.uploadCheck).toBeFalsy();
    expect(component.constantSegmentCount  ).toEqual(component.segmentSize);


    component.channelSelect(event,data);

    expect(data.marketingChannel).toEqual('ConstantContact');
    expect(component.constant).toEqual(event);
    expect(component.selectedChannelList.constant).toEqual(data);
    expect(component.includeConstantSelected  ).toEqual('All');
    expect(component.segmentExecutableSize).toEqual(20);
    expect(component.segmentSize).toEqual(20);


    event = false;
    component.selectedChannelList.constant = {};
    component.constantSegmentCount   = component.segmentExecutableSize;

    component.channelSelect(event,data);

    expect(component.selectedChannelList.constant).toEqual({});
    expect(component.constantSegmentCount  ).toEqual(component.segmentExecutableSize);
  });

  it('should headerCheckBoxChecker', () => {
    let res = [{ marketingChannelId: "d5ff19c0-95b8-11ec-b909-0242ac120002", marketingChannel: "ConstantContact", segmentSize: 0, show: true, scheduleCampaigns: 1, checked: true }];
    //arrange
    component.campaignChannelsDataArray = res;
    component.headerCheckBoxChecker();
    const filteredArray = res.filter(item => item.checked === true);
    //expect
    expect(filteredArray.length).toBe(res.length);

  });

  it('should select all channel check isAcquisition is true and false', () => {
    component.selectedSegmentType = "Acquisition";
    component.isAcquisition = true;
    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact"},{marketingChannel: "Mailchimp"}];
    const filteredArray = component.campaignChannelsDataArray.filter(item => item.checked === true);

    component.channelAllSelect(true);

    expect(component.selectedSegmentType).toEqual('Acquisition');
    expect(component.isAcquisition).toBeTruthy();
    expect(filteredArray.length).toBe(0);
  });

  it('should select all channel check triggeredCampaign if case', () => {
    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact"},{marketingChannel: "Mailchimp"}];
    const filteredArray = component.campaignChannelsDataArray.filter(item => item.checked === true);
    let event = true;
    component.triggeredCampaign = true;
    component.mobileNotification  = event;
    component.definePostObject = {eventType : 'Service Limit Hit'};

    component.channelAllSelect(event);

    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.mobileNotification).toEqual(event);
    expect(component.definePostObject).toEqual({eventType : 'Service Limit Hit'});
    expect(filteredArray.length).toBe(0);

  });

  it('should select all channel - eventType is Service Limit Hit', () => {
    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact"},{marketingChannel: "Mailchimp"}];
    const filteredArray = component.campaignChannelsDataArray.filter(item => item.checked === true);
    let event = true;
    component.triggeredCampaign = true;
    component.definePostObject = {eventType : 'Service Limit Hit'}
    component.mailChimp = true;  

    component.channelAllSelect(event);


    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.definePostObject).toEqual({eventType : 'Service Limit Hit'});
    expect(component.mailChimp).toBeFalsy();
    expect(filteredArray.length).toBe(filteredArray.length);


    component.definePostObject = {eventType : ''};
    component.mailChimp = false;  

    component.channelAllSelect(event);

    expect(component.definePostObject).toEqual({eventType : ''});
    expect(component.mailChimp).toBeFalsy();

  });

  it('should select all channel - event is true', () => {
    component.triggeredCampaign = true;
    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact",checked:true},{marketingChannel: "Mailchimp"}]
    let event = true;
    const filteredArray = component.campaignChannelsDataArray.filter(item => item.checked === true);
    component.definePostObject = {eventType : 'Service Limit Hit'}
    //expect
    component.channelAllSelect(event);

    expect(filteredArray.length).toBe(filteredArray.length);
    expect(component.definePostObject).toEqual({eventType : 'Service Limit Hit'});

    event = true;
    component.selectedChannelList = {};
    let data = {marketingChannel: "Mailchimp",available: true,checked:true}
    data.checked = event;
    data.marketingChannel = 'Mailchimp';
    data.available = true;
    // component.selectedChannelList.mailChimp = data;
    component.includeMailchimpSelected = 'All';

    component.channelAllSelect(event);

    expect(data.checked).toBeTruthy();
    expect(data.marketingChannel).toEqual('Mailchimp');
    expect(data.available).toBeTruthy();
    expect(component.includeMailchimpSelected).toEqual('All');

    // expect(component.selectedChannelList.mailChimp).toEqual(data);



  });

  it('should select all channel', () => {
    let res = [{ campaignId: "0ebeaca9-9c06-4d19-bd91-7705c86f78b1", segmentName: "Look-alike Gamers", segmentSize: 0, segmentType: "Acquisition" }];
    // spyOn(component,'headerCheckBoxChecker');
    component.campaignChannelsDataArray = [];
    component.channelAllSelect(true);
    component.csvSelect(false);
    expect(component.mailChimp).toBeTruthy();
    expect(component.faceBook).toBeTruthy();

    expect(component.hubspot).toBeTruthy();

    expect(component.constant).toBeTruthy();

    component.channelAllSelect(false);
    expect(component.mailChimp).toBeFalsy();
    expect(component.faceBook).toBeFalsy();

    expect(component.hubspot).toBeFalsy();

    expect(component.constant).toBeFalsy();

  });

  it('should select all channel is event true', () => {
    let event = true;
    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact",checked:true},{marketingChannel: "Mailchimp",available:true}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "Facebook",available:true}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "Facebook",available:false}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "Hubspot",available:true}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "Hubspot",available:false}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact",available:true}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{marketingChannel: "ConstantContact",available:false}]
    component.channelAllSelect(event);

    event =  false;
    component.campaignChannelsDataArray = [{available:true}]
    component.channelAllSelect(event);

    component.campaignChannelsDataArray = [{available:false}]
    component.channelAllSelect(event);
  });


  it('should set csvSelect', () => {
    let event = true;
    spyOn(component,'headerCheckBoxChecker');
    component.channelAlertMsg = false;
    component.csvSelected = event;
    component.selectedCSV = event;
    const sessionStorageSpy = spyOn(sessionStorage, 'setItem');

    component.csvSelect(event);

    expect(component.channelAlertMsg).toBeFalsy();
    expect(component.csvSelected).toBeTruthy();
    expect(component.selectedCSV).toBeTruthy();
    expect(sessionStorageSpy).toHaveBeenCalledWith('SelectedCSV', component.selectedCSV);
  });

  it('should select and include Channel for name is ALL', () => {
    let name = "All";
    component.includechannelSelected['name'] = name;
    component.segmentSize = 10;
    component.segmentNonMobileAppSize = 10;
    component.selectIncludeCahnnel(name);

    expect(component.includechannelSelected['count']).toEqual(component.segmentSize);

  });

  it('should select and include Channel for name is not all', () => {
    let name = "Non-Mobile Message";
    component.includechannelSelected['name'] = name;
    component.segmentSize = 10;
    component.segmentNonMobileAppSize = 10;
    component.selectIncludeCahnnel(name);

    expect(component.includechannelSelected['count']).toEqual(component.segmentSize);
  });

  it('should select and include MailChimp', () => {
    // arrange   
    component.selectedSegmentType = 'Acquisition';
    component.segmentExecutableSize = 20;
    component.segmentSize = 10;
    component.segmentNonMobileExecutableSize = 12;

    let segType = 'All';

    // action
    component.selectIncludeMailchimp(segType);

    // assert
    expect(component.includeMailchimpSelected).toEqual(segType);
    expect(component.mailChimpSegmentCount).toEqual(component.segmentExecutableSize);


    segType = 'Non-Mobile Message';
    component.selectIncludeMailchimp(segType);

    expect(component.includeMailchimpSelected).toEqual(segType);
    expect(component.mailChimpSegmentCount).toEqual(component.segmentNonMobileExecutableSize);
  });

  it('should select and include MailChimp', () => {
    // arrange   
    component.selectedSegmentType = 'Not_Acquisition';
    component.segmentExecutableSize = 20;
    component.segmentSize = 10;
    component.segmentNonMobileExecutableSize = 12;
    component.segmentNonMobileAppSize = 12;


    let segType = 'All';

    // action
    component.selectIncludeMailchimp(segType);

    // assert
    expect(component.includeMailchimpSelected).toEqual(segType);
    expect(component.mailChimpSegmentCount).toEqual(component.segmentSize);


    segType = 'Non-Mobile Message';
    component.selectIncludeMailchimp(segType);

    expect(component.includeMailchimpSelected).toEqual(segType);
    expect(component.mailChimpSegmentCount).toEqual(component.segmentNonMobileAppSize);
  });

  it('should select and include Constant is Acquisition', () => {
    //arrange
    component.campaignChannelsDataArray = [];
    component.selectedSegmentType = 'Acquisition';
    component.segmentExecutableSize = 11;
    component.segmentNonMobileExecutableSize = 22;

    let segType = 'All';
    //action
    component.selectIncludeConstant(segType);
    //assert
    expect(component.includeConstantSelected).toEqual(segType);
    expect(component.constantSegmentCount).toEqual(component.segmentExecutableSize);

    segType = 'Non-Mobile Message';
    component.selectIncludeConstant(segType);
    expect(component.includeConstantSelected).toEqual(segType);
    expect(component.constantSegmentCount).toEqual(component.segmentNonMobileExecutableSize);
  });

  it('should select and include Constant is not Acquisition', () => {
    //arrange
    component.campaignChannelsDataArray = [];
    component.selectedSegmentType = 'Not_Acquisition';
    component.segmentExecutableSize = 11;
    component.segmentSize = 10;

    let segType = 'All';
    //action
    component.selectIncludeConstant(segType);
    //assert
    expect(component.includeConstantSelected).toEqual(segType);
    expect(component.constantSegmentCount).toEqual(component.segmentSize);

    segType = 'Non-Mobile Message';
    component.selectIncludeConstant(segType);
    expect(component.includeConstantSelected).toEqual(segType);
  });

  it('should select and include Facebook', () => {
    //arrange

    component.segmentSize = 21;
    component.segmentNonMobileAppSize = 22;
    let segType = 'All';
    //action
    component.selectIncludeFacebook(segType);
    //assert
    expect(component.includeFacebookSelected).toEqual(segType);
    expect(component.faceBookSegmentCount).toEqual(component.segmentSize);

    segType = 'Non-Mobile Message';
    component.selectIncludeFacebook(segType);
    expect(component.includeFacebookSelected).toEqual(segType);
    expect(component.faceBookSegmentCount).toEqual(component.segmentNonMobileAppSize);
  });

  it('should select and include Hubspot is Acquisition', () => {
    // arrange   
    component.selectedSegmentType = 'Acquisition';
    component.segmentExecutableSize = 30;
    component.segmentSize = 10;
    component.segmentNonMobileExecutableSize = 40;

    let segType = 'All';
    component.selectIncludeHubspot(segType);
    expect(component.includeHubspotSelected).toEqual(segType);
    expect(component.hubspotSegmentCount).toEqual(component.segmentExecutableSize);

    segType = 'Non-Mobile Message';

    component.selectIncludeHubspot(segType);

    expect(component.includeHubspotSelected).toEqual(segType);
    expect(component.hubspotSegmentCount).toEqual(component.segmentNonMobileExecutableSize);
  });

  it('should select and include Hubspot is not Acquisition', () => {
    // arrange   
    component.selectedSegmentType = 'Not_Acquisition';
    component.segmentExecutableSize = 30;
    component.segmentSize = 10;
    component.segmentNonMobileAppSize = 40;

    let segType = 'All';
    component.selectIncludeHubspot(segType);
    expect(component.includeHubspotSelected).toEqual(segType);
    expect(component.hubspotSegmentCount).toEqual(component.segmentSize);

    segType = 'Non-Mobile Message';

    component.selectIncludeHubspot(segType);

    expect(component.includeHubspotSelected).toEqual(segType);
    expect(component.hubspotSegmentCount).toEqual(component.segmentNonMobileAppSize);
  });

  it('should call channelSubmit', () => {
    let res = {
      "campaignId": "4a8fe26b-7b02-4af7-ade2-022ef6676165",
      "orgId": 12896222,
      "segmentId": "3905f40d-aa8f-4ef4-aaa5-80b0ddf68915",
      "segmentName": "Look-alike Gamers",
      "segmentType": "Acquisition",
      "segmentSize": 0,
    }
    //set
    spyOn(component, 'editDataAssigner');
    spyOn(component, 'campaignUpdater');
    spyOn(component, 'headerCheckBoxChecker');

    //arrange
    component.definePostObject = res;
    component.definePostObject['campaignType'] = 'Triggered';
    component.triggeredCampaign = true;

    component.channelSubmit();

    expect(component.triggeredCampaign).toBe(true);

    component.definePostObject = [];
    component.definePostObject['campaignType'] = 'scheduled';
    component.triggeredCampaign = false;


    expect(component.triggeredCampaign).toBe(false);
  });

  it('should call campaignUpdater', () => {
    component.definePostObject = {
      csvDownloadOnly: true,
      segmentExecutableSize: 7
    };
    let saveBtn = true;
    spyOn((<any>component).marketingCampaignsApiService,'CampaignPUT').and.returnValue(of({}));
    component.campaignUpdater(saveBtn);
    expect((component as any).marketingCampaignsApiService.CampaignPUT).toHaveBeenCalledWith(component.definePostObject)
  });

  it('should call campaignUpdater', () => {
    component.definePostObject = {
      csvDownloadOnly: true,
      segmentExecutableSize: 7
    };
    let saveBtn = false;
    spyOn((<any>component).marketingCampaignsApiService,'CampaignPUT').and.returnValue(of({}));
    component.campaignUpdater(saveBtn);
    expect((component as any).marketingCampaignsApiService.CampaignPUT).toHaveBeenCalledWith(component.definePostObject)
  });

  it('should call campaignUpdater', () => {
    component.definePostObject = {
      csvDownloadOnly: true,
      segmentExecutableSize: 7
    };
    let saveBtn = false;
    let error = {status:404,message:'Error',error:{errorDesc:'Error'}}
    spyOn((<any>component).marketingCampaignsApiService,'CampaignPUT').and.returnValue(throwError(error));
    spyOn(component,'defineErrorMsgAssigner');
    component.campaignUpdater(saveBtn);
    expect((component as any).marketingCampaignsApiService.CampaignPUT).toHaveBeenCalledWith(component.definePostObject);
    expect(component.defineErrorMsgAssigner).toHaveBeenCalledWith(error);
  });

  it('should call errorReset', () => {
    component.errorReset();
    component.channelPostError = false;
    component.campaignSuccess = false;
    component.channelAlertMsg = false;

    expect(component.channelPostError).toBeFalsy();
    expect(component.campaignSuccess).toBeFalsy();
    expect(component.channelAlertMsg).toBeFalsy();
  });

  it('should assign error message from errorDesc if available', () => {
    const error = { error: { errorDesc: 'Error Description' } };
    component.defineErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe('Error Description');
  });

  it('should assign error message from error if errorDesc is not available', () => {
    const error = { error: 'Error Message' };
    component.defineErrorMsgAssigner(error);
    expect(component.channelPostError).toBe(true);
    expect(component.channelPostErrorMsg).toBe('Error Message');
  });

  it('should call clearFunction', () => {
    (component as any).marketingCampaignDefineApiService.clearCampaignDataSubject = of('channel');
    component.clearFunction();
  });

  it('should call dataAssigner', () => {
    component.dataAssigner();
    spyOn(component, 'editDataAssigner');
    spyOn(component, 'resetData');
  });

  // it('should call editDataAssigner', () => {
  //   let res = [{ available: true, completedCampaigns: 126, costPerSubscriber: 0, description: "Messages can only be sent to subscribers that have CommandIQ installed", include: 0, include3: 0, inprogressCampaigns: 7, marketingChannel: "Mobile Notification", marketingChannelId: "2172e774-4498-11eb-b378-0242ac130002", mobcheck: true, scheduleCampaigns: 0, segmentSize: 0, show: false }];
  //   spyOn(component, 'headerCheckBoxChecker')
  //   component.editDataAssigner();
  //   component.editMode = true;
  //   expect(component.editMode).toBeTruthy();

  //   component.triggeredCampaign = false;
  //   component.campaignChannelsData = res;
  //   component.campaignChannelsDataArray = component.campaignChannelsData;
  //   expect(component.campaignChannelsDataArray).toEqual(component.campaignChannelsData);

  //   component.triggeredCampaign = true;
  //   component.campaignChannelsDataArray.length = 1;
  //   let checkBoxData = {
  //     mobileNotifivationSelect: false,
  //     mailChimpSelect: false,
  //     faceBookSelect: false,
  //     hubspotSelect: false,
  //     constantSelect: false,
  //     campaignChannelsDataArray: component.campaignChannelsDataArray
  //   }
  //   expect(component.channelSelectData.emit(checkBoxData));
  // });

  it('should call editDataAssigner', fakeAsync(() => {
    (component as any).marketingCampaignDefineApiService.editChannelDataSubject = of('channel');
    spyOn(component,'headerCheckBoxChecker');
    component.editDataAssigner();
    setTimeout(() => {
      component.editMode = true;
      let data = {mailChimp:{marketingChannel : 'Mailchimp'}};
      spyOn((<any>component).marketingCampaignDefineApiService,'getMobileChannelDataEmitter').and.returnValue(of(data));
      component.triggeredCampaign = false;
      component.editDataAssigner();
      // expect((component as any).marketingCampaignDefineApiService.getMobileChannelDataEmitter).toHaveBeenCalled();
    },1000);
    flush(1000);
  }));

  it('should call resetSelectedValues', () => {
    spyOn(component.resetChannelData, 'emit');

    component.doubleChecked = false;
    component.campaignChannelsDataArray = [{checked:true}];

    component.resetSelectedValues();

    component.mobileNotification = false;
    component.mailChimp = false;
    component.faceBook = false;
    component.hubspot = false;
    component.constant = false;
    component.csvSelected = false;

    expect(component.doubleChecked).toBeFalsy();
    expect(component.mobileNotification).toBeFalsy();
    expect(component.mailChimp).toBeFalsy();
    expect(component.faceBook).toBeFalsy();
    expect(component.hubspot).toBeFalsy();
    expect(component.constant).toBeFalsy();
    expect(component.csvSelected).toBeFalsy();
  });

  it('should call validator', () => {
    component.campaignChannelsDataArray = [{}]
    component.triggeredCampaign = true;
    let campaignChannelsTrigger = component.campaignChannelsDataArray.filter(item => item.checked == true);
    campaignChannelsTrigger.length = 0;
    component.mobileNotification= false;
    component.mailChimp= false

    component.validator();

    expect(component.triggeredCampaign).toBeTruthy();
    expect(campaignChannelsTrigger.length).toEqual(0);
    expect(component.mobileNotification).toBeFalsy();
    expect(component.mobileNotification).toBeFalsy();

    component.campaignChannelsDataArray = [{checked : true, marketingChannel : 'Mailchip', available : true}];
    component.triggeredCampaign = true;
    campaignChannelsTrigger = component.campaignChannelsDataArray.filter(item => item.checked == true);
    campaignChannelsTrigger.length = 3;
    component.mobileNotification= true;
    component.mailChimp= true;

    component.validator();

    expect(component.triggeredCampaign).toBeTruthy();
    expect(campaignChannelsTrigger.length).toEqual(3);
    expect(component.mobileNotification).toBeTruthy();
    expect(component.mobileNotification).toBeTruthy();
  });

  it('should call validator', () => {
    component.triggeredCampaign = false;
    component.mobileNotification  = true;
    component.mailChimp   = true;
    component.faceBook   = true;
    component.constant   = true;
    component.csvSelected   = true;
    component.hubspot  = true;
    component.validationPassed = true;
    component.channelAlertMsg = false;

    component.validator();


    expect(component.triggeredCampaign).toBeFalsy();
    expect(component.mobileNotification).toBeTruthy();
    expect(component.mailChimp).toBeTruthy();
    expect(component.faceBook).toBeTruthy();
    expect(component.constant).toBeTruthy();
    expect(component.csvSelected).toBeTruthy();
    expect(component.hubspot).toBeTruthy();
    expect(component.validationPassed).toBeTruthy();
    expect(component.channelAlertMsg).toBeFalsy();
  });

  it('should call includeChannelModalOpen', () => {
    component.includeChannelModalOpen();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).includeChannelModal, {
      size: 'lg',
      centered: true,
      windowClass: 'custom-modal'
    });
  });

  it('should call closeModal', () => {
    component.closeModal();
    expect((component as any).dialogService.dismissAll).toHaveBeenCalled();
  });

  it('should call getCampaignDetailsApiLoader', () => {
    component.selectedSegmentType = undefined
    component.definePostObject = {campaignId:'00123',segmentType : 'Upload',eventType:'Service Limit Hit'};
    component.campaignChannelsDataArray = [{checked:true}];
    spyOn((<any>component).marketingCampaignChannelsApiService,'GetCampaignDetails').and.returnValue(of({status:true}));

    component.includechannelSelected['name'] = 'Non-Mobile Message';
    component.campaignChannelsDataArray.map(data => {
      component.triggeredCampaign = true;
          component.definePostObject = {campaignId:'00123',segmentType : 'Upload',eventType:'Service Limit Hit'};

    })

    component.getCampaignDetailsApiLoader();

    expect((component as any).marketingCampaignChannelsApiService.GetCampaignDetails).toHaveBeenCalledWith(component.definePostObject.campaignId);
  });

});
