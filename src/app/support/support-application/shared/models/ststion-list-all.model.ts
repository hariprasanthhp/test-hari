export class StationListAllModel {
  count?: number;
  stations?: Station[]
  constructor(params?: StationListAllModel) {
    /* this.count=params?.count || null;
    this.stations=params?.stations || [new Station()];  */
  }
}

class Station {
  deviceId?: string;
  macAddr?: string;
  name?: string;
  ifType?: string;
  constructor(params?: Station) {
    this.deviceId = params?.deviceId || null;
    this.macAddr = params?.macAddr || null;
    this.name = params?.name || null;
    this.ifType = params?.ifType || null;
  }
}