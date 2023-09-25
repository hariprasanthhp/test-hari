import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CcoSystemSearchComponent } from './cco-system-search.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

describe('CcoSystemSearchComponent', () => {
  let component: CcoSystemSearchComponent;
  let fixture: ComponentFixture<CcoSystemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoSystemSearchComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            getScopes: () => "",
            getOrgId: () => "",
            getEntitlements: () => "",
          }
        }, FormBuilder

      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CcoSystemSearchComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
