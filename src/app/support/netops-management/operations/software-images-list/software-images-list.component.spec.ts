import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { softwareImages } from 'src/assets/mockdata/support/netops-management/operations/softwareimages/softwareimages.data';
import { FileService } from '../services/files.service';

import { SoftwareImagesListComponent } from './software-images-list.component';

describe('SoftwareImagesListComponent', () => {
  let component: SoftwareImagesListComponent;
  let fixture: ComponentFixture<SoftwareImagesListComponent>;

  let fileService: FileService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoftwareImagesListComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, SsoAuthService, FileService, HttpClient, NgbModal, Title


      ]
    })
      .compileComponents().then(() => {
        fileService = TestBed.inject(FileService);
        fixture = TestBed.createComponent(SoftwareImagesListComponent);
        component = fixture.componentInstance;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SoftwareImagesListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get software images data', () => {

    spyOn(fileService, 'getSoftwareImageList').and.returnValue(of(softwareImages));
    spyOn(component, 'fetchSoftwareImageList').and.callThrough();
    component.fetchSoftwareImageList();

    // expect(component.softwareImageObj[0].username).toMatch("ddafd67");
    expect(component.fetchSoftwareImageList).toHaveBeenCalled();
    expect(component.fetchSoftwareImageList).toHaveBeenCalledTimes(1);
  });
  it('get software images count', () => {
    var data = {
      "count": 1147
    }
    spyOn(fileService, 'getSwFilesCount').and.returnValue(of(data));
    spyOn(component, 'getSwImagesListCout').and.callThrough();
    component.getSwImagesListCout();

    expect(component.count).toBe(1147, "Length is wrong");
    expect(component.getSwImagesListCout).toHaveBeenCalled();
    expect(component.getSwImagesListCout).toHaveBeenCalledTimes(1);
  });

  it('should delete software images', () => {
    // component.dtElement=
    component.deleteData = {
      _id: "630d6b4a8f082689ee9b6399"
    }
    spyOn(fileService, 'deleteSwFileById').and.returnValue(of(true));
    spyOn(component, 'deleteSoftwareFile').and.callThrough();
    component.deleteSoftwareFile();

    expect(component.showSuccess).toBe(true);
    expect(component.successMsg).toMatch("Successfully Deleted!");
    expect(component.deleteSoftwareFile).toHaveBeenCalled();
    expect(component.deleteSoftwareFile).toHaveBeenCalledTimes(1);
  });
});
