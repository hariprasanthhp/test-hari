import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutliersWorkflowComponent } from './outliers-workflow.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OutlierWorkflowService } from './outlier-workflow.service';

describe('OutliersWorkflowComponent', () => {
  let component: OutliersWorkflowComponent;
  let fixture: ComponentFixture<OutliersWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutliersWorkflowComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { params: { type: "" } },
          }
        }, OutlierWorkflowService
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OutliersWorkflowComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
