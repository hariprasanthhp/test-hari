import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingSearchResultComponent } from './marketing-search-result.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

describe('MarketingSearchResultComponent', () => {
  let component: MarketingSearchResultComponent;
  let fixture: ComponentFixture<MarketingSearchResultComponent>;
  let dtInstance: jasmine.SpyObj<DataTables.Api>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingSearchResultComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [{
        provide: MarketingRoutingsService, useValue: {
          insightsPage: () => (of({})),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },

      {
        provide: MarketingInsightspplicationApiService, useValue: {
          getResultsActiveTab: jasmine.createSpy().and.returnValue(''),
          SearchCampaign: () => (of({})),
          setCampaignSearchResults: () => (of({})),
          setResultsActiveTab: () => (of({})),
        }
      },
      {
        provide: ActivatedRoute, useValue: {
          queryParams: of(),
        }
      },
      {
        provide: MarketingCommonService, useValue: {
          getCMCScopes: jasmine.createSpy().and.returnValue({ campaignRead: true, subscriberRead: true }),
          errorHandling: () => (of({error:{}}))
        }
      },
      {
        provide: Title, useValue: {
          setTitle: jasmine.createSpy(),
        }
      },
      {
        provide: HttpClient, useValue: {
          get: () => (of()),
        }
      },
      {
        provide: SsoAuthService, useValue: {
          getOrgId: jasmine.createSpy().and.returnValue(''),
        }
      },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingSearchResultComponent);
        dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
        dtInstance.search.and.returnValue(dtInstance); 
        component = fixture.componentInstance;
        component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;   
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange 
    spyOn(component, 'getCampaignListApiLoader');
    spyOn(component, 'getSubscriberListApiLoader');
    spyOn(component, 'tableLanguageOptions');
    //@ts-ignore
    component.dtElement = { dtInstance: Promise.resolve() };
    //act  
    fixture.detectChanges();
    //assert
    expect(component.getCampaignListApiLoader).toHaveBeenCalled();
    expect(component.getSubscriberListApiLoader).toHaveBeenCalled();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
  });

  it('should get tableLanguageOptions', () => {
    //arrange
    
    spyOn(component, 'redraw');
    component.language={fileLanguage:''};
    component.isRerender=true;
    //act
    component.tableLanguageOptions();
    //assert
    expect(component.redraw).toHaveBeenCalled();
  });

  it('should call redraw', async() => {
    await component.redraw();
    expect(dtInstance.draw).toHaveBeenCalled();
  });

  it('should call setSession', () => {
    component.activeTab = 'Non-subscribers';
    component.setSession();
  });

  it('should call setSession', () => {
    component.activeTab = 'subscribers';
    component.setSession();
  });

  it('should call updateTableView', () => {
    component.updateTableView();
  });

  it('should call getSubscriberListApiLoader', () => {
    let res = { metadata: { totalHits: 2 } ,records:[{ subscriberId: "fff4ea09-b32d-4261-885a-d1516b191a31", subscriberLocationId: "991573:house1573" }]}
    component.scopes = {subscriberRead:true};
    spyOn((<any>component).http,'get').and.returnValue(of(res))
    component.getSubscriberListApiLoader();
    // expect((component as any).http.get).toHaveBeenCalled();
  });

  it('should call getCampaignListApiLoader', () => {
    component.scopes = {campaignRead:true};
    let res = ['CAMP01', 'CAMP02'];
    component.language = [];
    spyOn((<any>component).marketingInsightApplicationApiService,'SearchCampaign').and.returnValue(of(res));
    component.getCampaignListApiLoader();
    expect((component as any).marketingInsightApplicationApiService.SearchCampaign).toHaveBeenCalledWith('',1);
  });

  it('should call getCampaignListApiLoader if res is empty', () => {
    component.scopes = {campaignRead:true};
    let res = [];
    component.language = [];
    spyOn((<any>component).marketingInsightApplicationApiService,'SearchCampaign').and.returnValue(of(res));
    component.getCampaignListApiLoader();
    expect((component as any).marketingInsightApplicationApiService.SearchCampaign).toHaveBeenCalledWith('',1);
  });

  it('should call getCampaignListApiLoader if res is error', () => {
    component.scopes = {campaignRead:true};
    let error = {message:'error'};
    component.language = [];
    spyOn((<any>component).marketingInsightApplicationApiService,'SearchCampaign').and.returnValue(throwError(error));
    component.getCampaignListApiLoader();
    expect((component as any).marketingInsightApplicationApiService.SearchCampaign).toHaveBeenCalledWith('',1);
  });

  it('should call errorReset', () => {
    component.errorReset();
  });

  it('should call tab_Recom_Seg_Camp', () => {
    let tabName = 'campaigns';
    component.campaignCount = 0;  
    component.tab_Recom_Seg_Camp(tabName);

    component.campaignCount = 1;  
    component.tab_Recom_Seg_Camp(tabName);

    tabName = 'subscribers';
    component.count = 2;
    component.tab_Recom_Seg_Camp(tabName);

    component.count = 0;
    component.tab_Recom_Seg_Camp(tabName);
  });


  it('should call subscriberInsights', () => {
    component.scopes = {subscriberRead:true};
    spyOn((<any>component).marketingInsightApplicationApiService,'setResultsActiveTab');
    component.searchName = 'Name';
    spyOn((<any>component).marketingRoutingsService,'insightsPage');
    component.subscriberInsights('1122');
    expect((component as any).marketingInsightApplicationApiService.setResultsActiveTab).toHaveBeenCalledWith('subscribers');
    expect((component as any).marketingRoutingsService.insightsPage).toHaveBeenCalledWith('1122','Name');
  });

  it('should call subscriberInsights', () => {
    component.scopes = {subscriberRead:true};
    spyOn((<any>component).marketingInsightApplicationApiService,'setResultsActiveTab');
    component.searchName = '';
    spyOn((<any>component).marketingRoutingsService,'insightsPage');
    component.subscriberInsights('1122');
    expect((component as any).marketingInsightApplicationApiService.setResultsActiveTab).toHaveBeenCalledWith('subscribers');
    expect((component as any).marketingRoutingsService.insightsPage).toHaveBeenCalledWith('1122',' ');
  });

  it('should call getTotalCountHits', () => {
    let res = { metadata: { totalHits: 2 } ,records:[{ subscriberId: "fff4ea09-b32d-4261-885a-d1516b191a31", subscriberLocationId: "991573:house1573" }]};
    const params = new HttpParams()
             .set("orgId", 10001)
             .set("pageNumber",  1)
             .set("pageSize", 10)
             .set("filter", "")
    spyOn((<any>component).http,'get').and.returnValue(of(res))
    component.getTotalCountHits();
    // expect((component as any).http.get).toHaveBeenCalledWith(params);
  });
});
