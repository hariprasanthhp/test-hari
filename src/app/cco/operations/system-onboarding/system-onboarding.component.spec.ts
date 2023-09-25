import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOnboardingComponent } from './system-onboarding.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('SystemOnboardingComponent', () => {
  let component: SystemOnboardingComponent;
  let fixture: ComponentFixture<SystemOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemOnboardingComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            hasPageAccess$: of({ access: true }),
            getScopes: () => { "cloud.rbac.coc.operations.systemonboarding" }
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: Router, useValue: {
            routeReuseStrategy: { shouldReuseRoute: () => false },
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SystemOnboardingComponent);
        component = fixture.componentInstance;
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ngOnDestroy', () => {
    //arrange
    (component as any).pageAcceesObs = { unsubscribe: () => { } };
    (component as any).languageSubject = { unsubscribe: () => { } };
    //act
    component.ngOnDestroy();
    //assert
  });
});
