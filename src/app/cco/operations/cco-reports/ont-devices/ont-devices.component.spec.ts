import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from 'src/app/cco/system/services/cco-system.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OntDevicesComponent } from './ont-devices.component';
import { getCount } from 'src/assets/mockdata/cco/operations/cco-reports/ont-devices/ont-devices.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OntDevicesComponent', () => {
  let component: OntDevicesComponent;
  let service: SsoAuthService;
  let fixture: ComponentFixture<OntDevicesComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OntDevicesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule, NgSelectModule, FormsModule
      ],
      providers: [
        TranslateService,
        NgbModal,
        CcoCommonService,
        CommonService,
        CcoSystemService,
        ExportExcelService,
        HttpClient,
        DateUtilsService,
        SsoAuthService,
        FormBuilder,
        ExportExcelService, Title]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OntDevicesComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
      });;
  });


  it('get the regions', () => {
    component.getRegions();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(Regions);
    expect(component.regionsDataArray).not.toBeUndefined();
    expect(component.regionsDataArray[1]).toEqual(Regions[0]);
  });


  it('get the locations', () => {
    component.regionSelected = 'd524a51b-ab47-4c1e-8611-068d91b5326b';
    component.getLocations();
    const req = httpTestingController.expectOne(request => {
      console.log("locations", request.url)
      return true;
    });
    req.flush(Locations);
    expect(component.locationDataArray).not.toBeUndefined();
    expect(component.locationDataArray[1]).toEqual(Locations[0]);
  });


  it('get the systems', () => {

    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.locationSelected = '03ec49d0-0402-42f2-a38b-fac869619a96';
    let event;
    component.loadSystemValue(event);
    const req = httpTestingController.expectOne(request => {
      console.log("Systems", request.url)
      return true;
    });
    req.flush(Systems);
    expect(component.systemDataArray).not.toBeUndefined();
    expect(component.systemDataArray[1]).toEqual(Systems[0]);
  });

  it('get the count', () => {
    component.regionSelected = 'd524a51b-ab47-4c1e-8611-068d91b5326b';
    component.locationSelected = '3cda1e06-3202-4ee7-a8fc-321fb5d88b96';
    component.systemSelected = '3cda1e06-3202-4ee7-a8fc-321fb5d88b96';
    component.getCount();
    const req = httpTestingController.expectOne(request => {
      console.log("getcount", request.url)
      return true;
    });
    req.flush(getCount);
    spyOn(component, 'getList').and.callThrough();
    expect(component.count).not.toBeUndefined();
    expect(component.count).toEqual(78);

  })

  // it('get the list', () => {
  //   component.regionSelected = 'd524a51b-ab47-4c1e-8611-068d91b5326b';
  //   component.locationSelected = '3cda1e06-3202-4ee7-a8fc-321fb5d88b96';
  //   component.systemSelected = '3cda1e06-3202-4ee7-a8fc-321fb5d88b96';
  //   component.getList();
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("listddfdsfgsdf", request.url)
  //     return true;
  //   });
  //   req.flush(getList);
  //   expect(component.count).not.toBeUndefined();
  //   expect(component.list.length).toEqual(78);

  // })


});
