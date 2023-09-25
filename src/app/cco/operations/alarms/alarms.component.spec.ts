import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmsComponent } from './alarms.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { of } from 'rxjs';

describe('AlarmsComponent', () => {
  let component: AlarmsComponent;
  let fixture: ComponentFixture<AlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        , {
          provide: SsoAuthService, useValue: {
            getScopes: () => { "cloud.rbac.coc.operations.alarms" },
            hasPageAccess$: of({ access: true }),
          }
        },
        {
          provide: Router, useValue: {
            routeReuseStrategy: { shouldReuseRoute: () => false }
          },
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AlarmsComponent);
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
