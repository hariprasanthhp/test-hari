import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { AddDetailsComponent } from './add-details.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { of, Subject } from 'rxjs';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { AddSubscriberService } from '../add-subscriber.service';

describe('AddDetailsComponent', () => {
  let component: AddDetailsComponent;
  let fixture: ComponentFixture<AddDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, DataTablesModule, FormsModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: CommonService, useValue: {
            validatePhoneNumber: () => true,
          }
        },
        {
          provide: AddSubscriberService
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddDetailsComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
        component.subscriberForm = new FormGroup({ 'fccSubscriberId': new FormControl('') });
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
