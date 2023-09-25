export const noVarienceV4: any = [
  { auditExists: true, addressesV4: { varianceExists: false } },
  { auditExists: true, addressesV4: { varianceExists: false } },
];

export const varienceV4: any = [
  { auditExists: true, addressesV4: { varianceExists: true } },
  { auditExists: true, addressesV4: { varianceExists: false } },
];

export const noVarienceV6: any = [
  { auditExists: true, addressesV6: { varianceExists: false } },
  { auditExists: true, addressesV6: { varianceExists: false } },
];
export const varienceV6: any = [
  { auditExists: true, addressesV4: { varianceExists: true } },
  { auditExists: true, addressesV4: { varianceExists: false } },
];


export const mockAuditList: any = [
  { id: 1, auditExists: true, addressesV4: { varianceExists: true, incrementalAddresses: [1, 2], decrementalAddresses: [3] } },
  { id: 2, auditExists: true, addressesV4: { varianceExists: false, incrementalAddresses: [], decrementalAddresses: [] } },
  { id: 3, auditExists: false, addressesV4: { varianceExists: true, incrementalAddresses: [4], decrementalAddresses: [] } },
];

export const mockAuditList1: any = [
  { id: 1, auditExists: true, addressesV6: { varianceExists: true, incrementalAddresses: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'], decrementalAddresses: [] } },
  { id: 2, auditExists: true, addressesV6: { varianceExists: false, incrementalAddresses: [], decrementalAddresses: [] } },
  { id: 3, auditExists: false, addressesV6: { varianceExists: true, incrementalAddresses: ['2001:0db8:85a3:0000:0000:8a2e:0370:7335'], decrementalAddresses: ['2001:0db8:85a3:0000:0000:8a2e:0370:7336'] } },
];

export const mockSelectedaddressV6 = [
  { id: '1', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'] },
  { id: '2', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7335', '2001:0db8:85a3:0000:0000:8a2e:0370:7336'] }
];

export const mockPatchSelectedaddressV4 = [
  { id: '1', addressesV4: ['192.168.0.1', '192.168.0.2'] },
  { id: '2', addressesV4: ['192.168.0.3'] },
];

export const mockPatchSelectedaddressV6 = [
  { id: '1', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'] },
  { id: '3', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7336', '2001:0db8:85a3:0000:0000:8a2e:0370:7337'] },
];


export const selectedaddressV4 = {
  "name": "test7777",
  "id": "828fbffb-b43e-4713-99c2-7f9a85bc70dc",
  "orgId": 12903101,
  "domainName": "youtube.com",
  "addressesV4": {
    "similarAddresses": [
      "181.0.0.0/16"
    ],
    "incrementalAddresses": [
      "104.237.160.0/19",
      "130.117.184.232/29",
      "136.22.128.0/19",
      "149.6.140.56/30",
      "149.6.140.136/30",
      "208.65.152.0/22",
      "208.117.224.0/19",
      "172.110.32.0/21",
      "216.73.80.0/20",
      "38.112.56.8/29",
      "38.102.157.16/29",
      "38.103.71.34/31",
      "64.15.112.0/20",
      "38.122.63.0/24",
      "38.142.4.80/29",
      "38.88.204.8/29",
      "38.88.205.16/28",
      "76.208.211.160/29",
      "81.2.115.158/32"
    ],
    "decrementalAddresses": [],
    "varianceExists": true
  },
  "addressesV6": {
    "similarAddresses": [],
    "incrementalAddresses": [
      "2620:120:e000::/40",
      "2620:11a:a000::/40",
      "2a0b:4340:94::/48"
    ],
    "decrementalAddresses": [],
    "varianceExists": true
  },
  "auditExists": true
}
export const selectedaddressV6 = {
  "name": "frank",
  "id": "4fa7b0d8-bbbd-4ac7-b96b-cc0dcbc9a3f7",
  "orgId": 50,
  "domainName": "youtube.com",
  "addressesV4": {
    "similarAddresses": [
      "67.71.226.64/29"
    ],
    "incrementalAddresses": [
      "136.22.128.0/19",
      "104.237.160.0/19",
      "130.117.184.232/29",
      "149.6.140.136/30",
      "149.6.140.56/30",
      "208.65.152.0/22",
      "172.110.32.0/21",
      "208.117.224.0/19",
      "216.73.80.0/20",
      "38.122.63.0/24",
      "38.102.157.16/29",
      "38.103.71.34/31",
      "38.112.56.8/29",
      "38.142.4.80/29",
      "38.88.204.8/29",
      "38.88.205.16/28",
      "81.2.115.158/32",
      "64.15.112.0/20",
      "76.208.211.160/29"
    ],
    "decrementalAddresses": [],
    "varianceExists": true
  },
  "addressesV6": {
    "similarAddresses": [
      "2620:120:e000::/40"
    ],
    "incrementalAddresses": [
      "2620:11a:a000::/40",
      "2a0b:4340:94::/48"
    ],
    "decrementalAddresses": [],
    "varianceExists": true
  },
  "auditExists": true
}