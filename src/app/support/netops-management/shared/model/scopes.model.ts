export enum ScopesEnum {
    Read = "read",
    Write = "write",
    Delete = "delete"

  }

  export class scopesStringModel{
      "cloud.admin.roles"?:ScopesEnum[];
      "cloud.admin.users"?:ScopesEnum[];
      "cloud.admin.entitlements"?:ScopesEnum[];
      "cloud.fa.locations"?:ScopesEnum[];
      "cloud.fa.networks"?:ScopesEnum[];
      "cloud.fa.events"?:ScopesEnum[];
      "cloud.fa.applications"?:ScopesEnum[];
      "cloud.shad.service"?:ScopesEnum[];
      "cloud.csc.device.systools.connect_device"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.video"?:ScopesEnum[];
      "cloud.csc.device"?:ScopesEnum[];
      "cloud.csc.report.inv"?:ScopesEnum[];
      "cloud.csc.app_suites.experience_iq"?:ScopesEnum[];
      "cloud.csc.device.systools.delete_device"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.wan"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.voice"?:ScopesEnum[];
      "cloud.csc.report.migrationlog"?:ScopesEnum[];
      "cloud.csc.device.trafficreports"?:ScopesEnum[];
      "cloud.csc.batch.workflows"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.summary"?:ScopesEnum[];
      "cloud.csc.report"?:ScopesEnum[];
      "cloud.csc.device.systools.reboot"?:ScopesEnum[];
      "cloud.csc.image.extfs"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.wireless"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.lan"?:ScopesEnum[];
      "cloud.csc.batch.policies"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.l2security"?:ScopesEnum[];
      "cloud.csc.scautorun"?:ScopesEnum[];
      "cloud.csc.report.proactive"?:ScopesEnum[];
      "cloud.csc.report.unassociateddevices":ScopesEnum[];
      "cloud.csc.device.troubleshooting.smartcheck"?:ScopesEnum[];
      "cloud.csc.subscriber"?:ScopesEnum[];
      "cloud.csc.batch.profiles"?:ScopesEnum[];
      "cloud.csc.image"?:ScopesEnum[];
      "cloud.csc.device.systools.comm_log"?:ScopesEnum[];
      "cloud.csc.device.cfg"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting.gfast"?:ScopesEnum[];
      "cloud.csc.device.systools.event_history"?:ScopesEnum[];
      "cloud.csc.batch.devicegroups"?:ScopesEnum[];
      "cloud.csc.device.troubleshooting"?:ScopesEnum[];
      "cloud.csc.app_suites.protect_iq"?:ScopesEnum[];
      "cloud.csc.batch"?:ScopesEnum[];
      "cloud.csc.device.systools"?:ScopesEnum[];
      "cloud.csc.report.calloutcome"?:ScopesEnum[];
      "cloud.csc.device.systools.backup_restore"?:ScopesEnum[];
      "cloud.csc.app_suites"?:ScopesEnum[];
      "cloud.csc.dashboards"?:ScopesEnum[];
      "cloud.csc.image.upload"?:ScopesEnum[];
      "cloud.csc.device.systools.factory_reset"?:ScopesEnum[];
      "cloud.csc.device.systools.device_logs"?:ScopesEnum[];
      "cloud.cmc.insights"?:ScopesEnum[];
      "cloud.cmc.search"?:ScopesEnum[];
      "cloud.cmc.mobilenotifications"?:ScopesEnum[];
      "cloud.cmc.upsell"?:ScopesEnum[];
      "cloud.cmc.retention"?:ScopesEnum[];
      "cloud.cmc.acquisition"?:ScopesEnum[];
  }

export class ScopesModel {
    "cloud" ?:GenericModel;
    
    constructor( cloud?:GenericModel){
        this.cloud = cloud || new GenericModel();
    }
  
}

  export class GenericModel{
    admin?:AdminScopeModel;
    cmc?:CMCScopeModel;
    csc?:CSCScopeModel;
    fa ?: FAScopeModel;
    shad?: SHADScopeModel;

    constructor(admin?:AdminScopeModel,cmc?:CMCScopeModel, csc?:CSCScopeModel, fa?: FAScopeModel,
        shad?: SHADScopeModel){
         
            this.admin = admin || new AdminScopeModel();
            this.cmc = cmc || new CMCScopeModel();
            this.csc = csc || new CSCScopeModel();
            this.fa  = fa || new FAScopeModel();
            this.shad = shad || new SHADScopeModel();
    }
  }

  export class SHADScopeModel{
    service?: ScopesEnum[];

    constructor(service?: ScopesEnum[]){
        this.service = service || []
    }
  }

  export class FAScopeModel{
    applications?: ScopesEnum[];
    events?: ScopesEnum[];
    locations?: ScopesEnum[];
    networks?: ScopesEnum[];

    constructor( applications?: ScopesEnum[],events?: ScopesEnum[],locations?: ScopesEnum[], networks?: ScopesEnum[]){
       
        this.applications =applications || [];
        this.events = events || [];
        this.locations=locations || [];
        this.networks =networks || [];
    }
}
  export class CSCScopeModel{
    app_suites?:  AppSuitesScopeModel;
    batch?: BatchScopeModel;
    dashboards?: ScopesEnum[];
    device?: DevicesScopeModel;
    image?: ImageScopeModel;
    report?: ReportScopeModel;
    scautorun?:  ScopesEnum[];
    subscriber?:  ScopesEnum[];

    constructor(  app_suites?:  AppSuitesScopeModel, batch?: BatchScopeModel,dashboards?: ScopesEnum[],
        device?: DevicesScopeModel,image?: ImageScopeModel,report?: ReportScopeModel,scautorun?: ScopesEnum[],
        subscriber?:  ScopesEnum[]){
            this.app_suites= app_suites || new AppSuitesScopeModel();
            this.batch = batch || new BatchScopeModel();
            this.dashboards = dashboards || []
            this.device = device || new DevicesScopeModel();
            this.image = image || new ImageScopeModel();
            this.report = report || new ReportScopeModel();
            this.scautorun = scautorun || [];
            this.subscriber=subscriber || [];

    }
  }
  export class ReportScopeModel{
    report?: ScopesEnum[];
    calloutcome?:  ScopesEnum[];
    inv?: ScopesEnum[];
    migrationlog?: ScopesEnum[];
    proactive?:  ScopesEnum[];
    unassociateddevices?: ScopesEnum[];

    constructor( report?: ScopesEnum[], calloutcome?:  ScopesEnum[], inv?: ScopesEnum[],  migrationlog?: ScopesEnum[],
        proactive?:  ScopesEnum[], unassociateddevices?: ScopesEnum[]){
            this.report = report || [];
            this.calloutcome =calloutcome || [];
            this.inv = inv || [];
            this.migrationlog = migrationlog || [];
            this.proactive = proactive || [];
            this.unassociateddevices = unassociateddevices || [];
    }
  }

  export class ImageScopeModel{
    image?: ScopesEnum[];
    extfs?: ScopesEnum[];
    upload?: ScopesEnum[];

    constructor(image?: ScopesEnum[], extfs?: ScopesEnum[], upload?: ScopesEnum[]){
        this.image = image;
        this.extfs=extfs;
        this.upload = upload;
    }


  }

  export class DevicesScopeModel{
    device?:ScopesEnum[]
    cfg?:ScopesEnum[]
    systools?:systoolsScopesModel
    trafficreports?:ScopesEnum[]
    troubleshooting?:TrobuleShootingScopeModel;

    constructor(device?:ScopesEnum[], cfg?:ScopesEnum[],  systools?:systoolsScopesModel,  trafficreports?:ScopesEnum[],
        troubleshooting?:TrobuleShootingScopeModel){
            
            this.device = device;
            this.cfg = cfg;
            this.systools = systools;
            this.trafficreports = trafficreports;
            this.troubleshooting= troubleshooting|| new TrobuleShootingScopeModel();
    }
  }

  export class TrobuleShootingScopeModel{
    troubleshooting?:ScopesEnum[];
    gfast?:ScopesEnum[]
    l2security?:ScopesEnum[]
    lan?:ScopesEnum[]
    smartcheck?:ScopesEnum[]
    summary?:ScopesEnum[]
    video?:ScopesEnum[]
    voice?:ScopesEnum[]
    wan?:ScopesEnum[]
    wireless?:ScopesEnum[]

    constructor(troubleshooting?:ScopesEnum[],gfast?:ScopesEnum[],l2security?:ScopesEnum[],lan?:ScopesEnum[],smartcheck?:ScopesEnum[],
        summary?:ScopesEnum[],video?:ScopesEnum[],voice?:ScopesEnum[], wan?:ScopesEnum[],wireless?:ScopesEnum[]){
            
            this.troubleshooting= troubleshooting || [];
            this.gfast = gfast || [];
            this.l2security= l2security || [];
            this.lan = lan || [];
            this.smartcheck = smartcheck || [];
            this.summary = summary || [];
            this.video = video || [];
            this.voice = voice || [],
            this.wan = wan || [];
            this.wireless = wireless || []; 
    }
  }
  export class systoolsScopesModel{
    systools?:ScopesEnum[]
    backup_restore?: ScopesEnum[]
    comm_log?: ScopesEnum[]
    connect_device?:ScopesEnum[]
    delete_device?: ScopesEnum[]
    device_logs?: ScopesEnum[]
    event_history?: ScopesEnum[]
    factory_reset?: ScopesEnum[]
    reboot?: ScopesEnum[]

        constructor(systools?:ScopesEnum[],backup_restore?: ScopesEnum[],comm_log?: ScopesEnum[],connect_device?:ScopesEnum[],
            delete_device?: ScopesEnum[], device_logs?: ScopesEnum[],event_history?: ScopesEnum[],factory_reset?: ScopesEnum[],
            reboot?: ScopesEnum[]){
           
            this.systools = systools || [];
            this.backup_restore = backup_restore || [];
            this.comm_log = comm_log || [];
            this.connect_device = connect_device || [];
            this.delete_device = delete_device || [];
            this.device_logs = device_logs || [];
            this.event_history = event_history || [];
            this.factory_reset = factory_reset || [];
            this.reboot = reboot || [];
        }
  }

  export class BatchScopeModel{
    batch?: ScopesEnum[]
    devicegroups?: ScopesEnum[]
    policies?: ScopesEnum[]
    profiles?: ScopesEnum[]
    workflows?: ScopesEnum[]

        constructor(batch?: ScopesEnum[],devicegroups?: ScopesEnum[],policies?: ScopesEnum[],profiles?: ScopesEnum[],
            workflows?: ScopesEnum[]){
            
            this.batch = batch || [];
            this.devicegroups = devicegroups || [];
            this.policies = policies || [];
            this.profiles = profiles || [];
            this.workflows = workflows || [];
        }
  }
  export class AppSuitesScopeModel{
    app_suites?:ScopesEnum[]
    experience_iq?:ScopesEnum[]
    protect_iq?:ScopesEnum[]

        constructor(app_suites?:ScopesEnum[], experience_iq?:ScopesEnum[],  protect_iq?:ScopesEnum[]){
               
                this.app_suites = app_suites || [];
                this.experience_iq = experience_iq || [];
                this.protect_iq = protect_iq ||[];
        }
  }

  export class AdminScopeModel{
    entitlements?:ScopesEnum[];
    roles?: ScopesEnum[];
    users?: ScopesEnum[];

        constructor(roles?: ScopesEnum[],users?: ScopesEnum[], entitlements?:ScopesEnum[] ){
          
            this.roles = roles || [];
            this.users = users || [];
            this.entitlements = entitlements || [];
        }
  }

  export class CMCScopeModel{
    acquisition?: ScopesEnum[]
    insights?: ScopesEnum[]
    mobilenotifications?: ScopesEnum[]
    retention?: ScopesEnum[]
    search?: ScopesEnum[]
    upsell?: ScopesEnum[]

     constructor(acquisition?: ScopesEnum[],insights?: ScopesEnum[],mobilenotifications?: ScopesEnum[],retention?: ScopesEnum[],
        search?: ScopesEnum[], upsell?: ScopesEnum[]){

        this.acquisition = acquisition || []
        this.insights = insights || []
        this.mobilenotifications =  mobilenotifications || []
        this.retention = retention || [];
        this.search = search || [];
        this.upsell = upsell || [];

     }
  }