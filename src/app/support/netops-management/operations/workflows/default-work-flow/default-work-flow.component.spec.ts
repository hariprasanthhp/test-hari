import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NetopsServiceService } from '../../../netops-management.service';

import { DefaultWorkFlowComponent } from './default-work-flow.component';

describe('DefaultWorkFlowComponent', () => {
  let component: DefaultWorkFlowComponent;
  let fixture: ComponentFixture<DefaultWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultWorkFlowComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, FormsModule, ReactiveFormsModule, CalendarModule, NgSelectModule],
      providers: [TranslateService, NetopsServiceService, SsoAuthService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
