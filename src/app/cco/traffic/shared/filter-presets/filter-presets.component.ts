import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FavoritesApiService, FilterPresets, FilterPresetsCreate, SettingJson, SettingType, TrafficFieldType, TrafficReportType, TrafficType } from '../favorites-api.service';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-filter-presets',
  templateUrl: './filter-presets.component.html',
  styleUrls: ['./filter-presets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPresetsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() trafficType: TrafficType;
  @Input() reportType: TrafficReportType;
  @Input() selectedTimeFrame: number;
  @Input() selectedApplicationIds: string[];
  @Input() selectedApplicationGroupIds: string[];
  @Input() selectedLocationIds: string[];
  @Input() applications: { _id: string, name: string }[];
  @Input() applicationGroups: { id: string, name: string }[];
  @Input() locations: { value: string, name: string }[];
  @Input() reports: { value: string, name: string }[];
  @Input() selectedMetric: string;
  @Input() selectedCriteria: string;
  @Input() selectedStartDate: Date;
  @Input() selectedEndDate: Date;
  @Input() selectedLimit: number;
  @Input() selectedGroup: string;
  @Input() selectedDirection: string;
  @Input() selectedPeakRateFrom: number;
  @Input() selectedPeakRateTo: number;
  @Input() selectedPeriod: string;
  @Input() selectedThreshold: number;
  @Input() selectedEliminateUnknown: string;
  @Input() selectedThresholdType: string;
  @Input() selectedMonthYear: string;
  @Input() selectedStartHour: number;
  @Input() selectedEndHour: number;
  @Input() selectedRate: string;

  @Input() enableSave = false;
  @Input() showSensitiveInfo: string;

  @Output() onSelectFilterPreset = new EventEmitter<FilterPresets>();

  language: any;
  subscriptions: Subscription[] = [];
  successMessage = '';
  errorMessage = '';
  selectedFilter: FilterPresets;
  selectedFilterPreset: string;
  isDeleteSelected: boolean;
  filterName = '';
  filterPresets: FilterPresets[] = [];

  TrafficType = TrafficType;
  TrafficReportType = TrafficReportType;
  TrafficFieldType = TrafficFieldType;

  private settingType: SettingType;
  private trafficFields: TrafficFieldType[] = [];

  private messageTimeout: NodeJS.Timeout;

  private timeFrames = [
    { id: 1, name: '5 Minutes window' },
    { id: 2, name: '10 Minutes window' },
    { id: 3, name: '15 Minutes window' },
    { id: 4, name: '20 Minutes window' },
    { id: 5, name: '25 Minutes window' },
    { id: 6, name: '30 Minutes window' }
  ];

  private periods = [
    { name: 'Last month', id: '-1' },
    { name: 'Last 3 months', id: '-3' },
    { name: 'Last 6 months', id: '-6' },
    { name: 'Last year', id: '-12' },
  ];

  private thresholdTypes = [
    {
      name: 'All Endpoints',
      id: 'AllEndpoints'
    },
    {
      name: 'Static Endpoints',
      id: 'StaticEndpoints'
    }
  ];

  private directions = [
    {
      name: 'Down',
      id: 'Down'
    },
    {
      name: 'Up',
      id: 'Up'
    },
    {
      name: 'Both(Down+Up)',
      id: 'both'
    }
  ];
  public loading: boolean = false;
  constructor(
    private cdRef: ChangeDetectorRef,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private favoritesApiService: FavoritesApiService,
    private commonService: CommonService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reportType?.currentValue != changes.reportType?.previousValue && !changes.reportType?.firstChange
      || changes.showSensitiveInfo?.currentValue != changes.showSensitiveInfo?.previousValue && !changes.showSensitiveInfo?.firstChange) {
      this.setTypeFieldsByTrafficType();
      this.viewAllFilterPreset();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.subscriptions.push(this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    }));
    this.setTypeFieldsByTrafficType();
    this.viewAllFilterPreset();
  }

  get tooltipByType(): string {
    if (this.filterPresets?.length >= 10) {
      return this.language['Maximum number of filter presets reached.'];
    }
    else if (!this.enableSave) {
      switch (this.trafficType) {
        case TrafficType.LocationStandard:
        case TrafficType.LocationComparative:
        case TrafficType.LocationReport:
          return this.language['Location Id is required'];
        case TrafficType.ApplicationComparative:
          return this.language['Application Id is required'];
        case TrafficType.ApplicationStandard:
        case TrafficType.ApplicationReport:
          return 'Application Id or Application Group Id is required';
      }
    }
    return '';
  }

  isFieldVisible(type: TrafficFieldType): boolean {
    return this.trafficFields.includes(type);
  }

  saveFilterPreset(): void {
    this.loading = true;
    const filterDetails: FilterPresetsCreate = {
      settingType: this.settingType,
      settingName: this.filterName.trim(),
      settingJson: this.getSettingJsonToSave(),
    };
    this.subscriptions.push(this.favoritesApiService.saveFavorite(filterDetails).subscribe((result: FilterPresets) => {
      this.processSettingJson(result);
      this.filterPresets.unshift(result);
      this.selectedFilter = result;
      this.showMessage(this.language['Saved Successfully'], true);
      this.loading = false;
      this.dialogService.dismissAll();
      this.cdRef.markForCheck();
    }, (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)));
  }

  selectFilterPreset(selected: FilterPresets) {
    this.selectedFilter = selected;
    this.deleteFilter(false);
  }

  applyFilterPreset(selected: FilterPresets) {
    this.onSelectFilterPreset.emit(selected);
  }

  confirmDeleteFilter(): void {
    this.loading = true;
    this.subscriptions.push(this.favoritesApiService.deleteFavorite(this.selectedFilter?.id).subscribe((result) => {
      this.filterPresets = this.filterPresets.filter(f => f?.id != this.selectedFilter?.id);
      this.selectedFilter = this.filterPresets[0];
      this.showMessage(this.language['Deleted Successfully'], true);
      this.loading = false;
      this.cdRef.markForCheck();
    }, (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)
    ));
    this.isDeleteSelected = false;
  }

  deleteFilter(isDelete: boolean) {
    this.closeAlert();
    this.isDeleteSelected = isDelete;
  }

  private viewAllFilterPreset(): void {
    this.loading = true;
    this.subscriptions.push(this.favoritesApiService.getAllFavorites(this.settingType).subscribe((result) => {
      result.forEach(r => this.processSettingJson(r));
      this.filterPresets = result;
      this.selectedFilter = result[0];
      this.loading = false;
      this.cdRef.markForCheck();
    }, (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)
    ));
  }

  private processSettingJson(filter: FilterPresets) {
    filter.settingJsonTyped = JSON.parse(filter.settingJson);
    if (filter.settingJsonTyped.fromDate) {
      filter.settingJsonTyped.fromDate = new Date(filter.settingJsonTyped.fromDate);
    }
    if (filter.settingJsonTyped.toDate) {
      filter.settingJsonTyped.toDate = new Date(filter.settingJsonTyped.toDate);
    }
  }

  private getSettingJsonToSave(): string {
    const settingJson: SettingJson = {
      timeFrame: this.selectedTimeFrame,
      application: this.selectedApplicationIds,
      applicationGroup: this.selectedApplicationGroupIds,
      location: this.selectedLocationIds,
      metric: this.selectedMetric,
      reportType: this.reportType,
      criteria: this.selectedCriteria,
      fromDate: this.selectedStartDate,
      toDate: this.selectedEndDate,
      limit: this.selectedLimit,
      group: this.selectedGroup,
      direction: this.selectedDirection,
      peakRateFrom: this.selectedPeakRateFrom,
      peakRateTo: this.selectedPeakRateTo,
      period: this.selectedPeriod,
      threshold: this.selectedThreshold,
      eliminateUnknown: this.selectedEliminateUnknown,
      thresholdType: this.selectedThresholdType,
      monthYear: this.selectedMonthYear,
      startHour: this.selectedStartHour,
      endHour: this.selectedEndHour,
      rate: this.selectedRate
    };

    const settingModel = {};

    this.trafficFields.forEach(f => settingModel[f] = settingJson[f]);

    return JSON.stringify(settingModel);
  }

  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  showModal(modal) {
    this.closeAlert();
    this.filterName = '';
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-default-modal clx-modal-default',
    });
  }

  showModalFilterPreset(modal) {
    this.closeAlert();
    this.selectedFilter = this.filterPresets[0];
    this.isDeleteSelected = false;
    this.dialogService.open(modal, {
      centered: true,
      windowClass: 'custom-default-modal clx-modal-med',
    });
  }

  getReportNameById(value: string) {
    const name = this.reports?.find(a => a.value == value)?.name;
    return this.language[name] ?? name;
  }

  getApplicationNameById(id: string) {
    return this.applications?.find(a => a._id == id)?.name ?? '';
  }

  getApplicationGroupsNameById(id: string) {
    return this.applicationGroups?.find(a => a.id == id)?.name ?? '';
  }

  getApplicationNames(selectedApplications: string[]) {
    return selectedApplications?.map(a => this.getApplicationNameById(a));
  }
  getApplicationGroupNames(selectedApplicationGroups: string[]) {
    return selectedApplicationGroups?.map(a => this.getApplicationGroupsNameById(a));
  }

  getLocationNameById(id: string) {
    return this.locations?.find(a => a.value == id)?.name ?? '';
  }

  getLocationNames(selectedLocations: string[]) {
    return this.locations?.length != selectedLocations?.length
      ? selectedLocations?.map(l => this.getLocationNameById(l))
      : [this.language['All']];
  }

  getTimeFrameNameById(id: number) {
    const name = this.timeFrames?.find(t => t.id == id)?.name;
    return this.language[name] ?? name;
  }

  getPeriodNameById(id: string) {
    const name = this.periods?.find(p => p.id == id)?.name;
    return this.language[name] ?? name;
  }

  getThresholdTypeNameById(id: string) {
    const name = this.thresholdTypes?.find(p => p.id == id)?.name;
    return this.language[name] ?? name;
  }

  getDirectionNameById(value: string) {
    const name = this.directions?.find(d => d.id == value)?.name;
    return this.language[name] ?? name;
  }

  private setTypeFieldsByTrafficType() {
    switch (this.trafficType) {

      //Real time types
      case TrafficType.Network:
        this.settingType = SettingType.TrafficNetworkRealtime;
        this.trafficFields = [TrafficFieldType.TimeFrame];
        break;

      case TrafficType.LocationStandard:
        this.settingType = SettingType.TrafficLocationsRealtimeStandardView;
        this.trafficFields = [TrafficFieldType.TimeFrame, TrafficFieldType.Location];
        break;

      case TrafficType.LocationComparative:
        this.settingType = SettingType.TrafficLocationsRealtimeComparativeView;
        this.trafficFields = [TrafficFieldType.TimeFrame, TrafficFieldType.Location, TrafficFieldType.Metric];
        break;

      case TrafficType.ApplicationStandard:
        this.settingType = SettingType.TrafficApplicationsRealtimeStandardView;
        this.trafficFields = [TrafficFieldType.TimeFrame, TrafficFieldType.Application, TrafficFieldType.ApplicationGroup, TrafficFieldType.Location];
        break;

      case TrafficType.ApplicationComparative:
        this.settingType = SettingType.TrafficApplicationsRealtimeComparativeView;
        this.trafficFields = [TrafficFieldType.TimeFrame, TrafficFieldType.Application,
        TrafficFieldType.Location, TrafficFieldType.Metric];
        break;

      // Network Report types
      case TrafficType.NetworkReport:
        switch (this.reportType) {
          case TrafficReportType.Traffic:
            this.settingType = SettingType.TrafficNetworkReportTraffic;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate];
            break;
          case TrafficReportType.TopApplications:
            this.settingType = SettingType.TrafficNetworkReportTopApplications;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit, TrafficFieldType.Group, TrafficFieldType.Direction];
            break;
          case TrafficReportType.TopLocations:
            this.settingType = SettingType.TrafficNetworkReportTopLocations;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit, TrafficFieldType.Direction];
            break;
          case TrafficReportType.TopSubscribers:
            this.settingType = SettingType.TrafficNetworkReportTopSubscribers;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit, TrafficFieldType.Direction];
            break;
          case TrafficReportType.PowerUsers:
            this.settingType = SettingType.TrafficNetworkReportPowerUsers;
            this.trafficFields = [TrafficFieldType.Direction, TrafficFieldType.PeakRateFrom, TrafficFieldType.PeakRateTo,
            TrafficFieldType.Period];
            break;
          case TrafficReportType.ActiveSubscribers:
            this.settingType = SettingType.TrafficNetworkReportActiveSubscribers;
            this.trafficFields = [TrafficFieldType.Application, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Threshold, TrafficFieldType.EliminateUnknown, TrafficFieldType.ThresholdType];
            break;
          case TrafficReportType.SubscriberDistribution:
            this.settingType = SettingType.TrafficNetworkReportSubscriberDistribution;
            this.trafficFields = [TrafficFieldType.MonthYear, TrafficFieldType.Direction, TrafficFieldType.Threshold,
            TrafficFieldType.EliminateUnknown, TrafficFieldType.ThresholdType];
            break;
          case TrafficReportType.MonthlyUsageByApplication:
            this.settingType = SettingType.TrafficNetworkReportMonthlyUsageByApplication;
            this.trafficFields = [TrafficFieldType.Direction];
            break;
          case TrafficReportType.MonthlyUsageByServiceCategory:
            this.settingType = SettingType.TrafficNetworkReportMonthlyUsageByServiceCategory;
            this.trafficFields = [TrafficFieldType.Direction];
            break;
          case TrafficReportType.MaxDailyRate:
            this.settingType = SettingType.TrafficNetworkReportMaxDailyRate;
            this.trafficFields = [TrafficFieldType.FromDate, TrafficFieldType.EliminateUnknown];
            break;
          case TrafficReportType.AverageSubscriberRate:
            this.settingType = SettingType.TrafficNetworkReportAverageSubscriberRate;
            this.trafficFields = [TrafficFieldType.FromDate, TrafficFieldType.ToDate, TrafficFieldType.StartHour,
            TrafficFieldType.EndHour, TrafficFieldType.EliminateUnknown];
            break;
          case TrafficReportType.TopApplicationTraffic:
            this.settingType = SettingType.TrafficNetworkReportTopApplicationTraffic;
            this.trafficFields = [TrafficFieldType.Rate, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit];
            break;
        }
        break;

      // Location Report types
      case TrafficType.LocationReport:
        switch (this.reportType) {
          case TrafficReportType.Traffic:
            this.settingType = SettingType.TrafficLocationReportTraffic;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate];
            break;
          case TrafficReportType.TopSubscribers:
            this.settingType = SettingType.TrafficLocationReportTopSubscribers;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit, TrafficFieldType.Direction];
            break;
          case TrafficReportType.TopApplications:
            this.settingType = SettingType.TrafficLocationReportTopApplications;
            this.trafficFields = [TrafficFieldType.Criteria, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit, TrafficFieldType.Group, TrafficFieldType.Direction];
            break;
          case TrafficReportType.ActiveSubscribers:
            this.settingType = SettingType.TrafficLocationReportActiveSubscribers;
            this.trafficFields = [TrafficFieldType.Application, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Threshold, TrafficFieldType.EliminateUnknown, TrafficFieldType.ThresholdType];
            break;
          case TrafficReportType.SubscriberDistribution:
            this.settingType = SettingType.TrafficLocationReportSubscriberDistribution;
            this.trafficFields = [TrafficFieldType.MonthYear, TrafficFieldType.Direction, TrafficFieldType.Threshold,
            TrafficFieldType.EliminateUnknown, TrafficFieldType.ThresholdType];
            break;
          case TrafficReportType.MonthlyUsageByApplication:
            this.settingType = SettingType.TrafficLocationReportMonthlyUsageByApplication;
            this.trafficFields = [TrafficFieldType.Direction];
            break;
          case TrafficReportType.MonthlyUsageByServiceCategory:
            this.settingType = SettingType.TrafficLocationReportMonthlyUsageByServiceCategory;
            this.trafficFields = [TrafficFieldType.Direction];
            break;
          case TrafficReportType.MaxDailyRate:
            this.settingType = SettingType.TrafficLocationReportMaxDailyRate;
            this.trafficFields = [TrafficFieldType.FromDate, TrafficFieldType.EliminateUnknown];
            break;
          case TrafficReportType.AverageSubscriberRate:
            this.settingType = SettingType.TrafficLocationReportAverageSubscriberRate;
            this.trafficFields = [TrafficFieldType.FromDate, TrafficFieldType.ToDate, TrafficFieldType.StartHour,
            TrafficFieldType.EndHour, TrafficFieldType.EliminateUnknown];
            break;
          case TrafficReportType.TopApplicationTraffic:
            this.settingType = SettingType.TrafficLocationReportTopApplicationTraffic;
            this.trafficFields = [TrafficFieldType.Rate, TrafficFieldType.FromDate, TrafficFieldType.ToDate,
            TrafficFieldType.Limit];
            break;
        }
        this.trafficFields.push(TrafficFieldType.Location);
        break;

      // Application Report types
      case TrafficType.ApplicationReport:
        switch (this.reportType) {
          case TrafficReportType.Traffic:
            this.settingType = SettingType.TrafficApplicationReportTraffic;
            this.trafficFields = [TrafficFieldType.Application, TrafficFieldType.ApplicationGroup, TrafficFieldType.Location, TrafficFieldType.Criteria,
            TrafficFieldType.FromDate, TrafficFieldType.ToDate];
            break;
          case TrafficReportType.TopLocations:
            this.settingType = SettingType.TrafficApplicationReportTopLocations;
            this.trafficFields = [TrafficFieldType.Application, TrafficFieldType.ApplicationGroup, TrafficFieldType.Criteria, TrafficFieldType.FromDate,
            TrafficFieldType.ToDate, TrafficFieldType.Limit, TrafficFieldType.Direction];
            break;
          case TrafficReportType.TopSubscribers:
            this.settingType = SettingType.TrafficApplicationReportTopSubscribers;
            this.trafficFields = [TrafficFieldType.Application, TrafficFieldType.ApplicationGroup, TrafficFieldType.Criteria, TrafficFieldType.FromDate,
            TrafficFieldType.ToDate, TrafficFieldType.Limit, TrafficFieldType.Direction];
            break;
        }
        break;
    }
  }

  private showMessage(message: string, isSuccess: boolean) {
    this.loading = false;
    clearTimeout(this.messageTimeout);
    if (isSuccess) {
      this.successMessage = message;
    } else {
      this.errorMessage = message;
    }
    this.messageTimeout = setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }
}