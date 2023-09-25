import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecepientsComponent } from './recepients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonWorkflowService } from '../common-workflow.service';
import { Subject, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RecepientsComponent', () => {
  let component: RecepientsComponent;
  let fixture: ComponentFixture<RecepientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepientsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, CommonWorkflowService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(RecepientsComponent);
        component = fixture.componentInstance;
        (component as any).commonWorkflowService = { tabChanged$: new Subject() };
        component.dynamicFields = [{ key: 'emailRecipients', required: true }, { key: 'webhooks', required: false }, { key: 'sms', required: true }]
      });
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
