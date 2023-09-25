import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from '../foundation-systems/foundation-manage/foundation-manage.service';

import { SubscribersSystemsListComponent } from './subscribers-systems-list.component';

describe('SubscribersSystemsListComponent', () => {
  let component: SubscribersSystemsListComponent;
  let fixture: ComponentFixture<SubscribersSystemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersSystemsListComponent ],
      imports:[HttpClientTestingModule
, RouterTestingModule],
      providers:[TranslateService,SsoAuthService,
      CommonFunctionsService,
      NgbModal,
      CcoCommonService,
      CommonService,
      CcoSystemService,
      ExportExcelService,
      FoundationManageService,Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersSystemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
