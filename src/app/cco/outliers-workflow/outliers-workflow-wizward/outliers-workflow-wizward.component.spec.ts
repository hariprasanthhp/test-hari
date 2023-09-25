import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutliersWorkflowWizwardComponent } from './outliers-workflow-wizward.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

describe('OutliersWorkflowWizwardComponent', () => {
  let component: OutliersWorkflowWizwardComponent;
  let fixture: ComponentFixture<OutliersWorkflowWizwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutliersWorkflowWizwardComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutliersWorkflowWizwardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
