import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { MycommunityIqService } from '../services/mycommunity-iq.service';
import { of } from "rxjs";
import { MyCommunityIQComponent } from './my-community-iq.component';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ajax } from 'jquery';
const $: any = require('jquery');

describe('MyCommunityIQComponent', () => {
  let component: MyCommunityIQComponent;
  let fixture: ComponentFixture<MyCommunityIQComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCommunityIQComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, FormBuilder, NgbModal, SsoAuthService, Title, CommonService, MycommunityIqService, ValidatorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommunityIQComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
