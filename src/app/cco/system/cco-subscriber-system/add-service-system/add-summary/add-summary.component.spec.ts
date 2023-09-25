import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { summarydetail } from 'src/assets/mockdata/Foundation/system/systemDetails';
import { AddSubscriberService } from '../add-subscriber.service';
import { of, throwError,from } from 'rxjs'
import { AddSummaryComponent } from './add-summary.component';

describe('AddSummaryComponent', () => {
  let component: AddSummaryComponent;
  let fixture: ComponentFixture<AddSummaryComponent>;
  let translateService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let ccoService: AddSubscriberService;
  let commonOrgService: CommonService;
  let systemservice: FoundationManageService;
  let http: HttpClient;
  let sso: SsoAuthService;
  let communityService: MycommunityIqService;
  let managementService: ManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSummaryComponent ],
      imports:[HttpClientTestingModule
,RouterTestingModule],
      providers:[TranslateService, FoundationManageService, SsoAuthService, CommonService,  AddSubscriberService]
    })
    .compileComponents().then(() => {
      translateService = TestBed.inject(TranslateService);
      router = TestBed.inject(Router);
      sso = TestBed.inject(SsoAuthService);
      systemservice = TestBed.inject(FoundationManageService);
      ccoService = TestBed.inject(AddSubscriberService);
      commonOrgService = TestBed.inject(CommonService);
      fixture = TestBed.createComponent(AddSummaryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAllSubsServicesData', () => {
    spyOn(ccoService, 'getDetailedSubscriberServices').and.returnValue(of(summarydetail));
    component.allSubsServicesData = summarydetail;
    // component.url = '/cco-subscriber-system/add-service-system'
    component.getAllSubsServicesData();
    fixture.detectChanges();
    expect(component.allSubsServicesData).toBe(summarydetail);
  });

});
