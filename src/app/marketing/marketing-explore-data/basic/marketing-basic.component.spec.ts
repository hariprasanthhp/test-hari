import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule, SpyNgModuleFactoryLoader } from "@angular/router/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateService } from "src/app-services/translate.service";
import { MarketingApiService } from "src/app/marketing/shared/services/marketing-api.sevice";
import { MarketingCommonService } from "src/app/marketing/shared/services/marketing-common.service";
import { MarketingExploreDataBasicApiService } from "./explore-data-basic-api.service";
import { MarketingBasicComponent } from "./marketing-basic.component";
import { Regions } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/basic/basic.service';
import { Locations } from 'src/assets/mockdata/cmc/marketing/exploredata/basiclens/basic/basic.service'
import { of } from "rxjs";

describe('MarketingBasicComponent', () => {
    let component: MarketingBasicComponent;
    let fixture: ComponentFixture<MarketingBasicComponent>;
    let route: ActivatedRoute;
    let router: Router;
    let httpTestingController: HttpTestingController;
    let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/marketing/explore-data' };
    let marketService: MarketingExploreDataBasicApiService
    let languageService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MarketingBasicComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: 'marketing/explore-data', component: MarketingBasicComponent },
            ]),
                HttpClientTestingModule, NgSelectModule
            ],
            providers: [TranslateService, Title, MarketingCommonService,
                MarketingApiService, MarketingExploreDataBasicApiService]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(MarketingBasicComponent);
                marketService = TestBed.inject(MarketingExploreDataBasicApiService);
                component = fixture.componentInstance;
                route = TestBed.inject(ActivatedRoute);
                router = TestBed.inject(Router);
                httpTestingController = TestBed.inject(HttpTestingController);
                languageService = TestBed.inject(TranslateService)
            });

    });


    it('should initialized onInit()', () => {
        // spyOn(component, 'periodDateAssigner').and.callThrough();
        // spyOn(component, 'baseApiLoader').and.callThrough();
        // languageService.selectedLanguage.subscribe(data => {
        //     component.language = data;
        // })
        // component.ngOnInit();
        // expect(component.periodDateAssigner).toHaveBeenCalled();
        // expect(component.periodDateAssigner).toHaveBeenCalledTimes(1);
        // expect(component.baseApiLoader).toHaveBeenCalled();
        // expect(component.baseApiLoader).toHaveBeenCalledTimes(1);
    })

    // it('should get region details', () => {
    //     spyOn(marketService, 'CloudRegions').and.returnValue(of(Regions));
    //     spyOn(component, 'selectRegion').and.callThrough();
    //     component.selectRegion("All");
    //     component.regionsApiLoader();
    //     expect(component.regionData).toBeTruthy("Could not find the data");
    //     expect(component.regionData).toBe(Regions, "Value matched");
    // })

    // it('should get location details', () => {
    //     spyOn(marketService, 'LocationHierarchy').and.returnValue(of(Locations));
    //     component.locationsApiLoader();
    //     expect(component.locationDataResponse).toBeTruthy("Could not find the data");
    //     expect(component.locationDataResponse).toBe(Locations, "Value matched");
    // })

    // it('should render apply clear filter', () => {
    //     spyOn(component, 'applyClearFiler').and.callThrough();
    //     component.language = [];
    //     component.applyClearFiler()
    //     expect(component.language).toEqual([]);
    //     expect(component.regionSelected).toBe('All', 'value matched');
    //     expect(component.locationSelected).toBe('All', 'value matched');
    //     expect(component.activePeriod).toBe('last-30d', 'value matched');
    // });

    it('should get opennav details', () => {
        spyOn(component, 'openNav').and.callThrough()
        component.openNav()
        expect(component.divopen).toBeFalse()
    })

    it('should get time frame details', () => {
        spyOn(component, 'selectTimeFrame').and.callThrough()
        let period = 'last-30d';
        component.selectTimeFrame(period)
        expect(component.selectTimeFrame).toHaveBeenCalled()
    })

    it('should get baseApiLoader Details', () => {
        spyOn(component, 'baseApiLoader').and.callThrough()
        component.baseApiLoader()
        expect(component.baseApiLoader).toHaveBeenCalled()
    })

    it('should setTimeFrame Details', () => {
        let period = localStorage.getItem('period') ? localStorage.getItem('period') : 'last-2m'
        spyOn(component, 'setTimeFrame').and.callThrough()
        component.setTimeFrame()
        expect(component.activePeriod).toBe(period)
    })


    it('should change chart data', () => {
        spyOn(component, 'chartChange').and.callThrough()
        spyOn(component, 'trueFalseAssigner').and.callThrough()
        component.trueFalseAssigner('subscribe')
        component.chartChange('subscribe')
        expect(component.activeChart).toBe("subscribe")
        expect(component.chartChange).toHaveBeenCalled()
        expect(component.trueFalseAssigner).toHaveBeenCalled()

    })
    it('should select Location detials', () => {
        let data = {
            value: 'Chennai'
        }
        spyOn(component, 'selectLocation').and.callThrough()
        component.selectLocation(data)
        expect(component.locationSelected).toBe(data.value)
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });


})

