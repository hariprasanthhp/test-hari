import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationHomeService } from 'src/app/cco-foundation/foundation-home/foundation-home.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CcochartService } from '../health/pon-utilization/service/ccochart.service';
import { ActiveissueComponent } from '../issues/active-reports/activeissue/activeissue.component';
import { SystemTableViewComponent } from '../system/cco-network-system/system-table-view/system-table-view.component';

import { CcoHomeComponent } from './cco-home.component';
import { DataService } from './services/data.service';
import { HomeChartOptionsService } from './services/home-chart-options.service';

describe('CcoHomeComponent', () => {
  let component: CcoHomeComponent;
  let fixture: ComponentFixture<CcoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoHomeComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/issues/active-reports', component: ActiveissueComponent },
          { path: 'cco/system/cco-network-system/system-table-view', component: SystemTableViewComponent }
        ]),
        HttpClientTestingModule
      ],
      providers: [TranslateService, DataService, SsoAuthService, HomeChartOptionsService, FoundationHomeService, CcochartService, DateUtilsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
