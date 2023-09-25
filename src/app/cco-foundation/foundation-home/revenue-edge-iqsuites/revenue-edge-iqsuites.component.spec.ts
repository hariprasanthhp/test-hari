import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home.service';
import { HomeChartOptionsService } from '../home-chart-options.service';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { RevenueEdgeIQsuitesComponent } from './revenue-edge-iqsuites.component';

describe('RevenueEdgeIQsuitesComponent', () => {
  let component: RevenueEdgeIQsuitesComponent;
  let fixture: ComponentFixture<RevenueEdgeIQsuitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueEdgeIQsuitesComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[TranslateService,
        DataService,
        HomeChartOptionsService,
        DateUtilsService,
        FoundationHomeService,
        SsoAuthService,
        CcoHomeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueEdgeIQsuitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
