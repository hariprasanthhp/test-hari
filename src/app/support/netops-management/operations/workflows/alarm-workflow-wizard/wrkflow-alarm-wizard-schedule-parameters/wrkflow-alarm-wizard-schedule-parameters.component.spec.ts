import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';

import { WrkflowAlarmWizardScheduleParametersComponent } from './wrkflow-alarm-wizard-schedule-parameters.component';

describe('WrkflowAlarmWizardScheduleParametersComponent', () => {
  let component: WrkflowAlarmWizardScheduleParametersComponent;
  let fixture: ComponentFixture<WrkflowAlarmWizardScheduleParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrkflowAlarmWizardScheduleParametersComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, FormsModule, NgSelectModule],
      providers: [TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrkflowAlarmWizardScheduleParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
