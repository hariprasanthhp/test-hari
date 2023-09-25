import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrchestrationComponent } from './orchestration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('OrchestrationComponent', () => {
  let component: OrchestrationComponent;
  let fixture: ComponentFixture<OrchestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrchestrationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            hasPageAccess$: of({ access: true }),
            getScopes: () => ""
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
        fixture = TestBed.createComponent(OrchestrationComponent);
        component = fixture.componentInstance;
        component.pageAcceesObs = new Subject();
        component.languageSubject = new Subject();
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ngOnDestroy', () => {
    //arrange
    spyOn(component.pageAcceesObs, 'unsubscribe');
    spyOn(component.languageSubject, 'unsubscribe');
    //act
    component.ngOnDestroy();
    //assert
    expect(component.pageAcceesObs.unsubscribe).toHaveBeenCalled();
    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
  });
});
