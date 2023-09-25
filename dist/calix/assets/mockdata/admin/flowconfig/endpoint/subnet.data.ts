export const getSubnetData: any = [
  {
    "name": "sherin15ipdup",
    "subnets": "14.0.0.85/30"
  },
  {
    "name": "t1",
    "subnets": "43.0.0.0/30|43.0.0.10/30|43.0.0.20/30"
  },
  {
    "name": "t2",
    "subnets": "43.0.0.50/30"
  },
  {
    "name": "t3",
    "subnets": "43.0.0.60/30"
  }
]

export const addSubnetData: any = {
  "name": "t3",
  "subnets": "43.0.0.30/30"
}

export const updateSubnetData: any = {
  "name": "t3",
  "subnets": "43.0.0.30/30"
}

export const deleteSubnetData: any = [
  {
    "name": "t3",
    "subnets": "43.0.0.30/30"
  }
]

export const importedSubnetData = [
  {
    "name": "t1",
    "subnets": "14.0.0.0/24",
    "action": "Create",
    "validationResult": "ok"
  },
  {
    "name": "t2",
    "subnets": "43.0.0.50/30",
    "action": "Create",
    "validationResult": "ok"
  }
]

export const postparamsforImportSubnet = {
  "dry_run": true,
  "full_import": true,
  "import_data": [
    {
      "action": "Create",
      "subnets": "14.0.0.0/24",
      "name": "t1"
    },
    {
      "action": "Create",
      "subnets": "43.0.0.50/30",
      "name": "t2"
    }
  ],
  "orgId": "10009",
  "userId": "6991449996361848037"
}

export const compareJsonToTableData = [
  {
    "subnets": "43.0.0.70/30",
    "name": "t10"
  },
  {
    "subnets": "",
    "name": ""
  }
]

export const error417:any={
    "timestamp": "2023-01-19T09:42:39.332+0000",
    "status": 417,
    "error": "Expectation Failed",
    "message": "IP is not in Subnet",
    "path": "/occ/flowCorrelatorMs/v1/aggregationsubnet"
  }