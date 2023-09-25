import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ProtectIqTrustedListComponent } from './protect-iq-trusted-list.component';
import { SupportApplicationModule } from '../../support-application.module';
import { ProtectIqNewRoutingModule } from '../protect-iq-new-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProtectIqService } from '../../shared/service/protect-iq.service';
import { of, throwError } from 'rxjs';
import { trusted_list_res } from 'src/assets/mockdata/support/edge-suites/protectIQ';
import { HttpResponse } from '@angular/common/http';
import { errorStatus503 } from 'src/assets/mockdata/shared/error.data';
import { EnglishJSON } from 'src/assets/language/english.service';
import { TranslateService } from 'src/app-services/translate.service';

describe('ProtectIqTrustedListComponent', () => {
  let component: ProtectIqTrustedListComponent;
  let fixture: ComponentFixture<ProtectIqTrustedListComponent>;

  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let protectIqservices: ProtectIqService;
  let translateService: TranslateService;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/support/application/protect-iq/trusted-list' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectIqTrustedListComponent ],
      imports: [
        ProtectIqNewRoutingModule,
        SupportApplicationModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        ProtectIqService,
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ProtectIqTrustedListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
      httpTestingController = TestBed.inject(HttpTestingController);
      protectIqservices = TestBed.inject(ProtectIqService);
      translateService = TestBed.inject(TranslateService);

      fixture.detectChanges();

    })
  });


  it('OnInit and showTrustList success test case', fakeAsync(() => {
    let response = new HttpResponse({body: trusted_list_res})
    spyOn(protectIqservices,'getTrustList').and.returnValue(of(response))
    component.isLatestVersion = true;
    component.userId = '4b9aecc3-b6e5-413c-8d31-a46c1bcd126f';
    component.trustListDetails = trusted_list_res;
    fixture.detectChanges();
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    flush(2000)
    expect(component).toBeTruthy();
  }));

  it('showTrustList error handling test case', fakeAsync(() => {
    spyOn(protectIqservices,'getTrustList').and.returnValue(throwError(errorStatus503))
    component.userId = '4b9aecc3-b6e5-413c-8d31-a46c1bcd126f';
    component.trustListDetails = trusted_list_res;
    fixture.detectChanges();
    component.ngOnInit();
    flush(2000)
    expect(component).toBeTruthy();
  }));

  it('showTrustList error handling test case with type All', fakeAsync(() => {
    spyOn(protectIqservices,'getTrustList').and.returnValue(throwError(errorStatus503))
    component.userId = '4b9aecc3-b6e5-413c-8d31-a46c1bcd126f';
    component.trustListDetails = trusted_list_res;
    fixture.detectChanges();
    component.showTrustList(true);
    flush(2000)
    expect(component).toBeTruthy();
  }));

  it('deleteWhiteListItem success case', fakeAsync(() => {
    spyOn(protectIqservices,'removeItemInTrustList').and.returnValue(of({
      "type": "Buffer",
      "data": []
    }))
    component.userId = '4b9aecc3-b6e5-413c-8d31-a46c1bcd126f';
    component.trustListDetails = trusted_list_res;
    fixture.detectChanges();
    component.deleteWhiteListItem({
      "signatureId": "1020000010120",
      "msg": "malware.wicar.org/data/ms14_064_ole_xp.html",
      "type": "WG",
      "created": 1687786093350
    });
    flush(2000)
    expect(component).toBeTruthy();
  }));

  it('deleteWhiteListItem error case', fakeAsync(() => {
    spyOn(protectIqservices,'removeItemInTrustList').and.returnValue(throwError(errorStatus503))
    component.userId = '4b9aecc3-b6e5-413c-8d31-a46c1bcd126f';
    component.trustListDetails = trusted_list_res;
    fixture.detectChanges();
    component.deleteWhiteListItem({
      "signatureId": "1020000010120",
      "msg": "malware.wicar.org/data/ms14_064_ole_xp.html",
      "type": "WG",
      "created": 1687786093350
    });
    flush(2000)
    expect(component).toBeTruthy();
  }));

  it('selectedTab primary-network case', fakeAsync(() => {
    component.selectedTab("primary-network");
    flush(20)
    expect(component).toBeTruthy();
  }));

  it('selectedTab staff-network case', fakeAsync(() => {
    component.selectedTab("staff-network");
    flush(20)
    expect(component).toBeTruthy();
  }));

  it('selectedTab customer-portal case', fakeAsync(() => {
    component.selectedTab("customer-portal");
    flush(20)
    expect(component).toBeTruthy();
  }));

  it('selectedTab point-of-sale case', fakeAsync(() => {
    component.selectedTab("point-of-sale");
    flush(20)
    expect(component).toBeTruthy();
  }));
});
