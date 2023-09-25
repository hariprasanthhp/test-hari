export class NewPortForwardingModel {

  PortMappingEnabled?:boolean;
  PortMappingDescription?:string;
  InternalClient?:string;
  ExternalPort?:number;
  ExternalPortEnd?:number;
  InternalPort?:number;
  PortMappingProtocol?:string;
   
    constructor(PortMappingEnabled?:boolean,PortMappingDescription?:string,InternalClient?:string,
        ExternalPort?:number,ExternalPortEnd?:number,InternalPort?:number,PortMappingProtocol?:string){
        this.PortMappingEnabled = PortMappingEnabled || true;
        this.PortMappingDescription = PortMappingDescription || null;
        this.InternalClient = InternalClient || null;
        this.ExternalPort = ExternalPort || null;
        this.ExternalPortEnd = ExternalPortEnd || null;
        this.InternalPort = InternalPort || null;
        this.PortMappingProtocol = PortMappingProtocol || null;
    }
}