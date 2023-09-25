import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { MarketingCampaignTSComponent } from './marketing-campaign-ts.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MarketingCampaignDefineApiService } from '../shared/services/marketing-campaign-define-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { Subject, of, throwError } from 'rxjs';

describe('MarketingCampaignTSComponent', () => {
  let component: MarketingCampaignTSComponent;
  let fixture: ComponentFixture<MarketingCampaignTSComponent>;
  let marketingHomeApiService: jasmine.SpyObj<MarketingHomeApiService>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;
  let sanitizerSpy = jasmine.createSpyObj('Domsanitizer', ['bypassSecurityTrustResourceUrl']);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingCampaignTSComponent ],
      imports: [RouterTestingModule,HttpClientModule,HttpClientTestingModule],
      providers:[HttpClient,SsoAuthService,DomSanitizer,MarketingCommonService,TranslateService,
        {
          provide: MarketingHomeApiService, useValue: {
            getTsAuthToken: () => (of({}))
          },
        },
        {
          provide: MarketingCampaignDefineApiService, useValue: {
            savedSegmentSubject: of({})
          }
        },
        { provide: DomSanitizer, useValue: sanitizerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingCampaignTSComponent);
    component = fixture.componentInstance;
    marketingHomeApiService = TestBed.inject(MarketingHomeApiService) as jasmine.SpyObj<MarketingHomeApiService>;
    sanitizer = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
    fixture.detectChanges();
    component.qlikTicketSubject = new Subject();
    component.savedSegmentSubject = new Subject();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split error text into ticketId and ticketIdUser when it contains "~~"', (done) => {
    const errorResponse = { error: { text: '123~~456' } };
    spyOn(marketingHomeApiService, 'getTsAuthToken').and.returnValue(throwError(errorResponse));

    component.qlikTicketURL().then((result) => {
      spyOn(component, 'formFrameUrl');
      expect(component.ticketId).toBe('123');
      expect(component.ticketIdUser).toBe('456');
      expect(result).toBe(errorResponse.error.text);
      done();
    });
  });

  it('should set ticketId when error text does not contain "~~"', (done) => {
    const errorResponse = { error: { text: '123' } };
    spyOn(marketingHomeApiService, 'getTsAuthToken').and.returnValue(throwError(errorResponse));

    component.qlikTicketURL().then((result) => {
      spyOn(component, 'formFrameUrl');
      expect(component.ticketId).toBe('123');
      expect(component.ticketIdUser).toBe('');
      expect(result).toBe(errorResponse.error.text);
      done();
    });
  });

  it('should form iframeUrl correctly', () => {
    component.baseUrl_TS = 'http://example.com/';
    component.Ts_TokenURL = 'tokenUrl';
    component.ticketId = '123';
    component.ticketIdUser = '456';
    component.Ts_RedirectUrl = 'http://redirect.com';

    const expectedUrl = 'http://example.com/tokenUrl?auth_token=123&username=456&redirect_url=http://redirect.com/campaign?';

    component.formFrameUrl();

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(expectedUrl);

    let res = {location:'location', region:'region',serviceTier:'serviceTier',propensity:'propensity',zipPlusFour:'zipPlusFour',zipcode:'zipcode'};
    (component as any).marketingCampaignDefineApiService.savedSegmentSubject = of(res);
    component.formFrameUrl();
  });

  it('should call refreshIframe', fakeAsync(() => {
    component.refreshIframe();
    setTimeout(() => {
      component.isRefreshing = false;
    },50)
    flush(50);
  }));

  it('should call resizeIframe', () => {
    let obj = {style:{height:''},contentWindow:{document:{documentElement:{scrollHeight:5}}}}
    component.resizeIframe(obj);
  });
});
