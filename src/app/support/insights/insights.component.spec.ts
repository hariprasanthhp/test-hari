import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';

import { InsightsComponent } from './insights.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MarketingRoutingsService } from 'src/app/marketing/shared/services/marketing-routings.service';
import { MarketingInsightsChartServiceService } from 'src/app/shared-utils/marketing-insights/marketing-insights-chart-service.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingInsightspplicationApiService } from 'src/app/shared-utils/marketing-insights/marketing-insights-application-api.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { MarketingCommonService } from 'src/app/marketing/shared/services/marketing-common.service';
import { DownloadFileNameService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/download-file-name.service';
import { MarketingExploreDataDownloadDataService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-download.service';
import { ExportDataChartOptionsService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/explore-data-chart-options.service';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingExploreDataAssignerService } from 'src/app/marketing/marketing-explore-data/basic/shared/services/data-assigners.service';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsightsComponent],
      imports: [SharedUtilsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClient, MarketingRoutingsService, MarketingInsightsChartServiceService, TranslateService, MarketingInsightspplicationApiService, MarketingExploreDataAssignerService,
        MarketingExploreDataDownloadDataService, DownloadFileNameService, ExportExcelService
        , ExportDataChartOptionsService, Location, Title, SsoAuthService, MarketingCommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
