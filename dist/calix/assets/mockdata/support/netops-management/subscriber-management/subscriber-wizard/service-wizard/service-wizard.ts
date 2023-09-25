export const addDeviceObj_for_service = {
  isNewRecord: false,
  addDeviceTab: [
    "Device",
    "Services",
    "Additional Settings"
  ],
  showModeErrorMsg: false,
  showDeviceIDErrorMsg: false,
  showModelErrorMsg: false,
  configurationObj: {
    defaultLanValidation: false,
    serviceDialPlan: [
      {
        _id: "20c3d122-ab5a-41bd-90dc-fe338177b7b7",
        name: "lisa_test01",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: "5678"
      },
      {
        _id: "62cf2bce-f17a-4da4-8566-a74f42fcc11e",
        name: "lisa_test02",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "rsdfcwrfc"
      },
      {
        _id: "9c416332-528a-4a1e-9d30-ba9cb5039706",
        name: "srdfcesdvc",
        orgId: "470053",
        rules: [
          "^gbvtedfcxvdffctygvujh"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "sdcdfgvdfx"
      },
      {
        _id: "a07c9291-48f3-4c7a-ae88-fe9e3c15730c",
        name: "Lai_meta",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "sdfdds"
      },
      {
        _id: "3e2c6ee7-8d28-42fc-bfae-8f8d7f932009",
        name: "5432",
        orgId: "470053",
        rules: [
          "^98765"
        ],
        longTimer: 7,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "f7b5fb47-ac8f-4635-8817-219642b8c515",
        name: "844GE-soak",
        orgId: "470053",
        rules: [
          "^911n",
          "^S90d[0-9]{10}",
          "^[2-9][0-9]{9}",
          "^311"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "for soak"
      },
      {
        _id: "c04a8657-087a-4127-aae2-9b2359850a0a",
        name: "aliu-sip",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "35608538-d0b5-432d-89e8-e781201e9db9",
        name: "JH_111111",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}",
          "^S99d[0-9]{2}*T",
          "^226000",
          "^228000",
          "^229000",
          "^230000",
          "^231000",
          "^232000",
          "^233000",
          "^234000",
          "^235000",
          "^236000",
          "^237000",
          "^238000",
          "^239000",
          "^240000",
          "^241000",
          "^242000",
          "^243000",
          "^244000",
          "^245000",
          "^246000",
          "^247000",
          "^248000",
          "^249000",
          "^250000",
          "^251000",
          "^252000",
          "^253000",
          "^254000",
          "^255000",
          "^256000",
          "^257000",
          "^258000",
          "^259000",
          "^260000",
          "^261000",
          "^262000",
          "^263000",
          "^264000",
          "^265000",
          "^266",
          "^267000",
          "^268000",
          "^269000",
          "^270000",
          "^271000",
          "^2721000",
          "^274000",
          "^275000",
          "^276000",
          "^277000",
          "^278000",
          "^279000",
          "^280000",
          "^281000",
          "^282000",
          "^283000",
          "^284000",
          "^285000",
          "^286000",
          "^287000",
          "^288000",
          "^289000",
          "^290000",
          "^291000",
          "^292000",
          "^293000",
          "^294000",
          "^1201204[0-9]{4}",
          "^S92d[1-9][0-9]{5}*T",
          "^299000",
          "^300000",
          "^301000",
          "^302000",
          "^303000",
          "^304000",
          "^305000",
          "^306000",
          "^307000",
          "^3080000"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "987da63b-5bb0-4990-8d02-4541938a2401",
        name: "wefwesf",
        orgId: "470053",
        rules: [
          "^vfv dghnbtevfscdvwc"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "wesfcweafdc"
      },
      {
        _id: "a97c3d3a-df6d-4baf-a303-571c91a1e4dd",
        name: "sanitt2909dp",
        orgId: "470053",
        rules: [
          "^sanitt2909"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "sanitt2909"
      },
      {
        _id: "d64bd540-1158-4af0-8265-fcc03ef8b078",
        name: "232434242",
        orgId: "470053",
        rules: [
          "^sedazceadzfc"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "232323"
      },
      {
        _id: "d0db56c4-d480-495c-9459-7f3d42fe04d0",
        name: "ashwin45678",
        orgId: "470053",
        rules: [
          "^qedqede"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "tresdt56yftvuy"
      },
      {
        _id: "ead8c306-87f1-490a-a1e9-9fed8b7e32d4",
        name: "76544345678",
        orgId: "470053",
        rules: [
          "^35467897654"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "3456"
      },
      {
        _id: "4a0fd350-c5b8-462b-9e60-f4a32bc56fa4",
        name: "esrgfvsxf",
        orgId: "470053",
        rules: [
          "^fxbkvjfx"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: "dzvsdxvsd"
      },
      {
        _id: "f766792e-3855-4584-8edd-3ae1702ebba4",
        name: "ashwinfhgj",
        orgId: "470053",
        rules: [
          "^erfsdsfd"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: "dgfhj"
      },
      {
        _id: "6f10b878-7c8c-4950-86b7-483ea611c76c",
        name: "34567890",
        orgId: "470053",
        rules: [
          "^etryfug"
        ],
        longTimer: 18,
        shortTimer: 14,
        description: "765445"
      },
      {
        _id: "34ba34f9-5b02-4bf3-9300-05226f177e98",
        name: "tcfghctvyv",
        orgId: "470053",
        rules: [
          "^dszfcwsd"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "cryvghbh"
      },
      {
        _id: "749d43ee-ef5f-4843-b37e-e19cb7ee108c",
        name: "xvvbfdxc",
        orgId: "470053",
        rules: [
          "^tedgvetrdfgverd"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "ersdfcsedz"
      },
      {
        _id: "8ec86a95-a21a-48a8-b1e7-601ed5899f3c",
        name: "sfwsc",
        orgId: "470053",
        rules: [
          "^etgtgevdf"
        ],
        longTimer: 19,
        shortTimer: 1,
        description: "svcsdcsd"
      },
      {
        _id: "2a2f871c-f2f6-4365-9e5b-73f70c92ed2a",
        name: "adadfada",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 16,
        shortTimer: 10,
        description: "adad"
      },
      {
        _id: "7412a0a8-7b08-414c-9a93-aff32af90787",
        name: "french1908p",
        orgId: "470053",
        rules: [
          "^french1908"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "french1908"
      },
      {
        _id: "cf0750b9-ed95-4d34-8180-940588d8d471",
        name: "trert",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "hghgkh"
      },
      {
        _id: "bcf6b65b-42e0-420a-9928-888e12cc91f8",
        name: "tyutyityfg",
        orgId: "470053",
        rules: [
          "^123345"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "fj"
      },
      {
        _id: "19f1f93c-79bb-45e0-9b32-2b286e3c4307",
        name: "Test",
        orgId: "470053",
        rules: [
          "^{5}"
        ],
        longTimer: 9,
        shortTimer: 6,
        description: "3456"
      },
      {
        _id: "0818f651-4320-4f12-b0fa-3b7528f3c94e",
        name: "9823",
        orgId: "470053",
        rules: [
          "^123456"
        ],
        longTimer: 7,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "19ffeb94-ce81-4c1a-a801-15d5aa9317bd",
        name: "4567",
        orgId: "470053",
        rules: [
          "^{5}5"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "61f4f107-5198-444b-a604-69b64e5b8702",
        name: "Purge11",
        orgId: "470053",
        rules: [
          "^rgvrfdvrtfd"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "autotest"
      },
      {
        _id: "50693fb0-b440-4b13-82eb-abc3d6a53892",
        name: "98742267427",
        orgId: "470053",
        rules: [
          "^RJHBCS"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "983478983"
      },
      {
        _id: "083b49e9-a306-4aae-86af-6e06562a2eaa",
        name: "ffff",
        orgId: "470053",
        rules: [
          "^f"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "210c08ca-8cf3-4127-9639-2d3dea301438",
        name: "     ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "9f91d9d1-c332-4146-a49d-b8a50113fc63",
        name: "347673487",
        orgId: "470053",
        rules: [
          "^evvfjkcf"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "76353784"
      },
      {
        _id: "a30c93b9-97cd-4369-b2f4-62a492fa609f",
        name: "zxcvxzcvzxcv",
        orgId: "470053",
        rules: [
          "^fftfuyitrdtyf"
        ],
        longTimer: 18,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "c1f785b6-a4b4-4756-a99d-20c40fe34c5b",
        name: "      math",
        orgId: "470053",
        rules: [
          "^311"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "2fdc25e4-2d19-4dd7-a389-2c61bb32fab0",
        name: "r7ywu8gfcbh",
        orgId: "470053",
        rules: [
          "^grbt5rfgr"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "vu7ybyuiuvy"
      },
      {
        _id: "57866aa5-4343-4309-a00f-f0e24b9faec1",
        name: "rt2708 dp",
        orgId: "470053",
        rules: [
          "^rt2708"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2708upda"
      },
      {
        _id: "f8bf0eaf-38c3-4215-a071-a4cd91bf8738",
        name: "gchbdr",
        orgId: "470053",
        rules: [
          "^terfscasz"
        ],
        longTimer: 19,
        shortTimer: 2,
        description: "dgfrvdx"
      },
      {
        _id: "c7a51231-3902-4157-930d-7ca98f58aae5",
        name: "dian",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "rtyu"
      },
      {
        _id: "8f18393d-fa0d-42eb-aae9-57d1d7195739",
        name: "SDDFWES",
        orgId: "470053",
        rules: [
          "^%tEGFVSDCZX "
        ],
        longTimer: 18,
        shortTimer: 3,
        description: "W4EADXQ"
      },
      {
        _id: "bdf38bb4-1a2d-4a52-8303-71180d57b10e",
        name: "Test34567",
        orgId: "470053",
        rules: [
          "^1234g"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "1ac12083-3292-4f01-9987-d74f4e946b17",
        name: "dd22",
        orgId: "470053",
        rules: [
          "^h"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "83fb4a70-592b-48a9-ac71-c8069ad62845",
        name: "bbbd",
        orgId: "470053",
        rules: [
          "^fhfh"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "dhhdhh"
      },
      {
        _id: "614de1aa-16d5-4ce3-ba71-1c54703614b7",
        name: "cbcbcb",
        orgId: "470053",
        rules: [
          "^fhhfh"
        ],
        longTimer: 20,
        shortTimer: 4,
        description: "dd"
      },
      {
        _id: "283c2d1a-5b6f-4105-b9ad-6b92e5633c2e",
        name: "sdjfdhfj",
        orgId: "470053",
        rules: [
          "^djdjdj",
          "^hhh[0-9]"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "fhfhfh"
      },
      {
        _id: "15fb7003-061f-4f2e-9ced-f0d964838a33",
        name: "12345678901234567890",
        orgId: "470053",
        rules: [
          "^djfhdjskf"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "56466099-5bce-41e8-a63b-33d48cb002a4",
        name: "0903regression",
        orgId: "470053",
        rules: [
          "^rules",
          "^fdf"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "description"
      },
      {
        _id: "66b9ddb4-1e95-46c8-8196-eb29707d11ea",
        name: "Test01",
        orgId: "470053",
        rules: [
          "^dfd"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "1e4a30f0-7c65-4fdf-a4d8-a5fd945e3e9c",
        name: "testo",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "9b80b989-8583-4aa6-a550-72ff451c2fb2",
        name: "test",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "ebad95db-0bd7-4536-843f-95e76afdc061",
        name: "sdsf",
        orgId: "470053",
        rules: [
          "^dhgcytdyt"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "2b113648-f087-4617-9960-897404ef541c",
        name: "cpsanity2109dp",
        orgId: "470053",
        rules: [
          "^cpsanity2109"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "cpsanity2109"
      },
      {
        _id: "71cfc410-652c-4cdb-acb5-ccca43eccb54",
        name: "sunday",
        orgId: "470053",
        rules: [
          "^ko"
        ],
        longTimer: 8,
        shortTimer: 4,
        description: "day"
      },
      {
        _id: "8b64a51b-4154-48fa-b2bd-0562dd9ef630",
        name: "24r3fwe",
        orgId: "470053",
        rules: [
          "^RSVSFVF"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: "wrfcwf"
      },
      {
        _id: "c223bb71-975c-4d29-8ee6-770dea8e3e80",
        name: "mrt20081 dp",
        orgId: "470053",
        rules: [
          "^mrt20081"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "mrt20081 upd"
      },
      {
        _id: "68fba50f-9cfb-405a-af3d-b5b64a9bf2f7",
        name: "fren2008",
        orgId: "470053",
        rules: [
          "^fren2008"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "fren2008"
      },
      {
        _id: "fbc7d0aa-a8a9-4fc0-bc20-76c521f09473",
        name: "0207dial plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "0207dial plan"
      },
      {
        _id: "aaeb4035-3595-4818-aab4-d74309e10ba6",
        name: "rt2408adp",
        orgId: "470053",
        rules: [
          "^rt2408a"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2408aUpdate"
      },
      {
        _id: "ac76decb-0774-4826-99a9-e7932f5b6ee6",
        name: "0507dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "0507dialplan"
      },
      {
        _id: "75760be0-683b-4de2-bebe-2869494b2fb3",
        name: "st27082dp",
        orgId: "470053",
        rules: [
          "^st27082"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st27082dp"
      },
      {
        _id: "21269712-d320-4483-b279-d45fc28d7091",
        name: "rrrar",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 8,
        shortTimer: 3,
        description: "dsfd"
      },
      {
        _id: "8d93dca4-f3d5-40ec-a565-421b0745ae55",
        name: "coc yuan dial",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "08b3a540-8105-4375-ad68-a29fbd14bf1f",
        name: "Ruby",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "da1cc9d1-c224-44e2-a499-a456c99a5c80",
        name: "sdfds",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "31b43b23-d1ce-4f99-8268-b554291be17b",
        name: "rt0209 dp",
        orgId: "470053",
        rules: [
          "^rt0209"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "rt0209 dpupdate"
      },
      {
        _id: "a14d1035-14e5-4fa7-a2f4-e3b4b11d1c02",
        name: "jkong_sip_profile",
        orgId: "470053",
        rules: [
          "^[0-9]{10}",
          "^911",
          "^S[0-9]{12}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "jkong"
      },
      {
        _id: "418a2cf3-2c71-42e8-a055-270d65007fc6",
        name: "2107dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "2107dialplanureer"
      },
      {
        _id: "173c5634-f770-43c2-a1f7-4f07fe323f18",
        name: "st2107dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st2107"
      },
      {
        _id: "2ea05c75-a4b6-4999-bc50-0ac3e1fe4b93",
        name: "stdialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "8d67821b-d855-4758-8ecc-726923fe592b",
        name: "rt0309dp",
        orgId: "470053",
        rules: [
          "^546465"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt0309"
      },
      {
        _id: "2181e81b-cd07-42a2-b21a-8c60873c7377",
        name: "0907dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "0907dialplan"
      },
      {
        _id: "46f0939c-b962-47e8-bb98-00b54875a69e",
        name: "        ",
        orgId: "470053",
        rules: [
          "^9"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "86f727d1-2290-439c-9171-4d7acaf4ab46",
        name: "2407dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "1d5bb5d0-b56c-4498-8c16-525a4fc6be31",
        name: "tester",
        orgId: "470053",
        rules: [
          "^rwuak"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "test1"
      },
      {
        _id: "d683e536-9333-4c3d-bb67-5975e78c3369",
        name: "gvcbdhikcui",
        orgId: "470053",
        rules: [
          "^mkefecklcd"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "ghjnm"
      },
      {
        _id: "08b555b2-d631-426a-b0e1-95cf7a27bf9d",
        name: "fren20082021 dp",
        orgId: "470053",
        rules: [
          "^fren20082021"
        ],
        longTimer: 7,
        shortTimer: 3,
        description: "fren20082021"
      },
      {
        _id: "25f2f656-7cc8-4471-8f2b-821f14ae102c",
        name: "Clarence_Dial_Plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "72f66884-d297-45f1-ade0-e32ae2198090",
        name: "sdfdsdfds",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 10,
        shortTimer: 3,
        description: "dsfsd"
      },
      {
        _id: "7257a1c2-a743-4945-a295-fb6fedb8d41f",
        name: "mrt2707dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "sdfdsiupd"
      },
      {
        _id: "654f0b54-a5d4-42b6-bd2a-3467a15dad88",
        name: "wwrerwwe",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "28a15039-e050-4905-8822-516b3b3db37a",
        name: "mrt2807dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "mrt2807Upd"
      },
      {
        _id: "2cdf2a43-2b12-4c6f-babe-72dde81a6ee8",
        name: "testen dp",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "dsf"
      },
      {
        _id: "17a86bd9-5a4c-4b74-b6f0-f400e76595cf",
        name: "cco_yuan_dial",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "d6000046-d6ad-4ef4-988c-174ba9477fdb",
        name: "cco_yuan_dial_long",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "5ef66cba-77cb-498f-8634-3eac1f581972",
        name: "rt0909 dp",
        orgId: "470053",
        rules: [
          "^rt0909"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt0909dpupdate"
      },
      {
        _id: "d500c6b9-eddc-47e0-80ca-0382273c12b4",
        name: "fresh",
        orgId: "470053",
        rules: [
          "^8"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "7a6d87d4-3d4c-482d-9d9f-4fa653015c21",
        name: "st1309dp",
        orgId: "470053",
        rules: [
          "^st1309"
        ],
        longTimer: 8,
        shortTimer: 2,
        description: "st1309d"
      },
      {
        _id: "43d70838-c269-4030-8c7d-6a0a980edd8f",
        name: "newuser",
        orgId: "470053",
        rules: [
          "^45"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "dffd"
      },
      {
        _id: "ce2c83a3-663b-4e01-8785-b81f36f80c46",
        name: "newname",
        orgId: "470053",
        rules: [
          "^gh"
        ],
        longTimer: 9,
        shortTimer: 7,
        description: "jhbjbkj"
      },
      {
        _id: "5bade574-139c-4813-8bc3-95e3144ff743",
        name: "dfdf",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "dsfsd"
      },
      {
        _id: "c763034f-d3a1-4d00-8e98-689025808245",
        name: "sisiCorrect",
        orgId: "470053",
        rules: [
          "^[2-9][0-9]{9}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "5b9321dc-c898-49c5-b420-99156cd1eaa2",
        name: "sdfs",
        orgId: "470053",
        rules: [
          "^sfs"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: "sdf"
      },
      {
        _id: "5a1320ec-27b9-4f62-8ab6-173989b0b674",
        name: "richardui",
        orgId: "470053",
        rules: [
          "^fdgafg"
        ],
        longTimer: 15,
        shortTimer: 10,
        description: "autotest"
      },
      {
        _id: "d10571a1-6ce8-4c9d-bef6-81ac1162a77c",
        name: "richard mathew",
        orgId: "470053",
        rules: [
          "^kjb"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "autotest"
      },
      {
        _id: "3370766f-4b26-4aae-8f55-1bb5bae726e7",
        name: "jd dial",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: "jd dial"
      },
      {
        _id: "30ebe046-6b0a-43aa-b69b-b554ef041dc9",
        name: "nrt1509dpp",
        orgId: "470053",
        rules: [
          "^nrt15093"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "nrt1509sdfs"
      },
      {
        _id: "81304a8b-ab87-4e3d-91d8-7a3a2066fc91",
        name: "cepm dial plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "cepm"
      },
      {
        _id: "e47212f3-87f1-4fe7-8eea-db4fd4e54e60",
        name: "BHDBHBDHB",
        orgId: "470053",
        rules: [
          "^dnfddhf"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "hdfbhbhbf"
      },
      {
        _id: "d1b234ae-a177-40a0-9c70-3c9e789cd4a5",
        name: "st2608dp",
        orgId: "470053",
        rules: [
          "^st2608"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "st2608"
      },
      {
        _id: "6162e1d2-0fef-4599-9b8c-b02e500492a0",
        name: "rt2907",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "zcxzcszc"
      },
      {
        _id: "8ca32447-a0b5-44ca-8d27-04df461b12b8",
        name: "st3108dp",
        orgId: "470053",
        rules: [
          "^st3108"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st3108"
      },
      {
        _id: "910eb181-3820-4a64-8c45-d097867a1c73",
        name: "mrt3007 dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt3007up1"
      },
      {
        _id: "b18f693d-c84c-4f09-b409-0e95e2e0ee4c",
        name: "rt0609dp",
        orgId: "470053",
        rules: [
          "^rt0609"
        ],
        longTimer: 7,
        shortTimer: 3,
        description: "rt0609dpupdate"
      },
      {
        _id: "6572a766-8e30-4433-9ebd-ed32a16cbc6e",
        name: "mrt0208dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt0208upd"
      },
      {
        _id: "7d6e52a5-e3d6-4552-bf95-15c673a7e8ed",
        name: "cell ",
        orgId: "470053",
        rules: [
          "^change"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "cd8632e8-3120-433c-899f-7b97d3c84bdd",
        name: "st0609dp",
        orgId: "470053",
        rules: [
          "^st0609"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0609dp"
      },
      {
        _id: "5c5f70c1-32c1-4c6b-b7fa-ac0c0c2dc0c9",
        name: "st0809dp",
        orgId: "470053",
        rules: [
          "^st0809"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "st0809"
      },
      {
        _id: "6537e633-a15b-45ee-a8bb-e36fde7ff694",
        name: "Length 2003",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "EXOS-8575"
      },
      {
        _id: "8216657a-5574-4070-bdfc-f97f9382e6f5",
        name: "bfbf",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "fdbfdbfdb"
      },
      {
        _id: "e2b54ac0-a70c-43d8-9755-c8618b503e3d",
        name: "rt1309dp",
        orgId: "470053",
        rules: [
          "^rt1309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt1309dpupdate"
      },
      {
        _id: "33b5c3ce-1ecd-4b68-ac36-b7fef2b1f47c",
        name: "st1409dp",
        orgId: "470053",
        rules: [
          "^st1409"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1409"
      },
      {
        _id: "f40bc227-d214-4268-adaf-6d8f1ac692de",
        name: "pt1509 dp",
        orgId: "470053",
        rules: [
          "^pt1509"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "pt1509updat"
      },
      {
        _id: "7f6b4e56-0669-4f97-acc3-731256c70125",
        name: "mrt0508dp",
        orgId: "470053",
        rules: [
          "^mrt0508"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt0508upd"
      },
      {
        _id: "9cc67f59-29ae-41e1-b16b-647ffa178a3a",
        name: "mrt0608 dp",
        orgId: "470053",
        rules: [
          "^454"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "mrt0608update"
      },
      {
        _id: "c5ce5a03-e888-4f48-afd8-126bf1d58b2f",
        name: "rt07081 dp",
        orgId: "470053",
        rules: [
          "^rt07081"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt07081update"
      },
      {
        _id: "8a1c98b3-d0c5-4f0d-afd3-32af81314d44",
        name: "s10908dp",
        orgId: "470053",
        rules: [
          "^154545"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "s10908update"
      },
      {
        _id: "eb68940a-81fa-4ef8-b347-c7276dcb2fc4",
        name: "s11008dp",
        orgId: "470053",
        rules: [
          "^23423423"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "s11008"
      },
      {
        _id: "4287dcaf-5b94-421b-af2c-378e07397af6",
        name: "rt1108dp",
        orgId: "470053",
        rules: [
          "^454654"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt1108upd"
      },
      {
        _id: "33498366-6607-491e-b72c-ea7d80a01919",
        name: "rt1208dp",
        orgId: "470053",
        rules: [
          "^32423"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt1208"
      },
      {
        _id: "7e368651-ac6d-467f-bb19-c6b4b69175de",
        name: "rt3108dpppd",
        orgId: "470053",
        rules: [
          "^5234523"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt3108upddd"
      },
      {
        _id: "3bb04ca8-fd64-4f2a-8a6b-0a55c206668e",
        name: "compound",
        orgId: "470053",
        rules: [
          "^5"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "des"
      },
      {
        _id: "5ee4690b-a28d-495e-b46b-fdd303b5a543",
        name: "mrt1608dialp",
        orgId: "470053",
        rules: [
          "^mrt1608"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt1608update"
      },
      {
        _id: "4079e95b-b377-49fe-b7fd-5fba7e56d3b0",
        name: "23458tugy",
        orgId: "470053",
        rules: [
          "^tcdgcfyghbj"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "876545"
      },
      {
        _id: "37e72823-d681-4cca-8e31-313b5e8d716b",
        name: "st1609dp",
        orgId: "470053",
        rules: [
          "^st1609"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1609dp"
      },
      {
        _id: "b98673c3-f507-4bf7-af2b-63c8a09776fa",
        name: "      chakri",
        orgId: "470053",
        rules: [
          "^122"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "d544174e-5a47-4c9c-9c82-8f99af9ba83e",
        name: "st160922dp",
        orgId: "470053",
        rules: [
          "^st160922"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st160922"
      },
      {
        _id: "b17845b9-ef41-4492-b7fa-d5acf7711bb8",
        name: "Test0145",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 18,
        shortTimer: 8,
        description: "verify"
      },
      {
        _id: "e7c07bfc-cd01-4a84-9c0c-bb85f49bd01d",
        name: "rt1709dp",
        orgId: "470053",
        rules: [
          "^rt1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt1709dp updat"
      },
      {
        _id: "804586c3-5943-4e27-8a0a-c6b33d53f503",
        name: "st1709dp",
        orgId: "470053",
        rules: [
          "^st1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1709dp"
      },
      {
        _id: "412263f9-2d58-48ba-ab5d-bed81fcb8fd4",
        name: "sst1709dp",
        orgId: "470053",
        rules: [
          "^sst1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst1709dd"
      },
      {
        _id: "9d938388-6007-4376-876a-4098c40abb3e",
        name: "            ",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "8144e6b7-f1ff-4b11-9cf1-45d0d430a20e",
        name: "sst2009 dp",
        orgId: "470053",
        rules: [
          "^sst2009"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst2009"
      },
      {
        _id: "96744e51-b67f-492e-a885-78fd2fe9421b",
        name: "rtt2109 dp",
        orgId: "470053",
        rules: [
          "^rtt2109"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rtt2109update"
      },
      {
        _id: "5fbc0c5d-5d37-4810-a09a-0895b3a5948a",
        name: "ddd2109 dp",
        orgId: "470053",
        rules: [
          "^ddd2109"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ddd2109"
      },
      {
        _id: "168a3f3e-d411-4a7d-b38b-0a4044f8aaf8",
        name: "cccc2109 dp",
        orgId: "470053",
        rules: [
          "^cccc2109"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "cccc2109"
      },
      {
        _id: "27a25661-a0b0-4f11-93cf-a865fe911d77",
        name: "ff2209 dp",
        orgId: "470053",
        rules: [
          "^ff2209 "
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ff2209 "
      },
      {
        _id: "98760ce5-088e-4d35-b4ed-52deeb5b9a0f",
        name: "ch2209 dp",
        orgId: "470053",
        rules: [
          "^ch2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ch2209"
      },
      {
        _id: "3849ab96-a8ef-4f43-821a-61a946f82aaf",
        name: "st2209 dp",
        orgId: "470053",
        rules: [
          "^st2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2209"
      },
      {
        _id: "a51b2798-2ed9-4dc4-ae80-15a4642285a8",
        name: "cc2209dp",
        orgId: "470053",
        rules: [
          "^cc2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "cc2209"
      },
      {
        _id: "dda57b97-d02b-4a7b-ae85-85023c2cd9a7",
        name: "2309dp",
        orgId: "470053",
        rules: [
          "^470053"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "470053"
      },
      {
        _id: "6ab63724-3a0a-4265-a83f-272bb65ffdb1",
        name: "stg2309 dp",
        orgId: "470053",
        rules: [
          "^stg2309 dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "stg2309 dpupdate"
      },
      {
        _id: "6467ecf3-2a42-41f0-8eca-c225e975ec92",
        name: "ert2309",
        orgId: "470053",
        rules: [
          "^ert2309"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "ertupdat"
      },
      {
        _id: "217c6da3-4f01-4fe0-92eb-ca3cbae3801b",
        name: "est2309dp",
        orgId: "470053",
        rules: [
          "^est2309"
        ],
        longTimer: 7,
        shortTimer: 1,
        description: "est2309updat"
      },
      {
        _id: "30b5daa5-f4a7-4312-93e0-d54d336ebc8b",
        name: "csc2309 dp",
        orgId: "470053",
        rules: [
          "^csc2309"
        ],
        longTimer: 6,
        shortTimer: 3,
        description: "csc2309update"
      },
      {
        _id: "fefd53d7-a069-4f9e-905e-cb222d87c7ca",
        name: "Dep2309 dp",
        orgId: "470053",
        rules: [
          "^Dep2309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "Dep2309update"
      },
      {
        _id: "4bd9bc98-7f93-4063-b458-d864c544aa4b",
        name: "coc2309 dp",
        orgId: "470053",
        rules: [
          "^coc2309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "coc2309updateedi"
      },
      {
        _id: "d2f53830-6500-46ee-abbd-4f030e69f8bb",
        name: "csc1dp",
        orgId: "470053",
        rules: [
          "^csc1dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "csc1dpupdate"
      },
      {
        _id: "c00fd317-c91d-4ea8-92a5-f5d3e83bde20",
        name: "dep1 dp",
        orgId: "470053",
        rules: [
          "^dep1 dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "dep1 dpupdatedit"
      },
      {
        _id: "0cbc0583-2f71-4331-a48b-205c79ba0b26",
        name: "rt2409 dp",
        orgId: "470053",
        rules: [
          "^rt2409"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt2409update"
      },
      {
        _id: "cc39466f-4ed7-47a5-9e42-9437661b69d3",
        name: "rt2409c dp",
        orgId: "470053",
        rules: [
          "^rt2409c"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2409c"
      },
      {
        _id: "67af0aa0-28c1-4051-82db-95fc3fdf6fb2",
        name: "EXOS-8575",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "dial"
      },
      {
        _id: "3a426251-d434-4dfc-ade7-53b4645ec020",
        name: "9846",
        orgId: "470053",
        rules: [
          "^777"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "automation testing"
      },
      {
        _id: "72bc91b1-a8f7-49e5-8a1b-4e70cb177027",
        name: "derick133",
        orgId: "470053",
        rules: [
          "^2345vcdscda"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a6d370a2-4c37-4a7c-be63-bc63fcf1ec3f",
        name: "st2409 dp",
        orgId: "470053",
        rules: [
          "^st2409"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2409dpupdate"
      },
      {
        _id: "c3efacdf-ef0e-41a0-8504-ddcbffe8434d",
        name: "Test01778",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "demo01"
      },
      {
        _id: "eb974a0f-ad6e-43c8-9a22-6c53db9112c5",
        name: "dail",
        orgId: "470053",
        rules: [
          "^787"
        ],
        longTimer: 8,
        shortTimer: 4,
        description: "dialdail"
      },
      {
        _id: "8b67232b-9507-4b39-b130-554488c02cfa",
        name: "           ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "7de6c915-fe3b-4e8d-a9fc-7873571bf3b0",
        name: "Yonos",
        orgId: "470053",
        rules: [
          "^Yonos"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "Yonosdsf"
      },
      {
        _id: "c822c599-7ac6-4676-a815-0b30e7a4ef05",
        name: "st2709dp",
        orgId: "470053",
        rules: [
          "^st2709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2709dp"
      },
      {
        _id: "b03b1ff6-f7f1-44f4-a783-84bbeb6e70a5",
        name: "rt2809 dp",
        orgId: "470053",
        rules: [
          "^rt2809"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt2809dupdte"
      },
      {
        _id: "cb7faf36-99ff-4931-aaba-135bd5523a7e",
        name: "st2809 dp",
        orgId: "470053",
        rules: [
          "^st2809"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2809d1"
      },
      {
        _id: "2af27a70-3cc4-420d-a14a-972d0d901382",
        name: "st2809dpp",
        orgId: "470053",
        rules: [
          "^st2809"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st2809d"
      },
      {
        _id: "824f1726-69b6-4748-93f3-b52d41925cf1",
        name: "rtr2909dp",
        orgId: "470053",
        rules: [
          "^rtr2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtr2909d"
      },
      {
        _id: "8470e04a-4b6c-4ce8-a4ef-05c222a5ea27",
        name: "rtcco2909dp",
        orgId: "470053",
        rules: [
          "^rtcco2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtcco2909dd"
      },
      {
        _id: "35bc31e0-0940-4639-bee7-3140e71f992e",
        name: "st2909 dp",
        orgId: "470053",
        rules: [
          "^st2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2909dpupdate"
      },
      {
        _id: "ef2c32f0-7fbc-4e69-b654-06f281ef574e",
        name: "rt3009 dp",
        orgId: "470053",
        rules: [
          "^rt3009"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt3009dupdat"
      },
      {
        _id: "f4f267ef-248f-4859-bc7a-bb1e2ee24f50",
        name: "ForTest3",
        orgId: "470053",
        rules: [
          "^1234"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "59c596d2-468a-4d82-9580-32ab0a7eba03",
        name: "ForTest1",
        orgId: "470053",
        rules: [
          "^1234"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "test_purpose"
      },
      {
        _id: "34886445-b070-4ab2-a9f3-cf5065f0e8fe",
        name: "rt0110dp",
        orgId: "470053",
        rules: [
          "^rt0110"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt0110ddupdate"
      },
      {
        _id: "735294f3-de51-4fe0-9abe-284a0a42603d",
        name: "st0110dp",
        orgId: "470053",
        rules: [
          "^st0110"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0110d"
      },
      {
        _id: "f55d58a3-0407-469f-818f-04369d59060b",
        name: "st0410dp",
        orgId: "470053",
        rules: [
          "^st0410"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0410d"
      },
      {
        _id: "f1828ff3-13ec-4496-96e5-132fadb0cc95",
        name: "rtc05101dp",
        orgId: "470053",
        rules: [
          "^rtc05101"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtc05101dpup"
      },
      {
        _id: "c3f3de4e-0034-4f48-b034-540cbbd6708e",
        name: "rtf0510dp",
        orgId: "470053",
        rules: [
          "^rtf0510"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtf0510d"
      },
      {
        _id: "05713815-7373-4488-88c9-de8b40ad9d71",
        name: "rtf05101dp",
        orgId: "470053",
        rules: [
          "^rtf0510"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtf0510xdq"
      },
      {
        _id: "3df6dc52-d567-4f52-a4db-565699d1ad6b",
        name: "st0610 dp",
        orgId: "470053",
        rules: [
          "^st0610"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0610dpuu"
      },
      {
        _id: "a0b24999-b3e0-43ef-bfeb-9c985e7b4d4c",
        name: "raja",
        orgId: "470053",
        rules: [
          "^10"
        ],
        longTimer: 9,
        shortTimer: 8,
        description: "raj"
      },
      {
        _id: "d3adbabb-b62f-4ec4-a8af-2b1b0974df98",
        name: "123556",
        orgId: "470053",
        rules: [
          "^112"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "Java,selenium"
      },
      {
        _id: "00d40d22-46d1-4bdd-84d0-3cff610cfa84",
        name: "                    ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "42a786fa-ac58-45f2-a3e1-0c1783706743",
        name: "sisiCOClongDial",
        orgId: "470053",
        rules: [
          "^S99[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "f958a92e-85ba-4f52-992f-f2c1af046700",
        name: "fgvd c",
        orgId: "470053",
        rules: [
          "^sdyuaxbhidc                                   ufgsh                                                                           fue"
        ],
        longTimer: 7,
        shortTimer: 5,
        description: "cd"
      },
      {
        _id: "e0266035-f02e-423f-b171-38754c2c716e",
        name: "gowtham78654",
        orgId: "470053",
        rules: [
          "^wedsxdvs"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "4716e2f5-a114-444d-af71-1ae53264c24a",
        name: "dialp",
        orgId: "470053",
        rules: [
          "^dialpsd"
        ],
        longTimer: 15,
        shortTimer: 10,
        description: "dialpadasfd"
      },
      {
        _id: "dbfb8850-9d29-40dc-8c92-fa35bf3487b9",
        name: "mani2",
        orgId: "470053",
        rules: [
          "^d"
        ],
        longTimer: 16,
        shortTimer: 11,
        description: ""
      },
      {
        _id: "83a0da24-d10e-4c56-9aa5-8a44720c3d9e",
        name: "navi",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 16,
        shortTimer: 15,
        description: "hggdx"
      },
      {
        _id: "3148da22-4fae-43b9-b717-782b35c69435",
        name: "kind",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 17,
        shortTimer: 16,
        description: "ggggggjiii"
      },
      {
        _id: "5b6a5169-fabb-41a9-9675-11a1687f3f17",
        name: "sdfersgfdv",
        orgId: "470053",
        rules: [
          "^fgbtrdfgvdf"
        ],
        longTimer: 16,
        shortTimer: 13,
        description: "qeqasdxwqsa"
      },
      {
        _id: "2b6e302a-4303-4092-9363-c40629a0d65a",
        name: "yuuu",
        orgId: "470053",
        rules: [
          "^788"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "thnt"
      },
      {
        _id: "76e3febc-21ff-4afa-b6e1-e1bfdc1f7e0c",
        name: "Test8",
        orgId: "470053",
        rules: [
          "^fweOIP().,"
        ],
        longTimer: 18,
        shortTimer: 11,
        description: "ertyuijkmn cvbnm"
      },
      {
        _id: "08ce895b-9435-493b-83e8-650d4e52c472",
        name: "dwgrvrgv",
        orgId: "470053",
        rules: [
          "^ergregerf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "erg55re"
      },
      {
        _id: "5c375c71-6b3f-47ab-8069-d8850dd86026",
        name: "gowthamhg",
        orgId: "470053",
        rules: [
          "^sfbvhk"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "autotest123"
      },
      {
        _id: "a9ef4fdd-69c7-4d14-8ea1-4fb47cc34473",
        name: "st0710dp",
        orgId: "470053",
        rules: [
          "^st0710"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "st0710d1"
      },
      {
        _id: "22985c38-c751-4209-abe2-85e857d92650",
        name: "hiii",
        orgId: "470053",
        rules: [
          "^9"
        ],
        longTimer: 18,
        shortTimer: 11,
        description: "ghgfhh"
      },
      {
        _id: "5a3a7165-299d-4bde-a73f-606b4b273bba",
        name: "sdsdf",
        orgId: "470053",
        rules: [
          "^sdf"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "sdf"
      },
      {
        _id: "38bf3920-286a-4beb-a3c7-a31f81d83963",
        name: "tsx14032022",
        orgId: "470053",
        rules: [
          "^tsx14032022"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "tsx14032022"
      },
      {
        _id: "8355560b-b672-4c1b-96bd-bcf58358a4c8",
        name: "q3t4berv",
        orgId: "470053",
        rules: [
          "^edcadc"
        ],
        longTimer: 14,
        shortTimer: 9,
        description: ""
      },
      {
        _id: "64cc5ace-d870-443a-98f8-2311601b7c59",
        name: "TEgdsdsyhd",
        orgId: "470053",
        rules: [
          "^yghjuu"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "TEgdsdsyhd."
      },
      {
        _id: "16c2ac05-b9bc-46c9-a01b-ad1d4b27ef62",
        name: "st0810dp",
        orgId: "470053",
        rules: [
          "^st0810"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0810d"
      },
      {
        _id: "98aee7e5-656f-4a2f-ad42-51735df3e816",
        name: "st11081 dp",
        orgId: "470053",
        rules: [
          "^st11081"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st11081"
      },
      {
        _id: "996c0956-6d96-4884-9574-0895d9a3bd2d",
        name: "ForautoTest3",
        orgId: "470053",
        rules: [
          "^4321"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "76b80a2b-a4c1-4643-a26c-d84d5e63427f",
        name: "st1810 dp",
        orgId: "470053",
        rules: [
          "^st1810"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st1810"
      },
      {
        _id: "e1a720fa-4587-47f2-ab1e-b235f9726eeb",
        name: "gowtham",
        orgId: "470053",
        rules: [
          "^wcjh"
        ],
        longTimer: 13,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "b07759ed-da4f-4555-b0d1-dc511f65b68a",
        name: "jjkf",
        orgId: "470053",
        rules: [
          "^6666"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "jkkkkkkkkkk"
      },
      {
        _id: "8b65f732-8f3a-4a10-babf-d6c9b2e0742a",
        name: "1uytgfdsf",
        orgId: "470053",
        rules: [
          "^gfct"
        ],
        longTimer: 9,
        shortTimer: 8,
        description: ""
      },
      {
        _id: "6b83f1f0-94a4-4565-aa77-067a6bfc85fd",
        name: "     ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "8d52f7ae-86f5-410e-8045-a01b83236a1f",
        name: "yctfugyibk",
        orgId: "470053",
        rules: [
          "^trhedrrefbgtegwrgbrsfv"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "edrfugy"
      },
      {
        _id: "bedadb14-53f4-48c0-b8ba-1efd5bae12be",
        name: "Fortestcheck",
        orgId: "470053",
        rules: [
          "^7412"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "42507e35-c781-4057-b2ad-016fea5c3b6e",
        name: "dp112",
        orgId: "470053",
        rules: [
          "^ahbsjw8"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "kcbjkadjs"
      },
      {
        _id: "c6ecd4f1-702a-4126-9243-115d9e3ac5a7",
        name: "sanity2403n",
        orgId: "470053",
        rules: [
          "^666"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "fjkldah"
      },
      {
        _id: "c8c69579-ed30-44e0-9dab-bd77cc28574d",
        name: "5643567y",
        orgId: "470053",
        rules: [
          "^wbysdhcd"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "1ee62afe-cea2-489c-a3c2-9d9ffd8e528f",
        name: "7654e",
        orgId: "470053",
        rules: [
          "^xrctvh"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: "234567"
      },
      {
        _id: "738e461d-680e-4e18-b47f-c39c62a0a845",
        name: "9uy879",
        orgId: "470053",
        rules: [
          "^893126 gubdhx"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a8da8389-a75b-4913-a236-150cce1e821d",
        name: "4637",
        orgId: "470053",
        rules: [
          "^tuweyib6437"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "5849"
      },
      {
        _id: "c9433f29-5884-467e-aff5-5f38732a2dd4",
        name: "gyfitkuykvjj",
        orgId: "470053",
        rules: [
          "^F"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "qsdtrv"
      },
      {
        _id: "2a513c1d-20cf-4f92-8043-28ff79f75255",
        name: "fdgdb",
        orgId: "470053",
        rules: [
          "^djh"
        ],
        longTimer: 15,
        shortTimer: 13,
        description: ""
      },
      {
        _id: "ecf65242-d562-4a05-bdca-344860e953de",
        name: "            ",
        orgId: "470053",
        rules: [
          "^511"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "79a4bca9-87f6-4b3b-85cd-1f27814a414b",
        name: "       jsdkljaflkjl",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "c9b8ad1a-d656-4d94-8db5-41a4db7b28bd",
        name: "lisa_sip",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "640d5781-7059-49eb-8644-5977672f905d",
        name: "r678",
        orgId: "470053",
        rules: [
          "^dfvxv"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "werty"
      },
      {
        _id: "e7a303d1-5e19-4397-8633-c5ba6075983c",
        name: "tweuygw",
        orgId: "470053",
        rules: [
          "^yvicuiwuiowe"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "dialplan00098"
      },
      {
        _id: "953242a8-6731-41b1-a695-5434fce392c1",
        name: "dp232",
        orgId: "470053",
        rules: [
          "^dp1123"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "2d1c2e0d-6a6e-4df8-b426-84baa5eac092",
        name: "static125s",
        orgId: "470053",
        rules: [
          "^adfgdf"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "static125"
      },
      {
        _id: "8f6fae5d-7f6c-4c74-9e19-103872cadd99",
        name: "q111",
        orgId: "470053",
        rules: [
          "^(&T%Uffgrgd"
        ],
        longTimer: 9,
        shortTimer: 7,
        description: "creating for demo purpose"
      },
      {
        _id: "bec81676-8865-48e2-96e4-016e5df87c2d",
        name: "Name",
        orgId: "470053",
        rules: [
          "^ddp"
        ],
        longTimer: 11,
        shortTimer: 8,
        description: "Description "
      },
      {
        _id: "1cf4262f-c999-4be1-8bca-13873c8e6a52",
        name: "hailan",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "660573f5-f5ba-4a69-86cd-25c616f2c00a",
        name: "st28102021 dp",
        orgId: "470053",
        rules: [
          "^st28102021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st28102021"
      },
      {
        _id: "98667145-f023-485c-826d-014d52a371ea",
        name: "MANI112",
        orgId: "470053",
        rules: [
          "^dsalk"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "IUWBD"
      },
      {
        _id: "7d950f45-f143-4b47-863d-3da47fb866aa",
        name: "346r3",
        orgId: "470053",
        rules: [
          "^378wr6ty"
        ],
        longTimer: 16,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "a6129b33-a29d-40a4-b58f-7758a02679e4",
        name: "    kkkkkk",
        orgId: "470053",
        rules: [
          "^5"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "49699df0-6c2c-436f-b35f-5a6a4a311563",
        name: "468274",
        orgId: "470053",
        rules: [
          "^jvahcbaks"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "729482"
      },
      {
        _id: "9aedbf10-b057-4b8d-88f3-26dea83c7d05",
        name: "ashwin",
        orgId: "470053",
        rules: [
          "^xjjsjks"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: "dsssdd"
      },
      {
        _id: "8d247a9a-07fd-4a26-a5f4-b99379f6237c",
        name: "     ",
        orgId: "470053",
        rules: [
          "^9444"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "91b5a260-f3d3-4773-acb6-173e9ad9fe32",
        name: "         ",
        orgId: "470053",
        rules: [
          "^9898"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "c7231fe7-99ea-4fa7-a7f1-326acb34d37e",
        name: "      ",
        orgId: "470053",
        rules: [
          "^955"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "7dc6a35f-c02f-45e1-993b-a7b0c63e38db",
        name: "  kamali",
        orgId: "470053",
        rules: [
          "^111"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "ad71e9e1-6664-4325-aa35-774ca4c282cd",
        name: "       kamali arul",
        orgId: "470053",
        rules: [
          "^4144"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "7192f7f7-0ea4-4f94-82c9-29536ddc5b6b",
        name: "     kamali",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "186d4cf9-876c-40aa-b51d-5b6d86129b6d",
        name: "3478",
        orgId: "470053",
        rules: [
          "^jhg"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "8cddd6e3-fd68-45bc-a8ba-603f74a63c83",
        name: "1234512345",
        orgId: "470053",
        rules: [
          "^jhgfdsa1234"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "test"
      },
      {
        _id: "7f6c765f-c909-42a7-a61c-bdda0f4e931f",
        name: "wrtrger",
        orgId: "470053",
        rules: [
          "^vfdsss/fwrfwe;'rf"
        ],
        longTimer: 15,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a5e7cc4a-08d1-4133-b7f6-670cb0ef385b",
        name: "st01112021 dp",
        orgId: "470053",
        rules: [
          "^st01112021"
        ],
        longTimer: 6,
        shortTimer: 3,
        description: "st01112021"
      },
      {
        _id: "92c5d229-de8a-4a5a-afde-3f03c37a8878",
        name: "37891ui223",
        orgId: "470053",
        rules: [
          "^637r8g7wefyi"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "27836"
      },
      {
        _id: "1bd04191-aefd-4436-a566-8c8018f7b4be",
        name: "t4r62788726",
        orgId: "470053",
        rules: [
          "^R4"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "autotest123"
      },
      {
        _id: "c14f4517-982a-4250-b5e2-091e4f3d5cf1",
        name: "aliu_sip1",
        orgId: "470053",
        rules: [
          "^011[0-9]*T",
          "^1[0-9]{10}",
          "^[2-9]11",
          "^[2-9][0-9]{9}",
          "^S3[0-9]{2}",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S6[8-9]",
          "^S67[2-9][0-9]{9}",
          "^S67[1][2-9][0-9]{9}",
          "^S7[6-9]",
          "^S72[2-9][0-9]{9}",
          "^S74d[3-9][2-9][0-9]{9}",
          "^S75d[2][0-9][2-9][0-9]{9}",
          "^S8[0-1]",
          "^S8[3-9]",
          "^S82[2-9][0-9]{9}",
          "^S90[2-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "73bdb873-5914-4a67-abcd-7f892ca7189b",
        name: "aliu_sip2",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "e674c1e9-51a7-4c2e-85e4-d760930cab73",
        name: "dep03112021 dp",
        orgId: "470053",
        rules: [
          "^dep03112021"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "dep03112021"
      },
      {
        _id: "d2be6a19-6b95-4774-a4c2-bbca0f1a4dee",
        name: "st08112021 dp",
        orgId: "470053",
        rules: [
          "^st08112021"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: "st08112021"
      },
      {
        _id: "853b5d05-bed2-4f36-9849-61c0d1cf378f",
        name: "seanzhu_01",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "a6806eeb-7823-4b0a-95ed-dd31b1caca16",
        name: "rt09112021 dp",
        orgId: "470053",
        rules: [
          "^rt09112021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt09112021"
      },
      {
        _id: "78792778-eae8-47e8-8956-d3e82d38f3f0",
        name: "rt09112021 fdp",
        orgId: "470053",
        rules: [
          "^rt09112021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt09112021f"
      },
      {
        _id: "8d4e54c3-70df-4ea0-973d-35df83608d6d",
        name: "st1511 dp",
        orgId: "470053",
        rules: [
          "^st1511"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1511"
      },
      {
        _id: "4320bea4-2c2e-467e-8653-47ef1de73d55",
        name: "     kamaliR",
        orgId: "470053",
        rules: [
          "^877"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "700a9b06-ef4a-40de-ae2d-b838574c1f8c",
        name: "gggggggg",
        orgId: "470053",
        rules: [
          "^663"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "13c2eecb-f717-4ef5-a248-322d3101535a",
        name: "34789224",
        orgId: "470053",
        rules: [
          "^vcvdgjnk"
        ],
        longTimer: 17,
        shortTimer: 15,
        description: "3478y`"
      },
      {
        _id: "6f3bb404-43cb-4aae-befe-6fdd6ef5bda6",
        name: "wrxsecytv",
        orgId: "470053",
        rules: [
          "^e jhvcnkdm"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "wserdtfy"
      },
      {
        _id: "8ac467eb-9334-4ae5-b9c9-d965a9c9cafd",
        name: "             ",
        orgId: "470053",
        rules: [
          "^9112"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "b019423d-a808-4999-ba72-597f3ab0929d",
        name: "       ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "ef08e164-2e34-4d64-954c-7b7ce2cfd1d7",
        name: "        ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 6,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "1a7fd00f-a589-4209-8585-cc56952f93ac",
        name: "         NISC",
        orgId: "470053",
        rules: [
          "^655"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "0b96fb41-3c99-41b2-9127-7405ef5afa0c",
        name: "             kamali",
        orgId: "470053",
        rules: [
          "^43"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "2b889e7b-f2ed-4cdd-aec7-00d2e7bd5619",
        name: "dialplanfordemo",
        orgId: "470053",
        rules: [
          "^{}CHKBWNE"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "dpfd"
      },
      {
        _id: "193c8e95-0bde-4a14-b79d-ef7af55f9d15",
        name: "newdialplan987564",
        orgId: "470053",
        rules: [
          "^56784",
          "^wrfwwefwe589,4u9w-05898)()_"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "564738920"
      },
      {
        _id: "6e640e56-941c-4a15-ba43-eeb8a50dd745",
        name: "7848436874",
        orgId: "470053",
        rules: [
          "^rvjkvjfe"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "1342"
      },
      {
        _id: "0495005c-b79c-4eea-9c17-fe8f8edde8bc",
        name: "lokesh",
        orgId: "470053",
        rules: [
          "^1243"
        ],
        longTimer: 16,
        shortTimer: 8,
        description: "Manual tester"
      },
      {
        _id: "e1d43801-7cea-4230-867d-b9178d8bcd74",
        name: "765drytguj",
        orgId: "470053",
        rules: [
          "^xrgvbgh"
        ],
        longTimer: 9,
        shortTimer: 6,
        description: "w345erf6y"
      },
      {
        _id: "0f2e0a4d-7c8b-4dfc-9668-fc01e8b9161d",
        name: "344334",
        orgId: "470053",
        rules: [
          "^tgtevcfvcsd"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "3434"
      },
      {
        _id: "4a4b9813-d219-479d-9351-90d7eec49a61",
        name: "yrbu",
        orgId: "470053",
        rules: [
          "^ercds"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "cfgvybuhj"
      },
      {
        _id: "f231d650-74dd-4393-a833-1a587225081b",
        name: "cxvdfxcv",
        orgId: "470053",
        rules: [
          "^sffdcsdzvcx"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "efsxcvcdxc"
      },
      {
        _id: "04e5757f-fe01-41d7-a1ae-00d09ad825a3",
        name: "weewdcwesa",
        orgId: "470053",
        rules: [
          "^dfxgverdfgv"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "wescxwes"
      },
      {
        _id: "13f9a5ac-295d-4ef9-b412-76c68a3f0103",
        name: "75644356789",
        orgId: "470053",
        rules: [
          "^4567fty78"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "234567890876"
      },
      {
        _id: "393737cd-5597-4e13-8404-fdb99ed7c7b5",
        name: "weeewfwe",
        orgId: "470053",
        rules: [
          "^srgrvdfwevwsd"
        ],
        longTimer: 19,
        shortTimer: 1,
        description: "q3wer3fwe"
      },
      {
        _id: "29fbd978-f52f-4217-b48e-9440b7975947",
        name: "ashwinr65789",
        orgId: "470053",
        rules: [
          "^zwrxety"
        ],
        longTimer: 17,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "1914235b-d8f6-4af6-8988-735cb51320fc",
        name: "453534523",
        orgId: "470053",
        rules: [
          "^addaesz"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "24"
      },
      {
        _id: "56ef3e37-4bad-4816-a915-773c2bf6f72a",
        name: "dial plan 123",
        orgId: "470053",
        rules: [
          "^9878"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "fe3fbb15-bd64-4189-b230-ab8a9d09c776",
        name: "trhegdbersvd",
        orgId: "470053",
        rules: [
          "^getdbdwefvcdcsfvwe"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "vsfdbdsvd"
      },
      {
        _id: "f94af9de-72bc-42b8-8559-744454739427",
        name: "Regression",
        orgId: "470053",
        rules: [
          "^67555555555555556"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "automation testing,manual testing"
      },
      {
        _id: "3326f047-b158-4c89-bfa4-7051811a5463",
        name: "6875678776",
        orgId: "470053",
        rules: [
          "^fdfvdfv"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "4657856787"
      },
      {
        _id: "aa6472b8-e41a-4589-b9c7-f9502b514539",
        name: "sst16112021 dp",
        orgId: "470053",
        rules: [
          "^sst16112021"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst16112021 d"
      },
      {
        _id: "4655ea70-dd68-49af-b7e6-4d48ad361d8e",
        name: "             kamaliR",
        orgId: "470053",
        rules: [
          "^23"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "92595862-0d70-4aa0-82e2-3ff459249679",
        name: "34ty7686534r4",
        orgId: "470053",
        rules: [
          "^rgghgrdrevbfvbedf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "ethjy5gt"
      },
      {
        _id: "2ce21ae6-405e-4f7e-a321-5cac89cbba25",
        name: "CXNK00207CCDasdfe",
        orgId: "470053",
        rules: [
          "^CXNK00207CCDs"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "CXNK00207CCD"
      },
      {
        _id: "49de3092-8fbb-4a90-97ee-b65c1b784e6f",
        name: "wyyteffef",
        orgId: "470053",
        rules: [
          "^dsnbfrfbsbsbvsx"
        ],
        longTimer: 18,
        shortTimer: 9,
        description: "aeafsfsfvs"
      },
      {
        _id: "705b4354-fb80-431f-a7b5-c80c3c9267f0",
        name: "dwdd",
        orgId: "470053",
        rules: [
          "^fv"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "1322f424-bf4a-4707-95ee-7d2e1f347664",
        name: "dftbntbdrgsgdv",
        orgId: "470053",
        rules: [
          "^dgvevdfvf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "gfnbgfvfbgdvf"
      },
      {
        _id: "f2071788-09b2-4374-b6d2-34c56b87a4aa",
        name: "23qse4dtrf",
        orgId: "470053",
        rules: [
          "^xdcfgh"
        ],
        longTimer: 12,
        shortTimer: 9,
        description: ""
      },
      {
        _id: "e321217f-e54c-4a68-9725-a29a5f0a0fc5",
        name: "q113454",
        orgId: "470053",
        rules: [
          "^dv g"
        ],
        longTimer: 17,
        shortTimer: 15,
        description: ""
      },
      {
        _id: "664e6716-e8d0-41ed-8bcf-c9023f750fb3",
        name: "2edwed",
        orgId: "470053",
        rules: [
          "^ervevd"
        ],
        longTimer: 19,
        shortTimer: 14,
        description: "wedwe"
      },
      {
        _id: "19be2527-e311-4c01-8dff-bdf89af43832",
        name: "     ",
        orgId: "470053",
        rules: [
          "^1"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "sdkf"
      },
      {
        _id: "77f08dc5-412d-490d-ad4b-08564503bf1e",
        name: "avita1209",
        orgId: "470053",
        rules: [
          "^avita1209"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "avita1209"
      },
      {
        _id: "82ba2197-9dc7-42b2-9c4a-2a00c6c8297d",
        name: "    ",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "a2d30777-0c45-4265-a1e7-ed2c41a54e2f",
        name: "yrertyt",
        orgId: "470053",
        rules: [
          "^367"
        ],
        longTimer: 12,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "696b8fe3-b1da-4a75-94eb-c30f912be96a",
        name: "ryfhrytfgdgrtvfd",
        orgId: "470053",
        rules: [
          "^wkjedjweasjdx"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "erfdfv"
      },
      {
        _id: "f35577e6-77fa-4f37-af96-41a8e6e20cdf",
        name: "evjhcdsbu",
        orgId: "470053",
        rules: [
          "^wubuid"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "rdftvuy"
      },
      {
        _id: "b25b7b20-4e83-4f14-a923-6f5b62ec5484",
        name: "224sbuild",
        orgId: "470053",
        rules: [
          "^224sbuild"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "224sbuild"
      },
      {
        _id: "3405a1ac-5876-4cd6-a9a9-7a1f101ff9e2",
        name: "Test Plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "c743590f-cc98-46ba-b0e6-655ca86f4f02",
        name: "zdhgjjhrgfv",
        orgId: "470053",
        rules: [
          "^wraenywdbg"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "bgdrgvfxg"
      },
      {
        _id: "0d6d622a-2c8c-4d7a-afac-6b73b7515b39",
        name: "dfv dded",
        orgId: "470053",
        rules: [
          "^dgtyui"
        ],
        longTimer: 13,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "e4641fed-8f3a-44e6-b15a-0e592c09a3c5",
        name: "313534354",
        orgId: "470053",
        rules: [
          "^etrfrsfcwds"
        ],
        longTimer: 16,
        shortTimer: 13,
        description: "34253"
      },
      {
        _id: "f3dbf68d-763a-450d-91ea-30598db425e4",
        name: "mreg1509222",
        orgId: "470053",
        rules: [
          "^mreg1509222"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "mreg1509222"
      },
      {
        _id: "1648e837-7fcb-42f9-b1df-4232e9dc8273",
        name: "dial planing",
        orgId: "470053",
        rules: [
          "^0987"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "082e8f4e-ac0f-49f5-b157-28a9ba06d409",
        name: "uewtuywe",
        orgId: "470053",
        rules: [
          "^wqvyuszbwqix"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "QYUWYSC"
      },
      {
        _id: "264e8cf0-ecd6-44b9-815b-52dfb28fc733",
        name: "sanit2809",
        orgId: "470053",
        rules: [
          "^sadsdf"
        ],
        longTimer: 14,
        shortTimer: 11,
        description: "sanit2809"
      },
      {
        _id: "049485d0-ac81-44ad-bc4c-c2145eaad579",
        name: "steve_dialplan",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "58f2c5dd-59cd-4fd6-be7f-613be242c90e",
        name: "st0102 pf",
        orgId: "470053",
        rules: [
          "^dgdfdfg"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "st0102vcdbv"
      },
      {
        _id: "1e9c682e-ce77-441f-8d7a-21a5a4a87cab",
        name: "point",
        orgId: "470053",
        rules: [
          "^98"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "automation testing"
      },
      {
        _id: "6151535b-5362-48b1-a8ac-32ffef9103e9",
        name: "mut1404st",
        orgId: "470053",
        rules: [
          "^mut1404st"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "mut1404st"
      },
      {
        _id: "3be3b562-a636-4b3e-b9a0-c6d81bdcbd2b",
        name: "gfghjh n",
        orgId: "470053",
        rules: [
          "^fvknjdfkvdfj"
        ],
        longTimer: 20,
        shortTimer: 14,
        description: "dgvubhj"
      },
      {
        _id: "77edde1f-f9ea-4732-8bc3-1a1fed41e1f6",
        name: "                 ",
        orgId: "470053",
        rules: [
          "^954"
        ],
        longTimer: 10,
        shortTimer: 8,
        description: ""
      },
      {
        _id: "502cde8a-36dd-4ba1-8a7a-f300f7fea287",
        name: "           ",
        orgId: "470053",
        rules: [
          "^562"
        ],
        longTimer: 9,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "66aee8f6-5b35-4a89-b053-8468c9449f54",
        name: "hfty",
        orgId: "470053",
        rules: [
          "^etgevnioernom    32234@#$%$#90()&%${}#}@{{@#{@{@{#@}{#@@"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "ggjhjh"
      },
      {
        _id: "1469f409-5d1f-4497-b6a2-51d739502277",
        name: "          ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "0fa21f4b-80ad-4ada-8fba-5fc5f15b1e41",
        name: "q11675ty",
        orgId: "470053",
        rules: [
          "^sdfdgsfdsd"
        ],
        longTimer: 11,
        shortTimer: 8,
        description: "sdfdds"
      },
      {
        _id: "e9e83afe-c184-4e66-b9a5-260c33b3ae4e",
        name: "             kamaliB",
        orgId: "470053",
        rules: [
          "^34"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "f9eb0846-d04e-4ef0-aebe-8f24d01bf6f2",
        name: "fgvrsw",
        orgId: "470053",
        rules: [
          "^weafdewfdcx"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "resfcewsdf"
      },
      {
        _id: "a472e76f-b1b6-44a8-8350-df38edf9748e",
        name: "zcx wedweasd",
        orgId: "470053",
        rules: [
          "^erwfcewf3ewsa\n"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "ewsdxwesadxeas"
      },
      {
        _id: "b8b6a3ce-6c01-4725-8887-e26de80926a4",
        name: "ugyvjhvvu",
        orgId: "470053",
        rules: [
          "^EGHSFCVSDJHCVYSD"
        ],
        longTimer: 18,
        shortTimer: 15,
        description: "serdtyf"
      },
      {
        _id: "5846d18a-9541-45ba-8d9b-e2a0a9ac5ea0",
        name: "yu4gyfgywe",
        orgId: "470053",
        rules: [
          "^dfvsrvsfsxivhsdfui"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "sdgerh"
      },
      {
        _id: "56a49230-b2af-4d38-b018-811897a1ab17",
        name: "09876",
        orgId: "470053",
        rules: [
          "^4567890"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "poiuhygf"
      },
      {
        _id: "0f39bf78-a60e-4e4f-a234-9b046af07d8e",
        name: "srgsrvrsfv",
        orgId: "470053",
        rules: [
          "^wrcw"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "scsd"
      },
      {
        _id: "7007877c-f03d-45e0-ace8-3779d29bb8fb",
        name: "3454e3",
        orgId: "470053",
        rules: [
          "^eferwfdcwrdfcx"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "35343"
      },
      {
        _id: "b1829d4e-5147-4e54-85e5-53e3c34fd556",
        name: "signed",
        orgId: "470053",
        rules: [
          "^e456yxchgdfsg8ydgacbsictyxsuivcygcvxuiwgyascuih"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: "sdfdds"
      },
      {
        _id: "df77b694-a84b-4acf-b513-d3d83261dc9e",
        name: "cdydfgfyuftt7ig",
        orgId: "470053",
        rules: [
          "^xrycfhj"
        ],
        longTimer: 19,
        shortTimer: 14,
        description: "45drgiyjk"
      },
      {
        _id: "0129e3ff-99ef-4f6d-9c47-90d468f85602",
        name: "dsfg",
        orgId: "470053",
        rules: [
          "^[\\d]"
        ],
        longTimer: 15,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "eafeac2b-4d6c-4efd-9be2-557cf2d3e0f6",
        name: "tdrygu",
        orgId: "470053",
        rules: [
          "^dbgnbfvsv"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "sdtrygu"
      },
      {
        _id: "e75b0601-12d8-4c42-b8f3-b2cbc8d4dbd8",
        name: "gowtham4657890",
        orgId: "470053",
        rules: [
          "^rbgetvfgdf vf"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "sdfdds"
      },
      {
        _id: "90c90718-3109-48fa-a5c6-b8a9e6d70e2d",
        name: "sryhetrbtr",
        orgId: "470053",
        rules: [
          "^efcevsdvcsdz"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "bstrbttgbtrb"
      },
      {
        _id: "ff3b379f-487f-4d97-a937-e2b9d6bec7ef",
        name: "TCFUCYI",
        orgId: "470053",
        rules: [
          "^UWVUYBUYBDHUB"
        ],
        longTimer: 19,
        shortTimer: 11,
        description: "CYIYCYYGCI"
      },
      {
        _id: "656650e3-7768-4958-b87d-2c38d6def180",
        name: "cgftyttrd",
        orgId: "470053",
        rules: [
          "^gxfhgchcghg"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "d65f7gy8huio"
      },
      {
        _id: "1c2100dc-50a5-4c0f-8dc1-7aaf033ff9f3",
        name: "wedwesad",
        orgId: "470053",
        rules: [
          "^vrdzxcsz"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "weadxew"
      },
      {
        _id: "system-default",
        name: "system-default",
        description: "System Default Dial Plan",
        shortTimer: 4,
        longTimer: 16,
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ]
      }
    ],
    seriviceList: [
      {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "hdata01_b1",
        _id: "535fccfe-0685-4e93-b4b9-8a77e18296ec",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "GigaCenter",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 7,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 0,
            X_CALIX_SXACC_BW_PROFILE: "7f8f23c8-8f54-44db-b084-340dff692713",
            defaultConnectionService: true
          }
        },
        VLAN: 7,
        Mode: "RG Routed",
        defaultConnectionService: true,
        IPTVSSID: false
      }
    ],
    serviceBWList: [
      {
        _id: "",
        name: ""
      },
      {
        _id: "97268d40-ebb9-41d4-aeef-87b5ecc9c55a",
        name: "BW_0",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "0k",
              DownstreamCIR: "0k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2a846e06-fa47-4b5b-b20d-f14b5f75c716",
        name: "BW_1G_1G",
        orgId: "470053",
        description: "g",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "222649a4-9639-46ac-a92b-c2bfe6ca2362",
        name: "bw 100",
        orgId: "470053",
        description: "Test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1f271670-c29c-4f38-a89a-1a5b2802639b",
        name: "bandwidth",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "128m",
              DownstreamCIR: "512m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f96ff7b3-78da-401c-b8ed-a99ceb0d4eec",
        name: "bw_lai",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "7f8f23c8-8f54-44db-b084-340dff692713",
        name: "hbw1_11M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a10c519a-88e9-45a5-98e0-dbacc9de3ad9",
        name: "hbw2_15m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "16m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "78e3bc87-22c6-404d-8275-be4b56bec3e7",
        name: "bw-test",
        orgId: "470053",
        description: "bw-test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1k",
              DownstreamCIR: "1k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f872f169-5706-467a-b94a-8bf2a7e8d4df",
        name: "BW_200_50",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1b1243d8-ebf4-4171-8837-6575078dbe4c",
        name: "mapspeestest_bw",
        orgId: "470053",
        description: "mapspeestest_bw",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40m",
              DownstreamCIR: "120m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f3215a8c-5445-47f9-9532-6711d7da69a7",
        name: "bw-down-20M-up-10M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3fea825b-fdb1-47e3-904c-bd6776df2e9c",
        name: "bw-down-120M-up-40M",
        orgId: "470053",
        description: "jkong",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40m",
              DownstreamCIR: "120m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "23c94925-1e8e-4c6c-9ce6-9e322e5a6655",
        name: "BW10M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bf16acea-a257-426c-99e4-721c60da3dfb",
        name: "bw-15-10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9e7054df-9448-446b-9145-5a737f0aecc0",
        name: "bw-5-5",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2c17994b-5e74-4d74-b4c2-85a594cfd6ff",
        name: "bw_20_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "48894e29-4eba-4f5e-8d9f-d8ec534526b5",
        name: "bw_100M_20M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a5cb52a0-54c3-4ab5-bcf8-f6b1029a86ff",
        name: "bw_25m_3m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e79e2695-276b-4c28-9fc1-027f9fdd8e4e",
        name: "bw_10m_1m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "618d4586-9fd9-4203-a7d6-9af8f80ef4d4",
        name: "BW_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0f4eef33-080f-4cfb-945e-d2d11468f126",
        name: "bw_1G_500",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2d0280dd-191f-42d3-b34e-a81178ff988c",
        name: "bw_100m_25m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "18d152d4-5055-4f88-9f64-5b17edef7458",
        name: "bw_25m_5m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "710748ad-96e1-4ae8-b893-5b42b5d0b0df",
        name: "bw-1G",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3f7531f4-0a88-4186-91eb-d7f03558834f",
        name: "BW_100_50",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "23f81f75-49f9-4740-81ee-00c2b8244b6e",
        name: "20_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d61e9c82-b87f-499d-95bf-9777b772e36a",
        name: "bw_110/60",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "60m",
              DownstreamCIR: "110m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "778e7fd7-a40b-4edd-832e-0ea416a08d3a",
        name: "BW_64_64",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "64k",
              DownstreamCIR: "64k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bce82c98-e4d5-481d-ad55-a7544a6952e3",
        name: "hazel-ae-bw-80M",
        orgId: "470053",
        description: "hhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "80m",
              DownstreamCIR: "80m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "217c99aa-4d9e-490b-9fe8-0e4132ccd5f0",
        name: "XLAE-4G-4G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b00429bb-d867-4470-b918-50eeed4a9d07",
        name: "XLAE-1G-1G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d1c53d95-a6ee-425b-ad27-121f481b67c4",
        name: "Testttt",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "30bb2139-4905-4b6f-9ba0-c392b5186d00",
        name: "Test123",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "721007f3-5b40-4b52-8337-f454a2ed0c90",
        name: "hailan_d20_u20",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0fe235ea-63e7-42a8-b8e7-eddae06a06f5",
        name: "hazel-bw-50m",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "40264551-bf37-4f7a-90ee-f5260c2b9522",
        name: "dg_1013_band_01",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2m",
              DownstreamCIR: "1k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5c76b883-43f3-43f6-a65a-4769460d77fb",
        name: "Jasson_BW_Test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9c946bc0-7b50-4afc-909f-f3e275ebce3a",
        name: "BWW3213",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "3999m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4711fbfb-ca0c-4f16-b12d-84723115cc99",
        name: "ff",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2001m",
              DownstreamCIR: "2001m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "6fc9a080-5eb3-4835-b919-c16e6ad30f74",
        name: "XLAE-3M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "81332032-ff57-4a92-9f47-4bc8bb35a415",
        name: "XLAE-5M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1bbd8c40-72f4-450a-9660-bdce7ac0c358",
        name: "XLAE-15M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "15m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d792bda8-3301-428d-b28b-31ab144ab575",
        name: "XLAE-150M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "150m",
              DownstreamCIR: "150m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "29ee03a8-1bab-4f5f-9a03-72ab6404a3fd",
        name: "XLAE-250M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "57021efc-12c4-4a16-a297-91fa22c39eb1",
        name: "XLAE-20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f3c2dee6-4f97-4d70-b4b4-aeafcf75c312",
        name: "XLAE-500M-2",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f6221fdd-1f6f-4e67-86af-9864c8353e24",
        name: "1yolv_bw",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "213k",
              DownstreamCIR: "213k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "49530233-89d9-4fd4-95b4-c1776f93add4",
        name: "Jason_AE_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2964b6c7-0df0-431a-8c32-d49d9a948df3",
        name: "Jason_AE_bandwidth_1",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "026d2fec-e9c7-4c85-943c-fdc1e4d8f76c",
        name: "gold",
        orgId: "470053",
        description: "hgjdsjwqhj",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200k",
              DownstreamCIR: "144k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0e297a41-df70-427f-90ab-0928232b73a3",
        name: "tets",
        orgId: "470053",
        description: "jdsgkhjskdASDLKLJDFHK",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50k",
              DownstreamCIR: "50k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4033f656-1809-42b2-84a4-426b950b2987",
        name: "ions",
        orgId: "470053",
        description: "polymorphismion",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40k",
              DownstreamCIR: "50k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "116959fb-a273-404b-bd14-cfcaf0c9aa90",
        name: "hazel-bw-50M-replace",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d1a1b25f-7fa0-464e-976d-bc716ba88ac9",
        name: "aliu-1-3_25",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b17503db-5c74-4bad-8546-2d81204dffcc",
        name: "aliu-2-5_25",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fcd94441-7d69-44e2-9dd0-e582381a5d9f",
        name: "aliu-9-512_1500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "512k",
              DownstreamCIR: "1500k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1a69185d-10c8-4dc3-b51e-1b92e49b711c",
        name: "aliu-4-20_100",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "63ff54d9-953c-4437-b413-6844c82d6f1a",
        name: "aliu-5-150_150",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "150m",
              DownstreamCIR: "150m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "12cc0997-015b-49e0-94f6-374b56f59525",
        name: "aliu-6-250_250",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "95d42c8c-57e9-4218-952c-667a3bda0f9b",
        name: "aliu-8-1000_1000",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "430156d1-4696-448e-86ff-dcc9e50773b8",
        name: "BW_4227W_AE",
        orgId: "470053",
        description: "data_service_bw_4227W_AE_loliu",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1328eb18-8d74-4e66-a19d-4a6fd37a8980",
        name: "aliu-3-15_15",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "15m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f9465921-3152-4fa5-a5f3-2a7dd4edd781",
        name: "aliu-7-500_500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2c16cafc-4846-4390-8a3f-16769a473815",
        name: "aliu-10-1_10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "13693c90-ae61-47a4-b6a9-b4064d2e6901",
        name: "aliu-11-25_100",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5f14662c-8f77-460a-881b-fd1f884b2a2c",
        name: "BW_750m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "95fff9e8-0ebb-4ccd-bb85-3c62e9d770e8",
        name: "ying-bw-10m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4dd4c6e0-5c0d-48a7-9c62-87b2fb5732f3",
        name: "BW_500m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "49fe40ac-10e6-4566-8acd-880efb5ff88c",
        name: "BW_250m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "79a24619-f333-4297-ad64-2c8a6eccb833",
        name: "BW_100m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "913d667d-b5dd-4a48-bfb9-59d623b20745",
        name: "ying-bw-5-10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f77c8a37-6afc-4751-80c8-fc9803bd6770",
        name: "bw-100k",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100k",
              DownstreamCIR: "100k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ae9ab92c-79bd-4e6a-b4ce-be862b02259d",
        name: "FANG_BW_1m_1m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b051f435-8906-4eb3-92e8-01aceaaaeb62",
        name: "Ling_BW_750_750",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d4bc5516-61c5-4478-964e-f5779ba34050",
        name: "mc_bw-1000M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b6a250fe-22b8-4ca4-bf95-568f008f70fd",
        name: "mc-bw-300M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "300m",
              DownstreamCIR: "300m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "20602c94-7427-4e04-8a93-0194df163021",
        name: "Ling_BW_500_500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3847d55b-ef93-4f35-abde-ae6dcc4b9872",
        name: "Ling_BW_250",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e6afedc5-c90b-456f-9971-5a8c2831b029",
        name: "JULY",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "861bdc14-29d1-4eba-8ea3-eedae6780c6d",
        name: "Ling_BW_1",
        orgId: "470053",
        description: "BW profile",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "965a56d3-087c-49ed-935b-784e1aa3c2bf",
        name: "hazel-ae-BW",
        orgId: "470053",
        description: "hhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "754a9805-ce30-4572-afe4-d42cb986214d",
        name: "bian_b2_up2048kdown100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2048k",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ae0e8db7-515c-4be6-9fc8-7c56646915de",
        name: "bian_bw_up10mdown10m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f48ff096-12f9-41ba-aef1-cc0c2a2d229b",
        name: "bian_bw-up1000mdown1000m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ef24b38f-ca2d-4cd7-abcf-9c1d5d29c28c",
        name: "ywu_bw_1g",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1418d680-7ab3-498e-9077-3b5115136e19",
        name: "hazel-ae-bw-overrides",
        orgId: "470053",
        description: "hhhhhhhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "09858a87-f851-4af9-bb09-1de8ef62d7f4",
        name: "ywu_bw_100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9111f6be-1585-47ce-8272-faad818286db",
        name: "ae-yuan-bw-100M/100M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ccf1f139-d874-4aab-ada4-ea59bb5dcc2a",
        name: "ae-yuan-bw-20M/20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5af94ea7-7d94-4968-b725-5bfc782d723f",
        name: "hazel-ae-BW-50M",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9f14fbdb-621e-4f54-a2ba-fb74cd3efd27",
        name: "XLAE-25M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b2546993-abb9-4bc3-9421-38896fc21734",
        name: "XLAE-500M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "453fb8da-ab6a-414b-9be3-da1eca387ede",
        name: "XLAE-512K",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "512k",
              DownstreamCIR: "1500k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "c678a7c3-c824-47cd-b932-4f3887ef1e81",
        name: "XLAE-1M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bccad887-96f2-4e62-b22c-af5cfa3a1d0c",
        name: "Yang-AE-BW-10M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "8cde4be5-93ab-4ba3-b4df-dad9f89615be",
        name: "Yang-AE-BW-4m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4m",
              DownstreamCIR: "4m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "beee3730-0a2d-4d8d-8d6b-991813a0d0c1",
        name: "lisa_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1181fd0e-d58e-4fc5-8f91-22d3e8cab8db",
        name: "demi-bw-us100m-ds200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fd4574e5-4eb4-4e9a-aa9f-78bbc9064a24",
        name: "bw_987m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "987m",
              DownstreamCIR: "987m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "121bdfaa-2faa-4f9c-8f22-c05e27a7beca",
        name: "hailan-bw100",
        orgId: "470053",
        description: "us100-ds100",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "54162544-e36c-4486-acd5-7b4d122ec4f6",
        name: "ae-yuan-844GE-bw-1G/1G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9ead61bb-ee2f-4ecc-8096-b7952103a394",
        name: "bian_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5448f414-42d3-481e-a3cf-6392380c7698",
        name: "kli-4227-bw",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ded2b164-682f-4126-b561-8952bdf38cab",
        name: "bian_rate_5M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "85978ca5-0a25-442f-a249-9fded9a4368d",
        name: "margo_bw_100/25",
        orgId: "470053",
        description: "margo",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "c379c195-7a98-42db-8895-4919a72e297a",
        name: "mc_bw_100M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e787abef-3fa0-4c64-bb26-200044ab2737",
        name: "mc_bw_500M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "cb702646-7b4e-4964-8b64-5fd0c6a78eae",
        name: "mc_bw_250M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d4902b1d-ffd2-48a6-bbad-9f9f9696e5be",
        name: "mc_bw_750M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b5ba0f58-7b3b-4146-91d1-3a1507bf30a6",
        name: "bw_5m_5m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "db502cf4-291f-499b-848c-18c5bde9488b",
        name: "BW_yolv_20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f4bd020a-e5e1-48ce-930e-367f4dd7af5c",
        name: "BW_yolv_50M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "62a3f15b-ee98-44a3-9faa-9906e56202dc",
        name: "Bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "cfc07946-26c5-45f9-84fa-c8adc4f14ade",
        name: "Bandwidth1",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "99f54bf8-2929-4f54-8281-fec4a20ad5b2",
        name: "100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2291312d-d5ce-4cc6-b6f2-2652c16b94ad",
        name: "300m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "300m",
              DownstreamCIR: "300m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f7b321df-70af-4342-82d4-d38827505056",
        name: "200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2858e796-a4c9-470d-8b23-ef1732cfcc50",
        name: "bw-200/200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d43d9bda-b7b7-460c-9db8-1085b609ae79",
        name: "bw-10m/30m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "30m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "8541893b-7e45-4ed2-9173-0109357ab8e3",
        name: "julia bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "dfff863a-60b2-4baf-8f69-1b75f1847c37",
        name: "margo_10GAE_bw_10G_10G",
        orgId: "470053",
        description: "margo_10GAE_bw_10G_10G",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ad5d2160-305f-4944-bcf9-7b3bc9c5b951",
        name: "BWE",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "30k",
              DownstreamCIR: "20k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "abd6899c-64e2-4215-b5e4-6a19485b04db",
        name: "hari",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "30k",
              DownstreamCIR: "20k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fcfb398f-1972-416f-a913-caef1e5e7558",
        name: "xiyang----",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1314fbef-426c-49c6-8ccc-4f740322c1b2",
        name: "xiyang-sharp-test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "51093297-c6a2-470a-b3f6-f0e687ac2e93",
        name: "xiyang-bandwith",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d9b659fc-c609-4e4c-886c-bc522a21a0c0",
        name: "zhangqiang_qos_test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f303b842-be43-4286-ad1d-69d64536f957",
        name: "Ling_BW_10G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a5aa283c-02ea-4252-abcd-4714a7ae87f2",
        name: "margo_bw_5G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5000m",
              DownstreamCIR: "5000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      }
    ]
  },
  device: {
    regId: "kid",
    selectedModel: "GS4227W",
    deviceMode: "Managed ONT",
    isDisableModel: false,
    isStaticGroup: "No",
    selectedStaticGroup: [],
    subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22"
  },
  isUnifiedPrimarySSID: false,
  toggeledUnifiedPrimarySSID: false,
  services: {
    configuredService: "No",
    dataService: {
      isDataService: true,
      vLAN: "",
      priority: "",
      bandwidth: "",
      PPPoEPwd: "",
      PPPoEUsername: ""
    },
    videoService: {
      isVideoService: false,
      vLAN: "",
      priority: "",
      bandwidth: ""
    },
    voiceService: {
      serviceType: {
        name: "Fiona_voip",
        _id: "126f99de-474d-4c32-b5b3-f603dcd8e08e",
        orgId: "470053",
        configurations: {
          category: "Voice Service",
          parameterValues: {
            Type: "SIP",
            Model: "GigaCenter",
            RTPPort: 49152,
            TimerT1: 500,
            TimerT2: 4000,
            DNSPrimary: "",
            DTMFMethod: "InBand",
            SwitchType: "None",
            CountryCode: "US",
            ProxyServer: "10.245.252.2",
            RTPCodec1st: "G.711MuLaw",
            DNSSecondary: "",
            RTPDscpValue: 46,
            ReleaseTimer: 10,
            PacketRate1st: "10",
            PacketRate2nd: "10",
            PacketRate3rd: "10",
            VlanTagAction: true,
            LocalHookFlash: true,
            HookFlashMethod: "None",
            ProxyServerPort: 5060,
            UserAgentDomain: "",
            ControlDscpValue: 46,
            RTPDscpInputType: true,
            RegistrationPeriod: 3600,
            ServiceFramingType: "IPoE",
            X_000631_IGMPProxy: false,
            X_000631_VlanMuxID: 810,
            ProxyServerSecondary: "",
            CallWaitingTonePrefix: "CallWaitingTone",
            DistinctiveRingPrefix: "Bellcore-dr",
            ServiceConnectionType: "DHCP",
            SilenceSuppression1st: false,
            SilenceSuppression2nd: false,
            SilenceSuppression3rd: false,
            X_000631_VlanMux8021p: 6,
            ProxyServerPortSecondary: 5060
          }
        },
        VLAN: 810,
        defaultConnectionService: false,
        IPTVSSID: false
      },
      VoiceProfile: [
        {
          Enable: true,
          ProfileId: "0f2b0e1f-9704-408b-aad5-f85124a25ec2",
          Name: "hazel-ae-HB-706",
          category: "Data Service",
          Mode: "RG Routed"
        },
        {
          Enable: true,
          ProfileId: "126f99de-474d-4c32-b5b3-f603dcd8e08e",
          Name: "Fiona_voip",
          category: "Voice Service"
        }
      ],
      faxRelay: false,
      dialPlan: "system-default",
      addressType: "DHCP",
      showVocieService: true,
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      ipHostName: ""
    },
    ontDataService: [
      {
        PPPoEPwd: "",
        PPPoEUsername: "",
        isServiceEnabled: true,
        isBWOverRide: false,
        isVLANOverRide: false,
        vLAN: '76',
        serviceProfile: {
          name: "hazel-ae-HB-706",
          _id: "0f2b0e1f-9704-408b-aad5-f85124a25ec2",
          orgId: "470053",
          configurations: {
            category: "Data Service",
            parameterValues: {
              Mode: "RG Routed",
              version: "v4",
              NATEnabled: true,
              FramingType: "IPoE",
              VlanTagAction: true,
              productFamily: "EXOS",
              AddressingType: "DHCP",
              ConnectionType: "IP_Routed",
              X_000631_IGMPProxy: false,
              X_000631_VlanMuxID: '76',
              X_000631_IPv4Enabled: true,
              X_000631_IPv6Enabled: false,
              ServiceConnectionType: "DHCP",
              X_000631_VlanMux8021p: 0,
              defaultConnectionService: false
            }
          },
          VLAN: 76,
          Mode: "RG Routed",
          defaultConnectionService: false,
          IPTVSSID: false
        },
        showPPPOE: false,
        inValidVLan: true
      }
    ],
    ontVideoService: [],
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption",
        name: "",
        securityType: "",
        passphrase: ""
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption",
        name: "",
        securityType: "",
        passphrase: ""
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption"
      },
      UNIFIED_PRIMARY_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption"
      }
    },
    showVideoServiceByDefault: true,
    showDataServiceByDefault: true,
    isCMS: false
  },
  settings: {
    isPowerSaving: true,
    lanPortOne: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortTwo: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortThree: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortFour: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    }
  }
}

export const addDeviceObj_for_settings = {
  isNewRecord: false,
  addDeviceTab: [
    "Device",
    "Services",
    "Additional Settings"
  ],
  showModeErrorMsg: false,
  showDeviceIDErrorMsg: false,
  showModelErrorMsg: false,
  configurationObj: {
    defaultLanValidation: false,
    serviceDialPlan: [
      {
        _id: "20c3d122-ab5a-41bd-90dc-fe338177b7b7",
        name: "lisa_test01",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: "5678"
      },
      {
        _id: "62cf2bce-f17a-4da4-8566-a74f42fcc11e",
        name: "lisa_test02",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "rsdfcwrfc"
      },
      {
        _id: "9c416332-528a-4a1e-9d30-ba9cb5039706",
        name: "srdfcesdvc",
        orgId: "470053",
        rules: [
          "^gbvtedfcxvdffctygvujh"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "sdcdfgvdfx"
      },
      {
        _id: "a07c9291-48f3-4c7a-ae88-fe9e3c15730c",
        name: "Lai_meta",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "sdfdds"
      },
      {
        _id: "3e2c6ee7-8d28-42fc-bfae-8f8d7f932009",
        name: "5432",
        orgId: "470053",
        rules: [
          "^98765"
        ],
        longTimer: 7,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "f7b5fb47-ac8f-4635-8817-219642b8c515",
        name: "844GE-soak",
        orgId: "470053",
        rules: [
          "^911n",
          "^S90d[0-9]{10}",
          "^[2-9][0-9]{9}",
          "^311"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "for soak"
      },
      {
        _id: "c04a8657-087a-4127-aae2-9b2359850a0a",
        name: "aliu-sip",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "35608538-d0b5-432d-89e8-e781201e9db9",
        name: "JH_111111",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}",
          "^S99d[0-9]{2}*T",
          "^226000",
          "^228000",
          "^229000",
          "^230000",
          "^231000",
          "^232000",
          "^233000",
          "^234000",
          "^235000",
          "^236000",
          "^237000",
          "^238000",
          "^239000",
          "^240000",
          "^241000",
          "^242000",
          "^243000",
          "^244000",
          "^245000",
          "^246000",
          "^247000",
          "^248000",
          "^249000",
          "^250000",
          "^251000",
          "^252000",
          "^253000",
          "^254000",
          "^255000",
          "^256000",
          "^257000",
          "^258000",
          "^259000",
          "^260000",
          "^261000",
          "^262000",
          "^263000",
          "^264000",
          "^265000",
          "^266",
          "^267000",
          "^268000",
          "^269000",
          "^270000",
          "^271000",
          "^2721000",
          "^274000",
          "^275000",
          "^276000",
          "^277000",
          "^278000",
          "^279000",
          "^280000",
          "^281000",
          "^282000",
          "^283000",
          "^284000",
          "^285000",
          "^286000",
          "^287000",
          "^288000",
          "^289000",
          "^290000",
          "^291000",
          "^292000",
          "^293000",
          "^294000",
          "^1201204[0-9]{4}",
          "^S92d[1-9][0-9]{5}*T",
          "^299000",
          "^300000",
          "^301000",
          "^302000",
          "^303000",
          "^304000",
          "^305000",
          "^306000",
          "^307000",
          "^3080000"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "987da63b-5bb0-4990-8d02-4541938a2401",
        name: "wefwesf",
        orgId: "470053",
        rules: [
          "^vfv dghnbtevfscdvwc"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "wesfcweafdc"
      },
      {
        _id: "a97c3d3a-df6d-4baf-a303-571c91a1e4dd",
        name: "sanitt2909dp",
        orgId: "470053",
        rules: [
          "^sanitt2909"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "sanitt2909"
      },
      {
        _id: "d64bd540-1158-4af0-8265-fcc03ef8b078",
        name: "232434242",
        orgId: "470053",
        rules: [
          "^sedazceadzfc"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "232323"
      },
      {
        _id: "d0db56c4-d480-495c-9459-7f3d42fe04d0",
        name: "ashwin45678",
        orgId: "470053",
        rules: [
          "^qedqede"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "tresdt56yftvuy"
      },
      {
        _id: "ead8c306-87f1-490a-a1e9-9fed8b7e32d4",
        name: "76544345678",
        orgId: "470053",
        rules: [
          "^35467897654"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "3456"
      },
      {
        _id: "4a0fd350-c5b8-462b-9e60-f4a32bc56fa4",
        name: "esrgfvsxf",
        orgId: "470053",
        rules: [
          "^fxbkvjfx"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: "dzvsdxvsd"
      },
      {
        _id: "f766792e-3855-4584-8edd-3ae1702ebba4",
        name: "ashwinfhgj",
        orgId: "470053",
        rules: [
          "^erfsdsfd"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: "dgfhj"
      },
      {
        _id: "6f10b878-7c8c-4950-86b7-483ea611c76c",
        name: "34567890",
        orgId: "470053",
        rules: [
          "^etryfug"
        ],
        longTimer: 18,
        shortTimer: 14,
        description: "765445"
      },
      {
        _id: "34ba34f9-5b02-4bf3-9300-05226f177e98",
        name: "tcfghctvyv",
        orgId: "470053",
        rules: [
          "^dszfcwsd"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "cryvghbh"
      },
      {
        _id: "749d43ee-ef5f-4843-b37e-e19cb7ee108c",
        name: "xvvbfdxc",
        orgId: "470053",
        rules: [
          "^tedgvetrdfgverd"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "ersdfcsedz"
      },
      {
        _id: "8ec86a95-a21a-48a8-b1e7-601ed5899f3c",
        name: "sfwsc",
        orgId: "470053",
        rules: [
          "^etgtgevdf"
        ],
        longTimer: 19,
        shortTimer: 1,
        description: "svcsdcsd"
      },
      {
        _id: "2a2f871c-f2f6-4365-9e5b-73f70c92ed2a",
        name: "adadfada",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 16,
        shortTimer: 10,
        description: "adad"
      },
      {
        _id: "7412a0a8-7b08-414c-9a93-aff32af90787",
        name: "french1908p",
        orgId: "470053",
        rules: [
          "^french1908"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "french1908"
      },
      {
        _id: "cf0750b9-ed95-4d34-8180-940588d8d471",
        name: "trert",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "hghgkh"
      },
      {
        _id: "bcf6b65b-42e0-420a-9928-888e12cc91f8",
        name: "tyutyityfg",
        orgId: "470053",
        rules: [
          "^123345"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "fj"
      },
      {
        _id: "19f1f93c-79bb-45e0-9b32-2b286e3c4307",
        name: "Test",
        orgId: "470053",
        rules: [
          "^{5}"
        ],
        longTimer: 9,
        shortTimer: 6,
        description: "3456"
      },
      {
        _id: "0818f651-4320-4f12-b0fa-3b7528f3c94e",
        name: "9823",
        orgId: "470053",
        rules: [
          "^123456"
        ],
        longTimer: 7,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "19ffeb94-ce81-4c1a-a801-15d5aa9317bd",
        name: "4567",
        orgId: "470053",
        rules: [
          "^{5}5"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "61f4f107-5198-444b-a604-69b64e5b8702",
        name: "Purge11",
        orgId: "470053",
        rules: [
          "^rgvrfdvrtfd"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "autotest"
      },
      {
        _id: "50693fb0-b440-4b13-82eb-abc3d6a53892",
        name: "98742267427",
        orgId: "470053",
        rules: [
          "^RJHBCS"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "983478983"
      },
      {
        _id: "083b49e9-a306-4aae-86af-6e06562a2eaa",
        name: "ffff",
        orgId: "470053",
        rules: [
          "^f"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "210c08ca-8cf3-4127-9639-2d3dea301438",
        name: "     ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "9f91d9d1-c332-4146-a49d-b8a50113fc63",
        name: "347673487",
        orgId: "470053",
        rules: [
          "^evvfjkcf"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "76353784"
      },
      {
        _id: "a30c93b9-97cd-4369-b2f4-62a492fa609f",
        name: "zxcvxzcvzxcv",
        orgId: "470053",
        rules: [
          "^fftfuyitrdtyf"
        ],
        longTimer: 18,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "c1f785b6-a4b4-4756-a99d-20c40fe34c5b",
        name: "      math",
        orgId: "470053",
        rules: [
          "^311"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "2fdc25e4-2d19-4dd7-a389-2c61bb32fab0",
        name: "r7ywu8gfcbh",
        orgId: "470053",
        rules: [
          "^grbt5rfgr"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "vu7ybyuiuvy"
      },
      {
        _id: "57866aa5-4343-4309-a00f-f0e24b9faec1",
        name: "rt2708 dp",
        orgId: "470053",
        rules: [
          "^rt2708"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2708upda"
      },
      {
        _id: "f8bf0eaf-38c3-4215-a071-a4cd91bf8738",
        name: "gchbdr",
        orgId: "470053",
        rules: [
          "^terfscasz"
        ],
        longTimer: 19,
        shortTimer: 2,
        description: "dgfrvdx"
      },
      {
        _id: "c7a51231-3902-4157-930d-7ca98f58aae5",
        name: "dian",
        orgId: "470053",
        rules: [
          "^12345"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "rtyu"
      },
      {
        _id: "8f18393d-fa0d-42eb-aae9-57d1d7195739",
        name: "SDDFWES",
        orgId: "470053",
        rules: [
          "^%tEGFVSDCZX "
        ],
        longTimer: 18,
        shortTimer: 3,
        description: "W4EADXQ"
      },
      {
        _id: "bdf38bb4-1a2d-4a52-8303-71180d57b10e",
        name: "Test34567",
        orgId: "470053",
        rules: [
          "^1234g"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "1ac12083-3292-4f01-9987-d74f4e946b17",
        name: "dd22",
        orgId: "470053",
        rules: [
          "^h"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "83fb4a70-592b-48a9-ac71-c8069ad62845",
        name: "bbbd",
        orgId: "470053",
        rules: [
          "^fhfh"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "dhhdhh"
      },
      {
        _id: "614de1aa-16d5-4ce3-ba71-1c54703614b7",
        name: "cbcbcb",
        orgId: "470053",
        rules: [
          "^fhhfh"
        ],
        longTimer: 20,
        shortTimer: 4,
        description: "dd"
      },
      {
        _id: "283c2d1a-5b6f-4105-b9ad-6b92e5633c2e",
        name: "sdjfdhfj",
        orgId: "470053",
        rules: [
          "^djdjdj",
          "^hhh[0-9]"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "fhfhfh"
      },
      {
        _id: "15fb7003-061f-4f2e-9ced-f0d964838a33",
        name: "12345678901234567890",
        orgId: "470053",
        rules: [
          "^djfhdjskf"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "56466099-5bce-41e8-a63b-33d48cb002a4",
        name: "0903regression",
        orgId: "470053",
        rules: [
          "^rules",
          "^fdf"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "description"
      },
      {
        _id: "66b9ddb4-1e95-46c8-8196-eb29707d11ea",
        name: "Test01",
        orgId: "470053",
        rules: [
          "^dfd"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "1e4a30f0-7c65-4fdf-a4d8-a5fd945e3e9c",
        name: "testo",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "9b80b989-8583-4aa6-a550-72ff451c2fb2",
        name: "test",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "ebad95db-0bd7-4536-843f-95e76afdc061",
        name: "sdsf",
        orgId: "470053",
        rules: [
          "^dhgcytdyt"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "2b113648-f087-4617-9960-897404ef541c",
        name: "cpsanity2109dp",
        orgId: "470053",
        rules: [
          "^cpsanity2109"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "cpsanity2109"
      },
      {
        _id: "71cfc410-652c-4cdb-acb5-ccca43eccb54",
        name: "sunday",
        orgId: "470053",
        rules: [
          "^ko"
        ],
        longTimer: 8,
        shortTimer: 4,
        description: "day"
      },
      {
        _id: "8b64a51b-4154-48fa-b2bd-0562dd9ef630",
        name: "24r3fwe",
        orgId: "470053",
        rules: [
          "^RSVSFVF"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: "wrfcwf"
      },
      {
        _id: "c223bb71-975c-4d29-8ee6-770dea8e3e80",
        name: "mrt20081 dp",
        orgId: "470053",
        rules: [
          "^mrt20081"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "mrt20081 upd"
      },
      {
        _id: "68fba50f-9cfb-405a-af3d-b5b64a9bf2f7",
        name: "fren2008",
        orgId: "470053",
        rules: [
          "^fren2008"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "fren2008"
      },
      {
        _id: "fbc7d0aa-a8a9-4fc0-bc20-76c521f09473",
        name: "0207dial plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "0207dial plan"
      },
      {
        _id: "aaeb4035-3595-4818-aab4-d74309e10ba6",
        name: "rt2408adp",
        orgId: "470053",
        rules: [
          "^rt2408a"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2408aUpdate"
      },
      {
        _id: "ac76decb-0774-4826-99a9-e7932f5b6ee6",
        name: "0507dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "0507dialplan"
      },
      {
        _id: "75760be0-683b-4de2-bebe-2869494b2fb3",
        name: "st27082dp",
        orgId: "470053",
        rules: [
          "^st27082"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st27082dp"
      },
      {
        _id: "21269712-d320-4483-b279-d45fc28d7091",
        name: "rrrar",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 8,
        shortTimer: 3,
        description: "dsfd"
      },
      {
        _id: "8d93dca4-f3d5-40ec-a565-421b0745ae55",
        name: "coc yuan dial",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "08b3a540-8105-4375-ad68-a29fbd14bf1f",
        name: "Ruby",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "da1cc9d1-c224-44e2-a499-a456c99a5c80",
        name: "sdfds",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "31b43b23-d1ce-4f99-8268-b554291be17b",
        name: "rt0209 dp",
        orgId: "470053",
        rules: [
          "^rt0209"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "rt0209 dpupdate"
      },
      {
        _id: "a14d1035-14e5-4fa7-a2f4-e3b4b11d1c02",
        name: "jkong_sip_profile",
        orgId: "470053",
        rules: [
          "^[0-9]{10}",
          "^911",
          "^S[0-9]{12}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "jkong"
      },
      {
        _id: "418a2cf3-2c71-42e8-a055-270d65007fc6",
        name: "2107dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "2107dialplanureer"
      },
      {
        _id: "173c5634-f770-43c2-a1f7-4f07fe323f18",
        name: "st2107dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st2107"
      },
      {
        _id: "2ea05c75-a4b6-4999-bc50-0ac3e1fe4b93",
        name: "stdialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "8d67821b-d855-4758-8ecc-726923fe592b",
        name: "rt0309dp",
        orgId: "470053",
        rules: [
          "^546465"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt0309"
      },
      {
        _id: "2181e81b-cd07-42a2-b21a-8c60873c7377",
        name: "0907dialplan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "0907dialplan"
      },
      {
        _id: "46f0939c-b962-47e8-bb98-00b54875a69e",
        name: "        ",
        orgId: "470053",
        rules: [
          "^9"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "86f727d1-2290-439c-9171-4d7acaf4ab46",
        name: "2407dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "1d5bb5d0-b56c-4498-8c16-525a4fc6be31",
        name: "tester",
        orgId: "470053",
        rules: [
          "^rwuak"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "test1"
      },
      {
        _id: "d683e536-9333-4c3d-bb67-5975e78c3369",
        name: "gvcbdhikcui",
        orgId: "470053",
        rules: [
          "^mkefecklcd"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "ghjnm"
      },
      {
        _id: "08b555b2-d631-426a-b0e1-95cf7a27bf9d",
        name: "fren20082021 dp",
        orgId: "470053",
        rules: [
          "^fren20082021"
        ],
        longTimer: 7,
        shortTimer: 3,
        description: "fren20082021"
      },
      {
        _id: "25f2f656-7cc8-4471-8f2b-821f14ae102c",
        name: "Clarence_Dial_Plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "72f66884-d297-45f1-ade0-e32ae2198090",
        name: "sdfdsdfds",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 10,
        shortTimer: 3,
        description: "dsfsd"
      },
      {
        _id: "7257a1c2-a743-4945-a295-fb6fedb8d41f",
        name: "mrt2707dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "sdfdsiupd"
      },
      {
        _id: "654f0b54-a5d4-42b6-bd2a-3467a15dad88",
        name: "wwrerwwe",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "28a15039-e050-4905-8822-516b3b3db37a",
        name: "mrt2807dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "mrt2807Upd"
      },
      {
        _id: "2cdf2a43-2b12-4c6f-babe-72dde81a6ee8",
        name: "testen dp",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "dsf"
      },
      {
        _id: "17a86bd9-5a4c-4b74-b6f0-f400e76595cf",
        name: "cco_yuan_dial",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "d6000046-d6ad-4ef4-988c-174ba9477fdb",
        name: "cco_yuan_dial_long",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "5ef66cba-77cb-498f-8634-3eac1f581972",
        name: "rt0909 dp",
        orgId: "470053",
        rules: [
          "^rt0909"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt0909dpupdate"
      },
      {
        _id: "d500c6b9-eddc-47e0-80ca-0382273c12b4",
        name: "fresh",
        orgId: "470053",
        rules: [
          "^8"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "7a6d87d4-3d4c-482d-9d9f-4fa653015c21",
        name: "st1309dp",
        orgId: "470053",
        rules: [
          "^st1309"
        ],
        longTimer: 8,
        shortTimer: 2,
        description: "st1309d"
      },
      {
        _id: "43d70838-c269-4030-8c7d-6a0a980edd8f",
        name: "newuser",
        orgId: "470053",
        rules: [
          "^45"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "dffd"
      },
      {
        _id: "ce2c83a3-663b-4e01-8785-b81f36f80c46",
        name: "newname",
        orgId: "470053",
        rules: [
          "^gh"
        ],
        longTimer: 9,
        shortTimer: 7,
        description: "jhbjbkj"
      },
      {
        _id: "5bade574-139c-4813-8bc3-95e3144ff743",
        name: "dfdf",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "dsfsd"
      },
      {
        _id: "c763034f-d3a1-4d00-8e98-689025808245",
        name: "sisiCorrect",
        orgId: "470053",
        rules: [
          "^[2-9][0-9]{9}"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "5b9321dc-c898-49c5-b420-99156cd1eaa2",
        name: "sdfs",
        orgId: "470053",
        rules: [
          "^sfs"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: "sdf"
      },
      {
        _id: "5a1320ec-27b9-4f62-8ab6-173989b0b674",
        name: "richardui",
        orgId: "470053",
        rules: [
          "^fdgafg"
        ],
        longTimer: 15,
        shortTimer: 10,
        description: "autotest"
      },
      {
        _id: "d10571a1-6ce8-4c9d-bef6-81ac1162a77c",
        name: "richard mathew",
        orgId: "470053",
        rules: [
          "^kjb"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "autotest"
      },
      {
        _id: "3370766f-4b26-4aae-8f55-1bb5bae726e7",
        name: "jd dial",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: "jd dial"
      },
      {
        _id: "30ebe046-6b0a-43aa-b69b-b554ef041dc9",
        name: "nrt1509dpp",
        orgId: "470053",
        rules: [
          "^nrt15093"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "nrt1509sdfs"
      },
      {
        _id: "81304a8b-ab87-4e3d-91d8-7a3a2066fc91",
        name: "cepm dial plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "cepm"
      },
      {
        _id: "e47212f3-87f1-4fe7-8eea-db4fd4e54e60",
        name: "BHDBHBDHB",
        orgId: "470053",
        rules: [
          "^dnfddhf"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "hdfbhbhbf"
      },
      {
        _id: "d1b234ae-a177-40a0-9c70-3c9e789cd4a5",
        name: "st2608dp",
        orgId: "470053",
        rules: [
          "^st2608"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "st2608"
      },
      {
        _id: "6162e1d2-0fef-4599-9b8c-b02e500492a0",
        name: "rt2907",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "zcxzcszc"
      },
      {
        _id: "8ca32447-a0b5-44ca-8d27-04df461b12b8",
        name: "st3108dp",
        orgId: "470053",
        rules: [
          "^st3108"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st3108"
      },
      {
        _id: "910eb181-3820-4a64-8c45-d097867a1c73",
        name: "mrt3007 dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt3007up1"
      },
      {
        _id: "b18f693d-c84c-4f09-b409-0e95e2e0ee4c",
        name: "rt0609dp",
        orgId: "470053",
        rules: [
          "^rt0609"
        ],
        longTimer: 7,
        shortTimer: 3,
        description: "rt0609dpupdate"
      },
      {
        _id: "6572a766-8e30-4433-9ebd-ed32a16cbc6e",
        name: "mrt0208dp",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt0208upd"
      },
      {
        _id: "7d6e52a5-e3d6-4552-bf95-15c673a7e8ed",
        name: "cell ",
        orgId: "470053",
        rules: [
          "^change"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "cd8632e8-3120-433c-899f-7b97d3c84bdd",
        name: "st0609dp",
        orgId: "470053",
        rules: [
          "^st0609"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0609dp"
      },
      {
        _id: "5c5f70c1-32c1-4c6b-b7fa-ac0c0c2dc0c9",
        name: "st0809dp",
        orgId: "470053",
        rules: [
          "^st0809"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "st0809"
      },
      {
        _id: "6537e633-a15b-45ee-a8bb-e36fde7ff694",
        name: "Length 2003",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "EXOS-8575"
      },
      {
        _id: "8216657a-5574-4070-bdfc-f97f9382e6f5",
        name: "bfbf",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "fdbfdbfdb"
      },
      {
        _id: "e2b54ac0-a70c-43d8-9755-c8618b503e3d",
        name: "rt1309dp",
        orgId: "470053",
        rules: [
          "^rt1309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt1309dpupdate"
      },
      {
        _id: "33b5c3ce-1ecd-4b68-ac36-b7fef2b1f47c",
        name: "st1409dp",
        orgId: "470053",
        rules: [
          "^st1409"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1409"
      },
      {
        _id: "f40bc227-d214-4268-adaf-6d8f1ac692de",
        name: "pt1509 dp",
        orgId: "470053",
        rules: [
          "^pt1509"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "pt1509updat"
      },
      {
        _id: "7f6b4e56-0669-4f97-acc3-731256c70125",
        name: "mrt0508dp",
        orgId: "470053",
        rules: [
          "^mrt0508"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt0508upd"
      },
      {
        _id: "9cc67f59-29ae-41e1-b16b-647ffa178a3a",
        name: "mrt0608 dp",
        orgId: "470053",
        rules: [
          "^454"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "mrt0608update"
      },
      {
        _id: "c5ce5a03-e888-4f48-afd8-126bf1d58b2f",
        name: "rt07081 dp",
        orgId: "470053",
        rules: [
          "^rt07081"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt07081update"
      },
      {
        _id: "8a1c98b3-d0c5-4f0d-afd3-32af81314d44",
        name: "s10908dp",
        orgId: "470053",
        rules: [
          "^154545"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "s10908update"
      },
      {
        _id: "eb68940a-81fa-4ef8-b347-c7276dcb2fc4",
        name: "s11008dp",
        orgId: "470053",
        rules: [
          "^23423423"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "s11008"
      },
      {
        _id: "4287dcaf-5b94-421b-af2c-378e07397af6",
        name: "rt1108dp",
        orgId: "470053",
        rules: [
          "^454654"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt1108upd"
      },
      {
        _id: "33498366-6607-491e-b72c-ea7d80a01919",
        name: "rt1208dp",
        orgId: "470053",
        rules: [
          "^32423"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt1208"
      },
      {
        _id: "7e368651-ac6d-467f-bb19-c6b4b69175de",
        name: "rt3108dpppd",
        orgId: "470053",
        rules: [
          "^5234523"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt3108upddd"
      },
      {
        _id: "3bb04ca8-fd64-4f2a-8a6b-0a55c206668e",
        name: "compound",
        orgId: "470053",
        rules: [
          "^5"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "des"
      },
      {
        _id: "5ee4690b-a28d-495e-b46b-fdd303b5a543",
        name: "mrt1608dialp",
        orgId: "470053",
        rules: [
          "^mrt1608"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "mrt1608update"
      },
      {
        _id: "4079e95b-b377-49fe-b7fd-5fba7e56d3b0",
        name: "23458tugy",
        orgId: "470053",
        rules: [
          "^tcdgcfyghbj"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "876545"
      },
      {
        _id: "37e72823-d681-4cca-8e31-313b5e8d716b",
        name: "st1609dp",
        orgId: "470053",
        rules: [
          "^st1609"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1609dp"
      },
      {
        _id: "b98673c3-f507-4bf7-af2b-63c8a09776fa",
        name: "      chakri",
        orgId: "470053",
        rules: [
          "^122"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "d544174e-5a47-4c9c-9c82-8f99af9ba83e",
        name: "st160922dp",
        orgId: "470053",
        rules: [
          "^st160922"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st160922"
      },
      {
        _id: "b17845b9-ef41-4492-b7fa-d5acf7711bb8",
        name: "Test0145",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 18,
        shortTimer: 8,
        description: "verify"
      },
      {
        _id: "e7c07bfc-cd01-4a84-9c0c-bb85f49bd01d",
        name: "rt1709dp",
        orgId: "470053",
        rules: [
          "^rt1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt1709dp updat"
      },
      {
        _id: "804586c3-5943-4e27-8a0a-c6b33d53f503",
        name: "st1709dp",
        orgId: "470053",
        rules: [
          "^st1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1709dp"
      },
      {
        _id: "412263f9-2d58-48ba-ab5d-bed81fcb8fd4",
        name: "sst1709dp",
        orgId: "470053",
        rules: [
          "^sst1709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst1709dd"
      },
      {
        _id: "9d938388-6007-4376-876a-4098c40abb3e",
        name: "            ",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "8144e6b7-f1ff-4b11-9cf1-45d0d430a20e",
        name: "sst2009 dp",
        orgId: "470053",
        rules: [
          "^sst2009"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst2009"
      },
      {
        _id: "96744e51-b67f-492e-a885-78fd2fe9421b",
        name: "rtt2109 dp",
        orgId: "470053",
        rules: [
          "^rtt2109"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rtt2109update"
      },
      {
        _id: "5fbc0c5d-5d37-4810-a09a-0895b3a5948a",
        name: "ddd2109 dp",
        orgId: "470053",
        rules: [
          "^ddd2109"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ddd2109"
      },
      {
        _id: "168a3f3e-d411-4a7d-b38b-0a4044f8aaf8",
        name: "cccc2109 dp",
        orgId: "470053",
        rules: [
          "^cccc2109"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "cccc2109"
      },
      {
        _id: "27a25661-a0b0-4f11-93cf-a865fe911d77",
        name: "ff2209 dp",
        orgId: "470053",
        rules: [
          "^ff2209 "
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ff2209 "
      },
      {
        _id: "98760ce5-088e-4d35-b4ed-52deeb5b9a0f",
        name: "ch2209 dp",
        orgId: "470053",
        rules: [
          "^ch2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "ch2209"
      },
      {
        _id: "3849ab96-a8ef-4f43-821a-61a946f82aaf",
        name: "st2209 dp",
        orgId: "470053",
        rules: [
          "^st2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2209"
      },
      {
        _id: "a51b2798-2ed9-4dc4-ae80-15a4642285a8",
        name: "cc2209dp",
        orgId: "470053",
        rules: [
          "^cc2209"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "cc2209"
      },
      {
        _id: "dda57b97-d02b-4a7b-ae85-85023c2cd9a7",
        name: "2309dp",
        orgId: "470053",
        rules: [
          "^470053"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "470053"
      },
      {
        _id: "6ab63724-3a0a-4265-a83f-272bb65ffdb1",
        name: "stg2309 dp",
        orgId: "470053",
        rules: [
          "^stg2309 dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "stg2309 dpupdate"
      },
      {
        _id: "6467ecf3-2a42-41f0-8eca-c225e975ec92",
        name: "ert2309",
        orgId: "470053",
        rules: [
          "^ert2309"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: "ertupdat"
      },
      {
        _id: "217c6da3-4f01-4fe0-92eb-ca3cbae3801b",
        name: "est2309dp",
        orgId: "470053",
        rules: [
          "^est2309"
        ],
        longTimer: 7,
        shortTimer: 1,
        description: "est2309updat"
      },
      {
        _id: "30b5daa5-f4a7-4312-93e0-d54d336ebc8b",
        name: "csc2309 dp",
        orgId: "470053",
        rules: [
          "^csc2309"
        ],
        longTimer: 6,
        shortTimer: 3,
        description: "csc2309update"
      },
      {
        _id: "fefd53d7-a069-4f9e-905e-cb222d87c7ca",
        name: "Dep2309 dp",
        orgId: "470053",
        rules: [
          "^Dep2309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "Dep2309update"
      },
      {
        _id: "4bd9bc98-7f93-4063-b458-d864c544aa4b",
        name: "coc2309 dp",
        orgId: "470053",
        rules: [
          "^coc2309"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "coc2309updateedi"
      },
      {
        _id: "d2f53830-6500-46ee-abbd-4f030e69f8bb",
        name: "csc1dp",
        orgId: "470053",
        rules: [
          "^csc1dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "csc1dpupdate"
      },
      {
        _id: "c00fd317-c91d-4ea8-92a5-f5d3e83bde20",
        name: "dep1 dp",
        orgId: "470053",
        rules: [
          "^dep1 dp"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "dep1 dpupdatedit"
      },
      {
        _id: "0cbc0583-2f71-4331-a48b-205c79ba0b26",
        name: "rt2409 dp",
        orgId: "470053",
        rules: [
          "^rt2409"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt2409update"
      },
      {
        _id: "cc39466f-4ed7-47a5-9e42-9437661b69d3",
        name: "rt2409c dp",
        orgId: "470053",
        rules: [
          "^rt2409c"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt2409c"
      },
      {
        _id: "67af0aa0-28c1-4051-82db-95fc3fdf6fb2",
        name: "EXOS-8575",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "dial"
      },
      {
        _id: "3a426251-d434-4dfc-ade7-53b4645ec020",
        name: "9846",
        orgId: "470053",
        rules: [
          "^777"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "automation testing"
      },
      {
        _id: "72bc91b1-a8f7-49e5-8a1b-4e70cb177027",
        name: "derick133",
        orgId: "470053",
        rules: [
          "^2345vcdscda"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a6d370a2-4c37-4a7c-be63-bc63fcf1ec3f",
        name: "st2409 dp",
        orgId: "470053",
        rules: [
          "^st2409"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2409dpupdate"
      },
      {
        _id: "c3efacdf-ef0e-41a0-8504-ddcbffe8434d",
        name: "Test01778",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "demo01"
      },
      {
        _id: "eb974a0f-ad6e-43c8-9a22-6c53db9112c5",
        name: "dail",
        orgId: "470053",
        rules: [
          "^787"
        ],
        longTimer: 8,
        shortTimer: 4,
        description: "dialdail"
      },
      {
        _id: "8b67232b-9507-4b39-b130-554488c02cfa",
        name: "           ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "7de6c915-fe3b-4e8d-a9fc-7873571bf3b0",
        name: "Yonos",
        orgId: "470053",
        rules: [
          "^Yonos"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "Yonosdsf"
      },
      {
        _id: "c822c599-7ac6-4676-a815-0b30e7a4ef05",
        name: "st2709dp",
        orgId: "470053",
        rules: [
          "^st2709"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2709dp"
      },
      {
        _id: "b03b1ff6-f7f1-44f4-a783-84bbeb6e70a5",
        name: "rt2809 dp",
        orgId: "470053",
        rules: [
          "^rt2809"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt2809dupdte"
      },
      {
        _id: "cb7faf36-99ff-4931-aaba-135bd5523a7e",
        name: "st2809 dp",
        orgId: "470053",
        rules: [
          "^st2809"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2809d1"
      },
      {
        _id: "2af27a70-3cc4-420d-a14a-972d0d901382",
        name: "st2809dpp",
        orgId: "470053",
        rules: [
          "^st2809"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st2809d"
      },
      {
        _id: "824f1726-69b6-4748-93f3-b52d41925cf1",
        name: "rtr2909dp",
        orgId: "470053",
        rules: [
          "^rtr2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtr2909d"
      },
      {
        _id: "8470e04a-4b6c-4ce8-a4ef-05c222a5ea27",
        name: "rtcco2909dp",
        orgId: "470053",
        rules: [
          "^rtcco2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtcco2909dd"
      },
      {
        _id: "35bc31e0-0940-4639-bee7-3140e71f992e",
        name: "st2909 dp",
        orgId: "470053",
        rules: [
          "^st2909"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st2909dpupdate"
      },
      {
        _id: "ef2c32f0-7fbc-4e69-b654-06f281ef574e",
        name: "rt3009 dp",
        orgId: "470053",
        rules: [
          "^rt3009"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "rt3009dupdat"
      },
      {
        _id: "f4f267ef-248f-4859-bc7a-bb1e2ee24f50",
        name: "ForTest3",
        orgId: "470053",
        rules: [
          "^1234"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "59c596d2-468a-4d82-9580-32ab0a7eba03",
        name: "ForTest1",
        orgId: "470053",
        rules: [
          "^1234"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "test_purpose"
      },
      {
        _id: "34886445-b070-4ab2-a9f3-cf5065f0e8fe",
        name: "rt0110dp",
        orgId: "470053",
        rules: [
          "^rt0110"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rt0110ddupdate"
      },
      {
        _id: "735294f3-de51-4fe0-9abe-284a0a42603d",
        name: "st0110dp",
        orgId: "470053",
        rules: [
          "^st0110"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0110d"
      },
      {
        _id: "f55d58a3-0407-469f-818f-04369d59060b",
        name: "st0410dp",
        orgId: "470053",
        rules: [
          "^st0410"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0410d"
      },
      {
        _id: "f1828ff3-13ec-4496-96e5-132fadb0cc95",
        name: "rtc05101dp",
        orgId: "470053",
        rules: [
          "^rtc05101"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtc05101dpup"
      },
      {
        _id: "c3f3de4e-0034-4f48-b034-540cbbd6708e",
        name: "rtf0510dp",
        orgId: "470053",
        rules: [
          "^rtf0510"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtf0510d"
      },
      {
        _id: "05713815-7373-4488-88c9-de8b40ad9d71",
        name: "rtf05101dp",
        orgId: "470053",
        rules: [
          "^rtf0510"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "rtf0510xdq"
      },
      {
        _id: "3df6dc52-d567-4f52-a4db-565699d1ad6b",
        name: "st0610 dp",
        orgId: "470053",
        rules: [
          "^st0610"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0610dpuu"
      },
      {
        _id: "a0b24999-b3e0-43ef-bfeb-9c985e7b4d4c",
        name: "raja",
        orgId: "470053",
        rules: [
          "^10"
        ],
        longTimer: 9,
        shortTimer: 8,
        description: "raj"
      },
      {
        _id: "d3adbabb-b62f-4ec4-a8af-2b1b0974df98",
        name: "123556",
        orgId: "470053",
        rules: [
          "^112"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "Java,selenium"
      },
      {
        _id: "00d40d22-46d1-4bdd-84d0-3cff610cfa84",
        name: "                    ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "42a786fa-ac58-45f2-a3e1-0c1783706743",
        name: "sisiCOClongDial",
        orgId: "470053",
        rules: [
          "^S99[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "f958a92e-85ba-4f52-992f-f2c1af046700",
        name: "fgvd c",
        orgId: "470053",
        rules: [
          "^sdyuaxbhidc                                   ufgsh                                                                           fue"
        ],
        longTimer: 7,
        shortTimer: 5,
        description: "cd"
      },
      {
        _id: "e0266035-f02e-423f-b171-38754c2c716e",
        name: "gowtham78654",
        orgId: "470053",
        rules: [
          "^wedsxdvs"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "4716e2f5-a114-444d-af71-1ae53264c24a",
        name: "dialp",
        orgId: "470053",
        rules: [
          "^dialpsd"
        ],
        longTimer: 15,
        shortTimer: 10,
        description: "dialpadasfd"
      },
      {
        _id: "dbfb8850-9d29-40dc-8c92-fa35bf3487b9",
        name: "mani2",
        orgId: "470053",
        rules: [
          "^d"
        ],
        longTimer: 16,
        shortTimer: 11,
        description: ""
      },
      {
        _id: "83a0da24-d10e-4c56-9aa5-8a44720c3d9e",
        name: "navi",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 16,
        shortTimer: 15,
        description: "hggdx"
      },
      {
        _id: "3148da22-4fae-43b9-b717-782b35c69435",
        name: "kind",
        orgId: "470053",
        rules: [
          "^6"
        ],
        longTimer: 17,
        shortTimer: 16,
        description: "ggggggjiii"
      },
      {
        _id: "5b6a5169-fabb-41a9-9675-11a1687f3f17",
        name: "sdfersgfdv",
        orgId: "470053",
        rules: [
          "^fgbtrdfgvdf"
        ],
        longTimer: 16,
        shortTimer: 13,
        description: "qeqasdxwqsa"
      },
      {
        _id: "2b6e302a-4303-4092-9363-c40629a0d65a",
        name: "yuuu",
        orgId: "470053",
        rules: [
          "^788"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "thnt"
      },
      {
        _id: "76e3febc-21ff-4afa-b6e1-e1bfdc1f7e0c",
        name: "Test8",
        orgId: "470053",
        rules: [
          "^fweOIP().,"
        ],
        longTimer: 18,
        shortTimer: 11,
        description: "ertyuijkmn cvbnm"
      },
      {
        _id: "08ce895b-9435-493b-83e8-650d4e52c472",
        name: "dwgrvrgv",
        orgId: "470053",
        rules: [
          "^ergregerf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "erg55re"
      },
      {
        _id: "5c375c71-6b3f-47ab-8069-d8850dd86026",
        name: "gowthamhg",
        orgId: "470053",
        rules: [
          "^sfbvhk"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "autotest123"
      },
      {
        _id: "a9ef4fdd-69c7-4d14-8ea1-4fb47cc34473",
        name: "st0710dp",
        orgId: "470053",
        rules: [
          "^st0710"
        ],
        longTimer: 7,
        shortTimer: 2,
        description: "st0710d1"
      },
      {
        _id: "22985c38-c751-4209-abe2-85e857d92650",
        name: "hiii",
        orgId: "470053",
        rules: [
          "^9"
        ],
        longTimer: 18,
        shortTimer: 11,
        description: "ghgfhh"
      },
      {
        _id: "5a3a7165-299d-4bde-a73f-606b4b273bba",
        name: "sdsdf",
        orgId: "470053",
        rules: [
          "^sdf"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "sdf"
      },
      {
        _id: "38bf3920-286a-4beb-a3c7-a31f81d83963",
        name: "tsx14032022",
        orgId: "470053",
        rules: [
          "^tsx14032022"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "tsx14032022"
      },
      {
        _id: "8355560b-b672-4c1b-96bd-bcf58358a4c8",
        name: "q3t4berv",
        orgId: "470053",
        rules: [
          "^edcadc"
        ],
        longTimer: 14,
        shortTimer: 9,
        description: ""
      },
      {
        _id: "64cc5ace-d870-443a-98f8-2311601b7c59",
        name: "TEgdsdsyhd",
        orgId: "470053",
        rules: [
          "^yghjuu"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: "TEgdsdsyhd."
      },
      {
        _id: "16c2ac05-b9bc-46c9-a01b-ad1d4b27ef62",
        name: "st0810dp",
        orgId: "470053",
        rules: [
          "^st0810"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st0810d"
      },
      {
        _id: "98aee7e5-656f-4a2f-ad42-51735df3e816",
        name: "st11081 dp",
        orgId: "470053",
        rules: [
          "^st11081"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st11081"
      },
      {
        _id: "996c0956-6d96-4884-9574-0895d9a3bd2d",
        name: "ForautoTest3",
        orgId: "470053",
        rules: [
          "^4321"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "76b80a2b-a4c1-4643-a26c-d84d5e63427f",
        name: "st1810 dp",
        orgId: "470053",
        rules: [
          "^st1810"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st1810"
      },
      {
        _id: "e1a720fa-4587-47f2-ab1e-b235f9726eeb",
        name: "gowtham",
        orgId: "470053",
        rules: [
          "^wcjh"
        ],
        longTimer: 13,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "b07759ed-da4f-4555-b0d1-dc511f65b68a",
        name: "jjkf",
        orgId: "470053",
        rules: [
          "^6666"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "jkkkkkkkkkk"
      },
      {
        _id: "8b65f732-8f3a-4a10-babf-d6c9b2e0742a",
        name: "1uytgfdsf",
        orgId: "470053",
        rules: [
          "^gfct"
        ],
        longTimer: 9,
        shortTimer: 8,
        description: ""
      },
      {
        _id: "6b83f1f0-94a4-4565-aa77-067a6bfc85fd",
        name: "     ",
        orgId: "470053",
        rules: [
          "^7"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "8d52f7ae-86f5-410e-8045-a01b83236a1f",
        name: "yctfugyibk",
        orgId: "470053",
        rules: [
          "^trhedrrefbgtegwrgbrsfv"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "edrfugy"
      },
      {
        _id: "bedadb14-53f4-48c0-b8ba-1efd5bae12be",
        name: "Fortestcheck",
        orgId: "470053",
        rules: [
          "^7412"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "by testers, do not use"
      },
      {
        _id: "42507e35-c781-4057-b2ad-016fea5c3b6e",
        name: "dp112",
        orgId: "470053",
        rules: [
          "^ahbsjw8"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "kcbjkadjs"
      },
      {
        _id: "c6ecd4f1-702a-4126-9243-115d9e3ac5a7",
        name: "sanity2403n",
        orgId: "470053",
        rules: [
          "^666"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "fjkldah"
      },
      {
        _id: "c8c69579-ed30-44e0-9dab-bd77cc28574d",
        name: "5643567y",
        orgId: "470053",
        rules: [
          "^wbysdhcd"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "1ee62afe-cea2-489c-a3c2-9d9ffd8e528f",
        name: "7654e",
        orgId: "470053",
        rules: [
          "^xrctvh"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: "234567"
      },
      {
        _id: "738e461d-680e-4e18-b47f-c39c62a0a845",
        name: "9uy879",
        orgId: "470053",
        rules: [
          "^893126 gubdhx"
        ],
        longTimer: 17,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a8da8389-a75b-4913-a236-150cce1e821d",
        name: "4637",
        orgId: "470053",
        rules: [
          "^tuweyib6437"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "5849"
      },
      {
        _id: "c9433f29-5884-467e-aff5-5f38732a2dd4",
        name: "gyfitkuykvjj",
        orgId: "470053",
        rules: [
          "^F"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "qsdtrv"
      },
      {
        _id: "2a513c1d-20cf-4f92-8043-28ff79f75255",
        name: "fdgdb",
        orgId: "470053",
        rules: [
          "^djh"
        ],
        longTimer: 15,
        shortTimer: 13,
        description: ""
      },
      {
        _id: "ecf65242-d562-4a05-bdca-344860e953de",
        name: "            ",
        orgId: "470053",
        rules: [
          "^511"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "79a4bca9-87f6-4b3b-85cd-1f27814a414b",
        name: "       jsdkljaflkjl",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "c9b8ad1a-d656-4d94-8db5-41a4db7b28bd",
        name: "lisa_sip",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 16,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "640d5781-7059-49eb-8644-5977672f905d",
        name: "r678",
        orgId: "470053",
        rules: [
          "^dfvxv"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "werty"
      },
      {
        _id: "e7a303d1-5e19-4397-8633-c5ba6075983c",
        name: "tweuygw",
        orgId: "470053",
        rules: [
          "^yvicuiwuiowe"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "dialplan00098"
      },
      {
        _id: "953242a8-6731-41b1-a695-5434fce392c1",
        name: "dp232",
        orgId: "470053",
        rules: [
          "^dp1123"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "2d1c2e0d-6a6e-4df8-b426-84baa5eac092",
        name: "static125s",
        orgId: "470053",
        rules: [
          "^adfgdf"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "static125"
      },
      {
        _id: "8f6fae5d-7f6c-4c74-9e19-103872cadd99",
        name: "q111",
        orgId: "470053",
        rules: [
          "^(&T%Uffgrgd"
        ],
        longTimer: 9,
        shortTimer: 7,
        description: "creating for demo purpose"
      },
      {
        _id: "bec81676-8865-48e2-96e4-016e5df87c2d",
        name: "Name",
        orgId: "470053",
        rules: [
          "^ddp"
        ],
        longTimer: 11,
        shortTimer: 8,
        description: "Description "
      },
      {
        _id: "1cf4262f-c999-4be1-8bca-13873c8e6a52",
        name: "hailan",
        orgId: "470053",
        rules: [
          "^911",
          "^411",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 15,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "660573f5-f5ba-4a69-86cd-25c616f2c00a",
        name: "st28102021 dp",
        orgId: "470053",
        rules: [
          "^st28102021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "st28102021"
      },
      {
        _id: "98667145-f023-485c-826d-014d52a371ea",
        name: "MANI112",
        orgId: "470053",
        rules: [
          "^dsalk"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "IUWBD"
      },
      {
        _id: "7d950f45-f143-4b47-863d-3da47fb866aa",
        name: "346r3",
        orgId: "470053",
        rules: [
          "^378wr6ty"
        ],
        longTimer: 16,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "a6129b33-a29d-40a4-b58f-7758a02679e4",
        name: "    kkkkkk",
        orgId: "470053",
        rules: [
          "^5"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "49699df0-6c2c-436f-b35f-5a6a4a311563",
        name: "468274",
        orgId: "470053",
        rules: [
          "^jvahcbaks"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "729482"
      },
      {
        _id: "9aedbf10-b057-4b8d-88f3-26dea83c7d05",
        name: "ashwin",
        orgId: "470053",
        rules: [
          "^xjjsjks"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: "dsssdd"
      },
      {
        _id: "8d247a9a-07fd-4a26-a5f4-b99379f6237c",
        name: "     ",
        orgId: "470053",
        rules: [
          "^9444"
        ],
        longTimer: 5,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "91b5a260-f3d3-4773-acb6-173e9ad9fe32",
        name: "         ",
        orgId: "470053",
        rules: [
          "^9898"
        ],
        longTimer: 4,
        shortTimer: 3,
        description: ""
      },
      {
        _id: "c7231fe7-99ea-4fa7-a7f1-326acb34d37e",
        name: "      ",
        orgId: "470053",
        rules: [
          "^955"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "7dc6a35f-c02f-45e1-993b-a7b0c63e38db",
        name: "  kamali",
        orgId: "470053",
        rules: [
          "^111"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "ad71e9e1-6664-4325-aa35-774ca4c282cd",
        name: "       kamali arul",
        orgId: "470053",
        rules: [
          "^4144"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "7192f7f7-0ea4-4f94-82c9-29536ddc5b6b",
        name: "     kamali",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "186d4cf9-876c-40aa-b51d-5b6d86129b6d",
        name: "3478",
        orgId: "470053",
        rules: [
          "^jhg"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "8cddd6e3-fd68-45bc-a8ba-603f74a63c83",
        name: "1234512345",
        orgId: "470053",
        rules: [
          "^jhgfdsa1234"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "test"
      },
      {
        _id: "7f6c765f-c909-42a7-a61c-bdda0f4e931f",
        name: "wrtrger",
        orgId: "470053",
        rules: [
          "^vfdsss/fwrfwe;'rf"
        ],
        longTimer: 15,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "a5e7cc4a-08d1-4133-b7f6-670cb0ef385b",
        name: "st01112021 dp",
        orgId: "470053",
        rules: [
          "^st01112021"
        ],
        longTimer: 6,
        shortTimer: 3,
        description: "st01112021"
      },
      {
        _id: "92c5d229-de8a-4a5a-afde-3f03c37a8878",
        name: "37891ui223",
        orgId: "470053",
        rules: [
          "^637r8g7wefyi"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "27836"
      },
      {
        _id: "1bd04191-aefd-4436-a566-8c8018f7b4be",
        name: "t4r62788726",
        orgId: "470053",
        rules: [
          "^R4"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "autotest123"
      },
      {
        _id: "c14f4517-982a-4250-b5e2-091e4f3d5cf1",
        name: "aliu_sip1",
        orgId: "470053",
        rules: [
          "^011[0-9]*T",
          "^1[0-9]{10}",
          "^[2-9]11",
          "^[2-9][0-9]{9}",
          "^S3[0-9]{2}",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S6[8-9]",
          "^S67[2-9][0-9]{9}",
          "^S67[1][2-9][0-9]{9}",
          "^S7[6-9]",
          "^S72[2-9][0-9]{9}",
          "^S74d[3-9][2-9][0-9]{9}",
          "^S75d[2][0-9][2-9][0-9]{9}",
          "^S8[0-1]",
          "^S8[3-9]",
          "^S82[2-9][0-9]{9}",
          "^S90[2-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "73bdb873-5914-4a67-abcd-7f892ca7189b",
        name: "aliu_sip2",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "e674c1e9-51a7-4c2e-85e4-d760930cab73",
        name: "dep03112021 dp",
        orgId: "470053",
        rules: [
          "^dep03112021"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "dep03112021"
      },
      {
        _id: "d2be6a19-6b95-4774-a4c2-bbca0f1a4dee",
        name: "st08112021 dp",
        orgId: "470053",
        rules: [
          "^st08112021"
        ],
        longTimer: 5,
        shortTimer: 3,
        description: "st08112021"
      },
      {
        _id: "853b5d05-bed2-4f36-9849-61c0d1cf378f",
        name: "seanzhu_01",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "a6806eeb-7823-4b0a-95ed-dd31b1caca16",
        name: "rt09112021 dp",
        orgId: "470053",
        rules: [
          "^rt09112021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt09112021"
      },
      {
        _id: "78792778-eae8-47e8-8956-d3e82d38f3f0",
        name: "rt09112021 fdp",
        orgId: "470053",
        rules: [
          "^rt09112021"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "rt09112021f"
      },
      {
        _id: "8d4e54c3-70df-4ea0-973d-35df83608d6d",
        name: "st1511 dp",
        orgId: "470053",
        rules: [
          "^st1511"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "st1511"
      },
      {
        _id: "4320bea4-2c2e-467e-8653-47ef1de73d55",
        name: "     kamaliR",
        orgId: "470053",
        rules: [
          "^877"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "700a9b06-ef4a-40de-ae2d-b838574c1f8c",
        name: "gggggggg",
        orgId: "470053",
        rules: [
          "^663"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "13c2eecb-f717-4ef5-a248-322d3101535a",
        name: "34789224",
        orgId: "470053",
        rules: [
          "^vcvdgjnk"
        ],
        longTimer: 17,
        shortTimer: 15,
        description: "3478y`"
      },
      {
        _id: "6f3bb404-43cb-4aae-befe-6fdd6ef5bda6",
        name: "wrxsecytv",
        orgId: "470053",
        rules: [
          "^e jhvcnkdm"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "wserdtfy"
      },
      {
        _id: "8ac467eb-9334-4ae5-b9c9-d965a9c9cafd",
        name: "             ",
        orgId: "470053",
        rules: [
          "^9112"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "b019423d-a808-4999-ba72-597f3ab0929d",
        name: "       ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "ef08e164-2e34-4d64-954c-7b7ce2cfd1d7",
        name: "        ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 6,
        shortTimer: 4,
        description: ""
      },
      {
        _id: "1a7fd00f-a589-4209-8585-cc56952f93ac",
        name: "         NISC",
        orgId: "470053",
        rules: [
          "^655"
        ],
        longTimer: 6,
        shortTimer: 5,
        description: ""
      },
      {
        _id: "0b96fb41-3c99-41b2-9127-7405ef5afa0c",
        name: "             kamali",
        orgId: "470053",
        rules: [
          "^43"
        ],
        longTimer: 6,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "2b889e7b-f2ed-4cdd-aec7-00d2e7bd5619",
        name: "dialplanfordemo",
        orgId: "470053",
        rules: [
          "^{}CHKBWNE"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "dpfd"
      },
      {
        _id: "193c8e95-0bde-4a14-b79d-ef7af55f9d15",
        name: "newdialplan987564",
        orgId: "470053",
        rules: [
          "^56784",
          "^wrfwwefwe589,4u9w-05898)()_"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "564738920"
      },
      {
        _id: "6e640e56-941c-4a15-ba43-eeb8a50dd745",
        name: "7848436874",
        orgId: "470053",
        rules: [
          "^rvjkvjfe"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "1342"
      },
      {
        _id: "0495005c-b79c-4eea-9c17-fe8f8edde8bc",
        name: "lokesh",
        orgId: "470053",
        rules: [
          "^1243"
        ],
        longTimer: 16,
        shortTimer: 8,
        description: "Manual tester"
      },
      {
        _id: "e1d43801-7cea-4230-867d-b9178d8bcd74",
        name: "765drytguj",
        orgId: "470053",
        rules: [
          "^xrgvbgh"
        ],
        longTimer: 9,
        shortTimer: 6,
        description: "w345erf6y"
      },
      {
        _id: "0f2e0a4d-7c8b-4dfc-9668-fc01e8b9161d",
        name: "344334",
        orgId: "470053",
        rules: [
          "^tgtevcfvcsd"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "3434"
      },
      {
        _id: "4a4b9813-d219-479d-9351-90d7eec49a61",
        name: "yrbu",
        orgId: "470053",
        rules: [
          "^ercds"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "cfgvybuhj"
      },
      {
        _id: "f231d650-74dd-4393-a833-1a587225081b",
        name: "cxvdfxcv",
        orgId: "470053",
        rules: [
          "^sffdcsdzvcx"
        ],
        longTimer: 18,
        shortTimer: 12,
        description: "efsxcvcdxc"
      },
      {
        _id: "04e5757f-fe01-41d7-a1ae-00d09ad825a3",
        name: "weewdcwesa",
        orgId: "470053",
        rules: [
          "^dfxgverdfgv"
        ],
        longTimer: 16,
        shortTimer: 12,
        description: "wescxwes"
      },
      {
        _id: "13f9a5ac-295d-4ef9-b412-76c68a3f0103",
        name: "75644356789",
        orgId: "470053",
        rules: [
          "^4567fty78"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "234567890876"
      },
      {
        _id: "393737cd-5597-4e13-8404-fdb99ed7c7b5",
        name: "weeewfwe",
        orgId: "470053",
        rules: [
          "^srgrvdfwevwsd"
        ],
        longTimer: 19,
        shortTimer: 1,
        description: "q3wer3fwe"
      },
      {
        _id: "29fbd978-f52f-4217-b48e-9440b7975947",
        name: "ashwinr65789",
        orgId: "470053",
        rules: [
          "^zwrxety"
        ],
        longTimer: 17,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "1914235b-d8f6-4af6-8988-735cb51320fc",
        name: "453534523",
        orgId: "470053",
        rules: [
          "^addaesz"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "24"
      },
      {
        _id: "56ef3e37-4bad-4816-a915-773c2bf6f72a",
        name: "dial plan 123",
        orgId: "470053",
        rules: [
          "^9878"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "fe3fbb15-bd64-4189-b230-ab8a9d09c776",
        name: "trhegdbersvd",
        orgId: "470053",
        rules: [
          "^getdbdwefvcdcsfvwe"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "vsfdbdsvd"
      },
      {
        _id: "f94af9de-72bc-42b8-8559-744454739427",
        name: "Regression",
        orgId: "470053",
        rules: [
          "^67555555555555556"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "automation testing,manual testing"
      },
      {
        _id: "3326f047-b158-4c89-bfa4-7051811a5463",
        name: "6875678776",
        orgId: "470053",
        rules: [
          "^fdfvdfv"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "4657856787"
      },
      {
        _id: "aa6472b8-e41a-4589-b9c7-f9502b514539",
        name: "sst16112021 dp",
        orgId: "470053",
        rules: [
          "^sst16112021"
        ],
        longTimer: 6,
        shortTimer: 2,
        description: "sst16112021 d"
      },
      {
        _id: "4655ea70-dd68-49af-b7e6-4d48ad361d8e",
        name: "             kamaliR",
        orgId: "470053",
        rules: [
          "^23"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "92595862-0d70-4aa0-82e2-3ff459249679",
        name: "34ty7686534r4",
        orgId: "470053",
        rules: [
          "^rgghgrdrevbfvbedf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "ethjy5gt"
      },
      {
        _id: "2ce21ae6-405e-4f7e-a321-5cac89cbba25",
        name: "CXNK00207CCDasdfe",
        orgId: "470053",
        rules: [
          "^CXNK00207CCDs"
        ],
        longTimer: 5,
        shortTimer: 2,
        description: "CXNK00207CCD"
      },
      {
        _id: "49de3092-8fbb-4a90-97ee-b65c1b784e6f",
        name: "wyyteffef",
        orgId: "470053",
        rules: [
          "^dsnbfrfbsbsbvsx"
        ],
        longTimer: 18,
        shortTimer: 9,
        description: "aeafsfsfvs"
      },
      {
        _id: "705b4354-fb80-431f-a7b5-c80c3c9267f0",
        name: "dwdd",
        orgId: "470053",
        rules: [
          "^fv"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: ""
      },
      {
        _id: "1322f424-bf4a-4707-95ee-7d2e1f347664",
        name: "dftbntbdrgsgdv",
        orgId: "470053",
        rules: [
          "^dgvevdfvf"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "gfnbgfvfbgdvf"
      },
      {
        _id: "f2071788-09b2-4374-b6d2-34c56b87a4aa",
        name: "23qse4dtrf",
        orgId: "470053",
        rules: [
          "^xdcfgh"
        ],
        longTimer: 12,
        shortTimer: 9,
        description: ""
      },
      {
        _id: "e321217f-e54c-4a68-9725-a29a5f0a0fc5",
        name: "q113454",
        orgId: "470053",
        rules: [
          "^dv g"
        ],
        longTimer: 17,
        shortTimer: 15,
        description: ""
      },
      {
        _id: "664e6716-e8d0-41ed-8bcf-c9023f750fb3",
        name: "2edwed",
        orgId: "470053",
        rules: [
          "^ervevd"
        ],
        longTimer: 19,
        shortTimer: 14,
        description: "wedwe"
      },
      {
        _id: "19be2527-e311-4c01-8dff-bdf89af43832",
        name: "     ",
        orgId: "470053",
        rules: [
          "^1"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: "sdkf"
      },
      {
        _id: "77f08dc5-412d-490d-ad4b-08564503bf1e",
        name: "avita1209",
        orgId: "470053",
        rules: [
          "^avita1209"
        ],
        longTimer: 15,
        shortTimer: 11,
        description: "avita1209"
      },
      {
        _id: "82ba2197-9dc7-42b2-9c4a-2a00c6c8297d",
        name: "    ",
        orgId: "470053",
        rules: [
          "^12"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "a2d30777-0c45-4265-a1e7-ed2c41a54e2f",
        name: "yrertyt",
        orgId: "470053",
        rules: [
          "^367"
        ],
        longTimer: 12,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "696b8fe3-b1da-4a75-94eb-c30f912be96a",
        name: "ryfhrytfgdgrtvfd",
        orgId: "470053",
        rules: [
          "^wkjedjweasjdx"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "erfdfv"
      },
      {
        _id: "f35577e6-77fa-4f37-af96-41a8e6e20cdf",
        name: "evjhcdsbu",
        orgId: "470053",
        rules: [
          "^wubuid"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "rdftvuy"
      },
      {
        _id: "b25b7b20-4e83-4f14-a923-6f5b62ec5484",
        name: "224sbuild",
        orgId: "470053",
        rules: [
          "^224sbuild"
        ],
        longTimer: 12,
        shortTimer: 11,
        description: "224sbuild"
      },
      {
        _id: "3405a1ac-5876-4cd6-a9a9-7a1f101ff9e2",
        name: "Test Plan",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "c743590f-cc98-46ba-b0e6-655ca86f4f02",
        name: "zdhgjjhrgfv",
        orgId: "470053",
        rules: [
          "^wraenywdbg"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "bgdrgvfxg"
      },
      {
        _id: "0d6d622a-2c8c-4d7a-afac-6b73b7515b39",
        name: "dfv dded",
        orgId: "470053",
        rules: [
          "^dgtyui"
        ],
        longTimer: 13,
        shortTimer: 12,
        description: ""
      },
      {
        _id: "e4641fed-8f3a-44e6-b15a-0e592c09a3c5",
        name: "313534354",
        orgId: "470053",
        rules: [
          "^etrfrsfcwds"
        ],
        longTimer: 16,
        shortTimer: 13,
        description: "34253"
      },
      {
        _id: "f3dbf68d-763a-450d-91ea-30598db425e4",
        name: "mreg1509222",
        orgId: "470053",
        rules: [
          "^mreg1509222"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "mreg1509222"
      },
      {
        _id: "1648e837-7fcb-42f9-b1df-4232e9dc8273",
        name: "dial planing",
        orgId: "470053",
        rules: [
          "^0987"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "082e8f4e-ac0f-49f5-b157-28a9ba06d409",
        name: "uewtuywe",
        orgId: "470053",
        rules: [
          "^wqvyuszbwqix"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "QYUWYSC"
      },
      {
        _id: "264e8cf0-ecd6-44b9-815b-52dfb28fc733",
        name: "sanit2809",
        orgId: "470053",
        rules: [
          "^sadsdf"
        ],
        longTimer: 14,
        shortTimer: 11,
        description: "sanit2809"
      },
      {
        _id: "049485d0-ac81-44ad-bc4c-c2145eaad579",
        name: "steve_dialplan",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: ""
      },
      {
        _id: "58f2c5dd-59cd-4fd6-be7f-613be242c90e",
        name: "st0102 pf",
        orgId: "470053",
        rules: [
          "^dgdfdfg"
        ],
        longTimer: 4,
        shortTimer: 2,
        description: "st0102vcdbv"
      },
      {
        _id: "1e9c682e-ce77-441f-8d7a-21a5a4a87cab",
        name: "point",
        orgId: "470053",
        rules: [
          "^98"
        ],
        longTimer: 11,
        shortTimer: 10,
        description: "automation testing"
      },
      {
        _id: "6151535b-5362-48b1-a8ac-32ffef9103e9",
        name: "mut1404st",
        orgId: "470053",
        rules: [
          "^mut1404st"
        ],
        longTimer: 20,
        shortTimer: 11,
        description: "mut1404st"
      },
      {
        _id: "3be3b562-a636-4b3e-b9a0-c6d81bdcbd2b",
        name: "gfghjh n",
        orgId: "470053",
        rules: [
          "^fvknjdfkvdfj"
        ],
        longTimer: 20,
        shortTimer: 14,
        description: "dgvubhj"
      },
      {
        _id: "77edde1f-f9ea-4732-8bc3-1a1fed41e1f6",
        name: "                 ",
        orgId: "470053",
        rules: [
          "^954"
        ],
        longTimer: 10,
        shortTimer: 8,
        description: ""
      },
      {
        _id: "502cde8a-36dd-4ba1-8a7a-f300f7fea287",
        name: "           ",
        orgId: "470053",
        rules: [
          "^562"
        ],
        longTimer: 9,
        shortTimer: 2,
        description: ""
      },
      {
        _id: "66aee8f6-5b35-4a89-b053-8468c9449f54",
        name: "hfty",
        orgId: "470053",
        rules: [
          "^etgevnioernom    32234@#$%$#90()&%${}#}@{{@#{@{@{#@}{#@@"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "ggjhjh"
      },
      {
        _id: "1469f409-5d1f-4497-b6a2-51d739502277",
        name: "          ",
        orgId: "470053",
        rules: [
          "^555"
        ],
        longTimer: 5,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "0fa21f4b-80ad-4ada-8fba-5fc5f15b1e41",
        name: "q11675ty",
        orgId: "470053",
        rules: [
          "^sdfdgsfdsd"
        ],
        longTimer: 11,
        shortTimer: 8,
        description: "sdfdds"
      },
      {
        _id: "e9e83afe-c184-4e66-b9a5-260c33b3ae4e",
        name: "             kamaliB",
        orgId: "470053",
        rules: [
          "^34"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: ""
      },
      {
        _id: "f9eb0846-d04e-4ef0-aebe-8f24d01bf6f2",
        name: "fgvrsw",
        orgId: "470053",
        rules: [
          "^weafdewfdcx"
        ],
        longTimer: 17,
        shortTimer: 13,
        description: "resfcewsdf"
      },
      {
        _id: "a472e76f-b1b6-44a8-8350-df38edf9748e",
        name: "zcx wedweasd",
        orgId: "470053",
        rules: [
          "^erwfcewf3ewsa\n"
        ],
        longTimer: 19,
        shortTimer: 16,
        description: "ewsdxwesadxeas"
      },
      {
        _id: "b8b6a3ce-6c01-4725-8887-e26de80926a4",
        name: "ugyvjhvvu",
        orgId: "470053",
        rules: [
          "^EGHSFCVSDJHCVYSD"
        ],
        longTimer: 18,
        shortTimer: 15,
        description: "serdtyf"
      },
      {
        _id: "5846d18a-9541-45ba-8d9b-e2a0a9ac5ea0",
        name: "yu4gyfgywe",
        orgId: "470053",
        rules: [
          "^dfvsrvsfsxivhsdfui"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "sdgerh"
      },
      {
        _id: "56a49230-b2af-4d38-b018-811897a1ab17",
        name: "09876",
        orgId: "470053",
        rules: [
          "^4567890"
        ],
        longTimer: 4,
        shortTimer: 1,
        description: "poiuhygf"
      },
      {
        _id: "0f39bf78-a60e-4e4f-a234-9b046af07d8e",
        name: "srgsrvrsfv",
        orgId: "470053",
        rules: [
          "^wrcw"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "scsd"
      },
      {
        _id: "7007877c-f03d-45e0-ace8-3779d29bb8fb",
        name: "3454e3",
        orgId: "470053",
        rules: [
          "^eferwfdcwrdfcx"
        ],
        longTimer: 19,
        shortTimer: 15,
        description: "35343"
      },
      {
        _id: "b1829d4e-5147-4e54-85e5-53e3c34fd556",
        name: "signed",
        orgId: "470053",
        rules: [
          "^e456yxchgdfsg8ydgacbsictyxsuivcygcvxuiwgyascuih"
        ],
        longTimer: 14,
        shortTimer: 12,
        description: "sdfdds"
      },
      {
        _id: "df77b694-a84b-4acf-b513-d3d83261dc9e",
        name: "cdydfgfyuftt7ig",
        orgId: "470053",
        rules: [
          "^xrycfhj"
        ],
        longTimer: 19,
        shortTimer: 14,
        description: "45drgiyjk"
      },
      {
        _id: "0129e3ff-99ef-4f6d-9c47-90d468f85602",
        name: "dsfg",
        orgId: "470053",
        rules: [
          "^[\\d]"
        ],
        longTimer: 15,
        shortTimer: 14,
        description: ""
      },
      {
        _id: "eafeac2b-4d6c-4efd-9be2-557cf2d3e0f6",
        name: "tdrygu",
        orgId: "470053",
        rules: [
          "^dbgnbfvsv"
        ],
        longTimer: 20,
        shortTimer: 15,
        description: "sdtrygu"
      },
      {
        _id: "e75b0601-12d8-4c42-b8f3-b2cbc8d4dbd8",
        name: "gowtham4657890",
        orgId: "470053",
        rules: [
          "^rbgetvfgdf vf"
        ],
        longTimer: 20,
        shortTimer: 12,
        description: "sdfdds"
      },
      {
        _id: "90c90718-3109-48fa-a5c6-b8a9e6d70e2d",
        name: "sryhetrbtr",
        orgId: "470053",
        rules: [
          "^efcevsdvcsdz"
        ],
        longTimer: 18,
        shortTimer: 13,
        description: "bstrbttgbtrb"
      },
      {
        _id: "ff3b379f-487f-4d97-a937-e2b9d6bec7ef",
        name: "TCFUCYI",
        orgId: "470053",
        rules: [
          "^UWVUYBUYBDHUB"
        ],
        longTimer: 19,
        shortTimer: 11,
        description: "CYIYCYYGCI"
      },
      {
        _id: "656650e3-7768-4958-b87d-2c38d6def180",
        name: "cgftyttrd",
        orgId: "470053",
        rules: [
          "^gxfhgchcghg"
        ],
        longTimer: 20,
        shortTimer: 16,
        description: "d65f7gy8huio"
      },
      {
        _id: "1c2100dc-50a5-4c0f-8dc1-7aaf033ff9f3",
        name: "wedwesad",
        orgId: "470053",
        rules: [
          "^vrdzxcsz"
        ],
        longTimer: 19,
        shortTimer: 12,
        description: "weadxew"
      },
      {
        _id: "system-default",
        name: "system-default",
        description: "System Default Dial Plan",
        shortTimer: 4,
        longTimer: 16,
        rules: [
          "^911n",
          "^411",
          "^[2-9][0-9]{6}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ]
      }
    ],
    seriviceList: [
      {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "hdata01_b1",
        _id: "535fccfe-0685-4e93-b4b9-8a77e18296ec",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "GigaCenter",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 7,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 0,
            X_CALIX_SXACC_BW_PROFILE: "7f8f23c8-8f54-44db-b084-340dff692713",
            defaultConnectionService: true
          }
        },
        VLAN: 7,
        Mode: "RG Routed",
        defaultConnectionService: true,
        IPTVSSID: false
      }
    ],
    serviceBWList: [
      {
        _id: "",
        name: ""
      },
      {
        _id: "97268d40-ebb9-41d4-aeef-87b5ecc9c55a",
        name: "BW_0",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "0k",
              DownstreamCIR: "0k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2a846e06-fa47-4b5b-b20d-f14b5f75c716",
        name: "BW_1G_1G",
        orgId: "470053",
        description: "g",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "222649a4-9639-46ac-a92b-c2bfe6ca2362",
        name: "bw 100",
        orgId: "470053",
        description: "Test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1f271670-c29c-4f38-a89a-1a5b2802639b",
        name: "bandwidth",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "128m",
              DownstreamCIR: "512m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f96ff7b3-78da-401c-b8ed-a99ceb0d4eec",
        name: "bw_lai",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "7f8f23c8-8f54-44db-b084-340dff692713",
        name: "hbw1_11M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a10c519a-88e9-45a5-98e0-dbacc9de3ad9",
        name: "hbw2_15m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "16m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "78e3bc87-22c6-404d-8275-be4b56bec3e7",
        name: "bw-test",
        orgId: "470053",
        description: "bw-test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1k",
              DownstreamCIR: "1k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f872f169-5706-467a-b94a-8bf2a7e8d4df",
        name: "BW_200_50",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1b1243d8-ebf4-4171-8837-6575078dbe4c",
        name: "mapspeestest_bw",
        orgId: "470053",
        description: "mapspeestest_bw",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40m",
              DownstreamCIR: "120m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f3215a8c-5445-47f9-9532-6711d7da69a7",
        name: "bw-down-20M-up-10M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3fea825b-fdb1-47e3-904c-bd6776df2e9c",
        name: "bw-down-120M-up-40M",
        orgId: "470053",
        description: "jkong",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40m",
              DownstreamCIR: "120m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "23c94925-1e8e-4c6c-9ce6-9e322e5a6655",
        name: "BW10M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bf16acea-a257-426c-99e4-721c60da3dfb",
        name: "bw-15-10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9e7054df-9448-446b-9145-5a737f0aecc0",
        name: "bw-5-5",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2c17994b-5e74-4d74-b4c2-85a594cfd6ff",
        name: "bw_20_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "48894e29-4eba-4f5e-8d9f-d8ec534526b5",
        name: "bw_100M_20M",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a5cb52a0-54c3-4ab5-bcf8-f6b1029a86ff",
        name: "bw_25m_3m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e79e2695-276b-4c28-9fc1-027f9fdd8e4e",
        name: "bw_10m_1m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "618d4586-9fd9-4203-a7d6-9af8f80ef4d4",
        name: "BW_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0f4eef33-080f-4cfb-945e-d2d11468f126",
        name: "bw_1G_500",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2d0280dd-191f-42d3-b34e-a81178ff988c",
        name: "bw_100m_25m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "18d152d4-5055-4f88-9f64-5b17edef7458",
        name: "bw_25m_5m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "710748ad-96e1-4ae8-b893-5b42b5d0b0df",
        name: "bw-1G",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3f7531f4-0a88-4186-91eb-d7f03558834f",
        name: "BW_100_50",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "23f81f75-49f9-4740-81ee-00c2b8244b6e",
        name: "20_200",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d61e9c82-b87f-499d-95bf-9777b772e36a",
        name: "bw_110/60",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "60m",
              DownstreamCIR: "110m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "778e7fd7-a40b-4edd-832e-0ea416a08d3a",
        name: "BW_64_64",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "64k",
              DownstreamCIR: "64k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bce82c98-e4d5-481d-ad55-a7544a6952e3",
        name: "hazel-ae-bw-80M",
        orgId: "470053",
        description: "hhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "80m",
              DownstreamCIR: "80m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "217c99aa-4d9e-490b-9fe8-0e4132ccd5f0",
        name: "XLAE-4G-4G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b00429bb-d867-4470-b918-50eeed4a9d07",
        name: "XLAE-1G-1G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d1c53d95-a6ee-425b-ad27-121f481b67c4",
        name: "Testttt",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "30bb2139-4905-4b6f-9ba0-c392b5186d00",
        name: "Test123",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "721007f3-5b40-4b52-8337-f454a2ed0c90",
        name: "hailan_d20_u20",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0fe235ea-63e7-42a8-b8e7-eddae06a06f5",
        name: "hazel-bw-50m",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "40264551-bf37-4f7a-90ee-f5260c2b9522",
        name: "dg_1013_band_01",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2m",
              DownstreamCIR: "1k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5c76b883-43f3-43f6-a65a-4769460d77fb",
        name: "Jasson_BW_Test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9c946bc0-7b50-4afc-909f-f3e275ebce3a",
        name: "BWW3213",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "3999m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4711fbfb-ca0c-4f16-b12d-84723115cc99",
        name: "ff",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2001m",
              DownstreamCIR: "2001m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "6fc9a080-5eb3-4835-b919-c16e6ad30f74",
        name: "XLAE-3M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "81332032-ff57-4a92-9f47-4bc8bb35a415",
        name: "XLAE-5M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1bbd8c40-72f4-450a-9660-bdce7ac0c358",
        name: "XLAE-15M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "15m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d792bda8-3301-428d-b28b-31ab144ab575",
        name: "XLAE-150M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "150m",
              DownstreamCIR: "150m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "29ee03a8-1bab-4f5f-9a03-72ab6404a3fd",
        name: "XLAE-250M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "57021efc-12c4-4a16-a297-91fa22c39eb1",
        name: "XLAE-20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f3c2dee6-4f97-4d70-b4b4-aeafcf75c312",
        name: "XLAE-500M-2",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f6221fdd-1f6f-4e67-86af-9864c8353e24",
        name: "1yolv_bw",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "213k",
              DownstreamCIR: "213k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "49530233-89d9-4fd4-95b4-c1776f93add4",
        name: "Jason_AE_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4000m",
              DownstreamCIR: "4000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2964b6c7-0df0-431a-8c32-d49d9a948df3",
        name: "Jason_AE_bandwidth_1",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "026d2fec-e9c7-4c85-943c-fdc1e4d8f76c",
        name: "gold",
        orgId: "470053",
        description: "hgjdsjwqhj",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200k",
              DownstreamCIR: "144k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "0e297a41-df70-427f-90ab-0928232b73a3",
        name: "tets",
        orgId: "470053",
        description: "jdsgkhjskdASDLKLJDFHK",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50k",
              DownstreamCIR: "50k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4033f656-1809-42b2-84a4-426b950b2987",
        name: "ions",
        orgId: "470053",
        description: "polymorphismion",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "40k",
              DownstreamCIR: "50k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "116959fb-a273-404b-bd14-cfcaf0c9aa90",
        name: "hazel-bw-50M-replace",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d1a1b25f-7fa0-464e-976d-bc716ba88ac9",
        name: "aliu-1-3_25",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "3m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b17503db-5c74-4bad-8546-2d81204dffcc",
        name: "aliu-2-5_25",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "25m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fcd94441-7d69-44e2-9dd0-e582381a5d9f",
        name: "aliu-9-512_1500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "512k",
              DownstreamCIR: "1500k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1a69185d-10c8-4dc3-b51e-1b92e49b711c",
        name: "aliu-4-20_100",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "63ff54d9-953c-4437-b413-6844c82d6f1a",
        name: "aliu-5-150_150",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "150m",
              DownstreamCIR: "150m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "12cc0997-015b-49e0-94f6-374b56f59525",
        name: "aliu-6-250_250",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "95d42c8c-57e9-4218-952c-667a3bda0f9b",
        name: "aliu-8-1000_1000",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "430156d1-4696-448e-86ff-dcc9e50773b8",
        name: "BW_4227W_AE",
        orgId: "470053",
        description: "data_service_bw_4227W_AE_loliu",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1328eb18-8d74-4e66-a19d-4a6fd37a8980",
        name: "aliu-3-15_15",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "15m",
              DownstreamCIR: "15m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f9465921-3152-4fa5-a5f3-2a7dd4edd781",
        name: "aliu-7-500_500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2c16cafc-4846-4390-8a3f-16769a473815",
        name: "aliu-10-1_10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "13693c90-ae61-47a4-b6a9-b4064d2e6901",
        name: "aliu-11-25_100",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5f14662c-8f77-460a-881b-fd1f884b2a2c",
        name: "BW_750m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "95fff9e8-0ebb-4ccd-bb85-3c62e9d770e8",
        name: "ying-bw-10m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "4dd4c6e0-5c0d-48a7-9c62-87b2fb5732f3",
        name: "BW_500m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "49fe40ac-10e6-4566-8acd-880efb5ff88c",
        name: "BW_250m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "79a24619-f333-4297-ad64-2c8a6eccb833",
        name: "BW_100m_4227W_AE",
        orgId: "470053",
        description: "longston",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "913d667d-b5dd-4a48-bfb9-59d623b20745",
        name: "ying-bw-5-10",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f77c8a37-6afc-4751-80c8-fc9803bd6770",
        name: "bw-100k",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100k",
              DownstreamCIR: "100k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ae9ab92c-79bd-4e6a-b4ce-be862b02259d",
        name: "FANG_BW_1m_1m",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b051f435-8906-4eb3-92e8-01aceaaaeb62",
        name: "Ling_BW_750_750",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d4bc5516-61c5-4478-964e-f5779ba34050",
        name: "mc_bw-1000M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b6a250fe-22b8-4ca4-bf95-568f008f70fd",
        name: "mc-bw-300M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "300m",
              DownstreamCIR: "300m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "20602c94-7427-4e04-8a93-0194df163021",
        name: "Ling_BW_500_500",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "3847d55b-ef93-4f35-abde-ae6dcc4b9872",
        name: "Ling_BW_250",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e6afedc5-c90b-456f-9971-5a8c2831b029",
        name: "JULY",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "861bdc14-29d1-4eba-8ea3-eedae6780c6d",
        name: "Ling_BW_1",
        orgId: "470053",
        description: "BW profile",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "965a56d3-087c-49ed-935b-784e1aa3c2bf",
        name: "hazel-ae-BW",
        orgId: "470053",
        description: "hhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "754a9805-ce30-4572-afe4-d42cb986214d",
        name: "bian_b2_up2048kdown100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "2048k",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ae0e8db7-515c-4be6-9fc8-7c56646915de",
        name: "bian_bw_up10mdown10m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f48ff096-12f9-41ba-aef1-cc0c2a2d229b",
        name: "bian_bw-up1000mdown1000m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ef24b38f-ca2d-4cd7-abcf-9c1d5d29c28c",
        name: "ywu_bw_1g",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1418d680-7ab3-498e-9077-3b5115136e19",
        name: "hazel-ae-bw-overrides",
        orgId: "470053",
        description: "hhhhhhhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "09858a87-f851-4af9-bb09-1de8ef62d7f4",
        name: "ywu_bw_100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9111f6be-1585-47ce-8272-faad818286db",
        name: "ae-yuan-bw-100M/100M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ccf1f139-d874-4aab-ada4-ea59bb5dcc2a",
        name: "ae-yuan-bw-20M/20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5af94ea7-7d94-4968-b725-5bfc782d723f",
        name: "hazel-ae-BW-50M",
        orgId: "470053",
        description: "hhhhh",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9f14fbdb-621e-4f54-a2ba-fb74cd3efd27",
        name: "XLAE-25M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b2546993-abb9-4bc3-9421-38896fc21734",
        name: "XLAE-500M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "453fb8da-ab6a-414b-9be3-da1eca387ede",
        name: "XLAE-512K",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "512k",
              DownstreamCIR: "1500k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "c678a7c3-c824-47cd-b932-4f3887ef1e81",
        name: "XLAE-1M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "bccad887-96f2-4e62-b22c-af5cfa3a1d0c",
        name: "Yang-AE-BW-10M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "8cde4be5-93ab-4ba3-b4df-dad9f89615be",
        name: "Yang-AE-BW-4m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "4m",
              DownstreamCIR: "4m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "beee3730-0a2d-4d8d-8d6b-991813a0d0c1",
        name: "lisa_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1181fd0e-d58e-4fc5-8f91-22d3e8cab8db",
        name: "demi-bw-us100m-ds200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fd4574e5-4eb4-4e9a-aa9f-78bbc9064a24",
        name: "bw_987m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "987m",
              DownstreamCIR: "987m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "121bdfaa-2faa-4f9c-8f22-c05e27a7beca",
        name: "hailan-bw100",
        orgId: "470053",
        description: "us100-ds100",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "54162544-e36c-4486-acd5-7b4d122ec4f6",
        name: "ae-yuan-844GE-bw-1G/1G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "9ead61bb-ee2f-4ecc-8096-b7952103a394",
        name: "bian_bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "10m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "5448f414-42d3-481e-a3cf-6392380c7698",
        name: "kli-4227-bw",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ded2b164-682f-4126-b561-8952bdf38cab",
        name: "bian_rate_5M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "85978ca5-0a25-442f-a249-9fded9a4368d",
        name: "margo_bw_100/25",
        orgId: "470053",
        description: "margo",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "25m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "c379c195-7a98-42db-8895-4919a72e297a",
        name: "mc_bw_100M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "e787abef-3fa0-4c64-bb26-200044ab2737",
        name: "mc_bw_500M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "cb702646-7b4e-4964-8b64-5fd0c6a78eae",
        name: "mc_bw_250M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "250m",
              DownstreamCIR: "250m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d4902b1d-ffd2-48a6-bbad-9f9f9696e5be",
        name: "mc_bw_750M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "750m",
              DownstreamCIR: "750m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "b5ba0f58-7b3b-4146-91d1-3a1507bf30a6",
        name: "bw_5m_5m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5m",
              DownstreamCIR: "5m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "db502cf4-291f-499b-848c-18c5bde9488b",
        name: "BW_yolv_20M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "20m",
              DownstreamCIR: "20m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f4bd020a-e5e1-48ce-930e-367f4dd7af5c",
        name: "BW_yolv_50M",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "50m",
              DownstreamCIR: "50m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "62a3f15b-ee98-44a3-9faa-9906e56202dc",
        name: "Bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "cfc07946-26c5-45f9-84fa-c8adc4f14ade",
        name: "Bandwidth1",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1m",
              DownstreamCIR: "1m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "99f54bf8-2929-4f54-8281-fec4a20ad5b2",
        name: "100m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2291312d-d5ce-4cc6-b6f2-2652c16b94ad",
        name: "300m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "300m",
              DownstreamCIR: "300m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f7b321df-70af-4342-82d4-d38827505056",
        name: "200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2858e796-a4c9-470d-8b23-ef1732cfcc50",
        name: "bw-200/200m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "200m",
              DownstreamCIR: "200m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d43d9bda-b7b7-460c-9db8-1085b609ae79",
        name: "bw-10m/30m",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10m",
              DownstreamCIR: "30m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "8541893b-7e45-4ed2-9173-0109357ab8e3",
        name: "julia bandwidth",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "dfff863a-60b2-4baf-8f69-1b75f1847c37",
        name: "margo_10GAE_bw_10G_10G",
        orgId: "470053",
        description: "margo_10GAE_bw_10G_10G",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "ad5d2160-305f-4944-bcf9-7b3bc9c5b951",
        name: "BWE",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "30k",
              DownstreamCIR: "20k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "abd6899c-64e2-4215-b5e4-6a19485b04db",
        name: "hari",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "30k",
              DownstreamCIR: "20k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "fcfb398f-1972-416f-a913-caef1e5e7558",
        name: "xiyang----",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1314fbef-426c-49c6-8ccc-4f740322c1b2",
        name: "xiyang-sharp-test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "51093297-c6a2-470a-b3f6-f0e687ac2e93",
        name: "xiyang-bandwith",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "d9b659fc-c609-4e4c-886c-bc522a21a0c0",
        name: "zhangqiang_qos_test",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "500m",
              DownstreamCIR: "500m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "f303b842-be43-4286-ad1d-69d64536f957",
        name: "Ling_BW_10G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "10000m",
              DownstreamCIR: "10000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "a5aa283c-02ea-4252-abcd-4714a7ae87f2",
        name: "margo_bw_5G",
        orgId: "470053",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "5000m",
              DownstreamCIR: "5000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      }
    ]
  },
  device: {
    regId: "kid",
    selectedModel: "GS4227W",
    deviceMode: "Managed ONT",
    isDisableModel: false,
    isStaticGroup: "No",
    selectedStaticGroup: [],
    subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22"
  },
  isUnifiedPrimarySSID: false,
  toggeledUnifiedPrimarySSID: false,
  services: {
    configuredService: "No",
    dataService: {
      isDataService: true,
      vLAN: "",
      priority: "",
      bandwidth: "",
      PPPoEPwd: "",
      PPPoEUsername: ""
    },
    videoService: {
      isVideoService: false,
      vLAN: "",
      priority: "",
      bandwidth: ""
    },
    voiceService: {
      serviceType: {
        name: "Fiona_voip",
        _id: "126f99de-474d-4c32-b5b3-f603dcd8e08e",
        orgId: "470053",
        configurations: {
          category: "Voice Service",
          parameterValues: {
            Type: "SIP",
            Model: "GigaCenter",
            RTPPort: 49152,
            TimerT1: 500,
            TimerT2: 4000,
            DNSPrimary: "",
            DTMFMethod: "InBand",
            SwitchType: "None",
            CountryCode: "US",
            ProxyServer: "10.245.252.2",
            RTPCodec1st: "G.711MuLaw",
            DNSSecondary: "",
            RTPDscpValue: 46,
            ReleaseTimer: 10,
            PacketRate1st: "10",
            PacketRate2nd: "10",
            PacketRate3rd: "10",
            VlanTagAction: true,
            LocalHookFlash: true,
            HookFlashMethod: "None",
            ProxyServerPort: 5060,
            UserAgentDomain: "",
            ControlDscpValue: 46,
            RTPDscpInputType: true,
            RegistrationPeriod: 3600,
            ServiceFramingType: "IPoE",
            X_000631_IGMPProxy: false,
            X_000631_VlanMuxID: 810,
            ProxyServerSecondary: "",
            CallWaitingTonePrefix: "CallWaitingTone",
            DistinctiveRingPrefix: "Bellcore-dr",
            ServiceConnectionType: "DHCP",
            SilenceSuppression1st: false,
            SilenceSuppression2nd: false,
            SilenceSuppression3rd: false,
            X_000631_VlanMux8021p: 6,
            ProxyServerPortSecondary: 5060
          }
        },
        VLAN: 810,
        defaultConnectionService: false,
        IPTVSSID: false
      },
      VoiceProfile: [
        {
          Enable: true,
          ProfileId: "0f2b0e1f-9704-408b-aad5-f85124a25ec2",
          Name: "hazel-ae-HB-706",
          category: "Data Service",
          Mode: "RG Routed"
        },
        {
          Enable: true,
          ProfileId: "126f99de-474d-4c32-b5b3-f603dcd8e08e",
          Name: "Fiona_voip",
          category: "Voice Service"
        }
      ],
      faxRelay: false,
      dialPlan: "system-default",
      addressType: "DHCP",
      showVocieService: true,
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      ipHostName: ""
    },
    ontDataService: [
      {
        PPPoEPwd: "",
        PPPoEUsername: "",
        isServiceEnabled: true,
        isBWOverRide: false,
        isVLANOverRide: false,
        vLAN: '76',
        serviceProfile: {
          name: "hazel-ae-HB-706",
          _id: "0f2b0e1f-9704-408b-aad5-f85124a25ec2",
          orgId: "470053",
          configurations: {
            category: "Data Service",
            parameterValues: {
              Mode: "RG Routed",
              version: "v4",
              NATEnabled: true,
              FramingType: "IPoE",
              VlanTagAction: true,
              productFamily: "EXOS",
              AddressingType: "DHCP",
              ConnectionType: "IP_Routed",
              X_000631_IGMPProxy: false,
              X_000631_VlanMuxID: '76',
              X_000631_IPv4Enabled: true,
              X_000631_IPv6Enabled: false,
              ServiceConnectionType: "DHCP",
              X_000631_VlanMux8021p: 0,
              defaultConnectionService: false
            }
          },
          VLAN: 76,
          Mode: "RG Routed",
          defaultConnectionService: false,
          IPTVSSID: false
        },
        showPPPOE: false,
        inValidVLan: true
      }
    ],
    ontVideoService: [],
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption",
        name: "",
        securityType: "",
        passphrase: ""
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption",
        name: "",
        securityType: "",
        passphrase: ""
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption"
      },
      UNIFIED_PRIMARY_SSID: {
        serviceEnabled: 'true',
        encryption: "AESEncryption"
      }
    },
    showVideoServiceByDefault: true,
    showDataServiceByDefault: true,
    isCMS: false
  },
  settings: {}
}

export const addDeviceObj_with_all_data_ref = {
  isNewRecord: !false,
  addDeviceTab: [
    "Device",
    "Services"
  ],
  showModeErrorMsg: false,
  showDeviceIDErrorMsg: false,
  showModelErrorMsg: false,
  configurationObj: {
    defaultLanValidation: false,
    serviceDialPlan: [
      {
        _id: "20c3d122-ab5a-41bd-90dc-fe338177b7b7",
        name: "lisa_test01",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: "5678"
      },
      {
        _id: "62cf2bce-f17a-4da4-8566-a74f42fcc11e",
        name: "lisa_test02",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "rsdfcwrfc"
      },
      {
        _id: "a07c9291-48f3-4c7a-ae88-fe9e3c15730c",
        name: "Lai_meta",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "sdfdds"
      },
      {
        _id: "c4e3dcd1-014e-4bae-a4c5-3b5c405411fc",
        name: "bian",
        orgId: "470053",
        rules: [
          "^[2-9][0-9]{9}"
        ],
        longTimer: 19,
        shortTimer: 11,
        description: ""
      }
    ],
    seriviceList: [
      {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "hdata01_b1",
        _id: "535fccfe-0685-4e93-b4b9-8a77e18296ec",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "GigaCenter",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 7,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 0,
            X_CALIX_SXACC_BW_PROFILE: "7f8f23c8-8f54-44db-b084-340dff692713",
            defaultConnectionService: true
          }
        },
        VLAN: 7,
        Mode: "RG Routed",
        defaultConnectionService: true,
        IPTVSSID: false
      },
      {
        name: "exos16_data_service_48626",
        _id: "f2be97e1-8e51-4109-91e2-a2b190d23c18",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 901,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 1,
            defaultConnectionService: false
          }
        },
        VLAN: 901,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "laistillfather",
        _id: "0fcd102b-5466-40ce-b1cf-f39b2d575130",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "ONT Half Bridge",
            VLANID: 3000,
            Hairpin: false,
            productFamily: "GigaCenter",
            AdvancedSettings: false,
            ServiceConnectionType: "AE_L2_Bridged",
            X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS: [
              "4"
            ]
          }
        },
        VLAN: 3000,
        Mode: "ONT Half Bridge",
        BridgeMemberPort: [
          "4"
        ],
        defaultConnectionService: false,
        IPTVSSID: false
      }
    ],
    serviceBWList: [
      {
        _id: "",
        name: ""
      },
      {
        _id: "97268d40-ebb9-41d4-aeef-87b5ecc9c55a",
        name: "BW_0",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "0k",
              DownstreamCIR: "0k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2a846e06-fa47-4b5b-b20d-f14b5f75c716",
        name: "BW_1G_1G",
        orgId: "470053",
        description: "g",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "222649a4-9639-46ac-a92b-c2bfe6ca2362",
        name: "bw 100",
        orgId: "470053",
        description: "Test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1f271670-c29c-4f38-a89a-1a5b2802639b",
        name: "bandwidth",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "128m",
              DownstreamCIR: "512m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      }
    ]
  },
  device: {
    regId: "edit123",
    selectedModel: "GS4227E-2",
    deviceMode: "RG",
    isDisableModel: false,
    isStaticGroup: "No",
    selectedStaticGroup: [
      "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
      "06634ae1-c7cd-433a-8b5e-0546b422940e"
    ],
    subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22"
  },
  isUnifiedPrimarySSID: false,
  toggeledUnifiedPrimarySSID: false,
  services: {
    configuredService: "No",
    dataService: {
      PPPoEUsername: "asfds",
      PPPoEPwd: "asdfs",
      vLAN: "123",
      priority: '3',
      bandwidth: "7f8f23c8-8f54-44db-b084-340dff692713",
      isDataService: true,
      inValidVLan: false
    },
    videoService: {
      isVideoService: true,
      vLAN: "2121",
      priority: '4',
      bandwidth: "7f8f23c8-8f54-44db-b084-340dff692713",
      inValidVLan: false
    },
    voiceService: {
      serviceType: "X_000631_TDMGW",
      faxRelay: false,
      dialPlan: "system-default",
      addressType: "DHCP",
      ipAddress: "",
      subnetMask: "",
      defaultGateway: "",
      dnsServers: "",
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: true,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3,
        inValidURI: false,
        inValidUserName: false,
        inValidPWD: false,
        inValidDireConnectNum: false
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: true,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3,
        inValidURI: false,
        inValidUserName: false,
        inValidPWD: false,
        inValidDireConnectNum: false
      },
      VoiceProfile: {
        name: "XLAE-800",
        _id: "b1a54e98-5ed4-44ed-b070-b92b45b425e3",
        orgId: "470053",
        configurations: {
          category: "Voice Service",
          parameterValues: {
            Type: "SIP",
            Model: "GigaCenter",
            ipType: "IPv4",
            RTPPort: 49152,
            TimerT1: 500,
            TimerT2: 4000,
            Revertive: false,
            DTMFMethod: "InBand",
            SwitchType: "None",
            CountryCode: "US",
            ProxyServer: "10.245.252.2",
            RTPCodec1st: "G.711MuLaw",
            RTPDscpValue: 46,
            ReleaseTimer: 10,
            PacketRate1st: "10",
            PacketRate2nd: "10",
            PacketRate3rd: "10",
            VlanTagAction: true,
            LocalHookFlash: true,
            HookFlashMethod: "None",
            ProxyServerPort: 5060,
            ControlDscpValue: 46,
            RTPDscpInputType: true,
            OptionsTimerSwitch: false,
            RegistrationPeriod: 3600,
            ServiceFramingType: "IPoE",
            X_000631_VlanMuxID: 800,
            CallWaitingTonePrefix: "CallWaitingTone",
            DistinctiveRingPrefix: "Bellcore-dr",
            ServiceConnectionType: "DHCP",
            SilenceSuppression1st: false,
            SilenceSuppression2nd: false,
            SilenceSuppression3rd: false,
            X_000631_VlanMux8021p: 6,
            ProxyServerPortSecondary: 5060
          }
        },
        VLAN: 800,
        defaultConnectionService: false,
        IPTVSSID: false
      }
    },
    ontDataService: [{
      serviceProfile: {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '201',
      showPPPOE: true,
      isBWOverRide: false,
      isVLANOverRide: false
    }],
    ontVideoService: [{
      serviceProfile: {
        name: "Fiona_Video_321_L3",
        _id: "ff2efbd3-1f5b-4a4a-86b2-d56b20bd6760",
        orgId: "470053",
        configurations: {
          category: "Video Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_IGMPProxy: true,
            X_000631_VlanMuxID: 321,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 4
          }
        },
        VLAN: 321,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '321',
      bridgeMBRPort: [
        "1",
        "2",
        "3",
        "4"
      ],
      isVLANOverRide: false
    }],
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12345677"
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12342132112"
      },
      UNIFIED_PRIMARY_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "11iandWPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      }
    },
    showVideoServiceByDefault: true,
    showDataServiceByDefault: true,
    isCMS: false
  },
  settings: {
    isPowerSaving: true,
    lanPortOne: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortTwo: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortThree: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortFour: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    }
  },
  provisioningRecord: {
    "wifi": {
        "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID": {
            "KeyPassphrase": "12345677"
        },
        "X_CALIX_SXACC_PRIMARY_5GHZ_SSID": {
            "KeyPassphrase": "21311321313"
        },
        "X_CALIX_SXACC_PRIMARY_6GHZ_SSID": {
            "KeyPassphrase": "12342132112"
        }
    },
    "orgId": "470053",
    "opMode": "RG",
    "deviceId": "edit123",
    "modelName": "GS4227E-2",
    "subscriberId": "92b54dc4-1191-49b8-b14a-0a4db0327a22",
    "_id": "be9fa35e-12d8-4eff-844c-3052beb20c61",
    "data": {
        "Pbit": 3,
        "pppoe": {
            "Password": "asdfs",
            "Username": "asfds"
        },
        "Enable": true,
        "VlanId": 123,
        "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
    },
    "video": {
        "Pbit": 4,
        "Enable": true,
        "VlanId": 2121,
        "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
    },
    "voice": {
        "Line": {
            "1": {
                "Enable": "Disabled"
            },
            "2": {
                "Enable": "Disabled"
            }
        },
        "DialPlan": "system-default",
        "ServiceType": "SIP",
        "X_CALIX_SXACC_RG_WAN": {
            "ServiceConnectionType": "DHCP"
        },
        "FaxT38": {
            "Enable": false
        }
    },
    "newStaticGroup": [
        {
            "type": null,
            "groupId": "06634ae1-c7cd-433a-8b5e-0546b422940e",
            "memberInfo": "edit123"
        },
        {
            "type": null,
            "groupId": "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
            "memberInfo": "edit123"
        }
    ],
    "oldStaticGroup": [
        {
            "_id": "bf50695c-94d8-4408-9fee-cba5886291f9",
            "groupId": "06634ae1-c7cd-433a-8b5e-0546b422940e",
            "memberInfo": "edit123"
        },
        {
            "_id": "8ba6e71a-d1e8-4fe3-b514-5a9908733074",
            "groupId": "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
            "memberInfo": "edit123"
        }
    ]
}
}

export const editDeviceObj_for_service = {
  _id: "12226f7c-f88c-42c6-8d46-10d7c1be0085",
  wifi: {
    1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    9: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    17: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_2DOT4GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_5GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_6GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    UNIFIED_PRIMARY_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    }
  },
  orgId: "470053",
  voice: {
    Line: {
      1: {
        Enable: "Disabled"
      },
      2: {
        Enable: "Disabled"
      }
    },
    FaxT38: {
      Enable: false
    },
    DialPlan: "system-default",
    ServiceType: "SIP",
    X_CALIX_SXACC_RG_WAN: {
      ServiceConnectionType: "DHCP"
    }
  },
  opMode: "Managed ONT",
  deviceId: "kid",
  services: [
    {
      Enable: true,
      ProfileId: "0f2b0e1f-9704-408b-aad5-f85124a25ec2",
      Name: "hazel-ae-HB-706",
      category: "Data Service",
      Mode: "RG Routed"
    },
    {
      Enable: true,
      ProfileId: "126f99de-474d-4c32-b5b3-f603dcd8e08e",
      Name: "Fiona_voip",
      category: "Voice Service"
    }
  ],
  modelName: "GS4227W",
  subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22",
  enableRgOnBattery: false,
  staticGroupMember: []
}

export const deviceData_for_wifi = {
  regId: "kid",
  selectedModel: "GS4227W",
  deviceMode: "Managed ONT",
  isDisableModel: false,
  isStaticGroup: "No",
  selectedStaticGroup: [],
  subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22"
}

export const featureProperties = {
  "modelName": "GS4227E-2",
  "dataModelName": null,
  "opMode": null,
  "opRole": null,
  "softwareVersion": null,
  "properties": [
      {
          "featureName": "RadioAirtime2.4G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "ChannelUtilization",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "ChannelInterferenceTime",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "WANInfo",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Name",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "Uptime",
                  "type": "Integer",
                  "writable": false,
                  "note": "Unit is second."
              },
              {
                  "name": "IPv6ConnectionStatus",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "MACAddress",
                  "type": "IPAddress",
                  "writable": false
              },
              {
                  "name": "DownstreamRate",
                  "type": "Integer",
                  "writable": false,
                  "note": "0 means Not Limited. Unit is Kbps."
              },
              {
                  "name": "UpstreamRate",
                  "type": "Integer",
                  "writable": false,
                  "note": "Unit is Kbps."
              },
              {
                  "name": "VlanID",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "VlanPriority",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "IPv6AddressingType",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "ConnectionType",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "DefaultIPv6Gateway",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "IPv6DNSServer",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "ExternalIPv6Address",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "IANA",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "GRP",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "BytesReceived",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "BytesSent",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsReceived",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsSent",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "AutoChannel6G",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true
          }
      },
      {
          "featureName": "RadioAirtime5G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "ChannelUtilization",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "ChannelInterferenceTime",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "WpsStateBackhaul",
          "resultType": "Object",
          "fields": [
              {
                  "name": "State",
                  "type": "String",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "SSID14",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID15",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID12",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID13",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID10",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID11",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SignalingProtocol",
          "resultType": "Object",
          "fields": [
              {
                  "name": "SignalingProtocol",
                  "type": "String",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "SplitWan",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "WanAccessTypeOptions",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true,
              "valueList": [
                  "GPON",
                  "XGSPON",
                  "CopperEthernet"
              ]
          }
      },
      {
          "featureName": "HistoricalRadioAirtime",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "RouterTemperature",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "DeviceLog",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "SiteScan",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "WpsState2.4G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "State",
                  "type": "String",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "OpModeOptions",
          "resultType": "RawConfiguration",
          "configuration": {
              "RG": {
                  "writable": false
              },
              "WAP": {
                  "writable": false
              }
          }
      },
      {
          "featureName": "SSID3",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID4",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID5",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID6",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID7",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "WpsStateIptv",
          "resultType": "Object",
          "fields": [
              {
                  "name": "State",
                  "type": "String",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "SSID8",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID9",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "L2FilterBridgeReference",
          "resultType": "IndexArray",
          "dimensions": 1,
          "fields": [
              {
                  "name": "FilterEnable",
                  "type": "Boolean"
              },
              {
                  "name": "FilterBridgeReference",
                  "type": "Integer"
              }
          ]
      },
      {
          "featureName": "AutoChannel2.4G",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true
          }
      },
      {
          "featureName": "SSID23",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID24",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID21",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID22",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "DHCPv6",
          "resultType": "Object",
          "fields": [
              {
                  "name": "RAService",
                  "type": "String",
                  "valueList": [
                      "server",
                      "disabled"
                  ],
                  "writable": true
              },
              {
                  "name": "DHCPv6Service",
                  "type": "String",
                  "valueList": [
                      "server",
                      "disabled"
                  ],
                  "writable": true
              },
              {
                  "name": "DHCPv6Mode",
                  "type": "String",
                  "valueList": [
                      "A-flag",
                      "M-and-A",
                      "M-flag"
                  ],
                  "writable": true
              },
              {
                  "name": "IPv6DNSServers",
                  "type": "String",
                  "writable": true,
                  "note": "Primary DNS server and secondary DNS server are separated by ','."
              }
          ]
      },
      {
          "featureName": "SSID1",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID2",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID20",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID18",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID19",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SSID16",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "BasicEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "BasicAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "WPAAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "DataModel",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "SSID17",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "SSID",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SSIDAdvertisementEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "WPA3"
                  ],
                  "writable": true
              },
              {
                  "name": "IEEE11iEncryptionModes",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "IEEE11iAuthenticationMode",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "KeyPassphrase",
                  "type": "String",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "Ping",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "WpsState5G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "State",
                  "type": "String",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "SecurityOptions",
          "resultType": "RawConfiguration",
          "configuration": {
              "SecurityOff": {
                  "BeaconType": "Basic",
                  "BasicEncryptionModes": "None",
                  "BasicAuthenticationMode": "None"
              },
              "WPA2-PSK": {
                  "BeaconType": "11i",
                  "IEEE11iEncryptionModes": [
                      "AESEncryption"
                  ],
                  "IEEE11iAuthenticationMode": "PSKAuthentication"
              },
              "WPA/WPA2-PSK": {
                  "BeaconType": "WPAand11i",
                  "WPAEncryptionModes": [
                      "AESEncryption"
                  ],
                  "WPAAuthenticationMode": "PSKAuthentication",
                  "IEEE11iEncryptionModes": [
                      "AESEncryption"
                  ],
                  "IEEE11iAuthenticationMode": "PSKAuthentication"
              },
              "WPA3-PSK": {
                  "BeaconType": "WPA3",
                  "IEEE11iEncryptionModes": [
                      "AESEncryption"
                  ],
                  "IEEE11iAuthenticationMode": "SAEAuthentication"
              },
              "WPA2/WPA3-PSK": {
                  "BeaconType": "11iandWPA3",
                  "IEEE11iEncryptionModes": [
                      "AESEncryption"
                  ],
                  "IEEE11iAuthenticationMode": "SAEandPSKAuthentication"
              }
          }
      },
      {
          "featureName": "PrimarySSID5GState",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              }
          ]
      },
      {
          "featureName": "SteeringEvent",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "RadioStatus5G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "NoiseLevel",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsSent",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsReceived",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsReTransmittedDownstream",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsDroppedDownstream",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "MUMIMO",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "RadioEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "Mode",
                  "type": "String",
                  "valueList": [
                      {
                          "value": "n",
                          "displayName": "802.11n Only"
                      },
                      {
                          "value": "ac",
                          "displayName": "802.11ac and 802.11n"
                      },
                      {
                          "value": "ax",
                          "displayName": "802.11ax, 802.11ac and 802.11n"
                      }
                  ],
                  "writable": true
              },
              {
                  "name": "Bandwidth",
                  "type": "String",
                  "valueList": {
                      "n": [
                          "20MHz",
                          "40MHz"
                      ],
                      "ac": [
                          "20MHz",
                          "40MHz",
                          "80MHz"
                      ],
                      "ax": [
                          "20MHz",
                          "40MHz",
                          "80MHz"
                      ]
                  },
                  "writable": true
              },
              {
                  "name": "Channel",
                  "type": "String",
                  "valueList": {
                      "dfsEnabled": {
                          "20MHz": [
                              36,
                              40,
                              44,
                              48,
                              52,
                              56,
                              60,
                              64,
                              100,
                              104,
                              108,
                              112,
                              132,
                              136,
                              149,
                              153,
                              157,
                              161
                          ],
                          "40MHz": [
                              36,
                              44,
                              52,
                              60,
                              100,
                              108,
                              132,
                              149,
                              157
                          ],
                          "80MHz": [
                              36,
                              52,
                              100,
                              132,
                              149
                          ]
                      },
                      "dfsDisabled": {
                          "20MHz": [
                              36,
                              40,
                              44,
                              48,
                              149,
                              153,
                              157,
                              161
                          ],
                          "40MHz": [
                              36,
                              44,
                              149,
                              157
                          ],
                          "80MHz": [
                              36,
                              149
                          ]
                      }
                  },
                  "writable": true
              },
              {
                  "name": "AutoChannelEnable",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "PowerLevel",
                  "type": "Integer",
                  "valueList": [
                      10,
                      20,
                      30,
                      40,
                      50,
                      60,
                      70,
                      80,
                      90,
                      100
                  ],
                  "writable": true
              },
              {
                  "name": "DFS",
                  "type": "Boolean",
                  "writable": true,
                  "note": "Should be unwritable if RegulatoryDomain is GY"
              }
          ]
      },
      {
          "featureName": "UpgradeSoftware",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "SpeedTest",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "TraceRoute",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "UPnP",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "NATEnable",
                  "type": "Boolean",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "DownstreamReport",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "RadioStatus6G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "MUMIMO",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "RadioEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "Mode",
                  "type": "String",
                  "valueList": [
                      {
                          "value": "ax",
                          "displayName": "802.11ax, 802.11ac and 802.11n"
                      }
                  ],
                  "writable": true
              },
              {
                  "name": "Bandwidth",
                  "type": "String",
                  "valueList": {
                      "ax": [
                          "80MHz",
                          "160MHz"
                      ]
                  },
                  "writable": true
              },
              {
                  "name": "Channel",
                  "type": "String",
                  "valueList": {
                      "80MHz": [
                          37,
                          53,
                          69,
                          85,
                          101,
                          117,
                          133,
                          149,
                          165,
                          181,
                          197,
                          213
                      ],
                      "160MHz": [
                          37,
                          69,
                          101,
                          133,
                          165,
                          197
                      ]
                  },
                  "writable": true
              },
              {
                  "name": "AutoChannelEnable",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "PowerLevel",
                  "type": "Integer",
                  "valueList": [
                      10,
                      20,
                      30,
                      40,
                      50,
                      60,
                      70,
                      80,
                      90,
                      100
                  ],
                  "writable": true
              },
              {
                  "name": "PSCOnly",
                  "type": "Boolean",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "BackupRestore",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "RemoteAccessGui",
          "resultType": "RawConfiguration",
          "configuration": {
              "urlAppendix": "/login.cgi",
              "formElement": {
                  "username": "Username",
                  "auth": "auth",
                  "nonce": "nonce"
              },
              "needTimer": true
          }
      },
      {
          "featureName": "AutoChannel5G",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true
          }
      },
      {
          "featureName": "RadioStatus2.4G",
          "resultType": "Object",
          "fields": [
              {
                  "name": "RadioEnabled",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "Mode",
                  "type": "String",
                  "valueList": [
                      {
                          "value": "n",
                          "displayName": "802.11n Only"
                      },
                      {
                          "value": "ng",
                          "displayName": "802.11n and 802.11g"
                      },
                      {
                          "value": "ax",
                          "displayName": "802.11ax, 802.11n and 802.11g"
                      }
                  ],
                  "writable": true
              },
              {
                  "name": "Bandwidth",
                  "type": "String",
                  "valueList": {
                      "n": [
                          "20MHz",
                          "40MHz"
                      ],
                      "ng": [
                          "20MHz",
                          "40MHz"
                      ],
                      "ax": [
                          "20MHz",
                          "40MHz"
                      ]
                  },
                  "writable": true
              },
              {
                  "name": "Channel",
                  "type": "String",
                  "valueList": {
                      "20MHz": [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7,
                          8,
                          9,
                          10,
                          11
                      ],
                      "40MHz": [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                      ]
                  },
                  "writable": true
              },
              {
                  "name": "AutoChannelEnable",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "PowerLevel",
                  "type": "Integer",
                  "valueList": [
                      10,
                      20,
                      30,
                      40,
                      50,
                      60,
                      70,
                      80,
                      90,
                      100
                  ],
                  "writable": true
              },
              {
                  "name": "NoiseLevel",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsSent",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsReceived",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsReTransmittedDownstream",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "PacketsDroppedDownstream",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "DHCP",
          "resultType": "Object",
          "fields": [
              {
                  "name": "DHCPServerEnable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "HostName",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "DomainName",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "DeviceIPAddress",
                  "type": "IPAddress",
                  "writable": true
              },
              {
                  "name": "BeginningIPAddress",
                  "type": "IPAddress",
                  "writable": true
              },
              {
                  "name": "EndingIPAddress",
                  "type": "IPAddress",
                  "writable": true
              },
              {
                  "name": "SubnetMask",
                  "type": "IPAddress",
                  "writable": true
              },
              {
                  "name": "DHCPLeaseTime",
                  "type": "Integer",
                  "writable": true,
                  "note": "-1 indicates an infinite lease.",
                  "unit": "s"
              },
              {
                  "name": "DNSServers",
                  "type": "string",
                  "writable": true,
                  "note": "Primary DNS server and secondary DNS server are separated by ','."
              }
          ]
      },
      {
          "featureName": "Reboot",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true,
              "execTimeout": 600
          }
      },
      {
          "featureName": "Firewall",
          "resultType": "Object",
          "fields": [
              {
                  "name": "StealthMode",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "InValue",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "OutValue",
                  "type": "String",
                  "writable": true
              },
              {
                  "name": "SecurityLevel",
                  "type": "String",
                  "valueList": [
                      {
                          "value": "High",
                          "displayName": "High"
                      },
                      {
                          "value": "X_000631_Medium",
                          "displayName": "Medium"
                      },
                      {
                          "value": "Low",
                          "displayName": "Low"
                      },
                      {
                          "value": "Off",
                          "displayName": "Off"
                      }
                  ],
                  "writable": true
              }
          ]
      },
      {
          "featureName": "DMZ",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "IPAddress",
                  "type": "IPAddress",
                  "writable": true
              }
          ]
      },
      {
          "featureName": "ChannelChangeLogs2.4G",
          "resultType": "Array",
          "dimensions": 1,
          "fields": [
              {
                  "name": "TimeStamp",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "ReasonCode",
                  "type": "Binary",
                  "writable": false
              },
              {
                  "name": "NewChannel",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "IptvState",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": true
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              }
          ]
      },
      {
          "featureName": "ChannelChangeLogs5G",
          "resultType": "Array",
          "dimensions": 1,
          "fields": [
              {
                  "name": "TimeStamp",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "ReasonCode",
                  "type": "Binary",
                  "writable": false
              },
              {
                  "name": "NewChannel",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "ConnectToDevice",
          "resultType": "Object",
          "fields": [
              {
                  "name": "IPAddress",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Port",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Protocol",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Username",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Password",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Nonce",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "SSIDManager",
          "resultType": "DeviceCapability",
          "supported": true
      },
      {
          "featureName": "DeviceStatus",
          "resultType": "Object",
          "fields": [
              {
                  "name": "PeriodicInformEnable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "PeriodicInformInterval",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Uptime",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "PrimarySSID2.4GState",
          "resultType": "Object",
          "fields": [
              {
                  "name": "Enable",
                  "type": "Boolean",
                  "writable": false
              },
              {
                  "name": "BeaconType",
                  "type": "String",
                  "valueList": [
                      "Basic",
                      "11i",
                      "WPAand11i",
                      "WPA3",
                      "11iandWPA3"
                  ],
                  "writable": true
              }
          ]
      },
      {
          "featureName": "VoiceStatus",
          "resultType": "Array",
          "dimensions": 1,
          "fields": [
              {
                  "name": "Status.Config",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Status.Service",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Status.Hook",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Status.Call",
                  "type": "String",
                  "writable": false
              },
              {
                  "name": "Stats.IncomingCalls.Attempts",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.IncomingCalls.Completions",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.IncomingCalls.Busy",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.IncomingCalls.PeerDisconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.IncomingCalls.Disconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.OutgoingCalls.Attempts",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.OutgoingCalls.Completions",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.OutgoingCalls.Busy",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.OutgoingCalls.PeerDisconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.OutgoingCalls.Disconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.EmergencyCalls.Attempts",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.EmergencyCalls.Completions",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.EmergencyCalls.Busy",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.EmergencyCalls.PeerDisconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.EmergencyCalls.Disconnects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.RegisterRequests",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.RegisterChallenges",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.RegisterRejects",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.RegisterGrants",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.NotifyWaiting",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.SIPStats.NotifyNoMsgs",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.RTPStats.PacketsSent",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.RTPStats.PacketsReceived",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.RTPStats.Errors.Missing",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.RTPStats.Errors.Underruns",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.DHCP.Discovers",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.DHCP.Acks",
                  "type": "Integer",
                  "writable": false
              },
              {
                  "name": "Stats.DHCP.Nacks",
                  "type": "Integer",
                  "writable": false
              }
          ]
      },
      {
          "featureName": "FactoryReset",
          "resultType": "RawConfiguration",
          "configuration": {
              "supported": true,
              "execTimeout": 600
          }
      }
  ]
}