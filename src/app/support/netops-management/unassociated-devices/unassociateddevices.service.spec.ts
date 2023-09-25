import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { UnassociateddevicesService } from './unassociateddevices.service';
import { param } from 'jquery';
import { unassociatedDeviceDownload } from 'src/assets/mockdata/support/netops-management/unassociated-devices/unassociated-devices';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';


describe('UnassociateddevicesService', () => {
  let service: UnassociateddevicesService;
  let httpMock : HttpTestingController;
  let router: Router;

  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule,
         RouterTestingModule
      ],
      providers: [
        DownloadService,
        SsoAuthService,
        DateUtilsService,
        UnassociateddevicesService,WindowRefService,
        { provide: Router, useValue: mockUrl },
      ]
     
    });
    service = TestBed.inject(UnassociateddevicesService);
    httpMock=TestBed.inject(HttpTestingController)
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   
   it('should download', () => {
    service.getUnassociatedDeviceDownload(param).subscribe(result=>
      {
        expect(result).toBeTruthy();
      
      });
      const req1 = httpMock.expectOne(unassociatedDeviceDownload)
   });

});

