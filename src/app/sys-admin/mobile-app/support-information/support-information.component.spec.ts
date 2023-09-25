import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { WhitelabelService } from 'src/app/shad/service/whitelabel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { OrganizationApiService } from '../../services/organization-api.service';
import { SupportInformationComponent } from './support-information.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SupportInformationComponent', () => {
  let component: SupportInformationComponent;
  let fixture: ComponentFixture<SupportInformationComponent>;
  let router: Router;
  let service: WhitelabelService;
  let languageService: TranslateService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportInformationComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CommonService, SsoAuthService, OrganizationApiService, Title, ValidatorService, NgbModal, TranslateService, WhitelabelService]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportInformationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(WhitelabelService)
    languageService = TestBed.inject(TranslateService)
    httpController = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

    it('should initialize onInit()', () => {
      spyOn(component, 'getSupportInfo').and.callThrough();
      component.ngOnInit();
    //  expect(component.getSupportInfo).toHaveBeenCalled();
    fixture.detectChanges();

    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
