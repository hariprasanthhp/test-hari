import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAudienceHistoryComponent } from './marketing-audience-history.component';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of } from 'rxjs';

describe('MarketingAudienceHistoryComponent', () => {
  let component: MarketingAudienceHistoryComponent;
  let fixture: ComponentFixture<MarketingAudienceHistoryComponent>;

  beforeEach(async () =>
   {
    await TestBed.configureTestingModule({
      declarations: [ MarketingAudienceHistoryComponent ],
      providers: [Router,
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingAudienceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    (component as any).translateService.selectedLanguage = of([]);
  });
});
