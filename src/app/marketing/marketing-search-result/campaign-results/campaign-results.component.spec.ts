import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { Title } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, } from 'rxjs';
import { CampaignResultsComponent } from './campaign-results.component';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';

describe('MarketingSearchResultComponent', () => {
    let component: CampaignResultsComponent;
    let fixture: ComponentFixture<CampaignResultsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CampaignResultsComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, HttpClientTestingModule
                , NgSelectModule],
            providers: [{
                provide: MarketingRoutingsService, useValue: {
                    newCampaignPageEdit: jasmine.createSpy(),
                }
            },
            { provide: TranslateService, useClass: CustomTranslateService },

            {
                provide: MarketingInsightspplicationApiService, useValue: {
                    campaignSearchResults: of(['pond']),
                    setResultsActiveTab: jasmine.createSpy(),
                }
            },

            {
                provide: MarketingCommonService, useValue: {
                    getCMCScopes: jasmine.createSpy().and.returnValue(''),
                }
            },
            {
                provide: Title, useValue: {
                  setTitle: jasmine.createSpy(),
                }
              },
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(CampaignResultsComponent);
                component = fixture.componentInstance;
            });
    });

    it('should create', () => {
        //@ts-ignore
        component.dtElement = { dtInstance: Promise.resolve({ destroy: () => { } }) };
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load data', () => {
        //arrange 
        spyOn(component, 'getCampaignListApiLoader');
        spyOn(component, 'tableLanguageOptions');
        //@ts-ignore
        component.dtElement = { dtInstance: Promise.resolve({ destroy: () => { } }) };
        //act  
        fixture.detectChanges();
        //assert
        // expect((component as any).titleService.setTitle).toHaveBeenCalledWith('Campaign Result');
        expect(component.getCampaignListApiLoader).toHaveBeenCalled();
        expect(component.tableLanguageOptions).toHaveBeenCalled();
    });
    it('should get CampaignListApiLoader', () => {
        //arrange
        //act
        component.getCampaignListApiLoader();
        //assert
        expect(component.gridLoaded).toBeFalsy();
        expect(component.marketingCampaignSearchTable).toEqual(['pond']);
        expect(component.isRerender).toBeTruthy();
    });
    it('should get tableLanguageOptions', () => {
        //arrange
        spyOn(component, 'tableDestroyOnly');
        component.language = { fileLanguage: '' };
        component.isRerender = true;
        //@ts-ignore
        component.dtElement = { dtInstance: Promise.resolve({ destroy: () => { } }) };
        //act
        component.tableLanguageOptions();
        //assert
        expect(component.tableDestroyOnly).toHaveBeenCalled();
    });
});
