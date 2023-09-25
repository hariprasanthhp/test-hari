export const flowmockData = {
    orgId: 12847872,
    tenantId: 0,
    mappingPrecedence: "AXOS,RADIUS,CC,AA,CUSTOM,MAC,ASSIGNED,DHCP",
    subscriberMatchRule: "mac_address,cm_dslam_vendor,cm_registration_id,cm_vlan",
    nameFormat: "[{\"name\":\"AXOS\",\"rules\":[{\"attrs\":[\"macAddress\",\"ipAddress\",\"cmSerialNumber\"],\"delimiter\":\"_\"}]},{\"name\":\"RADIUS\",\"rules\":[{\"attrs\":[\"radiusUserName\"],\"delimiter\":\"\"}]},{\"name\":\"CC\",\"rules\":[{\"attrs\":[\"serialNumber\"],\"delimiter\":\"\"}]},{\"name\":\"AA\",\"rules\":[{\"attrs\":[\"macAddress\"],\"delimiter\":\"\"}]},{\"name\":\"CUSTOM\",\"rules\":[{\"attrs\":[\"cmRegistrationId\"],\"delimiter\":\"\"}]},{\"name\":\"MAC\",\"rules\":[{\"attrs\":[\"cmPhone\"],\"delimiter\":\"\"}]},{\"name\":\"ASSIGNED\",\"rules\":[{\"attrs\":[\"assignedName\"],\"delimiter\":\"\"}]},{\"name\":\"DHCP\",\"rules\":[{\"attrs\":[\"dhcpRemoteId\"],\"delimiter\":\"\"}]}]",
    aggregationRules: "[{\"name\":\"AA\",\"attrs\":[\"cmRegion\",\"cmRegistrationId\"],\"delimiter\":\"_\"},{\"name\":\"CUSTOM\",\"attrs\":[\"cmDeviceType\"],\"delimiter\":\"_\"},{\"name\":\"SMx\",\"attrs\":[\"cmRegistrationId\",\"cmVlan\"],\"delimiter\":\"_\"}]",
    realtimeLateflowDelay: 61,
    retentionPeriodDays: 182,
    templateTimeoutHours: 24,
    entitlement: "CSC,COC,CMC",
    enableSubscriberAssoc: false,
    useAsmApplications: true,
    _id: "2ca59b417b715aab017b720080770036"
  }

 