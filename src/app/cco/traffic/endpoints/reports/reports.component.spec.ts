import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../shared/chart-options.service';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let commonOrgService: CommonService
  let customTranslateService: CustomTranslateService
  let pageDetails = {
    main_route: 'applications',
    sub_route: 'traffic',
    showLocation: true,
    showApplication: true,
    showCriteria: true,
    showStartDate: true,
    showEndDate: true,
    showLimit: false
  }
  let criteria = [
    {
      name: 'Usage',
      value: 'usage'
    },
    {
      name: 'Rate',
      value: 'rate'
    }
  ];
  let directions = [
    {
      name: 'Down',
      value: 'Down'
    },
    {
      name: 'Up',
      value: 'Up'
    },
    {
      name: 'Both(Down+Up)',
      value: 'both'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        HighchartsChartModule,
        SharedUtilsModule,
        NgbModule,
        DataTablesModule,
        NgxSliderModule
      ],
      providers: [
        CustomTranslateService,
        PrimeNGConfig,
        NgbModal,
        WebsocketService,
        CommonService,
        ChartOptionsService,
        SsoAuthService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReportsComponent);
        commonOrgService = TestBed.inject(CommonService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'intializeValues');
    component.ngOnInit();
    expect(component.limit).toEqual(10)
    expect(component.directionSelected).toMatch('Down');
    expect(component.intializeValues).toHaveBeenCalled();
    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
  });

  it('should intializeValues', () => {
    component.intializeValues();
    expect(component.typeSelected).toEqual('usage');
    expect(component.criteria).toEqual(criteria);
    expect(component.directions).toEqual(directions);
  });


  // it('should call loadChartData()', () => {
  //   spyOn(component.TrafficComponent, 'loadChartData').and.callThrough();
  //   component.typeSelected = 'traffic';
  //   component.pageDetails = pageDetails;
  //   component.loadChartData(0);
  //   expect(component.service.btnDisabled).toEqual(true);
  //   expect(component.typeSelected).toEqual('traffic');
  //   expect(component.TrafficComponent.loadChartData).toHaveBeenCalled();
  // });

  it('should call setHideShowFilter()', () => {
    spyOn(component, 'changeCriteria').and.callThrough()
    component.setHideShowFilter();
    expect(component.changeCriteria).toHaveBeenCalled();
    component.typeSelected = 'rate';
    component.setHideShowFilter();
    component.typeSelected = 'monthly_usage';
    component.setHideShowFilter();
    component.typeSelected = 'applications';
    component.setHideShowFilter();
    component.typeSelected = 'top_application_traffic';
    component.setHideShowFilter();
  });

  it('should handle error 401', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should handle error 500', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should change type', () => {
    spyOn(component, 'setHideShowFilter').and.callThrough();
    component.changeType();
    expect(component.service.btnDisabled).toBeFalse();
    expect(component.setHideShowFilter).toHaveBeenCalled();
  });

  it('viewScheduleReport and changeType and getISOEndOfDay', () => {
    component.service.btnDisabled = true;
    component.openModalInfo();
    component.changeType();
    component.getISOEndOfDay(new Date());
  });

  it('changeTimeRange', fakeAsync(() => {
    component.changeTimeRange();
    flush(500);
  }));

  it('changelimit and changeDate and slideChangeDate and changeCriteria', () => {
    component.limit = 2;
    component.changelimit();
    component.limit = 501;
    component.changelimit();
    component.changeDate();
    component.startDate = new Date();
    component.endDate = new Date();
    component.changeDate(); 
    component.slideChangeDate(73);
    component.criteriaSelected = 'rate';
    component.changeCriteria();
    component.validateStartEndDates();
  });

});
