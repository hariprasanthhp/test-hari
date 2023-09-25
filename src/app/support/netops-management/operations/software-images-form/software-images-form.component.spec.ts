import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { softwareImagedata, softwareImageResp } from 'src/assets/mockdata/support/netops-management/operations/softwareimages/softwareimages.data';
import { FileService } from '../services/files.service';

import { SoftwareImagesFormComponent } from './software-images-form.component';

describe('SoftwareImagesFormComponent', () => {
  let component: SoftwareImagesFormComponent;
  let fixture: ComponentFixture<SoftwareImagesFormComponent>;
  let fileService: FileService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoftwareImagesFormComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , FormsModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService, SsoAuthService, FileService, Location
      ]
    })
      .compileComponents().then(() => {
        fileService = TestBed.inject(FileService);
        fixture = TestBed.createComponent(SoftwareImagesFormComponent);
        component = fixture.componentInstance;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareImagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('save software images data', () => {
    component.swFileObj = softwareImagedata
    spyOn(fileService, 'uploadSwFile').and.returnValue(of(softwareImageResp));
    spyOn(component, 'onSWFileSubmit').and.callThrough();
    component.onSWFileSubmit();

    // console.log(component.resDetails)
    // expect(component.showSuccess).toBeTruthy();
    // expect(component.successMsg).toMatch("Data Service");
    expect(component.onSWFileSubmit).toHaveBeenCalled();
    expect(component.onSWFileSubmit).toHaveBeenCalledTimes(1);
  });
});
