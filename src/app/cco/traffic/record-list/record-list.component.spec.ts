import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { recordingList } from 'src/assets/mockdata/cco/traffic/recording/record.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { WebsocketService } from '../../shared/services/websocket.service';
import { RealtimeComponent } from '../network/realtime/realtime.component';
import { RecordViewComponent } from '../record-view/record-view.component';
import { RecordListComponent } from './record-list.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RecordListComponent', () => {
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;
  let httpTestingController: HttpTestingController;
  let websocketservice: WebsocketService;
  let commonService: CommonService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordListComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([
        { path: 'cco/record', component: RecordViewComponent },
        { path: 'cco/traffic/network/realtime', component: RealtimeComponent },
      ]),
        HttpClientTestingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        DataTablesModule],
      providers: [
        TranslateService,
        SsoAuthService,
        CommonService,
        WebsocketService,
        DateUtilsService,
        NgbModal,
        CommonFunctionsService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate'), url: "" } }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RecordListComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        websocketservice = TestBed.inject(WebsocketService);
        router = TestBed.inject(Router);
        commonService = TestBed.inject(CommonService);
        component = fixture.componentInstance;
      });
  });


  it('component initialized', () => {
    spyOn(component, 'getTableCount').and.callThrough();
    spyOn(component, 'doSearch').and.callThrough();
    component.ngOnInit();
    expect(component.dtOptions.pageLength).toBe(10);
    expect(component.getTableCount).toHaveBeenCalled();
    expect(component.doSearch).toHaveBeenCalled();
  });

  it('get table count', () => {
    spyOn(component, 'tableRender').and.callThrough();
    component.getTableCount();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(2);
    expect(component.tableCount).toBe(2);
    expect(component.showTable).toBeTrue();
    expect(component.tableRender).toHaveBeenCalled();
  });

  it('check perform search', () => {
    spyOn(component, 'searchFilterByDateTime').and.callThrough();
    component.searchText = "testing";
    component.performSearch();
    expect(component.loading).toBeTrue();
    expect(component.searchFilterByDateTime).toHaveBeenCalled();
  });

  it('search be duration', () => {
    component.searchFilterByDateTime('00:30:00');
    expect(component.searchByDuration).toBe(1800000);
    expect(component.searchByDateTime).toBe(null);
  });

  it('search be date and time', () => {
    component.searchFilterByDateTime('2022-10-12 19:23:35');
    expect(component.searchByDuration).toBe(null);
    expect(component.searchByDateTime).toBe(1665582815);
  });

  it('stop recording confimation', () => {
    component.stopRecordConfirm(recordingList[0]);
    expect(component.stopRecordData).toEqual(recordingList[0]);
    expect(component.stopError).toBeFalse();
  });

  it('goto recording view', () => {
    component.goToRecording(recordingList[1]);
    expect(router.navigate).toHaveBeenCalledWith(['/cco/record'], { queryParams: { id: recordingList[1].id } });
  });


  // it('go back to previous page', () => {
  //   component.goBack();
  //   expect(router.navigate).toHaveBeenCalledWith(['/systemAdministration/flowAnalyze/traffic/location/realtime']);
  // });

  it('should handle error', () => {
    spyOn(commonService, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401);
    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
    expect(commonService.pageErrorHandle).toHaveBeenCalled();
  });


  // it('delete recording', () => {
  //   spyOn(component, 'close').and.callThrough();
  //   spyOn(component, 'getTableCount').and.callThrough();
  //   component.deleteData = recordingList[0];
  //   component.deleteRecording();
  //   const req = httpTestingController.expectOne(request => {
  //     console.log("request",request.url);
  //     return true;
  //   });
  //   req.flush(true);
  //   expect(component.success).toBeTrue();
  //   expect(component.btnDisabled).toBeFalse();
  //   expect(component.close).toHaveBeenCalled();
  //   expect(component.getTableCount).toHaveBeenCalled();
  // });

});
