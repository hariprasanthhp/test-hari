export const workflow_opr_data = {
  orgId: "470053",
  name: "ABCD",
  selectedDeviceGroup: "Yes",
  groups: [
    "7f4b18d5-8c5e-4fe4-8741-0f0a15853c42",
    "ffd0e2f2-546b-41d6-8784-6b6bb598d5f8"
  ],
  actions: [
    {
      actionType: "Reboot"
    },
    {
      fileId: "630d6b4a8f082689ee9b6399",
      actionType: "Download SW/FW Image",
      profileName: "FullRel_SIGNED_EXOS_PH_R22.3.0.0.img"
    }
  ],
  execPolicy: {},
  policy: {},
  description: "some test might be here",
  fullGroupExecute: false,
  bPriorNewAndFailed: true,
  levelPassed: 3,
  source: ""
}

export const workflow_opr_execPolicy = {
  orgId: "470053",
  name: "ABCD",
  selectedDeviceGroup: "Yes",
  groups: [
    "7f4b18d5-8c5e-4fe4-8741-0f0a15853c42",
    "ffd0e2f2-546b-41d6-8784-6b6bb598d5f8"
  ],
  actions: [
    {
      actionType: "Edge Suites Bulk Activation",
      appType: "ProtectIQ"
    },
  ],
  execPolicy: {
    initialTrigger: {
      type: "Maintenance Window"
    },
    window: {
      type: "daily",
      startDateTime: "2022-10-21T07:05:26.061Z",
      windowLength: 3600,
      frequency: 1,
      recurrence: 1
    }
  },
  policy: {},
  description: "some test might be here",
  fullGroupExecute: false,
  bPriorNewAndFailed: true,
  levelPassed: 4,
  source: "",
  startTime: "2022-10-21T07:05:26.061Z"
}

export const workflowWithCpeEvent =   {
  _id: "9f682a63-c8fa-4890-a72e-0fb10effab7c",
  name: "24875",
  orgId: "470053",
  start: "2021-02-09T11:43:05.898Z",
  state: "Suspended",
  groups: [
    "731e5cb7-9f74-4fa6-af5d-a098ac1da8a7"
  ],
  actions: [
    {
      fileId: "630d6a4d8f082689ee9b6348",
      actionType: "Download SW/FW Image",
      fileStruct: {
        _id: "630d6a4d8f082689ee9b6348",
        name: "FullRel_EXOS_E2_R22.3.0.0.img",
        size: 40863231,
        type: "SW/FW Image",
        orgId: "0",
        models: [
          "GM1020"
        ],
        version: "22.3.0.0.33",
        password: "578d720",
        username: "940c24f",
        uploadTime: {
          $date: 1661823568440
        },
        description: "Calix Uploaded Release Image",
        manufacturer: "Calix",
        numberOfDownloads: 0
      },
      profileName: "FullRel_EXOS_E2_R22.3.0.0.img"
    }
  ],
  cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"serialNumber\":{\"$regex\":\"^CXNK00766A2B$\"}}]}',
  createTime: "2021-02-09T11:43:05.898Z",
  execPolicy: {
    initialTrigger: {
      type: "CPE Event",
      cpeEvent: "CC EVENT - New CPE Discovered"
    }
  },
  description: "rsdfcwrfc",
  fullGroupExecute: false,
  bPriorNewAndFailed: true
}

export const officialImage =     {
  actionType: "Download Official Image"
}