import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingCampaignsSummaryComponent } from './marketing-campaigns-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MarketingCampaignsSummaryComponent', () => {
  let component: MarketingCampaignsSummaryComponent;
  let fixture: ComponentFixture<MarketingCampaignsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingCampaignsSummaryComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [{
        provide: MarketingCampaignDefineApiService, useValue: {
          savedSegmentSubject: of({ segmentType: 'Acquisition' }),
        }
      },
      { provide: TranslateService, useClass: CustomTranslateService },

      {
        provide: MarketingCommonService, useValue: {
          extraParamsAssignerForQlik: jasmine.createSpy().and.returnValue('www.elite.in'),
        }
      },
      {
        provide: SsoAuthService, useValue: {
          getEntitlements: jasmine.createSpy().and.returnValue({ '209': 'test' }),
          getQlikTOkenByAppType: jasmine.createSpy().and.returnValue(of(
            { Ticket: 'test' })),
        }
      },
      {
        provide: DomSanitizer, useValue: {
          bypassSecurityTrustResourceUrl: jasmine.createSpy().and.returnValue('www.calix.com'),
        }
      },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MarketingCampaignsSummaryComponent);
        component = fixture.componentInstance;
      });
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange 
    spyOn(component, 'qlikTicketURL');
    //componentformFrameUrl
    //act
    fixture.detectChanges();
    //assert
    expect(component.qlikTicketURL).toHaveBeenCalled();
  });



  it('should get qlikTicketURL', () => {
    //arrange
    spyOn(component, 'formFrameUrl');
    //act
    component.qlikTicketURL();
    //assert
    expect((component as any).ssoAuthService.getQlikTOkenByAppType).toHaveBeenCalledOnceWith('CMC-Pro');
    expect(component.formFrameUrl).toHaveBeenCalled()
  });

  it('should get formFrameUrl', () => {
    //arrange
    (component as any).marketingCampaignDefineApiService.savedSegmentSubject = of({ segmentType: 'Acquisition' });

    //act
    component.formFrameUrl();

    //assert
    expect(component.pocURL).toEqual('www.elite.in');
    expect(component.Url).toEqual('www.calix.com');
  });

  it('should call refreshIframe', () => {
    component.refreshIframe();  
  });
});
