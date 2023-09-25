import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {
  public favSettingsURL = environment.API_BASE + "/v2/cmc/pref/user-settings";

  constructor(
    private httpClient: HttpClient) {
  }

  saveFavorite(filterPresets: FilterPresetsCreate): Observable<FilterPresets> {
    return this.httpClient.post<FilterPresets>(`${this.favSettingsURL}`, filterPresets);
  }

  getAllFavorites(settingType: string): Observable<FilterPresets[]> {
    return this.httpClient.get<FilterPresets[]>(`${this.favSettingsURL}?setting-type=${settingType}`);
  }

  getFavoriteById(id: string): Observable<FilterPresets[]> {
    return this.httpClient.get<FilterPresets[]>(`${this.favSettingsURL}/${id}`);
  }

  deleteFavorite(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.favSettingsURL}/${id}`);
  }
}

// Models
export interface FilterPresets extends FilterPresetsCreate {
  id: string,
  orgId: number,
  tenantId: number,
  userId: number,
  createTime: string,
  settingJsonTyped: SettingJson
}

export interface FilterPresetsCreate {
  settingType: string,
  settingName: string,
  settingJson: string,
}

export interface SettingJson {
  timeFrame?: number,
  application?: string[],
  applicationGroup?: string[],
  location?: string[],
  metric?: string,
  endPointId?: string,
  endPointName?: string,
  reportType?: string,
  criteria?: string,
  fromDate?: Date,
  toDate?: Date,
  limit?: number,
  group?: string,
  direction?: string,
  peakRateFrom?: number,
  peakRateTo?: number,
  period?: string,
  threshold?: number,
  eliminateUnknown?: string,
  thresholdType?: string,
  monthYear?: string,
  startHour?: number,
  endHour?: number,
  rate?: string
}

export enum TrafficType {
  //Real time types
  Network = "Network",
  LocationStandard = "LocationStandard",
  LocationComparative = "LocationComparative",
  ApplicationStandard = "ApplicationStandard",
  ApplicationComparative = "ApplicationComparative",

  //Report types
  NetworkReport = "NetworkReport",
  LocationReport = "LocationReport",
  ApplicationReport = "ApplicationReport",
}

export enum TrafficReportType {
  Traffic = "traffic",
  TopApplications = "top_applications",
  TopLocations = "top_locations",
  TopSubscribers = "top_subscribers",
  PowerUsers = "power_users",
  ActiveSubscribers = "active_subscribers",
  SubscriberDistribution = "subscriber_distribution",
  MonthlyUsageByApplication = "monthly_usage_byapplication",
  MonthlyUsageByServiceCategory = "monthly_usage_byservice_category",
  MaxDailyRate = "max_daily_rate",
  AverageSubscriberRate = "average_subscriber_rate",
  TopApplicationTraffic = "top_application_traffic",
  ApplicationTraffic = "application_traffic"
}

export enum FavoritePageType {
  EndPoint = "EndPoint",
  Traffic = "Traffic"
}

export enum TrafficFieldType {
  //Real time fields
  TimeFrame = 'timeFrame',
  Application = 'application',
  ApplicationGroup = 'applicationGroup',
  Location = 'location',
  Metric = 'metric',

  //Report fields
  Criteria = 'criteria',
  FromDate = 'fromDate',
  ToDate = 'toDate',
  Limit = 'limit',
  Group = 'group',
  Direction = 'direction',
  PeakRateFrom = 'peakRateFrom',
  PeakRateTo = 'peakRateTo',
  Period = 'period',
  Threshold = 'threshold',
  EliminateUnknown = 'eliminateUnknown',
  ThresholdType = 'thresholdType',
  MonthYear = 'monthYear',
  StartHour = 'startHour',
  EndHour = 'endHour',
  Rate = 'rate'
}

export enum SettingType {

  //Real time types
  TrafficNetworkRealtime = 'Traffic_Network_Realtime_Filter',
  TrafficLocationsRealtimeStandardView = 'Traffic_Locations_Realtime_StandardView_Filter',
  TrafficLocationsRealtimeComparativeView = 'Traffic_Locations_Realtime_ComparativeView_Filter',
  TrafficApplicationsRealtimeStandardView = 'Traffic_Applications_Realtime_StandardView_Filter',
  TrafficApplicationsRealtimeComparativeView = 'Traffic_Applications_Realtime_ComparativeView_Filter',

  // Network Report types
  TrafficNetworkReportTraffic = 'Traffic_Network_Report_Traffic_Filter',
  TrafficNetworkReportTopApplications = 'Traffic_Network_Report_TopApplications_Filter',
  TrafficNetworkReportTopLocations = 'Traffic_Network_Report_TopLocations_Filter',
  TrafficNetworkReportTopSubscribers = 'Traffic_Network_Report_TopSubscribers_Filter',
  TrafficNetworkReportPowerUsers = 'Traffic_Network_Report_PowerUsers_Filter',
  TrafficNetworkReportActiveSubscribers = 'Traffic_Network_Report_ActiveSubscribers_Filter',
  TrafficNetworkReportSubscriberDistribution = 'Traffic_Network_Report_SubscriberDistribution_Filter',
  TrafficNetworkReportMonthlyUsageByApplication = 'Traffic_Network_Report_MonthlyUsageByApplication_Filter',
  TrafficNetworkReportMonthlyUsageByServiceCategory = 'Traffic_Network_Report_MonthlyUsageByServiceCategory_Filter',
  TrafficNetworkReportMaxDailyRate = 'Traffic_Network_Report_MaxDailyRate_Filter',
  TrafficNetworkReportAverageSubscriberRate = 'Traffic_Network_Report_AverageSubscriberRate_Filter',
  TrafficNetworkReportTopApplicationTraffic = 'Traffic_Network_Report_TopApplicationTraffic_Filter',

  // Location Report types
  TrafficLocationReportTraffic = 'Traffic_Location_Report_Traffic_Filter',
  TrafficLocationReportTopSubscribers = 'Traffic_Location_Report_TopSubscribers_Filter',
  TrafficLocationReportTopApplications = 'Traffic_Location_Report_TopApplications_Filter',
  TrafficLocationReportActiveSubscribers = 'Traffic_Location_Report_ActiveSubscribers_Filter',
  TrafficLocationReportSubscriberDistribution = 'Traffic_Location_Report_SubscriberDistribution_Filter',
  TrafficLocationReportMonthlyUsageByApplication = 'Traffic_Location_Report_MonthlyUsageByApplication_Filter',
  TrafficLocationReportMonthlyUsageByServiceCategory = 'Traffic_Location_Report_MonthlyUsageByServiceCategory_Filter',
  TrafficLocationReportMaxDailyRate = 'Traffic_Location_Report_MaxDailyRate_Filter',
  TrafficLocationReportAverageSubscriberRate = 'Traffic_Location_Report_AverageSubscriberRate_Filter',
  TrafficLocationReportTopApplicationTraffic = 'Traffic_Location_Report_TopApplicationTraffic_Filter',

  // Application Report types
  TrafficApplicationReportTraffic = 'Traffic_Application_Report_Traffic_Filter',
  TrafficApplicationReportTopLocations = 'Traffic_Application_Report_TopLocations_Filter',
  TrafficApplicationReportTopSubscribers = 'Traffic_Application_Report_TopSubscribers_Filter'
}