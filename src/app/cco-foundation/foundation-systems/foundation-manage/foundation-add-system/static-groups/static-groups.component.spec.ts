import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FoundationManageService } from '../../foundation-manage.service';

import { StaticGroupsComponent } from './static-groups.component';

describe('StaticGroupsComponent', () => {
  let component: StaticGroupsComponent;
  let fixture: ComponentFixture<StaticGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaticGroupsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService,
        NgbModal,
        FoundationManageService,
        CommonService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
