import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataPlanItem, serviceProvisioned } from 'src/assets/mockdata/Foundation/system/systemDetails';
import { AddSubscriberService } from '../add-subscriber.service';

import { AddServicesComponent } from './add-services.component';

describe('AddServicesComponent', () => {
  let component: AddServicesComponent;
  let fixture: ComponentFixture<AddServicesComponent>;
  let translateService: TranslateService;
  let router: Router;
  let ssoService: SsoAuthService;
  let commonOrgService: CommonService;
  let commonFunc: CommonFunctionsService;
  let uriValidate: UriValidatorService;
  let systemService: AddSubscriberService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServicesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, CommonFunctionsService, SsoAuthService, CommonService, UriValidatorService, AddSubscriberService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('videoServiceInitialize', () => {
    component.sys_Service = serviceProvisioned
    component.videoInitialize();
    fixture.detectChanges();
  });
  it('dataServiceInitialize', () => {
    component.sys_Service = serviceProvisioned
    component.DataPlanItem = DataPlanItem
    component.dataInitialize();
    fixture.detectChanges();
  });
  it('voiceServiceInitialize', () => {
    component.sys_Service = serviceProvisioned
    component.voiceInitialize();
    fixture.detectChanges();
  });
  // it('setInitialData', () => {
  //   component.DataPlanItem =  DataPlanItem
  //   component.setInitialData();
  //   fixture.detectChanges();
  // });







});
