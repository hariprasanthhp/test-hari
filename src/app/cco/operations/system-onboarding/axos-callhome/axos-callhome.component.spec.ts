import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxosCallhomeComponent } from './axos-callhome.component';
import { Subject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('AxosCallhomeComponent', () => {
  let component: AxosCallhomeComponent;
  let fixture: ComponentFixture<AxosCallhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AxosCallhomeComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            isMenuActive: () => true,
            getScopes: () => "cloud.rbac.coc.operations.systemonboarding.axoscallhome"
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AxosCallhomeComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
