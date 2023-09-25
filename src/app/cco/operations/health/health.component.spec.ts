import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthComponent } from './health.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('HealthComponent', () => {
  let component: HealthComponent;
  let fixture: ComponentFixture<HealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            hasPageAccess$: of({ access: true }),
            getScopes: () => ({ "cloud.rbac.coc.operations.health": 1 })
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
        fixture = TestBed.createComponent(HealthComponent);
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
