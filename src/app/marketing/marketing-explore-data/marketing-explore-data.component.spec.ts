import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingExploreDataComponent } from './marketing-explore-data.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { of, throwError } from 'rxjs';
import { MarketingHomeApiService } from '../marketing-home/marketing-home-Apiservice';



describe('MarketingExploreDataComponent', () => {
    let component: MarketingExploreDataComponent;
    let fixture: ComponentFixture<MarketingExploreDataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingExploreDataComponent],
            imports: [RouterTestingModule, HttpClientTestingModule
            ],
            providers: [TranslateService, Title, MarketingCommonService, {
                provide: SsoAuthService, useValue: {
                    getEntitlements: () => (of()),
                    getScopes: () => (of())
                    }
                }, {
                    provide: MarketingHomeApiService, useValue: {
                        thoughtSpotStatusCheckGET: () => (of()),
                        }
                    },
                    {
                        provide: MarketingRoutingsService, useValue: {
                            newCampaignPage: () => (of()),
                            }
                        }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MarketingExploreDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load data', () => {
        // let entitlement = {208:{appType:208}};
        // component.cmcType = entitlement['209'] ? true : false;
        // component.internalProd = true;
        // component.isDev = true;
        component.ngOnInit();
        // fixture.detectChanges();
    });

    it('should call routeIndicator', () => {
        history.pushState({
            value: 'test',
            Type: '',
            Name: 'Name'
          }, '');
        spyOn((<any>component).route.queryParams,'subscribe');
        component.routeIndicator();
        expect((component as any).route.queryParams.subscribe).toHaveBeenCalled();
    });

    it('should call routeIndicator', () => {
        history.pushState({
            value: 'test',
            Type: '',
            Name: ''
          }, '');
        spyOn((<any>component).route.queryParams,'subscribe');
        component.routeIndicator();
        expect((component as any).route.queryParams.subscribe).toHaveBeenCalled();
    });

    it('should call tab_Chart_Sec', () => { 
        let tab_value = 'Basic'
        component.tab_Chart_Sec(tab_value);
        component.active_Chart = tab_value;
    });

    it('should call checkTSStatus', () => { 
        let res = {thoughtspotSupported:true}
        spyOn((<any>component).marketingHomeApiService,'thoughtSpotStatusCheckGET').and.returnValue(of(res));
        component.checkTSStatus();
        expect((component as any).marketingHomeApiService.thoughtSpotStatusCheckGET).toHaveBeenCalled();
    });

    it('should call checkTSStatus', () => { 
        let error = {status:504}
        spyOn((<any>component).marketingHomeApiService,'thoughtSpotStatusCheckGET').and.returnValue(throwError(error));
        component.checkTSStatus();
        expect((component as any).marketingHomeApiService.thoughtSpotStatusCheckGET).toHaveBeenCalled();
    });

    it('should call newCampaign', () => { 
        component.newCampaign();
    });

});
