import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { RecommededSegmentsComponent } from './recommeded-segments.component';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Subject, of } from 'rxjs';
import { MarketingSegmentsApiService } from '../shared/marketing-segments-api.service';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



describe('RecommededSegmentsComponent', () => {
    let component: RecommededSegmentsComponent;
    let fixture: ComponentFixture<RecommededSegmentsComponent>;
    let dtInstance: jasmine.SpyObj<DataTables.Api>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecommededSegmentsComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, HttpClientTestingModule
            ],
            providers: [{
                provide: MarketingRoutingsService, useValue: {
                    newCampaignPageEdit: jasmine.createSpy(),
                }
            },
            {
                provide: MarketingSegmentsApiService, useValue: {
                    recommendedDataSubject: of(['streamer']),
                }
            },
            { provide: TranslateService, useClass: CustomTranslateService },
            {
                provide: MarketingCommonService, useValue: {
                    getCMCScopes: jasmine.createSpy().and.returnValue(of('')),
                }
            }]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(RecommededSegmentsComponent);
                dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
                dtInstance.search.and.returnValue(dtInstance); 
                component = fixture.componentInstance;
                component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;  
                component.languageSubject = new Subject; 
                component.recommendedDataSubject = new Subject; 
                component.dtTrigger = new Subject; 
            });
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should page load data', () => {
        //arrange
        spyOn(component, 'getRecommendedSegmnets');
        spyOn(component, 'tableLanguageOptions');
        //@ts-ignore
        component.dtElement = { dtInstance: Promise.resolve() };
        //act
        fixture.detectChanges();
        //assert
        expect(component.getRecommendedSegmnets).toHaveBeenCalled();
        expect(component.tableLanguageOptions).toHaveBeenCalled();


    });

    it('should get RecommendedSegmnets', () => {
        //arrange

        //action
        component.getRecommendedSegmnets();
        //assert
        expect(component.recommendedSegmentArray).toEqual(['streamer']);
        expect(component.recommendedErroMessage).toBeFalsy();
    });

    it('should call tableLanguageOptions', () => {
        //arrange
        component.language = { fileLanguage: '' };

        component.isRerender = true;
        spyOn(component, 'tableDestroyOnly');
        //action
        component.tableLanguageOptions(); 
        //assert
        expect(component.tableDestroyOnly).toHaveBeenCalled();
    });

    it('should call selectCampaign', () => {
        let data = {campaignId:'1122'};
        component.selectCampaign(data);
    });

    it('should call tableDestroyOnly', async() => {
        const searchText = 'test';
        await component.tableDestroyOnly();
        expect(dtInstance.destroy).toHaveBeenCalledWith();
    });

    it('should call ngOnDestroy', () => {
        spyOn(component.languageSubject, 'unsubscribe');
        spyOn(component.dtTrigger, 'unsubscribe');
        spyOn(component.recommendedDataSubject, 'unsubscribe');
    
        component.ngOnDestroy();
    
        expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
        expect(component.dtTrigger.unsubscribe).toHaveBeenCalled();
        expect(component.recommendedDataSubject.unsubscribe).toHaveBeenCalled();
      });

    it('should call getTimestamp', () => {
        let date = new Date();
        component.getTimestamp(date);
    });
});
