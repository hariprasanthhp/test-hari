import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceProfilesComponent } from './service-profiles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Subject } from 'rxjs';

describe('ServiceProfilesComponent', () => {
  let component: ServiceProfilesComponent;
  let fixture: ComponentFixture<ServiceProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProfilesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            getScopes: () => { "cloud.rbac.coc.services.serviceprofiles" }
          }
        },
        {
          provide: Router, useValue: {
            routeReuseStrategy: { shouldReuseRoute: () => false },
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ServiceProfilesComponent);
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
