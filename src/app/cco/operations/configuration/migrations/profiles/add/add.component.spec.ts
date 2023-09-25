import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            getOrgId: () => "11"
          }
        }, {
          provide: ActivatedRoute, useValue: {
            queryParams: () => { smpId: "121" },
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => { },
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
