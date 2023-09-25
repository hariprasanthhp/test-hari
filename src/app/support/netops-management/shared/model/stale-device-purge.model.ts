
export class StaleDevicePurgeModel {
    _id?: string;
    orgId?: string;
    suspended?: boolean;
    name?: string;
    type?: string;
    schedule?: ScheduleDevicePurge
    description?: string;
    maxInactiveDays?: number;
    forceDeleteAssociatedDevices?: boolean
    constructor(
        _id?: string, orgId?: string, suspended?: boolean, name?: string,
        type?: string, schedule?: ScheduleDevicePurge, description?: string,
        maxInactiveDays?: number, forceDeleteAssociatedDevices?: boolean,
    ) {
        this._id = _id || null;
        this.orgId = orgId || null;
        this.name = name || null;
        this.type = type || "Device Purging";
        //default values is set as current time
        this.schedule = schedule || new ScheduleDevicePurge();
        this.description = description || null;
        this.maxInactiveDays = maxInactiveDays || null;
        //default values is set as false
        this.forceDeleteAssociatedDevices = forceDeleteAssociatedDevices || false;
        this.suspended = suspended || null;
    }
}

export class ScheduleDevicePurge {
    frequency?: string;
    startTimeOfDay?: string;
    days?: string;
    timezone?: string;

    constructor(frequency?: string, startTimeOfDay?: string,
        days?: string, timezone?: string) {
        this.frequency = frequency || "";
        this.startTimeOfDay = startTimeOfDay || this.setDefaultTime();
        this.days = days || "";
        this.timezone = timezone || "";
    }
    setDefaultTime() {
        let value: string;
        let curDate = new Date();
        let hours = curDate.getHours(); // => 9
        let minutes = curDate.getMinutes(); // =>  30
        let seconds = curDate.getSeconds(); // => 51
        value = hours + ":" + minutes + ":" + seconds;
        return value
    }

}