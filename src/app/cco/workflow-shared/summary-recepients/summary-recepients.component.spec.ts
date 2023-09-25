import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRecepientsComponent } from './summary-recepients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SummaryRecepientsComponent', () => {
  let component: SummaryRecepientsComponent;
  let fixture: ComponentFixture<SummaryRecepientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryRecepientsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRecepientsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
