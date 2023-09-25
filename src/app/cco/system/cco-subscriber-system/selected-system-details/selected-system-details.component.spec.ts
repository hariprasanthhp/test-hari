import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HealthService } from 'aws-sdk/clients/applicationinsights';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { SupportRouterService } from 'src/app/support/support-system/support-router/services/support-router.service';
import { SupportWifiService } from 'src/app/support/support-wifi/services/support-wifi.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { AddSubscriberService } from '../add-service-system/add-subscriber.service';
import { of, throwError, from } from 'rxjs'
import { SelectedSystemDetailsComponent } from './selected-system-details.component';
import { cocSystemDetails } from 'src/assets/mockdata/Foundation/system/systemDetails';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SelectedSystemDetailsComponent', () => {
  let component: SelectedSystemDetailsComponent;
  let fixture: ComponentFixture<SelectedSystemDetailsComponent>;
  let translateService: TranslateService;
  let router: Router;
  let route: ActivatedRoute;
  let service: DataServiceService;
  let sso: SsoAuthService;
  let http: HttpClient;
  let dateUtilsService: DateUtilsService;
  let commonOrgService: CommonService;
  let systemservice: FoundationManageService;
  let ccoService: AddSubscriberService;
  let supportrouterservice: SupportRouterService;
  let api: SupportWifiService;
  let healthService: HealthService;
  let issueService: IssueService;
  let managementService: ManagementService;
  let communityService: MycommunityIqService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedSystemDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule,
        FormsModule,
      ],
      providers: [TranslateService, DataServiceService, SsoAuthService, CommonService, FoundationManageService, AddSubscriberService, SupportRouterService, SupportWifiService]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        systemservice = TestBed.inject(FoundationManageService);
        ccoService = TestBed.inject(AddSubscriberService);
        commonOrgService = TestBed.inject(CommonService);
        fixture = TestBed.createComponent(SelectedSystemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSystemDetailsComponent);
    ccoService = TestBed.inject(AddSubscriberService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAllSubsServicesData', () => {
    spyOn(ccoService, 'getDetailedSubscriberServices').and.returnValue(of(cocSystemDetails));
    component.allSubsServicesData = cocSystemDetails;
    // component.url = '/cco-subscriber-system/add-service-system'
    component.getAllSubsServicesData();
    fixture.detectChanges();
    expect(component.allSubsServicesData).toBe(cocSystemDetails);
  });

});


