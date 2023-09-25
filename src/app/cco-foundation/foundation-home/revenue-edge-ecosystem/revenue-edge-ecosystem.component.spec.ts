import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { HomeChartOptionsService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home.service';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { RevenueEDGEEcosystemComponent } from './revenue-edge-ecosystem.component';

describe('RevenueEDGEEcosystemComponent', () => {
  let component: RevenueEDGEEcosystemComponent;
  let fixture: ComponentFixture<RevenueEDGEEcosystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenueEDGEEcosystemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TranslateService, DataService,
        HomeChartOptionsService,
        DateUtilsService,
        FoundationHomeService,
        SsoAuthService,
        CcoHomeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueEDGEEcosystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
