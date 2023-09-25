import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { config_files } from 'src/assets/mockdata/support/netops-management/operations/configuration-files/configurationfile.data';
import { FileService } from '../services/files.service';

import { ConfigurationFilesListComponent } from './configuration-files-list.component';

describe('ConfigurationFilesComponent', () => {
  let component: ConfigurationFilesListComponent;
  let fixture: ComponentFixture<ConfigurationFilesListComponent>;
  let fileService: FileService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let dtElement: DataTableDirective;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationFilesListComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService, FileService, HttpClient, NgbModal, Title
      ]
    })
      .compileComponents().then(() => {
        fileService = TestBed.inject(FileService);
        fixture = TestBed.createComponent(ConfigurationFilesListComponent);
        component = fixture.componentInstance;
        component.dtElement = dtElement;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ConfigurationFilesListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configuration files list', () => {
    spyOn(fileService, 'getConfigurationFileList').and.returnValue(of(config_files));
    spyOn(component, 'getConfigurationFileList').and.callThrough();
    component.getConfigurationFileList();
    // console.log(component.filesListObj)
    expect(component.filesListObj.length).toBe(3, "Length is wrong");
    expect(component.filesListObj[0]?.username).toMatch("9d0a663");
    expect(component.getConfigurationFileList).toHaveBeenCalled();
    expect(component.getConfigurationFileList).toHaveBeenCalledTimes(1);
  });
  it('should configuration files count', () => {
    var res = {
      "count": 287
    }
    spyOn(fileService, 'getConfigFilesCount').and.returnValue(of(res));
    spyOn(component, 'getConfigFilesListCout').and.callThrough();
    component.getConfigFilesListCout();
    //console.log(component.count)
    expect(component.count).toBe(287, "Length is wrong");
    expect(component.getConfigFilesListCout).toHaveBeenCalled();
    expect(component.getConfigFilesListCout).toHaveBeenCalledTimes(1);
  });

  it('should delete configuration files', () => {
    // component.dtElement=
    component.deleteData = {
      _id: "61cead3c0b0a3cc6073f8548"
    }
    spyOn(fileService, 'deleteConfigFileById').and.returnValue(of(true));
    spyOn(component, 'deleteConfigFile').and.callThrough();
    component.deleteConfigFile();
    // console.log(component.showSuccess)
    expect(component.showSuccess).toBe(true);
    expect(component.deleteConfigFile).toHaveBeenCalled();
    expect(component.deleteConfigFile).toHaveBeenCalledTimes(1);
  });


});
