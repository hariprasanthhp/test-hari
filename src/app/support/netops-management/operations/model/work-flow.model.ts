export class WorkFlowModel {
    orgId?:string;
    name?: string;
    groups?: string[];
    actions?:Actions[];
    binaryContent?: string;
    execPolicy?: ExecPolicy;
    description?: string;
    fullGroupExecute?: boolean;
    bPriorNewAndFailed?: boolean;
    source?:string;
    constructor(orgId?:string,name?: string, groups?: string[],actions?:Actions[],binaryContent?: string,
        execPolicy?: ExecPolicy, description?: string,fullGroupExecute?: boolean, bPriorNewAndFailed?: boolean,
        source?:string ){
            this.orgId = orgId || null;
            this.name = name || null;
            this.groups = groups || [] ;
            this.actions = actions || new Actions[0]();
            this.binaryContent = binaryContent || null;
            this.execPolicy = execPolicy || new ExecPolicy();
            this.description = description || null;
            this.fullGroupExecute= fullGroupExecute || null;
            this.bPriorNewAndFailed = bPriorNewAndFailed || null;
           this.source = source || null;
    }
  }

  export class Actions{
    actionType?:string;
    fileId?:string;
    conditionLogic?:string;
    profileId?:string;
    staticGroupId?:string;
    replacedByProfileId?:string;
    constructor(actionType?:string, fileId?:string, conditionLogic?:string, profileId?:string, 
                staticGroupId?:string, replacedByProfileId?:string){
                    this.actionType = actionType || null;
                    this.fileId = fileId || null;
                    this.conditionLogic = conditionLogic || null;
                    this.profileId = profileId || null;
                    this.staticGroupId = staticGroupId || null;
                    this.replacedByProfileId = replacedByProfileId || null;
    }
  }

  export class ExecPolicy{
    window?:ExecPolicyWindow;
    initialTrigger?:InitialTrigger;

    constructor( window?:ExecPolicyWindow,initialTrigger?:InitialTrigger){
        this.window = window || new ExecPolicyWindow();
        this.initialTrigger = initialTrigger || new InitialTrigger();

    }
  }

  export enum Weekdays {
    SUN = "SUN",
    MON = "MON",
    TUE = "TUE",
    WEN = "WEN",
    THU = "THU",
    FRI = "FRI",
    SAT  ="SAT"
  }

  export class ExecPolicyWindow{
    type?:string;
    frequency?: number;
    recurrence?: number;
    windowLength?: number;
    startDateTime?: string;
    weekdays?:Weekdays;
    endDateTime?:string;
    daysOfMonth?:number[]; 

    constructor(type?:string,frequency?: number,recurrence?: number, windowLength?: number,
                startDateTime?: string,weekdays?:Weekdays, endDateTime?:string, daysOfMonth?:number[]){
                this.type = type || null;
                this.frequency = frequency || null;
                this.recurrence = recurrence || null;
                this.windowLength = windowLength || null;
                this.startDateTime = startDateTime || null;
                this.weekdays = weekdays || null;
                this.endDateTime = endDateTime || null;
                this.daysOfMonth = daysOfMonth || null;
    }
  }
  export class InitialTrigger{
    type?:string;
    cpeEvent?:string;
    constructor(type?:string,cpeEvent?:string){
        this.type = type;
        this.cpeEvent = cpeEvent;
    }
}