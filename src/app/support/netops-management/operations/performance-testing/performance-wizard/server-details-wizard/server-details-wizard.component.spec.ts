import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { cafIITestList, deviceCafCapabilityData, ooklaServerData } from 'src/assets/mockdata/support/netops-management/operations/performance-testing/performance.data';
import { PerformanceServiceService } from '../../performance-testing.service';
import { ServerDetailsWizardComponent } from './server-details-wizard.component';



describe('ServerDetailsWizardComponent', () => {
    let component: ServerDetailsWizardComponent;
    let fixture: ComponentFixture<ServerDetailsWizardComponent>;
    let performanceService: PerformanceServiceService;
    let route: ActivatedRoute;
    let router: Router;
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServerDetailsWizardComponent],
            imports: [
                RouterTestingModule, HttpClientTestingModule

            ],
            providers: [
                TranslateService, SsoAuthService, PerformanceServiceService, CommonService, DownloadService, DateUtilsService, WindowRefService, Title
            ]
        }).compileComponents().then(() => {
            performanceService = TestBed.inject(PerformanceServiceService);
            fixture = TestBed.createComponent(ServerDetailsWizardComponent);
            component = fixture.componentInstance;
            route = TestBed.inject(ActivatedRoute);
            router = TestBed.inject(Router);
            httpTestingController = TestBed.inject(HttpTestingController);
            fixture.detectChanges();
        });
    });

    // beforeEach(() => {
    //   fixture = TestBed.createComponent(PerformanceTestingComponent);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    // });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should get ookla server  data', () => {
        spyOn(performanceService, 'GetServerDetails').and.returnValue(of(ooklaServerData));
        spyOn(component, 'getServerDetails').and.callThrough();
        component.getServerDetails();
        fixture.detectChanges();
        //  console.log(component.serverData);

        expect(component.serverData?.length).toBe(4, "Length is wrong");
        expect(component.serverData[1].host).toMatch("speedtest10g.bhm.slfiber.com");

        expect(component.getServerDetails).toHaveBeenCalled();
        expect(component.getServerDetails).toHaveBeenCalledTimes(1);
    });


});
