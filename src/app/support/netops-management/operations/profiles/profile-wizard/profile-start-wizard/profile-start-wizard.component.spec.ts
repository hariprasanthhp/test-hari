import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { ProfileStartWizardComponent } from './profile-start-wizard.component';

describe('ProfileStartWizardComponent', () => {
  let component: ProfileStartWizardComponent;
  let fixture: ComponentFixture<ProfileStartWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileStartWizardComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService, FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStartWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
