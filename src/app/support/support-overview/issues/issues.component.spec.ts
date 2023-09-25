import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { commandiqmock, desc, desc1, desc10, desc11, desc12, desc13, desc14, desc15, desc16, desc17, desc18, desc19, desc2, desc20, desc21, desc22, desc23, desc24, desc25, desc26, desc27, desc28, desc29, desc3, desc30, desc31, desc32, desc33, desc34, desc35, desc36, desc37, desc38, desc39, desc4, desc40, desc41, desc42, desc43, desc44, desc45, desc46, desc5, desc6, desc7, desc8, desc9, devicedatamock, devicesinfo, devicesmock, entitle, issuedatamock, issuedatamock1, issues } from 'src/assets/mockdata/support/overview/issues';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../data.service';
import { SharedModule } from '../../shared/shared.module';
import { IssuesService } from '../services/issues.service';

import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let trustservice: DataServiceService;
  let issuseservice: IssuesService;
  let ssoAuthService: SsoAuthService;
  let route: ActivatedRoute;
  let router: Router;
  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule, NgSelectModule, SharedModule, FormsModule, ReactiveFormsModule, DataTablesModule],
      providers: [TranslateService, SsoAuthService, IssuesService, DataServiceService,
        ]
    })
      .compileComponents()
      .then(() => {
        trustservice = TestBed.inject(DataServiceService);
        issuseservice = TestBed.inject(IssuesService);
        ssoAuthService = TestBed.inject(SsoAuthService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(IssuesComponent);
        component = fixture.componentInstance;
        // component.unitTesting = true;
        component.SubscriberId = 'a15b2f6f-ba4b-4404-91f5-8591b61572e0';
        component.Devices = ['CXNK00FEEE5B'];
        component.loading = false;
        component.MODULE = 'support';
        fixture.detectChanges()
      })
  });

it('should initialized onInit()', () => {
  spyOn(component, 'qoeCheck').and.callThrough();
  ssoAuthService.commandIQData.next(commandiqmock);
  component.ngOnInit();
  sessionStorage.setItem("calix.deviceData",JSON.stringify(devicesinfo));
  expect(component.qoeCheck).toHaveBeenCalled();
  expect(component.dtOptions.pageLength).toBeFalsy();
})

it('table data of issues', () => {
  component.ngOnInit();
  spyOn(issuseservice, 'setIssues').and.callThrough();
  issuseservice.setIssues(issues);
  trustservice.setSubscriberTabInfoData(issues[0]);
  spyOn(component, 'responseFromStatus').and.callThrough();
  spyOn(component, 'initalize').and.callThrough();
  component.responseFromStatus("");
  expect(component.issueList[0].subscriberId).toMatch('a15b2f6f-ba4b-4404-91f5-8591b61572e0');
  expect(component.initalize).toHaveBeenCalledTimes(1);
  fixture.detectChanges();
});

it('qoe check', () => {
  environment.VALIDATE_SCOPE = 'true';
  spyOn(component, 'qoeCheck').and.callThrough();
  component.qoeCheck();
  window.localStorage.setItem('calix.scopes',JSON.stringify(scopes));
})

it('validate scope else', () => {
  // environment.VALIDATE_SCOPE = 'true';
  spyOn(component, 'qoeCheck').and.callThrough(); 
  component.qoeCheck();
  window.localStorage.setItem('calix.scopes',JSON.stringify(scopes));
})
it('get issues', () => {
  component.Devices = devicesmock; 
  fixture.detectChanges();
  component.ReasonDescription(desc.code,desc);
  sessionStorage.setItem('calix.deviceData',JSON.stringify(devicesmock));
  fixture.detectChanges();
  component.ReasonDescription(desc1.code,desc1);
  component.ReasonDescription(desc2.code,desc2);
  component.ReasonDescription(desc3.code,desc3);
  component.ReasonDescription(desc4.code,desc4);
  component.ReasonDescription(desc5.code,desc5);
  component.ReasonDescription(desc6.code,desc6);
  component.ReasonDescription(desc7.code,desc7);
  component.ReasonDescription(desc8.code,desc8);
  component.ReasonDescription(desc9.code,desc9);
  component.ReasonDescription(desc10.code,desc10);
  component.ReasonDescription(desc11.code,desc11);
  component.ReasonDescription(desc12.code,desc12);
  component.ReasonDescription(desc13.code,desc13);
  component.ReasonDescription(desc14.code,desc14);
  component.ReasonDescription(desc15.code,desc15);
  component.ReasonDescription(desc16.code,desc16);
  component.ReasonDescription(desc17.code,desc17);
  component.ReasonDescription(desc18.code,desc18);
  component.ReasonDescription(desc19.code,desc19);
  component.ReasonDescription(desc20.code,desc20);
  component.ReasonDescription(desc21.code,desc21);
  component.ReasonDescription(desc22.code,desc22);
  component.ReasonDescription(desc23.code,desc23);
  component.ReasonDescription(desc24.code,desc24);
  component.ReasonDescription(desc25.code,desc25);
  component.ReasonDescription(desc26.code,desc26);
  component.ReasonDescription(desc27.code,desc27);
  component.ReasonDescription(desc28.code,desc28);
  component.ReasonDescription(desc29.code,desc29);
  component.ReasonDescription(desc30.code,desc30);
  component.ReasonDescription(desc31.code,desc31);
  component.ReasonDescription(desc32.code,desc32);
  component.ReasonDescription(desc33.code,desc33);
  component.ReasonDescription(desc34.code,desc34);
  component.ReasonDescription(desc35.code,desc35);
  component.ReasonDescription(desc36.code,desc36);
  component.ReasonDescription(desc37.code,desc37);
  component.ReasonDescription(desc38.code,desc38);
  component.ReasonDescription(desc39.code,desc39);
  component.ReasonDescription(desc40.code,desc40);
  component.ReasonDescription(desc41.code,desc41);
  component.ReasonDescription(desc42.code,desc42);
  component.ReasonDescription(desc43.code,desc43);
  component.ReasonDescription(desc44.code,desc44);
  component.ReasonDescription(desc45.code,desc45);
  component.ReasonDescription(desc46.code,desc46);
  sessionStorage.setItem(`calix.deviceData`,JSON.stringify(devicedatamock))
  fixture.detectChanges();
})

// it('routeforbutton', () => {
// component.routeforbutton(desc);
// fixture.detectChanges();
// })

it('responseFromStatus', () => {
  component.responseFromStatus(true);
  window.localStorage.setItem('calix.entitlements',JSON.stringify(entitle));
  fixture.detectChanges();
})

it('sort', () => {
    component.sort();
    component.issueList=issuedatamock;
    // fixture.detectChanges();
})
});
