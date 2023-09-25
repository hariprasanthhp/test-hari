export class LanHostModel {
    IPAddress?: string;
    HostNameAlias?:string;
    Active?:string;
    HostName?:string; 
    Icon?: string;
    InterfaceType?: string;
    MACAddress?: string;
    constructor( IPAddress?: string,HostNameAlias?:string,
        Active?:string, HostName?:string, Icon?: string,  InterfaceType?: string,
        MACAddress?: string){
        this.HostName = HostName || null;
        this.IPAddress = IPAddress || null ;
        this.HostNameAlias = HostNameAlias || null;
        this.Active = Active || null;
        this.Icon = Icon || null;
        this.InterfaceType = InterfaceType || null;
        this.MACAddress = MACAddress || null;
        }
}
