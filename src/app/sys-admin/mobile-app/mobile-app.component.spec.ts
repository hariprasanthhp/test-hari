import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';

import { MobileAppComponent } from './mobile-app.component';

describe('MobileAppComponent', () => {
  let component: MobileAppComponent;
  let fixture: ComponentFixture<MobileAppComponent>;
  let router: Router;
  let service: OrganizationApiService;
  let languageService: TranslateService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [CommonService, SsoAuthService, OrganizationApiService, SsoAuthService, TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(OrganizationApiService)
    languageService = TestBed.inject(TranslateService)
    httpController = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
      expect(component.language).toBe(data)
    })
    component.ngOnInit()
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
