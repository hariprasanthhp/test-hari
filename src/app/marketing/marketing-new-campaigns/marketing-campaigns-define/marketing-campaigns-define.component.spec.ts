import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
//import 'jasmine';
import { MarketingCampaignsDefineComponent } from './marketing-campaigns-define.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingSegmentsApiService } from '../../marketing-segments/shared/marketing-segments-api.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingApiService } from '../../shared/services/marketing-api.sevice';
import { MarketingModule } from '../../marketing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { of, Subject, throwError } from 'rxjs';
import { MarketingExploreDataBasicApiService } from '../../marketing-explore-data/basic/explore-data-basic-api.service';
import { MarketingExploreDataServiceApiService } from '../../marketing-explore-data/basic/marketing-service-chart/marketing-explore-data-service-api.service';
import { ExportDataChartOptionsService } from '../../marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { ChangeDetectorRef } from '@angular/core';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { downloadCSVSegmentFilters } from '../../shared/services/qlik-connection.js';
import { getRecommendedSegmentAdditionalFilters } from './../../shared/services/qlik-connection.js';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';




describe('MarketingCampaignsDefineComponent', () => {
  let component: MarketingCampaignsDefineComponent;
  let fixture: ComponentFixture<MarketingCampaignsDefineComponent>;
  let getRecommendedSegmentFilters: getRecommendedSegmentAdditionalFilters;
  let marketingHomeApiService: MarketingHomeApiService;
  let commonFunctionsService: CommonFunctionsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MarketingCampaignsDefineComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MarketingModule],
      providers: [
        ValidatorService,
        MarketingCommonService,
        CommonFunctionsService,
        { provide: MarketingExploreDataBasicApiService, useValue: {} },
        { provide: MarketingExploreDataServiceApiService, useValue: {} },
        { provide: ExportDataChartOptionsService, useValue: {} },
        { provide: TranslateService, useCalss: CustomTranslateService },
        {
          provide: MarketingCampaignDefineApiService, useValue: {
            segmentSelectSubject: new Subject<any>(),
            defineNextEmitterSubject: new Subject<any>(),
            savedSegmentEmitter: jasmine.createSpy().and.returnValue([]),
            defineSuccesEventTrigger: jasmine.createSpy(),
            editCampaignDataSubject: new Subject<any>(),
            getDefineDataEmitter: jasmine.createSpy().and.returnValue([]),
            clearCampaignDataSubject: new Subject<any>(),
            startDateSubject: new Subject<any>(),
            segmentTypeSelectSubject: new Subject<any>(),
          }
        },
        {
          provide: MarketingSegmentsApiService, useValue: {
            SavedSegmentsListCampGET: jasmine.createSpy().and.returnValue(of([{ segmentId: '1', segmentName: 'SavedSeg1' }])),
            recommendedSegmentsListCampGET: jasmine.createSpy().and.returnValue(of([{ segmentId: '2', segmentName: 'RecSeg1' }])),
          }
        },
        {
          provide: MarketingCampaignsApiService, useValue: {
            CampaignPOST: jasmine.createSpy().and.returnValue(of([])),
            CampaignPUT: jasmine.createSpy().and.returnValue(of([])),
            CampaignsListPopup: jasmine.createSpy().and.returnValue(of([])),

          }
        },
        {
          provide: MarketingApiService, useValue: {
            qlikOpenConnectionApp: of(''),
            getQlikConnectedApp: jasmine.createSpy().and.returnValue(
              {
                clearAll: () => { },
                field: () => ({
                  selectMatch: () => { },
                  selectValues: () => { }
                })
              }),
            openQlikConnection: jasmine.createSpy(),
            getQlikConnectedApp_Aqui: jasmine.createSpy().and.returnValue(
              {
                clearAll: () => { },
                field: () => ({
                  selectMatch: () => { },
                  selectValues: () => { }
                })
              }
            ),

          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrgId: jasmine.createSpy().and.returnValue('12345'),
            getEntitlements: jasmine.createSpy().and.returnValue([]),
            getQlikTOkenByAppType: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: MarketingHomeApiService, useValue: {
            marketingHomeApiService: {
              getTsAuthToken: jasmine.createSpy('getTsAuthToken').and.returnValue(of('Some response')),
              // thoughtSpotStatusCheckGET: jasmine.createSpy().and.returnValue(of([])),
            }
          }
        }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MarketingCampaignsDefineComponent);
      component = fixture.componentInstance;
      marketingHomeApiService = TestBed.inject(MarketingHomeApiService);
      commonFunctionsService = TestBed.inject(CommonFunctionsService);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should removeUnwantedSpace', () => {
    let input = 'propertyName';
    let value = 'trimmed value';
    spyOn(commonFunctionsService, 'trimSpaceFromNonObjectInputs').and.returnValue(of(value))
    component.removeUnwantedSpace.call(component, input, value);

    expect(commonFunctionsService.trimSpaceFromNonObjectInputs).toHaveBeenCalledWith(value)
  });

  it('should page load data', () => {
    spyOn(component, 'getSegmentsTrigger');
    spyOn(component, 'clearFunction');
    spyOn(component, 'defineSubmit');
    spyOn(component, 'checkTSStatus');


    let entitlement = '209';
    fixture.detectChanges();
    component.isThoughspotAvailable = true;

    expect(component.isThoughspotAvailable).toBeTruthy();

    entitlement = '210';
    component.isThoughspotAvailable = false;
    component.cmcType = false;
    expect(component.cmcType).toBeFalsy();

    component.summary = true;
    component.activeTab = 'summary';
    (component as any).translateService.selectedLanguage = of([]);
    component.language = [];
    expect(component.summary).toBeTruthy();
    expect(component.activeTab).toEqual('summary');
    fixture.detectChanges();
    expect(component.language).toEqual([]);

    component.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false;
    component.triggeredCampaign = true;
    fixture.detectChanges();
    component.eventTrigger = 50;
    component.resendDay = 90;
    expect(component.triggeredCampaign).toBeTruthy();

    component.triggeredCampaign = sessionStorage.getItem('triggered') ? true : false;
    component.triggeredCampaign = false;
    fixture.detectChanges();
    expect(component.triggeredCampaign).toBeFalsy();

    // expect(component.getSegmentsTrigger).toHaveBeenCalled();
    expect(component.clearFunction).toHaveBeenCalled();
    expect(component.defineSubmit).toHaveBeenCalled();

  });

  // it('should load qlikTicketURL', () => {
  //   spyOn(marketingHomeApiService, 'getTsAuthToken').and.returnValue(of({}));
  //   component.qlikTicketURL();

  // });

  // it('should load qlikTicketURL', fakeAsync(() => {
  //   let err = errorStatus401;
  //   err.status = 413;
  //   spyOn(marketingHomeApiService, 'getTsAuthToken').and.returnValue(of({}));
  //   let ticket = err.error.text ? err.error.text : '';

  //   //execute
  //   component.qlikTicketURL();
  //   component.ticketId = '111';
  //   component.ticketIdUser = 'User';
  //   //assert
  // }));

  it('should load filteredArray', () => {
    component.searchText = 'some text';
    component.recommendedSegmentArray = [{ segmentId: '2', segmentName: 'RecSeg1' }];
    component.recommendedSegmentData = [];

    component.filteredArray();

    expect(component.searchText).toEqual('some text');
    expect(component.recommendedSegmentArray).toEqual([{ segmentId: '2', segmentName: 'RecSeg1' }]);
    expect(component.recommendedSegmentData).toEqual([]);

    component.searchText = 'some text';
    component.savedSegmentArray = [{ segmentId: '2', segmentName: 'RecSeg1' }];
    component.savedSegmentData = [];

    component.filteredArray();

    expect(component.searchText).toEqual('some text');
    expect(component.savedSegmentArray).toEqual([{ segmentId: '2', segmentName: 'RecSeg1' }]);
    expect(component.savedSegmentData).toEqual([]);

  });

  it('should call onBlur', () => {
    let event = { preventDefault: () => { } };
    component.searchText = 'Some text';
    spyOn(event, 'preventDefault');
    component.onBlur(event);
    component.recommendedSegmentArray = undefined;
    component.savedSegmentArray = ['Saved Segment 1', 'Saved Segment 2'];

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.searchText).toBe('');
    expect(component.recommendedSegmentData).toEqual(component.recommendedSegmentArray);
    // expect(component.savedSegmentData).toEqual(component.savedSegmentArray);
  });



  it('should BaseApiLoader', () => {
    component.cmcType = false;
    spyOn((component as any), 'regionsApiLoader').and.returnValue(1);
    spyOn((component as any), 'locationsApiLoader').and.returnValue(1);
    spyOn((component as any), 'serviceTierApiLoader').and.returnValue(1);
    spyOn((component as any), 'propensityApiLoader').and.returnValue(1);

    component.baseApiLoader();

    expect(component.cmcType).toBeFalsy();
  });

  it('should getCampaignList', () => {
    component.getCampaignList();
  });

  it('should load segment list', () => {

    // arrange
    const savedSeg = [{ segmentId: '1', segmentName: 'SavedSeg1' }];
    const recommenendSeg = [{ segmentId: '2', segmentName: 'RecSeg1' }];

    // execute
    component.getSegmentsTrigger();

    // assert
    expect(component.savedSegmentArray).toEqual(savedSeg);
    expect(component.savedSegmentData).toEqual(savedSeg);
    expect(component.recommendedSegmentArray).toEqual(recommenendSeg);
    expect(component.recommendedSegmentData).toEqual(recommenendSeg);
  });

  it('should update regionsDataArray1', () => {
    const res = {
      data: [
        { Region: 'Region1' },
        { Region: 'Region2' },
        { Region: 'Region3' },
      ],
    };
    component.segment = { region: ['Region1'] };

    component.regionFilteredData(res);

    expect(component.regionsDataArray).toEqual(['All', 'Region1', 'Region2', 'Region3']);
    expect(component.regionSelected).toBe('Region1');
  });

  // it('should update regionFilteredData2', () => {
  //   const res = {
  //     data: [
  //       { Region: 'Region1' },
  //       { Region: 'Region2' },
  //       { Region: 'Region3' },
  //     ],
  //   };
  //   component.segment = {};

  //   component.regionFilteredData(res);

  //   expect(component.regionsDataArray).toEqual(['All', 'Region1', 'Region2', 'Region3']);
  //   expect(component.regionSelected).toBe('All');
  // });

  it('should update locationFilteredData1', () => {
    const res = {
      data: [
        { Location: 'Location1' },
        { Location: 'Location2' },
        { Location: 'Location3' },
      ],
    };
    component.segment = { location: ['Location1'] };

    component.locationFilteredData(res);

    expect(component.locationData).toEqual(['All', 'Location1', 'Location2', 'Location3']);
    expect(component.locationSelected).toBe('Location1');
  });

  it('should update locationFilteredData2', () => {
    const res = {
      data: [
        { Location: 'Location1' },
        { Location: 'Location2' },
        { Location: 'Location3' },
      ],
    };
    component.segment = {};

    component.locationFilteredData(res);

    expect(component.locationData).toEqual(['All', 'Location1', 'Location2', 'Location3']);
    expect(component.locationSelected).toBe('All');
  });

  it('should update serviceFilteredData', () => {
    const res = {
      data: [
        { Service: 'Service1' },
        { Service: 'Service2' },
        { Service: 'Service3' },
      ],
    };
    component.segment = { serviceTier: ['Service1'] };

    component.serviceFilteredData(res);

    expect(component.serviceDataArray).toEqual(['All', 'Service1', 'Service2', 'Service3']);
    expect(component.serviceSelected).toBe('Service1');
  });

  it('should update serviceFilteredData', () => {
    // Set up test data
    const res = {
      data: [
        { Service: 'Service1' },
        { Service: 'Service2' },
        { Service: 'Service3' },
      ],
    };
    component.segment = {};

    // Call the method
    component.serviceFilteredData(res);

    // Check the results
    expect(component.serviceDataArray).toEqual(['All', 'Service1', 'Service2', 'Service3']);
    expect(component.serviceSelected).toBe('All');
  });

  it('should update propensityFilteredData', () => {
    // Set up test data
    const res = {
      data: [
        { Propensity: 'Propensity1' },
        { Propensity: 'Propensity2' },
        { Propensity: 'Propensity3' },
      ],
    };
    component.segment = { propensity: 'Propensity1' };

    // Call the method
    component.propensityFilteredData(res);

    // Check the results
    expect(component.propensityDataArray).toEqual(['All', 'Propensity1', 'Propensity2', 'Propensity3']);
    expect(component.propensitySelected).toBe('Propensity1');
  });

  it('should update propensityFilteredData', () => {
    const res = {
      data: [
        { Propensity: 'Propensity1' },
        { Propensity: 'Propensity2' },
        { Propensity: 'Propensity3' },
      ],
    };
    component.segment = {};

    component.propensityFilteredData(res);

    expect(component.propensityDataArray).toEqual(['All', 'Propensity1', 'Propensity2', 'Propensity3']);
    expect(component.propensitySelected).toBe('All');
  });

  it('should add selected item to zipcodePlusArray and segment', () => {
    const event = {
      item_text: '12345',
    };
    component.segment = { zipPlusFour: '' }
    component.getZipcodePlusSelect(event);
    expect(component.zipcodePlusArray).toEqual(['12345']);
    expect(component.segment['zipPlusFour']).toEqual(['12345']);
  });

  it('should getZipcodePlusSelect', () => {
    const event = { item_text: '12345' };
    component.segment = { zipPlusFour: '' }
    component.zipcodePlusArray = null;
    component.getZipcodePlusSelect(event);
    expect(component.zipcodePlusArray).toEqual([event.item_text]);
  });

  it('should remove item from zipcodePlusArray and update segment', () => {
    const event = { value: { item_text: '12345' } };
    component.zipcodePlusArray = ['12345', '67890'];
    component.segment = { zipPlusFour: component.zipcodePlusArray };
    component.getZipcodePlusDeSelect(event);
    expect(component.zipcodePlusArray).toEqual(['67890']);
    expect(component.segment.zipPlusFour).toEqual(component.zipcodePlusArray);
  });

  // it('should populate zipcodeDataArray and update selected values', () => {
  //   const res = {
  //     data: [
  //       { zipcode: '12345' },
  //       { zipcode: '67890' },
  //     ],
  //   };
  //   const from = 1;
  //   component.definePostObject = {
  //     zipcode: ['12345'],
  //   };
  //   component.getZipcodeFilteredData(res, from);
  //   expect(component.zipcodeDataArray).toEqual([
  //     { item_id: 0, item_text: '12345' },
  //     { item_id: 1, item_text: '67890' },
  //   ]);
  //   expect(component.zipcodeArray).toEqual(['12345']);
  //   expect(component.zipcodeSelected).toEqual(['12345']);
  // });

  it('should clearZipFilter', () => {
    component.definePostObject = {};
    component.segment = {};
    component.definePostObject.zipPlusFour = ['12345', '67890'];
    component.clearZipFilter();
    expect(component.zipcodePlusArray).toEqual(['12345', '67890']);
    expect(component.segment.zipPlusFour).toEqual(['12345', '67890']);
  });

  it('should clearZipFilter', () => {
    component.definePostObject = { zipPlusFour: undefined };
    component.clearZipFilter();
    expect(component.zipcodePlusArray).toEqual([]);
    // expect(component.segment.zipPlusFour).toBeUndefined();
  });


  it('should clear selected values when from is not 1', () => {
    const res = {
      data: [
        { zipcode: '12345' },
        { zipcode: '67890' },
      ],
    };
    const from = 2;
    component.getZipcodeFilteredData(res, from);
    expect(component.zipcodeDataArray).toEqual([
      { item_id: 0, item_text: '12345' },
      { item_id: 1, item_text: '67890' },
    ]);
    expect(component.zipcodeArray).toEqual([]);
    expect(component.zipcodeSelected).toEqual([]);
  });

  it('should log the zipcodePlusArray if it is not empty', () => {
    component.zipcodePlusArray = ['11111', '22222'];
    component.zipcodePlusApiLoader(1);
  });

  it('should log a message when the zipcodePlusArray is empty', () => {
    const consoleLogSpy = spyOn(console, 'log');
    component.zipcodePlusApiLoader(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('this.zipcodePlusArray cleared((((');
  });

  it('should populate the zipcodePlusDataArray with zipplusfour values', () => {
    component.definePostObject = {};
    component.zipcodePlusArray = [];
    component.zipcodePlusSelected = [];
    component.segment = {};

    const res = {
      data: [
        { zipplusfour: '12345 - 6789' },
        { zipplusfour: '98765 - 4321' },
      ],
    };
    const expectedData = [
      { item_id: 0, item_text: '12345 - 6789' },
      { item_id: 1, item_text: '98765 - 4321' },
    ];
    component.getFiltereddataZipfour(res, 1);
    expect(component.zipcodePlusDataArray).toEqual(expectedData);
  });

  // it('should clear getFiltereddataZipfour', () => {
  //   const from = 1
  //   const res = {
  //     data: [
  //       { zipplusfour: '12345 - 6789' },
  //       { zipplusfour: '98765 - 4321' },
  //     ],
  //   };    
  //   component.zipcodePlusArray = ['12345 - 6789'];
  //   component.zipcodePlusSelected = ['12345 - 6789'];
  //   component.segment = { zipPlusFour: ['12345 - 6789'] };

  //   component.getFiltereddataZipfour(res, 1);

  //   expect(component.definePostObject.hasOwnProperty('zipPlusFour')).toBe(true);
  //   expect(component.zipcodePlusArray).toEqual([]);
  //   expect(component.zipcodePlusSelected).toEqual([]);
  //   expect(component.segment).toEqual({});
  // });

  it('should clear getFiltereddataZipfour', () => {
    const res = {
      data: [
        { zipplusfour: '12345 - 6789' },
        { zipplusfour: '98765 - 4321' },
      ],
    };
    component.zipcodePlusArray = ['12345 - 6789'];
    component.zipcodePlusSelected = ['12345 - 6789'];
    component.segment = { zipPlusFour: ['12345 - 6789'] };

    component.getFiltereddataZipfour(res, 2);

    expect(component.zipcodePlusArray).toEqual([]);
    expect(component.zipcodePlusSelected).toEqual([]);
    expect(component.segment).toEqual({});
  });

  it('should call clearMobileNotificationData', () => {
    component.MarketingCampaignsDeployComponent = { notificationName: '', campaignLink: '' };

    component.MarketingCampaignsDeployComponent.notificationName = undefined;
    component.MarketingCampaignsDeployComponent.campaignLink = undefined;
    component.clearMobileNotificationData();

    expect(component.MarketingCampaignsDeployComponent.notificationName).toBeUndefined();
    expect(component.MarketingCampaignsDeployComponent.campaignLink).toBeUndefined();
  });

  it('should call segmentSelectedclear', () => {
    component.segmentSelected = 'segment';
    component.segmentSelected = '';
    component.segmentSelectedclear();
    expect(component.segmentSelected).toEqual('');

    component.segmentSelected = null;
    component.segmentSelected = 'segment';
    component.segmentSelectedclear();
    expect(component.segmentSelected).toEqual('');
  });

  it('should call selectRegion', () => {
    const event = 'All';
    const from = 0;
    spyOn(component, 'segmentDataEmitter');
    component.segment = { region: '' }
    component.selectRegion(event, from);

    expect(component.regionSelected).toBe(event);
    expect(component.segment.region).toEqual([event]);
    // expect(component.regionSelectFunction).toHaveBeenCalledWith(0);
  });

  it('selectRegion', () => {
    const event = 'All';
    let from = 0;
    component.segment = { region: '' }
    spyOn(component, 'regionSelectFunction');

    component.selectRegion(event, from);

    expect(component.regionSelectFunction).toHaveBeenCalledWith(2);

    from = 1;
    component.selectRegion(event, from);
    // expect(component.regionSelectFunction).toHaveBeenCalledWith(0);

  });

  it('should update selectLocation', () => {
    const event = 'Location 1';
    const from = 0;
    spyOn(component, 'locationSelectFunction');
    component.segment = { location: '' }
    component.selectLocation(event, from);
    expect(component.segment['location']).toEqual([event]);
    expect(component.locationSelected).toBe(event);
    expect(component.locationSelectFunction).toHaveBeenCalledWith(2);
  });

  it('should update selectLocation', () => {
    const event = 'All';
    const from = 0;
    spyOn(component, 'locationsApiLoader');
    spyOn(component, 'segmentDataEmitter');
    component.segment = { location: '' }
    component.selectLocation(event, from);
    expect(component.segment['location']).toEqual([event]);
    expect(component.locationSelected).toBe(event);
    // expect(component.locationsApiLoader).toHaveBeenCalledWith(0);
  });

  it('should call campaignNameChange', () => {
    const event = 'New Campaign Name';
    const mockErrorObj = {
      error: false,
      errorMsg: undefined
    };

    component.campaignNameChange(event);

    expect(component.campaignName).toBe(event);
    expect(component.campaignNameError).toBe(mockErrorObj.error);
    expect(component.campaignNameErrorMsg).toBe(mockErrorObj.errorMsg);
  });

  it('should update eventChange', () => {
    const event = '123';
    spyOn((component as any).validatorService, 'thresholdValidator');
    component.eventChange(event);

    expect(component.eventTrigger).toBe(event);
  });

  it('should call estimatNextAudience when all conditions are met', () => {
    // Mocking the necessary variables for the conditions to pass
    const eventTypeError = false;
    const eventError = false;
    const eventType = 'someEventType';
    const eventTrigger = 1;
    const resendDay = 2;
    const segmentSelectedId = 'someSegmentId';
    const definePostObject = {
      segmentId: 'someSegmentId',
      campaignId: 'someCampaignId'
    };
  });

  it('should set resendChange', () => {
    const event = '123';
    component.resendChange(event);
    expect(component.resendDay).toBe(event);
  });

  it('should set resendChange', () => {
    const event = 'abc';
    component.resendChange(event);
    expect(component.resendDay).toBe('');
  });

  it('should set campaignBudgetChange', () => {
    const event = '123';
    component.campaignBudgetChange(event);
    expect(component.campaignBudget).toBe(event);
  });

  it('should set campaignBudgetChange', () => {
    const event = 'abc';
    component.campaignBudgetChange(event);
    expect(component.campaignBudget).toBe('');
  });

  it('should set campaignBudget to the event value when the event is a valid number', () => {
    let event = 'event';
    component.campaignTarget = event;
    component.campaignTargetChange(event);
    expect(component.campaignTarget).toEqual(event);

    event = '';
    component.campaignTarget = event;
    component.campaignTargetChange(event);
    expect(component.campaignTarget).toEqual(event);

  });

  it('should set startDate to the event value', () => {
    const event = '2023-06-01';

    component.startDateChange(event);

    expect(component.startDate).toBe(event);
  });

  it('should set startDate to the event value', () => {
    const event = '2023-06-01';

    component.startDateChange(event);

    expect(component.startDate).toBe(event);
  });

  it('should update endDate if it is set and less than the startDate', () => {
    const event = '2023-06-15';
    component.endDate = '2023-06-10';

    component.startDateChange(event);

    expect(component.endDate).toBe(event);
  });

  it('should not update endDate if it is greater than or equal to the startDate', () => {
    const event = '2023-06-15';
    component.endDate = '2023-06-20';

    component.startDateChange(event);

    expect(component.endDate).not.toBe(event);
    expect(component.endDate).toBe('2023-06-20');
  });

  it('should not update endDate if it is not set', () => {
    const event = '2023-06-15';

    component.startDateChange(event);

    expect(component.endDate).toBe(undefined);
  });

  it('should call startDateChange', () => {
    const event = '2023-06-01';

    component.startDateChange(event);
  });

  it('should endDateChange', () => {
    const event = '2023-06-30';
    const expectedEndDate = event;
    const expectedEndDateError = 'Some validation error';
    component.triggeredCampaign = false;
    component.endDateChange(event);
    expect(component.endDate).toEqual(expectedEndDate);
    expect(component.endDateError).toBeFalsy();
  });


  it('should endDateChange', () => {
    const event = '2023-06-30';
    const expectedEndDate = event;
    component.triggeredCampaign = true;
    component.endDateChange(event);
    expect(component.triggeredCampaign).toBeTruthy();
    expect(component.endDate).toEqual(expectedEndDate);
    expect(component.endDateError).toBeFalsy();
  });

  it('should trueFalseAssigner', () => {
    let exception = 'summary';
    component.trueFalseAssigner(exception);
    expect(component.summary).toBe(true);
    expect(component.map).toBe(false);
    expect(component.dataSet).toBe(false);

    exception = 'map';
    component.trueFalseAssigner(exception);
    expect(component.map).toBe(true);
    expect(component.summary).toBe(false);
    expect(component.dataSet).toBe(false);

    exception = 'dataSet';
    component.trueFalseAssigner(exception);
    expect(component.dataSet).toBe(true);
    expect(component.summary).toBe(false);
    expect(component.map).toBe(false);

    exception = 'invalidException';
    component.trueFalseAssigner(exception);
    expect(component.summary).toBe(false);
    expect(component.map).toBe(false);
    expect(component.dataSet).toBe(false);
  });

  it('should call selectService', () => {
    const event = 'someService';
    const from = 0;
    const expectedServiceSelected = event;
    const expectedServiceTier = [encodeURIComponent(event)];
    spyOn(component,'serviceSelectFunction');
    component.segment = {serviceTier:''}

    component.selectService(event, from);

    expect(component.serviceSelected).toEqual(expectedServiceSelected);
    expect(component.segment['serviceTier']).toEqual(expectedServiceTier);
    // expect(component.serviceSelectFunction).toHaveBeenCalledWith(2);
  });

  it('should update serviceSelected, segment[\'serviceTier\'], and call the appropriate asynchronous function when from is 0 and serviceSelected is \'All\'', async () => {
    const event = 'All';
    const from = 0;
    const expectedServiceSelected = event;
    const expectedServiceTier = [encodeURIComponent(event)];
    spyOn(component,'serviceTierApiLoader');
    component.segment = {serviceTier:''}

    component.selectService(event, from);

    expect(component.serviceSelected).toEqual(expectedServiceSelected);
    expect(component.segment['serviceTier']).toEqual(expectedServiceTier);
    // await expect(downloadCSVSegmentFilters).toHaveBeenCalled();
    // expect(component.serviceTierApiLoader).toHaveBeenCalledWith(1);
  });

  it('should update serviceSelected, segment[\'serviceTier\'], and call segmentDataEmitter() when from is not 0 and serviceSelected is not \'All\'', () => {
    const event = 'someService';
    const from = 1;
    const expectedServiceSelected = event;
    const expectedServiceTier = [encodeURIComponent(event)];
    spyOn(component,'segmentDataEmitter');
    component.segment = {serviceTier:''}
    component.selectService(event, from);
    expect(component.serviceSelected).toEqual(expectedServiceSelected);
    expect(component.segment['serviceTier']).toEqual(expectedServiceTier);
  });

  it('should call selectService', async () => {
    const event = 'All';
    const from = 1;
    const expectedServiceSelected = event;
    const expectedServiceTier = [encodeURIComponent(event)];
    component.segment = {serviceTier:''}
    component.selectService(event, from);
    spyOn(component,'segmentDataEmitter');
    spyOn(component,'serviceTierApiLoader');
    expect(component.serviceSelected).toEqual(expectedServiceSelected);
    expect(component.segment['serviceTier']).toEqual(expectedServiceTier);
  });

  it('should call propensitySelectFunction', () => {
    const event = 'somePropensity';
    const from = 0;
    const expectedPropensitySelected = event;
    const expectedPropensity = expectedPropensitySelected; 
    component.segment = {propensity:''};
    spyOn(component,'propensitySelectFunction');
    component.selectPropensity(event, from);
    expect(component.propensitySelected).toEqual(expectedPropensitySelected);
    expect(component.segment['propensity']).toEqual(expectedPropensity);
  });

  it('should update propensitySelected, segment[\'propensity\'], and call the appropriate asynchronous function when from is 0 and propensitySelected is \'All\'', async () => {
    const event = 'All';
    const from = 0;
    const expectedPropensitySelected = event;
    const expectedPropensity = expectedPropensitySelected;
    component.segment = {propensity:''};
    spyOn(component,'propensityApiLoader');
    component.selectPropensity(event, from);
    expect(component.propensitySelected).toEqual(expectedPropensitySelected);
    expect(component.segment['propensity']).toEqual(expectedPropensity);
  });

  it('should update propensitySelected, segment[\'propensity\'], and call segmentDataEmitter() when from is not 0 and propensitySelected is not \'All\'', () => {
    const event = 'somePropensity';
    const from = 1;
    const expectedPropensitySelected = event;
    const expectedPropensity = expectedPropensitySelected;
    component.segment = {propensity:''};
    spyOn(component,'segmentDataEmitter');
    component.selectPropensity(event, from);
    expect(component.propensitySelected).toEqual(expectedPropensitySelected);
    expect(component.segment['propensity']).toEqual(expectedPropensity);
  });

  it('should update activeTab, call segmentDataEmitter(), and call trueFalseAssigner() when select_Tab_Data contains a valid value', () => {
    const select_Tab_Data = 'someTab';
    const expectedActiveTab = select_Tab_Data;
    spyOn(component,'segmentDataEmitter');
    spyOn(component,'trueFalseAssigner');
    component.qlick_Tabs(select_Tab_Data);
    expect(component.activeTab).toEqual(expectedActiveTab);
  });

  it('should not update activeTab, call segmentDataEmitter(), and call trueFalseAssigner() when select_Tab_Data is undefined or null', () => {
    const select_Tab_Data = undefined;
    const initialActiveTab = component.activeTab;
    spyOn(component,'segmentDataEmitter');
    spyOn(component,'trueFalseAssigner');
    component.qlick_Tabs(select_Tab_Data);
    expect(component.activeTab).toEqual(initialActiveTab);
  });

  it('should call segmentValidator', () => {
    const segment = {
      segmentName: 'SomeSegment'
    };
    component.segmentValidator(segment);
    expect(component.segmentError).toBe(false);
  });

  it('should call segmentValidator', () => {
    const segment = {
      segmentName: null
    };
    component.segmentValidator(segment);
    expect(component.segmentError).toBe(true);
  });

  it('should set segmentError to true when segment is undefined or null', () => {
    const segment = undefined; 
    component.segmentValidator(segment);
    expect(component.segmentError).toBe(true);
  });

  it('should set eventTypeError to false when eventType is not null', () => {
    const eventType = 'SomeEventType';
    component.eventTypeValidator(eventType);
    expect(component.eventTypeError).toBe(false);
  });

  it('should set eventTypeError to true when eventType is null', () => {
    const eventType = null;
    component.eventTypeValidator(eventType);
    expect(component.eventTypeError).toBe(true);
  });

  it('should call the appropriate validation functions when triggeredCampaign is false', () => {
    component.triggeredCampaign = false;
    component.campaignName = 'SomeCampaign';
    component.segment = { segmentName: 'SomeSegment' };
    component.startDate = '2023-06-01';
    component.endDate = '2023-06-30';

    spyOn(component, 'campaignNameChange');
    spyOn(component, 'segmentValidator');
    spyOn(component, 'startDateChange');
    spyOn(component, 'endDateChange');

    component.wholeValidator();

    expect(component.campaignNameChange).toHaveBeenCalledWith(component.campaignName);
    expect(component.segmentValidator).toHaveBeenCalledWith(component.segment);
    expect(component.startDateChange).toHaveBeenCalledWith(component.startDate);
    expect(component.endDateChange).toHaveBeenCalledWith(component.endDate);
  });

  it('should call the appropriate validation functions when triggeredCampaign is true', () => {
    component.triggeredCampaign = true;
    component.eventTrigger = 'SomeEvent';
    component.resendDay = 3;
    component.startDate = '2023-06-01';
    component.campaignName = 'SomeCampaign';
    component.eventType = 'SomeEventType';

    spyOn(component, 'eventChange');
    spyOn(component, 'startDateChange');
    spyOn(component, 'campaignNameChange');
    spyOn(component, 'eventTypeValidator');

    component.wholeValidator();

    expect(component.eventChange).toHaveBeenCalledWith(component.eventTrigger);
    expect(component.startDateChange).toHaveBeenCalledWith(component.startDate);
    expect(component.campaignNameChange).toHaveBeenCalledWith(component.campaignName);
    expect(component.eventTypeValidator).toHaveBeenCalledWith(component.eventType);
  });

  it('should call the appropriate validation functions when triggeredCampaign is false', () => {
    component.triggeredCampaign = false;
    component.campaignName = 'SomeCampaign';
    component.segment = { segmentName: 'SomeSegment' };
    component.startDate = '2023-06-01';
    component.endDate = '2023-06-30';

    spyOn(component, 'campaignNameChange');
    spyOn(component, 'segmentValidator');
    spyOn(component, 'startDateChange');
    spyOn(component, 'endDateChange');

    component.wholeValidator();

    expect(component.campaignNameChange).toHaveBeenCalledWith(component.campaignName);
    expect(component.segmentValidator).toHaveBeenCalledWith(component.segment);
    expect(component.startDateChange).toHaveBeenCalledWith(component.startDate);
    expect(component.endDateChange).toHaveBeenCalledWith(component.endDate);
  });

  it('should call validator', () => {
    spyOn(component,'wholeValidator');
    component.triggeredCampaign = false;
    component.campaignNameError = false;
    component.segmentError = false;
    component.startDateError = false;
    component.endDateError = false;
    component.campaignTargetError = false;

    component.validator();

    expect(component.validationPassed).toBe(true);
  });

  it('should call validator', () => {
    spyOn(component,'wholeValidator');
    component.triggeredCampaign = false;
    component.campaignNameError = true;
    component.segmentError = false;
    component.startDateError = false;
    component.endDateError = false;
    component.campaignTargetError = false;

    component.validator();

    expect(component.validationPassed).toBe(false);
  });

  it('should call validator', () => {
    spyOn(component,'wholeValidator');
    component.triggeredCampaign = true;
    component.campaignNameError = false;
    component.startDateError = false;
    component.eventError = false;
    component.resendError = false;
    component.campaignTargetError = false;
    component.eventType = 'SomeEventType';
    component.eventTrigger = 5;
    component.resendDay = 60;
    component.validationPassed = true;

    component.validator();

    expect(component.validationPassed).toBeFalsy();
  });

  it('should call validator', () => {
    spyOn(component,'wholeValidator');
    component.triggeredCampaign = true;
    component.campaignNameError = false;
    component.startDateError = false;
    component.eventError = true;
    component.resendError = false;
    component.campaignTargetError = false;
    component.eventType = 'SomeEventType';
    component.eventTrigger = 0;
    component.resendDay = 60;

    component.validator();

    expect(component.validationPassed).toBe(false);
  });

  it('should call showErrorMsg', () => {
    let error = {
      status: 504,
      statusText: '',
      error: '',
      errorMessage: 'OK'
    };
    component.language = [];
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostErrorMsg).toBe(component.language.timeoutErrorError);
    expect(component.definePostError).toBe(true);

    error = {
      status: 409,
      statusText: '',
      error: '',
      errorMessage: 'OK'
    };
    component.language = [];
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(component.language.same_campaign);

    error = {
      status: 500,
      statusText: 'OK',
      error: '',
      errorMessage: 'OK',

    };
    component.language = [];
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(component.language.internalServerError);

    error = {
      status: 500,
      statusText: '',
      error: '',
      errorMessage: 'OK',
    };
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(error.error);

    error = {
      status: 400,
      statusText: '',
      error: '',
      errorMessage: 'OK',
    };
    component.language = [];
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(component.language.Bad_Request);

    error = {
      status: 400,
      statusText: 'OK',
      error: '',
      errorMessage: '',
    };
    component.language = [];
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(component.language.Bad_Request);

    error = {
      status: 400,
      statusText: '',
      error: 'error',
      errorMessage: '',
    };
    component.defineErrorMsgAssigner(error);
    component.showErrorMsg(error);
    expect(component.definePostError).toBe(true);
    expect(component.definePostErrorMsg).toBe(error.error);
  });

  it('should call errorReset', () => {
    component.errorReset();
    component.definePostError = false;
    component.definePostSuccess = false;
  });

  it('should call recommendedSegemntPayLoadAssigner', () => {
    component.serviceSelected = 'All';
    component.regionSelected = 'All';
    component.locationSelected = 'All';
    component.propensitySelected = 'All';
    component.definePostObject = {
      service:'',
      region:'',
      location:'',
      propensity:''
    }
    component.recommendedSegemntPayLoadAssigner();

    expect(component.definePostObject.service).toBe('');
    expect(component.definePostObject.region).toBe('');
    expect(component.definePostObject.location).toBe('');
    expect(component.definePostObject.propensity).toBe('');

    component.serviceSelected = 'service';
    component.regionSelected = 'region';
    component.locationSelected = 'location';
    component.propensitySelected = 'propensity';
    
    component.recommendedSegemntPayLoadAssigner();

    expect(component.definePostObject.service).toBe(component.serviceSelected);
    expect(component.definePostObject.region).toBe(component.regionSelected);
    expect(component.definePostObject.location).toBe(component.locationSelected);
    expect(component.definePostObject.propensity).toBe(component.propensitySelected);
  });

  it('should call recommendedSegemntPayLoadAssigner', () => {
    component.acquisationSegmentSelected = true;
    component.zipcodeArray = [12345, 67890];
    component.zipcodePlusArray = [98765, 43210];
    component.definePostObject = {
      service:'',
      region:'',
      location:'',
      propensity:''
    }
    component.recommendedSegemntPayLoadAssigner();

    expect(component.definePostObject.zipcode).toEqual([12345, 67890]);
    expect(component.definePostObject.zipPlusFour).toEqual([98765, 43210]);
  });

  it('should call recommendedSegemntPayLoadAssignerWithChangeDetection', () => {
    component.definePostObject = {};
    component.serviceSelected = 'Service';
    component.regionSelected = 'Region';
    component.locationSelected = 'Location';
    component.propensitySelected = 'Propensity';
    component.acquisationSegmentSelected = true;
    component.zipcodeArray = [12345, 67890];
    component.zipcodePlusArray = [98765, 43210];

    component.recommendedSegemntPayLoadAssignerWithChangeDetection();

    expect(component.definePostObject.service).toEqual('Service');
    expect(component.definePostObject.region).toEqual('Region');
    expect(component.definePostObject.location).toEqual('Location');
    expect(component.definePostObject.propensity).toEqual('Propensity');
    expect(component.definePostObject.zipcode).toEqual([12345, 67890]);
    expect(component.definePostObject.zipPlusFour).toEqual([98765, 43210]);
  });

  it('should call resetData', () => {
    component.campaignName = 'Campaign 1';
    component.segment = {
      segmentId: 1,
      segmentName: 'Segment 1',
      subscriberCount: 100
    };
    component.triggeredCampaign = true;
    component.eventTrigger = 50;
    component.resendDay = 90;
    component.segmentSelected = 'Segment 2';
    component.recommendedSegmentSelected = true;
    component.campaignBudget = 1000;
    component.campaignTarget = 500;
    component.startDate = new Date();
    component.endDate = new Date();
    component.minimumDate = new Date();

    component.resetData();

    expect(component.campaignName).toBeUndefined();
    expect(component.segment).toEqual({
      segmentId: undefined,
      segmentName: undefined,
      subscriberCount: undefined
    });
    expect(component.triggeredCampaign).toBe(true);
    expect(component.eventTrigger).toBe(50);
    expect(component.resendDay).toBe(90);
    expect(component.segmentSelected).toBeUndefined();
    expect(component.recommendedSegmentSelected).toBe(false);
    expect(component.campaignBudget).toBeUndefined();
    expect(component.campaignTarget).toBeUndefined();
    // expect(component.startDate).toEqual(new Date());
    // expect(component.minimumDate).toEqual(new Date());

  });

  it('should call getZipClear', () => {
    component.definePostObject = {
      zipcode: [12345, 67890]
    };
    component.segment = {zipcode:[12345, 67890]}
    component.getZipClear();
    expect(component.zipcodeArray).toEqual([12345, 67890]);
    expect(component.segment['zipcode']).toEqual([12345, 67890]);
  });

  it('should call getZipClear', () => {
    component.definePostObject = {
      zipcode: null
    };
    component.segment = {zipcode:[]}
    component.getZipClear();
    expect(component.zipcodeArray).toEqual([]);
    expect(component.segment['zipcode']).toEqual([]);
  });

  it('should call clearInput', () => {
    component.campaignBudget = 1000;
    component.clearInput('Budget');
    expect(component.campaignBudget).toBe('');
  });

  it('should call clearInput', () => {
    component.campaignTarget = 50;
    component.clearInput('Conversion Target');
    expect(component.campaignTarget).toBe('');
  });

  it('should call checkEvent', () => {
    let eventType = 'Competitor Visit Minutes';
    component.checkEvent(eventType);
    expect(component.CompetitorVisitMinutes).toBe(true);
    expect(component.SpeedTestMinutes).toBe(false);
    expect(component.ServiceLimit).toBe(false);

    eventType = '';
    component.checkEvent(eventType);
    expect(component.CompetitorVisitMinutes).toBe(false);
  });

  it('should call checkEvent', () => {
    const eventType = 'Speed Test Minutes';
    component.checkEvent(eventType);
    expect(component.CompetitorVisitMinutes).toBe(false);
    expect(component.SpeedTestMinutes).toBe(true);
    expect(component.ServiceLimit).toBe(false);
  });

  it('should set ServiceLimit to true if eventType is "Service Limit Hit"', () => {
    const eventType = 'Service Limit Hit';
    component.checkEvent(eventType);
    expect(component.CompetitorVisitMinutes).toBe(false);
    expect(component.SpeedTestMinutes).toBe(false);
    expect(component.ServiceLimit).toBe(true);
  });

  it('should call dialogService open method with the expected arguments', () => {
    const model = 'your-model';
    component.modifyCriteriaTrigger(model);
    spyOn((component as any).dialogService,'open');
  });

  it('should call dialogService open method with the expected arguments', () => {
    const model = 'your-model';
    component.impactedCampaigns(model);
    spyOn(component,'getCampaignList');
    spyOn((component as any).dialogService,'open');
  });

  it('should define submit', () => {

    //@ts-ignore
    spyOn(component.marketingCampaignDefineApiService.defineNextEmitterSubject, 'subscribe');
    spyOn(component, 'editDataAssigner');
    spyOn(component, 'recommendedSegemntPayLoadAssigner');
    spyOn(component, 'validator');
    spyOn(component, 'recommendedSegemntPayLoadAssignerWithChangeDetection');


    // execute
    component.defineSubmit();
    component.language = [];
    component.definePostObject = [];
    component.definePostObject["campaignId"] = '1111';
    //@ts-ignore
    expect(component.marketingCampaignDefineApiService.defineNextEmitterSubject.subscribe).toHaveBeenCalled();
    expect(component.validationPassed).toBeFalsy();
    expect(component.editDataAssigner).toHaveBeenCalled();
    expect(component.debounceTimer).toBeFalsy();
    expect(component.editMode).toBeFalsy();
    expect(component.definePostSuccessMsg).toEqual(component.language.Campaign_Defined);
    expect(component.definePostSuccess).toBeFalsy();

  });

  it('should select Recommended Segment', () => {
    spyOn(component, 'clearMobileNotificationData').and.callFake(() => { });
    const recommenendSeg = { segmentId: '2', segmentName: 'RecSeg1', segmentType: 'Acquisition' };

    component.selectRecommendedSegment(recommenendSeg);

    expect(component.segment).toEqual(recommenendSeg);
    expect(component.segmentType).toEqual(recommenendSeg.segmentType);
    expect(component.recommendedSegmentSelected).toBeTruthy();
    expect(component.segmentSelected).toEqual(recommenendSeg.segmentName);
    expect(component.segmentSelectedId).toEqual(recommenendSeg.segmentId);
    expect(component.acquisationSegmentSelected).toBeTruthy();
    expect(component.acquihidedata).toBeTruthy();
    expect(component.activeTab).toEqual('summary');

    recommenendSeg.segmentType = '';

    component.selectRecommendedSegment(recommenendSeg);

    expect(component.segmentType).toEqual(recommenendSeg.segmentType);
    expect(component.acquisationSegmentSelected).toBeFalsy();
    expect(component.acquihidedata).toBeFalsy();
    expect(component.activeTab).toEqual('summary');


  });
  it('should select Saved Segment', () => {
    spyOn(component, 'clearMobileNotificationData').and.callFake(() => { });
    const savedSeg = { segmentId: '2', segmentName: 'RecSeg1', segmentType: 'Acquisition' };

    component.selectSavedSegment(savedSeg);

    expect(component.recommendedSegmentSelected).toBeFalsy();
    expect(component.acquisationSegmentSelected).toBeFalsy;
    expect(component.acquihidedata).toBeFalsy;
    expect(component.activeTab).toEqual('summary');
    expect(component.segment).toEqual(savedSeg);
    expect(component.segmentSelected).toEqual(savedSeg.segmentName);
  });
});
