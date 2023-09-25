import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { MarketingHeaderComponent } from './marketing-header.component';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { MarketingHeaderApiService } from './marketing-headerApi.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';

describe('MarketingHeaderComponent', () => {
  let component: MarketingHeaderComponent;
  let fixture: ComponentFixture<MarketingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule
      ],
      providers: [{
        provide: MarketingRoutingsService, useValue: {
          insightsPage: jasmine.createSpy(),
          newCampaignPageEdit: jasmine.createSpy(),
          campaignsPage: jasmine.createSpy(),
          searchResultsPage: () => { },
        }
      },
      {
        provide: MarketingInsightspplicationApiService, useValue: {
          Search: () => of(''),
          SearchCampaign: () => of([]),
          setResultsActiveTab: jasmine.createSpy(),
        }
      },
      {
        provide: MarketingHeaderApiService, useValue: {
          setSearchName: jasmine.createSpy(),
          setsubscriberId: jasmine.createSpy(),
        }
      },
        ChangeDetectorRef,
      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue(''),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingHeaderComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //arrange 
    (component as any).translateService.selectedLanguage = of([]);
    spyOn((component as any).router.events, 'subscribe');
    //act
    fixture.detectChanges();
    //assert
    expect(component.language).toEqual([]);
    expect((component as any).router.events.subscribe).toHaveBeenCalled();
  });

  it('should get scopeAsssiner', () => {
    //arrange

    //act
    component.scopeAsssiner();
    //assert
    expect((component as any).marketingCommonService.getCMCScopes).toHaveBeenCalled();
  });

  it('should  select Campaign', () => {
    //arrange
    let data = { campaignId: '123q' }
    component.language = [];
    //act
    component.selectCampaign(data);
    //assert
    expect((component as any).marketingRoutingsService.newCampaignPageEdit).toHaveBeenCalledOnceWith('123q');
  });

});
