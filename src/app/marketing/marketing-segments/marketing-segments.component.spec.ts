import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableDirective } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of, throwError } from 'rxjs';

import { MarketingSegmentsComponent } from './marketing-segments.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { MarketingSegmentsApiService } from './shared/marketing-segments-api.service';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { errorStatus400, errorStatus500, errorStatus503, errorStatus504 } from 'src/assets/mockdata/shared/error.data';



describe('MarketingSegmentsComponent', () => {
    let component: MarketingSegmentsComponent;
    let fixture: ComponentFixture<MarketingSegmentsComponent>;
    let dtInstance: jasmine.SpyObj<DataTables.Api>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingSegmentsComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, HttpClientTestingModule
            ],
            providers: [{
                provide: MarketingRoutingsService, useValue: {
                    newCampaignPageEdit: jasmine.createSpy(),
                    exploreDataPage: jasmine.createSpy(),
                }
            },
            {
                provide: MarketingSegmentsApiService, useValue: {
                    recommendedSegmentsListNotGET: () => (of({})),
                    setRecommendedSegmentData: () => (of({})),
                    SavedSegmentsListNotGET: () => (of({})),
                    SavedSegmentsDELETE: () => (of({})),

                }
            },
            { provide: TranslateService, useClass: CustomTranslateService },
            {
                provide: MarketingCommonService, useValue: {
                    getCMCScopes: jasmine.createSpy().and.returnValue({ exploredataRead: true, exploredataWrite: true }),
                    errorHandling: jasmine.createSpy().and.returnValue(''),
                }
            },
            {
                provide: NgbModal, useValue: {
                    open: jasmine.createSpy().and.returnValue({}),
                    dismissAll: jasmine.createSpy(),
                }
            },
            {
                provide: SsoAuthService, useValue: {
                    getEntitlements: jasmine.createSpy().and.returnValue('209'),
                }
            },]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingSegmentsComponent);
                dtInstance = jasmine.createSpyObj('DataTables.Api', ['destroy','search', 'draw']);
                dtInstance.search.and.returnValue(dtInstance);
                component = fixture.componentInstance;
                component.dtElement = { dtInstance: Promise.resolve(dtInstance) } as any;  
            });
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should page load data', () => {
        //arrange
        spyOn(component, 'getRecommendedTrigger');
        spyOn(component, 'getSegmentsTrigger');
        spyOn(component, 'tableLanguageOptions');
        //@ts-ignore
        //component.dtElement = { dtInstance: Promise.resolve() };
        //act
        fixture.detectChanges();
        //assert
        expect(component.getRecommendedTrigger).toHaveBeenCalled();
        expect(component.getSegmentsTrigger).toHaveBeenCalled();
        expect(component.tableLanguageOptions).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger', () => {
        component.scopes = { exploredataRead:true };
        let res = [{segmentType:'upload',segmentName:'Prospects'}];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(of(res));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        let res = [];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(of(res));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(throwError(errorStatus504));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        let errorStatus502 = {message:'Error',status:502}
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(throwError(errorStatus502));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(throwError(errorStatus400));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(throwError(errorStatus503));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'recommendedSegmentsListNotGET').and.returnValue(throwError(errorStatus500));
        component.getRecommendedTrigger();
        expect((component as any).marketingSegmentsApiService.recommendedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get SegmentsTrigger', () => {
        component.scopes = { exploredataRead:true };
        let res = [{segmentType:'upload',segmentName:'Prospects'}];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(of(res));
        component.getSegmentsTrigger(); 
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        let res = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(of(res));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(throwError(errorStatus504));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        let errorStatus502 = {message:'Error',status:502}
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(throwError(errorStatus502));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(throwError(errorStatus400));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(throwError(errorStatus503));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should get RecommendedTrigger empty response', () => {
        component.scopes = { exploredataRead:true };
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsListNotGET').and.returnValue(throwError(errorStatus500));
        component.getSegmentsTrigger();
        expect((component as any).marketingSegmentsApiService.SavedSegmentsListNotGET).toHaveBeenCalled();
    });

    it('should call segmentDeletePrompt', () => {
        component.segmentDeletePrompt({});
    });

    it('should call segmentDelete', () => {
        component.scopes = { exploredataWrite:true };
        component.deleteSegmentObject = {segmentId:'1122',segmentType:'Propects',segmentName:'Name'};
        component.language = [];
        let res = [{segmentType:'upload',segmentName:'Prospects'}];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsDELETE').and.returnValue(of(res));
        component.segmentDelete(); 
        expect((component as any).marketingSegmentsApiService.SavedSegmentsDELETE).toHaveBeenCalled();        
    });

    it('should call segmentDelete error 200', () => {
        component.scopes = { exploredataWrite:true };
        component.deleteSegmentObject = {segmentId:'1122',segmentType:'Propects',segmentName:'Name'};
        component.language = [];
        let errorStatus200 = {status:200}
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsDELETE').and.returnValue(throwError(errorStatus200));
        component.segmentDelete(); 
        expect((component as any).marketingSegmentsApiService.SavedSegmentsDELETE).toHaveBeenCalled();        
    });

    it('should call segmentDelete error 400', () => {
        component.scopes = { exploredataWrite:true };
        component.deleteSegmentObject = {segmentId:'1122',segmentType:'Propects',segmentName:'Name'};
        component.language = [];
        spyOn((<any>component).marketingSegmentsApiService,'SavedSegmentsDELETE').and.returnValue(throwError(errorStatus400));
        component.segmentDelete(); 
        expect((component as any).marketingSegmentsApiService.SavedSegmentsDELETE).toHaveBeenCalled();        
    });

    it('should call tableDestroyOnly1', async() => {
        await component.tableDestroyOnly1();
        expect(dtInstance.destroy).toHaveBeenCalledWith();
    });

    it('should call tableDestroyOnly', async() => {
        await component.tableDestroyOnly();
        expect(dtInstance.destroy).toHaveBeenCalledWith();
    });

    it('should call tableLanguageOptions', () => {
        component.language = { fileLanguage: '' };
        component.isRerender = true;
        spyOn(component, 'tableDestroyOnly');
        component.tableLanguageOptions();
        expect(component.tableDestroyOnly).toHaveBeenCalled();
    });

    it('should call errorReset', () => {
        component.errorReset();
    });

    it('should call errorResetTab', () => {
        component.errorResetTab();
    });

    it('should call tab_recom_seg', () => {
        let tabName = 'recommended'
        component.tab_recom_seg(tabName);
    });

    it('should call selectCampaign', () => {
        let data = {campaignId:'1122'}
        component.selectCampaign(data);
    });

    it('should call newSegments', () => {
        component.newSegments('1122','prospects','name');
    });

    it('should call campaignList', () => {
        component.campaignList('param');
    });

    it('should call campaignList2', () => {
        component.campaignList2('param');
    });

    // it('should delete segment', () => {
    //     //arrange
    //     spyOn(component, 'segmentDeleteConfirm');
    //     component.deleteSegmentObject = { segmentId: '100', segmentType: 'saved' };

    //     //action
    //     component.segmentDelete();
    //     //assert
    //     expect((component as any).marketingSegmentsApiService.SavedSegmentsDELETE).      toHaveBeenCalledOnceWith('100', 'saved',undefined);
    //     expect(component.segmentDeleteConfirm).toHaveBeenCalled();
    // });

});
