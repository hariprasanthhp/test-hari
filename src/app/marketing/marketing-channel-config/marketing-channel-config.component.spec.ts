import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingChannelConfigComponent } from './marketing-channel-config.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

describe('MarketingChannelConfigComponent', () => {
  let component: MarketingChannelConfigComponent;
  let fixture: ComponentFixture<MarketingChannelConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingChannelConfigComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of({ status: 'active' })),
            post: jasmine.createSpy().and.returnValue(of({ status: 'success' })),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            setValidMailChimpAuth: jasmine.createSpy(),
            getOrgId: jasmine.createSpy(),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingChannelConfigComponent);
        component = fixture.componentInstance;
      });
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //arrange 
    spyOn((component as any).route.queryParams, 'subscribe');
    //act
    fixture.detectChanges();
    //assert
    expect((component as any).route.queryParams.subscribe).toHaveBeenCalled();
  });

  it('should get MailChimp Token', () => {
    //arrange
    spyOn((component as any).router,'navigate');
    //act
    component.getMailChimpToken();
    //assert
    expect(component.validMailchimpToken).toBeTruthy();
    expect((component as any).sso.setValidMailChimpAuth).toHaveBeenCalledOnceWith(true);
    expect(component.mailchimpStatus).toEqual('success');
  });
  it('should get marketing channel authorization', () => {
    //arrange
    //act
    component.getMrktngChnlAuth();
    //assert
    expect(component.validMailchimpToken).toBeTruthy();
    expect((component as any).sso.setValidMailChimpAuth).toHaveBeenCalledOnceWith(true);
    expect(component.mailchimpStatus).toEqual('active');
  });
});
