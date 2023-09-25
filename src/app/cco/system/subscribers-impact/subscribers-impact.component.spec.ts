import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribersImpactComponent } from './subscribers-impact.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { AddSubscriberService } from '../cco-subscriber-system/add-service-system/add-subscriber.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('SubscribersImpactComponent', () => {
  let component: SubscribersImpactComponent;
  let fixture: ComponentFixture<SubscribersImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscribersImpactComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [FormBuilder, SsoAuthService, HttpClient, DataServiceService, NgbModal, AddSubscriberService, CommonService, Title,
        { provide: TranslateService, useClass: CustomTranslateService }

      ]
    })
      .compileComponents().then(() => {
        // fixture = TestBed.createComponent(SubscribersImpactComponent);
        // component = fixture.componentInstance;
        // component.languageSubject = new Subject();
      });

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
