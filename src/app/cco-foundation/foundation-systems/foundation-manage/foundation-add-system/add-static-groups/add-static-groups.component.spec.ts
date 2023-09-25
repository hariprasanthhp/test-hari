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

import { AddStaticGroupsComponent } from './add-static-groups.component';

describe('AddStaticGroupsComponent', () => {
  let component: AddStaticGroupsComponent;
  let fixture: ComponentFixture<AddStaticGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStaticGroupsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService,
        NgbModal,
        FoundationManageService,
        CommonService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaticGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
