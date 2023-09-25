import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../../../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { OntCategoryConfigurationService } from '../../ont-category-configuration.service';
import { ProfileService } from '../../profile.service';

import { ProcessComponent } from './process.component';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, ReactiveFormsModule, FormsModule, NgSelectModule
      ],
      providers: [
        TranslateService, SubscriberService, CommonService, FormBuilder, ProfileService, OntCategoryConfigurationService, 
        Title,  NgbModal, CcoOrgAdminService, SsoAuthService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //process 
  //  it('on type change', () => {
  //   spyOn(component, 'ontypechange').and.callThrough();
  //   expect(component.ontypechange).toHaveBeenCalled();
  // });
  
});
