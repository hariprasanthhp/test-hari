import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceExplorerProComponent } from './advance-explorer-pro.component';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MarketingHomeApiService } from '../../marketing-home/marketing-home-Apiservice';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdvanceExplorerProComponent', () => {
  let component: AdvanceExplorerProComponent;
  let fixture: ComponentFixture<AdvanceExplorerProComponent>;
  let marketingHomeApiService: jasmine.SpyObj<MarketingHomeApiService>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;
  let sanitizerSpy = jasmine.createSpyObj('Domsanitizer', ['bypassSecurityTrustResourceUrl']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceExplorerProComponent],
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClient, DomSanitizer, SsoAuthService, Title,
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: MarketingHomeApiService, useValue: {
            getTsAuthToken: () => (of({}))
          }
        },
        { provide: DomSanitizer, useValue: sanitizerSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AdvanceExplorerProComponent);
        component = fixture.componentInstance;
        marketingHomeApiService = TestBed.inject(MarketingHomeApiService) as jasmine.SpyObj<MarketingHomeApiService>;
        sanitizer = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;

      });
  });

  it('should create', () => {
    (component as any).translateService.selectedLanguage = of([]);
    fixture.detectChanges();
    expect(component.language).toEqual([]);
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
    component.segmentId = '789';

    const expectedUrl = 'http://example.com/tokenUrl?auth_token=123&username=456&redirect_url=http://redirect.com/cmc_prospects?segment_id=789';

    component.formFrameUrl();

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(expectedUrl);
  });
});
