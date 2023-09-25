
export class SearchListModel {
    metadata?: MetaDataModel;
    records?: RecordsModel[];

    constructor(metadata?: MetaDataModel, records?: RecordsModel[]) {
        this.metadata = metadata || new MetaDataModel();
        this.records = records || new RecordsModel()[0];
    }
}

export class MetaDataModel {
    totalHits?: number
    constructor(totalHits?: number) {
        this.totalHits = totalHits || 0;
    }
}
export class RecordsModel {

    subscriberId?: string;
    subscriberLocationId?: string;
    orgId?: string;
    account?: string;
    name?: string;
    phone?: string;
    email?: string;
    serviceAddress?: string;
    devices?: DevicesModel[];

    constructor(subscriberId?: string, subscriberLocationId?: string, orgId?: string, account?: string,
        name?: string, phone?: string, email?: string, serviceAddress?: string, devices?: DevicesModel[]) {
        this.subscriberId = subscriberId || null;
        this.subscriberLocationId = subscriberLocationId || null;
        this.orgId = orgId || null;
        this.account = account || null;
        this.name = name || null;
        this.phone = phone || null;
        this.email = email || null;
        this.serviceAddress = serviceAddress || null;
        this.devices = devices || new DevicesModel()[0];
    }
}

export class DevicesModel {
    deviceId?: string;
    dataModelName?: string;
    ipAddress?: string;
    macAddress?: string;
    manufacturer?: string;
    modelName?: string;
    opMode?: string;
    productFamily?: string;
    registrationId?: string;
    serialNumber?: string;
    softwareVersion?: string;
    wapGatewaySn?: string;
    _id?: string;
    constructor(deviceId?: string, dataModelName?: string, ipAddress?: string, macAddress?: string,
        manufacturer?: string, modelName?: string, opMode?: string, productFamily?: string,
        registrationId?: string, serialNumber?: string, softwareVersion?: string, wapGatewaySn?: string, _id?: string) {

        this.deviceId = deviceId || null;
        this.dataModelName = dataModelName;
        this.ipAddress = ipAddress;
        this.macAddress = macAddress;
        this.manufacturer = manufacturer;
        this.modelName = modelName;
        this.opMode = opMode;
        this.productFamily = productFamily;
        this.registrationId = registrationId;
        this.serialNumber = serialNumber;
        this.softwareVersion = softwareVersion;
        this.wapGatewaySn = wapGatewaySn;
        this._id = _id;
    }
}