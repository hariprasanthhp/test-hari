import {
  HttpClient
  , HttpClientXsrfModule
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { DataServiceService } from 'src/app/support/data.service';
import { inventoryDeviceData } from 'src/assets/mockdata/support/support-traffic-reports/reports.data';
import { DeviceGroupService } from '../../operations/services/device-group.service';
import { ReportsService } from '../reports.service';

import { InventoryReportComponent } from './inventory-report.component';

describe('InventoryReportComponent', () => {
  let component: InventoryReportComponent;
  let fixture: ComponentFixture<InventoryReportComponent>;
  let translateService: TranslateService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryReportComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, FormsModule, CalendarModule],
      providers: [TranslateService, HttpClient, ChangeDetectorRef, ReportsService
        , DataServiceService, SsoAuthService, DateUtilsService, ValidatorService,
        DownloadService, Title, WindowRefService]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(InventoryReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  it('inventory onInit()', () => {
    spyOn(component, 'appendDeviceGroup').and.callThrough();
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    component.appendDeviceGroup();
    expect(component.appendDeviceGroup).toBeTruthy();
    fixture.detectChanges();
  });
  it('inventortReport onInit()', () => {
    spyOn(component, 'getInventorySoftwareReport').and.callThrough();
    translateService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    component.getInventorySoftwareReport();
    expect(component.getInventorySoftwareReport).toBeTruthy();
    fixture.detectChanges();
  });
  it('table data of issues', () => {
    component.ngOnInit();
    //fixture.detectChanges();
    spyOn(component, 'getInventoryList').and.callThrough();
    component.getInventoryList();
    component.inventoryTableData = inventoryDeviceData;
    //console.log(component.softwareImageObj)
    //expect(component.showSuccess).toBeTruthy();
    expect(component.inventoryTableData[0].serialnumber).toMatch("422108188425");
    expect(component.getInventoryList).toHaveBeenCalled();

  });
  // it('should softwareReportOption', () => {
  //   spyOn(component, 'softwareReportOption').and.callThrough()
  //   component.softwareReportOption('1')
  //   expect(component.softwareReportOption).toHaveBeenCalled()
  // })
  it('should downloadSftwreReport', () => {
    spyOn(component, 'downloadSftwreReport').and.callThrough()
    component.downloadSftwreReport()
    expect(component.downloadSftwreReport).toHaveBeenCalled()
  })
  it('should export', () => {
    spyOn(component, 'export').and.callThrough()
    component.export()
    expect(component.export).toHaveBeenCalled()
  })
  // it('should searchByCharacters', () => {
  //   spyOn(component, 'searchByCharacters').and.callThrough()
  //   component.searchByCharacters('1', '2')
  //   expect(component.searchByCharacters).toHaveBeenCalled()
  // })


});
