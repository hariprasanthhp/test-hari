import { FilterPresets } from "src/app/cco/traffic/shared/favorites-api.service";

export  const mockSettingJson: FilterPresets = {
    "id": "2fe3cb4e-12cb-4088-9946-69d5cfee4bd8",
    "orgId": 10000,
    "tenantId": 0,
    "userId": 5061334584002760000,
    "settingType": "Traffic_Network_Report_TopApplications_Filter",
    "settingName": "test1",
    "settingJson": "{\"criteria\":\"usage\",\"fromDate\":\"2023-09-07T07:14:41.540Z\",\"toDate\":\"2023-09-13T07:14:41.540Z\",\"limit\":10,\"group\":\"no\",\"direction\":\"Down\"}",
    "createTime": null,
    "settingJsonTyped": {
        "criteria": "usage",
        "limit": 10,
        "group": "no",
        "direction": "Down"
    }
  };

  export   const mockFilterPreset = {
    "id": "fc67ceab-0c68-4faa-9f3c-cef0023c373d",
    "orgId": 10000,
    "tenantId": 0,
    "userId": 5061334584002760000,
    "settingType": "Traffic_Network_Report_Traffic_Filter",
    "settingName": "test",
    "settingJson": "{\"criteria\":\"rate\",\"fromDate\":\"2023-09-07T09:25:50.847Z\",\"toDate\":\"2023-09-13T09:25:50.847Z\"}",
    "createTime": null,
    "settingJsonTyped": {
      "criteria": "rate",
      "fromDate": new Date("2023-09-07T09:25:50.847Z"), // Convert to Date
      "toDate": new Date("2023-09-13T09:25:50.847Z"),  
          }
  };


 export const mockSelectedFilter:  FilterPresets = {
    "id": "2fe3cb4e-12cb-4088-9946-69d5cfee4bd8",
    "orgId": 10000,
    "tenantId": 0,
    "userId": 5061334584002760000,
    "settingType": "Traffic_Network_Report_TopApplications_Filter",
    "settingName": "test1",
    "settingJson": "{\"criteria\":\"usage\",\"fromDate\":\"2023-09-07T07:14:41.540Z\",\"toDate\":\"2023-09-13T07:14:41.540Z\",\"limit\":10,\"group\":\"no\",\"direction\":\"Down\"}",
    "createTime": null,
    "settingJsonTyped": {
        "criteria": "usage",
        "limit": 10,
        "group": "no",
        "direction": "Down"
    }
  };


 
  export const mockReports = [
    { value: 'report1', name: 'Report 1' },
    { value: 'report2', name: 'Report 2' },
    { value: 'report3', name: 'Report 3' },
  ]

  export const mockReportsLanguage  = {
    'Report 1': 'Report One',
    'Report 2': 'Report Two',
  }

  export const mockApplications =  [
    { _id: 'app1', name: 'App One' },
    { _id: 'app2', name: 'App Two' },
    { _id: 'app3', name: 'App Three' },
  ]


  export const mockLocations = [
    { value: 'location1', name: 'Location One' },
    { value: 'location2', name: 'Location Two' },
    { value: 'location3', name: 'Location Three' },
  ]