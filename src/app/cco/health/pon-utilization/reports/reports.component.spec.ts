import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HealthService } from '../../service/health.service';
import { PonUtilizationComponent } from '../pon-utilization.component';
import { CcochartService } from '../service/ccochart.service';
import { NfainventoryService } from '../service/nfainventory.service';

import { ReportsComponent } from './reports.component';
import { Interfaces, Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';
import { of } from 'rxjs';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let httpTestingController: HttpTestingController;
  let NfaService: NfainventoryService;
  let Ccochartservice: CcochartService;
  let healthService: HealthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule, 
        CalendarModule,
        HighchartsChartModule, 
        FormsModule, 
        DataTablesModule, 
        NgSelectModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        HealthService,
        CcochartService,
        NfainventoryService,
        ExportExcelService,
        NgbModal, 
        HttpClient,
        CommonService,
        CommonFunctionsService,
        ShortnumberPipe,
        DateUtilsService, 
        Title, 
        PonUtilizationComponent,
        SsoAuthService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReportsComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        NfaService = TestBed.inject(NfainventoryService);
        healthService = TestBed.inject(HealthService);
        Ccochartservice = TestBed.inject(CcochartService);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('clear filter', () => {
  //   spyOn(component, 'applyfilter').and.callThrough();
  //   component.fullScreen = false;
  //   component.clearFilter();
  //   expect(component.applyfilter).toHaveBeenCalled();
  // });

  it('get the regions', () => {
    spyOn(NfaService, 'GetRegions').and.returnValue(of(Regions))
    component.regionsApiLoader();
    expect(component.regionDataArray).not.toBeUndefined();
    expect(component.regionDataArray[1]).toEqual(Regions[0]);
  });

  it('get the locations', () => {
    spyOn(NfaService, 'GetLocations').and.returnValue(of(Locations))
    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.loadLocationValue(event);
    expect(component.locationDataArray).not.toBeUndefined();
    expect(component.locationDataArray[1]).toEqual(Locations[0]);
  });

  it('get the systems', () => {
    spyOn(NfaService, 'GetSystems').and.returnValue(of(Systems))
    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.locationSelected = '7030b6a4-fa59-4f67-b7e1-74a6e681bfa1';
    component.loadSystemValue(event);
    expect(component.systemDataArray).not.toBeUndefined();
    expect(component.systemDataArray[1]).toEqual(Systems[0]);
  });

  it('get the interfaces', () => {
    spyOn(healthService, 'GetInterfaces').and.returnValue(of(Interfaces))
    component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
    component.locationSelected = '7030b6a4-fa59-4f67-b7e1-74a6e681bfa1';
    component.systemSelected = 'edda0781-774a-4d18-a024-fc43cb5c0c23'
    component.loadInterface(event);
    expect(component.interfaceDataArray).not.toBeUndefined();
    expect(component.interfaceDataArray[1]).toEqual(Interfaces[0]);
  });
 
});