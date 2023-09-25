import { FilterPresets } from "src/app/cco/traffic/shared/favorites-api.service";

export const mockFavoriteEndPoints = [
    {
      "id": "b1d9898f-1e95-46e7-bc56-0da771345b09",
      "orgId": 125700,
      "tenantId": 0,
      "userId": 6739002363483263000,
      "settingType": "Traffic_Realtime_Endpoint",
      "settingName": "am*********",
      "settingJson": "{\"endPointId\":\"f6ccc137-0d9a-43ec-bb03-bc5254da1097\",\"endPointName\":\"amreg-3upd_be:cc:e2:d3:47:13\"}",
      "createTime": "2023-08-31T10:03:49.676+00:00",
      "settingJsonTyped": {
          "endPointId": "f6ccc137-0d9a-43ec-bb03-bc5254da1097",
          "endPointName": "am*********"
      }
  },
  {
      "id": "77274544-f53c-473b-8f5e-0c90c50f4707",
      "orgId": 125700,
      "tenantId": 0,
      "userId": 6739002363483263000,
      "settingType": "Traffic_Realtime_Endpoint",
      "settingName": "am*********",
      "settingJson": "{\"endPointId\":\"da865c1c-5580-4c71-9be6-c931783f3352\",\"endPointName\":\"amreg-4upd_be:cc:e2:d3:47:15\"}",
      "createTime": "2023-08-31T10:04:35.951+00:00",
      "settingJsonTyped": {
          "endPointId": "da865c1c-5580-4c71-9be6-c931783f3352",
          "endPointName": "am*********"
      }
  }    ];


  export const mockSaveFavorite = {
    "id": "e415d9e9-691c-40b6-816c-4f91d7c81015",
    "orgId": 125700,
    "tenantId": 0,
    "userId": 6739002363483263000,
    "settingType": "Traffic_Realtime_Endpoint",
    "settingName": "am*********",
    "settingJson": "{\"endPointId\":\"f6ccc137-0d9a-43ec-bb03-bc5254da1097\",\"endPointName\":\"amreg-3upd_be:cc:e2:d3:47:13\"}",
    "createTime": null,
    "settingJsonTyped": {
        "endPointId": "f6ccc137-0d9a-43ec-bb03-bc5254da1097",
        "endPointName": "am*********"
    }
};



export const mockDeleteItem = {
    "id": "e415d9e9-691c-40b6-816c-4f91d7c81015",
    "orgId": 125700,
    "tenantId": 0,
    "userId": 6739002363483263000,
    "settingType": "Traffic_Realtime_Endpoint",
    "settingName": "am*********",
    "settingJson": "{\"endPointId\":\"f6ccc137-0d9a-43ec-bb03-bc5254da1097\",\"endPointName\":\"amreg-3upd_be:cc:e2:d3:47:13\"}",
    "createTime": null,
    "settingJsonTyped": {
        "endPointId": "f6ccc137-0d9a-43ec-bb03-bc5254da1097",
        "endPointName": "am*********"
    }
};

export const mockSelectedendpoint: FilterPresets = {
    settingJsonTyped: {
      endPointName: 'traffic',
      endPointId: 'locations',
    },
    id: '',
    orgId: 0,
    tenantId: 0,
    userId: 0,
    createTime: '',
    settingType: '',
    settingName: '',
    settingJson: ''
  };


  export const mockSampleFavorite: FilterPresets = {
    settingJsonTyped: { endPointId: '001Id' },
    id: '',
    orgId: 0,
    tenantId: 0,
    userId: 0,
    createTime: '',
    settingType: '',
    settingName: '',
    settingJson: ''
  };


  export const mockDeleteEndpoint = {
    "id": "e415d9e9-691c-40b6-816c-4f91d7c81015",
    "orgId": 125700,
    "tenantId": 0,
    "userId": 6739002363483263000,
    "settingType": "Traffic_Realtime_Endpoint",
    "settingName": "am*********",
    "settingJson": "{\"endPointId\":\"f6ccc137-0d9a-43ec-bb03-bc5254da1097\",\"endPointName\":\"amreg-3upd_be:cc:e2:d3:47:13\"}",
    "createTime": null,
    "settingJsonTyped": {
        "endPointId": "f6ccc137-0d9a-43ec-bb03-bc5254da1097",
        "endPointName": "am*********"
    }
};