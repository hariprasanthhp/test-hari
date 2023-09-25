import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { configurationFileData } from 'src/assets/mockdata/support/netops-management/operations/configuration-files/configurationfile.data';
import { FileService } from '../services/files.service';

import { ConfigurationFilesFormComponent } from './configuration-files-form.component';

describe('ConfigurationFilesFormComponent', () => {
  let fileService: FileService;
  let component: ConfigurationFilesFormComponent;
  let fixture: ComponentFixture<ConfigurationFilesFormComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationFilesFormComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , FormsModule, ReactiveFormsModule, NgSelectModule,
        RouterTestingModule.withRoutes([
          { path: 'support/netops-management/operations/configuration-files-list', component: ConfigurationFilesFormComponent },
        ]),
      ],
      providers: [
        TranslateService, SsoAuthService, FileService
      ]
    })
      .compileComponents().then(() => {
        fileService = TestBed.inject(FileService);
        fixture = TestBed.createComponent(ConfigurationFilesFormComponent);
        component = fixture.componentInstance;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ConfigurationFilesFormComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('sava configuration file data', () => {

  //   spyOn(fileService, 'uploadConfigFile').and.returnValue(of(configurationFileData));
  //   spyOn(component, 'onFileSubmit').and.callThrough();
  //   component.onFileSubmit();
  //   expect(component.showSuccess).toBeTruthy();
  //   expect(component.successMsg).toMatch("Data Service");
  //   expect(component.onFileSubmit).toHaveBeenCalled();
  //   expect(component.onFileSubmit).toHaveBeenCalledTimes(1);
  // });
});
