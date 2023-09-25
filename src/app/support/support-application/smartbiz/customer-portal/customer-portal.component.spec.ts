import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalComponent } from './customer-portal.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CaptivePortalService } from '../../shared/service/captive-portal.service';
import { of, throwError } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { By } from '@angular/platform-browser';

describe('CustomerPortalComponent', () => {
  let component: CustomerPortalComponent;
  let fixture: ComponentFixture<CustomerPortalComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let captivePortalService: CaptivePortalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPortalComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        TranslateService,
        CaptivePortalService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPortalComponent);
    component = fixture.componentInstance;
    captivePortalService = TestBed.inject(CaptivePortalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.translateService.selectedLanguage.next({});
    component.ngOnInit();
    component.ngOnDestroy();
  });

  it('should load all simple functions', () => {
    let schedules = [{
      timeRanges: [
        {
          startTime: '0930',
          stopTime: '1030'
        },
        {
          startTime: '1030',
          stopTime: '1130'
        },
      ],
      weekDays: 'mon'
    }];
    component.patchPortalDetail({ schedules: schedules });

    component.uploadImage({
      file: {
        name: 'test.csv'
      }
    });
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    component.uploadImage({ file, type: 'coverImage' });
    component.uploadImage({ file, type: 'logoImage' });
    // component.showPreview();
  });

  it('should get captive portal details', () => {
    spyOn(captivePortalService, 'getCaptivePortal').and.returnValue(of({
      id: 1,
      name: 'test'
    }));
    spyOn(component, 'getCaptivePortal').and.callThrough();
    component.getCaptivePortal();
  });

  it('should save captive portal details - when API succeeds', () => {
    spyOn(captivePortalService, 'createCaptivePortal').and.returnValue(of({}));
    component.createCaptivePortal();

    let tab = "";
    component.setCaptivePortal(tab);

    component.form.patchValue({
      title: 'test-test-test-test-test-test-test-test-test-test-test-test-test-test-test'
    });
    component.setCaptivePortal(tab);

    component.form.patchValue({
      portalId: 1,
      title: 'test-test'
    });
    spyOn(captivePortalService, 'setCaptivePortal').and.returnValue(of({}));
    component.setCaptivePortal(tab);

    component.form.patchValue({
      termsUrl: '123',
      bfColor: 'test'
    });
    component.setCaptivePortal(tab);
  });

  it('should save captive portal details - when API fails', () => {
    spyOn(captivePortalService, 'createCaptivePortal').and.returnValue(throwError(errorStatus401));
    component.createCaptivePortal();

    let tab = "";
    component.form.patchValue({
      portalId: 1
    });
    spyOn(captivePortalService, 'setCaptivePortal').and.returnValue(throwError(errorStatus401));
    component.setCaptivePortal(tab);
  });

  it('should delete image - when API succeeds', () => {
    component.deleteImage({
      openDialog: true
    });
    spyOn(captivePortalService, 'deleteUploadedImg').and.returnValue(of({}));
    component.deleteImage({
      openDialog: false
    });
  });

  it('should delete image - when API fails', () => {
    component.deleteImageEvent = {
      type: ''
    };
    spyOn(captivePortalService, 'deleteUploadedImg').and.returnValue(throwError(errorStatus401));
    component.deleteImage({
      openDialog: false
    });
  });

});
