import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingChannelConstantComponent } from './marketing-channel-constant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

describe('MarketingChannelConstantComponent', () => {
  let component: MarketingChannelConstantComponent;
  let fixture: ComponentFixture<MarketingChannelConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingChannelConstantComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [{
        provide: HttpClient, useValue: {
          post: jasmine.createSpy().and.returnValue(of({ status: 'valid' })),
          get: jasmine.createSpy().and.returnValue(of({ status: 'active' })),
        }
      },
      {
        provide: SsoAuthService, useValue: {
          getOrgId: jasmine.createSpy().and.returnValue(''),
          setValidConstantAuth: jasmine.createSpy(),
          setValidMailChimpAuth: jasmine.createSpy(),

        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingChannelConstantComponent);
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
    // expect(router.navigate).toHaveBeenCalledWith(['/marketing/channels/constant']);
    expect(component.validConstantContactToken).toBeTruthy();
    expect((component as any).sso.setValidConstantAuth).toHaveBeenCalledOnceWith(true);
    expect(component.mailchimpStatus).toEqual('valid');
  });
  it('should get marketing channel authorization', () => {
    //arrange
    //act
    component.getMrktngChnlAuth();
    //assert
    expect(component.validConstantContactToken).toBeTruthy();
    expect((component as any).sso.setValidMailChimpAuth).toHaveBeenCalledOnceWith(true);
    expect(component.mailchimpStatus).toEqual('active');
  });
});
