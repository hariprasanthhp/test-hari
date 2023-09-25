import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { IssuesComponent } from './issues.component';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            triggerToggle: () => { },
            hasPageAccess$: of({ access: true }),
            getScopes: () => ({ 'cloud.rbac.coc.issues.current': 1 })
          }
        },
        {
          provide: Router, useValue: {
            routeReuseStrategy: { shouldReuseRoute: () => false },
            url: ""
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(IssuesComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ngOnDestroy', () => {
    //arrange
    component.languageSubject = { unsubscribe: () => { } };
    component.pageAcceesObs = { unsubscribe: () => { } };
    spyOn(component.pageAcceesObs, 'unsubscribe');
    spyOn(component.languageSubject, 'unsubscribe');
    //act
    component.ngOnDestroy();
    //assert
    expect(component.pageAcceesObs.unsubscribe).toHaveBeenCalled();
    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
  });
});
