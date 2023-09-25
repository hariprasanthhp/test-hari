import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCampaignsDeployComponent } from './marketing-campaigns-deploy.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
//import 'jasmine';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { forkJoin, of, Subject } from 'rxjs';
import { off } from 'process';
import { HttpClient } from '@angular/common/http';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import Highcharts from 'highcharts';

describe('MarketingCampaignsDeployComponent', () => {
  let component: MarketingCampaignsDeployComponent;
  let fixture: ComponentFixture<MarketingCampaignsDeployComponent>;
  let marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService;
  let originalOpen;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingCampaignsDeployComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, CalendarModule, FormsModule],
      providers: [MarketingCampaignChannelsApiService, { provide: TranslateService, useCalss: CustomTranslateService },
        {
          provide: MarketingCampaignDefineApiService, useValue: {
            segmentSelectSubject: new Subject<any>(),
            eventTypeSubject: new Subject<any>(),
            startDateSubject: new Subject<any>(),
            campaignSubject: new Subject<any>(),
            segmentTypeSelectSubject: new Subject<any>(),
            stringValidatorWithCrossScriptAndErrorMsgDeploy: jasmine.createSpy().and.returnValue({ error: true, errormsg: '' }),
            editChannelDataSubject: of(''),
            deployNextEmitterSubject: of(''),
            getDefineDataEmitter: jasmine.createSpy().and.returnValue({ campaignId: '10000' }),
            getMobileChannelDataEmitter: jasmine.createSpy().and.returnValue(
              {
                mobileNotification: { include3: true, marketingChannelId: '10001', marketingChannel: '' },
                mailChimp: { include2: true, marketingChannelId: '10001', marketingChannel: '' },
                faceBook: { include1: false, marketingChannelId: '10001', marketingChannel: '' },
                hubspot: { include1: true, marketingChannelId: '10001', marketingChannel: '' },
                constant: { include4: true, marketingChannelId: '10001', marketingChannel: '' },


              }),
            defineSuccesEventTrigger: jasmine.createSpy(),
            setDefineDataEmitter: jasmine.createSpy(),
            editCampaignChannelDataSubject: of(''),
            getCampaignChannelDataEmitter: jasmine.createSpy(),
            clearCampaignDataSubject: of(''),
          }
        }, {
          provide: MarketingCampaignsApiService, useValue: {
            deployCampaignValidation: of(),
            fileUpload: jasmine.createSpy().and.returnValue(of({ url: 'mocked-url' })),
            // spyOn(marketingCampaignsApiService, 'fileUpload').and.returnValue(of({ url: 'mocked-url' }));

            CampaignPUT: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        // {
        //   provide: MarketingCampaignChannelsApiService, useValue: {
        //     // CampaignChannelPOST: jasmine.createSpy().and.returnValue(of({})),
        //     CampaignChannelPUT: jasmine.createSpy().and.returnValue(of({})),

        //   }
        // },
        {
          provide: MarketingCommonService, useValue: {
            timeSplitter: jasmine.createSpy().and.returnValue(''),
            errorHandling: jasmine.createSpy().and.returnValue(''),
            formatDateForCampaign: jasmine.createSpy().and.returnValue('30-02-2021'),

          }
        },
        {
          provide: MarketingApiService, useValue: {
            getQlikConnectedApp: jasmine.createSpy().and.returnValue({}),

          }
        },
        {
          provide: ValidatorService, useValue: {
            urlValidation: jasmine.createSpy().and.returnValue({ error: true, errormsg: '' }),
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrgId: jasmine.createSpy().and.returnValue('12344'),
          }
        },
        {
          provide: DateUtilsService,
          useValue: {}
        },
        {
          provide: CommonFunctionsService, useValue: {
            trackPendoEvents(eventName: string, eventLabel: string): void {
            }
          }
        },
        // {
        //   provide: HttpClient,
        //   useValue: {}
        // },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingCampaignsDeployComponent);
        component = fixture.componentInstance;
        marketingCampaignChannelsApiService = TestBed.inject(MarketingCampaignChannelsApiService);

      });
  });
  beforeEach(() => {
    // fixture = TestBed.createComponent(MarketingCampaignsDeployComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    // marketingCampaignDefineApiService = MarketingCampaignDefineApiService;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Input selectedSegmentedType if case', () => {
    let value = 'Acquisition';
    component.selectedSegmentedType = value;
    component.mobileNotificationSelected = false;
    component.csvSelected = false;

    value = '';
    component.selectedSegmentedType = value;
  });

  it('should call Input deployPreviousClicked', () => {
    spyOn(component, 'errorReset');
    let value = true;
    component.deployPreviousClicked = value;
    expect(component.errorReset).toHaveBeenCalled();

    value = false;
    component.campaignImageError = false;
    component.deployPreviousClicked = value;
    expect(component.campaignImageError).toBeFalsy();
  });


  it('should page load data', () => {
    component.salesUser = spyOn(sessionStorage, 'getItem').and.returnValue('someValue');
    (component as any).translateService.selectedLanguage = of([]);

    fixture.detectChanges();

    expect(component.language).toEqual([]);

    let segmentData = 'segmentData';

    ((component as any).marketingCampaignDefineApiService, 'eventTypeSubject');
    ((component as any).marketingCampaignDefineApiService, 'startDateSubject');
    fixture.detectChanges();
    component.selectedSegmentData = segmentData;


    expect(component.selectedSegmentData).toEqual(segmentData);
  });

  it('should update campaignLink and clear error message when campaignLink is empty', () => {
    // Arrange
    const event = '';
    component.campaignLink = event;
    component.campaignLinkError = false;
    component.campaignLinkErrorMsg = '';

    // Act
    component.campaignLinkChange(event);

    // Assert
    expect(component.campaignLink).toBe(event);
    expect(component.campaignLinkError).toBe(false);
    expect(component.campaignLinkErrorMsg).toBe('');
  });

  it('should not call urlValidation when campaignLink is undefined', () => {
    const event = 'previousValue';
    component.campaignLink = event;
    component.campaignLinkError = true;
    component.campaignLinkErrorMsg = 'Error';
    component.campaignLinkChange(event);
    expect(component.campaignLink).toBe(event);
    expect(component.campaignLinkError).toBe(true);
    expect(component.campaignLinkErrorMsg).toBe(undefined);
  });

  it('should remove trailing whitespaces if the string is valid', () => {
    const inputString = 'Hello World     ';
    const expectedOutput = 'Hello World';
    const result = component.validate(inputString);
    expect(result).toBe(expectedOutput);
  });

  it('should return undefined if the string is invalid', () => {
    const inputString = 'Hello   World!';
    const result = component.validate(inputString);
    expect(result).toBeUndefined();
  });

  // it('should set campaignImage and reset error flags when a valid image file is selected', () => {
  //   const event = {
  //     target: {
  //       files: [{
  //         size: 500000,
  //         type: 'image/jpeg'
  //       }]
  //     }
  //   };
  //   const expectedImageFile = 'data:image/jpeg;base64,...'; 
  //   component.campaignImage = event;
  //   component.campaignImageError = false;
  //   component.campaignImageUploader(event);
  //   expect(component.campaignImage).toBe(event);
  //   expect(component.campaignImageError).toBe(false);
  //   expect(component.campaignImageFile).toBe(expectedImageFile);
  // });

  // it('should set campaignImageError and display the appropriate error message when the selected image file is too large', () => {
  //   const event = {
  //     target: {
  //       files: [{
  //         size: 2000000, 
  //         type: 'image/jpeg'
  //       }]
  //     }
  //   };
  //   component.language = [];
  //   component.campaignImageUploader(event);
  //   expect(component.campaignImageError).toBe(true);
  //   expect(component.campaignImageErrorMsg).toBe(component.language.fileSize);
  // });

  it('should imageUploadErrorFunction', () => {
    component.imageupload = {
      nativeElement: {
        value: 'value'
      }
    };
    component.campaignImageFile = 'image-file';
    component.campaignImage = 'image';
    component.imageUploadErrorFunction();
    expect(component.imageupload.nativeElement.value).toBe('');
    expect(component.campaignImageFile).toBe('');
    expect(component.campaignImage).toBeUndefined();
  });

  it('should deploy submit - mobile', () => {
    component.mobileNotificationSelected = true;
    component.deploySubmit();
    expect(component.deployCampaignChannel).toEqual({ campaignId: '10000', includeInChannel: true, marketingChannelId: '10001', marketingChannelName: '', orgId: 12344, link: '', scheduleType: 'Immediate', notificationName: undefined });
  });

  it('should set selectSchedule', () => {
    const event = 'Event-Driven';
    component.selectSchedule(event);
    expect(component.scheduleSelected).toBe(event);
    expect(component.evenTypeError).toBe(false);
    expect(component.thresHoldError).toBe(false);
    expect(component.timeZoneError).toBe(false);
    expect(component.notificationTimeError).toBe(false);
  });

  it('should set selectEvent', () => {
    const event = 'event';
    component.selectEvent(event);
    expect(component.eventSelected).toBe(event);
    expect(component.evenTypeError).toBe(false);
  });

  it('should set selectEvent', () => {
    const event = '';
    component.selectEvent(event);
    expect(component.evenTypeError).toBe(true);
  });

  it('should update thresholdValue', () => {
    let event = '123';
    component.thresholdChange(event);
    expect(component.thresholdValue).toBe(event);
    expect(component.maxlenght).toBe(false);

    event = '99999';
    component.thresholdChange(event);
    expect(component.maxlenght).toBe(true);

    // event = undefined;
    // component.thresholdChange(event);
    // expect(component.thresholdValue).toBe('');
    // expect(component.thresHoldError).toBe(true);
  });

  it('should update notificationTimeChange', () => {
    let event = 'event';
    component.notificationTimeChange(event);
    expect(component.notificationTime).toBe(event);
    expect(component.notificationTimeForSubmit).toBe('');
    expect(component.notificationTimeError).toBe(false);

    event = '';
    component.notificationTimeChange(event);
    expect(component.notificationTimeError).toBe(true);
  });

  it('should update selectTimeZone', () => {
    let event = 'event';
    component.selectTimeZone(event);
    expect(component.timeZoneSelected).toBe(event);
    expect(component.timeZoneError).toBe(false);

    event = '';
    component.selectTimeZone(event);
    expect(component.timeZoneError).toBe(true);
  });

  it('should update notificationDateTime', () => {
    let event = 'event';
    component.notificationDateTimeChange(event);
    expect(component.notificationDateTime).toBe(event);
    expect(component.notificationDateTimeError).toBe(false);

    event = '';
    component.notificationDateTimeChange(event);
    expect(component.notificationDateTimeError).toBe(true);
  });

  it('should call notificationDateTimeFocus', () => {
    var event = {
      relatedTarget: document.createElement('button')
    };
    let calendar = {
      hideOverlay: jasmine.createSpy('hideOverlay')
    };
    component.notificationDateTimeFocus(event, calendar);
    expect(calendar.hideOverlay).toHaveBeenCalled();

    let _event = {
      relatedTarget: document.createElement('div')
    };
    calendar = {
      hideOverlay: jasmine.createSpy('hideOverlay')
    };
    component.notificationDateTimeFocus(_event, calendar);
    expect(calendar.hideOverlay).not.toHaveBeenCalled();
  });

  it('should split the input string and return the time part', () => {
    const date1 = '2023-06-21 10:30:00';
    const result = component.timesplitter1(date1);
    expect(result).toBe('10:30:00');
  });

  it('should call wholeValidator', () => {
    // Arrange
    const notificationName = 'notification name';
    const campaignLink = 'https://example.com';
    const campaignImage = 'image.jpg';
    const notificationTime = '10:00 AM';
    const timeZoneSelected = 'GMT+2';

    spyOn(component, 'notificationNameChange');
    spyOn(component, 'campaignLinkChange');
    spyOn(component, 'campaignImageUploader');
    spyOn(component, 'notificationTimeChange');
    spyOn(component, 'selectTimeZone');

    component.mobileNotificationSelected = true;
    component.notificationName = notificationName;
    component.campaignLink = campaignLink;
    component.campaignImage = campaignImage;
    component.triggeredCampaign = true;
    component.notificationTime = notificationTime;
    component.timeZoneSelected = timeZoneSelected;

    component.wholeValidator();

    expect(component.notificationNameChange).toHaveBeenCalledWith(notificationName);
    expect(component.campaignLinkChange).toHaveBeenCalledWith(campaignLink);
    expect(component.campaignImageUploader).toHaveBeenCalledWith(campaignImage);
    expect(component.notificationTimeChange).toHaveBeenCalledWith(notificationTime);
    expect(component.selectTimeZone).toHaveBeenCalledWith(timeZoneSelected);
  });

  it('should call wholeValidator', () => {
    // Arrange
    const eventSelected = 'Event 1';
    const thresholdValue = '10';
    const notificationTime = '10:00 AM';
    const timeZoneSelected = 'GMT+2';

    spyOn(component, 'selectEvent');
    spyOn(component, 'thresholdChange');
    spyOn(component, 'notificationTimeChange');
    spyOn(component, 'selectTimeZone');

    component.mobileNotificationSelected = true;
    component.scheduleSelected = 'Event-Driven';
    component.eventSelected = eventSelected;
    component.thresholdValue = thresholdValue;
    component.notificationTime = notificationTime;
    component.timeZoneSelected = timeZoneSelected;

    component.wholeValidator();

    expect(component.selectEvent).toHaveBeenCalledWith(eventSelected);
    expect(component.thresholdChange).toHaveBeenCalledWith(thresholdValue);
    expect(component.notificationTimeChange).toHaveBeenCalledWith(notificationTime);
    expect(component.selectTimeZone).toHaveBeenCalledWith(timeZoneSelected);
  });

  it('should call wholeValidator', () => {
    const notificationDateTime = '2023-06-21 10:30:00';

    spyOn(component, 'notificationDateTimeChange');

    component.mobileNotificationSelected = true;
    component.scheduleSelected = 'Scheduled';
    component.notificationDateTime = notificationDateTime;

    component.wholeValidator();

    expect(component.notificationDateTimeChange).toHaveBeenCalledWith(notificationDateTime);
  });

  it('should call wholeValidator', () => {
    const notificationMailName = 'notification mail name';

    spyOn(component, 'notificationNameMailChange');

    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mailChimpSelected = true;
    component.notificationMailName = notificationMailName;

    component.wholeValidator();

    expect(component.notificationNameMailChange).toHaveBeenCalledWith(notificationMailName);
  });

  it('should set validation for"Immediate"', () => {
    spyOn(component, 'wholeValidator');
    component.mobileNotificationSelected = true;
    component.scheduleSelected = 'Immediate';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;

    component.validator();

    expect(component.validation).toBe(true);

    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validation for "Event-Driven"', () => {
    spyOn(component, 'wholeValidator');
    component.mobileNotificationSelected = true;
    component.scheduleSelected = 'Event-Driven';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.evenTypeError = false;
    component.thresHoldError = false;
    component.maxlenght = false;
    component.notificationTimeError = false;
    component.timeZoneError = false;

    component.validator();

    expect(component.validation).toBe(true);

    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.evenTypeError = true;
    component.thresHoldError = true;
    component.maxlenght = true;
    component.notificationTimeError = true;
    component.timeZoneError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validation for "Scheduled"', () => {
    spyOn(component, 'wholeValidator');
    component.mobileNotificationSelected = true;
    component.scheduleSelected = 'Scheduled';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.notificationDateTimeError = false;

    component.validator();

    expect(component.validation).toBe(true);

    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.notificationDateTimeError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validation triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.notificationNameMailError = true;
    component.notificationNameError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validation triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.notificationNameMailError = false;
    component.notificationNameError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validation to false when triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.notificationNameMailError = true;
    component.notificationNameError = false;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should call validationMob when triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    spyOn(component, 'validationMob');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.notificationNameMailError = false;
    component.notificationNameError = false;

    component.validator();

    expect(component.validationMob).toHaveBeenCalled();
  });

  it('should call validationMob when triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    spyOn(component, 'validationMob');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = false;

    component.validator();

    expect(component.validationMob).toHaveBeenCalled();
  });

  it('should set validation to true when triggeredCampaign is true', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    component.mobileNotificationSelected = false;
    component.mailChimpSelected = true;
    component.notificationNameMailError = false;

    component.validator();

    expect(component.validation).toBe(true);
  });

  it('should set validationMob', () => {
    component.notificationNameError = false;
    component.notificationNameMailError = false;
    component.campaignImageError = false;
    component.notificationTimeError = false;
    component.timeZoneError = false;
    component.maxlenght = false;
    component.campaignLinkError = false;

    component.validationMob();

    expect(component.validation).toBe(true);
  });

  it('should set validationMob', () => {
    component.notificationNameError = true;
    component.notificationNameMailError = true;
    component.campaignImageError = true;
    component.notificationTimeError = true;
    component.timeZoneError = true;
    component.maxlenght = true;
    component.campaignLinkError = true;

    component.validationMob();

    expect(component.validation).toBe(false);
  });

  it('should update notificationNameChange', () => {
    const event = 'Notification Name';
    component.enteredText = 'Text';
    component.notificationNameChange(event);

    expect(component.enteredText).toBe(event.replace(/  +/g, ' '));
    expect(component.isEnteredText).toBe(component.enteredText === '');
    expect($('#current').text()).toBe(String(''));
    expect($('#maximum').css('color')).toBe(undefined);
    expect($('#current').css('color')).toBe(undefined);
    expect($('#the-count').css('font-weight')).toBe(undefined);
    expect(component.notificationName).toBe(component.enteredText);
  });

  it('should update notificationNameMailChange', () => {
    const event = 'Notification Mail Name';
    component.notificationNameMailChange(event);
    expect(component.notificationMailName).toBe(event);
  });

  it('should set the notificationNameMailChange', () => {
    const event = undefined;
    component.notificationNameMailChange(event);
    expect(component.notificationMailName).toBe(event);
  });

  // it('should upload the campaign image and call the campaignChannelServiceRequest method', () => {
  //   // Arrange
  //   const file = new File([], 'test-image.png');
  //   const event = { target: { files: [file] } };
  //   spyOn(component, 'campaignChannelServiceRequest');

  //   // Act
  //   component.campaignImage = event;
  //   component.campaignChannelService();

  //   // Assert
  //   expect((component as any).marketingCampaignsApiService.fileUpload).toHaveBeenCalledWith(jasmine.any(FormData));
  // });

  // it('should set the campaignChannelService', () => {
  //   spyOn(component, 'campaignChannelServiceRequest');
  //   let res = {url:'url'}
  //   component.deployCampaignChannel['content'] = '';
  //   component.campaignImage = undefined;
  //   component.contentUrl = res.url;
  //   component.campaignChannelService();

  //   expect(component.campaignChannelServiceRequest).toHaveBeenCalledWith(undefined);
  //   expect((component as any).deployCampaignChannel['content']).toHaveBeenCalledWith(res.url);

  // });
  it('should send a POST campaignChannelServiceRequest', () => {
    component.editMode = false;
    spyOn(component, 'campaignApiUpdater');
    spyOn(component, 'putChannelsApiCall');
    let res = { campaignChannelId: '343243' };
    const requests: any = {};
    const params = { link: 'link', scheduleType: true, notificationName: 'Test', notificationTimeZone: 'America/New_York' };
    component.deployCampaignChannel = params;
    const errorResponse = {
      error: true,
      status: 500,
      errorMessage: 'Internal Server Error'
    };
    const req = spyOn(marketingCampaignChannelsApiService, 'CampaignChannelPOST').and.returnValue(of(errorResponse));
    component.language = [];

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();
    // component.campaignChannelServiceForFacebook();


    expect(marketingCampaignChannelsApiService.CampaignChannelPOST).toHaveBeenCalledWith(params);
    requests['mobile_notification'] = req;


  });

  it('should call campaignChannelServiceRequestsend and mailChimpSelected is true', () => {
    component.editMode = false;
    let res = { campaignChannelId: '343243' };
    spyOn(component, 'putChannelsApiCall');
    component.mailChimpSelected = true;
    component.channelPostObject = { mailChimp: { include2: true, marketingChannelId: '123' } };
    const channelObject = component.channelPostObject.mailChimp;
    component.definePostObject = { campaignId: '00123' };
    let paramsData = {
      "campaignId": component.definePostObject.campaignId,
      "includeInChannel": channelObject.include2,
      "marketingChannelId": channelObject.marketingChannelId,
      "marketingChannelName": 'Mailchimp',
      "orgId": '10001',
      "scheduleType": ""
    };

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();

    expect(component.mailChimpSelected).toBeTruthy();
    expect(channelObject).toEqual(component.channelPostObject.mailChimp);
    expect(component.definePostObject.campaignId).toEqual('00123');

    component.triggeredCampaign = true;
    component.triggeredEventType = 'Service Limit Hit';
    paramsData['notificationName'] = 'notificationMailName';

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();

    expect(component.triggeredCampaign).toBeTruthy()
    expect(component.triggeredEventType).toEqual('Service Limit Hit');
  });

  it('should call campaignChannelServiceRequestsend and faceBookSelected is true', () => {
    component.editMode = false;
    let res = { campaignChannelId: '343243' };
    spyOn(component, 'putChannelsApiCall');
    component.faceBookSelected = true;
    component.channelPostObject = { faceBook: { include1: true, marketingChannelId: '123' } };
    const channelObject = component.channelPostObject.faceBook;
    component.definePostObject = { campaignId: '00123' };
    let paramsData = {
      "campaignId": component.definePostObject.campaignId,
      "includeInChannel": channelObject.include1,
      "marketingChannelId": channelObject.marketingChannelId,
      "marketingChannelName": 'Facebook',
      "orgId": '10001',
      "scheduleType": ""
    };

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();
    component.campaignChannelServiceForFacebook();


    expect(component.faceBookSelected).toBeTruthy();
    expect(channelObject).toEqual(component.channelPostObject.faceBook);
    expect(component.definePostObject.campaignId).toEqual('00123');
  });

  it('should call campaignChannelServiceRequestsend and hubspotSelected is true', () => {
    component.editMode = false;
    let res = { campaignChannelId: '343243' };
    spyOn(component, 'putChannelsApiCall');
    component.hubspotSelected = true;
    component.channelPostObject = { hubspot: { include1: true, marketingChannelId: '123' } };
    const channelObject = component.channelPostObject.hubspot;
    component.definePostObject = { campaignId: '00123' };
    let paramsData = {
      "campaignId": component.definePostObject.campaignId,
      "includeInChannel": channelObject.include1,
      "marketingChannelId": channelObject.marketingChannelId,
      "marketingChannelName": 'Hubspot',
      "orgId": '10001',
      "scheduleType": ""
    };

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();


    expect(component.hubspotSelected).toBeTruthy();
    expect(channelObject).toEqual(component.channelPostObject.hubspot);
    expect(component.definePostObject.campaignId).toEqual('00123');
  });

  it('should call campaignChannelServiceRequestsend and constantSelected is true', () => {
    component.editMode = false;
    let res = { campaignChannelId: '343243' };
    spyOn(component, 'putChannelsApiCall');
    component.constantSelected = true;
    component.channelPostObject = { constant: { include1: true, marketingChannelId: '123' } };
    const channelObject = component.channelPostObject.constant;
    component.definePostObject = { campaignId: '00123' };
    let paramsData = {
      "campaignId": component.definePostObject.campaignId,
      "includeInChannel": channelObject.include1,
      "marketingChannelId": channelObject.marketingChannelId,
      "marketingChannelName": 'Constant',
      "orgId": '10001',
      "scheduleType": ""
    };

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();

    expect(component.constantSelected).toBeTruthy();
    expect(channelObject).toEqual(component.channelPostObject.constant);
    expect(component.definePostObject.campaignId).toEqual('00123');
  });

  it('should call campaignChannelServiceRequestsend and constantSelected is true', () => {
    const requests = [of('response1'), of('response2')];
    let res = { campaignChannelId: '343243' };
    spyOn(component, 'putChannelsApiCall');
    component.editMode = false;
    component.campaignChannelServiceRequest(res);

    let jsonData = { mobile_notification: { error: true, status: 500, errorMessage: 'OK', message: '' } };
    component.loading = true;
    const subscription = forkJoin(requests).subscribe((json: any) => {
      component.editMode = false;
      component.loading = false;
      component.language = [];
      component.deployErrorMsg = component.language.internalServerError;
      expect(component.deployErrorMsg).toEqual(component.language.internalServerError);

      component.campaignChannelServiceRequest(res);

      // expect(json).toEqual(jsonData.mobile_notification);
      // expect(component.loading).toBeFalsy();
    });
    // expect(component.loading).toBe(true);
    expect(component.editMode).toBeFalsy();


  });

  it('should call campaignChannelServiceRequestsend is edit true', () => {
    let res = { campaignChannelId: '343243' };
    component.editMode = true;
    component.campaignChannelData = { campaignChannelId: '432432' }
    component.deployCampaignChannel = { campaignChannelId: component.campaignChannelData.campaignChannelId };
    spyOn(component, 'putChannelsApiCall');
    spyOn(component, 'campaignApiUpdater');
    let req = spyOn(marketingCampaignChannelsApiService, 'CampaignChannelPUT').and.returnValue(of(res));
    component.loading = false;
    component.deploySuccess = true;
    component.language = [];
    component.deploySuccessMsg = component.language.DataUpdatedSuccessfully;

    component.campaignChannelServiceRequest(res);
    component.campaignChannelServiceForMailChimp();
    component.campaignChannelServiceForFacebook();

    expect(component.loading).toBeFalsy();
    expect(marketingCampaignChannelsApiService.CampaignChannelPUT).toHaveBeenCalledWith(component.deployCampaignChannel);
  });

  it('should call putChannelsApiCall', () => {
    let res = { campaignChannelId: '343243' };
    const expectedCampaignId = '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832';
    const expectedChannels = 'Mobile Notification,Mailchimp';
    const expectedParams = { channels: expectedChannels };
    component.triggeredCampaign = true;
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.definePostObject = { campaignId: '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832' };
    let req = spyOn(marketingCampaignChannelsApiService, 'CampaignChannelListPUT').and.returnValue(of(res));

    component.putChannelsApiCall();

    expect(marketingCampaignChannelsApiService.CampaignChannelListPUT).toHaveBeenCalledWith(expectedCampaignId, expectedParams);
  });

  it('should call putChannelsApiCall', () => {
    let res = { campaignChannelId: '343243' };
    component.triggeredCampaign = true;
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = false;
    component.definePostObject = { campaignId: '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832' };

    component.putChannelsApiCall();

  });

  it('should call putChannelsApiCall', () => {
    let res = { campaignChannelId: '343243' };
    component.triggeredCampaign = true;
    component.mobileNotificationSelected = false;
    component.mailChimpSelected = true;
    component.definePostObject = { campaignId: '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832' };

    component.putChannelsApiCall();

    component.mobileNotificationSelected = false;
    component.mailChimpSelected = false;
    component.putChannelsApiCall();

  });

  it('should call CampaignChannelListPUT with the correct campaignId and channels based on selected options', () => {
    // Arrange
    component.definePostObject = { campaignId: '6b3a8192-9c3f-4e83-8ce1-fc14fa84d832' };
    component.triggeredCampaign = false;
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true
    component.hubspotSelected = true;
    component.constantSelected = true;
    component.faceBookSelected = true;

    component.putChannelsApiCall();

    component.mobileNotificationSelected = false;
    component.mailChimpSelected = false
    component.hubspotSelected = false;
    component.constantSelected = false;
    component.faceBookSelected = false;

    component.putChannelsApiCall();
  });

  it('should call search_Text_Valuefun', () => {
    component.notificationMailName = 'some value';

    component.search_Text_Valuefun();

    expect(component.notificationMailName).toEqual('');
  });

  it('should set status to "Active" when triggeredCampaign is true', () => {
    component.triggeredCampaign = true;
    component.definePostObject = {};

    component.definePostObject['status'] = 'In-Progress';
    component.campaignApiUpdater();

    expect(component.definePostObject.hasOwnProperty('segmentExecutableSize')).toBe(false);
  });

  it('should set link property with campaignLink when campaignLink is defined', () => {
    component.campaignLink = 'https://example.com';

    component.deployCampaignChannel = { link: '' };

    component.deployCampaignChannel['link'] = component.campaignLink === undefined ? '' : component.campaignLink;

    component.campaignDataAssiner();

    expect(component.deployCampaignChannel['link']).toBe('https://example.com');
  });

  it('should set link property as an empty string when campaignLink is undefined', () => {
    component.campaignLink = undefined;
    component.deployCampaignChannel = { link: '' };
    component.deployCampaignChannel['link'] = component.campaignLink === undefined ? '' : component.campaignLink;
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['link']).toBe('');

    component.triggeredCampaign = true;
    component.scheduleSelected = 'Daily';
    component.campaignDataAssiner();
    component.deployCampaignChannel = { scheduleType: '' };
    component.deployCampaignChannel['scheduleType'] = component.triggeredCampaign ? '' : component.scheduleSelected;

    component.notificationName = 'Campaign Notification';
    component.deployCampaignChannel = { notificationName: '' };
    component.deployCampaignChannel['notificationName'] = component.notificationName;
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationName']).toBe('Campaign Notification');
  });

  it('should set notificationTimeZone to America/New_York when timeZoneSelected is America/New_York (East Coast)', () => {
    component.timeZoneSelected = 'America/New_York (East Coast)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/New_York' }
    if (component.timeZoneSelected == 'America/New_York (East Coast)') {
      component.deployCampaignChannel['notificationTimeZone'] = 'America/New_York';
    }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toBe('America/New_York');
  });

  it('should set notificationTimeZone to America/Chicago when timeZoneSelected is America/Chicago (Central)', () => {
    component.timeZoneSelected = 'America/Chicago (Central)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/New_York' }
    if (component.timeZoneSelected == 'America/Chicago (Central)') {
      component.deployCampaignChannel['notificationTimeZone'] = 'America/Chicago';
    }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toBe('America/Chicago');
  });

  it('should set campaignDataAssiner', () => {
    component.triggeredCampaign = true;
    component.timeZoneSelected = 'America/New_York (East Coast)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/New_York' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/New_York');

    component.timeZoneSelected = 'America/Chicago (Central)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Chicago' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Chicago');

    component.timeZoneSelected = 'America/Denver (Mountain)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Denver' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Denver');

    component.timeZoneSelected = 'America/Los_Angeles (West Coast)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Los_Angeles' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Los_Angeles');

    component.timeZoneSelected = 'UTC';
    component.deployCampaignChannel = { notificationTimeZone: 'UTC' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('UTC');

    component.deployCampaignChannel = { notificationTimeZone: component.timeZoneSelected }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual(component.timeZoneSelected);
  });

  it('should set campaignDataAssiner', () => {
    component.deployCampaignChannel = {'link':''}
    component.scheduleSelected = 'Event-Driven';
    component.campaignDataAssiner();
    component.deployCampaignChannel = {'eventDriven':true};
    component.deployCampaignChannel = {eventThreshold : 65535};
    component.deployCampaignChannel = {notificationTime : '65535'};
    expect(component.scheduleSelected).toEqual('Event-Driven');

    component.timeZoneSelected = 'America/New_York (East Coast)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/New_York' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/New_York');

    component.timeZoneSelected = 'America/Chicago (Central)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Chicago' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Chicago');

    component.timeZoneSelected = 'America/Denver (Mountain)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Denver' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Denver');

    component.timeZoneSelected = 'America/Los_Angeles (West Coast)';
    component.deployCampaignChannel = { notificationTimeZone: 'America/Los_Angeles' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('America/Los_Angeles');

    component.timeZoneSelected = 'UTC';
    component.deployCampaignChannel = { notificationTimeZone: 'UTC' }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual('UTC');

    component.deployCampaignChannel = { notificationTimeZone: component.timeZoneSelected }
    component.campaignDataAssiner();
    expect(component.deployCampaignChannel['notificationTimeZone']).toEqual(component.timeZoneSelected);

    component.scheduleSelected = 'Scheduled';
    component.campaignDataAssiner();
    component.deployCampaignChannel = {'scheduledDateTime':'Sun Jun 25 2023 20:17:01 GMT+0530 (India Standard Time)'};
    expect(component.deployCampaignChannel['scheduledDateTime']).toEqual('Sun Jun 25 2023 20:17:01 GMT+0530 (India Standard Time)');
  });

  it('should call deployErrorMsgAssigner', () => {
    let error = { status: 504, errorMessage: '', error:'' };
    component.language = [];
    let expectedErrorMsg = component.language.timeoutErrorError;

    if (error.status == 504 || error.status == 502) {
      component.deployError = true;
      component.deployErrorMsg = expectedErrorMsg;
    }

    component.deployErrorMsgAssigner(error);

    expect(component.deployError).toBe(true);
    expect(component.deployErrorMsg).toBe(expectedErrorMsg);

    error = { status: 400, errorMessage: 'OK', error: '' };
    expectedErrorMsg = component.language.Bad_Request;

    error.status == 400;
    error.errorMessage = 'OK';
    component.deployErrorMsgAssigner(error);
    component.deployErrorMsg = component.language.Bad_Request;
    component.deployError = true;

    error.status == 401;
    error.errorMessage = '';
    component.deployErrorMsgAssigner(error);
    component.deployErrorMsg = error.error;
    component.deployError = true;

    error = { status: 500, errorMessage: 'OK', error: '' };
    expectedErrorMsg = component.language.internalServerError;

    error.status = 500;
    error.errorMessage = 'OK';
    component.deployErrorMsgAssigner(error);
    component.deployError = true;
    component.deployErrorMsg = component.language.internalServerError;

    error.status = 501;
    error.errorMessage = '';
    component.deployErrorMsgAssigner(error);
    component.deployErrorMsg = error.error;
    component.deployError = true;
  });

  it('should update index values based on selected options', () => {
    component.mobileNotificationSelected = true;
    component.mailChimpSelected = true;
    component.faceBookSelected = true;
    component.hubspotSelected = true;
    component.csvSelected = true;
    component.constantSelected = true;

    component.numberOrder();

    expect(component.indexValue).toBe(1);
    expect(component.indexValue1).toBe(2);
    expect(component.indexValue2).toBe(3);
    expect(component.indexValue3).toBe(4);
    expect(component.indexValue4).toBe(5);
    expect(component.indexValue5).toBe(6);
  });

  it('should update index values based on selected options', () => {
    let index = 0;
    component.mobileNotificationSelected = false;
    component.mailChimpSelected = false;
    component.faceBookSelected = false;
    component.hubspotSelected = false;
    component.csvSelected = false;
    component.constantSelected = false;

    component.indexValue = 0;
    component.indexValue1 = 0;
    component.indexValue2 = 0;
    component.indexValue3 = 0;
    component.indexValue4 = 0;
    component.indexValue5 = 0;

    component.numberOrder();

    expect(component.indexValue).toEqual(index);
    expect(component.indexValue1).toBe(0);
    expect(component.indexValue2).toBe(0);
    expect(component.indexValue3).toBe(0);
    expect(component.indexValue4).toBe(0);
    expect(component.indexValue5).toBe(0);
  });

  it('should open a new window with the correct URL', () => {
    originalOpen = window.open;
    window.open = jasmine.createSpy('open');
    const expectedUrl = 'https://calix.force.com/idp/login?app=0sp4u0000008OKk';

    component.electronicLink();

    expect(window.open).toHaveBeenCalledWith(expectedUrl);
  });

  it('should allow alphanumeric characters and hyphen/underscore', () => {
    let event;
    event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      charCode: undefined,
      which: 65, 
    };
    const result = component.onKeypressEvent(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should prevent input for non-alphanumeric characters', () => {
    let event;
    event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      charCode: undefined,
      which: 33, 
    };    const result = component.onKeypressEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('should deploy submit - mail', () => {
    //arrange 
    component.mailChimpSelected = true;
    //action
    component.deploySubmit();
    // assert
    expect(component.deployCampaignChannel).toEqual({ campaignId: '10000', includeInChannel: true, marketingChannelId: '10001', marketingChannelName: '', orgId: 12344, link: '', scheduleType: 'Immediate', notificationName: undefined });
  });

  it('should deploy submit - faceBook', () => {
    //arrange 
    component.faceBookSelected = true;
    //action
    component.deploySubmit();
    // assert
    expect(component.deployCampaignChannel).toEqual({ campaignId: '10000', includeInChannel: false, marketingChannelId: '10001', marketingChannelName: '', orgId: 12344, link: '', scheduleType: 'Immediate', notificationName: undefined });
  });

  it('should deploy submit - hubspot', () => {
    //arrange 
    component.hubspotSelected = true;
    //action
    component.deploySubmit();
    // assert
    expect(component.deployCampaignChannel).toEqual({ campaignId: '10000', includeInChannel: true, marketingChannelId: '10001', marketingChannelName: '', orgId: 12344, link: '', scheduleType: 'Immediate', notificationName: undefined });
  });

  it('should deploy submit - constant', () => {
    //arrange 
    component.constantSelected = true;
    //action
    component.deploySubmit();
    // assert
    expect(component.deployCampaignChannel).toEqual({ campaignId: '10000', includeInChannel: true, marketingChannelId: '10001', marketingChannelName: '', orgId: 12344, link: '', scheduleType: 'Immediate', notificationName: undefined });
  });


});
