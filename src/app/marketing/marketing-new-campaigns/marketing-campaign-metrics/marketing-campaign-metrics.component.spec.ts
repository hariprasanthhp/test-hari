import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCampaignMetricsComponent } from './marketing-campaign-metrics.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { TranslateService } from 'src/app-services/translate.service';

describe('MarketingCampaignMetricsComponent', () => {
  let component: MarketingCampaignMetricsComponent;
  let fixture: ComponentFixture<MarketingCampaignMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingCampaignMetricsComponent ],
      providers: [Router,
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingCampaignMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    (component as any).translateService.selectedLanguage = of([]);
  });
});
