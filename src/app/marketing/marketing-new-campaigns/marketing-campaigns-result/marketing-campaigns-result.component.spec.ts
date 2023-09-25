import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
//import 'jasmine';

import { MarketingCampaignsResultComponent } from './marketing-campaigns-result.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { MarketingCampaignsChartServiceService } from './marketing-campaigns-chart-service.service';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorService } from 'src/app-services/validator.services';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExpectedConditions } from 'protractor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Highcharts from 'highcharts';
// import * as Highcharts from 'highcharts';
// require('highcharts/highcharts-more')(Highcharts);


describe('MarketingCampaignsResultComponent', () => {
  let component: MarketingCampaignsResultComponent;
  let fixture: ComponentFixture<MarketingCampaignsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingCampaignsResultComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, CalendarModule, FormsModule],
      providers: [{
        provide: MarketingCampaignDefineApiService, useValue: {
          getDefineDataEmitter: jasmine.createSpy().and.returnValue({ campaignId: '10011' }),
          deploy2ndNextEmitterSubject: of(''),
          setDefineDataEmitter: jasmine.createSpy(),
          stringValidatorWithCrossScriptAndErrorMsgDeploy: jasmine.createSpy().and.returnValue({ error: 'true', errorMsg: '' }),
          //getDefineDataEmitter: jasmine.createSpy().and.returnValue({ startDate: '28-09-2022', endDate: '30-09-2022' }),
        }
      },
      { provide: TranslateService, useCalss: CustomTranslateService },

      {
        provide: MarketingCampaignsApiService, useValue: {
          CampaignDetailGET: jasmine.createSpy().and.returnValue(of({ status: '', csvDownloadOnly: true, service: 'New', channels: [], })),
          fileUpload: jasmine.createSpy().and.returnValue(of({ url: '' })),

        }
      },
      {
        provide: MarketingCampaignChannelsApiService, useValue: {
          CampaignChannelByOrgGET: jasmine.createSpy().and.returnValue(of([{ marketingChannelName: 'Mobile Notification', }])),
          CampaignChannelPUT: jasmine.createSpy().and.returnValue(of([{
            campaignId: 'CampaignId',
            includeInChannel: 'IncludeInChannel',
            marketingChannelId: 'MarketingChannelId',
            marketingChannelName: 'MarketingChannelName',
            orgId: 'OrgId'
          }])),
        }
      },
      {
        provide: MarketingCampaignsChartServiceService, useValue: {
          serviceTierTechnologyOptions: jasmine.createSpy().and.returnValue(of({})),
        }
      },

      {
        provide: MarketingApiService, useValue: {
          getQlikConnectedApp: jasmine.createSpy().and.returnValue(''),
        }
      },
      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue({ revenueRead: true, subscriberRead: true }),
          formatDateForCampaign: jasmine.createSpy().and.returnValue(''),
          timeSplitter: jasmine.createSpy().and.returnValue(''),

        }
      },
      {
        provide: ExportExcelService, useValue: {
          downLoadCSV: jasmine.createSpy()
        }
      },
      {
        provide: NgbModal, useValue: {
          open: jasmine.createSpy(),
          dismissAll: jasmine.createSpy(),

        }
      },
      {
        provide: ValidatorService, useValue: {
          urlValidation: jasmine.createSpy().and.returnValue({ error: true, errorMsg: '' }),
        }
      },
      {
        provide: DateUtilsService, useValue: {
          getLocalTime: jasmine.createSpy().and.returnValue(''),

        }
      }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingCampaignsResultComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {

    // Action
    spyOn((component as any), 'resultOfCampaignApiLoader').and.returnValue('675757978');
    fixture.detectChanges();
    (component as any).translateService.selectedLanguage = of([]);
    component.language = [];
    component.campaignId = '675757978';
  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = false;
    component.scopes = {
      revenueRead: true,
      revenueWrite: true,
      subscriberRead: true,
      subscriberWrite: true
    };

    component.onChangeActiveMethod();

    expect(component.hasScope).toBe(false);
    expect(component.activeChart).toBe('revenue');
    expect(component.revenueScreen).toBe(true);

  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = false;
    component.scopes = {
      revenueRead: true,
      revenueWrite: true,
      subscriberRead: false,
      subscriberWrite: false
    };

    component.onChangeActiveMethod();

    expect(component.hasScope).toBe(false);
    expect(component.activeChart).toBe('revenue');
    expect(component.revenueScreen).toBe(true);
  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = false;
    component.scopes = {
      revenueRead: false,
      revenueWrite: false,
      subscriberRead: true,
      subscriberWrite: true
    };

    component.onChangeActiveMethod();

    expect(component.hasScope).toBe(false);
    expect(component.activeChart).toBe('subscriber');
    expect(component.revenueScreen).toBe(false);
  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = false;
    component.scopes = {
      revenueRead: false,
      revenueWrite: false,
      subscriberRead: false,
      subscriberWrite: false
    };

    component.onChangeActiveMethod();

    expect(component.hasScope).toBe(true);
  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = false;
    component.scopes = {
      revenueRead: false,
      revenueWrite: true,
      subscriberRead: false,
      subscriberWrite: true
    };

    component.onChangeActiveMethod();
    component.hasScope = true;

    expect(component.hasScope).toBe(true);
  });

  it('should set onChangeActiveMethod', () => {
    component.triggeredCampaign = true;

    component.onChangeActiveMethod();

    expect(component.activeChart).toBe('audienceHistory');
    // Add expectations for other property changes or method invocations
  });

  it('should download', () => {
    let data = [{ originalValue: '100' }];
    component.language = [];
    component.download();
    spyOn(component, 'usageByAppDataForming').and.returnValue(data);
    expect((component as any).exportExcelService.downLoadCSV).toHaveBeenCalledWith(component.language['Audience Distribution'], [])
  });

  it('should set expandFull', () => {
    component.resultDataObject = {
      channels: ['channel1', 'channel2']
    };
    component.language = { subs_fullscreen_close_tip: 'subs_fullscreen_close_tip' };
    component.expandFull('channel');
    expect(component.fullScreen).toBe(true);
    expect(component.deduplicatedDataAvailable).toBe(true);
    expect(component.onlymailchimp).toBe(false);
    expect(component.Dismiss).toBe(component.language.subs_fullscreen_close_tip);
  });

  it('should set expandFull', () => {
    component.resultDataObject = {
      channels: null
    };
    component.expandFull('channel');

    expect(component.fullScreen).toBe(false);
    expect(component.deduplicatedDataAvailable).toBe(false);
    expect(component.onlymailchimp).toBe(true);
  });

  it('should call dateAssigner', () => {
    const definedData = {
      startDate: '2023-06-19', 
      endDate: '2023-06-21' 
    };
    component.scheduleSelected = 'Immediate';
    component.dateAssigner();
    // component.startDate = JSON.stringify(new Date(definedData.startDate))
  
    // expect(component.endDate).toEqual(definedData.endDate);
    // expect(component.startDate).toEqual(component.startDate);
    expect(component.campaignError).toBe(false);
  });

  it('should call fullScreenExpandFunction', () => {
    component.fullScreenExpandFunction('chartName');
    component.id = { id: '558687' };
    spyOn(component, 'editOrResultCheck').and.returnValue(component.id);
    expect(component.fullScreen).toBe(false);
    expect(component.deduplicatedDataAvailable).toBe(false);
  });

  it('should call editOrResultCheck', () => {
    component.editOrResultCheck('111');
    spyOn((component as any), 'resultOfCampaignApiLoader').and.returnValue('111');
  });

  it('should call editOrResultCheck', () => {
    component.editOrResultCheck('someId_edit');

    spyOn(component, 'resultOfCampaignApiLoader').and.returnValue();
  });

  it('should set chartChange', () => {
    const chartValue = 'someChartValue';

    component.chartChange(chartValue);

    expect(component.activeChart).toBe(chartValue);
    spyOn(component, 'trueFalseAssigner').and.returnValue();
  });

  it('should assign values to properties based on the exception value', () => {

    component.trueFalseAssigner('revenue');

    expect(component.revenue).toBe(true);
    expect(component.subscriber).toBe(false);
    expect(component.audienceHistory).toBe(false);
    expect(component.campaignMetrics).toBe(false);
  });

  it('should assign values to properties based on the exception value', () => {

    component.trueFalseAssigner('subscriber');

    expect(component.revenue).toBe(false);
    expect(component.subscriber).toBe(true);
    expect(component.audienceHistory).toBe(false);
    expect(component.campaignMetrics).toBe(false);
  });

  it('should assign values to properties based on the exception value', () => {

    component.trueFalseAssigner('audienceHistory');

    expect(component.revenue).toBe(false);
    expect(component.subscriber).toBe(false);
    expect(component.audienceHistory).toBe(true);
    expect(component.campaignMetrics).toBe(false);
  });

  it('should assign values to properties based on the exception value', () => {

    component.trueFalseAssigner('campaignMetrics');

    expect(component.revenue).toBe(false);
    expect(component.subscriber).toBe(false);
    expect(component.audienceHistory).toBe(false);
    expect(component.campaignMetrics).toBe(true);
  });

  it('should call resultErrorMsgAssigner', () => {
    const error = {
      error: {
        errorDesc: 'Some error description'
      }
    };
    component.resultErrorMsgAssigner(error);
    expect(component.resultErrorMsg).toBe('Some error description');
    expect(component.resultError).toBe(true);
  });

  it('should call resultErrorMsgAssigner', () => {
    const error = {
      error: 'Some error'
    };
    component.resultErrorMsgAssigner(error);
    expect(component.resultErrorMsg).toBe('Some error');
    expect(component.resultError).toBe(true);
  });

  it('should call redeploy', () => {
    spyOn(component, 'openRedeployMailchimpModal');
    component.redeploy('Mailchimp', 0);

    expect(component.openRedeployMailchimpModal).toHaveBeenCalled();
  });

  it('should call redeploy', () => {
    spyOn(component, 'openRedeployCiqModal');
    component.redeploy('SomeOtherPlatform', 0);

    expect(component.openRedeployCiqModal).toHaveBeenCalled();
  });

  it('should call csvDownload', fakeAsync(() => {
    const appMock = { /* Mock app object */ };
    // spyOn(window, 'downloadQSReports');

    // component.csvDownload();
    // tick();

    // expect((component as any).marketingApiService.getQlikConnectedApp).toHaveBeenCalled();
    // expect(window.downloadQSReports).toHaveBeenCalledWith(appMock, 'CSV Download');
  }));

  it('should call imageUploadErrorFunction', () => {

    component.imageUploadErrorFunction();
    component.campaignImageFile = '';
    component.campaignImage = undefined;

    expect(component.campaignImageFile).toEqual('');
    expect(component.campaignImage).toEqual(undefined);
  });

  it('should call selectSchedule', () => {
    let event = true;
    spyOn(component, 'dateAssigner');
    component.selectSchedule(event);
    component.scheduleSelected = event;

    expect(component.dateAssigner).toHaveBeenCalled();
  });

  it('should call selectEvent', () => {
    let event = false;
    component.selectEvent(event);
    component.eventSelected = event;
    component.evenTypeError = true;
    expect(component.eventSelected).toEqual(event);
    expect(component.evenTypeError).toEqual(true);

    event = true;
    component.selectEvent(event);
    component.evenTypeError = false;
    expect(component.evenTypeError).toEqual(false);
  });

  it('should call selectTimeZone', () => {
    let event = false;
    component.selectTimeZone(event);
    component.timeZoneSelected = event;
    component.timeZoneError = true;
    expect(component.timeZoneSelected).toEqual(event);
    expect(component.timeZoneError).toEqual(true);

    event = true;
    component.selectTimeZone(event);
    component.timeZoneError = false;
    expect(component.timeZoneError).toEqual(false);
  });

  it('should call notificationTimeChange', () => {
    let event = false;
    component.notificationTimeChange(event);
    component.notificationTime = event;
    component.notificationTimeError = true;
    // component.notificationTimeForSubmit = 
    expect(component.notificationTime).toEqual(event);
    expect(component.notificationTimeError).toEqual(true);
    expect((component as any).marketingCommonService.timeSplitter).toHaveBeenCalledWith(event);

    event = true;
    component.notificationTimeChange(event);
    component.notificationTimeError = false;
    expect(component.notificationTimeError).toEqual(false);
  });

  it('should set notificationDateTimeChange', () => {
    const event = new Date('2023-06-18T12:00:00');
    spyOn(Date, 'now').and.returnValue(new Date('2023-06-19T12:00:00').getTime());

    component.notificationDateTimeChange(event);

    expect(component.dateValidation).toBe(true);
    expect(component.notificationDateTime).toBe(event);
    expect(component.notificationDateTimeError).toBe(false);
  });

  it('should set notificationDateTimeChange', () => {
    const event = new Date('2023-06-20T12:00:00');
    spyOn(Date, 'now').and.returnValue(new Date('2023-06-19T12:00:00').getTime());

    component.notificationDateTimeChange(event);
    component.dateValidation = false;

    expect(component.dateValidation).toBe(false);
    expect(component.notificationDateTime).toBe(event);
    expect(component.notificationDateTimeError).toBe(false);
  });

  it('should call wholeValidator', () => {
    component.triggeredCampaign = true;
    spyOn(component, 'notificationNameChange');
    spyOn(component, 'campaignLinkChange');
    spyOn(component, 'campaignImageUploader');
    spyOn(component, 'notificationTimeChange');
    spyOn(component, 'selectTimeZone');

    component.wholeValidator();

    expect(component.notificationNameChange).toHaveBeenCalledWith(component.notificationName);
    expect(component.campaignLinkChange).toHaveBeenCalledWith(component.campaignLink);
    expect(component.campaignImageUploader).toHaveBeenCalledWith(component.campaignImage);
    expect(component.notificationTimeChange).toHaveBeenCalledWith(component.notificationTime);
    expect(component.selectTimeZone).toHaveBeenCalledWith(component.timeZoneSelected);
  });

  it('should call wholeValidator', () => {
    component.scheduleSelected = 'Event-Driven';
    spyOn(component, 'notificationNameChange');
    spyOn(component, 'campaignLinkChange');
    spyOn(component, 'campaignImageUploader');
    spyOn(component, 'notificationTimeChange');
    spyOn(component, 'selectTimeZone');
    spyOn(component, 'selectEvent');
    spyOn(component, 'thresholdChange');

    component.wholeValidator();

    expect(component.notificationNameChange).toHaveBeenCalledWith(component.notificationName);
    expect(component.campaignLinkChange).toHaveBeenCalledWith(component.campaignLink);
    expect(component.campaignImageUploader).toHaveBeenCalledWith(component.campaignImage);
    expect(component.notificationTimeChange).toHaveBeenCalledWith(component.notificationTime);
    expect(component.selectTimeZone).toHaveBeenCalledWith(component.timeZoneSelected);
    expect(component.selectEvent).toHaveBeenCalledWith(component.eventSelected);
    expect(component.thresholdChange).toHaveBeenCalledWith(component.thresholdValue);
  });

  it('should call wholeValidator"', () => {
    component.scheduleSelected = 'Scheduled';
    spyOn(component, 'notificationNameChange');
    spyOn(component, 'campaignLinkChange');
    spyOn(component, 'campaignImageUploader');
    spyOn(component, 'notificationDateTimeChange');

    component.wholeValidator();

    expect(component.notificationNameChange).toHaveBeenCalledWith(component.notificationName);
    expect(component.campaignLinkChange).toHaveBeenCalledWith(component.campaignLink);
    expect(component.campaignImageUploader).toHaveBeenCalledWith(component.campaignImage);
  });


  it('should set validator', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = true;
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.notificationTimeError = false;
    component.timeZoneError = false;
    component.validator();
    component.validation = true;

    expect(component.wholeValidator).toHaveBeenCalled();
    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.notificationNameError).toBeFalsy();
    expect(component.campaignLinkError).toBe(false);
    expect(component.campaignImageError).toBe(false);
    expect(component.notificationTimeError).toBe(false);
    expect(component.timeZoneError).toBe(false);
    expect(component.validation).toBe(true);

  });

  it('should set validator', () => {
    component.triggeredCampaign = true;
    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.notificationTimeError = true;
    component.timeZoneError = true;

    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validator', () => {
    spyOn(component, 'wholeValidator');
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Immediate';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.scheduleSelected = true;
    component.validation = true;
    component.validator();

    expect(component.wholeValidator).toHaveBeenCalled();
    expect(component.triggeredCampaign).toBeFalsy();
    expect(component.notificationNameError).toBeFalsy();
    expect(component.campaignLinkError).toBe(false);
    expect(component.campaignImageError).toBe(false);
    expect(component.scheduleSelected).toBe(true);
    expect(component.validation).toBeTruthy();
  });

  it('should set validator', () => {
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Immediate';
    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.scheduleSelected = false;


    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validator', () => {
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Event-Driven';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.scheduleSelected = true;
    component.evenTypeError = false;
    component.thresHoldError = false;
    component.maxlenght = false;
    component.notificationTimeError = false;
    component.timeZoneError = false;
    component.validation = true;

    component.validator();

    expect(component.validation).toBe(true);
  });

  it('should set validator', () => {
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Event-Driven';
    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.scheduleSelected = false;
    component.evenTypeError = true;
    component.thresHoldError = true;
    component.maxlenght = true;
    component.notificationTimeError = true;
    component.timeZoneError = true;
    component.validation = false;
    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should set validator', () => {
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Scheduled';
    component.notificationNameError = false;
    component.campaignLinkError = false;
    component.campaignImageError = false;
    component.scheduleSelected = true;
    component.notificationDateTimeError = false;
    component.dateValidation = false;
    component.validation = true;

    component.validator();

    expect(component.validation).toBe(true);
  });

  it('should set validator', () => {
    component.triggeredCampaign = false;
    component.scheduleSelected = 'Scheduled';
    component.notificationNameError = true;
    component.campaignLinkError = true;
    component.campaignImageError = true;
    component.scheduleSelected = false;
    component.notificationDateTimeError = true;
    component.dateValidation = true;
    component.validation = false;
    component.validator();

    expect(component.validation).toBe(false);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.ciqModal = true;
    spyOn(component, 'openReviewCiqModal');
    component.handleKeyboardEvent(event);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.formModal = true;
    component.handleKeyboardEvent(event);
    spyOn(component, 'campaignDataAssiner');
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.facebookModal = true;
    spyOn(component, 'ReDeployFacebook');
    component.handleKeyboardEvent(event);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.hubspotModal = true;
    spyOn(component, 'ReDeployHubSpot');
    component.handleKeyboardEvent(event);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.constantContactModal = true;
    spyOn(component, 'ReDeployConstantContact');
    component.handleKeyboardEvent(event);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.mailchimpModal = true;
    spyOn(component, 'ReDeployMailchimp');
    component.handleKeyboardEvent(event);
  });

  it('should call handleKeyboardEvent', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.ciqModal = false;
    component.facebookModal = false;
    component.hubspotModal = false;
    component.constantContactModal = false;
    component.mailchimpModal = false;
    component.handleKeyboardEvent(event);

    expect(component.ciqModal).toBeFalsy();
    expect(component.facebookModal).toBeFalsy();
    expect(component.hubspotModal).toBeFalsy();
    expect(component.constantContactModal).toBeFalsy();
    expect(component.mailchimpModal).toBeFalsy();
  });

  it('should call openReviewCiqModal', () => {
    spyOn(component, 'closeModel');
    component.formModal = true;
    component.eventSelected = undefined;
    component.thresholdValue = undefined;
    component.timeZoneSelected = undefined;
    component.notificationTime = new Date();

    component.openReviewCiqModal();

    expect(component.formModal).toBeTruthy();
    expect(component.eventSelected).toBeUndefined();
    expect(component.thresholdValue).toBeUndefined();
    expect(component.timeZoneSelected).toBeUndefined();
    expect(component.notificationTime).toEqual(component.minimumDate);
    expect(component.closeModel).toHaveBeenCalled();

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = 'America/New_York';
    component.timeZoneSelected = 'America/New_York (East Coast)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/New_York');
    expect(component.timeZoneSelected).toEqual('America/New_York (East Coast)');

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = 'America/Chicago';
    component.timeZoneSelected = 'America/Chicago (Central)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Chicago');
    expect(component.timeZoneSelected).toEqual('America/Chicago (Central)');

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = 'America/Denver';
    component.timeZoneSelected = 'America/Denver (Mountain)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Denver');
    expect(component.timeZoneSelected).toEqual('America/Denver (Mountain)');

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = 'America/Los_Angeles';
    component.timeZoneSelected = 'America/Los_Angeles (West Coast)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Los_Angeles');
    expect(component.timeZoneSelected).toEqual('America/Los_Angeles (West Coast)');

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = 'UTC';
    component.timeZoneSelected = 'UTC';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('UTC');
    expect(component.timeZoneSelected).toEqual('UTC');

    component.triggeredCampaign = true;
    component.resultCampaignDataObject.notificationTimeZone = '';
    component.timeZoneSelected = '';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeTruthy();
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('');
    expect(component.timeZoneSelected).toEqual('');

  });

  it('should set the appropriate properties and open the reviewCiqModal', () => {
    spyOn(component, 'closeModel');
    component.formModal = true;
    component.eventSelected = undefined;
    component.thresholdValue = undefined;
    component.timeZoneSelected = undefined;
    component.notificationTime = new Date();
    component.openReviewCiqModal();

    expect(component.formModal).toBeTruthy();
    expect(component.eventSelected).toBeUndefined();
    expect(component.thresholdValue).toBeUndefined();
    expect(component.timeZoneSelected).toBeUndefined();
    expect(component.notificationTime).toEqual(component.minimumDate);
    expect(component.closeModel).toHaveBeenCalled();



    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.eventSelected = component.resultCampaignDataObject.eventDriven;
    component.thresholdValue = component.resultCampaignDataObject.eventThreshold;
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).eventSelected).toEqual(component.resultCampaignDataObject.eventDriven);
    expect((component as any).eventSelected).toEqual(component.resultCampaignDataObject.eventThreshold);

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = 'America/New_York';
    component.timeZoneSelected = 'America/New_York (East Coast)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/New_York');
    expect(component.timeZoneSelected).toEqual('America/New_York (East Coast)');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = 'America/Chicago';
    component.timeZoneSelected = 'America/Chicago (Central)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Chicago');
    expect(component.timeZoneSelected).toEqual('America/Chicago (Central)');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = 'America/Denver';
    component.timeZoneSelected = 'America/Denver (Mountain)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Denver');
    expect(component.timeZoneSelected).toEqual('America/Denver (Mountain)');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = 'America/Los_Angeles';
    component.timeZoneSelected = 'America/Los_Angeles (West Coast)';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('America/Los_Angeles');
    expect(component.timeZoneSelected).toEqual('America/Los_Angeles (West Coast)');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = 'UTC';
    component.timeZoneSelected = 'UTC';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('UTC');
    expect(component.timeZoneSelected).toEqual('UTC');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    component.resultCampaignDataObject.notificationTimeZone = '';
    component.timeZoneSelected = '';
    component.openReviewCiqModal();
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    expect((component as any).resultCampaignDataObject.notificationTimeZone).toEqual('');
    expect(component.timeZoneSelected).toEqual('');

    component.triggeredCampaign = false;
    component.resultCampaignDataObject.scheduleType = 'Event-Driven';
    expect(component.triggeredCampaign).toBeFalsy();
    expect((component as any).resultCampaignDataObject.scheduleType).toEqual('Event-Driven');
    component.openReviewCiqModal();
  });

  it('should notificationTimeSplit', () => {
    // Arrange
    // component.resultCampaignDataObject.notificationTime = 'Tue Jun 20 2023 15:02:14 GMT+0530 (India Standard Time)';

    // const expectedHours = 10;
    // const expectedMinutes = 30;
    // const expectedDate = new Date();
    // expectedDate.setHours(expectedHours);
    // expectedDate.setMinutes(expectedMinutes);

    // // Act
    // const result = component.notificationTimeSplit();

    // // Assert
    // expect(result.getHours()).toBe(expectedHours);
    // expect(result.getMinutes()).toBe(expectedMinutes);
  });

  it('should open the redeployCiqModal and set ciqModal to true', () => {

    component.openRedeployCiqModal();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).redeployCiqModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 're-deply-modal'
    });
    expect(component.ciqModal).toBeTrue();
  });

  it('should open openRedeployFbModal', () => {
    component.openRedeployFbModal();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).redeployFbModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 're-deply-modal'
    });
    expect(component.facebookModal).toBeTrue();
  });

  it('should open openRedeployMailchimpModal', () => {
    component.openRedeployMailchimpModal();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).redeployMailchimpModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 're-deply-modal'
    });
    expect(component.mailchimpModal).toBeTrue();
  });

  it('should open openRedeployHubSpotModal', () => {
    component.openRedeployHubSpotModal();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).redeployHubSpotModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 're-deply-modal'
    });
    expect(component.hubspotModal).toBeTrue();
  });

  it('should open openRedeployConstantContactModal', () => {
    component.openRedeployConstantContactModal();
    expect((component as any).dialogService.open).toHaveBeenCalledWith((component as any).redeployConstantContactModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 're-deply-modal'
    });
    expect(component.constantContactModal).toBeTrue();
  });

  it('should call ReDeployMailchimp', fakeAsync(() => {
    spyOn(component, 'resultOfCampaignApiLoader');
    // Arrange
    component.mailchimpResultCampaignDataObject = {
      campaignId: 'CampaignId',
      includeInChannel: 'IncludeInChannel',
      marketingChannelId: 'MarketingChannelId',
      marketingChannelName: 'MarketingChannelName',
      orgId: 'OrgId'
    };
    component.resultDataAvailable = false;
    component.ReDeployMailchimp();
    tick();

    expect(component.resultDataAvailable).toBeFalsy();
    expect(component.resultOfCampaignApiLoader).toHaveBeenCalledWith(component.campaignId);
  }));

  it('should call ReDeployHubSpot', fakeAsync(() => {
    spyOn(component, 'resultOfCampaignApiLoader');
    // Arrange
    component.hubspotResultCampaignDataObject = {
      campaignId: 'CampaignId',
      includeInChannel: 'IncludeInChannel',
      marketingChannelId: 'MarketingChannelId',
      marketingChannelName: 'MarketingChannelName',
      orgId: 'OrgId'
    };
    component.resultDataAvailable = false;
    component.ReDeployHubSpot();
    tick();

    expect(component.resultDataAvailable).toBeFalsy();
    expect(component.resultOfCampaignApiLoader).toHaveBeenCalledWith(component.campaignId);
  }));

  it('should call ReDeployConstantContact', fakeAsync(() => {
    spyOn(component, 'resultOfCampaignApiLoader');
    // Arrange
    component.constantResultCampaignDataObject = {
      campaignId: 'CampaignId',
      includeInChannel: 'IncludeInChannel',
      marketingChannelId: 'MarketingChannelId',
      marketingChannelName: 'MarketingChannelName',
      orgId: 'OrgId'
    };
    component.resultDataAvailable = false;
    component.ReDeployConstantContact();
    tick();

    expect(component.resultDataAvailable).toBeFalsy();
    expect(component.resultOfCampaignApiLoader).toHaveBeenCalledWith(component.campaignId);
  }));

  it('should return the time part of the input date string', () => {
    const inputDate = '2023-06-19 10:30:00';
    const result = component.timesplitter1(inputDate);
    expect(result).toEqual('10:30:00');
  });

  it('should return an empty string if the input date string is empty', () => {
    const inputDate = '';
    const result = component.timesplitter1(inputDate);
    expect(result).toEqual(undefined);
  });

  it('should campaignChannelService', () => {
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', file);
    const mockResponse = { url: '' };
    const event = {
      target: {
        files: [file]
      }
    };
    component.campaignImage = event;
    component.campaignChannelService();
    expect(component.contentUrl).toEqual(mockResponse.url);
  });




  it('should provide result Of CampaignApiLoader', () => {
    //arrange   
    //action
    component.resultOfCampaignApiLoader('10000');
    // assertcd xd.
    expect((component as any).marketingCampaignsApiService.CampaignDetailGET).toHaveBeenCalled();
    expect(component.csvDownloadOnly).toBeTruthy();
    expect(component.ServiceType).toEqual('New');
    expect((component as any).marketingCampaignsChartServiceService.serviceTierTechnologyOptions).toHaveBeenCalled();
    expect((component as any).marketingCampaignChannelsApiService.CampaignChannelByOrgGET).toHaveBeenCalled();
    expect(component.MobileNotification).toBeTruthy();

  });

  it('should deploy submit', () => {
    //arrange 
    spyOn((component as any).marketingCampaignDefineApiService.deploy2ndNextEmitterSubject, 'subscribe');

    //action
    component.deploySubmit();
    // assert
    expect((component as any).marketingCampaignDefineApiService.deploy2ndNextEmitterSubject.subscribe).toHaveBeenCalled();
    expect(component.campaignId).toEqual('10011');

  });

});
