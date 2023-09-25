import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcoDslComponent } from './cco-dsl.component';
import { lowratechart, lowsnrchart, pon_loc_chart, thresholdchart } from 'src/assets/mockdata/cco/health/pon-utilization/service/dsl.health';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { CcochartService } from '../pon-utilization/service/ccochart.service';
import { TranslateService } from 'src/app-services/translate.service';
import { HealthService } from '../service/health.service';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { Title } from '@angular/platform-browser';
import { PonUtilizationComponent } from '../pon-utilization/pon-utilization.component';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { of } from 'rxjs';
import { Interfaces, Locations, Regions, Systems } from 'src/assets/mockdata/shared/rls.data';

describe('CcoDslComponent', () => {
  let component: CcoDslComponent;
  let fixture: ComponentFixture<CcoDslComponent>;
  let httpTestingController: HttpTestingController;
  let NfaService: NfainventoryService;
  let Ccochartservice: CcochartService;
  let healthService: HealthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcoDslComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule, HighchartsChartModule, FormsModule, DataTablesModule, 
        NgSelectModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        HealthService,
        CcochartService,
        NfainventoryService,
        ExportExcelService,
        NgbModal, HttpClient,
        CommonService,
        CommonFunctionsService,
        ShortnumberPipe,
        DateUtilsService, Title, PonUtilizationComponent,
        SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoDslComponent);
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

  // it('get the regions', () => {
  //   spyOn(NfaService, 'GetRegions').and.returnValue(of(Regions))
  //   component.regionsApiLoader();
  //   expect(component.regionDataArray).not.toBeUndefined();
  //   expect(component.regionDataArray[1]).toEqual(Regions[0]);
  // });

  // it('get the locations', () => {
  //   spyOn(NfaService, 'GetLocations').and.returnValue(of(Locations))
  //   component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
  //   component.getLocationValue(event);
  //   expect(component.locationDataArray).not.toBeUndefined();
  //   expect(component.locationDataArray[1]).toEqual(Locations[0]);
  // });

  // it('get the systems', () => {
  //   spyOn(NfaService, 'GetSystems').and.returnValue(of(Systems))
  //   component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
  //   component.locationSelected = '7030b6a4-fa59-4f67-b7e1-74a6e681bfa1';
  //   component.getSystemValue(event);
  //   expect(component.systemDataArray).not.toBeUndefined();
  //   expect(component.systemDataArray[1]).toEqual(Systems[0]);
  // });

  // it('get the interfaces', () => {
  //   spyOn(healthService, 'GetInterfaces').and.returnValue(of(Interfaces))
  //   component.regionSelected = '3b208e8e-d95e-47bc-9fa4-04d009486403';
  //   component.locationSelected = '7030b6a4-fa59-4f67-b7e1-74a6e681bfa1';
  //   component.systemSelected = 'edda0781-774a-4d18-a024-fc43cb5c0c23'
  //   component.getInterfaceValue(event);
  //   expect(component.interfaceDataArray).not.toBeUndefined();
  //   expect(component.interfaceDataArray[1]).toEqual(Interfaces[0]);
  // });

  // it('threshold chart rendering ', () => {
  //   component.regionSelected = 'All';
  //   component.last24hours = false;
  //   spyOn(Ccochartservice, 'Getutilizationthresholdexceededcount').and.returnValue(of(thresholdchart));
  //   component.applyfilter(true);
  //   expect(component.ponChartbyLocation[1]).toEqual(thresholdchart[0]);
  // });

  // it('lowrate chart rendering ', () => {
  //   component.regionSelected = 'All';
  //   component.last24hours = false;
  //   spyOn(Ccochartservice, 'GetNotAtAttainable').and.returnValue(of(lowratechart));
  //   component.applyfilter(true);
  //   expect(component.ponChartbyLocation[1]).toEqual(lowratechart[0]);
  // });

  // it('lowsnr chart rendering ', () => {
  //   component.regionSelected = 'All';
  //   component.last24hours = false;
  //   spyOn(Ccochartservice, 'GetNotAtSNR').and.returnValue(of(lowsnrchart));
  //   component.applyfilter(true);
  //   expect(component.ponChartbyLocation[1]).toEqual(lowsnrchart[0]);
  // });

  // it('Full screen', () => {
  //   spyOn(component, 'fullScreenExpandFunction').and.callThrough();
  //   component.regionSelected = 'All';
  //   component.fullScreen = true;
  //   component.fullScreenChart = "ponchart"
  //   component.applyfilter(true);
  //   expect(component.fullScreenExpandFunction).toHaveBeenCalled();
  //   expect(component.fullScreenChartType).toMatch('region');


  // });

  // it('threshold chart rendering', () => {
  //   spyOn(component, 'portCountChartOptionsn').and.callThrough();
  //   component.regionSelected = 'fa771050-0940-4924-99b1-ccf92bb62e0c';
  //   component.last24hours = false;
  //   component.regionName = 'Default';
  //   component.fullScreen = true;
  //   component.thresholdChart = false;
  //   component.packageChart = false;
  //   component.bipChart = false;
  //   spyOn(Ccochartservice, 'Getutilizationthresholdexceededcount').and.returnValue(of(pon_loc_chart));
  //   component.applyfilter(true);
  //   expect(component.ponChartbyLocation[1]).toEqual(pon_loc_chart[0]);

  // });

  afterEach(() => {
    fixture.destroy();
  });

});
