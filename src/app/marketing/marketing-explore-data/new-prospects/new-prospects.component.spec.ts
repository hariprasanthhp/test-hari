import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { NewProspectsComponent } from './new-prospects.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewProspectsComponent', () => {
  let component: NewProspectsComponent;
  let fixture: ComponentFixture<NewProspectsComponent>;
  let ssoAuthService: jasmine.SpyObj<SsoAuthService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProspectsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule],
      providers:[HttpClient, SsoAuthService,
      { provide: TranslateService, useClass: CustomTranslateService },
      {
        provide: ssoAuthService, useValue: {
          getQlikTOkenByAppType: () => (of({})),
          getEntitlements: () => (of({}))
        }
      },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProspectsComponent);
    component = fixture.componentInstance;
    ssoAuthService = TestBed.inject(SsoAuthService) as jasmine.SpyObj<SsoAuthService>;
  });

  it('should load data', () => {
    fixture.detectChanges();
    (component as any).translateService.selectedLanguage = of([]);
  });

  it('should call qlikTicketURL', () => {
    let entitlement = {201:{appType:201}};
    let cmcType = !entitlement['209'] ? 'CMC' : 'CMC-Pro';
    let res = {Ticket:'123'}
    spyOn((<any>component).ssoAuthService,'getQlikTOkenByAppType').and.returnValue(of(res));
    spyOn(component,'formFrameUrl');
    component.qlikTicketURL();
    expect((component as any).ssoAuthService.getQlikTOkenByAppType).toHaveBeenCalledWith(cmcType);
  });

  it('should form iframeUrl correctly', () => {
    const expectedUrl = 'http://example.com/tokenUrl?auth_token=123&username=456&redirect_url=http://redirect.com/cmc_prospects?segment_id=789';

    component.formFrameUrl();
  });

  it('should call resizeIframe', () => {
    let iFrameID = document.getElementById('prospect-iframe');
    component.counter = false;
    console.log("__________________________________________",iFrameID)
    component.resizeIframe({});
  });

  it('should call refreshIframe', fakeAsync(() => {
    component.refreshIframe();
    setTimeout(() => {
      component.isRefreshing = false;

    },100)
    flush(100);
  }));
});
