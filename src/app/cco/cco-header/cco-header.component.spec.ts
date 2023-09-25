import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { IssuesComponent } from 'src/app/support/support-overview/issues/issues.component';
import { CcoSystemSearchComponent } from '../cco-system-search/cco-system-search.component';
import { CcoCommonService } from '../shared/services/cco-common.service';
import { SelectedSystemDetailsComponent } from '../system/cco-subscriber-system/selected-system-details/selected-system-details.component';

import { CcoHeaderComponent } from './cco-header.component';

describe('CcoHeaderComponent', () => {
  let component: CcoHeaderComponent;
  let fixture: ComponentFixture<CcoHeaderComponent>;

  let translateService: TranslateService;
  let router: Router;
  let ssoService: SsoAuthService;
  let changeDetect: ChangeDetectorRef;
  let ccoService: CcoCommonService;
  let dataService: DataServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco-foundation/foundation-systems/foundation-manage/system-details', component: SelectedSystemDetailsComponent },
          { path: 'cco/search-system-list', component: CcoSystemSearchComponent },
          { path: 'cco/overview', component: IssuesComponent }
        ]),
        HttpClientTestingModule, SharedUtilsModule],
        
      declarations: [CcoHeaderComponent],
      providers: [
        TranslateService, SsoAuthService, ChangeDetectorRef, CcoCommonService, DataServiceService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
