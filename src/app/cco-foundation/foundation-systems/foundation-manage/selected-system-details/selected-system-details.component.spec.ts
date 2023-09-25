import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { datailsPageData } from 'src/assets/mockdata/Foundation/system/systemDetails';
import { FoundationDataService } from '../../foundation-data.service';
import { FoundationManageService } from '../foundation-manage.service';
import { of, throwError, from } from 'rxjs'
import { SelectedSystemDetailsComponent } from './selected-system-details.component';

describe('SelectedSystemDetailsComponent', () => {
  let component: SelectedSystemDetailsComponent;
  let fixture: ComponentFixture<SelectedSystemDetailsComponent>;
  let translateService: TranslateService;
  let router: Router;
  let route: ActivatedRoute;
  let service: DataServiceService;
  let sso: SsoAuthService;
  let http: HttpClient;
  let commonOrgService: CommonService;
  let systemservice: FoundationManageService;
  let foundationDataService: FoundationDataService;
  let Service: AddSubscriberService;
  let managementService: ManagementService;
  let ccoService: AddSubscriberService;
  let communityService: MycommunityIqService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedSystemDetailsComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule],
      providers: [TranslateService, SsoAuthService,
        DataServiceService,
        CommonService,
        FoundationManageService,
        FoundationDataService,]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        systemservice = TestBed.inject(FoundationManageService);
        commonOrgService = TestBed.inject(CommonService);
        fixture = TestBed.createComponent(SelectedSystemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCommandIqinfo', () => {
    spyOn(systemservice, 'getCommandIqOfSubscriber').and.returnValue(of(datailsPageData));
    component.CommandIqData = datailsPageData;
    component.systemInfo.subscriberId = "808e3360-654f-411f-bdf5-99090ef26722"
    component.getCommandIqinfo();
    fixture.detectChanges();
    expect(component.CommandIqData).toBe(datailsPageData);
  });

});
