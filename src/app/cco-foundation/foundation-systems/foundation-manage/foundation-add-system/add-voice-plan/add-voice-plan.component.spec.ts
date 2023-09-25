import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { UriValidatorService } from 'src/app/shared/services/uri-validator.service';

import { AddVoicePlanComponent } from './add-voice-plan.component';

describe('AddVoicePlanComponent', () => {
  let component: AddVoicePlanComponent;
  let fixture: ComponentFixture<AddVoicePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVoicePlanComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, CommonFunctionsService, UriValidatorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoicePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
