import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationHomeComponent } from 'src/app/cco-foundation/foundation-home/foundation-home.component';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationDataService } from '../../foundation-data.service';
import { FoundationManageModule } from '../foundation-manage.module';
import { FoundationManageService } from '../foundation-manage.service';
import { FoundationSystemListComponent } from '../foundation-system-list/foundation-system-list.component';
import { SelectedSystemDetailsComponent } from '../selected-system-details/selected-system-details.component';

import { FoundationAddSystemComponent } from './foundation-add-system.component';

describe('FoundationAddSystemComponent', () => {
  let component: FoundationAddSystemComponent;
  let fixture: ComponentFixture<FoundationAddSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundationAddSystemComponent],
      imports: [HttpClientTestingModule
        , RouterTestingModule.withRoutes([
          { path: 'cco-foundation/foundation-home', component: FoundationHomeComponent },
          { path: 'cco-foundation/foundation-systems/foundation-manage/system-details', component: SelectedSystemDetailsComponent },
          { path: '../foundation-system-list', component: FoundationSystemListComponent },
        ]), FoundationManageModule],
      providers: [TranslateService, SsoAuthService,
        FormBuilder,
        CcoCommonService,
        FoundationDataService,
        FoundationManageService,
        CommonService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationAddSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
