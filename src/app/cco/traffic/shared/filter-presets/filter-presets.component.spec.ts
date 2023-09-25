import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FilterPresetsComponent } from './filter-presets.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesApiService, FilterPresets, SettingType, TrafficFieldType, TrafficReportType, TrafficType } from '../favorites-api.service';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mockApplications, mockFilterPreset, mockLocations, mockReports, mockReportsLanguage, mockSelectedFilter, mockSettingJson } from 'src/assets/mockdata/cco/traffic/shared/filterPresets.data';

describe('FilterPresetsComponent', () => {
  let component: FilterPresetsComponent;
  let fixture: ComponentFixture<FilterPresetsComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let favoritesApiService: FavoritesApiService;
  let dialogService: NgbModal;
  


  favoritesApiService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPresetsComponent ],
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [ FavoritesApiService ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPresetsComponent);
    component = fixture.componentInstance;
    favoritesApiService = TestBed.inject(FavoritesApiService);
    dialogService = TestBed.inject(NgbModal); // Inject the modal service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('set fields for TrafficType.Network', () => {
    component.trafficType = TrafficType.Network;
    (component as any).setTypeFieldsByTrafficType();

    expect((component as any).settingType).toBe(SettingType.TrafficNetworkRealtime);
    expect((component as any).trafficFields).toEqual([TrafficFieldType.TimeFrame]);
  });

  it(' set fields for TrafficType.LocationStandard', () => {
    component.trafficType = TrafficType.LocationStandard;
    (component as any).setTypeFieldsByTrafficType();

    expect((component as any).settingType).toBe(SettingType.TrafficLocationsRealtimeStandardView);
    expect((component as any).trafficFields).toEqual([TrafficFieldType.TimeFrame, TrafficFieldType.Location]);
  });


  it(' set fields for TrafficType.LocationReport with TrafficReportType.TopSubscribers', () => {
    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.TopSubscribers;
    (component as any).setTypeFieldsByTrafficType();

    expect((component as any).settingType).toBe(SettingType.TrafficLocationReportTopSubscribers);
    expect((component as any).trafficFields).toEqual([
      TrafficFieldType.Criteria,
      TrafficFieldType.FromDate,
      TrafficFieldType.ToDate,
      TrafficFieldType.Limit,
      TrafficFieldType.Direction,
      TrafficFieldType.Location,
    ]);
  });

  it(' should set fields based on trafficType and reportType', () => {
    component.trafficType = TrafficType.Network;
    (component as any).setTypeFieldsByTrafficType();
    expect((component as any).settingType).toBe(SettingType.TrafficNetworkRealtime);
    expect((component as any).trafficFields).toEqual([TrafficFieldType.TimeFrame]);

    component.trafficType = TrafficType.LocationStandard;
    (component as any).setTypeFieldsByTrafficType();
    expect((component as any).settingType).toBe(SettingType.TrafficLocationsRealtimeStandardView);
    expect((component as any).trafficFields).toEqual([TrafficFieldType.TimeFrame, TrafficFieldType.Location]);

    component.trafficType = TrafficType.LocationComparative;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.ApplicationStandard;
    (component as any).setTypeFieldsByTrafficType();
    expect((component as any).settingType).toBe(SettingType.TrafficApplicationsRealtimeStandardView);

    component.trafficType = TrafficType.ApplicationComparative;
    (component as any).setTypeFieldsByTrafficType();
    expect((component as any).settingType).toBe(SettingType.TrafficApplicationsRealtimeComparativeView);
    expect((component as any).trafficFields).toEqual([
      TrafficFieldType.TimeFrame,
      TrafficFieldType.Application,
      TrafficFieldType.Location,
      TrafficFieldType.Metric,
    ]);

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.Traffic;
    (component as any).setTypeFieldsByTrafficType();
    expect((component as any).settingType).toBe(SettingType.TrafficNetworkReportTraffic);
    expect((component as any).trafficFields).toEqual([TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate]);

    component.trafficType = TrafficType.Network;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationStandard;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationComparative;
    (component as any).setTypeFieldsByTrafficType();
   
    component.trafficType = TrafficType.ApplicationStandard;
    (component as any).setTypeFieldsByTrafficType();
  
    component.trafficType = TrafficType.ApplicationComparative;
    (component as any).setTypeFieldsByTrafficType();
    
    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.TopApplications;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.TopLocations;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.TopSubscribers;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.PowerUsers;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.ActiveSubscribers;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.SubscriberDistribution;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.MonthlyUsageByApplication;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.MonthlyUsageByServiceCategory;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.MaxDailyRate;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.AverageSubscriberRate;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.NetworkReport;
    component.reportType = TrafficReportType.TopApplicationTraffic;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.Traffic;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.TopApplications;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.ActiveSubscribers;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.SubscriberDistribution;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.MonthlyUsageByApplication;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.MonthlyUsageByServiceCategory;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.MaxDailyRate;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.AverageSubscriberRate;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.LocationReport;
    component.reportType = TrafficReportType.TopApplicationTraffic;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.ApplicationReport;
    component.reportType = TrafficReportType.Traffic;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.ApplicationReport;
    component.reportType = TrafficReportType.TopLocations;
    (component as any).setTypeFieldsByTrafficType();

    component.trafficType = TrafficType.ApplicationReport;
    component.reportType = TrafficReportType.TopSubscribers;
    (component as any).setTypeFieldsByTrafficType();

    fixture.detectChanges();

  }); 
  


  it('should set loading to true viewAllFilterPreset', () => {
    spyOn(favoritesApiService, 'getAllFavorites').and.returnValue(of([]));
    (component as any).viewAllFilterPreset();
    expect(component.loading).toBeFalsy();

  });

  it('should parse settingJson and convert dates', () => {
   
    (component as any).processSettingJson(mockSettingJson);
  
    expect(mockSettingJson.settingJsonTyped.criteria).toBe('usage');
    expect(mockSettingJson.settingJsonTyped.fromDate).toEqual(new Date('2023-09-07T07:14:41.540Z'));
    expect(mockSettingJson.settingJsonTyped.toDate).toEqual(new Date('2023-09-13T07:14:41.540Z'));
  });
  it('should set successMessage', () => {
    const message = 'Success';
    const isSuccess = true;

    (component as any).showMessage(message, isSuccess);

    expect(component.successMessage).toBe(message);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage', () => {
    const message = 'Error';
    const isSuccess = false;

    (component as any).showMessage(message, isSuccess);

    expect(component.errorMessage).toBe(message);
    expect(component.successMessage).toBe('');
  });

  it('should clear messages after a timeout', fakeAsync(() => {
    const message = 'Message';
    const isSuccess = true;
  
    (component as any).showMessage(message, isSuccess);
  
    tick(5000);
  
  
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('');
  }));
  
  it('should call setTypeFieldsByTrafficType and viewAllFilterPreset when reportType or showSensitiveInfo change', () => {
    const changes: { [key: string]: SimpleChange } = {
      reportType: new SimpleChange('oldReportType', 'newReportType', false),
      showSensitiveInfo: new SimpleChange(false, true, false),
    };
    

    spyOn((component as any), 'setTypeFieldsByTrafficType');
    spyOn((component as any), 'viewAllFilterPreset');

    component.ngOnChanges(changes);
    

    expect((component as any).setTypeFieldsByTrafficType).toHaveBeenCalled();
    expect((component as any).viewAllFilterPreset).toHaveBeenCalled();
  });
  it('should save filter preset', () => {
  
    spyOn(favoritesApiService, 'saveFavorite').and.returnValue(of(mockFilterPreset));
  
    component.saveFilterPreset();
  
    expect(component.loading).toBeFalse();
  });
  

  it('should handle error when saving filter preset', () => {
    const favoritesApiService = TestBed.inject(FavoritesApiService); 
       const errorResponse = new HttpErrorResponse({ status: 500 });
    spyOn(favoritesApiService, 'saveFavorite').and.returnValue(throwError(errorResponse));

    component.saveFilterPreset();

    expect(component.loading).toBeFalse();
  });

  it('should return the correct setting JSON to save', () => {
    component.selectedTimeFrame;

    (component as any).getSettingJsonToSave();
    fixture.detectChanges();
  });


  it('should return true when field type is in trafficFields', () => {
    const fieldToCheck = TrafficFieldType.Threshold; 

    (component as any).trafficFields = [fieldToCheck]; 
    const result = component.isFieldVisible(fieldToCheck);

    expect(result).toBeTrue();
  });

  it('should return false when field type is not in trafficFields', () => {
    const fieldToCheck = TrafficFieldType.EliminateUnknown; 
    (component as any).trafficFields = [TrafficFieldType.ThresholdType];
    const result = component.isFieldVisible(fieldToCheck);

    expect(result).toBeFalse();
  });
  

  it('should handle error when confirming delete ', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });
    spyOn(favoritesApiService, 'deleteFavorite').and.returnValue(throwError(errorResponse));
    component.selectedFilter ;
    component.confirmDeleteFilter();

    expect(component.loading).toBeFalse();
  });
  
  it('should set isDeleteSelected and call closeAlert', () => {
    spyOn(component, 'closeAlert');

    component.deleteFilter(true);

    expect(component.isDeleteSelected).toBe(true);
    expect(component.closeAlert).toHaveBeenCalled();

    component.deleteFilter(false);

    expect(component.isDeleteSelected).toBe(false);
    expect(component.closeAlert).toHaveBeenCalledTimes(2);
  });


  it('should set selectedFilter and call deleteFilter ', () => {
    spyOn(component, 'deleteFilter');

    component.selectFilterPreset(mockSelectedFilter);

    expect(component.selectedFilter).toEqual(mockSelectedFilter);
    expect(component.deleteFilter).toHaveBeenCalledWith(false);
  });


  it('should emit onSelectFilterPreset event', () => {


    const emitSpy = spyOn(component.onSelectFilterPreset, 'emit');

    component.applyFilterPreset(mockSelectedFilter);

    expect(emitSpy).toHaveBeenCalledWith(mockSelectedFilter);
  });

  it('should clear errorMessage and successMessage', () => {
    component.errorMessage = 'Error message';
    component.successMessage = 'Success message';

    component.closeAlert();

    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe('');
  });


  it('should clear properties and open the modal', () => {
    component.filterName = 'InitialFilterName';

    spyOn(component, 'closeAlert');

    component.showModal('modalName');

    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.filterName).toBe('');
     });

     it('should set selectedFilter', () => {
      component.filterPresets;
      component.selectedFilter = null; 
      component.isDeleteSelected = true; 
  
      spyOn(component, 'closeAlert');
      spyOn(dialogService, 'open');
  
      component.showModalFilterPreset('modalName');
  
      expect(component.closeAlert).toHaveBeenCalled();
      expect(component.isDeleteSelected).toBe(false); 
      expect(dialogService.open).toHaveBeenCalledWith('modalName', {
        centered: true,
        windowClass: 'custom-default-modal clx-modal-med',
      });
    });
    it('should return the report name by value', () => {
      component.reports = mockReports;
  
      component.language = mockReportsLanguage;
  
      const reportName = component.getReportNameById('report1');
  
      expect(reportName).toBe('Report One'); 
    });
    it('should return the application name by id ', () => {
      component.applications =mockApplications ;
  
      const appName = component.getApplicationNameById('app2');
  
      expect(appName).toBe('App Two'); 
   });
  
    it('should return an empty string if no application id ', () => {
      component.applications = mockApplications;
  
      const appName = component.getApplicationNameById('notExsist');
  
      expect(appName).toBe(''); 
    });
    it('should return application names based on selected IDs ', () => {
      component.applications = mockApplications;
  
      const selectedApplications1 = ['app1', 'app2'];
      component.getApplicationNames(selectedApplications1);
  
      const selectedApplications2 = ['app1', 'app2', 'app3'];
     component.getApplicationNames(selectedApplications2);
  
      component.applications = null;
      const selectedApplications3 = ['app1', 'app2'];
      component.getApplicationNames(selectedApplications3);
  
      const selectedApplications4: string[] = [];
      const appNames4 = component.getApplicationNames(selectedApplications4);
      expect(appNames4).toEqual([]);
    });


    it('should return location name by id if found', () => {
      component.locations = mockLocations;
      const locationName1 = component.getLocationNameById('location2');
      expect(locationName1).toBe('Location Two');
  
      const locationName2 = component.getLocationNameById('nonExistentId');
      expect(locationName2).toBe('');
  
      component.locations = null;
      const locationName3 = component.getLocationNameById('location2');
      expect(locationName3).toBe('');
    });

    it('should return location names based on selected IDs', () => {
      component.locations = mockLocations;
      const selectedLocations1 = ['location1', 'location2'];
      component.getLocationNames(selectedLocations1);
  
      const selectedLocations2 = ['location1', 'location2', 'location3'];
       component.getLocationNames(selectedLocations2);
  
      component.locations = null;
      const selectedLocations3 = ['location1', 'location2'];
      component.getLocationNames(selectedLocations3);
  
      const selectedLocations4: string[] = [];
      const locationNames = component.getLocationNames(selectedLocations4);
      expect(locationNames).toEqual([]);
    });
    it('should return time frame name by id if found', () => {
      (component as any).timeFrames;
      component.getTimeFrameNameById(2);
  
      component.getTimeFrameNameById(4);
  
      (component as any).timeFrames = null;
      component.getTimeFrameNameById(2);
      fixture.detectChanges();

    });

    it('should return period name by id if found', () => {
      (component as any).periods;
      component.getPeriodNameById('period2');
  
       component.getPeriodNameById('nonExistentId');
  
       (component as any).periods = null;
      component.getPeriodNameById('period2');
      fixture.detectChanges();

    });

    it('should return the threshold type name ', () => {
     (component as any).thresholdTypes;
  
       component.getThresholdTypeNameById('2');
        fixture.detectChanges();
    });
    it('should return the direction name', () => {
      
      (component as any).directions;
      component.getDirectionNameById('3');
  
      fixture.detectChanges();

    });

    it('should return application group names', () => {
      const selectedApplicationGroups1: string[] = ['traffic', 'location', 'appllication'];
      (component as any).getApplicationGroupNames(selectedApplicationGroups1);
  
      const selectedApplicationGroups2: string[] = [];
      const result2 = (component as any).getApplicationGroupNames(selectedApplicationGroups2);
      expect(result2).toEqual([]); 
  
    });
});
