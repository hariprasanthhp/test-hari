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
import { cafIITestList, deviceCafCapabilityData, ooklaServerData, savedata } from 'src/assets/mockdata/support/netops-management/operations/performance-testing/performance.data';
import { PerformanceTestingComponent } from '../../performance-testing.component';
import { PerformanceServiceService } from '../../performance-testing.service';
import { ReviewWizardComponent } from './review-wizard.component';
import { DatePipe } from '@angular/common';
//'support/netops-management/operations/performance-testing


describe('ReviewWizardComponent', () => {
    let component: ReviewWizardComponent;
    let fixture: ComponentFixture<ReviewWizardComponent>;
    let performanceService: PerformanceServiceService;
    let dateUtilsService: DateUtilsService;
    let route: ActivatedRoute;
    let router: Router;
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReviewWizardComponent],
            imports: [
                RouterTestingModule, HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    { path: 'support/netops-management/operations/performance-testing', component: PerformanceTestingComponent },
                ]),

            ],
            providers: [
                TranslateService, SsoAuthService, PerformanceServiceService, CommonService, DownloadService, DateUtilsService, WindowRefService, DatePipe, Title
            ]
        }).compileComponents().then(() => {
            performanceService = TestBed.inject(PerformanceServiceService);
            dateUtilsService = TestBed.inject(DateUtilsService);
            fixture = TestBed.createComponent(ReviewWizardComponent);
            component = fixture.componentInstance;
            component.inputData = savedata;
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
        component.inputData = savedata;
        expect(component).toBeTruthy();
    });
    it('should save data', () => {
        let obj = {
            "id": "40775dcf-a605-4cbe-8e6d-cefe37c6b8b4"
        }

        component.inputData = savedata;
        spyOn(performanceService, 'save').and.returnValue(of(obj));
        spyOn(component, 'save').and.callThrough();
        component.save();
        // component.reload()
        fixture.detectChanges();
        expect(component.save).toHaveBeenCalled();
        expect(component.save).toHaveBeenCalledTimes(1);
    });


});
