import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { FormsModule } from '@angular/forms';
import { WorkflowDetailsComponent } from './workflow-details.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('WorkflowDetailsComponent', () => {
  let component: WorkflowDetailsComponent;
  let fixture: ComponentFixture<WorkflowDetailsComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({});
    const translateServiceStub = () => ({
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkflowDetailsComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(WorkflowDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
