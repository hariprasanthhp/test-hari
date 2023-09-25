import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceIqRestrictionsFormComponent } from './experience-iq-restrictions-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { ExperianceIQService } from 'src/app/support/support-application/shared/service/experiance-iq.service';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('ExperienceIqRestrictionsFormComponent', () => {
  let component: ExperienceIqRestrictionsFormComponent;
  let fixture: ComponentFixture<ExperienceIqRestrictionsFormComponent>;
  let experianceIQService: ExperianceIQService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceIqRestrictionsFormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, FormGroupDirective, ExperianceIQService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceIqRestrictionsFormComponent);
    component = fixture.componentInstance;
    experianceIQService = TestBed.inject(ExperianceIQService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
  });

  it('should load data - when API succeeds', () => {
    let categories = [
      {
        "cid": 121,
        "name": "Gambling"
      },
      {
        "cid": 151,
        "name": "Illegal & Criminal"
      }
    ];
    component.form = formBuilder.group({
      experienceIqForm: experianceIQService.getExperienceIqFormGroup()
    });
    spyOn(experianceIQService, 'getParentControlCategories').and.returnValue(of({ categories }));
    component.loadData();
  });

  it('should load data - when API succeeds', () => {
    spyOn(experianceIQService, 'getParentControlCategories').and.returnValue(throwError(errorStatus401));
    component.loadData();
  });

  it('should check crud functions functions', () => {
    component.form = formBuilder.group({
      experienceIqForm: experianceIQService.getExperienceIqFormGroup()
    });
    let website = formBuilder.group({
      webUrl: 'https://www.google.com',
      block: false
    });
    component.webListFormArray.push(website)

    // case 1: proper url
    component.form.get('experienceIqForm').patchValue({ website: 'https://www.youtube.com' });
    component.addWebsite();

    // case 2: no url
    component.form.get('experienceIqForm').patchValue({ website: '' });
    component.addWebsite();

    component.deleteWebsite();
  });

  it('should call all simple functions', () => {

    component.setDeleteWebApp('', 'test-id');
    component.setDeleteWebApp('', 'test-id', false);
    // component.openDeleteModal('', 'web', 0);
    // component.openDeleteModal('', 'app', 0);
    component.closeModal();
  });

  it('should handle errors', () => {
    component.pageErrorHandle({ status: 401 }, true); // handle 404
    component.pageErrorHandle({ status: 404 }, false); // handle 404
    component.pageErrorHandle({}, false); // else path
  });


});
