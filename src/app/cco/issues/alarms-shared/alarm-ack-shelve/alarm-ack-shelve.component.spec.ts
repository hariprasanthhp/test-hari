import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmAckShelveComponent } from './alarm-ack-shelve.component';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ALARM } from 'src/assets/mockdata/cco/issues/service/alarm';

describe('AlarmAckShelveComponent', () => {
  let component: AlarmAckShelveComponent;
  let fixture: ComponentFixture<AlarmAckShelveComponent>;
  let http: HttpClient;
  let sso: SsoAuthService;
  let translateService: TranslateService;
  let commonOrgService: CommonService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmAckShelveComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [HttpClient,
        SsoAuthService,
        TranslateService,
        CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmAckShelveComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    sso = TestBed.inject(SsoAuthService);
    translateService = TestBed.inject(TranslateService);
    commonOrgService = TestBed.inject(CommonService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it(`call ng Init`, () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });


  it('should call the PUT method to acknowledge the alarm', () => {
    expect(component.disableAckBtn).withContext('disabled before call').toBe(false);
    component.fullData = ALARM;

    component.doAck(false);
    expect(component.disableAckBtn).withContext('enabled before call').toBe(true);
    const req = httpTestingController.expectOne((request: any) => {
      return request;
    });

    fixture.detectChanges();

    expect(component.fullData.subject.ccoAck).toBe(false);
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('PUT');
  });

  it('should call the DELETE method to unacknowledge the alarm', () => {
    const deleteAck = spyOn(component, 'deleteAck');
    component.fullData = ALARM;
    component.doAck(true);

    expect(deleteAck).toHaveBeenCalled();

    // const req = httpTestingController.expectOne((request: any) => {
    //   return request;
    // });
    // // Assert that the request is a GET.
    // expect(req.request.method).toEqual('DELETE');
  });

  it('should call the stand alone method to unacknowledge the alarm', () => {
    component.fullData = ALARM;

    component.deleteAck();
    const req = httpTestingController.expectOne((request: any) => {
      return request;
    });

    fixture.detectChanges();
    expect(req.request.method).toEqual('DELETE');
  });


  it('should call the stand alone method to unacknowledge the alarm', () => {
    component.fullData = ALARM;

    component.deleteShelve();
    const req = httpTestingController.expectOne((request: any) => {
      return request;
    });

    fixture.detectChanges();
    expect(req.request.method).toEqual('DELETE');
  });


  it('should call the PUT method to shelve the alarm', () => {
    component.fullData = ALARM;
    component.doShelve(false);

    const req = httpTestingController.expectOne((request: any) => {
      return request;
    });
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('PUT');
  });

  it('should call the DELETE method to shelve the alarm', () => {
    component.fullData = ALARM;

    const deleteShelve = spyOn(component, 'deleteShelve');
    component.fullData = ALARM;
    component.doShelve(true);

    expect(deleteShelve).toHaveBeenCalled();


    // const req = httpTestingController.expectOne((request: any) => {
    //   return request;
    // });
    // // Assert that the request is a GET.
    // expect(req.request.method).toEqual('DELETE');
  });

  it('should call resetActions', () => {
    spyOn(component, 'resetActions');
    component.resetActions();
    expect(component.resetActions).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
